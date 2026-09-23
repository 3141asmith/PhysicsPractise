const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createApp}=require('../server.cjs'),{loadBank}=require('../bank.cjs');
const {questionPool}=require('../challenge.cjs');
test('challenge pool excludes all optional modules by default',()=>{
 const bank=loadBank('pool-test'),core=questionPool(bank,false),all=questionPool(bank,true);
 assert.deepEqual([...new Set(core.map(q=>q.topic))].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7,13]);
 assert.equal(new Set(all.map(q=>q.topic)).size,14);
 assert.ok(all.length>core.length);assert.ok(all.every(q=>q.type!=='written'));
});
test('challenge scores, bounds, extreme mode, persistence, marking and replay protection',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-challenge-')),app=createApp({dataDir:dir,microsoft:null});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+app.server.address().port;
 let cookie,csrf;
 async function call(route,body,headers={}){const r=await fetch(base+route,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(cookie?{Cookie:cookie,'X-CSRF-Token':csrf}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,cookie:r.headers.get('set-cookie')?.split(';')[0],...await r.json()};}
 try{
  assert.equal((await call('/api/challenge')).status,401);
  const guest=await call('/api/guest',{});cookie=guest.cookie;csrf=guest.csrf;
  const seed=app.db.prepare('SELECT seed FROM users WHERE id=?').get(guest.user.id).seed,bank=loadBank(seed);
  let state=await call('/api/challenge');assert.equal(state.score,0);assert.equal(state.extreme,false);
  assert.ok(state.roundId);const initialRound=state.roundId;assert.equal((await call('/api/challenge')).roundId,initialRound);
  assert.equal(state.includeOptional,false);assert.ok(state.question.topic<8||state.question.topic===13);
  assert.equal((await call('/api/challenge',{action:'options',includeOptional:'yes'})).status,400);
  state=await call('/api/challenge',{action:'options',includeOptional:true});assert.equal(state.includeOptional,true);
  const optional=bank.questions.find(q=>q.type==='numeric'&&q.topic===8);
  app.db.prepare('UPDATE challenges SET question_id=?,score=25 WHERE user_id=?').run(optional.id,guest.user.id);
  assert.equal((await call('/api/challenge')).question.id,optional.id);
  state=await call('/api/challenge',{action:'options',includeOptional:false});
  assert.equal(state.score,25);assert.notEqual(state.question.id,optional.id);assert.equal(state.includeOptional,false);
  assert.equal((await call('/api/challenge',{action:'answer',questionId:optional.id,answer:'1'})).status,400);
  state=await call('/api/challenge',{action:'restart'});
  assert.notEqual(state.roundId,initialRound);
  assert.ok(!('answer' in state.question));assert.ok(!('steps' in state.question));
  async function answer(correct){
   const q=bank.questions.find(q=>q.id===state.question.id),value=correct?q.answer:q.type==='numeric'?-1e99:(q.answer+1)%q.options.length;
   state=await call('/api/challenge',{action:'answer',questionId:q.id,answer:String(value)});assert.equal(state.status,200);return state;
  }
  async function next(){state=await call('/api/challenge',{action:'next',questionId:state.question.id});assert.equal(state.status,200);}
  assert.equal((await call('/api/challenge',{action:'answer',questionId:state.question.id,answer:''})).status,400);
  assert.equal((await call('/api/challenge',{action:'next',questionId:state.question.id})).status,400);
  assert.equal((await call('/api/challenge',{action:'mode',extreme:true},{'X-CSRF-Token':''})).status,403);
  await answer(false);assert.equal(state.score,0);await next();await answer(true);assert.equal(state.score,5);
  assert.equal((await call('/api/challenge',{action:'answer',questionId:state.question.id,answer:'1'})).status,400);
  await next();await answer(false);assert.equal(state.score,0);
  for(let i=0;i<3;i++){await next();await answer(true);}assert.equal(state.score,15);
  await next();await answer(false);assert.equal(state.score,5);
  await next();await answer(true);assert.equal(state.score,10);
  state=await call('/api/challenge',{action:'mode',extreme:true});assert.equal(state.score,10);
  await next();await answer(false);assert.equal(state.score,0);
  for(let i=1;i<=20;i++){await next();await answer(true);assert.equal(state.score,i*5);}
  assert.equal((await call('/api/challenge')).score,100);
  assert.equal((await call('/api/challenge',{action:'next',questionId:state.question.id})).status,400);
  const restored=await call('/api/challenge');assert.equal(restored.roundId,state.roundId);assert.equal(restored.extreme,true);assert.equal(restored.answered,true);
  assert.ok((await call('/api/questions')).progress[state.question.id].attempts>0);
  state=await call('/api/challenge',{action:'restart'});assert.equal(state.score,0);assert.equal(state.answered,false);assert.equal(state.extreme,true);
  await call('/api/challenge',{action:'options',includeOptional:true});
  state=await call('/api/challenge',{action:'restart'});assert.equal(state.includeOptional,false);assert.ok(state.question.topic<8||state.question.topic===13);
  assert.equal((await call('/api/challenge',{action:'auto-complete'})).status,400);
  await call('/api/logout',{});assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM challenges').get().n,0);
 }finally{await app.close();fs.rmSync(dir,{recursive:true,force:true});}
});
