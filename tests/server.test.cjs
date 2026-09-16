const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const vm=require('node:vm');
const {createApp}=require('../server.cjs');
const {loadBank}=require('../bank.cjs');

test('accounts, teacher permissions, personal questions and persistent progress',async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-test-'));
  let app=createApp({dataDir:dir});
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  let base='http://127.0.0.1:'+app.server.address().port;
  async function request(route,body,session,extra={}){
    const response=await fetch(base+route,{method:body===undefined?'GET':'POST',headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(session?{Cookie:session.cookie,'X-CSRF-Token':session.csrf}:{}),...extra},body:body===undefined?undefined:JSON.stringify(body)});
    const data=await response.json();return {status:response.status,...data,cookie:response.headers.get('set-cookie')?.split(';')[0]};
  }
  const credentials=(name)=>({name,email:name+'@example.test',password:'Testing-password-123'});
  try{
    assert.equal((await request('/api/gradebook')).status,401);
    assert.equal((await request('/api/setup',{...credentials('teacher'),token:'bad'})).status,403);
    const teacher=await request('/api/setup',{...credentials('teacher'),token:app.setupToken});
    assert.equal(teacher.user.role,'teacher');
    assert.equal((await request('/api/setup',{...credentials('intruder'),token:app.setupToken})).status,403);
    assert.equal((await request('/api/register',{...credentials('fake'),role:'teacher',classCode:teacher.user.classCode})).status,403);
    const student=await request('/api/register',{...credentials('student'),classCode:teacher.user.classCode});
    const other=await request('/api/register',{...credentials('other'),classCode:teacher.user.classCode});
    assert.equal(student.user.role,'student');
    assert.equal((await request('/api/gradebook',undefined,student)).status,403);
    assert.equal((await request('/api/teachers',credentials('illegal'),student)).status,403);
    assert.equal((await request('/api/teacher-invitations',{},student)).status,403);
    const invitation=await request('/api/teacher-invitations',{},teacher);
    assert.equal(invitation.status,201);
    const registered=await request('/api/register',{...credentials('invited'),role:'teacher',invitation:invitation.invitation});
    assert.equal(registered.user.role,'teacher');
    assert.equal((await request('/api/gradebook',undefined,registered)).students.length,0);
    assert.equal((await request('/api/register',{...credentials('replay'),role:'teacher',invitation:invitation.invitation})).status,403);
    const expiredInvite=await request('/api/teacher-invitations',{},teacher);
    app.db.prepare('UPDATE teacher_invites SET expires=0').run();
    assert.equal((await request('/api/register',{...credentials('expired'),role:'teacher',invitation:expiredInvite.invitation})).status,403);
    assert.equal((await request('/api/login',{...credentials('student'),role:'teacher'})).status,401);
    const teacher2=await request('/api/teachers',credentials('teacher2'),teacher);
    assert.equal(teacher2.status,201);
    const session2=await request('/api/login',{...credentials('teacher2'),role:'teacher'});
    assert.equal((await request('/api/gradebook',undefined,session2)).students.length,0);
    const bank=await request('/api/questions',undefined,student),bank2=await request('/api/questions',undefined,other);
    assert.equal(bank.questions.length,1458);
    assert.equal(bank.topics[13],'Practical Skills');
    assert.ok(bank.questions.every(q=>!('answer' in q)&&!('steps' in q)&&!('hints' in q)));
    const q=bank.questions.find(q=>q.type==='numeric');
    assert.ok(bank.questions.filter(q=>q.type==='numeric').some(q=>q.prompt!==bank2.questions.find(x=>x.id===q.id).prompt));
    assert.deepEqual((await request('/api/questions',undefined,student)).questions,bank.questions);
    assert.equal((await request('/api/hints/'+q.id,{},student,{'X-CSRF-Token':''})).status,403);
    assert.equal((await request('/api/hints/'+q.id,{},student,{Origin:'https://evil.example'})).status,403);
    for(let n=0;n<5;n++)assert.equal((await request('/api/hints/'+q.id,{},student)).progress.hintCount,Math.min(3,n+1));
    const seed=app.db.prepare('SELECT seed FROM users WHERE id=?').get(student.user.id).seed;
    const expected=loadBank(seed).questions.find(x=>x.id===q.id).answer;
    assert.equal((await request('/api/answer/'+q.id,{answer:'-9e99',mastered:true},student)).correct,false);
    assert.equal((await request('/api/answer/'+q.id,{answer:String(expected)},student)).correct,true);
    const written=bank.questions.find(q=>q.type==='written');
    await request('/api/draft/'+written.id,{answer:'A saved explanation.'},student);
    const solution=await request('/api/solution/'+written.id,{},student);
    assert.equal((await request('/api/self-assess/'+written.id,{points:solution.steps.map((_,i)=>i)},student)).progress.mastered,true);
    const gradebook=await request('/api/gradebook',undefined,teacher),row=gradebook.students.find(s=>s.id===student.user.id);
    assert.equal(row.hints,3);assert.equal(row.hintedQuestions,1);assert.equal(row.mastered,2);assert.equal(row.selfAssessed,1);
    assert.equal(row.progress.find(p=>p.id===written.id).draft,'A saved explanation.');
    for(const route of ['/server.cjs','/bank.cjs','/questions.js','/data/physics.sqlite','/data/setup-key.txt'])assert.equal((await request(route)).status,404);
    await app.close();app=createApp({dataDir:dir});
    await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));base='http://127.0.0.1:'+app.server.address().port;
    const restored=await request('/api/questions',undefined,student);
    assert.equal(restored.progress[q.id].hintCount,3);assert.equal(restored.progress[q.id].mastered,true);
    assert.equal(restored.questions.find(x=>x.id===q.id).prompt,q.prompt);
    assert.equal((await request('/api/logout',{},student)).status,200);
    assert.equal((await request('/api/gradebook',undefined,student)).status,401);
  }finally{await app.close();fs.rmSync(dir,{recursive:true,force:true});}
});

