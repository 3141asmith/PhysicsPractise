const fs=require('node:fs');
const path=require('node:path');

const screenshots=path.join(__dirname,'..','artifacts','screenshots');
fs.mkdirSync(screenshots,{recursive:true});
module.exports={screenshots};
