const NotesView=(()=>{
  const diagrams={
    '0:2':{kind:'graph',title:'A best-fit line, not dot-to-dot',caption:'Vertical bars show measurement uncertainty. Use widely separated points on the best-fit line to calculate its gradient.'},
    '1:2':{kind:'levels',title:'An emission transition',caption:'An electron moves to a lower energy level. The emitted photon has energy equal to the difference between the two levels.'},
    '2:0':{kind:'wave',title:'One wavelength',caption:'A snapshot of displacement against distance. Wavelength is the distance between adjacent points in phase; amplitude is the maximum displacement from equilibrium.'},
    '6:1':{kind:'decay',title:'Capacitor charging and discharging',caption:'Adjust resistance and capacitance to change the time constant. The moving point shows the capacitor voltage as it charges or discharges.',interactive:'capacitor'}
  };
  const visualRules=[
    [/gravitational|electric field|magnetic field|induction|circular orbit|satellite/, 'field','A mass follows a gravitational field line','The moving marker shows the direction of a field around a central source.'],
    [/capacitor|decay|activity|radioactive|tracer/, 'decay','A changing quantity over time','The curve shows exponential change; the moving marker makes the time dependence visible.'],
    [/wave|interference|stationary|diffraction|string harmonic|ultrasound|sound/, 'wave','A travelling wave','The oscillation moves across the medium while neighbouring points remain coupled.'],
    [/refraction|telescope|optical|lens|x-ray|imaging|light|photon/, 'optics','Rays reveal the geometry','The animated rays make the path, focus or spreading angle easier to follow.'],
    [/force|motion|momentum|energy|equilibrium|material|free fall|projectile/, 'motion','Forces change motion','The marker moves under a changing velocity while the vectors show the local direction.'],
    [/charge|resistance|circuit|network|divider|source|logic|amplifier|sampling|conversion|semiconductor/, 'circuit','Charge moving through a circuit','The moving charge highlights the closed path and the points where electrical energy is transferred.'],
    [/simple harmonic|oscillation|rotation|angular|engine/, 'shm','An oscillator in motion','The position, velocity and restoring tendency change continuously through a cycle.'],
    [/thermal|gas|thermodynamic|heat|reactor/, 'thermal','Particles and energy','The particles move randomly; temperature is linked to their mean kinetic energy.'],
    [/star|stellar|telescope|expansion|distance|spectrum/, 'astro','Reading a signal from space','The visual links an observed signal to the physical model behind it.'],
    [/particle|conservation|nuclear|relativity|experiment|model|binding|radiation/, 'particles','Interactions conserve quantities','The collision illustrates particles changing state while the bookkeeping quantities remain constrained.']
  ];
  function diagramFor(section,topic,index){
    const fixed=diagrams[topic+':'+index];
    if(fixed)return fixed;
    const title=section.title.toLowerCase();
    const match=visualRules.find(([rule])=>rule.test(title));
    const [,kind,heading,caption]=match||[null,'graph','A visual model for this section','The diagram is a compact visual reminder of the relationship described above.'];
    return {kind,title:heading,caption};
  }
  const esc=value=>School.escapeHtml(value);
  function practicalGuide(section){
    if(!section.groups)return '';
    return '<p class="note-practical-source">'+esc(section.sourceReference)+'</p>'+section.groups.map(group=>{
      const tag=group.ordered?'ol':'ul';
      return '<div class="note-practical-group"><h3>'+esc(group.title)+'</h3><'+tag+'>'+group.points.map(point=>'<li>'+PhysicsMath.format(point)+'</li>').join('')+'</'+tag+'></div>';
    }).join('');
  }
  function index(topics){
    return '<div class="notes-heading"><div class="section-label">REVISION LIBRARY</div><h1>Topic notes</h1></div><div class="notes-index">'+topics.map((title,i)=>'<button data-note="'+i+'" class="note-topic"><span class="note-number">'+String(i+1).padStart(2,'0')+'</span><span><strong>'+esc(title)+'</strong><small>'+esc(NOTES[i].sections.slice(0,3).map(s=>s.title).join(' · '))+'</small><span class="note-topic-meta">'+NOTES[i].sections.length+' sections</span></span><span aria-hidden="true">&rarr;</span></button>').join('')+'</div>';
  }
  function topic(note,title,topic,returnQuestion){
    return '<button id="notes-home" class="notes-back">&larr; All topic notes</button><div class="heading notes-heading"><div><div class="section-label">TOPIC '+String(topic+1).padStart(2,'0')+' &middot; REVISION NOTES</div><h1>'+esc(title)+'</h1></div><button id="return-practice" class="secondary">'+(returnQuestion?'Back to question':'Practise this topic')+'</button></div><nav class="notes-toc" aria-label="Note sections">'+note.sections.map((s,i)=>'<a href="#note-section-'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(s.title)+'</a>').join('')+'</nav><div class="notes-reading">'+note.sections.map((section,i)=>{
      const example=/worked example/i.test(section.title),diagram=diagramFor(section,topic,i);
      const guide=practicalGuide(section);
      const controls=diagram&&diagram.interactive==='capacitor'?'<div class="note-controls" data-capacitor-controls><div class="note-control-row"><label>Resistance <output data-cap-output="r">10 kΩ</output><input type="range" min="1" max="100" value="10" step="1" data-cap-input="r"></label><label>Capacitance <output data-cap-output="c">100 μF</output><input type="range" min="10" max="1000" value="100" step="10" data-cap-input="c"></label></div><div class="note-control-row note-control-actions"><span>Mode</span><div class="segmented"><button type="button" data-cap-mode="charge" aria-pressed="true">Charge</button><button type="button" data-cap-mode="discharge" aria-pressed="false">Discharge</button></div><strong data-cap-output="tau">τ = 1.00 s</strong></div></div>':'';
      return '<section class="note-section '+(example?'note-example':'')+'" id="note-section-'+i+'"><div class="note-section-heading"><span class="note-number">'+String(i+1).padStart(2,'0')+'</span><h2>'+esc(section.title)+'</h2></div><div class="note-body">'+(section.reference?'<p class="note-reference">Specification '+esc(section.reference)+'</p>':'')+section.points.map(point=>'<div class="'+(point.startsWith('\\(')?'note-equation':'note-point')+'">'+PhysicsMath.format(point)+'</div>').join('')+guide+(diagram?'<figure class="note-figure '+(diagram.interactive?'note-interactive':'')+'"><h3>'+esc(diagram.title)+'</h3>'+controls+'<canvas data-note-diagram="'+diagram.kind+'"'+(diagram.interactive?' data-note-interactive="'+diagram.interactive+'"':'')+' role="img" aria-label="'+esc(diagram.title+'. '+diagram.caption)+'"></canvas><figcaption>'+esc(diagram.caption)+'</figcaption></figure>':'')+'</div></section>';
    }).join('')+'</div><details class="notes-source"><summary>Sources and further reading</summary><p>'+esc(note.source)+'</p></details>';
  }
  function draw(canvas,now=0){
    const w=600,h=280,dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;
    const c=canvas.getContext('2d');c.scale(dpr,dpr);
    const dark=document.documentElement.dataset.theme==='dark',ink=dark?'#dce9e2':'#31483e',muted=dark?'#9aaea1':'#6c7d74',accent=dark?'#76d6b1':'#156b59',warm=dark?'#f1c66f':'#9c6314';
    c.font=(canvas.clientWidth<450?'19':'15')+'px Arial';c.lineWidth=2;c.lineCap='round';
    const line=(x,y,x2,y2,color=muted)=>{c.strokeStyle=color;c.beginPath();c.moveTo(x,y);c.lineTo(x2,y2);c.stroke();};
    const text=(s,x,y,color=ink)=>{c.fillStyle=color;c.fillText(s,x,y);};
    const arrow=(x,y,x2,y2,color=accent)=>{line(x,y,x2,y2,color);const a=Math.atan2(y2-y,x2-x);line(x2,y2,x2-9*Math.cos(a-.45),y2-9*Math.sin(a-.45),color);line(x2,y2,x2-9*Math.cos(a+.45),y2-9*Math.sin(a+.45),color);};
    const curve=(fn,x0,x1,color=accent)=>{c.strokeStyle=color;c.lineWidth=3;c.beginPath();for(let x=x0;x<=x1;x++){const y=fn(x);if(x===x0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();c.lineWidth=2;};
    const dot=(x,y,r=5,color=warm)=>{c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();};
    const pulse=(x,y,color=accent)=>{c.strokeStyle=color;c.globalAlpha=.35;c.beginPath();c.arc(x,y,11+8*Math.sin(now/240),0,Math.PI*2);c.stroke();c.globalAlpha=1;dot(x,y,5,color);};
    switch(canvas.dataset.noteDiagram){
      case 'field':{
        const cx=300,cy=142,phase=now/2600;
        c.fillStyle=warm;c.beginPath();c.arc(cx,cy,22,0,Math.PI*2);c.fill();text('source',276,184,warm);
        for(let r=42;r<135;r+=24){for(let i=0;i<12;i++){const a=i*Math.PI/6;const x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);arrow(cx+(r-9)*Math.cos(a),cy+(r-9)*Math.sin(a),x,y,accent);}}
        const radius=82+28*Math.sin(phase),angle=phase*1.8;const x=cx+radius*Math.cos(angle),y=cy+radius*.62*Math.sin(angle);
        pulse(x,y);text('test mass',x-25,y-14);text('field direction',426,45,accent);arrow(426,55,493,55,accent);break;}
      case 'motion':{
        const x=90+((now/9)%410),y=205-75*Math.sin((x-90)/410*Math.PI);arrow(62,220,550,220,muted);arrow(62,220,62,35,muted);text('position',72,32);text('time',515,245);dot(x,y,7);arrow(x,y,x+35,y-18,warm);text('velocity',x+40,y-20,warm);c.setLineDash([4,5]);line(x,y,x,220,muted);c.setLineDash([]);break;}
      case 'circuit':{
        const left=160,right=440,top=65,bottom=215;line(left,top,right,top,accent);line(right,top,right,bottom,accent);line(right,bottom,left,bottom,accent);line(left,bottom,left,top,accent);line(270,top,330,top,warm);line(270,bottom,330,bottom,warm);text('cell',284,49,warm);text('load',275,249);const p=(now/5)%((right-left)*2+(bottom-top)*2);let x=left,y=top;if(p<right-left)x=left+p;else if(p<right-left+bottom-top){x=right;y=top+p-(right-left);}else if(p<2*(right-left)+bottom-top){x=right-(p-(right-left)-(bottom-top));y=bottom;}else{x=left;y=bottom-(p-2*(right-left)-(bottom-top));}pulse(x,y);text('charge flow',210,145,accent);break;}
      case 'shm':{
        const equilibrium=300,amplitude=145,phase=now/650;const x=equilibrium+amplitude*Math.sin(phase);line(90,142,510,142,muted);line(equilibrium,60,equilibrium,225,muted);line(x,142,x,85,warm);dot(x,85,8);arrow(x,85,x-(x-equilibrium)*.2,85,warm);text('restoring direction',365,55,warm);text('equilibrium',263,244);break;}
      case 'thermal':{
        const phase=now/400;for(let i=0;i<18;i++){const x=105+(i%6)*78,y=75+Math.floor(i/6)*62;const dx=22*Math.sin(phase+i),dy=16*Math.cos(phase*1.17+i);dot(x,y,4,accent);arrow(x,y,x+dx,y+dy,warm);}text('random molecular motion',205,252,accent);break;}
      case 'particles':{
        const phase=(now/1200)%1;const x1=150+120*phase,y1=170-75*phase,x2=450-120*phase,y2=170-75*phase;dot(x1,y1,7,accent);dot(x2,y2,7,warm);if(phase>.45){arrow(x1,y1,270,105,accent);arrow(x2,y2,330,105,warm);}else{arrow(x1,y1,x1+42,-22+y1,accent);arrow(x2,y2,x2-42,-22+y2,warm);}text('before',115,225);text('after interaction',395,225);break;}
      case 'optics':{
        const x=85+((now/10)%410),focus=320;line(65,140,550,140,muted);line(focus,52,focus,228,muted);for(let i=-1;i<=1;i++){const y=105+i*35;line(65,y,x,y,accent);line(x,y,focus,140,accent);}text('incident rays',75,76,accent);text('focus',focus-16,244,warm);break;}
      case 'astro':{
        const phase=now/1800;dot(300,140,25,warm);for(let i=0;i<5;i++){c.strokeStyle=i%2?muted:accent;c.globalAlpha=.45;c.beginPath();c.ellipse(300,140,55+i*37,26+i*19,phase+i*.2,0,Math.PI*2);c.stroke();c.globalAlpha=1;}const x=300+115*Math.cos(phase),y=140+65*Math.sin(phase);pulse(x,y);text('orbit / observed signal',205,252,accent);break;}
      case 'wave':
        arrow(55,145,560,145,muted);arrow(55,225,55,30,muted);text('Displacement',65,28);text('Distance',490,252);
        curve(x=>145-60*Math.sin((x-65)*Math.PI*2/220-now/260),65,550);
        arrow(120,55,340,55,warm);arrow(340,55,120,55,warm);text('Wavelength',187,43,warm);
        c.setLineDash([4,5]);line(120,60,120,85);line(340,60,340,85);c.setLineDash([]);
        c.setLineDash([4,5]);line(340,85,395,85);c.setLineDash([]);arrow(395,145,395,85,warm);text('Amplitude',405,100,warm);text('0',35,150);break;
      case 'levels':
        line(100,65,440,65,accent);line(100,205,440,205,accent);text('Higher energy, E2',105,45);text('Lower energy, E1',105,238);
        const levelY=72+63*(1+Math.sin(now/500));arrow(235,levelY,235,198,warm);dot(235,levelY,7,warm);text('Electron',125,132);text('transition',125,151);
        curve(x=>133+9*Math.sin((x-270)/8),270,440,warm);arrow(440,133,475,133,warm);text('Emitted photon',325,173);text('Energy = E2 - E1',325,195);
        arrow(65,220,65,45,muted);c.save();c.translate(35,175);c.rotate(-Math.PI/2);text('Energy',0,0);c.restore();break;
      case 'decay':{
        arrow(65,220,555,220,muted);arrow(65,220,65,32,muted);text('Voltage / V0',75,27);text('Time / RC',478,265);
        const figure=canvas.closest('figure'),interactive=canvas.dataset.noteInteractive==='capacitor';
        const resistance=interactive?Number(figure.querySelector('[data-cap-input="r"]').value):10;
        const capacitance=interactive?Number(figure.querySelector('[data-cap-input="c"]').value):100;
        const tau=interactive?resistance*capacitance/1000:1;
        const charging=interactive?figure.querySelector('[data-cap-mode="charge"]').getAttribute('aria-pressed')==='true':false;
        const graphWidth=470,graphHeight=170;
        curve(x=>{const elapsed=((x-65)/graphWidth)*5*tau;const value=charging?1-Math.exp(-elapsed/tau):Math.exp(-elapsed/tau);return 220-graphHeight*value;},65,535);
        c.setLineDash([5,5]);const y=220-170/Math.E;line(65,y,175,y,warm);line(175,y,175,220,warm);c.setLineDash([]);
        text('1',40,55);text('0',40,225);text('0.37',20,y+5,warm);
        for(let i=1;i<=4;i++){line(65+110*i,220,65+110*i,225);text(String(i),60+110*i,243);}
        if(interactive){const elapsed=(now/900%5)*tau;const value=charging?1-Math.exp(-elapsed/tau):Math.exp(-elapsed/tau);const x=65+graphWidth*(elapsed/(5*tau));pulse(x,220-graphHeight*value,warm);text(charging?'Charging':'Discharging',260,92,warm);text('τ = RC = '+tau.toFixed(2)+' s',260,115,warm);}else{text('After one time constant',260,92);text('V = V0 / e',260,115,warm);}break;}
      case 'graph':
        arrow(65,225,550,225,muted);arrow(65,225,65,32,muted);text('Measured y',75,28);text('Independent variable x',360,260);
        [[115,195],[200,162],[290,126],[375,103],[465,67]].forEach(([x,y])=>{line(x,y-15,x,y+15,warm);line(x-6,y-15,x+6,y-15,warm);line(x-6,y+15,x+6,y+15,warm);c.fillStyle=ink;c.beginPath();c.arc(x,y,4,0,Math.PI*2);c.fill();});
        line(90,207,510,51,accent);text('Best fit',360,45,accent);text('Arbitrary units',82,249);break;
    }
  }
  let animationFrame=0;
  const drawAll=()=>{
    cancelAnimationFrame(animationFrame);
    bindControls();
    const canvases=[...document.querySelectorAll('[data-note-diagram]')];
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const render=now=>{
      canvases.forEach(canvas=>draw(canvas,reduced?0:now));
      if(!reduced&&canvases.length)animationFrame=requestAnimationFrame(render);
    };
    render(0);
  };
  function bindControls(){
    document.querySelectorAll('[data-capacitor-controls]').forEach(controls=>{
      controls.querySelectorAll('[data-cap-input]').forEach(input=>input.oninput=()=>{
        const r=Number(controls.querySelector('[data-cap-input="r"]').value),c=Number(controls.querySelector('[data-cap-input="c"]').value);
        controls.querySelector('[data-cap-output="r"]').textContent=r+' kΩ';
        controls.querySelector('[data-cap-output="c"]').textContent=c+' μF';
        controls.querySelector('[data-cap-output="tau"]').textContent='τ = '+(r*c/1000).toFixed(2)+' s';
        drawAll();
      });
      controls.querySelectorAll('[data-cap-mode]').forEach(button=>button.onclick=()=>{
        controls.querySelectorAll('[data-cap-mode]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
        drawAll();
      });
    });
  }
  new MutationObserver(drawAll).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return {index,topic,drawAll};
})();
