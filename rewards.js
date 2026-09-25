/* Each course has its own browser-local wallet, not an account currency. */
const Rewards = (() => {
  const course = document.documentElement.dataset.rewardsCourse === 'gcse' ? 'gcse' : 'alevel';
  let key = null, queue = Promise.resolve();
  const $ = id => document.getElementById(id);
  const empty = () => ({coins:0, credits:0, completed:{}, hints:{}});
  function read() {
    const data = JSON.parse(localStorage.getItem(key) || 'null') || empty();
    if (!Number.isSafeInteger(data.coins) || data.coins < 0 || !Number.isSafeInteger(data.credits) || data.credits < 0 || !data.completed || !data.hints) throw new Error('The saved coin balance could not be read.');
    for(const token of ['renameTokens','reclassTokens']){data[token]??=0;if(!Number.isSafeInteger(data[token])||data[token]<0)throw new Error('Invalid pet token balance.');}
    // Retire the temporary preview without changing earned balances or ownership.
    data.petSettings={...data.petSettings,freeEdits:false};
    if(data.pet)delete data.pet.stageOverride;
    for(const slot of Object.keys(data.petOutfit||{}))if(!(data.petCosmetics?.[data.petOutfit[slot]]>0))delete data.petOutfit[slot];
    if(!(data.petScarves>0))data.petScarfEquipped=false;
    return data;
  }
  function save(data) { localStorage.setItem(key, JSON.stringify(data)); update(data); }
  function notice(text) { $('rewards-message').textContent = text; }
  function update(data = read()) {
    $('coin-balance').textContent = data.coins;
    $('shop-balance').textContent = data.coins;
    $('shop-credits').textContent = data.credits;
    $('buy-hint').disabled = data.coins < 50;
    for(const [kind,cost] of [['rename',100],['reclass',500]]){
      if($('buy-pet-'+kind)){$('buy-pet-'+kind).disabled=data.coins<cost;$('pet-'+kind+'-tokens').textContent=data[kind+'Tokens'];}
    }
    if(typeof ForgePet!=='undefined')ForgePet.sync(data,course);
  }
  function locked(work) {
    const run = () => navigator.locks ? navigator.locks.request(key,work) : work();
    const operation = queue.catch(()=>{}).then(run);
    queue = operation;
    return operation;
  }
  async function init(progress) {
    const owner = course === 'gcse' || School.user.guest ? 'browser' : School.user.id;
    key = 'physics-forge-' + course + '-wallet-v1:' + owner;
    $('rewards-bar').hidden = false;
    try {
      await locked(() => {
        const data = read();
        // Previously completed questions do not become repeat earning opportunities.
        for (const [id, record] of Object.entries(progress)) {
          if (!data.initialized && record.mastered) data.completed[id] = true;
          data.hints[id] = Math.max(data.hints[id] || 0, record.hintCount || 0);
        }
        data.initialized = true;
        save(data);
      });
    } catch { notice('Browser storage is unavailable. Coins and purchases cannot be saved.'); }
  }
  async function reward(id) {
    try {
      await locked(() => {
        const data = read();
        if (data.completed[id]) return;
        if (!Object.values(data.completed).some(Boolean)) data.petHatchedAt = new Date().toISOString();
        data.completed[id] = true; data.coins += 5; save(data);
        notice('+5 coins for your first correct completion!');
      });
    } catch { notice('Your answer was checked, but the coin reward could not be saved in this browser.'); }
  }
  async function perform(url, body, request, progressRequest) {
    const hint = url.match(/^\/api\/hints\/([\w-]+)$/);
    if (hint && key) return locked(async () => {
      const id = hint[1], data = read();
      const current = await (progressRequest ? progressRequest() : School.request('/api/questions'));
      const count = current.progress[id]?.hintCount || 0;
      const paid = data.hints[id] || 0;
      const costsCredit = count >= 1 && count + 1 > paid;
      if (count >= 3) throw new Error('All three hints have already been unlocked for this question.');
      if (costsCredit && data.credits < 1) {
        open(); throw new Error('Buy a hint credit in the shop for 50 coins to unlock another hint.');
      }
      // Check storage before revealing anything; failed requests never spend a credit.
      localStorage.setItem(key, JSON.stringify(data));
      const result = await request();
      const next = result.progress?.hintCount || 0;
      if (next > count) {
        if (costsCredit) data.credits--;
        data.hints[id] = Math.max(paid,next); save(data);
        notice(costsCredit ? 'One hint credit used.' : count === 0 ? 'Your first hint is free.' : 'Previously unlocked hint shown again.');
      }
      return result;
    });
    const result = await request();
    if (url === '/api/questions') await init(result.progress);
    if (!key) return result;
    const answer = url.match(/^\/api\/(answer|self-assess)\/([\w-]+)$/);
    if (answer && (result.correct === true || (answer[1] === 'self-assess' && result.progress?.mastered))) await reward(answer[2]);
    if (url === '/api/challenge' && body?.action === 'answer' && result.correct) await reward(body.questionId);
    if (url === '/api/challenge' && result.score === 100 && result.roundId) await locked(()=>{
      const data=read();data.prizes??={};
      if(!data.prizes[result.roundId]){data.prizes[result.roundId]={claimed:false};save(data);}
    });
    return result;
  }
  function open() {
    try { update(); } catch { notice('Browser storage is unavailable.'); return; }
    if (!$('coin-shop').open) $('coin-shop').showModal();
  }
  document.addEventListener('DOMContentLoaded', () => {
    $('shop-message').insertAdjacentHTML('beforebegin',`<section aria-label="Pet tokens"><h3>Pet rename token · 100 coins</h3><p>Change your pet’s name once. Owned: <strong id="pet-rename-tokens">0</strong></p><button id="buy-pet-rename" class="primary" type="button">Buy rename token · 100 coins</button><h3>Pet re-class token · 500 coins</h3><p>Change your starter or chosen evolution branch once, keeping all EXP. Owned: <strong id="pet-reclass-tokens">0</strong></p><button id="buy-pet-reclass" class="primary" type="button">Buy re-class token · 500 coins</button><p class="answer-help">Use purchased tokens when saving changes in your pet’s window. Tokens stay within this course.</p></section>`);
    for(const kind of ['rename','reclass'])$('buy-pet-'+kind).onclick=async()=>{
      const button=$('buy-pet-'+kind);button.disabled=true;
      try{await buyPetToken(kind);$('shop-message').textContent='Pet '+kind+' token purchased. Open your pet to use it.';}
      catch(error){$('shop-message').textContent=error.message;}
      finally{try{update();}catch{}}
    };
    if (course === 'gcse') init({});
    $('shop-open').onclick = open;
    $('shop-close').onclick = () => $('coin-shop').close();
    $('buy-hint').onclick = async () => {
      $('buy-hint').disabled = true;
      try {
        await locked(() => {
          const data = read();
          if (data.coins < 50) throw new Error('You need 50 coins to buy a hint credit.');
          data.coins -= 50; data.credits++; save(data);
          $('shop-message').textContent = 'Purchased one hint credit. Use it with the Hint button on a question.';
        });
      } catch (error) { $('shop-message').textContent = error.message; }
      finally { try { update(); } catch {} }
    };
    window.addEventListener('storage', event => { if (key && event.key === key) { try { update(); } catch { notice('Could not refresh the saved balance.'); } } });
  });
  async function savePet(value){
    if(!key)throw new Error('Open your course before customising a pet.');
    await locked(()=>{
      const data=read(),pet=ForgePet.profile(value);
      if(!pet.name)throw new Error('Enter a name before choosing your companion.');
      const freeEdits=data.petSettings?.freeEdits===true;
      const old=ForgePet.profile(data.pet||{}),lockedPet=!!old.name&&!freeEdits,canBranch=freeEdits||Object.values(data.completed).filter(Boolean).length>=15;
      const chosen=data.pet?.branchChosen??(lockedPet&&canBranch);
      if(!canBranch)pet.branch=ForgePet.profile({starter:pet.starter}).branch;
      const rename=lockedPet&&pet.name!==old.name;
      const reclass=lockedPet&&(pet.starter!==old.starter||(chosen&&pet.branch!==old.branch));
      if(rename&&data.renameTokens<1)throw new Error('A pet rename token is required (100 coins in the shop).');
      if(reclass&&data.reclassTokens<1)throw new Error('A pet re-class token is required (500 coins in the shop).');
      if(rename)data.renameTokens--;if(reclass)data.reclassTokens--;
      const stageOverride=freeEdits&&/^[0-5]$/.test(String(value.stageOverride))?Number(value.stageOverride):undefined;
      data.pet={...pet,branchChosen:canBranch,stageOverride};save(data);
    });
  }
  async function savePetSettings(settings){
    if(!key)throw new Error('Open your course first.');
    if(settings.freeEdits===true)throw new Error('Free pet changes are disabled.');
    await locked(()=>{const data=read();data.petSettings={freeEdits:settings.freeEdits===true};if(!data.petSettings.freeEdits){if(data.pet)delete data.pet.stageOverride;for(const slot of Object.keys(data.petOutfit||{}))if(!(data.petCosmetics?.[data.petOutfit[slot]]>0))delete data.petOutfit[slot];if(!(data.petScarves>0))data.petScarfEquipped=false;}save(data);});
  }
  async function buyPetToken(kind){
    if(!key||!['rename','reclass'].includes(kind))throw new Error('Choose a valid pet token.');
    await locked(()=>{const data=read(),cost=kind==='rename'?100:500;if(data.coins<cost)throw new Error('You need '+cost+' coins for this token.');data.coins-=cost;data[kind+'Tokens']++;save(data);});
  }
  async function claimPrize(roundId){
    return locked(()=>{
      const data=read(),prize=data.prizes?.[roundId];
      if(!prize)throw new Error('Complete this challenge to unlock its present.');
      if(prize.claimed)return prize.kind;
      // Rejection sampling gives each of the three categories exactly equal odds.
      let roll;do{roll=crypto.getRandomValues(new Uint32Array(1))[0];}while(roll===4294967295);
      const kind=['coins','food','cosmetic'][roll%3];
      if(kind==='coins')data.coins+=10;
      if(kind==='food')data.petFood=(data.petFood||0)+1;
      let item;
      if(kind==='cosmetic'){
        const catalog=PetCosmetics.items,limit=Math.floor(4294967296/catalog.length)*catalog.length;
        let draw;do{draw=crypto.getRandomValues(new Uint32Array(1))[0];}while(draw>=limit);
        item=catalog[draw%catalog.length].id;
        if(item==='starlight-scarf')data.petScarves=(data.petScarves||0)+1;
        else{data.petCosmetics??={};data.petCosmetics[item]=(data.petCosmetics[item]||0)+1;}
      }
      data.prizes[roundId]={claimed:true,kind,...(item?{item}:{})};save(data);return kind;
    });
  }
  function mountPrize(host,state){
    if(state.score!==100||!state.roundId)return;
    const panel=document.createElement('section');panel.className='challenge-prize';
    panel.innerHTML='<h3>Your challenge prize</h3><p>Equal chances: 10 coins, a pet treat, or a wearable cosmetic.</p><button class="prize-present" type="button" aria-label="Open your challenge present"><svg viewBox="0 0 160 160" aria-hidden="true"><path class="gift-box" d="M29 68H131V143H29Z"/><path class="gift-ribbon" d="M71 68H89V143H71Z"/><g class="gift-lid"><path class="gift-box" d="M20 48H140V76H20Z"/><path class="gift-ribbon" d="M71 48H89V76H71Z"/><path class="gift-bow" d="M80 48C24 48 45 1 80 48C115 1 136 48 80 48Z"/></g></svg><span>Click to unwrap</span></button><p class="prize-result" role="status"></p>';
    host.insertBefore(panel,host.querySelector('button'));const button=panel.querySelector('button'),result=panel.querySelector('.prize-result');
    const reveal=kind=>{const item=PetCosmetics.get(read().prizes?.[state.roundId]?.item||'starlight-scarf');button.disabled=true;button.classList.add('opened');button.querySelector('span').textContent='Present opened';result.innerHTML='<span class="prize-icon" aria-hidden="true">'+({coins:'&#129689;',food:'&#127822;',cosmetic:'&#129507;'})[kind]+'</span>'+({coins:'You won 10 coins! Added to your balance.',food:'You won a pet treat! Feed it to your companion in the pet room.',cosmetic:'You won: '+(item?.name||'wearable cosmetic')+'! Equip it in the pet wardrobe.'})[kind];};
    try{const prize=read().prizes?.[state.roundId];if(prize?.claimed)reveal(prize.kind);}catch(error){result.textContent=error.message;}
    button.onclick=async()=>{button.disabled=true;try{const kind=await claimPrize(state.roundId);button.classList.add('opening');await new Promise(resolve=>setTimeout(resolve,650));reveal(kind);}catch(error){button.disabled=false;result.textContent=error.message;}};
  }
  async function petItem(action,choice){
    await locked(()=>{const data=read();
      if(action==='feed'){if(!(data.petFood>0))throw new Error('Win a pet treat by completing a challenge.');data.petFood--;data.petFed=(data.petFed||0)+1;}
      else if(action==='equip'){if(!data.petSettings?.freeEdits&&!(data.petScarves>0))throw new Error('Win a scarf by completing a challenge.');data.petScarfEquipped=true;}
      else if(action==='outfit'){
        if(!Object.hasOwn(PetCosmetics.slots,choice?.slot))throw new Error('Choose a valid clothing slot.');
        const item=PetCosmetics.get(choice.id);
        if(choice.id&&(!item||item.slot!==choice.slot||(!data.petSettings?.freeEdits&&!(data.petCosmetics?.[item.id]>0))))throw new Error('Win this cosmetic before equipping it.');
        data.petOutfit??={};if(choice.id)data.petOutfit[choice.slot]=choice.id;else delete data.petOutfit[choice.slot];
      }
      else if(action==='remove')data.petScarfEquipped=false;
      else throw new Error('Unknown pet item.');save(data);
    });
  }
  return {perform,savePet,savePetSettings,buyPetToken,claimPrize,mountPrize,petItem};
})();
