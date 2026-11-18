/* Original vector apparatus schematics. Coordinates use a common 800 × 440 canvas.
 * Circuits use IEC resistor symbols; wires end at component terminals, never
 * run behind components. Dashed lines denote references, not electrical leads.
 */
(() => {
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const text = (x,y,s,cls='label',anchor='start') => `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(s)}</text>`;
  const path = (d,cls='apparatus') => `<path d="${d}" class="${cls}"/>`;
  const rect = (x,y,w,h,cls='equipment',r=0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"/>`;
  const circle = (x,y,r,cls='apparatus') => `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
  const dot = (x,y) => circle(x,y,4,'junction');
  const arrow = (x1,y1,x2,y2,cls='direction') => {
    const a=Math.atan2(y2-y1,x2-x1),l=9;
    return path(`M${x1} ${y1} L${x2} ${y2} M${x2-l*Math.cos(a-.45)} ${y2-l*Math.sin(a-.45)} L${x2} ${y2} L${x2-l*Math.cos(a+.45)} ${y2-l*Math.sin(a+.45)}`,cls);
  };
  const dim = (x1,y1,x2,y2,label,tx=(x1+x2)/2,ty=(y1+y2)/2-12) => {
    const a=Math.atan2(y2-y1,x2-x1),dx=6*Math.sin(a),dy=6*Math.cos(a);
    return path(`M${x1} ${y1} L${x2} ${y2} M${x1-dx} ${y1+dy} L${x1+dx} ${y1-dy} M${x2-dx} ${y2+dy} L${x2+dx} ${y2-dy}`,'measurement')+text(tx,ty,label,'measure-label','middle');
  };
  const leader = (d,x,y,label) => path(d,'leader')+text(x,y,label,'small');
  const note = s => rect(24,382,752,38,'note-box',8)+text(42,407,s,'small');
  const heading = (tag,s) => text(28,35,tag,'eyebrow')+text(28,64,s,'diagram-title');
  const ruler = (x,y,w=300) => rect(x,y,w,22,'ruler')+Array.from({length:Math.floor(w/10)+1},(_,i)=>path(`M${x+i*10} ${y} v${i%5===0?14:7}`,'fine')).join('');
  const meter = (x,y,label) => circle(x,y,24,'meter')+text(x,y+7,label,'meter-label','middle');
  const resistor = (x,y,w=90,variable=false) => rect(x,y-12,w,24,'component')+(variable?arrow(x+12,y+28,x+w-12,y-28,'apparatus'):'');
  const cell = (x,y) => path(`M${x} ${y-25} v50 M${x+20} ${y-14} v28`,'component')+text(x-10,y-34,'+','small')+text(x+16,y-25,'−','small');
  const sw = (x,y) => circle(x,y,3,'terminal')+circle(x+46,y,3,'terminal')+path(`M${x} ${y} l38 -22`,'component');
  const support = (x,y,w=140) => path(`M${x} ${y} h${w}`,'support')+Array.from({length:Math.floor(w/12)},(_,i)=>path(`M${x+i*12} ${y} l9 -10`,'fine')).join('');
  const fig = (title,description,svg) => ({title,description,svg,viewBox:'0 0 800 440'});
  const diagrams = {};

  diagrams[1] = [fig('Fundamental stationary wave and tensioning arrangement',
    'A signal generator drives a vibrator. The horizontal vibrating length L runs from the driver node to the pulley tangent. One loop is shown at two opposite phases, with nodes at both ends and an antinode halfway along. The string passes tangentially over the pulley to a hanging mass above a catching tray.',
    heading('RP 01 · APPARATUS','One loop: the fundamental, n = 1')+
    rect(35,195,125,68,'equipment',8)+text(97,224,'Signal','small','middle')+text(97,246,'generator','small','middle')+
    path('M160 216 H182 V238 H205 M160 244 H174 V260 H205','lead')+
    rect(205,218,65,54,'equipment',6)+text(238,298,'Vibrator','small','middle')+
    path('M268 218 V170 M270 170 H640','reference')+
    path('M270 170 Q455 34 640 170','wave')+path('M270 170 Q455 306 640 170','ghost-wave')+
    circle(640,195,25,'pulley')+circle(640,195,4)+path('M640 170 A25 25 0 0 1 665 195 V288','string')+
    dot(270,170)+dot(640,170)+rect(642,288,46,44,'mass',4)+text(665,316,'m','meter-label','middle')+
    path('M620 344 V355 H710 V344','apparatus')+text(710,330,'Tray','small')+
    dim(270,330,640,330,'L = λ / 2',455,320)+
    leader('M275 158 L240 119 H190',85,114,'Approximate node')+
    leader('M455 102 V90 H505',515,94,'Antinode')+
    leader('M640 198 H708',705,181,'Pulley')+text(710,219,'F ≈ mg','small')+
    note('Solid and dashed curves show opposite phases, not two separate strings.'))];

  diagrams[2] = [
    fig('Young’s double slit: slit separation and fringe spacing',
      'Plan view. A laser illuminates two slits separated by s. Rays from both slits meet at a bright fringe on the screen. D is the perpendicular slit-to-screen distance; w is measured between adjacent bright fringe centres. The slit separation is enlarged for clarity.',
      heading('RP 02A · PLAN VIEW','Double slit: measure intervals between bright fringes')+
      rect(35,190,105,44,'equipment',6)+text(87,218,'Laser','small','middle')+path('M140 200 L250 190 M140 224 L250 234','ray')+
      path('M250 110 V185 M250 195 V229 M250 239 V325','screen')+
      path('M250 190 L645 158 M250 234 L645 158','ray')+
      path('M250 212 H645','reference')+path('M645 100 V325','screen')+
      [132,158,184,210,236,262,288].map(y=>path(`M636 ${y} h18`,'fringe')).join('')+
      dim(226,190,226,234,'s',207,218)+dim(250,347,645,347,'D',448,336)+
      dim(690,158,690,184,'w',720,178)+text(660,118,'Screen','small')+
      leader('M250 305 H166',48,310,'Double slit')+text(670,222,'Central','small')+text(670,242,'bright fringe','small')+
      note('For small angles: w ≈ λD/s. Measure across many fringe intervals, then divide.')),
    fig('Diffraction grating: angle to the central direction',
      'Plan view of a grating normal to the laser beam. The central ray and first-order rays reach a flat screen. Angle theta is between the central direction and a first-order ray at the grating. The lateral distance x is measured on the screen from the central maximum. tan theta equals x divided by D.',
      heading('RP 02B · PLAN VIEW','Grating: use the actual diffraction angle')+
      rect(35,195,105,40,'equipment',6)+text(87,221,'Laser','small','middle')+arrow(140,215,248,215,'ray')+
      rect(250,140,8,150,'grating')+path('M258 215 H635 M258 215 L635 115 M258 215 L635 315','ray')+
      path('M635 90 V340','screen')+[115,215,315].map(y=>circle(635,y,5,'bright-dot')).join('')+
      path('M330 215 A72 72 0 0 0 328 196','measurement')+text(340,204,'θ','measure-label')+
      dim(690,115,690,215,'x',715,172)+dim(258,352,635,352,'D',447,341)+
      text(652,107,'n = +1','small')+text(652,241,'n = 0','small')+text(652,333,'n = −1','small')+
      leader('M254 141 V108 H175',40,112,'Grating spacing d')+
      note('θ = arctan(x/D); d sin θ = nλ. Do not assume sin θ ≈ tan θ at large angles.'))
  ];

  diagrams[3] = [fig('Free-fall height measured from the bottom of the ball',
    'An electromagnet holds a steel ball above a contact plate. Height h runs from the bottom of the ball at release to the top of the plate. A dashed vertical path shows the fall, and dashed horizontal lines transfer both reference levels to a vertical rule. The release controller starts the timer and the plate stops it.',
    heading('RP 03 · MEASUREMENT REFERENCES','Electronic timing from release to first contact')+
    support(230,105,200)+rect(285,105,100,42,'equipment',5)+circle(335,163,16,'mass')+
    path('M335 182 V296','reference')+arrow(335,210,335,266)+rect(265,310,140,14,'equipment')+
    path('M245 324 V350 H430 V324','apparatus')+text(270,370,'Catching tray','small')+
    rect(155,110,22,220,'ruler')+Array.from({length:22},(_,i)=>path(`M155 ${110+i*10} h${i%5===0?15:8}`,'fine')).join('')+
    path('M150 179 H319 M150 310 H265','reference')+dim(210,179,210,310,'h',190,250)+
    rect(535,185,210,95,'equipment',8)+text(640,217,'Release controller','small','middle')+text(640,246,'& electronic timer','small','middle')+
    path('M385 125 H600 V185 M405 317 H700 V280','lead')+
    text(430,115,'Start at release','small')+text(495,339,'Stop at contact','small')+
    leader('M351 163 H475',475,158,'Steel ball')+
    note('h is a distance travelled: bottom of ball → top of detector, not ball centre → floor.'))];

  diagrams[3].push(
    fig('Hand-timed ball drop: measure height and start/stop events',
      'A ball is released from rest above a fixed landing surface. Height h is measured from the bottom of the ball to the landing surface, with reference lines to a vertical ruler. A separate observer starts a hand-held stopwatch on release and stops it on first contact. No electronic triggering is used; human reaction delays affect both endpoints.',
      heading('RP 03B · HAND TIMING','Ball and stopwatch: reaction time limits the result')+
      circle(315,145,17,'mass')+path('M296 128 Q285 119 275 131 L264 140 M296 128 H333','apparatus')+
      path('M315 166 V293','reference')+arrow(315,192,315,260)+
      rect(245,310,140,12,'equipment')+path('M225 322 V345 H410 V322','apparatus')+
      rect(150,110,20,220,'ruler')+Array.from({length:22},(_,i)=>path(`M150 ${110+i*10} h${i%5===0?14:7}`,'fine')).join('')+
      path('M145 162 H298 M145 310 H245','reference')+dim(205,162,205,310,'h',186,240)+
      circle(600,221,48,'meter')+rect(588,158,24,15,'equipment',3)+rect(567,211,66,25,'display',3)+text(600,229,'0.56 s','small','middle')+
      text(498,129,'Start: observe release','small')+text(498,153,'Stop: observe first contact','small')+
      text(520,300,'Hand-held stopwatch','label')+text(494,328,'Observer times both events','small')+
      text(245,365,'Fixed landing surface','small')+
      note('Repeat each height. A 0.01 s display does not remove human start/stop delays.')),
    fig('Cart on an inclined ramp with two light gates',
      'A cart carries a short opaque card parallel to the ramp. It moves down a supported ramp through light gate 1 and then light gate 2, connected to a logger. Theta is measured between the ramp and horizontal. H is the vertical rise and L is the corresponding length along the ramp, so sin theta equals H/L. A cushioned stop lies beyond gate 2. Acceleration along the ramp is less than g.',
      heading('RP 03C · INCLINED-PLANE ALTERNATIVE','Find a along the ramp, then use g = a / sin θ')+
      path('M125 150 L660 315 M125 150 V315 H660','apparatus')+
      path('M125 315 H700','reference')+
      path('M591 294 A72 72 0 0 0 588 315','measurement')+text(571,311,'θ','measure-label')+
      dim(88,150,88,315,'H',65,239)+dim(140,128,675,293,'L',435,205)+
      `<g transform="translate(185 169) rotate(17.14)">${rect(0,-29,67,23,'equipment',4)+circle(13,-7,7,'mass')+circle(54,-7,7,'mass')+path('M18 -29 V-65 H56 V-29','test-wire')+dim(18,-76,56,-76,'ℓ',37,-86)}</g>`+
      path('M310 207 V147 H340 V216 M480 259 V200 H510 V269','glass')+
      path('M310 170 H340 M480 224 H510','reference')+
      text(282,131,'Gate 1','small')+text(453,184,'Gate 2','small')+
      path('M340 147 H680 V131 M510 200 H730 V165','lead')+
      rect(635,95,140,70,'equipment',7)+text(705,123,'Data logger','label','middle')+text(705,148,'Two gate inputs','small','middle')+
      arrow(375,237,433,255,'direction')+text(353,287,'Down the ramp','small')+
      rect(643,281,17,33,'mass',3)+text(560,354,'Cushioned end stop','small')+
      note('Card blocking times give speeds; use the time between blocking-event midpoints.'))
  );

  diagrams[4] = [fig('Loaded test wire and independent extension reference',
    'A long test wire hangs from a rigid clamp above a mass hanger and catching tray. Original gauge length L ends at a marker attached to the wire. A travelling microscope, supported separately from the wire, observes movement of that marker from its preloaded position. Diameter is measured independently with a micrometer.',
    heading('RP 04 · LONGITUDINAL SECTION','Measure extension relative to the preloaded wire')+
    support(165,105,260)+rect(270,105,50,24,'equipment',3)+path('M295 129 V306','string')+
    path('M295 279 H345','apparatus')+path('M280 259 H345','reference')+
    dim(215,129,215,259,'L',190,200)+path('M215 129 H280 M215 259 H280','reference')+
    dim(366,259,366,279,'ΔL',396,276)+rect(270,306,50,35,'mass',4)+text(295,330,'m','meter-label','middle')+
    path('M240 346 V360 H350 V346','apparatus')+
    rect(475,232,120,64,'equipment',5)+path('M475 251 L430 251 V277 H475 M530 296 V345 M490 345 H570','apparatus')+
    path('M430 264 H345','reference')+text(460,205,'Travelling microscope','small')+text(461,225,'on separate support','small')+
    leader('M310 166 H455',465,170,'Thin test wire; diameter d')+
    leader('M345 259 L410 135 H480',490,139,'Marker before loading')+
    text(600,315,'Read marker motion','small')+text(600,337,'after adding load','small')+
    note('Measure d with a micrometer at several positions; F is the added load above preload.'))];

  diagrams[5] = [fig('Resistivity circuit: voltmeter across the test length only',
    'A DC supply, open switch, ammeter, variable current-limiting resistor and test wire form a series circuit. A voltmeter is connected in parallel between the two contacts defining the measured wire length L. A ruler lies alongside the wire. There is no connection bypassing the test wire.',
    heading('RP 05 · CIRCUIT DIAGRAM','Ammeter in series; voltmeter across the measured wire')+
    path('M100 222 V140 H175 M221 140 H280 M328 140 H410 M520 140 H660 V310 H570 M230 310 H100 V278','wire')+
    sw(175,140)+meter(304,140,'A')+resistor(410,140,110,true)+
    circle(100,250,28,'meter')+text(100,246,'+','small','middle')+text(100,266,'−','small','middle')+
    path('M230 310 H570','test-wire')+dot(230,310)+dot(570,310)+
    path('M230 310 V230 H376 M424 230 H570 V310','wire')+meter(400,230,'V')+
    ruler(230,330,340)+dim(230,368,570,368,'Measured length L',400,361)+
    text(38,305,'DC supply','small')+text(155,110,'Switch','small')+text(420,103,'Current limiter','small')+
    leader('M570 310 L610 283 H717',680,272,'Contact')+
    note('Move contacts with power off. The voltmeter measures only the section between them.'))];

  diagrams[6] = [fig('EMF circuit with terminal voltmeter and variable load',
    'A real cell is represented by an ideal EMF in series with internal resistance r inside a dashed boundary. A voltmeter spans the external cell terminals, not the ideal EMF alone. The external circuit contains an open switch, ammeter and variable load resistor in series.',
    heading('RP 06 · CIRCUIT DIAGRAM','Measure terminal pd while changing the external load')+
    rect(205,102,390,100,'cell-boundary',10)+
    path('M140 160 H285 M305 160 H390 M480 160 H660 V310 H540 M420 310 H324 M276 310 H206 M160 310 H140 V160','wire')+
    cell(285,160)+resistor(390,160,90)+text(321,144,'ε','measure-label')+text(432,133,'r','measure-label')+
    dot(140,160)+dot(660,160)+path('M140 160 V240 H376 M424 240 H660 V160','wire')+meter(400,240,'V')+
    resistor(420,310,120,true)+meter(300,310,'A')+sw(160,310)+
    text(257,91,'Equivalent model of the real cell','small')+text(430,355,'Variable external load','small')+
    note('V = ε − Ir. The voltmeter connects across BOTH ε and r at the cell’s terminals.'))];

  diagrams[7] = [
    fig('Simple pendulum: pivot-to-centre length and timing marker',
      'The pendulum is shown at a small displaced angle and, dashed, at equilibrium. Length L follows the string from the pivot to the centre of the bob. A fixed fiducial marker marks the equilibrium crossing; complete cycles are timed between crossings in the same direction.',
      heading('RP 07A · PENDULUM','Length runs from pivot to the centre of the bob')+
      support(225,110,300)+dot(355,110)+path('M355 110 V305','reference')+
      path('M355 110 L372 304','string')+circle(372,304,16,'mass')+circle(355,305,16,'ghost')+
      path('M355 159 A49 49 0 0 1 359 159','measurement')+text(373,174,'θ ≈ 5°','measure-label')+
      dim(321,118,338,312,'L',305,222)+path('M321 118 L355 110 M338 312 L372 304','reference')+
      path('M465 340 H360 V327','apparatus')+text(475,344,'Fixed fiducial marker','small')+
      leader('M372 304 H555',565,306,'Bob centre')+text(527,247,'Time 20 full cycles','label')+
      note('Start and stop at the same position moving in the same direction; use small angles.')),
    fig('Vertical mass–spring system: displacement from equilibrium',
      'A spring is fixed to a rigid support with the total attached mass below. A dashed outline shows the equilibrium mass position; a solid outline shows a small downward displacement x. A separate marker identifies equilibrium. The restoring resultant points upwards for a downward displacement.',
      heading('RP 07B · MASS–SPRING','Displacement x is measured from equilibrium')+
      support(215,105,230)+path('M330 105 V128 L316 140 L344 153 L316 166 L344 179 L316 192 L344 205 L330 218 V264','spring')+
      rect(292,230,76,42,'ghost',3)+rect(292,278,76,42,'mass',3)+path('M330 264 V278','string')+
      text(330,305,'m','meter-label','middle')+path('M268 251 H435','reference')+dim(410,251,410,299,'x',434,282)+
      arrow(260,290,260,250)+text(65,273,'Restoring resultant','small')+text(121,294,'towards equilibrium','small')+
      path('M560 251 H445 M560 251 V330','apparatus')+text(490,217,'Fixed marker','small')+
      path('M250 340 V355 H410 V340','apparatus')+
      note('Use total attached mass, including the hanger. Keep oscillations small and vertical.'))
  ];

  diagrams[8] = [
    fig('Boyle’s law: hanging masses expand the gas above a piston',
      'A securely clamped vertical cylinder is sealed at its upper end. Air is trapped above an airtight low-friction piston; the underside is open to atmospheric pressure. A mass hanger is attached to the piston rod below. Adding masses pulls the piston down, increasing the trapped-gas volume and lowering its pressure. A sensor connects to the sealed gas space above the piston. Read volume at the upper piston face, include tube dead volume, and wait for thermal equilibrium at each load. A tray and travel stop prevent falling masses or the piston leaving the barrel.',
      heading('RP 08A · EXPANSION AT CONSTANT TEMPERATURE','Add masses below the piston to expand the trapped gas')+
      support(100,100,120)+path('M180 100 V140 H260','support')+
      path('M260 270 V115 H370 V270','glass')+
      path('M315 115 V92 H575 V120','tube')+
      rect(540,120,220,65,'equipment',7)+text(650,147,'Pressure sensor','label','middle')+text(650,171,'p (absolute)','small','middle')+
      rect(262,192,106,14,'ghost')+rect(260,225,110,14,'piston')+
      path('M315 239 V300','support')+rect(284,300,62,38,'mass',4)+text(315,325,'m','meter-label','middle')+
      text(315,157,'Trapped','small','middle')+text(315,178,'air','small','middle')+
      leader('M100 140 H177',36,164,'Fixed barrel clamp')+
      path('M390 120 V250 M390 130 H404 M390 150 H399 M390 170 H399 M390 190 H404 M390 210 H399 M390 230 H399 M390 250 H404','fine')+
      leader('M370 225 H505',515,230,'Read V at upper face')+
      arrow(438,252,438,293)+text(457,277,'Piston moves down','small')+
      leader('M346 319 H505',515,324,'Add masses to hanger')+
      text(37,287,'Atmosphere acts','small')+text(37,309,'on piston underside','small')+
      path('M250 344 V360 H380 V344','apparatus')+text(402,359,'Catching tray; use a travel stop','small')+
      note('More hanging mass → larger V and lower p. Wait for room temperature at each load.')),
    fig('Charles’s law: movable liquid plug and constant pressure',
      'A vertical uniform-bore capillary has a sealed lower end and an open upper end. A short movable oil plug traps air below it. A water bath surrounds the entire trapped-air column and plug. Air length l runs from the sealed end to the lower meniscus of the plug. A thermometer and stirrer share the bath.',
      heading('RP 08B · APPROXIMATELY CONSTANT PRESSURE','The oil plug must be free to move; the top stays open')+
      path('M150 146 V338 H580 V146','glass')+rect(153,170,424,165,'water')+
      path('M295 102 V312 Q306 324 317 312 V102','glass')+rect(297,198,18,14,'oil')+
      path('M319 104 H370','leader')+text(380,109,'Open to atmosphere','small')+
      path('M315 205 H355','leader')+text(365,209,'Movable oil plug','small')+
      dim(267,212,267,317,'l',245,271)+text(328,269,'Trapped air','small')+
      path('M540 130 V303','apparatus')+circle(540,307,7,'thermometer')+
      path('M215 130 V302 H236','apparatus')+text(165,112,'Stirrer','small')+
      text(555,123,'Thermometer','small')+text(169,365,'Stirred water bath; allow gas and bath to reach the same temperature','small')+
      note('Uniform bore: V = Al. Keep the same plug and orientation; measure T in kelvin.'))
  ];

  diagrams[9] = [fig('Capacitor changeover circuit: distinct charge and discharge paths',
    'A single-pole double-throw switch connects its common terminal to resistor R. In position A the resistor connects to the positive DC supply and charges capacitor C. In position B it connects to the return rail and discharges C through the same resistor, with the positive supply disconnected. A voltmeter is parallel to the capacitor. The switch is drawn in charge position.',
    heading('RP 09 · CIRCUIT DIAGRAM','Changeover switch: A charges, B discharges')+
    path('M110 180 H235 M110 180 V218 M110 274 V330 H670 V180 H644 M596 180 H520 M520 180 H465 M375 180 H310','wire')+
    circle(110,246,28,'meter')+text(110,242,'+','small','middle')+text(110,262,'−','small','middle')+
    circle(235,180,4,'terminal')+circle(235,260,4,'terminal')+dot(310,180)+path('M310 180 L235 180','component')+
    path('M235 260 V330','wire')+resistor(375,180,90)+
    path('M520 180 V236 M520 256 V330 M497 236 H543 M497 256 H543','component')+
    path('M670 180 V330','wire')+meter(620,180,'V')+dot(520,180)+dot(520,330)+
    text(205,156,'A','measure-label')+text(205,265,'B','measure-label')+text(282,151,'Common','small')+
    text(414,146,'R','measure-label')+text(554,254,'C','measure-label')+text(542,223,'+','small')+
    text(44,306,'DC supply','small')+text(303,354,'Return / supply negative','small')+
    note('Only one contact is selected at a time. R limits current during both charging and discharge.'))];

  diagrams[10] = [
    fig('Magnetic force balance: field, current and reaction force',
      'An end-on view shows a wire carrying current out of the page between a north pole on the left and a south pole on the right. Field is to the right. The wire force is upwards; the equal opposite force on the magnet assembly is downwards. The magnet assembly sits on a balance, while the wire has a separate support not on the balance.',
      heading('RP 10A · END-ON VIEW','Balance measures the reaction force on the magnet')+
      rect(200,165,95,105,'north',5)+rect(465,165,95,105,'south',5)+text(247,221,'N','pole-label','middle')+text(512,221,'S','pole-label','middle')+
      [191,235,257].map(y=>arrow(302,y,458,y,'field')).join('')+
      circle(380,218,14,'wire-section')+circle(380,218,4,'junction')+
      arrow(380,195,380,126,'force')+text(398,132,'F on wire','small')+
      path('M200 270 V293 H560 V270 M220 293 V306 M540 293 V306','support')+arrow(585,268,585,311,'force')+text(596,292,'Reaction on magnet','small')+
      rect(175,306,410,50,'equipment',8)+rect(300,319,160,25,'display',4)+text(380,338,'Δm','small','middle')+
      leader('M366 218 L340 120 H125',40,104,'Wire held by a separate clamp')+text(55,147,'⊙ current out of page','small')+
      note('Magnet only on the balance. F = |Δm|g; convert balance changes from grams to kilograms.')),
    fig('Active wire length measured inside the uniform field',
      'Plan view of a straight wire segment crossing a shaded magnetic-field region. Crosses indicate field into the page; current flows to the right, giving force upwards in the page. Only length l inside the approximately uniform field enters F = BIl. Connecting leads outside this region are not included.',
      heading('RP 10B · PLAN VIEW OF ACTIVE SEGMENT','l is the wire length inside the uniform field')+
      rect(235,135,330,175,'field-region',8)+
      [270,330,390,450,510].flatMap(x=>[164,276].map(y=>path(`M${x-5} ${y-5} l10 10 M${x-5} ${y+5} l10 -10`,'field'))).join('')+
      path('M80 220 H710','test-wire')+arrow(110,220,175,220,'current')+text(135,198,'I','measure-label')+
      arrow(400,210,400,160,'force')+text(418,185,'F','measure-label')+
      path('M235 220 V345 M565 220 V345','reference')+dim(235,340,565,340,'Active length l',400,365)+
      text(580,159,'× B into page','small')+text(45,280,'Lead outside field','small')+
      note('F = BIl for a perpendicular wire. Keep I and B fixed when investigating active length.'))
  ];

  diagrams[11] = [
    fig('Search-coil orientation: angle to the normal, not the plane',
      'An edge-on view shows the search coil plane as a sloping line. Its dashed normal is perpendicular to the plane. The angle theta is the acute angle from the magnetic-field direction to the normal. The coil rotates about its fixed centre. At theta zero the plane is perpendicular to the field; at ninety degrees the plane is parallel.',
      heading('RP 11A · EDGE-ON GEOMETRY','θ is measured between B and the coil normal')+
      [155,225,295].map(y=>arrow(95,y,660,y,'field')).join('')+
      path('M322 116 L458 334','coil')+path('M285 291 L537 134','normal')+
      dot(390,225)+path('M456 225 A66 66 0 0 0 446 190','measurement')+text(465,210,'θ','measure-label')+
      path('M406 215 L416 231 L400 241','fine')+
      leader('M338 142 H170',46,121,'Coil plane (edge-on)')+text(548,132,'Normal','label')+text(674,231,'B','measure-label')+
      text(494,315,'Rotate about the centre','small')+text(494,341,'Keep position fixed','small')+
      note('Flux linkage = NBA cos θ. A stationary coil in a steady field has no induced emf.')),
    fig('AC field drive and oscilloscope measurement are separate circuits',
      'An AC signal generator drives field coils. A smaller search coil at their centre connects only to the oscilloscope, with no electrical connection to the field-drive circuit. The oscilloscope shows a sinusoidal induced voltage. Peak-to-peak voltage spans the maximum and minimum of the trace.',
      heading('RP 11B · SIGNAL PATHS','Use an alternating field; keep drive amplitude and f fixed')+
      rect(30,160,145,85,'equipment',8)+text(102,190,'AC generator','small','middle')+text(102,217,'Field drive','small','middle')+
      path('M175 180 H245 V123 H297 M297 287 V310 H422 V287 M422 123 H480 V355 H205 V227 H175','lead')+
      rect(280,123,35,164,'drive-coil',8)+rect(405,123,35,164,'drive-coil',8)+
      Array.from({length:9},(_,i)=>path(`M282 ${135+i*16} h30 M407 ${135+i*16} h30`,'fine')).join('')+
      arrow(325,158,395,158,'field')+text(360,112,'Field coils','small','middle')+
      `<ellipse cx="360" cy="222" rx="21" ry="44" class="coil"/>`+
      path('M369 261 V343 H542 V266 M378 252 V330 H562 V266','signal')+
      rect(515,115,250,150,'equipment',8)+rect(540,140,200,95,'scope-screen',4)+
      [565,590,615,640,665,690,715].map(x=>path(`M${x} 140 V235`,'scope-grid')).join('')+
      [164,188,212].map(y=>path(`M540 ${y} H740`,'scope-grid')).join('')+
      path('M541 188 C554 135 577 135 590 188 S627 241 640 188 S677 135 690 188 S727 241 740 188','trace')+
      dim(752,148,752,228,'Vpp',713,256)+text(535,96,'Oscilloscope','label')+
      text(290,365,'Search-coil leads → scope input','small')+
      note('Vpp = vertical divisions × volts/div × probe factor. Peak emf = Vpp / 2.'))
  ];

  diagrams[12] = [fig('Gamma inverse-square experiment: consistent distance references',
    'A sealed source in a holder faces a GM detector connected to a counter and timer. Dashed vertical reference lines mark the source active position and the detector effective detecting position, which lies inside its housing. Distance r is measured between those positions along a ruler. Diverging rays indicate geometric spreading, not a collimated beam.',
    heading('RP 12 · SOURCE–DETECTOR GEOMETRY','Measure r between the active and effective positions')+
    rect(100,176,70,100,'equipment',6)+circle(150,222,8,'source')+
    path('M158 222 L435 170 M158 222 H435 M158 222 L435 274','gamma')+
    rect(435,171,155,104,'equipment',12)+path('M445 185 V261','fine')+
    path('M590 222 H625','lead')+rect(625,180,145,85,'equipment',8)+text(697,211,'Counter','small','middle')+text(697,239,'& timer','small','middle')+
    path('M150 154 V345 M475 154 V345','reference')+dim(150,304,475,304,'r',312,295)+ruler(100,340,490)+
    leader('M150 176 V130 H65',38,117,'Active source position')+
    leader('M475 173 V125 H539',498,108,'Effective detector position')+
    note('Measure background separately. Corrected count rate = N/t − Nb/tb; expect C ∝ 1/r².'))];

  window.requiredPracticals.forEach(practical => { practical.diagrams = diagrams[practical.id]; });
})();
