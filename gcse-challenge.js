const GCSEChallenge=(()=>{
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state,busy=false;
  async function action(body){
    if(busy)return;busy=true;
    $('gcse-challenge-view').querySelectorAll('button,input,select').forEach(el=>el.disabled=true);
    try{state=await GCSEPractice.api('/api/challenge',body);render();}
    catch(error){if(state)render();$('gcse-challenge-error').textContent=error.message;}
    finally{busy=false;}
  }
  function render(){
    const q=state.question,done=state.score===100;
    $('gcse-challenge-view').innerHTML=`<div class="challenge-layout"><section class="challenge-options" aria-label="Challenge topics"><h2>Topics</h2>
      <label for="challenge-course">Course</label><select id="challenge-course"><option value="physics">GCSE Physics</option><option value="combined">Combined Science: Trilogy</option></select>
      <label for="challenge-tier">Tier</label><select id="challenge-tier"><option value="higher">Higher (includes Foundation)</option><option value="foundation">Foundation</option></select>
      <ul>${GCSE_BANK.topics.filter((_,i)=>GCSE_BANK.questions.some(q=>q.topic===i&&q.type==='numeric'&&(state.course==='physics'||!q.physicsOnly)&&(state.tier==='higher'||!q.higher))).map(t=>'<li>'+esc(t)+'</li>').join('')}</ul>
      <p class="answer-help">Automatically marked calculations only. Written self-assessments do not affect challenge scores. Course and tier choices apply to this challenge.</p></section>
      <div class="challenge-main"><div class="heading"><div><div class="section-label">GCSE PHYSICS</div><h1>Challenge mode</h1></div><label class="challenge-toggle"><input id="gcse-extreme" type="checkbox" ${state.extreme?'checked':''}> Extreme mode</label></div>
      <div class="challenge-progress"><div><label for="gcse-challenge-progress">Challenge progress</label><strong id="gcse-challenge-percent">${state.score}%</strong></div><progress id="gcse-challenge-progress" max="100" value="${state.score}">${state.score}%</progress><p class="answer-help">${state.extreme?'Correct: +5%. Incorrect: back to 0%.':'Correct: +5%. Incorrect: -10%, with a minimum of 0%.'}</p></div>
      <p id="gcse-challenge-error" role="alert"></p>
      ${done?'<section class="challenge-complete"><h2>Challenge complete</h2><p>You reached 100%.</p><button id="gcse-challenge-restart" class="primary">New challenge</button></section>':`<article class="challenge-question"><div class="question-top"><span class="gcse-tag ${q.physicsOnly?'extra':''}">${q.physicsOnly?'Physics only':'Both courses'}</span><span class="gcse-tag ${q.higher?'higher':''}">${q.higher?'Higher only':'Foundation & Higher'}</span><span>${esc(GCSE_BANK.topics[q.topic])}</span></div><h2>${esc(q.title)}</h2><p class="prompt">${esc(q.prompt)}</p>
      <form id="gcse-challenge-form"><label class="answer-label" for="gcse-challenge-answer">Your answer</label><div class="answer-row"><input id="gcse-challenge-answer" maxlength="12000" autocomplete="off" inputmode="decimal" required value="${esc(state.answer)}" ${state.answered?'disabled':''}><span class="unit">${esc(q.unit)}</span></div><div class="actions">${state.answered?'<button id="gcse-challenge-next" type="button" class="primary">Next question →</button>':'<button class="primary" type="submit">Check answer</button>'}</div></form>
      ${state.answered?`<p class="feedback ${state.correct?'correct':''}" role="status">${state.correct?'Correct. +5%.':state.extreme?'Incorrect. Progress reset to 0%.':'Incorrect. -10%, with a minimum of 0%.'}</p>`:''}</article>`}
      <p class="answer-help">First correct completions earn 5 GCSE coins. Questions already completed in practice or challenge do not earn coins again. Challenge progress is saved in this browser.</p>
      <p class="sr-only" role="status">Progress: ${state.score}%${done?'. Challenge complete.':''}</p></div></div>`;
    $('challenge-course').value=state.course;$('challenge-tier').value=state.tier;
    for(const id of ['challenge-course','challenge-tier'])$(id).onchange=()=>action({action:'options',course:$('challenge-course').value,tier:$('challenge-tier').value});
    $('gcse-extreme').onchange=e=>action({action:'mode',extreme:e.target.checked});
    if(done){Rewards.mountPrize($('gcse-challenge-view').querySelector('.challenge-complete'),state);$('gcse-challenge-restart').onclick=()=>action({action:'restart'});return;}
    if(state.answered)$('gcse-challenge-next').onclick=()=>action({action:'next'});
    $('gcse-challenge-form').onsubmit=e=>{e.preventDefault();action({action:'answer',questionId:q.id,answer:$('gcse-challenge-answer').value});};
  }
  document.addEventListener('DOMContentLoaded',()=>{
    window.addEventListener('storage',e=>{if(e.key==='physics-forge-gcse-challenge-v1'&&!$('gcse-challenge-view').hidden)action();});
  });
  return {activate:()=>action(),open:()=>GCSEViews.show('challenge')};
})();
