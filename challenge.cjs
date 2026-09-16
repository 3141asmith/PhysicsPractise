const {randomInt}=require('node:crypto');
const {parseNumber}=require('./bank.cjs');
const questionPool=(bank,includeOptional)=>bank.questions.filter(q=>(q.type==='numeric'||q.type==='choice')&&(includeOptional||q.topic<8||q.topic===13));

function createChallenge(db){
 db.exec(`CREATE TABLE IF NOT EXISTS challenges(user_id TEXT PRIMARY KEY REFERENCES users(id),score INTEGER NOT NULL DEFAULT 0,extreme INTEGER NOT NULL DEFAULT 0,question_id TEXT NOT NULL,answered INTEGER NOT NULL DEFAULT 0,correct INTEGER,answer TEXT NOT NULL DEFAULT '')`);
 if(!db.prepare('PRAGMA table_info(challenges)').all().some(column=>column.name==='include_optional'))db.exec('ALTER TABLE challenges ADD COLUMN include_optional INTEGER NOT NULL DEFAULT 0');
 const fail=message=>Object.assign(new Error(message),{status:400});
 return (user,bank,body)=>{
  let state=db.prepare('SELECT * FROM challenges WHERE user_id=?').get(user.id);
  let pool=questionPool(bank,!!state?.include_optional);
  const pick=previous=>{const candidates=pool.filter(q=>q.id!==previous);return candidates[randomInt(candidates.length)].id;};
  if(!state){db.prepare('INSERT INTO challenges(user_id,question_id) VALUES(?,?)').run(user.id,pick());state=db.prepare('SELECT * FROM challenges WHERE user_id=?').get(user.id);}
  function replaceExcluded(){
   if(!pool.some(q=>q.id===state.question_id)){
    db.prepare("UPDATE challenges SET question_id=?,answered=0,correct=NULL,answer='' WHERE user_id=?").run(pick(state.question_id),user.id);
    state=db.prepare('SELECT * FROM challenges WHERE user_id=?').get(user.id);
   }
  }
  replaceExcluded();
  let progressRecord;
  if(body){
   if(body.action==='options'){
    if(typeof body.includeOptional!=='boolean')throw fail('Choose a valid topic selection.');
    db.prepare('UPDATE challenges SET include_optional=? WHERE user_id=?').run(body.includeOptional?1:0,user.id);
    pool=questionPool(bank,body.includeOptional);replaceExcluded();
   }else if(body.action==='mode'){
    if(typeof body.extreme!=='boolean')throw fail('Choose a valid mode.');
    db.prepare('UPDATE challenges SET extreme=? WHERE user_id=?').run(body.extreme?1:0,user.id);
   }else if(body.action==='restart'){
    pool=questionPool(bank,false);
    db.prepare("UPDATE challenges SET score=0,include_optional=0,question_id=?,answered=0,correct=NULL,answer='' WHERE user_id=?").run(pick(state.question_id),user.id);
   }else if(body.action==='next'){
    if(!state.answered||state.score===100||body.questionId!==state.question_id)throw fail('Finish the current question first.');
    db.prepare("UPDATE challenges SET question_id=?,answered=0,correct=NULL,answer='' WHERE user_id=?").run(pick(state.question_id),user.id);
   }else if(body.action==='answer'){
    if(state.answered||state.score===100||body.questionId!==state.question_id)throw fail('This question has already been submitted. Reload the challenge.');
    const q=pool.find(q=>q.id===state.question_id),answer=String(body.answer??'').trim();
    if(!answer||answer.length>12000)throw fail('Enter an answer first.');
    let correct;
    if(q.type==='numeric'){
     const n=parseNumber(answer);if(!Number.isFinite(n))throw fail('Enter a valid number without units.');
     correct=Math.abs(n-q.answer)<=Math.abs(q.answer)*0.015+1e-30;
    }else{
     if(!/^\d+$/.test(answer)||Number(answer)>=q.options.length)throw fail('Choose an answer.');
     correct=Number(answer)===q.answer;
    }
    const score=correct?Math.min(100,state.score+5):state.extreme?0:Math.max(0,state.score-10),now=new Date().toISOString();
    db.exec('BEGIN');
    try{
     db.prepare('UPDATE challenges SET score=?,answered=1,correct=?,answer=? WHERE user_id=?').run(score,correct?1:0,answer,user.id);
     db.prepare('INSERT OR IGNORE INTO progress(user_id,question_id,updated) VALUES(?,?,?)').run(user.id,q.id,now);
     db.prepare('UPDATE progress SET answer=?,attempts=attempts+1,mastered=MAX(mastered,?),updated=? WHERE user_id=? AND question_id=?').run(answer,correct?1:0,now,user.id,q.id);
     db.exec('COMMIT');
    }catch(e){db.exec('ROLLBACK');throw e;}
    const row=db.prepare('SELECT * FROM progress WHERE user_id=? AND question_id=?').get(user.id,q.id);
    progressRecord={draft:row.answer,attempted:true,attempts:row.attempts,mastered:!!row.mastered,points:JSON.parse(row.points),hintCount:row.hints,solutionSeen:!!row.solution_seen,updated:row.updated};
   }else throw fail('Unknown challenge action.');
   state=db.prepare('SELECT * FROM challenges WHERE user_id=?').get(user.id);
  }
  const {answer,steps,hints,...question}=pool.find(q=>q.id===state.question_id);
  return {score:state.score,includeOptional:!!state.include_optional,extreme:!!state.extreme,answered:!!state.answered,correct:state.correct===null?null:!!state.correct,answer:state.answer,question,progressRecord};
 };
}
module.exports={createChallenge,questionPool};
