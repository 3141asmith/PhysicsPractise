const {chromium}=require('../../.runtime/tools/node_modules/playwright');
const {createApp}=require('../server.cjs');
const {screenshots}=require('./artifacts.cjs');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');

(async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'physics-browser-'));
 const app=createApp({dataDir:dir});let browser;
 await new Promise(resolve=>app.server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+app.server.address().port;
 try{
  browser=await chromium.launch({executablePath:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/**',route=>route.abort());
  await page.goto(base);await page.locator('#skip-login').click();
  await page.waitForFunction(()=>document.getElementById('account-error').textContent.includes('Cannot reach'));
  assert.equal(await page.locator('#server-help').isVisible(),true);
  await page.unroute('**/api/**');
  await page.goto(pathToFileURL(path.join(__dirname,'..','index.html')).href);
  assert.ok((await page.locator('#account-error').innerText()).includes('file preview'));
  await page.locator('#local-app-link').evaluate((link,url)=>link.href=url+'/',base);
  await page.locator('#skip-login').click();
  await page.waitForFunction(()=>typeof School!=='undefined'&&School.user?.guest&&document.querySelectorAll('.question-link').length===1470);
  assert.equal(await page.locator('#gradebook-tab').isVisible(),false);
  await page.reload();await page.locator('#school-screen').waitFor({state:'visible'});
  assert.ok((await page.locator('#global-status').innerText()).includes('Guest mode'));
  await page.locator('#logout').click();await page.locator('#account-screen').waitFor({state:'visible'});
  assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM guest_users').get().n,0);
  await page.goto(base+'/#setup='+app.setupToken);
  await page.reload();
  await page.waitForFunction(()=>document.getElementById('account-title').textContent.includes('first teacher'));
  await page.locator('#account-name').fill('Physics Teacher');await page.locator('#account-email').fill('teacher@example.test');await page.locator('#account-password').fill('Testing-password-123');await page.locator('#account-submit').click();
  await page.locator('#school-screen').waitFor({state:'visible'});
  await page.waitForFunction(()=>document.querySelectorAll('.question-link').length===1470);
  await page.locator('#gradebook-tab').click();await page.locator('#refresh-gradebook').waitFor();
  const code=await page.evaluate(()=>School.user.classCode);
  await page.locator('[data-role-view=student]').click();
  assert.equal(await page.locator('#gradebook-tab').isVisible(),false);
  assert.equal(await page.locator('#gradebook-view').innerHTML(),'');
  assert.equal(await page.locator('#practice-view').isVisible(),true);
  assert.equal(await page.evaluate(()=>School.user.role),'teacher');
  await page.evaluate(()=>School.gradebook());
  assert.equal(await page.locator('#gradebook-view').isVisible(),false);
  await page.reload();await page.locator('#school-screen').waitFor({state:'visible'});
  await page.waitForFunction(()=>School.practice&&School.roleView==='student');
  assert.equal(await page.locator('[data-role-view=student]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#gradebook-tab').isVisible(),false);
  await page.locator('[data-role-view=teacher]').click();
  await page.locator('#gradebook-tab').click();await page.locator('#refresh-gradebook').waitFor();
  await page.locator('#invite-teacher').click();await page.locator('#invitation-code').waitFor();
  const invitation=await page.locator('#invitation-code').inputValue();
  const newTeacher=await browser.newPage();await newTeacher.goto(base);
  await newTeacher.locator('[data-mode=register]').click();await newTeacher.locator('#account-role').selectOption('teacher');
  assert.equal(await newTeacher.locator('#class-field').isVisible(),false);
  await newTeacher.locator('#teacher-invitation').fill(invitation);await newTeacher.locator('#account-name').fill('Invited Teacher');
  await newTeacher.locator('#account-email').fill('invited@example.test');await newTeacher.locator('#account-password').fill('Testing-password-123');
  await newTeacher.locator('#account-submit').click();await newTeacher.locator('#gradebook-tab').waitFor({state:'visible'});
  assert.equal(await newTeacher.evaluate(()=>School.user.role),'teacher');await newTeacher.close();
  await page.screenshot({path:path.join(screenshots,'gradebook-desktop.png'),fullPage:false});
  const student=await browser.newPage({viewport:{width:1440,height:1000}});student.on('pageerror',e=>errors.push(e.message));
  await student.goto(base);await student.locator('[data-mode=register]').click();
  await student.locator('#account-name').fill('Physics Student');await student.locator('#account-email').fill('student@example.test');await student.locator('#account-password').fill('Testing-password-123');await student.locator('#class-code').fill(code);await student.locator('#account-submit').click();
  await student.waitForFunction(()=>document.querySelectorAll('.question-link').length===1470);
  assert.equal(await student.locator('#gradebook-tab').isVisible(),false);
  assert.equal(await student.locator('#role-view-switch').isVisible(),false);
  await student.evaluate(()=>School.setRoleView('teacher'));
  assert.equal(await student.locator('#gradebook-tab').isVisible(),false);
  assert.equal(await student.evaluate(()=>School.roleView),'student');
  assert.equal(await student.evaluate(async()=> (await fetch('/api/gradebook')).status),403);
  assert.equal(await student.locator('.topic-button').count(),15);
  await student.locator('[data-level=Challenge]').click();
  assert.ok(await student.locator('.question-link').count()<1470);
  await student.locator('#search').fill('projectile');
  assert.ok(await student.locator('.question-link').count()>0);
  await student.locator('[data-id="calc-3-projectile-1"]').click();
  await student.locator('#answer').fill('123');
  for(let i=0;i<3;i++){await student.locator('#hint').click();await student.waitForFunction(n=>document.querySelectorAll('#hints li').length===n,i+1);}
  assert.equal(await student.locator('#hint').isDisabled(),true);
  await student.locator('#answer-form [type=submit]').click();
  await student.waitForFunction(()=>document.querySelector('#feedback').textContent.includes('Not quite'));
  await student.locator('#question-notes').click();await student.locator('.note-section').first().waitFor();
  assert.ok(await student.locator('#notes-view .katex').count()>0);
  await student.locator('#theme-toggle').click();
  const theme=await student.locator('html').getAttribute('data-theme');
  await student.screenshot({path:path.join(screenshots,'notes-desktop.png'),fullPage:false});
  await student.reload();await student.locator('#school-screen').waitFor({state:'visible'});
  assert.equal(await student.locator('html').getAttribute('data-theme'),theme);
  await student.locator('[data-view=practice]').click();
  await student.locator('#search').fill('projectile');await student.locator('[data-id="calc-3-projectile-1"]').click();
  assert.equal(await student.locator('#answer').inputValue(),'123');assert.equal(await student.locator('#hints li').count(),3);
  await student.setViewportSize({width:390,height:844});
  await student.locator('#question').scrollIntoViewIfNeeded();
  assert.ok(await student.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await student.screenshot({path:path.join(screenshots,'question-mobile.png'),fullPage:false});
  await page.locator('#refresh-gradebook').click();await page.locator('.student-link').waitFor();
  assert.ok((await page.locator('tbody').innerText()).includes('Physics Student'));
  await page.locator('.student-link').click();assert.ok((await page.locator('#student-detail').innerText()).includes('3 / 3'));
  await page.screenshot({path:path.join(screenshots,'gradebook-desktop.png'),fullPage:false});
  await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:path.join(screenshots,'gradebook-mobile.png'),fullPage:false});
  for(const width of [1440,390]){
   await student.setViewportSize({width,height:1000});
   for(const theme of ['light','dark']){
    await student.evaluate(value=>document.documentElement.dataset.theme=value,theme);
    for(let topic=0;topic<14;topic++){
     await student.evaluate(topic=>School.showNotes(topic),topic);
     assert.equal(await student.locator('.note-reference').count(),topic===13?3:2);
     if(topic===13){
      assert.equal(await student.locator('.note-practical-group').count(),60);
      assert.equal(await student.locator('.note-practical-group ol').count(),12);
      assert.equal(await student.locator('.note-practical-source').count(),12);
      assert.equal(await student.locator('.katex-error').count(),0);
      const link=student.locator('.notes-toc a').filter({hasText:'Practical 9:'});
      await link.click();
      const capacitor=student.locator('.note-section').filter({has:student.locator('h2').filter({hasText:'Practical 9:'})});
      await capacitor.locator('h3').first().scrollIntoViewIfNeeded();
      assert.ok((await capacitor.innerText()).includes('voltmeter'));
      await student.screenshot({path:path.join(screenshots,'practical-notes-'+width+'-'+theme+'.png'),fullPage:false});
     }
     assert.ok((await student.locator('.notes-source').innerText()).includes('Sources and further reading'));
     assert.ok((await student.locator('.note-section h2').last().innerText()).includes('Revision checkpoints'));
     assert.ok(await student.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
     for(const canvas of await student.locator('[data-note-diagram]').all()){
      assert.ok(await canvas.evaluate(node=>{const data=node.getContext('2d').getImageData(0,0,node.width,node.height).data;let pixels=0;for(let i=3;i<data.length;i+=4)if(data[i])pixels++;return pixels>1000;}));
     }
    }
   }
   await student.evaluate(()=>School.showNotes(2));await student.locator('.note-figure').scrollIntoViewIfNeeded();
   await student.screenshot({path:path.join(screenshots,'notes-redesign-'+width+'.png'),fullPage:false});
  }
  await student.locator('.notes-toc a').last().click();assert.ok(student.url().endsWith('#notes/2'));
  await student.reload();await student.locator('#notes-view').waitFor({state:'visible'});
  assert.ok((await student.locator('#notes-view h1').innerText()).includes('Waves'));
  await student.locator('#notes-home').click();assert.equal(await student.locator('.note-topic').count(),14);
  assert.deepEqual(errors,[]);
  console.log('Browser checks passed: teacher setup, student signup, restricted gradebook, filters, hints, notes, saved drafts, theme and mobile layout.');
 }finally{await browser?.close();await app.close();fs.rmSync(dir,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
