function startPractice(bank) {
  const $=id=>document.getElementById(id), QUESTIONS=bank.questions, TOPICS=bank.topics;
  const escapeHtml=School.escapeHtml, math=PhysicsMath.format;
  const savedMessage=School.user.guest?'Progress saved for this temporary guest session':'Progress saved to your account';
  let saved=bank.progress,topic='all',level='All',selected=null;
  const feedback={},timers=new Map(),pending=new Map();
  let mutations=Promise.resolve(),inFlight=0;
  const mutate=(action,id,body={})=>{
    inFlight++;
    const operation=mutations.catch(()=>{}).then(()=>School.api('/api/'+action+'/'+id,body)).finally(()=>inFlight--);
    mutations=operation;
    return operation;
  };
  function record(q,result){
    if(result.progress){const draft=saved[q.id]?.draft;saved[q.id]=result.progress;if(draft!==undefined)saved[q.id].draft=draft;}
    if(result.steps)q.steps=result.steps;
    if(result.hints)q.revealedHints=result.hints;
    $('completed').textContent=QUESTIONS.filter(q=>saved[q.id]?.mastered).length;
    $('save-status').textContent=savedMessage;
  }
  function error(message){$('save-status').textContent=message;}
  function filtered(){
    const terms=$('search').value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return QUESTIONS.filter(q=>(topic==='all'||q.topic===topic)&&(level==='All'||q.level===level)&&(!$('unfinished').checked||!saved[q.id]?.mastered)&&terms.every(term=>(q.title+' '+q.prompt+' '+TOPICS[q.topic]+' '+q.level).toLowerCase().includes(term)));
  }
  async function flush(id){
    clearTimeout(timers.get(id));timers.delete(id);
    if(!pending.has(id))return;
    const answer=pending.get(id);pending.delete(id);
    try{await mutate('draft',id,{answer});$('save-status').textContent=savedMessage;}
    catch(e){if(!pending.has(id))pending.set(id,answer);error('Not saved: '+e.message);throw e;}
  }
  async function flushAll(){for(const id of [...pending.keys()])await flush(id);await mutations.catch(()=>{});if(pending.size)throw new Error('Some answers are not saved. Try again before signing out.');}
  function draft(q,value){
    saved[q.id]={...saved[q.id],draft:value};pending.set(q.id,value);
    $('save-status').textContent='Saving...';clearTimeout(timers.get(q.id));
    timers.set(q.id,setTimeout(()=>flush(q.id).catch(()=>{}),400));
  }
  function renderTopics(){
    $('topics').innerHTML='<button class="topic-button '+(topic==='all'?'active':'')+'" data-topic="all">All topics <small>'+QUESTIONS.length+'</small></button>'+TOPICS.map((name,i)=>'<button class="topic-button '+(topic===i?'active':'')+'" data-topic="'+i+'" aria-pressed="'+(topic===i)+'"><span>'+escapeHtml(name)+'</span><small>'+QUESTIONS.filter(q=>q.topic===i).length+'</small></button>').join('');
    $('topics').querySelectorAll('button').forEach(b=>b.onclick=()=>{topic=b.dataset.topic==='all'?'all':Number(b.dataset.topic);selected=null;if(School.view==='notes')School.showNotes(topic==='all'?null:topic);else{School.setView('practice');render();}renderTopics();});
  }
  function renderList(list){
    $('question-list').innerHTML=list.map(q=>'<button class="question-link '+(selected===q.id?'active':'')+'" data-id="'+q.id+'"><span class="mini-meta"><span class="badge '+q.level+'">'+q.level+'</span><span>'+(saved[q.id]?.mastered?'Mastered':q.marks+' marks')+'</span></span><strong>'+escapeHtml(q.title)+'</strong><span class="question-preview">'+math(q.prompt)+'</span><small>'+escapeHtml(TOPICS[q.topic])+' &middot; '+(q.type==='written'?'Written response':q.type==='choice'?'Multiple choice':'Calculation')+(saved[q.id]?.hintCount?' &middot; '+saved[q.id].hintCount+' hints used':'')+'</small></button>').join('');
    $('question-list').querySelectorAll('button').forEach(b=>b.onclick=()=>{selected=b.dataset.id;render();});
  }
  function render(){
    const list=filtered();if(!list.some(q=>q.id===selected))selected=null;
    document.querySelector('.practice-layout').classList.toggle('browsing',!selected);
    $('back-to-questions').hidden=!selected;$('question').hidden=!selected&&!!list.length;
    document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(level===b.dataset.level)));
    $('topic-title').textContent=topic==='all'?'All topics':TOPICS[topic];$('count').textContent=list.length+' questions';
    $('completed').textContent=QUESTIONS.filter(q=>saved[q.id]?.mastered).length;renderTopics();renderList(list);
    if(!list.length){$('question').innerHTML='<div class="empty"><h2>No matching questions</h2><p>Try changing your filters.</p></div>';return;}
    if(!selected){$('question').innerHTML='';return;}
    const q=list.find(q=>q.id===selected),index=list.indexOf(q),value=saved[q.id]?.draft||'';
    const answer=q.type==='choice'?'<fieldset class="choices"><legend>Your answer</legend>'+q.options.map((option,i)=>'<label class="choice"><input name="answer" type="radio" value="'+i+'" '+(value===String(i)?'checked':'')+'><span>'+math(option)+'</span></label>').join('')+'</fieldset>':q.type==='written'?'<label class="answer-label" for="answer">Your explanation</label><textarea id="answer" maxlength="12000">'+escapeHtml(value)+'</textarea>':'<label class="answer-label" for="answer">Your answer</label><div class="answer-row"><input id="answer" autocomplete="off" maxlength="12000" value="'+escapeHtml(value)+'"><span class="unit">'+PhysicsMath.unit(q.unit)+'</span></div><p class="answer-help">Use the unit shown. Scientific notation such as 2.5e-3 is accepted.</p>';
    $('question').innerHTML='<article class="question-sheet"><div class="question-top"><span class="badge '+q.level+'">'+q.level+'</span><span>'+q.marks+' marks</span></div><h2>'+escapeHtml(q.title)+'</h2><p class="prompt">'+math(q.prompt)+'</p><form id="answer-form">'+answer+'<div class="actions"><button type="submit" class="primary">'+(q.type==='written'?'Compare answer':'Check answer')+'</button><button type="button" id="reveal" class="secondary">'+(q.steps?'Hide solution':'View solution')+'</button><button type="button" id="hint" class="secondary">Hint</button></div></form><div id="feedback" aria-live="polite">'+(feedback[q.id]||'')+'</div><section id="hints" aria-live="polite"></section><div id="solution"></div><div class="question-bottom"><a id="question-notes" href="#notes/'+q.topic+'">Read '+escapeHtml(TOPICS[q.topic])+' notes &rarr;</a><div><button id="prev" class="secondary" title="Previous question" '+(!index?'disabled':'')+'>&larr;</button> <button id="next" class="secondary" title="Next question" '+(index===list.length-1?'disabled':'')+'>&rarr;</button></div></div></article>';
    const getAnswer=()=>q.type==='choice'?$('answer-form').querySelector('input:checked')?.value||'':$('answer').value;
    $('answer-form').oninput=()=>draft(q,getAnswer());
    $('answer-form').onsubmit=async e=>{
      e.preventDefault();const answer=getAnswer(),button=e.submitter||$('answer-form').querySelector('[type=submit]');button.disabled=true;
      try{await flush(q.id);const result=await mutate('answer',q.id,{answer});record(q,result);feedback[q.id]='<div class="feedback '+(result.correct?'correct':'')+'">'+(result.selfAssessed?'Compare your response with the marking points. This is a self-assessment.':result.correct?'Correct answer. Review your method below.':'Not quite. Check your units and working, then try again.')+'</div>';if(selected===q.id){$('feedback').innerHTML=feedback[q.id];renderSolution(q);}}
      catch(e){if(selected===q.id)$('feedback').textContent=e.message;}finally{button.disabled=false;}
    };
    $('reveal').onclick=async()=>{
      if(q.steps){delete q.steps;render();return;}
      const button=$('reveal');button.disabled=true;
      try{const result=await mutate('solution',q.id);record(q,result);if(selected===q.id)renderSolution(q);}
      catch(e){error(e.message);}finally{button.disabled=false;}
    };
    $('hint').onclick=async()=>{
      const button=$('hint');button.disabled=true;
      try{const result=await mutate('hints',q.id);record(q,result);if(selected===q.id)renderHints(q);}
      catch(e){error(e.message);button.disabled=false;}
    };
    $('prev').onclick=()=>{selected=list[index-1].id;render();};$('next').onclick=()=>{selected=list[index+1].id;render();};
    $('question-notes').onclick=e=>{e.preventDefault();School.showNotes(q.topic,q.id);};
    renderHints(q);renderSolution(q);
  }
  function renderHints(q){
    const count=saved[q.id]?.hintCount||0;
    $('hint').textContent=count>=3?'3 of 3 hints used':'Hint ('+count+'/3 used)';$('hint').disabled=count>=3;
    $('hints').innerHTML=count?'<h3>Hints</h3><ol>'+q.revealedHints.map(h=>'<li>'+math(h)+'</li>').join('')+'</ol>':'';
  }
  function renderSolution(q){
    $('reveal').textContent=q.steps?'Hide solution':'View solution';
    if(!q.steps){$('solution').innerHTML='';return;}
    $('solution').innerHTML='<section class="solution"><h3>'+(q.type==='written'?'Marking points (self-assessed)':'Worked solution')+'</h3>'+(q.type==='written'?q.steps.map((s,i)=>'<label class="choice"><input class="mark-point" type="checkbox" value="'+i+'" '+(saved[q.id]?.points?.includes(i)?'checked':'')+'><span>'+math(s)+'</span></label>').join(''):'<ol>'+q.steps.map(s=>'<li>'+math(s)+'</li>').join('')+'</ol>')+'</section>';
    $('solution').querySelectorAll('.mark-point').forEach(box=>box.onchange=async()=>{
      const points=[...$('solution').querySelectorAll('.mark-point:checked')].map(b=>Number(b.value));
      try{await flush(q.id);record(q,await mutate('self-assess',q.id,{points}));}
      catch(e){error(e.message);if(selected===q.id)renderSolution(q);}
    });
  }
  $('difficulty').onclick=e=>{const b=e.target.closest('[data-level]');if(b){level=b.dataset.level;selected=null;render();}};
  $('search').oninput=()=>{selected=null;render();};$('unfinished').onchange=()=>{selected=null;render();};
  $('clear-filters').onclick=()=>{topic='all';level='All';selected=null;$('search').value='';$('unfinished').checked=false;render();};
  $('back-to-questions').onclick=()=>{selected=null;render();};
  window.addEventListener('beforeunload',e=>{if(pending.size||inFlight){e.preventDefault();e.returnValue='';}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)flushAll().catch(()=>{});});
  $('save-status').textContent=savedMessage;render();
  return {flushAll,render,setTopic:i=>{topic=i;selected=null;render();},open:id=>{topic='all';level='All';$('search').value='';$('unfinished').checked=false;selected=id;School.setView('practice');render();},topics:TOPICS};
}
