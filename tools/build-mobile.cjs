const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..'),web=process.argv.includes('--web');
const relative=web?path.join('artifacts','site'):path.join('mobile','www'),out=path.join(root,relative);
// Explicit public asset list: never package accounts, environment files or server code.
const files=['practicals.html','practicals.css','practicals.js','practicals-data.js','index.html','a-level.html','combined-science.html','gcse.html','gcse-biology.html','gcse-chemistry.html',
 'style.css','courses.css','pet.css','home.js','math-format.js','notes.js','notes-view.js','question-random.js','questions.js',
 'extra-calculations.js','extra-explanations.js','practical-questions.js','diagram-questions.js','question-diagrams.js','static-bank.js',
 'pet-cosmetics.js','pet.js','rewards.js','app.js','challenge.js','school.js','gcse.js','gcse-bank.js','gcse-challenge.js',
 'gcse-notes-data.js','gcse-notes.js','gcse-views.js','LICENSE'];
if(path.relative(root,out)!==relative)throw Error('Invalid output path');
fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
for(const file of files){
 let content=fs.readFileSync(path.join(root,file));
 if(!web&&file.endsWith('.html'))content=Buffer.from(content.toString().replace('width=device-width, initial-scale=1','width=device-width, initial-scale=1, viewport-fit=cover').replace('</head>','<link rel="stylesheet" href="mobile.css"><script src="mobile.js"></script></head>'));
 fs.writeFileSync(path.join(out,file),content);
}
for(const dir of ['assets','vendor/katex/dist'])fs.cpSync(path.join(root,dir),path.join(out,dir),{recursive:true});
if(web){fs.copyFileSync(path.join(root,'CNAME'),path.join(out,'CNAME'));fs.writeFileSync(path.join(out,'.nojekyll'),'');}
else for(const file of ['mobile.js','mobile.css'])fs.copyFileSync(path.join(root,'mobile',file),path.join(out,file));
console.log('Public assets built in '+out);
