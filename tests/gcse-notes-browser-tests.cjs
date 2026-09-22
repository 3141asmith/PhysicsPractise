const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-gcse-notes-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/combined-science.html');await page.locator('a[href="gcse.html?course=combined#notes"]').click();
  await page.locator('#notes-content .note-section').first().waitFor();
  assert.equal(await page.locator('#gcse-practice-view').isVisible(),false);
  assert.equal(await page.locator('#notes-course').inputValue(),'combined');
  assert.equal(await page.locator('#notes-topic-nav button').count(),8);
  assert.equal(await page.locator('#notes-content [data-physics-only=true]').count(),0);
  await page.locator('#notes-tier').selectOption('foundation');
  for(const topic of ['energy','electricity','particle-model','atomic-structure','forces','waves','magnetism']){
   await page.locator(`[data-notes-topic="${topic}"]`).click();
   assert.ok(await page.locator('#notes-content .note-section').count()>0);
   assert.equal(await page.locator('#notes-content [data-physics-only=true],#notes-content [data-higher=true]').count(),0);
  }
  await page.locator('[data-notes-topic="space"]').click();assert.ok((await page.locator('#notes-content').innerText()).includes('No notes match'));
  await page.locator('#notes-course').selectOption('physics');assert.equal(await page.locator('#notes-content .note-section').count(),3);
  await page.locator('#notes-tier').selectOption('higher');assert.equal(await page.locator('#notes-content .note-section').count(),4);
  await page.locator('[data-notes-topic="forces"]').click();
  await page.locator('a[href="#notes/forces/collision-calculations"]').click();
  await page.reload();await page.locator('#note-collision-calculations').waitFor();
  assert.equal(await page.locator('#notes-title').innerText(),'Forces');
  await page.locator('#notes-search').fill('momentum');assert.ok(await page.locator('#notes-content .note-section').count()>0);
  assert.equal(await page.locator('#note-moments').count(),0);
  await page.locator('#notes-search').fill('<script>');assert.equal(await page.locator('#notes-content .note-section').count(),0);
  await page.locator('#notes-clear').click();
  for(const topic of ['energy','electricity','particle-model','atomic-structure','forces','waves','magnetism','space']){
   await page.locator(`[data-notes-topic="${topic}"]`).click();
   assert.equal(await page.locator('#notes-content .note-section').count(),await page.evaluate(id=>GCSE_NOTES.topics.find(t=>t.id===id).sections.length,topic));
  }
  await page.locator('#gcse-challenge-tab').click();await page.locator('#gcse-challenge-answer').waitFor();assert.equal(await page.locator('#gcse-notes-view').isVisible(),false);
  await page.locator('#gcse-practice-tab').click();await page.locator('#gcse-question-list').waitFor();
  await page.goBack();await page.locator('#gcse-challenge-answer').waitFor();
  await page.locator('#gcse-notes-tab').click();
  await page.locator('#theme-toggle').click();await page.locator('#theme-palette-button').click();await page.locator('[data-palette=violet]').click();
  await page.locator('[data-notes-topic="waves"]').click();
  const colours=await page.locator('#note-lenses').evaluate(el=>({border:getComputedStyle(el).borderLeftColor,accent:getComputedStyle(el.querySelector('.extra')).color}));assert.equal(colours.border,colours.accent);
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('#notes-sources a').count(),2);assert.deepEqual(errors,[]);
  console.log('GCSE notes passed: all topics, course/tier boundaries, search, bookmarks, navigation/back, palette and mobile.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
