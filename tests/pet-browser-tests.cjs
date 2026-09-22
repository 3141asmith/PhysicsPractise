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
  const colours=await page.locator('#forge-pet').evaluate(el=>({body:getComputedStyle(el.querySelector('.pet-body')).fill,accent:getComputedStyle(el).color}));assert.equal(colours.body,colours.accent);
  assert.deepEqual(errors,[]);console.log('Pet checks passed: milestones, real first-completion EXP, replay, evolution, persistence, course separation, cross-tab sync, coin purchases, modal keyboard, palette and mobile.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
