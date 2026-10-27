// Channel host v3 ("Remy"): built on the principles learned from the reference host, with an original design.
// Principles: one saturated signature colour block, a head silhouette readable at thumbnail size, one accessory
// present in every shot, a minimal face, a small reusable pose library, costume swaps that keep the silhouette.
(function (g) {
  const INK = "#1b1b1f";
  const ln = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const L8 = ln(8), L6 = ln(6), L5 = ln(5);
  const C = { skin: "#fde7dc", hair: "#14a3a0", hairDark: "#0f8784", shirt: "#f6eedb", scarf: "#e2483d", scarfDark: "#b83228", shoe: "#2f3140", mouth: "#c0303a", blush: "#f5b2a8" };

  // head: tall rounded slab, flat-ish jaw (original silhouette)
  const HEAD = "M-92 -470 C-92 -548 -50 -566 0 -566 C52 -566 94 -548 94 -470 L92 -370 C92 -330 66 -318 0 -318 C-66 -318 -92 -330 -92 -370Z";
  // hair: one solid teal block with a swoop fringe falling to the viewer's left
  const HAIR = "M-100 -440 C-112 -540 -60 -584 10 -582 C80 -580 110 -540 102 -462 C96 -486 80 -494 62 -490 L48 -470 L34 -494 L14 -468 L-2 -490 L-22 -460 L-40 -478 C-56 -452 -68 -424 -76 -392 C-90 -404 -98 -420 -100 -440Z";

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
      return `<path d="M${x - 14 * s * -1} ${ey - 34 + (s < 0 ? outer : inner)} L${x + 14 * s * -1} ${ey - 34 + (s < 0 ? inner : outer)}" ${ln(6)}/>`;
    };
    const mouth = {
      talk: `<path d="M-11 ${my - 7} Q0 ${my - 11} 11 ${my - 7} Q12 ${my + 12} 0 ${my + 13} Q-12 ${my + 12} -11 ${my - 7}Z" fill="${C.mouth}" ${L5}/>`,
      small: `<path d="M-8 ${my} q8 5 16 0" fill="none" ${L5}/>`,
      flat: `<path d="M-12 ${my} h24" ${L6}/>`,
      smirk: `<path d="M-14 ${my + 3} Q4 ${my + 7} 18 ${my - 6}" fill="none" ${L6}/>`,
      open: `<path d="M-20 ${my - 6} H20 Q16 ${my + 18} 0 ${my + 18} Q-16 ${my + 18} -20 ${my - 6}Z" fill="${C.mouth}" ${L5}/>`,
      o: `<ellipse cx="0" cy="${my + 2}" rx="10" ry="14" fill="${C.mouth}" ${L5}/>`,
      wobble: `<path d="M-16 ${my + 2} q4 -6 8 0 q4 6 8 0 q4 -6 8 0" fill="none" ${L5}/>`,
    }[e.mouth];
    return brow(-dx, -1) + brow(dx, 1) + eye(-dx) + eye(dx) + mouth +
      `<ellipse cx="-58" cy="${my - 14}" rx="13" ry="7" fill="${C.blush}" opacity=".75"/><ellipse cx="58" cy="${my - 14}" rx="13" ry="7" fill="${C.blush}" opacity=".75"/>`;
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
      <path d="M-58 -14 Q-60 -36 -30 -36 Q-6 -36 -4 -16 Q-4 0 -30 0 Q-56 0 -58 -14Z" fill="${C.shoe}" ${L6}/><path d="M62 -14 Q64 -36 34 -36 Q10 -36 8 -16 Q8 0 34 0 Q60 0 62 -14Z" fill="${C.shoe}" ${L6}/>
      <path d="M-50 -304 L-62 -170 L62 -170 L50 -304 Q0 -318 -50 -304Z" fill="${C.shirt}" ${L8}/>
      <path d="${p.arms}" fill="none" ${L8}/>${p.hands}`;
    const scarf = `<path d="M-60 -326 Q0 -300 60 -326 L58 -298 Q0 -272 -58 -298Z" fill="${C.scarf}" ${L6}/>
      <path d="M-40 -302 L-62 -236 L-36 -230 L-24 -296Z" fill="${C.scarf}" ${L6}/><path d="M-30 -296 L-40 -250" ${ln(3, C.scarfDark)}/>`;
    const head = `
      <path d="M-92 -446 a14 20 0 1 0 2 40" fill="${C.skin}" ${L6}/><path d="M94 -446 a14 20 0 1 1 -2 40" fill="${C.skin}" ${L6}/>
      <path d="${HEAD}" fill="${C.skin}" ${L8}/>
      ${face(fname || p.face)}
      <path d="${HAIR}" fill="${C.hair}" ${L8}/><path d="M-50 -540 Q10 -572 70 -540" fill="none" ${ln(5, C.hairDark)}/><path d="M-70 -500 Q-60 -540 -20 -556" fill="none" ${ln(7, "#5fd0cc")}/>
      ${COSTUME[costume]}`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}${scarf}${head}${p.front || ""}</g>`;
  }
  g.HOST = { host, POSE: Object.keys(POSE), EX: Object.keys(EX), C };
})(window);
