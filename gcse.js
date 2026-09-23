'use strict';
const GCSEPractice = (() => {
  const {questions,topics,slugs}=GCSE_BANK, $=id=>document.getElementById(id);
  const storageKey='physics-forge-gcse-progress-v1';
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let progress={},selected=null,topic='all',queue=Promise.resolve(),busy=false;
  const read=()=>JSON.parse(localStorage.getItem(storageKey)||'{}');
  const write=data=>{localStorage.setItem(storageKey,JSON.stringify(data));progress=data;};
  const blank=()=>({draft:'',mastered:false,hintCount:0,points:[],solutionSeen:false});
  const parse=value=>{
    const cleaned=String(value).trim().replace(/−/g,'-');
    return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(cleaned)?Number(cleaned):NaN;
  };
  function transaction(work) {
    const run=()=>navigator.locks?navigator.locks.request(storageKey,work):work();
    const next=queue.catch(()=>{}).then(run);queue=next;return next;
  }
  async function request(url,body={}) {
    if(url==='/api/questions')return {progress:read()};
    if(url==='/api/challenge')return transaction(()=>{
      const key='physics-forge-gcse-challenge-v1',params=new URLSearchParams(location.search);
      let state=JSON.parse(localStorage.getItem(key)||'null');
      if(!state)state={score:0,extreme:false,answered:false,answer:'',correct:null,course:params.get('course')==='combined'?'combined':'physics',tier:params.get('tier')==='foundation'?'foundation':'higher',questionId:null};
      const pool=()=>questions.filter(q=>q.type==='numeric'&&(state.course==='physics'||!q.physicsOnly)&&(state.tier==='higher'||!q.higher));
      const next=()=>{const choices=pool().filter(q=>q.id!==state.questionId);state.questionId=choices[Math.floor(Math.random()*choices.length)].id;state.answered=false;state.answer='';state.correct=null;};
      if(!pool().some(q=>q.id===state.questionId))next();
      let record;
      if(body.action==='restart'){state.score=0;next();}
      else if(body.action==='mode')state.extreme=!!body.extreme;
      else if(body.action==='options'){
        if(!['combined','physics'].includes(body.course)||!['foundation','higher'].includes(body.tier))throw Error('Choose a valid course and tier.');
        state.course=body.course;state.tier=body.tier;
        if(!pool().some(q=>q.id===state.questionId))next();
      }else if(body.action==='next'){
        if(!state.answered||state.score===100)throw Error('Finish this question before continuing.');next();
      }else if(body.action==='answer'){
        if(state.answered||state.score===100||body.questionId!==state.questionId)throw Error('This question is no longer accepting answers.');
        const value=parse(body.answer);if(!Number.isFinite(value))throw Error('Enter a valid number without units.');
        const q=questions.find(q=>q.id===state.questionId);
        state.correct=Math.abs(value-q.answer)<=Math.max(Math.abs(q.answer)*0.015,1e-9);
        state.score=state.correct?Math.min(100,state.score+5):state.extreme?0:Math.max(0,state.score-10);
        state.answered=true;state.answer=String(body.answer);
        const all=read();record=all[q.id]||blank();record.draft=state.answer;record.mastered=record.mastered||state.correct;all[q.id]=record;write(all);
      }
      localStorage.setItem(key,JSON.stringify(state));
      return {...state,question:questions.find(q=>q.id===state.questionId),progressRecord:record};
    });
    const match=url.match(/^\/api\/(answer|self-assess|hints|solution|draft)\/([\w-]+)$/);
    if(!match)throw Error('Unknown question action.');
    const [,action,id]=match,q=questions.find(q=>q.id===id);
    if(!q)throw Error('Question not found.');
    if(action==='solution')throw Error('Show solution is temporarily disabled. Submit your answer to receive feedback.');
    return transaction(()=>{
      const all=read(),p=all[id]||blank();all[id]=p;
      let correct=false;
      if(action==='draft')p.draft=String(body.answer||'').slice(0,12000);
      if(action==='solution')p.solutionSeen=true;
      if(action==='hints')p.hintCount=Math.min(q.hints.length,p.hintCount+1);
      if(action==='answer'){
        const answer=String(body.answer??'').trim();
        if(!answer)throw Error('Enter an answer first.');
        if(answer.length>12000)throw Error('Keep your answer within 12000 characters.');
        if(q.type==='numeric'){
          const number=parse(answer);
          if(!Number.isFinite(number))throw Error('Enter a number without units. Scientific notation such as 2.5e3 is accepted.');
          correct=Math.abs(number-q.answer)<=Math.max(Math.abs(q.answer)*0.015,1e-9);
        }
        p.draft=answer;p.mastered=p.mastered||correct;
        if(correct||q.type==='written')p.solutionSeen=true;
      }
      if(action==='self-assess'){
        if(q.type!=='written'||!p.draft.trim()||!p.solutionSeen)throw Error('Write and compare your answer first.');
        const points=body.points;
        if(!Array.isArray(points)||points.some(i=>!Number.isInteger(i)||i<0||i>=q.steps.length))throw Error('Invalid marking points.');
        p.points=[...new Set(points)];p.mastered=p.mastered||p.points.length===q.steps.length;
      }
      write(all);
      return {correct,progress:{...p},hints:q.hints.slice(0,p.hintCount),selfAssessed:q.type==='written'};
    });
  }
  const api=(url,body)=>Rewards.perform(url,body,()=>request(url,body),()=>request('/api/questions'));
  function eligible(q){return ($('gcse-course').value==='physics'||!q.physicsOnly)&&($('gcse-tier').value==='higher'||!q.higher)&&($('gcse-paper').value==='all'||Number($('gcse-paper').value)===q.paper);}
  function matches(q){return eligible(q)&&(topic==='all'||q.topic===Number(topic))&&(!$('gcse-unfinished').checked||!progress[q.id]?.mastered)&&(q.title+' '+q.prompt+' '+topics[q.topic]).toLowerCase().includes($('gcse-search').value.trim().toLowerCase());}
  const tags=q=>`<span class="gcse-tag">Paper ${q.paper}</span><span class="gcse-tag ${q.physicsOnly?'extra':''}">${q.physicsOnly?'Physics only':'Both courses'}</span><span class="gcse-tag ${q.higher?'higher':''}">${q.higher?'Higher only':'Foundation & Higher'}</span>`;
  const topicStats=pool=>'<small class="topic-stats"><span>'+pool.length+' questions</span><span>'+pool.filter(q=>progress[q.id]?.mastered).length+' correct</span></small>';
  function sidebar(){
    const pool=questions.filter(eligible);
    $('gcse-topic-nav').innerHTML=`<button class="topic-button ${topic==='all'?'active':''}" data-topic="all" aria-pressed="${topic==='all'}">All topics ${topicStats(pool)}</button>`+topics.map((name,i)=>{
      const topicPool=pool.filter(q=>q.topic===i),count=topicPool.length;
      return count?`<button class="topic-button ${Number(topic)===i?'active':''}" data-topic="${i}" aria-pressed="${topic===String(i)}"><span>${esc(name)}${i===7?' · Physics only':''}</span>${topicStats(topicPool)}</button>`:'';
    }).join('');
  }
  function locationState(){
    const url=new URL(location.href);
    for(const name of ['course','tier','paper'])url.searchParams.set(name,$('gcse-'+name).value);
    url.searchParams.set('topic',topic);
    if(selected)url.searchParams.set('question',selected);else url.searchParams.delete('question');
    try{history.replaceState(null,'',url);}catch{}
  }
  function render(){
    sidebar();
    const list=questions.filter(matches);
    if(!list.some(q=>q.id===selected))selected=null;
    $('gcse-count').textContent=`${list.length} questions · ${list.filter(q=>progress[q.id]?.mastered).length} completed`;
    $('gcse-topic-title').textContent=topic==='all'?'All topics':topics[Number(topic)];
    $('gcse-back').hidden=!selected;$('gcse-question-list').hidden=!!selected;$('gcse-question').hidden=!selected;
    $('gcse-question-list').innerHTML=list.length?list.map(q=>`<button class="question-link" data-question="${q.id}"><span>${tags(q)}</span><strong>${esc(q.title)}</strong><span class="gcse-preview">${esc(q.prompt)}</span><small>${q.type==='numeric'?'Calculation':'Written · self-assessed'} · ${progress[q.id]?.mastered?'<span class="mastered-status">Completed<span class="mastered-tick" aria-hidden="true">&#10003;</span></span>':topics[q.topic]}</small></button>`).join(''):'<p class="empty">No questions match these filters. Try another topic or clear the filters.</p>';
    if(selected)renderQuestion(questions.find(q=>q.id===selected));
    locationState();
  }
  function renderQuestion(q){
    const p=progress[q.id]||blank(),number=questions.filter(matches).findIndex(x=>x.id===q.id)+1;
    $('gcse-question').innerHTML=`<article class="question-sheet"><div>${tags(q)}</div><h2>${esc(q.title)}</h2><p class="prompt">${esc(q.prompt)}</p>
      <form id="gcse-answer-form"><label class="answer-label" for="gcse-answer">${q.type==='numeric'?'Answer in '+esc(q.unit):'Your explanation'}</label>
      ${q.type==='numeric'?`<input id="gcse-answer" inputmode="decimal" autocomplete="off" maxlength="12000" value="${esc(p.draft)}">`:`<textarea id="gcse-answer" rows="5" maxlength="12000">${esc(p.draft)}</textarea>`}
      <p class="answer-help">${q.type==='numeric'?'Numerical answers allow 1.5% rounding tolerance. Enter the number without units.':'Written work is self-assessed against marking points; it is not automatically graded.'}</p>
      <div class="actions"><button class="primary" type="submit">${q.type==='numeric'?'Check answer':'Compare answer'}</button><button id="gcse-hint" class="secondary" type="button" ${p.hintCount>=3?'disabled':''}>${p.hintCount>=3?'All hints unlocked':p.hintCount===0?'Free hint':'Use 1 hint credit'} (${p.hintCount}/3)</button><button id="gcse-solution" class="secondary" disabled title="Solutions are temporarily disabled" type="button">Show solution</button></div></form>
      <p id="gcse-feedback" role="status">${p.mastered?'Completed':''}</p>
      <section aria-label="Hints">${p.hintCount?'<h3>Hints</h3><ol>'+q.hints.slice(0,p.hintCount).map(h=>'<li>'+esc(h)+'</li>').join('')+'</ol>':''}</section>
      ${p.solutionSeen?`<section class="solution"><h3>${q.type==='written'?'Self-assessment marking points':'Worked solution'}</h3>${q.type==='written'?q.steps.map((step,i)=>`<label class="choice"><input type="checkbox" data-mark="${i}" ${p.points.includes(i)?'checked':''} ${!p.draft.trim()?'disabled':''}><span>${esc(step)}</span></label>`).join(''):'<ol>'+q.steps.map(step=>'<li>'+esc(step)+'</li>').join('')+'</ol>'}</section>`:''}
      <div class="question-bottom"><span>Question ${number} · AQA Physics §${esc(q.spec)}<br><a href="https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/specification/subject-content/${slugs[q.topic]}" target="_blank" rel="noopener">Physics specification ↗</a> · <a href="https://www.aqa.org.uk/subjects/science/gcse/science-8464/specification/physics-subject-content" target="_blank" rel="noopener">Trilogy specification ↗</a></span><button id="gcse-next" class="secondary" type="button">Next question →</button></div></article>`;
    $('gcse-answer').oninput=()=>api('/api/draft/'+q.id,{answer:$('gcse-answer').value}).catch(showError);
    $('gcse-answer-form').onsubmit=e=>{e.preventDefault();act('answer',q,{answer:$('gcse-answer').value});};
    $('gcse-hint').onclick=()=>act('hints',q);
    $('gcse-solution').onclick=()=>act('solution',q);
    $('gcse-question').querySelectorAll('[data-mark]').forEach(input=>input.onchange=()=>act('self-assess',q,{points:[...$('gcse-question').querySelectorAll('[data-mark]:checked')].map(el=>Number(el.dataset.mark))}));
    const list=questions.filter(matches),index=list.findIndex(x=>x.id===q.id);
    $('gcse-next').disabled=index===list.length-1;
    $('gcse-next').onclick=()=>{selected=list[index+1].id;render();};
  }
  function showError(error){$('gcse-save-status').textContent=error.message||'Could not save progress in this browser.';}
  async function act(action,q,body={}){
    if(busy)return;busy=true;
    $('gcse-question').querySelectorAll('button,input,textarea').forEach(el=>el.disabled=true);
    try{
      const result=await api('/api/'+action+'/'+q.id,body);progress=read();
      if(selected===q.id){render();if($('gcse-feedback'))$('gcse-feedback').textContent=action==='answer'?(result.selfAssessed?'Compare your explanation and tick only the points you covered.':result.correct?'Correct. Review the worked solution below.':'Not quite. Check your working and try again.'):action==='self-assess'?'Self-assessment saved.':action==='hints'?'Hint unlocked.':'Solution shown.';}
      $('gcse-save-status').textContent='Progress saved in this browser.';
    }catch(error){if(selected===q.id)renderQuestion(q);showError(error);}finally{busy=false;}
  }
  document.addEventListener('DOMContentLoaded',async()=>{
    try{
      if(!localStorage.getItem('physics-forge-gcse-randomised-v1')){
        const records=read();
        for(const q of questions)if(q.type==='numeric'&&records[q.id])Object.assign(records[q.id],{draft:'',solutionSeen:false});
        write(records);localStorage.removeItem('physics-forge-gcse-challenge-v1');
        localStorage.setItem('physics-forge-gcse-randomised-v1','1');
      }
    }catch{}
    const params=new URLSearchParams(location.search);
    for(const name of ['course','tier','paper']){const control=$('gcse-'+name);if([...control.options].some(o=>o.value===params.get(name)))control.value=params.get(name);}
    topic=/^[0-7]$/.test(params.get('topic'))?params.get('topic'):'all';selected=params.get('question');
    try{progress=(await api('/api/questions')).progress;}catch(error){showError(error);}
    if(topic!=='all'&&!questions.some(q=>q.topic===Number(topic)&&eligible(q)))topic='all';
    $('gcse-topic-nav').onclick=event=>{const button=event.target.closest('[data-topic]');if(button){topic=button.dataset.topic;selected=null;render();}};
    $('gcse-question-list').onclick=event=>{const button=event.target.closest('[data-question]');if(button){selected=button.dataset.question;render();$('gcse-answer').focus();}};
    for(const name of ['course','tier','paper'])$('gcse-'+name).onchange=()=>{topic='all';selected=null;render();};
    $('gcse-search').oninput=()=>{selected=null;render();};$('gcse-unfinished').onchange=()=>{selected=null;render();};
    $('gcse-back').onclick=()=>{selected=null;render();};
    $('gcse-clear').onclick=()=>{topic='all';selected=null;$('gcse-search').value='';$('gcse-unfinished').checked=false;$('gcse-paper').value='all';render();};
    window.addEventListener('storage',event=>{if(event.key===storageKey&&!busy){try{progress=read();render();}catch(error){showError(error);}}});
    render();
  });
  return {api,request,parse,refresh:()=>{progress=read();render();}};
})();
