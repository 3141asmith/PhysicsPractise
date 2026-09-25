// Diagram values and answers are generated together for each student's bank.
(()=>{
 const S=String.raw;
 const scale=1+Math.floor(typeof STUDENT_VARIANT==='function'?STUDENT_VARIANT(3,'diagram-scale',1):2);
 const graph=(title,xLabel,yLabel,points)=>({kind:'graph',title,xLabel,yLabel,points});
 function pair(key,topic,diagram,prompt,answer,unit,steps,explain,marking,hints){
  QUESTIONS.push({id:'diagram-'+key+'-calc',topic,level:'Challenge',title:diagram.title,type:'numeric',marks:4,prompt,answer,unit,steps,hints,diagram});
  QUESTIONS.push({id:'diagram-'+key+'-explain',topic,level:'Challenge',title:diagram.title,type:'written',marks:4,prompt:explain,steps:marking,hints:[hints[0],'Refer to a specific feature of the diagram.','Connect that feature to the physical principle, including any assumptions.'],diagram});
 }
 const v=2*scale;
 pair('motion',3,graph('Reversing motion','Time / s','Velocity / m per s',[[0,0],[2,v],[4,v],[6,-v],[8,0]]),
  'The straight segments show the velocity of a trolley. Calculate the total distance travelled from 0 to 8 s, accounting for the change of direction.',5*v,'m',
  [S`Distance is the sum of the magnitudes of the areas under the velocity-time graph.`,`The areas for 0-2 s and 2-4 s are ${v} m and ${2*v} m.`,`Velocity crosses zero at 5 s. The two triangles between 4 and 6 s total ${v} m; the last triangle adds ${v} m.`,`Total distance = ${5*v} m.`],
  'Explain when the trolley reverses direction, and why its total distance is greater than the magnitude of its displacement. Compare its acceleration during 0-2 s and 4-6 s.',
  ['Velocity changes sign at 5 s, so the direction reverses then.','Displacement is signed area; distance includes the magnitude of the negative areas.',`Initial acceleration is ${v/2} m per s squared; during 4-6 s it is ${-v} m per s squared. The latter has twice the magnitude and opposite sign.`],['Distinguish signed area from distance.','Find where the sloping segment crosses zero.','Split the graph into rectangles and triangles on each side of the axis.']);
 const force=10*scale,friction=4*scale,mass=2*scale;
 pair('vectors',3,{kind:'vectors',title:'Oblique pull on a rough surface',force,friction,angle:30},
  `A block of mass ${mass} kg is pulled along a horizontal surface by the forces shown. The vertical acceleration is zero. Calculate the normal contact force. Use g = 9.81 m per s squared.`,mass*9.81-force*.5,'N',
  [S`Resolve vertically: \(R+F\sin30^\circ-mg=0\).`,S`\(R=mg-F\sin30^\circ\).`,`R = ${mass} x 9.81 - ${force} x 0.5 = ${mass*9.81-force*.5} N.`],
  'Explain why the normal contact force is not equal to the weight. State the direction of horizontal acceleration and justify it by resolving the forces. Are the normal force and weight a Newton third-law pair?',
  ['The applied pull has an upward component, reducing the normal force required for vertical equilibrium.',`The rightward component is ${force} cos(30 degrees), greater than the leftward friction ${friction} N, so acceleration is rightward.`,'Weight and normal force both act on the block; third-law partners act on different bodies.'],['Resolve the oblique force into horizontal and vertical components.','The labelled angle is measured from the horizontal.','Vertical equilibrium involves three forces, not only weight and normal reaction.']);
 pair('elastic',3,graph('Nonlinear elastic loading','Extension / mm','Force / N',[[0,0],[2,20*scale],[4,30*scale],[6,35*scale]]),
  'The force-extension curve is represented by straight segments between the plotted points. Calculate the work done stretching the specimen from 0 to 6 mm.',.135*scale,'J',
  ['Work is the area under the force-extension graph. Convert millimetres to metres.',`Sum trapezia: (0 + ${20*scale}) x 0.002 / 2 + (${20*scale} + ${30*scale}) x 0.002 / 2 + (${30*scale} + ${35*scale}) x 0.002 / 2.`,`Work = ${.135*scale} J.`],
  'A student claims this graph proves the specimen has permanently deformed. Evaluate that claim and explain why using half the final force multiplied by final extension would be inappropriate.',
  ['The changing gradient shows non-Hookean behaviour, not necessarily permanent deformation.','An unloading curve or a residual-extension measurement is needed to determine whether deformation is permanent.','Half the final force times extension assumes a straight loading line through the origin; the areas of the actual segments must be used.'],['Identify the physical meaning of area under this graph.','Convert the horizontal-axis unit before finding energy.','Use one trapezium for each segment.']);
 const emf=scale+2,r=.5*scale;
 pair('cell',4,graph('Cell under load','Current / A','Terminal voltage / V',[[0,emf],[1,emf-r],[2,emf-2*r]]),
  'The plotted line describes a cell with constant emf and internal resistance. Calculate the power dissipated inside the cell when its current is 1.5 A.',2.25*r,'W',
  [S`\(V=\mathcal E-Ir\), so internal resistance is the negative gradient.`,`r = (${emf} - ${emf-2*r}) / 2 = ${r} ohm.`,S`\(P_{\mathrm{internal}}=I^2r\).`,`Power = 1.5 squared x ${r} = ${2.25*r} W.`],
  'Identify the physical meaning of the vertical intercept and gradient. Explain why electrical power supplied by the cell is greater than power delivered to the external load at nonzero current.',
  ['The vertical intercept is emf; the negative of the gradient is internal resistance.','The emf is energy transferred to charge per unit charge; terminal voltage is energy per unit charge delivered externally.',S`The internal dissipation is \(I^2r\); therefore \(\mathcal E I=VI+I^2r\).`],['Use the slope to find an internal property of the cell.','The negative gradient is internal resistance, not emf.','Internal power uses current squared times internal resistance.']);
 const tau=2*scale;
 pair('capacitor',6,graph('Logarithmic discharge','Time / s','ln(V / V0)',[[0,0],[tau,-1],[2*tau,-2],[3*tau,-3]]),
  'The capacitor discharges through a 40 kilo-ohm resistor. Use the plotted logarithmic data to determine its capacitance in microfarads. Assume negligible voltmeter loading.',tau/40000*1e6,'microfarads',
  [S`\(\ln(V/V_0)=-t/(RC)\). The gradient is \(-1/(RC)\).`,`Time constant = ${tau} s.`,`C = ${tau} / 40000 F = ${tau/40000*1e6} microfarads.`],
  'Explain what the straight line shows about the discharge. Predict how connecting a voltmeter with resistance comparable to the discharge resistor would change the gradient magnitude, and explain why.',
  ['A constant logarithmic gradient supports exponential decay with a constant time constant.','The voltmeter is an additional parallel discharge path, reducing effective resistance.','The time constant decreases, so the negative gradient becomes steeper.'],['The vertical axis is a natural logarithm, not voltage.','Find the gradient using well-separated points.','The reciprocal of the gradient magnitude is the time constant.']);
 const a=.4*scale;
 pair('pendulum',13,graph('Pendulum with a length offset','Recorded length / m','Period squared / s squared',[[.2,.2*a+.12],[.5,.5*a+.12],[.8,.8*a+.12]]),
  'The measured length omits a constant distance e from the pivot to the centre of the bob: true length = recorded length + e. Use the straight-line plot to determine e in metres.',.12/a,'m',
  [S`\(T^2=(4\pi^2/g)(L+e)=aL+ae\).`,`Gradient a = ${a} s squared per metre; vertical intercept b = 0.12 s squared.`,`e = b / a = ${.12/a} m.`],
  'Explain why forcing the fitted line through the origin would be inappropriate. Describe a measurement change that addresses this error and explain why simply repeating the timings does not correct it.',
  ['The nonzero intercept is consistent with a constant length offset under the stated model.','Measure length from the actual pivot to the centre of mass of the bob.','Repeating timings reduces random scatter but does not correct a consistently omitted distance. Other systematic effects should also be considered in a real experiment.'],['Write the pendulum equation using true rather than recorded length.','Compare the result with y = ax + b.','The intercept equals the gradient multiplied by the missing length.']);
})();
