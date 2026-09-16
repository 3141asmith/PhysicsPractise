const NOTES = (() => {
 const S=String.raw;
 const section=(title,...points)=>({title,points});
 const note=(source,...sections)=>({source,sections});
 const notes = [
 note('Guidance: A Level Physics Practicals.pdf, skills sections, pages 2-23.',
  section('Measurements and SI units','Use base units consistently before substituting. Prefixes apply to the unit: converting square millimetres requires squaring the length conversion.',S`\(1\,\mathrm{mm^2}=10^{-6}\,\mathrm{m^2}\). A length conversion of a thousand does not mean an area conversion of a thousand.`, 'Accuracy is closeness to an accepted value; precision concerns the spread of repeated results. Resolution is the smallest change an instrument distinguishes.'),
  section('Uncertainty',S`\(\text{percentage uncertainty}=\frac{\Delta x}{x}\times100\%\). Estimate random uncertainty from repeats using a method justified by the data, such as half the range.`, 'For sums and differences, add absolute uncertainties. For products and quotients, add percentage uncertainties. Multiply percentage uncertainty by the magnitude of a power.',S`For \(y=ar^2\), with exact constant \(a\), \(\Delta y/y\approx2\Delta r/r\) for small uncertainties.`),
  section('Graphs and gradients','Give axes quantity names and units. Use a sensible scale and a best-fit line; do not join every noisy point.', 'Calculate a gradient using widely separated points on the best-fit line. Its units are vertical-axis units divided by horizontal-axis units.', 'Uncertainty bars permit a range of acceptable gradients. Compare results with theoretical values using uncertainty intervals, not only percentage differences.'),
  section('Worked example',S`For \(L=(40.0\pm0.2)\,\mathrm{cm}\), percentage uncertainty is \(100(0.2/40.0)=0.5\%\).`, 'Repeated measurements reduce random scatter in the mean. A zero offset must be corrected separately; averaging does not remove it.')),
 note('Guidance: A Level Physics Notes.pdf, pages 2-13.',
  section('Particles and conservation','Nucleon number is protons plus neutrons. Isotopes have the same proton number but different neutron numbers.',S`Proton: \(uud\); neutron: \(udd\). Quark charges are \(+2e/3\) for up and \(-e/3\) for down.`, 'Baryons contain three quarks; mesons contain a quark-antiquark pair. Leptons, including electrons and neutrinos, do not experience the strong interaction.','Track charge, baryon number and lepton number on both sides of a reaction. Beta-minus decay emits an electron and an electron antineutrino.'),
  section('Photons and the photoelectric effect',S`\(E=hf=hc/\lambda\), and \(E_{k,\max}=hf-\phi\). At threshold, \(hf_0=\phi\).`,'Frequency controls photon energy. Above threshold, increasing intensity increases electron emission rate, not maximum kinetic energy.', 'A stopping potential measures maximum kinetic energy through the energy needed to oppose the fastest electrons.'),
  section('Energy levels and matter waves','An emission line comes from a transition to a lower bound energy level; photon energy equals the level difference. Ionisation removes an electron completely.',S`The de Broglie wavelength is \(\lambda=h/p\). Greater momentum means shorter wavelength.`, 'Annihilation and pair production conserve total energy and momentum. Rest energy contributes as well as kinetic energy.'),
  section('Worked example',S`A \(3.0\,\mathrm{eV}\) photon incident on a metal with \(\phi=2.0\,\mathrm{eV}\) can produce a maximum electron kinetic energy of \(1.0\,\mathrm{eV}\), corresponding to a \(1.0\,\mathrm{V}\) stopping potential.`)),
 note('Guidance: A Level Physics Notes.pdf, pages 37-43; Practicals.pdf, pages 53-60.',
  section('Wave quantities',S`\(v=f\lambda\), \(T=1/f\), and \(\Delta\phi=2\pi\Delta x/\lambda\).`, 'Transverse oscillations are perpendicular to propagation; longitudinal oscillations are parallel. Polarisation is evidence of transverse oscillation.'),
  section('Interference and stationary waves','Coherent sources have the same frequency and a constant phase difference. Superposition adds displacements algebraically.',S`For in-phase sources, maxima occur at path difference \(n\lambda\), minima at \((n+\tfrac12)\lambda\). Complete cancellation also requires equal amplitudes.`, 'A stationary wave forms from opposing waves. Nodes have zero amplitude; adjacent nodes are half a wavelength apart.'),
  section('Refraction and diffraction',S`\(n_1\sin i=n_2\sin r\). Measure angles from the normal, not from the surface. Total internal reflection requires travel towards lower refractive index and incidence above the critical angle.`,S`Double slits: \(w=\lambda D/s\) under the small-angle approximation. Grating: \(d\sin\theta=n\lambda\). Convert line density to spacing before using it.`, 'Wave spreading at a gap becomes substantial when gap width is comparable to wavelength.'),
  section('Practical method','Measure several fringe spacings between consistent centres, then divide by the number of intervals. Eleven centres span ten intervals.',S`A string fixed at both ends has fundamental wavelength \(2L\), so \(f_1=v/(2L)\).`)),
 note('Guidance: A Level Physics Notes.pdf, pages 23-36 and 45-46; Practicals.pdf, pages 41-52.',
  section('Forces and motion',S`\(F=ma\), \(p=mv\), \(v=u+at\), \(s=ut+\tfrac12at^2\), \(v^2=u^2+2as\). The constant-acceleration equations require constant acceleration.`, 'For ideal projectiles, solve horizontal and vertical motion separately using the same flight time. Terminal speed means zero resultant force, not absence of forces.'),
  section('Momentum and energy',S`Impulse is \(\Delta p=\int F\,dt\). Momentum is conserved when external impulse is negligible.`,S`\(E_k=\tfrac12mv^2\), \(\Delta E_p=mg\Delta h\), \(W=Fs\cos\theta\), \(P=W/t\).`,'Inelastic collisions conserve total momentum in an isolated system but transfer some kinetic energy to deformation, thermal stores and sound.'),
  section('Materials',S`Stress \(\sigma=F/A\); strain \(\varepsilon=\Delta L/L\); Young modulus \(E=FL/(A\Delta L)\).`,'Elastic deformation is recovered after unloading; plastic deformation remains. A nonlinear material can still be elastic.',S`Within the proportional region, \(F=kx\) and stored energy is \(\tfrac12Fx\). The area under a force-extension graph gives work done.`),
  section('Equilibrium and experiments','Equilibrium requires zero resultant force and zero resultant moment. Third-law pairs act on different bodies.', 'For wire experiments, measure diameter at several positions and orientations; use a long wire, a preload and a secure reference to reduce fractional uncertainty.')),
 note('Guidance: A Level Physics Notes.pdf, pages 14-22; Practicals.pdf, pages 29-40.',
  section('Charge, energy and resistance',S`\(Q=It\), \(E=QV\), \(V=IR\), \(P=IV=I^2R=V^2/R\).`,'Ohm law assumes unchanged physical conditions. Filament heating makes a lamp non-ohmic; an NTC thermistor resistance decreases with temperature.'),
  section('Networks and potential dividers',S`Series resistances add. In parallel, \(1/R=1/R_1+1/R_2\).`,'Current conservation at junctions follows charge conservation; the loop rule follows energy conservation.',S`Unloaded divider: \(V_{\mathrm{out}}=V_sR_2/(R_1+R_2)\). A load across \(R_2\) changes its effective resistance and therefore the output.`),
  section('Real sources and resistivity',S`\(V=\mathcal{E}-Ir\), where \(r\) is internal resistance. A voltage-against-current graph has intercept \(\mathcal{E}\) and gradient \(-r\).`,S`\(R=\rho L/A\). Resistivity is a material property at a stated temperature; resistance also depends on dimensions.`),
  section('Measuring circuits','Use an ammeter in series and a voltmeter across the component. Low ammeter resistance and high voltmeter resistance reduce disturbance.', 'Keep currents low when investigating resistance at constant temperature. Allow for contact resistance and correct instrument zero offsets.')),
 note('Guidance: A Level Physics Notes.pdf, pages 47-52 and 76-80; Practicals.pdf, pages 63-68 and 87-90.',
  section('Circular motion',S`\(\omega=2\pi f\), \(a=v^2/r=\omega^2r\). The inward resultant force is \(mv^2/r\).`,'Centripetal describes the direction and role of the resultant, not a separate force to add to a diagram.'),
  section('Simple harmonic motion',S`\(a=-\omega^2x\), \(v=\pm\omega\sqrt{A^2-x^2}\). For a spring, \(T=2\pi\sqrt{m/k}\); for a small-angle pendulum, \(T=2\pi\sqrt{L/g}\).`,'Speed is greatest at equilibrium. Acceleration magnitude is greatest at the extremes. Damping removes energy; resonance occurs when driving frequency is near the natural frequency.'),
  section('Thermal energy',S`\(Q=mc\Delta T\) for a temperature change and \(Q=mL\) for a change of state. During an equilibrium phase change, energy can increase potential energy without increasing temperature.`,'Internal energy includes random particle kinetic energy and interaction potential energy. Temperature is related to mean random kinetic energy.'),
  section('Ideal gases',S`\(pV=nRT=NkT\), \(\overline{E_k}=\tfrac32kT\), \(c_{\mathrm{rms}}=\sqrt{3RT/M}\). Use kelvin: \(T/\mathrm{K}=\theta/{}^\circ\mathrm{C}+273.15\).`, 'The ideal-gas model neglects molecular volume and forces between collisions. Do not confuse zero kelvin with negative 273 kelvin.')),
 note('Guidance: A Level Physics Notes.pdf, pages 53-66; Practicals.pdf, pages 69-80.',
  section('Gravitational and electric fields',S`Outside a spherical mass: \(g=GM/r^2\), \(V_g=-GM/r\). For a point charge: \(E=Q/(4\pi\epsilon_0r^2)\), \(V=Q/(4\pi\epsilon_0r)\).`,'Use distance from the centre. Electric forces can attract or repel; gravitational forces between masses attract. Potential is energy per unit mass or charge, respectively.'),
  section('Capacitors',S`\(Q=CV\), \(E=\tfrac12CV^2\), \(V=V_0e^{-t/(RC)}\). The time constant is \(RC\).`,'After one discharge time constant, voltage is about 37% of its initial value. Increasing discharge resistance changes the timescale, not the initial stored energy.'),
  section('Magnetic fields and induction',S`\(F=BIl\sin\theta\), \(F=Bqv\sin\theta\), \(\Phi=BA\cos\theta\), \(\mathcal{E}=-d(N\Phi)/dt\).`,'A magnetic force on a moving charge is perpendicular to velocity and does no work. Lenz law gives the direction opposing the flux change.'),
  section('Applications',S`Circular orbit: \(T=2\pi\sqrt{r^3/(GM)}\). Ideal transformer: \(V_s/V_p=N_s/N_p\).`,'High-voltage transmission reduces current for the same power, reducing cable heating. A transformer requires changing flux; steady DC does not continuously induce secondary emf.')),
 note('Guidance: A Level Physics Notes.pdf, pages 67-75; Practicals.pdf, pages 81-86.',
  section('Decay and activity',S`\(N=N_0e^{-\lambda t}\), \(A=\lambda N\), \(T_{1/2}=\ln2/\lambda\).`,'Individual decays are random and spontaneous. Large samples show predictable statistical trends. Background-correct the measured count rate before comparing it with a model.'),
  section('Radiation and nuclei','Alpha particles ionise densely and have short range. Gamma rays penetrate further; exposure risk depends on source location as well as radiation type.',S`Nuclear radius approximately follows \(R=r_0A^{1/3}\), consistent with approximately constant nuclear density.`),
  section('Binding energy',S`\(E_b=\Delta mc^2\). Binding energy per nucleon indicates the energy needed on average to separate each nucleon.`, 'Fusion of light nuclei and fission of heavy nuclei can produce products with greater binding energy per nucleon and lower total rest mass.'),
  section('Reactors and practical analysis','A moderator slows neutrons, control rods absorb neutrons, and coolant transfers energy. Keep these roles separate.',S`For a small isotropic source with negligible absorption, count rate is proportional to \(1/r^2\). Count uncertainty is approximately \(\sqrt{N}\), giving fractional uncertainty \(1/\sqrt{N}\).`)),
 note('Supplementary optional-topic notes; the supplied general notes cover the core rather than this option.',
  section('Telescopes',S`For a refractor in normal adjustment, \(|M|=f_o/f_e\). A larger aperture collects more light and reduces the diffraction limit.`,'Reflecting telescopes avoid chromatic aberration from an objective lens. Magnification alone cannot recover detail lost to diffraction.'),
  section('Stars and spectra',S`\(\lambda_{\max}T=b\), \(L=4\pi R^2\sigma T^4\), received flux \(F=L/(4\pi d^2)\).`,'A cool giant can be very luminous because of its large area. Absorption lines identify species and their shifts reveal radial motion.'),
  section('Distances',S`\(m-M=5\log_{10}(d/10)\) with distance in parsecs. Absolute magnitude uses a common reference distance of 10 parsecs.`, 'Standardisable candles compare calibrated intrinsic luminosity with observed brightness; extinction and calibration uncertainty matter.'),
  section('Expansion',S`For small recession speeds, \(v/c\approx\Delta\lambda/\lambda_0\); Hubble law is \(v=H_0d\).`,'Local peculiar velocities can obscure the expansion trend for nearby galaxies. Use consistent units for Hubble constant and velocity.')),
 note('Supplementary optional-topic notes; the supplied PDFs do not provide a medical physics chapter.',
  section('Eye and ear',S`Lens power \(P=1/f\) with focal length in metres. Myopia is corrected with a diverging lens; hypermetropia with a converging lens.`,S`Sound intensity level: \(L=10\log_{10}(I/I_0)\). A logarithmic scale represents a wide range of intensities.`),
  section('Ultrasound',S`Echo depth \(d=ct/2\); acoustic impedance \(Z=\rho c\). The time includes outward and return journeys.`,'A piezoelectric crystal converts electrical oscillations into pressure waves and returning pressure waves into a voltage. Coupling gel reduces reflection from an air gap.'),
  section('X-rays and MR',S`Maximum X-ray photon energy is \(eV\), so \(\lambda_{\min}=hc/(eV)\). Attenuation: \(I=I_0e^{-\mu x}\).`, 'CT reconstructs slices from transmission measurements at many angles. MR uses magnetic fields and radiofrequency signals from nuclei, without ionising X-rays.'),
  section('Tracers',S`\(1/T_{\mathrm{eff}}=1/T_{\mathrm{phys}}+1/T_{\mathrm{bio}}\). Decay and biological removal both reduce the radioactive tracer present.`, 'An imaging tracer needs appropriate emission, organ uptake and half-life. A coherent fibre bundle preserves image positions in an endoscope.')),
 note('Supplementary optional-topic notes, building on mechanics and thermal physics in the supplied notes.',
  section('Rotation',S`\(I=\sum mr^2\), \(\tau=I\alpha\), \(E_k=\tfrac12I\omega^2\), \(P=\tau\omega\).`,'Moving mass outward increases moment of inertia. A flywheel exchanges energy with a load to reduce rotational speed variation.'),
  section('Angular momentum',S`\(L=I\omega\) is conserved when external torque is negligible. Coupling flywheels can conserve angular momentum while reducing rotational kinetic energy.`,'Use the correct axis when calculating moment of inertia. Friction can transfer mechanical energy to thermal stores.'),
  section('Thermodynamics',S`With work done by the gas positive, \(\Delta U=Q-W\). Work is the area under a pressure-volume curve: \(W=\int p\,dV\).`, 'An adiabatic expansion has no heat input. An isothermal ideal-gas change has no internal energy change.'),
  section('Engines',S`\(\eta=W_{\mathrm{net}}/Q_{\mathrm{in}}\), with reversible limit \(\eta_{\max}=1-T_c/T_h\). Both temperatures must be in kelvin.`,'A clockwise pressure-volume cycle represents positive net work output. A refrigerator rejects extracted heat plus the work supplied.')),
 note('Supplementary optional-topic notes, building on particles and quantum physics in the supplied notes.',
  section('Experiments and models','Cathode-ray deflection supports charged-particle behaviour. Oil-drop charges occur in multiples of the elementary charge.',S`Crossed-field speed selection uses \(qE=qvB\), giving \(v=E/B\).`),
  section('Wave-particle duality',S`\(E=hf\) and \(\lambda=h/p\). Electron diffraction is evidence of matter-wave behaviour.`, 'Increasing electron momentum reduces wavelength and can improve ideal diffraction-limited microscope resolution.'),
  section('Special relativity',S`\(\gamma=1/\sqrt{1-v^2/c^2}\), \(\Delta t=\gamma\Delta t_0\), \(L=L_0/\gamma\).`, 'Proper time is measured where the two events occur at the same position. Proper length is measured in the object rest frame.'),
  section('Energy',S`\(E_0=mc^2\), \(E_k=(\gamma-1)mc^2\). Classical kinetic energy is the low-speed approximation.`, 'Lengths in a moving frame require simultaneous endpoint positions in that frame. The Michelson-Morley null result is consistent with no detectable preferred ether frame.')),
 note('Supplementary optional-topic notes, building on electricity in the supplied notes.',
  section('Logic','AND requires both inputs to be 1. OR requires at least one. NOT inverts; NAND is the complement of AND.','Digital states occupy voltage ranges, providing tolerance to noise within the allowed margins.'),
  section('Operational amplifiers',S`Inverting gain \(A_v=-R_f/R_{\mathrm{in}}\); non-inverting gain \(A_v=1+R_f/R_g\).`,'With negative feedback and linear operation, the input voltages are approximately equal and input current is negligible. A virtual earth is not a physical ground connection.'),
  section('Limits and comparators','An output clips when the requested voltage exceeds its available swing. A comparator uses the sign of input difference to switch between limiting states.',S`For the approximate gain-bandwidth model, \(|A_v|\Delta f=\mathrm{GBW}\). Higher gain leaves less bandwidth.`),
  section('Conversion and timing',S`An \(n\)-bit unsigned code has \(2^n\) possible values. A DAC maps code to voltage; an ADC maps sampled voltage to a finite code.`,S`An RC time constant is \(RC\). More ADC bits reduce voltage interval per code for the same input range, reducing quantisation uncertainty.`)),
 note('Guidance: A Level Physics Practicals.pdf, especially pages 2-23, 33-38, 44, 50-60, 64-68 and 74-90. Reorganised for Paper 3A.',
  section('Planning an investigation','Identify the independent variable, the measured dependent variable and the quantities to control. State a workable range, repeats and a method for calculating the required result.','Choose instruments whose resolution is appropriate. Explain how readings are obtained, not only which apparatus is present.','Link each safety control to a specific hazard: falling masses, hot equipment, laser beams, electrical currents or ionising sources.'),
  section('Data and uncertainty','Record raw readings, repeats, means and units clearly. Match decimal places to instrument precision. Investigate anomalies rather than deleting inconvenient points.',S`For \(y=x^n\), fractional uncertainty is approximately \(|n|\Delta x/x\). For a difference, add absolute uncertainties.`, 'A tangent gives an instantaneous rate of change. A best-fit gradient uses widely separated points; its uncertainty can be estimated from acceptable extreme lines.'),
  section('Linearising models',S`For \(y=kx^n\), plot \(\log y\) against \(\log x\): gradient \(n\), intercept \(\log k\), using fixed units.`,S`For \(V=V_0e^{-t/(RC)}\), plotting \(\ln(V/V_0)\) against \(t\) gives gradient \(-1/(RC)\).`, 'An intercept can reveal an offset such as contact resistance. A curved residual pattern may indicate that the assumed straight-line model is inappropriate.'),
  section('Required practical contexts','Waves: stationary-wave resonance and laser interference/diffraction. Mechanics: free fall, Young modulus and simple harmonic motion.','Circuits: wire resistivity, component current-voltage characteristics, emf/internal resistance and capacitor discharge.','Thermal/fields/nuclear: gas-law measurements, magnetic force on a current-carrying wire and inverse-square gamma measurements.'),
  section('Evaluation and transfer','Paper 3A can place familiar measurement and analysis skills in an unfamiliar situation. Use the stated model and apparatus details rather than relying only on a memorised procedure.','Decide whether a result agrees with a prediction using the uncertainty interval. Distinguish repeatability, precision, accuracy and systematic bias.','Suggest improvements tied to the dominant uncertainty: longer timed intervals, larger measured extensions, background subtraction, temperature control or automated logging.'))
 ];
 const add=(topic,reference,title,...points)=>notes[topic].sections.push({title,points,reference});
 const refs=['3.1; PDF pages 9-10','3.2; PDF pages 11-15','3.3; PDF pages 16-19','3.4; PDF pages 20-25','3.5; PDF pages 26-28','3.6; PDF pages 29-32','3.7; PDF pages 33-39','3.8; PDF pages 40-43','3.9; PDF pages 44-47','3.10; PDF pages 48-52','3.11; PDF pages 53-56','3.12; PDF pages 57-60','3.13; PDF pages 61-66','6 and 8; PDF pages 73-78 and 82-87'];
 notes.forEach((note,i)=>{
  if(i>=8&&i<=12)note.source='Original optional-topic summaries, expanded using the supplied specification.';
  note.source+=' Additional guidance: A Level Textbook.pdf, which contains the AQA AS/A-level Physics specification, version 1.2; section '+refs[i]+'. PDF page numbers count from the first page of the file. These summaries are not an exhaustive specification checklist.';
 });

 add(0,'3.1.1-3.1.3; PDF pages 9-10','Measurement language and estimation',
  'Repeatability means obtaining consistent results with the same method and equipment; reproducibility concerns agreement when the observer, apparatus or method changes. Neither by itself proves accuracy.',
  'A systematic error shifts results in a consistent way, whereas random errors cause scatter. Repeating and averaging can reduce the effect of random errors, but a calibration or zero error needs a separate correction.',
  S`For estimates, state a plausible model and round inputs sensibly. For example, lifting a \(60\,\mathrm{kg}\) person through \(3\,\mathrm{m}\) needs roughly \(60\times10\times3=1800\,\mathrm{J}\), of order \(10^3\,\mathrm{J}\).`);
 add(0,'3.1.1 and 6.2; PDF pages 9 and 75','Prefixes and reporting results',
  S`\(1\,\mathrm{kWh}=3.6\times10^6\,\mathrm{J}\), and \(1\,\mathrm{eV}=1.60\times10^{-19}\,\mathrm{J}\) to three significant figures. A kilowatt-hour measures energy, not power.`,
  'Keep extra digits during intermediate calculations. Round the final value to a precision justified by the data, and give its unit. When quoting an uncertainty, align the decimal place of the value with that of the uncertainty.',
  S`Prefixes change length, area and volume differently: \(1\,\mathrm{cm}=10^{-2}\,\mathrm{m}\), but \(1\,\mathrm{cm^3}=10^{-6}\,\mathrm{m^3}\).`);
 add(1,'3.2.1.2-3.2.1.7; PDF pages 11-14','Interactions and particle bookkeeping',
  'The strong nuclear interaction binds nucleons over a very short range; at extremely small separations it becomes repulsive. The electromagnetic interaction acts on charge. The weak interaction can change quark flavour in beta decay.',
  S`Beta-minus decay: \(n\rightarrow p+e^-+\bar{\nu}_e\), with a down quark changing to an up quark. Beta-plus decay: \(p\rightarrow n+e^++\nu_e\) within an appropriate unstable nucleus.`,
  'Assign each quark baryon number +1/3 and each antiquark -1/3. Track electron and muon lepton numbers separately. A strange quark has strangeness -1; strangeness is conserved in strong interactions but can change in weak decays.',
  'Interaction diagrams should keep incoming, outgoing and exchanged particles distinct. Virtual photons represent electromagnetic exchange; charged W bosons appear in the beta processes.');
 add(1,'3.2.2.2-3.2.2.4; PDF page 15','Excitation, ionisation and evidence',
  'An incident electron can transfer a permitted energy difference to an atom and excite it. Ionisation requires enough energy to remove an electron entirely. Absorption or emission of a photon corresponds to a specific energy difference.',
  'In a fluorescent tube, electrical collisions excite gas atoms; their ultraviolet emission is absorbed by a coating that emits visible light. The energy changes involve discrete atomic levels.',
  'Electron diffraction supports wave behaviour of matter. The photoelectric threshold and frequency dependence support quantised energy transfer by light. Each observation constrains a model rather than proving that all classical descriptions are useless.');
 add(2,'3.3.1.3; PDF page 17','String harmonics',
  S`For a string fixed at both ends, \(L=n\lambda_n/2\) and \(f_n=\frac{n}{2L}\sqrt{T/\mu}\), where \(T\) is tension and \(\mu\) is mass per unit length. The first harmonic has \(n=1\).`,
  'Both ends are nodes. Each additional harmonic adds another half-wavelength along the string. Neighbouring segments oscillate in opposite phase; points within one segment oscillate in phase.',
  S`Doubling tension multiplies each harmonic frequency by \(\sqrt2\). Doubling length halves the frequency when tension and mass per unit length are unchanged.`);
 add(2,'3.3.2.1-3.3.2.3; PDF pages 18-19','Patterns and optical fibres',
  'With white light in a double-slit experiment, zero path difference gives a white central fringe. Other fringes are coloured because different wavelengths satisfy the interference conditions at different positions.',
  'A narrower single slit produces a wider central diffraction maximum. Increasing grating line density decreases slit spacing and increases the angle of a given permitted diffraction order.',
  'An optical fibre guides light by total internal reflection at the boundary between a higher-index core and lower-index cladding. Different path lengths or propagation speeds can spread a pulse, limiting how close together pulses can be sent.');
 add(3,'3.4.1.1-3.4.1.3; PDF pages 20-22','Vectors, moments and motion graphs',
  S`Resolve a force at angle \(\theta\) above the horizontal as \(F_x=F\cos\theta\) and \(F_y=F\sin\theta\). For an incline at angle \(\theta\), weight has components \(mg\sin\theta\) down the slope and \(mg\cos\theta\) into it.`,
  'A moment uses the perpendicular distance from pivot to line of action. A couple has equal opposite parallel forces on different lines: the resultant force is zero but the turning effect is not.',
  'The gradient of a displacement-time graph gives velocity; a tangent gives its instantaneous value. Area under a velocity-time graph gives signed displacement, whereas area under a speed-time graph gives distance. Area under an acceleration-time graph gives change in velocity.');
 add(3,'3.4.1.6-3.4.2.2; PDF pages 24-25','Reading energy and materials graphs',
  'Area under a force-time graph gives impulse. For the same momentum change, extending the collision time reduces average force. Area under a force-displacement graph gives work done, even when force is not constant.',
  S`When force and velocity are parallel, instantaneous power is \(P=Fv\). For example, a \(500\,\mathrm{N}\) driving force at \(12\,\mathrm{m\,s^{-1}}\) delivers \(6.0\,\mathrm{kW}\).`,
  'The initial straight-line gradient of a stress-strain graph is Young modulus. Breaking stress is the stress at fracture. Brittle materials show little plastic deformation; ductile materials can extend substantially before breaking.');
 add(4,'3.5.1.2-3.5.1.3; PDF pages 26-27','Characteristics and superconductors',
  'Check which variable is on each axis of an I-V graph. For an ohmic conductor the straight-line gradient is resistance on a V-against-I graph, but conductance on an I-against-V graph. At a point on a nonlinear characteristic, calculate resistance using V/I rather than a tangent gradient.',
  'A diode passes substantial current primarily in the forward direction. In a filament lamp, increasing current raises temperature and resistance; in an NTC thermistor, raising temperature lowers resistance.',
  'A superconductor has zero electrical resistivity below its material-dependent critical temperature under suitable conditions. Superconducting coils can support large currents for strong magnetic fields, although cooling still needs energy.');
 add(4,'3.5.1.4-3.5.1.6; PDF pages 27-28','Sensor dividers and battery combinations',
  'In a divider, the output across a component increases when that component takes a larger fraction of the total resistance. An NTC thermistor in the lower arm therefore gives a falling output as it warms, assuming an unloaded output.',
  S`For \(n\) identical cells of emf \(\mathcal E\) and internal resistance \(r\), series connection gives \(n\mathcal E\) and \(nr\). Identical cells in parallel give \(\mathcal E\) and \(r/n\).`,
  'Distinguish emf, the energy supplied per unit charge, from terminal potential difference, the energy per unit charge available to the external circuit. Internal heating accounts for the difference under load.');
 add(5,'3.6.1.2-3.6.1.4; PDF pages 29-30','SHM phase, energy and resonance',
  S`If \(x=A\cos(\omega t)\), then \(v=-A\omega\sin(\omega t)\) and \(a=-A\omega^2\cos(\omega t)\). Displacement and acceleration are in opposite phase.`,
  S`For an ideal spring oscillator, \(E=\tfrac12kA^2\), \(E_p=\tfrac12kx^2\) and \(E_k=\tfrac12k(A^2-x^2)\). Energy alternates between stores while the total stays constant without damping.`,
  'A freely oscillating system vibrates at its natural frequency; a forced system responds to an external driving frequency. Increasing damping lowers and broadens the displacement resonance peak.');
 add(5,'3.6.2.2-3.6.2.3; PDF pages 31-32','Gas models and molecular motion',
  S`\(pV=\tfrac13Nm\overline{c^2}\), with \(c_{\mathrm{rms}}=\sqrt{\overline{c^2}}\). Here \(m\) is the mass of one molecule, not the total gas mass.`,
  'Pressure arises from molecular momentum changes at the walls. Random motion gives equal mean-square components in the three directions. The model treats wall collisions as elastic and neglects intermolecular forces between collisions.',
  'For a fixed amount of ideal gas, compressing at constant temperature increases collision rate per unit wall area and raises pressure. Heating at constant volume increases typical molecular speeds and momentum transfers. Brownian motion is visible evidence of bombardment by unseen molecules.');
 add(6,'3.7.2.3-3.7.3.3; PDF pages 34-36','Potential, satellite energy and escape',
  S`For a circular orbit, \(v=\sqrt{GM/r}\), \(E_k=GMm/(2r)\), \(E_p=-GMm/r\), and \(E_{\mathrm{total}}=-GMm/(2r)\). For escape from radius \(r\), \(v_{\mathrm{esc}}=\sqrt{2GM/r}\), neglecting atmosphere and other bodies.`,
  'A geostationary satellite must orbit in the equatorial plane, in the same direction and with the same angular speed as Earth. Matching the rotation period alone is insufficient to remain above one point.',
  S`With radial direction taken outward, \(g_r=-dV_g/dr\) and \(E_r=-dV/dr\). A field points towards decreasing potential for a positive test mass or charge. Moving along an equipotential changes no potential energy.`);
 add(6,'3.7.4.2-3.7.5.6; PDF pages 36-39','Charging, AC and transformer losses',
  S`\(C=\epsilon_0\epsilon_r A/d\). A dielectric polarises and reduces the field for a given free charge. With a supply still connected, voltage stays fixed and extra charge flows onto the plates.`,
  S`Charging from zero through a resistor: \(Q=CV_s(1-e^{-t/(RC)})\). Current decreases as the capacitor voltage rises. Discharge half-time is \(t_{1/2}=RC\ln2\), not \(RC\).`,
  S`For a sinusoid, \(V_{\mathrm{rms}}=V_0/\sqrt2\) and \(I_{\mathrm{rms}}=I_0/\sqrt2\). Peak-to-peak voltage is \(2V_0\). RMS values give the equivalent DC heating effect in a resistor.`,
  'Transformer losses include winding resistance, eddy currents, repeated magnetisation and incomplete flux linkage. An insulated laminated core reduces eddy-current loops. A rotating coil has greatest induced emf when flux linkage changes fastest, not when flux linkage is greatest.');
 add(7,'3.8.1.1 and 3.8.1.4-3.8.1.5; PDF pages 40-42','Evidence for the nucleus and decay routes',
  'Most alpha particles pass through a thin foil with little deflection, suggesting mostly empty atomic volume. A few large-angle deflections imply that positive charge and most mass occupy a very small region.',
  'Beta-minus decay increases proton number by one and decreases neutron number by one; beta-plus decay and electron capture do the reverse. Nucleon number stays fixed in these processes. Alpha emission reduces nucleon number by four and proton number by two.',
  'Gamma emission removes energy from an excited nucleus without changing proton or neutron number. For a head-on alpha approach, equating initial kinetic energy to electric potential energy estimates a closest-approach distance, which is an upper limit on nuclear radius.');
 add(7,'3.8.1.3 and 3.8.1.6-3.8.1.8; PDF pages 41-43','Decay analysis and chain reactions',
  S`For mass \(m\) of an isotope with molar mass \(M\), \(N=(m/M)N_A\) and \(A=\lambda N\). Use consistent mass units. A plot of \(\ln(A/A_0)\) against time has gradient \(-\lambda\).`,
  'Subtract background count rate before fitting a decay model. A single low count is not evidence that a source has stopped emitting; counts fluctuate because decay is random.',
  'A sustained chain reaction requires, on average, one neutron from each fission to cause a further fission. Neutron escape and absorption affect whether a given assembly reaches criticality. Fission fragments remain radioactive after shutdown, so decay heat still needs removal.');
 add(8,'3.9.1.1-3.9.2.5; PDF pages 44-46','Resolution and the HR diagram',
  S`A diffraction-limited telescope has angular resolution of order \(\theta\sim\lambda/D\). Doubling aperture diameter collects four times as much light and roughly halves the minimum resolvable angle at a fixed wavelength.`,
  'Reflecting telescopes avoid chromatic aberration at the primary mirror. Radio telescopes need large effective apertures because their observing wavelengths are much longer than visible wavelengths.',
  'An HR diagram places hotter stars to the left. Main-sequence stars run from hot and luminous to cool and faint; giants lie above the main sequence and white dwarfs below it. A Sun-like star leaves the main sequence, expands as a red giant, then eventually leaves a white dwarf remnant.',
  'The spectral sequence O, B, A, F, G, K, M runs from hottest to coolest. Strong Balmer absorption needs hydrogen atoms with electrons in the second level: very low temperatures give few such atoms, while very high temperatures ionise hydrogen.');
 add(8,'3.9.2.6-3.9.3.4; PDF pages 46-47','Stellar remnants and exoplanet evidence',
  S`For a non-rotating black hole, \(R_s=2GM/c^2\). A neutron star is an extremely dense stellar remnant; it is not simply a small ordinary star.`,
  'A calibrated Type Ia supernova luminosity can be compared with its observed flux to estimate distance. Quasars are powered by accretion onto active supermassive black holes rather than ordinary stellar fusion.',
  'A transit gives a repeated dip in the star light curve when the orbit is suitably aligned. The radial-velocity method detects periodic shifts of stellar spectral lines as the star moves around the system centre of mass. These are indirect observations, not resolved images of the planet.');
 add(9,'3.10.1-3.10.3; PDF pages 48-49','Vision, hearing and electrical signals',
  S`The thin-lens relation is \(1/f=1/u+1/v\), using a consistent sign convention. Lens power in dioptres uses focal length in metres. Astigmatism involves different focusing in different planes and needs cylindrical correction.`,
  'The eardrum and ossicles transmit vibration to the inner ear, where mechanical disturbances lead to electrical signals. Equal-loudness curves show that equal physical intensities at different frequencies need not sound equally loud.',
  'An ECG records potential differences arising from cardiac electrical activity, not a direct graph of pumping force. The P wave represents atrial depolarisation, the QRS complex ventricular depolarisation and the T wave ventricular repolarisation.');
 add(9,'3.10.4-3.10.6; PDF pages 50-52','Interpreting medical images',
  S`At normal incidence, reflected ultrasound intensity fraction is \(I_r/I_i=((Z_2-Z_1)/(Z_2+Z_1))^2\). Similar acoustic impedances transmit more sound; an air gap reflects strongly.`,
  'An A-scan plots echo strength against return time; a B-scan combines pulse directions and echo strengths into a brightness image. In MR, a strong field establishes a net nuclear magnetisation, RF pulses excite the system and gradient fields encode position.',
  'A gamma camera uses a collimator to select directions and a scintillator to convert gamma interactions into light, followed by signal detection. PET locates pairs of photons from positron annihilation using coincident detections.',
  'Compare imaging methods using the detail required, acquisition time, access and the physical risks of each method. Ionising imaging involves exposure; a non-ionising method is not automatically suitable for every situation.');
 add(10,'3.11.1.3-3.11.1.6; PDF pages 53-54','Rotational graphs and angular impulse',
  S`For constant angular acceleration, \(\omega=\omega_0+\alpha t\), \(\theta=\omega_0t+\tfrac12\alpha t^2\) and \(\omega^2=\omega_0^2+2\alpha\theta\).`,
  'The gradient of an angular displacement-time graph gives angular velocity; area under an angular velocity-time graph gives angular displacement. Use radians in work and power equations.',
  S`For constant net torque, \(\tau\Delta t=\Delta(I\omega)\). A frictional torque acts against motion and reduces the net accelerating torque.`);
 add(10,'3.11.2.2-3.11.2.6; PDF pages 54-56','Engine output and reversed heat engines',
  S`For a reversible adiabatic change of an ideal gas, \(pV^\gamma=\text{constant}\). For an isothermal change of a fixed amount of ideal gas, \(pV=\text{constant}\). At constant volume, boundary work is zero.`,
  'Indicated power is work per cycle from the pressure-volume loop multiplied by cycles per second and cylinder count. Brake power is useful shaft output; their difference is friction power. A four-stroke engine completes one cycle in two crankshaft revolutions.',
  S`\(\eta_{\mathrm{overall}}=P_{\mathrm{brake}}/P_{\mathrm{fuel}}\). For a refrigerator, \(\mathrm{COP}=Q_c/W\); for a heat pump, \(\mathrm{COP}=Q_h/W\), where \(Q_h=Q_c+W\). A COP greater than one does not violate energy conservation: energy is moved as well as supplied.`);
 add(11,'3.12.1; PDF page 57','Measuring electron properties',
  S`For non-relativistic acceleration from rest, \(eV=\tfrac12m_ev^2\). If the electron then follows a circle in a perpendicular field, \(e/m_e=2V/(B^2r^2)\).`,
  'Thermionic emission releases electrons from a sufficiently hot surface. Electric and magnetic deflection allow measurements of specific charge; a separate measurement of elementary charge allows electron mass to be inferred.',
  S`For a stationary charged oil drop, \(|Q|E\) balances its effective weight. With negligible buoyancy, \(|Q|V/d=mg\). At low-speed terminal fall, Stokes drag is \(6\pi\eta rv\). Repeated charge measurements reveal integer multiples of an elementary charge.`);
 add(11,'3.12.2-3.12.3; PDF pages 58-60','Models of light and experimental tests',
  S`Maxwell electromagnetic theory predicts \(c=1/\sqrt{\mu_0\epsilon_0}\). Interference supports wave descriptions; the photoelectric effect requires quantised energy transfer.`,
  'A TEM forms an image using electrons transmitted through a thin sample. An STM instead maps a surface using the strongly distance-dependent tunnelling current between a sharp tip and a conducting sample.',
  'Special relativity gives the same physical laws in inertial frames and the same vacuum light speed for all inertial observers. Muon survival over distances larger than a naive rest-lifetime estimate supports time dilation. Bertozzi compared electron energy and speed, showing that increasing energy does not make speed grow without limit.');
 add(12,'3.13.1 and 3.13.3.1; PDF pages 61-62','Semiconductor devices and resonance',
  'An N-channel enhancement MOSFET is controlled by gate-source voltage and draws very little steady gate current. In a switching model, raising that voltage sufficiently above threshold allows drain current; the operating circuit must still supply the needed gate voltage.',
  'A reverse-biased Zener diode can provide a reference voltage in breakdown when a series resistor limits current. A photodiode in photoconductive operation gives a light-dependent reverse current. A Hall sensor can detect a magnetic field or count rotating magnet passes.',
  S`An ideal LC resonant frequency is \(f_0=1/(2\pi\sqrt{LC})\). The quality factor is \(Q=f_0/\Delta f\), using the bandwidth between half-energy response points. Higher Q means a narrower response.`);
 add(12,'3.13.2 and 3.13.4-3.13.6; PDF pages 62-66','Sampling, logic and communication',
  'Increasing ADC bit depth reduces the voltage interval between codes; increasing sampling rate improves time resolution. These are different changes. A sampling rate greater than twice the highest signal frequency is needed to avoid aliasing for a suitably band-limited signal.',
  S`A summing amplifier gives \(V_{\mathrm{out}}=-R_f(V_1/R_1+V_2/R_2+\cdots)\). Check the supply limits before assuming that the calculated output is attainable.`,
  'Combinational outputs depend on current inputs; sequential circuits also retain state. XOR is high for different inputs. A modulo-n counter resets after n states, while an astable supplies repeated clock pulses.',
  'AM varies carrier amplitude; FM varies instantaneous carrier frequency. Time-division multiplexing assigns successive time slots to different channels. Trace a communication chain from input transducer through modulation and transmission to demodulation and output transducer.');
 add(13,'8.2, practicals 1-4; PDF page 83','Required practicals 1-4: waves and mechanics',
  S`1. String resonance: vary one of length, tension or mass per unit length at a time. Test \(f\propto1/L\) or \(f^2\propto T\) while keeping the other relevant quantities fixed.`,
  '2. Optical interference: measure several double-slit fringe intervals and divide by their number; for a grating, use symmetric orders to reduce alignment error. Keep laser beams below eye level and avoid direct or reflected viewing.',
  S`3. Free fall: for release from rest, plotting fall distance against \(t^2\) gives gradient \(g/2\). Account for release delay, distance reference points and timing uncertainty.`,
  '4. Young modulus: measure original wire length, repeated diameters and extension as load changes. Obtain stiffness from a force-extension gradient, then combine it with length and cross-sectional area.');
 add(13,'8.2, practicals 5-8; PDF page 83','Required practicals 5-8: circuits and oscillations',
  S`5. Resistivity: determine \(R=V/I\), measure wire diameter and length, then use \(\rho=RA/L\). Repeated diameter measurements matter because area depends on diameter squared.`,
  S`6. Cell emf: vary load, measure terminal voltage and current, and plot \(V\) against \(I\). The intercept gives emf; the gradient is \(-r\). Limit heating and avoid a short circuit.`,
  S`7. Oscillations: time several periods of a spring-mass system and a small-angle pendulum. Plots of \(T^2\) against mass or length test the predicted relationships.`,
  '8. Gas laws: test pressure-volume variation at constant temperature and volume-temperature variation at constant pressure. Allow thermal equilibrium and include all trapped gas volume.');
 add(13,'8.2-8.3, practicals 9-12; PDF pages 83-84','Required practicals 9-12: fields and radiation',
  S`9. Capacitors: record charging or discharge data with suitable time resolution. During discharge, the gradient of \(\ln(V/V_0)\) against time is \(-1/(RC)\). Consider the voltmeter loading and component tolerances.`,
  S`10. Magnetic force: use balance-reading changes to find force, \(F=\Delta m\,g\), and vary current, field or wire length in the field while controlling the others.`,
  '11. Flux linkage: use a search coil and oscilloscope to investigate orientation in a varying magnetic field. Keep the drive conditions fixed; measure angle relative to the coil normal, not its plane.',
  '12. Inverse-square gamma measurements: measure and subtract background, time counts consistently and use distance from source to the detector sensitive region. Follow the school radiation-safety procedure and assess count scatter when evaluating agreement.');
 notes[13].sections[1].points.push(
  'For repeated readings, half the range is a useful school-level estimate of scatter when requested; identical repeats do not imply zero uncertainty. Include instrument resolution, calibration information and any known zero offset. State how the quoted uncertainty was chosen.',
  'The sums of fractional uncertainties used below are conservative first-order estimates for products and quotients. They are not statistical standard deviations. Independent counting uncertainties in the gamma practical use a separate statistical rule and combine in quadrature.',
  'A result can be repeatable but systematically biased. Repeats help assess random scatter; correct an identified zero error separately. Percentage difference from a reference value is not the same as percentage measurement uncertainty.'
 );
 const practical=(number,title,source,apparatus,method,analysis,uncertainty,safety)=>{
  notes[13].sections.push({title:'Practical '+number+': '+title,practical:number,sourceReference:source,points:[],groups:[
   {title:'Apparatus and variables',points:apparatus},
   {title:'Method',points:method,ordered:true},
   {title:'Analysis',points:analysis},
   {title:'Uncertainty and improvements',points:uncertainty},
   {title:'Safety',points:safety}
  ]});
 };
 notes[13].source+=' Detailed practical guides use original explanations informed by N. Dwyer, A Level Physics Practicals.pdf (Skills, Practicals and Analysis). Individual guides identify PDF pages. String resonance, double-slit interference, Boyle\'s law and search-coil methods supplement gaps in that document; the required-practical scope is checked against AQA practical assessment and apparatus set-up guides. These are revision notes, not substitutes for supervised work or the school risk assessment.';
 practical(1,'Stationary waves on a string','Supplementary method for required practical 1; general measurement and graph skills: supplied Practicals PDF pages 7-19.',[
  'Use a vibration generator, signal generator, string, pulley, mass hanger, ruler and balance. Vary vibrating length, tension or mass per unit length in separate investigations; measure resonant frequency. Keep the other two quantities and the harmonic number fixed.'
 ],[
  'Measure the mass of a long sample of uniform string and its unstretched length to find mass per unit length. A longer sample reduces the relative uncertainty of the mass measurement.',
  'Run the string from the vibrator over a low-friction pulley to a freely suspended load. Include the hanger in the suspended mass; measure the vibrating length between the effective end nodes.',
  'At fixed length and load, adjust frequency slowly until a stable pattern of loops forms. Identify the harmonic by counting loops. Approach resonance from above and below and record the frequency interval over which the pattern appears resonant.',
  'Take at least six suitably spaced lengths with the same load and harmonic. Repeat the resonance search at each length. Then fix length and vary the load; finally compare strings with different measured mass per unit length at fixed length and tension.'
 ],[
  S`For \(n\) loops, \(\lambda=2L/n\) and \(f_n=\frac{n}{2L}\sqrt{F/\mu}\), where \(\mu=m_{\mathrm{string}}/L_{\mathrm{string}}\) and \(F\approx M g\). Do not confuse string mass with suspended mass.`,
  S`Plot \(f\) against \(1/L\), \(f^2\) against \(F\), or \(f^2\) against \(1/\mu\) in the separate investigations. The corresponding straight lines should be consistent with zero intercept if the ideal model is adequate.`
 ],[
  'A broad resonance peak makes frequency judgement uncertain: repeat the tuning and use its spread, not just the frequency-display resolution. A strobe or video can help identify nodes.',
  'The vibrator and pulley may not be exact nodes. Measure between observed nodes and inspect the intercept before forcing a fit through zero. Pulley friction means the tension may differ systematically from the suspended weight.',
  S`String stretching changes \(\mu\), especially for elastic string. Keep loads within a range where this is small or measure the loaded length. For \(\mu=m/L\), a conservative fractional uncertainty is \(\Delta\mu/\mu\approx\Delta m/m+\Delta L/L\).`
 ],['Secure the pulley and stand; use a tray beneath the hanging masses and keep the load clear of feet. Use the laboratory low-voltage supply.']);
 practical(2,'Interference and diffraction','Supplied Practicals PDF page 60 (grating); double-slit method supplements this. The exact angle calculation below corrects the worksheet approximation.',[
  'Use a school-approved laser, double slit or diffraction grating, screen, ruler and tape measure. Keep wavelength and slit separation fixed when varying screen distance. For a grating, measure positions of different orders with the grating fixed.'
 ],[
  'Clamp the laser and slit or grating so the beam is normal to the aperture and the screen is perpendicular to the central beam. Measure the perpendicular aperture-to-screen distance, not the laser-to-screen distance.',
  'For double slits, mark centres of clearly visible bright fringes. Measure across several complete fringe intervals and divide by the number of intervals, not the number of bright lines. Repeat at several screen distances.',
  'For the grating, mark the central maximum and matching left and right maxima of order n. Half their separation gives the mean displacement x. Record only orders actually visible; higher orders may not exist.',
  'Repeat the position measurements and record the grating line density with its units. Use a range of clearly resolved orders or repeat for several screen distances without changing the wavelength.'
 ],[
  S`For double slits at small angles, \(w=\lambda D/s\). Plot \(w\) against \(D\); gradient \(=\lambda/s\). If \(N\) fringe intervals span distance \(X\), use \(w=X/N\).`,
  S`For a grating, \(d=1/(\text{lines per metre})\), \(\theta=\tan^{-1}(x/D)\) and \(\sin\theta=x/\sqrt{x^2+D^2}\). Use \(d\sin\theta=n\lambda\); a plot of \(\sin\theta\) against \(n\) has gradient \(\lambda/d\). The ratio \(x/D\) is \(\tan\theta\), not generally \(\sin\theta\).`
 ],[
  'Broad maxima make their centres uncertain; mark both edges and estimate the centre. Measuring many fringe intervals reduces percentage uncertainty. Increasing screen distance spreads the pattern, but can make it too faint.',
  'A tilted screen or grating produces systematic geometry errors. Compare left and right orders and realign if they disagree. Include ruler end-point uncertainties and the manufacturer uncertainty in slit spacing or grating density.',
  S`For the small-angle double-slit calculation, \(\Delta\lambda/\lambda\approx\Delta w/w+\Delta s/s+\Delta D/D\). For large-angle grating data, propagate upper and lower bounds through the exact geometry rather than applying the small-angle formula.`
 ],['Keep the beam below eye level, terminate it on a screen and prevent access to direct or reflected beams. Never look into the laser or through the grating towards it; follow the teacher-approved laser procedure.']);
 practical(3,'Free fall and gravitational acceleration','Supplied Practicals PDF page 44; electronic timing is an improvement on its hand-timed falling-ball method.',[
  'Use a dense ball, a release mechanism linked to an electronic timer, an impact sensor or suitable light-gate system, metre rule and catch tray. Vary fall distance and measure time; keep the ball and release method fixed.'
 ],[
  'Clamp the apparatus vertically and arrange for the timer to start at release and stop at the chosen detection event. Check what physical event each sensor detects before defining the distance.',
  'Measure the vertical distance travelled by one fixed point on the ball between these events. For a ball falling onto a contact plate, its initial bottom-to-plate gap is the travel distance to first contact.',
  'Release from rest without a push and record the fall time. Repeat at least three times per height, checking for missed triggers. Use six or more heights within the safe bench apparatus range.',
  'Record individual times, the mean time and its square. If using two light gates after release, the ball already has a nonzero speed at the first gate: use measured velocities and the appropriate motion equation rather than assuming release from rest there.'
 ],[
  S`For release from rest, \(h=\tfrac12gt^2\). Plot \(h\) against \(t^2\); if the gradient is \(a\), then \(g=2a\). With velocities at two gates, \(v^2-u^2=2g\Delta h\).`,
  'Use a best-fit line with uncertainty bars and examine any intercept or curvature. A fixed distance offset can shift the intercept; a timing delay need not produce a simple constant vertical offset.'
 ],[
  S`For a single result, \(g=2h/t^2\) and \(\Delta g/g\approx\Delta h/h+2\Delta t/t\). Electronic timing reduces reaction-time uncertainty, but sensor latency and release delay can remain systematic.`,
  'Repeat scatter does not reveal a fixed release delay. Check the trigger, release mechanism and distance reference separately. Greater height increases fall time and reduces relative timing uncertainty, but only within the safe setup and before drag becomes significant.',
  'Drag usually makes an acceleration estimate from this ideal model too small. A compact dense ball is less affected than the paper or table-tennis balls used for comparison in the worksheet.'
 ],['Secure the apparatus and use a catch tray. Keep the fall path clear; do not climb furniture or arrange unsupervised drops from height.']);
 practical(4,'Young modulus of a wire','Supplied Practicals PDF pages 50-51.',[
  'Use a long wire, secure clamp, pulley and loads (or a vertical comparison-wire apparatus), micrometer, ruler and extension scale. Vary tensile force and measure extension while keeping the original gauge length and material fixed.'
 ],[
  'Measure diameter at several positions and in perpendicular directions with a zero-checked micrometer. Use the ratchet gently. Record the mean diameter and spread; use the original cross-sectional area.',
  'Apply a small preload to remove kinks. Measure the gauge length between the fixed clamp and marker, and record the marker position as the extension reference. Align the scale with the wire and read at eye level.',
  'Add small load increments, wait for movement to settle, and record the extension relative to the preload. Use incremental force consistently when extension is measured from that reference.',
  'Take several load-extension pairs within the straight-line region. Unload in steps and check that the wire returns to its reference position. Repeat without exceeding the elastic limit or the apparatus load rating.'
 ],[
  S`Calculate \(A=\pi d^2/4\). If a force-against-extension graph has gradient \(k\), then \(E=kL/A\). Alternatively plot stress \(F/A\) against strain \(x/L\); the linear-region gradient is \(E\).`,
  'Do not fit the initial straight-line model across permanent deformation or a nonlinear region. Loading and unloading disagreement can reveal slipping, friction or permanent extension.'
 ],[
  S`Diameter uncertainty is doubled in area: \(\Delta A/A\approx2\Delta d/d\). For the gradient method, \(\Delta E/E\approx\Delta k/k+\Delta L/L+2\Delta d/d\).`,
  'Small extension is often the limiting measurement. A longer wire or finer extension scale increases resolution of the change. Extension is a difference of two readings, so include uncertainty in both readings.',
  'Clamp slipping, pulley friction and support movement introduce systematic changes. Secure the clamp, check reference marks and use a comparison wire where available to compensate for common support or temperature changes.'
 ],['Wear eye protection, keep faces away from the tensioned wire, and place a tray beneath loads. Inspect the wire and clamps; never exceed the approved load.']);
 practical(5,'Resistivity of a wire','Supplied Practicals PDF pages 33-35.',[
  'Use uniform resistance wire, a metre rule, micrometer, low-voltage supply, switch, current-limiting resistor, ammeter and voltmeter. Change the measured wire length; determine resistance while controlling material, diameter and temperature.'
 ],[
  'Check micrometer zero and measure the diameter at several positions and orientations. Record the spread and calculate mean cross-sectional area from the representative diameter.',
  'Fix the straight wire along a ruler. Put the ammeter and current limiter in series with the wire; connect the voltmeter across the exact length under investigation.',
  'Start with a small current suitable for the wire. Measure length between the voltage contact points and record voltage and current together. Open the switch between readings to limit heating.',
  'Move the contact to obtain at least six lengths across a wide usable range. Repeat readings, checking contact placement and temperature. Calculate resistance for each pair of voltage and current measurements.'
 ],[
  S`Use \(R=V/I\), \(A=\pi d^2/4\) and \(R=(\rho/A)L\). Plot \(R\) against \(L\); resistivity is \(\rho=A\times\text{gradient}\), in \(\Omega\,\mathrm m\).`,
  'A nonzero intercept can indicate contact or lead resistance included in the voltage measurement. Investigate it rather than automatically forcing the line through the origin.'
 ],[
  S`For one reading, \(\Delta\rho/\rho\approx\Delta V/V+\Delta I/I+2\Delta d/d+\Delta L/L\). For the graph method use the gradient uncertainty and area uncertainty instead; do not count the same input uncertainties twice.`,
  'Heating increases the resistance of a typical metal wire and biases the result upwards. Reduce current, switch off between readings and check that readings do not drift.',
  'Short lengths give small voltages and large relative contact-position errors. Use longer lengths and suitable meter ranges. Diameter variation is a real limitation of the uniform-wire model, not something eliminated by a more precise meter.'
 ],['Limit current to prevent hot wire and resistor burns. Switch off before adjusting the circuit; use only the approved low-voltage supply.']);
 practical(6,'Cell emf and internal resistance','Supplied Practicals PDF pages 37-38.',[
  'Use a cell, switch, ammeter, high-resistance voltmeter and variable load or resistor set. Change external resistance to vary current; measure terminal potential difference using the same cell at approximately constant temperature and state of charge.'
 ],[
  'Connect the load and ammeter in series with the cell and the voltmeter directly across its terminals. Begin with a high load resistance.',
  'Close the switch briefly, record current and terminal voltage together, then open it. Change the load to obtain six to eight currents across a safe range.',
  'Repeat the series, allowing the cell to rest between readings. Revisit an earlier load to detect drift caused by heating or discharge. Record meter resolutions and repeated values.',
  'Measure the near-open-circuit voltage with the high-resistance voltmeter as a useful comparison, without assuming the meter draws exactly zero current.'
 ],[
  S`Plot terminal voltage \(V\) against current \(I\). From \(V=\mathcal E-Ir\), the intercept is emf \(\mathcal E\) and internal resistance is the negative of the gradient, \(r=-\Delta V/\Delta I\).`,
  'Use the full fitted line rather than differences between two adjacent readings. Curvature or a changing intercept between runs can indicate that the constant-emf, constant-internal-resistance model is inadequate.'
 ],[
  'If the voltage drop is small compared with meter resolution, the gradient and internal resistance are poorly constrained. Use an appropriate voltmeter range and a wider safe current range, not a short circuit.',
  'Cell heating, chemical polarisation and loss of charge can change the result during the run. Short measurement times, rest periods and repeated reference loads help distinguish drift from random scatter.',
  'Estimate gradient and intercept ranges with acceptable steepest and shallowest lines through the error bars. An emf obtained by extrapolating far beyond the measured currents has greater uncertainty; include low-current readings.'
 ],['Never connect an ammeter directly across a cell or short-circuit the cell. Use rated loads and stop if the cell or resistor becomes hot.']);
 practical(7,'Pendulum and mass-spring oscillations','Supplied Practicals PDF pages 64-66.',[
  'Use a pendulum bob and string, spring and mass hanger, secure stand, ruler, balance and stopwatch or motion sensor. Investigate period versus pendulum length and, separately, period versus total suspended mass.'
 ],[
  'For the pendulum, measure length from the pivot to the centre of the bob. Release at a small angle, such as five degrees, without a push. Keep the amplitude small and motion in one vertical plane.',
  'Time 10-20 complete oscillations past a fixed reference point, starting and stopping at the same phase and direction. Repeat three times and divide each total time by the number of cycles. Repeat for at least six lengths.',
  'For the spring, include the hanger in the mass and choose loads within the linear elastic range. Displace the mass slightly downwards and release without sideways motion. Time and repeat multiple complete vertical cycles at each of several masses.',
  'Also measure the spring static force-extension graph to find an independent stiffness for comparison. Keep amplitude modest and ensure the oscillating mass cannot strike the bench.'
 ],[
  S`Pendulum: \(T^2=(4\pi^2/g)L\). Plot \(T^2\) against \(L\); \(g=4\pi^2/\text{gradient}\). Spring: \(T^2=(4\pi^2/k)m\), giving \(k=4\pi^2/\text{gradient}\) for a \(T^2\)-against-\(m\) plot.`,
  'The spring itself contributes effective oscillating mass and can produce a positive intercept. Compare dynamic and static stiffness with both uncertainties; the static measurement is not an exact accepted value.'
 ],[
  S`If \(T=t/N\), then \(\Delta T=\Delta t/N\), with exact cycle count \(N\). Timing more cycles reduces relative start-stop uncertainty. For one pendulum result, \(\Delta g/g\approx\Delta L/L+2\Delta T/T\).`,
  'Count full cycles, not individual passes. A fiducial marker reduces uncertainty in the start-stop position; a light gate or motion sensor removes human reaction time but still needs the correct cycle definition.',
  'Measuring to the bottom rather than the centre of the bob overestimates length systematically. Large pendulum amplitudes increase period beyond the small-angle prediction. Stand movement, damping and sideways spring motion also limit the ideal models.'
 ],['Clamp the stand securely and keep the moving mass clear of people and the bench. Use a catch tray and do not overload the spring.']);
 practical(8,'Boyle and Charles laws','Supplied Practicals PDF pages 87-89 for gas analysis and constant-pressure temperature method; Boyle method is supplementary. Absolute zero is about -273.15 degrees Celsius, not -273 kelvin.',[
  'For Boyle law use a sealed gas syringe or approved compression apparatus and pressure sensor. For Charles law use an approved trapped-air capillary apparatus with a movable liquid marker, water baths, ruler and thermometer. Keep the amount of gas fixed in both investigations.'
 ],[
  'Boyle law: check for leaks and determine any connecting-tube or sensor dead volume. Record absolute pressure and total trapped volume. If the sensor reads gauge pressure, add the measured atmospheric pressure.',
  'Change the volume slowly through several safe values. Wait after each compression or expansion until the gas returns to room temperature, then record pressure and volume. Repeat in reverse order to check for leaks or piston friction.',
  'Charles law: use teacher-prepared apparatus with a freely moving marker maintaining approximately atmospheric pressure. Keep its orientation fixed. Immerse the trapped gas in a stirred water bath alongside the thermometer.',
  'At each of several bath temperatures, wait for equilibrium before measuring trapped-air length and temperature. Keep the gas fully immersed and read the marker consistently. Repeat on cooling to check thermal lag; do not prepare the acid-thread apparatus described in the older worksheet yourself.'
 ],[
  S`Boyle law at fixed temperature: \(pV=\text{constant}\). Plot absolute \(p\) against \(1/V\). Charles law at fixed pressure: \(V\propto T\), where \(T/\mathrm K=\theta/{}^\circ\mathrm C+273.15\).`,
  'In a uniform-bore capillary, gas-column length is proportional to volume after allowing for any end volume. Plot length against Celsius temperature; extrapolating to zero length estimates absolute zero, but the distant intercept has substantial uncertainty.'
 ],[
  'Compression heats gas; an immediate reading gives too high a pressure for the assumed room temperature. Wait for stable readings. Leaks change the amount of gas and invalidate both tests.',
  'Dead volume is a systematic offset, especially at small syringe volumes. Piston friction, sensor zero and capillary nonuniformity can also produce systematic deviations; compare compression and expansion runs.',
  'For Charles law, thermometer calibration, bath gradients, marker width and incomplete thermal equilibrium limit measurements. Stir the bath, wait and read at eye level. Assess extrapolation uncertainty using alternative acceptable fitted lines; do not calculate a gas-law fractional temperature uncertainty by dividing by a Celsius value.'
 ],['Use school-approved prepared apparatus and pressure limits. Handle warm water and glassware under supervision; never heat a sealed rigid vessel outside its approved procedure.']);
 practical(9,'Capacitor charge and discharge','Supplied Practicals PDF pages 75-77.',[
  'Use a low-voltage supply, capacitor, measured resistor, changeover switch and high-input-resistance voltmeter or data logger. Record capacitor voltage against time, controlling resistance, capacitance and starting voltage.'
 ],[
  'With power off, check capacitor polarity and voltage rating. Arrange the switch to charge through a resistor or disconnect the supply and discharge through the resistor; keep the voltmeter across the capacitor.',
  'Estimate RC and select a sample interval much shorter than it, for example no more than about one tenth of RC. Fully discharge through a resistor, then record a charging run until the voltage approaches its plateau.',
  'Charge to a stable initial voltage. Switch to discharge and start recording at the switching event. Measure for several time constants, stopping before readings are indistinguishable from the meter noise.',
  'Repeat with the same initial voltage. To determine an unknown capacitance, repeat discharge runs with several measured resistances and find a time constant for each.'
 ],[
  S`Discharge: \(V=V_0e^{-t/(RC)}\). Plot \(\ln(V/V_0)\) against \(t\); gradient \(a=-1/(RC)\), so \(\tau=-1/a\) and \(C=\tau/R\). Only take logarithms of positive measured voltages.`,
  S`For charging from zero, \(V=V_s(1-e^{-t/(RC)})\); plot \(\ln[(V_s-V)/V_s]\) against time. Alternatively identify discharge to \(V_0/e\), or charge to \(0.632V_s\). A plot of \(\tau\) against \(R\) has gradient \(C\) when loading is negligible.`
 ],[
  'Manual switching and reading introduce timing errors, especially early in the run. A triggered logger improves time resolution and provides more points, but check its input resistance and sample rate.',
  S`A voltmeter of resistance \(R_V\) also discharges the capacitor: \(R_{\mathrm{effective}}=(1/R+1/R_V)^{-1}\). Ignoring this makes the inferred capacitance too small when using the external \(R\) alone.`,
  S`Leakage and component tolerances can explain differences from nominal values. Measure \(R\) and compare with the capacitor tolerance. Near zero, \(\Delta\ln V\approx\Delta V/V\) becomes large; charging data near the supply plateau have the same subtraction problem. For \(C=\tau/R\), use \(\Delta C/C\approx\Delta\tau/\tau+\Delta R/R\).`
 ],['Observe capacitor polarity and voltage rating. Discharge through a suitable resistor before rewiring; do not short a charged capacitor with a lead.']);
 practical(10,'Force on a current-carrying wire','Supplied Practicals PDF page 79; method expanded from its balance-based analysis.',[
  'Use magnets on a top-pan balance and an independently supported straight wire in the gap, a low-voltage supply, current limiter and ammeter. Investigate current, active wire length and field strength separately; hold the other quantities and the wire angle fixed.'
 ],[
  'Position the wire perpendicular to the magnetic field without touching the magnets or balance. Support the leads so they cannot push on the balance. Record the zero-current balance reading.',
  'Increase current in safe steps. Record current and the settled balance reading, then switch off. Subtract the zero-current reading and convert the mass change from grams to kilograms.',
  'Repeat each reading and reverse current to check that the force reverses. Recheck zero to detect drift. For the length investigation, change the length of straight wire actually within the approximately uniform field while keeping current fixed.',
  'For the field investigation, vary the field with approved apparatus and measure its flux density at the wire using a calibrated Hall probe. Magnet count alone is not a measurement of flux density. Keep current, wire length and orientation unchanged.'
 ],[
  S`The force magnitude is \(F=|\Delta m|g\). With perpendicular field and wire, \(F=BIL\); a plot of \(F\) against \(I\) has gradient \(BL\), and \(B=\text{gradient}/L\). The balance measures the reaction force on the magnets.`,
  S`At constant \(B,I\), plot \(F\) against \(L\); at constant \(I,L\), plot \(F\) against measured \(B\). The gradients are \(BI\) and \(IL\), respectively.`
 ],[
  'Balance fluctuations are a large fraction of small mass differences. Use a draught-free stable bench, repeat readings and include uncertainty in both the loaded and zero readings.',
  'The effective field length is uncertain near magnet edges because of fringing. Keep the wire in the central uniform region where possible; measure the relevant length, not the whole wire. A wire not perpendicular to the field gives a smaller force.',
  S`For a single perpendicular-wire result, \(\Delta B/B\approx\Delta F/F+\Delta I/I+\Delta L/L\). Heating can change current, so monitor it rather than relying on the supply setting. Zero checks and current reversal help distinguish magnetic force from offsets.`
 ],['Limit current and switch off between readings to avoid hot wires. Keep strong magnets away from sensitive equipment and avoid trapping fingers between magnets.']);
 practical(11,'Search coil and magnetic flux linkage','Supplementary guide: AQA required practical 11 and apparatus set-up guide. The supplied Practicals PDF page 80 discusses transformers but does not provide this search-coil method.',[
  'Use a small search coil at the centre of a larger field coil, a low-voltage AC supply or signal generator, oscilloscope, protractor and clamps. Vary the angle between the search-coil normal and the field direction; keep frequency, field amplitude, position, area and turns fixed.'
 ],[
  'Connect the field coil to the AC source and the search coil to the oscilloscope. Set a stable sinusoidal drive and adjust volts per division and timebase for a clear trace.',
  'Locate the search coil centrally, where the field is approximately uniform. Define zero angle with its normal parallel to the field, so its plane is perpendicular to the field.',
  'Rotate the search coil through a range from zero to ninety degrees about its centre without translating it. At each angle record peak-to-peak emf, checking probe attenuation and oscilloscope scale.',
  'Repeat the angle sequence in reverse and recheck the zero-angle amplitude. Keep lead loops small and fixed. Monitor the drive to detect amplitude or frequency drift.'
 ],[
  S`Flux linkage is \(N\Phi=NAB\cos\theta\). For \(B=B_0\sin(\omega t)\) at fixed coil angle, the induced emf amplitude is \(E_0=NAB_0\omega|\cos\theta|\). Plot peak-to-peak emf against \(\cos\theta\) over zero to ninety degrees.`,
  'With constant drive frequency and field amplitude, the measured emf amplitude is proportional to flux-linkage amplitude. This is a stationary coil in a time-varying field: it is not the same measurement as continuously rotating a coil in a steady field.'
 ],[
  'Protractor zero, parallax and an uncertain coil normal give angle errors. Use a fixed pointer and read at eye level. Small angle errors near ninety degrees cause large relative errors in the very small signal.',
  'Noise, trace thickness and oscilloscope calibration limit voltage readings. Increase sensitivity for small signals without clipping larger ones, and compare the residual signal near ninety degrees with the noise level.',
  'Moving the coil through a nonuniform field changes flux as well as angle. Rotate about its centre, keep it small relative to the field coil, and recheck the starting orientation. Lead pickup or drive drift can produce a nonzero intercept that repeats do not remove.'
 ],['Use only approved low-voltage AC apparatus. Check coil current ratings and switch off if a coil becomes hot; secure both coils before adjusting their orientation.']);
 practical(12,'Inverse-square law for gamma radiation','Supplied Practicals PDF page 84; general counting and decay context on pages 82-83.',[
  'Under the school radiation procedure, use a sealed gamma source, holder, GM tube and counter, timer and distance scale. Vary source-detector distance, measuring counts over known times. Keep source, detector orientation and intervening materials unchanged.'
 ],[
  'With the source stored away, measure background counts over a long known interval. Record the total counts and duration, not only a rounded rate. Repeat or measure background again at the end to check stability.',
  'The authorised supervisor positions the source and detector on a common axis. Measure distance from the source active region to the detector sensitive region, using apparatus reference information rather than assuming the case fronts are those points.',
  'Count for a known time at each of several distances. Repeat each measurement; use longer counting times at larger distances where the net signal is small.',
  'Choose distances large compared with source and detector dimensions, but not so large that background dominates. Avoid very high rates where detector dead time causes missed counts. Return the source to approved storage after use.'
 ],[
  S`Calculate net count rate \(C=N_s/t_s-N_b/t_b\). Test \(C\propto1/r^2\) by plotting \(C\) against \(1/r^2\), or check whether \(Cr^2\) is constant within uncertainty. A straight line consistent with zero intercept supports the model.`,
  'Count rate is not the source activity: the detector captures only a fraction of emissions and has finite efficiency. Background must be subtracted as a rate when counting times differ.'
 ],[
  S`Radioactive counts fluctuate statistically. For sufficiently large independent counts, \(\sigma_N\approx\sqrt N\) and \(\sigma_C\approx\sqrt{N_s/t_s^2+N_b/t_b^2}\). Background subtraction does not remove background uncertainty.`,
  S`The fractional uncertainty in \(1/r^2\) is approximately \(2\Delta r/r\). A fixed distance-reference error is especially serious at short distances. At long distances, counting statistics and background dominate instead.`,
  'Longer counting reduces relative statistical uncertainty but does not correct a wrong distance zero, scattering from surroundings or dead-time losses. A negative net rate at large distance means the signal is not resolved above background, not negative physical activity.'
 ],['Radioactive sources are handled only under authorised staff supervision and the school radiation-safety procedure. Minimise exposure time, maximise distance where practical, use approved handling tools and shielding, and never touch or open a source.']);
 // Handbook additions retain each guide's existing method/analysis structure.
 const handbookPages=['65-67','70-73','76-79','82-85','88-89','92-93','96-101','104-111','114-118','121-124','127-130','133-135'];
 const handbookAdditions=[
  [
   ['Method','A movable bridge can define the end of the vibrating segment more clearly than the pulley contact. For a length investigation, find the fundamental at each bridge position and repeat the complete sequence, checking for one central antinode.'],
   ['Analysis',S`An alternative handbook graph is \(1/f\) against \(L\) for the fundamental. Its gradient is \(2/v\), so \(v=2/\text{gradient}\). Compare this with \(v=\sqrt{F/\mu}\); do not use this gradient formula for the different plot of \(f\) against \(1/L\).`]
  ],
  [
   ['Method','Illuminate both slits evenly. Use the labelled slit separation or measure it independently with the laser off. A travelling microscope used to measure the slit separation must never be used to look at the laser fringe pattern. A set square helps align a grating perpendicular to the beam.'],
   ['Analysis','Calculate a wavelength separately from each left and right diffraction order before averaging; disagreement can reveal misalignment. The number of observable orders depends on grating spacing and wavelength, so do not invent readings for missing orders.']
  ],
  [
   ['Method','Handbook two-gate alternative: keep the release point and upper light gate fixed, and move only the lower gate. Measure the gate separation h and the transit time t between gates. Repeat at each separation; the entry speed at the upper gate is then approximately constant but not zero.'],
   ['Analysis',S`For the two-gate method, \(h=ut+\tfrac12gt^2\), hence \(2h/t=2u+gt\). Plot \(2h/t\) on the vertical axis against \(t\); the gradient is \(g\) and intercept is \(2u\). This avoids treating the inter-gate journey as a fall from rest.`]
  ],
  [
   ['Method','In a comparison-wire arrangement, use two similar wires on the same support, with a fixed preload on the reference wire and additional loads on the test wire. Read the relative extension with a vernier or micrometer arrangement. Shared support movement and temperature changes then have less effect.'],
   ['Analysis',S`If using the handbook axes, extension \(x\) against force \(F\), the gradient is compliance \(a=x/F\), not stiffness. Therefore \(E=L/(Aa)\). For the reversed axes, force against extension, \(E=(L/A)\times\text{gradient}\). State your axes before substituting a gradient.`]
  ],
  [
   ['Method','The handbook uses constantan wire and adjusts the applied voltage as length changes to keep current approximately constant. Select a current appropriate to the actual wire and its rating; a numerical current suggested for one apparatus is not a universal setting.'],
   ['Uncertainty and improvements','Repeat the whole length sequence, rather than only rereading unchanged meters, to include uncertainty from repositioning contacts. Record each V and I pair, calculate each resistance, then average repeated resistances for the same length. Convert micrometer diameters to metres before calculating area.']
  ],
  [
   ['Analysis','Compare the measured open-switch voltage with the fitted vertical intercept. Agreement within uncertainty supports the extrapolated emf. The negative voltage-current gradient has units volts per ampere, equivalent to ohms; report internal resistance as a positive magnitude.'],
   ['Uncertainty and improvements','Check the cell before and after a run using the same load. If its terminal voltage changes beyond normal scatter, the cell has not remained in the same condition. Identify that drift rather than averaging two different conditions as though they were repeated measurements.']
  ],
  [
   ['Method','For a spherical pendulum bob, measure from the pivot to its top and add the measured radius to obtain the centre-of-mass distance. Check the motion from the side for unwanted elliptical motion. Move the spring fiducial marker to the new equilibrium position whenever the mass changes.'],
   ['Analysis',S`Keep columns for the individual times of ten cycles, their mean, \(T=\overline{t_{10}}/10\), and \(T^2\), with units \(\mathrm s\) and \(\mathrm{s^2}\). This preserves the raw evidence for your timing uncertainty instead of recording only a calculated period.`]
  ],
  [
   ['Method','The handbook also describes expanding trapped air by hanging a load from a syringe plunger. This is a separate apparatus arrangement from direct pressure-sensor compression. The clamp must not distort the barrel; check for a freely moving plunger, leaks and safe clearance beneath the load.'],
   ['Analysis',S`For the idealised loaded-plunger expansion arrangement, \(p=p_{\mathrm{atm}}-F/A\), where \(F\) is the total outward load force after any necessary plunger-weight correction. For compression the sign is reversed. Use a force diagram and actual atmospheric pressure rather than applying the minus sign to every syringe experiment. Plot \(1/V\) against absolute \(p\) as an alternative Boyle-law test.`],
   ['Uncertainty and improvements','In the capillary Charles-law method, note precisely which end of the liquid marker bounds the trapped air. Keep the air column below the water level throughout, allow the temperature to settle and avoid changing tube orientation, which can change the pressure contribution of the liquid marker.']
  ],
  [
   ['Analysis',S`The handbook also uses \(\ln(V/\mathrm V)\) against \(t\). This has the same discharge gradient \(-1/(RC)\), but intercept \(\ln(V_0/\mathrm V)\), whereas the normalised plot \(\ln(V/V_0)\) ideally has zero intercept. Specify the voltage unit when taking logarithms of numerical readings.`],
   ['Method','Compare several resistor-capacitor combinations, changing one component at a time. Check that the capacitor has returned to zero voltage before each charging run; a residual charge changes the initial condition. Choose the logging interval from the expected time constant, not an arbitrary fixed interval for every combination.']
  ],
  [
   ['Analysis',S`The handbook plots balance mass change in grams against current. If this gradient is \(a\) in \(\mathrm{g\,A^{-1}}\), then \(B=ag/(1000L)\). If mass is plotted in kilograms instead, omit the factor of 1000. Do not confuse the plotted mass change with the total mass of the magnets.`],
   ['Uncertainty and improvements','Measure the magnet length along the active wire direction as an estimate of field length, explicitly stating that edge fields are neglected. Repeating the current sequence tests scatter, but cannot establish that this effective-length approximation is exact.']
  ],
  [
   ['Method','The handbook measures the angle between the planes of the large field coil and search coil. At the centre of the field coil this is equivalent to the angle between the search-coil normal and field direction used here. Parallel coil planes correspond to zero angle and maximum signal. Use a fixed protractor and pointer through the rotation centre.'],
   ['Uncertainty and improvements','Perform a preliminary run to select an adequate drive and oscilloscope sensitivity without exceeding coil current ratings. Raising frequency can increase induced emf, but may also change field-coil current: choose the drive first and hold it fixed for the entire angle scan. Record peak-to-peak voltage consistently, including the probe attenuation factor.']
  ],
   [
    ['Method','If the active source and detector positions are inaccessible, record the accessible front-to-window separation X consistently instead. Do not silently label it as the true active separation. Preliminary counts help choose useful distances and counting durations; preserve both totals and durations when those durations differ.'],
    ['Analysis',S`The handbook offset method writes true separation as \(r=X+e\). If corrected rate \(C=K/(X+e)^2\), then \(1/\sqrt C=(X+e)/\sqrt K\). Plot \(1/\sqrt C\) against \(X\); the horizontal intercept is \(-e\), or \(e=b/a\) from vertical intercept \(b\) and gradient \(a\). Only transform positive, well-resolved corrected rates.`],
    ['Uncertainty and improvements','Allow a free intercept for the offset graph. A straight line can support inverse-square behaviour despite an unknown constant distance offset, but fitting an intercept does not remove scattering, dead-time effects or background uncertainty. Do not force the line through the origin.']
   ]
 ];
 notes[13].sections.filter(section=>section.practical).forEach(section=>{
  const index=section.practical-1;
  section.handbookPages=handbookPages[index];
  section.sourceReference+=' Also: AQA-7407-7408-PH.pdf, required practical handbook, cover version 2.1 (July 2022), PDF pages '+section.handbookPages+'.';
  for(const [title,point] of handbookAdditions[index])section.groups.find(group=>group.title===title).points.push(point);
 });
 notes[13].source+=' Further source: supplied AQA-7407-7408-PH.pdf, cover version 2.1 (July 2022), PDF pages 37-47 and 65-135. Page references count from the first PDF page. Handbook exemplar methods are alternatives to adapt to available apparatus, not the only valid procedures. The uploaded handbook now supplies direct support for methods absent from the earlier Dwyer collection. Summaries are original; the full PDF is not published by this site.';
 notes[13].sections[1].points.push(
  'Handbook recording guidance (PDF page 37): prepare tables with the independent variable first, clear quantity/unit headings, and separate columns for repeats and processed results. Record readings as you take them. Preserve the original record if you later sort or replot the data.',
  'Handbook uncertainty guidance (PDF pages 39-41): instrument resolution sets only a lower limit, not the whole uncertainty. With a 1 mm scale, two independent endpoint judgements of 0.5 mm each give a minimum 1 mm length uncertainty. Comparing two complete lengths involves four endpoint judgements; tracking one moving marker against a fixed scale can reduce this to two.',
  'For graphs, label each axis with its quantity and unit, plot clear points and show uncertainty bars where appropriate. Choose a model from the physics, then inspect whether the data support it. A line close to every point does not on its own show that systematic errors are absent.'
 );
 const checkpoints=[
  ['Why can very repeatable measurements still be inaccurate?','Why must an area conversion square the length conversion factor?'],
  ['Which conserved quantities must balance in beta-minus decay?','How does increasing photon frequency differ from increasing light intensity in the photoelectric effect?'],
  ['How does changing string tension affect its harmonic frequencies?','Why is the central double-slit fringe white when the source is white light?'],
  ['Which motion-graph area gives displacement rather than distance?','How would you obtain Young modulus from a stress-strain graph?'],
  ['Why is a tangent gradient not generally the resistance of a nonlinear component?','How does the position of an NTC thermistor affect the output of a potential divider?'],
  ['At which displacement is SHM speed greatest, and where is acceleration magnitude greatest?','How does the molecular model explain a pressure rise when a fixed-volume gas is heated?'],
  ['Why is total energy negative for a bound circular satellite orbit?','How do time constant, half-time, peak voltage and RMS voltage differ?'],
  ['What does each part of the Rutherford scattering pattern imply about atomic structure?','Why must background counts be removed before fitting a decay curve?'],
  ['Why can a cool giant be more luminous than a hotter main-sequence star?','What different observations support transit and radial-velocity exoplanet detections?'],
  ['What physical quantity is recorded in an ECG?','How do ultrasound reflection and X-ray attenuation produce image contrast?'],
  ['What distinguishes indicated power from brake power?','Why can a heat pump have a coefficient of performance greater than one?'],
  ['How do specific-charge measurements and oil-drop measurements complement one another?','What distinguishes TEM imaging from STM surface measurements?'],
  ['What changes when ADC bit depth increases, and what changes when sampling rate increases?','How do combinational and sequential logic differ?'],
  ['For each practical, can you identify the measured variables, the graph and the physical meaning of its gradient?','Which uncertainty dominates the result, and what specific change to the method would reduce it?']
 ];
 checkpoints.forEach((points,i)=>notes[i].sections.push(section('Revision checkpoints',...points)));
 return notes;
})();
