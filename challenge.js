const Challenge=(()=>{
 let state,busy=false;
 const host=()=>document.getElementById('challenge-view');
 async function action(body){
  if(busy)return;busy=true;
  host().querySelectorAll('button,input').forEach(el=>el.disabled=true);
  try{
   state=await School.api('/api/challenge',body);
   if(state.progressRecord)School.bank.progress[state.question.id]=state.progressRecord;
   render();
  }catch(e){
   host().querySelectorAll('button,input').forEach(el=>el.disabled=false);
   document.getElementById('challenge-error').textContent=e.message;
  }finally{busy=false;}
 }
 function render(){
  const esc=School.escapeHtml,q=state.question,done=state.score===100;
  host().innerHTML='<div class="challenge-layout"><section class="challenge-options" aria-label="Challenge topics"><h2>Topics</h2><p>AS &amp; A2 core content</p><label><input id="include-optional" type="checkbox" '+(state.includeOptional?'checked':'')+'> Include optional modules</label><ul>'+School.bank.topics.slice(8,13).map(topic=>'<li>'+esc(topic)+'</li>').join('')+'</ul></section><div class="challenge-main">'+'<div class="heading"><div><div class="section-label">PHYSICS PRACTICE</div><h1>Challenge mode</h1></div><label class="challenge-toggle"><input id="extreme-mode" type="checkbox" '+(state.extreme?'checked':'')+'> Extreme mode</label></div><div class="challenge-progress"><div><label for="challenge-progress">Challenge progress</label><strong id="challenge-percent">'+state.score+'%</strong></div><progress id="challenge-progress" max="100" value="'+state.score+'">'+state.score+'%</progress><p class="answer-help">'+(state.extreme?'Correct: +5%. Incorrect: back to 0%.':'Correct: +5%. Incorrect: -10%.')+'</p></div><p id="challenge-error" role="alert"></p>'+(done?'<section class="challenge-complete"><h2>Challenge complete</h2><p>You reached 100%.</p><button id="challenge-restart" class="primary">New challenge</button></section>':'<article class="challenge-question"><div class="question-top"><span class="badge '+q.level+'">'+esc(q.level)+'</span><span>'+esc(School.bank.topics[q.topic])+'</span></div><h2>'+esc(q.title)+'</h2><p class="prompt">'+PhysicsMath.format(q.prompt)+'</p><form id="challenge-form">'+(q.type==='numeric'?'<label class="answer-label" for="challenge-answer">Your answer</label><div class="answer-row"><input id="challenge-answer" maxlength="12000" autocomplete="off" required value="'+esc(state.answer)+'" '+(state.answered?'disabled':'')+'><span class="unit">'+PhysicsMath.unit(q.unit)+'</span></div>':'<fieldset class="choices"><legend>Your answer</legend>'+q.options.map((option,i)=>'<label class="choice"><input type="radio" name="challenge-answer" value="'+i+'" required '+(state.answer===String(i)?'checked':'')+' '+(state.answered?'disabled':'')+'><span>'+PhysicsMath.format(option)+'</span></label>').join('')+'</fieldset>')+'<div class="actions">'+(state.answered?'<button id="challenge-next" type="button" class="primary">Next question &rarr;</button>':'<button type="submit" class="primary">Check answer</button>')+'</div></form>'+(state.answered?'<p class="feedback '+(state.correct?'correct':'')+'" role="status">'+(state.correct?'Correct. +5%.':state.extreme?'Incorrect. Progress reset to 0%.':'Incorrect. -10%, with a minimum of 0%.')+'</p>':'')+'</article>')+'<p id="challenge-announcement" class="sr-only" role="status">Progress: '+state.score+'%'+(done?'. Challenge complete.':'')+'</p>'+'</div></div>';
  document.getElementById('include-optional').onchange=e=>action({action:'options',includeOptional:e.target.checked});
  document.getElementById('extreme-mode').onchange=e=>action({action:'mode',extreme:e.target.checked});
  if(done){Rewards.mountPrize(host().querySelector('.challenge-complete'),state);document.getElementById('challenge-restart').onclick=()=>action({action:'restart'});return;}
  if(state.answered)document.getElementById('challenge-next').onclick=()=>action({action:'next',questionId:q.id});
  document.getElementById('challenge-form').onsubmit=e=>{e.preventDefault();const answer=q.type==='numeric'?document.getElementById('challenge-answer').value:host().querySelector('[name="challenge-answer"]:checked')?.value;action({action:'answer',questionId:q.id,answer});};
 }
 async function open(){
  School.setView('challenge');history.replaceState(null,'','#challenge');
  host().innerHTML='<p role="status">Loading challenge...</p><p id="challenge-error" role="alert"></p>';
  await action();
 }
 return {open};
})();
