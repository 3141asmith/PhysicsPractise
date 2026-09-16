const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs'),{loadBank}=require('../bank.cjs');
const {screenshots}=require('./artifacts.cjs');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-challenge-ui-')),app=createApp({dataDir:dir,microsoft:null});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.locator('#skip-login').click();await page.locator('#school-screen').waitFor({state:'visible'});
  await page.locator('[data-view=challenge]').click();await page.locator('#challenge-form').waitFor();
  assert.equal(await page.locator('#include-optional').isChecked(),false);
  await page.locator('#include-optional').check();
  await page.waitForFunction(()=>!document.getElementById('include-optional').disabled);
  await page.reload();await page.locator('#challenge-form').waitFor();
  assert.equal(await page.locator('#include-optional').isChecked(),true);
  await page.locator('#include-optional').uncheck();
  await page.waitForFunction(()=>!document.getElementById('include-optional').disabled);
  const id=await page.evaluate(()=>School.user.id),seed=app.db.prepare('SELECT seed FROM users WHERE id=?').get(id).seed,bank=loadBank(seed);
  async function answer(correct,score){
   const state=app.db.prepare('SELECT * FROM challenges WHERE user_id=?').get(id),q=bank.questions.find(q=>q.id===state.question_id);
   if(q.type==='numeric')await page.locator('#challenge-answer').fill(String(correct?q.answer:-1e99));
   else await page.locator('[name="challenge-answer"][value="'+(correct?q.answer:(q.answer+1)%q.options.length)+'"]').check();
   await page.locator('#challenge-form [type=submit]').click();
   await page.waitForFunction(expected=>document.getElementById('challenge-percent').textContent===expected+'%',score);
   if(score<100)await page.locator('#challenge-next').waitFor();
  }
  await answer(true,5);await page.locator('#challenge-next').click();await page.locator('#challenge-form [type=submit]').waitFor();
  await answer(false,0);await page.locator('#challenge-next').click();await page.locator('#challenge-form [type=submit]').waitFor();
  await answer(true,5);await page.locator('#extreme-mode').check();
  await page.waitForFunction(()=>document.querySelector('.challenge-progress p').textContent.includes('back to 0'));
  await page.locator('#challenge-next').click();await page.locator('#challenge-form [type=submit]').waitFor();await answer(false,0);
  await page.reload();await page.locator('#challenge-next').waitFor();assert.equal(await page.locator('#extreme-mode').isChecked(),true);
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:900});
   for(const theme of ['light','dark']){
    await page.evaluate(value=>document.documentElement.dataset.theme=value,theme);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:path.join(screenshots,'challenge-'+width+'-'+theme+'.png'),fullPage:false});
   }
  }
  await page.locator('#challenge-next').click();await page.locator('#challenge-form [type=submit]').waitFor();
  app.db.prepare('UPDATE challenges SET score=95 WHERE user_id=?').run(id);await page.reload();await page.locator('#challenge-form').waitFor();
  await answer(true,100);await page.locator('#challenge-restart').click();await page.locator('#challenge-form').waitFor();
  assert.equal(await page.locator('#challenge-percent').innerText(),'0%');
  await page.locator('[data-view=practice]').click();assert.equal(await page.locator('#challenge-view').isVisible(),false);
  assert.deepEqual(errors,[]);console.log('Challenge browser checks passed: scoring, extreme toggle, reload, completion, restart, navigation and responsive themes.');
 }finally{await browser?.close();await app.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
