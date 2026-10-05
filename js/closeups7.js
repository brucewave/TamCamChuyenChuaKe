// Ảnh đặc tả vẽ lại cho đồng bộ với phim: người dùng sprite (model trong game), bàn tay dùng G.ve.banTay
// (đúng giải phẫu: cổ tay → mu bàn tay → khớp đốt → ngón). Ghi đè các hình cũ trong closeups*.js, giữ nguyên tên.
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK, V = G.ve;
  function wrap(inner, bg, style, defs) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs>' + (defs || '') + '</defs>' + (style ? '<style>' + style + '</style>' : '') +
      '<rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></svg>';
  }
  function nguoi(look, o) { return G.sprite.ve(look, o); }

  // ---------- bàn tay đeo nhẫn bạc ----------
  C.flash_riu = function () { // ảnh chớp: gốc cau, bàn tay đeo nhẫn bạc vung rìu
    var s = '<rect width="400" height="300" fill="#0C0A0A" stroke="none"/><rect width="400" height="300" fill="#5A0A06" opacity=".35" stroke="none"/>';
    s += '<path d="M290,300 L296,0 L322,0 L328,300 Z" fill="#6A6050"/><path d="M292,170 L326,150 L326,190 L292,198 Z" fill="#2A0806"/><path d="M308,196 q-3,40 2,104" stroke="#6A0806" stroke-width="5" fill="none"/>';
    s += '<g transform="translate(150,190) rotate(-30)"><g transform="scale(.46)">' + V.ngonCai() + '</g><rect x="-260" y="-12" width="430" height="24" rx="10" fill="#6A4A2E"/>' +
      '<g transform="translate(166,0)"><path d="M-6,-20 Q30,-58 80,-54 Q90,-14 70,28 Q30,34 -6,20 Z" fill="#B0B6BA"/><path d="M56,-52 Q88,-14 70,28" fill="none" stroke="#6A0806" stroke-width="6"/></g>' +
      '<g transform="scale(.46)">' + V.banTay({ kieu: 'nam', nhan: true, mau: true, caiRieng: true }) + '</g></g>';
    return wrap(s, '#0C0A0A', V.cssNhan, V.defsNhan);
  };
  // túi gấm đỏ, tiền tràn ra; bàn tay đàn bà đeo nhẫn vừa buông túi (giữ phần túi tiền của hình cũ, chỉ thay bàn tay)
  var tuiCu = C.tui_tien;
  C.tui_tien = function () {
    var s = tuiCu().replace(/<path d="M400,40 Q330,52[\s\S]*?<circle cx="314" cy="80" r="2" fill="#FFFFFF" stroke="none"\/>/, '');
    var tay = '<g transform="translate(338,58) rotate(-118) scale(.3)">' + V.banTay({ kieu: 'buong', nhan: true, ao: '#6A3E58' }) + '</g>';
    return s.replace('<defs>', '<defs>' + V.defsNhan).replace(/(<rect width="400" height="300" fill="url\(#ttL\)" stroke="none"\/>)/, tay + '$1').replace('</svg>', '<style>' + V.cssNhan + '</style></svg>');
  };
  C.qua_hu = function () { // nhìn ra qua miệng hũ: bàn tay ấn lá bùa dán lên miệng hũ
    var s = '<rect width="400" height="300" fill="#000" stroke="none"/><circle cx="200" cy="150" r="96" fill="#3A3A48" stroke="none"/><circle cx="170" cy="120" r="60" fill="#5A5A6A" opacity=".4" stroke="none"/>';
    s += '<g transform="translate(160,52) rotate(2) scale(.66)">' + V.bua({ chu: V.BUA.tranVong }) + '</g>';
    s += '<g transform="translate(272,184) rotate(-140) scale(.46)">' + V.banTay({ kieu: 'an', ao: '#2B2A33', da: '#C8B49A', da2: '#A08A70' }) + '</g>';
    s += '<circle cx="200" cy="150" r="146" fill="none" stroke="#000" stroke-width="104"/><circle cx="200" cy="150" r="96" fill="none" stroke="#2A2420" stroke-width="6"/>';
    return wrap(s, '#000');
  };

  // ---------- người: dùng sprite ----------
  C.bong_dao = function () { // qua bát nước: cô gái ngồi trên cành đào, tóc xoã, con vàng anh đậu trên tay
    var s = '<defs><radialGradient id="bdHon"><stop offset="0" stop-color="#9FF0F0" stop-opacity=".45"/><stop offset="1" stop-color="#9FF0F0" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/>';
    for (var i = 0; i < 9; i++) s += '<circle cx="' + (30 + i * 44) + '" cy="' + (30 + (i % 3) * 26) + '" r="36" fill="#173034" stroke="none"/>';
    s += '<path d="M0,250 Q120,226 220,236 Q300,244 400,220" fill="none" stroke="#2A2220" stroke-width="20"/><path d="M220,236 q30,-30 70,-40M120,232 q-10,-34 10,-60" fill="none" stroke="#2A2220" stroke-width="8"/>';
    [[60, 220], [150, 214], [300, 200], [340, 230], [110, 180], [260, 190]].forEach(function (p) { s += '<g stroke-width="1.2"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="5" fill="#E8A8B0"/><circle cx="' + (p[0] + 6) + '" cy="' + (p[1] - 3) + '" r="4" fill="#F0C0C8"/><circle cx="' + (p[0] + 2) + '" cy="' + (p[1] - 1) + '" r="1.6" fill="#F8E0A0" stroke="none"/></g>'; });
    s += '<circle cx="200" cy="170" r="110" fill="url(#bdHon)" stroke="none"/>';
    s += '<g opacity=".82" style="filter:hue-rotate(150deg) saturate(.6) brightness(1.15)">' + nguoi(G.LOOKS.tam, { view: 'front', tu: 'dung', x: 200, y: 262, k: 1.05, them: { eyes: 'blank', mouth: 'open', blush: false } }) + '</g>';
    s += '<g transform="translate(252,198)"><ellipse rx="14" ry="10" fill="#E8C030"/><circle cx="12" cy="-6" r="7" fill="#E8C030"/><path d="M18,-6 l8,2 l-8,2" fill="#C88A2A" stroke-width="1.5"/><circle cx="13" cy="-8" r="1.4" fill="#2B1F1A" stroke="none"/><path d="M-12,2 l-12,6" stroke-width="3"/></g>';
    return wrap(s, '#0A1A1E');
  };
  C.be_mit = function () { // bé Mít ôm gốc cây xoan, nhìn từ sau lưng
    var s = '<rect width="400" height="300" fill="#C8CCC0" stroke="none"/><rect width="400" height="300" fill="#4A3A5A" opacity=".18" stroke="none"/>';
    s += '<path d="M160,300 L176,0 L236,0 L250,300 Z" fill="#7A5A4A"/><path d="M220,0 L236,0 L250,300 L232,300 Z" fill="#4A3426" stroke="none" opacity=".6"/>';
    s += '<path d="M180,40 q4,30 0,60M210,120 q-4,30 2,60M196,200 q4,30 0,60" fill="none" stroke="#3A2618" stroke-width="2" opacity=".6"/>';
    s += '<path d="M150,300 q-30,-30 -40,-60M262,290 q40,-20 60,-60" fill="none" stroke="#5A3A2A" stroke-width="10"/>';
    s += nguoi(G.LOOKS.mit || G.LOOKS.kid1, { view: 'back', tu: 'bam', x: 206, y: 292, k: .9, them: { kid: false } }).replace('class="sp sp-bam"', 'class="sp sp-bam" style="filter:saturate(.6) brightness(.95)"');
    for (var h = 0; h < 10; h++) s += '<circle cx="' + (40 + h * 34) + '" cy="' + (30 + (h * 47) % 200) + '" r="3.4" fill="#B49AD8" stroke-width="1"/>';
    return wrap(s);
  };
  C.tam_nua = function () { // Tấm trở về, qua bát nước: một nửa người trong suốt
    var s = '<defs><clipPath id="tnPhai"><rect x="200" y="0" width="200" height="300"/></clipPath><clipPath id="tnTrai"><rect x="0" y="0" width="200" height="300"/></clipPath></defs>';
    s += '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/><circle cx="200" cy="150" r="140" fill="#1E3A3E" opacity=".5" stroke="none"/>';
    var t = nguoi(G.LOOKS.tamHau || G.LOOKS.tam, { view: 'front', tu: 'dung', x: 200, y: 330, k: 1.7, them: { eyes: 'big', mouth: null } });
    s += '<g clip-path="url(#tnTrai)">' + t + '</g>';
    s += '<g clip-path="url(#tnPhai)" opacity=".22" style="filter:hue-rotate(160deg) saturate(.4)">' + t + '</g>';
    s += '<path d="M200,0 V300" stroke="#9FF0F0" stroke-width="2" stroke-dasharray="6 6"/>';
    return wrap(s, '#0A1A1E');
  };
  C.por_tam = function () { // ảnh thờ Tấm trên bàn thờ: khung gỗ, ảnh ngả màu, băng tang đen
    var s = '<rect width="400" height="300" fill="#2B1F1A" stroke="none"/><rect x="120" y="22" width="160" height="236" rx="4" fill="#3A1E14"/><rect x="132" y="34" width="136" height="212" fill="#C9B48A"/>';
    s += '<g style="filter:sepia(.6) saturate(.7)"><clipPath id="ptK"><rect x="132" y="34" width="136" height="212"/></clipPath><g clip-path="url(#ptK)">' + nguoi(G.LOOKS.tam, { view: 'front', tu: 'dung', x: 200, y: 300, k: 1.35 }) + '</g></g>';
    s += '<rect x="132" y="34" width="136" height="212" fill="none" stroke="#C8962E" stroke-width="2"/><path d="M232,22 L280,22 L280,70 Z" fill="#141010"/>';
    return wrap(s);
  };
  C.por_nu = function () { // Nụ gục bên khung cửi, sợi chỉ đỏ thắt quanh cổ
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><rect x="0" y="40" width="400" height="16" fill="#6A4A30"/><rect x="40" y="56" width="320" height="70" fill="#E9DDB0"/>';
    for (var k = 46; k < 360; k += 8) s += '<path d="M' + k + ',56 v70" stroke="#B8A880" stroke-width="1"/>';
    s += '<ellipse cx="206" cy="232" rx="130" ry="26" fill="#000" opacity=".3" stroke="none"/>';
    s += '<g transform="translate(206,206) rotate(-82) scale(1.3) translate(-80,-100)">' + G.art.thanXac(G.LOOKS.nu, { chi: true, mieng: 'open' }) + '</g>'; // gục ngang dưới khung cửi
    s += '<path d="M60,120 Q200,180 340,110" fill="none" stroke="#B8241A" stroke-width="2.4"/>';
    return wrap(s);
  };
  C.por_basau = function () { // bà Sáu nằm cạnh chạn bát, dấu giày to đóng đinh in trên nền bếp
    var s = '<rect width="400" height="300" fill="#4A3020" stroke="none"/>';
    for (var y = 20; y < 300; y += 40) s += '<path d="M0,' + y + ' H400" stroke="#3A2214" stroke-width="2" opacity=".6"/>';
    s += '<ellipse cx="180" cy="190" rx="120" ry="40" fill="#3A0604" opacity=".55" stroke="none"/>';
    s += '<g transform="translate(160,170) rotate(80) scale(1.05) translate(-80,-100)">' + G.art.thanXac(G.LOOKS.baSau || G.LOOKS.danLang2, {}) + '</g>';
    s += '<g transform="translate(320,236) rotate(-14)"><path d="M-16,-34 q16,-10 30,0 q8,30 0,70 q-14,8 -30,0 q-8,-36 0,-70 z" fill="#2A1A10" opacity=".75"/>' +
      [[-6, -20], [6, -20], [-6, -4], [6, -4], [0, 14], [0, 28]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="#8A7A5A" stroke="none"/>'; }).join('') + '</g>';
    s += '<text x="270" y="292" font-size="13" fill="#E9E2D0" stroke="none" font-family="Be Vietnam Pro, sans-serif">dấu giày đóng đinh</text>';
    return wrap(s, '#4A3020');
  };

  // ---------- lá bùa: dùng mẫu bùa mới (G.ve.bua) ----------
  C.hu_sanh = function () { // hũ sành dán bùa, đáy là lọ xương thứ tư
    var s = '<rect width="400" height="300" fill="#1A1210" stroke="none"/>' + V.bong(206, 252, 90, 12, .4);
    s += '<path d="M150,60 h100 q40,40 30,120 q-10,60 -80,64 q-70,-4 -80,-64 q-10,-80 30,-120 z" fill="#6A5A4A"/><path d="M232,64 q40,46 28,116 q-8,46 -50,60 q40,-30 42,-80 q2,-56 -20,-96 z" fill="#3A2E24" opacity=".55" stroke="none"/><path d="M168,80 q-20,40 -12,90" fill="none" stroke="#9A8A72" stroke-width="5" opacity=".6"/>';
    s += '<g transform="translate(176,84) rotate(-8) scale(.42)">' + V.bua({ chu: V.BUA.tranVong, cu: true }) + '</g>';
    s += '<path d="M160,236 h80 v14 q0,14 -40,14 q-40,0 -40,-14 z" fill="#B0805A"/><text x="250" y="262" font-size="12" fill="#E9E2D0" stroke="none" font-family="Be Vietnam Pro, sans-serif">đáy: lọ xương</text>';
    s += '<ellipse cx="200" cy="60" rx="50" ry="12" fill="#2A1A14"/>';
    return wrap(s, '#1A1210');
  };
  var hopCu = C.hop_ngai;
  C.hop_ngai = function () { // hộp ngải: lá bùa có nét móc cuối nét ngang (chữ tay Thầy Cả)
    return hopCu().replace(/<rect x="240" y="90" width="60" height="120" fill="#E8CB6A"[^>]*\/><path d="M270,100[^>]*\/>/,
      '<g transform="translate(236,72) rotate(6) scale(.42)">' + V.bua({ chu: ['蛊', '缚', '符'], moc: true, cu: true }) + '</g>');
  };
  C.tro_bua = function () { // tro bếp lẫn giấy bùa cháy dở, còn đọc được nét móc
    var s = '<rect width="400" height="300" fill="#4A4040" stroke="none"/>';
    for (var i = 0; i < 46; i++) s += '<circle cx="' + (i * 47 % 400) + '" cy="' + (i * 31 % 300) + '" r="' + (4 + i % 6) + '" fill="' + (i % 4 ? '#6A6060' : '#8A8078') + '" stroke="none"/>';
    s += '<g transform="translate(150,40) rotate(5) scale(.62)">' + V.bua({ chu: ['驱', '邪', '符'], moc: true, cu: true, chay: .32 }) + '</g>';
    s += '<g fill="#FF8A2A" stroke="none" opacity=".8"><circle cx="190" cy="252" r="2"/><circle cx="222" cy="246" r="1.6"/><circle cx="168" cy="258" r="1.4"/></g>';
    return wrap(s, '#4A4040');
  };
  // ---------- ảnh cận bộ phận cơ thể: cùng nét, cùng tông da với nhân vật và bàn tay mới ----------
  var DA_SONG = '#EBCDAA', DA_TAI = '#D2C8B8', DA_MA = '#8E9A8C';
  // vết bầm hình ngón tay: thuôn dài, đậm ở giữa, có ngấn đốt; qua mắt âm dương thì viền ánh lam
  function vetNgon(x, y, dai, rong, xoay, soi) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + xoay + ')">' +
      (soi ? '<rect x="' + (-dai / 2 - 4) + '" y="' + (-rong / 2 - 4) + '" width="' + (dai + 8) + '" height="' + (rong + 8) + '" rx="' + (rong / 2 + 4) + '" fill="#9FF0F0" opacity=".28" stroke="none"/>' : '') +
      '<rect x="' + (-dai / 2) + '" y="' + (-rong / 2) + '" width="' + dai + '" height="' + rong + '" rx="' + (rong / 2) + '" fill="#7A5A8A" opacity=".7" stroke="none"/>' +
      '<rect x="' + (-dai / 2 + 4) + '" y="' + (-rong / 2 + 3) + '" width="' + (dai - 8) + '" height="' + (rong - 6) + '" rx="' + (rong / 2 - 3) + '" fill="#4A2A5A" opacity=".75" stroke="none"/>' +
      '<path d="M' + (-dai * .12) + ',' + (-rong / 2 + 2) + ' v' + (rong - 4) + 'M' + (dai * .2) + ',' + (-rong / 2 + 2) + ' v' + (rong - 4) + '" stroke="#8A6A9A" stroke-width="1.6" opacity=".7"/></g>';
  }
  C.co_lai = function () { // cổ Lài nhìn từ dưới cằm: năm vết ngón tay to bản quấn quanh cổ (không vẽ mặt)
    var s = '<defs><radialGradient id="clDa" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#E2D8C8"/><stop offset="1" stop-color="#B8AC9C"/></radialGradient>' +
      '<radialGradient id="clSoi" cx=".5" cy=".5" r=".7"><stop offset=".55" stop-color="#0A2A30" stop-opacity="0"/><stop offset="1" stop-color="#0A2A30" stop-opacity=".75"/></radialGradient></defs>';
    s += '<rect width="400" height="300" fill="#3A4A48" stroke="none"/>';
    // tóc ướt xoã hai bên
    s += '<path d="M60,0 Q90,120 70,300 L120,300 Q130,150 110,0 Z M340,0 Q310,120 330,300 L280,300 Q270,150 290,0 Z" fill="#1A161C"/>';
    s += '<path d="M80,20 q14,120 0,260M98,10 q10,140 -4,280M320,20 q-14,120 0,260M302,10 q-10,140 4,280" fill="none" stroke="#3A3440" stroke-width="2.4"/>';
    // cằm (mép trên), cổ, xương quai xanh
    s += '<path d="M110,0 Q200,70 290,0 Z" fill="url(#clDa)"/><path d="M120,6 Q200,66 280,6" fill="none" stroke="#9A8E80" stroke-width="2"/>';
    s += '<path d="M132,40 Q200,64 268,40 C262,110 270,170 300,228 Q200,252 100,228 C130,170 138,110 132,40 Z" fill="url(#clDa)"/><path d="M252,50 C250,120 258,180 284,226 Q262,232 248,232 C236,170 236,110 240,54 Z" fill="#8A8070" opacity=".35" stroke="none"/>';
    s += '<ellipse cx="200" cy="50" rx="74" ry="22" fill="#5E5246" opacity=".45" stroke="none"/><path d="M104,226 C132,170 138,110 134,44 L150,44 C154,110 148,170 124,228 Z" fill="#F4ECDC" opacity=".35" stroke="none"/>'; // bóng dưới cằm, sáng mép trái
    s += '<path d="M150,60 C164,120 180,170 196,226M250,60 C236,120 220,170 206,226" fill="none" stroke="#A89C8C" stroke-width="2.2" opacity=".7"/><path d="M186,150 q14,8 28,0" fill="none" stroke="#A89C8C" stroke-width="2"/>'; // cơ cổ, yết hầu
    s += '<path d="M190,62 q10,40 6,90" fill="none" stroke="#A89C8C" stroke-width="2"/>';
    s += '<path d="M60,236 Q140,214 200,240 Q260,214 340,236" fill="none" stroke="#A89C8C" stroke-width="4"/>';
    s += '<path d="M40,300 Q120,236 200,262 Q280,236 360,300 Z" fill="url(#clDa)"/>';
    // cổ áo xanh ướt sẫm
    s += '<path d="M30,300 Q90,250 150,262 L200,296 L250,262 Q310,250 370,300 Z" fill="#4E7A42"/><path d="M150,262 L200,296 L250,262" fill="none" stroke="#2E5A2A" stroke-width="3"/>';
    // năm vết ngón tay to bản của một bàn tay đàn ông: bốn ngón vắt ngang trước cổ, ngón cái bên kia
    s += vetNgon(158, 118, 70, 22, 14, true) + vetNgon(196, 134, 78, 24, 6, true) + vetNgon(236, 132, 74, 23, -4, true) + vetNgon(266, 116, 56, 20, -14, true);
    s += vetNgon(140, 178, 62, 24, 76, true) + '<ellipse cx="206" cy="182" rx="46" ry="20" fill="#5A3A6A" opacity=".25" stroke="none"/>';
    // giọt nước đọng
    s += '<g fill="#DDEEF0" opacity=".7" stroke="none"><circle cx="170" cy="200" r="2.6"/><circle cx="246" cy="86" r="2"/><circle cx="214" cy="214" r="1.8"/></g>';
    s += '<rect width="400" height="300" fill="url(#clSoi)" stroke="none"/>';
    return wrap(s, '#3A4A48');
  };
  // dấu tay nhỏ (tay con gái): lòng bàn tay nhỏ + năm ngón mảnh
  function dauTayNho(x, y, xoay, k) {
    var g = '<ellipse cx="0" cy="0" rx="11" ry="13" fill="#3A5A6A" opacity=".6"/>';
    [[-10, -18, -14], [-4, -24, -4], [3, -25, 4], [9, -21, 12], [14, -2, 50]].forEach(function (n, i) { g += '<rect x="' + (n[0] - 2.6) + '" y="' + (n[1] - (i === 4 ? 4 : 10)) + '" width="5.2" height="' + (i === 4 ? 12 : 16) + '" rx="2.6" fill="#3A5A6A" opacity=".75" transform="rotate(' + n[2] + ' ' + n[0] + ' ' + n[1] + ')"/>'; });
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + xoay + ') scale(' + (k || 1) + ')" stroke="none">' + g + '</g>';
  }
  C.co_chan = function () { // cổ chân Đội Ngạn nằm sấp mép ao: năm vết ngón tay nhỏ như tay con gái
    var s = '<rect width="400" height="300" fill="#2E4A4A" stroke="none"/>';
    // mép ao: nước sẫm, bùn, rong
    s += '<path d="M0,0 H400 V110 Q300,130 200,112 Q100,96 0,118 Z" fill="#1E3436" stroke="none"/><path d="M0,118 Q100,96 200,112 Q300,130 400,110" fill="none" stroke="#6A8A8A" stroke-width="2.4"/>';
    s += '<path d="M0,300 V150 Q120,130 240,150 Q330,166 400,150 V300 Z" fill="#4A3A28" stroke="none"/>';
    var rong = ''; for (var i = 0; i < 12; i++) rong += 'M' + (20 + i * 34) + ',' + (120 + (i % 3) * 6) + ' q8,20 -4,40'; s += '<path d="' + rong + '" fill="none" stroke="#3E5A30" stroke-width="3"/>';
    // ống quần thị vệ ướt sẫm, cổ chân và bàn chân trần tái
    s += '<path d="M0,96 L190,110 L196,190 L0,214 Z" fill="#6A1E18"/><path d="M0,96 L190,110 L196,190" fill="none" stroke="#4A120E" stroke-width="3"/><path d="M40,110 l4,90M110,106 l4,92" stroke="#4A120E" stroke-width="2" opacity=".6"/>';
    s += '<path d="M188,116 Q236,112 262,124 Q292,128 340,150 Q372,164 366,186 Q356,198 320,194 L262,190 Q226,192 196,190 Z" fill="' + DA_TAI + '"/>';
    s += '<path d="M262,190 Q300,196 320,194 Q356,198 366,186" fill="none" stroke="#9A8E80" stroke-width="2"/><ellipse cx="250" cy="134" rx="12" ry="8" fill="#B8AC9C" stroke="none"/>';
    [[344, 150], [356, 160], [362, 172], [364, 182]].forEach(function (t, i) { s += '<ellipse cx="' + t[0] + '" cy="' + t[1] + '" rx="' + (7 - i) + '" ry="' + (6 - i * .6) + '" fill="#C8BCAC" stroke-width="2"/>'; });
    // dấu tay nhỏ bấu quanh cổ chân (hai bàn tay)
    s += dauTayNho(222, 150, 96, 1) + dauTayNho(244, 168, 80, .95) + dauTayNho(206, 176, 110, .85);
    s += '<g fill="#BFE0E0" opacity=".7" stroke="none"><circle cx="232" cy="122" r="2.4"/><circle cx="300" cy="140" r="2"/><circle cx="270" cy="184" r="1.8"/></g>';
    return wrap(s, '#2E4A4A');
  };
  C.ngon_tay = function () { // Nụ vẫn dệt: mười đầu ngón tay rách toạc, máu thấm đỏ sợi ngang (không vẽ mặt)
    var s = '<rect width="400" height="300" fill="#3A2A20" stroke="none"/>';
    // khổ vải trên khung, sợi dọc căng, sợi ngang thấm máu
    s += '<rect x="20" y="20" width="360" height="150" fill="#E9DDB0"/>';
    var doc = ''; for (var k = 26; k < 380; k += 7) doc += 'M' + k + ',20 v150'; s += '<path d="' + doc + '" stroke="#B8A880" stroke-width="1.2"/>';
    var ngang = ''; for (var y = 30; y < 170; y += 6) ngang += 'M20,' + y + ' h360'; s += '<path d="' + ngang + '" stroke="#C8B890" stroke-width=".8" opacity=".6"/>';
    s += '<path d="M20,120 Q120,150 200,128 T380,126" fill="none" stroke="#A8180E" stroke-width="5" opacity=".75"/><path d="M60,140 q20,10 40,4M240,142 q24,12 50,0" fill="none" stroke="#8A0E08" stroke-width="3" opacity=".6"/>';
    s += '<path d="M20,170 H380" stroke="#6A4A30" stroke-width="10"/>';
    // hai bàn tay từ dưới đưa lên, ngón chạm sợi: đầu ngón rách, máu chảy xuống ngón
    var tay = function (cx) { return '<g transform="translate(' + cx + ',214) rotate(180) scale(.5)">' + V.banTay({ kieu: 'buong', rach: true, ao: '#E8A0B0', vienAo: '#C87888', da: '#E0C4A8', da2: '#C0A088' }) + '</g>'; };
    s += tay(130) + tay(280);
    var mau = ''; [[166, 192], [142, 186], [118, 186], [96, 194], [316, 192], [292, 186], [268, 186], [246, 194]].forEach(function (p) { mau += 'M' + p[0] + ',' + p[1] + ' q2,14 -1,26'; });
    s += '<path d="' + mau + '" fill="none" stroke="#8A0A06" stroke-width="3.4" stroke-linecap="round"/>';
    s += '<path d="M40,100 Q200,190 360,96" fill="none" stroke="#B8241A" stroke-width="2.4"/>'; // sợi chỉ đỏ cứa ngang
    return wrap(s, '#3A2A20');
  };
  C.ban_tay = function () { // dưới ruộng nước đục: bàn tay xám móng đen trồi lên từ bùn, tay Tấm thò xuống mò tép ngay phía trên
    var s = '<defs><linearGradient id="btNuoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A5A40"/><stop offset=".6" stop-color="#22301E"/><stop offset="1" stop-color="#121A0E"/></linearGradient></defs>';
    s += '<rect width="400" height="300" fill="url(#btNuoc)" stroke="none"/>';
    s += '<path d="M60,0 L110,300 L150,300 L90,0 Z M240,0 L260,300 L300,300 L270,0 Z" fill="#8A9A70" opacity=".12" stroke="none"/>'; // ánh sáng lọt từ mặt nước
    for (var i = 0; i < 18; i++) s += '<circle cx="' + (20 + i * 22) + '" cy="' + (40 + (i * 61) % 200) + '" r="' + (2 + i % 3) + '" fill="none" stroke="#9AAA88" stroke-width="1.2" opacity=".6"/>';
    var goc = ''; for (var g = 0; g < 9; g++) goc += 'M' + (10 + g * 46) + ',0 L' + (14 + g * 46) + ',250'; s += '<path d="' + goc + '" stroke="#3E4A2A" stroke-width="3" opacity=".7"/>';
    // tay Tấm thò xuống từ mặt nước
    s += '<g transform="translate(268,40) rotate(-12) scale(.44)">' + V.banTay({ kieu: 'buong', ao: '#C9B48A', vienAo: '#A8946A' }) + '</g>';
    // bàn tay xám móng dài trồi khỏi bùn, ngón vươn lên
    s += '<g transform="translate(152,150) rotate(172) scale(.52)">' + V.banTay({ kieu: 'buong', ao: false, mongDai: true, da: DA_MA, da2: '#6E7A6C', sang: '#B8C4B4' }) + '</g>'; // cổ tay chìm dưới bùn
    s += '<path d="M0,250 Q100,230 200,246 T400,240 V300 H0 Z" fill="#2A2018" stroke="none"/><path d="M90,252 q60,-16 120,0" fill="none" stroke="#3A2E1E" stroke-width="10"/>';
    return wrap(s, '#121A0E');
  };
  C.chan_tran = function () { // qua mắt âm dương: dấu chân trần to bản đi vòng quanh gốc thị rồi về phía đông
    var s = '<defs><radialGradient id="ctSoi" cx=".5" cy=".5" r=".7"><stop offset=".5" stop-color="#0A2A30" stop-opacity="0"/><stop offset="1" stop-color="#0A2A30" stop-opacity=".7"/></radialGradient></defs>';
    s += '<rect width="400" height="300" fill="#5A4A34" stroke="none"/>';
    for (var i = 0; i < 40; i++) s += '<circle cx="' + (i * 67 % 400) + '" cy="' + (i * 43 % 300) + '" r="' + (1.5 + i % 4) + '" fill="' + (i % 2 ? '#4A3A28' : '#6A5A40') + '" stroke="none"/>';
    var dauChan = function (x, y, trai, xoay) {
      var t = trai ? -1 : 1, g = '<path d="M0,-26 C12,-26 16,-12 14,0 C12,12 8,16 9,26 C10,36 4,42 -2,42 C-10,42 -14,34 -12,22 C-10,12 -16,4 -16,-8 C-16,-20 -10,-26 0,-26 Z" fill="#7AE8E0" opacity=".55"/>';
      [[-10, -36, 6.5], [-1, -40, 4.6], [6, -38, 4], [12, -34, 3.6], [16, -28, 3.2]].forEach(function (n) { g += '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + n[2] + '" fill="#7AE8E0" opacity=".6"/>'; });
      return '<g transform="translate(' + x + ',' + y + ') rotate(' + xoay + ') scale(' + t + ',1)" stroke="#BFF8F4" stroke-width="1.6" style="filter:drop-shadow(0 0 6px #7AE8E0)">' + g + '</g>';
    };
    s += dauChan(60, 200, true, 70) + dauChan(110, 160, false, 80) + dauChan(170, 196, true, 88) + dauChan(228, 156, false, 92) + dauChan(288, 192, true, 92);
    s += '<path d="M318,150 h52 l-12,-12M370,150 l-12,12" stroke="#F3EEDF" stroke-width="4" fill="none"/><text x="300" y="196" font-size="14" fill="#F3EEDF" stroke="none" font-family="Be Vietnam Pro, sans-serif">về phía đông</text>';
    s += '<rect width="400" height="300" fill="url(#ctSoi)" stroke="none"/>';
    return wrap(s, '#5A4A34');
  };
  C.dau_ca = function () { // mặt giếng sủi lên: cái đầu cá bống to bằng đầu người, mắt là mắt người, nhìn thẳng
    var r = V.rng(23);
    var s = '<defs><radialGradient id="dcNuoc" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#22302C"/><stop offset="1" stop-color="#080E0C"/></radialGradient>' +
      '<linearGradient id="dcVay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A8A6A"/><stop offset=".55" stop-color="#5E6448"/><stop offset="1" stop-color="#3A3E2C"/></linearGradient>' +
      '<radialGradient id="dcMat" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#FBF6EA"/><stop offset=".8" stop-color="#E4D8C4"/><stop offset="1" stop-color="#C8B4A0"/></radialGradient>' +
      '<radialGradient id="dcTrong" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#8A5A32"/><stop offset=".7" stop-color="#5A3418"/><stop offset="1" stop-color="#2A160A"/></radialGradient>' +
      '<clipPath id="dcTren"><rect x="0" y="0" width="400" height="206"/></clipPath></defs>';
    s += '<rect width="400" height="300" fill="url(#dcNuoc)" stroke="none"/>' +
      // thành giếng đá ong mờ phía sau, rêu bám
      '<path d="M0,40 Q200,10 400,40 L400,70 Q200,40 0,70 Z" fill="#2A302A" stroke="none"/><path d="M0,70 Q200,40 400,70" fill="none" stroke="#141A16" stroke-width="3"/>' +
      '<path d="M60,30 v34M130,20 v32M210,16 v30M290,20 v32M360,30 v34" stroke="#141A16" stroke-width="2" opacity=".7"/><path d="M20,66 q20,10 40,2M240,52 q24,12 50,0" fill="none" stroke="#3E5A34" stroke-width="4" opacity=".6"/>';
    // đầu cá nhô khỏi mặt nước (phần dưới chìm, bị cắt ở mặt nước)
    s += '<g clip-path="url(#dcTren)">';
    s += '<path d="M70,150 Q80,96 100,94 L112,118 Q118,84 136,82 L146,106 Q156,76 172,78 L176,96 Z" fill="#4A4C38" stroke-width="2.2"/><path d="M100,94 L120,140M136,82 L146,134M172,78 L170,120" stroke="#2A2C1E" stroke-width="1.4"/>';
    s += '<path d="M40,240 Q60,110 190,86 Q300,70 352,140 Q376,190 362,240 Z" fill="url(#dcVay)"/>';
    s += '<path d="M150,206 Q130,170 160,150 Q178,176 196,206 Z" fill="#5A5A42" opacity=".9" stroke-width="2"/><path d="M160,152 L156,204M170,164 L172,204M182,180 L186,204" stroke="#3A3A2A" stroke-width="1.2"/>'; // vây ngực xoè trên mặt nước
    // vảy, đốm bống, vệt nhớt
    var vay = ''; for (var i = 0; i < 46; i++) { var vx = 60 + r() * 280, vy = 100 + r() * 110; if (vx > 220 && vx < 320 && vy < 170) continue; vay += 'M' + vx.toFixed(0) + ',' + vy.toFixed(0) + ' q7,6 14,0'; }
    s += '<path d="' + vay + '" fill="none" stroke="#3A3E2C" stroke-width="1.6" opacity=".7"/>';
    for (var d = 0; d < 16; d++) s += '<ellipse cx="' + (70 + r() * 260).toFixed(0) + '" cy="' + (104 + r() * 100).toFixed(0) + '" rx="' + (4 + r() * 8).toFixed(0) + '" ry="' + (3 + r() * 5).toFixed(0) + '" fill="#2E3222" opacity=".55" stroke="none"/>';
    s += '<path d="M110,104 Q200,80 300,96" fill="none" stroke="#C8C8A8" stroke-width="5" opacity=".45"/><path d="M130,118 q50,-12 100,-8" fill="none" stroke="#E8E8D0" stroke-width="2.4" opacity=".35"/>';
    // mang cá
    s += '<path d="M120,120 Q100,170 112,214M140,126 Q124,170 134,212" fill="none" stroke="#2A2E20" stroke-width="3"/><path d="M112,214 q-14,-40 6,-90" fill="#6A2A24" opacity=".35" stroke="none"/>';
    // miệng cá dày môi, hé ra để lộ răng người
    s += '<path d="M330,168 Q366,176 368,198 Q348,214 318,206 Q300,196 304,180 Z" fill="#6E5A48"/><path d="M314,192 Q340,202 362,196" fill="none" stroke="#2A1810" stroke-width="5"/>';
    s += '<path d="M318,190 h40" stroke="#E8E0CC" stroke-width="5" stroke-dasharray="5 2"/><path d="M366,186 q10,4 22,-2M364,200 q12,8 24,6" fill="none" stroke="#4A4434" stroke-width="2.4"/>'; // răng, râu
    // MẮT NGƯỜI: hốc mắt, mí trên mí dưới có lông mi, lòng trắng gân máu, tròng nâu, đồng tử, ánh ướt
    s += '<ellipse cx="270" cy="128" rx="46" ry="30" fill="#4A4636" opacity=".8" stroke="none"/>';
    s += '<path d="M226,130 Q268,92 316,126 Q270,156 226,130 Z" fill="url(#dcMat)" stroke-width="3"/>';
    s += '<path d="M232,130 q12,-4 18,4M300,124 q-10,4 -14,10M244,142 q10,-2 14,-8" fill="none" stroke="#C04040" stroke-width="1.2" opacity=".8"/>';
    s += '<circle cx="272" cy="126" r="16" fill="url(#dcTrong)" stroke-width="2"/><circle cx="272" cy="126" r="7" fill="#0A0604" stroke="none"/>';
    var vong = ''; for (var k = 0; k < 14; k++) { var a = k / 14 * Math.PI * 2; vong += 'M' + (272 + Math.cos(a) * 8).toFixed(1) + ',' + (126 + Math.sin(a) * 8).toFixed(1) + ' L' + (272 + Math.cos(a) * 15).toFixed(1) + ',' + (126 + Math.sin(a) * 15).toFixed(1); }
    s += '<path d="' + vong + '" stroke="#3A2010" stroke-width="1" opacity=".6"/><circle cx="266" cy="119" r="4" fill="#FFFFFF" stroke="none"/><circle cx="279" cy="132" r="1.8" fill="#FFFFFF" opacity=".7" stroke="none"/>';
    s += '<path d="M222,130 Q268,88 320,124" fill="none" stroke-width="5"/><path d="M226,132 Q270,160 316,128" fill="none" stroke-width="2.6"/>'; // mí
    var mi = ''; for (var m = 0; m < 9; m++) { var t = .1 + m * .1, mx = (1 - t) * (1 - t) * 222 + 2 * (1 - t) * t * 268 + t * t * 320, my = (1 - t) * (1 - t) * 130 + 2 * (1 - t) * t * 88 + t * t * 124; mi += 'M' + mx.toFixed(1) + ',' + my.toFixed(1) + ' l' + (-3 + m * .8).toFixed(1) + ',-7'; }
    s += '<path d="' + mi + '" stroke="#1A1410" stroke-width="1.8"/>';
    s += '<path d="M232,112 Q268,82 312,108" fill="none" stroke="#3A3626" stroke-width="3" opacity=".7"/>'; // nếp mí người trên da cá
    s += '</g>';
    // nước chảy ròng ròng khỏi đầu cá
    s += '<g fill="none" stroke="#B8D4CC" stroke-linecap="round" opacity=".55"><path d="M196,90 q-4,10 0,22 q3,8 -1,16" stroke-width="2.2"/><path d="M90,140 q-3,12 1,26" stroke-width="2"/><path d="M344,152 q5,10 2,22" stroke-width="2"/><path d="M250,160 q-2,8 1,14" stroke-width="1.6"/></g>';
    s += '<g fill="#D8ECE6" opacity=".85" stroke="none"><path d="M195,128 q-4,6 0,9 q4,-3 0,-9Z"/><path d="M91,166 q-4,6 0,9 q4,-3 0,-9Z"/><path d="M346,174 q-4,6 0,9 q4,-3 0,-9Z"/><path d="M251,174 q-3,5 0,7 q3,-2 0,-7Z"/></g>';
    // mặt nước: vòng sóng, bọt sủi
    s += '<rect x="0" y="206" width="400" height="94" fill="#0E1A18" opacity=".9" stroke="none"/><path d="M0,206 Q100,200 200,206 T400,206" fill="none" stroke="#6A8A84" stroke-width="2.6"/>';
    s += '<ellipse cx="206" cy="212" rx="180" ry="16" fill="none" stroke="#5A7A74" stroke-width="2"/><ellipse cx="206" cy="220" rx="150" ry="10" fill="none" stroke="#3A5A54" stroke-width="1.6" opacity=".7"/>';
    for (var b = 0; b < 12; b++) s += '<circle cx="' + (40 + r() * 330).toFixed(0) + '" cy="' + (202 + r() * 16).toFixed(0) + '" r="' + (2 + r() * 4).toFixed(1) + '" fill="none" stroke="#A8C8C0" stroke-width="1.4" opacity=".7"/>';
    s += '<path d="M60,240 Q200,226 340,240" fill="none" stroke="#4A6A64" stroke-width="2" opacity=".5"/>';
    s += '<g opacity=".35" stroke="none"><path d="M90,214 q130,-6 270,0 q-20,30 -140,40 q-110,-8 -130,-40Z" fill="#3A3E2C"/><path d="M240,262 q32,-6 64,0 q-32,8 -64,0Z" fill="#E4D8C4"/><ellipse cx="272" cy="262" rx="9" ry="3" fill="#5A3418"/><path d="M236,270 h70M246,276 h50" stroke="#E4D8C4" stroke-width="1.4" fill="none"/></g>'; // bóng đầu cá + mắt người dưới nước
    return wrap(s, '#080E0C');
  };
})();
