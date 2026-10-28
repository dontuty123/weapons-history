// Channel host v3 ("Remy"): built on the principles learned from the reference host, with an original design.
// Principles: one saturated signature colour block, a head silhouette readable at thumbnail size, one accessory
// present in every shot, a minimal face, a small reusable pose library, costume swaps that keep the silhouette.
(function (g) {
  const INK = "#1b1b1f";
  const ln = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const L8 = ln(8), L6 = ln(6), L5 = ln(5);
  const C = { skin: "#fdeee4", hair: "#12b5ad", hairDark: "#0b8a84", hairHi: "#6fe0d8", shirt: "#f2433a", shirtDark: "#c92e27", scarf: "#ffc93c", scarfDark: "#d9a21c", shoe: "#1b1b1f", sole: "#ffffff", mouth: "#c0303a", blush: "#f7a9a0" };

  // head: tall rounded slab, flat-ish jaw (original silhouette)
  const HEADS = {
    mochi:   { name: "V mềm (má đầy, cằm nhỏ tròn) — chuẩn", d: "M-94 -492 C-96 -546 -60 -568 -8 -570 C50 -572 96 -550 100 -494 C104 -430 98 -392 70 -360 C46 -334 22 -318 0 -318 C-22 -318 -48 -334 -70 -360 C-98 -392 -100 -430 -94 -492 Z" },
    chamfer: { name: "Mặt dài, cằm vát hai góc", sharp: true, d: "M-90 -500 C-90 -552 -56 -570 0 -570 C56 -570 92 -552 92 -500 L92 -374 L54 -314 L-52 -314 L-90 -374 Z" },
    block:   { name: "Mặt dài, cằm vuông phẳng", sharp: true, d: "M-90 -500 C-90 -552 -56 -570 0 -570 C56 -570 92 -552 92 -500 L92 -338 L72 -314 L-70 -314 L-90 -338 Z" },
    taper:   { name: "Mặt dài thon dần, cằm hẹp phẳng", sharp: true, d: "M-96 -500 C-96 -552 -58 -570 0 -570 C58 -570 98 -552 98 -500 L86 -366 L40 -314 L-38 -314 L-84 -366 Z" },
    box:     { name: "Đầu hộp bo góc, không tai (theo ảnh photoshop)", noEars: true, d: "M-98 -536 Q-98 -574 -62 -574 H64 Q100 -574 100 -536 L94 -364 Q92 -318 50 -318 H-48 Q-90 -318 -92 -364 Z" },
    cheek:   { name: "Mặt dài, gò má gãy cao", sharp: true, d: "M-90 -500 C-90 -552 -56 -570 0 -570 C56 -570 92 -552 92 -500 L92 -414 L62 -318 L-60 -318 L-90 -414 Z" },
  };
  const HEAD = HEADS.mochi.d;
  // hair: one solid teal block with a swoop fringe falling to the viewer's left
  const HAIR = "M-104 -392 L-112 -520 L-74 -578 L6 -598 L84 -584 L134 -606 L114 -552 L136 -526 L102 -508 L100 -470 L62 -500 L14 -488 L-34 -474 L-64 -436 Z";

  const EX = {
    smart: { eye: "half", brow: "cocky", mouth: "smirkTalk" },
    sly: { eye: "halfSide", brow: "cocky", mouth: "smirk" },
    confident: { eye: "half", brow: "up", mouth: "grinSide" },
    scheming: { eye: "halfSide", brow: "angry", mouth: "grinSide" },
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
      almond: `<path d="M${x - 18} ${ey + 1} Q${x} ${ey - 13} ${x + 18} ${ey - 2} Q${x} ${ey + 10} ${x - 18} ${ey + 1}Z" fill="#fff" ${ln(4)}/><circle cx="${x + 3}" cy="${ey - 1}" r="7.5" fill="${INK}"/><circle cx="${x + 5.5}" cy="${ey - 4}" r="2.6" fill="#fff"/><path d="M${x - 21} ${ey + 1} Q${x} ${ey - 16} ${x + 21} ${ey - 3}" fill="none" ${ln(7)}/>`,
      sly: `<path d="M${x - 18} ${ey - 1} Q${x} ${ey - 6} ${x + 18} ${ey - 3} Q${x} ${ey + 8} ${x - 18} ${ey - 1}Z" fill="#fff" ${ln(4)}/><circle cx="${x + 8}" cy="${ey + 1}" r="6" fill="${INK}"/><path d="M${x - 21} ${ey - 1} Q${x} ${ey - 9} ${x + 21} ${ey - 4}" fill="none" ${ln(8)}/>`,
      halfSide: `<path d="M${x - 16} ${ey - 2} h32" ${L6}/><path d="M${x - 1} ${ey - 2} a9 9 0 0 0 18 0Z" fill="${INK}"/>`,
      half: `<path d="M${x - 16} ${ey - 2} h32" ${L6}/><path d="M${x - 9} ${ey - 2} a9 9 0 0 0 18 0Z" fill="${INK}"/>`,
      wide: `<circle cx="${x}" cy="${ey}" r="15" fill="#fff" ${L5}/><circle cx="${x}" cy="${ey + 1}" r="6" fill="${INK}"/>`,
      dot: `<circle cx="${x}" cy="${ey}" r="8" fill="${INK}"/>`,
    }[e.eye]);
    const brow = (x, s) => {
      const t = e.brow === "cocky" ? (s > 0 ? [-14, -6] : [5, 1]) : ({ up: [-4, 4], flat: [0, 0], high: [-14, -14], worried: [6, -8], angry: [8, -4] }[e.brow] || [0, 0]);
      const inner = s < 0 ? t[0] : t[0], outer = t[1];
      const yo = ey - 36 + (s < 0 ? outer : inner), yi = ey - 36 + (s < 0 ? inner : outer), xo = x - 20 * s * -1, xi = x + 16 * s * -1, xm = (xo + xi) / 2, ym = Math.min(yo, yi) - 7;
      return `<path d="M${xi} ${yi + 4} Q${xm} ${ym} ${xo} ${yo} Q${xm} ${ym + 9} ${xi} ${yi + 4}Z" fill="${INK}" ${ln(4)}/>`;
    };
    const mouth = {
      talk: `<path d="M-13 ${my - 7} Q0 ${my - 10} 13 ${my - 7} Q11 ${my + 13} 0 ${my + 14} Q-11 ${my + 13} -13 ${my - 7}Z" fill="${C.mouth}" ${L5}/>`,
      small: `<path d="M-8 ${my} q8 5 16 0" fill="none" ${L5}/>`,
      flat: `<path d="M-12 ${my} h24" ${L6}/>`,
      smirk: `<path d="M-14 ${my + 3} Q4 ${my + 7} 18 ${my - 6}" fill="none" ${L6}/>`,
      smirkTalk: `<path d="M-14 ${my - 3} Q4 ${my - 7} 20 ${my - 12} Q17 ${my + 10} 3 ${my + 11} Q-11 ${my + 9} -14 ${my - 3}Z" fill="${C.mouth}" ${L5}/>`,
      grinSide: `<path d="M-20 ${my - 2} Q2 ${my + 2} 24 ${my - 12} Q20 ${my + 14} 2 ${my + 14} Q-14 ${my + 12} -20 ${my - 2}Z" fill="${C.mouth}" ${L5}/><path d="M-16 ${my} Q4 ${my + 2} 21 ${my - 9} L20 ${my - 3} Q4 ${my + 6} -15 ${my + 4}Z" fill="#fff"/>`,
      open: `<path d="M-20 ${my - 6} Q0 ${my - 9} 20 ${my - 6} Q16 ${my + 20} 0 ${my + 20} Q-16 ${my + 20} -20 ${my - 6}Z" fill="${C.mouth}" ${L5}/>`,
      o: `<ellipse cx="0" cy="${my + 2}" rx="10" ry="14" fill="${C.mouth}" ${L5}/>`,
      wobble: `<path d="M-16 ${my + 2} q4 -6 8 0 q4 6 8 0 q4 -6 8 0" fill="none" ${L5}/>`,
    }[e.mouth];
    return brow(-dx, -1) + brow(dx, 1) + eye(-dx) + eye(dx) + mouth +
      `<ellipse cx="-58" cy="${my - 12}" rx="10" ry="5" fill="${C.blush}" opacity=".5"/><ellipse cx="60" cy="${my - 12}" rx="10" ry="5" fill="${C.blush}" opacity=".5"/>`;
  }

  // hands
  const fist = (x, y) => `<circle cx="${x}" cy="${y}" r="16" fill="${C.skin}" ${L6}/>`;
  const finger = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-6" y="-44" width="12" height="34" rx="6" fill="${C.skin}" ${L5}/><circle r="16" fill="${C.skin}" ${L6}/></g>`;
  const palm = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-18 -4 Q-20 -20 -8 -22 L-4 -34 Q2 -40 6 -32 L8 -22 Q20 -22 20 -6 Q18 12 0 12 Q-18 12 -18 -4Z" fill="${C.skin}" ${L6}/></g>`;
  const okHand = (x, y) => `<g transform="translate(${x} ${y})"><circle r="16" fill="${C.skin}" ${L6}/><circle cx="-2" cy="-20" r="9" fill="#fff" ${L5}/><path d="M8 -12 l10 -22 M14 -6 l16 -18" ${L5}/></g>`;

  // pose library: arms drawn as single stick strokes (genre convention), hands as listed
  const SH = [-48, -292], SR = [48, -292];
  const POSE = {
    lecture: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q104 -300 112 -380`, hands: fist(-66, -168) + finger(114, -392, 6), face: "smart" },
    present: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q110 -258 170 -270`, hands: fist(-66, -168) + palm(186, -276, 78), face: "confident" },
    shrug: { arms: `M${SH} Q-120 -250 -142 -300 M${SR} Q120 -250 142 -300`, hands: palm(-150, -312, -16) + palm(150, -312, 16), face: "deadpan" },
    chest: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q90 -220 20 -238`, hands: fist(-66, -168) + palm(10, -246, -70), face: "sly" },
    cross: { arms: `M${SH} Q-70 -240 30 -236 M${SR} Q70 -220 -30 -214`, hands: fist(38, -238) + fist(-38, -214), face: "deadpan" },
    ok: { arms: `M${SH} Q-74 -230 -66 -176 M${SR} Q110 -290 108 -350`, hands: fist(-66, -168) + okHand(108, -362), face: "confident" },
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
    spiky: { name: "Dựng nhọn ngả sau (theo ảnh photoshop)", d: "M-98 -440 L-100 -500 L-124 -514 L-102 -542 L-122 -604 L-76 -594 L-86 -652 L-32 -614 L-24 -664 L18 -614 L42 -654 L62 -604 L102 -622 L102 -562 L104 -504 L72 -520 L46 -494 L16 -520 L-16 -496 L-46 -520 L-74 -498 L-92 -514 Z", hi: "M-82 -590 L-62 -552 M-26 -640 L-12 -588 M34 -632 L26 -590", strands: "M-104 -540 L-80 -526 M60 -600 L56 -560 M90 -580 L84 -540" },
    texcrop: { name: "Textured crop vuốt rối + fade hai bên", natural: true, c: "#211c22", d: "M-90 -502 C-96 -540 -88 -566 -72 -578 L-80 -592 L-62 -590 L-66 -608 L-42 -598 L-38 -618 L-18 -602 L-12 -622 L6 -604 L14 -624 L30 -602 L42 -616 L52 -596 L70 -604 L72 -586 L94 -582 C100 -560 98 -530 92 -504 C74 -514 48 -520 20 -518 L8 -530 L-4 -516 C-36 -518 -66 -512 -90 -502 Z", hi: "M-40 -596 C-10 -606 20 -606 50 -596", strands: "M-48 -590 L-38 -560 M-14 -604 L-8 -566 M20 -606 L16 -566 M50 -596 L42 -560 M-66 -560 L-56 -530", extra: '<path d="M-98 -504 C-102 -470 -100 -440 -96 -414 L-86 -416 C-88 -446 -88 -476 -86 -508 Z M100 -506 C104 -472 102 -442 98 -416 L88 -418 C90 -448 90 -478 88 -510 Z" fill="HAIRC" opacity=".16"/><g fill="HAIRC" opacity=".35"><circle cx="-94" cy="-490" r="2.2"/><circle cx="-92" cy="-470" r="2.2"/><circle cx="-95" cy="-452" r="2.2"/><circle cx="-90" cy="-436" r="2.2"/><circle cx="94" cy="-490" r="2.2"/><circle cx="92" cy="-470" r="2.2"/><circle cx="95" cy="-452" r="2.2"/><circle cx="90" cy="-436" r="2.2"/></g>' },
    brushup: { name: "Brush-up mượt (vuốt dựng)", c: "#d6336c", d: "M-98 -478 C-104 -540 -84 -566 -60 -576 C-62 -620 -30 -650 10 -646 C50 -644 90 -626 100 -590 C106 -560 104 -520 100 -482 C80 -500 44 -516 6 -522 C-30 -520 -70 -504 -98 -478 Z", hi: "M-36 -626 C0 -640 40 -636 70 -618", strands: "M-50 -560 C-40 -600 -10 -630 30 -636 M-20 -530 C0 -580 40 -610 84 -606 M20 -524 C40 -560 70 -580 98 -574" },
    brushupTex: { name: "Brush-up tỉa lọn", c: "#d6336c", d: "M-98 -478 C-104 -540 -84 -566 -64 -574 C-74 -604 -60 -628 -36 -630 C-30 -656 0 -666 18 -650 C34 -672 70 -668 76 -644 C98 -650 116 -628 104 -604 C110 -570 106 -520 100 -482 C80 -500 44 -516 6 -522 C-30 -520 -70 -504 -98 -478 Z", hi: "M-20 -640 C0 -656 20 -658 34 -650", strands: "M-56 -570 C-50 -596 -44 -614 -36 -628 M-10 -560 C0 -600 8 -630 16 -648 M30 -556 C46 -590 60 -620 74 -642 M60 -548 C80 -570 96 -590 104 -604" },
    brushupShave: { name: "Brush-up cạo hai bên", c: "#d6336c", d: "M-98 -478 C-104 -540 -84 -566 -64 -574 C-74 -604 -60 -628 -36 -630 C-30 -656 0 -666 18 -650 C34 -672 70 -668 76 -644 C98 -650 116 -628 104 -604 C110 -570 106 -520 100 -482 C80 -500 44 -516 6 -522 C-30 -520 -70 -504 -98 -478 Z", hi: "M-20 -640 C0 -656 20 -658 34 -650", strands: "M-56 -570 C-50 -596 -44 -614 -36 -628 M-10 -560 C0 -600 8 -630 16 -648 M30 -556 C46 -590 60 -620 74 -642 M60 -548 C80 -570 96 -590 104 -604", extra: '<path d="M-98 -476 L-96 -414 M100 -478 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    blade: { name: "Mái cắt chéo sắc", c: "#d6336c", d: "M-104 -446 C-114 -536 -70 -592 -4 -594 C66 -596 110 -552 104 -506 Z", hi: "M-50 -570 C-10 -588 40 -586 74 -566", strands: "M-60 -560 C-64 -520 -66 -490 -70 -470 M10 -580 C8 -540 6 -510 4 -484" },
    hook: { name: "Mái lượn móc nhọn", c: "#d6336c", d: "M-100 -470 C-110 -546 -66 -592 0 -594 C66 -596 108 -552 102 -490 C80 -500 40 -506 0 -500 C-40 -494 -70 -480 -86 -460 C-96 -448 -102 -440 -112 -444 C-104 -452 -102 -462 -100 -470 Z", hi: "M-40 -574 C0 -590 40 -586 70 -568", strands: "M60 -560 C30 -540 -10 -526 -50 -500" },
    wedge: { name: "Lệch dài một bên", c: "#d6336c", d: "M-112 -400 L-104 -500 C-96 -560 -56 -592 0 -594 C64 -596 104 -556 100 -490 L96 -478 C60 -492 10 -496 -30 -490 C-60 -484 -82 -466 -92 -444 Z", hi: "M-30 -576 C10 -590 50 -584 76 -566", strands: "M40 -570 C0 -540 -50 -500 -96 -430" },
    fin: { name: "Mào cong hất sau", c: "#d6336c", d: "M-98 -480 C-104 -548 -66 -588 0 -592 C40 -594 70 -588 88 -574 C110 -590 136 -592 150 -584 C128 -572 112 -556 104 -536 C104 -516 102 -498 100 -482 C80 -500 40 -510 0 -510 C-40 -510 -78 -500 -98 -480 Z", hi: "M-40 -572 C0 -586 50 -586 90 -576", strands: "M-60 -540 C-20 -560 40 -566 100 -560" },
    flick: { name: "Rẽ giữa, đuôi hất nhọn", c: "#d6336c", d: "M-100 -470 C-110 -546 -66 -592 0 -594 C66 -596 110 -546 100 -470 C108 -462 118 -458 126 -460 C110 -470 100 -490 84 -500 C60 -512 30 -520 8 -546 L0 -556 L-8 -546 C-30 -520 -60 -512 -84 -500 C-100 -490 -110 -470 -126 -460 C-118 -458 -108 -462 -100 -470 Z", hi: "M-56 -572 C-20 -586 20 -586 56 -572", strands: "M0 -556 C-30 -540 -60 -520 -90 -490 M0 -556 C30 -540 60 -520 90 -490" },
    tiers: { name: "Mái hai tầng", c: "#d6336c", d: "M-100 -472 C-106 -546 -66 -592 0 -594 C66 -596 106 -546 100 -472 C84 -486 62 -484 50 -476 C40 -492 18 -496 4 -486 C-10 -496 -30 -494 -40 -480 C-56 -490 -80 -488 -100 -472 Z", hi: "M-46 -574 C-10 -588 36 -586 68 -570", strands: "M-96 -522 C-50 -544 50 -544 96 -522" },
    sideshave: { name: "Hất một bên, bên kia cạo", c: "#d6336c", d: "M-114 -452 C-118 -520 -84 -580 -20 -592 C40 -600 92 -578 100 -540 L100 -500 C70 -512 30 -514 -10 -506 C-50 -498 -84 -480 -114 -452 Z", hi: "M-60 -566 C-20 -586 30 -590 70 -576", strands: "M80 -560 C40 -548 -20 -530 -80 -490", extra: '<path d="M100 -536 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    bob: { name: "Ôm mặt, đuôi nhọn vào cằm", c: "#d6336c", d: "M-112 -380 C-122 -500 -88 -590 0 -594 C88 -596 122 -500 112 -380 C104 -396 98 -420 96 -446 C96 -466 90 -476 80 -478 L-80 -478 C-90 -476 -96 -466 -96 -446 C-98 -420 -104 -396 -112 -380 Z", hi: "M-56 -570 C-20 -586 30 -586 64 -570", strands: "M-104 -500 C-106 -460 -108 -420 -110 -396 M104 -500 C106 -460 108 -420 110 -396" },
    curltip: { name: "Lọn chữ C trước trán", c: "#d6336c", d: "M-100 -472 C-106 -546 -66 -592 0 -594 C66 -596 106 -546 100 -472 C70 -490 40 -498 20 -498 C34 -486 36 -468 22 -460 C24 -474 14 -482 0 -484 C-30 -486 -70 -486 -100 -472 Z", hi: "M-50 -572 C-10 -588 36 -586 70 -568", strands: "M-40 -560 C-30 -530 -20 -508 -10 -490" },
    zigzag: { name: "Rẽ ngôi zíc zắc", c: "#d6336c", d: "M-100 -462 C-112 -540 -70 -586 -10 -590 C60 -594 110 -556 104 -470 C92 -494 62 -510 22 -510 C2 -528 -28 -534 -44 -520 C-62 -506 -86 -494 -100 -462 Z", hi: "M-10 -566 C30 -572 66 -560 86 -536", strands: "M-44 -520 L-34 -540 L-48 -556 L-36 -574 L-44 -588 M-14 -540 C24 -556 62 -548 88 -518" },
    wolf: { name: "Wolf cut", c: "#d6336c", d: "M-110 -400 C-124 -470 -116 -560 -60 -590 C-10 -612 70 -604 108 -560 C126 -520 122 -450 110 -400 C100 -418 96 -440 98 -460 C86 -470 76 -476 66 -474 C62 -488 50 -494 38 -490 C30 -500 16 -502 6 -494 C-4 -502 -20 -502 -28 -492 C-40 -496 -54 -490 -58 -478 C-72 -480 -88 -470 -96 -456 C-98 -436 -104 -418 -110 -400 Z", hi: "M-50 -574 C-10 -594 40 -590 76 -570", strands: "M-90 -520 C-96 -480 -100 -440 -106 -410 M96 -520 C100 -480 102 -440 106 -410 M-20 -580 C-24 -540 -20 -520 -24 -496" },
    mullet: { name: "Mullet ngắn kiểu Hàn", c: "#d6336c", d: "M-118 -340 C-108 -360 -104 -390 -104 -430 C-110 -530 -70 -588 -4 -590 C66 -592 112 -540 106 -432 C106 -392 110 -362 122 -342 C108 -346 98 -360 94 -380 L94 -470 C82 -484 64 -488 48 -484 L36 -492 L20 -484 L4 -494 L-12 -484 L-28 -492 L-44 -484 C-62 -488 -80 -484 -92 -470 L-92 -380 C-96 -360 -106 -346 -118 -340 Z", hi: "M-50 -566 C-10 -582 40 -580 72 -562", strands: "M-30 -570 C-28 -540 -30 -510 -28 -492 M30 -572 C32 -540 30 -510 28 -490" },
    eboy: { name: "Mái rèm dài 5:5", c: "#d6336c", d: "M-108 -400 C-118 -500 -90 -588 0 -592 C90 -596 118 -500 108 -400 C98 -420 88 -450 78 -470 C66 -494 40 -512 14 -540 L0 -556 L-14 -540 C-40 -512 -66 -494 -78 -470 C-88 -450 -98 -420 -108 -400 Z", hi: "M-60 -570 C-30 -584 30 -584 60 -570", strands: "M0 -556 C-40 -540 -70 -500 -92 -430 M0 -556 C40 -540 70 -500 92 -430 M0 -592 V-560" },
    french: { name: "French crop (mái bằng ngắn)", c: "#d6336c", d: "M-98 -494 C-104 -552 -66 -588 0 -592 C66 -594 104 -552 100 -494 Z", hi: "M-40 -572 C0 -584 40 -582 70 -566", strands: "M-70 -540 l6 -10 M-40 -556 l6 -10 M-10 -562 l6 -10 M20 -560 l6 -10 M50 -550 l6 -10 M-56 -514 l6 -10 M-24 -520 l6 -10 M10 -522 l6 -10 M44 -516 l6 -10 M74 -512 l6 -10", extra: '<path d="M-98 -476 L-96 -414 M100 -478 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    ivy: { name: "Ivy League (rẽ ngôi ngắn)", c: "#d6336c", d: "M-98 -476 C-106 -544 -68 -586 -8 -590 C58 -594 104 -556 100 -480 C88 -500 60 -512 24 -514 C4 -528 -24 -530 -40 -518 C-60 -508 -84 -498 -98 -476 Z", hi: "M-6 -566 C30 -574 62 -562 82 -540", strands: "M-40 -518 C-46 -546 -38 -570 -20 -584 M-10 -536 C24 -552 60 -544 86 -514", extra: '<path d="M-98 -476 L-96 -414 M100 -478 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    messy: { name: "Rối tự nhiên", c: "#d6336c", d: "M-104 -450 C-120 -480 -110 -520 -90 -540 C-100 -566 -70 -590 -46 -584 C-36 -608 -4 -612 10 -596 C30 -614 66 -606 70 -584 C96 -590 116 -560 104 -536 C120 -510 116 -470 104 -452 C96 -468 84 -476 72 -470 C66 -486 50 -490 40 -480 C30 -494 10 -494 4 -482 C-8 -494 -28 -490 -32 -478 C-44 -486 -62 -482 -66 -468 C-80 -474 -96 -468 -104 -450 Z", hi: "M-40 -576 C-10 -590 30 -590 60 -576", strands: "M-60 -560 C-50 -540 -56 -520 -48 -500 M10 -590 C4 -566 12 -540 6 -514 M64 -570 C56 -550 64 -530 58 -500" },
    curly: { name: "Xoăn ngắn", c: "#d6336c", d: "M-100 -470 C-106 -546 -64 -590 0 -592 C64 -594 106 -546 100 -470 C70 -488 30 -494 0 -494 C-30 -494 -70 -488 -100 -470 Z", hi: "", strands: "", extra: '<circle cx="-84" cy="-520" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="-60" cy="-556" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="-26" cy="-576" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="12" cy="-580" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="48" cy="-566" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="78" cy="-536" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="-90" cy="-486" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="-58" cy="-496" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="-26" cy="-500" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="8" cy="-502" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="42" cy="-498" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="74" cy="-490" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/><circle cx="96" cy="-494" r="20" fill="HAIRC" stroke="#1b1b1f" stroke-width="6"/>' },
    sweptlong: { name: "Mái dài hất lệch", c: "#d6336c", d: "M-104 -420 C-118 -510 -80 -590 -4 -594 C70 -598 112 -548 104 -470 C90 -488 64 -500 30 -502 C6 -500 -20 -492 -48 -480 C-72 -466 -92 -446 -104 -420 Z", hi: "M-60 -560 C-20 -584 30 -586 70 -566", strands: "M60 -560 C20 -540 -30 -520 -80 -470 M80 -530 C40 -520 0 -508 -40 -490" },
    mushroom: { name: "Đầu nấm", c: "#d6336c", d: "M-108 -430 C-118 -530 -74 -592 0 -594 C74 -596 118 -530 108 -430 C100 -450 90 -466 74 -474 C40 -486 -40 -486 -74 -474 C-90 -466 -100 -450 -108 -430 Z", hi: "M-60 -566 C-20 -586 30 -586 66 -566", strands: "M-60 -540 C-64 -510 -66 -490 -70 -476 M0 -560 V-484 M60 -540 C64 -510 66 -490 70 -476" },
    crew: { name: "Crew cut", c: "#d6336c", d: "M-96 -480 C-100 -548 -64 -584 0 -586 C64 -588 102 -552 98 -484 C80 -502 40 -514 6 -516 L-6 -506 C-44 -506 -78 -500 -96 -480 Z", hi: "M-36 -566 C0 -576 40 -574 64 -560", strands: "M-50 -540 l4 -8 M-20 -552 l4 -8 M14 -554 l4 -8 M46 -544 l4 -8", extra: '<path d="M-98 -476 L-96 -414 M100 -478 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    dandy: { name: "Dandy (mái dày phủ trán)", c: "#d6336c", d: "M-104 -440 C-114 -530 -72 -590 -4 -592 C66 -594 112 -540 104 -444 C98 -462 86 -474 70 -474 C56 -472 44 -478 30 -478 C14 -478 2 -472 -12 -474 C-28 -478 -42 -474 -56 -474 C-74 -474 -96 -462 -104 -440 Z", hi: "M-50 -568 C-10 -584 40 -582 72 -564", strands: "M-60 -560 C-50 -520 -46 -496 -48 -478 M-10 -574 C-6 -530 -6 -500 -10 -478 M40 -566 C42 -526 40 -498 36 -478" },
    curtain: { name: "Rẽ ngôi giữa 5:5", c: "#d6336c", d: "M-104 -430 C-116 -530 -70 -590 0 -592 C70 -594 116 -530 104 -430 C96 -460 80 -480 58 -488 C40 -494 22 -510 8 -536 L0 -548 L-8 -536 C-22 -510 -40 -494 -58 -488 C-80 -480 -96 -460 -104 -430 Z", hi: "M-60 -572 C-30 -584 30 -584 60 -572", strands: "M0 -548 C-30 -540 -60 -520 -80 -482 M0 -548 C30 -540 60 -520 80 -482 M0 -590 V-552" },
    perm: { name: "Uốn shadow perm", c: "#d6336c", d: "M-104 -444 C-118 -536 -74 -596 -2 -598 C72 -600 118 -540 104 -448 C96 -470 84 -478 74 -472 C70 -488 58 -494 46 -488 C40 -502 26 -508 14 -498 C6 -510 -10 -512 -18 -498 C-28 -508 -44 -504 -48 -488 C-60 -494 -74 -488 -76 -472 C-88 -476 -100 -468 -104 -444 Z", hi: "M-46 -574 C-10 -590 34 -588 66 -572", strands: "M-60 -560 C-70 -540 -50 -520 -60 -500 M0 -580 C-10 -556 10 -536 0 -512 M56 -566 C46 -544 66 -524 56 -500" },
    slick: { name: "Vuốt ngược (pomade)", c: "#d6336c", d: "M-98 -480 C-104 -548 -66 -590 0 -594 C66 -598 104 -552 100 -482 C90 -500 70 -516 44 -524 C20 -532 -20 -534 -44 -526 C-68 -516 -86 -500 -98 -480 Z", hi: "M-30 -572 C10 -588 50 -584 76 -568", strands: "M-60 -520 C-30 -556 20 -572 70 -560 M-40 -540 C-10 -568 30 -580 80 -574 M-80 -500 C-60 -530 -30 -546 0 -550", extra: '<path d="M-98 -476 L-96 -414 M100 -478 L100 -416" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    quiff: { name: "Short quiff cổ điển", c: "#d6336c", d: "M-98 -474 C-104 -530 -84 -560 -56 -572 C-50 -600 -20 -618 20 -614 C60 -612 98 -596 100 -560 C104 -540 104 -510 100 -476 C88 -494 62 -510 32 -524 C4 -538 -28 -534 -50 -518 C-70 -504 -86 -492 -98 -474 Z", hi: "M-30 -596 C0 -612 40 -612 70 -600", strands: "M-50 -566 C-30 -596 10 -608 50 -604 M-30 -530 C0 -560 40 -574 86 -572", extra: '<path d="M-98 -470 L-96 -412 M100 -472 L100 -414" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    quiffTex: { name: "Short quiff tỉa kết cấu", c: "#d6336c", d: "M-98 -474 C-104 -530 -84 -560 -58 -570 C-60 -596 -40 -612 -16 -606 C-6 -626 26 -630 40 -614 C62 -620 96 -606 98 -572 C104 -548 104 -510 100 -476 C88 -494 62 -510 32 -524 C4 -538 -28 -534 -50 -518 C-70 -504 -86 -492 -98 -474 Z", hi: "M-20 -600 C0 -618 24 -620 40 -612", strands: "M-50 -566 C-36 -584 -24 -596 -16 -604 M0 -580 C14 -598 26 -610 38 -612 M36 -570 C56 -584 76 -592 92 -584 M-30 -530 C0 -556 40 -566 84 -566", extra: '<path d="M-98 -470 L-96 -412 M100 -472 L100 -414" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    sidepart: { name: "Rẽ ngôi 7/3", c: "#d6336c", d: "M-100 -462 C-112 -540 -70 -586 -10 -590 C60 -594 110 -556 104 -470 C92 -494 62 -510 22 -510 C2 -528 -28 -534 -44 -520 C-62 -506 -86 -494 -100 -462 Z", hi: "M-10 -566 C30 -572 66 -560 86 -536", strands: "M-44 -520 C-50 -550 -40 -576 -20 -588 M-14 -540 C24 -556 62 -548 88 -518" },
    twoblock: { name: "Two-block (mái dài, hai bên ngắn)", c: "#d6336c", d: "M-94 -470 C-102 -540 -68 -588 -6 -592 C62 -596 104 -552 100 -472 C92 -482 80 -488 66 -484 L52 -476 L36 -488 L18 -476 L0 -490 L-18 -476 L-36 -488 L-52 -476 L-68 -486 C-80 -488 -90 -482 -94 -470 Z", hi: "M-50 -566 C-10 -580 40 -578 70 -560", strands: "M-40 -560 C-30 -530 -24 -500 -26 -484 M10 -574 C16 -540 18 -510 16 -480 M56 -560 C56 -530 52 -500 50 -480", extra: '<path d="M-96 -462 L-94 -404 M100 -464 L100 -408" stroke="#1b1b1f" stroke-opacity=".35" stroke-width="12" stroke-linecap="round"/>' },
    crop: { name: "Đầu ngắn mái lởm chởm nhẹ", c: "#d6336c", d: "M-98 -470 C-104 -540 -66 -582 0 -586 C66 -590 104 -546 100 -474 L88 -490 L74 -482 L62 -498 L46 -488 L30 -502 L14 -490 L-2 -504 L-18 -490 L-34 -502 L-50 -488 L-66 -500 L-82 -486 Z", hi: "M-40 -562 C0 -574 40 -572 70 -556", strands: "M-30 -560 L-26 -510 M10 -570 L12 -514 M50 -560 L46 -512" },
    comma: { name: "Mái dấu phẩy", c: "#d6336c", d: "M-100 -456 C-110 -540 -66 -588 0 -590 C66 -592 108 -546 102 -458 C96 -482 80 -494 62 -490 C72 -478 66 -464 52 -462 C56 -482 42 -498 16 -504 C4 -508 -4 -508 -16 -504 C-42 -498 -56 -482 -52 -462 C-66 -464 -72 -478 -62 -490 C-80 -494 -96 -482 -100 -456 Z", hi: "M-50 -560 C-10 -576 40 -574 74 -552", strands: "M0 -586 C-4 -560 -6 -530 -2 -508 M-40 -570 C-50 -540 -56 -512 -54 -490 M40 -572 C50 -544 56 -514 56 -492" },
    buzz: { name: "Đầu cua gọn", c: "#d6336c", d: "M-96 -478 C-100 -548 -64 -584 0 -586 C64 -588 102 -552 98 -482 C80 -500 40 -510 0 -510 C-40 -510 -78 -502 -96 -478 Z", hi: "M-40 -566 C0 -576 40 -574 66 -560", strands: "M-60 -540 l4 -8 M-30 -556 l4 -8 M0 -562 l4 -8 M30 -558 l4 -8 M60 -544 l4 -8 M-46 -520 l4 -8 M-14 -530 l4 -8 M18 -530 l4 -8 M50 -522 l4 -8" },
    wave: { name: "Mái sóng hất ngang", c: "#d6336c", d: "M-104 -426 C-122 -480 -112 -544 -62 -576 C-10 -608 72 -600 106 -558 C124 -534 126 -496 114 -466 C106 -484 94 -494 80 -496 C84 -486 78 -472 62 -464 C58 -480 46 -494 26 -498 C24 -480 12 -466 -10 -458 C-10 -476 -22 -488 -42 -490 C-48 -462 -68 -440 -104 -426 Z", hi: "M-70 -540 C-40 -572 10 -580 50 -566", top: '<path d="M6 -598 C14 -642 58 -656 80 -634 C56 -636 36 -622 30 -598Z" fill="HAIRC" stroke="#1b1b1f" stroke-width="7" stroke-linejoin="round"/>', strands: "M-60 -548 C-30 -520 -20 -500 -24 -488 M30 -580 C60 -560 74 -530 72 -508" },
    swept: { name: "Vuốt chéo ra sau", c: "#14a89f", d: "M-104 -392 L-112 -520 L-74 -578 L6 -598 L84 -584 L134 -606 L114 -552 L136 -526 L102 -508 L100 -470 L62 -500 L14 -488 L-34 -474 L-64 -436 Z", hi: "M-80 -520 L-40 -566 L30 -578", strands: "M-40 -560 L70 -540 M-20 -520 L90 -520 M-90 -470 L-60 -540" },
    flattop: { name: "Đầu đinh vuông", c: "#2b2d6e", d: "M-100 -470 L-102 -582 L96 -598 L104 -480 L84 -498 L70 -484 L52 -500 L30 -486 L8 -502 L-14 -488 L-36 -502 L-58 -486 L-80 -498 Z", hi: "M-80 -572 L70 -584", strands: "M-60 -580 L-62 -510 M-20 -584 L-22 -514 M20 -588 L18 -516 M60 -590 L58 -510", extra: '<path d="M-98 -470 L-96 -420 M100 -480 L98 -430" stroke="#2b2d6e" stroke-width="10" stroke-linecap="round" opacity=".45"/>' },
    blunt: { name: "Mái bằng cắt thẳng", c: "#e8452f", d: "M-108 -380 L-112 -540 L-70 -590 L60 -600 L110 -560 L114 -390 L96 -390 L94 -470 L76 -456 L60 -474 L40 -458 L20 -476 L0 -458 L-20 -474 L-40 -456 L-60 -472 L-80 -456 L-92 -462 L-94 -380 Z", hi: "M-70 -570 L40 -582", strands: "M-104 -500 L-100 -400 M104 -500 L106 -400 M-40 -580 L-46 -480 M20 -584 L16 -482" },
    topknot: { name: "Búi tó trên đỉnh", c: "#1f1a24", d: "M-104 -440 L-108 -540 L-60 -576 L70 -586 L106 -548 L104 -460 L70 -506 L-20 -500 L-70 -470 Z", hi: "M-60 -556 L40 -566", strands: "M-80 -500 L-40 -560 M80 -500 L40 -566 M0 -580 L0 -510", top: '<path d="M-30 -580 L-36 -640 L-4 -666 L30 -650 L34 -588Z" fill="#1f1a24" stroke="#1b1b1f" stroke-width="8" stroke-linejoin="round"/><path d="M-34 -592 H32" stroke="#ffc93c" stroke-width="10"/>' },
    visor: { name: "Mái nhọn chĩa trước", c: "#7a3fd1", d: "M-104 -430 L-106 -540 L-50 -586 L60 -590 L100 -548 L156 -512 L110 -508 L132 -486 L70 -494 L80 -474 L20 -484 L-10 -466 L-40 -478 L-60 -452 Z", hi: "M-40 -566 L60 -568 L110 -530", strands: "M-30 -580 L40 -500 M20 -588 L90 -514 M-70 -556 L-20 -488" },
  };
  const OUTFITS = {
    brand: { name: "Áo đào nhạt + túi đưa thư đỏ rượu (bộ chuẩn)", body: "#ffd2b0", dark: "#f2b48c",
      detail: '<path d="M-40 -312 L74 -196" stroke="#7a1e3a" stroke-width="16" stroke-linecap="round"/><path d="M-40 -312 L74 -196" stroke="#1b1b1f" stroke-width="22" stroke-linecap="round" opacity="0"/>',
      neck: '<path d="M-44 -316 L70 -200" stroke="#1b1b1f" stroke-width="22" stroke-linecap="round"/><path d="M-44 -316 L70 -200" stroke="#7a1e3a" stroke-width="12" stroke-linecap="round"/><path d="M40 -222 L118 -222 L122 -150 L36 -150Z" fill="#7a1e3a" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/><path d="M38 -222 L120 -222 L118 -182 L40 -182Z" fill="#9b2a4c" stroke="#1b1b1f" stroke-width="6" stroke-linejoin="round"/><rect x="70" y="-190" width="20" height="18" rx="3" fill="#ffd2b0" stroke="#1b1b1f" stroke-width="4"/>' },
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

  const satchel = (bag, flap, buckle) => '<path d="M-40 -304 L40 -214" stroke="#1b1b1f" stroke-width="15" stroke-linecap="round"/><path d="M-40 -304 L40 -214" stroke="' + bag + '" stroke-width="7" stroke-linecap="round"/><path d="M14 -226 H58 Q62 -226 62 -222 L60 -186 Q60 -180 54 -180 H18 Q12 -180 12 -186 L10 -222 Q10 -226 14 -226Z" fill="' + bag + '" stroke="#1b1b1f" stroke-width="5" stroke-linejoin="round"/><path d="M11 -210 H61" stroke="#1b1b1f" stroke-width="4"/>';
  // chest pack worn across the body, strap from the right shoulder to the left hip
  const chestPack = (bag, flap) => '<path d="M50 -304 L-52 -194" stroke="#1b1b1f" stroke-width="15" stroke-linecap="round"/><path d="M50 -304 L-52 -194" stroke="' + bag + '" stroke-width="7" stroke-linecap="round"/><g transform="translate(0 -246) rotate(-38)"><ellipse rx="48" ry="21" fill="' + bag + '" stroke="#1b1b1f" stroke-width="5"/><path d="M-38 -4 Q0 -12 38 -4" fill="none" stroke="' + flap + '" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="-5" r="3.5" fill="#1b1b1f"/></g>';
  // warm signature hues only: scenes are blue sky and green grass, so the host must sit on the opposite side of the wheel
  const LOOKS = {
    sunny:     { name: "Hồng tóc dựng · vàng mù tạt · túi tím (theo ảnh photoshop)", hair: "spiky", head: "box", pack: true, hairC: "#e4557f", top: "#f2b632", topD: "#d99a1c", bag: "#5c4a9e", flap: "#8a78c8", bg: "#b0607e" },
    raspberry: { name: "Hồng mâm xôi · cam mơ · navy (bộ chuẩn)", hair: "wave", hairC: "#d6336c", top: "#ffa95e", topD: "#ef8a3a", bag: "#1f2a5c", flap: "#2e3d80", bg: "#b0607e" },
    watermelon:{ name: "Hồng dưa hấu · trắng ngà · chàm đậm", hair: "wave", hairC: "#f0506e", top: "#fff6ee", topD: "#f0e0d2", bag: "#232c5c", flap: "#2f3b78", bg: "#b98089" },
    coral:     { name: "Đỏ san hô · tím sữa · navy", hair: "wave", hairC: "#f25c54", top: "#efe6ff", topD: "#d9cbf5", bag: "#1f2a4d", flap: "#2b3a68", bg: "#b8847e" },
    tangerine: { name: "Cam quýt · hồng phấn · đỏ rượu", hair: "wave", hairC: "#ff7a1a", top: "#ffe3ea", topD: "#f5c6d2", bag: "#6b1730", flap: "#8a2240", bg: "#c0906c" },
    cherry:    { name: "Đỏ anh đào · kem bơ · than chì", hair: "wave", hairC: "#d7263d", top: "#fff1d9", topD: "#f2dbb4", bag: "#2b2b33", flap: "#3d3d48", bg: "#a9787f" },
    orchid:    { name: "Hồng tím · đào sữa · nâu cà phê", hair: "wave", hairC: "#b8329e", top: "#ffe4d2", topD: "#f3c9ad", bag: "#4a2a1c", flap: "#61392a", bg: "#9a7a98" },
  };
  const lookOpts = k => { const L = LOOKS[k]; return L && { hair: L.hair, hairC: L.hairC, outfitObj: { body: L.top, dark: L.topD, detail: '<path d="M-26 -308 Q0 -290 26 -308" fill="none" stroke="#1b1b1f" stroke-width="5" stroke-linecap="round"/>', neck: L.pack ? chestPack(L.bag, L.flap) : satchel(L.bag, L.flap, L.top) } }; };

  function host({ x = 640, y = 690, s = 1, pose = "lecture", face: fname, costume = "none", flip = false, hair = "swept", outfit = "brand", look = null, headShape = null, hairStyle = null, hairColor = null } = {}) {
    const HO = HEADS[headShape || (look && LOOKS[look].head)] || HEADS.mochi, HD = HO.d;
    const lo = look ? lookOpts(look) : null;
    if (lo) hair = lo.hair;
    if (hairStyle) hair = hairStyle;
    const H0 = HAIRS[hair] || HAIRS.swept, H = { ...H0, c: hairColor || (H0.natural ? H0.c : (lo ? lo.hairC : H0.c)) }, O = lo ? lo.outfitObj : (OUTFITS[outfit] || OUTFITS.brand);
    const p = POSE[pose] || POSE.lecture;
    const body = `
      <path d="M-20 -176 L-26 -26 M20 -176 L28 -26" ${L8}/>
      <path d="M-62 -6 L-58 -34 L-8 -34 L-4 -6Z" fill="${C.shoe}" ${L6}/><path d="M-62 -6 H-4" ${ln(8, C.sole)}/><path d="M66 -6 L62 -34 L12 -34 L8 -6Z" fill="${C.shoe}" ${L6}/><path d="M66 -6 H8" ${ln(8, C.sole)}/>
      <path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="${O.body}" ${L8}/><path d="M30 -306 L44 -172 L62 -172 L50 -306Z" fill="${O.dark}"/>${O.detail || ""}<path d="M-52 -308 L-66 -170 L66 -170 L52 -308Z" fill="none" ${L8}/>
      <path d="${p.arms}" fill="none" ${L8}/>${p.hands}`;
    const scarf = O.neck;
    const head = `
      ${HO.noEars ? "" : `<path d="M-94 -446 C-122 -452 -126 -404 -94 -398" fill="${C.skin}" ${L6}/><path d="M100 -450 C128 -456 132 -408 100 -402" fill="${C.skin}" ${L6}/>`}
      <path d="${HD}" fill="${C.skin}" stroke="${INK}" stroke-width="8" stroke-linejoin="${HO.sharp ? "miter" : "round"}" stroke-miterlimit="6"/>
      ${face(fname || p.face)}
      ${(H.top || "").replace(/HAIRC/g, H.c)}<path d="${H.d}" fill="${H.c}" ${L8}/>${H.strands ? `<path d="${H.strands}" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="5" stroke-linecap="round"/>` : ""}${(H.extra || "").replace(/HAIRC/g, H.c)}<path d="${H.hi}" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${COSTUME[costume]}`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${body}${scarf}${head}${p.front || ""}</g>`;
  }
  function avatar({ text = "Trust me,|I read it.", hair = "swept", outfit = "brand", size = 512, look = null } = {}) {
    const bg = look ? LOOKS[look].bg : "#6e9c98", uid = "av" + Math.random().toString(36).slice(2, 8);
    const lines = text.split("|");
    return `<svg viewBox="0 0 512 512" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="${uid}"><circle cx="256" cy="256" r="246"/></clipPath>
      <circle cx="256" cy="256" r="250" fill="#1b1b1f"/>
      <g clip-path="url(#${uid})"><rect width="512" height="512" fill="${bg}"/>
        ${host({ x: 180, y: 700, s: 0.78, pose: "lecture", face: "lecture", hair, outfit, look })}
        <path d="M270 136 Q270 86 320 86 H436 Q482 86 482 136 V190 Q482 236 436 236 H344 L300 278 L312 236 Q270 234 270 190Z" fill="#ffffff" stroke="#1b1b1f" stroke-width="8" stroke-linejoin="round"/>
        ${lines.map((l, i) => `<text x="376" y="${154 + i * 40 - (lines.length - 2) * 20}" font-family="'Gochi Hand', 'Comic Sans MS', cursive" font-size="36" fill="#1b1b1f" text-anchor="middle">${l}</text>`).join("")}
      </g>
      <circle cx="256" cy="256" r="246" fill="none" stroke="#1b1b1f" stroke-width="10"/></svg>`;
  }
  g.HOST = { HEADS, LOOKS, avatar,  host, POSE: Object.keys(POSE), EX: Object.keys(EX), C, HAIRS, OUTFITS };
})(window);
