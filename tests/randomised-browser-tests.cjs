const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-random-')),app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const banks=[];
  for(const seed of ['learner-a','learner-b']){
   const context=await browser.newContext();await context.addInitScript(seed=>{if(!localStorage.getItem('physics-forge-question-seed-v1'))localStorage.setItem('physics-forge-question-seed-v1',seed);},seed);
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'/gcse.html');await page.locator('#gcse-question-list button').first().waitFor();
   const gcse=await page.evaluate(()=>GCSE_BANK.questions.filter(q=>q.type==='numeric').map(q=>({id:q.id,prompt:q.prompt,answer:q.answer})));
   await page.locator(`[data-question="${gcse[0].id}"]`).click();assert.equal(await page.locator('#gcse-solution').isDisabled(),true);
   await page.locator('#gcse-answer').fill(String(gcse[0].answer));await page.locator('#gcse-answer-form [type=submit]').click();await page.waitForFunction(()=>document.getElementById('gcse-feedback').textContent.startsWith('Correct'));
   assert.equal(await page.evaluate(async id=>{try{await GCSEPractice.api('/api/solution/'+id);return false;}catch{return true;}},gcse[0].id),true);
   await page.reload();await page.locator('#gcse-question').waitFor();assert.equal(await page.evaluate(()=>GCSE_BANK.questions[0].prompt),gcse[0].prompt);
   await page.goto(base+'/a-level.html?static');await page.locator('[data-landing=practice]').first().click();await page.locator('.question-link').first().waitFor();
   const alevel=await page.evaluate(()=>STATIC_BANK.questions.filter(q=>q.type==='numeric').map(q=>({id:q.id,prompt:q.prompt,answer:q.answer})));
   assert.ok(alevel.length>1000);assert.ok(alevel.every(q=>Number.isFinite(q.answer)));
   await page.locator('.question-link').first().click();assert.equal(await page.locator('#reveal').isDisabled(),true);
   assert.equal(await page.locator('#solution').innerText(),'');
   assert.equal(await page.evaluate(async id=>{try{await School.api('/api/solution/'+id,{});return false;}catch{return true;}},alevel[0].id),true);
   const marked=await page.evaluate(q=>School.api('/api/answer/'+q.id,{answer:String(q.answer)}),alevel[0]);assert.equal(marked.correct,true);
   await page.reload();await page.locator('[data-landing=practice]').first().waitFor();assert.equal(await page.evaluate(()=>STATIC_BANK.questions[0].prompt),alevel[0].prompt);
   banks.push({gcse,alevel});assert.deepEqual(errors,[]);await context.close();
  }
  for(const course of ['gcse','alevel']){
   assert.deepEqual(banks[0][course].map(q=>q.id),banks[1][course].map(q=>q.id));
   assert.ok(banks[0][course].filter((q,i)=>q.prompt!==banks[1][course][i].prompt).length>banks[0][course].length/2);
  }
  console.log('Randomised banks passed: different learner seeds, stable reloads/IDs, numeric answers, marking and disabled solution UI/actions in both courses.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
