const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-math-')),app=createApp({dataDir:dir});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+app.server.address().port;
 const out=path.join(__dirname,'..','artifacts','math');fs.mkdirSync(out,{recursive:true});
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1400,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  for(let id=1;id<=12;id++){
   await page.goto(`${base}/practicals.html#rp-${id}-theory`);
   assert.ok(await page.locator(`#rp-${id}-theory .katex-display`).count()>0);
   assert.ok(await page.locator(`#rp-${id}-data .katex-display`).count()>0);
   assert.equal(await page.locator('.katex-error').count(),0);
  }
  await page.goto(base+'/practicals.html#rp-9-theory');
  await page.locator('#rp-9-theory').screenshot({path:path.join(out,'capacitor-theory.png')});
  await page.locator('#rp-9-data').screenshot({path:path.join(out,'capacitor-analysis.png')});
  await page.goto(base+'/gcse.html#notes/energy');
  await page.locator('#note-mechanical-energy .katex-display').first().waitFor();
  assert.ok(await page.locator('#notes-content .katex-display').count()>=5);
  await page.locator('#note-mechanical-energy').screenshot({path:path.join(out,'gcse-energy.png')});
  // Every GCSE topic and both prose/display rendering paths are exercised.
  for(const topic of ['energy','electricity','particle-model','atomic-structure','forces','waves','magnetism','space']){
   await page.goto(base+'/gcse.html#notes/'+topic);
   await page.locator('#notes-content .note-section').first().waitFor();
   assert.equal(await page.locator('.katex-error').count(),0);
  }
  await page.goto(base+'/gcse.html?question=gcse-0-kinetic-1');
  await page.locator('#gcse-question .katex').first().waitFor();
  await page.locator('#gcse-hint').click();
  await page.locator('#gcse-hint').filter({hasText:'Use 1 hint credit'}).waitFor();
  assert.ok(await page.locator('#gcse-question .katex').count()>0);
  await page.goto(base+'/a-level.html?static#notes/2');
  await page.waitForFunction(()=>typeof School!=='undefined'&&School.bank);
  await page.evaluate(()=>School.showNotes(2));
  await page.locator('#notes-view .katex-display').first().waitFor();
  await page.locator('#notes-view .note-section').first().screenshot({path:path.join(out,'alevel-waves.png')});
  await page.evaluate(()=>School.showNotes(6));
  assert.ok(await page.locator('[data-cap-output="tau"] .katex').count()>0);
  await page.locator('[data-cap-input="r"]').evaluate(input=>{input.value='20';input.dispatchEvent(new Event('input',{bubbles:true}));});
  assert.ok(await page.locator('[data-cap-output="tau"] .katex').count()>0);
  await page.setViewportSize({width:390,height:844});
  for(let id=1;id<=12;id++){
   await page.goto(`${base}/practicals.html#rp-${id}-theory`);
   await page.evaluate(()=>document.fonts.ready);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`RP ${id} mobile overflow`);
  }
  await page.locator('#rp-12-data').screenshot({path:path.join(out,'mobile-analysis.png')});
  for(const topic of ['energy','electricity','particle-model','atomic-structure','forces','waves','magnetism','space']){
   await page.goto(base+'/gcse.html#notes/'+topic);
   await page.locator('#notes-content .note-section').first().waitFor();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`GCSE ${topic} mobile overflow`);
  }
  assert.deepEqual(errors,[]);
  console.log('Maths renders across all practicals and GCSE topics; desktop and mobile layout checks passed.');
 }finally{if(browser)await browser.close();app.server.close();app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
