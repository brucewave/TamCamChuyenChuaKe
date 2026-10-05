// Phim cảnh chết vẽ lại: giếng của Lài, ao của Đội Ngạn, nhà dệt cháy, cây xoan rỉ máu, hai hồi ức cái chết của Tấm.
// Ghi đè G.cut.ve (cutscene.js), giữ nguyên tên cảnh và số bước nên lời thoại, máy quay ở các chương không đổi.
// Nhân vật trong phim dùng đúng model ngoài game (G.art.chibi / G.art.xac) để người chơi nhận ra.
var G = window.G || (window.G = {});

(function () {
  var V = G.cut.ve, INK = G.INK;
  function f(n) { return (+n).toFixed(1); }
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function khung(inner, bg, style, gan) {
    return '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><style>' + (style || '') + '</style><rect width="960" height="540" fill="' + bg + '"/>' +
      '<g class="cam"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></g>' +
      (gan ? '<g class="gan"><g stroke="none">' + gan + '</g></g>' : '') + '</svg>';
  }
  // đặt model nhân vật (chân ở x,y) vào tranh
  function nguoi(look, x, y, k, them, lat) { // lat: quay mặt sang trái
    var s = G.art.chibi(Object.assign({}, look, them || {})).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    return lat ? '<g transform="translate(' + f(x + 80 * k) + ',' + f(y - 176 * k) + ') scale(' + (-k) + ',' + k + ')">' + s + '</g>' :
      '<g transform="translate(' + f(x - 80 * k) + ',' + f(y - 176 * k) + ') scale(' + k + ')">' + s + '</g>';
  }
  function trang(x, y, r, mau) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 2.4) + '" fill="' + (mau || '#E8D8A8') + '" opacity=".1" stroke="none"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.5) + '" fill="' + (mau || '#E8D8A8') + '" opacity=".18" stroke="none"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (mau || '#E8D8A8') + '" stroke="none"/>';
  }
  // bàn tay người chết đuối: tái xanh, ngón dài, móng thâm
  function tay(x, y, k, xoay, mau) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (xoay || 0) + ') scale(' + k + ')"><path d="M-14,40 L-12,4 L-20,-26 q-2,-8 5,-8 q5,1 7,8 L-4,-10 L-6,-44 q0,-8 6,-8 q6,0 6,8 L4,-12 L8,-42 q2,-7 8,-6 q6,2 4,9 L16,-8 L24,-30 q3,-6 9,-3 q5,4 1,10 L18,10 L16,40 Z" fill="' + (mau || '#B8C8C4') + '" stroke-width="2.4"/>' +
      '<path d="M-2,-46 h4M10,-44 h4M24,-28 l3,2M-17,-31 h4" stroke="#3A4A48" stroke-width="2.4"/></g>';
  }

  // ================= GIẾNG GIẶT: Lài nổi trên mặt giếng =================
  V.gieng = function () {
    var r = rng(5), s = '<defs><radialGradient id="pgNuoc" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#3E5E60"/><stop offset=".7" stop-color="#1A2C2E"/><stop offset="1" stop-color="#0A1414"/></radialGradient>' +
      '<radialGradient id="pgTroi" cx=".35" cy=".3" r=".5"><stop offset="0" stop-color="#D8E0E0" stop-opacity=".5"/><stop offset="1" stop-color="#D8E0E0" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="pgMieng"><circle cx="480" cy="270" r="214"/></clipPath></defs>';
    // sân đá ướt quanh giếng
    s += '<rect width="960" height="540" fill="#4A4A44" stroke="none"/>';
    for (var gy = 0; gy < 540; gy += 54) for (var gx = (gy / 54) % 2 ? -40 : 0; gx < 960; gx += 80) s += '<rect x="' + (gx + 2) + '" y="' + (gy + 2) + '" width="76" height="50" fill="' + ['#5A5A52', '#545450', '#60605A'][Math.floor(r() * 3)] + '" stroke="none"/>';
    // thành giếng: hai vòng gạch đá, rêu, dây gàu
    s += '<circle cx="480" cy="270" r="262" fill="#7A746A"/>';
    for (var a = 0; a < 36; a++) { var t = a / 36 * Math.PI * 2, t2 = t + Math.PI * 2 / 36; s += '<path d="M' + f(480 + Math.cos(t) * 262) + ',' + f(270 + Math.sin(t) * 262) + ' L' + f(480 + Math.cos(t) * 214) + ',' + f(270 + Math.sin(t) * 214) + '" stroke="#5A544A" stroke-width="2"/>'; if (a % 3 === 0) s += '<path d="M' + f(480 + Math.cos(t) * 240) + ',' + f(270 + Math.sin(t) * 240) + ' l' + f(Math.cos(t2) * 4) + ',' + f(Math.sin(t2) * 4) + '" stroke="#6E8A4A" stroke-width="10" opacity=".7"/>'; }
    s += '<circle cx="480" cy="270" r="262" fill="none" stroke-width="4"/><circle cx="480" cy="270" r="238" fill="none" stroke="#9A9486" stroke-width="3"/>';
    // mặt nước tối, trời phản chiếu, gợn
    s += '<circle cx="480" cy="270" r="214" fill="url(#pgNuoc)"/><g clip-path="url(#pgMieng)" stroke="none">' +
      '<ellipse cx="400" cy="190" rx="170" ry="120" fill="url(#pgTroi)"/>';
    for (var gr = 50; gr < 220; gr += 40) s += '<circle class="gon" cx="530" cy="250" r="' + gr + '" fill="none" stroke="#6A8A88" stroke-width="2" style="animation-delay:-' + (gr / 70) + 's"/>';
    // xác Lài úp mặt, tóc xoà như mực loang, áo xanh phồng nước, một tay giơ lên khỏi mặt nước
    // tóc loang trong nước: nhiều sợi mảnh dài ngắn khác nhau, uốn lượn như mực, đậm ở gốc nhạt ở ngọn
    var toc = '', toc2 = '';
    for (var i = 0; i < 46; i++) {
      var ga = -2.9 + i * .1 + (r() - .5) * .08, L = 50 + r() * 90, ox = 420 + Math.cos(ga) * 22, oy = 232 + Math.sin(ga) * 20, w1 = (r() - .5) * 26, w2 = (r() - .5) * 26;
      var d = 'M' + f(ox) + ',' + f(oy) + ' c' + f(Math.cos(ga) * L * .35 - Math.sin(ga) * w1) + ',' + f(Math.sin(ga) * L * .35 + Math.cos(ga) * w1) + ' ' + f(Math.cos(ga) * L * .7 - Math.sin(ga) * w2) + ',' + f(Math.sin(ga) * L * .7 + Math.cos(ga) * w2) + ' ' + f(Math.cos(ga) * L) + ',' + f(Math.sin(ga) * L);
      if (i % 2) toc += d; else toc2 += d;
    }
    s += '<ellipse cx="410" cy="232" rx="78" ry="64" fill="#0A0A0E" opacity=".35"/><path d="' + toc2 + '" fill="none" stroke="#1A161C" stroke-width="2" opacity=".6"/><path d="' + toc + '" fill="none" stroke="#0E0C10" stroke-width="2.8" opacity=".85"/>';
    s += '<g stroke="' + INK + '" stroke-width="3"><path d="M440,240 Q500,214 560,250 Q600,290 570,340 Q520,370 470,330 Q430,290 440,240 Z" fill="#5E8A50"/><path d="M470,262 q40,-10 76,10" fill="none" stroke="#86AE6A" stroke-width="3"/>' +
      '<path d="M560,320 Q620,330 650,380 Q600,400 560,370 Z" fill="#3A3A4A"/><path d="M570,334 q30,10 50,34" fill="none" stroke="#5A5A6A" stroke-width="2.4"/>' +
      '<ellipse cx="420" cy="232" rx="34" ry="30" fill="#1A1418"/><path d="M398,214 q22,-10 44,2" fill="none" stroke="#3A3438" stroke-width="3"/>' +
      '<path d="M455,300 Q420,320 400,360" fill="none" stroke-width="14"/><path d="M455,300 Q420,320 400,360" fill="none" stroke="#5E8A50" stroke-width="9"/><path d="M396,358 q-6,10 4,14 q10,0 8,-12 z" fill="#C8C8B8"/></g>';
    s += '</g>';
    // bàn tay nắm chiếc lông vàng anh nhô lên
    s += '<g class="tayLai"><path d="M520,300 L516,250" stroke="' + INK + '" stroke-width="16"/><path d="M520,300 L516,250" stroke="#5E8A50" stroke-width="11"/>' +
      '<path d="M500,256 q-4,-26 10,-34 l6,-14 q6,-6 10,2 l2,10 l6,-10 q6,-4 9,3 l-2,14 q8,8 2,24 q-6,12 -22,12 q-16,-2 -21,-7 z" fill="#C8C8BC" stroke="' + INK + '" stroke-width="3"/>' +
      '<path d="M512,232 h10M520,224 l4,6" stroke="#6A6A78" stroke-width="2"/>' +
      '<path d="M522,224 Q556,150 618,128 Q590,170 532,226 Z" fill="#E8C030" stroke="' + INK + '" stroke-width="3"/><path d="M528,222 Q566,170 610,134" fill="none" stroke="#B88A10" stroke-width="2"/>' +
      '<path d="M540,196 l10,-2M552,178 l10,-4M566,162 l10,-6M582,146 l10,-6" stroke="#B88A10" stroke-width="2"/></g>';
    s += '<g fill="#E8E8E0" opacity=".55" stroke="none"><circle cx="560" cy="300" r="3"/><circle cx="574" cy="286" r="2"/><circle cx="430" cy="300" r="2.4"/></g>';
    // gàu gỗ và dây vắt trên thành giếng, lá rụng
    s += '<path d="M760,90 Q700,150 690,210" fill="none" stroke="#8A6A3A" stroke-width="4"/><path d="M676,206 h32 l-4,26 h-24 z" fill="#7A5A3A"/><path d="M680,214 h24" stroke-width="2"/>';
    [[240, 470, 20], [760, 440, 110], [180, 120, 70], [820, 380, 200]].forEach(function (p) { s += '<path d="M' + p[0] + ',' + p[1] + ' q10,-10 22,0 q-10,8 -22,0 z" fill="#B8742E" transform="rotate(' + p[2] + ' ' + p[0] + ' ' + p[1] + ')" stroke-width="1.6"/>'; });
    return khung(s, '#2A2420', '.gon{animation:gon 3.4s ease-out infinite;transform-origin:530px 250px}@keyframes gon{from{transform:scale(.4);opacity:.9}to{transform:scale(1.25);opacity:0}}' +
      '.tayLai{animation:tayLai 4s ease-in-out infinite alternate;transform-origin:518px 300px}@keyframes tayLai{to{transform:rotate(-3deg) translateY(3px)}}');
  };

  // ================= AO THỊ: những bàn tay kéo Đội Ngạn xuống =================
  V.aoNgan = function (b) {
    var r = rng(9), dau = b >= 2;
    var s = '<defs><linearGradient id="paTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1018"/><stop offset="1" stop-color="#18262A"/></linearGradient>' +
      '<linearGradient id="paNuoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E3436"/><stop offset="1" stop-color="#0C1A1C"/></linearGradient>' +
      '<radialGradient id="paDen"><stop offset="0" stop-color="#FFC060" stop-opacity=".7"/><stop offset="1" stop-color="#FFC060" stop-opacity="0"/></radialGradient>' +
      '<clipPath id="paTren"><rect x="0" y="0" width="960" height="' + (dau ? 404 : 540) + '"/></clipPath></defs>';
    s += '<rect width="960" height="540" fill="url(#paTroi)" stroke="none"/>' + trang(170, 92, 36, '#E8E0C0');
    for (var st = 0; st < 30; st++) s += '<circle cx="' + f(r() * 960) + '" cy="' + f(r() * 220) + '" r="' + f(.6 + r()) + '" fill="#D8D8C8" opacity=".6" stroke="none"/>';
    // bờ bên kia: rặng cây đen
    s += '<path d="M0,300 Q120,220 240,270 Q360,200 480,260 Q620,190 760,250 Q860,210 960,240 V330 H0 Z" fill="#0A1210" stroke="none"/>';
    // cây thị cổ thụ nghiêng ra ao, cành chìa, quả thị vàng
    s += '<path d="M960,120 Q840,150 760,190 Q700,214 640,226" fill="none" stroke="#1E1A16" stroke-width="30"/><path d="M820,160 Q790,120 800,80M720,206 Q700,180 712,150" fill="none" stroke="#1E1A16" stroke-width="12"/>';
    [[880, 110, 70], [780, 120, 56], [700, 160, 44]].forEach(function (c) { s += '<ellipse cx="' + c[0] + '" cy="' + c[1] + '" rx="' + c[2] + '" ry="' + (c[2] * .6) + '" fill="#142218" stroke="none"/>'; });
    // mặt ao: trăng soi, gợn
    s += '<path d="M0,340 Q480,312 960,340 V540 H0 Z" fill="url(#paNuoc)"/>';
    s += '<ellipse cx="170" cy="420" rx="40" ry="8" fill="#C8C0A0" opacity=".25" stroke="none"/><path d="M140,436 h60M150,448 h40" stroke="#C8C0A0" stroke-width="2" opacity=".2"/>';
    s += '<path d="M690,350 v70" stroke="#E8B04A" stroke-width="10" opacity=".18"/>';
    // lau sậy hai bên bờ
    var lau = ''; for (var l = 0; l < 22; l++) { var lx = l < 11 ? 10 + l * 14 : 760 + (l - 11) * 18; lau += 'M' + lx + ',540 q' + f((r() - .5) * 20) + ',-80 ' + f((r() - .5) * 30) + ',-' + f(120 + r() * 80); }
    s += '<path d="' + lau + '" fill="none" stroke="#0A1210" stroke-width="4"/>';
    // cành lớn mọc từ gốc thị, chìa dài ra giữa ao, sát mặt nước
    s += '<path d="M960,250 Q780,300 620,346 Q520,374 380,392" fill="none" stroke="' + INK + '" stroke-width="22"/><path d="M960,250 Q780,300 620,346 Q520,374 380,392" fill="none" stroke="#2A2018" stroke-width="17"/><path d="M930,254 Q780,296 620,340" fill="none" stroke="#4A3A2A" stroke-width="3"/>';
    s += '<path d="M420,388 q-20,-30 -16,-62" fill="none" stroke="#2A2018" stroke-width="6"/>';
    if (!dau) s += '<circle cx="404" cy="318" r="30" fill="url(#paDen)" stroke="none"/><circle cx="404" cy="318" r="10" fill="#E8B83A"/><path d="M404,308 v-6" stroke-width="2"/>';
    // đèn lồng treo cành (rơi xuống nước khi bị kéo)
    s += dau ? '<g transform="translate(600,420) rotate(70)"><rect x="-14" y="-18" width="28" height="36" rx="8" fill="#5A3A20"/></g><circle cx="600" cy="420" r="40" fill="url(#paDen)" opacity=".5" stroke="none"/>' :
      '<path d="M700,316 v34" stroke-width="2"/><circle cx="700" cy="366" r="60" fill="url(#paDen)" stroke="none" class="den"/><rect x="686" y="350" width="28" height="36" rx="8" fill="#E8B04A" class="den"/><path d="M686,362 h28M686,374 h28" stroke-width="1.6"/>';
    // Đội Ngạn: đứng với ra đầu cành; bị kéo thì ngửa người, nửa thân chìm, mũ trôi
    var L = G.LOOKS.ngan || G.LOOKS.suGia;
    if (!dau) {
      // đứng trên cành, quay sang trái, một tay vươn tới quả thị ở đầu cành
      s += nguoi(L, 500, 372, 1.05, { view: 'side', prop: null, expr: 'khay' }, false);
      s += '<path d="M494,310 Q456,312 416,322" fill="none" stroke-width="12"/><path d="M494,310 Q456,312 416,322" fill="none" stroke="#8A2A22" stroke-width="7"/><circle cx="412" cy="322" r="6" fill="#EBCDAA" stroke-width="2.4"/>';
      s += '<ellipse cx="500" cy="436" rx="60" ry="10" fill="#0A1414" opacity=".6" stroke="none"/><path d="M470,430 q30,-6 60,0" stroke="#8A2A22" stroke-width="5" opacity=".25"/>';
    } else {
      // tay sau lưng túm đầu, mũ (vẽ trước người), tay bấu hai vai (vẽ sau), mặt vẫn lộ ra
      [[444, 352, .62, -24], [516, 350, .62, 22], [482, 334, .56, 2]].forEach(function (p, i) { s += '<g class="tay" style="animation-delay:' + (i * .12) + 's">' + tay(p[0], p[1], p[2], p[3]) + '</g>'; });
      s += '<g clip-path="url(#paTren)">' + nguoi(L, 474, 470, 1.05, { view: 'front', prop: null, expr: 'soc' }) + '</g>';
      s += '<path d="M380,404 Q480,394 580,404" fill="none" stroke="#5A8A88" stroke-width="3"/>';
      [[420, 414, .66, -58], [540, 414, .66, 58], [404, 392, .5, -80], [556, 390, .5, 80]].forEach(function (p, i) { s += '<g class="tay" style="animation-delay:' + (.36 + i * .1) + 's">' + tay(p[0], p[1], p[2], p[3]) + '</g>'; });
      s += '<g transform="translate(610,396) rotate(-18)"><path d="M-26,0 q26,-26 52,0 z" fill="#2B1F1A"/><path d="M-34,0 h68" stroke-width="4"/></g>'; // mũ trôi
      s += '<g fill="#BFE0E0" stroke="none" opacity=".7"><circle cx="440" cy="396" r="4"/><circle cx="520" cy="390" r="3"/><circle cx="480" cy="380" r="2.4"/><circle cx="560" cy="386" r="3"/></g>';
    }
    s += '<ellipse cx="480" cy="410" rx="130" ry="22" fill="none" stroke="#3A5A5A" stroke-width="3" class="gon"/>';
    return khung(s, '#0C1418', '.tay{animation:troi .55s cubic-bezier(.2,1.4,.4,1) both}@keyframes troi{from{transform:translateY(60px);opacity:0}}.den{animation:den 2s steps(1) infinite}@keyframes den{50%{opacity:.6}}' +
      '.gon{animation:gon2 2s ease-out infinite;transform-origin:480px 410px}@keyframes gon2{from{transform:scale(.6);opacity:1}to{transform:scale(1.6);opacity:0}}',
      '<path d="M920,540 Q900,300 960,200" stroke="#050A08" stroke-width="16" fill="none"/>');
  };

  // ================= NHÀ DỆT CHÁY: lửa bùng ở ba góc cùng lúc =================
  V.nhaDetChay = function () {
    var r = rng(13), s = '<defs><radialGradient id="pcLua"><stop offset="0" stop-color="#FFD070" stop-opacity=".9"/><stop offset=".5" stop-color="#E8601A" stop-opacity=".5"/><stop offset="1" stop-color="#E8601A" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="pcTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E0810"/><stop offset=".7" stop-color="#3A1410"/><stop offset="1" stop-color="#5A2010"/></linearGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#pcTroi)" stroke="none"/>' + trang(840, 80, 30, '#E8B890');
    // khói đen cuộn lên trời
    [[150, 230], [480, 160], [810, 230]].forEach(function (p, i) { s += '<g class="khoi" style="animation-delay:-' + i + 's" opacity=".75" stroke="none" fill="#1A1214">' + [0, 1, 2, 3].map(function (k) { return '<circle cx="' + (p[0] + (k % 2 ? 30 : -24) + k * 8) + '" cy="' + (p[1] - k * 46) + '" r="' + (44 + k * 12) + '"/>'; }).join('') + '</g>'; });
    // dãy nhà dệt: mái ngói, tường, cửa sổ song
    s += '<path d="M90,276 Q100,262 120,262 L480,176 L840,262 Q860,262 870,276 Z" fill="#2A1612"/>';
    var ng = ''; for (var x = 140; x < 830; x += 18) ng += 'M' + x + ',' + f(270 - (480 - Math.abs(x - 480)) * .22) + ' v' + f(14 + (480 - Math.abs(x - 480)) * .22 - 14); s += '<path d="' + ng + '" stroke="#1A0C0A" stroke-width="2"/>';
    s += '<rect x="140" y="276" width="680" height="160" fill="#3A2418"/><rect x="140" y="276" width="680" height="12" fill="#1A0C0A" stroke="none"/>';
    [190, 310, 430, 550, 670].forEach(function (wx, i) {
      s += '<rect x="' + wx + '" y="320" width="70" height="80" fill="' + (i === 2 ? '#FFB040' : '#E8701A') + '" class="cuaso"/>';
      for (var sx = wx + 10; sx < wx + 70; sx += 12) s += '<path d="M' + sx + ',320 v80" stroke="#1A0C0A" stroke-width="5"/>';
      s += '<rect x="' + wx + '" y="320" width="70" height="80" fill="none" stroke-width="4"/>';
    });
    // Bà Tư sau song cửa giữa: bóng người bám song
    s += '<g fill="#140A08" stroke="none"><circle cx="465" cy="346" r="14"/><path d="M448,362 q17,-6 34,0 v40 h-34 z"/><path d="M448,370 l-6,-24 M482,370 l6,-24" stroke="#140A08" stroke-width="7"/></g>';
    // lửa ba góc: nhiều lớp, ngọn liếm
    [[160, 300, 1.1], [800, 300, 1.15], [180, 430, .95]].forEach(function (p, i) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (150 * p[2]) + '" fill="url(#pcLua)" stroke="none"/>';
      s += '<g transform="translate(' + p[0] + ',' + (p[1] + 50) + ') scale(' + p[2] + ')"><g class="lua" style="animation-delay:-' + (i * .23) + 's" stroke="none">' +
        '<path d="M-90,0 q-10,-70 20,-90 q-6,40 18,40 q-10,-90 30,-140 q-4,70 26,80 q8,-50 34,-70 q-8,60 24,100 q14,-30 30,-30 q-10,50 8,110 z" fill="#C8401A"/>' +
        '<path d="M-60,0 q-6,-50 16,-62 q0,30 16,30 q-6,-64 22,-98 q0,52 22,58 q6,-36 22,-50 q-4,46 16,74 q6,20 6,48 z" fill="#FF8A2A"/>' +
        '<path d="M-30,0 q-4,-30 10,-40 q2,20 12,20 q-2,-40 14,-62 q2,34 14,38 q6,-20 14,-26 q0,30 6,70 z" fill="#FFE890"/></g></g>';
    });
    // tàn lửa bay
    for (var e = 0; e < 26; e++) s += '<circle class="tan" style="animation-delay:-' + f(r() * 3) + 's;animation-duration:' + f(2 + r() * 2) + 's" cx="' + f(100 + r() * 760) + '" cy="' + f(260 + r() * 200) + '" r="' + f(1.5 + r() * 2.5) + '" fill="' + (e % 3 ? '#FFB040' : '#FFE890') + '" stroke="none"/>';
    // sân: ánh lửa hắt, người xách xô
    s += '<path d="M0,450 H960 V540 H0 Z" fill="#1A0C08"/><ellipse cx="480" cy="460" rx="460" ry="26" fill="#E8701A" opacity=".18" stroke="none"/>';
    [[380, 474, .62, 'dighe'], [470, 478, .66, 'cam'], [560, 474, .6, 'danLang2']].forEach(function (p) {
      var lk = G.LOOKS[p[3]] || G.LOOKS.danLang2;
      s += '<g opacity=".92">' + nguoi(lk, p[0], p[1], p[2], { view: 'back', prop: null }).replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="#120808"') + '</g>';
    });
    s += '<g fill="#120808" stroke="none"><path d="M640,476 l10,-30 h14 l10,30 z"/><circle cx="657" cy="432" r="11"/><path d="M676,444 h16 l-3,16 h-10 z"/></g>';
    return khung(s, '#120C10', '.lua{animation:lua .35s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}@keyframes lua{to{transform:scaleY(1.14) skewX(-4deg)}}' +
      '.tan{animation:tan 3s linear infinite}@keyframes tan{to{transform:translate(30px,-260px);opacity:0}}' +
      '.khoi{animation:khoi 6s ease-in-out infinite alternate}@keyframes khoi{to{transform:translate(20px,-24px)}}.cuaso{animation:cuaso .5s steps(2) infinite}@keyframes cuaso{50%{fill:#FFC860}}',
      '<rect x="0" y="500" width="960" height="40" fill="#050303"/>' + [40, 160, 840, 910].map(function (x) { return '<rect x="' + x + '" y="380" width="14" height="160" fill="#050303"/>'; }).join(''));
  };

  // ================= CÂY XOAN: nhát rìu, nhựa đỏ như máu, ma giật lưỡi rìu =================
  V.xoanMau = function (b) {
    var r = rng(21), s = '<defs><linearGradient id="pxThan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8A6A54"/><stop offset=".45" stop-color="#7A5A46"/><stop offset="1" stop-color="#4A3426"/></linearGradient></defs>';
    s += '<rect width="960" height="540" fill="#B8BCA8" stroke="none"/><rect width="960" height="540" fill="#4A3A5A" opacity=".18" stroke="none"/>';
    // tán xoan tím phía trên, hoa xoan rơi
    for (var t = 0; t < 14; t++) s += '<circle cx="' + f(r() * 960) + '" cy="' + f(-20 + r() * 90) + '" r="' + f(50 + r() * 50) + '" fill="' + (t % 2 ? '#7A8A5A' : '#6A7A4A') + '" stroke="none" opacity=".85"/>';
    // thân xoan cận cảnh: vỏ nứt dọc, mắt gỗ
    s += '<path d="M370,0 L392,540 L590,540 L572,0 Z" fill="url(#pxThan)"/>';
    var vo = ''; for (var v = 0; v < 22; v++) { var vx = 390 + r() * 170, vy = r() * 520; vo += 'M' + f(vx) + ',' + f(vy) + ' q' + f((r() - .5) * 8) + ',' + f(20 + r() * 20) + ' ' + f((r() - .5) * 4) + ',' + f(40 + r() * 40); }
    s += '<path d="' + vo + '" fill="none" stroke="#3A2618" stroke-width="2" opacity=".7"/><ellipse cx="520" cy="420" rx="14" ry="20" fill="#4A3020"/><ellipse cx="520" cy="420" rx="6" ry="9" fill="#2A1A10"/>';
    // vết chém, nhựa đỏ như máu ộc ra, chảy thành dòng
    s += '<path d="M396,240 L566,206 L562,286 Z" fill="#2A0604"/><path d="M400,244 L560,214" stroke="#C8A888" stroke-width="3"/>';
    s += '<g class="mau"><path d="M480,250 q-30,40 -80,60M500,250 q10,60 -10,140M520,246 q50,20 90,70M490,256 q-60,0 -120,-30M470,256 q-20,20 -40,16" fill="none" stroke="#9A0E08" stroke-width="12"/>' +
      '<g fill="#9A0E08" stroke="none"><circle cx="396" cy="312" r="7"/><circle cx="612" cy="318" r="8"/><circle cx="368" cy="228" r="5"/><circle cx="640" cy="290" r="4"/></g></g>';
    s += '<path class="chay" d="M470,290 q-4,80 2,250M508,290 q6,90 -2,250M540,284 q2,60 0,256" stroke="#7A0806" stroke-width="7" fill="none"/>';
    if (b < 2) {
      // tay lão Mộc nắm cán rìu, lưỡi rìu cắm trong vết chém
      s += '<path d="M566,236 L820,330" stroke="' + INK + '" stroke-width="18"/><path d="M566,236 L820,330" stroke="#8A6A3A" stroke-width="12"/>';
      s += '<path d="M540,200 q40,-6 52,40 l-30,20 q-6,-34 -22,-60 z" fill="#A8AEB2"/>';
      s += '<path d="M700,270 q20,-14 40,0 q10,20 -6,34 q-24,6 -38,-10 z M770,300 q20,-12 38,2 q8,20 -8,32 q-22,4 -34,-12 z" fill="#C8A47A"/>';
    } else {
      // lưỡi rìu bị giật ngược ra, dấu bàn tay tái nhợt hiện trên vỏ cây
      s += '<g class="riu"><path d="M620,170 q64,-12 74,52 l-42,22 q-6,-42 -32,-74 Z" fill="#A8AEB2"/><path d="M640,190 L560,140" stroke="#8A6A3A" stroke-width="10"/></g>';
      s += '<path d="M710,150 l130,-60M710,180 l150,-40M700,210 l130,0" stroke="#E9E2D0" stroke-width="4"/>';
      s += '<g class="bantay" opacity=".7">' + tay(470, 160, .9, 8, '#D8E0DC') + '</g>';
    }
    // hoa xoan tím rơi
    for (var h = 0; h < 18; h++) { var hx = r() * 960, hy = r() * 300; s += '<g class="hoa" style="animation-delay:-' + f(r() * 6) + 's" stroke-width="1"><circle cx="' + f(hx) + '" cy="' + f(hy) + '" r="4.4" fill="#B49AD8"/><circle cx="' + f(hx + 6) + '" cy="' + f(hy + 3) + '" r="3.6" fill="#C8B4E8"/><circle cx="' + f(hx + 2) + '" cy="' + f(hy + 7) + '" r="3.4" fill="#A88AD0"/><circle cx="' + f(hx + 2.5) + '" cy="' + f(hy + 3) + '" r="1.4" fill="#F4ECD8" stroke="none"/></g>'; }
    return khung(s, '#B8BCA8', '.mau{animation:phun .6s ease-out}@keyframes phun{from{transform:scale(.2);transform-origin:490px 250px;opacity:0}}' +
      '.riu{animation:bay .5s ease-in forwards}@keyframes bay{from{transform:translate(-200px,60px) rotate(-40deg)}to{transform:none}}' +
      '.chay{stroke-dasharray:260;animation:chay 4s ease-in forwards}@keyframes chay{from{stroke-dashoffset:260}}' +
      '.hoa{animation:hoa 6s linear infinite}@keyframes hoa{to{transform:translate(-40px,300px)}}.bantay{animation:hien 1.4s ease-out both}@keyframes hien{from{opacity:0}}');
  };
  // ================= HỒI ỨC 1 · RUỘNG TÉP: bàn tay dưới bùn kéo Tấm xuống =================
  // mặt cắt ruộng nước lúc chạng vạng: trên mặt nước thấy Tấm đang mò tép, dưới nước đục là bùn; 1 bọt bùn, 2 bàn tay trồi lên, 3 chộp cổ tay kéo xuống
  V.hupBun = function (b) {
    var r = rng(33), MN = 372;
    var s = '<defs><linearGradient id="hbTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A2A3A"/><stop offset=".7" stop-color="#8A5A4A"/><stop offset="1" stop-color="#B8805A"/></linearGradient>' +
      '<linearGradient id="hbNuoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A6A40" stop-opacity=".55"/><stop offset=".5" stop-color="#2E3820" stop-opacity=".8"/><stop offset="1" stop-color="#141A0C" stop-opacity=".95"/></linearGradient></defs>';
    // trời chạng vạng, ruộng lúa xa, cò bay
    s += '<rect width="960" height="' + MN + '" fill="url(#hbTroi)" stroke="none"/>' + trang(150, 90, 26, '#F0C890');
    s += '<path d="M0,' + (MN - 40) + ' Q240,' + (MN - 60) + ' 480,' + (MN - 44) + ' T960,' + (MN - 50) + ' V' + MN + ' H0 Z" fill="#4A5A2E" stroke="none"/>';
    var lua = ''; for (var l = 0; l < 90; l++) { var lx = r() * 960; lua += 'M' + f(lx) + ',' + MN + ' q' + f((r() - .5) * 6) + ',-' + f(20 + r() * 20) + ' ' + f((r() - .5) * 10) + ',-' + f(30 + r() * 24); }
    s += '<path d="' + lua + '" stroke="#5E7238" stroke-width="2.4" fill="none"/>';
    s += '<path d="M700,120 q10,-8 20,0 q10,-8 20,0M760,96 q8,-6 16,0 q8,-6 16,0" fill="none" stroke="#E8E0D0" stroke-width="2.4"/>';
    // dưới nước: bùn đáy, gốc lúa cắm xuống bùn
    s += '<rect y="' + MN + '" width="960" height="' + (540 - MN) + '" fill="#3A4428" stroke="none"/>';
    s += '<path d="M0,452 Q200,436 420,450 T960,444 V540 H0 Z" fill="#2A2014"/><path d="M0,452 Q200,436 420,450 T960,444" fill="none" stroke="#4A3A20" stroke-width="3"/>';
    var goc = ''; for (var g = 0; g < 22; g++) { var gx = 20 + g * 44 + r() * 10; goc += 'M' + f(gx) + ',' + MN + ' L' + f(gx + (r() - .5) * 8) + ',' + f(446 + r() * 6); }
    s += '<path d="' + goc + '" stroke="#4A5A30" stroke-width="3" opacity=".8"/>';
    // Tấm đứng mò tép: nửa trên khỏi mặt nước, nửa dưới chìm trong nước đục
    var keo = b === 3;
    s += '<g' + (keo ? ' class="hbChim"' : '') + '>' + G.sprite.ve(G.LOOKS.tam, { view: 'front', tu: keo ? 'keo' : 'dung', x: 470, y: 448, k: 1.4, them: { expr: keo ? 'soc' : (b === 2 ? 'nghi' : null), eyes: keo ? 'big' : 'down' } });
    if (keo) s += tay(418, 470, 1.15, 196, '#8E9A8C') + '<path d="M408,392 q16,-6 30,0" stroke="#5A0A06" stroke-width="3" fill="none" opacity=".8"/>'; // bàn tay từ bùn nắm cổ tay
    s += '</g>';
    s += '<rect y="' + MN + '" width="960" height="' + (540 - MN) + '" fill="url(#hbNuoc)" stroke="none"/>';
    s += '<path d="M0,' + MN + ' Q120,' + (MN - 4) + ' 240,' + MN + ' T480,' + MN + ' T720,' + MN + ' T960,' + MN + '" fill="none" stroke="#C8D0A8" stroke-width="3" opacity=".8"/>';
    s += '<ellipse cx="470" cy="' + MN + '" rx="' + (keo ? 120 : 70) + '" ry="8" fill="none" stroke="#D8E0C0" stroke-width="2" class="hbGon"/>';
    // bọt bùn, đục ngầu
    for (var i = 0; i < 26; i++) s += '<circle class="bot" style="animation-delay:-' + f(r() * 4) + 's" cx="' + f(380 + r() * 200) + '" cy="' + f(392 + r() * 56) + '" r="' + f(2 + r() * 4) + '" fill="none" stroke="#A8B890" stroke-width="1.5" opacity=".6"/>';
    if (b === 1) s += '<ellipse cx="520" cy="448" rx="60" ry="12" fill="#3A2E1A" stroke="none"/><circle class="bot" cx="520" cy="436" r="9" fill="none" stroke="#C8D0A8" stroke-width="2"/>';
    // bàn tay xám mọc lên từ bùn cạnh chân
    if (b === 2) s += '<g class="troi">' + tay(540, 400, 1.25, -6, '#8E9A8C') + '<path d="M505,452 q36,-14 72,0" stroke="#2A2014" stroke-width="22" fill="none"/></g>';
    if (keo) s += '<g fill="#2A2014" stroke="none" opacity=".75" class="hbBun"><ellipse cx="430" cy="448" rx="70" ry="22"/><ellipse cx="490" cy="436" rx="50" ry="16"/></g>';
    return khung(s, '#141A0C', '.bot{animation:bot 4s linear infinite}@keyframes bot{to{transform:translateY(-140px);opacity:0}}' +
      '.troi{animation:troi2 2.6s cubic-bezier(.3,0,.2,1) both}@keyframes troi2{from{transform:translateY(120px)}}' +
      '.hbChim{animation:hbChim 3s cubic-bezier(.6,0,.9,.6) both}@keyframes hbChim{to{transform:translate(-10px,150px)}}' +
      '.hbGon{animation:hbGon 1.6s ease-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes hbGon{from{transform:scale(.5);opacity:1}to{transform:scale(1.6);opacity:0}}' +
      '.hbBun{animation:hbBun 3s ease-out both;transform-box:fill-box;transform-origin:50% 100%}@keyframes hbBun{from{transform:scale(.2);opacity:0}}');
  };

  // ================= HỒI ỨC 4 · ĐÊM DƯỚI GỐC CAU: bàn tay đeo nhẫn bạc vung rìu =================
  // nhìn từ mặt đất (chỗ Tấm nằm) ngước lên: 1 kẻ đứng giơ rìu, 2 nhát rìu, máu bắn, 3 cận chiếc nhẫn (giữ tranh cận cũ)
  var riuNhan0 = V.riuNhan;
  V.riuNhan = function (b) {
    if (b >= 3) return riuNhan0(b);
    var r = rng(41), s = '<defs><radialGradient id="rnTrang" cx=".78" cy=".2" r=".6"><stop offset="0" stop-color="#C89890" stop-opacity=".35"/><stop offset="1" stop-color="#C89890" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="960" height="540" fill="#0E0A0E" stroke="none"/><rect width="960" height="540" fill="url(#rnTrang)" stroke="none"/>' + trang(780, 96, 44, '#D8A8A0');
    for (var i = 0; i < 30; i++) s += '<circle cx="' + f(r() * 960) + '" cy="' + f(r() * 260) + '" r="' + f(.5 + r()) + '" fill="#D8C8C8" opacity=".5" stroke="none"/>';
    // thân cau nhìn ngược lên, tàu lá đen in trên trăng
    s += '<g style="filter:brightness(.25) saturate(.3)">' + G.ve.cau(610, 560, 520, rng(8)) + '</g>';
    s += '<path d="M600,420 L622,410 L622,446 L600,452 Z" fill="#1A0606"/>';
    // kẻ cầm rìu: bóng tối cao lớn, nhẫn bạc loé, nhìn từ dưới đất lên
    // viền sáng ánh trăng đỏ quanh bóng người để tách khỏi nền đêm
    s += '<g style="filter:drop-shadow(0 0 2px #D89890) drop-shadow(0 0 10px rgba(200,110,100,.55))">' +
      G.sprite.ve(G.LOOKS.dighe, { view: 'side', tu: 'riu', x: 476, y: 506, k: 1.6, riu: true, nhan: true, bong: '#1A1016', id: 'rn-ke' }).replace('class="sp sp-riu', 'class="sp sp-riu' + (b === 2 ? ' chat' : '')) + '</g>';
    if (b === 2) {
      s += '<g class="ban">';
      for (var k = 0; k < 18; k++) { var a = -1.4 + k * 0.16, rr = 40 + (k * 37 % 140); s += '<ellipse cx="' + f(600 + Math.cos(a) * rr) + '" cy="' + f(430 + Math.sin(a) * rr) + '" rx="' + (4 + k % 6) + '" ry="' + (3 + k % 4) + '" fill="#8A0A06" stroke="none"/>'; }
      s += '</g><path class="chay" d="M606,452 q-4,40 2,90M618,448 q6,50 -2,100" stroke="#7A0806" stroke-width="6" fill="none"/>';
    }
    // tiền cảnh: bàn tay Tấm nằm sõng soài dưới đất, tàu cau rụng, cỏ
    s += '<path d="M0,500 Q300,480 960,500 V540 H0 Z" fill="#06040A" stroke="none"/>';
    s += '<g transform="translate(120,520) rotate(-20)"><path d="M0,0 L80,-30 q10,-4 14,4 l18,-14 q8,-4 10,4 l-8,16 l16,-8 q8,-2 8,6 l-14,14 q-30,20 -70,22 z" fill="#C8BCA8" stroke-width="3"/><circle cx="62" cy="-20" r="0" /></g>';
    s += '<path d="M40,540 q60,-40 160,-60M60,540 q40,-30 110,-40" fill="none" stroke="#10140C" stroke-width="10"/>';
    return khung(s, '#0E0A0E', '.ban{animation:ban .35s ease-out .32s both;transform-origin:600px 430px}@keyframes ban{from{transform:scale(.2);opacity:0}}' +
      '.chay{stroke-dasharray:120;animation:chay 2.4s ease-in .4s both}@keyframes chay{from{stroke-dashoffset:120}}');
  };
  // ================= CẬN CHIẾC NHẪN BẠC: bàn tay nắm cán rìu, máu nhỏ từ nhẫn =================
  // dùng chung cho bước 3 hồi ức "riuNhan" và khung cuối phim mở đầu (G.cine)
  V.canNhan = function () {
    var r = rng(57), Ve = G.ve;
    var s = '<defs><radialGradient id="cnTrang" cx=".85" cy=".1" r=".75"><stop offset="0" stop-color="#B85A50" stop-opacity=".55"/><stop offset=".5" stop-color="#4A1A1E" stop-opacity=".35"/><stop offset="1" stop-color="#0A0608" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="cnCan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A6440"/><stop offset=".5" stop-color="#6A4A2E"/><stop offset="1" stop-color="#3A2616"/></linearGradient>' + Ve.defsNhan + '</defs>';
    s += '<rect width="960" height="540" fill="#0A0608" stroke="none"/><rect width="960" height="540" fill="url(#cnTrang)" stroke="none"/>';
    // thân cau mờ phía sau, vết chém rỉ máu
    s += '<g opacity=".55" style="filter:blur(3px)"><path d="M720,0 L750,0 L780,540 L736,540 Z" fill="#5A5248" stroke="none"/><path d="M732,300 L768,284 L772,330 L736,338 Z" fill="#2A0604" stroke="none"/><path d="M750,334 q4,60 -2,140" stroke="#5A0604" stroke-width="8" fill="none"/></g>';
    // cán rìu chéo khung (từ dưới trái lên trên phải), lưỡi rìu dính máu; cánh tay đi xuống từ phía trên, bàn tay nắm cán
    s += '<g transform="translate(400,340) rotate(-22)">';
    s += '<g transform="translate(-20,0) scale(1.18)">' + Ve.ngonCai() + '</g>'; // ngón cái nằm dưới cán: vẽ trước cán
    s += '<rect x="-560" y="-26" width="1000" height="52" rx="22" fill="url(#cnCan)"/>';
    var van = ''; for (var v = 0; v < 9; v++) { var vy = -18 + v * 4.4; van += 'M' + f(-540 + r() * 60) + ',' + f(vy) + ' q260,' + f((r() - .5) * 6) + ' 520,0 t460,0'; }
    s += '<path d="' + van + '" fill="none" stroke="#3A2414" stroke-width="1.2" opacity=".55"/><path d="M-540,-18 H420" stroke="#B88A5A" stroke-width="3" opacity=".6"/>';
    s += '<g transform="translate(420,0)"><path d="M-10,-40 Q60,-120 170,-112 Q190,-30 150,60 Q60,70 -10,40 Z" fill="#9AA2A8"/><path d="M40,-80 Q140,-104 166,-96" fill="none" stroke="#E8EEF2" stroke-width="5"/>' +
      '<path d="M120,-110 Q186,-30 150,58" fill="none" stroke="#5A0806" stroke-width="10"/><path d="M60,-60 q30,40 10,100 l20,4 q24,-60 -10,-108 z" fill="#7A0A06" opacity=".85" stroke="none"/><rect x="-24" y="-46" width="30" height="92" rx="6" fill="#4A3426"/></g>';
    s += '<g transform="translate(-20,0) scale(1.18)">' + Ve.banTay({ kieu: 'nam', nhan: true, mau: true, ao: '#5A3048', caiRieng: true }) + '</g>';
    // máu chảy từ nhẫn xuống đốt ngón
    s += '<path d="M14,-4 q-4,22 2,44 q2,12 -2,22" fill="none" stroke="#7A0806" stroke-width="7" class="cnChay"/><path d="M42,-8 q4,18 0,32" fill="none" stroke="#7A0806" stroke-width="5" class="cnChay"/>';
    s += '</g>';
    // giọt máu rơi khỏi đầu ngón tay
    [[432, 372, 0], [454, 364, .7], [412, 382, 1.3]].forEach(function (p) { s += '<path class="cnGiot" style="animation-delay:' + p[2] + 's" d="M' + p[0] + ',' + p[1] + ' q9,20 0,32 q-9,-12 0,-32 Z" fill="#8A0A06" stroke-width="2"/>'; });
    s += '<ellipse cx="434" cy="536" rx="70" ry="10" fill="#4A0404" stroke="none" opacity=".8"/>';
    return khung(s, '#0A0608', Ve.cssNhan +
      '.cnGiot{animation:cnGiot 1.9s ease-in infinite}@keyframes cnGiot{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(160px);opacity:0}}' +
      '.cnChay{stroke-dasharray:90;animation:cnChay 3s ease-in both}@keyframes cnChay{from{stroke-dashoffset:90}}', '<rect width="960" height="540" fill="#5A0000" opacity=".12"/>');
  };
  V.riuNhan = (function (moi) { return function (b) { return b >= 3 ? V.canNhan() : moi(b); }; })(V.riuNhan);

  // ================= NHÌN QUA MIỆNG HŨ: bàn tay dán bùa trấn lên miệng hũ =================
  V.quaHu = function () {
    var Ve = G.ve, s = '<rect width="960" height="540" fill="#000" stroke="none"/><circle cx="480" cy="270" r="176" fill="#3A3A48" stroke="none"/>' + trang(480, 270, 30, '#9A9AB0');
    s += '<g class="dan"><g transform="translate(410,120) rotate(3) scale(.82)">' + Ve.bua({ chu: Ve.BUA.tranVong }) + '</g>' +
      '<g transform="translate(600,350) rotate(-130) scale(.62)">' + Ve.banTay({ kieu: 'an', ao: '#2B2A33', da: '#C8B49A', da2: '#A08A70' }) + '</g></g>';
    s += '<circle cx="480" cy="270" r="336" fill="none" stroke="#000" stroke-width="320"/><circle cx="480" cy="270" r="176" fill="none" stroke="#2A2420" stroke-width="10"/>';
    return khung(s, '#000', '.dan{animation:dan 1.4s ease-in both}@keyframes dan{from{transform:translate(260px,0) scale(1.4);opacity:0}}');
  };
})();
