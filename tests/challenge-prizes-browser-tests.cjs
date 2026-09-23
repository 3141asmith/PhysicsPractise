const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'forge-prizes-')),app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const context=await browser.newContext(),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const gcse of [true,false]){
   await page.goto(base+(gcse?'/gcse.html#challenge':'/a-level.html?static#challenge'));
   if(!gcse)await page.locator('[data-landing=challenge]').first().click();
   await page.locator(gcse?'#gcse-challenge-form':'#challenge-form').waitFor();
   assert.equal(await page.locator('.prize-present').count(),0);
   const walletKey=await page.evaluate(gcse=>Object.keys(localStorage).find(k=>k.startsWith(gcse?'physics-forge-gcse-wallet-v1:':'physics-forge-alevel-wallet-v1:')),gcse);
   let previousRound;
   for(const roll of [0,1,2]){
    const round=await page.evaluate(async({gcse,restart})=>{
     const api=gcse?GCSEPractice.api:School.api.bind(School);
     let state=await api('/api/challenge',restart?{action:'restart'}:undefined);
     if(state.score!==0)throw Error('Expected a fresh round');
     for(let i=0;i<20;i++){
      if(state.answered)state=await api('/api/challenge',{action:'next',questionId:state.question.id});
      const q=(gcse?GCSE_BANK:STATIC_BANK).questions.find(q=>q.id===state.question.id);
      state=await api('/api/challenge',{action:'answer',questionId:q.id,answer:String(q.answer)});
     }
     if(gcse)await GCSEChallenge.activate();else await Challenge.open();
     return state.roundId;
    },{gcse,restart:roll>0});
    assert.ok(round);assert.notEqual(round,previousRound);previousRound=round;
    const before=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),walletKey);
    assert.equal(before.prizes[round].claimed,false);
    // Exercise every equal-weight bucket deterministically, without flaky sampling.
    await page.evaluate(roll=>{window.originalRandom=crypto.getRandomValues.bind(crypto);let calls=0;crypto.getRandomValues=array=>{array.fill(calls++===0?roll:0);return array;};},roll);
    await page.locator('.prize-present').click();
    await page.waitForFunction(()=>document.querySelector('.prize-present').classList.contains('opened'));
    await page.evaluate(()=>{crypto.getRandomValues=window.originalRandom;});
    const after=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),walletKey);
    assert.equal(after.prizes[round].kind,['coins','food','cosmetic'][roll]);
    assert.equal(after.coins,before.coins+(roll===0?10:0));
    assert.equal(after.petFood||0,(before.petFood||0)+(roll===1?1:0));
    assert.equal(after.petScarves||0,(before.petScarves||0)+(roll===2?1:0));
    // Concurrent repeat claims and reload must not duplicate or reroll the prize.
    await page.evaluate(round=>Promise.all([Rewards.claimPrize(round),Rewards.claimPrize(round)]),round);
    {const actual=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),walletKey);for(const field of ['coins','petFood','petScarves','prizes','completed'])assert.deepEqual(actual[field],after[field]);}
    await page.reload();if(!gcse)await page.locator('[data-landing=challenge]').first().click();await page.locator('.prize-present.opened').waitFor();
    {const actual=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),walletKey);for(const field of ['coins','petFood','petScarves','prizes','completed'])assert.deepEqual(actual[field],after[field]);}
   }
   await page.locator('#forge-pet').click();
   await page.locator('#pet-feed').click();await page.waitForFunction(()=>document.getElementById('pet-item-status').textContent.includes('enjoyed'));
   assert.equal(await page.locator('#pet-feed').isDisabled(),true);
   await page.locator('#pet-equip').click();await page.locator('.pet-habitat .pet-scarf').waitFor();
   await page.locator('#pet-close').click();await page.reload();await page.locator('#forge-pet .pet-scarf').waitFor();
   await page.locator('#forge-pet').click();await page.locator('#pet-equip').click();await page.waitForFunction(()=>!document.querySelector('#forge-pet .pet-scarf'));
   await page.locator('#pet-close').click();
  }
  await page.locator('[data-landing=challenge]').first().isVisible().then(async visible=>{if(visible)await page.locator('[data-landing=challenge]').first().click();});
  await page.locator('#challenge-restart').click();await page.locator('#challenge-auto-complete').waitFor();
  const beforeShortcut=await page.evaluate(()=>({...School.bank.progress}));
  await page.locator('#challenge-auto-complete').click();await page.locator('.prize-present').waitFor();
  assert.equal(await page.locator('#challenge-percent').innerText(),'100%');assert.equal(await page.locator('#challenge-auto-complete').isDisabled(),true);
  assert.deepEqual(await page.evaluate(()=>School.bank.progress),beforeShortcut);
  await page.locator('.prize-present').click();await page.waitForFunction(()=>document.querySelector('.prize-present').classList.contains('opened'));
  assert.deepEqual(errors,[]);
  console.log('Challenge prizes passed: three outcomes in both courses, unique rounds, reload/replay protection, feeding and wearable persistence.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
