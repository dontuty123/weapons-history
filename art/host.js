// Channel host v3 ("Remy"): built on the principles learned from the reference host, with an original design.
// Principles: one saturated signature colour block, a head silhouette readable at thumbnail size, one accessory
// present in every shot, a minimal face, a small reusable pose library, costume swaps that keep the silhouette.
(function (g) {
  const INK = "#1b1b1f";
  const ln = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const L8 = ln(8), L6 = ln(6), L5 = ln(5);
  const C = { skin: "#fde7dc", hair: "#12b5ad", hairDark: "#0b8a84", hairHi: "#6fe0d8", shirt: "#f2433a", shirtDark: "#c92e27", scarf: "#ffc93c", scarfDark: "#d9a21c", shoe: "#1b1b1f", sole: "#ffffff", mouth: "#c0303a", blush: "#f7a9a0" };

  // head: tall rounded slab, flat-ish jaw (original silhouette)
  const HEAD = "M-94 -540 L84 -556 L100 -470 L96 -372 L56 -320 L-58 -320 L-96 -370 Z";
  // hair: one solid teal block with a swoop fringe falling to the viewer's left
  const HAIR = "M-104 -392 L-112 -520 L-74 -578 L6 -598 L84 -584 L134 -606 L114 -552 L136 -526 L102 -508 L100 -470 L62 -500 L14 -488 L-34 -474 L-64 -436 Z";

  const EX = {
    lecture: { eye: "closed", brow: "up", mouth: "talk" },
    neutral: { eye: "dot", brow: "flat", mouth: "small" },
    deadpan: { eye: "half", brow: "flat", mouth: "flat" },
    smug: { eye: "half", brow: "up", mouth: "smirk" },
    happy: { eye: "happy", brow: "up", mouth: "open" },
    shock: { eye: "wide", brow: "high", mouth: "o" },
    worried: { eye: "dot", brow: "worried", mouth: "wobble" },
  };
  function face(name) {
    const e = EX[name] || EX.neutral, ey = -420, my = -362, dx = 36;
    const eye = x => ({
      closed: `<path d="M${x - 15} ${ey} q15 11 30 0" fill="none" ${L6}/>`,
      happy: `<path d="M${x - 15} ${ey + 5} q15 -15 30 0" fill="none" ${L6}/>`,
      half: `<path d="M${x - 16} ${ey - 2} h32" ${L6}/><path d="M${x - 9} ${ey - 2} a9 9 0 0 0 18 0Z" fill="${INK}"/>`,
      wide: `<circle cx="${x}" cy="${ey}" r="15" fill="#fff" ${L5}/><circle cx="${x}" cy="${ey + 1}" r="6" fill="${INK}"/>`,
      dot: `<circle cx="${x}" cy="${ey}" r="8" fill="${INK}"/>`,
    }[e.eye]);
    const brow = (x, s) => {
      const t = { up: [-4, 4], flat: [0, 0], high: [-14, -14], worried: [6, -8] }[e.brow] || [0, 0];
      const inner = s < 0 ? t[0] : t[0], outer = t[1];
      const yo = ey - 36 + (s < 0 ? outer : inner), yi = ey - 36 + (s < 0 ? inner : outer), xo = x - 18 * s * -1, xi = x + 16 * s * -1;
      return `<path d="M${xo} ${yo} L${xi} ${yi} L${xi} ${yi + 8} L${xo} ${yo + 4}Z" fill="${INK}" ${ln(3)}/>`;
    };
    const mouth = {
      talk: `<path d="M-14 ${my - 7} L14 ${my - 7} L6 ${my + 13} L-6 ${my + 13}Z" fill="${C.mouth}" ${L5}/>`,
      small: `<path d="M-8 ${my} q8 5 16 0" fill="none" ${L5}/>`,
      flat: `<path d="M-12 ${my} h24" ${L6}/>`,
      smirk: `<path d="M-14 ${my + 3} Q4 ${my + 7} 18 ${my - 6}" fill="none" ${L6}/>`,
      open: `<path d="M-22 ${my - 6} H22 L10 ${my + 18} H-10Z" fill="${C.mouth}" ${L5}/><path d="M-18 ${my - 4} H18 V${my + 2} H-18Z" fill="#fff"/>`,
      o: `<ellipse cx="0" cy="${my + 2}" rx="10" ry="14" fill="${C.mouth}" ${L5}/>`,
      wobble: `<path d="M-16 ${my + 2} q4 -6 8 0 q4 6 8 0 q4 -6 8 0" fill="none" ${L5}/>`,
    }[e.mouth];
    return brow(-dx, -1) + brow(dx, 1) + eye(-dx) + eye(dx) + mouth +
      `<path d="M-72 ${my - 10} l10 -12 M-60 ${my - 10} l10 -12 M50 ${my - 10} l10 -12 M62 ${my - 10} l10 -12" ${ln(4, C.blush)}/>`;
  }

  // hands
  const fist = (x, y) => `<circle cx="${x}" cy="${y}" r="16" fill="${C.skin}" ${L6}/>`;
  const finger = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-6" y="-44" width="12" height="34" rx="6" fill="${C.skin}" ${L5}/><circle r="16" fill="${C.skin}" ${L6}/></g>`;
  const palm = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-18 -4 Q-20 -20 -8 -22 L-4 -34 Q2 -40 6 -32 L8 -22 Q20 -22 20 -6 Q18 12 0 12 Q-18 12 -18 -4Z" fill="${C.skin}" ${L6}/></g>`;
  const okHand = (x, y) => `<g transform="translate(${x} ${y})"><circle r="16" fill="${C.skin}" ${L6}/><circle cx="-2" cy="-20" r="9" fill="#fff" ${L5}/><path d="M8 -12 l10 -22 M14 -6 l16 -18" ${L5}/></g>`;

  // pose library: arms drawn as single stick strokes (genre convention), hands as listed
  const SH = [-48, -292], SR = [48, -292];
  const POSE = {
    lecture: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q104 -300 112 -380`, hands: fist(-66, -168) + finger(114, -392, 6), face: "lecture" },
    present: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q110 -258 170 -270`, hands: fist(-66, -168) + palm(186, -276, 78), face: "neutral" },
    shrug: { arms: `M${SH} Q-120 -250 -142 -300 M${SR} Q120 -250 142 -300`, hands: palm(-150, -312, -16) + palm(150, -312, 16), face: "deadpan" },
    chest: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q90 -220 20 -238`, hands: fist(-66, -168) + palm(10, -246, -70), face: "smug" },
    cross: { arms: `M${SH} Q-70 -240 30 -236 M${SR} Q70 -220 -30 -214`, hands: fist(38, -238) + fist(-38, -214), face: "deadpan" },
    ok: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q110 -290 108 -350`, hands: fist(-66, -168) + okHand(108, -362), face: "happy" },
    shock: { arms: `M${SH} Q-120 -330 -128 -420 M${SR} Q120 -330 128 -420`, hands: palm(-130, -432, -10) + palm(130, -432, 10), face: "shock" },
    read: { arms: `M${SH} Q-80 -250 -40 -262 M${SR} Q80 -250 40 -262`, hands: "", face: "neutral", front: `<g><path d="M-70 -300 L0 -290 L70 -300 L70 -220 L0 -210 L-70 -220Z" fill="#3c6fb0" ${L6}/><path d="M0 -290 V-210" ${L5}/></g>` + fist(-60, -262) + fist(60, -262) },
  };

  // costume swaps keep the silhouette: extra layers drawn over the base
  const COSTUME = {
    none: "",
    scholar: `<circle cx="-36" cy="-420" r="24" fill="#ffffff33" ${L5}/><circle cx="36" cy="-420" r="24" fill="#ffffff33" ${L5}/><path d="M-12 -422 h24" ${L5}/>`,
    knight: `<path d="M-104 -430 C-108 -560 -50 -596 0 -596 C50 -596 108 -560 104 -430 L104 -380 L60 -380 L60 -450 L-60 -450 L-60 -380 L-104 -380Z" fill="#a9b1bb" ${L8}/><path d="M0 -596 V-450" ${L5}/><path d="M-6 -600 q-30 -40 -10 -70 q40 10 30 70Z" fill="${C.scarf}" ${L6}/>`,
  };

  const HAIRS = {
    swept: { name: "Vuốt chéo ra sau", c: "#12b5ad", d: "M-104 -392 L-112 -520 L-74 -578 L6 -598 L84 -584 L134 -606 L114 -552 L136 -526 L102 -508 L100 -470 L62 -500 L14 -488 L-34 -474 L-64 -436 Z", hi: "M-80 -520 L-40 -566 L30 -578", strands: "M-40 -560 L70 -540 M-20 -520 L90 -520 M-90 -470 L-60 -540" },
    flattop: { name: "Đầu đinh vuông", c: "#2b2d6e", d: "M-100 -470 L-102 -582 L96 -598 L104 -480 L84 -498 L70 -484 L52 -500 L30 -486 L8 -502 L-14 -488 L-36 -502 L-58 -486 L-80 -498 Z", hi: "M-80 -572 L70 -584", strands: "M-60 -580 L-62 -510 M-20 -584 L-22 -514 M20 -588 L18 -516 M60 -590 L58 -510", extra: '<path d="M-98 -470 L-96 -420 M100 -480 L98 -430" stroke="#2b2d6e" stroke-width="10" stroke-linecap="round" opacity=".45"/>' },
    blunt: { name: "Mái bằng cắt thẳng", c: "#e8452f", d: "M-108 -380 L-112 -540 L-70 -590 L60 -600 L110 -560 L114 -390 L96 -390 L94 -470 L76 -456 L60 -474 L40 -458 L20 -476 L0 -458 L-20 -474 L-40 -456 L-60 -472 L-80 -456 L-92 -462 L-94 -380 Z", hi: "M-70 -570 L40 -582", strands: "M-104 -500 L-100 -400 M104 -500 L106 -400 M-40 -580 L-46 -480 M20 -584 L16 -482" },
    topknot: { name: "Búi tó trên đỉnh", c: "#1f1a24", d: "M-104 -440 L-108 -540 L-60 -576 L70 -586 L106 -548 L104 -460 L70 -506 L-20 -500 L-70 -470 Z", hi: "M-60 -556 L40 -566", strands: "M-80 -500 L-40 -560 M80 -500 L40 -566 M0 -580 L0 -510", top: '<path d="M-30 -580 L-36 -640 L-4 -666 L30 -650 L34 -588Z" fill="#1f1a24" stroke="#1b1b1f" stroke-width="8" stroke-linejoin="round"/><path d="M-34 -592 H32" stroke="#ffc93c" stroke-width="10"/>' },
    visor: { name: "Mái nhọn chĩa trước", c: "#7a3fd1", d: "M-104 -430 L-106 -540 L-50 -586 L60 -590 L100 -548 L156 -512 L110 -508 L132 -486 L70 -494 L80 -474 L20 -484 L-10 -466 L-40 -478 L-60 -452 Z", hi: "M-40 -566 L60 -568 L110 -530", strands: "M-30 -580 L40 -500 M20 -588 L90 -514 M-70 -556 L-20 -488" },
  };
  const OUTFITS = {
    tee: { name: "Áo thun đỏ + khăn vàng", body: "#f2433a", dark: "#c92e27",
      neck: '<path d="M-62 -330 L62 -330 L60 -298 L-60 -298Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/><path d="M-44 -300 L-70 -226 L-46 -222 L-26 -298Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/>' },
    varsity: { name: "Áo khoác bóng chày", body: "#1e3a8a", dark: "#162c69",
      detail: '<path d="M0 -306 V-172" stroke="#f2f2f2" stroke-width="6"/><path d="M-60 -186 H60" stroke="#ffc93c" stroke-width="10"/><path d="M-36 -270 L-20 -270 L-28 -250Z" fill="#ffc93c"/><text x="-44" y="-226" font-family="Arial Black, Arial" font-size="38" font-weight="900" fill="#ffc93c">R</text>',
      neck: '<path d="M-50 -316 L0 -290 L50 -316 L50 -300 L0 -276 L-50 -300Z" fill="#ffc93c" stroke="#1b1b1f" stroke-width="5" stroke-linejoin="round"/>' },
    hoodie: { name: "Hoodie tím + dây", body: "#8b3fd9", dark: "#6c2db0",
      detail: '<path d="M-40 -230 H40 L34 -190 H-34Z" fill="#6c2db0" stroke="#1b1b1f" stroke-width="4" stroke-linejoin="round"/>',
      neck: '<path d="M-70 -306 L-60 -344 L60 -344 L70 -306 L30 -294 L-30 -294Z" fill="#6c2db0" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/><path d="M-16 -296 V-246 M16 -296 V-246" stroke="#f2f2f2" stroke-width="5" stroke-linecap="round"/>' },
    bomber: { name: "Bomber xanh lá + cổ cam", body: "#2f9e57", dark: "#237a43",
      detail: '<path d="M0 -306 V-172" stroke="#1b1b1f" stroke-width="4"/><path d="M-66 -186 H66 V-170 H-66Z" fill="#ff7a29" stroke="#1b1b1f" stroke-width="4"/>',
      neck: '<path d="M-56 -330 L56 -330 L50 -304 L0 -292 L-50 -304Z" fill="#ff7a29" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/>' },
    vest: { name: "Gilê thám hiểm + khăn đỏ", body: "#ffffff", dark: "#e6e6e6",
      detail: '<path d="M-56 -306 L-66 -170 L-18 -170 L-22 -306Z M56 -306 L66 -170 L18 -170 L22 -306Z" fill="#e0a43a" stroke="#1b1b1f" stroke-width="5" stroke-linejoin="round"/><rect x="-60" y="-236" width="30" height="24" fill="#c98a24" stroke="#1b1b1f" stroke-width="4"/><rect x="30" y="-236" width="30" height="24" fill="#c98a24" stroke="#1b1b1f" stroke-width="4"/>',
      neck: '<path d="M-40 -320 L40 -320 L0 -270Z" fill="#e33b2f" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/>' },
  };

  function host({ x = 640, y = 690, s = 1, pose = "lecture", face: fname, costume = "none", flip = false, hair = "swept", outfit = "tee" } = {}) {
    const H = HAIRS[hair] || HAIRS.swept, O = OUTFITS[outfit] || OUTFITS.tee;
    const p = POSE[pose] || POSE.lecture;
    const body = `
      <path d="M-20 -176 L-26 -26 M20 -176 L28 -26" ${L8}/>
      <path d="M-62 -6 L-58 -34 L-8 -34 L-4 -6Z" fill="${C.shoe}" ${L6}/><path d="M-62 -6 H-4" ${ln(8, C.sole)}/><path d="M66 -6 L62 -34 L12 -34 L8 -6Z" fill="${C.shoe}" ${L6}/><path d="M66 -6 H8" ${ln(8, C.sole)}/>
      <path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="${O.body}" ${L8}/><path d="M30 -306 L44 -172 L62 -172 L50 -306Z" fill="${O.dark}"/>${O.detail || ""}<path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="none" ${L8}/>
      <path d="${p.arms}" fill="none" ${L8}/>${p.hands}`;
    const scarf = O.neck;
    const head = `
      <path d="M-94 -450 L-118 -440 L-112 -404 L-94 -398Z" fill="${C.skin}" ${L6}/><path d="M98 -456 L122 -446 L116 -410 L97 -402Z" fill="${C.skin}" ${L6}/>
      <path d="${HEAD}" fill="${C.skin}" ${L8}/>
      ${face(fname || p.face)}
      ${H.top || ""}<path d="${H.d}" fill="${H.c}" ${L8}/>${H.strands ? `<path d="${H.strands}" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="5" stroke-linecap="round"/>` : ""}${H.extra || ""}<path d="${H.hi}" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${COSTUME[costume]}`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}${scarf}${head}${p.front || ""}</g>`;
  }
  g.HOST = { host, POSE: Object.keys(POSE), EX: Object.keys(EX), C, HAIRS, OUTFITS };
})(window);
