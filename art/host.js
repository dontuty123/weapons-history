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

  function host({ x = 640, y = 690, s = 1, pose = "lecture", face: fname, costume = "none", flip = false } = {}) {
    const p = POSE[pose] || POSE.lecture;
    const body = `
      <path d="M-20 -176 L-26 -26 M20 -176 L28 -26" ${L8}/>
      <path d="M-62 -6 L-58 -34 L-8 -34 L-4 -6Z" fill="${C.shoe}" ${L6}/><path d="M-62 -6 H-4" ${ln(8, C.sole)}/><path d="M66 -6 L62 -34 L12 -34 L8 -6Z" fill="${C.shoe}" ${L6}/><path d="M66 -6 H8" ${ln(8, C.sole)}/>
      <path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="${C.shirt}" ${L8}/><path d="M30 -306 L44 -172 L62 -172 L50 -306Z" fill="${C.shirtDark}"/><path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="none" ${L8}/><path d="M-62 -196 H62" ${ln(4, C.shirtDark)}/>
      <path d="${p.arms}" fill="none" ${L8}/>${p.hands}`;
    const scarf = `<path d="M-62 -330 L62 -330 L60 -298 L-60 -298Z" fill="${C.scarf}" ${L6}/><path d="M-44 -300 L-70 -226 L-46 -222 L-26 -298Z" fill="${C.scarf}" ${L6}/><path d="M-36 -296 L-54 -240" ${ln(3, C.scarfDark)}/><path d="M-30 -326 V-302 M10 -326 V-302" ${ln(3, C.scarfDark)}/>`;
    const head = `
      <path d="M-94 -450 L-118 -440 L-112 -404 L-94 -398Z" fill="${C.skin}" ${L6}/><path d="M98 -456 L122 -446 L116 -410 L97 -402Z" fill="${C.skin}" ${L6}/>
      <path d="${HEAD}" fill="${C.skin}" ${L8}/>
      ${face(fname || p.face)}
      <path d="${HAIR}" fill="${C.hair}" ${L8}/><path d="M-80 -520 L-40 -566 L30 -578" fill="none" ${ln(7, C.hairHi)}/><path d="M-96 -420 L-90 -500" fill="none" ${ln(5, C.hairDark)}/>
      ${COSTUME[costume]}`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}${scarf}${head}${p.front || ""}</g>`;
  }
  g.HOST = { host, POSE: Object.keys(POSE), EX: Object.keys(EX), C };
})(window);
