const School = {
  user:null,csrf:null,practice:null,view:'practice',bank:null,
  roleView:'student',gradebookRequest:0,
  staticMode:!!window.STATIC_BANK&&(location.protocol==='file:'||location.hostname.endsWith('.github.io')||location.hostname==='physicsforge.co.uk'||location.hostname==='www.physicsforge.co.uk'||new URLSearchParams(location.search).has('static')),
  isTeacherView(){return this.user?.role==='teacher'&&this.roleView==='teacher';},
  setRoleView(value){
    if(!['student','teacher'].includes(value))return;
    this.roleView=this.user?.role==='teacher'?value:'student';
    try{if(this.user?.role==='teacher')sessionStorage.setItem('physics-role-view:'+this.user.id,this.roleView);}catch{}
    document.getElementById('role-view-switch').hidden=this.user?.role!=='teacher';
    document.querySelectorAll('[data-role-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.roleView===this.roleView)));
    document.getElementById('gradebook-tab').hidden=!this.isTeacherView();
    if(!this.isTeacherView()){
      this.gradebookRequest++;
      document.getElementById('gradebook-view').replaceChildren();
      if(this.view==='gradebook'){
        this.setView('practice');
        this.practice?.render();
        history.replaceState(null,'','#practice');
      }
    }
  },
  escapeHtml:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
  async api(url,body){
    return Rewards.perform(url,body,()=>this.request(url,body));
  },
  async request(url,body){
    if(this.staticMode)return this.staticApi(url,body);
    let response;
    const unavailable=()=>Object.assign(new Error('Cannot reach the Physics Practice server. Open the running app rather than index.html or a static preview, and check that the server is running.'),{serverUnavailable:true});
    if(location.protocol==='file:')throw unavailable();
    try{response=await fetch(url,{method:body===undefined?'GET':'POST',headers:body===undefined?{}:{'Content-Type':'application/json','X-CSRF-Token':this.csrf||''},body:body===undefined?undefined:JSON.stringify(body)});}catch{throw unavailable();}
    if(!response.headers.get('content-type')?.includes('application/json'))throw unavailable();
    let data;try{data=await response.json();}catch{throw unavailable();}
    if(!response.ok)throw new Error(data.error||'Request failed.');
    return data;
  },
  staticApi(url,body){
    const key='physics-practice-static-state',bank=window.STATIC_BANK;
    let stored={progress:{},challenge:null};
    try{stored=JSON.parse(localStorage.getItem(key)||'{}');}catch{}
    stored.progress=stored.progress||{};
    const save=()=>{try{localStorage.setItem(key,JSON.stringify(stored));}catch{}};
    const record=id=>stored.progress[id]||(stored.progress[id]={draft:'',attempted:false,attempts:0,mastered:false,points:[],hintCount:0,solutionSeen:false,updated:new Date().toISOString()});
    const parse=value=>{const cleaned=String(value).trim().replace(/[−\s]/g,'').replace(/[x×*]10\^/i,'e');return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(cleaned)?Number(cleaned):NaN;};
    if(url==='/api/session')return Promise.resolve({user:null,csrf:null,microsoftEnabled:false,setupRequired:false});
    if(url==='/api/questions')return Promise.resolve({topics:bank.topics,questions:bank.questions.map(q=>{
      const copy={...q},p=stored.progress[q.id];
      if(!p?.mastered&&!(q.type==='written'&&p?.attempted))delete copy.steps;
      return copy;
    }),progress:stored.progress});
    if(url==='/api/logout'){stored.progress={};stored.challenge=null;save();return Promise.resolve({ok:true});}
    if(url==='/api/guest')return Promise.resolve({user:{id:'static-guest',name:'Local learner',role:'student',guest:true},csrf:'static'});
    if(url==='/api/challenge'){
      const pool=()=>bank.questions.filter(q=>(q.type==='numeric'||q.type==='choice')&&(stored.challenge?.includeOptional||q.topic<8||q.topic===13));
      if(!stored.challenge){const options=pool();stored.challenge={score:0,includeOptional:false,extreme:false,answered:false,correct:null,answer:'',questionId:options[Math.floor(Math.random()*options.length)].id};}
      stored.challenge.roundId ||= crypto.randomUUID();
      const state=stored.challenge,q=bank.questions.find(item=>item.id===state.questionId);
      if(body?.action==='options'){state.includeOptional=!!body.includeOptional;if(!pool().some(item=>item.id===state.questionId))state.questionId=pool()[0].id;state.answered=false;state.correct=null;state.answer='';}
      else if(body?.action==='mode')state.extreme=!!body.extreme;
      else if(body?.action==='restart'){state.roundId=crypto.randomUUID();state.score=0;state.includeOptional=false;state.answered=false;state.correct=null;state.answer='';state.questionId=pool()[0].id;}
      else if(body?.action==='next'){if(!state.answered||state.score===100)throw new Error('Finish the current question first.');const options=pool().filter(item=>item.id!==state.questionId);state.questionId=options[Math.floor(Math.random()*options.length)].id;state.answered=false;state.correct=null;state.answer='';}
      else if(body?.action==='answer'){
        if(state.answered||state.score===100||body.questionId!==state.questionId)throw new Error('This question has already been submitted.');
        const answer=String(body.answer??'').trim();if(!answer)throw new Error('Enter an answer first.');
        const correct=q.type==='numeric'?Number.isFinite(parse(answer))&&Math.abs(parse(answer)-q.answer)<=Math.abs(q.answer)*0.015+1e-30:Number(answer)===q.answer;
        state.score=correct?Math.min(100,state.score+5):state.extreme?0:Math.max(0,state.score-10);state.answered=true;state.correct=correct;state.answer=answer;
        const progress=record(q.id);progress.draft=answer;progress.attempted=true;progress.attempts++;progress.mastered=progress.mastered||correct;progress.updated=new Date().toISOString();
      }
      save();return Promise.resolve({roundId:state.roundId,score:state.score,includeOptional:state.includeOptional,extreme:state.extreme,answered:state.answered,correct:state.correct,answer:state.answer,question:bank.questions.find(item=>item.id===state.questionId),progressRecord:state.answered?stored.progress[state.questionId]:undefined});
    }
    const match=url.match(/^\/api\/(answer|draft|hints|solution|self-assess)\/([\w-]+)$/);if(!match)return Promise.reject(new Error('This feature requires the school server.'));
    const [,action,id]=match,q=bank.questions.find(item=>item.id===id),progress=record(id);if(!q)return Promise.reject(new Error('Question not found.'));
    if(action==='draft')progress.draft=String(body?.answer||'');
    else if(action==='hints')progress.hintCount=Math.min(3,progress.hintCount+1);
    else if(action==='solution')throw new Error('Show solution is temporarily disabled. Submit your answer to receive feedback.');
    else if(action==='self-assess'){progress.points=[...new Set(body?.points||[])];progress.attempted=true;progress.attempts=Math.max(1,progress.attempts);progress.mastered=progress.points.length===q.steps.length;}
    else{
      const answer=String(body?.answer??'').trim();if(!answer)throw new Error('Enter an answer first.');
      const correct=q.type==='numeric'?Number.isFinite(parse(answer))&&Math.abs(parse(answer)-q.answer)<=Math.abs(q.answer)*0.015+1e-30:q.type==='choice'&&Number(answer)===q.answer;
      progress.draft=answer;progress.attempted=true;progress.attempts++;progress.mastered=progress.mastered||correct;
      progress.updated=new Date().toISOString();save();return Promise.resolve({correct,selfAssessed:q.type==='written',steps:correct||q.type==='written'?q.steps:undefined,progress});
    }
    progress.updated=new Date().toISOString();save();return Promise.resolve({progress,hints:q.hints.slice(0,progress.hintCount),steps:action==='solution'?q.steps:undefined});
  },
  setView(view){
    if(view==='gradebook'&&!this.isTeacherView())return;
    this.view=view;
    const landing=document.getElementById('landing-screen');
    const school=document.getElementById('school-screen');
    landing.hidden=view!=='landing';
    school.hidden=view==='landing';
    for(const name of ['practice','notes','challenge','gradebook'])document.getElementById(name+'-view').hidden=name!==view;
    document.querySelector('aside').hidden=['landing','gradebook','challenge'].includes(view);
    document.querySelector('.layout').classList.toggle('gradebook-layout',['landing','gradebook','challenge'].includes(view));
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-current',b.dataset.view===view?'page':'false'));
  },
  showNotes(topic=null,returnQuestion=null){
    this.setView('notes');const host=document.getElementById('notes-view'),esc=this.escapeHtml;
    if(topic===null){history.replaceState(null,'','#notes');host.innerHTML=NotesView.index(this.bank.topics);host.querySelectorAll('[data-note]').forEach(b=>b.onclick=()=>this.showNotes(Number(b.dataset.note)));return;}
    if(!Number.isInteger(topic)||!NOTES[topic])return;
    const note=NOTES[topic];history.replaceState(null,'','#notes/'+topic);
    host.innerHTML=NotesView.topic(note,this.bank.topics[topic],topic,returnQuestion);
    NotesView.drawAll();
    host.querySelectorAll('.notes-toc a').forEach(link=>link.onclick=event=>{event.preventDefault();document.getElementById(link.getAttribute('href').slice(1)).scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
    document.getElementById('notes-home').onclick=()=>this.showNotes();
    document.getElementById('return-practice').onclick=()=>{history.replaceState(null,'','#practice');this.setView('practice');if(returnQuestion)this.practice.open(returnQuestion);else this.practice.setTopic(topic);};
  },
  openLanding(target='practice'){
    if(target==='practice'){this.setView('practice');this.practice?.render();history.replaceState(null,'','#practice');return;}
    if(target==='notes'){this.showNotes();return;}
    if(target==='challenge'){Challenge.open();return;}
  },
  async gradebook(){
    if(!this.isTeacherView())return;
    const request=++this.gradebookRequest;
    this.setView('gradebook');const host=document.getElementById('gradebook-view'),esc=this.escapeHtml;
    host.innerHTML='<h1>Gradebook</h1><p role="status">Loading class progress...</p>';
    try{
      const {students,topics}=await this.api('/api/gradebook');
      if(request!==this.gradebookRequest||!this.isTeacherView())return;
      host.innerHTML='<div class="heading"><div><div class="section-label">TEACHER VIEW</div><h1>Class gradebook</h1><p>Class code: <strong>'+esc(this.user.classCode)+'</strong></p></div><div class="actions"><button id="refresh-gradebook" class="secondary">Refresh</button><button id="export-gradebook" class="secondary">Export CSV</button></div></div><p class="answer-help">Numerical answers are checked by the server. Written responses are self-assessed. Mastery is a practice indicator, not an exam grade.</p><div class="table-scroll"><table><thead><tr><th>Student</th><th>Attempted</th><th>Mastered</th><th>Hints used</th><th>Questions with hints</th><th>Written self-assessments</th></tr></thead><tbody>'+students.map((s,i)=>'<tr><td><button class="student-link" data-student="'+i+'">'+esc(s.name)+'</button><small>'+esc(s.email)+'</small></td><td>'+s.attempted+'</td><td>'+s.mastered+' / '+s.total+'</td><td>'+s.hints+'</td><td>'+s.hintedQuestions+'</td><td>'+s.selfAssessed+'</td></tr>').join('')+'</tbody></table></div>'+(!students.length?'<p>No students have joined this class yet.</p>':'')+'<section id="student-detail"></section><details class="teacher-admin"><summary>Create another teacher account</summary><form id="teacher-form"><label>Name<input name="name" required minlength="2" maxlength="100"></label><label>Email<input name="email" type="email" required></label><label>Initial password<input name="password" type="password" required minlength="12" maxlength="128" autocomplete="new-password"></label><button class="primary">Create teacher</button><p id="teacher-result" role="status"></p></form></details>';
      document.getElementById('refresh-gradebook').onclick=()=>this.gradebook();
      const admin=host.querySelector('.teacher-admin');
      admin.insertAdjacentHTML('beforebegin','<section class="teacher-admin"><h2>Invite a teacher</h2><button id="invite-teacher" class="secondary">Create invitation</button><div id="teacher-invitation-result" role="status"></div></section>');
      document.getElementById('invite-teacher').onclick=async event=>{
        const button=event.currentTarget,result=document.getElementById('teacher-invitation-result');button.disabled=true;
        try{const invite=await this.api('/api/teacher-invitations',{});result.innerHTML='<label for="invitation-code">Single-use invitation</label><input id="invitation-code" readonly value="'+esc(invite.invitation)+'"><p>Expires '+esc(new Date(invite.expires).toLocaleString())+'. Share privately with the teacher.</p>';}
        catch(e){result.textContent=e.message;}finally{button.disabled=false;}
      };
      document.getElementById('export-gradebook').onclick=()=>{
        const quote=value=>'"'+String(value).replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';
        const rows=[['Student','Email','Attempted','Mastered','Total','Hints used','Questions with hints','Written self-assessments'],...students.map(s=>[s.name,s.email,s.attempted,s.mastered,s.total,s.hints,s.hintedQuestions,s.selfAssessed])];
        const url=URL.createObjectURL(new Blob([rows.map(row=>row.map(quote).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='physics-gradebook.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      };
      host.querySelectorAll('[data-student]').forEach(button=>button.onclick=()=>{
        const s=students[Number(button.dataset.student)],detail=document.getElementById('student-detail');
        detail.innerHTML='<h2>'+esc(s.name)+' &middot; question progress</h2><div class="table-scroll"><table><thead><tr><th>Question / topic</th><th>Response</th><th>Attempts</th><th>Status</th><th>Hints</th><th>Solution viewed</th><th>Last update</th></tr></thead><tbody>'+s.progress.map(p=>'<tr><td>'+esc(p.title)+'<small>'+esc(topics[p.topic])+'</small></td><td class="response-cell">'+esc(p.draft)+'</td><td>'+p.attempts+'</td><td>'+(p.mastered?'Mastered':p.attempted?'Attempted':'Draft')+(p.type==='written'?' (self-assessed)':'')+'</td><td>'+p.hintCount+' / 3</td><td>'+(p.solutionSeen?'Yes':'No')+'</td><td>'+esc(new Date(p.updated).toLocaleString())+'</td></tr>').join('')+'</tbody></table></div>'+(!s.progress.length?'<p>No activity recorded.</p>':'');detail.scrollIntoView({block:'start',behavior:'smooth'});
      });
      document.getElementById('teacher-form').onsubmit=async event=>{event.preventDefault();const form=event.currentTarget,button=form.querySelector('button');button.disabled=true;try{const result=await this.api('/api/teachers',Object.fromEntries(new FormData(form)));form.reset();document.getElementById('teacher-result').textContent='Teacher created. Their class code is '+result.user.classCode;}catch(e){document.getElementById('teacher-result').textContent=e.message;}finally{button.disabled=false;}};
    }catch(e){if(request===this.gradebookRequest&&this.isTeacherView())host.textContent=e.message;}
  }
};

(() => {
 const $=id=>document.getElementById(id);
 const enquiries=$('enquiries-dialog'),enquiryForm=$('enquiries-form');
 const closeEnquiries=()=>{if(enquiries.open)enquiries.close();};
 $('enquiries-open').onclick=()=>{enquiries.showModal();$('enquiry-message').focus();};
 $('enquiries-close').onclick=closeEnquiries;$('enquiries-cancel').onclick=closeEnquiries;
 enquiryForm.onsubmit=event=>{
   event.preventDefault();
   const message=$('enquiry-message').value.trim();
   if(!message){$('enquiries-error').textContent='Please describe the bug, question or change request.';return;}
   const type=$('enquiry-type').value,topic=$('enquiry-topic').value.trim()||'Not specified',contact=$('enquiry-contact').value.trim()||'Not provided';
  const body=['Hello Physics Forge,','',`Type: ${type}`,`Topic/page: ${topic}`,`Reply-to: ${contact}`,'',message,'','---','Sent from Physics Forge','Page: '+location.href].join('\n');
  location.href='mailto:enquiry@physicsforge.co.uk?subject='+encodeURIComponent('[Physics Forge] '+type+': '+topic)+'&body='+encodeURIComponent(body);
   closeEnquiries();
 };
 let mode='login',microsoftEnabled=false,setupToken=location.hash.startsWith('#setup=')?location.hash.slice(7):'';
 const microsoftResult=location.hash.startsWith('#microsoft=')?location.hash.slice(11):'';
 const microsoftMessages={expired:'Microsoft sign-in expired. Please try again.',cancelled:'Microsoft sign-in was cancelled.',tenant:'Use an account from the school Microsoft tenant.','already-linked':'This Microsoft account or site account is already connected.','join-or-link':'For an existing account, sign in with your password and choose Connect Microsoft 365. New students should select Create account, choose Student and enter their class code.',failed:'Microsoft sign-in could not be completed. Please try again or contact your school administrator.',success:'Microsoft sign-in completed.'};
 if(microsoftResult)history.replaceState(null,'','#practice');
 async function microsoftSignIn(link){
   const button=$(link?'microsoft-connect':'microsoft-signin'),status=$(link?'global-status':'account-error');button.disabled=true;
   try{
     if(link)await School.practice?.flushAll();
     const classCode=!link&&mode==='register'?$('class-code').value.trim():'';
     if(!link&&mode==='register'&&!classCode)throw new Error('Enter your class code first.');
     const result=await School.api('/api/microsoft/start',{link,classCode});location.assign(result.url);
   }catch(e){status.textContent=e.message;button.disabled=false;}
 }
 $('microsoft-signin').onclick=()=>microsoftSignIn(false);
 $('microsoft-connect').onclick=()=>microsoftSignIn(true);
 function setMode(value){
   const teacher=value==='register'&&$('account-role').value==='teacher',student=value==='register'&&!teacher;
   $('microsoft-option').hidden=value==='setup'||teacher;$('microsoft-signin').textContent=value==='register'?'Join with Microsoft 365':'Sign in with Microsoft 365';
   mode=value;const joining=value!=='login';$('name-field').hidden=!joining;$('account-name').required=joining;$('class-field').hidden=!student;$('class-code').required=student;$('role-field').hidden=value==='setup';$('password-rule').hidden=!joining;$('account-password').minLength=joining?12:1;$('account-password').autocomplete=joining?'new-password':'current-password';
   $('invitation-field').hidden=!teacher;$('teacher-invitation').required=teacher;
   $('account-title').textContent=value==='setup'?'Create the first teacher account':joining?'Create '+(teacher?'teacher':'student')+' account':'Sign in';$('account-submit').textContent=joining?'Create account':'Sign in';$('account-error').textContent='';
   document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(value===b.dataset.mode)));
 }
 async function enter(session){
   School.user=session.user;School.csrf=session.csrf;
   $('microsoft-connect').hidden=!microsoftEnabled||session.user.microsoftLinked||session.user.guest;
   if(session.user.guest)$('global-status').textContent='Guest mode. Progress is temporary and is removed when you leave or after 12 hours.';
  $('logout').textContent=session.user.guest?'Leave guest mode':'Sign out';
  if(School.staticMode){$('logout').hidden=true;$('user-name').textContent='';$('global-status').textContent='';}
   const bank=await School.api('/api/questions');School.bank=bank;
  $('account-screen').hidden=true;$('school-screen').hidden=false;$('logout').hidden=School.staticMode;$('user-name').textContent=School.staticMode?'':School.user.name+' ('+School.user.role+')';$('gradebook-tab').hidden=School.user.role!=='teacher';
   School.practice=startPractice(bank);
   let roleView=School.user.role==='teacher'?'teacher':'student';
   try{if(School.user.role==='teacher'&&sessionStorage.getItem('physics-role-view:'+School.user.id)==='student')roleView='student';}catch{}
   School.setRoleView(roleView);
   if(location.hash.startsWith('#notes/'))School.showNotes(Number(location.hash.slice(7)));else if(location.hash==='#notes')School.showNotes();else if(location.hash==='#challenge')Challenge.open();else if(location.hash==='#landing'||!location.hash||location.hash==='#')School.setView('landing');else School.setView('practice');
 }
 $('account-tabs').onclick=e=>{if(e.target.dataset.mode)setMode(e.target.dataset.mode);};
 $('account-role').onchange=()=>setMode(mode);
 document.querySelectorAll('[data-role-view]').forEach(button=>button.onclick=()=>School.setRoleView(button.dataset.roleView));
 $('skip-login').onclick=async()=>{
   $('skip-login').disabled=true;$('account-error').textContent='';
   if(location.protocol==='file:'){location.assign($('local-app-link').href+'#guest');return;}
   try{const existing=await School.api('/api/session');const session=existing.user?existing:await School.api('/api/guest',{});history.replaceState(null,'','#landing');await enter(session);}
   catch(e){$('account-error').textContent=e.message;if(e.serverUnavailable&&['localhost','127.0.0.1','[::1]'].includes(location.hostname))$('server-help').hidden=false;}finally{$('skip-login').disabled=false;}
 };
 $('account-form').onsubmit=async event=>{
   event.preventDefault();$('account-submit').disabled=true;$('account-error').textContent='';
   try{
     const body={name:$('account-name').value,email:$('account-email').value,password:$('account-password').value,role:$('account-role').value,invitation:$('teacher-invitation').value,classCode:$('class-code').value,token:setupToken};
     const session=await School.api('/api/'+(mode==='setup'?'setup':mode==='register'?'register':'login'),body);
     if(mode==='setup')history.replaceState(null,'','#landing');
     $('account-password').value='';await enter(session);
   }catch(e){$('account-error').textContent=e.message;}finally{$('account-submit').disabled=false;}
 };
 $('logout').onclick=async()=>{try{await School.practice?.flushAll();await School.api('/api/logout',{});location.reload();}catch(e){$('global-status').textContent=e.message;}};
 document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{if(b.dataset.view==='gradebook')School.gradebook();else if(b.dataset.view==='notes')School.showNotes();else if(b.dataset.view==='challenge')Challenge.open();else{School.setView('practice');School.practice.render();history.replaceState(null,'','#practice');}});
 document.querySelectorAll('[data-landing]').forEach(button=>button.onclick=()=>School.openLanding(button.dataset.landing));
 document.querySelectorAll('[data-carousel]').forEach(carousel=>{
   const track=carousel.querySelector('.landing-track');
   const slides=[...carousel.querySelectorAll('.landing-slide')];
   if(!track||!slides.length)return;
   let index=0; let timer=null;
   const sync=()=>{
     track.style.transform='translateX(-'+(index*100)+'%)';
     document.querySelectorAll('.carousel-dot').forEach((dot,i)=>dot.classList.toggle('active',i===index));
     slides.forEach((slide,i)=>{
       const card=slide.querySelector('.landing-card');
       if(card)card.style.animation=i===index?'cardReveal .6s ease both':'none';
     });
   };
   const go=(nextIndex)=>{index=(nextIndex+slides.length)%slides.length;sync();};
   const startAuto=()=>{clearInterval(timer);timer=setInterval(()=>go(index+1),4200);};
   document.querySelectorAll('.carousel-button').forEach(button=>button.onclick=()=>{go(index+(button.dataset.carouselDir==='next'?1:-1));startAuto();});
   document.querySelectorAll('.carousel-dot').forEach(dot=>dot.onclick=()=>{go(Number(dot.dataset.slide)||0);startAuto();});
   carousel.addEventListener('mouseenter',()=>clearInterval(timer));
   carousel.addEventListener('mouseleave',startAuto);
   document.addEventListener('visibilitychange',()=>document.hidden?clearInterval(timer):startAuto());
   sync();
   startAuto();
 });
 if(School.staticMode){
   $('account-screen').hidden=true;$('account-tabs').hidden=true;$('account-form').hidden=true;
   $('skip-login').click();return;
 }
 if(location.protocol==='file:'){$('account-error').textContent='This is a file preview. Skip for now will open guest practice on the local app server.';$('server-help').hidden=false;return;}
 School.api('/api/session').then(async session=>{
   microsoftEnabled=!!session.microsoftEnabled;$('microsoft-signin').disabled=!microsoftEnabled;$('microsoft-status').hidden=microsoftEnabled;
   if(microsoftResult)(session.user?$('global-status'):$('account-error')).textContent=microsoftMessages[microsoftResult]||microsoftMessages.failed;
   if(session.user)return enter(session);
   if(location.hash==='#guest')return $('skip-login').click();
   if(session.setupRequired&&setupToken){$('account-tabs').hidden=true;setMode('setup');}
   else if(session.setupRequired)$('account-error').textContent='Teacher setup is required. Open the setup link printed by the server.';
 }).catch(e=>{$('account-error').textContent=e.message;if(e.serverUnavailable&&['localhost','127.0.0.1','[::1]'].includes(location.hostname))$('server-help').hidden=false;});
})();
