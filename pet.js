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
  let current=null,widget,dialog,settingsOpen=false;
  function stats(completed){
    const exp=completed*10,stage=milestones.filter(n=>exp>=n).length-1;
    const level=Math.floor(Math.sqrt(exp/25))+1;
    return {completed,exp,stage,level,health:100,nextLevel:25*level*level,nextEvolution:milestones[stage+1]??null};
  }
  function creature(stage,p=profile()){
    const size=0.65+stage*0.07;
    const extra=p.starter==='ripple'?`<path class="pet-ear" d="M69 98L27 78 43 115 69 128M171 98L213 78 197 115 171 128"/><path class="pet-mark" d="M109 64Q119 38 129 64Q119 78 109 64Z"/>`:p.starter==='pebble'?`<path class="pet-ear" d="M73 70L67 38 95 54M145 54L174 38 168 70"/><path class="pet-mark" d="M105 75L120 58 137 75 120 88Z"/>`:'';
    const branchArt=stage<2?'':p.branch==='storm'?'<path class="pet-crown" d="M119 47L140 12 130 39 150 34 126 63Z"/>':p.branch==='abyss'?'<path d="M120 60Q150 5 173 40" class="pet-smile"/><circle class="pet-mark" cx="173" cy="40" r="10"/>':p.branch==='reef'?'<path class="pet-ear" d="M102 57L90 20 107 36 116 13 124 38 142 20 137 57Z"/>':p.branch==='crystal'?'<path class="pet-crown" d="M90 60L94 23 111 50 122 12 138 48 152 28 151 65Z"/>':p.branch==='grove'?'<path class="pet-ear" d="M120 59Q68 9 74 40Q85 64 120 59Q170 5 170 35Q165 60 120 59Z"/>':'';
    return `<svg viewBox="0 0 240 200" data-pet-family="${p.starter}" data-pet-branch="${p.branch}" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="179" rx="65" ry="9" class="pet-shadow"/>
      ${stage>=4?'<g class="pet-orbit"><ellipse cx="120" cy="96" rx="104" ry="65" fill="none" stroke="currentColor" stroke-dasharray="3 9"/><circle cx="22" cy="74" r="5" fill="currentColor"/><path d="M207 25l4 9 10 4-10 4-4 10-4-10-10-4 10-4z" fill="currentColor"/></g>':''}
      <g class="pet-bob"><g transform="translate(120 165) scale(${size}) translate(-120 -165)">
      ${stage>=3?'<path class="pet-wing" d="M68 110Q5 40 22 132L58 118 73 151M172 110Q235 40 218 132L182 118 167 151"/>':''}
      ${stage>=2?'<path class="pet-tail" d="M162 139Q211 152 199 104Q234 162 162 170Z"/>':''}
      <path class="pet-body" d="${p.starter==='pebble'?'M60 140L57 85 83 55 155 55 183 85 180 143 157 174 80 174Z':p.starter==='ripple'?'M57 136Q44 88 93 61Q120 20 147 61Q196 88 183 136Q162 177 120 174Q78 177 57 136Z':'M62 138Q48 82 81 61Q120 40 159 61Q192 82 178 138Q174 177 120 174Q66 177 62 138Z'}"/>
      ${extra}${branchArt}
      ${stage>=1&&p.starter==='spark'?'<path class="pet-ear" d="M77 65Q46 15 102 53M138 53Q194 15 163 65"/>':''}
      ${stage>=3?'<path class="pet-horn" d="M93 56L98 22 111 52M129 52L142 22 147 56"/>':''}
      ${stage===5?'<path class="pet-crown" d="M95 25L91 7 111 16 120 1 129 16 149 7 145 25Z"/>':''}
      <ellipse class="pet-belly" cx="120" cy="140" rx="30" ry="22"/>
      <g class="pet-gaze"><g class="pet-eyes"><ellipse cx="95" cy="100" rx="8" ry="12"/><ellipse cx="145" cy="100" rx="8" ry="12"/><circle class="pet-glint" cx="98" cy="96" r="3"/><circle class="pet-glint" cx="148" cy="96" r="3"/></g></g>
      <path d="M110 119Q120 129 130 119" fill="none" class="pet-smile pet-mouth"/>
      <ellipse class="pet-feet pet-foot-left" cx="83" cy="167" rx="19" ry="10"/><ellipse class="pet-feet pet-foot-right" cx="157" cy="167" rx="19" ry="10"/>
      ${stage>=2?'<path class="pet-mark" d="M121 72l-9 12h9l-3 11 12-15h-10z"/>':''}
      </g></g></svg>`;
  }
  function mount(){
    if(widget)return;
    widget=document.createElement('button');widget.type='button';widget.id='forge-pet';widget.setAttribute('aria-haspopup','dialog');
    widget.onclick=()=>{settingsOpen=false;renderDialog();dialog.showModal();};
    dialog=document.createElement('dialog');dialog.id='pet-room';dialog.setAttribute('aria-labelledby','pet-title');
    document.body.append(widget,dialog);document.body.classList.add('has-forge-pet');
  }
  function renderDialog(){
    if(!current)return;
    const s=current,course=s.course==='gcse'?'GCSE':'A Level',start=25*(s.level-1)**2;
    const stages=journey(s.profile);
    const locked=!!s.profile.name,rename= !locked||s.renameTokens>0,reclass= !locked||s.reclassTokens>0;
    dialog.innerHTML=`<div class="pet-room-header"><div><p class="section-label">${course} COMPANION</p><h2 id="pet-title">${esc(s.profile.name||stages[s.stage])}</h2></div>${locked?`<button class="secondary" id="pet-settings" type="button" aria-expanded="${settingsOpen}" aria-controls="pet-customise">Settings</button>`:''}<button class="secondary" id="pet-close" type="button" autofocus>Close</button></div>
      <div class="pet-habitat">${creature(s.stage,s.profile)}<span>${stages[s.stage]} · Evolution ${s.stage+1} of ${stages.length}</span></div>
      ${locked&&s.exp>=150&&!s.branchChosen?'<p class="answer-help">Your first evolution branch is ready to choose in Settings.</p>':''}
      <form id="pet-customise" ${locked&&!settingsOpen?'hidden':''}><label for="pet-name">Pet name (up to 24 characters)</label><input id="pet-name" maxlength="24" required ${rename?'':'disabled'} value="${esc(s.profile.name)}" placeholder="Give your companion a name" autocomplete="off">
        <fieldset ${reclass?'':'disabled'}><legend>Choose your starter</legend><div class="pet-starters">${Object.entries(families).map(([id,f])=>`<label class="pet-starter"><input type="radio" name="pet-starter" value="${id}" ${s.profile.starter===id?'checked':''}>${creature(0,profile({starter:id}))}<strong>${f.label}</strong><span>${f.hint}</span></label>`).join('')}</div></fieldset>
        <label for="pet-branch">Evolution branch</label><select id="pet-branch" ${s.exp<150||(s.branchChosen&&!reclass)?'disabled':''}></select><p id="pet-branch-preview" class="answer-help"></p>
        <p class="answer-help">Your first name and starter choice are free and lock when saved. Branches unlock at 150 EXP; your first branch choice is free. Later changes use a rename token (100 coins) or a re-class token (500 coins). Tokens are spent only when a saved value changes. EXP is preserved.</p><p>Tokens: ${s.renameTokens} rename · ${s.reclassTokens} re-class</p><button id="pet-open-shop" class="secondary" type="button">Open shop</button> <button class="primary" type="submit">${locked?'Save changes':'Choose companion'}</button></form><p id="pet-save-status" role="status"></p>
      <dl class="pet-stats"><div><dt>Level</dt><dd>${s.level}</dd></div><div><dt>Total EXP</dt><dd>${s.exp}</dd></div><div><dt>Health</dt><dd>${s.health}/100</dd></div><div><dt>Questions mastered</dt><dd>${s.completed}</dd></div></dl>
      <label for="pet-level-progress">Level ${s.level+1}: ${s.nextLevel-s.exp} EXP to go</label><progress id="pet-level-progress" max="${s.nextLevel-start}" value="${s.exp-start}"></progress>
      <p>${s.nextEvolution===null?'Final form reached! Your companion keeps gaining levels.':`Next evolution: <strong>${stages[s.stage+1]}</strong> at ${s.nextEvolution} EXP (${Math.ceil((s.nextEvolution-s.exp)/10)} new correct answers away).`}</p>
      <h3>Evolution journey</h3><ol class="pet-evolutions">${stages.map((name,i)=>`<li class="${i<=s.stage?'unlocked':''}" ${i===s.stage?'aria-current="step"':''}><strong>${name}</strong><span>${milestones[i]} EXP · ${i<=s.stage?'Unlocked':'Locked'}</span></li>`).join('')}</ol>
      <p class="answer-help">Earn 10 EXP for each first correct completion, including challenge questions and completed written self-assessments. Previously recorded completions count too. Repeats and spending coins do not change EXP.</p><p class="answer-help">Health stays at 100: your pet never loses health while you are away. Evolution milestones grow exponentially; levels use a quadratic EXP curve. Your ${course} pet is saved with this browser’s course wallet, separately from the other course. Clearing site data resets it.</p>`;
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
      try{await Rewards.savePet({name:document.getElementById('pet-name').value,starter:form.elements['pet-starter'].value,branch:select.value});settingsOpen=false;renderDialog();document.getElementById('pet-save-status').textContent='Companion saved.';document.getElementById('pet-settings').focus();}
      catch(error){document.getElementById('pet-save-status').textContent=error.message;}
      finally{button.disabled=false;}
    };
  }
  function sync(data,course){
    mount();
    const previous=current;
    current={...stats(Object.values(data.completed).filter(Boolean).length),course,profile:profile(data.pet||{}),renameTokens:data.renameTokens||0,reclassTokens:data.reclassTokens||0,branchChosen:data.pet?.branchChosen??(!!data.pet?.name&&Object.values(data.completed).filter(Boolean).length>=15)};
    const stages=journey(current.profile),name=current.profile.name||stages[current.stage];
    widget.setAttribute('aria-label',`Open ${course==='gcse'?'GCSE':'A Level'} pet: ${name}, ${stages[current.stage]}, level ${current.level}, ${current.exp} EXP`);
    widget.innerHTML=`${creature(current.stage,current.profile)}<span class="pet-widget-copy"><strong>${esc(name)}</strong><span>Lv ${current.level} · ${current.exp} EXP</span><span>${current.nextEvolution===null?'Final evolution':`${current.nextEvolution-current.exp} EXP to evolve`}</span></span>`;
    if(dialog.open)renderDialog();
    if(previous&&previous.course===course&&current.exp>previous.exp){
      let announcement=document.getElementById('pet-announcement');
      if(!announcement){announcement=document.createElement('span');announcement.id='pet-announcement';announcement.className='sr-only';announcement.setAttribute('role','status');document.body.append(announcement);}
      announcement.textContent=current.stage>previous.stage?`Your pet evolved into ${stages[current.stage]}!`:'Your pet gained 10 EXP.';
    }
  }
  return {sync,stats,profile};
})();
if(typeof module!=='undefined')module.exports=ForgePet;
