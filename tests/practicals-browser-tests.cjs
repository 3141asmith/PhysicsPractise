const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-practicals-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 try {
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
  await page.goto(base+'/a-level.html');
  await page.getByRole('link',{name:'Browse required practicals without signing in'}).click();
  assert.equal(await page.locator('#practical-list a').count(),12);
  for(let id=1;id<=12;id++){
   await page.locator(`#practical-list a[href="#rp-${id}"]`).click();
   await page.waitForFunction(id=>document.title.startsWith(`RP ${id}:`),id);
   assert.match(await page.title(),new RegExp(`RP ${id}:`));
   assert.equal(await page.locator('.practical-section').count(),5);
   assert.equal(await page.locator('svg[role=img]').count(),1);
   assert.ok(await page.locator('tbody tr').count()>=5);
   assert.equal(await page.locator('.practical-question').count(),3);
   await page.locator('.practical-question textarea').first().fill('My answer with working.');
   await page.getByRole('link',{name:'Exam practice',exact:true}).click();
   assert.equal(await page.locator('.practical-question textarea').first().inputValue(),'My answer with working.');
   const mark=page.locator('.practical-question details').first();await mark.locator('summary').click();
   assert.ok(await mark.locator('p').isVisible());
  }
  await page.locator('#practical-search').fill('waves');assert.equal(await page.locator('#practical-list a').count(),2);
  await page.locator('#practical-search').fill('nothing-matches');assert.match(await page.locator('#practical-count').innerText(),/0 of 12/);
  await page.locator('#practical-search').fill('');
  await page.goto(base+'/practicals.html#rp-8-data');
  assert.match(await page.locator('#practical-title').innerText(),/Gas laws/);
  await page.reload();assert.match(await page.locator('#practical-title').innerText(),/Gas laws/);
  await page.getByRole('button',{name:'Switch to dark mode'}).click();
  assert.equal(await page.locator('html').getAttribute('data-theme'),'dark');
  await page.setViewportSize({width:390,height:844});
  for(let id=1;id<=12;id++){
   await page.locator(`#practical-list a[href="#rp-${id}"]`).click();
   await page.waitForFunction(id=>document.title.startsWith(`RP ${id}:`),id);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Mobile overflow RP ${id}`);
  }
  await page.goBack();await page.waitForFunction(()=>document.title.startsWith('RP 11:'));
  assert.deepEqual(errors,[]);
  console.log('All 12 guides: navigation, diagrams, tables, question reveals, search, deep links, history, theme and mobile layout passed.');
 } finally {if(browser)await browser.close();app.server.close();app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(error=>{console.error(error);process.exitCode=1;});
