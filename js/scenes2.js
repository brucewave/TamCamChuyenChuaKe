// Cảnh trong cung (Chương 1): hàng nước ngoài thành, sân chầu, vườn ngự, giếng giặt, cung hoàng hậu, bếp cung + phòng Đăng.
var G = window.G || (window.G = {});

Object.assign(G.LOCATIONS, {
  hang_nuoc: { id: 'hang_nuoc', name: 'Hàng nước ngoài thành', width: 960, height: 720, exits: { left: 'cho_am', right: 'cung_san' } },
  cung_san:  { id: 'cung_san',  name: 'Sân chầu', width: 960, height: 720, exits: { left: 'hang_nuoc', right: 'cung_vuon' } },
  cung_vuon: { id: 'cung_vuon', name: 'Vườn ngự', width: 960, height: 720, exits: { left: 'cung_san', right: 'cung_gieng' } },
  cung_gieng:{ id: 'cung_gieng',name: 'Giếng giặt', width: 960, height: 720, exits: { left: 'cung_vuon' } },
  cung_hau:  { id: 'cung_hau',  name: 'Cung hoàng hậu', width: 960, height: 620, exits: {} },
  cung_bep:  { id: 'cung_bep',  name: 'Bếp cung', width: 960, height: 620, exits: {} }
});

