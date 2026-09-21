const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
  const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-rewards-'));
  const app=createApp({dataDir:dir});let browser;
  await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
  const base='http://127.0.0.1:'+app.server.address().port;
  try{
    browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
    const context=await browser.newContext(),page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'/a-level.html?static');
    await page.locator('#rewards-bar').waitFor();
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    const ids=await page.evaluate(()=>STATIC_BANK.questions.filter(q=>q.type==='numeric').slice(0,12).map(q=>q.id));
    // Wrong and invalid answers earn nothing. Repeated successes earn once.
    await page.evaluate(async id=>{
      const q=STATIC_BANK.questions.find(q=>q.id===id);
      await School.api('/api/answer/'+id,{answer:String(q.answer+100000)});
    },ids[0]);
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    await page.evaluate(async ids=>{for(const id of ids){const q=STATIC_BANK.questions.find(q=>q.id===id);await School.api('/api/answer/'+id,{answer:String(q.answer)});await School.api('/api/answer/'+id,{answer:String(q.answer)});}},ids.slice(0,10));
    assert.equal(await page.locator('#coin-balance').innerText(),'50');
    await page.locator('#shop-open').click();await page.locator('#buy-hint').click();
    await page.waitForFunction(()=>document.getElementById('hint-credits').textContent==='1');
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    assert.equal(await page.locator('#hint-credits').innerText(),'1');
    assert.equal(await page.locator('#buy-hint').isDisabled(),true);
    await page.locator('#shop-close').click();
    await page.evaluate(id=>School.practice.open(id),ids[10]);
    await page.locator('#hint').click();
    await page.waitForFunction(()=>document.querySelectorAll('#hints li').length===1);
    assert.equal(await page.locator('#hint-credits').innerText(),'1');
    await page.locator('#hint').click();
    await page.waitForFunction(()=>document.querySelectorAll('#hints li').length===2);
    assert.equal(await page.locator('#hint-credits').innerText(),'0');
    await page.locator('#hint').click();await page.locator('#coin-shop').waitFor();
    assert.equal(await page.locator('#hints li').count(),2);
    await page.locator('#shop-close').click();
    await page.reload();await page.locator('#rewards-bar').waitFor();
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    await page.evaluate(async id=>{const q=STATIC_BANK.questions.find(q=>q.id===id);await School.api('/api/answer/'+id,{answer:String(q.answer)});},ids[0]);
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    // Two tabs submitting the same new answer still earn only five coins.
    const other=await context.newPage();await other.goto(base+'/a-level.html?static');await other.locator('#rewards-bar').waitFor();
    const answer=id=>{const q=STATIC_BANK.questions.find(q=>q.id===id);return School.api('/api/answer/'+id,{answer:String(q.answer)});};
    await Promise.all([page.evaluate(answer,ids[11]),other.evaluate(answer,ids[11])]);
    await page.waitForFunction(()=>document.getElementById('coin-balance').textContent==='5');
    // Challenge rewards use the same ledger as practice.
    await page.evaluate(async()=>{const state=await School.api('/api/challenge');const q=STATIC_BANK.questions.find(q=>q.id===state.question.id);await School.api('/api/challenge',{action:'answer',questionId:q.id,answer:String(q.answer)});const before=document.getElementById('coin-balance').textContent;await School.api('/api/answer/'+q.id,{answer:String(q.answer)});if(document.getElementById('coin-balance').textContent!==before)throw Error('Double reward across modes');});
    // Written self-assessment earns once, including after unticking/rechecking.
    await page.evaluate(async()=>{
      const q=STATIC_BANK.questions.find(q=>q.type==='written'),before=Number(document.getElementById('coin-balance').textContent);
      await School.api('/api/draft/'+q.id,{answer:'My written explanation'});
      await School.api('/api/self-assess/'+q.id,{points:[0]});
      await School.api('/api/self-assess/'+q.id,{points:q.steps.map((_,i)=>i)});
      await School.api('/api/self-assess/'+q.id,{points:[]});
      await School.api('/api/self-assess/'+q.id,{points:q.steps.map((_,i)=>i)});
      if(Number(document.getElementById('coin-balance').textContent)!==before+5)throw Error('Written reward incorrect');
    });
    // Failed requests cannot consume a purchased credit.
    await page.evaluate(async()=>{
      const data=JSON.parse(localStorage.getItem('physics-forge-alevel-wallet-v1:browser'));data.credits=1;localStorage.setItem('physics-forge-alevel-wallet-v1:browser',JSON.stringify(data));
      const q=STATIC_BANK.questions.find(q=>!data.hints[q.id]);
      await School.api('/api/hints/'+q.id);
      const original=School.request;School.request=async function(url,body){if(url.startsWith('/api/hints/'))throw Error('Simulated network failure');return original.call(this,url,body);};
      try{await School.api('/api/hints/'+q.id);}catch{}finally{School.request=original;}
      if(JSON.parse(localStorage.getItem('physics-forge-alevel-wallet-v1:browser')).credits!==1)throw Error('Credit lost after failed request');
    });
    await page.setViewportSize({width:390,height:844});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.goto(base+'/combined-science.html');
    await page.waitForFunction(()=>localStorage.getItem('physics-forge-gcse-wallet-v1:browser'));
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    assert.equal(await page.locator('#hint-credits').innerText(),'0');
    const alevelWallet=await page.evaluate(()=>localStorage.getItem('physics-forge-alevel-wallet-v1:browser'));
    // No GCSE bank exists yet: exercise its future marking adapter with fixtures.
    await page.evaluate(async()=>{
      for(let i=0;i<10;i++){
        await Rewards.perform('/api/answer/gcse-test-'+i,{},async()=>({correct:false}));
        await Rewards.perform('/api/answer/gcse-test-'+i,{},async()=>({correct:true}));
        await Rewards.perform('/api/answer/gcse-test-'+i,{},async()=>({correct:true}));
      }
    });
    assert.equal(await page.locator('#coin-balance').innerText(),'50');
    await page.locator('#shop-open').click();await page.locator('#buy-hint').click();
    await page.waitForFunction(()=>document.getElementById('hint-credits').textContent==='1');
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    await page.locator('#shop-close').click();
    await page.evaluate(async()=>{
      let hintCount=0;
      const progress=async()=>({progress:{'gcse-test-0':{hintCount}}});
      const reveal=async()=>({progress:{hintCount:++hintCount}});
      await Rewards.perform('/api/hints/gcse-test-0',{},reveal,progress);
      if(document.getElementById('hint-credits').textContent!=='1')throw Error('First GCSE hint was charged');
      await Rewards.perform('/api/hints/gcse-test-0',{},reveal,progress);
      if(document.getElementById('hint-credits').textContent!=='0')throw Error('GCSE paid hint was not charged');
    });
    assert.equal(await page.evaluate(()=>localStorage.getItem('physics-forge-alevel-wallet-v1:browser')),alevelWallet);
    await page.goto(base+'/gcse.html');await page.locator('#rewards-bar').waitFor();
    await page.evaluate(()=>Rewards.perform('/api/answer/gcse-test-0',{},async()=>({correct:true})));
    assert.equal(await page.locator('#coin-balance').innerText(),'0');
    assert.equal(await page.locator('#hint-credits').innerText(),'0');
    assert.equal(await page.evaluate(()=>localStorage.getItem('physics-forge-alevel-wallet-v1:browser')),alevelWallet);
    assert.deepEqual(errors,[]);
    console.log('Rewards checks passed: earning, duplicates, purchases, free/paid hints, insufficient funds, reload, cross-tab, challenge, mobile and GCSE isolation.');
  }finally{if(browser)await browser.close();await new Promise(resolve=>app.server.close(resolve));app.db.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
