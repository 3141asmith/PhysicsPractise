(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const chamber = $('chamber'), chart = $('histogram');
  const state = {running:false, measured:false, slits:2, wavelength:50, separation:400, rate:12, count:0, flight:null, hits:[], bins:new Array(100).fill(0), time:0, delay:0};
  const extent = 1; // screen half-width in mm
  let cdf = [], density = [];
  function probability(y) {
    const theta = y * 1e-3; // y/L, L = 1 m (paraxial approximation)
    const lambda = state.wavelength * 1e-12;
    const beta = Math.PI * 80e-9 * theta / lambda;
    const envelope = Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta)/beta)**2;
    if (state.measured || state.slits === 1) return envelope;
    const phase = 2 * Math.PI * state.separation * 1e-9 * theta / lambda;
    let real = 0, imaginary = 0;
    for (let i = 0; i < state.slits; i++) { real += Math.cos(i * phase); imaginary += Math.sin(i * phase); }
    return envelope * (real * real + imaginary * imaginary) / state.slits ** 2;
  }
  function distribution() {
    density = Array.from({length:2000}, (_,i) => probability(-extent + (i+.5)/2000*2*extent));
    let sum=0; cdf=density.map(p => sum+=p); cdf=cdf.map(p=>p/sum);
  }
  function sample() { const r=Math.random(); let lo=0,hi=cdf.length-1; while(lo<hi){const mid=(lo+hi)>>1;if(cdf[mid]<r)lo=mid+1;else hi=mid;} return -extent+(lo+Math.random())/cdf.length*2*extent; }
  function clear() {state.count=0;state.hits=[];state.bins.fill(0);state.flight=null;state.delay=0;$('count').textContent='0';}
  function running(value){state.running=value;$('play').textContent=value?'Ⅱ Pause experiment':state.count||state.flight?'▶ Resume experiment':'▶ Start experiment';$('status').textContent=value?'Emitting one electron at a time':state.count||state.flight?'Experiment paused':'Ready to emit';}
  function configure() {
    state.slits=+$('slits').value;state.wavelength=+$('wavelength').value;state.separation=+$('separation').value;state.measured=$('measure').checked;
    $('slitsValue').textContent=state.slits; $('separation').disabled=state.slits===1;
    $('wavelengthValue').textContent=state.wavelength+' pm';$('separationValue').textContent=state.separation+' nm';
    $('mode').textContent=state.measured?'PATH MEASURED':'PATH UNMEASURED';
    $('measureText').textContent=state.slits===1?'Only one slit is open. Measuring the path leaves the single-slit diffraction pattern unchanged.':state.measured?'Which-path information is available. Interference disappears; diffraction remains.':'No which-path information. The probability amplitudes from all open slits interfere.';
    $('resultTitle').textContent=state.slits===1?'Single-slit diffraction.':state.measured?'The fringes disappear.':'Interference emerges.';
    $('resultText').textContent=state.slits===1?'One opening produces a broad diffraction envelope with weaker side bands. Slit separation has no effect with a single slit.':state.measured?'Knowing which slit the electron passes through removes the interference fringes. Hits follow the broad single-slit diffraction envelope.':'Each electron arrives as a single dot. More slits produce narrower principal interference peaks within the diffraction envelope.';
    clear();distribution();running(state.running);
  }
  $('play').addEventListener('click',()=>running(!state.running));$('reset').addEventListener('click',()=>{clear();running(false);});
  ['slits','wavelength','separation','measure'].forEach(id=>$(id).addEventListener('input',configure));
  $('rate').addEventListener('input',()=>{state.rate=+$('rate').value;$('rateValue').textContent=state.rate+' /s';});
  function context(canvas){const rect=canvas.getBoundingClientRect(),dpr=window.devicePixelRatio||1;const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,rect.width,rect.height);return [ctx,rect.width,rect.height];}
  function drawChamber(){
    const [ctx,w,h]=context(chamber), source=w*.10,slit=w*.36,screen=w*.83,cy=h*.52,top=55,bottom=h-33;
    const spacing=Math.min(h*.40*(state.separation/800),(Math.min(cy-top,bottom-cy)-12)*2/Math.max(1,state.slits-1));
    const sy=Array.from({length:state.slits},(_,i)=>cy+(i-(state.slits-1)/2)*spacing),gap=Math.min(7,spacing*.28);
    ctx.strokeStyle='#1a2b36';ctx.lineWidth=1;for(let x=25;x<w;x+=30){ctx.beginPath();ctx.moveTo(x,40);ctx.lineTo(x,h-25);ctx.stroke();}for(let y=55;y<h-20;y+=30){ctx.beginPath();ctx.moveTo(20,y);ctx.lineTo(w-20,y);ctx.stroke();}
    ctx.font='11px Segoe UI';ctx.fillStyle='#8ea5b3';ctx.textAlign='center';ctx.fillText('ELECTRON SOURCE',source,27);ctx.fillText(state.slits===1?'SINGLE SLIT':state.slits+' SLITS',slit,27);ctx.fillText('DETECTION SCREEN',screen,27);
    ctx.setLineDash([4,6]);ctx.strokeStyle='#31434e';ctx.beginPath();ctx.moveTo(source,cy);ctx.lineTo(screen,cy);ctx.stroke();ctx.setLineDash([]);
    const f=state.flight;
    if(f){const phase=f.progress;if(phase<.3){const x=source+(slit-source)*phase/.3;ctx.fillStyle='#8ef2d5';ctx.shadowColor='#8ef2d5';ctx.shadowBlur=15;ctx.beginPath();ctx.ellipse(x,cy,5,9,0,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;}else{
      ctx.save();ctx.beginPath();ctx.rect(slit+5,top,screen-slit-6,bottom-top);ctx.clip();
      const radius=(phase-.3)/.7*(screen-slit)*1.3; const origins=state.measured?[sy[f.path]]:sy;
      origins.forEach(y=>{for(let k=0;k<9;k++){const r=radius-k*(14+state.wavelength*.17);if(r<=0)continue;ctx.strokeStyle=state.measured?'rgba(234,190,124,.35)':'rgba(105,185,211,.27)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(slit,y,r,-Math.PI/2,Math.PI/2);ctx.stroke();}});ctx.restore();
      if(state.measured){ctx.fillStyle='#f0c48c';ctx.beginPath();ctx.arc(slit,sy[f.path],7,0,Math.PI*2);ctx.fill();}
    }}
    ctx.strokeStyle='#6d8796';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(slit,top);sy.forEach(y=>{ctx.lineTo(slit,y-gap);ctx.moveTo(slit,y+gap);});ctx.lineTo(slit,bottom);ctx.stroke();
    if(state.measured){ctx.strokeStyle='#ecc28c';ctx.lineWidth=2;sy.forEach(y=>ctx.strokeRect(slit-10,y-10,20,20));}
    ctx.fillStyle='#142e36';ctx.fillRect(screen-3,top,37,bottom-top);ctx.strokeStyle='#5b9eaa';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(screen,top);ctx.lineTo(screen,bottom);ctx.stroke();
    for(const hit of state.hits){ctx.fillStyle=`rgba(132,242,207,${hit.fresh>state.time-.25?1:.55})`;ctx.fillRect(screen+4+hit.x*26,cy-hit.y/extent*(bottom-top)/2,2,2);}
    ctx.fillStyle='#6e8897';ctx.textAlign='center';ctx.font='11px Segoe UI';ctx.fillText('Schematic · not to scale',w/2,h-10);
  }
  function drawChart(){const [ctx,w,h]=context(chart),left=35,right=w-12,top=12,base=h-26,bw=(right-left)/100,max=Math.max(1,...state.bins),peak=Math.max(...density);
    ctx.font='10px Segoe UI';ctx.textAlign='right';ctx.fillStyle='#728c9b';ctx.fillText('relative',left-5,top+3);ctx.fillText('hits',left-5,top+15);
    for(let j=0;j<4;j++){const y=base-(base-top)*j/3;ctx.strokeStyle='#283a45';ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(right,y);ctx.stroke();}
    ctx.fillStyle='rgba(128,226,199,.7)';state.bins.forEach((n,i)=>{const bh=n/max*(base-top)*.85;ctx.fillRect(left+i*bw,base-bh,Math.max(.5,bw-1),bh);});
    ctx.strokeStyle='#7a9ec4';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<density.length;i++){const x=left+i/(density.length-1)*(right-left),y=base-density[i]/peak*(base-top)*.9;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();
    ctx.textAlign='center';ctx.fillStyle='#8ca3b1';[-1,-.5,0,.5,1].forEach(n=>ctx.fillText(String(n),left+(n+1)/2*(right-left),h-7));
  }
  let last=performance.now();function frame(now){const dt=Math.min((now-last)/1000,.05);last=now;if(state.running){state.time+=dt;if(!state.flight){state.delay-=dt;if(state.delay<=0)state.flight={progress:0,y:sample(),path:Math.floor(Math.random()*state.slits)};}else{state.flight.progress+=dt*state.rate;if(state.flight.progress>=1){const y=state.flight.y;state.bins[Math.min(99,Math.floor((y+extent)/(2*extent)*100))]++;state.hits.push({y,x:Math.random(),fresh:state.time});if(state.hits.length>12000)state.hits.shift();state.count++;$('count').textContent=state.count.toLocaleString();state.flight=null;}}}drawChamber();drawChart();requestAnimationFrame(frame);}
  configure();requestAnimationFrame(frame);
  window.electronSimulation={state,probability,sample,configure,running,clear};
  if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'control_electron_experiment',description:'Start, pause or reset the electron diffraction experiment.',inputSchema:{type:'object',properties:{action:{type:'string',enum:['start','pause','reset']}},required:['action'],additionalProperties:false},execute:({action})=>{if(!['start','pause','reset'].includes(action))throw new Error('Invalid action');if(action==='reset')clear();running(action==='start');return {running:state.running,detected:state.count};}})).catch(()=>{});}catch{}}
})();

if(new URLSearchParams(location.search).has('embedded')){document.documentElement.classList.add('embedded');const reportHeight=()=>parent.postMessage({type:'electron-diffraction-height',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)},location.origin==='null'?'*':location.origin);new ResizeObserver(reportHeight).observe(document.querySelector('main'));reportHeight();}