(function () {
  var K = G.sceneKit, B = K.B, rect = K.rect, ink = K.ink, rng = K.rng, INK = G.INK, A = G.art;
  var DO = '#A8322A', VANG = '#D9A93A', DA = '#B8B0A0';

  function gachDa(W, H) { // nền lát đá xanh: từng phiến khác màu, cạnh trên sáng, cạnh dưới tối, mòn giữa lối, rêu kẽ
    var r = rng(W + H * 3), s = rect(0, 0, W, H, '#8A8A7C', ' stroke="none"'), mau = ['#A8A898', '#A2A494', '#ADAC9C', '#9C9E90', '#B0AE9E', '#A6A28E'];
    var sang = '', toi = '', reu = '', nut = '';
    for (var y = 0; y < H; y += 40) for (var x = (y / 40) % 2 ? -30 : 0; x < W; x += 60) {
      s += '<rect x="' + (x + 1) + '" y="' + (y + 1) + '" width="58" height="38" stroke="none" fill="' + mau[Math.floor(r() * mau.length)] + '"/>';
      sang += 'M' + (x + 2) + ',' + (y + 2.5) + ' h56 M' + (x + 2.5) + ',' + (y + 3) + ' v34 ';
      toi += 'M' + (x + 2) + ',' + (y + 38) + ' h56 M' + (x + 58) + ',' + (y + 3) + ' v34 ';
      if (r() < .25) reu += '<ellipse cx="' + (x + r() * 60).toFixed(0) + '" cy="' + (y + (r() < .5 ? 0 : 40)) + '" rx="' + (5 + r() * 8).toFixed(0) + '" ry="2.2"/>';
      if (r() < .12) { var nx = x + 10 + r() * 40, ny = y + 8 + r() * 20; nut += 'M' + nx.toFixed(0) + ',' + ny.toFixed(0) + ' l6,3 l4,-3 l6,5'; }
      if (r() < .3) s += '<ellipse cx="' + (x + 10 + r() * 40).toFixed(0) + '" cy="' + (y + 8 + r() * 24).toFixed(0) + '" rx="' + (6 + r() * 10).toFixed(0) + '" ry="' + (3 + r() * 5).toFixed(0) + '" fill="' + (r() < .5 ? '#BDBCAC' : '#8E8E80') + '" opacity=".5" stroke="none"/>';
    }
    s += '<path d="' + sang + '" stroke="#C8C8B8" stroke-width="1.6" fill="none" opacity=".8"/><path d="' + toi + '" stroke="#76766A" stroke-width="1.6" fill="none" opacity=".8"/>';
    s += '<g fill="#5E7A44" opacity=".7" stroke="none">' + reu + '</g><path d="' + nut + '" fill="none" stroke="#5E5E54" stroke-width="1.2" opacity=".7"/>';
    // lối giữa mòn bóng do người đi
    s += '<defs><linearGradient id="moiDa" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E8E4D4" stop-opacity="0"/><stop offset=".5" stop-color="#E8E4D4" stop-opacity=".18"/><stop offset="1" stop-color="#E8E4D4" stop-opacity="0"/></linearGradient></defs>';
    s += rect(W / 2 - 110, 0, 220, H, 'url(#moiDa)', ' stroke="none"');
    return s;
  }
  function cot(b, x, y) { b.prop(x - 10, y - 120, 20, 126, rect(x - 7, y - 120, 14, 122, DO) + '<path d="M' + (x - 9) + ',' + (y - 4) + ' h18" stroke-width="5"/>', y); b.solid(x - 9, y - 8, 18, 12); }
  function maiNgoi(x, y, w, h) { // mái ngói vàng nhìn chéo: hàng ngói ống có bóng, bờ nóc, đầu đao cong
    var s = rect(x, y, w, h, '#C9963A');
    s += rect(x, y, w, h * .4, '#F2D080', ' stroke="none" opacity=".25"') + rect(x, y + h * .65, w, h * .35, '#5A3A10', ' stroke="none" opacity=".2"');
    var ong = '', sang = '';
    for (var k = x + 9; k < x + w; k += 14) { ong += 'M' + k + ',' + (y + 6) + ' v' + (h - 8); sang += 'M' + (k - 2.5) + ',' + (y + 6) + ' v' + (h - 8); }
    s += '<path d="' + ong + '" stroke="#8A5E1E" stroke-width="6"/><path d="' + ong + '" stroke="#C08A30" stroke-width="3.6"/><path d="' + sang + '" stroke="#F0CC78" stroke-width="1.3" opacity=".8"/>';
    var hang = ''; for (var yy = y + 14; yy < y + h - 2; yy += 10) hang += 'M' + x + ',' + yy + ' H' + (x + w);
    s += '<path d="' + hang + '" stroke="#7A5418" stroke-width="1" opacity=".45"/>';
    s += '<path d="M' + (x - 4) + ',' + (y + 2) + ' H' + (x + w + 4) + '" stroke="' + INK + '" stroke-width="8"/><path d="M' + (x - 4) + ',' + (y + 2) + ' H' + (x + w + 4) + '" stroke="#B8862E" stroke-width="4.5"/><path d="M' + (x - 4) + ',' + (y + .5) + ' H' + (x + w + 4) + '" stroke="#F0D080" stroke-width="1.2"/>';
    s += '<path d="M' + (x - 16) + ',' + (y + h) + ' H' + (x + w + 16) + '" stroke-width="6"/><path d="M' + (x - 16) + ',' + (y + h) + ' H' + (x + w + 16) + '" stroke="#A8782A" stroke-width="2.5"/>';
    s += '<path d="M' + (x - 16) + ',' + (y + h) + ' q-14,-8 -6,-22M' + (x + w + 16) + ',' + (y + h) + ' q14,-8 6,-22" fill="none" stroke-width="5"/><path d="M' + (x - 16) + ',' + (y + h) + ' q-14,-8 -6,-22M' + (x + w + 16) + ',' + (y + h) + ' q14,-8 6,-22" fill="none" stroke="#C9963A" stroke-width="2"/>';
    s += rect(x - 16, y + h + 2, w + 32, 7, '#1A0E08', ' stroke="none" opacity=".3"');
    return s;
  }
  function den(b, x, y) { // cột đèn lồng đá
    b.prop(x - 26, y - 102, 52, 110, G.ve.denDa(x, y), y);
    b.solid(x - 7, y - 6, 14, 10);
    b.lights.push({ x: x, y: y - 60, r: 85, flick: true });
  }
  function chum(b, x, y) { // chum sành: men nâu bóng, quai, miệng nước tối phản sáng
    b.prop(x - 30, y - 50, 60, 58, G.ve.bong(x, y - 2, 26, 7, .25) + '<ellipse cx="' + x + '" cy="' + (y - 18) + '" rx="24" ry="22" fill="#7A4A2E"/>' +
      '<ellipse cx="' + (x + 7) + '" cy="' + (y - 14) + '" rx="15" ry="17" fill="#4A2A18" opacity=".45" stroke="none"/><path d="M' + (x - 15) + ',' + (y - 28) + ' q-4,10 0,20" fill="none" stroke="#D8A878" stroke-width="3" opacity=".6"/>' +
      '<ellipse cx="' + x + '" cy="' + (y - 36) + '" rx="18" ry="6" fill="#5A3A26"/><ellipse cx="' + x + '" cy="' + (y - 35) + '" rx="14" ry="4.2" fill="#1E3436"/><path d="M' + (x - 8) + ',' + (y - 36) + ' h8" stroke="#BFE0E0" stroke-width="1.4" opacity=".6"/>' +
      '<path class="d" d="M' + (x - 22) + ',' + (y - 22) + ' q22,8 44,0"/><path d="M' + (x - 24) + ',' + (y - 26) + ' q-6,2 -4,8M' + (x + 24) + ',' + (y - 26) + ' q6,2 4,8" fill="none" stroke-width="2.4"/>', y);
    b.solid(x - 22, y - 16, 44, 18);
  }
  function chuoi(b, x, y, r) { // bụi chuối: thân giả xanh nhạt, tàu lá to có gân và vết rách
    var s = G.ve.bong(x, y, 46, 11, .22), la = '';
    s += '<path d="M' + (x - 9) + ',' + y + ' L' + (x - 6) + ',' + (y - 44) + ' L' + (x + 6) + ',' + (y - 44) + ' L' + (x + 9) + ',' + y + ' Z" fill="#8AA85A"/><path d="M' + (x + 2) + ',' + y + ' L' + (x + 3) + ',' + (y - 44) + ' L' + (x + 6) + ',' + (y - 44) + ' L' + (x + 9) + ',' + y + ' Z" fill="#5E7A3A" stroke="none" opacity=".6"/>';
    s += '<path d="M' + (x - 14) + ',' + y + ' L' + (x - 12) + ',' + (y - 22) + ' L' + (x - 6) + ',' + (y - 22) + ' L' + (x - 5) + ',' + y + ' Z" fill="#9AB868"/>';
    for (var i = 0; i < 7; i++) {
      var a = -2.75 + i * 0.42 + (r() - .5) * .1, len = 66 + r() * 26, ox = x, oy = y - 44;
      var ex = ox + Math.cos(a) * len, ey = oy + Math.sin(a) * len * .7 + 10, mx = ox + Math.cos(a) * len * .5, my = oy - 26 + Math.sin(a) * 10;
      var nx = -Math.sin(a), ny = Math.cos(a), wd = 13 + r() * 4, sang = Math.cos(a) < 0 && Math.sin(a) < -.3;
      var d = 'M' + ox + ',' + oy + ' Q' + (mx + nx * wd).toFixed(1) + ',' + (my + ny * wd).toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1) + ' Q' + (mx - nx * wd).toFixed(1) + ',' + (my - ny * wd).toFixed(1) + ' ' + ox + ',' + oy + 'Z';
      la += '<path d="' + d + '" fill="' + (sang ? '#86AE52' : (i % 2 ? '#6A9440' : '#5A8236')) + '" stroke-width="2"/>';
      var g = '';
      for (var t = .2; t < .95; t += .1) {
        var bx = (1 - t) * (1 - t) * ox + 2 * (1 - t) * t * mx + t * t * ex, by = (1 - t) * (1 - t) * oy + 2 * (1 - t) * t * my + t * t * ey, w2 = wd * Math.sin(Math.PI * t) * .9;
        g += 'M' + bx.toFixed(1) + ',' + by.toFixed(1) + ' l' + (nx * w2 + Math.cos(a) * 4).toFixed(1) + ',' + (ny * w2 + Math.sin(a) * 4).toFixed(1) + ' M' + bx.toFixed(1) + ',' + by.toFixed(1) + ' l' + (-nx * w2 + Math.cos(a) * 4).toFixed(1) + ',' + (-ny * w2 + Math.sin(a) * 4).toFixed(1);
      }
      la += '<path d="' + g + '" stroke="#3E6228" stroke-width="1" opacity=".5"/><path d="M' + ox + ',' + oy + ' Q' + mx.toFixed(1) + ',' + my.toFixed(1) + ' ' + ex.toFixed(1) + ',' + ey.toFixed(1) + '" fill="none" stroke="#C8D890" stroke-width="2"/>';
      if (r() < .5) { var tt = .55, rx2 = (1 - tt) * (1 - tt) * ox + 2 * (1 - tt) * tt * mx + tt * tt * ex, ry2 = (1 - tt) * (1 - tt) * oy + 2 * (1 - tt) * tt * my + tt * tt * ey; la += '<path d="M' + rx2.toFixed(1) + ',' + ry2.toFixed(1) + ' l' + (nx * wd * .8).toFixed(1) + ',' + (ny * wd * .8).toFixed(1) + '" stroke="#C8B87A" stroke-width="1.6"/>'; }
    }
    s += la;
    b.prop(x - 100, y - 150, 200, 160, s, y, 'sway');
  }

  // ================= HÀNG NƯỚC NGOÀI THÀNH =================
  function cayBang(b, x, y, r) { // cây bàng: tán xoè nhiều tầng, lá đỏ lẫn xanh
    var t = G.ve.bong(x + 8, y + 2, 84, 18, .26);
    var tang = [[-90, -130], [90, -140], [-60, -190], [70, -200], [0, -230]], canh = '';
    tang.forEach(function (c) { canh += 'M' + (x + 2) + ',' + (y - 110) + ' Q' + (x + c[0] * .4) + ',' + (y + c[1] + 20) + ' ' + (x + c[0]) + ',' + (y + c[1]); });
    t += '<path d="' + canh + '" fill="none" stroke="' + INK + '" stroke-width="10"/><path d="' + canh + '" fill="none" stroke="#6A4A34" stroke-width="6"/>';
    t += G.ve.than(x + 3, y, 120, 17, 9, ['#6A4A34', '#4A3222', '#8E6E52'], r);
    tang.forEach(function (c, i) {
      t += G.ve.tan(x + c[0], y + c[1] - 6, 58 - i * 4, 30, r, i < 2 ? G.ve.LA.dam : G.ve.LA.xanh, { la: 30 });
      var la = ['', ''];
      for (var k = 0; k < 9; k++) { var lx = x + c[0] - 40 + r() * 80, ly = y + c[1] - 22 + r() * 30, rot = Math.floor(r() * 180); la[r() < .55 ? 0 : 1] += '<ellipse cx="' + lx.toFixed(0) + '" cy="' + ly.toFixed(0) + '" rx="6.5" ry="3.6" transform="rotate(' + rot + ' ' + lx.toFixed(0) + ' ' + ly.toFixed(0) + ')"/>'; }
      t += '<g fill="#C8402A" stroke-width="1">' + la[0] + '</g><g fill="#D8A040" stroke-width="1">' + la[1] + '</g>';
    });
    b.prop(x - 160, y - 270, 320, 282, t, y, 'sway'); b.solid(x - 16, y - 12, 38, 16);
  }
  G.scenes.hang_nuoc = function (S) {
    var b = new B(960, 720), r = rng(61), s = '';
    s += rect(0, 0, 960, 720, 'url(#co)');
    // tường thành gạch: lỗ châu mai, rêu chân tường, vết nứt
    s += rect(0, 0, 960, 250, '#9A6A52');
    for (var y = 0; y < 250; y += 22) for (var x = (y / 22) % 2 ? -24 : 0; x < 960; x += 48) s += '<rect x="' + x + '" y="' + y + '" width="48" height="22" fill="none" stroke="#7A4A3A" stroke-width="2"/>';
    for (var cm = 20; cm < 760; cm += 60) s += rect(cm, 0, 30, 18, '#5A3A2A');
    s += '<path d="M120,60 l12,20 l-6,14 l10,18M560,120 l-10,16 l8,12" fill="none" stroke="#5A3A2A" stroke-width="2.5"/>';
    for (var mo = 0; mo < 22; mo++) s += '<ellipse cx="' + (mo * 37 % 760) + '" cy="' + (238 - (mo % 3) * 6) + '" rx="' + (14 + mo % 4 * 4) + '" ry="5" fill="#5E7A44" opacity=".75" stroke="none"/>';
    s += rect(0, 236, 960, 18, '#6A3A2A');
    // cổng thành: vòm đá, cánh cửa gỗ mở, đinh đồng, biển, cờ
    s += '<path d="M752,250 V110 Q840,40 928,110 V250 Z" fill="#8A7A6A"/>';
    s += '<path d="M760,250 V120 Q840,60 920,120 V250 Z" fill="#3A2420"/><path d="M760,250 V120 Q840,60 920,120 V250" fill="none" stroke-width="4"/>';
    s += '<path d="M760,124 L790,132 V250 H760 Z M920,124 L890,132 V250 H920 Z" fill="#6A3424"/>';
    for (var dy = 146; dy < 246; dy += 18) s += '<circle cx="772" cy="' + dy + '" r="2.4" fill="#D9A93A" stroke="none"/><circle cx="908" cy="' + dy + '" r="2.4" fill="#D9A93A" stroke="none"/>';
    s += rect(800, 36, 80, 24, '#2A1A12') + '<path d="M802,38 h76 v20 h-76 z" fill="none" stroke="#D9A93A" stroke-width="1.4"/>' + G.ve.chuKhac(840, 53, 'CỬA TÂY', 12.5, { ls: 1 });
    s += '<path d="M752,110 V20M928,110 V20" stroke="#5A3A20" stroke-width="4"/><path d="M752,24 l30,8 l-30,10 z M928,24 l-30,8 l30,10 z" fill="#C8301E"/>';
    // đường đất ra cổng: vết bánh xe, sỏi
    s += rect(0, 420, 960, 140, 'url(#dat)');
    s += '<path d="M840,250 L900,420 H960 V250 Z" fill="url(#dat)" stroke="none"/>';
    s += '<path d="M0,468 Q480,456 960,470M0,508 Q480,496 960,512" fill="none" stroke="#B89A6A" stroke-width="5" opacity=".7"/>';
    for (var sg = 0; sg < 30; sg++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (430 + r() * 120).toFixed(0) + '" rx="3" ry="2" fill="#A8946A" stroke="none"/>';
    b.bg += ink(s);
    b.solid(0, 0, 760, 262); b.solid(920, 0, 40, 262);
    // quán nước bà cụ: mái rạ dày, cột tre, phản gỗ, ấm tích trong giỏ ủ, chén, nải chuối, lọ kẹo lạc, bánh đa, buồng chuối treo
    var qx = 360, q = '';
    q += rect(qx - 110, 300, 10, 120, '#9A7A4A') + rect(qx + 100, 300, 10, 120, '#9A7A4A') + '<path d="M' + (qx - 106) + ',318 v100M' + (qx + 104) + ',318 v100" stroke="#7A5A2A" stroke-width="1.5"/>';
    q += '<path d="M' + (qx - 136) + ',310 L' + qx + ',258 L' + (qx + 136) + ',310 L' + (qx + 120) + ',318 L' + (qx - 120) + ',318 Z" fill="url(#ra)"/>';
    for (var rm = -128; rm < 130; rm += 10) q += '<path d="M' + (qx + rm) + ',314 l2,10" stroke="#A9823F" stroke-width="2"/>';
    q += '<path d="M' + (qx - 60) + ',318 v14M' + (qx - 60) + ',332 q-8,6 -2,16 q12,6 14,-6 q0,-8 -12,-10" fill="#E8C83A" stroke-width="2"/>';
    q += '<rect x="' + (qx + 30) + '" y="320" width="34" height="22" fill="#F0E2B8" stroke-width="2"/><path d="M' + (qx + 36) + ',328 h22M' + (qx + 36) + ',336 h16" stroke="#8A2A1E" stroke-width="2"/>';
    q += rect(qx - 84, 380, 168, 34, '#A07A4A') + '<path class="d" d="M' + (qx - 84) + ',392 h168"/>';
    q += '<path d="M' + (qx - 62) + ',380 q-2,-22 18,-24 q20,2 18,24 z" fill="#B8884A"/><path d="M' + (qx - 60) + ',372 q16,-6 32,0" fill="none" stroke="#8A6030" stroke-width="2"/><ellipse cx="' + (qx - 44) + '" cy="356" rx="10" ry="8" fill="#4E6A5A"/><path d="M' + (qx - 34) + ',354 q8,-2 10,6" fill="none" stroke-width="2.5"/>';
    [0, 1, 2].forEach(function (k) { q += '<path d="M' + (qx - 10 + k * 14) + ',380 h10 l-1,-8 h-8 z" fill="#E9E2D0" stroke-width="1.5"/>'; });
    q += '<path d="M' + (qx + 40) + ',378 q4,-16 16,-12 q10,4 14,12M' + (qx + 44) + ',380 q4,-14 14,-10" fill="#E8C83A" stroke-width="1.8"/>';
    q += '<rect x="' + (qx + 70) + '" y="362" width="12" height="18" rx="3" fill="#C8D8D8" opacity=".85" stroke-width="1.5"/><circle cx="' + (qx + 76) + '" cy="372" r="3" fill="#C8963A" stroke="none"/>';
    q += '<ellipse cx="' + (qx + 22) + '" cy="378" rx="12" ry="3" fill="#E2C890" stroke-width="1.5"/>';
    b.prop(qx - 140, 252, 280, 170, q, 416); b.solid(qx - 84, 386, 168, 32);
    // vại nước chè, bếp lò nhỏ có ấm đang sôi
    b.prop(qx + 104, 380, 70, 60, '<ellipse cx="' + (qx + 124) + '" cy="430" rx="18" ry="5" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M' + (qx + 108) + ',398 q-4,24 6,32 h20 q10,-8 6,-32 z" fill="#7A5A3A"/><ellipse cx="' + (qx + 124) + '" cy="398" rx="16" ry="5" fill="#4A6A3A"/>' +
      '<path d="M' + (qx + 148) + ',428 h20 v-14 h-20 z" fill="#8A7A6A"/><ellipse cx="' + (qx + 158) + '" cy="408" rx="10" ry="7" fill="#3A3640"/><path d="M' + (qx + 156) + ',398 q-3,-8 2,-14 M' + (qx + 162) + ',398 q3,-8 -1,-14" fill="none" stroke="#D8D0C0" stroke-width="2" opacity=".6"/><circle cx="' + (qx + 158) + '" cy="424" r="3" fill="#FF8A3A" stroke="none" class="flick"/>', 432);
    b.solid(qx + 106, 410, 64, 22);
    // ghế băng tre
    b.prop(qx - 160, 430, 80, 32, rect(qx - 156, 436, 72, 12, '#B8945A') + '<path d="M' + (qx - 156) + ',442 h72" stroke="#8A6A3A" stroke-width="1.5"/><path d="M' + (qx - 150) + ',448 v10M' + (qx - 92) + ',448 v10" stroke-width="3"/>', 458);
    b.prop(qx + 70, 456, 80, 32, rect(qx + 74, 462, 72, 12, '#B8945A') + '<path d="M' + (qx + 74) + ',468 h72" stroke="#8A6A3A" stroke-width="1.5"/><path d="M' + (qx + 80) + ',474 v10M' + (qx + 138) + ',474 v10" stroke-width="3"/>', 484);
    // cây bàng già góc tây nam
    cayBang(b, 120, 560, r);
    // miếu thổ địa nhỏ ven đường, chân hương, đĩa quả
    b.prop(650, 290, 70, 70, '<ellipse cx="684" cy="352" rx="28" ry="6" fill="' + INK + '" opacity=".2" stroke="none"/>' + rect(664, 314, 40, 36, '#C8B898') + '<path d="M656,316 L684,294 L712,316 Z" fill="#A85A3A"/><path d="M656,316 q-6,-6 -2,-12M712,316 q6,-6 2,-12" fill="none" stroke-width="2.5"/>' +
      rect(674, 322, 20, 22, '#3A2A20') + '<path d="M680,340 v-8M684,340 v-10M688,340 v-8" stroke="#B84A3E" stroke-width="1.5"/><circle cx="684" cy="330" r="2" fill="#FF8A3A" stroke="none" class="flick"/>', 352);
    b.solid(664, 332, 40, 20);
    // xe bò chở rơm nghỉ ven đường (góc đông nam)
    b.prop(810, 590, 140, 90, '<ellipse cx="880" cy="672" rx="62" ry="10" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M820,640 h110 l-6,-10 h-98 z" fill="#8A6A3A"/><path d="M826,630 Q875,580 924,630 Z" fill="#D9B860"/><path class="d" d="M840,620 q34,-12 70,0M852,606 q24,-10 48,0"/>' +
      '<circle cx="846" cy="652" r="18" fill="none" stroke="#5A3A20" stroke-width="5"/><circle cx="910" cy="652" r="18" fill="none" stroke="#5A3A20" stroke-width="5"/><path d="M846,634 v36M828,652 h36M910,634 v36M892,652 h36" stroke="#5A3A20" stroke-width="2"/><path d="M930,640 l24,-6" stroke="#5A3A20" stroke-width="5"/>', 670);
    b.solid(824, 640, 110, 26);
    // khóm tre góc tây bắc sát thành
    K.bamboo(b, 40, 330, r);
    if (G.scenes.hangHook) G.scenes.hangHook(b, S);
    b.edges();
    return b.out();
  };

  // ================= SÂN CHẦU =================
  function maiCung(x, y, w, h) { // mái ngói hai tầng, bờ nóc có rồng cuộn và mặt nguyệt
    var s = rect(x, y + h * 0.45, w, h * 0.55, '#B8862E');
    for (var k = x + 8; k < x + w; k += 16) s += '<path d="M' + k + ',' + (y + h * 0.45) + ' v' + (h * 0.55) + '" stroke="#946A20" stroke-width="3"/>';
    s += rect(x + 30, y, w - 60, h * 0.42, '#C9963A');
    for (var k2 = x + 38; k2 < x + w - 30; k2 += 16) s += '<path d="M' + k2 + ',' + y + ' v' + (h * 0.42) + '" stroke="#A8782A" stroke-width="3"/>';
    s += '<path d="M' + (x + 20) + ',' + y + ' H' + (x + w - 20) + '" stroke="#8A5A1E" stroke-width="8"/>';
    s += '<path d="M' + (x + 20) + ',' + y + ' q-18,-4 -16,-22 q8,10 18,6M' + (x + w - 20) + ',' + y + ' q18,-4 16,-22 q-8,10 -18,6" fill="none" stroke="' + VANG + '" stroke-width="5"/>';
    var cx = x + w / 2;
    s += '<circle cx="' + cx + '" cy="' + (y - 10) + '" r="11" fill="#E8C060"/><path d="M' + (cx - 14) + ',' + (y - 6) + ' q-20,-16 -44,-4 q10,-10 0,-14M' + (cx + 14) + ',' + (y - 6) + ' q20,-16 44,-4 q-10,-10 0,-14" fill="none" stroke="' + VANG + '" stroke-width="4"/>';
    s += '<path d="M' + (x - 16) + ',' + (y + h) + ' H' + (x + w + 16) + '" stroke-width="5"/>';
    s += '<path d="M' + (x - 16) + ',' + (y + h) + ' q-14,-8 -6,-24M' + (x + w + 16) + ',' + (y + h) + ' q14,-8 6,-24" fill="none" stroke-width="4"/>';
    return s;
  }
  function denLong(x, y) { // đèn lồng đỏ treo hiên
    return '<path d="M' + x + ',' + (y - 14) + ' v10" stroke-width="2"/><ellipse cx="' + x + '" cy="' + (y + 8) + '" rx="10" ry="13" fill="#C8301E"/><path d="M' + (x - 10) + ',' + (y + 8) + ' h20M' + x + ',' + (y - 5) + ' v26" stroke="#E8A040" stroke-width="1.5"/>' +
      '<path d="M' + (x - 5) + ',' + (y - 5) + ' h10M' + (x - 5) + ',' + (y + 21) + ' h10" stroke="' + VANG + '" stroke-width="3"/><path d="M' + x + ',' + (y + 22) + ' v8" stroke="#C8301E" stroke-width="2"/>';
  }
  function chauCanh(b, x, y, solid, z) { // chậu sứ trồng cây tùng uốn thế
    var t = '<ellipse cx="' + x + '" cy="' + (y + 2) + '" rx="26" ry="6" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M' + (x - 22) + ',' + (y - 22) + ' h44 l-6,22 h-32 z" fill="#E8E8EE"/><path d="M' + (x - 18) + ',' + (y - 12) + ' q18,6 36,0" fill="none" stroke="#3A5A9A" stroke-width="2.4"/>';
    t += '<path d="M' + x + ',' + (y - 22) + ' q-6,-14 6,-22 q12,-8 0,-22 q-8,-8 4,-16" fill="none" stroke="#6A4A30" stroke-width="6"/>';
    [[-14, -50, 16], [12, -66, 14], [-2, -82, 12], [16, -40, 11]].forEach(function (p) { t += '<ellipse cx="' + (x + p[0]) + '" cy="' + (y + p[1]) + '" rx="' + p[2] + '" ry="' + (p[2] * .55) + '" fill="#4E7A3A"/>'; });
    b.prop(x - 34, y - 100, 68, 104, t, z || y);
    if (solid) b.solid(x - 20, y - 12, 40, 14);
  }
  G.scenes.cung_san = function (S) {
    var b = new B(960, 720), s = '';
    s += gachDa(960, 720);
    // ngự đạo: lối lát đá lớn từ thềm điện xuống cổng nam
    s += rect(420, 276, 120, 444, '#B8B6A6');
    for (var y = 276; y < 720; y += 52) s += '<path d="M420,' + y + ' h120" stroke="#9A9888" stroke-width="2.5"/>';
    s += '<path d="M420,276 V720M540,276 V720" stroke="#8A8878" stroke-width="4"/>';
    for (var q = 300; q < 700; q += 104) s += '<circle cx="480" cy="' + (q + 26) + '" r="9" fill="none" stroke="#9A9888" stroke-width="2"/>';
    // điện hoàng hậu: mái hai tầng, hàng cột son, cửa bức bàn chấn song, hoành phi, đèn lồng
    s += maiCung(160, 30, 640, 112);
    s += rect(180, 142, 600, 108, '#C9A878') + rect(180, 142, 600, 10, INK, ' opacity=".25"');
    [196, 270, 344, 418, 542, 616, 690, 764].forEach(function (x) { s += rect(x - 8, 142, 16, 108, DO) + '<path d="M' + (x - 10) + ',248 h20" stroke-width="4"/>'; });
    [[206, 262], [280, 336], [354, 410], [552, 608], [626, 682], [700, 756]].forEach(function (d) {
      s += rect(d[0], 168, d[1] - d[0], 72, '#8A5A3A');
      for (var gx = d[0] + 8; gx < d[1]; gx += 9) s += '<path d="M' + gx + ',172 v34" stroke="#C9963A" stroke-width="1.5"/>';
      s += '<path d="M' + d[0] + ',190 h' + (d[1] - d[0]) + 'M' + d[0] + ',210 h' + (d[1] - d[0]) + '" stroke="#C9963A" stroke-width="1.5"/>' + rect(d[0] + 4, 214, d[1] - d[0] - 8, 22, '#6A3A24');
    });
    s += rect(428, 160, 104, 90, '#5A2418') + '<path d="M480,160 v90" stroke-width="2"/><circle cx="472" cy="206" r="3" fill="' + VANG + '"/><circle cx="488" cy="206" r="3" fill="' + VANG + '"/>';
    s += rect(400, 124, 160, 30, '#7A2418') + '<path d="M410,130 h140v18h-140z" fill="none" stroke="' + VANG + '" stroke-width="2"/><path d="M426,139 h12M448,134 v12M464,139 h12M486,134 v12M506,139 h12M528,134 v12" stroke="' + VANG + '" stroke-width="2.5"/>';
    [236, 380, 580, 724].forEach(function (x) { s += denLong(x, 152); });
    // thềm ba bậc, lan can rồng đá hai bên
    s += rect(360, 250, 240, 9, '#B8B6A6') + rect(350, 259, 260, 9, '#A8A698') + rect(340, 268, 280, 8, '#9A9888');
    [[340, 250], [600, 250]].forEach(function (p) { s += '<path d="M' + p[0] + ',' + (p[1] + 26) + ' q0,-22 10,-30 q8,-6 10,6 q-8,2 -8,12 q0,8 8,12" fill="#A8A698"/><circle cx="' + (p[0] + 12) + '" cy="' + (p[1] - 2) + '" r="2" fill="' + INK + '"/>'; });
    s += rect(150, 250, 190, 24, '#9A9888') + rect(620, 250, 190, 24, '#9A9888');
    // bếp phía tây nam: mái ngói, khói, cửa, củi chất hiên
    s += maiNgoi(20, 470, 210, 70) + rect(30, 540, 190, 90, '#B98C5E') + rect(96, 560, 56, 70, '#4A2A1E');
    s += '<path d="M44,560 h36 v28 h-36z" fill="#3A2A20"/><path d="M44,574 h36M62,560 v28" stroke="#8A6A4A" stroke-width="2"/>';
    s += '<path d="M60,470 q10,-30 0,-60" fill="none" stroke="#D8D0C0" stroke-width="5" opacity=".6"/><path d="M80,466 q-10,-24 4,-48" fill="none" stroke="#D8D0C0" stroke-width="4" opacity=".4"/>';
    s += [0, 1, 2].map(function (r2) { return [0, 1, 2, 3].map(function (c) { return '<circle cx="' + (166 + c * 12 + (r2 % 2) * 6) + '" cy="' + (622 - r2 * 11) + '" r="6" fill="#B8884A" stroke-width="1.5"/>'; }).join(''); }).join('');
    // cổng bắc: hai cánh gỗ đóng đinh vàng, biển, cờ đuôi nheo
    s += rect(830, 120, 130, 160, '#8A3424') + maiNgoi(820, 70, 150, 50) + rect(860, 170, 70, 110, '#3A1A12') + '<path d="M895,170 v110" stroke-width="2"/>';
    for (var dy = 184; dy < 276; dy += 16) for (var dx = 868; dx < 926; dx += 14) s += '<circle cx="' + dx + '" cy="' + dy + '" r="2.4" fill="' + VANG + '" stroke="none"/>';
    s += rect(858, 136, 74, 26, '#2A1A12') + '<path d="M860,138 h70 v22 h-70 z" fill="none" stroke="#D9A93A" stroke-width="1.4"/>' + G.ve.chuKhac(895, 154, 'CỔNG BẮC', 12, { ls: .6 });
    [838, 950].forEach(function (x) { s += '<path d="M' + x + ',120 V40" stroke="#5A3A20" stroke-width="4"/><path d="M' + x + ',44 l34,8 l-34,10 z" fill="#C8301E" class="sway"/><path d="M' + x + ',44 l34,8" stroke="' + VANG + '" stroke-width="1.5"/>'; });
    b.bg += ink(s);
    b.solid(150, 0, 660, 276); b.solid(20, 470, 210, 160); b.solid(820, 0, 140, 280);
    chauCanh(b, 300, 268, false, 276); chauCanh(b, 660, 268, false, 276);
    [200, 760].forEach(function (x) { cot(b, x, 300); });
    den(b, 340, 330); den(b, 620, 330);
    // vạc đồng giữa sân: ba chân, quai, hoa văn, khói trầm
    b.prop(436, 400, 88, 90, '<ellipse cx="480" cy="476" rx="40" ry="12" fill="' + INK + '" opacity=".2" stroke="none"/>' +
      '<path d="M452,466 l-8,14M508,466 l8,14M480,470 v12" stroke-width="5"/>' +
      '<path d="M444,436 h72 q-2,36 -36,38 q-34,-2 -36,-38 z" fill="#8A7A3A"/><path d="M448,450 q32,8 64,0" fill="none" stroke="#C8A850" stroke-width="2"/><path d="M456,460 l6,-6 l6,6 l6,-6 l6,6 l6,-6 l6,6 l6,-6" fill="none" stroke="#5A4A1E" stroke-width="1.5"/>' +
      '<ellipse cx="480" cy="436" rx="36" ry="8" fill="#4A3A2A"/><path d="M440,432 q-10,-8 -4,-16M520,432 q10,-8 4,-16" fill="none" stroke="#6A5A2A" stroke-width="5"/>' +
      '<path d="M474,428 q-6,-14 2,-24 q8,-10 0,-20M488,428 q6,-12 -2,-22" fill="none" stroke="#D8D0C0" stroke-width="2.5" opacity=".6"/>', 478);
    b.solid(444, 448, 72, 30);
    // cây đại trong bồn đá góc tây bắc và góc đông nam
    [[70, 340], [900, 650]].forEach(function (p) {
      var x = p[0], y = p[1], t = '<ellipse cx="' + x + '" cy="' + y + '" rx="34" ry="10" fill="#9A9888"/><ellipse cx="' + x + '" cy="' + (y - 2) + '" rx="26" ry="6" fill="#6A5A40"/>';
      t += '<path d="M' + (x - 4) + ',' + (y - 2) + ' Q' + (x - 10) + ',' + (y - 40) + ' ' + (x - 30) + ',' + (y - 70) + 'M' + (x + 2) + ',' + (y - 2) + ' Q' + (x + 8) + ',' + (y - 50) + ' ' + (x + 26) + ',' + (y - 86) + 'M' + x + ',' + (y - 30) + ' Q' + (x + 4) + ',' + (y - 60) + ' ' + (x - 2) + ',' + (y - 100) + '" fill="none" stroke="#8A7A6A" stroke-width="7"/>';
      [[-30, -76], [26, -92], [-2, -106], [-16, -96], [16, -70], [-38, -64], [34, -80], [8, -88], [-20, -112], [20, -108]].forEach(function (l) { t += '<ellipse cx="' + (x + l[0]) + '" cy="' + (y + l[1]) + '" rx="20" ry="9" fill="#5E8A3A" transform="rotate(' + (l[0] / 2) + ' ' + (x + l[0]) + ' ' + (y + l[1]) + ')"/><circle cx="' + (x + l[0] + 4) + '" cy="' + (y + l[1] - 4) + '" r="3.4" fill="#FFF6E8" stroke-width="1"/><circle cx="' + (x + l[0] - 6) + '" cy="' + (y + l[1] + 2) + '" r="3" fill="#FFF6E8" stroke-width="1"/>'; });
      b.prop(x - 60, y - 130, 120, 142, t, y, 'sway'); b.solid(x - 14, y - 8, 28, 14);
    });
    b.edges();
    return b.out();
  };

  // ================= VƯỜN NGỰ =================
  G.scenes.cung_vuon = function (S) {
    var b = new B(960, 720), r = rng(77), s = '';
    s += rect(0, 0, 960, 720, 'url(#co)');
    // lối đi lát đá tảng
    s += '<path d="M0,500 Q300,480 480,520 T960,500" fill="none" stroke="#C9A877" stroke-width="44"/>';
    for (var t0 = 0; t0 < 1; t0 += 0.05) { var px = t0 * 960, py = t0 < .5 ? 500 - 20 * Math.sin(t0 * 2 * Math.PI) + (t0 * 2) * 20 : 520 - (t0 - .5) * 2 * 20 + 10 * Math.sin(t0 * 6.28); s += '<ellipse cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" rx="17" ry="9" fill="#B8B4A4" stroke-width="2"/>'; }
    // luống hoa cúc, mẫu đơn
    [[150, 640, '#E8C04A'], [380, 640, '#E88AA0'], [640, 420, '#E8C04A'], [210, 330, '#C8301E'], [860, 470, '#E88AA0']].forEach(function (f) {
      s += '<ellipse cx="' + f[0] + '" cy="' + f[1] + '" rx="56" ry="18" fill="#5E7A3A" stroke-width="2.4"/>';
      for (var k = 0; k < 12; k++) { var fx = f[0] - 44 + (k * 37 % 88), fy = f[1] - 10 + (k * 13 % 20); s += '<circle cx="' + fx + '" cy="' + fy + '" r="4.6" fill="' + f[2] + '" stroke-width="1.3"/><circle cx="' + fx + '" cy="' + fy + '" r="1.4" fill="#8A5A1E" stroke="none"/>'; }
    });
    // hồ sen: bờ kè đá, lá sen, hoa sen, nụ, cỏ nến
    s += '<path d="M300,250 Q340,170 520,180 Q700,190 690,300 Q680,400 520,410 Q330,410 300,330 Z" fill="url(#nuoc)" stroke-width="4"/>';
    for (var a = 0; a < 40; a++) { var ang = a / 40 * Math.PI * 2, rx = 200 + 6 * Math.sin(a * 2.3), ry = 118 + 5 * Math.cos(a * 1.7), ex = 495 + Math.cos(ang) * rx, ey = 295 + Math.sin(ang) * ry; s += '<ellipse cx="' + ex.toFixed(0) + '" cy="' + ey.toFixed(0) + '" rx="' + (11 + a % 4 * 2) + '" ry="7" fill="' + (a % 3 ? '#A8A498' : '#B8B4A6') + '" stroke-width="2"/>'; }
    for (var i = 0; i < 16; i++) {
      var lx = 340 + r() * 300, ly = 210 + r() * 170, lr = 13 + r() * 9;
      s += '<path d="M' + lx + ',' + ly + ' m-' + lr + ',0 a' + lr + ',' + (lr * .6) + ' 0 1,0 ' + (lr * 2) + ',0 a' + lr + ',' + (lr * .6) + ' 0 1,0 -' + (lr * 2) + ',0" fill="' + (i % 2 ? '#5E8A4A' : '#6E9A5A') + '" stroke-width="2"/><path d="M' + lx + ',' + ly + ' l' + (lr * .8) + ',-' + (lr * .3) + '" stroke="#3E6A3A" stroke-width="1.5"/>';
      if (i % 3 === 0) s += '<g transform="translate(' + (lx + 4) + ',' + (ly - 6) + ')"><path d="M0,0 q-10,-6 -8,-16 q6,4 8,10 q2,-12 8,-16 q2,10 -2,18 q8,-4 12,0 q-6,6 -18,4 z" fill="#F0A8B8" stroke-width="1.5"/><path d="M-2,-4 q2,-8 4,0" fill="#F8D0D8" stroke="none"/></g>';
      if (i % 5 === 1) s += '<path d="M' + (lx + 10) + ',' + ly + ' v-22" stroke="#4E7A3A" stroke-width="2"/><ellipse cx="' + (lx + 10) + '" cy="' + (ly - 26) + '" rx="4" ry="7" fill="#E890A8" stroke-width="1.4"/>';
    }
    [[316, 300], [672, 236], [600, 396], [360, 220]].forEach(function (c) { for (var k = 0; k < 5; k++) s += '<path d="M' + (c[0] + k * 5) + ',' + c[1] + ' q' + (k - 2) + ',-20 ' + (k * 2 - 4) + ',-34" stroke="#5E7A3A" stroke-width="2.4" fill="none"/>'; s += '<rect x="' + (c[0] + 6) + '" y="' + (c[1] - 40) + '" width="5" height="12" rx="2" fill="#7A4A2A" stroke-width="1.2"/>'; });
    // hòn non bộ giữa hồ
    s += '<path d="M570,290 l12,-46 l10,22 l12,-38 l14,40 l10,-14 l12,36 q-34,12 -70,0 z" fill="#8A8A80"/><path d="M590,260 q6,10 0,20M612,240 q6,14 0,28" stroke="#6A6A60" stroke-width="2" fill="none"/><path d="M594,232 q8,-10 16,-4" stroke="#4E7A3A" stroke-width="5" fill="none"/>';
    b.bg += ink(s);
    b.solid(306, 186, 380, 220);
    b.edges();
    // sào phơi áo của vua
    var sp = rect(118, 300, 8, 110, '#8A6A4A') + rect(310 - 6, 300, 8, 110, '#8A6A4A') + '<path d="M122,304 Q215,320 308,304" fill="none" stroke-width="2.5"/>';
    if (!S.flags.c1_ao_cat) sp += '<path d="M170,312 h50 l6,40 h-62 z" fill="' + VANG + '"/><path class="d" d="M195,312 v40M176,326 h38"/><path d="M182,334 q14,-8 26,0 q-6,8 -14,6" fill="none" stroke="#C8301E" stroke-width="2"/><path d="M240,314 h40 l4,30 h-48 z" fill="#E9E2D0"/>';
    b.prop(110, 296, 210, 120, sp, 410); b.solid(116, 400, 12, 12); b.solid(300, 400, 12, 12);
    // cây đào già: thân xù xì, cành vươn, chùm hoa hồng, cánh hoa rụng
    var tx = 820, ty = 360, t = '<ellipse cx="' + tx + '" cy="' + ty + '" rx="76" ry="15" fill="' + INK + '" opacity=".22" stroke="none"/>';
    t += '<path d="M' + (tx - 22) + ',' + ty + ' Q' + (tx - 26) + ',' + (ty - 60) + ' ' + (tx - 12) + ',' + (ty - 100) + ' L' + (tx + 12) + ',' + (ty - 104) + ' Q' + (tx + 16) + ',' + (ty - 50) + ' ' + (tx + 24) + ',' + ty + ' Z" fill="#6A4A3A"/>';
    t += '<path d="M' + (tx - 12) + ',' + (ty - 30) + ' q8,-6 6,-20M' + (tx + 8) + ',' + (ty - 60) + ' q-6,-6 -2,-16" fill="none" stroke="#4A3226" stroke-width="2"/>';
    t += '<path d="M' + (tx - 10) + ',' + (ty - 96) + ' Q' + (tx - 50) + ',' + (ty - 140) + ' ' + (tx - 100) + ',' + (ty - 150) + 'M' + (tx + 6) + ',' + (ty - 100) + ' Q' + (tx + 30) + ',' + (ty - 160) + ' ' + (tx + 70) + ',' + (ty - 180) + 'M' + (tx - 2) + ',' + (ty - 100) + ' Q' + (tx - 4) + ',' + (ty - 170) + ' ' + (tx - 20) + ',' + (ty - 210) + '" fill="none" stroke="#6A4A3A" stroke-width="12"/>';
    for (var k2 = 0; k2 < 26; k2++) { var cx2 = tx - 125 + r() * 250, cy2 = ty - 255 + r() * 125 + Math.abs(k2 - 13) * 2, cr = 15 + r() * 12; t += '<circle cx="' + cx2 + '" cy="' + cy2 + '" r="' + cr + '" fill="' + (k2 % 3 === 0 ? '#C87888' : (k2 % 3 === 1 ? '#E8A8B0' : '#D88898')) + '"/>'; }
    for (var k3 = 0; k3 < 40; k3++) { var hx = tx - 130 + r() * 260, hy = ty - 260 + r() * 140; t += '<g transform="translate(' + hx.toFixed(0) + ',' + hy.toFixed(0) + ')"><circle r="4" fill="#FCE4EA" stroke-width="1"/><circle r="1.4" fill="#C8406A" stroke="none"/></g>'; }
    for (var k4 = 0; k4 < 14; k4++) t += '<ellipse cx="' + (tx - 80 + r() * 160).toFixed(0) + '" cy="' + (ty - 6 + r() * 30).toFixed(0) + '" rx="3" ry="2" fill="#F0B8C4" stroke="none"/>';
    // bóng cô gái ngồi trên cành, chỉ hiện khi mở mắt âm dương
    t += '<g class="hid">' + A.vong(tx - 10, ty - 112, 0.62, { mat: true }) + '</g>';
    b.prop(tx - 150, ty - 290, 300, 300, t, ty, 'sway'); b.solid(tx - 24, ty - 12, 48, 16);
    // con vàng anh: prop riêng không filter, cùng khung và cùng nhịp đung đưa với cây (js/hoathan.js)
    if (!S.flags.c1_giet_chim) b.prop(tx - 150, ty - 290, 300, 300, G.hoathan.ink(G.hoathan.chim({ x: tx + 30, y: ty - 176, s: .62, kieu: S.phase === 'dem' ? 'dau' : (S.phase === 'toi' ? 'hot' : 'nhay'), ma: S.phase === 'dem', neo: [tx, ty] })), ty + 1, 'sway', true);
    // non bộ và ghế đá
    b.prop(92, 120, 80, 80, '<ellipse cx="130" cy="192" rx="38" ry="9" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M100,190 l8,-40 l12,16 l10,-44 l14,36 l8,-12 l10,44 z" fill="#8A8A80"/><path d="M112,170 q6,8 0,16M132,148 q6,12 0,24" stroke="#6A6A60" stroke-width="2" fill="none"/><path d="M128,124 q10,-14 22,-6M116,150 q-10,-6 -12,-14" stroke="#4E7A3A" stroke-width="5" fill="none"/>', 194);
    b.solid(102, 172, 56, 22);
    b.prop(850, 226, 64, 44, '<ellipse cx="880" cy="262" rx="30" ry="6" fill="' + INK + '" opacity=".2" stroke="none"/><rect x="852" y="238" width="56" height="12" rx="3" fill="#B8B4A6"/><path d="M860,250 v10M900,250 v10" stroke="#8A8878" stroke-width="6"/>', 262);
    b.solid(854, 244, 52, 18);
    chuoi(b, 120, 640, r); chum(b, 900, 620); den(b, 260, 470); den(b, 720, 470);
    // chỗ chôn lông chim (đêm 3) và mầm cây
    (S.c1Spots || []).forEach(function (p) {
      if (p.done) b.bg += ink('<ellipse cx="' + p.x + '" cy="' + p.y + '" rx="16" ry="7" fill="#6A4A2E" stroke-width="2"/>', 2);
      else b.bg += ink('<g><path d="M' + (p.x - 12) + ',' + p.y + ' q12,-16 24,0 q-12,8 -24,0 z" fill="' + VANG + '" stroke-width="1.5"/><path d="M' + (p.x - 6) + ',' + (p.y - 4) + ' l-8,-8M' + (p.x + 4) + ',' + (p.y - 6) + ' l6,-10" stroke="#C9A020" stroke-width="2"/></g>', 1.5);
    });
    if (G.scenes.xoanHook && G.scenes.xoanHook(b, S)) { /* chương 2: cây xoan thay cho mầm */ }
    else if (S.flags.c1_mam_cay) b.prop(560, 560, 40, 50, '<path d="M580,604 v-30" stroke="#6A4A2E" stroke-width="4"/><path d="M580,584 q-18,-10 -20,-24 q18,4 20,24 z M580,578 q18,-12 20,-26 q-18,4 -20,26 z" fill="#B8241A" stroke-width="2"/>', 604);
    return b.out();
  };

  // ================= GIẾNG GIẶT =================
  G.scenes.cung_gieng = function (S) {
    var b = new B(960, 720), r = rng(91), s = '';
    s += gachDa(960, 720);
    for (var mo = 0; mo < 40; mo++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (240 + r() * 340).toFixed(0) + '" rx="' + (6 + r() * 10).toFixed(0) + '" ry="3" fill="#6E8A54" opacity=".45" stroke="none"/>';
    // dãy nhà cung nữ: mái ngói âm dương, vách ván, cửa sổ chấn song, áo phơi dưới hiên
    s += rect(60, 24, 840, 40, '#8A4A3A');
    for (var t = 66; t < 900; t += 14) s += '<path d="M' + t + ',24 v40" stroke="#6A3428" stroke-width="3"/>';
    s += '<path d="M44,64 H916" stroke-width="5"/><path d="M44,64 q-12,-6 -6,-20M916,64 q12,-6 6,-20" fill="none" stroke-width="4"/>';
    s += rect(60, 64, 840, 146, '#B98C5E');
    for (var v = 76; v < 900; v += 24) s += '<path d="M' + v + ',64 v146" stroke="#A07A4E" stroke-width="2"/>';
    [140, 300, 460, 620, 780].forEach(function (x) {
      s += rect(x - 26, 120, 52, 90, '#4A2A1E') + '<path d="M' + x + ',120 v90" stroke-width="2"/><circle cx="' + (x - 4) + '" cy="166" r="2" fill="#D9A93A"/><circle cx="' + (x + 4) + '" cy="166" r="2" fill="#D9A93A"/>';
      s += rect(x - 30, 100, 60, 16, '#6A3424');
    });
    [220, 380, 540, 700, 860].forEach(function (x) { if (x > 880) return; s += rect(x - 24, 120, 48, 34, '#2A3A3A'); for (var g = x - 20; g < x + 24; g += 8) s += '<path d="M' + g + ',120 v34" stroke="#8A6440" stroke-width="3"/>'; });
    s += '<path d="M70,90 Q480,104 890,90" fill="none" stroke-width="2"/>';
    [[110, '#C8B898'], [250, '#6E9A5A'], [420, '#E9E2D0'], [590, '#B84A3E'], [740, '#C8B898']].forEach(function (a) { s += '<path d="M' + a[0] + ',92 h30 l3,22 h-36 z" fill="' + a[1] + '" stroke-width="2"/>'; });
    s += rect(40, 210, 880, 20, '#9A9888') + '<path d="M40,220 H920" stroke="#8A8878" stroke-width="2"/>';
    // ao giặt: bờ kè đá, bèo tấm, khóm cỏ, cầu ao ván gỗ có cọc, đá giặt và chày đập vải
    s += '<path d="M0,560 Q300,540 600,560 T960,550 V720 H0 Z" fill="url(#nuoc)" stroke-width="3"/>';
    for (var k = 0; k < 30; k++) { var kx = k * 33; s += '<ellipse cx="' + kx + '" cy="' + (556 - Math.sin(k) * 6).toFixed(0) + '" rx="16" ry="7" fill="' + (k % 2 ? '#A8A498' : '#9A988C') + '" stroke-width="2"/>'; }
    for (var be = 0; be < 26; be++) s += '<circle cx="' + (r() * 960).toFixed(0) + '" cy="' + (600 + r() * 110).toFixed(0) + '" r="' + (3 + r() * 3).toFixed(1) + '" fill="#7E9A4A" stroke-width="1"/>';
    [[60, 610], [880, 620], [380, 690]].forEach(function (c) { for (var i = 0; i < 6; i++) s += '<path d="M' + (c[0] + i * 5) + ',' + c[1] + ' q' + (i - 3) + ',-18 ' + (i * 3 - 8) + ',-30" stroke="#5E7A3A" stroke-width="2.4" fill="none"/>'; });
    s += rect(560, 520, 120, 70, '#9A7A4A') + '<path class="d" d="M560,534 h120M560,550 h120M560,566 h120"/><path d="M566,590 v26M674,590 v26M620,590 v22" stroke="#5A3A20" stroke-width="6"/>';
    [[200, 566], [470, 566], [780, 562]].forEach(function (p) { s += '<path d="M' + (p[0] - 30) + ',' + p[1] + ' q30,-12 60,0 l-4,10 h-52 z" fill="#8A8A80" stroke-width="2.4"/>'; });
    s += '<path d="M480,560 l26,-14" stroke="#7A5A3A" stroke-width="6"/>';
    b.bg += ink(s);
    b.solid(40, 0, 880, 232); b.solid(0, 580, 560, 140); b.solid(680, 580, 280, 140);
    // giếng đá: thành giếng xếp đá có rêu, giá gỗ, ròng rọc, dây, gàu, vũng nước quanh miệng giếng
    var gx = 400, gy = 380;
    var g = '<ellipse cx="' + gx + '" cy="' + (gy + 18) + '" rx="80" ry="22" fill="#6F8A88" opacity=".35" stroke="none"/>';
    g += '<ellipse cx="' + gx + '" cy="' + gy + '" rx="58" ry="30" fill="' + DA + '"/>';
    for (var st = 0; st < 12; st++) { var an = st / 12 * Math.PI * 2; g += '<ellipse cx="' + (gx + Math.cos(an) * 50).toFixed(0) + '" cy="' + (gy + Math.sin(an) * 24).toFixed(0) + '" rx="12" ry="7" fill="' + (st % 2 ? '#C8C0B0' : '#A8A090') + '" stroke-width="1.6"/>'; }
    g += '<ellipse cx="' + gx + '" cy="' + (gy - 4) + '" rx="40" ry="18" fill="#0E1818"/><ellipse cx="' + (gx - 8) + '" cy="' + (gy - 2) + '" rx="14" ry="4" fill="#3A5A5A" opacity=".6" stroke="none"/>';
    g += '<path d="M' + (gx - 40) + ',' + (gy + 16) + ' q10,6 20,0M' + (gx + 22) + ',' + (gy + 18) + ' q10,4 18,-2" stroke="#5E7A44" stroke-width="4" fill="none"/>';
    g += '<path d="M' + (gx - 70) + ',' + (gy - 10) + ' v-74M' + (gx + 70) + ',' + (gy - 10) + ' v-74M' + (gx - 78) + ',' + (gy - 84) + ' H' + (gx + 78) + '" stroke="#6A4A3A" stroke-width="8"/>';
    g += '<circle cx="' + gx + '" cy="' + (gy - 84) + '" r="9" fill="#8A6A4A" stroke-width="2.4"/><path d="M' + gx + ',' + (gy - 75) + ' v34" stroke-width="2"/>';
    g += '<path d="M' + (gx - 12) + ',' + (gy - 42) + ' h24 l-4,16 h-16 z" fill="#8A6A4A" stroke-width="2"/><path d="M' + (gx - 12) + ',' + (gy - 42) + ' q12,-10 24,0" fill="none" stroke-width="2"/>';
    if (S.flags.c1_lai_chet && !S.flags.c1_xac_di) g += '<path d="M' + (gx + 60) + ',' + (gy + 40) + ' h90 v14 h-90 z" fill="#E9E2D0" stroke-width="2"/><path d="M' + (gx + 66) + ',' + (gy + 40) + ' q-10,-6 -16,2" fill="none" stroke="#0A0A10" stroke-width="4"/>';
    b.prop(gx - 90, gy - 100, 180, 140, g, gy + 20); b.solid(gx - 56, gy - 18, 112, 40);
    // sào phơi: áo cung nữ, khăn, yếm
    b.prop(700, 326, 200, 96, rect(706, 340, 6, 80, '#8A6A4A') + rect(888, 340, 6, 80, '#8A6A4A') + '<path d="M709,344 Q800,360 891,344" fill="none" stroke-width="2"/>' +
      '<path d="M730,350 h40 l4,32 h-48 z" fill="#E9E2D0"/><path d="M750,350 v32" stroke="#C8C0B0" stroke-width="1.5"/><path d="M786,354 h22 l2,26 h-26 z" fill="#B84A3E"/><path d="M820,352 h36 l4,28 h-44 z" fill="#6E9A5A"/><path d="M866,350 h16 l1,20 h-18 z" fill="#4E8C84"/>', 420);
    b.solid(704, 410, 10, 10); b.solid(886, 410, 10, 10);
    // chậu giặt, thúng quần áo, ghế đẩu
    b.prop(232, 462, 120, 46, '<ellipse cx="275" cy="490" rx="32" ry="14" fill="#8A6A4A"/><ellipse cx="275" cy="486" rx="26" ry="9" fill="#9AB8B4"/><path d="M262,484 q10,-6 22,0" fill="none" stroke="#E9E2D0" stroke-width="3"/>' +
      '<ellipse cx="330" cy="496" rx="16" ry="6" fill="#B8945A"/><rect x="318" y="488" width="24" height="8" fill="#B8945A" stroke-width="1.5"/>', 500);
    b.solid(244, 478, 62, 24);
    b.prop(840, 480, 70, 40, '<ellipse cx="875" cy="506" rx="26" ry="9" fill="#C79A5E"/><ellipse cx="875" cy="500" rx="22" ry="7" fill="#B8884A"/><path d="M858,496 q10,-10 22,-2 q8,-8 14,2" fill="#E9E2D0" stroke-width="1.6"/><path d="M864,498 q12,-6 22,0" fill="none" stroke="#B84A3E" stroke-width="2"/>', 512);
    b.solid(852, 494, 46, 16);
    // chum nước mưa sát hiên, khóm chuối góc tây
    chum(b, 60, 268);
    chuoi(b, 40, 420, r);
    den(b, 160, 320);
    if (G.scenes.giengHook) G.scenes.giengHook(b, S);
    // vết kéo lê trên đá (chỉ khi mở mắt âm dương, sau đêm 2)
    if (S.day >= 3) b.fgs += '<g class="hid"><path d="M600,520 Q520,470 450,420" fill="none" stroke="#9FF0F0" stroke-width="5" stroke-dasharray="10 8"/><ellipse cx="470" cy="420" rx="8" ry="12" fill="#9FF0F0"/><ellipse cx="520" cy="452" rx="9" ry="14" fill="#9FF0F0"/></g>';
    b.edges();
    return b.out();
  };

  // ================= CUNG HOÀNG HẬU (trong nhà) =================
  G.scenes.cung_hau = function (S) {
    var b = new B(960, 620), s = '';
    s += rect(0, 0, 960, 620, '#2A1A14');
    s += rect(80, 60, 800, 500, 'url(#vangoc)');
    s += rect(80, 60, 800, 70, '#A85A3A') + rect(80, 60, 800, 12, '#5A2418');
    s += rect(80, 60, 16, 500, DO) + rect(864, 60, 16, 500, DO);
    s += rect(80, 544, 380, 16, DO) + rect(540, 544, 340, 16, DO);
    // cửa sổ nhìn ra vườn
    s += rect(600, 76, 120, 46, '#2A3A3A') + '<path class="d" d="M600,99 h120M640,76 v46M680,76 v46"/>';
    b.bg += ink(s);
    b.solid(80, 0, 800, 132); b.solid(80, 60, 16, 500); b.solid(864, 60, 16, 500); b.solid(80, 544, 380, 20); b.solid(540, 544, 340, 20); b.solid(0, 0, 80, 620); b.solid(880, 0, 80, 620);
    // giường có màn
    // giường sơn son thếp vàng: thành giường chạm, nệm gấm, gối, chăn gấp, màn the vén buộc
    var g = G.ve.khoi(130, 150, 220, 112, 22, G.ve.GO.son, { chan: 6, vien: VANG, van: false });
    g += '<rect x="140" y="158" width="200" height="96" fill="#D9B87A" stroke-width="2"/><rect x="146" y="164" width="188" height="84" fill="none" stroke="#B8862E" stroke-width="1.4"/>';
    var hoa = ''; for (var hx = 168; hx < 330; hx += 30) for (var hy = 186; hy < 246; hy += 26) hoa += '<circle cx="' + hx + '" cy="' + hy + '" r="4" fill="none" stroke="#B8862E" stroke-width="1.2"/><circle cx="' + hx + '" cy="' + hy + '" r="1.2" fill="#B8862E" stroke="none"/>';
    g += hoa + G.ve.goi(150, 166, 58, 20, '#E9E2D0') + G.ve.goi(214, 166, 58, 20, '#E9E2D0');
    g += '<path d="M280,198 h52 v40 h-52 z" fill="#8A2A3A" stroke-width="2"/><path d="M280,210 h52M280,224 h52" stroke="#D9A93A" stroke-width="1.4"/>';
    // đầu giường chạm và cột màn
    g += '<path d="M130,150 v-30 q110,-30 220,0 v30" fill="none" stroke="' + INK + '" stroke-width="8"/><path d="M130,150 v-30 q110,-30 220,0 v30" fill="none" stroke="#7A2418" stroke-width="5"/><path d="M134,121 q106,-28 212,0" fill="none" stroke="' + VANG + '" stroke-width="1.6"/>';
    g += '<path d="M240,104 q-8,-8 0,-14 q8,6 0,14 z" fill="' + VANG + '" stroke-width="1.4"/>';
    g += '<path d="M132,124 q-10,40 6,80 q6,10 -2,22" fill="none" stroke="#F2EEE6" stroke-width="8" opacity=".85"/><path d="M348,124 q10,40 -6,80 q-6,10 2,22" fill="none" stroke="#F2EEE6" stroke-width="8" opacity=".85"/><path d="M128,192 q8,4 14,0M352,192 q-8,4 -14,0" stroke="' + VANG + '" stroke-width="2.4"/>';
    b.prop(116, 96, 250, 200, g, 282); b.solid(130, 150, 220, 132);
    // bàn trang điểm + gương
    // bàn trang điểm sơn then: gương đồng trên giá chạm, hộp phấn, lược ngà, trâm
    var bt = '<path d="M462,186 l-6,-46 h48 l-6,46 z" fill="#5A1A10"/><path d="M466,184 l-4,-38 h36 l-4,38" fill="none" stroke="' + VANG + '" stroke-width="1.2"/>';
    bt += '<ellipse cx="480" cy="160" rx="20" ry="23" fill="#B8862E"/><ellipse cx="480" cy="160" rx="16" ry="19" fill="#D8D8C8"/><path d="M470,150 q4,-8 12,-8" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".8"/><ellipse cx="484" cy="166" rx="8" ry="10" fill="#9AA0A0" opacity=".35" stroke="none"/>';
    bt += G.ve.khoi(424, 180, 112, 14, 26, G.ve.GO.son, { chan: 8, ngan: 3, vien: VANG });
    bt += '<rect x="432" y="182" width="16" height="9" rx="2" fill="#2E4E8E" stroke-width="1.2"/><path d="M432,185 h16" stroke="#E8E8EE" stroke-width="1"/><path d="M508,186 h18" stroke="#EFE6D0" stroke-width="3"/><path d="M509,184 v4M513,184 v4M517,184 v4M521,184 v4" stroke="#8A7A5A" stroke-width=".8"/><path d="M496,190 l14,-6" stroke="' + VANG + '" stroke-width="1.6"/><circle cx="510" cy="184" r="2" fill="#C8301E" stroke-width=".8"/>';
    b.prop(416, 130, 130, 100, bt, 222);
    b.solid(424, 180, 112, 42);
    // chiếc yếm đỏ treo trên giá, nhỏ nước
    var y = '<path d="M760,140 v80M820,140 v80M752,142 h76" stroke="#6A4A3A" stroke-width="5"/>' +
      '<path d="M770,150 h40 l-4,44 q-16,8 -32,0 z" fill="#B8241A"/><path class="d" d="M774,150 l-6,-8M806,150 l6,-8"/>' +
      '<path d="M790,200 v10M786,214 v6" stroke="#6F9C9A" stroke-width="3"/><ellipse cx="790" cy="232" rx="14" ry="4" fill="#4A6A6A" stroke-width="1.5"/>';
    b.prop(740, 130, 100, 110, y, 232); b.solid(752, 214, 76, 18);
    // hoành phi sơn son thếp vàng trên vách, câu đối hai bên cửa sổ
    b.bg += ink(rect(200, 74, 160, 34, '#7A2418') + rect(206, 80, 148, 22, 'none', ' stroke="' + VANG + '" stroke-width="2"') +
      '<path d="M226,90 h14M250,86 v12M266,90 h12M290,86 v12M306,90 h14M330,86 v12" stroke="' + VANG + '" stroke-width="2.5"/>' +
      rect(578, 76, 14, 46, DO) + rect(728, 76, 14, 46, DO) + '<path d="M585,82 v6M585,96 v6M585,110 v6M735,82 v6M735,96 v6M735,110 v6" stroke="' + VANG + '" stroke-width="2"/>', 2);
    // rương gỗ chạm, lọ cổ cao ở góc, đôn sứ
    b.prop(112, 460, 100, 70, G.ve.khoi(120, 476, 82, 14, 30, G.ve.GO.son, { vien: VANG, van: false }) + '<path d="M128,496 h66v16h-66z" fill="none" stroke="' + VANG + '" stroke-width="1.4" stroke-dasharray="3 2"/><path d="M148,504 q13,-8 26,0 q-13,8 -26,0" fill="none" stroke="' + VANG + '" stroke-width="1.4"/><rect x="156" y="488" width="10" height="11" rx="2" fill="' + VANG + '" stroke-width="1.4"/><circle cx="161" cy="494" r="1.6" fill="' + INK + '" stroke="none"/>', 520);
    b.solid(120, 482, 82, 38);
    b.prop(810, 430, 70, 110, G.ve.su(845, 534, 88), 536);
    b.solid(826, 512, 38, 24);
    // đôn sứ hình trống: mặt tròn, thân phình có cửa sổ hoa, đinh tán
    var don = G.ve.bong(585, 422, 20, 5, .24) + '<path d="M567,392 q-4,14 2,30 h32 q6,-16 2,-30 z" fill="#E6E8EC"/><ellipse cx="594" cy="406" rx="6" ry="13" fill="#6A7488" opacity=".2" stroke="none"/>';
    don += '<ellipse cx="585" cy="392" rx="18" ry="5.5" fill="#F4F4F6"/><path d="M570,398 q15,4 30,0M570,416 q15,4 30,0" fill="none" stroke="#2E4E8E" stroke-width="1.8"/>';
    don += '<ellipse cx="585" cy="407" rx="6" ry="5" fill="none" stroke="#2E4E8E" stroke-width="1.6"/><circle cx="585" cy="407" r="2" fill="#2E4E8E" stroke="none"/><path d="M572,403 h.1M598,403 h.1M572,411 h.1M598,411 h.1" stroke="#2E4E8E" stroke-width="2.6" stroke-linecap="round"/>';
    b.prop(560, 380, 50, 50, don, 422);
    b.solid(568, 400, 34, 22);
    b.lights.push({ x: 300, y: 140, r: 90, flick: true });
    return b.out();
  };

  // ================= BẾP CUNG + PHÒNG ĐĂNG =================
  G.scenes.cung_bep = function (S) {
    var b = new B(960, 620), s = '';
    s += rect(0, 0, 960, 620, '#2A1A14');
    s += rect(60, 60, 840, 500, 'url(#vangoc)');
    s += rect(60, 60, 840, 66, '#8A6440') + rect(60, 60, 840, 12, '#4A3222');
    s += rect(60, 60, 14, 500, '#6A4A30') + rect(886, 60, 14, 500, '#6A4A30');
    s += rect(60, 546, 360, 14, '#6A4A30') + rect(500, 546, 400, 14, '#6A4A30');
    s += rect(600, 126, 12, 280, '#6A4A30'); // vách ngăn phòng Đăng
    b.bg += ink(s);
    b.solid(60, 0, 840, 128); b.solid(60, 60, 14, 500); b.solid(886, 60, 14, 500); b.solid(60, 546, 360, 20); b.solid(500, 546, 400, 20); b.solid(600, 126, 12, 280);
    b.solid(0, 0, 60, 620); b.solid(900, 0, 60, 620);
    // bếp lò + nồi ninh
    // bếp lò đắp gạch trát đất: miệng lò đỏ lửa, hai nồi gang, muội khói ám vách
    var k = '<path d="M100,140 h200 v70 h-200 z" fill="#8A6A56"/><rect x="100" y="140" width="200" height="20" fill="#A88670" stroke="none"/><path d="M102,142 h196" stroke="#C8A890" stroke-width="1.6"/>';
    var gk = ''; for (var gy0 = 168; gy0 < 210; gy0 += 10) for (var gx0 = 100 + (gy0 % 20 ? 0 : 12); gx0 < 300; gx0 += 24) gk += '<rect x="' + gx0 + '" y="' + gy0 + '" width="23" height="9" fill="none" stroke="#6A4A3A" stroke-width="1" opacity=".55"/>';
    k += gk + '<path d="M284,160 h16 v50 h-16 z" fill="#5A4234" stroke="none" opacity=".6"/>';
    [[140, 0], [240, 1]].forEach(function (p) {
      var px = p[0];
      k += '<path d="M' + (px - 20) + ',210 v-22 q20,-12 40,0 v22 z" fill="#1A0E0A"/><ellipse cx="' + px + '" cy="206" rx="16" ry="5" fill="#E8701A" class="flick" stroke="none"/><ellipse cx="' + px + '" cy="205" rx="8" ry="2.6" fill="#FFD080" class="flick" stroke="none"/>';
      k += '<path d="M' + (px - 12) + ',209 l6,-7 l4,7 M' + (px + 2) + ',209 l5,-6 l5,6" stroke="#5A3A20" stroke-width="2.4"/>';
    });
    k += '<ellipse cx="140" cy="158" rx="30" ry="12" fill="#3A3640"/><ellipse cx="140" cy="156" rx="24" ry="8" fill="#2A2830"/><path d="M118,156 q6,-8 16,-9" fill="none" stroke="#8A8898" stroke-width="2" opacity=".7"/>';
    k += '<ellipse cx="240" cy="158" rx="34" ry="13" fill="#3A3640"/><path d="M212,152 q28,-18 56,0 q-4,10 -28,10 q-24,0 -28,-10 z" fill="#4A4650"/><circle cx="240" cy="146" r="4" fill="#2A2830" stroke-width="1.4"/><path d="M218,150 q8,-8 18,-8" fill="none" stroke="#9A98A8" stroke-width="2" opacity=".6"/>';
    if (S.flags.c1_noi && !S.flags.c1_noi_xong) k += '<path d="M226,146 q4,-12 0,-24M246,144 q4,-14 0,-26" fill="none" stroke="#D8D0C0" stroke-width="3" opacity=".7"/>';
    b.prop(96, 116, 210, 100, k, 212); b.solid(100, 140, 200, 72);
    b.lights.push({ x: 160, y: 190, r: 90, flick: true }, { x: 240, y: 190, r: 90, flick: true });
    // chạn bát
    // chạn bát gỗ: hai tầng, bát đĩa xếp chồng, cửa song
    var cb = G.ve.khoi(334, 128, 80, 8, 62, G.ve.GO.nau, { van: false });
    cb += '<path d="M338,158 h72M338,178 h72" stroke="#5E3A22" stroke-width="3"/>';
    [[346, 156], [362, 156], [378, 156], [396, 156]].forEach(function (p, i) { cb += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="7" ry="2.6" fill="#E9E2D0" stroke-width="1.1"/><ellipse cx="' + p[0] + '" cy="' + (p[1] - 3) + '" rx="7" ry="2.6" fill="#F4F0E6" stroke-width="1.1"/>' + (i % 2 ? '' : '<path d="M' + (p[0] - 5) + ',' + (p[1] - 1) + ' h10" stroke="#2E4E8E" stroke-width="1.2"/>'); });
    [[344, 176], [356, 175], [372, 176], [388, 174], [402, 176]].forEach(function (p, i) { cb += '<path d="M' + (p[0] - 6) + ',' + (p[1] - 10) + ' q6,-3 12,0 l-1,10 h-10 z" fill="' + (i % 2 ? '#7A5236' : '#E2DCCC') + '" stroke-width="1.1"/>'; });
    var song = ''; for (var sx0 = 342; sx0 < 410; sx0 += 8) song += 'M' + sx0 + ',182 v12'; cb += '<path d="' + song + '" stroke="#5E3A22" stroke-width="2"/>';
    b.prop(326, 118, 100, 90, cb, 198);
    b.solid(334, 130, 80, 68);
    // bàn thờ Táo
    // bàn thờ Táo: bàn sơn son, bát hương, ba nén nhang, mũ ông Táo bằng giấy, đĩa hoa quả, đèn dầu
    var t = G.ve.khoi(460, 120, 100, 18, 32, G.ve.GO.son, { vien: VANG, van: false });
    t += '<path d="M500,128 h20 q-2,10 -10,10 q-8,0 -10,-10 z" fill="#B8862E" stroke-width="1.4"/><ellipse cx="510" cy="128" rx="10" ry="2.6" fill="#8A5A1E" stroke-width="1"/>';
    t += '<path d="M505,128 v-16M510,128 v-18M515,128 v-16" stroke="#8A2A1E" stroke-width="1.6"/><g fill="#FF8A3A" stroke="none" class="flick"><circle cx="505" cy="112" r="1.5"/><circle cx="510" cy="110" r="1.5"/><circle cx="515" cy="112" r="1.5"/></g>';
    t += '<path d="M510,108 q-4,-8 1,-14 q4,-6 0,-12" fill="none" stroke="#D8D0C0" stroke-width="1.3" opacity=".5"/>';
    t += '<path d="M474,132 l2,-14 q8,-6 16,0 l2,14 z" fill="#E8CB6A" stroke-width="1.3"/><path d="M476,124 h16" stroke="#C8301E" stroke-width="1.4"/><path d="M472,124 q-6,-2 -6,4M496,124 q6,-2 6,4" fill="none" stroke="#2B2A33" stroke-width="2"/>';
    t += '<ellipse cx="540" cy="132" rx="11" ry="3" fill="#C9CED3" stroke-width="1.2"/><circle cx="536" cy="128" r="3.4" fill="#E8A23A" stroke-width="1"/><circle cx="543" cy="127" r="3.4" fill="#C8301E" stroke-width="1"/><circle cx="540" cy="123" r="3" fill="#8AB84A" stroke-width="1"/>';
    t += G.ve.denDau(552, 134, { r: 14 });
    b.prop(452, 80, 116, 96, t, 172); b.solid(460, 120, 100, 52);
    // rổ lông chim (ngày 2)
    if (S.day >= 2 && S.flags.c1_giet_chim) b.prop(120, 300, 70, 40, '<ellipse cx="155" cy="324" rx="30" ry="12" fill="#C79A5E"/><path d="M135,318 q8,-8 14,0M150,316 q8,-10 14,0M164,318 q8,-8 12,2" fill="none" stroke="' + VANG + '" stroke-width="4"/>', 336);
    // --- phòng Đăng ---
    // chõng tre của Đăng: nan tre, chiếu, gối, chăn gấp, tráp đồ nghề để dưới chân
    var cg2 = G.ve.khoi(706, 160, 150, 50, 10, G.ve.GO.tre, { chan: 10, van: false });
    var nan = ''; for (var nx0 = 712; nx0 < 854; nx0 += 7) nan += 'M' + nx0 + ',162 v46'; cg2 += '<path d="' + nan + '" stroke="#A8823E" stroke-width="1.2"/>';
    cg2 += G.ve.chieu(716, 164, 110, 42) + G.ve.goi(720, 168, 30, 14, '#B8884A') + '<path d="M800,170 h22 v32 h-22 z" fill="#5A6A8A" stroke-width="1.6"/><path d="M800,182 h22" stroke="#3A4A6A" stroke-width="1.2"/>';
    b.prop(700, 150, 164, 84, cg2, 226);
    b.solid(706, 160, 150, 62);
    chum(b, 860, 470);
    b.prop(646, 380, 108, 64, G.ve.khoi(654, 396, 92, 16, 14, G.ve.GO.sam, { chan: 10 }) + '<ellipse cx="676" cy="400" rx="9" ry="3" fill="#E9E2D0" stroke-width="1.2"/><path d="M670,398 q6,-6 12,0" fill="#F4F0E6" stroke-width="1"/><path d="M700,402 l22,-4" stroke="#6A4A2A" stroke-width="2.4"/>', 436);
    b.solid(654, 396, 92, 34);
    // vách bếp: chuỗi tỏi ớt, muôi gáo treo, rổ rá, đèn dầu
    b.bg += ink('<path d="M90,70 v30" stroke-width="2"/>' + [0, 1, 2, 3].map(function (i) { return '<ellipse cx="90" cy="' + (84 + i * 8) + '" rx="6" ry="5" fill="#EDE6D6" stroke-width="1.5"/>'; }).join('') +
      '<path d="M312,70 v34" stroke-width="2"/>' + [0, 1, 2, 3, 4].map(function (i) { return '<path d="M' + (306 + (i % 2) * 10) + ',' + (78 + i * 6) + ' q4,8 0,14" fill="#C8241A" stroke-width="1.2"/>'; }).join('') +
      '<path d="M420,72 h120" stroke="#5A3A20" stroke-width="4"/><path d="M436,72 v16M460,72 v20M486,72 v18M512,72 v16" stroke-width="2"/><ellipse cx="436" cy="92" rx="7" ry="4" fill="#6A4A2A" stroke-width="1.5"/><ellipse cx="460" cy="96" rx="8" ry="5" fill="#C79A5E" stroke-width="1.5"/><circle cx="486" cy="96" r="7" fill="#C79A5E" stroke-width="1.5"/><path d="M508,88 h8 v10 h-8z" fill="#8A6440" stroke-width="1.5"/>' +
      '<circle cx="580" cy="90" r="16" fill="#C79A5E"/><circle cx="580" cy="90" r="10" fill="none" stroke-width="1.5"/>', 2);
    // đống củi chẻ xếp sát vách tây
    b.prop(70, 404, 70, 80, G.ve.bong(106, 474, 30, 6, .25) + [0, 1, 2, 3].map(function (r) { return [0, 1, 2].map(function (c) { var cx = 88 + c * 14 + (r % 2) * 7, cy = 466 - r * 13; return '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="#6A4A2E" stroke-width="1.6"/><circle cx="' + (cx - .6) + '" cy="' + (cy - .4) + '" r="5.4" fill="' + ((r + c) % 3 ? '#C8985A' : '#B8884A') + '" stroke="none"/><circle cx="' + cx + '" cy="' + cy + '" r="3" fill="none" stroke="#8A6030" stroke-width=".8"/><circle cx="' + cx + '" cy="' + cy + '" r=".9" fill="#6A4A2E" stroke="none"/>'; }).join(''); }).join(''), 476);
    b.solid(76, 420, 56, 56);
    // bao gạo, thúng
    b.prop(530, 450, 80, 60, '<path d="M538,500 q-6,-30 8,-44 h24 q14,14 8,44 z" fill="#D8C8A0"/><path d="M546,456 q12,-8 24,0" fill="none" stroke-width="2.5"/><path class="d" d="M548,476 h20M546,488 h24"/>' +
      '<ellipse cx="592" cy="494" rx="16" ry="7" fill="#C79A5E"/><ellipse cx="592" cy="492" rx="11" ry="4" fill="#E2C070"/>', 504);
    b.solid(536, 480, 74, 24);
    // phòng Đăng: bàn viết bùa (giấy bùa, nghiên mực, bút lông), đèn lồng treo
    b.prop(616, 270, 108, 72, G.ve.khoi(624, 296, 88, 16, 14, G.ve.GO.sam, { chan: 10 }) +
      '<g transform="translate(630,270) rotate(-76) scale(.1)">' + G.ve.bua({ chu: G.ve.BUA.truTa }) + '</g><g transform="translate(640,292) rotate(-84) scale(.1)">' + G.ve.bua({ chu: G.ve.BUA.giaiHan }) + '</g>' + // giấy bùa viết dở trên bàn
      '<ellipse cx="676" cy="300" rx="10" ry="5" fill="#2B2A33" stroke-width="1.5"/><path d="M690,302 l18,-12" stroke="#3A2A1A" stroke-width="3"/>', 334);
    b.solid(624, 296, 88, 36);
    b.bg += ink('<path d="M650,126 v-26" stroke-width="2"/><rect x="640" y="132" width="20" height="26" rx="8" fill="#C8401E" stroke-width="2"/><path d="M640,145 h20" stroke="#E2B44C" stroke-width="2"/>', 2);
    b.lights.push({ x: 700, y: 390, r: 70, flick: true });
    return b.out();
  };
})();
