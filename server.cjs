const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {DatabaseSync} = require('node:sqlite');
const {loadBank,parseNumber} = require('./bank.cjs');
const {createChallenge}=require('./challenge.cjs');
const {readMicrosoftConfig,createMicrosoftAuth}=require('./microsoft-auth.cjs');

function createApp({dataDir=path.join(__dirname,'data'),secureCookies=process.env.SECURE_COOKIES==='1',microsoft=readMicrosoftConfig(),microsoftProvider}={}) {
  fs.mkdirSync(dataDir,{recursive:true});
  const db=new DatabaseSync(path.join(dataDir,'physics.sqlite'));
  db.exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL CHECK(role IN ('student','teacher')),teacher_id TEXT REFERENCES users(id),class_code TEXT UNIQUE,seed TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),csrf TEXT NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS progress(user_id TEXT REFERENCES users(id),question_id TEXT,answer TEXT NOT NULL DEFAULT '',attempts INTEGER NOT NULL DEFAULT 0,mastered INTEGER NOT NULL DEFAULT 0,points TEXT NOT NULL DEFAULT '[]',hints INTEGER NOT NULL DEFAULT 0,solution_seen INTEGER NOT NULL DEFAULT 0,updated TEXT NOT NULL,PRIMARY KEY(user_id,question_id));`);
  const setupPath=path.join(dataDir,'setup-key.txt');
  db.exec('CREATE TABLE IF NOT EXISTS guest_users(user_id TEXT PRIMARY KEY REFERENCES users(id),expires INTEGER NOT NULL)');
  db.exec('CREATE TABLE IF NOT EXISTS teacher_invites(token TEXT PRIMARY KEY,expires INTEGER NOT NULL)');
  if(!fs.existsSync(setupPath))fs.writeFileSync(setupPath,crypto.randomBytes(24).toString('hex'),{mode:0o600});
  const setupToken=fs.readFileSync(setupPath,'utf8').trim();
  const banks=new Map(),limits=new Map();
  const getBank=user=>{
    if(!banks.has(user.id)) {
      if(banks.size>=100)banks.delete(banks.keys().next().value);
      banks.set(user.id,loadBank(user.seed));
    }
    return banks.get(user.id);
  };
  const publicUser=u=>({id:u.id,name:u.name,email:u.email,role:u.role,classCode:u.class_code,guest:!!db.prepare('SELECT user_id FROM guest_users WHERE user_id=?').get(u.id),microsoftLinked:!!db.prepare('SELECT user_id FROM microsoft_identities WHERE user_id=?').get(u.id)});
  const hashPassword=password=>{
    const salt=crypto.randomBytes(16).toString('hex');
    return salt+':'+crypto.scryptSync(password,salt,64).toString('hex');
  };
  const checkPassword=(password,stored)=>{
    const [salt,hash]=stored.split(':');
    return crypto.timingSafeEqual(Buffer.from(hash,'hex'),crypto.scryptSync(password,salt,64));
  };
  const error=(status,message)=>Object.assign(new Error(message),{status});
  const respond=(res,status,value)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
  const ensureTeacher=u=>{if(u.role!=='teacher')throw error(403,'Teacher access required.');};
  const credentials=body=>{
    const name=String(body.name||'').trim(),email=String(body.email||'').trim().toLowerCase(),password=String(body.password||'');
    if(name.length<2||name.length>100||!/^\S+@\S+\.\S+$/.test(email)||email.length>200)throw error(400,'Enter your name and a valid email address.');
    if(password.length<12||password.length>128)throw error(400,'Use a password of 12 to 128 characters.');
    return {name,email,password};
  };
  function addUser(body,role,teacherId=null) {
    const {name,email,password}=credentials(body);
    if(db.prepare('SELECT id FROM users WHERE email=?').get(email))throw error(409,'An account already uses that email address.');
    const id=crypto.randomUUID(),classCode=role==='teacher'?crypto.randomBytes(6).toString('hex').toUpperCase():null;
    db.prepare('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)').run(id,name,email,hashPassword(password),role,teacherId,classCode,crypto.randomBytes(32).toString('hex'));
    return db.prepare('SELECT * FROM users WHERE id=?').get(id);
  }
  function session(req) {
    const raw=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('physics_session='))?.slice(16);
    if(!raw)return null;
    return db.prepare('SELECT users.*,sessions.csrf,sessions.token FROM sessions JOIN users ON users.id=sessions.user_id WHERE token=? AND expires>?').get(crypto.createHash('sha256').update(raw).digest('hex'),Date.now());
  }
  function login(res,user) {
    const raw=crypto.randomBytes(32).toString('hex'),csrf=crypto.randomBytes(24).toString('hex');
    db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
    db.prepare('INSERT INTO sessions VALUES(?,?,?,?)').run(crypto.createHash('sha256').update(raw).digest('hex'),user.id,csrf,Date.now()+12*3600000);
    res.setHeader('Set-Cookie',`physics_session=${raw}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${secureCookies?'; Secure':''}`);
    return {user:publicUser(user),csrf};
  }
  function progress(userId) {
    const result={};
    for(const row of db.prepare('SELECT * FROM progress WHERE user_id=?').all(userId)) result[row.question_id]={draft:row.answer,attempted:row.attempts>0,attempts:row.attempts,mastered:!!row.mastered,points:JSON.parse(row.points),hintCount:row.hints,solutionSeen:!!row.solution_seen,updated:row.updated};
    return result;
  }
  function ensureRow(userId,qid) {
    db.prepare('INSERT OR IGNORE INTO progress(user_id,question_id,updated) VALUES(?,?,?)').run(userId,qid,new Date().toISOString());
  }
  function publicQuestion(q,p) {
    const {answer,steps,hints,...safe}=q;
    return {...safe,hintCount:p?.hintCount||0,revealedHints:hints.slice(0,p?.hintCount||0)};
  }
  function limit(req,route) {
    const key=(req.socket.remoteAddress||'')+route,now=Date.now();
    let entry=limits.get(key);
    if(!entry||entry.until<now)entry={count:0,until:now+600000};
    limits.set(key,entry);
    if(++entry.count>30)throw error(429,'Too many attempts. Try again in ten minutes.');
    if(limits.size>10000)for(const [k,v] of limits)if(v.until<now)limits.delete(k);
  }
  const microsoftAuth=createMicrosoftAuth({db,settings:microsoft,provider:microsoftProvider,login,addUser,secureCookies});
  const challenge=createChallenge(db);
  function removeGuest(id){
    db.exec('BEGIN');
    try{
      for(const table of ['challenges','progress','sessions','microsoft_identities','guest_users'])db.prepare(`DELETE FROM ${table} WHERE user_id=?`).run(id);
      db.prepare('DELETE FROM users WHERE id=?').run(id);db.exec('COMMIT');banks.delete(id);
    }catch(e){db.exec('ROLLBACK');throw e;}
  }
  function expireGuests(){for(const row of db.prepare('SELECT user_id FROM guest_users WHERE expires<=?').all(Date.now()))removeGuest(row.user_id);}
  expireGuests();
  const server=http.createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','DENY');res.setHeader('Referrer-Policy','same-origin');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'");
    try {
      const url=new URL(req.url,'http://localhost'),route=url.pathname;
      if(route.startsWith('/api/')) {
        expireGuests();
        const user=session(req);let body={};
        if(req.method==='POST') {
          const origin=req.headers.origin;
          if(origin && new URL(origin).host!==req.headers.host)throw error(403,'Cross-site request refused.');
          let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>32000)throw error(413,'Request too large.');}
          try{body=JSON.parse(raw||'{}');}catch{throw error(400,'Invalid request.');}
          if(!body||typeof body!=='object'||Array.isArray(body))throw error(400,'Invalid request.');
        }
        if(route==='/api/microsoft/callback'&&req.method==='GET'&&microsoftAuth.enabled)return await microsoftAuth.callback(req,res,url);
        if(route==='/api/microsoft/start'&&req.method==='POST'){
          if(user&&publicUser(user).guest)throw error(403,'Leave guest mode and sign in to connect Microsoft.');
          if(!microsoftAuth.enabled)throw error(503,'Microsoft sign-in has not been configured by the school.');
          limit(req,route);return respond(res,200,await microsoftAuth.start(req,res,body,user));
        }
        if(route==='/api/session'&&req.method==='GET')return respond(res,200,{user:user?publicUser(user):null,csrf:user?.csrf,microsoftEnabled:microsoftAuth.enabled,setupRequired:!db.prepare("SELECT id FROM users WHERE role='teacher' LIMIT 1").get()});
        if(route==='/api/guest'&&req.method==='POST'){
          if(user)throw error(409,'Sign out before starting a guest session.');
          limit(req,route);
          const guest=addUser({name:'Guest',email:crypto.randomUUID()+'@guest.invalid',password:crypto.randomBytes(32).toString('hex')},'student');
          db.prepare('INSERT INTO guest_users VALUES(?,?)').run(guest.id,Date.now()+12*3600000);
          return respond(res,201,login(res,guest));
        }
        if(req.method==='POST'&&['/api/setup','/api/register','/api/login'].includes(route)) {
          limit(req,route);
          if(route==='/api/setup') {
            if(db.prepare("SELECT id FROM users WHERE role='teacher' LIMIT 1").get())throw error(403,'Initial setup is complete.');
            if(body.token!==setupToken)throw error(403,'A valid setup key is required.');
            return respond(res,201,login(res,addUser(body,'teacher')));
          }
          if(route==='/api/register') {
            if(body.role==='teacher'){
              const token=String(body.invitation||'').trim(),hash=crypto.createHash('sha256').update(token).digest('hex');
              const first=!db.prepare("SELECT id FROM users WHERE role='teacher' LIMIT 1").get();
              const invitation=db.prepare('SELECT token FROM teacher_invites WHERE token=? AND expires>?').get(hash,Date.now());
              if(!(first&&token===setupToken)&&!invitation)throw error(403,'Enter a valid teacher invitation or first-teacher setup key.');
              db.exec('BEGIN');let teacher;
              try{teacher=addUser(body,'teacher');if(invitation)db.prepare('DELETE FROM teacher_invites WHERE token=?').run(hash);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
              return respond(res,201,login(res,teacher));
            }
            if(body.role && body.role!=='student')throw error(403,'Choose Student or Teacher.');
            const teacher=db.prepare("SELECT id FROM users WHERE class_code=? AND role='teacher'").get(String(body.classCode||'').trim().toUpperCase());
            if(!teacher)throw error(400,'The class code is not valid.');
            return respond(res,201,login(res,addUser(body,'student',teacher.id)));
          }
          const candidate=db.prepare('SELECT * FROM users WHERE email=?').get(String(body.email||'').trim().toLowerCase());
          const password=String(body.password||'');
          if(password.length>128)throw error(401,'Email, password or account type is incorrect.');
          const valid=checkPassword(password,candidate?.password||'00000000000000000000000000000000:'+ '00'.repeat(64));
          if(!candidate||!valid||body.role!==candidate.role)throw error(401,'Email, password or account type is incorrect.');
          return respond(res,200,login(res,candidate));
        }
        if(!user)throw error(401,'Sign in to continue.');
        if(req.method==='POST'&&req.headers['x-csrf-token']!==user.csrf)throw error(403,'Session verification failed. Reload and try again.');
        if(route==='/api/logout'&&req.method==='POST'){
          if(publicUser(user).guest)removeGuest(user.id);
          db.prepare('DELETE FROM sessions WHERE token=?').run(user.token);res.setHeader('Set-Cookie','physics_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return respond(res,200,{ok:true});
        }
        if(route==='/api/teachers'&&req.method==='POST'){ensureTeacher(user);return respond(res,201,{user:publicUser(addUser(body,'teacher'))});}
        if(route==='/api/teacher-invitations'&&req.method==='POST'){
          ensureTeacher(user);limit(req,route);
          const token=crypto.randomBytes(24).toString('hex'),expires=Date.now()+7*24*3600000;
          db.prepare('DELETE FROM teacher_invites WHERE expires<=?').run(Date.now());
          db.prepare('INSERT INTO teacher_invites VALUES(?,?)').run(crypto.createHash('sha256').update(token).digest('hex'),expires);
          return respond(res,201,{invitation:token,expires});
        }
        if(route==='/api/gradebook'&&req.method==='GET') {
          ensureTeacher(user);
          const students=db.prepare("SELECT id,name,email FROM users WHERE teacher_id=? AND role='student' ORDER BY name").all(user.id);
          const topics=getBank(user).topics;
          for(const student of students){
            const studentUser=db.prepare('SELECT * FROM users WHERE id=?').get(student.id),bank=getBank(studentUser),records=progress(student.id);
            student.progress=bank.questions.filter(q=>records[q.id]).map(q=>({id:q.id,title:q.title,topic:q.topic,type:q.type,level:q.level,marks:q.marks,...records[q.id]}));
            student.attempted=student.progress.filter(p=>p.attempted).length;
            student.mastered=student.progress.filter(p=>p.mastered).length;
            student.hints=student.progress.reduce((n,p)=>n+p.hintCount,0);
            student.hintedQuestions=student.progress.filter(p=>p.hintCount>0).length;
            student.selfAssessed=student.progress.filter(p=>p.type==='written'&&p.attempted).length;
            student.total=bank.questions.length;
          }
          return respond(res,200,{students,topics});
        }
        const bank=getBank(user);
        if(route==='/api/challenge'&&['GET','POST'].includes(req.method))return respond(res,200,challenge(user,bank,req.method==='POST'?body:undefined));
        if(route==='/api/questions'&&req.method==='GET') {
          const records=progress(user.id);return respond(res,200,{topics:bank.topics,questions:bank.questions.map(q=>publicQuestion(q,records[q.id])),progress:records});
        }
        const match=route.match(/^\/api\/(answer|draft|hints|solution|self-assess)\/([\w-]+)$/);
        if(match&&req.method==='POST') {
          const [,action,id]=match,q=bank.questions.find(q=>q.id===id);
          if(!q)throw error(404,'Question not found.');
          if(action==='solution')throw error(403,'Show solution is temporarily disabled. Submit your answer to receive feedback.');
          ensureRow(user.id,id);const now=new Date().toISOString();
          if(action==='draft'){
            if(typeof body.answer!=='string'||body.answer.length>12000)throw error(400,'Answer is too long.');
            db.prepare('UPDATE progress SET answer=?,updated=? WHERE user_id=? AND question_id=?').run(body.answer,now,user.id,id);
          }else if(action==='hints'){
            db.prepare('UPDATE progress SET hints=MIN(3,hints+1),updated=? WHERE user_id=? AND question_id=?').run(now,user.id,id);
          }else if(action==='solution'){
            db.prepare('UPDATE progress SET solution_seen=1,updated=? WHERE user_id=? AND question_id=?').run(now,user.id,id);
          }else if(action==='self-assess'){
            if(q.type!=='written'||!Array.isArray(body.points)||body.points.some(p=>!Number.isInteger(p)||p<0||p>=q.steps.length))throw error(400,'Invalid marking points.');
            const existing=progress(user.id)[id];if(!existing.draft.trim())throw error(400,'Write your answer first.');
            const points=[...new Set(body.points)];
            db.prepare('UPDATE progress SET points=?,mastered=?,attempts=MAX(1,attempts),updated=? WHERE user_id=? AND question_id=?').run(JSON.stringify(points),points.length===q.steps.length?1:0,now,user.id,id);
          }else {
            const answer=String(body.answer??'').trim();if(!answer||answer.length>12000)throw error(400,'Enter an answer first (up to 12,000 characters).');
            let correct=false;
            if(q.type==='numeric') {const n=parseNumber(answer);if(!Number.isFinite(n))throw error(400,'Enter a valid number without units.');correct=Math.abs(n-q.answer)<=Math.abs(q.answer)*0.015+1e-30;}
            if(q.type==='choice') {if(!/^\d+$/.test(answer)||Number(answer)>=q.options.length)throw error(400,'Choose an answer.');correct=Number(answer)===q.answer;}
            db.prepare('UPDATE progress SET answer=?,attempts=attempts+1,mastered=MAX(mastered,?),updated=? WHERE user_id=? AND question_id=?').run(answer,correct?1:0,now,user.id,id);
            return respond(res,200,{correct,selfAssessed:q.type==='written',steps:correct||q.type==='written'?q.steps:undefined,progress:progress(user.id)[id]});
          }
          const record=progress(user.id)[id];
          return respond(res,200,{progress:record,hints:q.hints.slice(0,record.hintCount),steps:action==='solution'?q.steps:undefined});
        }
        throw error(404,'Not found.');
      }
      if(req.method!=='GET'&&req.method!=='HEAD')throw error(405,'Method not allowed.');
      const staticPath=route==='/'?'index.html':decodeURIComponent(route.slice(1));
      const allowed=['index.html','a-level.html','home.js','rewards.js','pet.js','pet.css','combined-science.html','gcse-chemistry.html','gcse-biology.html','gcse.html','gcse.js','gcse-bank.js','gcse-challenge.js','gcse-notes-data.js','gcse-notes.js','gcse-views.js','courses.css','style.css','app.js','school.js','math-format.js','notes.js','notes-view.js','challenge.js','questions.js','extra-calculations.js','extra-explanations.js','practical-questions.js','static-bank.js','question-random.js'];
      if(['questions.js','extra-calculations.js','extra-explanations.js','practical-questions.js','static-bank.js'].includes(staticPath)&&req.headers['sec-fetch-dest']!=='script')throw error(404,'Not found.');
      const poster=/^assets\/gcse-posters\/(?:energy|electricity|particle-model|atomic-structure|forces|waves|magnetism|space)\.png$/.test(staticPath)||/^assets\/alevel-posters\/(?:measurements|particles|waves|mechanics|electricity|further-mechanics|fields|nuclear|astrophysics|practical-skills)\.png$/.test(staticPath);
      if(!allowed.includes(staticPath)&&!poster&&!/^vendor\/katex\/dist\/(?:katex\.min\.(?:js|css)|fonts\/[A-Za-z0-9_-]+\.(?:woff2?|ttf))$/.test(staticPath))throw error(404,'Not found.');
      const file=path.join(__dirname,staticPath);if(!fs.existsSync(file))throw error(404,'Not found.');
      const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'}[path.extname(file)];
      res.writeHead(200,{'Content-Type':mime,'Cache-Control':'no-cache'});if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
    }catch(e){if(!res.headersSent)respond(res,e.status||500,{error:e.status?e.message:'The server could not complete the request.'});else res.end();if(!e.status)console.error(e);}
  });
  return {server,db,setupToken,close:()=>new Promise(resolve=>server.close(()=>{db.close();resolve();}))};
}
if(require.main===module){
  const app=createApp(),port=Number(process.env.PORT||3000),host=process.env.HOST||'127.0.0.1';
  app.server.listen(port,host,()=>{console.log(`Physics Practice: http://${host}:${port}`);if(!app.db.prepare("SELECT id FROM users WHERE role='teacher'").get())console.log(`First teacher setup: http://${host}:${port}/#setup=${app.setupToken}`);});
}
module.exports={createApp};
