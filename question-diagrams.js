const QuestionDiagrams=(()=>{
 const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const num=x=>Number(x.toPrecision(5));
 function render(d){
  if(!d||typeof d!=='object')return '';
  let art='',description='';
  const text=(x,y,s)=>`<text x="${x}" y="${y}" text-anchor="middle">${esc(s)}</text>`;
  if(d.kind==='graph'){
   const xs=d.points.map(p=>p[0]),ys=d.points.map(p=>p[1]);
   const xmin=Math.min(0,...xs),xmax=Math.max(...xs),ymin=Math.min(0,...ys),ymax=Math.max(0,...ys);
   const X=x=>75+(x-xmin)/(xmax-xmin)*470,Y=y=>265-(y-ymin)/(ymax-ymin)*210;
   for(const x of [...new Set([0,...xs])])art+=`<path class="qd-grid" d="M${X(x)} 55V265"/>`+text(X(x),290,num(x));
   for(const y of [...new Set([0,...ys])])art+=`<path class="qd-grid" d="M75 ${Y(y)}H545"/>`+text(42,Y(y)+5,num(y));
   art+=`<path class="qd-axis" d="M75 45V265H555 M75 ${Y(0)}H555"/><polyline class="qd-line" points="${d.points.map(([x,y])=>X(x)+','+Y(y)).join(' ')}"/>`;
   for(const [x,y] of d.points)art+=`<circle class="qd-point" cx="${X(x)}" cy="${Y(y)}" r="4"/>`;
   art+=text(310,322,d.xLabel)+text(310,26,d.yLabel);
   description=d.xLabel+'; '+d.yLabel+'. Points joined by straight segments: '+d.points.map(([x,y])=>`(${num(x)}, ${num(y)})`).join('; ')+'.';
  }else if(d.kind==='vectors'){
   const arrow=(x,y,xx,yy)=>{const a=Math.atan2(yy-y,xx-x);return `<path class="qd-line" d="M${x} ${y}L${xx} ${yy}M${xx-12*Math.cos(a-.5)} ${yy-12*Math.sin(a-.5)}L${xx} ${yy}L${xx-12*Math.cos(a+.5)} ${yy-12*Math.sin(a+.5)}"/>`;};
   art='<path class="qd-axis" d="M65 235H550"/><rect class="qd-block" x="225" y="155" width="90" height="80"/>';
   art+=arrow(270,195,455,88)+arrow(270,195,105,195)+arrow(270,195,270,60)+arrow(270,195,270,295);
   art+='<path class="qd-grid" d="M270 195H475"/>'+text(445,65,d.force+' N')+text(115,174,d.friction+' N')+text(290,48,'R')+text(295,310,'mg')+text(374,179,'30 degrees');
   description=`Not to scale. Pull ${d.force} N acts 30 degrees above the rightward horizontal. Friction ${d.friction} N acts left. Normal force R acts up; weight mg acts down.`;
  }else return '';
  return `<figure class="question-diagram"><svg viewBox="0 0 600 340" role="img" aria-label="${esc(description)}">${art}</svg><figcaption>${esc(d.title)}</figcaption><details><summary>Diagram description</summary><p>${esc(description)}</p></details></figure>`;
 }
 return {render};
})();
