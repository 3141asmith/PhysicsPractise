/* Pet progression shares the wallet's first-completion ledger, so spending
   coins, replaying answers and switching study modes cannot change its EXP. */
const ForgePet=(()=>{
  const families={
    spark:{label:'Spark · dragon',hint:'A curious little dragon.',base:['Spark','Sprout'],branches:{solar:['Flare','Sun Drake','Aurora','Solar Guardian'],storm:['Static','Storm Drake','Thunderwing','Tempest Guardian']}},
    ripple:{label:'Ripple · water sprite',hint:'A playful finned water sprite.',base:['Ripple','Bubblit'],branches:{reef:['Coralit','Reef Glider','Pearlwing','Reef Guardian'],abyss:['Deepfin','Abyss Swimmer','Moonfin','Ocean Guardian']}},
    pebble:{label:'Pebble · rock golem',hint:'A sturdy, bright-eyed rock golem.',base:['Pebble','Cobble'],branches:{crystal:['Quartzling','Crystal Golem','Prism Giant','Crystal Guardian'],grove:['Mossling','Grove Golem','Forest Giant','Woodland Guardian']}}
  };
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function profile(value={}){
    const starter=Object.hasOwn(families,value.starter)?value.starter:'spark',family=families[starter];
    return {name:typeof value.name==='string'?value.name.replace(/[\u0000-\u001f\u007f]/g,'').trim().slice(0,24):'',starter,branch:Object.hasOwn(family.branches,value.branch)?value.branch:Object.keys(family.branches)[0]};
  }
  const journey=p=>[...families[p.starter].base,...families[p.starter].branches[p.branch]];
  const milestones=[0,50,150,350,750,1550];
  let current=null,widget,dialog,settingsOpen=false,celebrationTimer;
  const motionQuery=typeof matchMedia==='function'?matchMedia('(prefers-reduced-motion: reduce)'):null;
  let motionPreference=null;
  try{motionPreference=JSON.parse(localStorage.getItem('physics-forge-pet-animation'));}catch{}
  function motionEnabled(){return typeof motionPreference==='boolean'?motionPreference:!motionQuery?.matches;}
  function applyMotion(){
    for(const el of [widget,dialog])if(el)el.dataset.petMotion=motionEnabled()?'on':'off';
    const checkbox=document.getElementById('pet-animation');if(checkbox)checkbox.checked=motionEnabled();
  }
  motionQuery?.addEventListener('change',applyMotion);
  if(typeof window!=='undefined')window.addEventListener('storage',event=>{if(event.key==='physics-forge-pet-animation'||event.key===null){try{motionPreference=JSON.parse(localStorage.getItem('physics-forge-pet-animation'));}catch{motionPreference=null;}applyMotion();}});
  function stats(completed){
    const exp=completed*10,stage=milestones.filter(n=>exp>=n).length-1;
    const level=Math.floor(Math.sqrt(exp/25))+1;
    return {completed,exp,stage,level,health:100,nextLevel:25*level*level,nextEvolution:milestones[stage+1]??null};
  }
  function creature(stage,p=profile()){
    const grown=stage>=2,elder=stage>=4,final=stage===5,size=[.58,.69,.76,.84,.91,.96][stage];
    const path=(d,cls='pet-ear')=>'<path class="'+cls+'" d="'+d+'"/>';
    let back='',front='',body='',feet='';
    if(p.starter==='spark'){
      body=grown?'M70 154Q57 127 68 91L82 64 98 76Q119 55 144 72L162 61 175 99 166 121Q192 151 154 172L89 172Z':'M67 143Q50 102 77 78L91 61 108 72Q149 55 170 98L183 116 171 127Q178 172 125 174Q80 179 67 143Z';
      if(stage>=1)front+=path('M82 75L72 39 104 65M142 65L169 35 159 82','pet-horn');
      if(grown){
        back+=path('M160 145Q205 165 198 126L217 111Q235 184 159 174Z','pet-tail');
        back+=path(stage>=3?'M77 104L31 47 18 116 39 101 49 140 79 150M163 104L209 47 222 116 201 101 191 140 161 150':'M76 115L43 78 39 126 74 148M164 115L197 78 201 126 166 148','pet-wing');
        front+=path('M92 137Q120 147 149 137M98 150Q120 158 143 150','pet-detail');
      }
      if(p.branch==='storm'&&grown){
        front+=path('M105 65L128 24 124 49 144 42 120 82 123 59Z','pet-mark');
        if(stage>=3)back+=path('M39 95L19 66 35 68 24 44 58 87ZM201 95L221 66 205 68 216 44 182 87Z','pet-mark');
        if(elder)front+=path('M76 128L93 119 88 135 101 131 84 153M164 128L147 119 152 135 139 131 156 153','pet-mark');
        if(final)back+=path('M53 49L34 22 54 30 62 14 75 55M187 49L206 22 186 30 178 14 165 55','pet-crown');
      }else if(grown){
        front+=path('M102 71Q88 47 111 24Q104 51 123 34Q153 62 134 78Z','pet-mark');
        if(stage>=3)back+=path('M32 112Q7 87 27 65Q22 89 46 98M208 112Q233 87 213 65Q218 89 194 98','pet-mark');
        if(elder)back+=path('M83 55L69 26 92 39 102 14 115 39 135 12 142 41 169 28 156 58','pet-crown');
        if(final)back+='<circle class="pet-aura" cx="120" cy="81" r="65"/>'+path('M120 5V18M53 28L65 40M187 28L175 40M40 81H25M200 81H215','pet-detail');
      }
      feet=path('M67 162Q83 152 101 163L102 176H65ZM139 163Q157 152 173 162L175 176H138Z','pet-feet');
    }else if(p.starter==='ripple'){
      body=grown?'M64 126Q54 81 98 61L120 35 142 61Q186 81 176 126Q163 153 143 157L157 175 120 164 84 175 97 157Q77 153 64 126Z':'M72 142Q52 107 82 79Q107 62 120 42Q133 62 158 79Q188 107 168 142Q150 170 120 171Q90 170 72 142Z';
      back+=path(stage>=1?'M77 105Q38 59 28 85L46 112 22 137Q56 147 80 132M163 105Q202 59 212 85L194 112 218 137Q184 147 160 132':'M76 117L44 101 56 138 83 143M164 117L196 101 184 138 157 143','pet-wing');
      if(grown&&p.branch==='abyss'){
        back+=path('M120 65Q110 10 157 22L174 44','pet-detail')+'<circle class="pet-lure" cx="175" cy="45" r="12"/>';
        front+=path('M80 134L90 139M151 139L161 134M91 147L101 150M139 150L149 147','pet-mark');
        if(stage>=3)back+=path('M84 144Q33 146 50 172Q66 194 25 174M156 144Q207 146 190 172Q174 194 215 174','pet-tail');
        if(elder)back+=path('M79 66L54 33 58 77 27 62 58 100M161 66L186 33 182 77 213 62 182 100','pet-ear');
        if(final)back+=path('M85 143Q85 183 66 185M105 153Q99 190 91 188M135 153Q141 190 149 188M155 143Q155 183 174 185','pet-detail');
      }else if(grown){
        front+=path('M105 71L91 39 76 33 81 22 101 32 108 51 116 27 128 20 133 30 125 44 130 59 150 39 157 48 142 75','pet-coral');
        if(stage>=3)back+=path('M82 145Q43 145 40 170L64 162 80 178 103 156M158 145Q197 145 200 170L176 162 160 178 137 156','pet-tail');
        if(elder)front+='<circle class="pet-pearl" cx="120" cy="70" r="10"/>'+path('M72 110L56 97M168 110L184 97','pet-detail');
        if(final)back+=path('M62 63L49 27 35 26M49 45L29 43M178 63L191 27 205 26M191 45L211 43','pet-coral');
      }
      front+=path('M108 141Q120 132 132 141L120 154Z','pet-mark');
      feet='<ellipse class="pet-feet pet-foot-left" cx="96" cy="164" rx="17" ry="7"/><ellipse class="pet-feet pet-foot-right" cx="144" cy="164" rx="17" ry="7"/>';
    }else{
      body=grown?'M66 158L61 92 80 69 86 48 150 48 158 69 179 92 174 158 150 176 89 176Z':'M66 144L59 104 77 69 107 60 148 67 178 101 173 145 151 169 91 173Z';
      if(stage>=1)back+=path(grown?'M69 87L41 77 25 97 29 140 49 156 69 137M171 87L199 77 215 97 211 140 191 156 171 137':'M69 112L47 105 36 132 54 150 74 141M171 112L193 105 204 132 186 150 166 141','pet-body');
      front+=path('M85 80L103 90 91 107M155 80L140 91 155 106M81 135L101 140 93 154M159 135L139 140 147 154','pet-detail');
      if(grown&&p.branch==='grove'){
        front+=path('M72 78Q57 42 84 43Q91 17 116 41Q138 15 153 42Q182 38 167 77L144 63 119 74 94 62Z','pet-leaf');
        if(stage>=3)back+=path('M43 92L31 50 17 38M32 60L50 45M197 92L209 50 223 38M208 60L190 45','pet-bark');
        if(elder)back+=path('M26 61Q0 46 19 30Q35 19 42 47M198 47Q205 19 221 30Q240 46 214 61','pet-leaf');
        if(final)front+=path('M87 148Q103 119 121 142Q141 117 156 149L138 158 114 151 94 163','pet-leaf')+'<circle class="pet-pearl" cx="120" cy="54" r="7"/>';
      }else if(grown){
        back+=path('M78 78L71 29 99 51 113 15 133 49 158 22 163 79','pet-crystal');
        if(stage>=3)back+=path('M44 99L24 63 51 74 63 115M196 99L216 63 189 74 177 115','pet-crystal');
        if(elder)front+=path('M107 130L120 114 137 135 122 155Z','pet-crystal');
        if(final)back+=path('M15 109L24 93 33 110 23 125ZM207 110L216 93 225 109 217 125ZM46 26L52 15 59 28 52 39ZM181 28L188 15 194 26 188 39Z','pet-crystal');
      }
      feet=path('M72 156L101 158 106 179 68 179Z','pet-feet pet-foot-left')+path('M139 158L168 156 172 179 134 179Z','pet-feet pet-foot-right');
    }
    // Keep separate foot nodes for the alternating step animation.
    if(p.starter==='spark')feet=path('M67 162Q83 152 101 163L102 176H65Z','pet-feet pet-foot-left')+path('M139 163Q157 152 173 162L175 176H138Z','pet-feet pet-foot-right');
    return '<svg viewBox="0 0 240 200" data-pet-family="'+p.starter+'" data-pet-branch="'+p.branch+'" data-pet-stage="'+stage+'" aria-hidden="true" focusable="false">'+
      '<ellipse cx="120" cy="184" rx="65" ry="8" class="pet-shadow"/><g class="pet-bob"><g transform="translate(120 180) scale('+size+') translate(-120 -180)">'+back+path(body,'pet-body')+
      (p.starter==='spark'?'<ellipse class="pet-belly" cx="122" cy="143" rx="27" ry="24"/>':'')+front+
      '<g class="pet-gaze"><g class="pet-eyes"><ellipse cx="95" cy="103" rx="'+(p.starter==='pebble'?7:8)+'" ry="'+(p.starter==='pebble'?8:12)+'"/><ellipse cx="145" cy="103" rx="8" ry="'+(p.starter==='pebble'?8:12)+'"/><circle class="pet-glint" cx="98" cy="99" r="3"/><circle class="pet-glint" cx="148" cy="99" r="3"/></g></g>'+path('M110 123Q120 133 130 123','pet-smile pet-mouth')+feet+'</g></g></svg>';
  }
  function mount(){
    if(widget)return;
    widget=document.createElement('button');widget.type='button';widget.id='forge-pet';widget.setAttribute('aria-haspopup','dialog');
    widget.onclick=()=>{settingsOpen=false;renderDialog();dialog.showModal();widget.dataset.roomOpen='true';};
    dialog=document.createElement('dialog');dialog.id='pet-room';dialog.setAttribute('aria-labelledby','pet-title');
    dialog.addEventListener('close',()=>{widget.dataset.roomOpen='false';});
    document.body.append(widget,dialog);document.body.classList.add('has-forge-pet');
  }
  function renderDialog(){
    if(!current)return;
    const s=current,course=s.course==='gcse'?'GCSE':'A Level',start=25*(s.level-1)**2;
    const stages=journey(s.profile),previousArt=dialog.querySelector('.pet-habitat svg'),artKey=[s.stage,s.profile.starter,s.profile.branch].join(':');
    const locked=!!s.profile.name,rename= s.freeEdits||!locked||s.renameTokens>0,reclass= s.freeEdits||!locked||s.reclassTokens>0;
    dialog.innerHTML=`<div class="pet-room-header"><div><p class="section-label">${course} COMPANION</p><h2 id="pet-title">${esc(s.profile.name||stages[s.stage])}</h2></div>${locked?`<button class="secondary" id="pet-settings" type="button" aria-expanded="${settingsOpen}" aria-controls="pet-customise">Settings</button>`:''}<button class="secondary" id="pet-close" type="button" autofocus>Close</button></div>
      <div class="pet-habitat">${creature(s.stage,s.profile)}<span>${stages[s.stage]} · Evolution ${s.stage+1} of ${stages.length}</span></div>
      ${locked&&s.exp>=150&&!s.branchChosen?'<p class="answer-help">Your first evolution branch is ready to choose in Settings.</p>':''}
      <form id="pet-customise" ${locked&&!settingsOpen?'hidden':''}><label for="pet-name">Pet name (up to 24 characters)</label><input id="pet-name" maxlength="24" required ${rename?'':'disabled'} value="${esc(s.profile.name)}" placeholder="Give your companion a name" autocomplete="off">
        <fieldset ${reclass?'':'disabled'}><legend>Choose your starter</legend><div class="pet-starters">${Object.entries(families).map(([id,f])=>`<label class="pet-starter"><input type="radio" name="pet-starter" value="${id}" ${s.profile.starter===id?'checked':''}>${creature(0,profile({starter:id}))}<strong>${f.label}</strong><span>${f.hint}</span></label>`).join('')}</div></fieldset>
        <label for="pet-branch">Evolution branch</label><select id="pet-branch" ${!s.freeEdits&&(s.exp<150||(s.branchChosen&&!reclass))?'disabled':''}></select><p id="pet-branch-preview" class="answer-help"></p>
        <label for="pet-form">Displayed evolution</label><select id="pet-form" ${s.freeEdits?'':'disabled'}><option value="">Use earned evolution</option>${milestones.map((_,i)=>`<option value="${i}" ${s.stageOverride===i?'selected':''}>Evolution ${i+1}</option>`).join('')}</select>
        <p class="answer-help">Your first name and starter choice are free and lock when saved. Branches unlock at 150 EXP; your first branch choice is free. Later changes use a rename token (100 coins) or a re-class token (500 coins). Tokens are spent only when a saved value changes. EXP is preserved.</p><p>Tokens: ${s.renameTokens} rename · ${s.reclassTokens} re-class</p><button id="pet-open-shop" class="secondary" type="button">Open shop</button> <button class="primary" type="submit">${locked?'Save changes':'Choose companion'}</button></form><p id="pet-save-status" role="status"></p>
      <dl class="pet-stats"><div><dt>Level</dt><dd>${s.level}</dd></div><div><dt>Total EXP</dt><dd>${s.exp}</dd></div><div><dt>Health</dt><dd>${s.health}/100</dd></div><div><dt>Questions mastered</dt><dd>${s.completed}</dd></div></dl>
      <label for="pet-level-progress">Level ${s.level+1}: ${s.nextLevel-s.exp} EXP to go</label><progress id="pet-level-progress" max="${s.nextLevel-start}" value="${s.exp-start}"></progress>
      <p>${s.nextEvolution===null?'Final form reached! Your companion keeps gaining levels.':`Next evolution: <strong>${stages[s.earnedStage+1]}</strong> at ${s.nextEvolution} EXP (${Math.ceil((s.nextEvolution-s.exp)/10)} new correct answers away).`}</p>
      <h3>Evolution journey</h3><ol class="pet-evolutions">${stages.map((name,i)=>`<li class="${i<=s.earnedStage?'unlocked':''}" ${i===s.stage?'aria-current="step"':''}><strong>${name}</strong><span>${milestones[i]} EXP · ${i<=s.stage?'Unlocked':'Locked'}</span></li>`).join('')}</ol>
      <p class="answer-help">Earn 10 EXP for each first correct completion, including challenge questions and completed written self-assessments. Previously recorded completions count too. Repeats and spending coins do not change EXP.</p><p class="answer-help">Health stays at 100: your pet never loses health while you are away. Evolution milestones grow exponentially; levels use a quadratic EXP curve. Your ${course} pet is saved with this browser’s course wallet, separately from the other course. Clearing site data resets it.</p>`;
    if(previousArt&&dialog.dataset.artKey===artKey)dialog.querySelector('.pet-habitat svg').replaceWith(previousArt);
    dialog.dataset.artKey=artKey;
    document.getElementById('pet-customise').insertAdjacentHTML('afterbegin',`<label><input id="pet-animation" type="checkbox" ${motionEnabled()?'checked':''}> Animate my pet</label><p class="answer-help">Turn on to enable movement, including when your device prefers reduced motion.</p><label><input id="pet-free-edits" type="checkbox" ${s.freeEdits?'checked':''}> Allow free name, class and evolution changes (temporary)</label><p class="answer-help">No tokens are spent while enabled. Changing the displayed evolution does not change earned EXP.</p>`);
    applyMotion();
    document.getElementById('pet-animation').onchange=event=>{motionPreference=event.target.checked;try{localStorage.setItem('physics-forge-pet-animation',JSON.stringify(motionPreference));}catch{}applyMotion();};
    document.getElementById('pet-free-edits').onchange=async event=>{try{await Rewards.savePetSettings({freeEdits:event.target.checked});}catch(error){event.target.checked=current.freeEdits;document.getElementById('pet-save-status').textContent=error.message;}};
    document.getElementById('pet-close').onclick=()=>dialog.close();
    const settings=document.getElementById('pet-settings');
    if(settings)settings.onclick=()=>{settingsOpen=!settingsOpen;document.getElementById('pet-customise').hidden=!settingsOpen;settings.setAttribute('aria-expanded',String(settingsOpen));};
    document.getElementById('pet-open-shop').onclick=()=>{dialog.close();document.getElementById('shop-open').click();};
    const form=document.getElementById('pet-customise'),select=document.getElementById('pet-branch');
    function options(){
      const starter=form.elements['pet-starter'].value,f= families[starter];
      select.innerHTML=Object.entries(f.branches).map(([id,names])=>`<option value="${id}">${id[0].toUpperCase()+id.slice(1)}: ${names[0]} → ${names[3]}</option>`).join('');
      if(starter===s.profile.starter)select.value=s.profile.branch;
      preview();
    }
    function preview(){const p=profile({starter:form.elements['pet-starter'].value,branch:select.value});document.getElementById('pet-branch-preview').textContent=journey(p).join(' → ');}
    form.querySelectorAll('[name=pet-starter]').forEach(input=>input.onchange=options);select.onchange=preview;options();
    form.onsubmit=async event=>{
      event.preventDefault();const button=form.querySelector('[type=submit]');button.disabled=true;
      document.getElementById('pet-save-status').textContent='Saving companion…';
      try{await Rewards.savePet({name:document.getElementById('pet-name').value,starter:form.elements['pet-starter'].value,branch:select.value,stageOverride:document.getElementById('pet-form').value});settingsOpen=false;renderDialog();document.getElementById('pet-save-status').textContent='Companion saved.';document.getElementById('pet-settings').focus();}
      catch(error){document.getElementById('pet-save-status').textContent=error.message;}
      finally{button.disabled=false;}
    };
  }
  function sync(data,course){
    mount();
    const previous=current;
    current={...stats(Object.values(data.completed).filter(Boolean).length),course,freeEdits:data.petSettings?.freeEdits===true,stageOverride:data.pet?.stageOverride,profile:profile(data.pet||{}),renameTokens:data.renameTokens||0,reclassTokens:data.reclassTokens||0,branchChosen:data.pet?.branchChosen??(!!data.pet?.name&&Object.values(data.completed).filter(Boolean).length>=15)};
    current.earnedStage=current.stage;
    if(current.freeEdits&&Number.isInteger(current.stageOverride)&&current.stageOverride>=0&&current.stageOverride<6)current.stage=current.stageOverride;
    const stages=journey(current.profile),name=current.profile.name||stages[current.stage];
    widget.setAttribute('aria-label',`Open ${course==='gcse'?'GCSE':'A Level'} pet: ${name}, ${stages[current.stage]}, level ${current.level}, ${current.exp} EXP`);
    const artwork=creature(current.stage,current.profile);
    const copy=`<span class="pet-widget-copy"><strong>${esc(name)}</strong><span>Lv ${current.level} · ${current.exp} EXP</span><span>${current.nextEvolution===null?'Final evolution':`${current.nextEvolution-current.exp} EXP to evolve`}</span></span>`;
    if(widget.dataset.artwork!==artwork){widget.innerHTML=artwork+copy;widget.dataset.artwork=artwork;}else widget.querySelector('.pet-widget-copy').outerHTML=copy;
    applyMotion();
    if(dialog.open)renderDialog();
    if(previous&&previous.course===course&&current.exp>previous.exp){
      if(current.level>previous.level||current.earnedStage>previous.earnedStage){
        widget.classList.remove('pet-celebrating');void widget.offsetWidth;widget.classList.add('pet-celebrating');
        clearTimeout(celebrationTimer);celebrationTimer=setTimeout(()=>widget.classList.remove('pet-celebrating'),2600);
      }
      let announcement=document.getElementById('pet-announcement');
      if(!announcement){announcement=document.createElement('span');announcement.id='pet-announcement';announcement.className='sr-only';announcement.setAttribute('role','status');document.body.append(announcement);}
      announcement.textContent=current.earnedStage>previous.earnedStage?`Your pet evolved into ${stages[current.earnedStage]}!`:'Your pet gained 10 EXP.';
    }
  }
  return {sync,stats,profile};
})();
if(typeof module!=='undefined')module.exports=ForgePet;