test('guest preview works before setup, restricts access and removes temporary progress',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-guest-')),app=createApp({dataDir:dir,microsoft:null});
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 async function request(route,body,session){
  const res=await fetch(base+route,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(session?{Cookie:session.cookie,'X-CSRF-Token':session.csrf}:{})},body:body===undefined?undefined:JSON.stringify(body)});
  return {status:res.status,...await res.json(),cookie:res.headers.get('set-cookie')?.split(';')[0]};
 }
 try{
  const guest=await request('/api/guest',{role:'teacher'});
  assert.equal(guest.user.guest,true);assert.equal(guest.user.role,'student');
  assert.equal((await request('/api/gradebook',undefined,guest)).status,403);
  assert.equal((await request('/api/microsoft/start',{link:true},guest)).status,403);
  assert.equal((await request('/api/teachers',{},guest)).status,403);
  const bank=await request('/api/questions',undefined,guest);assert.equal(bank.questions.length,1458);
  const id=bank.questions[0].id;
  await request('/api/draft/'+id,{answer:'temporary answer'},guest);
  await request('/api/hints/'+id,{},guest);
  assert.equal((await request('/api/questions',undefined,guest)).progress[id].hintCount,1);
  assert.equal((await request('/api/guest',{},guest)).status,409);
  await request('/api/logout',{},guest);
  assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM users').get().n,0);
  assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM progress').get().n,0);
  const expired=await request('/api/guest',{});
  app.db.prepare('UPDATE guest_users SET expires=0').run();
  assert.equal((await request('/api/questions',undefined,expired)).status,401);
  assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM users').get().n,0);
  const firstTeacher=await request('/api/register',{name:'First Teacher',email:'first@example.test',password:'Testing-password-123',role:'teacher',invitation:app.setupToken});
  assert.equal(firstTeacher.user.role,'teacher');
  assert.equal((await request('/api/register',{name:'Second Teacher',email:'second@example.test',password:'Testing-password-123',role:'teacher',invitation:app.setupToken})).status,403);
 }finally{await app.close();fs.rmSync(dir,{recursive:true,force:true});}
});

test('all personalised questions and topic notes contain valid LaTeX',()=>{
  const katex=require('../vendor/katex/dist/katex.min.js');
  const context=vm.createContext({window:{katex},katex});
  for(const file of ['math-format.js','notes.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
  const format=vm.runInContext('PhysicsMath.format',context);
  const notes=vm.runInContext('NOTES',context);
  assert.equal(notes.length,14);
  assert.equal(notes.flatMap(note=>note.sections).filter(section=>section.reference).length,29);
  for(const note of notes){
    assert.ok(note.source.includes('A Level Textbook.pdf'));
    assert.ok(note.source.includes('version 1.2'));
    assert.equal(note.sections.at(-1).title,'Revision checkpoints');
    assert.ok(note.sections.length>=7);
  }
  assert.ok(notes[13].sections.some(section=>section.title==='Required practicals 9-12: fields and radiation'));
  for(const seed of ['test-alice','test-bob','test-carol']){
    const bank=loadBank(seed);assert.equal(new Set(bank.questions.map(q=>q.id)).size,1458);
    for(const q of bank.questions){
      if(q.type==='numeric')assert.ok(Number.isFinite(q.answer),q.id);
      for(const text of [q.prompt,...q.steps,...q.hints,...(q.options||[])])assert.doesNotThrow(()=>format(text),q.id+': '+text);
    }
  }
  const practicals=notes[13].sections.filter(section=>section.practical);
  assert.deepEqual(Array.from(practicals,section=>section.practical),Array.from({length:12},(_,i)=>i+1));
  for(const practical of practicals){
    assert.ok(practical.sourceReference.length>30);
    assert.ok(practical.sourceReference.includes('AQA-7407-7408-PH.pdf'));
    assert.match(practical.handbookPages,/^\d+-\d+$/);
    assert.deepEqual(Array.from(practical.groups,group=>group.title),['Apparatus and variables','Method','Analysis','Uncertainty and improvements','Safety']);
    assert.equal(practical.groups[1].ordered,true);
    assert.ok(practical.groups[1].points.length>=4);
    assert.ok(practical.groups[3].points.length>=3);
  }
  for(const note of notes)for(const section of note.sections){
    for(const point of [...section.points,...(section.groups||[]).flatMap(group=>group.points)])assert.doesNotThrow(()=>format(point),point);
  }
});
