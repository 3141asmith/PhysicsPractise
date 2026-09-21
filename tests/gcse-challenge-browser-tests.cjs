const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-gcse-challenge-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/gcse.html?course=combined&tier=foundation#challenge');await page.locator('#gcse-challenge-answer').waitFor();
  assert.equal(await page.locator('#gcse-practice-view').isVisible(),false);
  assert.equal(await page.locator('#challenge-course').inputValue(),'combined');
  await page.locator('#gcse-challenge-answer').fill('oops');await page.locator('#gcse-challenge-form [type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('gcse-challenge-error').textContent.includes('valid number'));assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'0');
  const q=await page.evaluate(async()=>(await GCSEPractice.api('/api/challenge')).question);
  await page.locator('#gcse-challenge-answer').fill(String(q.answer));await page.locator('#gcse-challenge-form [type=submit]').click();await page.locator('#gcse-challenge-next').waitFor();
  assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'5');assert.equal(await page.locator('#coin-balance').innerText(),'5');
  const replay=await page.evaluate(async q=>{try{await GCSEPractice.api('/api/challenge',{action:'answer',questionId:q.id,answer:String(q.answer)});return false;}catch{return true;}},q);assert.equal(replay,true);
  await page.reload();await page.locator('#gcse-challenge-next').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'5');
  await page.evaluate(async q=>{await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});},q);assert.equal(await page.locator('#coin-balance').innerText(),'5');
  await page.locator('#gcse-challenge-next').click();await page.locator('#gcse-challenge-answer').fill('-999999');await page.locator('#gcse-challenge-form [type=submit]').click();await page.locator('#gcse-challenge-next').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'0');
  await page.evaluate(async()=>{
    await GCSEPractice.api('/api/challenge',{action:'next'});
    for(let i=0;i<3;i++){const s=await GCSEPractice.api('/api/challenge');if(s.question.physicsOnly||s.question.higher)throw Error('Course/tier filter failed');await GCSEPractice.api('/api/challenge',{action:'answer',questionId:s.question.id,answer:String(s.question.answer)});await GCSEPractice.api('/api/challenge',{action:'next'});}
  });
  await page.reload();await page.locator('#gcse-challenge-answer').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'15');
  await page.locator('#gcse-extreme').check();await page.waitForFunction(()=>!document.getElementById('gcse-extreme').disabled);assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'15');
  await page.locator('#gcse-challenge-answer').fill('-999999');await page.locator('#gcse-challenge-form [type=submit]').click();await page.locator('#gcse-challenge-next').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'0');
  await page.evaluate(async()=>{
    await GCSEPractice.api('/api/challenge',{action:'next'});
    for(let i=0;i<20;i++){const s=await GCSEPractice.api('/api/challenge');await GCSEPractice.api('/api/challenge',{action:'answer',questionId:s.question.id,answer:String(s.question.answer)});if(i<19)await GCSEPractice.api('/api/challenge',{action:'next'});}
  });
  await page.reload();await page.locator('#gcse-challenge-restart').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'100');
  await page.locator('#gcse-challenge-restart').click();await page.locator('#gcse-challenge-answer').waitFor();assert.equal(await page.locator('#gcse-challenge-progress').getAttribute('value'),'0');
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('#gcse-practice-tab').click();await page.locator('#gcse-practice-view').waitFor();
  assert.equal(await page.evaluate(()=>localStorage.getItem('physics-forge-alevel-wallet-v1:browser')),null);
  assert.deepEqual(errors,[]);console.log('GCSE challenge passed: scoring/floor, invalid input, replay, persistence, tier/course pool, Extreme mode, completion/restart, shared rewards and mobile.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
