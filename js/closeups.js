// Tranh cận cảnh hiện phía trên khung thoại (khung 400x300) và trong Sổ Tử.
var G = window.G || (window.G = {});
G.CLOSEUPS = {};

(function () {
  var INK = G.INK;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  var C = G.CLOSEUPS;

  C.vet_riu = function () { // gốc cau dưới lớp đất mới, vết rìu chéo
    var s = '<rect x="0" y="0" width="400" height="300" fill="#6A4A2E" stroke="none"/>';
    for (var i = 0; i < 30; i++) s += '<circle cx="' + (i * 37 % 400) + '" cy="' + (i * 53 % 300) + '" r="' + (3 + i % 4) + '" fill="#7A5A3A" stroke="none"/>';
    s += '<ellipse cx="200" cy="170" rx="120" ry="58" fill="#B8AC90"/><ellipse cx="200" cy="160" rx="110" ry="48" fill="#D8CCAE"/>';
    for (var r = 10; r < 100; r += 14) s += '<ellipse cx="200" cy="160" rx="' + r + '" ry="' + r * 0.44 + '" fill="none" stroke="#B8A888" stroke-width="1.5"/>';
    s += '<path d="M110,130 L170,180 L150,190 L95,142 Z" fill="#5A1A12" opacity=".85"/><path d="M150,118 L220,176 L200,186 L136,128 Z" fill="#5A1A12" opacity=".85"/><path d="M200,112 L262,166 L244,176 L186,122 Z" fill="#5A1A12" opacity=".85"/>';
    s += '<path d="M290,120 q30,-30 70,-20 q-10,40 -60,40 z" fill="#7A5A3A"/><path d="M40,220 q60,-10 120,20 q-60,30 -120,0 z" fill="#7A5A3A"/>';
    return wrap(s);
  };
  C.cau_rang = function () { // quả cau nứt đôi thành hàm răng người
    var s = '<rect width="400" height="300" fill="#1C1A24" stroke="none"/><circle cx="200" cy="150" r="140" fill="#3A3428" stroke="none" opacity=".6"/>';
    s += '<path d="M120,150 Q120,60 200,56 Q280,60 280,150 Z" fill="#C9A23A"/><path d="M120,160 Q120,250 200,254 Q280,250 280,160 Z" fill="#C9A23A"/>';
    s += '<path d="M128,150 Q200,128 272,150 L272,160 Q200,182 128,160 Z" fill="#5A1A12"/>';
    for (var i = 0; i < 8; i++) {
      var x = 140 + i * 16;
      s += '<path d="M' + x + ',' + (148 - Math.abs(i - 3.5) * 2) + ' l7,-16 l7,16 z" fill="#F3EEDF" stroke-width="2"/>';
      s += '<path d="M' + x + ',' + (162 + Math.abs(i - 3.5) * 2) + ' l7,16 l7,-16 z" fill="#F3EEDF" stroke-width="2"/>';
    }
    s += '<path d="M200,56 v-20" stroke-width="5"/><path class="s" d="M250,70 Q284,110 280,150 L250,150 Q262,110 250,70 Z"/>';
    return wrap(s);
  };
  C.xac_cau = function () { // người vắt ngang ngọn cau non như tấm áo phơi, trời sáng mờ sương, dân làng đứng dưới
    var s = '<defs><linearGradient id="xcTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B8C0C8"/><stop offset=".7" stop-color="#D8D8D0"/><stop offset="1" stop-color="#C8C8B8"/></linearGradient>' +
      '<radialGradient id="xcSang" cx=".3" cy=".1" r=".7"><stop offset="0" stop-color="#FFF8E8" stop-opacity=".7"/><stop offset="1" stop-color="#FFF8E8" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="400" height="300" fill="url(#xcTroi)" stroke="none"/><rect width="400" height="300" fill="url(#xcSang)" stroke="none"/>';
    // hàng cau xa mờ trong sương
    [[40, 60], [90, 40], [320, 50], [370, 70]].forEach(function (p) { s += '<g opacity=".35" stroke="none" fill="#6A7268"><rect x="' + (p[0] - 2) + '" y="' + p[1] + '" width="4" height="' + (300 - p[1]) + '"/><path d="M' + p[0] + ',' + p[1] + ' q-22,-2 -30,12 q14,-8 30,-6 q-14,-14 -6,-22 q8,10 6,16 q10,-14 24,-10 q-14,4 -22,14 q20,-4 28,10 q-16,-6 -30,-8 z"/></g>'; });
    s += '<rect y="226" width="400" height="74" fill="#7E8A64" stroke="none"/><ellipse cx="200" cy="232" rx="260" ry="20" fill="#E9E6DA" opacity=".55" stroke="none"/>';
    // cây cau non gầy, lá gãy rủ, quả rụng dưới gốc
    s += '<path d="M206,300 L208,92 L214,92 L216,300 Z" fill="#8A8474"/><path d="M211,300 L212,92 L214,92 L216,300 Z" fill="#5E5A4E" opacity=".6" stroke="none"/>';
    var dot = ''; for (var k = 110; k < 290; k += 16) dot += 'M207,' + k + ' q4,2 8,0'; s += '<path d="' + dot + '" fill="none" stroke-width="1.4" opacity=".6"/>';
    s += '<path d="M211,92 q-24,6 -30,46 M211,92 q26,4 30,52 M211,92 q-8,-18 -34,-14" fill="none" stroke="#7A6E3A" stroke-width="5"/><path d="M211,92 q-24,6 -30,46 M211,92 q26,4 30,52" fill="none" stroke="#C8B060" stroke-width="2" stroke-dasharray="4 4"/>';
    [[176, 288], [236, 292], [196, 296], [250, 284]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="5" ry="6" fill="#C9A23A" stroke-width="1.6"/><path d="M' + (p[0] - 3) + ',' + p[1] + ' h6" stroke="#F3EEDF" stroke-width="2"/>'; });
    // xác vắt trên ngọn (cùng một hình với ngoài cảnh)
    s += '<g transform="translate(117,49) scale(1.18)">' + G.art.xacVat() + '</g>';
    // dân làng đứng dưới, quay lưng, bóng mờ trong sương
    [[70, 300, 1], [118, 304, .9], [306, 302, 1], [350, 306, .85]].forEach(function (p) { s += '<g opacity=".7" stroke="none" fill="#3A3A40" transform="translate(' + p[0] + ',' + p[1] + ') scale(' + p[2] + ')"><circle cx="0" cy="-58" r="14"/><path d="M-16,-46 q16,-6 32,0 l6,46 h-44 z"/>' + (p[0] < 100 ? '<path d="M-22,-62 L0,-80 L22,-62 Z" fill="#8A8060"/>' : '') + '</g>'; });
    return wrap(s, '#C8CCD0');
  };
  C.ban_tay = function () { // dưới nước đục: bàn tay người khác trồi lên từ bùn
    var s = '<rect width="400" height="300" fill="#1A2420" stroke="none"/>';
    for (var i = 0; i < 14; i++) s += '<circle cx="' + (30 + i * 27) + '" cy="' + (40 + (i * 61) % 220) + '" r="' + (2 + i % 3) + '" fill="#3A4A40" stroke="none"/>';
    s += '<path d="M0,240 Q100,220 200,236 T400,230 V300 H0 Z" fill="#2A2018" stroke="none"/>';
    s += '<path d="M120,300 L150,200 Q154,186 166,190 L172,150 Q176,140 184,146 L184,190 L190,140 Q196,130 202,140 L198,192 L208,150 Q214,142 220,150 L210,200 L222,176 Q230,170 232,182 L214,240 L200,300 Z" fill="#8A9A8A"/>';
    s += '<path d="M240,300 L250,236 Q256,220 270,226 L276,196 Q280,186 288,192 L286,230 L292,200 Q298,192 304,200 L296,250 L290,300 Z" fill="#D8C2A0" opacity=".9"/>';
    return wrap(s);
  };
  C.flash_riu = function () { // ảnh chớp: gốc cau, bàn tay đeo nhẫn bạc cầm rìu
    var s = '<rect width="400" height="300" fill="#0C0A0A" stroke="none"/><rect x="0" y="0" width="400" height="300" fill="#5A0A06" opacity=".35" stroke="none"/>';
    s += '<path d="M260,300 L266,0 L290,0 L296,300 Z" fill="#6A6050"/><path d="M262,190 L294,170 L294,206 L262,214 Z" fill="#2A0806"/>';
    s += '<path d="M20,230 Q90,190 150,160 L170,180 Q110,220 40,260 Z" fill="#D8B898"/>';
    s += '<circle cx="128" cy="176" r="9" fill="none" stroke="#EEF2F4" stroke-width="5"/>';
    s += '<path d="M140,168 L250,120" stroke="#3A2A1E" stroke-width="10"/><path d="M236,96 q36,-6 40,30 l-26,14 q-2,-24 -14,-44 Z" fill="#B0B6BA"/>';
    return wrap(s, '#0C0A0A');
  };
  // mặt bàn gỗ sẫm có vân, ánh đèn dầu rọi từ trên trái
  function banGo(id) {
    var s = '<defs><radialGradient id="' + id + 'L" cx="35%" cy="25%" r="80%"><stop offset="0" stop-color="#FFD9A0" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>';
    s += '<rect width="400" height="300" fill="#4A2E1E" stroke="none"/>';
    for (var i = 0; i < 9; i++) s += '<path d="M0,' + (18 + i * 34) + ' Q120,' + (10 + i * 34) + ' 220,' + (22 + i * 34) + ' T400,' + (14 + i * 34) + '" fill="none" stroke="#3A2214" stroke-width="2" opacity=".7"/>';
    return { nen: s, den: '<rect width="400" height="300" fill="url(#' + id + 'L)" stroke="none"/>' };
  }
  function xu(x, y, r, xoay) { // đồng xu đồng lỗ vuông, có vết chữ mờ
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (xoay || 0) + ') scale(1,.55)"><circle r="' + r + '" fill="#B8862E"/><circle r="' + (r * .78) + '" fill="none" stroke="#8A5A1E" stroke-width="1.5"/>' +
      '<rect x="' + (-r * .28) + '" y="' + (-r * .28) + '" width="' + (r * .56) + '" height="' + (r * .56) + '" fill="#2A1A10"/>' +
      '<path d="M0,' + (-r * .62) + ' v' + (r * .2) + 'M0,' + (r * .42) + ' v' + (r * .2) + 'M' + (-r * .62) + ',0 h' + (r * .2) + 'M' + (r * .42) + ',0 h' + (r * .2) + '" stroke="#6A4214" stroke-width="2"/></g>';
  }
  C.tui_tien = function () { // túi gấm đỏ thêu kim tuyến, tiền đồng tràn ra, bàn tay đeo nhẫn bạc vừa buông
    var b = banGo('tt'), s = b.nen;
    s += '<ellipse cx="200" cy="240" rx="120" ry="22" fill="#000" opacity=".35" stroke="none"/>';
    // xâu tiền (quan tiền) nằm vắt chéo
    for (var i = 0; i < 9; i++) s += xu(70 + i * 15, 252 - i * 4, 11, 10);
    s += '<path d="M60,256 Q140,226 200,214" fill="none" stroke="#7A5A2A" stroke-width="2.5"/>';
    // thân túi
    s += '<path d="M138,112 Q120,170 128,214 Q150,252 204,254 Q262,252 280,214 Q290,168 262,112 Q232,96 200,98 Q166,96 138,112 Z" fill="#A8241A"/>';
    s += '<path class="s" d="M246,112 Q284,170 272,222 Q258,246 232,252 Q270,200 246,112 Z"/>';
    // hoa văn mây thêu kim tuyến
    [[170, 150], [222, 140], [196, 190], [150, 210], [246, 200]].forEach(function (p) {
      s += '<path d="M' + p[0] + ',' + p[1] + ' q8,-10 16,0 q8,-10 16,0 q-8,8 -16,4 q-8,4 -16,-4 z" fill="none" stroke="#E2B44C" stroke-width="2"/>';
    });
    s += '<path d="M134,140 Q200,158 268,138" fill="none" stroke="#E2B44C" stroke-width="3" stroke-dasharray="2 5"/>';
    // miệng túi rút dây
    s += '<path d="M150,108 Q160,76 172,84 Q186,66 200,80 Q214,64 228,82 Q242,74 250,108 Q200,122 150,108 Z" fill="#8A1A12"/>';
    s += '<path d="M146,110 Q200,126 254,110" fill="none" stroke="#E2B44C" stroke-width="5"/><path d="M252,112 q22,10 28,38 l-6,22" fill="none" stroke="#E2B44C" stroke-width="3"/>';
    s += '<path d="M268,170 l6,22 l6,-22 z" fill="#C8241A" stroke="#E2B44C" stroke-width="1.5"/>';
    // tiền tràn ra miệng túi
    s += xu(232, 96, 12, -20) + xu(300, 236, 13, 30) + xu(326, 250, 12, -10) + xu(312, 216, 11, 60);
    // bàn tay đàn bà vừa buông túi, ngón đeo nhẫn bạc
    s += '<path d="M400,40 Q330,52 296,78 Q282,90 290,98 Q306,100 322,88 L332,96 Q318,110 330,114 Q350,106 360,96 Q400,96 400,96 Z" fill="#D8B898"/>';
    s += '<path d="M300,86 q8,4 16,-2M330,100 q8,4 14,-4" fill="none" stroke-width="2"/>';
    s += '<ellipse cx="318" cy="84" rx="7" ry="5" fill="none" stroke="#EEF2F4" stroke-width="4"/><circle cx="314" cy="80" r="2" fill="#FFFFFF" stroke="none"/>';
    s += b.den;
    return wrap(s, '#4A2E1E');
  };
  C.gio_tep = function () { // giỏ tre cũ treo vách bếp, ướt sũng, đáy còn con cá bống khô mắt mở
    var s = '<defs><radialGradient id="gtL" cx="50%" cy="20%" r="80%"><stop offset="0" stop-color="#FFC880" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>' +
      '<clipPath id="gtC"><path d="M96,96 H304 L276,252 Q200,266 124,252 Z"/></clipPath></defs>';
    s += '<rect width="400" height="300" fill="#5A4030" stroke="none"/>';
    for (var y = 0; y < 300; y += 26) s += '<path d="M0,' + y + ' H400" stroke="#4A3224" stroke-width="3" opacity=".8"/>';
    s += '<path d="M200,0 V40" stroke-width="3"/><path d="M196,40 q4,-8 8,0" fill="none" stroke-width="3"/>';
    // thân giỏ đan lóng mốt
    s += '<path d="M96,96 H304 L276,252 Q200,266 124,252 Z" fill="#B8884A"/>';
    var dan = '';
    for (var x = 60; x < 340; x += 14) dan += '<path d="M' + x + ',90 L' + (x + 10) + ',270" stroke="#8A6030" stroke-width="5"/>';
    for (var yy = 104; yy < 262; yy += 12) dan += '<path d="M90,' + yy + ' Q200,' + (yy + 6) + ' 310,' + yy + '" fill="none" stroke="#D0A060" stroke-width="5" opacity=".85"/><path d="M90,' + yy + ' Q200,' + (yy + 6) + ' 310,' + yy + '" fill="none" stroke="#6A4420" stroke-width="1"/>';
    s += '<g clip-path="url(#gtC)">' + dan + '<rect x="90" y="190" width="220" height="80" fill="#2A1A10" opacity=".45" stroke="none"/></g>';
    s += '<path d="M96,96 H304 L276,252 Q200,266 124,252 Z" fill="none" stroke-width="3.5"/>';
    // vành miệng giỏ, lòng giỏ tối ướt
    s += '<ellipse cx="200" cy="96" rx="108" ry="22" fill="#6A4420"/><ellipse cx="200" cy="98" rx="96" ry="15" fill="#140E0A"/>';
    s += '<path d="M120,96 Q200,40 280,96" fill="none" stroke="#8A6030" stroke-width="7"/>';
    // cá bống khô trong lòng giỏ, mắt mở nhìn lên
    s += '<path d="M160,100 Q196,88 230,98 L246,90 L244,108 L230,102 Q196,110 160,100 Z" fill="#8A8070" stroke-width="2.5"/><circle cx="170" cy="98" r="3.5" fill="#E8E4D8" stroke-width="1.2"/><circle cx="170" cy="98" r="1.4" fill="#000" stroke="none"/>';
    // nước nhỏ giọt từ đáy
    s += '<g fill="#8FB8C0" stroke="none" opacity=".85"><path d="M190,262 q4,8 0,14 q-4,-6 0,-14Z"/><path d="M214,264 q4,8 0,14 q-4,-6 0,-14Z"/><ellipse cx="202" cy="296" rx="40" ry="6" opacity=".6"/></g>';
    s += '<rect width="400" height="300" fill="url(#gtL)" stroke="none"/>';
    return wrap(s, '#5A4030');
  };
  C.trap = function () { // tráp sơn then mở nắp: chỉ đỏ, chuông đồng, sổ tay dán kín, mảnh vảy rắn ánh xanh
    var b = banGo('tr'), s = b.nen;
    s += '<defs><linearGradient id="trV" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A5A4A"/><stop offset=".5" stop-color="#1A2A24"/><stop offset="1" stop-color="#4A7A6A"/></linearGradient></defs>';
    // nắp tráp dựng phía sau
    s += '<path d="M60,40 H340 L330,96 H70 Z" fill="#3A1A12"/><path d="M76,50 H324 L318,88 H82 Z" fill="none" stroke="#C8A040" stroke-width="2.5"/>';
    // thân tráp
    s += '<path d="M44,96 H356 L348,268 H52 Z" fill="#5A2216"/><path d="M62,110 H338 L332,254 H68 Z" fill="#1E120C"/>';
    s += '<path d="M44,96 H356" stroke="#C8A040" stroke-width="4"/><path d="M52,268 H348" stroke="#C8A040" stroke-width="3"/>';
    // sổ tay, trang dán hồ
    s += '<g transform="rotate(-7 130 170)"><rect x="80" y="126" width="104" height="80" fill="#E2CF9A"/><path d="M132,126 v80" stroke-width="2"/>' +
      '<path class="d" d="M90,140 h34M90,152 h30M90,164 h34M142,140 h32M142,152 h28"/><rect x="140" y="160" width="38" height="40" fill="#C8B078" stroke-width="2"/><path d="M140,160 l38,40M178,160 l-38,40" stroke="#8A6A3A" stroke-width="1.5"/></g>';
    // cuộn chỉ đỏ
    s += '<ellipse cx="110" cy="232" rx="30" ry="12" fill="#A8241A"/><path d="M80,228 q30,10 60,0M82,236 q28,9 56,0" fill="none" stroke="#7A140C" stroke-width="2"/><path d="M140,232 q30,6 40,22" fill="none" stroke="#C8241A" stroke-width="2.5"/>';
    // chuông đồng
    s += '<path d="M232,128 q26,-6 34,22 l8,46 h-84 l8,-46 q8,-28 34,-22 z" fill="#C8963A"/><path class="s" d="M260,134 q12,20 14,62 h-16 q2,-40 2,-62 z"/><path d="M226,128 q12,-14 24,0" fill="none" stroke-width="4"/><circle cx="240" cy="200" r="6" fill="#7A5A1E"/>';
    // mảnh vảy rắn to bằng bàn tay
    s += '<path d="M248,226 Q286,196 322,212 Q330,240 300,258 Q262,262 248,226 Z" fill="url(#trV)"/>';
    for (var i = 0; i < 5; i++) s += '<path d="M' + (262 + i * 12) + ',' + (220 - i * 2) + ' q8,12 2,26" fill="none" stroke="#7ACAB0" stroke-width="1.6" opacity=".7"/>';
    s += '<path d="M262,214 q20,-10 40,-4" fill="none" stroke="#B8F0D8" stroke-width="2" opacity=".6"/>';
    s += b.den;
    return wrap(s, '#4A2E1E');
  };
  C.hop_dong = function () { // giấy giao ước: giấy dó, chữ viết dọc, ấn son, dấu điểm chỉ đỏ
    var b = banGo('hd'), s = b.nen;
    s += '<path d="M64,26 H336 L330,282 H70 Z" fill="#E6D6A6"/><path d="M64,26 H336" stroke="#8A6A3A" stroke-width="10" stroke-linecap="round"/><path d="M70,282 H330" stroke="#8A6A3A" stroke-width="10" stroke-linecap="round"/>';
    for (var i = 0; i < 40; i++) s += '<circle cx="' + (80 + (i * 53) % 240) + '" cy="' + (40 + (i * 37) % 230) + '" r="' + (6 + i % 7) + '" fill="#C8B080" opacity=".18" stroke="none"/>';
    // cột chữ viết dọc từ phải sang trái
    for (var c = 0; c < 8; c++) {
      var x = 300 - c * 28, y = 48;
      while (y < (c === 7 ? 150 : 230)) { var h = 10 + (x * 7 + y * 3) % 10; s += '<path d="M' + (x - 7) + ',' + y + ' h14M' + x + ',' + (y - 2) + ' v' + h + (y % 3 ? 'M' + (x - 6) + ',' + (y + h - 3) + ' l12,-4' : '') + '" stroke="#2B1F1A" stroke-width="2.2" fill="none"/>'; y += h + 8; }
    }
    // ấn son vuông
    s += '<g transform="rotate(-4 250 240)"><rect x="226" y="216" width="50" height="50" fill="#B0180E" stroke="#7A0A06"/><rect x="232" y="222" width="38" height="38" fill="none" stroke="#F2D0B0" stroke-width="2.5"/>' +
      '<path d="M240,232 h22M251,226 v30M240,248 h22M242,256 h18" stroke="#F2D0B0" stroke-width="2.5"/></g>';
    // dấu điểm chỉ: vân tay đỏ
    var vt = '<g transform="translate(120,236) rotate(-15)" fill="none" stroke="#B0180E" stroke-width="1.6" opacity=".9">';
    for (var r = 3; r < 20; r += 3) vt += '<ellipse rx="' + r + '" ry="' + (r * 1.35) + '"/>';
    s += vt + '</g><text x="120" y="282" text-anchor="middle" font-size="11" fill="#6A4A2A" stroke="none" font-style="italic">điểm chỉ</text>';
    // bút lông gác bên cạnh
    s += '<path d="M346,60 L380,250" stroke="#3A2A1A" stroke-width="7"/><path d="M380,250 l6,26 l-10,-22 z" fill="#1A1210"/>';
    s += b.den;
    return wrap(s, '#4A2E1E');
  };
  // chân dung nhỏ cho trang Sổ Tử
  C.por_tam = function () {
    var s = '<rect width="400" height="300" fill="#2B1F1A" stroke="none"/><rect x="120" y="30" width="160" height="230" fill="#E9D9A8"/><rect x="134" y="44" width="132" height="202" fill="#C9B48A"/>';
    s += '<path d="M150,246 Q150,150 200,140 Q250,150 250,246 Z" fill="#6A5A4A" stroke="none" opacity=".7"/><circle cx="200" cy="112" r="36" fill="#6A5A4A" stroke="none" opacity=".7"/>';
    s += '<path d="M164,100 Q160,60 200,58 Q240,60 236,100 L236,180 L220,140 L180,140 L164,180 Z" fill="#2B1F1A" stroke="none" opacity=".75"/>';
    s += '<path d="M134,44 L266,246" stroke="#B84A3E" stroke-width="2" opacity=".6"/>';
    return wrap(s);
  };
  C.por_thay = function () { return C.xac_cau(); };

  G.ui.closeup = function (id) {
    var el = G.$('closeup');
    if (!id || !C[id]) { el.hidden = true; el._id = null; return; }
    if (el._id !== id) { el.innerHTML = C[id](); el._id = id; }
    el.hidden = false;
  };
})();
