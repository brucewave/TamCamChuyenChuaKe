// Cảnh Chương 4: đường rừng / chợ âm, bìa rừng có cây thị một quả và ao thị, nhà bà cụ hàng nước.
var G = window.G || (window.G = {});
G.CH_ORDER = ['mo_dau', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5'];

Object.assign(G.LOCATIONS, {
  cho_am:   { id: 'cho_am',   name: 'Đường rừng', width: 960, height: 720, exits: { left: 'bia_rung', right: 'hang_nuoc' }, ch: 4 },
  bia_rung: { id: 'bia_rung', name: 'Bìa rừng phía tây', width: 960, height: 720, exits: { right: 'cho_am' }, ch: 4 },
  nha_bacu: { id: 'nha_bacu', name: 'Nhà bà cụ', width: 960, height: 620, exits: {} }
});

(function () {
  var K = G.sceneKit, B = K.B, rect = K.rect, ink = K.ink, INK = G.INK;

  function cayRung(b, x, y, r, mau) { // cây rừng: rễ nổi, thân có vỏ sần, tán nhiều tầng sáng tối
    var s = G.ve.bong(x + 6, y + 2, 58, 13, .28);
    s += G.ve.than(x + 2, y, 128, 15, 8, ['#5A4A3A', '#3A2E24', '#7E6A54'], r);
    var pal = mau ? ['#2A3E22', mau, '#5E7A4A', '#7E9466', '#18241A'] : G.ve.LA.dam;
    s += G.ve.tan(x - 34, y - 160, 54, 40, r, pal) + G.ve.tan(x + 38, y - 166, 52, 38, r, pal) + G.ve.tan(x, y - 200, 70, 48, r, pal);
    // rêu bám thân
    s += '<ellipse cx="' + (x - 6) + '" cy="' + (y - 30) + '" rx="6" ry="12" fill="#6E8A4A" opacity=".55" stroke="none"/><ellipse cx="' + (x + 8) + '" cy="' + (y - 70) + '" rx="4" ry="9" fill="#6E8A4A" opacity=".45" stroke="none"/>';
    b.prop(x - 120, y - 270, 240, 284, s, y, 'sway'); b.solid(x - 14, y - 10, 30, 14);
  }
  function duongXi(x, y, s2) { // khóm dương xỉ thấp
    var s = ''; for (var i = 0; i < 6; i++) { var a = -2.8 + i * 0.36; s += '<path d="M' + x + ',' + y + ' Q' + (x + Math.cos(a) * 14 * s2).toFixed(1) + ',' + (y - 16 * s2).toFixed(1) + ' ' + (x + Math.cos(a) * 26 * s2).toFixed(1) + ',' + (y + Math.sin(a) * 18 * s2).toFixed(1) + '" fill="none" stroke="#4E7A3A" stroke-width="' + (5 * s2).toFixed(1) + '"/>'; }
    return s;
  }

  // ============ ĐƯỜNG RỪNG (đêm rằm thành chợ âm) ============
  G.scenes.cho_am = function (S) {
    var b = new B(960, 720), r = K.rng(71), s = '', cho = G.ch4 && G.ch4.choMo(S);
    s += rect(0, 0, 960, 720, '#6E8250');
    for (var m = 0; m < 14; m++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (r() * 720).toFixed(0) + '" rx="' + (40 + r() * 60).toFixed(0) + '" ry="' + (16 + r() * 20).toFixed(0) + '" fill="#5E7244" opacity=".5" stroke="none"/>';
    // đường đất: rìa cỏ, vết chân, đá lăn
    s += '<path d="M0,500 Q240,470 480,500 T960,490" fill="none" stroke="#A88A5A" stroke-width="100"/><path d="M0,500 Q240,470 480,500 T960,490" fill="none" stroke="#B89A6A" stroke-width="80"/>';
    for (var d2 = 0; d2 < 26; d2++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (470 + r() * 50).toFixed(0) + '" rx="' + (3 + r() * 4).toFixed(0) + '" ry="2.4" fill="#9A8460" stroke="none"/>';
    for (var i = 0; i < 70; i++) s += '<path d="M' + (r() * 960) + ',' + (r() * 720) + ' l3,-8 l3,8" fill="none" stroke="#5A6A40" stroke-width="2"/>';
    // dương xỉ, nấm, đá rêu, khúc gỗ mục
    [[260, 600], [520, 640], [780, 590], [60, 560], [900, 640], [340, 420], [700, 420]].forEach(function (p, k) { s += duongXi(p[0], p[1], .9 + (k % 3) * .2); });
    [[300, 612], [306, 618], [540, 660]].forEach(function (p) { s += '<path d="M' + (p[0] - 6) + ',' + p[1] + ' q6,-12 12,0 z" fill="#C8402A" stroke-width="1.5"/><path d="M' + p[0] + ',' + p[1] + ' v6" stroke-width="2"/><circle cx="' + (p[0] - 2) + '" cy="' + (p[1] - 4) + '" r="1.2" fill="#FFF" stroke="none"/>'; });
    [[160, 590], [640, 600], [860, 420]].forEach(function (p) { s += '<path d="M' + (p[0] - 20) + ',' + p[1] + ' q4,-16 20,-16 q16,0 20,16 z" fill="#8A8A7A" stroke-width="2"/><path d="M' + (p[0] - 14) + ',' + (p[1] - 10) + ' q10,-6 24,0" stroke="#5E7A44" stroke-width="4" fill="none"/>'; });
    s += '<path d="M430,618 l110,-8 l4,16 l-110,8 z" fill="#6A5038" stroke-width="2.4"/><ellipse cx="432" cy="626" rx="6" ry="8" fill="#8A6A4A" stroke-width="2"/><path d="M450,622 h80" stroke="#4A3828" stroke-width="1.5"/>';
    // cột mốc đá ven đường
    s += '<path d="M908,560 h24 v-34 q-12,-12 -24,0 z" fill="#B8B4A6" stroke-width="2.4"/><path d="M914,540 h12" stroke="#5A3A2A" stroke-width="2"/>';
    b.bg += ink(s);
    [60, 200, 340, 620, 780, 900].forEach(function (x, k) { cayRung(b, x, 360 + (k % 2) * 30, r); });
    [120, 420, 700, 860].forEach(function (x) { cayRung(b, x, 690, r, '#3E5A30'); });
    if (cho) {
      // cổng chợ: hai cột tre treo đèn giấy xanh, băng giấy trắng, chữ CHỢ
      b.prop(830, 380, 60, 200, '<path d="M850,430 V390M850,570 V530" stroke="#3A2A20" stroke-width="7"/><path d="M850,392 Q870,480 850,568" fill="none" stroke="#E8ECE4" stroke-width="3" stroke-dasharray="10 6"/>' +
        '<rect x="840" y="398" width="20" height="26" rx="8" fill="#8FD0D8" class="flick"/><rect x="840" y="536" width="20" height="26" rx="8" fill="#8FD0D8" class="flick"/>' +
        '<rect x="856" y="456" width="22" height="46" fill="#E8ECE4" stroke-width="2"/><text x="867" y="485" text-anchor="middle" font-size="13" font-weight="900" fill="#2A3A3A" stroke="none" font-family="\'Playfair Display\', serif" writing-mode="tb">CHỢ</text>', 570);
      b.solid(844, 424, 12, 10); b.solid(844, 560, 12, 10);
      b.lights.push({ x: 850, y: 410, r: 80, flick: true }, { x: 850, y: 548, r: 80, flick: true });
      // các sạp chợ âm: mái lá rách, đèn giấy xanh, hàng bày: vàng mã, hình nhân, bát cơm cắm đũa, nhang
      [[180, 470, 'ma'], [360, 450, 'nhan'], [560, 470, 'com'], [760, 450, 'nhang']].forEach(function (p) {
        var x = p[0], y = p[1];
        var st = '<path d="M' + (x - 54) + ',' + (y - 70) + ' L' + x + ',' + (y - 104) + ' L' + (x + 54) + ',' + (y - 70) + ' L' + (x + 40) + ',' + (y - 64) + ' L' + (x + 30) + ',' + (y - 72) + ' L' + (x + 10) + ',' + (y - 64) + ' L' + (x - 14) + ',' + (y - 72) + ' L' + (x - 36) + ',' + (y - 64) + ' Z" fill="#4A4A3A"/>';
        st += '<path d="M' + (x - 40) + ',' + (y - 80) + ' l12,-10M' + (x + 20) + ',' + (y - 86) + ' l14,8" stroke="#6A6A50" stroke-width="2"/>';
        st += rect(x - 46, y - 70, 6, 70, '#3A2A20') + rect(x + 40, y - 70, 6, 70, '#3A2A20');
        st += rect(x - 42, y - 30, 84, 20, '#5A4A3A') + '<path d="M' + (x - 42) + ',' + (y - 10) + ' v10M' + (x + 42) + ',' + (y - 10) + ' v10" stroke-width="3"/>';
        st += '<rect x="' + (x - 8) + '" y="' + (y - 66) + '" width="16" height="20" rx="6" fill="#8FD0D8" class="flick"/><path d="M' + x + ',' + (y - 46) + ' v8" stroke="#8FD0D8" stroke-width="2"/>';
        if (p[2] === 'ma') st += '<rect x="' + (x - 34) + '" y="' + (y - 40) + '" width="22" height="12" fill="#E2B848" stroke-width="1.5" transform="rotate(-8 ' + (x - 23) + ' ' + (y - 34) + ')"/><rect x="' + (x - 8) + '" y="' + (y - 42) + '" width="22" height="12" fill="#C8A040" stroke-width="1.5"/><circle cx="' + (x + 3) + '" cy="' + (y - 36) + '" r="2.4" fill="#B84A3E" stroke="none"/><rect x="' + (x + 18) + '" y="' + (y - 40) + '" width="18" height="10" fill="#E8ECE4" stroke-width="1.5"/>';
        if (p[2] === 'nhan') [[-26, '#E8ECE4'], [-6, '#E8A0A0'], [14, '#A0C8E8']].forEach(function (h) { st += '<g transform="translate(' + (x + h[0]) + ',' + (y - 30) + ')"><circle cy="-22" r="6" fill="#F2EEE4" stroke-width="1.5"/><path d="M-1.5,-23 h0.5M2.5,-23 h0.5" stroke-width="1.5"/><path d="M-7,-16 h14 l3,16 h-20 z" fill="' + h[1] + '" stroke-width="1.5"/></g>'; });
        if (p[2] === 'com') [-22, 0, 22].forEach(function (dx) { st += '<path d="M' + (x + dx - 9) + ',' + (y - 32) + ' h18 q-2,8 -9,8 q-7,0 -9,-8 z" fill="#E9E2D0" stroke-width="1.5"/><path d="M' + (x + dx - 8) + ',' + (y - 32) + ' q8,-8 16,0" fill="#FFFFFF" stroke-width="1.2"/><path d="M' + (x + dx - 2) + ',' + (y - 36) + ' v-16M' + (x + dx + 2) + ',' + (y - 36) + ' v-16" stroke="#8A6A3A" stroke-width="1.6"/>'; });
        if (p[2] === 'nhang') { st += '<path d="M' + (x - 30) + ',' + (y - 30) + ' h60" stroke="#8A2A1E" stroke-width="4"/>'; for (var n = -26; n <= 26; n += 6) st += '<path d="M' + (x + n) + ',' + (y - 30) + ' l2,-22" stroke="#B84A3E" stroke-width="1.5"/>'; }
        b.prop(x - 62, y - 108, 124, 112, st, y - 10);
        b.lights.push({ x: x, y: y - 56, r: 90, flick: true });
      });
      // tiền giấy bay lơ lửng trong sương
      var tien = '';
      for (var tg = 0; tg < 14; tg++) tien += '<rect x="' + (r() * 940).toFixed(0) + '" y="' + (380 + r() * 220).toFixed(0) + '" width="12" height="8" fill="#E8ECE4" opacity=".75" transform="rotate(' + (r() * 60 - 30).toFixed(0) + ')"/>';
      b.fgs += '<g class="fog" opacity=".45"><ellipse cx="300" cy="520" rx="400" ry="50" fill="#C8D8D8"/><ellipse cx="760" cy="430" rx="300" ry="40" fill="#C8D8D8"/></g><g class="fog">' + tien + '</g>';
    }
    b.edges();
    return b.out();
  };

  // ============ BÌA RỪNG: cây thị một quả, ao thị ============
  function bui(x, y, r, toi) { // bụi rậm thấp (chỗ nấp), đi xuyên qua được
    var s = '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="56" ry="12" fill="' + INK + '" opacity=".2" stroke="none"/>';
    s += G.ve.tan(x, y - 16, 54, 24, r, toi ? ['#2A3E22', toi, '#4E6A3A', '#6E8A4A', '#18241A'] : G.ve.LA.dam, { n: 12, la: 36 });
    return s;
  }
  G.scenes.bia_rung = function (S) {
    var b = new B(960, 720), r = K.rng(83), s = '', f = S.flags;
    s += rect(0, 0, 960, 720, '#566C42');
    for (var m = 0; m < 16; m++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (r() * 720).toFixed(0) + '" rx="' + (40 + r() * 70).toFixed(0) + '" ry="' + (16 + r() * 24).toFixed(0) + '" fill="' + (m % 2 ? '#4A6038' : '#627A4A') + '" opacity=".55" stroke="none"/>';
    // rừng sâu phía bắc: hàng cây tối làm nền
    s += '<path d="M0,0 H960 V170 Q900,200 840,176 Q780,210 700,180 Q620,214 540,186 Q460,206 380,180 Q300,214 220,184 Q140,206 60,180 Q20,196 0,186 Z" fill="#2E4226"/>';
    for (var t = 0; t < 22; t++) s += '<circle cx="' + (t * 46).toFixed(0) + '" cy="' + (150 + (t % 3) * 14).toFixed(0) + '" r="' + (34 + (t % 4) * 6) + '" fill="' + (t % 2 ? '#344A2C' : '#3A5232') + '" stroke="none"/>';
    // lá mục rải đất
    for (var l = 0; l < 60; l++) { var lx = r() * 960, ly = 200 + r() * 520; s += '<path d="M' + lx.toFixed(0) + ',' + ly.toFixed(0) + ' q5,-5 10,0 q-5,4 -10,0 z" fill="' + ['#8A6A3A', '#A0602E', '#6A5A30'][l % 3] + '" opacity=".75" transform="rotate(' + Math.floor(r() * 360) + ' ' + lx.toFixed(0) + ' ' + ly.toFixed(0) + ')"/>'; }
    // lối mòn từ đông vào gốc thị, đá ven lối
    s += '<path d="M960,500 Q760,480 600,500 Q520,510 480,470" fill="none" stroke="#8A7450" stroke-width="80"/><path d="M960,500 Q760,480 600,500 Q520,510 480,470" fill="none" stroke="#A88E62" stroke-width="62"/>';
    [[900, 456], [820, 536], [740, 454], [660, 540], [580, 462]].forEach(function (q) { s += '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="9" ry="5" fill="#9A988A" stroke-width="1.6"/>'; });
    // ao thị: bờ đá rêu, nước sẫm có ánh trăng, súng, sậy, khúc gỗ đổ
    s += '<path d="M60,540 Q80,470 220,480 Q380,490 400,580 Q390,680 230,690 Q70,690 60,620 Z" fill="#1E3436" stroke-width="4"/>';
    s += '<path d="M90,560 Q100,500 220,506 Q350,514 370,580 Q360,656 230,664 Q100,664 90,610 Z" fill="#26403F" stroke="none"/>';
    s += '<ellipse cx="250" cy="560" rx="40" ry="8" fill="#C8D8C8" opacity=".25" stroke="none"/><ellipse cx="266" cy="576" rx="24" ry="4" fill="#C8D8C8" opacity=".18" stroke="none"/>';
    for (var a2 = 0; a2 < 34; a2++) { var an = a2 / 34 * Math.PI * 2, ex = 230 + Math.cos(an) * 172, ey = 585 + Math.sin(an) * 100; s += '<ellipse cx="' + ex.toFixed(0) + '" cy="' + ey.toFixed(0) + '" rx="' + (10 + a2 % 4 * 2) + '" ry="6" fill="' + (a2 % 3 ? '#7A7A6A' : '#8A8A78') + '" stroke-width="1.8"/>' + (a2 % 3 === 0 ? '<ellipse cx="' + ex.toFixed(0) + '" cy="' + (ey - 3).toFixed(0) + '" rx="7" ry="2.4" fill="#5E7A44" stroke="none"/>' : ''); }
    for (var i = 0; i < 9; i++) { var px = 120 + r() * 230, py = 520 + r() * 130; s += '<path d="M' + px.toFixed(0) + ',' + py.toFixed(0) + ' m-12,0 a12,7 0 1,0 24,0 a12,7 0 1,0 -24,0" fill="#3E5A3A" stroke-width="2"/><path d="M' + px.toFixed(0) + ',' + py.toFixed(0) + ' l10,-3" stroke="#2A4028" stroke-width="1.4"/>' + (i % 3 === 0 ? '<circle cx="' + (px + 3).toFixed(0) + '" cy="' + (py - 4).toFixed(0) + '" r="4" fill="#F0ECE0" stroke-width="1.2"/>' : ''); }
    [[96, 520], [372, 560], [140, 660], [330, 650]].forEach(function (c) { for (var k = 0; k < 6; k++) s += '<path d="M' + (c[0] + k * 5) + ',' + c[1] + ' q' + (k - 3) + ',-22 ' + (k * 3 - 8) + ',-36" stroke="#4E6A3A" stroke-width="2.4" fill="none"/>'; s += '<rect x="' + (c[0] + 8) + '" y="' + (c[1] - 44) + '" width="5" height="12" rx="2" fill="#6A4A2A" stroke-width="1.2"/>'; });
    s += '<path d="M150,616 l130,-24 l6,14 l-130,24 z" fill="#4A3A2A" stroke-width="2.4"/><ellipse cx="152" cy="624" rx="7" ry="9" fill="#6A5038" stroke-width="2"/><path d="M200,604 q8,-8 4,-18" stroke="#5E7A44" stroke-width="3" fill="none"/>';
    // dương xỉ, nấm, đá rêu rải rác
    [[640, 640], [760, 600], [480, 640], [900, 560], [440, 300], [620, 250]].forEach(function (q, k) { s += duongXi(q[0], q[1], .9 + (k % 3) * .2); });
    [[700, 650], [708, 656], [470, 560]].forEach(function (q) { s += '<path d="M' + (q[0] - 6) + ',' + q[1] + ' q6,-12 12,0 z" fill="#E8E2D0" stroke-width="1.5"/><path d="M' + q[0] + ',' + q[1] + ' v6" stroke-width="2"/>'; });
    [[580, 620], [820, 650], [360, 300]].forEach(function (q) { s += '<path d="M' + (q[0] - 22) + ',' + q[1] + ' q4,-18 22,-18 q18,0 22,18 z" fill="#7A7A6A" stroke-width="2"/><path d="M' + (q[0] - 14) + ',' + (q[1] - 12) + ' q10,-6 26,0" stroke="#5E7A44" stroke-width="4" fill="none"/>'; });
    b.bg += ink(s);
    b.solid(70, 490, 320, 190);
    // cây thị cổ thụ: thân to xù xì có hốc, rễ nổi, dải vải đỏ buộc gốc, rêu treo, tán dày; một quả vàng phát sáng
    var x = 520, y = 400, tt = '<ellipse cx="' + x + '" cy="' + y + '" rx="96" ry="18" fill="' + INK + '" opacity=".25" stroke="none"/>';
    tt += '<path d="M' + (x - 30) + ',' + y + ' q-30,4 -54,18M' + (x + 26) + ',' + y + ' q30,2 56,16M' + (x - 8) + ',' + y + ' q-6,12 -2,22M' + (x + 10) + ',' + y + ' q10,10 18,16" fill="none" stroke="#3E3024" stroke-width="9"/>';
    tt += '<path d="M' + (x - 30) + ',' + y + ' Q' + (x - 34) + ',' + (y - 70) + ' ' + (x - 22) + ',' + (y - 130) + ' L' + (x + 20) + ',' + (y - 134) + ' Q' + (x + 30) + ',' + (y - 70) + ' ' + (x + 28) + ',' + y + ' Z" fill="#4A3A2A"/>';
    tt += '<path d="M' + (x - 16) + ',' + (y - 20) + ' q6,-20 0,-40M' + (x + 10) + ',' + (y - 50) + ' q-6,-18 2,-36M' + (x - 2) + ',' + (y - 100) + ' q6,-10 0,-20" fill="none" stroke="#2E2418" stroke-width="2.4"/>';
    tt += '<ellipse cx="' + (x + 6) + '" cy="' + (y - 64) + '" rx="9" ry="14" fill="#140E0A"/>';
    tt += '<path d="M' + (x - 31) + ',' + (y - 40) + ' Q' + x + ',' + (y - 30) + ' ' + (x + 30) + ',' + (y - 42) + '" fill="none" stroke="#B8241A" stroke-width="6"/><path d="M' + (x + 26) + ',' + (y - 40) + ' l10,22 l6,-2 M' + (x + 28) + ',' + (y - 40) + ' l16,16" fill="none" stroke="#B8241A" stroke-width="4"/>';
    tt += '<path d="M' + (x - 22) + ',' + (y - 128) + ' Q' + (x - 60) + ',' + (y - 170) + ' ' + (x - 110) + ',' + (y - 190) + 'M' + (x + 18) + ',' + (y - 130) + ' Q' + (x + 50) + ',' + (y - 176) + ' ' + (x + 110) + ',' + (y - 200) + 'M' + x + ',' + (y - 132) + ' Q' + (x + 4) + ',' + (y - 190) + ' ' + (x - 10) + ',' + (y - 236) + '" fill="none" stroke="#4A3A2A" stroke-width="14"/>';
    tt += G.ve.tan(x - 92, y - 196, 70, 52, r, G.ve.LA.dam) + G.ve.tan(x + 96, y - 204, 68, 50, r, G.ve.LA.dam) + G.ve.tan(x, y - 238, 120, 76, r, G.ve.LA.dam, { n: 22 });
    [[x - 90, y - 190], [x - 40, y - 176], [x + 70, y - 196], [x + 110, y - 200]].forEach(function (q) { tt += '<path d="M' + q[0] + ',' + q[1] + ' q-4,20 2,40 q-4,10 0,22" fill="none" stroke="#8A9A6A" stroke-width="3" opacity=".8"/>'; });
    // bát hương sành và mấy nén nhang tàn dưới gốc
    tt += '<path d="M' + (x - 60) + ',' + (y + 4) + ' h20 q-2,10 -10,10 q-8,0 -10,-10 z" fill="#7A6A5A" stroke-width="1.8"/><path d="M' + (x - 54) + ',' + (y + 4) + ' v-10M' + (x - 50) + ',' + (y + 4) + ' v-8M' + (x - 46) + ',' + (y + 4) + ' v-12" stroke="#5A2A1E" stroke-width="1.5"/>';
    b.prop(x - 190, y - 340, 380, 370, tt, y, 'sway'); b.solid(x - 26, y - 12, 54, 16);
    // quả thị duy nhất: prop riêng không filter, cùng khung và nhịp đung đưa với cây; quầng sáng thở, hương bốc (js/hoathan.js)
    if (!f.c4_hai) b.prop(x - 190, y - 340, 380, 370, G.hoathan.ink(G.hoathan.quaThi(x + 40, y - 198, 0.5, { canh: false, neo: [x + 40, y] })), y + 1, 'sway', true);
    if (!f.c4_hai) b.lights.push({ x: x + 40, y: y - 200, r: 120, flick: true });
    // dấu chân trần đi về phía đông (chỉ thấy khi mở mắt âm dương)
    var fp = '';
    for (var j = 0; j < 9; j++) fp += '<g transform="translate(' + (580 + j * 40) + ',' + (440 + (j % 2) * 16) + ')"><ellipse rx="6" ry="10" fill="#9FF0F0"/><circle cx="-3" cy="-12" r="1.8" fill="#9FF0F0"/><circle cx="1" cy="-13" r="1.8" fill="#9FF0F0"/><circle cx="5" cy="-11" r="1.6" fill="#9FF0F0"/></g>';
    b.fgs += '<g class="hid">' + fp + '</g>';
    // bụi rậm ở hai chỗ nấp
    b.prop(700, 330, 160, 100, bui(780, 410, r), 418);
    b.prop(150, 250, 120, 90, bui(210, 330, r, '#344A2C'), 336);
    [80, 200, 760, 880].forEach(function (cx2, k) { cayRung(b, cx2, 300 + (k % 2) * 40, r); });
    cayRung(b, 860, 690, r, '#3E5A30');
    // cú mèo đậu cành cây phía tây, mắt sáng ban đêm
    var dem = S.phase === 'dem' || S.phase === 'toi';
    b.prop(150, 120, 60, 60, '<path d="M150,170 h60" stroke="#4A3A2A" stroke-width="5"/><ellipse cx="180" cy="152" rx="12" ry="16" fill="#6A5A40"/><path d="M170,138 l3,-8 l5,6 M190,138 l-3,-8 l-5,6" fill="#6A5A40" stroke-width="1.5"/>' +
      '<circle cx="175" cy="146" r="4.4" fill="' + (dem ? '#F0D040' : '#E8DCC0') + '" stroke-width="1.2"/><circle cx="185" cy="146" r="4.4" fill="' + (dem ? '#F0D040' : '#E8DCC0') + '" stroke-width="1.2"/><circle cx="175" cy="146" r="1.6" fill="#000" stroke="none"/><circle cx="185" cy="146" r="1.6" fill="#000" stroke="none"/><path d="M178,152 l2,4 l2,-4" fill="#C8963A" stroke-width="1"/>', 172);
    b.edges();
    return b.out();
  };

  // cửa nhà bà cụ sau quán nước: nhà tranh vách đất, cửa liếp tre, chum nước, giàn mướp
  G.scenes.hangHook = function (b, S) {
    if (S.chapter !== 'ch4') return;
    b.bg += ink('<rect x="500" y="300" width="120" height="110" fill="#B98C5E"/><path d="M500,330 h120M500,360 h120M500,390 h120" stroke="#A07A4E" stroke-width="2"/>' +
      '<path d="M484,308 L560,258 L636,308 L624,316 L496,316 Z" fill="url(#ra)"/><path d="M490,312 q-6,-6 -2,-12M630,312 q6,-6 2,-12" fill="none" stroke-width="2.5"/>' +
      '<rect x="540" y="340" width="40" height="70" fill="#4A2A1E"/><path d="M546,340 v70M554,340 v70M562,340 v70M570,340 v70" stroke="#7A5A3A" stroke-width="2"/>' +
      '<rect x="508" y="332" width="22" height="18" fill="#2A2A20"/><path d="M514,332 v18M520,332 v18M526,332 v18" stroke="#8A6440" stroke-width="2"/>' +
      '<path d="M500,300 Q470,290 456,300 M620,300 Q650,284 662,296" fill="none" stroke="#5E7A3A" stroke-width="4"/><ellipse cx="462" cy="302" rx="8" ry="5" fill="#6E9A4A"/><ellipse cx="656" cy="294" rx="8" ry="5" fill="#6E9A4A"/><path d="M652,300 q2,14 -2,22" stroke="#8AB84A" stroke-width="5" fill="none"/>', 3);
    b.solid(500, 300, 120, 110);
  };

  // ============ NHÀ BÀ CỤ ============
  G.scenes.nha_bacu = function (S) {
    var b = new B(960, 620), s = '';
    // nền đất nện bóng, mòn sáng ở lối đi, vệt ẩm chân vách
    s += rect(0, 0, 960, 620, '#2A1A14') + rect(120, 80, 720, 460, 'url(#dat)') + rect(120, 80, 720, 460, '#4A3018', ' stroke="none" opacity=".35"');
    s += '<ellipse cx="480" cy="420" rx="260" ry="90" fill="#E2C898" opacity=".14" stroke="none"/>';
    var vet = ''; for (var vt = 0; vt < 14; vt++) vet += '<path d="M' + (150 + vt * 50) + ',' + (300 + (vt * 37) % 200) + ' q10,-4 20,0" fill="none" stroke="#5A3E24" stroke-width="1.2" opacity=".4"/>'; s += vet;
    // vách đất, kèo tre, cửa sổ liếp, bùa giấy dán đầu cửa
    // vách đất trộn rơm: loang màu, sợi rơm, vết nứt, chân vách ẩm
    s += rect(120, 80, 720, 56, '#8A6A44') + rect(120, 80, 720, 10, '#4A3222') + rect(120, 124, 720, 12, '#5A3E26', ' stroke="none" opacity=".55"');
    var rom = ''; for (var rm = 0; rm < 70; rm++) { var rx0 = 126 + (rm * 97) % 708, ry0 = 92 + (rm * 13) % 30; rom += 'M' + rx0 + ',' + ry0 + ' l' + (rm % 2 ? 5 : -4) + ',' + (2 + rm % 3); }
    s += '<path d="' + rom + '" stroke="#C8A86A" stroke-width="1" opacity=".75"/><path d="M200,96 l6,10 l-3,8 l5,8M520,94 l-4,12 l5,10M780,98 l5,9 l-2,10" fill="none" stroke="#4A3222" stroke-width="1.4" opacity=".6"/>';
    for (var kv = 150; kv < 830; kv += 90) s += '<path d="M' + kv + ',90 v46" stroke="' + INK + '" stroke-width="7"/><path d="M' + kv + ',90 v46" stroke="#8A7A4A" stroke-width="4"/><path d="M' + (kv - 3) + ',104 h6M' + (kv - 3) + ',122 h6" stroke="' + INK + '" stroke-width="1.2"/>';
    s += '<path d="M134,112 H826" stroke="#5A4028" stroke-width="4"/>';
    s += rect(560, 92, 70, 36, '#C8D0A8') + '<rect x="560" y="92" width="70" height="36" fill="#F2E8B0" opacity=".5" stroke="none"/>'; for (var lw = 566; lw < 630; lw += 9) s += '<path d="M' + lw + ',92 v36" stroke="#8A6440" stroke-width="3"/>';
    s += '<path d="M556,90 h78" stroke="#6A4A30" stroke-width="4"/><path d="M558,128 l-6,10 h86 l-6,-10" fill="#7A5A3A"/>';
    // vệt nắng chiếu qua cửa sổ liếp xuống sàn
    s += '<defs><linearGradient id="nangLiep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE8A8" stop-opacity=".45"/><stop offset="1" stop-color="#FFE8A8" stop-opacity="0"/></linearGradient></defs><path d="M560,130 h70 l50,170 h-70 z" fill="url(#nangLiep)" stroke="none"/>';
    s += G.ve.bong(462, 548, 12, 3, .25) + '<g transform="translate(454,496) rotate(-3) scale(.14)">' + G.ve.bua({ chu: G.ve.BUA.truTa, cu: true }) + '</g>'; // bùa trừ tà dán đầu cửa
    s += rect(120, 80, 14, 460, '#6A4A30') + rect(826, 80, 14, 460, '#6A4A30') + rect(120, 526, 300, 14, '#6A4A30') + rect(500, 526, 340, 14, '#6A4A30');
    // chiếu trải giữa nhà, dưới mâm trầu
    s += G.ve.chieu(396, 352, 168, 74);
    b.bg += ink(s);
    b.solid(120, 0, 720, 138); b.solid(120, 80, 14, 460); b.solid(826, 80, 14, 460); b.solid(120, 526, 300, 20); b.solid(500, 526, 340, 20); b.solid(0, 0, 120, 620); b.solid(840, 0, 120, 620);
    // điện thờ Mẫu nhỏ trên vách đông (bà cụ ngày trước ngồi đồng): khăn đỏ, quạt, gương
    b.bg += ink('<rect x="700" y="96" width="96" height="34" fill="#8A1A12"/><path d="M704,100 h88v26h-88z" fill="none" stroke="#D9A93A" stroke-width="1.6"/>' +
      '<path d="M716,124 q10,-20 20,0z" fill="#D9A93A" stroke-width="1.4"/><path d="M748,104 q16,10 32,0 v18 q-16,6 -32,0 z" fill="#C8301E" stroke-width="1.4"/><circle cx="784" cy="112" r="6" fill="#C8D0D0" stroke-width="1.4"/>', 2);
    // chĩnh sành men nâu, nắp lá chuối buộc lạt, bùa dán
    var c = G.ve.bong(704, 282, 56, 15, .26) + '<path d="M660,200 h80 q22,30 16,60 q-10,26 -56,26 q-46,0 -56,-26 q-6,-30 16,-60 z" fill="#6A5040"/><path d="M712,204 h28 q22,30 16,60 q-10,26 -56,26 q34,-6 38,-40 q2,-26 -26,-46 z" fill="#3A2A20" opacity=".45" stroke="none"/>' +
      '<path d="M670,212 q-12,28 -4,52" fill="none" stroke="#9A7A5A" stroke-width="5" opacity=".6"/><path d="M652,236 q48,16 96,0M650,258 q50,14 100,0" fill="none" stroke="#4A3428" stroke-width="2"/>' +
      '<ellipse cx="700" cy="200" rx="40" ry="10" fill="#5E7A3A"/><path d="M664,200 q36,-14 72,0" fill="none" stroke="#C8A85A" stroke-width="3"/><path d="M700,190 v-6" stroke-width="3"/>' +
      '<g transform="translate(691,214) rotate(4) scale(.16)">' + G.ve.bua({ chu: G.ve.BUA.tranVong, cu: true }) + '</g>'; // bùa trấn dán bụng chĩnh
    if (S.flags.c4_bo_chinh) c += '<circle cx="700" cy="196" r="26" fill="url(#glowY)" stroke="none" class="glowpulse"/>';
    b.prop(640, 176, 120, 114, c, 282); b.solid(650, 226, 100, 54);
    // giường tre: chiếu, gối mây, chăn gấp, màn vén
    var g = G.ve.khoi(186, 170, 186, 62, 10, G.ve.GO.tre, { chan: 8, van: false });
    for (var gy = 176; gy < 230; gy += 6) g += '<path d="M190,' + gy + ' H368" stroke="#B08A48" stroke-width="1.2"/>';
    g += '<path d="M186,166 Q232,154 280,162 Q330,154 372,166 L372,174 Q330,164 280,170 Q232,164 186,174 Z" fill="#EDE8DA" opacity=".9" stroke-width="1.6"/>';
    g += G.ve.goi(194, 178, 34, 16, '#B8884A');
    g += '<path d="M300,186 h56 v22 h-56 z" fill="#5A6A8A" stroke-width="2"/><path d="M300,196 h56" stroke="#3A4A6A" stroke-width="1.5"/>';

    b.prop(180, 152, 200, 100, g, 240); b.solid(186, 170, 186, 72);
    // mâm trầu: cơi trầu, lá trầu, quả cau, dao bổ cau, ống nhổ
    var mt = '<ellipse cx="480" cy="392" rx="54" ry="18" fill="#8A3424"/><ellipse cx="480" cy="388" rx="44" ry="12" fill="#A0503A"/>';
    mt += '<path d="M450,382 h22 v-8 h-22 z" fill="#C8963A" stroke-width="1.5"/><path d="M452,378 q10,-8 20,0" fill="#6E9A4A" stroke-width="1.2"/>';
    mt += G.art.quaCau(492, 382, .26, { chin: true }) + G.art.quaCau(503, 384, .24, {});
    mt += '<path d="M470,394 l22,-4" stroke="#B0B6BA" stroke-width="3"/><path d="M492,390 l8,-2" stroke="#5A3A20" stroke-width="3"/>';
    mt += '<path d="M548,398 q-2,-12 8,-12 q10,0 8,12 z" fill="#C8963A"/><ellipse cx="556" cy="386" rx="7" ry="2.4" fill="#5A3A20"/>';
    b.prop(420, 360, 150, 60, mt, 404);
    b.solid(428, 376, 104, 28);
    // bàn thờ gia tiên: bài vị, bát hương, đèn dầu, đĩa trầu cau
    var at = G.ve.khoi(384, 146, 92, 14, 22, G.ve.GO.son, { chan: 6, vien: '#C9A23A', van: false });
    at += '<path d="M420,146 v-24 q10,-8 20,0 v24 z" fill="#8A1A12" stroke-width="1.8"/><path d="M430,128 v4M427,136 h6M430,138 v4" stroke="#E2B44C" stroke-width="1.6"/>';
    at += '<path d="M446,146 h16 q-2,8 -8,8 q-6,0 -8,-8 z" fill="#B8862E" stroke-width="1.4"/><path d="M450,146 v-10M454,146 v-12M458,146 v-10" stroke="#B84A3E" stroke-width="1.5"/>';
    at += '<path d="M392,146 h10 l-2,-8 h-6 z" fill="#C8963A" stroke-width="1.4"/><path d="M397,138 q-2,-5 0,-8 q2,3 0,8" fill="#FFB040" class="flick" stroke-width="1"/>';
    at += '<ellipse cx="468" cy="144" rx="7" ry="2.4" fill="#C9CED3" stroke-width="1.2"/><ellipse cx="466" cy="140" rx="2.2" ry="2.8" fill="#E8A23A" stroke-width="1"/><ellipse cx="470" cy="140" rx="2.2" ry="2.8" fill="#8AB84A" stroke-width="1"/>';
    b.prop(376, 110, 108, 90, at, 180); b.solid(384, 146, 92, 36);
    // góc bếp: kiềng ba chân, nồi đất, củi, rổ rá treo; vại nước có gáo dừa; chùm lá thuốc phơi khô
    b.prop(150, 410, 110, 70, '<ellipse cx="200" cy="462" rx="36" ry="12" fill="#3A2A20"/><ellipse cx="200" cy="464" rx="14" ry="4" fill="#E8701A" opacity=".8" stroke="none" class="flick"/>' +
      '<path d="M176,454 Q200,436 224,454 Q224,468 200,470 Q176,468 176,454 Z" fill="#7A5A3A"/><ellipse cx="200" cy="452" rx="22" ry="5" fill="#3A2A22"/><path d="M196,446 q-3,-10 2,-18M206,446 q3,-10 -1,-18" fill="none" stroke="#D8D0C0" stroke-width="2" opacity=".55"/>' +
      '<path d="M236,474 l14,-30M242,476 l14,-28" stroke="#8A6A3A" stroke-width="5"/>', 474);
    b.solid(166, 448, 70, 26);
    b.prop(760, 430, 70, 60, '<ellipse cx="790" cy="482" rx="24" ry="6" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M772,448 q-6,22 2,32 h32 q8,-10 2,-32 z" fill="#7A5236"/><ellipse cx="790" cy="448" rx="18" ry="5" fill="#3A5A5A"/>' +
      '<ellipse cx="796" cy="446" rx="7" ry="4" fill="#6A4A2A" stroke-width="1.5"/><path d="M802,445 l12,-10" stroke="#5A3A20" stroke-width="3"/>', 482);
    b.solid(770, 452, 44, 28);
    b.bg += ink('<path d="M260,138 v18M290,138 v22M320,138 v16" stroke-width="1.6"/><path d="M254,156 q6,10 12,0 q-6,4 -12,0zM284,160 q6,12 12,0 q-6,4 -12,0zM314,154 q6,10 12,0 q-6,4 -12,0z" fill="#7A8A4A" stroke-width="1.4"/>' +
      '<circle cx="180" cy="420" r="11" fill="#C79A5E" stroke-width="1.8"/><circle cx="180" cy="420" r="6" fill="none" stroke-width="1.2"/>', 2);
    // nón lá và áo tơi treo vách, giỏ mây
    b.bg += ink('<path d="M168,94 v8" stroke-width="1.4"/><path d="M150,118 L168,100 L186,118 Q168,124 150,118 Z" fill="#D9C27A"/><path d="M158,112 h20M162,108 h12" stroke="#B8A060" stroke-width="1"/>' +
      '<path d="M220,94 v6" stroke-width="1.4"/><path d="M206,100 h28 l6,30 q-20,6 -40,0 z" fill="#8A7A4A"/><path d="M208,106 l-4,22M216,104 l-2,26M226,104 l2,26M234,106 l4,22" stroke="#6A5A34" stroke-width="1.2"/>' +
      '', 2);
    // phản gỗ cạnh giường (chỗ bà cụ ngồi têm trầu)
    b.prop(240, 290, 130, 74, G.ve.khoi(250, 300, 110, 28, 12, G.ve.GO.sam, { chan: 8 }) + G.ve.goi(256, 304, 28, 12, '#9A6A4A'), 348);
    b.solid(250, 300, 110, 42);
    // chum nước góc tây nam, gáo dừa vắt miệng
    b.prop(136, 470, 64, 66, G.ve.bong(166, 528, 26, 6, .26) + '<path d="M146,490 q-8,24 4,38 h32 q12,-14 4,-38 z" fill="#7A5236"/><path d="M150,494 q-4,14 0,26" fill="none" stroke="#B88A60" stroke-width="2.6" opacity=".5"/><ellipse cx="166" cy="490" rx="20" ry="6" fill="#5A3A26"/><ellipse cx="166" cy="490" rx="16" ry="4.4" fill="#1E3436"/><path d="M158,489 h7" stroke="#BFE0E0" stroke-width="1.2" opacity=".6"/>' +
      '<ellipse cx="174" cy="487" rx="7" ry="3.6" fill="#6A4A2A" stroke-width="1.4"/><path d="M180,486 l12,-9" stroke="#5A3A20" stroke-width="2.6"/>', 528);
    b.solid(146, 498, 40, 30);
    b.lights.push({ x: 430, y: 150, r: 90, flick: true }, { x: 480, y: 390, r: 70, flick: true }, { x: 200, y: 460, r: 70, flick: true });
    return b.out();
  };
})();
