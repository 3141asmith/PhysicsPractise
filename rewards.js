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
      const old=ForgePet.profile(data.pet||{}),lockedPet=!!old.name,canBranch=Object.values(data.completed).filter(Boolean).length>=15;
      const chosen=data.pet?.branchChosen??(lockedPet&&canBranch);
      if(!canBranch)pet.branch=ForgePet.profile({starter:pet.starter}).branch;
      const rename=lockedPet&&pet.name!==old.name;
      const reclass=lockedPet&&(pet.starter!==old.starter||(chosen&&pet.branch!==old.branch));
      if(rename&&data.renameTokens<1)throw new Error('A pet rename token is required (100 coins in the shop).');
      if(reclass&&data.reclassTokens<1)throw new Error('A pet re-class token is required (500 coins in the shop).');
      if(rename)data.renameTokens--;if(reclass)data.reclassTokens--;
      data.pet={...pet,branchChosen:canBranch};save(data);
    });
  }
  async function buyPetToken(kind){
    if(!key||!['rename','reclass'].includes(kind))throw new Error('Choose a valid pet token.');
    await locked(()=>{const data=read(),cost=kind==='rename'?100:500;if(data.coins<cost)throw new Error('You need '+cost+' coins for this token.');data.coins-=cost;data[kind+'Tokens']++;save(data);});
  }
  return {perform,savePet,buyPetToken};
})();
