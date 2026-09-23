const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'forge-outfits-')),app=createApp({dataDir:dir});let browser;
 await new Promise(r=>app.server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/a-level.html?static');await page.locator('#forge-pet').waitFor();
  assert.equal(await page.evaluate(async()=>{try{await Rewards.petItem('outfit',{slot:'hat',id:'wizard-hat'});return false;}catch{return true;}}),true);
  const items=await page.evaluate(()=>PetCosmetics.items.filter(item=>item.art).map(({id,slot,name})=>({id,slot,name})));
  assert.equal(items.length,52);
  assert.equal(new Set(items.map(item=>item.id)).size,52);
  for(const slot of ['hat','shoes','jacket','glasses'])assert.equal(items.filter(item=>item.slot===slot).length,13);
  for(const item of items){
   const receipt=await page.evaluate(async item=>{
    let state=await School.api('/api/challenge',{action:'restart'});
    for(let i=0;i<20;i++){if(state.answered)state=await School.api('/api/challenge',{action:'next',questionId:state.question.id});const q=STATIC_BANK.questions.find(q=>q.id===state.question.id);state=await School.api('/api/challenge',{action:'answer',questionId:q.id,answer:String(q.answer)});}
    const original=crypto.getRandomValues.bind(crypto);let calls=0;
    crypto.getRandomValues=array=>{array.fill(calls++===0?2:PetCosmetics.items.findIndex(entry=>entry.id===item.id));return array;};
    try{await Rewards.claimPrize(state.roundId);}finally{crypto.getRandomValues=original;}
    await Challenge.open();
    return state.roundId;
   },item);
   assert.ok((await page.locator('.prize-result').innerText()).includes(item.name));
   await page.locator('#forge-pet').click();await page.locator('#pet-wardrobe-open').click();
   await page.locator('[data-outfit="'+item.slot+'"]').selectOption(item.id);
   await page.waitForFunction(id=>!!document.querySelector('#forge-pet [data-cosmetic="'+id+'"]'),item.id);
   await page.locator('#pet-close').click();
   await page.reload();await page.locator('#forge-pet [data-cosmetic="'+item.id+'"]').waitFor();
   assert.equal(await page.evaluate(async round=>(await Rewards.claimPrize(round)),receipt),'cosmetic');
  }
  assert.equal(await page.locator('#forge-pet .pet-cosmetic').count(),4);
  await page.locator('#forge-pet').click();await page.locator('#pet-wardrobe-open').click();await page.locator('.pet-collection summary').click();
  assert.equal(await page.locator('.pet-collection figure').count(),52);
  await page.setViewportSize({width:390,height:844});assert.ok(await page.locator('#pet-room').evaluate(el=>el.scrollWidth<=el.clientWidth));
  for(const slot of ['hat','shoes','jacket','glasses'])await page.locator('[data-outfit="'+slot+'"]').selectOption('');
  await page.waitForFunction(()=>!document.querySelector('#forge-pet .pet-cosmetic'));
  await page.goto(base+'/gcse.html');await page.locator('#forge-pet').click();await page.locator('#pet-wardrobe-open').click();
  assert.equal(await page.locator('[data-outfit=hat] option[value=wizard-hat]').evaluate(option=>option.disabled),true);
  assert.equal(await page.locator('#pet-customise').isVisible(),false);
  await page.locator('#pet-settings').click();assert.equal(await page.locator('#pet-wardrobe-panel').isVisible(),false);
  await page.locator('#pet-free-edits').check();await page.waitForFunction(()=>!document.querySelector('[data-outfit=hat] option[value=wizard-hat]').disabled);
  await page.locator('#pet-wardrobe-open').click();await page.locator('[data-outfit=hat]').selectOption('wizard-hat');
  await page.waitForFunction(()=>!!document.querySelector('#forge-pet [data-cosmetic=wizard-hat]'));
  await page.locator('#pet-equip').click();await page.locator('#forge-pet .pet-scarf').waitFor();
  await page.reload();await page.locator('#forge-pet [data-cosmetic=wizard-hat]').waitFor();
  await page.locator('#forge-pet').click();assert.equal(await page.locator('#pet-wardrobe-panel').isVisible(),false);
  // The new unnamed egg shows setup immediately; named pets use Settings.
  if(!await page.locator('#pet-free-edits').isVisible())await page.locator('#pet-settings').click();
  await page.locator('#pet-free-edits').uncheck();await page.waitForFunction(()=>!document.querySelector('#forge-pet .pet-cosmetic'));
  assert.equal(await page.locator('#forge-pet .pet-scarf').count(),0);
  assert.deepEqual(errors,[]);console.log('Cosmetics passed: all 52 prize designs, ownership checks, equipping, layering, reload, removal, mobile and course isolation.');
 }finally{if(browser)await browser.close();await new Promise(r=>app.server.close(r));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
