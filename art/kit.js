// Art kit: flat cartoon frames drawn as SVG at 1280x720.
// Line hierarchy measured from the reference: characters 8px, props 5px, backgrounds 2px navy, clouds no outline.
(function (g) {
  const INK = "#1b1b1f", NAVY = "#2d4766";
  const C = {
    skin: "#fde6dc", blush: "#f6b7b0", mouth: "#b8323a",
    hair: "#2f4f6f", sweater: "#e07a4f", collar: "#fff4e2", shoe: "#3b3a4a",
    pencil: "#f5c542", eraser: "#f28aa0",
    sky1: "#dcecfb", sky2: "#f4fbff", grass: "#97cfbf", grass2: "#86c3b2",
    hill1: "#a9c9ec", hill2: "#c3c3f2", cloud: "#ffffff",
    wood: "#c99460", wood2: "#a8713f", stone: "#9aa0a8",
  };
  const W = 1280, H = 720;
  const line = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const L8 = line(8), L6 = line(6), L5 = line(5), L3 = line(3), L2n = line(2.2, NAVY);

  // hand-drawn wobble applied to character and prop groups
  const defs = `<defs>
    <filter id="wob" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.sky1}"/><stop offset="1" stop-color="${C.sky2}"/></linearGradient>
    <linearGradient id="snowsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0f2"/><stop offset="1" stop-color="#f5f9fd"/></linearGradient>
    <pattern id="paper" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#eef0fb"/><path d="M40 12 q10 14 0 28 q-10-14 0-28 M12 52 q8 8 0 16 q-8-8 0-16 M68 52 q8 8 0 16 q-8-8 0-16" fill="#d9ddf5"/></pattern>
  </defs>`;
  const frame = inner => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${defs}${inner}</svg>`;

  // ---------- backgrounds ----------
  const cloud = (x, y, s) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-150 30 C-170 30 -170 4 -140 2 C-140 -24 -100 -30 -84 -12 C-70 -46 -10 -50 6 -16 C24 -34 70 -30 72 -4 C110 -8 120 28 90 30 Z" fill="${C.cloud}"/>`;
  const tuft = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M-10 0 q2 -16 -6 -26 M0 0 q0 -18 4 -30 M10 0 q4 -12 14 -20" fill="none" ${line(2.4, "#2f5b55")}/>`;
  const bg = {
    white: () => `<rect width="${W}" height="${H}" fill="#ffffff"/>`,
    field: () => `<rect width="${W}" height="${H}" fill="url(#sky)"/>
      ${cloud(250, 110, 1.3)}${cloud(980, 90, 1.1)}${cloud(640, 190, 0.8)}${cloud(420, 250, 0.9)}
      <path d="M0 300 C80 270 150 290 210 340 L300 420 L0 470Z" fill="${C.hill1}" ${L2n}/>
      <path d="M380 440 C450 380 560 370 660 430 L700 460 L380 470Z" fill="${C.hill2}" ${L2n}/>
      <path d="M760 450 C860 390 960 380 1080 300 C1140 260 1200 240 1280 250 L1280 470 L760 470Z" fill="${C.hill1}" ${L2n}/>
      <path d="M0 500 C300 450 900 430 1280 470 L1280 720 L0 720Z" fill="${C.grass}" ${line(2.4, "#1f3c3a")}/>
      ${tuft(720, 500)}${tuft(250, 640, 1.2)}${tuft(1080, 620, 1.1)}${tuft(480, 690)}`,
    snow: () => `<rect width="${W}" height="${H}" fill="url(#snowsky)"/>${cloud(300, 120, 1)}${cloud(1000, 150, 0.9)}
      <path d="M0 430 L170 230 L260 320 L420 140 L600 380 L760 200 L930 400 L1110 180 L1280 360 L1280 520 L0 520Z" fill="#b9c8da" ${L2n}/>
      <path d="M170 230 L210 278 L186 270 L160 290 L132 276Z M420 140 L470 206 L440 196 L410 220 L380 196Z M760 200 L806 256 L780 248 L752 268 L724 250Z M1110 180 L1156 240 L1128 230 L1100 252 L1072 236Z" fill="#ffffff"/>
      <path d="M0 540 C320 500 900 490 1280 530 L1280 720 L0 720Z" fill="#fbfdff" ${L2n}/>`,
    lab: () => `<rect width="${W}" height="${H}" fill="url(#paper)"/>
      <path d="M0 360 L1280 360" ${line(3, "#8d93b5")}/>
      <rect x="150" y="40" width="250" height="190" fill="#cfe6f7" ${line(5, "#4a4f63")}/><path d="M275 40 V230 M150 135 H400" ${line(5, "#4a4f63")}/>
      <rect x="880" y="40" width="250" height="190" fill="#cfe6f7" ${line(5, "#4a4f63")}/><path d="M1005 40 V230 M880 135 H1130" ${line(5, "#4a4f63")}/>
      <path d="M0 360 L1280 360 L1280 720 L0 720Z" fill="#eeeef2"/>
      ${Array.from({ length: 9 }, (_, i) => `<path d="M${640 + (i - 4) * 150} 360 L${640 + (i - 4) * 420} 720" ${line(2, "#c2c4d4")}/>`).join("")}
      ${[400, 470, 570].map(y => `<path d="M0 ${y} H1280" ${line(2, "#c2c4d4")}/>`).join("")}`,
  };

  // ---------- faces ----------
  function eyes(kind, dx = 40, y = -410) {
    const one = (x, side) => {
      switch (kind) {
        case "closed": return `<path d="M${x - 17} ${y} q17 13 34 0" fill="none" ${L6}/>`;
        case "happy": return `<path d="M${x - 17} ${y + 6} q17 -16 34 0" fill="none" ${L6}/>`;
        case "half": return `<path d="M${x - 19} ${y - 4} h38" ${L6}/><circle cx="${x + side * 2}" cy="${y + 7}" r="7" fill="${INK}"/>`;
        case "wide": return `<circle cx="${x}" cy="${y}" r="17" fill="#fff" ${L5}/><circle cx="${x}" cy="${y + 2}" r="7" fill="${INK}"/>`;
        case "worried": return `<circle cx="${x}" cy="${y + 2}" r="9" fill="${INK}"/><circle cx="${x + 3}" cy="${y - 1}" r="3" fill="#fff"/>`;
        default: return `<circle cx="${x}" cy="${y}" r="10" fill="${INK}"/><circle cx="${x + 3.5}" cy="${y - 3.5}" r="3.4" fill="#fff"/>`;
      }
    };
    return one(-dx, -1) + one(dx, 1);
  }
  function brows(kind, dx = 40, y = -452) {
    const b = { up: [-6, 6], worried: [8, -8], flat: [0, 0], angry: [-10, 10], skeptic: [0, 12] }[kind];
    if (!b) return "";
    return `<path d="M${-dx - 18} ${y + b[0]} L${-dx + 16} ${y - b[0] * 0.2}" ${L6}/><path d="M${dx - 16} ${y - b[1] * 0.2} L${dx + 18} ${y + b[1]}" ${L6}/>`;
  }
  function mouth(kind, x = 0, y = -350) {
    switch (kind) {
      case "talk": return `<path d="M${x - 13} ${y - 8} Q${x} ${y - 14} ${x + 13} ${y - 8} Q${x + 15} ${y + 14} ${x} ${y + 16} Q${x - 15} ${y + 14} ${x - 13} ${y - 8}Z" fill="${C.mouth}" ${L5}/>`;
      case "o": return `<ellipse cx="${x}" cy="${y}" rx="13" ry="17" fill="${C.mouth}" ${L5}/>`;
      case "smile": return `<path d="M${x - 26} ${y - 8} Q${x} ${y + 22} ${x + 26} ${y - 8}" fill="none" ${L6}/>`;
      case "grin": return `<path d="M${x - 30} ${y - 10} Q${x} ${y - 6} ${x + 30} ${y - 10} Q${x + 24} ${y + 26} ${x} ${y + 26} Q${x - 24} ${y + 26} ${x - 30} ${y - 10}Z" fill="${C.mouth}" ${L5}/><path d="M${x - 24} ${y - 8} H${x + 24} V${y + 2} H${x - 24}Z" fill="#fff"/>`;
      case "flat": return `<path d="M${x - 18} ${y} h36" ${L6}/>`;
      case "smirk": return `<path d="M${x - 18} ${y + 2} Q${x + 6} ${y + 8} ${x + 22} ${y - 8}" fill="none" ${L6}/>`;
      case "sad": return `<path d="M${x - 20} ${y + 8} Q${x} ${y - 10} ${x + 20} ${y + 8}" fill="none" ${L6}/>`;
      default: return "";
    }
  }

  // ---------- narrator (original design: tousled navy hair, rust sweater, pencil behind the ear) ----------
  const hand = (x, y, r = 19) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${C.skin}" ${L6}/>`;
  const pointHand = (x, y, ang = 0) => `<g transform="translate(${x} ${y}) rotate(${ang})"><rect x="-6" y="-46" width="13" height="36" rx="6.5" fill="${C.skin}" ${L5}/><circle cx="0" cy="0" r="19" fill="${C.skin}" ${L6}/><path d="M-8 -6 q8 6 16 0" fill="none" ${line(3)}/></g>`;
  const palm = (x, y, ang = 0) => `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M-22 -6 Q-24 -24 -10 -26 L-6 -40 Q0 -46 4 -38 L6 -26 Q22 -26 22 -8 Q20 12 0 12 Q-20 12 -22 -6Z" fill="${C.skin}" ${L6}/></g>`;
  const ARMS = {
    point: { L: "M-56 -288 Q-86 -230 -76 -168", R: "M56 -288 Q118 -300 128 -392", hl: [-76, -160], hr: ["point", 130, -398, 8] },
    present: { L: "M-56 -288 Q-86 -230 -76 -168", R: "M56 -288 Q130 -250 196 -266", hl: [-76, -160], hr: ["palm", 210, -270, 70] },
    shrug: { L: "M-56 -288 Q-140 -250 -160 -300", R: "M56 -288 Q140 -250 160 -300", hl: ["palm", -170, -306, -20], hr: ["palm", 170, -306, 20] },
    wow: { L: "M-56 -288 Q-140 -340 -150 -440", R: "M56 -288 Q140 -340 150 -440", hl: [-150, -450], hr: [150, -450] },
    relax: { L: "M-56 -288 Q-86 -230 -76 -168", R: "M56 -288 Q86 -230 76 -168", hl: [-76, -160], hr: [76, -160] },
    think: { L: "M-56 -288 Q-86 -230 -76 -168", R: "M56 -288 Q140 -260 70 -318", hl: [-76, -160], hr: [58, -318], front: true },
    hold: { L: "M-56 -288 Q-86 -230 -76 -168", R: "M56 -288 Q110 -240 150 -250", hl: [-76, -160], hr: [156, -252] },
  };
  const drawHand = h => h[0] === "point" ? pointHand(h[1], h[2], h[3]) : h[0] === "palm" ? palm(h[1], h[2], h[3]) : hand(h[0], h[1]);
  function narrator({ x = 640, y = 700, s = 1, pose = "relax", eye = "dot", brow = "", m = "talk", prop = "", flip = false } = {}) {
    const a = ARMS[pose] || ARMS.relax;
    const arms = `<path d="${a.L}" fill="none" ${L8}/><path d="${a.R}" fill="none" ${L8}/>${drawHand(a.hl)}${drawHand(a.hr)}`;
    const head = `
      <path d="M-102 -424 a14 18 0 1 0 2 34" fill="${C.skin}" ${L6}/><path d="M102 -424 a14 18 0 1 1 -2 34" fill="${C.skin}" ${L6}/>
      <path d="M-100 -430 C-104 -520 -44 -548 0 -548 C50 -548 106 -520 104 -430 C102 -352 62 -306 0 -306 C-62 -306 -98 -352 -100 -430Z" fill="${C.skin}" ${L8}/>
            <path d="M-106 -436 C-114 -536 -40 -566 12 -560 C76 -554 116 -520 108 -440 C98 -470 74 -486 50 -478 C34 -506 -2 -506 -18 -484 C-46 -500 -86 -484 -106 -436Z" fill="${C.hair}" ${L8}/>
      <path d="M-6 -560 q4 -34 34 -36 q-16 12 -12 34" fill="${C.hair}" ${L6}/>
      <g transform="translate(-118 -452) rotate(20)"><rect x="-10" y="-78" width="20" height="100" fill="${C.pencil}" ${L5}/><path d="M-10 -78 V22 M0 -78 V22" stroke="#e0a92e" stroke-width="2"/><rect x="-10" y="-96" width="20" height="20" rx="3" fill="${C.eraser}" ${L5}/><path d="M-10 22 L0 44 L10 22Z" fill="#f3d9b5" ${L5}/><path d="M-3 37 L0 44 L3 37Z" fill="${INK}"/></g>
      <ellipse cx="-62" cy="-366" rx="16" ry="9" fill="${C.blush}" opacity=".7"/><ellipse cx="62" cy="-366" rx="16" ry="9" fill="${C.blush}" opacity=".7"/>
      ${brows(brow)}${eyes(eye)}${mouth(m)}`;
    const body = `
      <path d="M-24 -170 L-32 -24 M24 -170 L34 -24" ${L8}/>
      <ellipse cx="-38" cy="-16" rx="30" ry="16" fill="${C.shoe}" ${L6}/><ellipse cx="42" cy="-16" rx="30" ry="16" fill="${C.shoe}" ${L6}/>
      <path d="M-60 -304 Q-74 -240 -80 -166 Q0 -152 80 -166 Q74 -240 60 -304 Q0 -320 -60 -304Z" fill="${C.sweater}" ${L8}/>
      <path d="M-76 -186 Q0 -174 76 -186" fill="none" ${line(4, "#b65a35")}/>
      <path d="M-40 -308 Q0 -282 40 -308 Q0 -326 -40 -308Z" fill="${C.collar}" ${L5}/>`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" filter="url(#wob)">${body}${a.front ? "" : arms}${head}${a.front ? arms : ""}${prop}</g>`;
  }

  // ---------- side characters ----------
  // caveman: wide head, big bushy hair, unibrow, striped hide tunic (original look)
  function caveman({ x, y, s = 1, flip = false, eye = "dot", m = "flat", hair = "#6b3f22", tunic = "#d8a85a", arm = "down", prop = "" }) {
    const sx = flip ? -s : s;
    const armR = arm === "up" ? `<path d="M60 -250 Q120 -300 140 -380" fill="none" ${L8}/>${hand(142, -388)}` :
      arm === "out" ? `<path d="M60 -250 Q130 -240 170 -270" fill="none" ${L8}/>${hand(176, -274)}` :
        `<path d="M60 -250 Q86 -190 80 -130" fill="none" ${L8}/>${hand(80, -124)}`;
    return `<g transform="translate(${x} ${y}) scale(${sx} ${s})" filter="url(#wob)">
      <path d="M-74 -280 Q-90 -140 -96 40 L96 40 Q90 -140 74 -280 Q0 -300 -74 -280Z" fill="${tunic}" ${L8}/>
      <path d="M-80 -180 L-20 -230 M-86 -90 L10 -170 M-90 0 L50 -120 M30 -270 L80 -230" ${line(6, "#9c6a2c")}/>
      <path d="M-60 -250 Q-86 -190 -80 -130" fill="none" ${L8}/>${hand(-80, -124)}
      ${armR}
      <path d="M-118 -400 C-128 -520 -60 -560 0 -560 C70 -560 128 -520 118 -400 C112 -320 64 -284 0 -284 C-64 -284 -112 -320 -118 -400Z" fill="${C.skin}" ${L8}/>
      <path d="M-128 -380 C-170 -420 -150 -470 -130 -480 C-160 -540 -100 -590 -60 -570 C-40 -620 40 -620 60 -574 C110 -596 160 -540 132 -484 C160 -460 168 -410 126 -380 C118 -440 90 -470 40 -476 C10 -500 -40 -498 -60 -474 C-100 -470 -124 -440 -128 -380Z" fill="${hair}" ${L8}/>
      <path d="M-70 -444 Q-36 -462 -6 -446 Q24 -462 70 -444" fill="none" ${line(11)}/>
      ${eyes(eye, 38, -412)}
      <path d="M-6 -404 q-16 26 4 34" fill="none" ${L6}/>
      ${mouth(m, 0, -332)}
      ${prop}
    </g>`;
  }
  function hiker({ x, y, s = 1, flip = false, coat = "#d94b3f", eye = "wide", m = "o" }) {
    const sx = flip ? -s : s;
    return `<g transform="translate(${x} ${y}) scale(${sx} ${s})" filter="url(#wob)">
      <path d="M-24 -150 L-30 -24 M24 -150 L32 -24" ${L8}/><ellipse cx="-36" cy="-16" rx="28" ry="15" fill="#4b4a5a" ${L6}/><ellipse cx="40" cy="-16" rx="28" ry="15" fill="#4b4a5a" ${L6}/>
      <rect x="-104" y="-300" width="58" height="120" rx="18" fill="#f0a03c" ${L6}/>
      <path d="M-64 -310 Q-80 -230 -82 -150 L82 -150 Q80 -230 64 -310 Q0 -326 -64 -310Z" fill="${coat}" ${L8}/>
      <path d="M0 -316 V-152" ${line(4, "#8c2a22")}/>
      <path d="M58 -290 Q100 -240 92 -180" fill="none" ${L8}/>${hand(92, -172)}
      <path d="M-84 -420 C-88 -500 -40 -520 0 -520 C44 -520 88 -500 84 -420 C82 -350 46 -314 0 -314 C-48 -314 -82 -350 -84 -420Z" fill="${C.skin}" ${L8}/>
      <path d="M-90 -430 C-96 -520 -30 -548 6 -546 C60 -544 96 -514 90 -432 Q0 -462 -90 -430Z" fill="${coat}" ${L8}/><circle cx="6" cy="-552" r="20" fill="#fff" ${L6}/>
      <path d="M-92 -432 Q0 -464 92 -432 L92 -412 Q0 -444 -92 -412Z" fill="#fff" ${L5}/>
      ${eyes(eye, 32, -380)}${mouth(m, 0, -336)}
    </g>`;
  }

  // ---------- props ----------
  const club = (x, y, ang = -30, s = 1) => `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" filter="url(#wob)"><path d="M-12 40 L-8 -150 Q-16 -200 0 -228 Q26 -236 30 -200 Q26 -170 12 -150 L14 40 Q0 50 -12 40Z" fill="${C.wood}" ${L5}/><path d="M-4 -120 q8 6 14 0 M-2 -60 q8 6 12 0 M8 -190 q6 8 12 2" fill="none" ${line(3, C.wood2)}/><circle cx="1" cy="40" r="11" fill="${C.wood2}" ${L5}/></g>`;
  const bigBranch = (x, y, ang = -30, s = 1) => `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" filter="url(#wob)"><path d="M-10 60 L-6 -330 Q2 -350 10 -330 L14 60Z" fill="${C.wood}" ${L5}/><path d="M4 -200 L40 -250 M2 -100 L-30 -140" ${L5}/><ellipse cx="44" cy="-262" rx="18" ry="10" fill="#7fbf6a" ${L3}/><ellipse cx="-36" cy="-152" rx="16" ry="9" fill="#7fbf6a" ${L3}/></g>`;
  const arrow = (x, y, ang = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" filter="url(#wob)"><path d="M-90 0 H60" ${L5}/><path d="M60 -12 L88 0 L60 12Z" fill="${C.stone}" ${L5}/><path d="M-90 0 l-18 -14 M-90 0 l-18 14 M-74 0 l-18 -14 M-74 0 l-18 14" ${line(4, "#c0392b")}/></g>`;
  const bow = (x, y, ang = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s})" filter="url(#wob)"><path d="M0 -120 Q70 0 0 120" fill="none" ${line(9, C.wood2)}/><path d="M0 -120 Q70 0 0 120" fill="none" ${line(4, C.wood)}/><path d="M0 -120 V120" ${line(2, INK)}/></g>`;
  const iceBlock = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#wob)"><path d="M-150 0 L-140 -230 L130 -250 L160 -10Z" fill="#cdeaf6" ${L6}/><path d="M-110 -40 L-100 -200 L100 -214 L120 -50Z" fill="#a9d5ea" opacity=".6"/><path d="M-60 -120 q30 -40 60 -10 q-20 40 -60 10Z" fill="#9b8a7a" opacity=".55"/><path d="M-120 -210 L-60 -220 M90 -230 L120 -150" ${line(4, "#ffffff")}/></g>`;
  const tv = (x, y, w, h, screen) => `<g filter="url(#wob)"><rect x="${x - 200}" y="${y + h + 34}" width="${w + 400}" height="26" fill="#8a6650" ${L6}/><path d="M${x - 170} ${y + h + 60} V720 M${x + w + 170} ${y + h + 60} V720" ${line(18, "#7a5845")}/><path d="M${x - 170} ${y + h + 60} V720 M${x + w + 170} ${y + h + 60} V720" ${L6} opacity=".0"/>
    <path d="M${x + w / 2 - 70} ${y + h + 34} L${x + w / 2 - 20} ${y + h + 6} H${x + w / 2 + 20} L${x + w / 2 + 70} ${y + h + 34}Z" fill="#33333e" ${L5}/>
    <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="8" fill="#33333e" ${L6}/></g>
    <svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${screen}</svg>`;
  const photo = (x, y, w, h, label, note) => `<g><clipPath id="pc${x}${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e9e4d8"/>
    <g opacity=".5" clip-path="url(#pc${x}${y})">${Array.from({ length: 14 }, (_, i) => `<path d="M${x + i * 44} ${y + h} L${x + i * 44 + 160} ${y}" ${line(2, "#cfc7b4")}/>`).join("")}</g>
    <rect x="${x + 16}" y="${y + 16}" width="160" height="34" rx="6" fill="#2a6f73"/><text x="${x + 96}" y="${y + 40}" font-family="Nunito, sans-serif" font-weight="800" font-size="19" fill="#fff" text-anchor="middle">ẢNH THẬT</text>
    <text x="${x + w / 2}" y="${y + h / 2 + 10}" font-family="Nunito, sans-serif" font-size="26" fill="#7b7464" text-anchor="middle">${note}</text>
    <text x="${x + w / 2}" y="${y + h + 62}" font-family="'Gochi Hand', 'Comic Sans MS', cursive" font-size="44" fill="${INK}" text-anchor="middle">${label}</text></g>`;

  // ---------- weapon icons for the chapter menu ----------
  const ICON = {
    club: `<g transform="rotate(14)"><path d="M-6 62 L-10 -10 Q-22 -40 -16 -62 Q0 -80 16 -62 Q22 -40 10 -10 L6 62Z" fill="${C.wood}" ${line(3.5)}/><path d="M-14 -46 l-12 -4 M14 -52 l12 -6 M-14 -22 l-12 2 M14 -28 l12 0 M0 -70 l0 -10" ${line(4)}/><path d="M-6 40 h12 M-6 50 h12" ${line(2.5, C.wood2)}/></g>`,
    spear: `<g transform="rotate(25)"><path d="M0 70 V-40" ${line(6, C.wood2)}/><path d="M0 -76 L12 -40 L0 -32 L-12 -40Z" fill="#c9ced6" ${line(3.5)}/></g>`,
    bow: `<g transform="rotate(-10)"><path d="M-10 -72 Q50 0 -10 72" fill="none" ${line(7, C.wood2)}/><path d="M-10 -72 V72" ${line(2)}/><path d="M-40 0 H50" ${line(3.5)}/><path d="M50 -8 L64 0 L50 8Z" fill="#c9ced6" ${line(3)}/></g>`,
    sword: `<g transform="rotate(30)"><path d="M-7 -80 L7 -80 L8 30 L0 42 L-8 30Z" transform="rotate(180)" fill="#dfe3e8" ${line(3.5)}/><path d="M-26 -30 H26" ${line(7, "#8a6a3a")}/><path d="M0 -30 V-62" ${line(8, "#5a3d2a")}/><circle cy="-68" r="7" fill="#c9a227" ${line(3)}/></g>`,
  };
  const menu = (items, cur) => {
    const n = items.length, gap = 300, x0 = 640 - (n - 1) * gap / 2;
    return items.map(([key, label, color], i) => {
      const cx = x0 + i * gap, on = i === cur, r = on ? 124 : 104;
      return `<g transform="translate(${cx} 320)"><circle r="${r}" fill="${color}" ${line(on ? 6 : 3.5)}/><g transform="scale(${on ? 1.75 : 1.45})">${ICON[key]}</g>
        <text y="${r + 52}" font-family="Nunito, sans-serif" font-size="${on ? 38 : 32}" font-weight="${on ? 800 : 600}" fill="${INK}" text-anchor="middle">${label}</text></g>`;
    }).join("");
  };

  g.ART = { W, H, C, frame, bg, narrator, caveman, hiker, club, bigBranch, arrow, bow, iceBlock, tv, photo, menu, line };
})(window);
