import fs from 'node:fs';
import {getDocument} from '../../.runtime/tools/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
const args=process.argv.slice(2),outline=args.includes('--outline');
const selected=args.find(arg=>arg.startsWith('--pages='))?.slice(8).split(',').map(Number);
for(const file of args.filter(arg=>!arg.startsWith('--'))){
 const pdf=await getDocument({data:new Uint8Array(fs.readFileSync(file)),useSystemFonts:true,verbosity:0}).promise;
 console.log(`DOCUMENT ${file}: ${pdf.numPages} pages`);
 for(let page=1;page<=pdf.numPages;page++){
  if(selected&&!selected.includes(page))continue;
  const content=await (await pdf.getPage(page)).getTextContent();
  const text=content.items.map(item=>item.str+(item.hasEOL?'\n':' ')).join('');
  console.log(`PAGE ${page}\n`+(outline?text.slice(0,200):text));
 }
}
