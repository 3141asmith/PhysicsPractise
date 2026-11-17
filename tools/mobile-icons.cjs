// Reproduce the website's existing PF monogram for native launcher assets.
const {createCanvas}=require('../../.runtime/tools/node_modules/@napi-rs/canvas');
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
function icon(file,size,foreground=false){
 const canvas=createCanvas(size,size),c=canvas.getContext('2d');
 if(!foreground){c.fillStyle='#156b59';c.fillRect(0,0,size,size);}
 c.fillStyle='#ffffff';c.font=`bold ${size*(foreground?.33:.48)}px Arial`;c.textAlign='center';c.textBaseline='middle';c.fillText('PF',size/2,size*.52);
 fs.writeFileSync(path.join(root,file),canvas.toBuffer('image/png'));
}
for(const [density,size] of Object.entries({mdpi:48,hdpi:72,xhdpi:96,xxhdpi:144,xxxhdpi:192})){
 const folder=`mobile/android/app/src/main/res/mipmap-${density}`;
 for(const name of ['ic_launcher','ic_launcher_round'])icon(`${folder}/${name}.png`,size);
 icon(`${folder}/ic_launcher_foreground.png`,size*2.25,true);
}
icon('mobile/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png',1024);
for(const name of ['splash-2732x2732.png','splash-2732x2732-1.png','splash-2732x2732-2.png'])icon('mobile/ios/App/App/Assets.xcassets/Splash.imageset/'+name,2732);
