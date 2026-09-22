const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {stats}=require('../pet');
(async()=>{
 assert.equal(stats(4).stage,0);assert.equal(stats(5).stage,1);assert.equal(stats(15).stage,2);assert.equal(stats(35).stage,3);assert.equal(stats(75).stage,4);assert.equal(stats(155).stage,5);assert.equal(stats(1000).stage,5);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-pet-'));const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const context=await browser.newContext(),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/gcse.html');await page.locator('#forge-pet').waitFor();
  assert.ok((await page.locator('#forge-pet').innerText()).includes('0 EXP'));
  await page.evaluate(async()=>{const q=GCSE_BANK.questions.find(q=>q.type==='numeric');await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  assert.ok((await page.locator('#forge-pet').innerText()).includes('10 EXP'));
  await page.evaluate(async()=>{for(const q of GCSE_BANK.questions.filter(q=>q.type==='numeric').slice(0,5))await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  assert.ok((await page.locator('#forge-pet').innerText()).includes('Sprout'));assert.ok((await page.locator('#forge-pet').innerText()).includes('50 EXP'));
  await page.reload();await page.locator('#forge-pet').click();await page.locator('#pet-room').waitFor();assert.equal(await page.locator('#pet-title').innerText(),'Sprout');
  await page.keyboard.press('Escape');assert.equal(await page.locator('#pet-room').isVisible(),false);
  const other=await context.newPage();await other.goto(base+'/combined-science.html');await other.locator('#forge-pet').waitFor();
  await page.evaluate(async()=>{const q=GCSE_BANK.questions.filter(q=>q.type==='numeric')[5];await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  await other.waitForFunction(()=>document.getElementById('forge-pet').textContent.includes('60 EXP'));
  await page.goto(base+'/a-level.html?static');await page.locator('#forge-pet').waitFor();assert.ok((await page.locator('#forge-pet').innerText()).includes('0 EXP'));
  await page.evaluate(async()=>{await Rewards.perform('/api/answer/pet-test',{},async()=>({correct:true}));});assert.ok((await page.locator('#forge-pet').innerText()).includes('10 EXP'));
  await page.goto(base+'/gcse.html');await page.locator('#forge-pet').waitFor();assert.ok((await page.locator('#forge-pet').innerText()).includes('60 EXP'));
  await page.evaluate(async()=>{for(const q of GCSE_BANK.questions.filter(q=>q.type==='numeric').slice(6,10))await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  await page.locator('#shop-open').click();await page.locator('#buy-hint').click();await page.waitForFunction(()=>document.getElementById('coin-balance').textContent==='0');assert.ok((await page.locator('#forge-pet').innerText()).includes('100 EXP'));await page.locator('#shop-close').click();
  await page.setViewportSize({width:390,height:844});await page.locator('#forge-pet').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));assert.ok(await page.locator('#pet-room').evaluate(el=>el.scrollWidth<=el.clientWidth));await page.locator('#pet-close').click();
  await page.locator('#theme-toggle').click();await page.locator('#theme-palette-button').click();await page.locator('[data-palette=violet]').click();
  const fill=()=>page.locator('#forge-pet .pet-body').evaluate(el=>getComputedStyle(el).fill),colour=await fill();
  await page.locator('#theme-toggle').click();await page.locator('#theme-palette-button').click();await page.locator('[data-palette=ocean]').click();assert.equal(await fill(),colour);
  assert.equal(await page.locator('#forge-pet .pet-bob').evaluate(el=>getComputedStyle(el).animationName),'pet-roam');
  await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('#forge-pet .pet-bob').evaluate(el=>getComputedStyle(el).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'});
  await page.locator('#forge-pet').click();
  assert.equal(await page.locator('#pet-branch').isDisabled(),true);
  await page.locator('#pet-name').fill('Nova <star>');await page.locator('[name=pet-starter][value=ripple]').check();await page.locator('#pet-customise [type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('pet-save-status').textContent==='Companion saved.');
  assert.equal(await page.locator('#pet-title').innerText(),'Nova <star>');assert.equal(await page.locator('#pet-title star').count(),0);
  assert.equal(await page.locator('#pet-name').isDisabled(),true);assert.equal(await page.locator('[name=pet-starter][value=spark]').isDisabled(),true);
  assert.equal(await page.evaluate(async()=>{try{await Rewards.savePet({name:'Free rename',starter:'ripple',branch:'reef'});return false;}catch{return true;}}),true);
  assert.equal(await page.evaluate(async()=>{try{await Rewards.buyPetToken('rename');return false;}catch{return true;}}),true);
  await page.locator('#pet-close').click();await page.reload();await page.locator('#forge-pet').click();assert.equal(await page.locator('#pet-name').inputValue(),'Nova <star>');assert.equal(await page.locator('.pet-habitat svg').getAttribute('data-pet-family'),'ripple');
  await page.locator('#pet-close').click();
  await page.evaluate(async()=>{for(const q of GCSE_BANK.questions.filter(q=>q.type==='numeric').slice(10,15))await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  await page.locator('#forge-pet').click();assert.equal(await page.locator('#pet-branch').isDisabled(),false);
  await page.locator('#pet-branch').selectOption('abyss');await page.locator('#pet-customise [type=submit]').click();await page.waitForFunction(()=>document.getElementById('pet-save-status').textContent==='Companion saved.');assert.equal(await page.locator('#pet-branch').isDisabled(),true);
  // Fixture funds allow all paid paths to be exercised without hundreds of answers.
  await page.evaluate(()=>{const key='physics-forge-gcse-wallet-v1:browser',data=JSON.parse(localStorage.getItem(key));data.coins=3200;localStorage.setItem(key,JSON.stringify(data));});
  await page.locator('#pet-open-shop').click();await page.locator('#buy-pet-rename').click();await page.waitForFunction(()=>document.getElementById('pet-rename-tokens').textContent==='1');assert.equal(await page.locator('#coin-balance').innerText(),'3100');
  await page.locator('#shop-close').click();await page.locator('#forge-pet').click();await page.locator('#pet-name').fill('Comet');await page.locator('#pet-customise [type=submit]').click();await page.waitForFunction(()=>document.getElementById('pet-title').textContent==='Comet');assert.equal(await page.locator('#pet-name').isDisabled(),true);
  await page.evaluate(async()=>{for(let i=0;i<6;i++)await Rewards.buyPetToken('reclass');});
  assert.equal(await page.locator('#coin-balance').innerText(),'100');
  for(const [starter,branches] of Object.entries({spark:['solar','storm'],ripple:['reef','abyss'],pebble:['crystal','grove']})){
   for(const branch of branches){
    await page.locator(`[name=pet-starter][value=${starter}]`).check();await page.locator('#pet-branch').selectOption(branch);await page.locator('#pet-customise [type=submit]').click();
    await page.waitForFunction(()=>document.getElementById('pet-save-status').textContent==='Companion saved.');
    assert.equal(await page.locator('.pet-habitat svg').getAttribute('data-pet-branch'),branch);
    assert.ok((await page.locator('#forge-pet').innerText()).includes('150 EXP'));
   }
  }
  assert.equal(await page.locator('[name=pet-starter][value=spark]').isDisabled(),true);
  const tokens=await page.evaluate(()=>JSON.parse(localStorage.getItem('physics-forge-gcse-wallet-v1:browser')));assert.equal(tokens.reclassTokens,0);assert.equal(tokens.renameTokens,0);
  await page.evaluate(()=>Rewards.savePet({name:'Comet',starter:'pebble',branch:'grove'}));
  assert.ok(await page.locator('#pet-room').evaluate(el=>el.scrollWidth<=el.clientWidth));
  await other.waitForFunction(()=>document.querySelector('#forge-pet svg').dataset.petBranch==='grove');
  await page.locator('#pet-close').click();await page.goto(base+'/a-level.html?static');await page.locator('#forge-pet').click();assert.equal(await page.locator('#pet-name').inputValue(),'');assert.equal(await page.locator('.pet-habitat svg').getAttribute('data-pet-family'),'spark');
  assert.deepEqual(errors,[]);console.log('Pet checks passed, including saved names, escaped text, three starters, all six branches, unlock boundary, preserved EXP and isolated profiles.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
