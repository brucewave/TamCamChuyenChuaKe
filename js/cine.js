// Phim mở đầu: đêm trăng, cây cau, ba nhát rìu, cây đổ, rồi ba nhát nữa trong bóng tối. Sau đó là tên game.
var G = window.G || (window.G = {});
G.cine = {};

(function () {
  var $ = G.$, INK = G.INK, skip = false, running = false;

  function wait(ms) { return new Promise(function (r) { var t0 = Date.now(); (function f() { if (skip || Date.now() - t0 >= ms) r(); else setTimeout(f, 30); })(); }); }

  // cảnh chính: đêm trăng, rặng cau đen in lên trăng, Tấm trèo cau (sprite), kẻ đứng dưới gốc cầm rìu (sprite bóng tối)
  function sceneSvg() {
    var r = G.ve.rng(17);
    var s = '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0A16"/><stop offset=".55" stop-color="#1C1A30"/><stop offset="1" stop-color="#34283A"/></linearGradient>' +
      '<radialGradient id="cMoon"><stop offset="0" stop-color="#F8F0D8"/><stop offset=".5" stop-color="#EAD8A8"/><stop offset=".6" stop-color="#EAD8A8" stop-opacity=".3"/><stop offset="1" stop-color="#EAD8A8" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="cMat" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#FAF2DA"/><stop offset="1" stop-color="#E0CC98"/></radialGradient>' +
      '<linearGradient id="cSuong" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8A88A8" stop-opacity="0"/><stop offset="1" stop-color="#8A88A8" stop-opacity=".35"/></linearGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#cSky)"/>';
    for (var i = 0; i < 70; i++) s += '<circle cx="' + (r() * 960).toFixed(0) + '" cy="' + (r() * 300).toFixed(0) + '" r="' + (.5 + r() * 1.2).toFixed(1) + '" fill="#E8E4D8" opacity="' + (.3 + r() * .6).toFixed(2) + '"' + (i % 7 ? '' : ' class="c-sao"') + '/>';
    s += '<g id="c-moon" style="transition:transform 6s ease-out"><circle cx="600" cy="170" r="230" fill="url(#cMoon)"/><circle cx="600" cy="170" r="120" fill="url(#cMat)"/>' +
      '<g fill="#C8B488" opacity=".45"><circle cx="560" cy="140" r="17"/><circle cx="632" cy="204" r="24"/><circle cx="652" cy="128" r="9"/><circle cx="586" cy="212" r="7"/><ellipse cx="612" cy="160" rx="14" ry="8"/></g></g>';
    // mây mỏng trôi ngang trăng
    s += '<g opacity=".55" class="fog"><path d="M300,180 q60,-20 140,0 q60,-14 120,6 q-130,20 -260,-6 z" fill="#2A2638"/><path d="M640,250 q60,-14 120,0 q60,-10 100,6 q-110,16 -220,-6 z" fill="#2A2638"/></g>';
    // rặng cau xa: dáng cau thật (lá kép) in đen lên nền trời
    s += '<g style="filter:brightness(.1) saturate(0)" opacity=".95">';
    [[60, 250], [150, 300], [240, 270], [740, 290], [830, 250], [915, 310], [330, 230]].forEach(function (c) { s += G.ve.cau(c[0], 470, c[1], r); });
    s += '</g>';
    // đồi đất, cỏ, sương sát đất
    s += '<path d="M0,470 Q240,452 480,466 T960,460 V540 H0 Z" fill="#0A0810"/>';
    var co = ''; for (var k = 0; k < 60; k++) { var cx = r() * 960, cy = 462 + r() * 70; co += 'M' + cx.toFixed(0) + ',' + cy.toFixed(0) + ' l-3,-10 M' + (cx + 3).toFixed(0) + ',' + cy.toFixed(0) + ' l1,-13'; }
    s += '<path d="' + co + '" stroke="#16141E" stroke-width="2.4"/><rect y="400" width="960" height="140" fill="url(#cSuong)"/>';
    // cây cau của Tấm: thấy được dưới ánh trăng, xoay quanh gốc khi bị chặt; Tấm trèo trên thân (sprite)
    s += '<g id="c-tree" class="cine-tree"><g style="filter:brightness(.42) saturate(.55)">' + G.ve.cau(482, 470, 380, G.ve.rng(3)) + '</g>';
    s += '<g id="c-girl" style="transition:transform 13s linear">' + G.sprite.ve(G.LOOKS.tam, { view: 'back', tu: 'leo', x: 482, y: 448, k: .5, dem: true, id: 'c-tam' }) + '</g>';
    s += '</g>';
    // kẻ đứng dưới gốc: bóng tối, khăn vấn, rìu trong tay, nhẫn bạc loé
    s += G.sprite.ve(G.LOOKS.dighe, { view: 'side', tu: 'giau', x: 430, y: 472, k: .62, riu: true, nhan: true, bong: '#060508', id: 'c-ke' });
    // vụn gỗ
    s += '<g id="c-chips"></g>';
    s += '<g class="c-dom">' + [[120, 420], [260, 380], [700, 410], [860, 390], [560, 440]].map(function (p, i) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.2" fill="#D6FF78" style="animation-delay:-' + i * .7 + 's"/>'; }).join('') + '</g>';
    return s + '</svg>';
  }

  // cận mặt đất sau khi cây đổ: bàn tay cô gái, tóc xoã, yếm đỏ, máu loang dần dưới trăng
  function datSvg() {
    var r = G.ve.rng(29);
    var s = '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<radialGradient id="cdL" cx="60%" cy="10%" r="90%"><stop offset="0" stop-color="#8A9ABA" stop-opacity=".28"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#dat)"/><rect width="960" height="540" fill="#1A1420" opacity=".55"/>';
    // máu loang ra từ sau đầu
    var rv = G.ve.rng(31);
    s += '<defs><radialGradient id="cdVung" cx=".45" cy=".45" r=".6"><stop offset="0" stop-color="#2A0202"/><stop offset=".7" stop-color="#4A0604"/><stop offset="1" stop-color="#7A0A06"/></radialGradient></defs>';
    s += '<g class="c-loang"><path d="' + vungMau(500, 296, 250, 104, 26, .38, rv) + '" fill="url(#cdVung)"/><path d="' + vungMau(468, 286, 120, 44, 16, .3, rv) + '" fill="#3A0202" opacity=".6"/>' +
      '<path d="M380,252 q60,-18 140,-10M600,330 q40,6 70,-6" stroke="#C86060" stroke-width="5" stroke-linecap="round" fill="none" opacity=".35"/>' +
      '<g fill="#5A0604">' + [[250, 230, 9], [770, 360, 11], [720, 220, 6], [300, 370, 7], [810, 300, 5]].map(function (q) { return '<ellipse cx="' + q[0] + '" cy="' + q[1] + '" rx="' + q[2] + '" ry="' + (q[2] * .7) + '"/>'; }).join('') + '</g></g>';
    // tàu cau gãy đổ ngổn ngang quanh người
    var tau = ''; [[80, 120, 30], [700, 60, 150], [120, 470, -20], [820, 430, 200]].forEach(function (t) {
      var x0 = t[0], y0 = t[1], a = t[2] * Math.PI / 180, la = '';
      for (var k = 0; k < 16; k++) { var bx = x0 + Math.cos(a) * k * 14, by = y0 + Math.sin(a) * k * 14; la += 'M' + bx.toFixed(0) + ',' + by.toFixed(0) + ' l' + (Math.cos(a + 1.2) * 28).toFixed(0) + ',' + (Math.sin(a + 1.2) * 28).toFixed(0) + ' M' + bx.toFixed(0) + ',' + by.toFixed(0) + ' l' + (Math.cos(a - 1.2) * 28).toFixed(0) + ',' + (Math.sin(a - 1.2) * 28).toFixed(0); }
      tau += '<path d="M' + x0 + ',' + y0 + ' l' + (Math.cos(a) * 230).toFixed(0) + ',' + (Math.sin(a) * 230).toFixed(0) + '" stroke="#3A4A28" stroke-width="7"/><path d="' + la + '" stroke="#2E4220" stroke-width="5"/>';
    });
    s += '<g stroke-linecap="round">' + tau + '</g>';
    // Tấm nằm ngửa, còn thở: model trong game, tóc xoã, yếm đỏ, bàn tay buông
    var than = G.art.thanXac(G.LOOKS.tam, { mieng: 'sad' }).replace('class="chibi v-front xac-than"', 'class="chibi v-front xac-than con-tho"');
    s += '<g transform="translate(470,290) rotate(-102) scale(2.3) translate(-80,-110)">' + than + '</g>';
    s += '<path d="M330,330 q-40,-30 -90,-20 M340,250 q-50,-10 -96,14 M340,290 q-60,0 -110,6" fill="none" stroke="#0E0A0E" stroke-width="5" opacity=".85"/>';
    // quả cau rơi vương vãi
    for (var q = 0; q < 12; q++) { var qx = 120 + r() * 740, qy = 60 + r() * 420; if (Math.abs(qx - 480) < 160 && Math.abs(qy - 290) < 110) continue; s += '<ellipse cx="' + qx.toFixed(0) + '" cy="' + qy.toFixed(0) + '" rx="10" ry="12" fill="' + (q % 3 ? '#6E8A2A' : '#B8962A') + '" stroke="#000" stroke-width="2.4"/><circle cx="' + (qx - 3).toFixed(0) + '" cy="' + (qy - 4).toFixed(0) + '" r="2.4" fill="#E8E0B0" opacity=".5"/>'; }
    s += '<rect width="960" height="540" fill="url(#cdL)"/></svg>';
    return s;
  }
  // cận lưỡi rìu: máu nhỏ giọt, ngón tay đeo nhẫn bạc
  // cận chiếc nhẫn bạc dính máu: dùng chung khung với hồi ức "Nhát rìu" (G.cut.ve.canNhan trong phimchet.js)
  function riuSvg() { return G.cut.ve.canNhan(); }
  // vũng / vệt máu hình hữu cơ: mép gợn nhiều thùy (không phải hình tròn đều)
  function vungMau(cx, cy, rx, ry, n, gon, rnd) {
    var d = '', pts = [];
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2, k = 1 - gon / 2 + rnd() * gon; pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    for (var j = 0; j < n; j++) { var p0 = pts[j], p1 = pts[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2; d += (j ? ' Q' : 'M' + mx.toFixed(1) + ',' + my.toFixed(1) + ' Q') + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + ' ' + ((p1[0] + pts[(j + 2) % n][0]) / 2).toFixed(1) + ',' + ((p1[1] + pts[(j + 2) % n][1]) / 2).toFixed(1); }
    return d + ' Z';
  }
  // máu bắn lên mặt kính: một vệt chính mép gợn, gai máu toả theo hướng bắn, giọt dài thon, vệt chảy dọc có giọt đọng ở đầu, ánh ướt
  var soVet = 0;
  function vetMau() {
    var c = $('cine'), d = document.createElement('div'); d.className = 'c-ban';
    var seed = 13 + (soVet++) * 97, rnd = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var cx = [300, 660, 470][soVet % 3] + (rnd() - .5) * 120, cy = [220, 300, 160][soVet % 3] + (rnd() - .5) * 80, huong = -0.4 + rnd() * 0.8 + (rnd() < .5 ? 0 : Math.PI), id = 'vm' + soVet;
    var h = '<svg viewBox="0 0 960 540" preserveAspectRatio="none"><defs><radialGradient id="' + id + '" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#840A05"/><stop offset=".55" stop-color="#5E0504"/><stop offset="1" stop-color="#3A0202"/></radialGradient></defs>';
    var R = 50 + rnd() * 40;
    h += '<path d="' + vungMau(cx, cy, R * 1.25, R, 22, .55, rnd) + '" fill="url(#' + id + ')"/>';
    // gai máu: vệt thon nhọn toả ra, dày theo hướng bắn
    for (var i = 0; i < 16; i++) {
      var a = huong + (rnd() - .5) * (i < 10 ? 1.6 : 6.2), L = R * (1 + rnd() * (i < 10 ? 2.4 : 1.2)), w = 3 + rnd() * 7;
      var x0 = cx + Math.cos(a) * R * .7, y0 = cy + Math.sin(a) * R * .6, x1 = cx + Math.cos(a) * L, y1 = cy + Math.sin(a) * L * .8, nx = -Math.sin(a) * w, ny = Math.cos(a) * w;
      h += '<path d="M' + (x0 + nx).toFixed(1) + ',' + (y0 + ny).toFixed(1) + ' Q' + ((x0 + x1) / 2 + nx * .4).toFixed(1) + ',' + ((y0 + y1) / 2 + ny * .4).toFixed(1) + ' ' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' Q' + ((x0 + x1) / 2 - nx * .4).toFixed(1) + ',' + ((y0 + y1) / 2 - ny * .4).toFixed(1) + ' ' + (x0 - nx).toFixed(1) + ',' + (y0 - ny).toFixed(1) + ' Z" fill="#6A0604"/>';
      h += '<ellipse cx="' + (x1 + Math.cos(a) * 8).toFixed(1) + '" cy="' + (y1 + Math.sin(a) * 6).toFixed(1) + '" rx="' + (w * .7).toFixed(1) + '" ry="' + (w * .5).toFixed(1) + '" fill="#7A0806" transform="rotate(' + (a * 57.3).toFixed(0) + ' ' + (x1 + Math.cos(a) * 8).toFixed(1) + ' ' + (y1 + Math.sin(a) * 6).toFixed(1) + ')"/>';
    }
    // giọt văng xa: thon dài theo hướng bay
    for (var k = 0; k < 26; k++) {
      var a2 = huong + (rnd() - .5) * 2.4, r2 = R * (1.6 + rnd() * 3.2), sz = 1.5 + rnd() * 5, gx = cx + Math.cos(a2) * r2, gy = cy + Math.sin(a2) * r2 * .75;
      h += '<ellipse cx="' + gx.toFixed(1) + '" cy="' + gy.toFixed(1) + '" rx="' + (sz * 1.8).toFixed(1) + '" ry="' + sz.toFixed(1) + '" fill="#7A0604" transform="rotate(' + (a2 * 57.3).toFixed(0) + ' ' + gx.toFixed(1) + ' ' + gy.toFixed(1) + ')"/>';
    }
    // vệt chảy dọc từ mép dưới vệt chính, đầu vệt đọng giọt tròn (cùng chảy xuống)
    for (var t = 0; t < 4; t++) {
      var x = cx - R * .8 + rnd() * R * 1.6, y = cy + R * .55, len = 60 + rnd() * 180, w2 = 4 + rnd() * 6;
      h += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' q' + (rnd() * 6 - 3).toFixed(1) + ',' + (len / 2).toFixed(0) + ' 0,' + len.toFixed(0) + '" stroke="#5A0404" stroke-width="' + w2.toFixed(1) + '" stroke-linecap="round" fill="none" class="c-chay2" style="stroke-dasharray:' + len.toFixed(0) + ';stroke-dashoffset:' + len.toFixed(0) + ';animation-delay:' + (0.2 + t * .25).toFixed(2) + 's"/>';
    }
    // ánh ướt trên vệt chính
    h += '<path d="M' + (cx - R * .5).toFixed(0) + ',' + (cy - R * .35).toFixed(0) + ' q' + (R * .3).toFixed(0) + ',-' + (R * .18).toFixed(0) + ' ' + (R * .6).toFixed(0) + ',-' + (R * .05).toFixed(0) + '" stroke="#E8A0A0" stroke-width="4" stroke-linecap="round" fill="none" opacity=".45"/><circle cx="' + (cx - R * .2).toFixed(0) + '" cy="' + (cy - R * .3).toFixed(0) + '" r="3" fill="#FFD8D8" opacity=".6"/>';
    d.innerHTML = h + '</svg>'; c.appendChild(d);
  }
  function anh(html) { // đổi khung tranh trong phim
    var c = $('cine'), old = c.querySelector('.c-khung'); if (old) old.remove();
    var d = document.createElement('div'); d.className = 'c-khung'; d.innerHTML = html; c.insertBefore(d, c.querySelector('.flash'));
    requestAnimationFrame(function () { d.classList.add('hien'); });
    return d;
  }

  function text(msg, cls) {
    var c = $('cine'), el = c.querySelector('.ctext');
    if (!el) { el = document.createElement('div'); el.className = 'ctext'; c.appendChild(el); }
    el.className = 'ctext ' + (cls || '');
    el.style.opacity = 0;
    setTimeout(function () { el.textContent = msg; el.style.opacity = 1; }, 60);
  }
  function hideText() { var el = $('cine').querySelector('.ctext'); if (el) el.style.opacity = 0; }
  function flash(red, ms) {
    var f = $('cine').querySelector('.flash'); f.className = 'flash' + (red ? ' red' : '');
    f.style.transition = 'none'; f.style.opacity = red ? .55 : 1;
    setTimeout(function () { f.style.transition = 'opacity ' + (ms || 600) + 'ms'; f.style.opacity = 0; }, 40);
  }
  function shake() { var c = $('cine'); c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); }
  // một nhát rìu: kẻ đứng dưới gốc vung rìu (sprite), lúc lưỡi rìu chạm thân cây thì rung, vụn gỗ bắn, cây nghiêng thêm
  function chop(n) {
    var ke = $('c-ke');
    G.sprite.lai(ke, 'chat');
    setTimeout(function () {
      G.audio.sfx('chop'); shake();
      var t = $('c-tree'); if (t) t.style.transform = 'rotate(' + (n * 1.6) + 'deg)';
      var ch = $('c-chips');
      if (ch) for (var i = 0; i < 6; i++) {
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        p.setAttribute('x', 474); p.setAttribute('y', 430 + Math.random() * 24); p.setAttribute('width', 4 + Math.random() * 4); p.setAttribute('height', 3); p.setAttribute('fill', '#A8906A');
        p.style.transition = 'transform .8s cubic-bezier(.2,.8,.4,1), opacity .8s'; ch.appendChild(p);
        (function (p) { setTimeout(function () { p.style.transform = 'translate(' + (-20 - Math.random() * 90) + 'px,' + (-20 + Math.random() * 50) + 'px) rotate(' + (Math.random() * 360) + 'deg)'; p.style.opacity = 0; }, 20); })(p);
      }
    }, 340);
  }

  G.cine.tranh = { canh: sceneSvg, dat: datSvg, riu: riuSvg, mau: function () { vetMau(); } }; // xem riêng từng khung khi chỉnh hình

  // Phát phim; xong thì gọi done. Bấm "Bỏ qua" để tới thẳng tên game.
  G.cine.play = function (done) {
    if (running) return;
    running = true; skip = false;
    var c = $('cine');
    c.innerHTML = sceneSvg() + '<div class="flash"></div><button class="skip">Bỏ qua ›</button>';
    c.hidden = false;
    var svg = c.querySelector('svg'); svg.style.opacity = 0; svg.style.transition = 'opacity 2.5s';
    c.querySelector('.skip').onclick = function () { skip = true; };
    G.audio.music(null); G.audio.ambience('dem');
    (async function () {
      await wait(800);
      text('Ngày xửa ngày xưa…', 'center');
      G.audio.sfx('mo');
      await wait(2600);
      hideText(); await wait(700);
      svg.style.opacity = 1;
      G.audio.lullaby(1);
      await wait(1200);
      $('c-girl').style.transform = 'translateY(-200px)';
      text('Cô gái tên Tấm trèo lên ngọn cau, hái quả về cúng giỗ cha.');
      await wait(4200);
      text('Dưới gốc cau, có người đứng đợi.');
      await wait(2600);
      // hai người nói với nhau; người dưới gốc dịu giọng dặn dò, tay giấu sau lưng
      text('— Trèo cẩn thận nghe con. Ngã xuống thì khổ.', 'thoai');
      await wait(3200);
      text('— Dạ. Con hái xong buồng này là xuống ngay.', 'thoai tam');
      await wait(2800);
      // bàn tay sau lưng từ từ đưa ra, trong tay là cây rìu
      var ke = $('c-ke'); if (ke) { ke.classList.remove('sp-giau'); ke.classList.add('sp-riu', 'sp-rut'); }
      text('Bàn tay giấu sau lưng từ từ đưa ra. Trong tay là một cây rìu.');
      await wait(4200);
      var tam = $('c-tam'); if (tam) { tam.classList.remove('sp-leo'); tam.classList.add('sp-bam'); } // nghe tiếng rìu: dừng lại, bám chặt
      for (var i = 1; i <= 3 && !skip; i++) { chop(i); await wait(1250); }
      text('Cổ tích kể rằng: cô trượt chân.');
      await wait(1800);
      chop(4); await wait(700);
      if (!skip) {
        G.audio.sfx('fall');
        var t = $('c-tree'); t.classList.add('cine-fall'); t.style.transform = 'rotate(-84deg)';
        if (tam) { tam.classList.remove('sp-bam'); tam.classList.add('sp-vung'); } // tay quơ loạn khi cây đổ
        await wait(1300);
        flash(false, 900); shake();
      }
      await wait(500);
      svg.style.transition = 'opacity .1s'; svg.style.opacity = 0;
      hideText();
      // cận mặt đất: cô nằm giữa những tàu cau, máu loang ra
      if (!skip) {
        anh(datSvg()); G.audio.sfx('thud');
        await wait(900);
        text('Cô rơi xuống giữa những tàu cau.');
        await wait(3600);
        text('Cô còn thở.', 'red');
        G.audio.sfx('heart'); await wait(900); G.audio.sfx('heart'); await wait(1600);
      }
      var k0 = c.querySelector('.c-khung'); if (k0) k0.remove();
      hideText();
      await wait(1400);
      // ba nhát rìu nữa trong bóng tối, máu bắn lên màn
      for (var j = 0; j < 3 && !skip; j++) { G.audio.sfx('chop'); flash(true, 500); shake(); vetMau(); await wait(1150); }
      await wait(600);
      text('Ba nhát rìu nữa. Sau khi cô đã nằm dưới đất.', 'center red');
      await wait(3400);
      hideText();
      if (!skip) {
        c.querySelectorAll('.c-ban').forEach(function (e) { e.classList.add('mo'); });
        anh(riuSvg()); G.audio.sfx('drip'); G.audio.sfx('drip', 0.6);
        await wait(1200);
        text('Đoạn này, cổ tích không kể.', 'center');
        G.audio.sfx('stinger');
        await wait(3400);
      }
      hideText();
      await wait(800);
      c.hidden = true; c.innerHTML = '';
      running = false;
      if (done) done();
    })();
  };
})();
