// Cảnh nhìn chéo từ trên xuống, bảng màu ấm của mẫu v2. Mỗi cảnh trả về: svg nền, props (vật đứng, sắp lớp theo y),
// fg (phủ trên cùng), solids (vùng va chạm), lights (nguồn sáng ban đêm, toạ độ thế giới).
var G = window.G || (window.G = {});
G.scenes = {};

G.LOCATIONS = {
  lang_duong: { id: 'lang_duong', name: 'Đường làng', width: 960, height: 720, exits: { right: 'nha_dighe' } },
  nha_dighe:  { id: 'nha_dighe',  name: 'Nhà dì ghẻ', width: 960, height: 720, exits: { left: 'lang_duong', right: 'vuon_cau' } },
  vuon_cau:   { id: 'vuon_cau',   name: 'Vườn cau',   width: 960, height: 720, exits: { left: 'nha_dighe' } },
  ky_ruong:   { id: 'ky_ruong',   name: 'Ký ức · Ruộng tép', width: 960, height: 720, exits: {} },
  ky_gieng:   { id: 'ky_gieng',   name: 'Ký ức · Giếng sau nhà', width: 960, height: 720, exits: {} }
};

(function () {
  var INK = G.INK;
  function rect(x, y, w, h, fill, extra) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  function ink(inner, sw) { return '<g stroke="' + INK + '" stroke-width="' + (sw || 3) + '" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g>'; }
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  function B(W, H) { this.W = W; this.H = H; this.bg = ''; this.fgs = ''; this.props = []; this.solids = []; this.lights = []; }
  B.prototype.solid = function (x, y, w, h) { this.solids.push([x, y, w, h]); };
  B.prototype.prop = function (x, y, w, h, inner, z, cls, raw) {
    this.props.push({ x: x, y: y, w: w, h: h, z: z === undefined ? y + h : z,
      svg: '<svg class="prop ' + (cls || '') + '" viewBox="' + x + ' ' + y + ' ' + w + ' ' + h + '" width="' + w + '" height="' + h + '" overflow="visible">' + (raw ? inner : ink(inner)) + '</svg>' });
  };
  B.prototype.edges = function () { this.solid(-60, 0, 60, this.H); this.solid(this.W, 0, 60, this.H); this.solid(0, -40, this.W, 40); this.solid(0, this.H, this.W, 40); };
  B.prototype.out = function () {
    return { svg: '<svg class="bg" viewBox="0 0 ' + this.W + ' ' + this.H + '" width="' + this.W + '" height="' + this.H + '">' + this.bg + '</svg>',
      props: this.props, fg: '<svg viewBox="0 0 ' + this.W + ' ' + this.H + '" width="' + this.W + '" height="' + this.H + '" overflow="visible">' + this.fgs + '</svg>',
      solids: this.solids, lights: this.lights };
  };

  // ---------- đồ vật dựng sẵn ----------
  function bamboo(b, x, y, r) { // bụi tre
    b.prop(x - 90, y - 250, 180, 262, G.ve.tre(x, y, r), y, 'sway');
    b.solid(x - 34, y - 10, 68, 16);
  }
  function cau(b, x, y, h, cls) { // cây cau: thân mảnh có đốt, tàu lá kép rủ trên ngọn
    b.prop(x - 90, y - h - 60, 180, h + 72, G.ve.cau(x, y, h, rng(x * 7 + h)), y, cls || 'sway');
    b.solid(x - 7, y - 6, 14, 10);
  }
  function house(b, x, y, w, h, o) { // nhà mái rạ đóng kín (nhà hàng xóm)
    var fh = 60, s = '', r = rng(x + y), wy = y + h - fh;
    s += G.ve.maiRa(x, y, w, h - fh, r);
    // tường trình đất: loang màu, vết nứt, chân tường ẩm
    s += rect(x, wy, w, fh, '#B98C5E') + rect(x, wy, w, 12, '#3A2210', ' opacity=".35" stroke="none"') + rect(x, wy + fh - 10, w, 10, '#6A4A30', ' opacity=".35" stroke="none"');
    var nut = ''; for (var i = 0; i < 6; i++) { var nx = x + 8 + r() * (w - 16), ny = wy + 16 + r() * 30; nut += 'M' + nx.toFixed(0) + ',' + ny.toFixed(0) + ' l3,5 l-2,6 l3,4'; }
    s += '<path d="' + nut + '" fill="none" stroke-width="1.2" opacity=".45"/>';
    for (var j = 0; j < 8; j++) s += '<ellipse cx="' + (x + 10 + r() * (w - 20)).toFixed(0) + '" cy="' + (wy + 18 + r() * 34).toFixed(0) + '" rx="' + (6 + r() * 10).toFixed(0) + '" ry="' + (3 + r() * 4).toFixed(0) + '" fill="' + (j % 2 ? '#C9A070' : '#A27A4E') + '" opacity=".5" stroke="none"/>';
    // cột gỗ hai góc
    s += rect(x, wy, 7, fh, '#6A4A30') + rect(x + w - 7, wy, 7, fh, '#6A4A30');
    // cửa ván có khung
    var dx = x + w / 2 - 22;
    s += rect(dx - 4, wy + 10, 52, fh - 10, '#4A2E1C') + rect(dx, wy + 14, 44, fh - 14, '#5A3A2A');
    s += '<path d="M' + (dx + 11) + ',' + (wy + 14) + ' v' + (fh - 14) + 'M' + (dx + 22) + ',' + (wy + 14) + ' v' + (fh - 14) + 'M' + (dx + 33) + ',' + (wy + 14) + ' v' + (fh - 14) + '" stroke-width="1.2" opacity=".6"/>';
    s += rect(dx + 1, wy + 15, 3, fh - 16, '#8A6448', ' stroke="none" opacity=".7"');
    // cửa sổ song tre
    var wx = x + 20, lit = o && o.lit;
    s += rect(wx, wy + 18, 30, 22, lit ? '#E8A848' : '#2A1A12', lit ? ' class="win flick"' : ' class="win"');
    if (lit) s += '<rect x="' + (wx - 6) + '" y="' + (wy + 12) + '" width="42" height="34" fill="url(#glowY)" stroke="none" opacity=".7"/>';
    s += '<path d="M' + (wx + 6) + ',' + (wy + 18) + ' v22M' + (wx + 12) + ',' + (wy + 18) + ' v22M' + (wx + 18) + ',' + (wy + 18) + ' v22M' + (wx + 24) + ',' + (wy + 18) + ' v22" stroke="#9A7A4A" stroke-width="2.4"/>';
    s += rect(wx - 2, wy + 40, 34, 4, '#6A4A30');
    // bóng mái đổ xuống tường
    s += '<path d="M' + x + ',' + wy + ' H' + (x + w) + ' v6 H' + x + ' z" fill="#1A0E08" opacity=".3" stroke="none"/>';
    b.bg += ink(s);
    b.solid(x, y, w, h);
  }
  function rao(b, x0, x1, y) { // hàng rào tre thấp
    b.prop(x0, y - 34, x1 - x0, 40, G.ve.rao(x0, x1, y, rng(x0 + y)), y);
    b.solid(x0, y - 8, x1 - x0, 10);
  }

  // ================= ĐƯỜNG LÀNG =================
  G.scenes.lang_duong = function (S) {
    var b = new B(960, 720), r = rng(11), s = '';
    s += rect(0, 0, 960, 720, 'url(#co)');
    // ruộng lúa phía bắc
    s += rect(0, 0, 960, 250, 'url(#lua)');
    s += '<path d="M0,84 H960M0,170 H960M320,0 V250M650,0 V250" stroke="#B6A26A" stroke-width="10"/><path d="M0,84 H960M0,170 H960M320,0 V250M650,0 V250" stroke-width="1.5" opacity=".5"/>';
    s += rect(330, 92, 310, 70, 'url(#nuoc)', ' opacity=".75"');
    // đường đất
    s += rect(0, 430, 960, 130, 'url(#dat)');
    s += '<path d="M0,430 Q240,424 480,432 T960,428M0,560 Q300,566 560,556 T960,562" fill="none" stroke="#A88A5A" stroke-width="3"/>';
    // vết bánh xe bò
    s += '<path d="M0,480 Q480,470 960,486M0,510 Q480,500 960,516" fill="none" stroke="#B89A6A" stroke-width="4" opacity=".6"/>';
    // ao phía nam
    var AO = 'M40,610 Q60,580 200,590 Q380,596 420,640 Q430,710 300,716 Q100,720 50,690 Q20,650 40,610 Z';
    s += '<defs><radialGradient id="aoSau" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#1E4A50" stop-opacity=".55"/><stop offset=".7" stop-color="#2E5E60" stop-opacity=".2"/><stop offset="1" stop-color="#2E5E60" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="aoTroi" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF4D8" stop-opacity="0"/><stop offset=".5" stop-color="#FFF4D8" stop-opacity=".35"/><stop offset="1" stop-color="#FFF4D8" stop-opacity="0"/></linearGradient>' +
      '<clipPath id="aoClip"><path d="' + AO + '"/></clipPath></defs>';
    s += '<path d="' + AO + '" fill="#7A6A44" stroke="none" transform="translate(-10,-8) scale(1.04)"/>'; // bờ đất ướt
    s += '<path d="' + AO + '" fill="url(#nuoc)" stroke-width="3"/><path d="' + AO + '" fill="url(#aoSau)" stroke="none"/>';
    s += '<g clip-path="url(#aoClip)" stroke="none"><path d="M40,604 Q200,584 430,630 L430,646 Q200,604 40,622 Z" fill="#2A3A2A" opacity=".35"/>' +
      '<path d="M90,676 L360,620 L380,632 L110,690 Z" fill="url(#aoTroi)"/><path d="M130,700 L330,656 L338,662 L140,706 Z" fill="url(#aoTroi)" opacity=".6"/>' +
      '<g fill="none" stroke="#D8EEE8" stroke-width="1.3" opacity=".55"><ellipse cx="210" cy="690" rx="14" ry="4"/><ellipse cx="210" cy="690" rx="24" ry="7" opacity=".5"/><ellipse cx="370" cy="672" rx="10" ry="3"/></g></g>';
    [[160, 642, 22, 30], [250, 670, 20, 200], [322, 632, 17, 110], [112, 672, 15, 260], [204, 620, 13, 330], [292, 696, 15, 70], [372, 652, 12, 160], [140, 616, 10, 300]].forEach(function (l) { s += G.ve.laSung(l[0], l[1], l[2], l[3], r); });
    s += G.ve.hoaSung(256, 664, 11) + G.ve.hoaSung(200, 614, 8) + G.ve.hoaSung(326, 626, 7);
    var lac = ''; [[48, 606], [58, 596], [410, 628], [420, 642], [70, 690], [36, 640]].forEach(function (q) { for (var i = 0; i < 5; i++) lac += 'M' + (q[0] + i * 3) + ',' + q[1] + ' q' + (i - 2) * 2 + ',-12 ' + (i - 2) * 4 + ',-' + (16 + (i % 3) * 5); });
    s += '<path d="' + lac + '" fill="none" stroke="#4E6A30" stroke-width="2.4"/><path d="' + lac + '" fill="none" stroke="#86A650" stroke-width="1" transform="translate(-.8,0)"/>';
    b.bg += ink(s);
    b.solid(40, 600, 390, 120);
    // luỹ tre
    [40, 130, 900].forEach(function (x) { bamboo(b, x, 340, r); });
    // cổng làng: hai trụ gạch trát vôi rêu phong, mái ngói đầu đao cong, biển gỗ son khắc chữ vàng
    var gx = 250, g = '';
    g += G.ve.bong(gx - 59, 430, 26, 7, .26) + G.ve.bong(gx + 59, 430, 26, 7, .26);
    [gx - 59, gx + 59].forEach(function (cx) {
      g += rect(cx - 13, 336, 26, 94, '#D8CCB0') + rect(cx + 3, 336, 10, 94, '#9A8E74', ' stroke="none" opacity=".55"') + rect(cx - 12, 337, 4, 92, '#F2EAD6', ' stroke="none" opacity=".7"');
      g += rect(cx - 17, 418, 34, 12, '#B8AC90') + rect(cx - 16, 332, 32, 8, '#B8AC90');
      g += '<path d="M' + (cx - 11) + ',372 h22M' + (cx - 11) + ',398 h22" stroke-width="1.4" opacity=".55"/>';
      g += '<ellipse cx="' + (cx - 4) + '" cy="414" rx="8" ry="5" fill="#6E7A4A" opacity=".55" stroke="none"/><ellipse cx="' + (cx + 6) + '" cy="350" rx="4" ry="6" fill="#6E7A4A" opacity=".4" stroke="none"/>';
      g += '<path d="M' + (cx - 3) + ',360 l3,8 l-2,8" fill="none" stroke-width="1.1" opacity=".5"/>';
      g += '<path d="M' + (cx - 9) + ',332 v-12 q9,-8 18,0 v12 z" fill="#C8BCA0"/><circle cx="' + cx + '" cy="316" r="5" fill="#B8AC90"/>';
    });
    g += rect(gx - 76, 340, 152, 12, '#7A4A2A') + rect(gx - 76, 340, 152, 4, '#A06A40', ' stroke="none"');
    var mai = 'M' + (gx - 104) + ',318 Q' + (gx - 96) + ',332 ' + (gx - 80) + ',334 L' + (gx + 80) + ',334 Q' + (gx + 96) + ',332 ' + (gx + 104) + ',318 Q' + (gx + 92) + ',326 ' + (gx + 70) + ',314 L' + (gx - 70) + ',314 Q' + (gx - 92) + ',326 ' + (gx - 104) + ',318 Z';
    g += '<path d="' + mai + '" fill="#8A4A32"/>';
    var ngoi = ''; for (var nx = gx - 74; nx <= gx + 74; nx += 8) ngoi += 'M' + nx + ',315 v18';
    g += '<path d="' + ngoi + '" stroke="#5A2A1A" stroke-width="1.4"/><path d="M' + (gx - 72) + ',318 H' + (gx + 72) + '" stroke="#B87050" stroke-width="2" opacity=".7"/>';
    g += '<path d="M' + (gx - 72) + ',312 H' + (gx + 72) + '" stroke-width="5"/><path d="M' + (gx - 72) + ',312 H' + (gx + 72) + '" stroke="#A86040" stroke-width="2.4"/>';
    g += '<path d="M' + (gx - 104) + ',318 q-6,-10 2,-18 M' + (gx + 104) + ',318 q6,-10 -2,-18" fill="none" stroke-width="4"/><path d="M' + (gx - 104) + ',318 q-6,-10 2,-18 M' + (gx + 104) + ',318 q6,-10 -2,-18" fill="none" stroke="#A86040" stroke-width="1.8"/>';
    g += '<path d="M' + (gx - 8) + ',310 q8,-12 16,0 z" fill="#C89A40"/>';
    g += rect(gx - 76, 334, 152, 6, '#1A0E08', ' stroke="none" opacity=".3"');
    g += '<path d="M' + (gx - 50) + ',354 h100 l4,5 v22 l-4,5 h-100 l-4,-5 v-22 z" fill="#6A1A12"/>';
    g += '<path d="M' + (gx - 46) + ',358 h92 v24 h-92 z" fill="#8A2418" stroke="#D9A93A" stroke-width="1.6"/>';
    g += '<path d="M' + (gx - 45) + ',360 h90" stroke="#C04A30" stroke-width="1.5" opacity=".7"/>';
    b.prop(gx - 112, 296, 224, 140, g, 430);
    b.prop(gx - 50, 354, 100, 32, G.ve.chuKhac(gx, 375.5, 'LÀNG ĐÔNG', 13, { ls: .8 }), 431, '', true);
    b.solid(gx - 72, 412, 26, 20); b.solid(gx + 46, 412, 26, 20);
    // cây gạo: thân sần có gai, cành chĩa, tán nhiều lớp sáng tối, hoa đỏ rực
    var tx = 560, ty = 410, t = '', canh = 'M' + (tx - 8) + ',' + (ty - 150) + ' Q' + (tx - 40) + ',' + (ty - 180) + ' ' + (tx - 76) + ',' + (ty - 204) + 'M' + (tx + 8) + ',' + (ty - 140) + ' Q' + (tx + 46) + ',' + (ty - 170) + ' ' + (tx + 84) + ',' + (ty - 200) + 'M' + tx + ',' + (ty - 176) + ' Q' + (tx + 4) + ',' + (ty - 210) + ' ' + (tx - 6) + ',' + (ty - 240);
    t += G.ve.bong(tx + 10, ty + 2, 96, 22, .26);
    t += '<path d="' + canh + '" fill="none" stroke="' + INK + '" stroke-width="12"/><path d="' + canh + '" fill="none" stroke="#7A5A3A" stroke-width="8"/>';
    t += G.ve.than(tx, ty, 186, 26, 11, ['#8A6A4A', '#5E442C', '#B0906A'], r);
    var gai = ''; for (var gi = 0; gi < 16; gi++) { var gyy = ty - 10 - r() * 160, gxx = tx - 16 + r() * 32; gai += 'M' + gxx.toFixed(0) + ',' + gyy.toFixed(0) + ' l' + (gxx < tx ? -4 : 4) + ',-2 l' + (gxx < tx ? 3 : -3) + ',4'; }
    t += '<path d="' + gai + '" fill="#6A4A2E" stroke-width="1"/>';
    t += G.ve.tan(tx - 60, ty - 222, 70, 50, r, G.ve.LA.dam) + G.ve.tan(tx + 64, ty - 218, 66, 48, r, G.ve.LA.dam) + G.ve.tan(tx, ty - 262, 92, 62, r, G.ve.LA.xanh);
    // hoa gạo: năm cánh dày đỏ, nhuỵ vàng, mọc thành chùm trên mặt tán
    var hoa = ['', ''], nhuy = '';
    for (var j = 0; j < 46; j++) {
      var hx = tx - 130 + r() * 260, hy = ty - 310 + r() * 130, dx0 = (hx - tx) / 140, dy0 = (hy - (ty - 250)) / 70;
      if (dx0 * dx0 + dy0 * dy0 > 1) continue;
      var hr = 4.6 + r() * 2.4, rot = r() * 6.28, k5 = '';
      for (var pc = 0; pc < 5; pc++) { var pa = rot + pc * 1.2566, px2 = hx + Math.cos(pa) * hr, py2 = hy + Math.sin(pa) * hr * .8; k5 += 'M' + hx.toFixed(1) + ',' + hy.toFixed(1) + ' Q' + (px2 + Math.cos(pa + 1) * hr * .6).toFixed(1) + ',' + (py2 + Math.sin(pa + 1) * hr * .6).toFixed(1) + ' ' + px2.toFixed(1) + ',' + py2.toFixed(1) + ' Q' + (px2 + Math.cos(pa - 1) * hr * .6).toFixed(1) + ',' + (py2 + Math.sin(pa - 1) * hr * .6).toFixed(1) + ' ' + hx.toFixed(1) + ',' + hy.toFixed(1) + 'Z'; }
      hoa[hy < ty - 260 && hx < tx + 30 ? 1 : 0] += k5;
      nhuy += '<circle cx="' + hx.toFixed(1) + '" cy="' + hy.toFixed(1) + '" r="1.5" />';
    }
    t += '<path d="' + hoa[0] + '" fill="#D0301E" stroke-width=".9"/><path d="' + hoa[1] + '" fill="#F2603A" stroke-width=".9"/><g fill="#F2C040" stroke="none">' + nhuy + '</g>';
    b.prop(tx - 180, ty - 340, 360, 360, t, ty, 'sway');
    b.solid(tx - 24, ty - 12, 48, 18);
    // hoa gạo rụng dưới gốc
    var fl = ''; for (var k = 0; k < 18; k++) { var fx = tx - 100 + r() * 200, fy = ty + 4 + r() * 46; fl += '<g transform="rotate(' + Math.floor(r() * 360) + ' ' + fx.toFixed(0) + ' ' + fy.toFixed(0) + ')"><path d="M' + fx.toFixed(0) + ',' + fy.toFixed(0) + ' q-5,-4 -3,-7 q3,-1 3,3 q0,-5 4,-4 q2,4 -4,8 z" fill="' + (k % 3 ? '#C9302A' : '#8A2418') + '" stroke-width="1"/></g>'; }
    b.bg += ink(fl, 1.5);
    // quán nước của ông lão: mái rạ trên cột tre, chõng tre, ấm sành, chén, nải chuối, chum nước
    var qx = 820, q = '';
    q += G.ve.bong(qx, 418, 84, 12, .24);
    [qx - 58, qx + 54].forEach(function (cx) { q += rect(cx - 4, 330, 8, 92, '#9A7A44') + rect(cx - 3, 331, 2.5, 90, '#C8A86C', ' stroke="none"') + '<path d="M' + (cx - 4) + ',360 h8M' + (cx - 4) + ',392 h8" stroke-width="1.2"/>'; });
    var maiq = 'M' + (qx - 82) + ',340 L' + (qx - 10) + ',298 L' + (qx + 10) + ',298 L' + (qx + 82) + ',340 Q' + qx + ',348 ' + (qx - 82) + ',340 Z';
    q += '<path d="' + maiq + '" fill="url(#ra)"/><path d="M' + (qx + 4) + ',300 L' + (qx + 82) + ',340 Q' + (qx + 40) + ',346 ' + (qx + 4) + ',345 Z" fill="#3A2210" opacity=".25" stroke="none"/>';
    var tq = ''; for (var ti = qx - 80; ti < qx + 80; ti += 5) tq += 'M' + ti + ',' + (343 - Math.abs(ti - qx) * .04).toFixed(0) + ' l1,' + (4 + (ti % 3) * 2);
    q += '<path d="' + tq + '" stroke="#B08A44" stroke-width="1.8"/><path d="M' + (qx - 12) + ',298 h24" stroke-width="5"/><path d="M' + (qx - 12) + ',298 h24" stroke="#8A6A34" stroke-width="2.5"/>';
    q += '<path d="M' + (qx - 82) + ',342 Q' + qx + ',350 ' + (qx + 82) + ',342 v5 Q' + qx + ',356 ' + (qx - 82) + ',347 z" fill="#1A0E08" opacity=".22" stroke="none"/>';
    q += rect(qx - 46, 384, 92, 20, '#C8A462') + '<path d="M' + (qx - 46) + ',390 h92M' + (qx - 46) + ',396 h92" stroke="#9A7A40" stroke-width="1.2"/>' + rect(qx - 46, 384, 92, 3, '#E8CC8A', ' stroke="none"');
    q += '<path d="M' + (qx - 42) + ',404 v14M' + (qx + 42) + ',404 v14" stroke-width="4"/>';
    q += '<path d="M' + (qx - 36) + ',384 q-4,-14 6,-16 h8 q10,2 6,16 z" fill="#5A3A2A"/><path d="M' + (qx - 20) + ',376 q6,-2 8,-8" fill="none" stroke-width="2.5"/><ellipse cx="' + (qx - 28) + '" cy="368" rx="5" ry="2" fill="#3A2418"/><path d="M' + (qx - 32) + ',374 q2,-4 4,-4" stroke="#8A6A5A" stroke-width="1.4" fill="none"/>';
    [[-10, 382], [0, 383], [10, 382]].forEach(function (c) { q += '<path d="M' + (qx + c[0] - 4) + ',' + (c[1] - 5) + ' h8 l-1.5,5 h-5 z" fill="#E9E2D0" stroke-width="1.3"/>'; });
    q += '<path d="M' + (qx + 20) + ',382 q4,-12 10,-14 q2,6 -2,14 M' + (qx + 26) + ',383 q4,-12 10,-13 q2,6 -2,13 M' + (qx + 32) + ',384 q4,-10 9,-11 q2,6 -2,11" fill="#E8C83A" stroke-width="1.4"/>';
    q += '<path d="M' + (qx + 60) + ',404 q-6,12 0,18 h20 q6,-6 0,-18 z" fill="#7A5236"/><ellipse cx="' + (qx + 70) + '" cy="404" rx="10" ry="3.4" fill="#2E4A4A"/>';
    b.prop(qx - 90, 290, 180, 136, q, 420);
    b.solid(qx - 60, 400, 120, 22);
    // đống rơm
    b.prop(650, 540, 140, 132, G.ve.rom(720, 662, 54, 84, r), 660); b.solid(668, 640, 104, 22);
    rao(b, 470, 640, 630);
    b.edges();
    b.lights.push({ x: 800, y: 380, r: 90, flick: true });
    return b.out();
  };

  // ================= NHÀ DÌ GHẺ =================
  G.scenes.nha_dighe = function (S) {
    var b = new B(960, 720), r = rng(29), s = '';
    var X = 140, Y = 60, W = 680, H = 290, WALL = '#6A4A30', TOP = '#4A3222';
    s += rect(0, 0, 960, 720, 'url(#dat)');
    s += rect(110, 380, 740, 240, 'url(#san)');
    s += '<path d="M110,380 H850 V620 H110 Z" fill="none" stroke-width="3"/>';
    // nền nhà và ba gian
    s += rect(X, Y, W, H, 'url(#vangoc)');
    s += rect(X + 14, Y + 44, W - 28, 14, INK, ' opacity=".25"');
    s += rect(X, Y, W, 44, '#8A6440') + rect(X, Y, W, 10, TOP);
    s += '<path d="M' + X + ',' + (Y + 26) + ' H' + (X + W) + '" stroke-width="2" opacity=".6"/>';
    // mái rạ phủ dải phía bắc
    s += G.ve.maiRa(X - 20, Y - 46, W + 40, 50, r) + rect(X - 20, Y + 4, W + 40, 10, '#1A0E08', ' stroke="none" opacity=".28"');
    s += rect(X, Y, 14, H, WALL) + rect(X + W - 14, Y, 14, H, WALL);
    b.solid(X, Y - 46, W, 102); b.solid(X, Y, 14, H); b.solid(X + W - 14, Y, 14, H);
    // vách ngăn
    [360, 600].forEach(function (px) { s += rect(px - 6, Y + 44, 12, H - 44, WALL); b.solid(px - 6, Y + 44, 12, H - 44); });
    // tường nam có cửa
    var doors = [[220, 296], [430, 530], [670, 740]], cur = X;
    doors.concat([[X + W, X + W]]).forEach(function (d) {
      if (d[0] > cur) { s += rect(cur, Y + H - 14, d[0] - cur, 14, WALL); b.solid(cur, Y + H - 14, d[0] - cur, 14); }
      cur = d[1];
    });
    // hiên: cột gỗ
    [X + 6, 360, 600, X + W - 6].forEach(function (px) { s += '<circle cx="' + px + '" cy="' + (Y + H + 6) + '" r="7" fill="#5A3A2A"/>'; b.solid(px - 7, Y + H, 14, 12); });
    b.bg += ink(s);

    // --- gian thờ ---
    var a = '';
    // câu đối son hai bên
    [404, 548].forEach(function (cx) { a += rect(cx - 9, 66, 18, 80, '#8A1A12') + '<path d="M' + cx + ',74 v6M' + (cx - 4) + ',88 h8M' + cx + ',96 v8M' + (cx - 4) + ',112 h8M' + cx + ',120 v8M' + (cx - 4) + ',134 h8" stroke="#E2B44C" stroke-width="2"/>'; });
    // án thư sơn son thếp vàng
    a += G.ve.khoi(420, 100, 120, 46, 30, G.ve.GO.son, { chan: 14, ngan: 3, vien: '#D9A93A', van: false });
    a += '<path d="M424,106 h112M424,140 h112" stroke="#D9A93A" stroke-width="1.6"/>';
    // bài vị: khám gỗ nhỏ, bài vị son chữ vàng
    a += '<path d="M458,104 V74 Q480,58 502,74 V104 Z" fill="#5A2016"/><path d="M466,102 V78 Q480,68 494,78 V102 Z" fill="#9A2418"/>';
    a += '<path d="M480,78 v4M476,86 h8M480,88 v6M476,96 h8" stroke="#E8C060" stroke-width="2"/>';
    // bát hương đồng, ba nén nhang đỏ đầu
    a += '<path d="M466,122 h28 q-2,12 -14,12 q-12,0 -14,-12 z" fill="#B8862E"/><ellipse cx="480" cy="122" rx="14" ry="3.5" fill="#8A5A1E"/>';
    a += '<path d="M475,122 v-13M480,122 v-15M485,122 v-13" stroke="#8A2A1E" stroke-width="1.8"/><circle cx="475" cy="109" r="1.6" fill="#FF8A3A" stroke="none" class="flick"/><circle cx="480" cy="107" r="1.6" fill="#FF8A3A" stroke="none" class="flick"/><circle cx="485" cy="109" r="1.6" fill="#FF8A3A" stroke="none" class="flick"/>';
    a += '<path d="M480,104 q-4,-8 0,-14 q4,-6 0,-12" fill="none" stroke="#D8D0C0" stroke-width="1.5" opacity=".55"/>';
    // đèn dầu hai bên
    [436, 524].forEach(function (x) { a += '<path d="M' + (x - 6) + ',130 h12 l-2,-12 h-8 z" fill="#C8963A" stroke-width="1.8"/><path d="M' + x + ',118 q-3,-6 0,-11 q3,5 0,11" fill="#FFB040" class="flick" stroke-width="1"/>'; });
    // mâm quả héo (trái) và buồng cau tươi rói (phải)
    a += '<ellipse cx="448" cy="112" rx="13" ry="4" fill="#C9CED3" stroke-width="1.8"/><circle cx="443" cy="108" r="4" fill="#8A6A3A" stroke-width="1.5"/><circle cx="452" cy="107" r="4" fill="#7A5A2E" stroke-width="1.5"/><circle cx="448" cy="103" r="3.5" fill="#6A5A3A" stroke-width="1.5"/>';
    a += '<ellipse cx="512" cy="112" rx="13" ry="4" fill="#C9CED3" stroke-width="1.8"/>' + [[506, 106], [512, 104], [518, 106], [509, 100], [515, 100], [512, 95]].map(function (q) { return '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="3.2" ry="4" fill="#8AB84A" stroke-width="1.3"/>'; }).join('');
    a += '<path d="M434,148 q14,6 28,0M500,150 q14,4 28,0" fill="none" stroke="#C9A23A" stroke-width="2"/>';
    b.prop(414, 64, 132, 130, a, 190);
    b.solid(418, 100, 124, 92);
    b.lights.push({ x: 436, y: 112, r: 70, flick: true }, { x: 524, y: 112, r: 70, flick: true });
    // --- buồng của Tấm: giường tre bốn chân, chiếu hoa, màn vén ---
    var g = '';
    g += G.ve.khoi(196, 110, 128, 64, 10, G.ve.GO.tre, { chan: 8, van: false });
    for (var gy = 116; gy < 172; gy += 6) g += '<path d="M200,' + gy + ' H320" stroke="#B08A48" stroke-width="1.2"/>';
    g += '<path d="M214,122 h92v48h-92z" fill="none" stroke="#A8352B" stroke-width="2"/><path d="M220,128 l12,12l-12,12M300,128 l-12,12l12,12" fill="none" stroke="#A8352B" stroke-width="1.5"/>';
    g += rect(196, 104, 128, 10, '#9A7A4A');

    // màn tuyn vén lên, buộc túm hai đầu
    g += '<path d="M196,104 Q230,92 260,100 Q292,92 324,104 L324,112 Q292,102 260,108 Q230,102 196,112 Z" fill="#EDE8DA" opacity=".9" stroke-width="1.8"/><path d="M198,108 q-6,10 -2,20M322,108 q6,10 2,20" fill="none" stroke="#EDE8DA" stroke-width="5"/>';
    g += '<path d="M206,116 h30 v16 h-30 z" fill="#E9E2D0" stroke-width="2"/><path d="M210,120 h22" stroke="#A8352B" stroke-width="1.5"/>';
    g += '<path d="M244,124 q30,-6 60,6 l-6,40 q-26,-6 -50,-4 z" fill="#8A7A9A" stroke-width="2"/><path d="M250,140 q22,-2 46,4" fill="none" stroke="#6A5A7A" stroke-width="1.5"/>';
    b.prop(190, 100, 140, 96, g, 192);
    b.solid(194, 104, 132, 86);
    // hòm gỗ có khoá đồng
    b.prop(154, 222, 72, 58, G.ve.khoi(162, 234, 54, 12, 24, G.ve.GO.sam) + '<path d="M170,234 v36M208,234 v36" stroke="#3A2414" stroke-width="2.4"/><path d="M170,234 v36M208,234 v36" stroke="#9A7A4A" stroke-width=".8" opacity=".6"/><rect x="184" y="246" width="10" height="11" rx="1.5" fill="#C8963A" stroke-width="1.4"/><circle cx="189" cy="251" r="1.6" fill="#2B1F1A" stroke="none"/><path d="M186,246 q3,-5 6,0" fill="none" stroke="#C8963A" stroke-width="1.6"/>', 270); b.solid(160, 236, 58, 34);
    // --- bếp ---
    var k = '';
    k += '<ellipse cx="700" cy="182" rx="46" ry="19" fill="#3A2A20"/><ellipse cx="700" cy="184" rx="30" ry="10" fill="#5A3A28"/>';
    k += '<ellipse cx="700" cy="186" rx="16" ry="5" fill="#E8701A" opacity=".8" stroke="none" class="flick"/><circle cx="692" cy="186" r="2" fill="#FFD080" stroke="none" class="flick"/><circle cx="708" cy="187" r="1.6" fill="#FFD080" stroke="none" class="flick"/>';
    [[680, 178], [716, 176], [698, 194]].forEach(function (p) { k += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="8" ry="6" fill="#9A8A7A" stroke-width="2"/>'; });
    k += '<path d="M676,168 Q700,150 724,168 Q724,184 700,186 Q676,184 676,168 Z" fill="#6A4A3A"/><ellipse cx="700" cy="166" rx="24" ry="6" fill="#3A2A22"/><path d="M684,162 q16,-6 32,0" fill="none" stroke="#8A6A5A" stroke-width="1.5"/>';
    k += '<path d="M690,150 q4,-10 0,-20M704,148 q4,-12 0,-22" fill="none" stroke="#D8D0C0" stroke-width="2" opacity=".6"/>';
    // bó củi dựng cạnh bếp
    k += '<path d="M660,196 l10,-36M666,198 l12,-38M672,198 l8,-36" stroke="#8A6A3A" stroke-width="5"/><path d="M658,186 h22" stroke="#5A3A20" stroke-width="2"/>';
    b.prop(650, 126, 100, 80, k, 196); b.solid(656, 160, 88, 36);
    // rổ rá treo vách bếp
    b.bg += ink('<circle cx="690" cy="84" r="11" fill="#C79A5E"/><circle cx="690" cy="84" r="6" fill="none" stroke-width="1.5"/><circle cx="716" cy="82" r="9" fill="#B8884A"/><path d="M686,92 l-2,4M712,90 l-2,4" stroke-width="1.5"/><path d="M740,78 h16 v14 h-16 z" fill="#A8352B" stroke-width="1.8"/>', 2);
    b.lights.push({ x: 700, y: 180, r: 80, flick: true });
    var ch = '<ellipse cx="780" cy="150" rx="26" ry="22" fill="#8A5A3A"/><path class="s" d="M792,132 q16,14 6,36 q-6,6 -14,8 q14,-20 8,-44 z"/><ellipse cx="780" cy="134" rx="20" ry="7" fill="#3A5A5A"/><path class="d" d="M760,154 q20,8 40,0"/>' +
      '<ellipse cx="786" cy="132" rx="9" ry="4" fill="#6A4A2A" stroke-width="1.8"/><path d="M793,131 l12,-10" stroke="#5A3A20" stroke-width="3"/>';
    b.prop(750, 110, 60, 70, ch, 172); b.solid(756, 132, 50, 40);
    // giỏ tép treo trên vách bếp
    var gt = '<path d="M640,74 v12" stroke-width="2"/><path d="M626,86 h28 l-4,26 h-20 z" fill="#C79A5E"/><path class="d" d="M628,94 h24M629,102 h22"/>' +
      '<path d="M626,86 Q640,72 654,86" fill="none" stroke-width="2.5"/>';
    if (S.phase === 'dem' && !S.flags.ky1_done) gt += '<circle cx="640" cy="98" r="26" fill="url(#glowY)" stroke="none" class="glowpulse"/>';
    b.prop(620, 70, 40, 46, gt, 120);
    // chạn bát
    b.prop(606, 222, 66, 62, G.ve.khoi(614, 232, 50, 6, 40, G.ve.GO.nau, { van: false }) + '<path d="M617,252 h44M617,264 h44" stroke="#5E3A22" stroke-width="2.4"/>' +
      [620, 632, 644, 656].map(function (x, i) { return '<ellipse cx="' + (x + 2) + '" cy="248" rx="5" ry="2.6" fill="#E9E2D0" stroke-width="1.3"/><ellipse cx="' + (x + 2) + '" cy="245" rx="5" ry="2.6" fill="#F2EEE4" stroke-width="1.3"/>' + (i % 2 ? '' : '<path d="M' + (x - 2) + ',258 h10" stroke="#3A5A9A" stroke-width="2"/>'); }).join(''), 276);
    b.solid(614, 238, 50, 38);

    // --- sân ---
    // cối đá giã gạo và chày
    b.prop(160, 492, 60, 50, '<ellipse cx="190" cy="532" rx="24" ry="8" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M170,506 h40 l-4,26 h-32 z" fill="#9A9488"/><ellipse cx="190" cy="506" rx="20" ry="6" fill="#B8B2A6"/><ellipse cx="190" cy="507" rx="12" ry="3.4" fill="#5A544A"/><path d="M204,500 l20,-30" stroke="#8A6A3A" stroke-width="6"/>', 534);
    b.solid(170, 516, 40, 18);
    // nong phơi thóc (đi qua được)
    var ng = '<ellipse cx="330" cy="596" rx="52" ry="18" fill="#C79A5E"/><ellipse cx="330" cy="594" rx="44" ry="14" fill="#E2C070"/>';
    for (var n2 = 0; n2 < 26; n2++) ng += '<circle cx="' + (296 + r() * 68).toFixed(0) + '" cy="' + (586 + r() * 16).toFixed(0) + '" r="1.4" fill="#B8862E" stroke="none"/>';
    b.bg += ink(ng, 2);
    // chum tương ở góc hiên
    b.prop(824, 352, 70, 46, '<ellipse cx="846" cy="390" rx="16" ry="5" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M834,368 q-6,14 0,22 h24 q6,-8 0,-22 z" fill="#6A4A30"/><ellipse cx="846" cy="368" rx="12" ry="4" fill="#3A2A20"/><rect x="838" y="360" width="16" height="6" fill="#C9B48A" stroke-width="1.5"/>' +
      '<path d="M866,372 q-4,10 0,18 h18 q4,-8 0,-18 z" fill="#7A5236"/><ellipse cx="875" cy="372" rx="9" ry="3" fill="#3A2A20"/>', 392);
    b.solid(832, 368, 56, 22);
    // chổi rơm dựng cột
    b.bg += ink('<path d="M826,352 l-6,-60" stroke="#8A6A3A" stroke-width="4"/><path d="M822,354 l-10,24 h18 z" fill="#D9B860" stroke-width="2"/>', 2);
    // chõng tre (chỗ Đăng ngủ)
    var cgd = G.ve.khoi(704, 418, 100, 34, 8, G.ve.GO.tre, { chan: 8, van: false }), nan2 = '';
    for (var nx2 = 710; nx2 < 802; nx2 += 6) nan2 += 'M' + nx2 + ',420 v30';
    cgd += '<path d="' + nan2 + '" stroke="#A8823E" stroke-width="1.1"/>' + G.ve.goi(708, 422, 24, 11, '#B8884A');
    b.prop(696, 404, 116, 72, cgd, 466);
    b.solid(704, 418, 100, 46);
    // mâm lễ (bàn thấp giữa sân)
    var mm = G.ve.bong(482, 500, 56, 9, .24) + '<path d="M440,486 q-4,8 2,14M520,486 q4,8 -2,14M462,492 q-2,6 2,10M498,492 q2,6 -2,10" fill="none" stroke="' + INK + '" stroke-width="5"/><path d="M440,486 q-4,8 2,14M520,486 q4,8 -2,14M462,492 q-2,6 2,10M498,492 q2,6 -2,10" fill="none" stroke="#6A2418" stroke-width="2.6"/>' +
      '<ellipse cx="480" cy="482" rx="56" ry="17" fill="#5A1A10"/><ellipse cx="480" cy="478" rx="56" ry="16" fill="#8A2A1E"/><ellipse cx="480" cy="477" rx="48" ry="12.5" fill="#A0503A"/><ellipse cx="480" cy="477" rx="44" ry="10.5" fill="none" stroke="#D9A93A" stroke-width="1.4"/><path d="M446,472 q20,-8 44,-8" fill="none" stroke="#E8A080" stroke-width="2" opacity=".6"/>';
    if (S.flags.mam_done) mm += '<circle cx="468" cy="472" r="6" fill="#D9A93A" stroke-width="1.5"/><circle cx="492" cy="472" r="6" fill="#C9473A" stroke-width="1.5"/><path d="M480,474 v-14" stroke="#B84A3E" stroke-width="2"/>';
    b.prop(420, 450, 120, 56, mm, 498); b.solid(426, 464, 108, 34);
    // chuồng gà
    var cg = rect(850, 440, 80, 60, '#A07A4A') + '<path class="d" d="M850,452 h80M850,464 h80M850,476 h80M862,440 v60M878,440 v60M894,440 v60M910,440 v60"/>' +
      '<path d="M844,442 L890,418 L936,442 Z" fill="url(#ra)"/>';
    b.prop(840, 414, 100, 92, cg, 500); b.solid(848, 446, 84, 56);
    // giếng cũ đã lấp (gò đất có đá)
    var gl;
    if (S._kyGieng) { // ký ức: giếng còn mở, thành giếng gạch, mặt nước tối
      gl = '<ellipse cx="70" cy="300" rx="40" ry="22" fill="#9A8A7A"/><ellipse cx="70" cy="296" rx="30" ry="14" fill="#1E2A2A"/>' +
        '<path class="d" d="M34,300 q36,16 72,0"/>' + (S.mem && S.mem.mau ? '<ellipse cx="70" cy="298" rx="12" ry="5" fill="#8A1A12" stroke="none"/>' : '');
    } else {
      gl = '<ellipse cx="70" cy="300" rx="40" ry="20" fill="#8A7A5A"/><ellipse cx="70" cy="296" rx="30" ry="12" fill="#6A5A3A"/>';
      [[44, 298], [96, 300], [60, 314], [84, 312], [70, 284]].forEach(function (p) { gl += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="6" fill="#B0A898" stroke-width="2"/>'; });
    }
    b.prop(26, 276, 90, 44, gl, 318); b.solid(32, 284, 76, 32);
    // cây khế góc sân
    var tk = '<ellipse cx="74" cy="560" rx="48" ry="11" fill="' + INK + '" opacity=".22" stroke="none"/>' +
      '<path d="M60,560 Q64,520 66,490 Q50,470 40,452 L48,448 Q60,466 70,476 Q74,456 86,440 L94,446 Q82,464 80,486 Q82,520 88,560 Z" fill="#7A5A3A"/><path d="M70,540 q4,-14 2,-28M78,520 q4,-10 2,-20" fill="none" stroke-width="1.5" opacity=".6"/>';
    tk += G.ve.tan(74, 428, 66, 46, r, G.ve.LA.xanh);
    [[50, 448], [96, 430], [76, 462], [110, 456], [36, 420]].forEach(function (q) { tk += '<path d="M' + q[0] + ',' + (q[1] - 8) + ' l3,8 l-3,8 l-3,-8 z" fill="#E8C83A" stroke-width="1.5"/><path d="M' + (q[0] - 4) + ',' + q[1] + ' h8" stroke-width="1"/>'; });
    b.prop(0, 360, 150, 210, tk, 560, 'sway'); b.solid(60, 548, 28, 14);
    // hàng cau mé phải (thấy lối sang vườn cau)
    cau(b, 920, 330, 230); cau(b, 940, 640, 220);
    rao(b, 110, 400, 650); rao(b, 560, 850, 650);
    // dấu chân ướt từ giếng lấp vào buồng của Tấm (chỉ hiện khi soi bát nước)
    var fp = '';
    [[96, 320], [120, 340], [140, 362], [166, 376], [190, 372], [214, 362], [238, 352], [258, 336]].forEach(function (p, i) {
      fp += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="5" ry="8" fill="#9FF0F0" transform="rotate(' + (i % 2 ? 30 : -10) + ' ' + p[0] + ' ' + p[1] + ')"/>';
    });
    b.fgs += '<g class="hid">' + fp + '<path d="M630,92 l4,10 l4,-10 l4,10 M646,92 l2,12" stroke="#9FF0F0" stroke-width="3" fill="none"/></g>';
    b.edges();
    b.solid(0, 0, 960, 36);
    b.lights.push({ x: 480, y: 476, r: S.flags.mam_done ? 70 : 0 });
    return b.out();
  };

  // ================= VƯỜN CAU =================
  G.scenes.vuon_cau = function (S) {
    var b = new B(960, 720), r = rng(47), s = '';
    // nền cỏ rậm dưới tán cau, sẫm hơn bãi cỏ ngoài làng, loang mảng tối dưới gốc
    s += rect(0, 0, 960, 720, 'url(#co)', ' stroke="none"') + rect(0, 0, 960, 720, '#3E4A26', ' stroke="none" opacity=".28"');
    for (var lo = 0; lo < 16; lo++) s += '<ellipse cx="' + (r() * 960).toFixed(0) + '" cy="' + (r() * 720).toFixed(0) + '" rx="' + (50 + r() * 70).toFixed(0) + '" ry="' + (18 + r() * 22).toFixed(0) + '" fill="' + (lo % 3 ? '#2E3A1C' : '#A8B870') + '" opacity="' + (lo % 3 ? .16 : .14) + '" stroke="none"/>';
    // bẹ cau khô và tàu lá rụng nằm rải rác
    for (var be = 0; be < 9; be++) {
      var bx = 40 + r() * 880, by = 80 + r() * 600, ba = Math.floor(r() * 360);
      if (Math.abs(bx - 480) < 120 && Math.abs(by - 460) < 110) continue;
      var tl = 'M' + bx.toFixed(0) + ',' + by.toFixed(0) + ' q30,-8 64,2', la = '';
      for (var t2 = 0; t2 < 9; t2++) { var lx = bx + 8 + t2 * 6.5; la += 'M' + lx.toFixed(0) + ',' + (by - 1 + t2 * .2).toFixed(0) + ' l-4,-9 M' + lx.toFixed(0) + ',' + (by + t2 * .2).toFixed(0) + ' l-3,9'; }
      s += '<g transform="rotate(' + ba + ' ' + bx.toFixed(0) + ' ' + by.toFixed(0) + ')"><path d="M' + (bx - 6).toFixed(0) + ',' + (by - 4).toFixed(0) + ' q-8,4 2,10 q10,-2 8,-8 z" fill="#B89A5A" stroke-width="1.4"/><path d="' + tl + '" fill="none" stroke="#9A7E46" stroke-width="2.6"/><path d="' + la + '" stroke="' + (be % 2 ? '#A88E52' : '#8E7A44') + '" stroke-width="1.6"/></g>';
    }
    // lối mòn từ nhà sang: mép đất sẫm, lòng lối sáng, sỏi và vết chân
    s += '<path d="M0,520 Q200,500 360,480 Q440,470 470,452" fill="none" stroke="#7A6440" stroke-width="44" stroke-linecap="round" opacity=".55"/>';
    s += '<path d="M0,520 Q200,500 360,480 Q440,470 470,452" fill="none" stroke="#B89A6A" stroke-width="34" stroke-linecap="round"/><path d="M0,516 Q200,496 360,476 Q440,466 468,450" fill="none" stroke="#D2B886" stroke-width="12" stroke-linecap="round" opacity=".55"/>';
    var soi = ''; for (var sq = 0; sq < 26; sq++) { var tt = r(), px = tt * 470, py = 520 - tt * 68 + (r() - .5) * 26; soi += '<ellipse cx="' + px.toFixed(0) + '" cy="' + py.toFixed(0) + '" rx="' + (1.5 + r() * 2.5).toFixed(1) + '" ry="1.6" fill="' + (sq % 2 ? '#8E7A58' : '#E2D2AE') + '" stroke="none"/>'; }
    s += soi;
    // đất mới đắp quanh gốc cau của Tấm: ụ đất sẫm, cục đất vỡ, vết thuổng
    s += '<ellipse cx="484" cy="446" rx="72" ry="30" fill="#2A1A0E" opacity=".25" stroke="none"/><ellipse cx="480" cy="440" rx="64" ry="26" fill="#5E4026" stroke-width="3"/><ellipse cx="476" cy="434" rx="46" ry="16" fill="#7A5A3A" stroke="none"/><ellipse cx="470" cy="430" rx="26" ry="8" fill="#94744E" stroke="none" opacity=".7"/>';
    var cuc = ''; for (var cd = 0; cd < 16; cd++) { var ca = r() * 6.28, cr = .5 + r() * .45; cuc += '<ellipse cx="' + (480 + Math.cos(ca) * 60 * cr).toFixed(0) + '" cy="' + (440 + Math.sin(ca) * 24 * cr).toFixed(0) + '" rx="' + (3 + r() * 4).toFixed(1) + '" ry="' + (2 + r() * 2).toFixed(1) + '" fill="' + (cd % 2 ? '#4A321E' : '#8A6A44') + '" stroke-width="1"/>'; }
    s += cuc + '<path d="M430,428 l14,-4M520,452 l12,2M500,420 l10,-6" stroke="#3A2414" stroke-width="2" opacity=".6"/>';
    if (S.flags.found_riu) s += '<ellipse cx="462" cy="438" rx="16" ry="8" fill="#B89A6A" stroke-width="2"/><path d="M452,436 l8,-4 l6,6 l8,-6" fill="none" stroke="#5A1A12" stroke-width="2.5"/>';
    if (S.flags.le_done) s += '<g transform="translate(490,420) rotate(14) scale(.11)">' + G.ve.bua({ chu: G.ve.BUA.tranVong, cu: true }) + '</g><path d="M482,450 q12,-6 26,0" fill="#5E4026" stroke-width="2"/>'; // lá bùa trấn chôn ở gốc cau, lộ một nửa khỏi đất
    // chiếu cói chỗ đặt lễ
    s += G.ve.bong(482, 548, 74, 10, .2) + G.ve.chieu(414, 520, 134, 50);
    b.bg += ink(s);
    // hàng cau
    for (var row = 0; row < 4; row++) for (var col = 0; col < 7; col++) {
      var cx = 70 + col * 140 + (row % 2) * 60, cy = 150 + row * 170;
      if (Math.abs(cx - 480) < 150 && Math.abs(cy - 440) < 130) continue;
      if (cy > 480 && cx < 260 && cy < 560) continue; // chừa lối vào
      cau(b, cx, cy, 200 + r() * 70);
    }
    if (S._kyCau) { cau(b, 480, 452, 330, ''); b.lights.push({ x: 0, y: 0, r: 0 }); } else {
    // gốc cau cũ: gốc cụt
    var st = G.ve.bong(462, 441, 16, 5, .3) + '<path d="M450,440 v-12 h24 v12 q-12,4 -24,0 z" fill="#9A9078"/><path d="M466,428 h8 v12 q-4,1.5 -8,1.5 z" fill="#6E6656" stroke="none" opacity=".6"/><path d="M450,432 q12,3 24,0M450,436 q12,3 24,0" fill="none" stroke-width="1" opacity=".5"/>' +
      '<ellipse cx="462" cy="428" rx="12" ry="5" fill="#D8C8A4"/><ellipse cx="462" cy="428" rx="7.5" ry="3" fill="none" stroke="#A89470" stroke-width="1"/><ellipse cx="462" cy="428" rx="3.5" ry="1.4" fill="none" stroke="#A89470" stroke-width="1"/>' +
      '<path d="M478,440 l6,-3 l1,4 z M444,442 l-5,-2 l1,4 z M472,444 l5,1 l-2,3 z" fill="#E2D2AE" stroke-width=".8"/>';
    if (S.flags.found_riu) st += '<path d="M454,432 l6,4 l-4,6" fill="none" stroke="#5A1A12" stroke-width="2"/>';
    b.prop(446, 420, 32, 26, st, 444);
    // cây cau non trồng vội
    var sap = '';
    var sx = 505, sy = 446, sh = 190;
    if (!S.flags.cau_rung) sap += G.ve.cau(sx, sy, sh, rng(91));
    else {
      // cau đã rụng hết quả: thân trơ, tàu lá gãy gập rủ xuống, ngả vàng
      sap += G.ve.bong(sx, sy, 22, 6, .25) + '<path d="M' + (sx - 4) + ',' + sy + ' L' + (sx - 2) + ',' + (sy - sh) + ' L' + (sx + 2) + ',' + (sy - sh) + ' L' + (sx + 4) + ',' + sy + ' Z" fill="#A49A82"/>';
      var dt = ''; for (var kd = 12; kd < sh; kd += 11) dt += 'M' + (sx - 3.6) + ',' + (sy - kd) + ' q3.6,2 7.2,0'; sap += '<path d="' + dt + '" fill="none" stroke-width="1.1" opacity=".7"/>';
      sap += '<path d="M' + sx + ',' + (sy - sh) + ' q-14,4 -16,30 M' + sx + ',' + (sy - sh) + ' q16,2 18,34 M' + sx + ',' + (sy - sh) + ' q-4,-14 -22,-10" fill="none" stroke="#8A7A3A" stroke-width="4"/><path d="M' + sx + ',' + (sy - sh) + ' q-14,4 -16,30 M' + sx + ',' + (sy - sh) + ' q16,2 18,34" fill="none" stroke="#C8B060" stroke-width="1.4" stroke-dasharray="3 3"/>';
    }
    // dấu bàn tay trên thân cau non (chỉ thấy khi soi)
    sap += '<g class="hid" fill="#9FF0F0" stroke="none"><ellipse cx="' + sx + '" cy="' + (sy - 60) + '" rx="5" ry="7"/><ellipse cx="' + sx + '" cy="' + (sy - 100) + '" rx="5" ry="7"/><ellipse cx="' + sx + '" cy="' + (sy - 140) + '" rx="5" ry="7"/></g>';
    b.prop(sx - 60, sy - sh - 40, 120, sh + 50, sap, sy, S.flags.thay_chet ? '' : 'sway');
    b.solid(sx - 8, sy - 8, 16, 12);
    }
    // quả cau nứt răng rải trên đất (sau lễ)
    if (S.flags.cau_rung) {
      var q = '';
      [[430, 470], [520, 480], [470, 500], [548, 446], [404, 446], [500, 410]].forEach(function (p) {
        q += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="7" ry="9" fill="#C9A23A" stroke-width="2"/><path d="M' + (p[0] - 4) + ',' + p[1] + ' h8" stroke="#F3EEDF" stroke-width="2.5"/><path d="M' + (p[0] - 4) + ',' + p[1] + ' h8" stroke-width="1"/>';
      });
      b.bg += ink(q, 2);
    }
    // mâm lễ đêm trấn vong
    if (S.beat === 'dem_le' || S.beat === 'le_xong') {
      var m = '<ellipse cx="480" cy="540" rx="40" ry="12" fill="#A0503A"/><path d="M480,536 v-18" stroke="#B84A3E" stroke-width="2"/><circle cx="466" cy="536" r="5" fill="#D9A93A" stroke-width="1.5"/><circle cx="494" cy="536" r="5" fill="#C9473A" stroke-width="1.5"/>' +
        '<rect x="452" y="526" width="6" height="12" fill="#E9D9A8" stroke-width="1.5"/><rect x="502" y="526" width="6" height="12" fill="#E9D9A8" stroke-width="1.5"/>';
      b.prop(436, 510, 90, 44, m, 552);
      b.lights.push({ x: 455, y: 522, r: 90, flick: true }, { x: 505, y: 522, r: 90, flick: true });
    }
    // sương
    b.fgs += '<g class="fog" opacity="' + (S.phase === 'chieu' ? .15 : .32) + '"><ellipse cx="200" cy="600" rx="300" ry="40" fill="#E9E2D0"/><ellipse cx="760" cy="300" rx="320" ry="44" fill="#E9E2D0"/><ellipse cx="420" cy="140" rx="260" ry="30" fill="#E9E2D0"/></g>';
    b.edges();
    return b.out();
  };

  G.scenes.ky_gieng = function (S) { return G.scenes.nha_dighe(Object.assign({}, S, { phase: 'chieu', _kyGieng: true, flags: {} })); };

  // ================= KÝ ỨC: RUỘNG TÉP =================
  G.scenes.ky_ruong = function (S) {
    var b = new B(960, 720), r = rng(5), s = '';
    s += rect(0, 0, 960, 720, '#A8B86A');
    s += rect(0, 0, 960, 200, 'url(#lua)');
    // ruộng nước ở giữa, bờ ruộng bao quanh
    s += '<path d="M250,250 H760 V600 H250 Z" fill="url(#nuoc)" stroke-width="3"/>';
    for (var i = 0; i < 26; i++) { var x = 270 + r() * 470, y = 270 + r() * 310; s += '<path d="M' + x + ',' + y + ' l-4,-14M' + (x + 4) + ',' + y + ' l2,-16M' + (x + 8) + ',' + y + ' l6,-12" stroke="#6E8A40" stroke-width="2.5" fill="none"/>'; }
    s += '<path d="M240,240 H770 V610 H240 Z" fill="none" stroke="#B6A26A" stroke-width="16"/>';
    s += '<path d="M0,650 H960" stroke="#B6A26A" stroke-width="40"/>';
    b.bg += ink(s);
    // ruộng: đi vào được (lội nước), bờ ruộng là lối đi
    bamboo(b, 90, 330, r); bamboo(b, 870, 360, r);
    var tr = '<ellipse cx="140" cy="560" rx="50" ry="12" fill="' + INK + '" opacity=".2" stroke="none"/><path d="M130,560 Q136,500 140,470 L150,470 Q152,510 154,560 Z" fill="#7A5A3A"/>';
    for (var k = 0; k < 6; k++) tr += '<circle cx="' + (90 + r() * 110) + '" cy="' + (400 + r() * 70) + '" r="' + (28 + r() * 10) + '" fill="' + (k % 2 ? '#7E9A4A' : '#8EAA5A') + '"/>';
    b.prop(60, 360, 180, 210, tr, 560, 'sway'); b.solid(128, 548, 30, 14);
    b.fgs += '<rect x="0" y="0" width="960" height="720" fill="#FFF0C0" opacity=".12"/>';
    b.edges();
    return b.out();
  };
  G.sceneKit = { B: B, rect: rect, ink: ink, rng: rng, bamboo: bamboo, cau: cau, rao: rao };
})();
