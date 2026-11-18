// Explicit notation for the existing bank. New content can use \(...\) or \[...\] directly.
const PhysicsMath = (() => {
  const entries = [];
  function formula(plain, tex) { entries.push([plain, tex]); }
  const S = String.raw;
  formula('Percentage uncertainty = (absolute uncertainty / measured value) x 100', S`\frac{\Delta x}{x}\times100\%`);
  formula('Mean = sum of readings / number of readings', S`\bar{x}=\frac{\sum x_i}{n}`);
  formula('Estimated absolute uncertainty = range / 2', S`\Delta x=\frac{\text{range}}{2}`);
  formula('Absolute gradient uncertainty = (steepest - shallowest) / 2 = 2', S`\Delta m=\frac{m_{\max}-m_{\min}}{2}=2`);
  formula('Percentage uncertainty = absolute uncertainty / length x 100', S`\frac{\Delta L}{L}\times100\%`);
  formula('Percentage uncertainty = 2 / best-fit gradient x 100', S`\frac{2}{m_{\mathrm{best}}}\times100\%`);
  formula('E = 4FL / (pi d squared x)', S`E=\frac{4FL}{\pi d^2 x}`);
  formula('density = m / (pi r squared L)', S`\rho=\frac{m}{\pi r^2 L}`);
  formula('T squared = 4 pi squared L / g', S`T^2=\frac{4\pi^2L}{g}`);
  formula('T squared = 4 pi squared L/g', S`T^2=\frac{4\pi^2L}{g}`);
  formula('g = 4 pi squared / gradient', S`g=\frac{4\pi^2}{\text{gradient}}`);
  formula('Kinetic energy = 0.5mv squared', S`E_k=\frac12mv^2`);
  formula('0.5mv squared = kinetic energy', S`\frac12mv^2=E_k`);
  formula('v = square root of (2E_k / m)', S`v=\sqrt{\frac{2E_k}{m}}`);
  formula('hf_0 = work function', S`hf_0=\phi`);
  formula('E = hc / wavelength', S`E=\frac{hc}{\lambda}`);
  formula('Photon energy = hc / wavelength', S`E_\gamma=\frac{hc}{\lambda}`);
  formula('Maximum kinetic energy = photon energy - work function', S`E_{k,\max}=hf-\phi`);
  formula('eV_stop = maximum kinetic energy', S`eV_{\mathrm{stop}}=E_{k,\max}`);
  formula('de Broglie wavelength = h / p', S`\lambda=\frac{h}{p}`);
  formula('Wavelength = h / p', S`\lambda=\frac{h}{p}`);
  formula('wavelength = h/p', S`\lambda=\frac{h}{p}`);
  formula('p = h / wavelength', S`p=\frac{h}{\lambda}`);
  formula('f = E / h', S`f=\frac{E}{h}`);
  formula('Q = Ne', S`Q=Ne`);
  formula('v = f x wavelength', S`v=f\lambda`);
  formula('Wavelength = v / f', S`\lambda=\frac{v}{f}`);
  formula('Period T = 1 / frequency', S`T=\frac{1}{f}`);
  formula('Fringe spacing w = wavelength x D / s', S`w=\frac{\lambda D}{s}`);
  formula('n x wavelength = d sin(theta)', S`n\lambda=d\sin\theta`);
  formula('n_1 sin(i) = n_2 sin(r)', S`n_1\sin i=n_2\sin r`);
  formula('r = inverse sine of (sin(i) / 1.50)', S`r=\sin^{-1}\!\left(\frac{\sin i}{1.50}\right)`);
  formula('sin(c) = n_air / n_material', S`\sin c=\frac{n_{\mathrm{air}}}{n_{\mathrm{material}}}`);
  formula('d sin(theta) = wavelength', S`d\sin\theta=\lambda`);
  formula('theta = inverse sine of (wavelength / d)', S`\theta=\sin^{-1}\!\left(\frac{\lambda}{d}\right)`);
  formula('Grating spacing d = 1 / (lines per metre)', S`d=\frac{1}{N},\quad N\text{ in lines per metre}`);
  formula('wavelength = 2L', S`\lambda=2L`);
  formula('Frequency = wave speed / (2L)', S`f=\frac{v}{2L}`);
  formula('Phase difference = 2 pi x separation / wavelength', S`\Delta\phi=\frac{2\pi\Delta x}{\lambda}`);
  formula('F = ma', S`F=ma`);
  formula('a = F / m', S`a=\frac{F}{m}`);
  formula('W = mg', S`W=mg`);
  formula('p = mv', S`p=mv`);
  formula('s = ut + 0.5at squared', S`s=ut+\frac12at^2`);
  formula('F = kx', S`F=kx`);
  formula('x = F / k', S`x=\frac{F}{k}`);
  formula('Stress = force / cross-sectional area', S`\sigma=\frac{F}{A}`);
  formula('h = 0.5gt squared', S`h=\frac12gt^2`);
  formula('Flight time = square root of (2h / g)', S`t=\sqrt{\frac{2h}{g}}`);
  formula('range = horizontal speed x flight time', S`R=v_x t`);
  formula('Young modulus = stress / strain = FL / (A x extension)', S`E=\frac{\sigma}{\varepsilon}=\frac{FL}{A\Delta L}`);
  formula('E = FL / (A x extension)', S`E=\frac{FL}{A\Delta L}`);
  formula('Elastic strain energy = 1/2 x force x extension', S`E_{\mathrm{el}}=\frac12F\Delta L`);
  formula('1/2 mv squared = mgh', S`\frac12mv^2=mgh`);
  formula('W = Fs cos(theta)', S`W=Fs\cos\theta`);
  formula('Q = It', S`Q=It`);
  formula('E = QV', S`E=QV`);
  formula('V = IR', S`V=IR`);
  formula('P = VI', S`P=VI`);
  formula('R = R_1 R_2 / (R_1 + R_2)', S`R=\frac{R_1R_2}{R_1+R_2}`);
  formula('P = I squared R', S`P=I^2R`);
  formula('R = resistivity x L / A', S`R=\frac{\rho L}{A}`);
  formula('resistivity = RA / L', S`\rho=\frac{RA}{L}`);
  formula('I = emf / (external resistance + internal resistance)', S`I=\frac{\mathcal{E}}{R+r}`);
  formula('V = emf - Ir', S`V=\mathcal{E}-Ir`);
  formula('R_p = 2000 R_load / (2000 + R_load)', S`R_p=\frac{2000R_{\mathrm{load}}}{2000+R_{\mathrm{load}}}`);
  formula('V_out = 12 R_p / (2000 + R_p)', S`V_{\mathrm{out}}=\frac{12R_p}{2000+R_p}`);
  formula('Q = mc x temperature change', S`Q=mc\Delta T`);
  formula('Q = mL', S`Q=mL`);
  formula('Angular speed = 2 pi x frequency', S`\omega=2\pi f`);
  formula('Angular frequency = 2 pi f', S`\omega=2\pi f`);
  formula('Maximum speed = angular frequency x amplitude', S`v_{\max}=\omega A`);
  formula('pV = nRT', S`pV=nRT`);
  formula('p = nRT / V', S`p=\frac{nRT}{V}`);
  formula('F = mv squared / r', S`F=\frac{mv^2}{r}`);
  formula('T = 2 pi square root of (L / g)', S`T=2\pi\sqrt{\frac{L}{g}}`);
  formula('T = 2 pi square root of (L/g)', S`T=2\pi\sqrt{\frac{L}{g}}`);
  formula('v squared = omega squared (A squared - x squared)', S`v^2=\omega^2(A^2-x^2)`);
  formula('Speed = omega x square root of (A squared - x squared)', S`v=\omega\sqrt{A^2-x^2}`);
  formula('Temperature rise = energy gained / (mc)', S`\Delta T=\frac{Q}{mc}`);
  formula('1/2 m c_rms squared = 3/2 kT', S`\frac12m c_{\mathrm{rms}}^2=\frac32kT`);
  formula('c_rms = square root of (3RT / M)', S`c_{\mathrm{rms}}=\sqrt{\frac{3RT}{M}}`);
  formula('a = -omega squared x', S`a=-\omega^2x`);
  formula('E = V / d', S`E=\frac{V}{d}`);
  formula('Q = CV', S`Q=CV`);
  formula('F = BIL', S`F=BIL`);
  formula('Energy = 0.5CV squared', S`E=\frac12CV^2`);
  formula('g = GM / r squared', S`g=\frac{GM}{r^2}`);
  formula('Bqv = mv squared / r', S`Bqv=\frac{mv^2}{r}`);
  formula('r = mv / (Bq)', S`r=\frac{mv}{Bq}`);
  formula('V/V_0 = exp(-t/RC)', S`\frac{V}{V_0}=e^{-t/(RC)}`);
  formula('V = V_0 exp(-t / RC)', S`V=V_0 e^{-t/(RC)}`);
  formula('t = -RC ln(V/V_0)', S`t=-RC\ln\!\left(\frac{V}{V_0}\right)`);
  formula('V/V_0 = 0.25', S`\frac{V}{V_0}=0.25`);
  formula('T = 2 pi square root of (r cubed / GM)', S`T=2\pi\sqrt{\frac{r^3}{GM}}`);
  formula('Activity = number of decays / time in seconds', S`A=\frac{\Delta N}{\Delta t}`);
  formula('Nucleon number = proton number + neutron number', S`A=Z+N`);
  formula('Neutrons = nucleon number - proton number', S`N=A-Z`);
  formula('Decay constant = ln(2) / half-life', S`\lambda=\frac{\ln2}{T_{1/2}}`);
  formula('E = mass decrease x c squared', S`E=\Delta m\,c^2`);
  formula('N/N_0 = exp(-lambda t)', S`\frac{N}{N_0}=e^{-\lambda t}`);
  formula('lambda = ln(2)/5700', S`\lambda=\frac{\ln2}{5700}`);
  formula('t = -ln(N/N_0) / lambda', S`t=-\frac{\ln(N/N_0)}{\lambda}`);
  formula('Fission rate = thermal power / energy per fission', S`\dot{N}=\frac{P_{\mathrm{thermal}}}{E_{\mathrm{fission}}}`);
  formula('A = lambda N', S`A=\lambda N`);
  formula('R = r_0 A^(1/3)', S`R=r_0 A^{1/3}`);
  formula('Magnitude of angular magnification = objective focal length / eyepiece focal length', S`|M|=\frac{f_o}{f_e}`);
  formula('Peak wavelength = Wien constant / temperature', S`\lambda_{\max}=\frac{b}{T}`);
  formula('Peak wavelength x temperature = 2.90 x 10^-3', S`\lambda_{\max}T=2.90\times10^{-3}`);
  formula('m - M = 5 log10(d/10)', S`m-M=5\log_{10}\!\left(\frac{d}{10}\right)`);
  formula('d = 10 x 10^((m-M)/5)', S`d=10\times10^{(m-M)/5}`);
  formula('v/c = wavelength shift / rest wavelength', S`\frac{v}{c}=\frac{\Delta\lambda}{\lambda_0}`);
  formula('v = c x shift / rest wavelength', S`v=c\frac{\Delta\lambda}{\lambda_0}`);
  formula('v = H_0 d', S`v=H_0d`);
  formula('d = v / H_0', S`d=\frac{v}{H_0}`);
  formula('L is proportional to R squared T to the fourth power', S`L\propto R^2T^4`);
  formula('Radius ratio squared = luminosity ratio / temperature ratio to the fourth power', S`\left(\frac{R}{R_\odot}\right)^2=\frac{L/L_\odot}{(T/T_\odot)^4}`);
  formula('Radius ratio = square root of (luminosity ratio / 16)', S`\frac{R}{R_\odot}=\sqrt{\frac{L/L_\odot}{16}}`);
  formula('Received flux = luminosity / (4 pi d squared)', S`F=\frac{L}{4\pi d^2}`);
  formula('L = 4 pi R squared sigma T to the fourth power', S`L=4\pi R^2\sigma T^4`);
  formula('theta = 1.22 wavelength / D', S`\theta=\frac{1.22\lambda}{D}`);
  formula('D = 1.22 x wavelength / theta', S`D=\frac{1.22\lambda}{\theta}`);
  formula('P = 1 / focal length in metres', S`P=\frac{1}{f}`);
  formula('Depth = vt / 2', S`d=\frac{vt}{2}`);
  formula('depth = vt / 2', S`d=\frac{vt}{2}`);
  formula('L = 10 log10(I/I_0)', S`L=10\log_{10}\!\left(\frac{I}{I_0}\right)`);
  formula('I / I_0 = exp(-mu x)', S`\frac{I}{I_0}=e^{-\mu x}`);
  formula('I/I_0 = exp(-mu x)', S`\frac{I}{I_0}=e^{-\mu x}`);
  formula('x = ln(2)/mu', S`x_{1/2}=\frac{\ln2}{\mu}`);
  formula('Z = density x wave speed', S`Z=\rho c`);
  formula('1/T_effective = 1/T_physical + 1/T_biological', S`\frac{1}{T_{\mathrm{eff}}}=\frac{1}{T_{\mathrm{phys}}}+\frac{1}{T_{\mathrm{bio}}}`);
  formula('T_effective = T_physical T_biological / (T_physical + T_biological)', S`T_{\mathrm{eff}}=\frac{T_{\mathrm{phys}}T_{\mathrm{bio}}}{T_{\mathrm{phys}}+T_{\mathrm{bio}}}`);
  formula('hc / minimum wavelength = eV', S`\frac{hc}{\lambda_{\min}}=eV`);
  formula('minimum wavelength = hc / (eV)', S`\lambda_{\min}=\frac{hc}{eV}`);
  formula('R = ((Z_2 - Z_1) / (Z_2 + Z_1)) squared', S`R=\left(\frac{Z_2-Z_1}{Z_2+Z_1}\right)^2`);
  formula('Torque = force x perpendicular distance', S`\tau=F d_\perp`);
  formula('Torque = tangential force x radius', S`\tau=F_t r`);
  formula('P = torque x angular speed', S`P=\tau\omega`);
  formula('I = mr squared', S`I=mr^2`);
  formula('Rotational kinetic energy = 1/2 I omega squared', S`E_k=\frac12I\omega^2`);
  formula('increase in internal energy = heat added - work done by the gas', S`\Delta U=Q-W`);
  formula('Maximum efficiency = 1 - T_cold/T_hot', S`\eta_{\max}=1-\frac{T_c}{T_h}`);
  formula('I_1 omega_1 = (I_1 + I_2) omega_final', S`I_1\omega_1=(I_1+I_2)\omega_f`);
  formula('I_1 omega_1 = (I_1 + I_2) omega_final', S`I_1\omega_1=(I_1+I_2)\omega_f`);
  formula('omega squared = omega_0 squared + 2 alpha theta', S`\omega^2=\omega_0^2+2\alpha\theta`);
  formula('e/m = v/(Br)', S`\frac{e}{m}=\frac{v}{Br}`);
  formula('gamma = 1 / square root of (1 - v squared/c squared)', S`\gamma=\frac{1}{\sqrt{1-v^2/c^2}}`);
  formula('Lorentz factor = 1 / square root of (1 - 0.80 squared)', S`\gamma=\frac{1}{\sqrt{1-0.80^2}}`);
  formula('L = L_0 square root of (1 - v squared/c squared)', S`L=L_0\sqrt{1-\frac{v^2}{c^2}}`);
  formula('qE = mg', S`qE=mg`);
  formula('q = mg/E', S`q=\frac{mg}{E}`);
  formula('E_k = (gamma - 1)mc squared', S`E_k=(\gamma-1)mc^2`);
  formula('E_0 = mc squared', S`E_0=mc^2`);
  formula('p = square root of (2 m_e eV)', S`p=\sqrt{2m_e eV}`);
  formula('Kinetic energy = eV', S`E_k=eV`);
  formula('Voltage gain magnitude = output amplitude / input amplitude', S`|A_v|=\frac{V_{\mathrm{out}}}{V_{\mathrm{in}}}`);
  formula('Non-inverting gain = 1 + R_feedback/R_ground', S`A_v=1+\frac{R_f}{R_g}`);
  formula('Magnitude of closed-loop gain = R_feedback/R_input', S`|A_v|=\frac{R_f}{R_{\mathrm{in}}}`);
  formula('Voltage gain = -R_feedback / R_input', S`A_v=-\frac{R_f}{R_{\mathrm{in}}}`);
  formula('Maximum input amplitude = maximum output amplitude / gain magnitude', S`V_{\mathrm{in,max}}=\frac{V_{\mathrm{out,max}}}{|A_v|}`);
  formula('gain x bandwidth = gain-bandwidth product', S`|A_v|\,\Delta f=\mathrm{GBW}`);
  formula('Bandwidth = gain-bandwidth product / closed-loop gain', S`\Delta f=\frac{\mathrm{GBW}}{|A_v|}`);
  formula('Time constant = RC', S`\tau=RC`);
  formula('Period = total time / number of oscillations', S`T=\frac{t}{N}`);
  formula('Period = time for all oscillations / number of oscillations', S`T=\frac{t}{N}`);
  formula('Gradient = change in force / change in extension', S`k=\frac{\Delta F}{\Delta x}`);
  formula('Absolute uncertainty = square root of the count N', S`\Delta N=\sqrt{N}`);
  formula('Percentage uncertainty = square root of N / N x 100', S`\frac{\sqrt{N}}{N}\times100\%`);
  formula('A = pi d squared / 4', S`A=\frac{\pi d^2}{4}`);
  formula('Resistivity = gradient x area', S`\rho=\text{gradient}\times A`);

  formula('(0.2 / 25.0) x 100 = 0.80%', S`\frac{0.2}{25.0}\times100\%=0.80\%`);
  formula('2 x 2% = 4%', S`2\times2\%=4\%`);
  formula('Total = 1% + 4% + 3% = 8%', S`1\%+4\%+3\%=8\%`);
  formula('g = 4 pi squared / 4.03 = 9.80 m s^-2', S`g=\frac{4\pi^2}{4.03}=9.80\,\mathrm{m\,s^{-2}}`);
  formula('Absolute uncertainty = 9.80 x 0.08 / 4.03 = 0.194 m s^-2', S`\Delta g=\frac{9.80\times0.08}{4.03}=0.194\,\mathrm{m\,s^{-2}}`);
  formula('Charge = 2/3 + 2/3 - 1/3 = +1 elementary charge', S`Q=\left(\frac23+\frac23-\frac13\right)e=+e`);
  formula('E = (6.63 x 10^-34 x 3.00 x 10^8) / (4.50 x 10^-7) = 4.42 x 10^-19 J', S`E=\frac{6.63\times10^{-34}\times3.00\times10^8}{4.50\times10^{-7}}=4.42\times10^{-19}\,\mathrm{J}`);
  formula('v = 250 x 1.36 = 340 m s^-1', S`v=250\times1.36=340\,\mathrm{m\,s^{-1}}`);
  formula('w = (600 x 10^-9 x 2.0) / (0.30 x 10^-3) = 0.0040 m', S`w=\frac{600\times10^{-9}\times2.0}{0.30\times10^{-3}}=0.0040\,\mathrm{m}`);
  formula('Grating spacing d = 1 / (600 x 1000) = 1.667 x 10^-6 m', S`d=\frac{1}{600\times1000}=1.667\times10^{-6}\,\mathrm{m}`);
  formula('3.6 / 1.5 = 2.4 m s^-2', S`\frac{3.6}{1.5}=2.4\,\mathrm{m\,s^{-2}}`);
  formula('Energy = 0.5 x 80 x 1.5 x 10^-3 = 0.060 J', S`E=\frac12\times80\times1.5\times10^{-3}=0.060\,\mathrm{J}`);
  formula('0.020 x 150 = 0.500 v', S`0.020\times150=0.500v`);
  formula('h = 6.00 squared / (2 x 9.81) = 1.83 m', S`h=\frac{6.00^2}{2\times9.81}=1.83\,\mathrm{m}`);
  formula('I = 12 / 30 = 0.40 A', S`I=\frac{12}{30}=0.40\,\mathrm{A}`);
  formula('r = (1.50 - 1.20) / 0.60 = 0.50 ohm', S`r=\frac{1.50-1.20}{0.60}=0.50\,\Omega`);
  formula('Lower equivalent resistance = (2000 x 4000) / (2000 + 4000) = 1333 ohm', S`R_p=\frac{2000\times4000}{2000+4000}=1333\,\Omega`);
  formula('Total resistance = 2000 + 1333 = 3333 ohm', S`R_{\mathrm{total}}=2000+1333=3333\,\Omega`);
  formula('Output voltage = 12 x 1333 / 3333 = 4.80 V', S`V_{\mathrm{out}}=\frac{12\times1333}{3333}=4.80\,\mathrm{V}`);
  formula('Q = 0.50 x 4200 x 20 = 42000 J', S`Q=0.50\times4200\times20=42000\,\mathrm{J}`);
  formula('v_max = 15.7 x 0.080 = 1.26 m s^-1', S`v_{\max}=15.7\times0.080=1.26\,\mathrm{m\,s^{-1}}`);
  formula('c_rms = square root of (3 x 8.31 x 300 / 0.028) = 517 m s^-1', S`c_{\mathrm{rms}}=\sqrt{\frac{3\times8.31\times300}{0.028}}=517\,\mathrm{m\,s^{-1}}`);
  formula('E = 600 / 0.020 = 30000 V m^-1', S`E=\frac{600}{0.020}=30000\,\mathrm{V\,m^{-1}}`);
  formula('Time constant RC = 20000 x 100 x 10^-6 = 2.0 s', S`RC=20000\times100\times10^{-6}=2.0\,\mathrm{s}`);
  formula('V = 12 exp(-3.0 / 2.0) = 2.68 V', S`V=12e^{-3.0/2.0}=2.68\,\mathrm{V}`);
  formula('Orbital radius r = 6.37 x 10^6 + 4.00 x 10^5 = 6.77 x 10^6 m', S`r=6.37\times10^6+4.00\times10^5=6.77\times10^6\,\mathrm{m}`);
  formula('18 / 6 = 3', S`\frac{18}{6}=3`);
  formula('Activity = 800 / 2 cubed = 100 Bq', S`A=\frac{800}{2^3}=100\,\mathrm{Bq}`);
  formula('Half-life = 20 x 60 = 1200 s', S`T_{1/2}=20\times60=1200\,\mathrm{s}`);
  formula('Decay constant = 0.693 / 1200 = 5.78 x 10^-4 s^-1', S`\lambda=\frac{0.693}{1200}=5.78\times10^{-4}\,\mathrm{s^{-1}}`);
  formula('Mass defect = 2(1.007276) + 2(1.008665) - 4.001506 = 0.030376 u', S`\Delta m=2(1.007276)+2(1.008665)-4.001506=0.030376\,\mathrm{u}`);
  formula('Binding energy = 0.030376 x 931.5 = 28.296 MeV', S`E_b=0.030376\times931.5=28.296\,\mathrm{MeV}`);
  formula('T = (2.90 x 10^-3) / (500 x 10^-9) = 5800 K', S`T=\frac{2.90\times10^{-3}}{500\times10^{-9}}=5800\,\mathrm{K}`);
  formula('Luminosity is proportional to radius squared x temperature to the fourth power', S`L\propto R^2T^4`);
  formula('Luminosity ratio = 2 squared x 1.5 to the fourth power = 20.25', S`\frac{L}{L_\odot}=2^2\times1.5^4=20.25`);
  formula('D = (1.22 x 550 x 10^-9) / (2.0 x 10^-6) = 0.336 m', S`D=\frac{1.22\times550\times10^{-9}}{2.0\times10^{-6}}=0.336\,\mathrm{m}`);
  formula('1540 x 80 x 10^-6 / 2 = 0.0616 m', S`\frac{1540\times80\times10^{-6}}{2}=0.0616\,\mathrm{m}`);
  formula('I / I_0 = exp(-0.15 x 8.0) = 0.301', S`\frac{I}{I_0}=e^{-0.15\times8.0}=0.301`);
  formula('R = ((7.8 - 1.5) / (7.8 + 1.5)) squared', S`R=\left(\frac{7.8-1.5}{7.8+1.5}\right)^2`);
  formula('R = (6.3 / 9.3) squared = 0.459', S`R=\left(\frac{6.3}{9.3}\right)^2=0.459`);
  formula('Torque = 40 x 0.25 = 10 N m', S`\tau=40\times0.25=10\,\mathrm{N\,m}`);
  formula('Energy = 0.5 x 0.80 x 30 squared = 360 J', S`E=\frac12\times0.80\times30^2=360\,\mathrm{J}`);
  formula('Angular deceleration magnitude = torque / I = 6.0 / 1.2 = 5.0 rad s^-2', S`|\alpha|=\frac{\tau}{I}=\frac{6.0}{1.2}=5.0\,\mathrm{rad\,s^{-2}}`);
  formula('Number of revolutions = 250 / (2 pi) = 39.8', S`N=\frac{250}{2\pi}=39.8`);
  formula('Wavelength = (6.63 x 10^-34) / (3.0 x 10^-24) = 2.21 x 10^-10 m', S`\lambda=\frac{6.63\times10^{-34}}{3.0\times10^{-24}}=2.21\times10^{-10}\,\mathrm{m}`);
  formula('Laboratory lifetime = Lorentz factor x proper lifetime', S`t=\gamma t_0`);
  formula('Lifetime = 1.667 x 2.2 = 3.67 microseconds', S`t=1.667\times2.2=3.67\,\mu\mathrm{s}`);
  formula('p = square root of (2 x 9.11 x 10^-31 x 1.60 x 10^-19 x 2500) = 2.70 x 10^-23 kg m s^-1', S`p=\sqrt{2\times9.11\times10^{-31}\times1.60\times10^{-19}\times2500}=2.70\times10^{-23}\,\mathrm{kg\,m\,s^{-1}}`);
  formula('-47 / 10 = -4.7', S`-\frac{47}{10}=-4.7`);
  formula('Output = -4.7 x 0.20 = -0.94 V', S`V_{\mathrm{out}}=-4.7\times0.20=-0.94\,\mathrm{V}`);
  formula('0.10 / 20000 = 5 microamps', S`\frac{0.10}{20000}=5\,\mu\mathrm{A}`);
  formula('0.20 / 50000 = 4 microamps', S`\frac{0.20}{50000}=4\,\mu\mathrm{A}`);
  formula('V_out = -100000 x 9 x 10^-6 = -0.90 V', S`V_{\mathrm{out}}=-100000\times9\times10^{-6}=-0.90\,\mathrm{V}`);
  formula('T = 28.4 / 20 = 1.42 s', S`T=\frac{28.4}{20}=1.42\,\mathrm{s}`);
  formula('Range = largest reading - smallest reading', S`\text{range}=x_{\max}-x_{\min}`);
  formula('Stiffness = gradient of force against extension', S`k=\frac{\Delta F}{\Delta x}`);
  formula('average force = momentum change / time', S`F_{\mathrm{avg}}=\frac{\Delta p}{\Delta t}`);
  formula('terminal voltage = emf - Ir', S`V=\mathcal{E}-Ir`);
  formula('I = V_resistor/R', S`I=\frac{V_R}{R}`);
  formula('torque = I alpha', S`\tau=I\alpha`);
  formula('alpha = torque/I', S`\alpha=\frac{\tau}{I}`);
  formula('qE = qvB', S`qE=qvB`);
  formula('peak wavelength x temperature = constant', S`\lambda_{\max}T=b`);
  formula('Wavelength = h/p', S`\lambda=\frac{h}{p}`);
  formula('W = integral p dV', S`W=\int p\,\mathrm{d}V`);
  formula('c = E/(m delta T)', S`c=\frac{E}{m\Delta T}`);
  formula('Input energy = power x time', S`E_{\mathrm{in}}=Pt`);
  formula('Energy gained by water = 0.75 x input energy', S`Q=0.75E_{\mathrm{in}}`);
  formula('Output voltage = decimal input code x voltage per count', S`V_{\mathrm{out}}=N\Delta V`);
  formula('Mean spacing = measured distance / 10', S`w=\frac{D}{10}`);
  formula('Induced emf magnitude = change in flux linkage / time', S`|\mathcal{E}|=\left|\frac{\Delta(N\Phi)}{\Delta t}\right|`);
  formula('Flux linkage change = number of turns x flux change per turn', S`\Delta(N\Phi)=N\Delta\Phi`);
  formula('Wavelength shift = observed wavelength - rest wavelength', S`\Delta\lambda=\lambda_{\mathrm{obs}}-\lambda_0`);
  formula('Laboratory interval = gamma x proper interval', S`\Delta t=\gamma\Delta t_0`);
  formula('Moving length = proper length / gamma', S`L=\frac{L_0}{\gamma}`);
  formula('Increase in internal energy = heat supplied - work done by the gas', S`\Delta U=Q-W`);
  formula('Here square root of (0.20 squared - 0.12 squared) = 0.16 m', S`\sqrt{0.20^2-0.12^2}=0.16\,\mathrm{m}`);
  formula('Percentage uncertainty = 2 + 2(3) = 8%', S`\frac{\Delta E_k}{E_k}\times100\%=2+2(3)=8\%`);
  formula('Absolute uncertainty = 0.08 x energy', S`\Delta E_k=0.08E_k`);
  formula('photon energy total = 2 x 511 keV + total kinetic energy', S`E_{\gamma,\mathrm{total}}=2\times511\,\mathrm{keV}+E_{k,\mathrm{total}}`);
  formula('4 pi squared / g', S`\frac{4\pi^2}{g}`);
  formula('4 pi squared/g', S`\frac{4\pi^2}{g}`);
  formula('L/(4 pi d squared)', S`\frac{L}{4\pi d^2}`);
  formula('4 pi d squared', S`4\pi d^2`);
  formula('I omega squared/2', S`\frac12I\omega^2`);
  formula('I squared R/4', S`\frac{I^2R}{4}`);
  formula('I squared R', S`I^2R`);
  formula('CV squared/2', S`\frac12CV^2`);
  formula('(gamma - 1)mc squared', S`(\gamma-1)mc^2`);
  formula('(1+epsilon) squared', S`(1+\varepsilon)^2`);
  formula('r(1+epsilon)', S`r(1+\varepsilon)`);
  formula('epsilon squared', S`\varepsilon^2`);
  formula('2 epsilon', S`2\varepsilon`);
  formula('1/square root of N', S`\frac{1}{\sqrt{N}}`);
  formula('1/square root of 2', S`\frac{1}{\sqrt{2}}`);
  formula('square root of N', S`\sqrt{N}`);
  formula('1 / distance squared', S`\frac{1}{r^2}`);
  formula('GM/r squared', S`\frac{GM}{r^2}`);
  formula('MeV/c squared', S`\mathrm{MeV}/c^2`);
  formula('mr squared', S`mr^2`);
  formula('I omega', S`I\omega`);
  formula('sin(theta)', S`\sin\theta`);
  formula('T squared', S`T^2`);
  formula('T-squared', S`T^2`);
  formula('r squared', S`r^2`);
  formula('R cubed', S`R^3`);
  formula('c squared', S`c^2`);
  formula('2 cubed', S`2^3`);
  formula('2 pi', S`2\pi`);
  formula('d / wavelength', S`\frac{d}{\lambda}`);
  formula('3kT/2', S`\frac32kT`);
  formula('h/p', S`\frac{h}{p}`);
  formula('CV squared', S`CV^2`);
  formula('I/2', S`\frac{I}{2}`);
  formula('V_supply R_thermistor/(R_fixed + R_thermistor)', S`\frac{V_{\mathrm{supply}}R_{\mathrm{thermistor}}}{R_{\mathrm{fixed}}+R_{\mathrm{thermistor}}}`);
  formula('1 - T_cold/T_hot', S`1-\frac{T_c}{T_h}`);
  formula('E/B', S`\frac{E}{B}`);

  // Exact Unicode notation used by the GCSE bank. Do not guess algebra from prose.
  [
    ['Eₖ = ½mv²',S`E_k=\frac12mv^2`],['ΔEₚ = mgΔh',S`\Delta E_p=mg\Delta h`],
    ['Eₑ = ½ke²',S`E_e=\frac12ke^2`],['ΔE = mcΔθ',S`\Delta E=mc\Delta\theta`],
    ['P = E/t = W/t',S`P=\frac{E}{t}=\frac{W}{t}`],
    ['efficiency = useful energy output / total energy input',S`\text{efficiency}=\frac{\text{useful energy output}}{\text{total energy input}}`],
    ['efficiency = useful power output / total power input',S`\text{efficiency}=\frac{\text{useful power output}}{\text{total power input}}`],
    ['Rtotal = R₁ + R₂ + …',S`R_{\mathrm{total}}=R_1+R_2+\cdots`],
    ['Itotal = I₁ + I₂ + …',S`I_{\mathrm{total}}=I_1+I_2+\cdots`],
    ['P = I²R',S`P=I^2R`],['E = Pt',S`E=Pt`],['E = VIt',S`E=VIt`],
    ['ρ = m/V',S`\rho=\frac{m}{V}`],['E = mL',S`E=mL`],
    ['pV = constant',S`pV=\text{constant}`],['p₁V₁ = p₂V₂',S`p_1V_1=p_2V_2`],
    ['remaining fraction = (½)ⁿ',S`\text{remaining fraction}=\left(\frac12\right)^n`],
    ['n = elapsed time / half-life',S`n=\frac{\text{elapsed time}}{\text{half-life}}`],
    ['W = Fs',S`W=Fs`],['F = ke',S`F=ke`],['M = Fd',S`M=Fd`],
    ['p = F/A',S`p=\frac{F}{A}`],['p = hρg',S`p=h\rho g`],
    ['speed = distance/time',S`\text{speed}=\frac{\text{distance}}{\text{time}}`],
    ['a = (v − u)/t',S`a=\frac{v-u}{t}`],['v² − u² = 2as',S`v^2-u^2=2as`],
    ['m = F/a',S`m=\frac{F}{a}`],
    ['thinking distance = speed × reaction time',S`\text{thinking distance}=\text{speed}\times\text{reaction time}`],
    ['F = Δp/Δt = mΔv/Δt',S`F=\frac{\Delta p}{\Delta t}=\frac{m\Delta v}{\Delta t}`],
    ['v = fλ',S`v=f\lambda`],['T = 1/f',S`T=\frac{1}{f}`],
    ['distance to reflector = wave speed × echo time / 2',S`\text{distance to reflector}=\frac{\text{wave speed}\times\text{echo time}}{2}`],
    ['magnification = image height / object height',S`\text{magnification}=\frac{\text{image height}}{\text{object height}}`],
    ['F = BIl',S`F=BIl`],['Vₚ/Vₛ = Nₚ/Nₛ',S`\frac{V_p}{V_s}=\frac{N_p}{N_s}`],
    ['VₚIₚ = VₛIₛ',S`V_pI_p=V_sI_s`],['c = E/(mΔθ)',S`c=\frac{E}{m\Delta\theta}`],
    ['1 cm³ = 10⁻⁶ m³',S`1\,\mathrm{cm^3}=10^{-6}\,\mathrm{m^3}`],
    ['1 g/cm³ = 1000 kg/m³',S`1\,\mathrm{g\,cm^{-3}}=1000\,\mathrm{kg\,m^{-3}}`],
    ['Eₚ = mgh',S`E_p=mgh`],['P = E / t',S`P=\frac Et`],
    ['Efficiency = useful output / total input × 100%',S`\text{efficiency}=\frac{\text{useful output}}{\text{total input}}\times100\%`],
    ['R = V / I',S`R=\frac VI`],['Rtotal = R₁ + R₂',S`R_{\mathrm{total}}=R_1+R_2`],
    ['ρ = m / V',S`\rho=\frac mV`],['m = ρV',S`m=\rho V`],
    ['Displaced volume = final reading − initial reading',S`V_{\mathrm{displaced}}=V_{\mathrm{final}}-V_{\mathrm{initial}}`],
    ['c = E / (mΔθ)',S`c=\frac E{m\Delta\theta}`],
    ['Neutrons = mass number − atomic number',S`N=A-Z`],['Protons = mass number − neutron number',S`Z=A-N`],
    ['For a neutral atom, electrons = protons',S`N_{\mathrm{electrons}}=N_{\mathrm{protons}}\quad\text{(neutral atom)}`],
    ['Activity after n half-lives = initial activity / 2ⁿ',S`A_n=\frac{A_0}{2^n}`],
    ['a = (v − u) / t',S`a=\frac{v-u}t`],['Moment = force × perpendicular distance',S`M=Fd_\perp`],
    ['f = v / λ',S`f=\frac v\lambda`],['T = 1 / f',S`T=\frac1f`],
    ['f = number of oscillations / time',S`f=\frac{\text{number of oscillations}}{\text{time}}`],
    ['Magnification = image height / object height',S`\text{magnification}=\frac{\text{image height}}{\text{object height}}`],
    ['Distance = wave speed × echo time / 2',S`d=\frac{vt_{\mathrm{echo}}}2`],
    ['I = F / (Bl)',S`I=\frac F{Bl}`],['Vₛ / Vₚ = Nₛ / Nₚ',S`\frac{V_s}{V_p}=\frac{N_s}{N_p}`],
    ['B = F / (Il)',S`B=\frac F{Il}`],['B = F/(Il)',S`B=\frac F{Il}`],
    ['Distance = speed × time',S`d=vt`],
    ['Increase = observed wavelength − reference wavelength',S`\Delta\lambda=\lambda_{\mathrm{observed}}-\lambda_{\mathrm{reference}}`],
    ['Useful power = efficiency × input power',S`P_{\mathrm{useful}}=\eta P_{\mathrm{input}}`],
    ['L = E / m',S`L=\frac Em`],['Density = mass / volume',S`\rho=\frac mV`],
    ['Source count rate = measured rate − background rate',S`C_{\mathrm{source}}=C_{\mathrm{measured}}-C_{\mathrm{background}}`],
    ['Remaining fraction = (1/2)^number of half-lives',S`\text{remaining fraction}=\left(\frac12\right)^n`],
    ['Speed = distance / time',S`v=\frac dt`],['Stopping distance = thinking distance + braking distance',S`d_{\mathrm{stopping}}=d_{\mathrm{thinking}}+d_{\mathrm{braking}}`],
    ['Wavelength = wave speed / frequency',S`\lambda=\frac vf`],['Time = distance / speed',S`t=\frac dv`],
    ['l = F / (BI)',S`l=\frac F{BI}`],['Input power = output power = VI',S`P_{\mathrm{in}}=P_{\mathrm{out}}=VI`],
    ['Power = change in energy / change in time',S`P=\frac{\Delta E}{\Delta t}`],['Resistance = V / I',S`R=\frac VI`],
    ['frequency = 1 / period',S`f=\frac1T`],['P = mgh/t',S`P=\frac{mgh}t`],
    ['Temperature rise = E/(mc)',S`\Delta T=\frac E{mc}`],['Input energy = mgh / efficiency',S`E_{\mathrm{in}}=\frac{mgh}\eta`],
    ['t = mcΔθ / useful power',S`t=\frac{mc\Delta\theta}{P_{\mathrm{useful}}}`],
    ['Total current = sum of branch currents',S`I_{\mathrm{total}}=\sum I_{\mathrm{branch}}`],
    ['Supply voltage = sum of component voltages',S`V_{\mathrm{supply}}=\sum V_{\mathrm{component}}`],
    ['E = (V²/R)t',S`E=\frac{V^2}R t`],['Q = E/V = Pt/V',S`Q=\frac EV=\frac{Pt}V`],
    ['ρ = (filled mass − empty mass)/volume',S`\rho=\frac{m_{\mathrm{filled}}-m_{\mathrm{empty}}}V`],
    ['V = m/ρ',S`V=\frac m\rho`],['t = mL/P',S`t=\frac{mL}P`],['E = mcΔθ + mL',S`E=mc\Delta\theta+mL`],
    ['Counts = count rate × time',S`N=Ct`],['Electrons = proton number − positive charge number',S`N_{\mathrm{electrons}}=Z-z`],
    ['Time = number of half-lives × half-life',S`t=nT_{1/2}`],['F = W/s',S`F=\frac Ws`],['k = F/e',S`k=\frac Fe`],
    ['Displacement = average velocity × time',S`s=\bar v t`],['Total momentum before = total momentum after',S`\sum p_{\mathrm{before}}=\sum p_{\mathrm{after}}`],
    ['Wavelength = measured distance / number of spacings',S`\lambda=\frac{\text{measured distance}}{\text{number of spacings}}`],
    ['Distance to reflector = vt/2',S`d=\frac{vt}2`],['F is proportional to I for fixed B and l',S`F\propto I\quad\text{(fixed }B,l\text{)}`],
    ['Vs = Vp Ns/Np; Is = Vs/R',S`V_s=V_p\frac{N_s}{N_p},\qquad I_s=\frac{V_s}R`],['VpIp = VsIs',S`V_pI_p=V_sI_s`],
    ['Reference = observed wavelength − wavelength increase',S`\lambda_{\mathrm{reference}}=\lambda_{\mathrm{observed}}-\Delta\lambda`],
    ['Average speed = distance / period',S`\bar v=\frac dT`],['Observed wavelength = reference + shift',S`\lambda_{\mathrm{observed}}=\lambda_{\mathrm{reference}}+\Delta\lambda`]
  ].forEach(([plain,tex])=>formula(plain,tex));

  const units = {
    'ohm':S`\Omega`,'kilo-ohm':S`\mathrm{k}\Omega`,'microfarad':S`\mu\mathrm{F}`,'microseconds':S`\mu\mathrm{s}`,
    'degrees':S`{}^\circ`,'%':S`\%`,'counts':S`\mathrm{counts}`,
    'times':S`\text{times}`,'times solar':S`\text{times solar}`,'fraction':S`\text{fraction}`,'order':S`\text{order}`,
    'neutrons':S`\text{neutrons}`,'decimal':S`\text{decimal}`,'revolutions':S`\text{revolutions}`,'hours':S`\mathrm{h}`,'years':S`\mathrm{yr}`,'dioptres':S`\mathrm{D}`
  };
  const unitSymbols = ['kg','cm','mm','nm','km','mol','MeV','keV','eV','MW','MHz','kV','Wb','Hz','Bq','Pa','Mpc','pc','rad','min','m','s','N','J','C','V','A','W','K','T','u','F','dB'];
  Object.assign(units,{'Ω':S`\Omega`,'kΩ':S`\mathrm{k}\Omega`,'μF':S`\mu\mathrm{F}`,'μs':S`\mu\mathrm{s}`,'°C':S`{}^\circ\mathrm{C}`,'m/s':S`\mathrm{m\,s^{-1}}`,'m/s²':S`\mathrm{m\,s^{-2}}`,'kg/m³':S`\mathrm{kg\,m^{-3}}`,'g/cm³':S`\mathrm{g\,cm^{-3}}`,'N/kg':S`\mathrm{N\,kg^{-1}}`,'N/m':S`\mathrm{N\,m^{-1}}`,'J/kg':S`\mathrm{J\,kg^{-1}}`,'J/kg °C':S`\mathrm{J\,kg^{-1}\,{}^\circ C^{-1}}`});
  unitSymbols.push('g','kPa','mN','mT','kHz','μm');
  for (const symbol of unitSymbols) units[symbol]=S`\mathrm{${symbol}}`;
  for(const symbol of ['m','s','kg','cm','mm','Hz','N','A','V','Ω','K'])for(const [power,tex] of [['²','2'],['³','3'],['⁻¹','-1'],['⁻²','-2'],['⁻³','-3'],['⁻⁴','-4']])units[symbol+power]=`${units[symbol]}^{${tex}}`;
  const escapePattern = text => text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const unitAtom = S`(?:${Object.keys(units).filter(key=>!key.includes(' ')).sort((a,b)=>b.length-a.length).map(escapePattern).join('|')})(?:\^-?\d+| squared| cubed)?`;
  const unitPattern = new RegExp(`^(?:${unitAtom})(?: ${unitAtom})*$`);
  const poweredUnitPattern = new RegExp(S`(?<![\w])(?:${unitAtom})(?: ${unitAtom})*(?![\w])`,'g');
  function unitTex(unit) {
    if(units[unit]) return units[unit];
    if(!unitPattern.test(unit)) return S`\text{${unit.replace(/[{}\\]/g,'')}}`;
    return unit.replace(/ squared/g,'^2').replace(/ cubed/g,'^3').split(' ').map(part=>{
      const [symbol,power]=part.split('^');
      return units[symbol]+(power ? `^{${power}}` : '');
    }).join(S`\,`);
  }
  const numberPattern = '[+−-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?: [x*×] 10(?:\\^[+-]?\\d+|[⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+)|e[+-]?\\d+)?';
  const quantityPattern = new RegExp(`(?<![\\w.^+-])(${numberPattern}) (${unitAtom}(?: ${unitAtom})*)(?![\\w^])|(?<![\\w.^+-])(${numberPattern})(?![\\w])`,'g');
  const assignmentPattern = new RegExp(S`(?<![\w])((?:Δ?[a-zA-ZμρλθτεσΦω](?:_[a-zA-Z0-9]+|[₀₁₂₃₄₅₆₇₈₉ₖₚₑₛᵥ]+)?)) = (${numberPattern})(?: (${unitAtom}(?: ${unitAtom})*))?(?![\w^])`,'g');
  const symbolTex=symbol=>symbol.replace(/Δ/g,S`\Delta `).replace(/[μρλθτεσΦω]/g,c=>({μ:S`\mu`,ρ:S`\rho`,λ:S`\lambda`,θ:S`\theta`,τ:S`\tau`,ε:S`\varepsilon`,σ:S`\sigma`,Φ:S`\Phi`,ω:S`\omega`}[c])).replace(/[₀₁₂₃₄₅₆₇₈₉ₖₚₑₛᵥ]+/g,s=>'_{'+[...s].map(c=>'0123456789kpesv'['₀₁₂₃₄₅₆₇₈₉ₖₚₑₛᵥ'.indexOf(c)]).join('')+'}').replace(/_([a-zA-Z0-9]+)/g,'_{$1}');
  const scientificPattern=new RegExp(S`(?<![\w])([+−-]?(?:\d+(?:\.\d+)?|\.\d+)(?: [x*×] 10(?:\^[+-]?\d+|[⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+)|e[+-]?\d+))(?: (${unitAtom}(?: ${unitAtom})*))?(?![\w])`,'g');
  // Arithmetic-only working may be typeset safely without inferring symbolic
  // expressions from English. Thousands groups are retained as thin spaces.
  const arithmeticNumber=S`(?:\(?[+−-]?(?:\d{1,3}(?: \d{3})+|\d+)(?:\.\d+)?[²³]?\)?|½)`;
  const arithmeticPattern=new RegExp(S`(?<![\w])(${arithmeticNumber}(?:\s*[×÷+−*/=≈]\s*${arithmeticNumber})+)(?: (${unitAtom}(?: ${unitAtom})*))?(?![\w])`,'g');
  const arithmeticTex=value=>value.replace(/(\d) (?=\d{3}(?:\D|$))/g,'$1\\,').replace(/×/g,S`\times `).replace(/÷/g,S`\div `).replace(/−/g,'-').replace(/≈/g,S`\approx `).replace(/½/g,S`\tfrac12 `).replace(/²/g,'^{2}').replace(/³/g,'^{3}');
  function numberTex(value) {return value.replace(/−/g,'-').replace(/ [x*×] 10([⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g,(_,power)=>S`\times10^{${[...power].map(c=>'⁻⁺⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(c)).map(i=>'-+0123456789'[i]).join('')}}`).replace(/ [x*×] 10\^([+-]?\d+)/g,S`\times10^{$1}`).replace(/e([+-]?\d+)/gi,S`\times10^{$1}`);}
  const lookup = new Map(entries);
  const formulaPattern = new RegExp(`(?<![A-Za-z])(?:${[...lookup.keys()].sort((a,b)=>b.length-a.length).map(escapePattern).join('|')})(?![A-Za-z])`,'g');
  const html = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cache = new Map();
  function renderTex(tex, displayMode=false) {
    if(!window.katex) return html(`\\(${tex}\\)`);
    return katex.renderToString(tex,{displayMode,throwOnError:true,trust:false,strict:'error',output:'htmlAndMathml'});
  }
  function format(text,displayEquations=false) {
    text=String(text);
    const key=String(displayEquations)+':'+text;
    if(cache.has(key))return cache.get(key);
    const chunks=[];
    const stash=(tex,display=false)=>{
      const relation=/[=]|\\(?:approx|propto)/.test(tex);
      chunks.push(renderTex(tex,display||(displayEquations&&relation)));
      return `\uE000${chunks.length-1}\uE001`;
    };
    // Protect authored LaTeX before applying exact legacy-notation replacements.
    let marked=text.replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g,(_,inline,display)=>stash(inline??display,display!==undefined));
    marked=marked.replace(formulaPattern,plain=>stash(lookup.get(plain)));
    marked=marked.replace(assignmentPattern,(_,symbol,value,unit)=>stash(symbolTex(symbol)+'='+numberTex(value)+(unit?S`\,${unitTex(unit)}`:'')));
    marked=marked.replace(scientificPattern,(_,value,unit)=>stash(numberTex(value)+(unit?S`\,${unitTex(unit)}`:'')));
    marked=marked.replace(arithmeticPattern,(_,value,unit)=>stash(arithmeticTex(value)+(unit?S`\,${unitTex(unit)}`:'')));
    const result=marked.split(/(\uE000\d+\uE001)/).map(part=>{
      if(part.startsWith('\uE000'))return chunks[Number(part.slice(1,-1))];
      const tokens=[];
      const protect=tex=>{tokens.push(renderTex(tex));return `\uE002${tokens.length-1}\uE003`;};
      part=part.replace(quantityPattern,(_,value,unit,number)=>protect(numberTex(value??number)+(unit?S`\,${unitTex(unit)}`:'')));
      part=part.replace(poweredUnitPattern,unit=>/\^| squared| cubed/.test(unit)?protect(unitTex(unit)):unit);
      return part.split(/(\uE002\d+\uE003)/).map(item=>item.startsWith('\uE002')?tokens[Number(item.slice(1,-1))]:html(item)).join('');
    }).join('');
    cache.set(key,result);
    return result;
  }
  function prose(text) {
    text=String(text);
    // A list of key equations belongs together, with one equation per row.
    // Keep incidental variables and conditions inline within complete sentences.
    text=text.replace(/\\\(((?:(?!\\\))[\s\S])*?)\\\)((?:\s*(?:,\s*(?:and\s+)?|;\s*|and\s+)\\\((?:(?!\\\))[\s\S])*?\\\))+)([.;])?/g,(whole,first,rest,punctuation)=>{
      const equations=[first,...[...rest.matchAll(/\\\(([\s\S]*?)\\\)/g)].map(m=>m[1])];
      if(!equations.every(tex=>/[=]|\\(?:approx|propto)/.test(tex)))return whole;
      return S`\[\begin{gathered}${equations.join(S`\\[6pt]`)}${punctuation||''}\end{gathered}\]`;
    });
    text=text.replace(/^\\\(([\s\S]*?)\\\)([.;])?/, (whole,tex,punctuation)=>/[=]|\\(?:approx|propto)/.test(tex)?S`\[${tex}${punctuation||''}\]`:whole);
    return format(text);
  }
  return {format,prose,equation:text=>format(text,true),unit:unit=>renderTex(unitTex(unit)),unitTex,renderTex};
})();
