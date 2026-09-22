/* Pet progression shares the wallet's first-completion ledger, so spending
   coins, replaying answers and switching study modes cannot change its EXP. */
const ForgePet=(()=>{
  const stages=['Spark','Sprout','Flare','Drake','Aurora','Cosmic Guardian'];
  const milestones=[0,50,150,350,750,1550];
  let current=null,widget,dialog;
  function stats(completed){
    const exp=completed*10,stage=milestones.filter(n=>exp>=n).length-1;
    const level=Math.floor(Math.sqrt(exp/25))+1;
    return {completed,exp,stage,level,health:100,nextLevel:25*level*level,nextEvolution:milestones[stage+1]??null};
  }
  function creature(stage){
    const size=0.65+stage*0.07;
    return `<svg viewBox="0 0 240 200" aria-hidden="true" focusable="false">
      <ellipse cx="120" cy="179" rx="65" ry="9" class="pet-shadow"/>
      ${stage>=4?'<g class="pet-orbit"><ellipse cx="120" cy="96" rx="104" ry="65" fill="none" stroke="currentColor" stroke-dasharray="3 9"/><circle cx="22" cy="74" r="5" fill="currentColor"/><path d="M207 25l4 9 10 4-10 4-4 10-4-10-10-4 10-4z" fill="currentColor"/></g>':''}
      <g class="pet-bob"><g transform="translate(120 165) scale(${size}) translate(-120 -165)">
      ${stage>=3?'<path class="pet-wing" d="M68 110Q5 40 22 132L58 118 73 151M172 110Q235 40 218 132L182 118 167 151"/>':''}
      ${stage>=2?'<path class="pet-tail" d="M162 139Q211 152 199 104Q234 162 162 170Z"/>':''}
      <path class="pet-body" d="M62 138Q48 82 81 61Q120 40 159 61Q192 82 178 138Q174 177 120 174Q66 177 62 138Z"/>
      ${stage>=1?'<path class="pet-ear" d="M77 65Q46 15 102 53M138 53Q194 15 163 65"/>':''}
      ${stage>=3?'<path class="pet-horn" d="M93 56L98 22 111 52M129 52L142 22 147 56"/>':''}
      ${stage===5?'<path class="pet-crown" d="M95 25L91 7 111 16 120 1 129 16 149 7 145 25Z"/>':''}
      <ellipse class="pet-belly" cx="120" cy="140" rx="30" ry="22"/>
      <g class="pet-eyes"><ellipse cx="95" cy="100" rx="8" ry="12"/><ellipse cx="145" cy="100" rx="8" ry="12"/><circle class="pet-glint" cx="98" cy="96" r="3"/><circle class="pet-glint" cx="148" cy="96" r="3"/></g>
      <path d="M110 119Q120 129 130 119" fill="none" class="pet-smile"/>
      <ellipse class="pet-feet" cx="83" cy="167" rx="19" ry="10"/><ellipse class="pet-feet" cx="157" cy="167" rx="19" ry="10"/>
      ${stage>=2?'<path class="pet-mark" d="M121 72l-9 12h9l-3 11 12-15h-10z"/>':''}
      </g></g></svg>`;
  }
  function mount(){
    if(widget)return;
    widget=document.createElement('button');widget.type='button';widget.id='forge-pet';widget.setAttribute('aria-haspopup','dialog');
    widget.onclick=()=>{renderDialog();dialog.showModal();};
    dialog=document.createElement('dialog');dialog.id='pet-room';dialog.setAttribute('aria-labelledby','pet-title');
    document.body.append(widget,dialog);document.body.classList.add('has-forge-pet');
  }
  function renderDialog(){
    if(!current)return;
    const s=current,course=s.course==='gcse'?'GCSE':'A Level',start=25*(s.level-1)**2;
    dialog.innerHTML=`<div class="pet-room-header"><div><p class="section-label">${course} COMPANION</p><h2 id="pet-title">${stages[s.stage]}</h2></div><button class="secondary" id="pet-close" type="button" autofocus>Close</button></div>
      <div class="pet-habitat">${creature(s.stage)}<span>Evolution ${s.stage+1} of ${stages.length}</span></div>
      <dl class="pet-stats"><div><dt>Level</dt><dd>${s.level}</dd></div><div><dt>Total EXP</dt><dd>${s.exp}</dd></div><div><dt>Health</dt><dd>${s.health}/100</dd></div><div><dt>Questions mastered</dt><dd>${s.completed}</dd></div></dl>
      <label for="pet-level-progress">Level ${s.level+1}: ${s.nextLevel-s.exp} EXP to go</label><progress id="pet-level-progress" max="${s.nextLevel-start}" value="${s.exp-start}"></progress>
      <p>${s.nextEvolution===null?'Final form reached! Your companion keeps gaining levels.':`Next evolution: <strong>${stages[s.stage+1]}</strong> at ${s.nextEvolution} EXP (${Math.ceil((s.nextEvolution-s.exp)/10)} new correct answers away).`}</p>
      <h3>Evolution journey</h3><ol class="pet-evolutions">${stages.map((name,i)=>`<li class="${i<=s.stage?'unlocked':''}" ${i===s.stage?'aria-current="step"':''}><strong>${name}</strong><span>${milestones[i]} EXP · ${i<=s.stage?'Unlocked':'Locked'}</span></li>`).join('')}</ol>
      <p class="answer-help">Earn 10 EXP for each first correct completion, including challenge questions and completed written self-assessments. Previously recorded completions count too. Repeats and spending coins do not change EXP.</p><p class="answer-help">Health stays at 100: your pet never loses health while you are away. Evolution milestones grow exponentially; levels use a quadratic EXP curve. Your ${course} pet is saved with this browser’s course wallet, separately from the other course. Clearing site data resets it.</p>`;
    document.getElementById('pet-close').onclick=()=>dialog.close();
  }
  function sync(data,course){
    mount();
    const previous=current;
    current={...stats(Object.values(data.completed).filter(Boolean).length),course};
    widget.setAttribute('aria-label',`Open ${course==='gcse'?'GCSE':'A Level'} pet: ${stages[current.stage]}, level ${current.level}, ${current.exp} EXP`);
    widget.innerHTML=`${creature(current.stage)}<span class="pet-widget-copy"><strong>${stages[current.stage]}</strong><span>Lv ${current.level} · ${current.exp} EXP</span><span>${current.nextEvolution===null?'Final evolution':`${current.nextEvolution-current.exp} EXP to evolve`}</span></span>`;
    if(dialog.open)renderDialog();
    if(previous&&previous.course===course&&current.exp>previous.exp){
      let announcement=document.getElementById('pet-announcement');
      if(!announcement){announcement=document.createElement('span');announcement.id='pet-announcement';announcement.className='sr-only';announcement.setAttribute('role','status');document.body.append(announcement);}
      announcement.textContent=current.stage>previous.stage?`Your pet evolved into ${stages[current.stage]}!`:'Your pet gained 10 EXP.';
    }
  }
  return {sync,stats};
})();
if(typeof module!=='undefined')module.exports=ForgePet;
