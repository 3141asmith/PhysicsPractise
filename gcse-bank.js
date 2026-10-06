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
      const parameter=typeof GCSE_VARIANT==='function'?GCSE_VARIANT(topic,key,i):i;
      const [prompt,answer,working] = make(parameter);
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

  // Additional GCSE practice: 80 calculations, 40 explanations and 80 graph tasks.
  calc(0,'work-distance','Work against friction','4.1.1.1','','J','W = Fs',i=>[
    'A crate is pushed '+(20*i)+' m against a constant frictional force of 30 N. Calculate the energy transferred by work.',600*i,'30 × '+(20*i)]);
  calc(0,'useful-power','Useful power from efficiency','4.1.2.2','','W','Useful power = efficiency × input power',i=>[
    'A motor has efficiency 0.75 and input power '+(200*i)+' W. Calculate its useful output power.',150*i,'0.75 × '+(200*i)]);
  calc(1,'power-resistor','Power in a resistor','4.2.4.1','','W','P = I²R',i=>[
    'A current of '+i+' A flows through a 4 ohm resistor. Calculate its power.',4*i*i,i+'² × 4']);
  calc(1,'energy-charge','Energy per charge','4.2.4.2','','J','E = QV',i=>[
    'A battery supplies '+(30*i)+' C through a potential difference of 6 V. Calculate the energy transferred.',180*i,(30*i)+' × 6']);
  calc(2,'latent-rearrange','Finding specific latent heat','4.3.2.3','','J/kg','L = E / m',i=>[
    'Melting '+(0.2*i)+' kg of a solid at constant temperature requires '+(40000*i)+' J. Calculate its specific latent heat.',200000,(40000*i)+' / '+(0.2*i)]);
  calc(2,'density-convert','Density with volume conversion','4.3.1.1','','kg/m³','Density = mass / volume',i=>[
    'A sample has mass '+(160*i)+' g and volume '+(20*i)+' cm³. Calculate its density in kg/m³.',8000,'Convert grams to kg and cm³ to m³: '+(0.16*i)+' / '+(20*i/1e6)]);
  calc(3,'background-correction','Correcting count rate','4.4.2.2','','counts/min','Source count rate = measured rate − background rate',i=>[
    'A detector measures '+(100*i+25)+' counts/min beside a source. Background is 25 counts/min. Calculate the corrected source count rate.',100*i,(100*i+25)+' − 25']);
  calc(3,'decay-fraction','Remaining radioactive fraction','4.4.2.3','H','%','Remaining fraction = (1/2)^number of half-lives',i=>[
    'A radioactive sample has half-life 2 hours. What percentage of its original undecayed nuclei remains after '+(2*i)+' hours?',100/2**i,i+' half-lives; 100 / 2^'+i]);
  calc(4,'travel-speed','Average journey speed','4.5.6.1.2','','m/s','Speed = distance / time',i=>[
    'A runner covers '+(120*i)+' m in '+(30+i)+' s. Calculate the average speed.',120*i/(30+i),(120*i)+' / '+(30+i)]);
  calc(4,'stopping-total','Total stopping distance','4.5.6.3.1','','m','Stopping distance = thinking distance + braking distance',i=>[
    'A vehicle has thinking distance '+(6*i)+' m and braking distance '+(12*i)+' m. Calculate its stopping distance.',18*i,(6*i)+' + '+(12*i)]);
  calc(5,'wave-length','Rearranging the wave equation','4.6.1.2','','m','Wavelength = wave speed / frequency',i=>[
    'A wave travels at 24 m/s with frequency '+(2*i)+' Hz. Calculate its wavelength.',12/i,'24 / '+(2*i)]);
  calc(5,'wave-time','Wave travel time','4.6.1.2','','s','Time = distance / speed',i=>[
    'Sound travels '+(340*i)+' m at 340 m/s. Calculate the travel time.',i,(340*i)+' / 340']);
  calc(6,'motor-length','Wire length in a magnetic field','4.7.2.2','H','m','l = F / (BI)',i=>[
    'A wire perpendicular to a 0.5 T field carries 2 A and experiences a force of '+(0.1*i)+' N. Calculate its length within the field.',0.1*i,(0.1*i)+' / (0.5 × 2)']);
  calc(6,'transformer-output','Ideal transformer output power','4.7.3.4','PH','W','Input power = output power = VI',i=>[
    'An ideal transformer has primary voltage 230 V and primary current '+i+' A. Calculate its secondary output power.',230*i,'230 × '+i]);
  calc(7,'orbit-time','Orbital travel time','4.8.1.3','P','s','Time = distance / speed',i=>[
    'During part of an orbit a satellite travels '+(750*i)+' km at a steady 7.5 km/s. Calculate the time taken.',100*i,(750*i)+' / 7.5']);
  calc(7,'spectral-change','Wavelength increase','4.8.2','P','nm','Increase = observed wavelength − reference wavelength',i=>[
    'A spectral line has reference wavelength 500 nm and is observed from a galaxy at '+(500+10*i)+' nm. Calculate the wavelength increase.',10*i,(500+10*i)+' − 500']);

  const extraWritten = [
    [0,'insulation-air','4.1.2.1','','Explain how trapped air in loft insulation reduces energy transfer.','Air is a poor thermal conductor.|Trapping it also limits convection currents.'],
    [0,'double-speed','4.1.1.2','','A car doubles its speed at constant mass. Explain the effect on its kinetic energy.','Kinetic energy is proportional to speed squared.|Doubling speed gives four times the kinetic energy.'],
    [0,'storage-demand','4.1.3','','Explain how pumped storage can help when electricity demand suddenly rises.','Stored water is released through turbines.|It can supply electricity quickly, but requires energy to pump the water back.'],
    [0,'cooling-gradient','4.1.1.3','','A hot drink cools rapidly at first and then more slowly. Explain why.','The temperature difference from the surroundings decreases.|The rate of energy transfer therefore decreases.'],
    [0,'energy-system','4.1.2.1','','Describe the energy transfers when an electric motor lifts a load at constant speed.','Electrical work supplies energy.|The load gains gravitational potential energy.|Some energy is dissipated by heating and sound.'],
    [1,'series-lamp-failure','4.2.2','','Explain why both lamps go out when one lamp breaks in a series circuit.','The break opens the only complete path.|Current stops throughout the circuit.'],
    [1,'parallel-lamp-failure','4.2.2','','Explain why one lamp can remain lit when another lamp breaks in a parallel circuit.','The working lamp still has a complete branch across the supply.|Current can continue through that branch.'],
    [1,'wire-area','4.2.1.3','','Explain how increasing wire cross-sectional area changes resistance at constant length and temperature.','Resistance decreases.|A larger cross-sectional area provides more paths for charge flow.'],
    [1,'live-neutral','4.2.3.2','','Explain why touching a live wire can be dangerous even when an appliance switch is open.','Live is at a potential difference relative to Earth.|The body may complete a path to Earth so current flows through it.'],
    [1,'iv-heating-error','4.2.1.4','','A resistor heats up while its I–V characteristic is measured. Explain why this can invalidate a constant-temperature test.','Resistance can change as temperature rises.|The test no longer holds temperature constant.'],
    [2,'boiling-plateau','4.3.2.3','','Explain why temperature stays constant while a pure liquid boils at constant pressure despite continued heating.','Energy increases the potential energy of particles as they separate.|It does not increase their average kinetic energy during the change of state.'],
    [2,'gas-compression','4.3.3.1','','Explain why compressing a gas at constant temperature increases its pressure.','Particles collide with the walls more frequently.|More momentum is transferred per second per unit area.'],
    [2,'density-displacement-method','4.3.1.1','','Describe how to measure the density of an irregular solid that does not dissolve in water.','Measure its mass with a balance.|Find volume from displaced water.|Calculate density as mass divided by volume using consistent units.'],
    [2,'gas-heating-fixed','4.3.3.1','','Explain why heating gas in a sealed rigid container raises its pressure.','Particles have greater average kinetic energy.|Collisions with the walls are more frequent and transfer more momentum.'],
    [2,'internal-vs-temperature','4.3.2.1','','Explain why two samples at the same temperature need not have the same internal energy.','Temperature relates to average particle kinetic energy.|Internal energy is the total kinetic and potential energy of all particles and depends on the amount and state of matter.'],
    [3,'irradiation-food','4.4.2.4','','Explain why irradiated food does not usually become radioactive.','Irradiation exposes food to radiation.|It does not leave radioactive material in the food, unlike contamination.'],
    [3,'random-decay','4.4.2.3','','Explain why the exact decay time of a single unstable nucleus cannot be predicted.','Radioactive decay is random.|Half-life predicts the behaviour of a large population rather than an individual nucleus.'],
    [3,'alpha-range','4.4.2.1','','Explain why alpha radiation is hazardous inside the body even though it is stopped by skin.','Alpha radiation is strongly ionising.|An internal source deposits energy in nearby living tissue.'],
    [3,'background-repeat','4.4.2.2','','Why measure background radiation over a long time before investigating a source?','Counts fluctuate randomly.|A longer interval gives a more reliable mean background count rate.'],
    [3,'medical-half-life','4.4.3.2','P','Explain why a medical tracer needs a half-life long enough for the procedure but reasonably short afterwards.','It must remain active enough to detect during the procedure.|A shorter subsequent exposure reduces the patient radiation dose.'],
    [4,'constant-speed-force','4.5.6.2.1','','Explain how a car can travel at constant velocity while its engine provides a driving force.','Driving force balances resistive forces.|The resultant force and acceleration are zero.'],
    [4,'braking-energy','4.5.6.3.3','','Explain why increasing speed increases the energy brakes must dissipate for the same vehicle.','Kinetic energy is proportional to speed squared.|More energy must be transferred to thermal stores to stop.'],
    [4,'spring-zero','4.5.3','','Why should a spring experiment use extension rather than total spring length on the graph?','Extension is the increase from the unloaded length.|Hooke law relates force to extension within the proportional region.'],
    [4,'seatbelt-momentum','4.5.7.3','PH','Explain how a seat belt that stretches can reduce injury during a collision.','It increases the time taken to change momentum.|For the same momentum change the average force is smaller.'],
    [4,'balanced-falling','4.5.6.1.5','','A skydiver falls at terminal velocity. Explain the forces and energy changes.','Air resistance balances weight.|Speed and kinetic energy remain constant.|Gravitational potential energy decreases and energy is dissipated to thermal stores.'],
    [5,'wave-particles','4.6.1.1','','Explain why a floating cork oscillates as water waves pass rather than travelling with each wave.','The disturbance transfers energy.|The cork and nearby water oscillate about their positions without sustained travel with the wave.'],
    [5,'sound-vacuum','4.6.1.1','','Explain why sound cannot travel through a vacuum.','Sound is a mechanical wave involving particle vibrations.|A vacuum contains no particles to transmit the disturbance.'],
    [5,'frequency-boundary','4.6.2.2','H','Light slows when it enters glass from air. Explain the effects on frequency and wavelength.','Frequency stays the same because it is set by the source.|With lower wave speed and the same frequency the wavelength decreases.'],
    [5,'infrared-surfaces','4.6.3.3','P','Explain why a matt black surface is useful for a thermal radiator.','It is a good emitter of infrared radiation.|It can transfer energy by radiation at a greater rate than a shiny surface at the same temperature.'],
    [5,'wave-speed-method','4.6.1.2','','Describe how to determine wave speed using a ripple tank.','Measure wavelength across several wavefront spacings and divide by the number of spacings.|Measure or obtain the frequency.|Calculate speed as frequency times wavelength.'],
    [6,'solenoid-strength','4.7.1.2','','Describe two ways to increase the magnetic field strength of a solenoid.','Increase the current.|Insert an iron core.'],
    [6,'field-crossing','4.7.1.1','','Explain why magnetic field lines cannot cross.','The field has a single direction at any point.|Crossing lines would imply two different directions there.'],
    [6,'reverse-motor','4.7.2.2','H','Explain what happens to the force on a current-carrying wire if the current direction alone is reversed.','The force reverses direction.|Its magnitude is unchanged if field strength, current magnitude and wire length are unchanged.'],
    [6,'induction-speed','4.7.3.1','PH','Explain why moving a magnet faster into a coil increases the induced potential difference.','The magnetic field through the coil changes more rapidly.|The induced potential difference is therefore larger.'],
    [6,'transformer-dc','4.7.3.4','PH','Explain why a transformer does not provide a sustained secondary voltage with a steady direct current in its primary.','A steady current produces a steady magnetic field.|There is no continually changing field to induce a secondary potential difference.'],
    [7,'satellite-energy','4.8.1.3','PH','A satellite moves in a circular orbit at constant speed. Explain why gravity changes direction but not speed.','Gravity acts towards the centre, perpendicular to the instantaneous motion.|It changes the direction of velocity without increasing the kinetic energy.'],
    [7,'galaxy-spectrum','4.8.2','P','Why compare several spectral lines when identifying red-shift from a galaxy?','The pattern helps identify the same elements as in a reference spectrum.|A consistent shift of several lines provides stronger evidence than a single uncertain line.'],
    [7,'star-mass-path','4.8.1.2','P','Compare the final remnants expected for a Sun-like star and a much more massive star.','A Sun-like star leaves a white dwarf.|A sufficiently massive star undergoes a supernova and may leave a neutron star or black hole.'],
    [7,'expansion-not-size','4.8.2','P','Explain why increasing distance between distant galaxies does not mean each galaxy is growing in size.','The observations indicate expansion of space between distant galaxies.|Gravitationally bound systems do not need to expand in the same way.'],
    [7,'stellar-recycling','4.8.1.2','P','Explain why elements in a rocky planet provide evidence of earlier generations of stars.','Stars form heavier elements from lighter nuclei.|Ejected stellar material can enter clouds that later form new stars and planets.']
  ];
  extraWritten.forEach(([topic,key,...row])=>written(topic,[[key,...row]]));

  // Every plotted point is also available as text through the diagram description.
  const graphFamilies = [
    [0,'energy-time','Energy supplied by a heater','4.1.1.4','','Time (s)','Energy (J)',i=>[[0,0],[2,200*i],[4,400*i],[6,600*i]],i=>100*i,'W',
      'Calculate the heater power from the gradient.','Power = change in energy / change in time.',
      'Explain what the straight line through the origin shows about the heater.', 'Equal time intervals give equal energy increases.|The heater transfers energy at constant power.'],
    [1,'resistor-iv','Resistor I–V graph','4.2.1.4','','Potential difference (V)','Current (A)',i=>[[0,0],[2,0.1*i],[4,0.2*i],[6,0.3*i]],i=>20/i,'ohm',
      'Calculate the resistance using the reading at 4 V.','Resistance = V / I; use the coordinates at 4 V.',
      'Explain what this graph shows about the resistor at constant temperature.','Current is proportional to potential difference.|Resistance is constant because V/I stays constant.'],
    [2,'heating-curve','Heating and melting a solid','4.3.2.3','','Time (min)','Temperature (°C)',i=>[[0,20],[2,40+5*i],[4,40+5*i],[6,80+5*i]],()=>120,'s',
      'Calculate the duration of the melting plateau in seconds.','The plateau lasts from 2 to 4 minutes; convert to seconds.',
      'The substance melts during the flat section. Explain why temperature is constant there.','Supplied energy increases particle potential energy during melting.|Average particle kinetic energy and temperature stay constant.'],
    [3,'decay-graph','Background-corrected decay','4.4.2.3','H','Time (hours)','Corrected count rate (counts/min)',i=>[[0,160*i],[2*i,80*i],[4*i,40*i],[6*i,20*i]],i=>2*i,'hours',
      'Read the half-life from the plotted measurements. The joins are guides between readings.','Find the time for the corrected rate to fall to half its initial value.',
      'Explain why the absolute fall in count rate is smaller during successive half-lives.','The same fraction decays in each half-life.|There are fewer undecayed nuclei remaining, so the absolute decrease is smaller.'],
    [4,'velocity-area','Accelerating then cruising','4.5.6.1.5','H','Time (s)','Velocity (m/s)',i=>[[0,0],[4,2*i],[8,2*i]],i=>12*i,'m',
      'Calculate the displacement during the first 8 seconds.','Displacement = area under velocity–time graph: triangle + rectangle.',
      'Compare the resultant forces during 0–4 s and 4–8 s for a constant-mass trolley.','During 0–4 s the trolley accelerates and has a non-zero forward resultant force.|During 4–8 s velocity is constant so the resultant force is zero.'],
    [5,'wave-period','Displacement of one vibrating point','4.6.1.2','','Time (s)','Displacement (cm)',i=>[[0,0],[i/4,2],[i/2,0],[3*i/4,-2],[i,0],[5*i/4,2]],i=>1/i,'Hz',
      'Calculate the frequency. Straight joins are guides between sampled points of a smooth oscillation.','The time between successive positive peaks is one period; frequency = 1 / period.',
      'Explain how to read amplitude and period from these measurements.','Amplitude is the maximum displacement from equilibrium, 2 cm.|Period is the time between matching points in successive cycles, such as consecutive positive peaks.'],
    [6,'force-current','Motor force against current','4.7.2.2','H','Current (A)','Force (N)',i=>[[0,0],[1,0.1*i],[2,0.2*i],[3,0.3*i]],i=>0.5*i,'T',
      'A 0.20 m wire is perpendicular to the field. Calculate magnetic flux density from the reading at 2 A.','B = F / (Il); use the force at 2 A and l = 0.20 m.',
      'Explain what the line shows about force when field strength and wire length stay constant.','Force is directly proportional to current.|Doubling current doubles force for the same perpendicular wire and field.'],
    [7,'redshift-distance','Spectral shift and galaxy distance','4.8.2','P','Distance (million light-years)','Wavelength increase (nm)',i=>[[0,0],[100,2*i],[200,4*i],[300,6*i]],i=>4*i,'nm',
      'Read the wavelength increase for the galaxy at 200 million light-years.','Locate 200 on the horizontal axis and read the corresponding vertical value.',
      'Explain how the general trend provides evidence about the universe.','More distant galaxies show larger red-shifts and generally greater recession speeds.|This supports an expanding universe.']
  ];
  for(const [topic,key,title,spec,flags,xLabel,yLabel,points,answer,unit,prompt,method,explain,marking] of graphFamilies){
    for(let slot=1;slot<=5;slot++){
      const i=typeof GCSE_VARIANT==='function'?GCSE_VARIANT(topic,key,slot):slot;
      const diagram={kind:'graph',title:title+' — dataset '+i,xLabel,yLabel,points:points(i)};
      const prefix='Use dataset '+i+' in the graph below. ';
      const working=[
        (600*i)+' J / 6 s = '+(100*i)+' W',
        '4 V / '+fmt(0.2*i)+' A = '+fmt(20/i)+' ohm',
        '(4 − 2) min × 60 = 120 s',
        'Initial rate '+(160*i)+'; half is '+(80*i)+' at '+(2*i)+' hours.',
        '½ × 4 × '+(2*i)+' + 4 × '+(2*i)+' = '+(12*i)+' m',
        'Period = '+fmt(5*i/4)+' − '+fmt(i/4)+' = '+i+' s; f = 1 / '+i+' Hz',
        fmt(0.2*i)+' N / (2 A × 0.20 m) = '+fmt(0.5*i)+' T',
        'At distance 200 million light-years the plotted increase is '+(4*i)+' nm.'
      ][topic];
      add(topic,key+'-read-'+slot,title+' · calculation '+slot,spec,flags,{type:'numeric',unit,answer:answer(i),diagram,prompt:prefix+prompt,steps:[method,working,'Answer: '+fmt(answer(i))+' '+unit+'.'],hints:['Read the axis labels and units before using the graph.',method,'Use the plotted coordinates and check the units of your result.']});
      add(topic,key+'-explain-'+slot,title+' · explanation '+slot,spec,flags,{type:'written',diagram,prompt:prefix+explain,steps:marking.split('|'),hints:['Describe the pattern using the axis quantities.', 'Link the pattern to the relevant physics relationship.',marking.split('|')[0]]});
    }
  }

  // Four new five-variant families and five reasoning tasks per topic.
  // Difficulty describes the task, independently of examination tier.
  const extensionCalculations = [
    [0,'lift-power','Power of a lift','4.1.1.4','','W','Standard','P = mgh/t',i=>['A lift raises a '+(100*i)+' kg load by 6 m in 12 s. Use g = 10 N/kg. Calculate useful power.',500*i,(100*i)+' × 10 × 6 / 12']],
    [0,'thermal-rise','Temperature rise','4.1.1.3','','°C','Standard','Temperature rise = E/(mc)',i=>['A 2 kg block with specific heat capacity 500 J/(kg °C) receives '+(4000*i)+' J. Calculate its temperature rise.',4*i,(4000*i)+' / (2 × 500)']],
    [0,'efficient-lift','Input energy of a hoist','4.1.2.2','','J','Challenging','Input energy = mgh / efficiency',i=>['A hoist raises a '+(20*i)+' kg load by 5 m. Efficiency is 0.80. Use g = 10 N/kg. Calculate input energy.',1250*i,(20*i)+' × 10 × 5 / 0.80']],
    [0,'heating-duration','Heating time with losses','4.1.1.4','','s','Challenging','t = mcΔθ / useful power',i=>['A 1000 W heater transfers 80% of its power to '+i+' kg of water. Water has specific heat capacity 4200 J/(kg °C). Calculate the time to raise its temperature by 20 °C.',105*i,i+' × 4200 × 20 / (1000 × 0.80)']],
    [1,'parallel-current','Current at a junction','4.2.2','','A','Standard','Total current = sum of branch currents',i=>['Parallel branches carry '+(0.2*i)+' A and '+(0.3*i)+' A. Calculate total supply current.',0.5*i,(0.2*i)+' + '+(0.3*i)]],
    [1,'series-voltage','Potential difference in series','4.2.2','','V','Standard','Supply voltage = sum of component voltages',i=>['Two series components have potential differences '+(2*i)+' V and '+(3*i)+' V. Calculate supply potential difference.',5*i,(2*i)+' + '+(3*i)]],
    [1,'resistor-duration','Energy dissipated by a resistor','4.2.4.2','','J','Challenging','E = (V²/R)t',i=>['A 6 ohm resistor is connected to 12 V for '+i+' minutes. Calculate energy transferred.',1440*i,'12² / 6 = 24 W; E = 24 × '+(60*i)]],
    [1,'charge-from-energy','Charge from power and time','4.2.4.2','','C','Challenging','Q = E/V = Pt/V',i=>['A 24 W device operates at 12 V for '+i+' minutes. Calculate charge transferred.',120*i,'24 × '+(60*i)+' / 12']],
    [2,'liquid-density','Density of a liquid sample','4.3.1.1','','kg/m³','Standard','ρ = (filled mass − empty mass)/volume',i=>['An empty beaker has mass 100 g. With '+(50*i)+' cm³ of liquid it has mass '+(100+40*i)+' g. Calculate liquid density in kg/m³.',800,(0.04*i)+' kg / '+(50*i/1e6)+' m³']],
    [2,'solid-volume','Volume from density','4.3.1.1','','cm³','Standard','V = m/ρ',i=>['A solid has mass '+(270*i)+' g and density 2.7 g/cm³. Calculate its volume.',100*i,(270*i)+' / 2.7']],
    [2,'melt-time','Time to melt ice','4.3.2.3','','s','Challenging','t = mL/P',i=>['Ice of mass '+(0.1*i)+' kg is already at its melting point. A 200 W heater supplies all its energy to the ice. Specific latent heat is 334000 J/kg. Calculate melting time.',167*i,(0.1*i)+' × 334000 / 200']],
    [2,'heat-and-melt','Heating then melting','4.3.2.3','','J','Challenging','E = mcΔθ + mL',i=>['A '+i+' kg solid is warmed 10 °C to its melting point, then completely melted. Specific heat capacity is 500 J/(kg °C) and latent heat is 20000 J/kg. Calculate total energy.',25000*i,i+' × 500 × 10 + '+i+' × 20000']],
    [3,'count-interval','Total detector counts','4.4.2.2','','counts','Standard','Counts = count rate × time',i=>['A steady mean count rate is '+(20*i)+' counts/s. Calculate expected counts during 30 s.',600*i,(20*i)+' × 30']],
    [3,'ion-electrons','Electrons in a positive ion','4.4.1.1','','electrons','Standard','Electrons = proton number − positive charge number',i=>['An atom with proton number '+(10+i)+' loses two electrons. Calculate electrons remaining in the ion.',8+i,(10+i)+' − 2']],
    [3,'decay-background','Decay with background','4.4.2.3','H','counts/min','Challenging','Correct background before applying half-life',i=>['Initial measured rate is '+(160*i+20)+' counts/min, including background of 20 counts/min. Half-life is 3 hours. Calculate the measured rate after 6 hours.',40*i+20,'Corrected initial rate '+(160*i)+'; two half-lives give '+(40*i)+'; add background 20']],
    [3,'half-life-time','Elapsed decay time','4.4.2.3','H','hours','Challenging','Time = number of half-lives × half-life',i=>['A corrected source rate falls from '+(320*i)+' to '+(40*i)+' counts/min. Half-life is '+i+' hours. Calculate elapsed time.',3*i,(320*i)+' → '+(160*i)+' → '+(80*i)+' → '+(40*i)+'; three half-lives']],
    [4,'work-force','Force from work','4.5.2','','N','Standard','F = W/s',i=>['A constant force does '+(120*i)+' J of work over 4 m along its direction. Calculate the force.',30*i,(120*i)+' / 4']],
    [4,'spring-stiffness','Spring constant with conversion','4.5.3','','N/m','Standard','k = F/e',i=>['A spring extends '+i+' cm under a force of '+(2*i)+' N within its proportional region. Calculate spring constant.',200,(2*i)+' / '+(i/100)]],
    [4,'accelerate-distance','Displacement while accelerating','4.5.6.1.5','H','m','Challenging','Displacement = average velocity × time',i=>['A trolley accelerates uniformly from rest to '+(4*i)+' m/s over 5 s. Calculate displacement using the area under its velocity–time graph.',10*i,'½ × 5 × '+(4*i)]],
    [4,'momentum-collision','Velocity after joining','4.5.7.2','H','m/s','Challenging','Total momentum before = total momentum after',i=>['A 2 kg trolley travelling at '+(3*i)+' m/s joins a stationary 1 kg trolley. External resultant force is negligible. Calculate their shared final velocity.',2*i,'2 × '+(3*i)+' / (2 + 1)']],
    [5,'oscillation-period','Period from frequency','4.6.1.2','','s','Standard','T = 1/f',i=>['A wave has frequency '+(4*i)+' Hz. Calculate its period.',1/(4*i),'1 / '+(4*i)]],
    [5,'many-wavelengths','Wavelength from several spacings','4.6.1.2','','cm','Standard','Wavelength = measured distance / number of spacings',i=>['The distance from the first to the sixth crest is '+(15*i)+' cm. Calculate wavelength.',3*i,(15*i)+' / 5 (six crests give five spacings)']],
    [5,'ripple-speed-convert','Ripple speed with unit conversion','4.6.1.2','','m/s','Challenging','v = fλ',i=>['Five complete ripple wavelengths span '+(20*i)+' cm. Frequency is 8 Hz. Calculate wave speed in m/s.',0.32*i,'λ = '+(20*i)+' / 5 cm = '+(0.04*i)+' m; v = 8 × '+(0.04*i)]],
    [5,'echo-roundtrip','Echo distance in air','4.6.1.2','PH','m','Challenging','Distance to reflector = vt/2',i=>['An ultrasound pulse returns after '+(20*i)+' milliseconds. Wave speed is 340 m/s. Calculate distance to the reflector.',3.4*i,'340 × '+(0.02*i)+' / 2']],
    [6,'force-scale','Scaling motor force','4.7.2.2','H','N','Standard','F is proportional to I for fixed B and l',i=>['A perpendicular wire experiences '+(0.2*i)+' N at 2 A. Field and wire length stay fixed. Calculate force at 6 A.',0.6*i,(0.2*i)+' × (6 / 2)']],
    [6,'field-force','Motor field strength','4.7.2.2','H','T','Standard','B = F/(Il)',i=>['A perpendicular 0.5 m wire carries 4 A and experiences '+i+' N. Calculate magnetic flux density.',i/2,i+' / (4 × 0.5)']],
    [6,'transformer-load','Secondary current from a load','4.7.3.4','PH','A','Challenging','Vs = Vp Ns/Np; Is = Vs/R',i=>['A transformer has 240 V primary, 600 primary turns and '+(30*i)+' secondary turns. A 6 ohm load is across the secondary. Calculate secondary current.',2*i,'Vs = 240 × '+(30*i)+' / 600 = '+(12*i)+' V; Is = '+(12*i)+' / 6']],
    [6,'transformer-primary','Primary current from secondary load','4.7.3.4','PH','A','Challenging','VpIp = VsIs',i=>['An ideal transformer supplies '+(2*i)+' A at 12 V from a 240 V primary. Calculate primary current.',0.1*i,'12 × '+(2*i)+' / 240']],
    [7,'orbit-minutes','Distance travelled in an orbit','4.8.1.3','P','km','Standard','Distance = speed × time',i=>['A satellite travels at 7 km/s for '+(2*i)+' minutes. Calculate distance travelled.',840*i,'7 × '+(120*i)]],
    [7,'spectral-reference','Reference wavelength','4.8.2','P','nm','Standard','Reference = observed wavelength − wavelength increase',i=>['A galaxy spectral line is observed at '+(600+5*i)+' nm and its red-shift increase is '+(5*i)+' nm. Calculate reference wavelength.',600,(600+5*i)+' − '+(5*i)]],
    [7,'orbit-average','Average speed from orbital data','4.8.1.3','P','km/s','Challenging','Average speed = distance / period',i=>['An orbital path is '+(36000*i)+' km long and takes '+(100*i)+' minutes to complete. Calculate average speed in km/s.',6,(36000*i)+' / '+(6000*i)]],
    [7,'shift-comparison','Comparing spectral shifts','4.8.2','P','nm','Challenging','Observed wavelength = reference + shift',i=>['A 500 nm line from galaxy A is observed at '+(500+4*i)+' nm. The same line from galaxy B has twice the wavelength increase. Calculate its observed wavelength.',500+8*i,'A increase = '+(4*i)+' nm; B increase = '+(8*i)+' nm; add reference 500']]
  ];
  for(const [topic,key,title,spec,flags,unit,difficulty,formula,make] of extensionCalculations){
    const start=questions.length;
    calc(topic,key,title,spec,flags,unit,formula,make);
    questions.slice(start).forEach(q=>q.difficulty=difficulty);
  }
  const reasoningTasks = [
    [0,'energy-audit','4.1.2.2','','A machine receives 1000 J, lifts a load by 600 J and dissipates 250 J as heat. Evaluate the claim that its useful efficiency is 85%.','The useful output is 600 J, so useful efficiency is 60%.|The 250 J dissipated as heat is not useful lifting output.|A further 150 J must be accounted for in other stores or transfers.'],
    [0,'power-vs-energy','4.1.1.4','','Two lamps transfer the same total energy but one has twice the power. Compare operating times and explain.','Power is energy transferred per second.|For equal energy the higher-power lamp operates for half the time.'],
    [0,'insulation-controls','4.1.2.1','P','Evaluate an insulation test that compares a large hot beaker with a small cool beaker using different wrapping materials.','Starting temperature and water mass differ, so the comparison is confounded.|Use identical containers and equal water masses and starting temperatures.|Keep insulation thickness and cooling time constant.'],
    [0,'spring-double-energy','4.1.1.2','','A spring remains within its proportional region. Explain how doubling extension affects force and elastic energy.','Force doubles because F = ke.|Elastic energy quadruples because E = ½ke².'],
    [0,'energy-resource-plan','4.1.3','','Evaluate a plan to supply a town entirely from wind turbines with no storage or backup.','Wind output varies and may be low when demand is high.|Storage or other sources are needed for reliable supply.|Wind avoids fuel consumption and has low operational carbon emissions.'],
    [1,'current-used-up','4.2.2','','Evaluate the claim that a series lamp uses up current so a second lamp receives less.','Charge is conserved and the same current flows through both series lamps.|Energy is transferred in the lamps, not charge consumed.|Potential difference is shared between components.'],
    [1,'ammeter-short','4.2.1.2','','Explain why connecting an ammeter directly across a supply is an unsuitable way to measure current through a lamp.','An ammeter has very low resistance.|It creates a low-resistance bypass path that may cause a large current.|Connect the ammeter in series with the lamp.'],
    [1,'filament-vs-ohmic','4.2.1.4','','Compare an ohmic resistor at constant temperature with a filament lamp as potential difference rises.','The ohmic resistor has constant resistance and current proportional to voltage.|The lamp heats up and its resistance increases.|The lamp I–V graph therefore becomes less steep.'],
    [1,'fuse-choice-reason','4.2.3.2','','A device normally draws 4 A. Explain why a 5 A fuse is more appropriate than a 3 A fuse of the same type.','A 3 A fuse may melt during normal use.|The 5 A fuse permits normal current but can disconnect a sufficiently large fault current.'],
    [1,'grid-loss-ratio','4.2.4.3','','Transmission current halves while cable resistance stays constant. Explain the effect on cable heating power.','Heating power is I²R.|Halving current reduces heating power to one quarter.'],
    [2,'density-bubbles','4.3.1.1','','Air bubbles stick to an irregular solid during displacement measurement. Explain the likely error in calculated density.','The measured displaced volume is too large.|Using the correct mass and an excessive volume makes the calculated density too low.'],
    [2,'evaporation-cooling','4.3.2.1','','Explain why evaporation can cool the liquid left behind.','Some higher-energy particles escape from the surface.|The average kinetic energy of remaining particles falls.|Temperature therefore decreases unless energy is supplied.'],
    [2,'mass-state-change','4.3.1.2','','Explain why melting a sealed sample changes its volume but not its mass.','The number and identity of particles are unchanged.|Their arrangement and spacing change.|No matter enters or leaves the sealed sample.'],
    [2,'temperature-pressure-test','4.3.3.1','','Design a fair investigation of pressure against temperature for a fixed gas sample.','Keep gas amount and volume constant in a sealed rigid vessel.|Measure pressure and temperature after reaching equilibrium at each setting.|Use several temperatures and follow safe pressure limits.'],
    [2,'latent-comparison','4.3.2.3','','Equal masses of two solids are melted at their melting points with identical heaters and negligible losses. One takes longer. Explain what can be inferred.','The longer heating time means more energy was supplied because E = Pt.|For equal mass its specific latent heat of fusion is greater.'],
    [3,'detector-distance','4.4.2.1','','Explain how increasing distance from a radioactive source can reduce exposure.','Radiation spreads out so fewer emissions reach a given area.|Some radiation is also absorbed by the intervening air.|The received dose rate generally decreases.'],
    [3,'count-fluctuation','4.4.2.3','H','A corrected rate after one half-life is not exactly half a short initial measurement. Explain why this does not immediately disprove the model.','Decay is random and short counting intervals fluctuate.|Half-life describes the mean behaviour of many nuclei.|Longer counts and repeats improve the comparison.'],
    [3,'shield-comparison','4.4.2.1','','A source passes through paper but is largely stopped by thin aluminium. Identify the likely radiation and justify your choice.','Beta radiation is the likely dominant detected radiation.|Alpha would be stopped by paper.|Gamma is much more penetrating than beta and is not largely stopped by thin aluminium.'],
    [3,'nucleus-vs-atom','4.4.1.1','','Explain how a neutral atom can have a positively charged nucleus but no overall charge.','The nucleus contains positive protons and neutral neutrons.|An equal number of negative electrons surrounds the nucleus.|The positive and negative charges balance.'],
    [3,'chain-control','4.4.4.1','P','Explain how control rods can prevent the fission chain reaction in a reactor from increasing uncontrollably.','Control rods absorb neutrons.|Fewer neutrons remain to cause further fissions.|Their position controls the reaction rate.'],
    [4,'force-pair-weight','4.5.1.2','','Explain why weight and the normal contact force on a book are not a Newton third-law pair.','Both forces act on the book.|Third-law partners act on different objects in the same interaction.|The partner of Earth pulling the book is the book pulling Earth.'],
    [4,'acceleration-mass','4.5.6.2.2','','Compare accelerations of two trolleys under the same resultant force when one has twice the mass.','Acceleration equals resultant force divided by mass.|The trolley with twice the mass has half the acceleration.'],
    [4,'braking-test','4.5.6.3.3','','Evaluate a braking comparison in which both road surface and initial speed change between trials.','Both variables can affect braking distance.|Keep initial speed, tyres, vehicle mass and braking method constant while comparing surfaces.|Repeat trials to assess random variation.'],
    [4,'spring-limit-evidence','4.5.3','','Does a curved force–extension graph alone prove that a spring is permanently deformed? Explain.','Curvature shows the limit of proportionality has been exceeded.|It does not alone prove permanent deformation.|Unload the spring and check whether it returns to its original length.'],
    [4,'impulse-comparison','4.5.7.3','PH','Two equal-mass vehicles stop from the same speed. One stops in twice the time. Compare average resultant forces.','Their momentum changes have the same magnitude.|Average force equals momentum change divided by time.|The longer stop produces half the average force.'],
    [5,'amplitude-frequency','4.6.1.2','','Explain why increasing wave amplitude does not necessarily increase its frequency.','Amplitude measures maximum displacement from equilibrium.|Frequency measures oscillations per second.|They describe different properties and can be varied independently.'],
    [5,'ripple-measure-error','4.6.1.2','','A student divides the first-to-sixth crest distance by six. Explain the error and its effect on calculated wave speed.','Six crests contain five complete spacings.|Dividing by six underestimates wavelength.|Using v = fλ then underestimates wave speed for the measured frequency.'],
    [5,'reflection-angles','4.6.1.3','P','A student measures reflection angle from the mirror surface. Explain how to correct the measurement.','Reflection angle is measured from the normal, perpendicular to the surface.|Subtract the angle to the surface from 90°.|Compare this corrected angle with incidence measured from the normal.'],
    [5,'em-common','4.6.2.1','','Compare radio waves and gamma rays in a vacuum in terms of speed, wavelength and frequency.','Both travel at the same speed in a vacuum.|Gamma rays have much shorter wavelength.|Gamma rays have much higher frequency.'],
    [5,'refraction-normal','4.6.2.2','H','Light enters glass from air along the normal. Explain whether it changes speed and direction.','Its speed decreases in glass.|At normal incidence its direction stays the same.|Wavelength decreases while frequency is unchanged.'],
    [6,'compass-solenoid','4.7.1.2','','Describe how a compass can be used to map the field around a solenoid.','Place a compass at successive positions and record its north-end direction.|Use these directions to draw field lines.|Keep current fixed and distinguish the solenoid field from Earth background field.'],
    [6,'permanent-induced','4.7.1.1','','Compare a permanent magnet with an induced magnet made from soft iron.','A permanent magnet produces its own persistent field.|Soft iron becomes magnetic in an external field.|It usually loses most of its magnetism when the field is removed.'],
    [6,'both-reversed','4.7.2.2','H','Both current and magnetic field directions reverse for a motor-effect wire. Explain the resulting force direction.','Reversing either current or field alone reverses force.|Reversing both therefore leaves the original force direction unchanged.'],
    [6,'induction-stationary','4.7.3.1','PH','A magnet is held still inside a stationary coil. Explain why its presence alone does not produce a sustained induced voltage.','Induction requires a changing magnetic field through the coil.|With magnet and coil stationary the field is unchanged.'],
    [6,'transformer-loss','4.7.3.4','PH','A real transformer supplies less secondary power than its primary input. Explain where the difference goes.','Some energy heats the windings due to their resistance.|Some energy is dissipated in the core.|Energy is conserved despite lower useful output power.'],
    [7,'orbit-acceleration','4.8.1.3','PH','Evaluate the statement that a satellite at constant orbital speed has no acceleration.','Velocity includes direction.|The direction changes continuously in a circular orbit.|The satellite accelerates towards the centre even at constant speed.'],
    [7,'sun-fusion-fission','4.8.1.2','P','Explain why describing the Sun energy source as nuclear fission is incorrect.','The Sun main-sequence energy comes from fusion of hydrogen nuclei.|Fusion joins light nuclei whereas fission splits a heavy nucleus.'],
    [7,'stellar-pressure','4.8.1.1','P','Predict what happens initially if outward pressure in a star becomes too small to balance gravity.','Gravity causes contraction.|Contraction can heat the core.|The star previous equilibrium has been disrupted.'],
    [7,'redshift-extrapolate','4.8.2','P','A small dataset shows red-shift rising with distance. Evaluate a prediction for a galaxy far beyond the measured range.','The trend supports a qualitative prediction of larger red-shift.|A numerical extrapolation is less secure outside the measured range.|More observations are needed to test the prediction.'],
    [7,'universe-evidence','4.8.2','P','Explain why observations can support the Big Bang model without resolving the nature of dark energy.','Galactic red-shifts provide evidence for expansion from a denser earlier state.|Accelerated expansion raises further questions.|Evidence for a model need not explain every mechanism involved.']
  ];
  reasoningTasks.forEach(([topic,key,...row])=>{
    written(topic,[[key,...row]]);
    questions.at(-1).difficulty='Challenging';
  });
  for(const q of questions){
    q.difficulty ||= q.higher?'Challenging':q.diagram||q.type==='written'?'Standard':'Introductory';
    if(q.topic===6 && /^gcse-6-(force-scale|field-force)-/.test(q.id))q.difficulty='Introductory';
  }
  return {topics,slugs,questions};
})();
if (typeof module !== 'undefined') module.exports = GCSE_BANK;
