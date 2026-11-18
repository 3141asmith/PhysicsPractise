/* Original teaching material; explicit LaTeX is rendered locally with KaTeX. */
window.requiredPracticals = [
  {
    "id": 1,
    "title": "Stationary waves on a string",
    "topic": "Waves",
    "theory": [
      "Two waves of the same frequency travelling in opposite directions superpose. Reflections at fixed ends produce nodes (zero displacement) and antinodes (maximum amplitude). Adjacent nodes are half a wavelength apart. Resonance occurs when the driving frequency matches a natural frequency of the vibrating length.",
      "For \\(n\\) loops in vibrating length \\(L\\), wavelength and wave speed are\n \\[\\lambda=\\frac{2L}{n},\\qquad v=\\sqrt{\\frac F\\mu}.\\]\n Here \\(F\\) is tension in newtons and \\(\\mu\\) is mass per unit length in \\(\\mathrm{kg\\,m^{-1}}\\). Combining these gives\n \\[f=\\frac{n}{2L}\\sqrt{\\frac F\\mu}.\\]\n For the fundamental, \\(n=1\\). Changing one quantity while holding the others fixed predicts\n \\[f\\propto\\frac1L,\\qquad f\\propto\\sqrt F,\\qquad f\\propto\\frac1{\\sqrt\\mu}.\\]\n The hanging mass gives \\(F\\approx mg\\) when pulley friction is negligible."
    ],
    "apparatus": "Signal generator, vibration generator, strings, pulley, clamp stands, metre rule, balance, mass hanger and slotted masses.",
    "method": [
      "Measure a long sample of each string and weigh it; divide mass by length to find \\(\\mu\\). Clamp the driver and pulley securely, with a tray below the hanging masses.",
      "Pass the string from the driver over the pulley. Measure the vibrating length between the effective nodes, not the total string length. Add a known hanging mass, including the hanger.",
      "Start at low amplitude. Adjust frequency slowly until one clear loop is formed; identify the fundamental rather than a higher harmonic. Read f from the generator.",
      "Keep F and \\(\\mu\\) fixed. Repeat at at least six lengths, retuning to the fundamental each time. Approach each resonance from above and below to estimate its frequency range.",
      "Keep L and \\(\\mu\\) fixed; vary hanging mass and repeat. Then keep L and F fixed and compare strings with measured \\(\\mu\\). Record repeated resonance frequencies and means.",
      "Plot f against \\(\\frac1L\\), \\(f^2\\) against F, and \\(f^2\\) against \\(\\frac1\\mu\\) for the three investigations. Check straightness and intercepts before claiming proportionality."
    ],
    "controls": "Change only one of L, F and μ at a time; keep the harmonic number and small driving amplitude constant.",
    "safety": "Secure clamps, keep feet clear of falling masses and use a catching tray. Avoid excessive tension.",
    "tables": [
      {
        "caption": "Fundamental resonance; F = 1.96 N, \\(\\mu\\) = 0.00050 kg m⁻¹",
        "headers": [
          "L / m",
          "f₁ / Hz",
          "f₂ / Hz",
          "Mean f / Hz"
        ],
        "rows": [
          [
            0.4,
            78,
            78.4,
            78.2
          ],
          [
            0.5,
            62.5,
            62.7,
            62.6
          ],
          [
            0.6,
            52,
            52.4,
            52.2
          ],
          [
            0.7,
            44.6,
            44.8,
            44.7
          ],
          [
            0.8,
            39,
            39.2,
            39.1
          ]
        ]
      },
      {
        "caption": "Further series at L = 0.50 m",
        "headers": [
          "F / N (\\(\\mu\\) fixed)",
          "f / Hz",
          "\\(\\mu\\) / kg m⁻¹ (F = 1.96 N)",
          "f / Hz"
        ],
        "rows": [
          [
            0.98,
            44.3,
            0.00032,
            78.3
          ],
          [
            1.47,
            54.2,
            0.0005,
            62.6
          ],
          [
            1.96,
            62.6,
            0.00072,
            52.2
          ],
          [
            2.45,
            70,
            0.00098,
            44.7
          ]
        ]
      }
    ],
    "analysis": "The gradient of the \\(f\\) against \\(1/L\\) graph is approximately \\(31.3\\,\\mathrm{m\\,s^{-1}}\\). For the fundamental, gradient = \\(v/2\\), so\n \\[v=2(31.3)=62.6\\,\\mathrm{m\\,s^{-1}}\\]\n and the mass per unit length is\n \\[\\mu=\\frac{F}{v^2}=\\frac{1.96}{62.6^2}\\approx5.00\\times10^{-4}\\,\\mathrm{kg\\,m^{-1}}.\\]\n For the tension series, \\(f^2/F\\approx2000\\,\\mathrm{Hz^2\\,N^{-1}}\\), consistent with \\(1/(4L^2\\mu)\\).",
    "uncertainty": "A blurred resonance gives a frequency range; use half its width as an estimate of absolute uncertainty. Node positions and pulley friction can cause systematic error. A longer measured string sample reduces percentage uncertainty in \\(\\mu\\). For calculated f, percentage uncertainties add as \\(u(f)\\approx u(L)+\\frac12u(F)+\\frac12u(\\mu)\\).",
    "questions": [
      [
        "A \\(0.60\\,\\mathrm m\\) string has \\(\\mu=5.0\\times10^{-4}\\,\\mathrm{kg\\,m^{-1}}\\) and tension \\(1.96\\,\\mathrm N\\). Calculate its fundamental frequency.",
        3,
        "Wave speed: \\[v=\\sqrt{\\frac{1.96}{0.00050}}=62.6\\,\\mathrm{m\\,s^{-1}}\\quad(1).\\]\n Fundamental wavelength: \\(\\lambda=2L=1.20\\,\\mathrm m\\) (1).\n \\[f=\\frac v\\lambda=52.2\\,\\mathrm{Hz}\\quad(1).\\]"
      ],
      [
        "Describe how to test the dependence of frequency on tension.",
        4,
        "Keep L and \\(\\mu\\) fixed (1); vary measured hanging mass and calculate \\(F=mg\\) (1); retune to the same harmonic and repeat readings (1); plot \\(f^2\\) against F and check for a straight line through the origin within uncertainty (1)."
      ],
      [
        "Explain why finding a resonant frequency is more reliable than measuring the instantaneous wave height.",
        2,
        "Resonance gives a large, recognisable stationary pattern (1); instantaneous displacement changes rapidly and depends on driving amplitude, so it does not directly identify frequency (1)."
      ]
    ]
  },
  {
    "id": 2,
    "title": "Interference: double slit and diffraction grating",
    "topic": "Waves",
    "theory": [
      "Coherent sources have a constant phase difference. At a bright fringe, path difference is an integer number of wavelengths and the waves interfere constructively. At a dark fringe, the path difference is an odd half-wavelength. A laser illuminating two narrow slits supplies coherent light.",
      "For double-slit separation \\(s\\), screen distance \\(D\\), wavelength \\(\\lambda\\) and fringe spacing \\(w\\),\n \\[w\\approx\\frac{\\lambda D}{s}.\\]\n This uses the small-angle approximation with the screen much farther away than the slit separation. A diffraction grating has many equally spaced slits and sharper maxima. For order \\(n\\) at angle \\(\\theta\\) to the central direction,\n \\[d\\sin\\theta=n\\lambda.\\]\n Grating spacing is \\(d=1/N\\), where \\(N\\) is the number of lines per metre. Convert line densities stated per millimetre before using the equation."
    ],
    "apparatus": "School laser, double slit of known separation, grating of known line density, screen, metre rule, stands and beam stop.",
    "method": [
      "Set the laser at a fixed height below eye level with a beam stop behind the screen. Align it normally to the double slit. Measure D from slits to screen.",
      "Mark centres of widely separated bright fringes. Measure across ten fringe spacings and divide by ten; count intervals rather than bright spots. Repeat the measurement.",
      "Use at least five screen distances without changing the slits. Record mean w and plot w against D; gradient = \\(\\lambda\\)/s.",
      "Replace the double slit with the grating, normal to the beam. Record its line density and convert to spacing in metres.",
      "Locate the central maximum and maxima of the same order on both sides. Measure each lateral distance x and the grating–screen distance D. Use \\(\\theta=\\arctan\\!\\left(\\frac{x}{D}\\right)\\).",
      "Average the left and right angles to reduce alignment error. Calculate \\(\\lambda=\\frac{d\\sin\\theta}{n}\\) for several orders where visible, and compare the estimates. Do not use \\(\\frac{x}{D}\\approx\\sin\\theta\\) at large angles."
    ],
    "controls": "Use the same laser throughout; keep the slit separation or grating spacing fixed within each series and maintain normal incidence.",
    "safety": "Use an approved school laser under supervision. Never look into the beam or its specular reflections; remove reflective objects and terminate all beams.",
    "tables": [
      {
        "caption": "Double slit: s = 0.250 mm",
        "headers": [
          "D / m",
          "Ten spacings / mm",
          "w / mm"
        ],
        "rows": [
          [
            1,
            25.2,
            2.52
          ],
          [
            1.2,
            30.4,
            3.04
          ],
          [
            1.4,
            35.4,
            3.54
          ],
          [
            1.6,
            40.5,
            4.05
          ],
          [
            1.8,
            45.6,
            4.56
          ]
        ]
      },
      {
        "caption": "Grating: 300 lines mm⁻¹, D = 1.000 m",
        "headers": [
          "Order n",
          "Mean |x| / m",
          "\\(\\theta\\) / degrees"
        ],
        "rows": [
          [
            1,
            0.193,
            10.9
          ],
          [
            2,
            0.411,
            22.3
          ],
          [
            3,
            0.693,
            34.7
          ]
        ]
      }
    ],
    "analysis": "The double-slit gradient is approximately \\(0.00253\\). Therefore\n \\[\\lambda=s\\times\\text{gradient}=(0.250\\times10^{-3})(0.00253)\\approx6.33\\times10^{-7}\\,\\mathrm m.\\]\n For the grating, convert the line density to reciprocal metres:\n \\[d=\\frac{1}{300\\times1000}=3.33\\times10^{-6}\\,\\mathrm m.\\]\n First order then gives \\(\\lambda=d\\sin(10.9^\\circ)\\approx6.30\\times10^{-7}\\,\\mathrm m\\). Using unrounded positions gives about \\(632\\,\\mathrm{nm}\\).",
    "uncertainty": "Measuring ten intervals reduces the percentage ruler uncertainty. Fringe width and a dim pattern make centre positions uncertain. Non-normal incidence gives unequal left/right angles. Use repeated positions, a larger D where practical and worst acceptable gradient lines; do not force a zero intercept without checking.",
    "questions": [
      [
        "A grating has 300 lines mm⁻¹ and its second-order maximum is at 22.3°. Calculate \\(\\lambda\\).",
        3,
        "Convert line density: \\(d=3.33\\times10^{-6}\\,\\mathrm m\\) (1).\n \\[\\lambda=\\frac{d\\sin\\theta}{2}\\quad(1)\\]\n \\[\\lambda=6.32\\times10^{-7}\\,\\mathrm m\\quad(1),\\]\n allowing rounding."
      ],
      [
        "Explain how measuring across ten fringe spacings improves the result.",
        2,
        "The absolute endpoint uncertainty stays approximately the same (1); the total measured length is larger, so percentage uncertainty is smaller (1)."
      ],
      [
        "Explain why the grating relation should be used instead of \\(w=\\frac{\\lambda D}{s}\\) for large diffraction angles.",
        2,
        "The fringe-spacing equation uses a small-angle approximation (1); sin \\(\\theta\\) and tan \\(\\theta\\) differ significantly at large angles, whereas \\(d\\sin\\theta=n\\lambda\\) retains the correct geometry (1)."
      ]
    ]
  },
  {
    "id": 3,
    "title": "Free fall: measuring g",
    "topic": "Mechanics",
    "theory": [
      "For constant acceleration, the distance travelled in time \\(t\\) is\n \\[h=ut+\\frac12gt^2.\\]\n A ball released from rest has \\(u=0\\), giving\n \\[h=\\frac12gt^2.\\]\n A plot of \\(h\\) against \\(t^2\\) should be straight with gradient \\(g/2\\). Using many measurements determines the acceleration more reliably than relying on one drop.",
      "The model assumes negligible air resistance. Timing must start at release and stop at a consistently defined impact. An electromagnet and electronic trapdoor timer reduce reaction-time error; magnetic release delay, residual magnetism or an incorrect height reference can still bias the result."
    ],
    "apparatus": "Electromagnetic release, steel ball, electronic timer, trapdoor/contact plate, metre rule, set square, clamp stand and catching tray.",
    "method": [
      "Secure the electromagnet above the detector and place a tray around the landing area. Position a vertical ruler alongside the fall.",
      "Define h as the distance travelled by the bottom of the ball from release to first contact with the detector. Use a set square to transfer the heights to the ruler.",
      "Connect the timer so release starts it and impact stops it. Test the switching operation before collecting readings.",
      "Set at least six heights over the available safe range. Release without a push and record the electronic fall time.",
      "Repeat at least three times per height. Investigate inconsistent releases; record all valid readings, calculate mean t, then calculate \\(t^2\\).",
      "Plot h against \\(t^2\\), draw a best-fit line and find its gradient using a large triangle. Calculate \\(g=2\\times\\text{gradient}\\); inspect the intercept for a height offset."
    ],
    "controls": "Use the same ball, detector and release system. Keep the fall vertical and the height reference unchanged.",
    "safety": "Secure the stand and catch the ball; keep hands and feet away from the impact region.",
    "tables": [
      {
        "caption": "Example repeated electronic timings",
        "headers": [
          "h / m",
          "t₁ / s",
          "t₂ / s",
          "t₃ / s",
          "Mean t / s",
          "\\(t^2\\) / s²"
        ],
        "rows": [
          [
            0.2,
            0.201,
            0.203,
            0.202,
            0.202,
            0.0408
          ],
          [
            0.4,
            0.285,
            0.286,
            0.287,
            0.286,
            0.0818
          ],
          [
            0.6,
            0.349,
            0.35,
            0.351,
            0.35,
            0.1225
          ],
          [
            0.8,
            0.403,
            0.404,
            0.405,
            0.404,
            0.1632
          ],
          [
            1,
            0.451,
            0.452,
            0.453,
            0.452,
            0.2043
          ]
        ]
      }
    ],
    "analysis": "Using the endpoints only to illustrate the gradient calculation:\n \\[\\text{gradient}=\\frac{1.00-0.20}{0.2043-0.0408}=4.89\\,\\mathrm{m\\,s^{-2}}\\]\n \\[g=2\\times\\text{gradient}\\approx9.79\\,\\mathrm{m\\,s^{-2}}.\\]\n In an experiment, use a best-fit line and unrounded mean times rather than treating endpoints as the best fit.",
    "uncertainty": "If \\(h=(0.200\\pm0.002)\\,\\mathrm m\\) and \\(t=(0.202\\pm0.001)\\,\\mathrm s\\), the approximate percentage uncertainty in \\(g=2h/t^2\\) is\n\\[\\frac{\\Delta g}g\\times100\\%\\approx1.0\\%+2(0.50\\%)=2.0\\%.\\]\nLonger drops reduce relative timing uncertainty, but air resistance can become more significant. Repeats reduce random scatter, not a release delay.",
    "questions": [
      [
        "A graph of h against \\(t^2\\) has gradient 4.87 m s⁻². Determine g.",
        2,
        "\\[g=2\\times\\text{gradient}\\quad(1)\\]\n \\[g=2(4.87)=9.74\\,\\mathrm{m\\,s^{-2}}\\quad(1).\\]"
      ],
      [
        "Explain why a hand-operated stopwatch is unsuitable for a 0.20 m fall.",
        2,
        "The fall lasts only about 0.20 s (1); human reaction time is comparable with this, producing a very large relative uncertainty (1)."
      ],
      [
        "Describe a systematic error and explain why repeating measurements will not remove it.",
        3,
        "Example: height measured from the top rather than the bottom of the ball (1); every height is overestimated by a similar offset (1); repeating the same reference repeats the bias rather than removing it (1)."
      ]
    ]
  },
  {
    "id": 4,
    "title": "Young modulus of a wire",
    "topic": "Materials",
    "theory": [
      "Tensile stress is force divided by cross-sectional area; tensile strain is extension divided by original gauge length:\n \\[\\sigma=\\frac FA,\\qquad\\varepsilon=\\frac{\\Delta L}{L}.\\]\n In the linear elastic region, stress is proportional to strain. Young modulus is\n \\[E=\\frac\\sigma\\varepsilon=\\frac{FL}{A\\Delta L},\\]\n measured in pascals.",
      "For a circular wire, \\(A=\\pi d^2/4\\). Plotting force \\(F\\) against extension \\(\\Delta L\\) gives gradient \\(EA/L\\), so\n \\[E=\\frac{\\text{gradient}\\times L}{A}.\\]\n A long thin wire produces measurable extensions. A small preload removes kinks; added force and extension must both be measured relative to that preloaded state."
    ],
    "apparatus": "Long metal wire, secure support, micrometer, metre rule, mass hanger, slotted masses, extension scale with travelling microscope or displacement gauge, safety screen.",
    "method": [
      "Secure the wire to a rigid support above a tray and apply a small preload to straighten it. Measure the original gauge length L between the clamp and reference marker.",
      "Check micrometer zero. Measure diameter in two perpendicular directions at several positions, avoiding excessive ratchet pressure. Find mean d and calculate A.",
      "Set the extension gauge reading to a reference value under the preload. Record it rather than assuming the instrument reads zero.",
      "Add known masses in small steps, allowing oscillations to settle. Record additional \\(F=\\Delta m\\,g\\) and the change in gauge reading \\(\\Delta L\\) at each step.",
      "Collect at least six load points while remaining below the proportional limit. Unload in steps, recording readings to check recovery and possible permanent extension.",
      "Repeat within the safe elastic range. Plot F against \\(\\Delta L\\) and use the linear-region gradient to calculate E. Exclude a slack initial region with a stated reason."
    ],
    "controls": "Use the same original gauge length and wire; keep temperature stable and allow readings to settle.",
    "safety": "Wear eye protection, use a screen for a potentially snapping wire, clamp securely and catch falling masses. Do not exceed the teacher-set load.",
    "tables": [
      {
        "caption": "L = 2.000 m; mean diameter d = 0.400 mm; changes measured from preload",
        "headers": [
          "Additional F / N",
          "Loading \\(\\Delta L\\) / mm",
          "Unloading \\(\\Delta L\\) / mm"
        ],
        "rows": [
          [
            0,
            0,
            0.01
          ],
          [
            5,
            0.4,
            0.41
          ],
          [
            10,
            0.8,
            0.8
          ],
          [
            15,
            1.2,
            1.21
          ],
          [
            20,
            1.6,
            1.6
          ],
          [
            25,
            2,
            2
          ]
        ]
      }
    ],
    "analysis": "Convert the diameter and extension to metres before substitution:\n \\[A=\\frac{\\pi d^2}{4}=\\frac{\\pi(0.000400)^2}{4}=1.257\\times10^{-7}\\,\\mathrm{m^2}.\\]\n The force–extension gradient is \\(25/0.00200=1.25\\times10^4\\,\\mathrm{N\\,m^{-1}}\\), giving\n \\[E=\\frac{\\text{gradient}\\times L}{A}=\\frac{(1.25\\times10^4)(2.000)}{1.257\\times10^{-7}}=1.99\\times10^{11}\\,\\mathrm{Pa}.\\]",
    "uncertainty": "Diameter is squared, so its percentage uncertainty doubles in area and in Young modulus. For \\(d=(0.400\\pm0.005)\\,\\mathrm{mm}\\), the diameter contributes\n\\[2\\frac{\\Delta d}d\\times100\\%=2\\left(\\frac{0.005}{0.400}\\right)100\\%=2.5\\%.\\]\nEstimate extension uncertainty from both initial and final gauge readings. Support motion and temperature changes can bias extension; a reference wire can compensate for support movement.",
    "questions": [
      [
        "Calculate E for F = 20.0 N, L = 2.00 m, d = 0.400 mm and extension 1.60 mm.",
        4,
        "Cross-sectional area: \\(A=\\pi d^2/4\\) (1), giving \\(A=1.26\\times10^{-7}\\,\\mathrm{m^2}\\) (1).\n \\[E=\\frac{FL}{A\\Delta L}\\quad\\text{with SI units}\\quad(1)\\]\n \\[E=1.99\\times10^{11}\\,\\mathrm{Pa}\\quad(1).\\]"
      ],
      [
        "Why measure diameter at several positions and in two directions?",
        2,
        "To identify variation along the wire or a non-circular cross section (1); averaging representative readings reduces random uncertainty in area (1)."
      ],
      [
        "What would failure to return to the original extension on unloading suggest?",
        2,
        "Permanent deformation or slipping at the clamp (1); investigate before using the data to determine an elastic modulus (1)."
      ]
    ]
  },
  {
    "id": 5,
    "title": "Resistivity of a wire",
    "topic": "Electricity",
    "theory": [
      "For a uniform conductor at fixed temperature, resistance depends on its length and cross-sectional area:\n \\[R=\\frac{\\rho L}{A}.\\]\n Resistivity \\(\\rho\\), in \\(\\Omega\\,\\mathrm m\\), is a material property at a stated temperature. Electrical measurements give \\(R=V/I\\); for circular wire, \\(A=\\pi d^2/4\\).",
      "Plotting resistance \\(R\\) against length \\(L\\) gives gradient \\(\\rho/A\\), hence\n \\[\\rho=\\text{gradient}\\times A.\\]\n A constant contact or lead resistance can produce a positive intercept. High currents heat the wire and change its resistivity, so temperature must be controlled."
    ],
    "apparatus": "Resistance wire on a ruler, micrometer, low-voltage supply, switch, variable resistor, ammeter, voltmeter and sliding contacts.",
    "method": [
      "Check micrometer zero and measure wire diameter in two directions at several points. Calculate mean diameter and cross-sectional area.",
      "Tape the wire straight alongside a metre rule. Connect supply, switch, ammeter, current-limiting resistor and wire in series; connect the voltmeter across the measured wire length.",
      "With power off, set contacts at a measured length L. Read the actual separation of contact points rather than their outer edges.",
      "Close the switch briefly and record V and I. Open the switch between readings to limit heating. Calculate \\(R=\\frac VI\\).",
      "Repeat readings at each of at least six lengths, keeping current small and checking that \\(\\frac VI\\) is stable rather than drifting as the wire warms.",
      "Plot mean R against L. Find the best-fit gradient and multiply by A for \\(\\rho\\). Inspect the intercept to identify a possible fixed resistance or length offset."
    ],
    "controls": "Keep material, diameter and temperature fixed. Use clean, secure contacts and the same meters.",
    "safety": "Use low voltage and current limiting. Wires can become hot; switch off before moving contacts.",
    "tables": [
      {
        "caption": "Diameter 0.300 mm; low-current measurements",
        "headers": [
          "L / m",
          "I / A",
          "V / V",
          "R / Ω"
        ],
        "rows": [
          [
            0.2,
            0.15,
            0.209,
            1.393
          ],
          [
            0.4,
            0.15,
            0.417,
            2.78
          ],
          [
            0.6,
            0.15,
            0.625,
            4.167
          ],
          [
            0.8,
            0.15,
            0.833,
            5.553
          ],
          [
            1,
            0.15,
            1.041,
            6.94
          ]
        ]
      }
    ],
    "analysis": "The resistance–length gradient is\n \\[\\text{gradient}\\approx\\frac{6.940-1.393}{0.80}=6.93\\,\\mathrm{\\Omega\\,m^{-1}}.\\]\n With \\(A=\\pi(0.000300)^2/4=7.07\\times10^{-8}\\,\\mathrm{m^2}\\), the resistivity is\n \\[\\rho=\\text{gradient}\\times A\\approx4.90\\times10^{-7}\\,\\mathrm{\\Omega\\,m}.\\]\n This example represents a resistance alloy; it does not identify a particular commercial wire.",
    "uncertainty": "For \\(\\rho=\\frac{RA}L\\), add percentage uncertainties in R and L and twice that in d. For \\(R=\\frac VI\\), add the percentage uncertainties in V and I. Short lengths have larger relative contact and length errors. Repeats do not correct an unrecognised micrometer zero error.",
    "questions": [
      [
        "A graph has gradient 6.90 Ω m⁻¹ and wire diameter 0.300 mm. Determine resistivity.",
        3,
        "Area: \\(A=7.07\\times10^{-8}\\,\\mathrm{m^2}\\) (1).\n \\[\\rho=\\text{gradient}\\times A\\quad(1)\\]\n \\[\\rho=4.88\\times10^{-7}\\,\\mathrm{\\Omega\\,m}\\quad(1).\\]"
      ],
      [
        "Explain why the switch is opened between readings.",
        2,
        "Current heats the wire (1); temperature change changes resistivity, so temperature would not be controlled (1)."
      ],
      [
        "A resistance–length graph has a positive intercept. Suggest a cause and an advantage of using its gradient.",
        2,
        "Fixed lead/contact resistance (1); a constant added resistance shifts all points but does not change the gradient (1)."
      ]
    ]
  },
  {
    "id": 6,
    "title": "EMF and internal resistance",
    "topic": "Electricity",
    "theory": [
      "EMF \\(\\mathcal E\\) is energy supplied by a source per unit charge. Internal resistance \\(r\\) dissipates some energy when current flows. Around the circuit,\n \\[\\mathcal E=IR+Ir.\\]\n The terminal potential difference is therefore\n \\[V=IR=\\mathcal E-Ir.\\]",
      "A graph of \\(V\\) against \\(I\\) has intercept \\(\\mathcal E\\) and gradient \\(-r\\), provided the cell’s EMF and internal resistance remain approximately constant. An open-circuit voltmeter approximates EMF because its high resistance draws very little current. A short circuit is neither necessary nor safe."
    ],
    "apparatus": "Cell, holder, switch, variable load resistor, ammeter, high-resistance voltmeter and leads.",
    "method": [
      "Connect the cell, switch, ammeter and variable load in series. Connect the voltmeter directly across the cell terminals.",
      "Start with maximum load resistance and the switch open. Record an approximate open-circuit terminal voltage.",
      "Close the switch briefly and record V and I together. Open it immediately afterwards.",
      "Reduce the load resistance in stages to obtain at least six well-spaced current values within the cell and resistor ratings. Never reduce it to a short circuit.",
      "Repeat each reading after allowing the cell to rest. Revisit an earlier setting to check whether temperature or discharge has changed the terminal voltage.",
      "Plot V on the vertical axis against I. Draw a best-fit straight line, calculate r from the negative gradient and extrapolate to I = 0 for \\(\\mathcal E\\)."
    ],
    "controls": "Use the same cell, keep temperature stable and minimise discharge by taking brief readings.",
    "safety": "Never short-circuit a cell; use a limiting load and stop if the cell or resistor becomes hot.",
    "tables": [
      {
        "caption": "Terminal pd for one illustrative cell",
        "headers": [
          "I / A",
          "V₁ / V",
          "V₂ / V",
          "Mean V / V"
        ],
        "rows": [
          [
            0.1,
            1.45,
            1.45,
            1.45
          ],
          [
            0.2,
            1.39,
            1.41,
            1.4
          ],
          [
            0.3,
            1.34,
            1.36,
            1.35
          ],
          [
            0.4,
            1.29,
            1.31,
            1.3
          ],
          [
            0.5,
            1.24,
            1.26,
            1.25
          ]
        ]
      }
    ],
    "analysis": "The terminal-pd–current gradient is\n \\[\\text{gradient}=\\frac{1.25-1.45}{0.50-0.10}=-0.50\\,\\mathrm{V\\,A^{-1}}.\\]\n Thus \\(r=0.50\\,\\Omega\\). Extrapolating to zero current gives the EMF:\n \\[\\mathcal E=V+Ir=1.45+(0.10)(0.50)=1.50\\,\\mathrm V.\\]\n At \\(0.50\\,\\mathrm A\\), the internal power loss is \\(I^2r=0.125\\,\\mathrm W\\).",
    "uncertainty": "Draw steepest and shallowest lines consistent with error bars to estimate uncertainty in r. A narrow current range makes the gradient less certain. Cell warming and discharge can produce curvature or drift; repeat a reference reading to distinguish drift from random scatter.",
    "questions": [
      [
        "V falls from 1.42 V at 0.20 A to 1.26 V at 0.60 A. Find r and \\(\\mathcal E\\).",
        4,
        "\\[\\text{gradient}=\\frac{-0.16}{0.40}=-0.40\\,\\mathrm{V\\,A^{-1}}\\quad(1).\\]\n Hence \\(r=0.40\\,\\Omega\\) (1).\n \\[\\mathcal E=V+Ir\\quad(1)\\]\n \\[\\mathcal E=1.50\\,\\mathrm V\\quad(1).\\]"
      ],
      [
        "Explain the physical meaning of the negative gradient.",
        2,
        "Increasing current increases the lost volts Ir inside the cell (1); less energy per charge remains available at its terminals (1)."
      ],
      [
        "Why should the cell rest between readings?",
        2,
        "To reduce heating and discharge effects (1); these can change r or \\(\\mathcal E\\) and invalidate the constant-parameter straight-line model (1)."
      ]
    ]
  },
  {
    "id": 7,
    "title": "SHM: pendulum and mass–spring system",
    "topic": "Oscillations",
    "theory": [
      "In simple harmonic motion, acceleration is proportional to displacement and directed towards equilibrium:\n \\[a=-\\omega^2x.\\]\n The period is \\(T=2\\pi/\\omega\\), approximately independent of amplitude for small oscillations.",
      "For a simple pendulum at small angles,\n \\[T=2\\pi\\sqrt{\\frac Lg},\\qquad T^2=\\frac{4\\pi^2}{g}L.\\]\n Measure \\(L\\) from pivot to bob centre. For a vertical spring obeying Hooke’s law, the restoring resultant for displacement \\(x\\) from equilibrium is \\(-kx\\), giving\n \\[T=2\\pi\\sqrt{\\frac mk},\\qquad T^2=\\frac{4\\pi^2}{k}m.\\]\n Thus the pendulum and spring squared-period graphs give \\(g\\) and \\(k\\) from their gradients. The moving spring adds an effective mass and can produce a positive intercept in the spring graph."
    ],
    "apparatus": "Clamp stand, string and bob, metre rule, spring, known masses, stopwatch or motion sensor, fiducial marker and tray.",
    "method": [
      "Pendulum: clamp the string securely. Measure L from pivot to centre of the bob. Set a small initial angle, about 5°, and release without pushing.",
      "Use a marker at the equilibrium position. Time 20 complete oscillations, passing the marker in the same direction at the beginning and end. Repeat three times and divide the mean time by 20.",
      "Repeat for at least six lengths while keeping the initial angle small. Plot \\(T^2\\) against L; calculate \\(g=\\frac{4\\pi^2}{\\text{gradient}}\\).",
      "Spring: suspend a known mass, including the hanger, from a firmly clamped spring. Allow it to settle and place a marker at equilibrium.",
      "Displace the mass a small distance vertically and release without a sideways push. Time 20 oscillations and repeat. Keep motion within the linear elastic range.",
      "Repeat for at least six masses with the same spring. Plot \\(T^2\\) against total attached mass; calculate \\(k=\\frac{4\\pi^2}{\\text{gradient}}\\) and inspect the intercept."
    ],
    "controls": "For each series keep amplitude small, the support fixed and the same bob or spring. Avoid elliptical pendulum motion and sideways spring motion.",
    "safety": "Secure stands and use a tray below masses. Do not overload or overstretch the spring.",
    "tables": [
      {
        "caption": "Pendulum: mean of repeated 20-oscillation timings",
        "headers": [
          "L / m",
          "Mean 20T / s",
          "\\(T^2\\) / s²"
        ],
        "rows": [
          [
            0.4,
            25.38,
            1.61
          ],
          [
            0.6,
            31.08,
            2.415
          ],
          [
            0.8,
            35.88,
            3.218
          ],
          [
            1,
            40.12,
            4.023
          ],
          [
            1.2,
            43.96,
            4.83
          ]
        ]
      },
      {
        "caption": "Spring: total attached mass; k about 20 N m⁻¹",
        "headers": [
          "m / kg",
          "Mean 20T / s",
          "\\(T^2\\) / s²"
        ],
        "rows": [
          [
            0.1,
            9.74,
            0.237
          ],
          [
            0.15,
            11.58,
            0.335
          ],
          [
            0.2,
            13.18,
            0.434
          ],
          [
            0.25,
            14.6,
            0.533
          ],
          [
            0.3,
            15.9,
            0.632
          ]
        ]
      }
    ],
    "analysis": "The pendulum gradient is approximately \\(4.02\\,\\mathrm{s^2\\,m^{-1}}\\), giving\n \\[g=\\frac{4\\pi^2}{\\text{gradient}}\\approx\\frac{39.48}{4.02}=9.82\\,\\mathrm{m\\,s^{-2}}.\\]\n The spring gradient is approximately \\((0.632-0.237)/0.20=1.98\\,\\mathrm{s^2\\,kg^{-1}}\\), giving\n \\[k=\\frac{4\\pi^2}{\\text{gradient}}\\approx20.0\\,\\mathrm{N\\,m^{-1}}.\\]\n Its intercept of about \\(0.040\\,\\mathrm{s^2}\\) corresponds to an effective additional moving mass of about \\(0.020\\,\\mathrm{kg}\\).",
    "uncertainty": "Timing 20 cycles reduces relative reaction-time uncertainty, but miscounting is a gross error. Repeat independently. \\(T^2\\) has twice the percentage uncertainty of T. Length error is especially important for short pendulums; use a set square to locate the bob centre. Large angles violate the small-angle model.",
    "questions": [
      [
        "A pendulum \\(T^2\\)–L graph has gradient 4.10 s² m⁻¹. Calculate g.",
        2,
        "\\[g=\\frac{4\\pi^2}{\\text{gradient}}\\quad(1)\\]\n \\[g=\\frac{4\\pi^2}{4.10}=9.63\\,\\mathrm{m\\,s^{-2}}\\quad(1).\\]"
      ],
      [
        "A spring \\(T^2\\)–m gradient is 1.60 s² kg⁻¹. Determine k and state one reason for a positive intercept.",
        3,
        "\\[k=\\frac{4\\pi^2}{1.60}\\quad(1)\\]\n\\[k=24.7\\,\\mathrm{N\\,m^{-1}}\\quad(1).\\]\nThe spring itself has moving mass, or an unaccounted hanger adds mass (1)."
      ],
      [
        "Describe how to reduce timing uncertainty and maintain a valid SHM model.",
        3,
        "Time many complete cycles and divide by their number (1); repeat and average (1); use small amplitude and release without a push (1)."
      ]
    ]
  },
  {
    "id": 8,
    "title": "Gas laws: Boyle and Charles",
    "topic": "Thermal physics",
    "theory": [
      "For a fixed amount of ideal gas,\n \\[pV=nRT,\\]\n where \\(p\\) is absolute pressure and \\(T\\) is kelvin temperature. At constant temperature, Boyle’s law gives\n \\[pV=\\text{constant},\\qquad p\\propto\\frac1V.\\]\n Rapid compression heats the gas; wait for it to cool back to the original temperature before taking a reading.",
      "At constant pressure, Charles’s law gives\n \\[\\frac VT=\\text{constant},\\qquad V\\propto T.\\]\n A volume–kelvin-temperature graph should extrapolate to zero volume at zero kelvin for the ideal model. On a Celsius scale, its extrapolated intercept is near \\(-273\\,{}^\\circ\\mathrm C\\). This is an extrapolation, not a practical route to absolute zero; real gases condense first."
    ],
    "apparatus": "Boyle apparatus with trapped air, calibrated volume scale and absolute pressure sensor; Charles apparatus with trapped air beneath a freely moving oil plug in a uniform capillary, thermometer and stirred water bath.",
    "method": [
      "Boyle: check seals and determine whether the pressure instrument reads absolute or gauge pressure. Add atmospheric pressure to gauge readings.",
      "Trap a fixed quantity of air. Record its volume and pressure. Include any connecting-tube dead volume in the total gas volume.",
      "Change volume in small steps within apparatus ratings. Wait for temperature to return to room temperature at each step, then record pressure. Repeat while expanding to check for leaks or hysteresis.",
      "Take at least six Boyle readings; plot p against \\(\\frac1V\\) and check whether pV stays constant within uncertainty.",
      "Charles: place the sealed-end capillary with its trapped air and movable oil plug in a stirred water bath, with the plug free to move and the setup arranged to maintain approximately atmospheric pressure. Measure trapped-air length l; \\(V=Al\\) for uniform bore.",
      "Change bath temperature gradually over at least six values. Allow the gas, glass and thermometer to reach equilibrium before reading l and temperature. Repeat while cooling.",
      "Convert °C to K by adding 273.15. Plot l (or V) against T in kelvin. Keep the same trapped gas and check that the plug neither sticks nor leaks."
    ],
    "controls": "Boyle: fixed gas amount and temperature. Charles: fixed gas amount and pressure, uniform capillary bore.",
    "safety": "Do not exceed pressure ratings or heat sealed rigid gas containers. Use eye protection and handle hot water and glass carefully.",
    "tables": [
      {
        "caption": "Boyle: room temperature; absolute pressure",
        "headers": [
          "V / cm³",
          "p / kPa",
          "pV / kPa cm³"
        ],
        "rows": [
          [
            60,
            100,
            6000
          ],
          [
            50,
            120,
            6000
          ],
          [
            40,
            150,
            6000
          ],
          [
            35,
            172,
            6020
          ],
          [
            30,
            200,
            6000
          ]
        ]
      },
      {
        "caption": "Charles: uniform capillary, approximately atmospheric pressure",
        "headers": [
          "Temperature / °C",
          "T / K",
          "Air length l / mm"
        ],
        "rows": [
          [
            10,
            283.15,
            94.4
          ],
          [
            25,
            298.15,
            99.4
          ],
          [
            40,
            313.15,
            104.4
          ],
          [
            55,
            328.15,
            109.4
          ],
          [
            70,
            343.15,
            114.4
          ]
        ]
      }
    ],
    "analysis": "The Boyle data give\n \\[pV\\approx6000\\,\\mathrm{kPa\\,cm^3}=6.00\\,\\mathrm J.\\]\n At \\(V=45\\,\\mathrm{cm^3}\\), the predicted absolute pressure is \\(p\\approx133\\,\\mathrm{kPa}\\). The Charles data give \\(l/T\\approx0.333\\,\\mathrm{mm\\,K^{-1}}\\); with constant cross-sectional area, this tests \\(V\\propto T\\).\n A Celsius fit \\(l\\approx0.333\\theta+91.0\\), with \\(l\\) in millimetres and \\(\\theta\\) in degrees Celsius, extrapolates to zero length near \\(-273\\,{}^\\circ\\mathrm C\\).",
    "uncertainty": "Temperature lag makes Charles readings depend on whether the bath is warming or cooling. Plug friction causes pressure changes. Boyle dead volume creates a systematic volume offset; leaks change n. Use sufficiently slow changes and compare reverse runs. Extrapolating hundreds of degrees makes the absolute-zero estimate sensitive to gradient error.",
    "questions": [
      [
        "A gas at constant temperature occupies 48 cm³ at 125 kPa absolute. Find its volume at 160 kPa.",
        3,
        "Boyle’s law: \\(p_1V_1=p_2V_2\\) (1).\n \\[V_2=\\frac{125\\times48}{160}\\quad(1)\\]\n \\[V_2=37.5\\,\\mathrm{cm^3}\\quad(1).\\]"
      ],
      [
        "Why must a Boyle reading be delayed after compression?",
        2,
        "Compression heats the gas (1); wait for heat transfer to restore the original temperature so pV can be compared at constant T (1)."
      ],
      [
        "At constant pressure, gas volume is 100 cm³ at 27 °C. Estimate its volume at 77 °C.",
        3,
        "Convert to approximately 300 K and 350 K (1); \\(\\frac{V_2}{V_1}=\\frac{T_2}{T_1}\\) (1); V₂ ≈ 117 cm³ (1)."
      ]
    ]
  },
  {
    "id": 9,
    "title": "Charging and discharging capacitors",
    "topic": "Electricity",
    "theory": [
      "Capacitance is charge stored per unit potential difference: \\(C=Q/V\\). During discharge through resistance \\(R\\), voltage follows\n \\[V=V_0e^{-t/(RC)}.\\]\n Charge and current magnitude decay with the same time constant,\n \\[\\tau=RC.\\]\n After one time constant, \\(V=V_0/e\\approx0.368V_0\\).",
      "When charging from a constant ideal supply of EMF \\(\\mathcal E\\),\n \\[V=\\mathcal E\\left(1-e^{-t/(RC)}\\right).\\]\n After one time constant, \\(V\\approx0.632\\mathcal E\\). Taking logarithms of the discharge equation gives\n \\[\\ln\\!\\left(\\frac V{V_0}\\right)=-\\frac{t}{RC}.\\]\n Plot this dimensionless logarithm against time: the gradient is \\(-1/(RC)\\). Charging can be linearised by plotting \\(\\ln[(\\mathcal E-V)/\\mathcal E]\\) against time."
    ],
    "apparatus": "Low-voltage supply, changeover switch, capacitor, known resistor, voltmeter/data logger or oscilloscope, leads and discharge resistor.",
    "method": [
      "Select R and C so the change is slow enough for the recording instrument. Check capacitor polarity and voltage rating; measure R independently.",
      "Connect the capacitor to charge through R, with the voltmeter or logger across the capacitor. Arrange a changeover switch to discharge through R with the supply disconnected.",
      "Discharge safely through a resistor before starting. Begin logging and switch to charge. Record from t = 0 until voltage is close to the supply value.",
      "Charge fully, then switch to discharge and record V at regular intervals over several time constants. Use a logger for short time constants.",
      "Repeat both runs. Record \\(V_0\\) and supply \\(\\mathcal E\\) for each run. Take denser readings early in the change and avoid relying on late readings near the meter resolution.",
      "Plot charging and discharging V–t curves. For discharge calculate \\(\\ln\\!\\left(\\frac V{V_0}\\right)\\), plot against t and find \\(\\tau\\) from \\(-\\frac1{\\text{gradient}}\\). Use \\(C=\\frac\\tau R\\) and compare with the component label.",
      "For charging plot \\(\\ln\\!\\left(\\frac{\\mathcal E-V}{\\mathcal E}\\right)\\) against t using values sufficiently below \\(\\mathcal E\\). Compare the two estimates and consider meter input resistance."
    ],
    "controls": "Use the same capacitor and resistor, stable supply and temperature; keep the measurement instrument connected consistently.",
    "safety": "Observe polarity and voltage ratings. Discharge through a suitable resistor before touching or rewiring; do not short the capacitor terminals.",
    "tables": [
      {
        "caption": "R = 100 kΩ, C nominally 100 μF, supply 5.00 V",
        "headers": [
          "t / s",
          "Discharge V / V",
          "\\(\\ln\\!\\left(\\frac V{V_0}\\right)\\)",
          "Charge V / V"
        ],
        "rows": [
          [
            0,
            5,
            0,
            0
          ],
          [
            5,
            3.04,
            -0.498,
            1.96
          ],
          [
            10,
            1.84,
            -1,
            3.16
          ],
          [
            15,
            1.12,
            -1.496,
            3.88
          ],
          [
            20,
            0.68,
            -1.995,
            4.32
          ],
          [
            25,
            0.41,
            -2.501,
            4.59
          ],
          [
            30,
            0.25,
            -2.996,
            4.75
          ]
        ]
      }
    ],
    "analysis": "The logarithmic gradient is approximately \\(-0.100\\,\\mathrm{s^{-1}}\\), giving\n \\[\\tau=-\\frac1{\\text{gradient}}=10.0\\,\\mathrm s.\\]\n Hence\n \\[C=\\frac\\tau R=\\frac{10.0}{100000}=1.00\\times10^{-4}\\,\\mathrm F=100\\,\\mu\\mathrm F.\\]\n Voltage halves every \\(\\tau\\ln2\\approx6.93\\,\\mathrm s\\). The time constant is not the half-life.",
    "uncertainty": "A voltmeter with input resistance \\(R_{\\mathrm v}\\) provides an additional discharge path, so effective resistance is R in parallel with \\(R_{\\mathrm v}\\). Choose \\(R_{\\mathrm v}\\) much greater than R or correct the model. Late voltages have large percentage errors, and log uncertainties are approximately \\(\\frac{\\Delta V}V\\). Switching delay shifts time zero.",
    "questions": [
      [
        "A discharge log plot has gradient −0.080 s⁻¹ and R = 220 kΩ. Calculate C.",
        3,
        "\\[\\tau=\\frac1{0.080}=12.5\\,\\mathrm s\\quad(1)\\]\n \\[C=\\frac\\tau R\\quad(1)\\]\n \\[C=5.68\\times10^{-5}\\,\\mathrm F=56.8\\,\\mu\\mathrm F\\quad(1).\\]"
      ],
      [
        "State the charging and discharging voltage fractions after one time constant.",
        2,
        "Charging: 0.632 of supply (1); discharging: 0.368 of initial voltage (1)."
      ],
      [
        "Explain why late discharge readings are often less useful in a logarithmic plot.",
        2,
        "V becomes small while absolute meter uncertainty remains similar (1); fractional uncertainty \\(\\frac{\\Delta V}V\\) and therefore uncertainty in the logarithm increases (1)."
      ]
    ]
  },
  {
    "id": 10,
    "title": "Force on a current-carrying wire",
    "topic": "Magnetic fields",
    "theory": [
      "A straight current-carrying wire in a uniform magnetic field experiences force\n \\[F=BIl\\sin\\theta.\\]\n Here \\(B\\) is flux density in tesla, \\(I\\) is current, \\(l\\) is active wire length and \\(\\theta\\) is the angle between current and field. For a perpendicular wire, \\(F=BIl\\).",
      "A top-pan balance measures the equal and opposite force on a magnet assembly. With the magnet on the balance and the wire independently supported,\n \\[|F|=|\\Delta m|g.\\]\n Convert balance changes to kilograms. Reversing the current reverses the force direction and the sign of the balance change."
    ],
    "apparatus": "Magnet assembly on a top-pan balance, independently clamped wire, low-voltage DC supply, ammeter, current-limiting resistor, switch and ruler.",
    "method": [
      "Place the magnet assembly on the balance. Support a straight wire independently in its uniform gap, perpendicular to the field; ensure it touches neither magnets nor balance.",
      "With no current, record or tare the balance. Measure the wire length l actually within the uniform field, not the whole circuit.",
      "Pass a small measured current, record the signed balance change, and switch off. Convert grams to kilograms before calculating \\(F=\\Delta m\\,g\\).",
      "Repeat for at least six currents at fixed B and l. Reverse current for a check of force direction; repeat zero-current readings to monitor drift.",
      "At fixed I and B, vary the active length using suitable wire arrangements in the same uniform field, keeping connecting leads outside it. Measure l for each arrangement.",
      "At fixed I and l, use several independently measured field strengths, for example a calibrated electromagnet with a Hall probe. Do not assume B is proportional to the number of magnets.",
      "Plot F against I, l and B for the separate series. Check linearity and intercepts; use gradient of F–I divided by l to determine B."
    ],
    "controls": "Vary one quantity at a time. Keep the wire perpendicular, magnet position fixed and active field region uniform; minimise heating.",
    "safety": "Limit current to avoid hot wire. Keep strong magnets away from sensitive devices; prevent trapping fingers between magnets.",
    "tables": [
      {
        "caption": "Current series: l = 0.050 m; balance changes shown as magnitudes",
        "headers": [
          "I / A",
          "|\\(\\Delta m\\)| / g",
          "|F| / mN"
        ],
        "rows": [
          [
            0.5,
            0.51,
            5
          ],
          [
            1,
            1.02,
            10
          ],
          [
            1.5,
            1.53,
            15
          ],
          [
            2,
            2.04,
            20
          ],
          [
            2.5,
            2.55,
            25
          ]
        ]
      },
      {
        "caption": "Separate length and field series",
        "headers": [
          "l / m (I = 1 A, B = 0.20 T)",
          "F / mN",
          "B / T (I = 1 A, l = 0.050 m)",
          "F / mN"
        ],
        "rows": [
          [
            0.02,
            4,
            0.1,
            5
          ],
          [
            0.03,
            6,
            0.15,
            7.5
          ],
          [
            0.04,
            8,
            0.2,
            10
          ],
          [
            0.05,
            10,
            0.25,
            12.5
          ]
        ]
      }
    ],
    "analysis": "The force–current gradient is \\(0.0100\\,\\mathrm{N\\,A^{-1}}\\). Therefore\n \\[B=\\frac{\\text{gradient}}l=\\frac{0.0100}{0.050}=0.200\\,\\mathrm T.\\]\n A balance change of \\(1.02\\,\\mathrm g\\) corresponds to\n \\[F=\\Delta m\\,g=(0.00102)(9.81)\\approx0.0100\\,\\mathrm N.\\]\n The other series demonstrate direct proportionality to active length and independently calibrated flux density.",
    "uncertainty": "The effective field boundary may be diffuse, making l uncertain. A balance force on connecting leads contaminates the result. Zero drift and vibrations are important for milligram-scale changes; repeat zero and reverse-current readings. A non-perpendicular wire measures \\(B\\sin\\theta\\) rather than B.",
    "questions": [
      [
        "At I = 2.0 A and l = 0.040 m the balance change is 1.63 g. Determine B.",
        3,
        "Convert the balance change to kilograms:\n \\[F=(0.00163)(9.81)=0.0160\\,\\mathrm N\\quad(1).\\]\n \\[B=\\frac F{Il}\\quad(1)\\]\n \\[B=0.200\\,\\mathrm T\\quad(1).\\]"
      ],
      [
        "Why must the wire be supported independently of the balance?",
        2,
        "The balance should measure the reaction force on the magnets (1); if both wire and magnet are on the balance, their mutual magnetic forces are internal and can cancel in the reading (1)."
      ],
      [
        "Describe a valid test of the dependence on B.",
        3,
        "Keep I, l and angle fixed (1); measure each B independently with a calibrated probe (1); plot F against B and test for proportionality within uncertainty (1)."
      ]
    ]
  },
  {
    "id": 11,
    "title": "Search coil: flux linkage and angle",
    "topic": "Electromagnetic induction",
    "theory": [
      "For a flat coil with \\(N\\) turns and area \\(A\\), flux and flux linkage are\n \\[\\Phi=BA\\cos\\theta,\\qquad N\\Phi=NBA\\cos\\theta.\\]\n The angle \\(\\theta\\) is between the field and the normal to the coil’s plane, not between the field and the plane itself.",
      "Faraday’s law relates induced EMF to the rate of change of flux linkage:\n \\[\\mathcal E=-\\frac{\\mathrm d(N\\Phi)}{\\mathrm dt}.\\]\n A stationary coil in a steady field produces no EMF, even if its flux is large. In a sinusoidal field \\(B=B_0\\sin(\\omega t)\\), the peak EMF of a stationary search coil is\n \\[\\mathcal E_0=NA\\omega B_0|\\cos\\theta|.\\]\n At fixed field amplitude and frequency, peak or peak-to-peak voltage therefore measures relative flux-linkage amplitude."
    ],
    "apparatus": "AC-driven field coils or electromagnet, signal generator with suitable amplifier if needed, search coil of known turns and area, oscilloscope and angle scale.",
    "method": [
      "Produce a low-voltage sinusoidal magnetic field using field coils. Place the search coil centrally where the field is approximately uniform and connect it to the oscilloscope.",
      "Define \\(\\theta\\) between the search coil normal and the field direction. Mark 0° when its plane is perpendicular to the field; ensure rotation does not move its centre.",
      "Set constant field-drive amplitude and frequency. Adjust oscilloscope time-base and volts/division to display several clear cycles without clipping.",
      "At \\(\\theta\\) = 0°, measure peak-to-peak EMF from the number of vertical divisions multiplied by volts/division, including any probe multiplier.",
      "Rotate in steps to 90° and beyond, recording angle and repeated peak-to-peak voltages. Recheck the 0° reading to detect drift.",
      "Plot \\(V_{\\mathrm{pp}}\\) against \\(|\\cos\\theta|\\). At fixed angular frequency, the linkage amplitude is \\(\\frac{V_{\\mathrm{pp}}}{2\\omega}\\). If phase is compared with the drive, reversing the coil through 90° also reverses signal phase.",
      "Check the scope time-base by measuring a full period. Distinguish the oscillating EMF from flux linkage; their sinusoidal signals are a quarter-cycle out of phase."
    ],
    "controls": "Keep field amplitude, frequency, search-coil area, turns and centre position fixed; vary only orientation.",
    "safety": "Use low voltage and monitor heating of drive coils. Keep leads tidy and avoid excessive amplifier current.",
    "tables": [
      {
        "caption": "Field frequency 50.0 Hz; scope set to 20 mV/div, ×1 probe",
        "headers": [
          "\\(\\theta\\) / degrees",
          "\\(|\\cos\\theta|\\)",
          "\\(V_{\\mathrm{pp}}\\) / mV"
        ],
        "rows": [
          [
            0,
            1,
            100
          ],
          [
            15,
            0.966,
            97
          ],
          [
            30,
            0.866,
            87
          ],
          [
            45,
            0.707,
            71
          ],
          [
            60,
            0.5,
            50
          ],
          [
            75,
            0.259,
            26
          ],
          [
            90,
            0,
            2
          ]
        ]
      }
    ],
    "analysis": "The gradient of \\(V_{\\mathrm{pp}}\\) against \\(|\\cos\\theta|\\) is approximately \\(0.100\\,\\mathrm V\\). At \\(\\theta=0^\\circ\\), peak EMF is \\(0.050\\,\\mathrm V\\), and \\(\\omega=2\\pi(50)=314\\,\\mathrm{rad\\,s^{-1}}\\). Thus\n \\[(N\\Phi)_0=\\frac{\\mathcal E_0}{\\omega}=\\frac{0.050}{314}=1.59\\times10^{-4}\\,\\mathrm{Wb\\,turns}.\\]\n If \\(N=200\\) and \\(A=4.0\\times10^{-4}\\,\\mathrm{m^2}\\), then \\(B_0\\approx1.99\\,\\mathrm{mT}\\).",
    "uncertainty": "A small angle zero error is especially noticeable near 90°. Stray pickup and oscilloscope noise can give a non-zero minimum; measure a background signal with drive off. Keep the coil centred to avoid field variation. Do not mix RMS, peak and peak-to-peak values or change frequency while testing angle.",
    "questions": [
      [
        "An oscilloscope shows a peak-to-peak height of 4.0 divisions at 20 mV/div with a ×1 probe. Find peak EMF.",
        2,
        "\\[V_{\\mathrm{pp}}=4.0\\times20=80\\,\\mathrm{mV}\\quad(1)\\]\n \\[\\mathcal E_0=\\frac{V_{\\mathrm{pp}}}{2}=40\\,\\mathrm{mV}\\quad(1).\\]"
      ],
      [
        "The peak EMF is 40 mV at 50 Hz. Determine flux-linkage amplitude.",
        3,
        "\\[\\omega=2\\pi f=314\\,\\mathrm{rad\\,s^{-1}}\\quad(1)\\]\n\\[(N\\Phi)_0=\\frac{\\mathcal E_0}{\\omega}\\quad(1)\\]\n\\[(N\\Phi)_0=1.27\\times10^{-4}\\,\\mathrm{Wb\\,turns}\\quad(1).\\]"
      ],
      [
        "Explain why the signal is ideally zero at 90° and why a coil in a steady field also gives zero.",
        3,
        "At 90° the field has zero component normal to the coil (1); flux linkage is zero throughout the AC cycle (1); in a steady field at fixed angle the linkage is constant, so its rate of change and induced EMF are zero (1)."
      ]
    ]
  },
  {
    "id": 12,
    "title": "Inverse-square law for gamma radiation",
    "topic": "Nuclear physics",
    "theory": [
      "An approximately point-like source emits photons in many directions. A sphere has area \\(4\\pi r^2\\), so its photon flux and background-corrected count rate follow\n \\[C\\propto\\frac1{r^2}.\\]\n This assumes small absorption and scattering and a detector whose size and orientation make the point-source approximation reasonable.",
      "The detector also records background radiation:\n \\[C_{\\mathrm{measured}}=C_{\\mathrm{source}}+C_{\\mathrm{background}}.\\]\n Subtract rates, not raw counts recorded for different times. Counts fluctuate randomly; for \\(N\\) counts, a standard uncertainty estimate is \\(\\sqrt N\\). Close to an extended source or detector, the simple inverse-square model can fail."
    ],
    "apparatus": "Approved sealed gamma source, holder, GM tube or suitable detector and counter, ruler, timer, source-handling tools and shielding, all under the school’s radiation procedures.",
    "method": [
      "A trained teacher or authorised technician sets up and handles the source according to the local risk assessment. Students use provided data or work only within the authorised supervised arrangement.",
      "With the source stored away, measure background over a long timed interval. Calculate the background count rate and its statistical uncertainty.",
      "Fix the source and detector facing each other at the same height. Measure r from the source’s active position to the detector’s effective detecting position, allowing for housing offsets.",
      "Record counts for a known time at each of at least six distances. Choose times long enough to collect useful counts without changing source or detector settings.",
      "Repeat counts to observe random variation. Keep people and scattering objects in consistent positions; do not move the source by hand.",
      "Calculate measured count rate \\(\\frac Nt\\) and subtract the background rate. Plot corrected rate against \\(\\frac1{r^2}\\) and inspect linearity, or plot ln(corrected rate) against ln r for a gradient near −2.",
      "Compare \\(Cr^2\\) across distances and propagate counting uncertainties. Exclude close distances only with a physical reason, such as detector size or dead-time effects."
    ],
    "controls": "Keep source, detector orientation, counting settings and surrounding geometry fixed; account for background and distance offsets.",
    "safety": "Sealed sources are handled only by authorised staff under local radiation rules. Minimise exposure time, maximise distance, use specified shielding and handling tools, and return the source to secure storage.",
    "tables": [
      {
        "caption": "Background: 120 counts in 600 s = 0.200 s⁻¹; each source reading lasts 60 s",
        "headers": [
          "r / m",
          "Measured counts N",
          "Measured rate / s⁻¹",
          "Corrected C / s⁻¹",
          "\\(Cr^2\\) / s⁻¹ m²"
        ],
        "rows": [
          [
            0.1,
            1212,
            20.2,
            20,
            0.2
          ],
          [
            0.15,
            545,
            9.083,
            8.883,
            0.2
          ],
          [
            0.2,
            312,
            5.2,
            5,
            0.2
          ],
          [
            0.25,
            204,
            3.4,
            3.2,
            0.2
          ],
          [
            0.3,
            145,
            2.417,
            2.217,
            0.2
          ]
        ]
      }
    ],
    "analysis": "At \\(r=0.20\\,\\mathrm m\\), the background-corrected count rate is\n \\[C=\\frac Nt-\\frac{N_b}{t_b}=\\frac{312}{60}-\\frac{120}{600}=5.00\\,\\mathrm{s^{-1}}.\\]\n Therefore\n \\[Cr^2=(5.00)(0.20)^2=0.200\\,\\mathrm{s^{-1}\\,m^2}.\\]\n Doubling distance predicts one quarter of the corrected rate. These deliberately near-ideal example data show the trend; actual counts scatter randomly.",
    "uncertainty": "For independent source-plus-background and background measurements,\n\\[\\sigma_C=\\sqrt{\\frac{N}{t^2}+\\frac{N_b}{t_b^2}}.\\]\nAt \\(r=0.20\\,\\mathrm m\\), this is \\(\\sqrt{312/60^2+120/600^2}\\approx0.295\\,\\mathrm{s^{-1}}\\), or \\(5.9\\%\\). Larger distances need longer counts because background becomes a larger fraction. Distance uncertainty contributes approximately \\(2\\Delta r/r\\) to uncertainty in \\(r^2\\). Detector dead time can suppress rates close to the source.",
    "questions": [
      [
        "A detector records 312 counts in 60 s. Background is 120 counts in 600 s. Find corrected rate.",
        3,
        "Measured rate: \\(312/60=5.20\\,\\mathrm{s^{-1}}\\) (1).\n Background rate: \\(120/600=0.200\\,\\mathrm{s^{-1}}\\) (1).\n \\[C=5.20-0.200=5.00\\,\\mathrm{s^{-1}}\\quad(1).\\]"
      ],
      [
        "Corrected rate is 8.0 s⁻¹ at 0.15 m. Predict the corrected rate at 0.30 m.",
        2,
        "Rate scales as inverse distance squared (1); doubled distance gives 2.0 s⁻¹ (1)."
      ],
      [
        "Explain why long counting intervals are needed at large distances.",
        3,
        "Source rate decreases with distance (1); fewer counts have a larger fractional statistical uncertainty, about \\(\\frac1{\\sqrt N}\\) (1); background subtraction becomes relatively more important, so longer readings improve precision (1)."
      ]
    ]
  }
];
