// Cắt cảnh (cutscene) cho các khoảnh khắc quan trọng: khung điện ảnh, máy quay đẩy/lia, chữ dẫn, tiếng động, chớp, rung.
// G.cut.play([{ ve: 'tenCanh', chu: '...', dur: 3000, sfx: 'stinger', cam: [tuScale, tuX, tuY, denScale, denX, denY], chop: true, rung: true, buoc: 1 }])
var G = window.G || (window.G = {});
G.cut = { ve: {} };

(function () {
  var C = G.cut, V = C.ve, $ = G.$, INK = G.INK;
  var skip = false;

  function khung(inner, bg, style, gan) {
    return '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><style>' + (style || '') + '</style><rect width="960" height="540" fill="' + bg + '"/>' +
      '<g class="cam"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></g>' +
      (gan ? '<g class="gan"><g stroke="none">' + gan + '</g></g>' : '') + '</svg>';
  }
  function coGan(mau, y, n) { // cỏ cận cảnh
    var s = ''; for (var i = 0; i < (n || 26); i++) { var x = i * (1000 / (n || 26)) - 20, h = 40 + (i * 37 % 50); s += '<path d="M' + x + ',540 q6,-' + h + ' 14,-' + (h + 10) + ' q-2,' + (h / 2) + ' 6,' + (h + 10) + ' z" fill="' + mau + '"/>'; }
    return '<g transform="translate(0,' + (y || 0) + ')">' + s + '</g>';
  }
  function trang(x, y, r, mau) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.8) + '" fill="' + (mau || '#E8D8A8') + '" opacity=".18" stroke="none"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (mau || '#E8D8A8') + '" stroke="none"/>'; }
  function quaDau(n, y0, rong) { var s = ''; for (var i = 0; i < n; i++) { var x = 30 + i * (rong / n), y = y0 + (i % 3) * 6; s += '<path d="M' + x + ',' + y + ' q7,-12 14,0 q-7,4 -14,0 z" fill="#0A0808" stroke="none"/><circle cx="' + (x + 10) + '" cy="' + (y - 7) + '" r="1.6" fill="#E8C030" stroke="none"/>'; } return s; }
  function bong(x, y, s, mau) { // dáng người chibi đen, s: tỉ lệ
    mau = mau || '#0A0808';
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="' + mau + '" stroke="none"><circle cx="0" cy="-74" r="26"/><path d="M-22,-50 Q0,-58 22,-50 L28,0 Q0,8 -28,0 Z"/></g>';
  }

  // ---------- tranh cảnh ----------
  V.gieng = function () { // miệng giếng nhìn xuống, mặt nước gợn, bàn tay nắm lông vàng nổi lên
    var s = '<circle cx="480" cy="270" r="250" fill="#8A8478"/><circle cx="480" cy="270" r="200" fill="#142020"/>';
    for (var r = 40; r < 200; r += 36) s += '<circle class="gon" cx="480" cy="270" r="' + r + '" fill="none" stroke="#3A5A5A" stroke-width="3" style="animation-delay:-' + (r / 60) + 's"/>';
    s += '<path d="M430,420 L460,300 q6,-16 16,-6 L480,330 L488,290 q8,-10 14,2 L494,340 L510,310 q8,-6 12,4 L500,400 L480,440 Z" fill="#C8C0B0"/>';
    s += '<path d="M490,290 Q520,220 580,200 Q540,250 498,296 Z" fill="#E8C030"/>';
    return khung(s, '#2A2420', '.gon{animation:gon 3s ease-out infinite;transform-origin:480px 270px}@keyframes gon{from{transform:scale(.6);opacity:1}to{transform:scale(1.3);opacity:0}}');
  };
  V.xoanMau = function (b) { // thân xoan, nhát rìu, nhựa đỏ phun; buoc 2: lưỡi rìu bay ngược
    var s = '<rect width="960" height="540" fill="#C8CCB8" stroke="none"/><path d="M380,0 L400,540 L580,540 L560,0 Z" fill="#7A5A4A"/>';
    for (var y = 30; y < 540; y += 50) s += '<path d="M400,' + y + ' q80,10 160,0" fill="none" stroke-width="2" opacity=".5"/>';
    s += '<path d="M400,240 L560,210 L556,280 Z" fill="#3A0A06"/>';
    s += '<g class="mau"><path d="M480,250 q-30,40 -80,60M500,250 q10,60 -10,140M520,246 q50,20 90,70M490,256 q-60,0 -120,-30" fill="none" stroke="#B0140A" stroke-width="12"/></g>';
    if (b >= 2) s += '<g class="riu"><path d="M600,180 q60,-10 70,50 l-40,20 q-6,-40 -30,-70 Z" fill="#A8AEB2"/><path d="M700,140 l120,-60M700,170 l140,-40M690,200 l120,0" stroke="#E9E2D0" stroke-width="4"/></g>';
    return khung(s, '#C8CCB8', '.mau{animation:phun .6s ease-out}@keyframes phun{from{transform:scale(.2);transform-origin:490px 250px;opacity:0}}' +
      '.riu{animation:bay .5s ease-in forwards}@keyframes bay{from{transform:translate(-260px,60px) rotate(-40deg)}to{transform:none}}');
  };
  V.nhaDetChay = function () { // dãy nhà dệt trong đêm, lửa bùng ba góc, bóng người dưới sân
    var s = '<rect width="960" height="540" fill="#120C10" stroke="none"/>' + trang(820, 90, 40);
    s += '<path d="M120,280 L480,170 L840,280 Z" fill="#2A1A14"/><rect x="150" y="280" width="660" height="150" fill="#3A2A20"/>';
    [180, 300, 420, 540, 660].forEach(function (x) { s += '<rect x="' + x + '" y="330" width="60" height="100" fill="#120A08"/>'; });
    [[150, 300], [810, 300], [150, 420]].forEach(function (p, i) {
      s += '<g class="lua" style="animation-delay:-' + (i * .3) + 's"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="90" fill="#E8701A" opacity=".55" stroke="none"/>' +
        '<path d="M' + (p[0] - 60) + ',' + (p[1] + 40) + ' q20,-120 50,-30 q20,-140 50,0 q20,-90 40,30 z" fill="#FFB040" stroke="none"/><path d="M' + (p[0] - 30) + ',' + (p[1] + 40) + ' q14,-70 30,-10 q14,-60 26,10 z" fill="#FFE890" stroke="none"/></g>';
    });
    s += '<path d="M0,470 H960 V540 H0 Z" fill="#0A0606"/>' + bong(420, 500, .9) + bong(500, 505, .85) + bong(570, 500, .95);
    return khung(s, '#120C10', '.lua{animation:lua .4s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 100%}@keyframes lua{to{transform:scaleY(1.12) skewX(-3deg)}}', '<rect x="0" y="470" width="960" height="70" fill="#050303"/>' + [60, 180, 820, 900].map(function (x) { return '<rect x="' + x + '" y="380" width="14" height="160" fill="#050303"/>'; }).join(''));
  };
  V.aoNgan = function (b) { // ao đêm, đèn lồng treo cành, những bàn tay nhỏ trồi lên quanh một người
    var s = '<rect width="960" height="540" fill="#0C1418" stroke="none"/>' + trang(160, 90, 34);
    s += '<path d="M600,0 Q560,160 700,240" stroke="#1E1A16" stroke-width="22" fill="none"/><path d="M640,170 v40" stroke="#1E1A16" stroke-width="3"/><rect x="626" y="210" width="28" height="36" rx="8" fill="#E8B04A" class="den"/>';
    s += '<ellipse cx="480" cy="410" rx="460" ry="120" fill="#16282A"/><ellipse cx="480" cy="400" rx="420" ry="90" fill="#1E3436"/>';
    s += bong(480, 400, b >= 2 ? .7 : 1, '#0A0808');
    if (b >= 2) [[400, 410], [440, 380], [520, 384], [560, 412], [470, 430], [500, 360]].forEach(function (p, i) {
      s += '<path class="tay" style="animation-delay:' + (i * .12) + 's" d="M' + p[0] + ',' + (p[1] + 30) + ' l-6,-40 q0,-8 6,-6 l4,26 l2,-34 q4,-6 8,0 l0,32 l6,-26 q6,-4 8,2 l-6,46 z" fill="#B8C8C8"/>';
    });
    s += '<ellipse cx="480" cy="420" rx="120" ry="20" fill="none" stroke="#3A5A5A" stroke-width="3" class="gon"/>';
    return khung(s, '#0C1418', '.tay{animation:troi .5s ease-out both}@keyframes troi{from{transform:translateY(40px);opacity:0}}.den{animation:den 2s steps(1) infinite}@keyframes den{50%{opacity:.6}}' +
      '.gon{animation:gon2 2s ease-out infinite;transform-origin:480px 420px}@keyframes gon2{from{transform:scale(.6);opacity:1}to{transform:scale(1.6);opacity:0}}', coGan('#0A1210', 0, 18) + '<path d="M920,540 Q900,300 960,200" stroke="#0A1210" stroke-width="16" fill="none"/>');
  };
  V.quaThi = function (b) { // quả thị rụng vào bị; buoc 2: bổ ra là đầu chim
    var s = '<rect width="960" height="540" fill="#0E1810" stroke="none"/>';
    for (var i = 0; i < 9; i++) s += '<circle cx="' + (200 + i * 70) + '" cy="' + (90 + (i % 3) * 30) + '" r="80" fill="#1E3020" stroke="none"/>';
    if (b < 2) s += '<g class="roi"><circle cx="480" cy="160" r="70" fill="#FFD98A" opacity=".25" stroke="none"/><circle cx="480" cy="160" r="30" fill="#E8C030"/></g><path d="M400,420 q80,60 160,0 l-20,90 h-120 z" fill="#7A5A3A"/>';
    else s += '<path d="M330,280 Q330,140 480,134 Q630,140 630,280 Z" fill="#C9A23A"/><path d="M360,286 Q480,262 600,286" fill="#3A2A1A"/><circle cx="480" cy="286" r="56" fill="#E8C030"/><circle cx="500" cy="270" r="11" fill="#F3EEDF"/><circle cx="502" cy="270" r="5" fill="#2B1F1A" stroke="none"/><path d="M530,288 l34,8 l-34,8 z" fill="#C88A2A"/>';
    return khung(s, '#0E1810', '.roi{animation:roi1 1.2s cubic-bezier(.5,0,.9,.4) forwards}@keyframes roi1{to{transform:translateY(270px)}}');
  };
  V.thayCaRa = function () { // trăng, mái cung đầy quạ, Thầy Cả bước ra khỏi bóng tối
    var s = '<rect width="960" height="540" fill="#100E18" stroke="none"/>' + trang(760, 110, 60);
    s += '<path d="M0,250 L300,170 L600,250 Z" fill="#221A24"/><path d="M500,260 L760,190 L960,260 Z" fill="#221A24"/>' + quaDau(18, 205, 560) + '<g transform="translate(500,0)">' + quaDau(10, 228, 440) + '</g>';
    s += '<path d="M0,470 H960 V540 H0 Z" fill="#0A080C"/>';
    s += '<g class="ra"><g transform="translate(480,440) scale(1.6)" stroke="none"><circle cx="0" cy="-74" r="26" fill="#1A161E"/><path d="M-22,-50 Q0,-58 22,-50 L28,0 Q0,8 -28,0 Z" fill="#1A161E"/>' +
      '<path d="M-12,-60 Q0,-40 12,-60 Q0,-46 -12,-60 Z" fill="#E9E2D0"/><circle cx="-26" cy="-78" r="2.4" fill="#E9E2D0"/><ellipse cx="30" cy="-20" rx="10" ry="8" fill="#A0602E"/></g></g>';
    return khung(s, '#100E18', '.ra{animation:ra 2.6s ease-out both}@keyframes ra{from{opacity:0;transform:translateY(20px)}}', '<path d="M0,0 H960 V40 Q480,70 0,40 Z" fill="#050408"/>' + '<g transform="translate(0,-130)">' + quaDau(14, 40, 900).replace(/#0A0808/g, '#050408') + '</g>');
  };
  V.chiEm = function () { // bình minh, hai chị em ôm nhau bên miệng hố, sợi chỉ đỏ
    var s = '<rect width="960" height="540" fill="#E8C8A0" stroke="none"/><circle cx="480" cy="460" r="300" fill="#F4DCB0" opacity=".7" stroke="none"/>';
    s += '<path d="M0,430 Q480,400 960,430 V540 H0 Z" fill="#7A8A58"/><ellipse cx="640" cy="450" rx="110" ry="26" fill="#3A2418"/>';
    s += '<g transform="translate(450,440) scale(1.3)"><g fill="#2B1F1A" stroke="none"><circle cx="-22" cy="-74" r="26"/><path d="M-44,-50 Q-22,-58 0,-50 L6,0 Q-22,8 -50,0 Z"/><circle cx="26" cy="-70" r="24"/><path d="M6,-48 Q26,-56 46,-48 L50,0 Q26,8 2,0 Z"/></g></g>';
    s += '<path d="M500,360 Q580,400 640,446" fill="none" stroke="#C8241A" stroke-width="4"/>';
    return khung(s, '#E8C8A0', '', coGan('#5A6A40', 20));
  };
  V.quaHu = function () { // nhìn qua miệng hũ, bàn tay dán bùa
    var s = '<rect width="960" height="540" fill="#000" stroke="none"/><circle cx="480" cy="270" r="170" fill="#3A3A48" stroke="none"/>' + trang(480, 270, 30, '#9A9AB0');
    s += '<g class="dan"><path d="M400,150 L560,160 L540,390 L420,380 Z" fill="#E8CB6A"/><path d="M480,170 v190M450,220 h60M456,290 q24,-24 48,0" fill="none" stroke="#8A1A10" stroke-width="4"/>' +
      '<path d="M560,320 q70,-20 110,30 l-50,50 q-30,-50 -60,-30 z" fill="#D8C2A0"/></g>';
    s += '<circle cx="480" cy="270" r="330" fill="none" stroke="#000" stroke-width="320"/>';
    return khung(s, '#000', '.dan{animation:dan 1.4s ease-in both}@keyframes dan{from{transform:translate(260px,0) scale(1.4);opacity:0}}');
  };
  V.mo = function (b) { // mở đầu chương: chữ trên nền tối
    return khung('', '#0A0808');
  };

  // ---------- tranh kinh dị chi tiết ----------
  function tayNguoi(x, y, s, xoay, mau, mong) { // bàn tay xoè, ngón dài, có khớp
    mau = mau || '#9AA49A';
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (xoay || 0) + ') scale(' + s + ')">' +
      '<path d="M-26,90 L-30,30 Q-32,14 -22,14 L-16,38 L-18,-34 Q-16,-46 -8,-44 L-4,22 L0,-56 Q4,-66 11,-62 L12,20 L20,-46 Q24,-56 31,-50 L26,26 L38,-14 Q44,-22 49,-14 L38,46 Q30,84 6,94 Z" fill="' + mau + '"/>' +
      '<path d="M-12,-10 h8M4,-24 h8M20,-14 h8M-22,30 h6" stroke-width="2" opacity=".6"/>' +
      (mong ? '<path d="M-14,-40 l4,-2M4,-60 l5,-1M24,-50 l4,0M44,-18 l3,1" stroke="#3A2A20" stroke-width="5"/>' : '') + '</g>';
  }
  V.hupBun = function (b) { // dưới ruộng nước đục: 1 bọt bùn, 2 bàn tay trồi lên, 3 bàn tay chộp cổ tay Tấm
    var s = '<defs><radialGradient id="hbN" cx="50%" cy="20%" r="90%"><stop offset="0" stop-color="#4A5A40"/><stop offset=".6" stop-color="#1E2618"/><stop offset="1" stop-color="#080A06"/></radialGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#hbN)" stroke="none"/>';
    for (var i = 0; i < 40; i++) s += '<circle class="bot" style="animation-delay:-' + (i * 0.37 % 4).toFixed(2) + 's" cx="' + (i * 97 % 960) + '" cy="' + (200 + i * 53 % 320) + '" r="' + (2 + i % 5) + '" fill="none" stroke="#8A9A7A" stroke-width="1.5" opacity=".5"/>';
    for (var k = 0; k < 14; k++) s += '<path d="M' + (k * 74) + ',540 q10,-' + (120 + k * 13 % 80) + ' -6,-' + (240 + k * 29 % 120) + '" fill="none" stroke="#2A3420" stroke-width="7" opacity=".8"/>';
    s += '<path d="M0,430 Q240,400 480,424 T960,410 V540 H0 Z" fill="#1A140C"/>';
    if (b === 1) s += '<ellipse cx="480" cy="424" rx="90" ry="14" fill="#2A2014"/><circle class="bot" cx="470" cy="400" r="10" fill="none" stroke="#8A9A7A" stroke-width="2"/>';
    if (b >= 2) s += '<g class="troi">' + tayNguoi(470, 420, 1.6, -8, '#8E9A8C', true) + '<path d="M420,470 q50,-20 100,0" stroke="#1A140C" stroke-width="30" fill="none"/></g>';
    if (b === 3) s += tayNguoi(560, 180, 1.4, 160, '#E2C4A0') + '<path d="M500,240 Q540,250 590,236" stroke="#6A7A68" stroke-width="18" fill="none"/>' +
      '<path d="M520,260 q4,30 -6,50M560,256 q6,24 0,40" stroke="#5A0A06" stroke-width="4" fill="none" opacity=".8"/>';
    return khung(s, '#080A06', '.bot{animation:bot 4s linear infinite}@keyframes bot{to{transform:translateY(-260px);opacity:0}}' +
      '.troi{animation:troi2 2.6s cubic-bezier(.3,0,.2,1) both}@keyframes troi2{from{transform:translateY(160px)}}',
      '<rect width="960" height="540" fill="#3A4A30" opacity=".18"/>' + coGan('#0A0C06', 30, 14));
  };
  V.riuNhan = function (b) { // đêm gốc cau: 1 tay đeo nhẫn bạc vung rìu, 2 nhát rìu máu bắn, 3 cận chiếc nhẫn dính máu
    var s = '<rect width="960" height="540" fill="#0E0A0E" stroke="none"/>' + trang(780, 100, 46, '#C8A8A0');
    if (b < 3) {
      s += '<path d="M560,540 L572,0 L612,0 L626,540 Z" fill="#6A6050"/>';
      for (var y = 30; y < 540; y += 40) s += '<path d="M566,' + y + ' h56" stroke-width="2" opacity=".5"/>';
      s += '<path d="M560,300 L626,270 L626,330 L560,338 Z" fill="#1A0606"/>';
      s += '<g class="vung"><path d="M0,520 Q160,430 330,330 L360,360 Q200,460 40,560 Z" fill="#D8B898"/>' +
        '<ellipse cx="300" cy="352" rx="13" ry="9" fill="none" stroke="#EEF2F4" stroke-width="6"/><circle cx="294" cy="346" r="3" fill="#FFF" stroke="none"/>' +
        '<path d="M330,340 L540,290" stroke="#3A2A1E" stroke-width="16"/><path d="M520,232 q70,-10 78,58 l-50,26 q-4,-48 -28,-84 Z" fill="#B0B6BA"/></g>';
      if (b === 2) {
        s += '<g class="ban">';
        for (var i = 0; i < 16; i++) { var a = -1.2 + i * 0.16, r = 60 + (i * 37 % 120); s += '<ellipse cx="' + (590 + Math.cos(a) * r) + '" cy="' + (300 + Math.sin(a) * r) + '" rx="' + (4 + i % 6) + '" ry="' + (3 + i % 4) + '" fill="#8A0A06" stroke="none"/>'; }
        s += '<path d="M600,330 q-6,60 4,140M620,320 q8,80 -2,170" stroke="#7A0806" stroke-width="7" fill="none"/></g>';
      }
    } else {
      s += '<path d="M0,540 Q200,300 520,240 L620,330 Q300,420 120,540 Z" fill="#D8B898"/><path d="M380,300 q20,-30 60,-36M440,330 q30,-20 70,-24" fill="none" stroke-width="2.5" opacity=".6"/>';
      s += '<ellipse cx="470" cy="300" rx="44" ry="30" fill="none" stroke="#DDE2E6" stroke-width="18"/><ellipse cx="470" cy="300" rx="44" ry="30" fill="none" stroke-width="2"/><path d="M440,284 q20,-12 44,-6" stroke="#FFF" stroke-width="5" fill="none"/>';
      [[500, 330], [520, 360], [450, 340], [540, 300]].forEach(function (p, i) { s += '<path class="nho" style="animation-delay:' + (i * .5) + 's" d="M' + p[0] + ',' + p[1] + ' q6,14 0,22 q-6,-8 0,-22 Z" fill="#8A0A06" stroke="none"/>'; });
      s += '<path d="M420,330 q30,10 90,-4" stroke="#7A0806" stroke-width="6" fill="none"/>';
    }
    return khung(s, '#0E0A0E', '.vung{animation:vung .5s cubic-bezier(.6,0,.9,.5) both;transform-origin:0 540px}@keyframes vung{from{transform:rotate(-14deg)}}' +
      '.ban{animation:ban .35s ease-out both;transform-origin:590px 300px}@keyframes ban{from{transform:scale(.2);opacity:0}}' +
      '.nho{animation:nho 2s ease-in infinite}@keyframes nho{to{transform:translateY(120px);opacity:0}}');
  };
  V.cauThayCa = function (b) { // sáng mù sương: xác thầy vắt ngang ngọn cau non, miệng nhồi cau, máu chảy dọc thân; quạ đậu rỉa
    var s = '<defs><linearGradient id="ctT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AA0A8"/><stop offset=".6" stop-color="#C8C4BC"/><stop offset="1" stop-color="#D8CFC0"/></linearGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#ctT)" stroke="none"/><circle cx="760" cy="130" r="70" fill="#E8D8C8" opacity=".55" stroke="none"/>';
    s += '<ellipse cx="300" cy="300" rx="600" ry="60" fill="#E9E2D0" opacity=".5" stroke="none"/>';
    for (var i = 0; i < 7; i++) { var x = 60 + i * 140; if (Math.abs(x - 480) < 90) continue; s += '<path d="M' + x + ',430 V150" stroke="#8A8878" stroke-width="7" opacity=".7"/><path d="M' + x + ',150 q-40,-20 -70,6M' + x + ',150 q40,-20 70,6M' + x + ',150 q-10,-30 -30,-40M' + x + ',150 q10,-30 30,-40" stroke="#5E7040" stroke-width="7" fill="none" opacity=".7"/>'; }
    s += '<path d="M0,430 Q480,410 960,430 V540 H0 Z" fill="#6E7A58"/>';
    // cau non: thân mảnh, ngọn gãy gập vì sức nặng
    s += '<path d="M476,440 Q480,300 482,170 L490,170 Q490,300 492,440 Z" fill="#A8A088"/>';
    s += '<path d="M484,170 l-24,-10M486,170 l20,-14M486,170 l-6,-22" stroke="#5E7A3A" stroke-width="6"/>';
    // vệt máu chảy dọc thân cau, đọng thành vũng dưới gốc
    s += '<path d="M486,200 q4,60 -2,120 q-3,50 2,110" stroke="#7A0A06" stroke-width="6" fill="none" class="chay"/><ellipse cx="484" cy="442" rx="38" ry="8" fill="#5A0806"/>';
    // xác: cùng model với ngoài cảnh (G.art.xacVat), phóng to; máu từ miệng chảy ngược qua mặt, nhỏ giọt xuống gốc
    s += '<g class="xac"><g transform="translate(342,109) scale(1.8)" stroke-width="2.4">' + G.art.xacVat({ khongQua: true }) + '</g>' +
      '<path class="chay" d="M430,342 q-2,40 2,96M440,344 q3,30 0,80" stroke="#6A0806" stroke-width="4" fill="none"/>' +
      '<ellipse cx="434" cy="442" rx="24" ry="5" fill="#5A0806" stroke="none"/></g>';
    // quạ
    s += '<g fill="#0A0808" stroke="none"><path d="M520,168 q10,-14 24,-8 l10,-6 l-2,8 q8,4 6,12 q-18,4 -38,-6 z"/><circle cx="548" cy="160" r="1.8" fill="#E8C030"/>' +
      '<path d="M600,90 q16,-14 30,0 q16,-14 30,0 q-16,4 -30,10 q-14,-6 -30,-10 z"/><path d="M330,120 q12,-10 22,0 q12,-10 22,0 q-12,3 -22,8 q-10,-5 -22,-8 z"/></g>';
    s += bong(250, 480, .95, '#2A2A30') + bong(340, 490, .85, '#2A2A30') + bong(660, 485, 1, '#2A2A30') + bong(740, 492, .8, '#2A2A30') + '<path d="M266,424 L330,330" stroke="#2A2A30" stroke-width="10"/>';
    if (b === 2) s += '<rect width="960" height="540" fill="#5A0806" opacity=".18" stroke="none"/>';
    return khung(s, '#B8BEC0', '.xac{animation:dua 3s ease-in-out infinite alternate;transform-origin:486px 176px}@keyframes dua{to{transform:rotate(2.5deg)}}' +
      '.chay{stroke-dasharray:300;animation:chay 5s ease-in forwards}@keyframes chay{from{stroke-dashoffset:300}}',
      coGan('#3E4A30', 10) + '<path d="M0,0 Q120,70 60,200" stroke="#2A3020" stroke-width="26" fill="none"/>');
  };
  V.matXac = function () { // cận mặt xác: mắt trợn trắng, miệng căng nứt vì cau non nhồi kín, máu chảy, không có nốt ruồi bên tai trái
    var s = '<rect width="960" height="540" fill="#A8ACA8" stroke="none"/><rect width="960" height="540" fill="#3A1A1A" opacity=".2" stroke="none"/>';
    s += '<g transform="translate(480,290) rotate(170)">';
    s += '<ellipse cx="0" cy="0" rx="200" ry="230" fill="#CFCBBB"/><path class="s" d="M120,-160 Q210,-40 160,140 Q120,40 120,-160 Z"/>';
    s += '<ellipse cx="-202" cy="0" rx="26" ry="50" fill="#C4C0B0"/><ellipse cx="202" cy="0" rx="26" ry="50" fill="#C4C0B0"/>';
    s += '<g><ellipse cx="-80" cy="-50" rx="48" ry="30" fill="#F2F0E8"/><circle cx="-80" cy="-36" r="9" fill="#5A5A50" stroke="none"/><path d="M-130,-60 q50,-30 100,0" fill="none" stroke-width="5"/>' +
      '<ellipse cx="80" cy="-50" rx="48" ry="30" fill="#F2F0E8"/><circle cx="80" cy="-36" r="9" fill="#5A5A50" stroke="none"/><path d="M30,-60 q50,-30 100,0" fill="none" stroke-width="5"/>' +
      '<path d="M-110,-40 q-6,8 -4,18M110,-40 q6,8 4,18" stroke="#8A1A12" stroke-width="2.5" fill="none"/></g>';
    s += '<ellipse cx="0" cy="110" rx="110" ry="70" fill="#2A0604"/>';
    [[-60, 90, '#C9A23A'], [-10, 120, '#6E9A5A'], [44, 96, '#C9A23A'], [70, 130, '#6E9A5A'], [-50, 140, '#6E9A5A'], [10, 80, '#C9A23A'], [-80, 116, '#C9A23A']].forEach(function (p) {
      s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="22" ry="26" fill="' + p[2] + '" stroke-width="2.5"/><path d="M' + (p[0] - 6) + ',' + (p[1] - 18) + ' q6,-8 10,0" fill="none" stroke-width="2"/>';
    });
    s += '<path d="M-110,100 L-130,90M110,100 L132,88" stroke="#7A0A06" stroke-width="7"/>';
    s += '</g>';
    s += '<path class="chay" d="M440,120 q-6,90 4,200M520,110 q8,70 -2,180M480,150 q0,60 6,110" stroke="#7A0806" stroke-width="9" fill="none"/>';
    s += '<g fill="#7A0806" stroke="none" opacity=".85"><circle cx="300" cy="420" r="8"/><circle cx="330" cy="470" r="5"/><circle cx="640" cy="440" r="10"/><circle cx="700" cy="400" r="5"/></g>';
    return khung(s, '#A8ACA8', '.chay{stroke-dasharray:240;animation:chay 4s ease-in forwards}@keyframes chay{from{stroke-dashoffset:240}}');
  };

  // tranh nền cho tiêu đề chương: mỗi chương một hình gợi
  V.motif = function (b) {
    var s = '', bg = '#0A0808';
    if (b === 1) s = trang(700, 190, 70, '#3A3428') + '<g transform="translate(470,250)" fill="#E8C030" stroke="none" opacity=".85"><ellipse rx="34" ry="24"/><circle cx="30" cy="-16" r="16"/><path d="M42,-16 l18,4 l-18,4z" fill="#C88A2A"/><path d="M-30,0 l-40,12 l10,-20z"/></g>';
    if (b === 2) s = '<path d="M200,540 Q300,300 520,180 Q640,120 760,140" fill="none" stroke="#4A3A30" stroke-width="18"/>' + [[520, 180], [600, 150], [680, 140], [430, 240], [560, 210]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="10" fill="#B49AD8" stroke="none" opacity=".8"/>'; }).join('');
    if (b === 3) s = '<g opacity=".7">' + G.art.khungCui(480, 360, { mau: true }).replace(/stroke="#2B1F1A"/g, '') + '</g>';
    if (b === 4) s = '<circle cx="480" cy="250" r="120" fill="#FFD98A" opacity=".12" stroke="none"/><circle cx="480" cy="250" r="44" fill="#E8C030" stroke="none" opacity=".8"/><path d="M480,206 v-24" stroke="#5A4A2A" stroke-width="6"/>';
    if (b === 5) s = '<path d="M380,360 Q480,300 580,360 Q580,420 480,424 Q380,420 380,360 Z" fill="#3A3640" stroke="none"/>' + [0, 1, 2].map(function (i) { return '<path class="hoi" style="animation-delay:-' + i + 's" d="M' + (450 + i * 30) + ',330 q14,-30 0,-60 q-14,-30 0,-60" fill="none" stroke="#C8C0B0" stroke-width="6" opacity=".5"/>'; }).join('');
    return khung(s, bg, '.hoi{animation:hoi 3s ease-in-out infinite}@keyframes hoi{0%{transform:translateY(10px);opacity:0}50%{opacity:.6}100%{transform:translateY(-40px);opacity:0}}');
  };

  // ---------- trình chiếu ----------
  // sh: { ve, buoc, chu, cls, noi (tên người nói), dur, sfx, cam:[s0,x0,y0,s1,x1,y1], chop, rung, hieu: 'tan'|'suong'|'mua'|'dom', nhac, den }
  function cho(ms) { var t0 = Date.now(); return new Promise(function (r) { (function f() { if (skip || C._tiep || Date.now() - t0 >= ms) { C._tiep = false; r(); } else setTimeout(f, 30); })(); }); }
  function hieuUng(ten) {
    if (!ten || G.reduceMotion) return '';
    var h = '', i;
    if (ten === 'tan') for (i = 0; i < 26; i++) h += '<i class="c-tan" style="left:' + (Math.random() * 100).toFixed(1) + '%;animation-delay:-' + (Math.random() * 4).toFixed(1) + 's;animation-duration:' + (2.5 + Math.random() * 2).toFixed(1) + 's"></i>';
    if (ten === 'suong') for (i = 0; i < 3; i++) h += '<i class="c-suong" style="top:' + (30 + i * 22) + '%;animation-delay:-' + (i * 6) + 's"></i>';
    if (ten === 'mua') for (i = 0; i < 70; i++) h += '<i class="c-mua" style="left:' + (Math.random() * 100).toFixed(1) + '%;animation-delay:-' + (Math.random()).toFixed(2) + 's"></i>';
    if (ten === 'dom') for (i = 0; i < 18; i++) h += '<i class="c-dom" style="left:' + (Math.random() * 100).toFixed(1) + '%;top:' + (40 + Math.random() * 50).toFixed(1) + '%;animation-delay:-' + (Math.random() * 5).toFixed(1) + 's"></i>';
    return h;
  }
  function chuChay(el, html) { // chữ hiện dần theo từng ký tự
    if (G.reduceMotion) { el.innerHTML = html; return; }
    var plain = html.replace(/<[^>]+>/g, ''), n = 0;
    clearInterval(el._t);
    el._t = setInterval(function () {
      n += 2;
      if (n >= plain.length || skip) { el.innerHTML = html; clearInterval(el._t); return; }
      var out = '', c = 0, inTag = false;
      for (var k = 0; k < html.length && c < n; k++) { var ch = html[k]; out += ch; if (ch === '<') inTag = true; else if (ch === '>') inTag = false; else if (!inTag) c++; }
      el.innerHTML = out + (out.lastIndexOf('<b') > out.lastIndexOf('</b>') ? '</b>' : '');
    }, 22);
  }
  C.play = function (shots) {
    return new Promise(async function (done) {
      var c = $('cine'); skip = false; C._tiep = false;
      var prevLock = G.world.locked; G.world.locked = true;
      var nhacCu = G.audio.mode && G.audio.mode();
      c.hidden = false; c.className = 'cut';
      c.innerHTML = '<div class="khung a"></div><div class="khung b"></div><div class="hieu"></div><div class="vig"></div><div class="hat"></div>' +
        '<div class="noi"></div><div class="ctext"></div><div class="flash"></div><div class="bar top"></div><div class="bar bot"></div>' +
        '<div class="goi">Bấm để tiếp</div><button class="skip">Bỏ qua ›</button>';
      c.querySelector('.skip').onclick = function (e) { e.stopPropagation(); skip = true; };
      c.onclick = function () { C._tiep = true; };
      requestAnimationFrame(function () { c.classList.add('vao'); });
      var cur = null, lop = 'a';
      for (var i = 0; i < shots.length && !skip; i++) {
        var sh = shots[i], t = c.querySelector('.ctext'), noi = c.querySelector('.noi');
        if (sh.nhac) G.audio.music(sh.nhac);
        if (sh.ve && (sh.ve !== cur || sh.buoc)) { // vẽ cảnh mới vào lớp đang ẩn rồi mờ dần sang
          var moi = lop === 'a' ? 'b' : 'a', kmoi = c.querySelector('.khung.' + moi), kcu = c.querySelector('.khung.' + lop);
          kmoi.innerHTML = V[sh.ve](sh.buoc || 1);
          kmoi.classList.add('hien'); kcu.classList.remove('hien');
          if (sh.den) { kcu.innerHTML = ''; }
          lop = moi; cur = sh.ve;
        }
        var k = c.querySelector('.khung.' + lop), cam = k.querySelector('.cam'), ganEl = k.querySelector('.gan'), dur = sh.dur || 3000;
        if (cam && sh.cam && !G.reduceMotion) {
          var a = sh.cam;
          [cam, ganEl].forEach(function (el, j) {
            if (!el) return;
            var m = j ? 1.6 : 1; // lớp cận trôi nhanh hơn
            el.style.transition = 'none'; el.style.transformOrigin = '480px 270px';
            el.style.transform = 'translate(' + a[1] * m + 'px,' + a[2] * m + 'px) scale(' + (1 + (a[0] - 1) * m) + ')';
            void el.getBoundingClientRect();
            el.style.transition = 'transform ' + dur + 'ms cubic-bezier(.4,0,.3,1)';
            el.style.transform = 'translate(' + a[4] * m + 'px,' + a[5] * m + 'px) scale(' + (1 + (a[3] - 1) * m) + ')';
          });
        }
        c.querySelector('.hieu').innerHTML = hieuUng(sh.hieu);
        if (sh.sfx) [].concat(sh.sfx).forEach(function (x, j) { if (G.audio.them && ['cua', 'chieng', 'trong', 'soi', 'lua'].indexOf(x) >= 0) G.audio.them(x, j * 0.25); else G.audio.sfx(x, j * 0.25); });
        if (sh.chop) { var f = c.querySelector('.flash'); f.className = 'flash' + (sh.chop === 'do' ? ' red' : ''); f.style.transition = 'none'; f.style.opacity = sh.chop === 'do' ? .6 : 1; setTimeout(function () { f.style.transition = 'opacity .7s'; f.style.opacity = 0; }, 40); }
        if (sh.rung && !G.reduceMotion) { c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); }
        t.style.opacity = 0; noi.style.opacity = 0;
        if (sh.noi) { noi.innerHTML = (G.bieuCam ? G.bieuCam.chanDung(sh.noi, sh.mood || G.bieuCam.doan({ who: sh.noi, text: sh.chu || '' })) : '') + '<b>' + sh.noi + '</b>'; }
        if (sh.chu) setTimeout(function (txt, cls, coNoi) {
          t.className = 'ctext ' + (cls || '') + (coNoi ? ' thoai' : ''); t.style.opacity = 1; chuChay(t, G.ui.fmt(txt));
          if (coNoi) noi.style.opacity = 1;
        }, 260, sh.chu, sh.cls, !!sh.noi);
        await cho(dur);
      }
      c.classList.remove('vao');
      if (nhacCu && shots.some(function (x) { return x.nhac; })) G.audio.music(nhacCu);
      await new Promise(function (r) { setTimeout(r, skip ? 60 : 550); });
      c.hidden = true; c.innerHTML = ''; c.className = ''; c.onclick = null;
      G.world.locked = prevLock;
      done();
    });
  };
  C.chuong = function (so, ten) {
    var n = +String(so).replace(/\D/g, '') || 0;
    return C.play([
      { ve: 'motif', buoc: n, chu: so, cls: 'center nho', dur: 1600, sfx: 'chieng', cam: [1.1, 0, 0, 1, 0, 0] },
      { ve: 'motif', chu: ten, cls: 'center serif', dur: 2800, sfx: 'mo', cam: [1, 0, 0, 1.08, 0, -6], hieu: n === 3 || n === 5 ? 'tan' : 'suong' }
    ]);
  };
})();
