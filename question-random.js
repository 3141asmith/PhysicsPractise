/* One saved browser seed makes generated prompts, marking and resumed drafts agree.
   Integer parameters stay inside each author's tested generator range. */
const QuestionRandom=(()=>{
  let seed;
  try{seed=localStorage.getItem('physics-forge-question-seed-v1');}catch{}
  if(!seed){seed=Array.from(crypto.getRandomValues(new Uint32Array(4))).join('-');try{localStorage.setItem('physics-forge-question-seed-v1',seed);}catch{}}
  function hash(text){let h=2166136261;for(const c of seed+':'+text)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}
  function parameter(course,topic,key,index,max){
    // Shuffle each family: every slot has random data without duplicate variants.
    const values=Array.from({length:max},(_,i)=>i+1);
    for(let i=max-1;i>0;i--){const j=hash(`${course}:${topic}:${key}:${i}`)%(i+1);[values[i],values[j]]=[values[j],values[i]];}
    return values[(index-1)%max];
  }
  return {hash,parameter};
})();
function STUDENT_VARIANT(topic,key,index){return QuestionRandom.parameter('alevel',topic,key,index,10);}
function GCSE_VARIANT(topic,key,index){return QuestionRandom.parameter('gcse',topic,key,index,5);}
