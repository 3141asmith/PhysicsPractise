const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const crypto=require('node:crypto');
const {createApp}=require('../server.cjs');
const {readMicrosoftConfig,createProvider}=require('../microsoft-auth.cjs');
const tenantId='11111111-1111-1111-1111-111111111111',clientId='22222222-2222-2222-2222-222222222222';
const settings={tenantId,clientId,clientSecret:'test-only',redirectUri:'http://localhost:3000/api/microsoft/callback'};
const identity=(n,email)=>({tid:tenantId,oid:`33333333-3333-3333-3333-${String(n).padStart(12,'0')}`,name:'Microsoft User',email});

test('Microsoft configuration fails closed',()=>{
 assert.equal(readMicrosoftConfig({}),null);
 assert.throws(()=>readMicrosoftConfig({MICROSOFT_CLIENT_ID:clientId}));
 const env={MICROSOFT_TENANT_ID:tenantId,MICROSOFT_CLIENT_ID:clientId,MICROSOFT_CLIENT_SECRET:'secret',MICROSOFT_REDIRECT_URI:settings.redirectUri};
 assert.equal(readMicrosoftConfig(env).tenantId,tenantId);
 assert.throws(()=>readMicrosoftConfig({...env,MICROSOFT_TENANT_ID:'common'}));
 assert.throws(()=>readMicrosoftConfig({...env,MICROSOFT_REDIRECT_URI:'http://school.example/api/microsoft/callback'}));
});

test('Microsoft sign-in, secure linking, tenant limits and replay prevention',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-ms-'));
 let claims=identity(1,'student@example.test'),redeemed=0;
 const provider={authorize:async flow=>'https://login.microsoftonline.com/authorize?state='+flow.state,redeem:async()=>{redeemed++;return claims;}};
 const config={...settings},app=createApp({dataDir:dir,microsoft:config,microsoftProvider:provider});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 config.redirectUri=base+'/api/microsoft/callback';
 async function request(route,body,session,extra={}){
  const res=await fetch(base+route,{redirect:'manual',method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(session?{Cookie:session.cookie,'X-CSRF-Token':session.csrf}:{}),...extra},body:body===undefined?undefined:JSON.stringify(body)});
  const data=res.status===303?{}:await res.json();
  return {status:res.status,...data,location:res.headers.get('location'),cookie:res.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ')};
 }
 async function begin(body={},session){const flow=await request('/api/microsoft/start',body,session);assert.equal(flow.status,200);return {state:new URL(flow.url).searchParams.get('state'),cookie:flow.cookie};}
 const finish=flow=>request('/api/microsoft/callback?code=test&state='+flow.state,undefined,flow);
 const creds=name=>({name,email:name+'@example.test',password:'test-password-123'});
 try{
  const teacher=await request('/api/setup',{...creds('teacher'),token:app.setupToken});
  assert.equal((await request('/api/session')).microsoftEnabled,true);
  assert.equal((await request('/api/microsoft/start',{link:true})).status,403);
  assert.equal((await request('/api/microsoft/start',{link:true},teacher,{'X-CSRF-Token':''})).status,403);
  assert.equal((await request('/api/microsoft/start',{classCode:'invalid'})).status,400);
  const unknown=await finish(await begin());assert.equal(unknown.location,'/#microsoft=join-or-link');
  const flow=await begin({classCode:teacher.user.classCode,role:'teacher'});
  const wrongBrowser=await finish({...flow,cookie:'physics_microsoft=wrong'});assert.equal(wrongBrowser.location,'/#microsoft=expired');assert.equal(redeemed,1);
  const signed=await finish(flow);assert.equal(signed.location,'/#microsoft=success');
  const student=await request('/api/session',undefined,signed);assert.equal(student.user.role,'student');assert.equal(student.user.microsoftLinked,true);
  assert.equal((await request('/api/gradebook',undefined,signed)).status,403);
  assert.equal((await finish(flow)).location,'/#microsoft=expired');
  const again=await finish(await begin());assert.equal((await request('/api/session',undefined,again)).user.id,student.user.id);
  claims=identity(2,'teacher@example.test');
  assert.equal((await finish(await begin({classCode:teacher.user.classCode}))).location,'/#microsoft=join-or-link');
  const linked=await finish(await begin({link:true},teacher));assert.equal(linked.location,'/#microsoft=success');
  assert.equal((await request('/api/session',undefined,linked)).user.id,teacher.user.id);
  const teacherLogin=await finish(await begin());assert.equal((await request('/api/gradebook',undefined,teacherLogin)).status,200);
  assert.equal((await finish(await begin({link:true}, {...signed,csrf:student.csrf}))).location,'/#microsoft=already-linked');
  claims={...identity(3,'outsider@example.test'),tid:'44444444-4444-4444-4444-444444444444'};
  assert.equal((await finish(await begin({classCode:teacher.user.classCode}))).location,'/#microsoft=tenant');
  claims=identity(4,'new@example.test');const expired=await begin({classCode:teacher.user.classCode});
  app.db.prepare('UPDATE microsoft_flows SET expires=0 WHERE state=?').run(expired.state);
  assert.equal((await finish(expired)).location,'/#microsoft=expired');
  const cancelled=await begin();assert.equal((await request('/api/microsoft/callback?error=access_denied&state='+cancelled.state,undefined,cancelled)).location,'/#microsoft=cancelled');
  const local=await request('/api/register',{...creds('local'),classCode:teacher.user.classCode});
  const logoutLink=await begin({link:true},local);await request('/api/logout',{},local);
  assert.equal((await finish(logoutLink)).location,'/#microsoft=expired');
  assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM microsoft_identities').get().n,2);
 }finally{await app.close();fs.rmSync(dir,{recursive:true,force:true});}
});

