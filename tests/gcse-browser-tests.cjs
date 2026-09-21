const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-gcse-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/gcse.html');await page.locator('#gcse-question-list .question-link').first().waitFor();
  assert.equal(await page.locator('#gcse-question-list .question-link').count(),400);
  await page.locator('[data-topic="0"]').click();assert.equal(await page.locator('#gcse-question-list .question-link').count(),50);
  await page.locator('[data-question="gcse-0-kinetic-1"]').click();
  await page.locator('#gcse-answer').fill('not a number');await page.locator('#gcse-answer-form [type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('gcse-save-status').textContent.includes('Enter a number'));
  await page.locator('#gcse-answer').fill('8');await page.locator('#gcse-answer-form [type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('gcse-feedback').textContent.includes('Not quite'));
  assert.equal(await page.locator('#coin-balance').innerText(),'0');
  await page.locator('#gcse-answer').fill('9');await page.locator('#gcse-answer-form [type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('coin-balance').textContent==='5');
  await page.locator('#gcse-answer-form [type=submit]').click();await page.waitForFunction(()=>document.getElementById('gcse-feedback').textContent.includes('Correct'));
  assert.equal(await page.locator('#coin-balance').innerText(),'5');
  await page.reload();await page.locator('#gcse-answer').waitFor();assert.equal(await page.locator('#gcse-answer').inputValue(),'9');
  // Earn enough to buy a hint, using real bank answers through the marking adapter.
  await page.evaluate(async()=>{for(const q of GCSE_BANK.questions.filter(q=>q.type==='numeric').slice(0,10))await GCSEPractice.api('/api/answer/'+q.id,{answer:String(q.answer)});});
  assert.equal(await page.locator('#coin-balance').innerText(),'50');
  await page.locator('#shop-open').click();await page.locator('#buy-hint').click();await page.waitForFunction(()=>document.getElementById('hint-credits').textContent==='1');await page.locator('#shop-close').click();
  await page.locator('#gcse-hint').click();await page.waitForFunction(()=>document.querySelectorAll('#gcse-question section[aria-label=Hints] li').length===1);
  assert.equal(await page.locator('#hint-credits').innerText(),'1');
  await page.locator('#gcse-hint').click();await page.waitForFunction(()=>document.getElementById('hint-credits').textContent==='0');
  await page.locator('#gcse-hint').click();await page.locator('#coin-shop').waitFor();assert.equal(await page.locator('#gcse-question section[aria-label=Hints] li').count(),2);await page.locator('#shop-close').click();
  await page.selectOption('#gcse-course','combined');assert.equal(await page.locator('#gcse-question-list .extra').count(),0);assert.equal(await page.locator('[data-topic="7"]').count(),0);
  await page.selectOption('#gcse-tier','foundation');assert.equal(await page.locator('#gcse-question-list .higher').count(),0);
  await page.locator('[data-topic="0"]').click();await page.locator('[data-question="gcse-0-brakes"]').click();
  await page.locator('#gcse-answer').fill('Kinetic energy decreases and friction heats the brakes.');await page.locator('#gcse-answer-form [type=submit]').click();
  await page.locator('[data-mark="0"]').check();await page.waitForFunction(()=>!document.querySelector('[data-mark="0"]').disabled);
  await page.locator('[data-mark="1"]').check();await page.waitForFunction(()=>document.getElementById('coin-balance').textContent==='5');
  await page.selectOption('#gcse-paper','2');assert.equal(await page.locator('[data-topic="0"]').count(),0);
  await page.locator('#gcse-search').fill('zzzz-no-match');assert.equal(await page.locator('#gcse-question-list .question-link').count(),0);
  await page.locator('#gcse-clear').click();assert.ok(await page.locator('#gcse-question-list .question-link').count()>0);
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('#theme-toggle').click();
  assert.equal(await page.evaluate(()=>localStorage.getItem('physics-forge-alevel-wallet-v1:browser')),null);
  await page.goto(base+'/combined-science.html');await page.getByRole('link',{name:'Start questions',exact:true}).click();await page.locator('#gcse-question-list .question-link').first().waitFor();assert.equal(await page.locator('#gcse-course').inputValue(),'combined');
  assert.deepEqual(errors,[]);console.log('GCSE browser checks passed: topic counts, marking, self-assessment, filters, persistence, shop/hints, GCSE-only coins, landing link and mobile.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
