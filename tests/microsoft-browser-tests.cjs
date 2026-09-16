const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const {screenshots}=require('./artifacts.cjs');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-ms-browser-'));
 const settings={tenantId:'11111111-1111-1111-1111-111111111111',clientId:'22222222-2222-2222-2222-222222222222',clientSecret:'test-only'};
 let claims={tid:settings.tenantId,oid:'33333333-3333-3333-3333-333333333333',name:'MS Teacher',email:'teacher@example.test'};
 const provider={authorize:async flow=>settings.redirectUri+'?code=test&state='+flow.state,redeem:async()=>claims};
 const app=createApp({dataDir:dir,microsoft:settings,microsoftProvider:provider});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;settings.redirectUri=base+'/api/microsoft/callback';
 try{
  browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'/#setup='+app.setupToken);await page.waitForFunction(()=>document.getElementById('account-title').textContent.includes('first teacher'));
  await page.locator('#account-name').fill('Test Teacher');await page.locator('#account-email').fill('teacher@example.test');await page.locator('#account-password').fill('Testing-password-123');await page.locator('#account-submit').click();
  await page.locator('#microsoft-connect').waitFor();
  const user=await page.evaluate(()=>School.user);
  await page.locator('#microsoft-connect').click();
  await page.waitForFunction(()=>typeof School!=='undefined'&&School.user?.microsoftLinked);
  assert.equal(await page.evaluate(()=>School.user.id),user.id);
  await page.locator('#logout').click();await page.locator('#account-screen').waitFor({state:'visible'});
  await page.locator('#microsoft-signin').click();await page.locator('#gradebook-tab').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>School.user.role),'teacher');
  await page.locator('#logout').click();await page.locator('#account-screen').waitFor({state:'visible'});
  claims={...claims,oid:'44444444-4444-4444-4444-444444444444',name:'MS Student',email:'student@example.test'};
  await page.setViewportSize({width:390,height:844});await page.locator('[data-mode=register]').click();
  await page.locator('#microsoft-signin').click();assert.equal(await page.locator('#account-error').innerText(),'Enter your class code first.');
  await page.locator('#class-code').fill(user.classCode);
  await page.screenshot({path:path.join(screenshots,'microsoft-signin-mobile.png'),fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('#microsoft-signin').click();await page.locator('#school-screen').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>School.user.role),'student');assert.equal(await page.locator('#gradebook-tab').isVisible(),false);
  assert.deepEqual(errors,[]);console.log('Microsoft browser checks passed: account connection, teacher login, password-free student signup and mobile layout (simulated provider).');
 }finally{await browser?.close();await app.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
