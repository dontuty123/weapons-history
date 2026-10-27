// Narrator candidates v2: tube limbs, mitten hands with thumbs, one shade tone, oval eyes.
// All four designs are original to this channel.
(function (g) {
  const INK = "#1d1d22";
  const ln = (w, c = INK) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
  let uid = 0;

  // outlined tube: thick ink stroke under a thinner colored stroke
  const tube = (d, fill, w = 30) => `<path d="${d}" fill="none" ${ln(w)}/><path d="${d}" fill="none" ${ln(w - 13, fill)}/>`;
  // mitten hand with thumb, pointing along +x before rotation
  const mitten = (x, y, ang, skin, kind = "fist", flipT = false) => {
    const t = flipT ? -1 : 1;
    const body = kind === "point"
      ? `<rect x="-4" y="-9" width="48" height="18" rx="9" fill="${skin}" ${ln(6)}/><path d="M-20 -22 Q8 -30 16 -10 Q22 14 0 22 Q-22 24 -26 4 Q-28 -14 -20 -22Z" fill="${skin}" ${ln(6)}/>`
      : kind === "open"
        ? `<path d="M-22 -18 Q4 -32 30 -20 Q44 -10 38 6 Q30 22 4 22 Q-20 22 -26 4 Q-28 -10 -22 -18Z" fill="${skin}" ${ln(6)}/><path d="M6 -6 h22 M6 6 h20" fill="none" ${ln(3)}/>`
        : `<path d="M-22 -20 Q6 -32 24 -14 Q32 4 18 18 Q0 28 -18 20 Q-30 8 -22 -20Z" fill="${skin}" ${ln(6)}/>`;
    const thumb = `<path d="M-6 ${-16 * t} Q4 ${-36 * t} 16 ${-28 * t} Q20 ${-20 * t} 10 ${-12 * t}" fill="${skin}" ${ln(5.5)}/>`;
    return `<g transform="translate(${x} ${y}) rotate(${ang})">${body}${thumb}</g>`;
  };
  // ---------- faces ----------
  function face(f, o) {
    const ex = o.eyeX ?? 42, ey = o.eyeY ?? -404, my = o.mouthY ?? -340;
    const eye = (x, s) => ({
      dot: `<ellipse cx="${x}" cy="${ey}" rx="11" ry="15" fill="${INK}"/><circle cx="${x + 4}" cy="${ey - 6}" r="4.5" fill="#fff"/>`,
      closed: `<path d="M${x - 18} ${ey} q18 14 36 0" fill="none" ${ln(6)}/>`,
      happy: `<path d="M${x - 18} ${ey + 6} q18 -18 36 0" fill="none" ${ln(6)}/>`,
      half: `<path d="M${x - 20} ${ey - 3} h40" ${ln(6)}/><path d="M${x - 11} ${ey - 3} a11 11 0 0 0 22 0Z" fill="${INK}"/>`,
      wide: `<ellipse cx="${x}" cy="${ey}" rx="17" ry="20" fill="#fff" ${ln(5)}/><ellipse cx="${x + s * 2}" cy="${ey + 3}" rx="8" ry="10" fill="${INK}"/>`,
    }[f.eye] || "");
    const brow = (x, s) => {
      const tilt = { up: 6, flat: 0, worried: 12, skeptic: s > 0 ? -12 : 4, angry: -10 }[f.brow] ?? 0;
      return `<path d="M${x - 20} ${ey - 40 + tilt * s * -1} Q${x} ${ey - 50} ${x + 20} ${ey - 40 + tilt * s}" fill="none" ${ln(o.browW ?? 9, o.browC ?? INK)}/>`;
    };
    const mo = {
      talk: `<path d="M-16 ${my - 8} Q0 ${my - 13} 16 ${my - 8} Q18 ${my + 16} 0 ${my + 18} Q-18 ${my + 16} -16 ${my - 8}Z" fill="#a8323c" ${ln(5)}/><path d="M-9 ${my + 10} q9 -6 18 0" fill="#f08a8a"/>`,
      smile: `<path d="M-24 ${my - 6} Q0 ${my + 20} 24 ${my - 6}" fill="none" ${ln(6)}/>`,
      grin: `<path d="M-28 ${my - 10} H28 Q24 ${my + 24} 0 ${my + 24} Q-24 ${my + 24} -28 ${my - 10}Z" fill="#a8323c" ${ln(5)}/><path d="M-24 ${my - 8} H24 V${my} H-24Z" fill="#fff"/>`,
      flat: `<path d="M-16 ${my} h32" ${ln(6)}/>`,
      smirk: `<path d="M-18 ${my + 4} Q6 ${my + 8} 22 ${my - 8}" fill="none" ${ln(6)}/>`,
      o: `<ellipse cx="0" cy="${my}" rx="13" ry="16" fill="#a8323c" ${ln(5)}/>`,
    }[f.mouth] || "";
    const nose = `<path d="M-2 ${(ey + my) / 2 - 8} q10 10 -2 16" fill="none" ${ln(4.5)}/>`;
    return brow(-ex, -1) + brow(ex, 1) + eye(-ex, -1) + eye(ex, 1) + nose + mo +
      `<ellipse cx="${-ex - 22}" cy="${my - 18}" rx="17" ry="9" fill="${o.blush}" opacity=".55"/><ellipse cx="${ex + 22}" cy="${my - 18}" rx="17" ry="9" fill="${o.blush}" opacity=".55"/>`;
  }

  // ---------- shared body ----------
  const HEAD = "M-104 -420 C-108 -512 -48 -546 0 -546 C54 -546 110 -512 106 -420 C104 -350 68 -300 0 -298 C-66 -300 -102 -350 -104 -420Z";
  const POSES = {
    relax: { L: "M-62 -270 Q-92 -210 -86 -150", R: "M62 -270 Q92 -210 86 -150", hl: [-86, -138, 100, "fist", true], hr: [86, -138, 80, "fist"] },
    point: { L: "M-62 -270 Q-92 -210 -86 -150", R: "M62 -270 Q120 -280 136 -370", hl: [-86, -138, 100, "fist", true], hr: [140, -384, -76, "point"] },
    present: { L: "M-62 -270 Q-92 -210 -86 -150", R: "M62 -270 Q130 -236 196 -250", hl: [-86, -138, 100, "fist", true], hr: [214, -254, -8, "open"] },
    shrug: { L: "M-62 -270 Q-140 -236 -160 -290", R: "M62 -270 Q140 -236 160 -290", hl: [-166, -306, -110, "open", true], hr: [166, -306, -70, "open"] },
  };
  function person(d, { x = 640, y = 700, s = 1, pose = "relax", f = {}, flip = false } = {}) {
    const id = "c" + (++uid);
    const p = POSES[pose];
    const sk = d.skin, sh = d.skinShade;
    const legs = tube("M-30 -140 L-34 -30", d.pants, 36) + tube("M30 -140 L36 -30", d.pants, 36) +
      `<path d="M-70 -14 Q-72 -40 -40 -40 Q-14 -40 -10 -18 Q-10 0 -40 0 Q-68 0 -70 -14Z" fill="${d.shoe}" ${ln(6)}/><path d="M70 -14 Q72 -40 40 -40 Q14 -40 10 -18 Q10 0 40 0 Q68 0 70 -14Z" fill="${d.shoe}" ${ln(6)}/>` +
      `<path d="M-68 -8 H-12 M12 -8 H68" ${ln(3, "#ffffff55")}/>`;
    const torso = `<clipPath id="${id}t"><path d="${d.torso}"/></clipPath>
      <path d="${d.torso}" fill="${d.top}" ${ln(8)}/>
      <g clip-path="url(#${id}t)"><path d="M30 -320 Q70 -230 60 -120 L140 -120 L140 -320Z" fill="${d.topShade}" opacity=".9"/>${d.topDetail || ""}</g>
      <path d="${d.torso}" fill="none" ${ln(8)}/>${d.collar || ""}`;
    const arm = (path, h) => tube(path, d.sleeve || d.top, 34) + mitten(h[0], h[1], h[2], sk, h[3], h[4]);
    const arms = arm(p.L, p.hl) + arm(p.R, p.hr);
    const head = `<clipPath id="${id}h"><path d="${HEAD}"/></clipPath>
      ${d.hairBack || ""}
      <path d="M-104 -420 a16 22 0 1 0 4 40" fill="${sk}" ${ln(6)}/><path d="M106 -420 a16 22 0 1 1 -4 40" fill="${sk}" ${ln(6)}/>
      <path d="M-30 -300 V-280 M30 -300 V-280" ${ln(6)}/><rect x="-28" y="-306" width="56" height="30" fill="${sk}"/>
      <path d="${HEAD}" fill="${sk}" ${ln(8)}/>
      <g clip-path="url(#${id}h)"><path d="M40 -560 Q120 -440 60 -300 L160 -300 L160 -560Z" fill="${sh}" opacity=".55"/></g>
      ${face(f, d.faceOpt)}${d.glasses || ""}
      ${d.hair}${d.extra || ""}`;
    return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">${legs}${torso}${arms}${head}</g>`;
  }

  // ---------- four original designs ----------
  const TORSO_SHIRT = "M-66 -296 Q-82 -220 -86 -132 Q0 -118 86 -132 Q82 -220 66 -296 Q0 -312 -66 -296Z";
  const D = {
    theo: { name: "Theo — giáo sư trẻ", skin: "#f8dcc6", skinShade: "#e8bfa6", pants: "#3c4250", shoe: "#6b4a34",
      top: "#2f8088", topShade: "#25676e", sleeve: "#2f8088", torso: TORSO_SHIRT,
      topDetail: `<path d="M0 -300 V-130" ${ln(4, "#1f5a60")}/><circle cx="-14" cy="-250" r="5" fill="#f2e6c9"/><circle cx="-14" cy="-200" r="5" fill="#f2e6c9"/><circle cx="-14" cy="-150" r="5" fill="#f2e6c9"/>`,
      collar: `<path d="M-40 -302 L0 -262 L40 -302 L22 -312 L0 -290 L-22 -312Z" fill="#ffffff" ${ln(5)}/><path d="M-14 -286 L0 -262 L14 -286 L0 -276Z" fill="#c8483e" ${ln(4)}/>`,
      hair: `<path d="M-110 -414 C-120 -520 -50 -566 10 -562 C80 -558 118 -510 110 -420 C100 -470 70 -492 30 -486 C10 -500 -30 -500 -60 -486 C-86 -476 -104 -452 -110 -414Z" fill="#3b2a22" ${ln(8)}/><path d="M-60 -486 Q-20 -540 40 -530" fill="none" ${ln(4, "#5a4234")}/>`,
      glasses: `<circle cx="-42" cy="-404" r="30" fill="#ffffff22" ${ln(6)}/><circle cx="42" cy="-404" r="30" fill="#ffffff22" ${ln(6)}/><path d="M-12 -406 Q0 -414 12 -406 M-72 -408 L-104 -418 M72 -408 L104 -418" fill="none" ${ln(5)}/>`,
      faceOpt: { blush: "#f2a5a0" } },
    mara: { name: "Mara — nhà thám hiểm", skin: "#e0a77f", skinShade: "#c98d66", pants: "#2e3f63", shoe: "#5a3a26",
      top: "#ea7a5c", topShade: "#cf5f44", sleeve: "#ea7a5c", torso: TORSO_SHIRT,
      topDetail: `<path d="M-90 -300 L-40 -300 L-36 -120 L-90 -120Z M90 -300 L40 -300 L36 -120 L90 -120Z" fill="#c9a86a" ${ln(5)}/><rect x="-80" y="-230" width="34" height="30" rx="4" fill="#b8955a" ${ln(4)}/><rect x="46" y="-230" width="34" height="30" rx="4" fill="#b8955a" ${ln(4)}/>`,
      collar: `<path d="M-30 -304 Q0 -280 30 -304" fill="none" ${ln(5)}/>`,
      hairBack: `<path d="M-130 -360 C-170 -420 -150 -520 -90 -560 C-40 -600 60 -600 110 -560 C160 -520 172 -420 130 -360 Q150 -320 120 -300 L-120 -300 Q-150 -320 -130 -360Z" fill="#1f1a1d" ${ln(8)}/>`,
      hair: `<path d="M-108 -420 C-112 -500 -60 -552 0 -552 C60 -552 112 -500 108 -420 C96 -470 60 -486 30 -474 C10 -496 -30 -496 -50 -474 C-80 -486 -100 -456 -108 -420Z" fill="#1f1a1d" ${ln(8)}/><path d="M-70 -520 Q-30 -548 20 -540" fill="none" ${ln(4, "#4a3f45")}/><path d="M-110 -470 Q0 -520 110 -470" fill="none" ${ln(14, "#e9c34a")}/><path d="M-110 -470 Q0 -520 110 -470" fill="none" ${ln(4)}/>`,
      faceOpt: { blush: "#d9776a" } },
    kit: { name: "Kit — cậu nhóc tò mò", skin: "#fbe2d0", skinShade: "#efc6ad", pants: "#4a6fa8", shoe: "#e8e4dc",
      top: "#eab23f", topShade: "#cf962a", sleeve: "#eab23f", torso: "M-70 -290 Q-90 -220 -92 -128 Q0 -112 92 -128 Q90 -220 70 -290 Q0 -306 -70 -290Z",
      topDetail: `<path d="M-50 -200 H50 Q46 -150 0 -146 Q-46 -150 -50 -200Z" fill="#d79f30" ${ln(4)}/><path d="M-90 -150 Q0 -136 90 -150" fill="none" ${ln(4, "#b98a26")}/>`,
      collar: `<path d="M-74 -292 Q-60 -330 0 -330 Q60 -330 74 -292 Q40 -276 0 -276 Q-40 -276 -74 -292Z" fill="#d79f30" ${ln(6)}/><path d="M-18 -282 V-230 M18 -282 V-230" ${ln(4)}/><circle cx="-18" cy="-226" r="5" fill="#fff" ${ln(3)}/><circle cx="18" cy="-226" r="5" fill="#fff" ${ln(3)}/>`,
      hair: `<path d="M-110 -412 C-130 -470 -100 -540 -40 -560 C10 -600 90 -570 106 -520 C130 -490 120 -440 110 -414 C100 -446 80 -470 56 -464 L64 -494 L30 -468 L20 -500 L-6 -466 L-24 -494 L-40 -462 C-70 -470 -96 -446 -110 -412Z" fill="#d6723a" ${ln(8)}/><path d="M20 -560 q20 -30 40 -24" fill="none" ${ln(6)}/>`,
      extra: `<g fill="#c98a6a">${[[-60, -368], [-48, -380], [-70, -382], [60, -368], [48, -380], [70, -382]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="3.6"/>`).join("")}</g>`,
      faceOpt: { blush: "#f3a69c" } },
    sol: { name: "Sol — anh chàng điềm tĩnh", skin: "#a96f4c", skinShade: "#8e5a3c", pants: "#35363e", shoe: "#c74b3b",
      top: "#5f8f5f", topShade: "#4b7550", sleeve: "#5f8f5f", torso: TORSO_SHIRT,
      topDetail: `<path d="M0 -300 V-128" ${ln(4, "#3e6342")}/><path d="M-86 -150 Q0 -136 86 -150 L86 -130 Q0 -116 -86 -130Z" fill="#e0893a" ${ln(4)}/>`,
      collar: `<path d="M-70 -300 Q0 -258 70 -300 L58 -322 Q0 -292 -58 -322Z" fill="#e6dfcf" ${ln(5)}/><path d="M-70 -300 Q-40 -262 -10 -268 L-10 -246 Q-50 -250 -74 -284Z" fill="#d9483c" ${ln(5)}/><path d="M-60 -294 l10 14 M-44 -284 l8 14" ${ln(4, "#f2f2f2")}/>`,
      hair: `<path d="M-106 -428 C-110 -500 -70 -540 0 -544 C70 -540 110 -500 106 -428 C96 -456 70 -470 40 -470 Q0 -480 -40 -470 C-70 -470 -96 -456 -106 -428Z" fill="#17141a" ${ln(8)}/>${[[-60, -510], [-24, -526], [14, -528], [52, -514], [-40, -492], [0, -500], [36, -494]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="15" fill="#17141a" ${ln(5)}/>`).join("")}`,
      faceOpt: { blush: "#c06a54", browC: "#17141a" } },
  };
  g.CAST = { D, person };
})(window);
