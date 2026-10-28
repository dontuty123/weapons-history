// Remy 2: a separate host set built on the user's hand-drawn edit (art/src/remy2-photoshop.png).
// Head, hair and shirt are traced paths from remy2-art.js; face, arms, legs and shoes are drawn here so the
// expression and pose can change. Coordinates are the source image's 900 px grid; feet stand on y = 1000.
(function (g) {
  const INK = "#111012";
  const ln = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  const L10 = ln(10), L9 = ln(9);

  const LOOKS = {
    wine:  { name: "Tóc hồng rượu đậm · áo cam mơ viền đỏ rượu · túi mận", hair: "#b3305f", skin: "#fee8e1", shirt: "#f7a35c", trim: "#7d2148", bag: "#3a2747", stripe: "#e0668e", bg: "#ae7f87" },
    original: { name: "Bản màu gốc (ảnh photoshop)", hair: "#d05e7f", skin: "#fee8e1", shirt: "#fdd27c", trim: "#fdd27c", bag: "#483957", stripe: "#d26384", bg: "#ae7f87" },
  };

  // face sits on a head turned three-quarters to the right and tilted 11 degrees
  const FACE_TILT = "rotate(-11 290 450)";
  const EYE = [[240, 427], [355, 429]], BROW = [[207, 364], [367, 360]], MOUTH = [286, 515];
  const EX = {
    cheeky:   { name: "Tinh nghịch (như ảnh)", eye: "line", brow: "arc", mouth: "tongue" },
    happy:    { name: "Cười tít", eye: "happy", brow: "arc", mouth: "grin" },
    neutral:  { name: "Bình thường", eye: "dot", brow: "arc", mouth: "small" },
    talk:     { name: "Đang nói", eye: "dot", brow: "arc", mouth: "talk" },
    smug:     { name: "Nhếch mép", eye: "half", brow: "cocky", mouth: "smirk" },
    side:     { name: "Liếc ngang", eye: "side", brow: "flat", mouth: "flat" },
    shock:    { name: "Ngạc nhiên", eye: "wide", brow: "high", mouth: "o" },
    worried:  { name: "Lo lắng", eye: "dot", brow: "worried", mouth: "wobble" },
    angry:    { name: "Bực", eye: "half", brow: "angry", mouth: "flat" },
  };
  function face(name) {
    const e = EX[name] || EX.cheeky, [mx, my] = MOUTH;
    const eye = ([x, y]) => ({
      line: `<path d="M${x - 32} ${y} H${x + 32}" ${L10}/>`,
      happy: `<path d="M${x - 26} ${y + 8} Q${x} ${y - 20} ${x + 26} ${y + 8}" fill="none" ${L10}/>`,
      dot: `<ellipse cx="${x}" cy="${y}" rx="9" ry="12" fill="${INK}"/>`,
      wide: `<circle cx="${x}" cy="${y}" r="20" fill="#fff" ${ln(8)}/><circle cx="${x + 3}" cy="${y + 1}" r="8" fill="${INK}"/>`,
      half: `<path d="M${x - 26} ${y - 6} H${x + 26}" ${L10}/><path d="M${x - 12} ${y - 6} a12 12 0 0 0 24 0Z" fill="${INK}"/>`,
      side: `<path d="M${x - 26} ${y - 6} H${x + 26}" ${L10}/><path d="M${x} ${y - 6} a12 12 0 0 0 24 0Z" fill="${INK}"/>`,
    }[e.eye]);
    const brow = ([x, y], s) => {
      const t = { arc: null, flat: [0, 0], high: [-18, -18], worried: s < 0 ? [6, -10] : [-10, 6], angry: s < 0 ? [-8, 10] : [10, -8], cocky: s < 0 ? [2, 2] : [-14, -20] }[e.brow];
      if (!t) return `<path d="M${x - 22} ${y + 8} Q${x} ${y - 14} ${x + 22} ${y + 8}" fill="none" ${L10}/>`;
      return `<path d="M${x - 20} ${y + t[0]} L${x + 20} ${y + t[1]}" ${L10}/>`;
    };
    const mouth = {
      tongue: `<path d="M${mx - 18} ${my - 12} Q${mx - 8} ${my + 28} ${mx + 2} ${my + 30} Q${mx + 10} ${my + 10} ${mx + 16} ${my - 14}Z" fill="#a0292f" ${ln(8)}/><path d="M${mx - 26} ${my - 11} L${mx + 24} ${my - 15}" ${L10}/>`,
      grin: `<path d="M${mx - 34} ${my - 14} Q${mx} ${my - 18} ${mx + 34} ${my - 14} Q${mx + 28} ${my + 30} ${mx} ${my + 32} Q${mx - 28} ${my + 30} ${mx - 34} ${my - 14}Z" fill="#a0292f" ${ln(8)}/><path d="M${mx - 14} ${my + 24} Q${mx} ${my + 12} ${mx + 14} ${my + 24}" fill="#e0668e"/>`,
      small: `<path d="M${mx - 18} ${my} Q${mx} ${my + 12} ${mx + 18} ${my}" fill="none" ${L9}/>`,
      talk: `<path d="M${mx - 18} ${my - 8} Q${mx} ${my - 10} ${mx + 18} ${my - 8} Q${mx + 14} ${my + 20} ${mx} ${my + 22} Q${mx - 14} ${my + 20} ${mx - 18} ${my - 8}Z" fill="#a0292f" ${ln(8)}/>`,
      flat: `<path d="M${mx - 16} ${my + 2} H${mx + 16}" ${L10}/>`,
      smirk: `<path d="M${mx - 18} ${my + 6} Q${mx + 4} ${my + 10} ${mx + 24} ${my - 10}" fill="none" ${L10}/>`,
      o: `<ellipse cx="${mx}" cy="${my + 4}" rx="13" ry="17" fill="#a0292f" ${ln(8)}/>`,
      wobble: `<path d="M${mx - 22} ${my + 4} q5.5 -8 11 0 q5.5 8 11 0 q5.5 -8 11 0 q5.5 8 11 0" fill="none" ${L9}/>`,
    }[e.mouth];
    return `<g transform="${FACE_TILT}">${brow(BROW[0], -1)}${brow(BROW[1], 1)}${eye(EYE[0])}${eye(EYE[1])}${mouth}</g>`;
  }

  // arms: one line from the shoulder, hands are round mitts (as in the drawing)
  const SL = "M188 603", SR = "M337 618";
  const mitt = (x, y, a = 0, rx = 30, ry = 20) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})" fill="SKIN" ${L9}/>`;
  const pointer = (x, y, a = 0) => `<g transform="rotate(${a} ${x} ${y})"><path d="M${x + 10} ${y - 6} H${x + 46}" ${ln(22)}/><path d="M${x + 10} ${y - 6} H${x + 46}" ${ln(8, "SKIN")}/>${mitt(x, y, 0, 24, 20)}</g>`;
  const POSE = {
    shrug:   { name: "Nhún vai (như ảnh)", arms: `${SL} Q150 628 140 612 Q122 586 100 578 ${SR} Q352 642 365 626 Q385 606 402 604`, hands: mitt(70, 572, -5) + mitt(430, 607, 15) },
    wave:    { name: "Vẫy tay", arms: `${SL} Q166 660 156 722 ${SR} Q400 600 432 502`, hands: mitt(154, 746, 80, 24, 20) + mitt(442, 476, 75, 30, 21) },
    point:   { name: "Chỉ sang phải", arms: `${SL} Q166 660 156 722 ${SR} Q392 624 436 606`, hands: mitt(154, 746, 80, 24, 20) + pointer(452, 600, -12) },
    present: { name: "Giới thiệu", arms: `${SL} Q166 660 156 722 ${SR} Q386 650 440 640`, hands: mitt(154, 746, 80, 24, 20) + mitt(468, 628, -30, 30, 18) },
    hips:    { name: "Chống nạnh", arms: `${SL} Q120 650 162 704 ${SR} Q400 660 350 704`, hands: mitt(166, 708, 40, 20, 16) + mitt(344, 708, -40, 20, 16) },
    cheer:   { name: "Hai tay giơ cao", arms: `${SL} Q130 570 92 498 ${SR} Q404 574 440 480`, hands: mitt(86, 472, 70, 30, 21) + mitt(446, 454, 105, 30, 21) },
    think:   { name: "Chống cằm", arms: `${SL} Q166 660 156 722 ${SR} Q392 680 318 612`, hands: mitt(154, 746, 80, 24, 20) + mitt(306, 596, -20, 26, 18) },
    idle:    { name: "Đứng thả tay", arms: `${SL} Q166 660 156 722 ${SR} Q350 670 352 724`, hands: mitt(154, 746, 80, 24, 20) + mitt(354, 748, 95, 24, 20) },
  };

  const legs = `<path d="M212 776 Q214 870 218 972 M305 776 Q316 876 330 972" fill="none" ${L10}/>` +
    `<path d="M204 966 Q198 998 226 998 H262 Q274 998 268 986 Q258 970 232 968Z" fill="${INK}" ${ln(6)}/><path d="M316 966 Q310 998 338 998 H374 Q386 998 380 986 Q370 970 344 968Z" fill="${INK}" ${ln(6)}/>`;

  function remy({ x = 0, y = 0, s = 1, pose = "shrug", face: fname = "cheeky", look = "wine", hairColor = null, flip = false } = {}) {
    const A = g.REMY2_ART, L = LOOKS[look] || LOOKS.wine, P = POSE[pose] || POSE.shrug;
    const fill = { skin: L.skin, hair: hairColor || L.hair, shirt: L.shirt, trim: L.trim, bag: L.bag, bagStripe: L.stripe, ink: INK };
    const upper = ["skin", "hair", "shirt", "trim", "bag", "bagStripe", "ink"].map(k => `<path d="${A[k]}" fill="${fill[k]}" fill-rule="evenodd"/>`).join("");
    const arms = `<path d="${P.arms}" fill="none" ${L10}/>`, hands = P.hands.replace(/SKIN/g, L.skin);
    // origin at the midpoint between the feet; flip mirrors the character to face left
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(-290 -1000)">${legs}${arms}${upper}${face(fname)}${hands}</g>`;
  }
  function avatar({ text = "Vì t đã|photoshop nó", size = 512, look = "wine", face: fname = "cheeky", pose = "shrug" } = {}) {
    const L = LOOKS[look] || LOOKS.wine, uid = "r2" + Math.random().toString(36).slice(2, 8), lines = text.split("|");
    return `<svg viewBox="0 0 512 512" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="${uid}"><circle cx="256" cy="256" r="246"/></clipPath>
      <circle cx="256" cy="256" r="250" fill="${INK}"/>
      <g clip-path="url(#${uid})"><rect width="512" height="512" fill="${L.bg}"/>
        ${remy({ x: 150, y: 500, s: 0.5, pose, face: fname, look })}
        <path d="M282 150 Q282 100 332 100 H440 Q484 100 484 150 V196 Q484 240 440 240 H350 L300 282 L316 240 Q282 238 282 196Z" fill="#fff" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>
        ${lines.map((l, i) => `<text x="383" y="${166 + i * 40 - (lines.length - 2) * 20}" font-family="'Gochi Hand', 'Comic Sans MS', cursive" font-size="30" fill="${INK}" text-anchor="middle">${l}</text>`).join("")}
      </g>
      <circle cx="256" cy="256" r="246" fill="none" stroke="${INK}" stroke-width="10"/></svg>`;
  }
  g.REMY2 = { remy, avatar, face, LOOKS, EX, POSE };
})(window);
