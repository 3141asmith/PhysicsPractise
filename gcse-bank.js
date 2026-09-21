/* Original practice, checked against AQA 8463 / 8464 in September 2026.
   Calculation families use five deterministic variants; explanations are individual tasks.
   P = separate Physics only, H = Higher only, PH = both restrictions. */
const GCSE_BANK = (() => {
  const topics = ['Energy','Electricity','Particle model of matter','Atomic structure','Forces','Waves','Magnetism and electromagnetism','Space physics'];
  const slugs = ['energy','electricity','particle-model-of-matter','atomic-structure','forces','waves','magnetism-and-electromagnetism','space-physics-physics-only'];
  const questions = [];
  const fmt = n => Number(n.toPrecision(8)).toString();
  function add(topic, key, title, spec, flags, data) {
    questions.push({id:`gcse-${topic}-${key}`,topic,title,spec,physicsOnly:flags.includes('P') || topic===7,higher:flags.includes('H'),paper:topic<4?1:2,...data});
  }
  function calc(topic,key,title,spec,flags,unit,formula,make) {
    for(let i=1;i<=5;i++) {
      const [prompt,answer,working] = make(i);
      add(topic,`${key}-${i}`,`${title} · ${i}`,spec,flags,{type:'numeric',unit,prompt,answer,steps:[formula,working,`Answer: ${fmt(answer)} ${unit}.`],hints:['Identify the unknown and convert the supplied quantities to compatible units.',formula,'Substitute the values, work through the arithmetic and check the unit of your answer.']});
    }
  }
  function written(topic,rows) {
    rows.forEach(([key,spec,flags,prompt,answer,hint])=>{
      const steps=answer.split('|');
      add(topic,key,prompt.split('?')[0].split('. ')[0],spec,flags,{type:'written',prompt,steps,hints:['Identify the physical idea being tested and use precise scientific terms.',hint || 'Link the cause in the question to its physical effect.',`Build your response around this point: ${steps[0]}`]});
    });
  }
  calc(0,'kinetic','Kinetic energy','4.1.1.2','','J','Eₖ = ½mv²',i=>[`A ${2*i} kg trolley travels at ${i+2} m/s. Calculate its kinetic energy.`,i*(i+2)**2,`½ × ${2*i} × ${i+2}² = ${i*(i+2)**2}`]);
  calc(0,'height','Lifting a load','4.1.1.2','','J','Eₚ = mgh',i=>[`A ${i+1} kg load is raised by ${i+2} m. Use g = 10 N/kg. Calculate the increase in gravitational potential energy.`,(i+1)*10*(i+2),`${i+1} × 10 × ${i+2}`]);
  calc(0,'spring','Elastic energy','4.1.1.2','','J','Eₑ = ½ke²',i=>[`A spring of stiffness ${100*i} N/m extends by 0.20 m within its limit of proportionality. Calculate the energy stored.`,2*i,`½ × ${100*i} × 0.20² = ${2*i}`]);
  calc(0,'power','Power output','4.1.1.4','','W','P = E / t',i=>[`A motor transfers ${600*i} J in ${i+2} s. Calculate its average power.`,600*i/(i+2),`${600*i} ÷ ${i+2}`]);
  calc(0,'efficiency','Energy efficiency','4.1.2.2','','%','Efficiency = useful output / total input × 100%',i=>[`A machine receives 800 J and transfers ${80*(i+3)} J usefully. Calculate its percentage efficiency.`,10*(i+3),`${80*(i+3)} ÷ 800 × 100`]);
  calc(0,'heating','Heating a block','4.1.1.3','','J','ΔE = mcΔθ',i=>[`A ${i} kg metal block has specific heat capacity 450 J/(kg °C). Its temperature rises by ${i+4} °C. Calculate the increase in thermal energy.`,i*450*(i+4),`${i} × 450 × ${i+4}`]);
  written(0,[
    ['brakes','4.1.1.1','','Explain the energy transfers when a cyclist brakes.','The kinetic store decreases.|Mechanical work transfers energy to thermal stores in the brakes and surroundings.','Think about friction.'],
    ['fall','4.1.1.1','','Describe the energy changes as a ball falls with negligible air resistance.','Its gravitational potential store decreases.|Its kinetic store increases by the same amount.'],
    ['kettle','4.1.1.1','','Describe how a kettle increases the energy stored in water.','Electrical work transfers energy to the heater.|Heating increases the internal energy of the water.'],
    ['conservation','4.1.2.1','','A machine is said to destroy wasted energy. Explain the error.','Energy is conserved.|The energy is spread into less useful stores in the surroundings.'],
    ['closed','4.1.2.1','','What happens to the total energy in a closed system during transfers?','The total energy remains constant.|Energy moves between stores within the system.'],
    ['lubrication','4.1.2.1','','Why does lubricating moving parts reduce unwanted heating?','Lubrication reduces friction.|Less work is done against friction, reducing transfer to thermal stores.'],
    ['walls','4.1.2.1','','Why does a thicker insulating wall reduce cooling?','It reduces the rate of energy transfer by conduction.|Energy is transferred through a greater thickness of insulation.'],
    ['conductivity','4.1.2.1','','Compare cooling through equal-thickness walls with different thermal conductivities.','The higher-conductivity wall transfers energy faster for the same temperature difference.'],
    ['power-meaning','4.1.1.4','','Two motors lift the same load through the same height. Why is the faster one more powerful?','Both do the same work.|The faster motor transfers that energy in less time.'],
    ['renewable','4.1.3','','Explain why wind is renewable but coal is not.','Wind is replenished by natural processes as it is used.|Coal forms much more slowly than it is consumed.'],
    ['wind','4.1.3','','Give one benefit and one limitation of wind generation.','No fuel is burned during operation.|Output varies with wind speed.'],
    ['solar','4.1.3','','Why cannot solar generation alone always match electricity demand?','Output varies with daylight and cloud cover.|Demand also occurs at night, requiring storage or other sources.'],
    ['nuclear','4.1.3','','Give one advantage and one disadvantage of nuclear fuel.','It can provide reliable output with low operational carbon emissions.|It produces radioactive waste that requires management.'],
    ['fossils','4.1.3','','Why does burning fossil fuels contribute to climate change?','Combustion releases carbon dioxide.|This increases absorption of outgoing infrared radiation in the atmosphere.'],
    ['hydro','4.1.3','','Explain an environmental trade-off when building a hydroelectric reservoir.','It provides renewable electricity.|Flooding land can destroy habitats and displace communities.'],
    ['shc-method','4.1.1.3','','Outline how to determine a metal block’s specific heat capacity.','Measure mass and temperature rise.|Measure energy supplied by a heater and calculate c = E/(mΔθ).|Insulate the block to reduce heat loss.'],
    ['shc-error','4.1.1.3','','If some heater energy warms the room, how is calculated specific heat capacity affected when all supplied energy is used?','The energy assigned to the block is too large.|The calculated specific heat capacity is too high.'],
    ['insulation-test','4.1.2.1','P','How would you fairly compare two wrapping materials as thermal insulators?','Use equal water masses, starting temperatures and wrapping thicknesses.|Measure temperature falls over equal times in identical containers.'],
    ['insulation-repeat','4.1.2.1','P','Why repeat cooling measurements when comparing insulation?','Repeats reveal anomalous results.|A mean reduces the effect of random variation.'],
    ['efficiency-improve','4.1.2.2','H','Explain why reducing friction can increase a machine’s efficiency.','Less input energy is dissipated by unwanted heating.|A greater fraction of the input becomes useful output.']
  ]);
  calc(1,'charge','Charge flow','4.2.1.2','','C','Q = It',i=>[`A current of ${i/2} A flows for ${20*i} s. Calculate the charge transferred.`,10*i*i,`${i/2} × ${20*i}`]);
  calc(1,'voltage','Potential difference','4.2.1.3','','V','V = IR',i=>[`A ${i+2} Ω resistor carries ${i/2} A. Calculate the potential difference.`,(i+2)*i/2,`${i/2} × ${i+2}`]);
  calc(1,'resistance','Resistance','4.2.1.3','','Ω','R = V / I',i=>[`A resistor carries 0.5 A when ${i+2} V is applied. Find its resistance.`,2*(i+2),`${i+2} ÷ 0.5`]);
  calc(1,'series','Series resistance','4.2.2','','Ω','Rtotal = R₁ + R₂',i=>[`Resistors of ${i+2} Ω and ${2*i+3} Ω are connected in series. Find the total resistance.`,3*i+5,`${i+2} + ${2*i+3}`]);
  calc(1,'power','Electrical power','4.2.4.1','','W','P = VI',i=>[`A device draws ${i/10} A from a 12 V supply. Calculate its power.`,1.2*i,`12 × ${i/10}`]);
  calc(1,'energy','Electrical energy','4.2.4.2','','J','E = Pt',i=>[`A ${20*i} W lamp operates for ${i+1} minutes. Calculate the energy transferred.`,20*i*(i+1)*60,`${i+1} minutes = ${(i+1)*60} s; E = ${20*i} × ${(i+1)*60}`]);
  written(1,[
    ['current','4.2.1.2','','What does a current of 1 ampere mean?','One coulomb of charge passes a point each second.'],
    ['voltmeter','4.2.1.3','','How should a voltmeter be connected to measure a lamp’s potential difference?','Connect it in parallel across the lamp.'],
    ['ammeter','4.2.1.2','','How should an ammeter be connected to measure a lamp’s current?','Connect it in series with the lamp.'],
    ['ohmic','4.2.1.4','','Describe the current–potential difference graph for an ohmic resistor at constant temperature.','It is a straight line through the origin.|Current is proportional to potential difference.'],
    ['filament','4.2.1.4','','Why does a filament lamp’s resistance increase as its current rises?','The filament becomes hotter.|Electrons collide more frequently with the vibrating lattice.'],
    ['diode','4.2.1.4','','Describe how a diode behaves when the supply is reversed.','It has a very high resistance in the reverse direction.|Very little current flows.'],
    ['thermistor','4.2.1.4','','How does an NTC thermistor’s resistance change when it is heated?','Its resistance decreases as temperature increases.'],
    ['ldr','4.2.1.4','','How does an LDR’s resistance change when light intensity increases?','Its resistance decreases.'],
    ['parallel','4.2.2','','Why do lamps in parallel each receive the full supply potential difference?','Each lamp is connected across the same two supply terminals.'],
    ['junction','4.2.2','','Why must the currents leaving a junction add to the current entering it?','Charge is conserved.|Charge does not accumulate at the junction.'],
    ['parallel-r','4.2.2','','Why does adding a parallel resistor reduce total resistance?','It provides another path for charge.|The same potential difference drives a larger total current.'],
    ['ac','4.2.3.1','','Explain the difference between alternating and direct current.','Alternating current repeatedly reverses direction.|Direct current flows in one direction.'],
    ['earth','4.2.3.2','','Explain the role of an earth wire in a metal-cased appliance.','It connects the case to earth.|A live-wire fault allows a large current to flow so protective disconnection can occur.'],
    ['fuse','4.2.3.2','','Why must a fuse be connected in the live wire?','A fault current melts the fuse.|Breaking the live connection disconnects the appliance from the live supply.'],
    ['grid','4.2.4.3','','Why does the National Grid use a high transmission voltage?','For a given power, higher voltage means lower current.|Lower current reduces heating losses in cables.'],
    ['wire-practical','4.2.1.3','','Describe a fair test of how wire length affects resistance.','Keep material and cross-sectional area constant.|Measure V and I for different lengths and calculate R = V/I.|Use low currents to limit temperature change.'],
    ['iv-practical','4.2.1.4','','Why vary the supply in an I–V investigation?','It provides several pairs of current and voltage readings.|These show the shape of the characteristic rather than one operating point.'],
    ['static-transfer','4.2.5.1','P','A plastic rod becomes negatively charged when rubbed. What moved?','Electrons transferred onto the rod.|Protons did not move between the materials.'],
    ['static-force','4.2.5.1','P','Two negatively charged rods are brought together. Predict the force.','They repel because they carry charges of the same sign.'],
    ['electric-field','4.2.5.2','P','Explain what an electric field represents around a charged object.','It is a region where another charged object experiences a force.|The field direction is the force direction on a positive test charge.']
  ]);
  calc(2,'density','Density','4.3.1.1','','kg/m³','ρ = m / V',i=>[`A block has mass ${i+1} kg and volume 0.002 m³. Calculate its density.`,500*(i+1),`${i+1} ÷ 0.002`]);
  calc(2,'mass','Mass from density','4.3.1.1','','kg','m = ρV',i=>[`A liquid has density 800 kg/m³ and volume ${i} litres. Calculate its mass. (1 litre = 0.001 m³.)`,0.8*i,`800 × ${i/1000}`]);
  calc(2,'volume','Displacement volume','4.3.1.1','','cm³','Displaced volume = final reading − initial reading',i=>[`An irregular solid is submerged. A cylinder reading rises from ${20+i} cm³ to ${35+3*i} cm³. Find the volume of the solid.`,15+2*i,`${35+3*i} − ${20+i}`]);
  calc(2,'latent','Latent heat','4.3.2.3','','J','E = mL',i=>[`Calculate the energy needed to melt ${i/10} kg of ice at its melting point. Specific latent heat of fusion = 334000 J/kg.`,33400*i,`${i/10} × 334000`]);
  calc(2,'heat-capacity','Specific heat capacity','4.3.2.2','','J/(kg °C)','c = E / (mΔθ)',i=>[`A 2 kg block absorbs ${1000*i} J and warms by 5 °C. Find its specific heat capacity.`,100*i,`${1000*i} ÷ (2 × 5)`]);
  calc(2,'gas','Gas compression','4.3.3.2','P','kPa','p₁V₁ = p₂V₂',i=>[`A fixed gas mass at constant temperature has pressure ${80+10*i} kPa and volume 60 cm³. It is compressed to 30 cm³. Find its new pressure.`,160+20*i,`${80+10*i} × 60 ÷ 30`]);
  written(2,[
    ['solid','4.3.1.1','','Describe particle arrangement and motion in a solid.','Particles are closely spaced in a fixed arrangement.|They vibrate about fixed positions.'],
    ['liquid','4.3.1.1','','Why does a liquid flow while retaining almost constant volume?','Particles remain close together.|They can move past one another.'],
    ['gas-spacing','4.3.1.1','','Why can gases be compressed much more than solids?','Gas particles have large gaps between them.|Compression reduces these gaps.'],
    ['density-particles','4.3.1.1','','Use the particle model to explain why a gas usually has low density.','Its particles are far apart.|There is relatively little mass in a given volume.'],
    ['melting','4.3.1.2','','Why is melting a physical rather than a chemical change?','The substance retains its chemical identity.|It can be reversed by cooling and freezing.'],
    ['mass-state','4.3.1.2','','What happens to mass when ice melts in a sealed container?','Mass stays the same.|No particles are added or removed.'],
    ['internal','4.3.2.1','','What two contributions make up the internal energy of a substance?','The total kinetic energy of its particles.|The total potential energy associated with particle positions.'],
    ['temperature','4.3.2.2','','How does particle motion change when a gas warms?','Its particles have greater average kinetic energy.|They move faster on average.'],
    ['plateau','4.3.2.3','','Why can a substance absorb energy while melting without warming?','The transferred energy changes the particle arrangement and potential energy.|Average particle kinetic energy does not increase during the change of state.'],
    ['fusion-vaporisation','4.3.2.3','','Distinguish latent heat of fusion from latent heat of vaporisation.','Fusion refers to a solid–liquid change.|Vaporisation refers to a liquid–gas change.'],
    ['latent-definition','4.3.2.3','','What does a specific latent heat of 200000 J/kg mean?','200000 J changes the state of 1 kg of the substance without changing its temperature.'],
    ['pressure-origin','4.3.3.1','','Explain how a gas exerts pressure on a container.','Particles collide with the walls.|These collisions exert forces over the wall area.'],
    ['pressure-temperature','4.3.3.1','','Explain why a sealed rigid gas container has higher pressure when heated.','Particles move faster.|Wall collisions are more frequent and involve larger momentum changes.'],
    ['density-regular','4.3.1.1','','Outline a method to measure the density of a rectangular block.','Measure its mass with a balance.|Measure length, width and height to calculate volume.|Divide mass by volume.'],
    ['density-irregular','4.3.1.1','','Outline a method to measure the density of an irregular waterproof stone.','Measure its mass.|Measure the volume of water it displaces.|Divide mass by displaced volume.'],
    ['meniscus','4.3.1.1','','Why read a measuring cylinder at eye level?','It avoids parallax error when reading the meniscus.'],
    ['liquid-mass','4.3.1.1','','How can you measure the mass of a liquid without including its container?','Weigh the empty container and the filled container.|Subtract the empty mass, or tare the balance first.'],
    ['bubbles','4.3.1.1','','Air bubbles cling to a submerged stone. How does this affect its calculated density?','The displaced volume is too large.|The calculated density is too low.'],
    ['gas-volume','4.3.3.2','P','Explain why increasing gas volume lowers pressure at constant temperature.','Particles reach the walls less frequently.|The average force per unit area falls.'],
    ['pump','4.3.3.3','PH','Why can pumping air quickly make a bicycle pump warm?','Work is done on the gas.|Its internal energy and temperature can increase.']
  ]);
  calc(3,'neutrons','Neutron number','4.4.1.2','','neutrons','Neutrons = mass number − atomic number',i=>[`An isotope has mass number ${20+2*i} and atomic number ${9+i}. How many neutrons are in its nucleus?`,11+i,`${20+2*i} − ${9+i}`]);
  calc(3,'protons','Proton number','4.4.1.2','','protons','Protons = mass number − neutron number',i=>[`A nucleus has mass number ${30+3*i} and ${16+2*i} neutrons. How many protons does it contain?`,14+i,`${30+3*i} − ${16+2*i}`]);
  calc(3,'electrons','Neutral atoms','4.4.1.1','','electrons','For a neutral atom, electrons = protons',i=>[`A neutral atom has ${5+2*i} protons and ${6+2*i} neutrons. How many electrons does it have?`,5+2*i,`Neutrality requires ${5+2*i} negative electrons to balance the protons.`]);
  calc(3,'alpha','Alpha decay','4.4.2.2','','nucleons','Alpha emission reduces mass number by 4',i=>[`A nucleus with mass number ${220+2*i} emits one alpha particle. Find the daughter mass number.`,216+2*i,`${220+2*i} − 4`]);
  calc(3,'beta','Beta decay','4.4.2.2','','protons','Beta-minus emission increases atomic number by 1',i=>[`A nucleus with atomic number ${10+i} emits one beta-minus particle. Find the daughter atomic number.`,11+i,`${10+i} + 1`]);
  calc(3,'halflife','Activity after decay','4.4.2.3','H','Bq','Activity after n half-lives = initial activity / 2ⁿ',i=>[`An isotope has half-life 3 hours and initial activity ${160*i} Bq. Find its activity after 6 hours.`,40*i,`6 ÷ 3 = 2 half-lives; ${160*i} ÷ 4`]);
  written(3,[
    ['atom','4.4.1.1','','Describe the distribution of mass and charge in an atom.','Most mass is in the small positive nucleus.|Negative electrons occupy the surrounding region.'],
    ['isotopes','4.4.1.2','','What makes two atoms isotopes of the same element?','They have the same proton number.|They have different neutron numbers.'],
    ['ion','4.4.1.2','','How does a neutral atom become a positive ion?','It loses one or more electrons.'],
    ['excitation','4.4.1.1','','What can happen when an electron in an atom absorbs energy?','It can move to a higher energy level, farther from the nucleus.'],
    ['emission','4.4.1.1','','What happens when an electron moves to a lower energy level?','The atom emits electromagnetic radiation carrying away the energy difference.'],
    ['rutherford','4.4.1.3','','What did rare large deflections in alpha scattering reveal?','Positive charge and most mass are concentrated in a very small nucleus.'],
    ['empty','4.4.1.3','','Why did most alpha particles pass straight through thin gold foil?','Most of an atom is empty space.|Few particles passed close to a nucleus.'],
    ['random','4.4.2.3','','Why cannot you predict when one particular unstable nucleus will decay?','Decay is random.|Half-life describes the behaviour of a large population, not a schedule for individual nuclei.'],
    ['half-definition','4.4.2.3','','Define half-life.','The time for the activity or number of undecayed nuclei in a sample to halve.'],
    ['alpha-nature','4.4.2.1','','Describe an alpha particle.','It contains two protons and two neutrons.|It is a helium nucleus with charge +2.'],
    ['beta-nature','4.4.2.1','','Describe a beta-minus particle and its origin.','It is a fast electron emitted from the nucleus.|A neutron changes into a proton during the decay.'],
    ['gamma','4.4.2.1','','Why does gamma emission leave proton and mass numbers unchanged?','Gamma radiation is electromagnetic radiation.|No proton or neutron is removed.'],
    ['penetration','4.4.2.1','','Compare the penetrating power of alpha and gamma radiation.','Alpha is stopped by paper or a short air distance.|Gamma is much more penetrating and is reduced by thick lead or concrete.'],
    ['ionisation','4.4.2.1','','What does ionising radiation do to an atom?','It can remove electrons, leaving a charged ion.'],
    ['contamination','4.4.2.4','','Distinguish contamination from irradiation.','Contamination puts radioactive material on or inside an object.|Irradiation exposes it to radiation without necessarily transferring radioactive material.'],
    ['source-removed','4.4.2.4','','Does an object necessarily become radioactive after irradiation? Explain.','No; exposure alone does not transfer radioactive material to it.'],
    ['background','4.4.3.1','P','Give a natural and an artificial source of background radiation.','Natural sources include rocks or cosmic rays.|Artificial sources include fallout from nuclear accidents or weapons testing.'],
    ['tracer','4.4.3.3','P','Why should a medical tracer have a suitable short half-life?','It must remain active long enough to be detected.|It should then decay rapidly to reduce the patient’s exposure.'],
    ['fission','4.4.4.1','P','Explain how nuclear fission can produce a chain reaction.','A large nucleus splits and releases neutrons.|Those neutrons can cause further nuclei to split.'],
    ['fusion','4.4.4.2','P','How does fusion differ from fission?','Fusion joins light nuclei.|Fission splits a large nucleus; both processes can release energy.']
  ]);
  calc(4,'weight','Weight','4.5.1.3','','N','W = mg',i=>[`A ${i+2} kg object is in a gravitational field of 9.8 N/kg. Calculate its weight.`,(i+2)*9.8,`${i+2} × 9.8`]);
  calc(4,'force','Resultant force','4.5.6.2.2','','N','F = ma',i=>[`A ${10*i} kg cart accelerates at ${i/2} m/s². Calculate the resultant force.`,5*i*i,`${10*i} × ${i/2}`]);
  calc(4,'acceleration','Acceleration','4.5.6.1.5','','m/s²','a = (v − u) / t',i=>[`A vehicle increases speed from 2 m/s to ${2+3*i} m/s in 3 s along a straight road. Find its acceleration.`,i,`(${2+3*i} − 2) ÷ 3`]);
  calc(4,'spring','Spring force','4.5.3','','N','F = ke',i=>[`A spring with stiffness ${100*i} N/m extends 0.05 m below its limit of proportionality. Calculate its force.`,5*i,`${100*i} × 0.05`]);
  calc(4,'momentum','Momentum','4.5.7.1','H','kg m/s','p = mv',i=>[`A ${i+1} kg trolley travels at 3 m/s. Find the magnitude of its momentum.`,3*(i+1),`${i+1} × 3`]);
  calc(4,'moment','Turning effect','4.5.4','P','N m','Moment = force × perpendicular distance',i=>[`A ${20*i} N force acts at a perpendicular distance of 0.25 m from a pivot. Find its moment.`,5*i,`${20*i} × 0.25`]);
  written(4,[
    ['vector','4.5.1.1','','Distinguish a scalar from a vector, giving an example of each.','A scalar has magnitude only, such as speed.|A vector has magnitude and direction, such as velocity.'],
    ['mass','4.5.1.3','','Why does an astronaut’s weight change on the Moon while mass stays the same?','Weight depends on gravitational field strength.|Mass does not depend on location.'],
    ['balanced','4.5.6.2.1','','A car travels at constant velocity. What can you conclude about its resultant force?','The resultant force is zero.|Driving and resistive forces balance.'],
    ['third-law','4.5.6.2.3','','Why do Newton’s third-law forces not cancel on one object?','They act on different objects.|They are equal and opposite forces from the same interaction.'],
    ['work','4.5.2','','When is mechanical work done by a force?','When the force causes displacement with a component along its direction.|Energy is transferred.'],
    ['elastic','4.5.3','','Distinguish elastic from inelastic deformation.','Elastic deformation reverses when the force is removed.|Inelastic deformation leaves a permanent change.'],
    ['spring-practical','4.5.3','','Describe how to investigate the force–extension relationship of a spring.','Measure the original length.|Add known loads and measure extension.|Plot force against extension and avoid exceeding the elastic limit.'],
    ['distance-graph','4.5.6.1.4','','What does a horizontal section on a distance–time graph mean?','Distance is unchanged.|The object is stationary.'],
    ['gradient','4.5.6.1.4','','How is speed found from a straight section of a distance–time graph?','Calculate its gradient: change in distance divided by change in time.'],
    ['terminal','4.5.6.1.5','','Why does a falling object eventually reach terminal velocity?','Resistance increases with speed.|Eventually resistance balances weight, so acceleration becomes zero.'],
    ['thinking','4.5.6.3.1','','Explain why tiredness can increase stopping distance.','It can increase reaction time.|The vehicle travels farther before braking begins.'],
    ['wet-road','4.5.6.3.3','','Why does a wet road usually increase braking distance?','Reduced tyre–road friction reduces the braking force.|The vehicle decelerates less rapidly.'],
    ['reaction-practical','4.5.6.3.2','','How can a ruler-drop test compare reaction times fairly?','Use the same starting position and release without warning.|Repeat trials and compare mean drop distances or converted times.'],
    ['accel-practical','4.5.6.2.2','','How would you test the effect of force on a trolley’s acceleration?','Keep total moving mass constant.|Vary the pulling force and measure acceleration using motion sensors or light gates.'],
    ['pressure','4.5.5.1.1','P','Why does a smaller contact area produce greater pressure for the same normal force?','Pressure equals force divided by area.|Reducing the area increases the force per unit area.'],
    ['lever','4.5.4','P','Why does a longer spanner make a nut easier to turn?','It increases the perpendicular distance from the pivot.|The same force then produces a larger moment.'],
    ['liquid-depth','4.5.5.1.2','PH','Why does pressure increase with depth in a liquid?','A deeper point has a greater weight of liquid above it.|Pressure increases with depth, density and gravitational field strength.'],
    ['momentum-conserve','4.5.7.2','H','State the condition for conservation of momentum in a collision.','The system is closed, with no resultant external force.|Total momentum before equals total momentum after.'],
    ['airbag','4.5.7.3','PH','Use momentum to explain how an airbag reduces injury risk.','It increases the stopping time for the same momentum change.|The average force is smaller.'],
    ['area-graph','4.5.6.1.5','H','How can displacement be determined from a velocity–time graph?','Calculate the signed area between the graph and the time axis.']
  ]);
  calc(5,'speed','Wave speed','4.6.1.2','','m/s','v = fλ',i=>[`A ripple has frequency ${i+2} Hz and wavelength 0.4 m. Find its speed.`,0.4*(i+2),`${i+2} × 0.4`]);
  calc(5,'frequency','Wave frequency','4.6.1.2','','Hz','f = v / λ',i=>[`A wave travels at ${20*i} m/s with wavelength 2 m. Calculate its frequency.`,10*i,`${20*i} ÷ 2`]);
  calc(5,'period','Wave period','4.6.1.2','','s','T = 1 / f',i=>[`A source vibrates at ${5*i} Hz. Calculate its period.`,1/(5*i),`1 ÷ ${5*i}`]);
  calc(5,'count','Counting oscillations','4.6.1.2','','Hz','f = number of oscillations / time',i=>[`A vibrating ruler completes ${20*i} oscillations in 4 s. Calculate its frequency.`,5*i,`${20*i} ÷ 4`]);
  calc(5,'magnification','Lens magnification','4.6.2.5','P','(no unit)','Magnification = image height / object height',i=>[`A lens forms an image ${6*i} mm high of a 3 mm object. Calculate magnification.`,2*i,`${6*i} ÷ 3`]);
  calc(5,'echo','Echo sounding','4.6.1.5','PH','m','Distance = wave speed × echo time / 2',i=>[`An ultrasound pulse travels through water at 1500 m/s. Its echo returns after ${i/10} s. Find the distance to the reflecting boundary.`,75*i,`1500 × ${i/10} ÷ 2`]);
  written(5,[
    ['transverse','4.6.1.1','','Describe oscillations in a transverse wave relative to its direction of travel.','Oscillations are perpendicular to the direction of energy transfer.'],
    ['longitudinal','4.6.1.1','','Describe oscillations in a longitudinal wave.','Oscillations are parallel to the direction of energy transfer.|Compressions and rarefactions move through the medium.'],
    ['transfer','4.6.1.1','','A floating cork bobs as ripples pass. Why does it not travel with each ripple?','Waves transfer energy rather than causing a net transfer of the medium.|The cork oscillates about its position.'],
    ['amplitude','4.6.1.2','','Define the amplitude of a wave.','The maximum displacement from the equilibrium position.'],
    ['wavelength','4.6.1.2','','Where can you measure one wavelength on a wave profile?','Between adjacent points in phase, such as two neighbouring crests.'],
    ['ripple-practical','4.6.1.2','','How can wavelength be measured more accurately in a ripple tank?','Measure across several successive wavelengths.|Divide that distance by the number of wavelengths.'],
    ['string-practical','4.6.1.2','','What measurements determine wave speed on a vibrating string?','Measure frequency and wavelength.|Calculate their product.'],
    ['vacuum','4.6.2.1','','Why can sunlight reach Earth through space while sound cannot?','Electromagnetic waves do not require a material medium.|Sound requires particles to transmit vibrations.'],
    ['spectrum','4.6.2.1','','Put radio, visible and gamma radiation in order of increasing frequency.','Radio, then visible, then gamma.'],
    ['microwave-use','4.6.2.4','','Give two uses of microwaves.','Satellite communications.|Cooking food.'],
    ['infrared-use','4.6.2.4','','Give two uses of infrared radiation.','Thermal imaging.|Electrical heaters or cooking food.'],
    ['hazards','4.6.2.3','','Why can X-rays damage living tissue?','They are ionising.|They can damage DNA and cause mutations.'],
    ['ir-practical','4.6.2.2','','How would you compare infrared emission from different surfaces fairly?','Use surfaces at the same temperature and of equal area.|Keep detector distance and orientation constant.'],
    ['refraction','4.6.2.2','H','Explain why a wave bends towards the normal on entering a slower medium at an angle.','One side of the wavefront slows first.|The change in speed changes the wave’s direction towards the normal.'],
    ['radio','4.6.2.3','H','How can a radio wave produce a signal in a receiving aerial?','It induces electrical oscillations.|The alternating current has the same frequency as the wave.'],
    ['reflection','4.6.1.3','P','State the relationship between incidence and reflection angles.','They are equal.|Both are measured from the normal.'],
    ['lens','4.6.2.5','P','What happens to rays parallel to the principal axis passing through a convex lens?','They converge at the principal focus on the other side.'],
    ['colour','4.6.2.6','P','Why does a red object appear red in white light?','It reflects red wavelengths more strongly.|It absorbs much of the other visible light.'],
    ['blackbody','4.6.3.1','P','What is a perfect black body?','An object that absorbs all incident electromagnetic radiation.|It is also the best possible emitter at a given temperature.'],
    ['seismic','4.6.1.5','PH','How do S-waves help show that Earth’s outer core is liquid?','S-waves cannot travel through liquids.|Their absence along paths through the outer core is evidence of a liquid layer.']
  ]);
  calc(6,'motor-force','Motor force','4.7.2.2','H','N','F = BIl (wire perpendicular to field)',i=>[`A 0.4 m wire carries ${i} A at right angles to a 0.2 T field. Calculate its force.`,0.08*i,`0.2 × ${i} × 0.4`]);
  calc(6,'motor-current','Motor current','4.7.2.2','H','A','I = F / (Bl)',i=>[`A perpendicular wire of length 0.5 m experiences ${i/10} N in a 0.2 T field. Find its current.`,i,`${i/10} ÷ (0.2 × 0.5)`]);
  calc(6,'turns','Transformer voltage','4.7.3.4','PH','V','Vₛ / Vₚ = Nₛ / Nₚ',i=>[`A transformer has 1000 primary turns and ${100*i} secondary turns. Its primary voltage is 200 V AC. Calculate its secondary voltage.`,20*i,`200 × ${100*i} ÷ 1000`]);
  calc(6,'secondary-current','Ideal transformer current','4.7.3.4','PH','A','VₚIₚ = VₛIₛ for an ideal transformer',i=>[`An ideal transformer has primary voltage 200 V and current ${i/10} A. Its secondary voltage is 20 V. Calculate secondary current.`,i,`200 × ${i/10} ÷ 20`]);
  calc(6,'field','Magnetic flux density','4.7.2.2','H','T','B = F / (Il)',i=>[`A 0.5 m wire carrying 2 A perpendicular to a field experiences ${i/10} N. Find the magnetic flux density.`,i/10,`${i/10} ÷ (2 × 0.5)`]);
  written(6,[
    ['poles','4.7.1.1','','Describe the interaction between two north magnetic poles.','They repel.'],
    ['unlike','4.7.1.1','','Describe the interaction between a north and a south magnetic pole.','They attract.'],
    ['permanent','4.7.1.1','','What distinguishes a permanent magnet from an induced magnet?','A permanent magnet produces its own persistent field.|An induced magnet becomes magnetic in an external field.'],
    ['induced','4.7.1.1','','Why is an unmagnetised iron nail attracted to either pole of a magnet?','The magnet induces magnetism in the nail.|The end nearest the magnet becomes the opposite pole.'],
    ['materials','4.7.1.1','','Name three magnetic elements.','Iron, nickel and cobalt.'],
    ['compass','4.7.1.2','','Why does a compass needle turn near a bar magnet?','The needle is a small magnet.|It aligns with the local magnetic field.'],
    ['field-direction','4.7.1.2','','What is the direction of field lines outside a bar magnet?','From its north pole towards its south pole.'],
    ['field-strength','4.7.1.2','','What does closer spacing of field lines indicate?','A stronger magnetic field.'],
    ['mapping','4.7.1.2','','Outline how to map a magnetic field with a plotting compass.','Place the compass at successive positions and mark the needle direction.|Join the directions into field lines with arrows.'],
    ['earth','4.7.1.2','','What evidence suggests Earth produces a magnetic field?','A freely suspended compass repeatedly aligns roughly north–south.'],
    ['wire-field','4.7.2.1','','Describe the field pattern around a straight current-carrying wire.','Concentric circles centred on the wire.'],
    ['reverse-current','4.7.2.1','','What happens to a wire’s magnetic field when current is reversed?','The field direction reverses.'],
    ['current-strength','4.7.2.1','','How does increasing a wire’s current affect its magnetic field?','It increases the field strength.'],
    ['distance','4.7.2.1','','How does the magnetic field strength change farther from a straight wire?','It decreases.'],
    ['solenoid','4.7.2.1','','Describe the magnetic field inside a long solenoid.','It is strong and approximately uniform away from the ends.|Field lines are nearly parallel.'],
    ['iron-core','4.7.2.1','','Why insert an iron core into a solenoid?','The core becomes magnetised.|It increases the magnetic field strength.'],
    ['electromagnet','4.7.2.1','','Give an advantage of an electromagnet over a permanent magnet.','Its field can be switched on and off by controlling the current.'],
    ['turns-strength','4.7.2.1','','How can the field of a solenoid be strengthened without changing current?','Increase turns per unit length or insert an iron core.'],
    ['motor-direction','4.7.2.2','H','A motor wire’s current reverses but the field stays fixed. What happens to the force?','The force reverses direction.'],
    ['motor-both','4.7.2.2','H','Both current and magnetic field reverse in a motor wire. What happens to the force direction?','It stays the same because reversing both reverses the force twice.'],
    ['rotation','4.7.2.3','H','Why can a current-carrying coil rotate in a magnetic field?','Opposite sides experience forces in opposite directions.|These produce a turning effect.'],
    ['speaker','4.7.2.4','PH','How does a moving-coil loudspeaker produce sound?','Alternating current changes the magnetic force on the coil.|The coil and cone vibrate and create pressure waves in air.'],
    ['induction','4.7.3.1','PH','How can moving a magnet into a coil induce a current?','The magnetic field through the coil changes, inducing a potential difference.|A current flows if the circuit is complete.'],
    ['generator','4.7.3.2','PH','Why does rotating a coil in a magnetic field generate an alternating potential difference?','The field through the coil changes during rotation.|The direction of the induced potential difference reverses every half-turn.'],
    ['transformer-ac','4.7.3.4','PH','Why does a transformer require alternating current for continuous operation?','Alternating current produces a changing magnetic field in the core.|The changing field induces a potential difference in the secondary coil.']
  ]);
  calc(7,'orbit-distance','Orbital distance','4.8.1.3','P','km','Distance = speed × time',i=>[`A satellite travels at a steady 8 km/s for ${i+1} minutes. How far along its orbit does it travel?`,480*(i+1),`${i+1} minutes = ${(i+1)*60} s; 8 × ${(i+1)*60}`]);
  calc(7,'redshift-data','Wavelength change','4.8.2','P','nm','Increase = observed wavelength − reference wavelength',i=>[`A spectral line has reference wavelength 500 nm. In a distant galaxy it is measured at ${510+10*i} nm. Calculate the increase in wavelength.`,10+10*i,`${510+10*i} − 500`]);
  written(7,[
    ['sun','4.8.1.1','P','What type of astronomical object is the Sun?','A star.'],
    ['solar-system','4.8.1.1','P','Describe what is meant by the Solar System.','The Sun and the objects gravitationally bound to it, including planets, dwarf planets and their moons.'],
    ['planet-light','4.8.1.1','P','Why can planets be seen even though they are not stars?','They reflect light from a star rather than generating it by nuclear fusion.'],
    ['moon','4.8.1.1','P','What is a natural satellite?','A naturally occurring object that orbits a planet or another larger body, such as a moon.'],
    ['artificial','4.8.1.3','P','How does an artificial satellite differ from a moon?','An artificial satellite is made and placed in orbit by people.|A moon is natural.'],
    ['galaxy','4.8.1.1','P','What is the name of the galaxy containing our Solar System?','The Milky Way.'],
    ['scale','4.8.1.1','P','Put planet, galaxy and Solar System in order of increasing size.','Planet, Solar System, galaxy.'],
    ['star-galaxy','4.8.1.1','P','Explain why a galaxy is not the same thing as a star.','A galaxy contains a very large number of stars, as well as gas and dust.|A star is an individual object.'],
    ['nebula','4.8.1.1','P','What is a nebula from which a star can form?','A cloud of gas and dust.'],
    ['collapse','4.8.1.1','P','What draws material together at the start of star formation?','Gravitational attraction.'],
    ['protostar','4.8.1.1','P','Why does the centre of a contracting protostar become hotter?','Gravitational collapse transfers energy to the particles.|Their kinetic energy increases.'],
    ['fusion-start','4.8.1.1','P','What must happen before a protostar can become a main-sequence star?','Its core must become hot and dense enough for sustained nuclear fusion.'],
    ['hydrogen','4.8.1.2','P','What is the main fuel used in fusion in a main-sequence star?','Hydrogen nuclei.'],
    ['helium','4.8.1.2','P','What is the principal product of hydrogen fusion in a main-sequence star?','Helium nuclei.'],
    ['equilibrium','4.8.1.1','P','Explain why a main-sequence star can remain stable for a long time.','Gravity tends to compress it.|Outward pressure supported by energy from fusion balances the inward effect of gravity.'],
    ['fuel-loss','4.8.1.2','P','Why does a star leave the main sequence?','Its supply of hydrogen fuel in the core becomes depleted.|The previous balance changes.'],
    ['mass-life','4.8.1.2','P','Which initial property mainly determines the later stages of a star’s life?','Its mass.'],
    ['red-giant','4.8.1.2','P','What expanded stage follows the main sequence for a Sun-like star?','A red giant.'],
    ['sun-remnant','4.8.1.2','P','What dense remnant is left after a Sun-like star sheds its outer layers?','A white dwarf.'],
    ['white-dwarf','4.8.1.2','P','Why does a white dwarf gradually cool?','It no longer has sustained fusion supplying energy.|It radiates away stored energy.'],
    ['black-dwarf','4.8.1.2','P','What is the predicted eventual state of a sufficiently cooled white dwarf?','A black dwarf.'],
    ['supergiant','4.8.1.2','P','What expanded stage can a much more massive star enter after the main sequence?','A red supergiant.'],
    ['supernova','4.8.1.2','P','What is a supernova in the life of a massive star?','A violent explosion near the end of its life that ejects material into space.'],
    ['remnants','4.8.1.2','P','Name two possible remnants of a massive star after a supernova.','A neutron star.|A black hole.'],
    ['sun-supernova','4.8.1.2','P','Why is the Sun not expected to become a black hole?','It is not massive enough.|Its expected remnant is a white dwarf.'],
    ['elements','4.8.1.2','P','How can stars form nuclei of heavier elements?','Fusion combines lighter nuclei into heavier ones.'],
    ['heavy-elements','4.8.1.2','P','In the GCSE stellar-life-cycle model, where are elements heavier than iron formed?','In supernova explosions.'],
    ['dispersal','4.8.1.2','P','How can material made inside a star become part of a later planet?','Stellar ejection and supernova explosions distribute it into space.|It can become part of a later cloud that forms a new system.'],
    ['orbit-force','4.8.1.3','P','Which force keeps planets in their orbits around the Sun?','Gravity.'],
    ['satellite-force','4.8.1.3','P','Which force maintains an artificial satellite’s orbit around Earth?','Earth’s gravitational attraction.'],
    ['no-gravity','4.8.1.3','PH','What would happen to an orbiting satellite if gravity suddenly vanished and no other force acted?','It would move in a straight line along its instantaneous velocity rather than continuing its curved orbit.'],
    ['velocity','4.8.1.3','PH','Why does a satellite at constant speed in a circular orbit still change velocity?','Its direction changes continuously.|Velocity includes direction as well as speed.'],
    ['force-direction','4.8.1.3','PH','In which direction does gravity act for a satellite in a circular orbit?','Towards the centre of the attracting body.|This continuously changes the direction of motion.'],
    ['orbit-change','4.8.1.3','PH','Can a satellite have a different speed in a stable circular orbit of the same radius around the same planet? Explain.','No; changing the speed requires a different stable orbital radius.'],
    ['redshift','4.8.2','P','What is meant by red-shift in light from a distant galaxy?','Its spectral features are observed at longer wavelengths than their reference values.'],
    ['receding','4.8.2','P','What does the red-shift of most distant galaxies indicate?','They are receding from us as space expands.'],
    ['distance-redshift','4.8.2','P','What general relationship is observed between distance and red-shift of distant galaxies?','More distant galaxies generally show larger red-shifts and greater recession speeds.'],
    ['big-bang','4.8.2','P','How does galactic red-shift support the Big Bang model?','It provides evidence that the universe is expanding.|Tracing that expansion backwards suggests a much denser earlier state.'],
    ['accelerating','4.8.2','P','What unexpected trend has been observed in the expansion of the universe?','The expansion is accelerating.'],
    ['unknowns','4.8.2','P','Why are dark matter and dark energy described as unresolved areas of physics?','Observations indicate effects attributed to them.|Their underlying nature is not yet fully understood.']
  ]);
  return {topics,slugs,questions};
})();
if (typeof module !== 'undefined') module.exports = GCSE_BANK;