test('production OIDC adapter verifies signed tokens, nonce, issuer, audience and expiry',async()=>{
 const originalFetch=global.fetch,issuer=`https://login.microsoftonline.com/${tenantId}/v2.0`;
 const {privateKey,publicKey}=crypto.generateKeyPairSync('rsa',{modulusLength:2048});
 const jwk={...publicKey.export({format:'jwk'}),kid:'test-key',alg:'RS256',use:'sig'};
 let overrides={},badSignature=false;
 const flow={state:'random-state-for-test',nonce:'random-nonce-for-test',verifier:crypto.randomBytes(32).toString('base64url')};
 global.fetch=async(url,options)=>{
  url=String(url);
  if(url.includes('.well-known'))return Response.json({issuer,authorization_endpoint:issuer+'/authorize',token_endpoint:issuer+'/token',jwks_uri:issuer+'/keys',response_types_supported:['code'],subject_types_supported:['pairwise'],id_token_signing_alg_values_supported:['RS256']});
  if(url.endsWith('/keys'))return Response.json({keys:[jwk]});
  if(url.endsWith('/token')){
   const body=new URLSearchParams(options.body);assert.equal(body.get('code_verifier'),flow.verifier);
   const encode=value=>Buffer.from(JSON.stringify(value)).toString('base64url');
   const data=encode({alg:'RS256',kid:'test-key'})+'.'+encode({iss:issuer,aud:clientId,sub:'subject',iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+300,nonce:flow.nonce,...identity(1,'student@example.test'),...overrides});
   const signature=badSignature?Buffer.alloc(256):crypto.sign('RSA-SHA256',Buffer.from(data),privateKey);
   return Response.json({access_token:'unused',token_type:'Bearer',id_token:data+'.'+signature.toString('base64url')});
  }
  throw new Error('Unexpected network request: '+url);
 };
 try{
  const provider=createProvider(settings),url=new URL(await provider.authorize(flow));
  assert.equal(url.searchParams.get('code_challenge_method'),'S256');assert.equal(url.searchParams.get('scope'),'openid profile email');
  const callback=new URL(settings.redirectUri+'?code=code&state='+flow.state);
  assert.equal((await provider.redeem(callback,flow)).oid,identity(1).oid);
  for(const invalid of [{nonce:'wrong'},{aud:'wrong'},{iss:'https://wrong.example'},{exp:1}]){overrides=invalid;await assert.rejects(()=>provider.redeem(callback,flow));}
  overrides={};badSignature=true;await assert.rejects(()=>provider.redeem(callback,flow));
  await assert.rejects(()=>provider.redeem(new URL(settings.redirectUri+'?code=code&state=wrong'),flow));
 }finally{global.fetch=originalFetch;}
});
