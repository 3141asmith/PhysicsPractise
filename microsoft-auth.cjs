const crypto=require('node:crypto');
const oidc=require('openid-client');

function readMicrosoftConfig(env=process.env){
  const values=['MICROSOFT_TENANT_ID','MICROSOFT_CLIENT_ID','MICROSOFT_CLIENT_SECRET','MICROSOFT_REDIRECT_URI'].map(key=>env[key]?.trim());
  if(values.every(value=>!value))return null;
  if(values.some(value=>!value))throw new Error('Set all four MICROSOFT_* settings before enabling Microsoft sign-in.');
  const [tenantId,clientId,clientSecret,redirectUri]=values;
  const guid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if(!guid.test(tenantId)||!guid.test(clientId))throw new Error('Microsoft tenant and client IDs must be GUIDs, not common or organisations.');
  const url=new URL(redirectUri);
  if((url.protocol!=='https:'&&!(url.protocol==='http:'&&['localhost','127.0.0.1'].includes(url.hostname)))||url.pathname!=='/api/microsoft/callback'||url.search||url.hash||url.username||url.password)throw new Error('Use an HTTPS Microsoft callback URL (HTTP localhost is allowed for development).');
  return {tenantId:tenantId.toLowerCase(),clientId,clientSecret,redirectUri:url.href};
}

function createProvider(settings){
  let cached;
  async function configuration(){
    if(!cached)cached=oidc.discovery(new URL(`https://login.microsoftonline.com/${settings.tenantId}/v2.0`),settings.clientId,settings.clientSecret)
      .then(config=>{oidc.enableNonRepudiationChecks(config);return config;}).catch(e=>{cached=null;throw e;});
    return cached;
  }
  return {
    async authorize(flow){
      return oidc.buildAuthorizationUrl(await configuration(),{redirect_uri:settings.redirectUri,scope:'openid profile email',response_mode:'query',state:flow.state,nonce:flow.nonce,code_challenge:await oidc.calculatePKCECodeChallenge(flow.verifier),code_challenge_method:'S256',prompt:'select_account'}).href;
    },
    async redeem(url,flow){
      const tokens=await oidc.authorizationCodeGrant(await configuration(),url,{pkceCodeVerifier:flow.verifier,expectedState:flow.state,expectedNonce:flow.nonce,idTokenExpected:true});
      return tokens.claims();
    }
  };
}

function createMicrosoftAuth({db,settings,provider,login,addUser,secureCookies}){
  db.exec(`CREATE TABLE IF NOT EXISTS microsoft_identities(tenant TEXT NOT NULL,object_id TEXT NOT NULL,user_id TEXT UNIQUE NOT NULL REFERENCES users(id),PRIMARY KEY(tenant,object_id));
    CREATE TABLE IF NOT EXISTS microsoft_flows(state TEXT PRIMARY KEY,binding TEXT NOT NULL,nonce TEXT NOT NULL,verifier TEXT NOT NULL,link_session TEXT,teacher_id TEXT,expires INTEGER NOT NULL);`);
  if(!settings)return {enabled:false};
  provider=provider||createProvider(settings);
  const hash=value=>crypto.createHash('sha256').update(value).digest('hex');
  const random=()=>crypto.randomBytes(32).toString('base64url');
  const fail=message=>Object.assign(new Error(message),{status:400});
  const cookie=(value,age)=>`physics_microsoft=${value}; Path=/api/microsoft; HttpOnly; SameSite=Lax; Max-Age=${age}${secureCookies?'; Secure':''}`;
  return {
    enabled:true,
    async start(req,res,body,user){
      const origin=new URL(settings.redirectUri);
      if(req.headers.host!==origin.host)throw fail('Open the website at '+origin.origin+' before signing in with Microsoft.');
      if(body.link&&(!user||req.headers['x-csrf-token']!==user.csrf))throw Object.assign(new Error('Sign in before connecting Microsoft.'),{status:403});
      let teacherId=null;
      if(body.classCode){
        teacherId=db.prepare("SELECT id FROM users WHERE class_code=? AND role='teacher'").get(String(body.classCode).trim().toUpperCase())?.id;
        if(!teacherId)throw fail('The class code is not valid.');
      }
      const binding=random(),flow={state:random(),nonce:random(),verifier:random()};
      const url=await provider.authorize(flow);
      db.prepare('DELETE FROM microsoft_flows WHERE expires<?').run(Date.now());
      db.prepare('INSERT INTO microsoft_flows VALUES(?,?,?,?,?,?,?)').run(flow.state,hash(binding),flow.nonce,flow.verifier,body.link?user.token:null,teacherId,Date.now()+600000);
      res.setHeader('Set-Cookie',cookie(binding,600));
      return {url};
    },
    async callback(req,res,url){
      res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');
      try{
        const state=url.searchParams.get('state'),binding=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('physics_microsoft='))?.slice(18);
        const flow=db.prepare('SELECT * FROM microsoft_flows WHERE state=?').get(state||'');
        if(!flow||!binding||flow.binding!==hash(binding)||flow.expires<Date.now())throw fail('expired');
        // Consume before awaiting token exchange so a callback cannot be replayed concurrently.
        db.prepare('DELETE FROM microsoft_flows WHERE state=?').run(state);
        if(url.searchParams.has('error'))throw fail('cancelled');
        const callback=new URL(settings.redirectUri);callback.search=url.search;
        const claims=await provider.redeem(callback,flow);
        const guid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if(!claims||claims.tid?.toLowerCase()!==settings.tenantId||!guid.test(claims.oid||''))throw fail('tenant');
        const oid=claims.oid.toLowerCase(),identity=db.prepare('SELECT user_id FROM microsoft_identities WHERE tenant=? AND object_id=?').get(settings.tenantId,oid);
        let user;
        if(flow.link_session){
          user=db.prepare('SELECT users.* FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=? AND expires>?').get(flow.link_session,Date.now());
          if(!user)throw fail('expired');
          if(identity&&identity.user_id!==user.id)throw fail('already-linked');
          const linked=db.prepare('SELECT object_id FROM microsoft_identities WHERE user_id=?').get(user.id);
          if(linked&&linked.object_id!==oid)throw fail('already-linked');
        }else if(identity){user=db.prepare('SELECT * FROM users WHERE id=?').get(identity.user_id);}
        else{
          if(!flow.teacher_id)throw fail('join-or-link');
          const email=String(claims.email||claims.preferred_username||`${oid}@${settings.tenantId}.microsoft.local`).trim().toLowerCase();
          // Email claims are mutable and are never used as proof of account ownership.
          if(db.prepare('SELECT id FROM users WHERE email=?').get(email))throw fail('join-or-link');
          user=addUser({name:String(claims.name||'Microsoft student').slice(0,100),email,password:random()+random()},'student',flow.teacher_id);
        }
        db.prepare('INSERT OR IGNORE INTO microsoft_identities VALUES(?,?,?)').run(settings.tenantId,oid,user.id);
        login(res,user);
        res.setHeader('Set-Cookie',[res.getHeader('Set-Cookie'),cookie('',0)]);
        res.writeHead(303,{Location:'/#microsoft=success'});res.end();
      }catch(e){
        const code=['expired','cancelled','tenant','already-linked','join-or-link'].includes(e.message)?e.message:'failed';
        res.setHeader('Set-Cookie',cookie('',0));res.writeHead(303,{Location:'/#microsoft='+code});res.end();
      }
    }
  };
}
module.exports={readMicrosoftConfig,createMicrosoftAuth,createProvider};
