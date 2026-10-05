// Minigame: bày mâm lễ, vẽ bùa, gõ mõ theo nén nhang, xúc tép, giữ phím.
var G = window.G || (window.G = {});
G.mg = {};

(function () {
  var M = G.mg, $ = G.$, INK = G.INK;
  function open(html, low) { var p = $('mg'); p.className = 'panel big' + (low ? ' low' : ''); G.ui.open('mg', html); return p; }
  function close() { G.ui.close('mg'); $('mg').onclick = null; }
  function f1(n) { return (+n).toFixed(1); }

  // ---------- hiệu ứng dùng chung: hạt bắn, chữ nổi, vòng sóng, rung khung ----------
  // Lớp hiệu ứng nằm thẳng trong #stage (trên #mg) nên không mất khi minigame vẽ lại innerHTML. Toạ độ theo khung 960x540 của sân khấu.
  var FX = M.fx = {};
  FX.lop = function () {
    var l = $('mgfx');
    if (!l) { l = document.createElement('div'); l.id = 'mgfx'; l.setAttribute('aria-hidden', 'true'); ($('stage') || document.body).appendChild(l); }
    return l;
  };
  function tile() { var st = $('stage'), r = st.getBoundingClientRect(); return { r: r, k: r.width / (st.offsetWidth || r.width || 1) }; }
  // toạ độ con trỏ trên sân khấu
  FX.diem = function (e) { var t = tile(); return { x: (e.clientX - t.r.left) / t.k, y: (e.clientY - t.r.top) / t.k }; };
  // tâm của một phần tử trên sân khấu
  FX.tam = function (el) {
    if (!el) return { x: 480, y: 270 };
    var t = tile(), q = el.getBoundingClientRect();
    return { x: (q.left + q.width / 2 - t.r.left) / t.k, y: (q.top + q.height / 2 - t.r.top) / t.k };
  };
  // hạt bắn ra từ (x, y). o: { n, mau: [], kieu: 'tia' | 'giot' | 'bui' | 'khoi' | 'vang', tam (bán kính), goc, toa (độ toả), roi (rơi thêm), tre }
  FX.hat = function (x, y, o) {
    o = o || {};
    var l = FX.lop(), n = o.n || 10, mau = o.mau || ['#FFE7A0', '#F0A030', '#C42A18'];
    if (G.reduceMotion) n = Math.min(3, n);
    for (var i = 0; i < n; i++) {
      var e = document.createElement('i'), a = (o.goc != null ? o.goc : -Math.PI / 2) + (Math.random() - .5) * (o.toa != null ? o.toa : Math.PI * 2);
      var d = (o.tam || 40) * (.45 + Math.random() * .75), tre = Math.random() * (o.tre || .06);
      e.className = 'mgfx mgfx-' + (o.kieu || 'tia');
      e.style.left = f1(x) + 'px'; e.style.top = f1(y) + 'px';
      e.style.setProperty('--dx', f1(Math.cos(a) * d) + 'px');
      e.style.setProperty('--dy', f1(Math.sin(a) * d + (o.roi || 0)) + 'px');
      e.style.setProperty('--c', mau[i % mau.length]);
      e.style.setProperty('--s', (.6 + Math.random() * .8).toFixed(2));
      e.style.animationDelay = tre.toFixed(2) + 's';
      l.appendChild(e);
      setTimeout(e.remove.bind(e), 1300 + tre * 1000);
    }
  };
  // chữ nổi lên rồi tan (vd. "Đều!", "+1")
  FX.chu = function (x, y, txt, cls) {
    var e = document.createElement('b'); e.className = 'mgfx-chu ' + (cls || '');
    e.textContent = txt; e.style.left = f1(x) + 'px'; e.style.top = f1(y) + 'px';
    FX.lop().appendChild(e); setTimeout(e.remove.bind(e), 1000);
  };
  // vòng sóng loang ra
  FX.vong = function (x, y, cls) {
    var e = document.createElement('i'); e.className = 'mgfx-vong ' + (cls || '');
    e.style.left = f1(x) + 'px'; e.style.top = f1(y) + 'px';
    FX.lop().appendChild(e); setTimeout(e.remove.bind(e), 900);
  };
  // rung một khung khi sai
  FX.rung = function (el) { if (!el || G.reduceMotion) return; el.classList.remove('mg-rung'); void el.offsetWidth; el.classList.add('mg-rung'); };

  // ---------- bày mâm lễ ----------
  // Đồ lễ vẽ to, nét mực; khung 60x60. Không dùng gradient trong icon (icon bị nhân bản nhiều lần trong trang).
  function ico2(inner) { return '<svg viewBox="0 0 60 60"><g stroke="' + INK + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></svg>'; }
  function cuc(p) { // một bông cúc vàng nhiều cánh
    var s = '';
    for (var k = 0; k < 10; k++) s += '<ellipse cx="' + p[0] + '" cy="' + (p[1] - 3.6) + '" rx="1.7" ry="3.8" fill="' + (k % 2 ? '#F6C82E' : '#E8A41E') + '" stroke-width=".8" transform="rotate(' + k * 36 + ' ' + p[0] + ' ' + p[1] + ')"/>';
    return s + '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.2" fill="#B8601A" stroke-width=".9"/>';
  }
  var ITEMS = {
    nhang: { name: 'Bát hương', svg: ico2(
      '<g class="mg-khoi" fill="none" stroke="#D8D2C8" stroke-width="1.5" opacity=".8"><path d="M22,9 q-4,-4 0,-8"/><path d="M30,6 q4,-4 0,-8"/><path d="M38,9 q-4,-4 0,-8"/></g>' +
      '<path d="M23,33 L22,10M30,33 V7M37,33 L38,10" stroke="#9A2A1C" stroke-width="2.2"/>' +
      '<g stroke="none"><circle cx="22" cy="10" r="4" fill="#FFB040" opacity=".35"/><circle cx="30" cy="7" r="4" fill="#FFB040" opacity=".35"/><circle cx="38" cy="10" r="4" fill="#FFB040" opacity=".35"/>' +
      '<circle cx="22" cy="10" r="1.7" fill="#FFE08A"/><circle cx="30" cy="7" r="1.7" fill="#FFE08A"/><circle cx="38" cy="10" r="1.7" fill="#FFE08A"/></g>' +
      '<path d="M8,31 h44 q-1,15 -11,20 h-22 q-10,-5 -11,-20 z" fill="#EEF0F2"/>' +
      '<path d="M11,38 q19,6 38,0" fill="none" stroke="#2E4E8E" stroke-width="2"/><path d="M19,44 q3,-3 6,0 q3,3 6,0 q3,-3 6,0" fill="none" stroke="#2E4E8E" stroke-width="1.5"/>' +
      '<ellipse cx="30" cy="31" rx="22" ry="5" fill="#F7F7F4"/><ellipse cx="30" cy="31" rx="17.5" ry="3.3" fill="#BDB3A2" stroke-width="1.2"/>' +
      '<path d="M21,51 h18 l-2,5 h-14 z" fill="#D8DADC"/><path d="M13,35 q1,8 5,12" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".9"/>') },
    hoa: { name: 'Lọ hoa cúc', svg: ico2(
      '<path d="M30,28 Q24,20 17,15M30,28 Q30,18 31,9M30,28 Q36,20 44,15M30,28 Q26,24 23,22M30,28 Q34,25 39,23" fill="none" stroke="#3E6A2E" stroke-width="2"/>' +
      '<path d="M29,25 q-9,-4 -14,1 q7,3 14,-1 z M31,24 q8,-5 13,-1 q-6,4 -13,1 z" fill="#4E7A3A" stroke-width="1.4"/>' +
      (G.ve ? G.ve.su(30, 57, 31) : '<path d="M22,30 h16 q6,8 4,18 q-2,8 -12,8 q-10,0 -12,-8 q-2,-10 4,-18 z" fill="#E8E8EC"/>') +
      [[17, 14], [31, 8], [44, 14], [23, 21], [39, 22]].map(cuc).join('')) },
    qua: { name: 'Đĩa ngũ quả', svg: ico2(
      '<path d="M22,51 h16 l4,6 h-24 z" fill="#C8CCD0"/><ellipse cx="30" cy="47" rx="27" ry="7.5" fill="#ECEEF0"/><ellipse cx="30" cy="46.5" rx="22" ry="5" fill="none" stroke="#2E4E8E" stroke-width="1.4"/>' +
      '<path d="M5,44 q2,-20 24,-24 l1,4 q-15,5 -18,21 z" fill="#E8C83A"/><path d="M9,45 q3,-15 19,-19" fill="none" stroke="#B89A20" stroke-width="1.2"/><path d="M28,20 l3,-3" stroke-width="2.6"/>' +
      '<circle cx="33" cy="30" r="12" fill="#9AB84A"/><path d="M27,24 q4,-4 9,-3" fill="none" stroke="#D8EA9A" stroke-width="2" opacity=".9"/><path d="M33,18 v-4" stroke-width="2"/>' +
      '<circle cx="16" cy="41" r="4.5" fill="#6A2A5A" stroke-width="1.6"/><circle cx="21" cy="43" r="4" fill="#7A3468" stroke-width="1.6"/>' +
      '<circle cx="45" cy="39" r="7" fill="#F08A20"/><path d="M43,33 l2,2 l2,-2" fill="none" stroke="#3E6A2E" stroke-width="1.6"/><circle cx="36" cy="43" r="5" fill="#D8442E"/><path d="M34,41 q1,-1 3,-1" fill="none" stroke="#FFC0A0" stroke-width="1.4"/>') },
    nuoc: { name: 'Chén nước', svg: ico2(
      '<ellipse cx="30" cy="48" rx="23" ry="6.5" fill="#E2E4E6"/><ellipse cx="30" cy="47" rx="17" ry="4" fill="none" stroke="#2E4E8E" stroke-width="1.2"/>' +
      '<path d="M13,25 h34 q-1,16 -9,21 h-16 q-8,-5 -9,-21 z" fill="#F4F4F2"/>' +
      '<path d="M16,33 q4,-3 7,0 q3,3 7,0 q4,-3 7,0 q3,3 7,0" fill="none" stroke="#2E4E8E" stroke-width="1.5"/>' +
      '<ellipse cx="30" cy="25" rx="17" ry="4.6" fill="#9CC8CC"/><path d="M19,24.5 q11,3 22,0" fill="none" stroke="#FFFFFF" stroke-width="1.4"/><circle cx="35" cy="25" r="1.4" fill="#FFE08A" stroke="none"/>' +
      '<path d="M16,29 q1,8 5,13" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".9"/>') },
    gao: { name: 'Đĩa gạo muối', svg: ico2(
      '<ellipse cx="30" cy="44" rx="27" ry="9" fill="#ECEEF0"/><ellipse cx="30" cy="43.5" rx="22" ry="6.4" fill="none" stroke="#2E4E8E" stroke-width="1.3"/>' +
      '<path d="M8,42 q7,-17 15,-17 q8,0 12,17 z" fill="#FBF7EC"/><path d="M29,42 q4,-13 11,-13 q7,0 12,13 z" fill="#F2F6F8"/>' +
      '<g fill="#B8B0A0" stroke="none"><ellipse cx="16" cy="35" rx="1.4" ry=".8"/><ellipse cx="21" cy="31" rx="1.4" ry=".8"/><ellipse cx="24" cy="37" rx="1.4" ry=".8"/><ellipse cx="13" cy="39" rx="1.4" ry=".8"/><ellipse cx="27" cy="34" rx="1.4" ry=".8"/></g>' +
      '<g fill="#B8CCD6" stroke="none"><rect x="37" y="34" width="2.4" height="2.4"/><rect x="42" y="37" width="2.4" height="2.4"/><rect x="45" y="33" width="2" height="2"/><rect x="39" y="39" width="2" height="2"/></g>' +
      '<path d="M12,40 q4,-8 8,-11" fill="none" stroke="#FFFFFF" stroke-width="1.6" opacity=".9"/>') },
    ma: { name: 'Vàng mã', svg: ico2(
      '<rect x="8" y="16" width="36" height="26" fill="#B8903A" transform="rotate(-10 26 29)"/><rect x="12" y="13" width="36" height="26" fill="#E8D8A8" transform="rotate(5 30 26)"/>' +
      '<rect x="22" y="18" width="16" height="16" fill="#F0C850" stroke="#B8862E" stroke-width="1.4" transform="rotate(5 30 26)"/><circle cx="30" cy="26" r="3.6" fill="#B84A3E" stroke="none"/>' +
      '<path d="M12,30 l36,4" stroke="#A8352B" stroke-width="2.6" transform="rotate(5 30 26)"/>' +
      '<path d="M28,54 q0,-8 6,-8 q2,-6 8,-6 q6,0 8,6 q6,0 6,8 z" fill="#F0C850"/><path d="M36,47 q6,-4 12,0" fill="none" stroke="#FFF2B0" stroke-width="1.6"/>') }
  };
  // Mâm nhìn từ trên xuống, người làm lễ quỳ ở phía dưới (trước mặt). Toạ độ trong khung 440x370.
  var SLOTS = { nhang: [220, 160], hoa: [128, 160], qua: [312, 160], gao: [220, 74], nuoc: [220, 246], ma: [334, 318] };
  var THAY_DAN = { nhang: 'Bát hương là chủ mâm, phải ở **chính giữa**.', hoa: 'Hoa đặt bên **tả**, tức tay trái mình khi quỳ.', qua: 'Quả bên **hữu**, hoa bên tả.',
    nuoc: 'Chén nước gần **chỗ mình quỳ** nhất.', gao: 'Gạo muối để **phía sau**, xa mình nhất.', ma: 'Vàng mã không đặt lên mâm. Để **dưới chân mâm**.' };
  // mâm gỗ sơn son thếp vàng trên chiếu cói, hai đèn dầu hai góc, sàn gỗ tối
  function trayArt() {
    var V = G.ve, s = '<svg class="tray-art" viewBox="0 0 440 370" width="440" height="370"><defs>' +
      '<radialGradient id="mgSon" cx="40%" cy="34%" r="74%"><stop offset="0" stop-color="#C8402A"/><stop offset=".55" stop-color="#8E1E14"/><stop offset="1" stop-color="#4E0C08"/></radialGradient>' +
      '<radialGradient id="mgLong" cx="44%" cy="38%" r="72%"><stop offset="0" stop-color="#8A2216"/><stop offset="1" stop-color="#46100A"/></radialGradient>' +
      '<linearGradient id="mgVang" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE7A0"/><stop offset=".5" stop-color="#D9A93A"/><stop offset="1" stop-color="#7A4E10"/></linearGradient>' +
      '<radialGradient id="mgAnh"><stop offset="0" stop-color="#FFD98A" stop-opacity=".5"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="mgToi" cx="50%" cy="46%" r="66%"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>';
    // sàn ván gỗ tối
    s += '<rect width="440" height="370" fill="#2A1A12"/><g stroke="#1A0E08" stroke-width="2">';
    for (var y = 22; y < 370; y += 34) s += '<path d="M0,' + y + ' H440"/>';
    s += '</g><g stroke="#3E2618" stroke-width="1" opacity=".7">';
    for (var y2 = 8; y2 < 370; y2 += 34) s += '<path d="M' + (y2 * 7 % 120) + ',' + (y2 + 6) + ' q60,-3 140,0 t160,0"/>';
    s += '</g>';
    // chiếu cói
    s += '<g stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round">' + (V ? V.chieu(28, 12, 384, 354) : '<rect x="28" y="12" width="384" height="354" fill="#D9C27A"/>') + '</g>';
    // hai đèn dầu hai góc trên, quầng sáng ấm
    s += '<circle cx="62" cy="52" r="92" fill="url(#mgAnh)" class="mg-den"/><circle cx="378" cy="52" r="92" fill="url(#mgAnh)" class="mg-den"/>';
    if (V) s += '<g stroke="' + INK + '" stroke-width="1.5" transform="translate(62,60) scale(1.5) translate(-62,-60)">' + V.denDau(62, 60, { r: 20 }) + '</g>' +
      '<g stroke="' + INK + '" stroke-width="1.5" transform="translate(378,60) scale(1.5) translate(-378,-60)">' + V.denDau(378, 60, { r: 20 }) + '</g>';
    // bóng mâm, vành thếp vàng, mặt sơn son, lòng mâm
    s += '<g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round">';
    s += '<ellipse cx="228" cy="172" rx="138" ry="132" fill="#000" opacity=".3" stroke="none"/>';
    s += '<circle cx="220" cy="160" r="134" fill="url(#mgVang)"/><circle cx="220" cy="160" r="126" fill="url(#mgSon)" stroke-width="2"/>';
    s += '<circle cx="220" cy="160" r="108" fill="url(#mgLong)" stroke-width="2"/></g>';
    // hoa văn thếp vàng: vòng chấm, cánh sen quanh vành, vân mây trong lòng, mặt nguyệt giữa mâm
    s += '<g fill="none" stroke="#E8B84A" stroke-width="1.6" opacity=".9">';
    s += '<circle cx="220" cy="160" r="117" stroke-dasharray="1.5 6" stroke-width="2.4"/><circle cx="220" cy="160" r="103"/>';
    for (var i = 0; i < 16; i++) {
      var a = i / 16 * Math.PI * 2, x = 220 + Math.cos(a) * 117, yy = 160 + Math.sin(a) * 117;
      s += '<path d="M' + f1(x) + ',' + f1(yy) + ' q4,-6 0,-11 q-4,5 0,11" transform="rotate(' + (i * 22.5 + 90) + ' ' + f1(x) + ' ' + f1(yy) + ')"/>';
    }
    for (var j = 0; j < 8; j++) {
      var b = j / 8 * Math.PI * 2 + .2, cx = 220 + Math.cos(b) * 72, cy = 160 + Math.sin(b) * 72;
      s += '<path d="M' + f1(cx - 9) + ',' + f1(cy) + ' q0,-7 7,-7 q6,0 5,6 q-1,4 -5,3" opacity=".55"/>';
    }
    s += '<circle cx="220" cy="160" r="38" stroke-width="2"/><circle cx="220" cy="160" r="31" stroke-dasharray="3 4"/></g>';
    // vệt bóng sơn mài
    s += '<path d="M128,92 q60,-46 146,-22" fill="none" stroke="#FFFFFF" stroke-width="7" opacity=".22" stroke-linecap="round"/><path d="M116,124 q8,-18 22,-30" fill="none" stroke="#FFFFFF" stroke-width="3.5" opacity=".28" stroke-linecap="round"/>';
    // đệm quỳ: gấm đỏ viền vàng, tua bốn góc
    s += '<g stroke="' + INK + '" stroke-width="2.5"><rect x="174" y="296" width="92" height="34" rx="12" fill="#6A2418"/>' +
      '<rect x="182" y="302" width="76" height="22" rx="8" fill="none" stroke="#E8B84A" stroke-width="1.6" stroke-dasharray="3 3"/>' +
      '<path d="M206,313 h28M220,305 v16" stroke="#E8B84A" stroke-width="1.6" opacity=".8"/>' +
      '<path d="M176,300 l-6,-6M264,300 l6,-6M176,326 l-6,6M264,326 l6,6" stroke="#C8963A" stroke-width="3"/></g>';
    // bốn hướng: chỉ ghi hướng, không ghi chỗ đặt
    function huong(x, y, w, txt) {
      return '<g transform="translate(' + x + ',' + y + ')"><rect x="' + (-w / 2) + '" y="-10" width="' + w + '" height="20" rx="10" fill="#1A0E08" opacity=".86" stroke="#D9A93A" stroke-width="1.2"/>' +
        '<text y="1" text-anchor="middle" font-size="12" font-weight="800" fill="#F6DC8E" letter-spacing="1.2" dominant-baseline="middle">' + txt + '</text></g>';
    }
    s += huong(220, 11, 70, '▲ SAU') + huong(30, 160, 56, '◀ TRÁI') + huong(410, 160, 58, 'PHẢI ▶') + huong(220, 358, 150, '▼ TRƯỚC · chỗ quỳ');
    s += '<rect width="440" height="370" fill="url(#mgToi)" pointer-events="none"/>';
    return s + '</svg>';
  }
  M.mam = function (onWrong) {
    return new Promise(function (res) {
      var placed = {}, sel = null, drag = null, pop = null, sai = {}, TRAY = trayArt();
      function render() {
        var n = Object.keys(placed).length;
        var h = '<h2>Bày mâm lễ</h2><div class="hint">Kéo đồ lễ đặt lên mâm (hoặc bấm chọn rồi bấm chỗ đặt). Đăng quỳ ở phía <b>trước</b>.</div>';
        h += '<div class="mam2"><div class="tray2">' + TRAY;
        Object.keys(SLOTS).forEach(function (k) {
          var p = SLOTS[k];
          h += '<div class="slot2' + (placed[k] ? ' ok' : (sel ? ' want' : '')) + (pop === k ? ' pop' : '') + '" data-s="' + k + '" style="left:' + p[0] + 'px;top:' + p[1] + 'px">' + (placed[k] ? ITEMS[k].svg : '') + '</div>';
        });
        h += '</div><div class="side2"><div class="basket"><div class="bk-h">Rổ đồ lễ <span>' + n + '/6</span></div><div class="bk-tien"><i style="width:' + (n / 6 * 100).toFixed(0) + '%"></i></div><div class="bk-grid">' +
          Object.keys(ITEMS).map(function (k) {
            return '<button class="item2' + (sel === k ? ' sel' : '') + '" data-i="' + k + '"' + (placed[k] ? ' disabled' : '') + '>' + ITEMS[k].svg + '<span>' + ITEMS[k].name + '</span></button>';
          }).join('') + '</div></div>';
        h += '<button class="hoi-thay" data-a="hoi">Hỏi lại thầy</button></div></div>';
        $('mg').innerHTML = h;
        pop = null;
      }
      function tryPlace(slot, k) {
        if (!k || placed[slot]) return;
        if (slot === k) {
          placed[k] = true; sel = null; pop = k; G.audio.sfx('mo'); render();
          var el = $('mg').querySelector('[data-s="' + k + '"]'), c = FX.tam(el);
          FX.hat(c.x, c.y, { n: 12, kieu: 'vang', tam: 46, mau: ['#FFE7A0', '#F6C84A', '#FFFFFF'] }); FX.vong(c.x, c.y, 'vang');
          if (Object.keys(placed).length === 6) {
            G.audio.sfx('ok');
            $('mg').querySelector('.tray2').classList.add('done');
            var t = FX.tam($('mg').querySelector('.tray-art'));
            FX.hat(t.x, t.y - 10, { n: 26, kieu: 'bui', tam: 150, goc: -Math.PI / 2, toa: Math.PI * 1.2, tre: .5, mau: ['#FFE7A0', '#FFD06A', '#FFF6D8'] });
            setTimeout(finish, 900);
          }
        } else {
          G.audio.sfx('bad');
          var el2 = $('mg').querySelector('[data-s="' + slot + '"]');
          if (el2) { el2.classList.add('bad'); setTimeout(function () { el2.classList.remove('bad'); }, 450); var c2 = FX.tam(el2); FX.chu(c2.x, c2.y - 30, 'Không phải chỗ này', 'sai'); }
          sai[k] = (sai[k] || 0) + 1;
          if (sai[k] >= 2) G.ui.toast('Thầy Cả: "' + THAY_DAN[k] + '"', 3600);
          if (onWrong) onWrong(k, slot);
        }
      }
      var p = open(''); p.classList.add('mamp'); render();
      p.onpointerdown = function (e) {
        if (e.target.closest('[data-a="hoi"]')) {
          var con = Object.keys(ITEMS).filter(function (k) { return !placed[k]; });
          G.ui.toast('Thầy Cả: "' + (con.length ? THAY_DAN[con[Math.floor(Math.random() * con.length)]] : 'Xong rồi.') + '"', 3600);
          return;
        }
        var b = e.target.closest('[data-i]');
        if (b && !b.disabled) {
          sel = b.dataset.i; G.audio.sfx('paper'); render();
          var ghost = document.createElement('div'); ghost.className = 'drag-ghost'; ghost.innerHTML = ITEMS[sel].svg;
          document.body.appendChild(ghost);
          drag = { k: sel, el: ghost, x0: e.clientX, y0: e.clientY, moved: false };
          move(e);
          return;
        }
        var s = e.target.closest('[data-s]'); if (s && sel) tryPlace(s.dataset.s, sel);
      };
      function move(e) {
        if (!drag) return;
        if (Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 6) drag.moved = true;
        drag.el.style.left = e.clientX + 'px'; drag.el.style.top = e.clientY + 'px';
        drag.el.style.opacity = drag.moved ? 1 : 0;
      }
      function up(e) {
        if (!drag) return;
        var d = drag; drag = null; d.el.remove();
        if (!d.moved) return; // chỉ bấm: giữ món đang chọn, bấm tiếp vào chỗ đặt
        var under = document.elementFromPoint(e.clientX, e.clientY), s = under && under.closest('[data-s]');
        if (s) tryPlace(s.dataset.s, d.k);
      }
      function finish() {
        window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
        p.onpointerdown = null; p.classList.remove('mamp');
        close(); res();
      }
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
    });
  };

  // ---------- vẽ bùa ----------
  // Tô lại các nét son chính của lá bùa thật (G.ve.bua, khung 120x360): vòng nhật quanh chữ lệnh, nét mũ, hai nét vòng cung ôm hàng chữ,
  // nét móc chân, hai cột hai bên. Chấm điểm bằng các điểm mẫu dọc nét như cũ (cách 7px, trúng trong 18px, xong khi 86%).
  var BK = 1.3, BW = 156, BH = 468; // lá bùa hiện cao 468px trên sân khấu
  function qBez(a, c, b, n) { var o = []; for (var i = 0; i <= n; i++) { var t = i / n, u = 1 - t; o.push([u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]]); } return o; }
  function cBez(a, c1, c2, b, n) {
    var o = [];
    for (var i = 0; i <= n; i++) { var t = i / n, u = 1 - t; o.push([u * u * u * a[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * b[0], u * u * u * a[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * b[1]]); }
    return o;
  }
  var NET = (function () {
    var vong = []; for (var a = 0; a <= 36; a++) { var g = -Math.PI / 2 + a / 36 * Math.PI * 2; vong.push([60 + Math.cos(g) * 27, 66 + Math.sin(g) * 27]); }
    var mu = qBez([24, 118], [44, 106], [60, 104], 8).concat(qBez([60, 104], [76, 106], [96, 118], 8).slice(1));
    var trai = cBez([60, 108], [44, 118], [36, 140], [38, 190], 14).concat(cBez([38, 190], [40, 250], [40, 300], [42, 336], 14).slice(1));
    var phai = trai.map(function (p) { return [120 - p[0], p[1]]; });
    return [vong, mu, trai, phai, qBez([46, 336], [60, 342], [74, 336], 6), [[17, 132], [17, 340]], [[103, 132], [103, 340]]];
  })();
  function samples() {
    var pts = [];
    NET.forEach(function (st, ni) {
      var p = st.map(function (q) { return [q[0] * BK, q[1] * BK]; });
      for (var i = 0; i < p.length - 1; i++) {
        var a0 = p[i], a1 = p[i + 1], d = Math.hypot(a1[0] - a0[0], a1[1] - a0[1]), n = Math.max(1, Math.round(d / 7));
        for (var k = 0; k < n; k++) pts.push({ x: a0[0] + (a1[0] - a0[0]) * k / n, y: a0[1] + (a1[1] - a0[1]) * k / n, hit: false, net: ni });
      }
      var e = p[p.length - 1]; pts.push({ x: e[0], y: e[1], hit: false, net: ni });
    });
    return pts;
  }
  function chuBua(opt) {
    var B = (G.ve && G.ve.BUA) || {}, t = (opt.title || '').toLowerCase();
    if (opt.chu) return opt.chu;
    if (/độn thổ/.test(t)) return B.donTho;
    if (/giải hạn/.test(t)) return B.giaiHan;
    if (/an vị/.test(t)) return B.anVi;
    if (/trấn/.test(t)) return B.tranVong;
    return B.truTa;
  }
  // nghiên son, gác bút, đèn dầu bên phải lá bùa
  function banVe() {
    var s = '<svg class="bua-do" viewBox="0 0 170 300" aria-hidden="true"><g stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">';
    s += '<circle cx="118" cy="64" r="58" fill="url(#glowY)" stroke="none" opacity=".55" class="mg-den"/>';
    if (G.ve) s += '<g transform="translate(118,96) scale(2) translate(-118,-96)" stroke-width="1.2">' + G.ve.denDau(118, 96, { r: 16 }) + '</g>';
    // nghiên đá: mặt mài, giếng son
    s += '<path d="M24,170 h112 q10,0 10,10 v54 q0,10 -10,10 h-112 q-10,0 -10,-10 v-54 q0,-10 10,-10 z" fill="#2E2A2C"/>';
    s += '<path d="M30,176 h100 q6,0 6,6 v20 h-112 v-20 q0,-6 6,-6 z" fill="#4A4448" stroke-width="1.6"/>';
    s += '<ellipse cx="80" cy="222" rx="44" ry="13" fill="#8E140C" stroke-width="2"/><ellipse cx="72" cy="219" rx="18" ry="4" fill="#D84A30" stroke="none" opacity=".7"/>';
    s += '<path d="M28,240 h104" stroke="#5A5458" stroke-width="1.4"/>';
    // gác bút gỗ hình núi, cây bút lông gác ngang
    s += '<path d="M30,150 l10,-14 l8,8 l10,-16 l10,16 l8,-8 l10,14 z" fill="#6A4428"/>';
    s += '<path d="M14,134 L150,120" stroke="#8A5A36" stroke-width="7"/><path d="M14,134 L150,120" stroke="#C99A5E" stroke-width="3" opacity=".7"/>';
    s += '<path d="M150,120 l16,-2 q8,0 6,4 q-4,3 -22,4 z" fill="#2B1F1A"/><path d="M164,119 q6,0 4,3" stroke="#B0180C" stroke-width="2" fill="none"/>';
    s += '<path d="M10,134 l6,-0.6" stroke="#D9A93A" stroke-width="5"/>';
    // dĩa chu sa bột
    s += '<ellipse cx="40" cy="276" rx="24" ry="8" fill="#ECEEF0"/><ellipse cx="40" cy="274" rx="14" ry="4" fill="#C42A18" stroke="none"/>';
    s += '<ellipse cx="120" cy="278" rx="28" ry="7" fill="#C8A060" opacity=".5" stroke="none"/><text x="120" y="282" text-anchor="middle" font-size="10" fill="#E9D8B8" stroke="none" font-weight="800">chu sa</text>';
    return s + '</g></svg>';
  }
  M.bua = function (opt) {
    opt = opt || {};
    return new Promise(function (res) {
      var chu = chuBua(opt), dan = '';
      NET.forEach(function (st, i) {
        var d = 'M' + st.map(function (q) { return f1(q[0]) + ',' + f1(q[1]); }).join(' L');
        dan += '<g class="bd-net" data-n="' + i + '"><path class="bd-mo" d="' + d + '"/><path class="bd-cham" d="' + d + '"/><circle class="bd-dau" cx="' + f1(st[0][0]) + '" cy="' + f1(st[0][1]) + '" r="4"/></g>';
      });
      var V = G.ve;
      var p = open('<div class="bua-ban"><div class="bua-trai"><h2>' + (opt.title || 'Vẽ bùa trấn') + '</h2><div class="hint">' + (opt.hint || 'Giữ chuột (hoặc ngón tay) và tô theo nét mờ trên giấy. Không cần vẽ một lần liền mạch.') + '</div>' +
        '<div class="bua-muc"><span>Nét son <b id="bua-n">0/' + NET.length + '</b></span><div class="prog"><i></i></div></div><div class="hint bua-msg" id="bua-msg">&nbsp;</div></div>' +
        '<div class="bua" id="bua-giay">' + (V ? V.buaSvg({ chu: chu, son: 'rgba(170,40,22,.17)', cu: opt.cu }, 'bua-nen') + V.buaSvg({ chu: chu }, 'bua-that') : '') +
        '<svg class="bua-dan" viewBox="0 0 120 360" aria-hidden="true">' + dan + '</svg>' +
        '<canvas id="bua-c"></canvas><div class="bua-sang"></div><div class="bua-chan"></div><div class="bua-but" id="bua-but"><i></i></div></div>' +
        '<div class="bua-phai">' + banVe() + '</div></div>');
      p.classList.add('buap');
      var cv = $('bua-c'), cx = cv.getContext('2d'), giay = $('bua-giay'), but = $('bua-but'), pts = samples(), drawing = false, last = null, lastT = 0, lw = 10, lech = 0, finished = false, tiaT = 0;
      var tong = NET.map(function () { return 0; }), trung = tong.slice(), xong = tong.map(function () { return false; });
      pts.forEach(function (q) { tong[q.net]++; });
      cv.width = BW * 2; cv.height = BH * 2; cx.setTransform(2, 0, 0, 2, 0, 0);
      cx.lineCap = 'round'; cx.lineJoin = 'round';
      function keNet() { // nét kế tiếp sáng lên, nét xong thì chìm
        var ke = xong.indexOf(false);
        giay.querySelectorAll('.bd-net').forEach(function (g) { var i = +g.dataset.n; g.classList.toggle('xong', xong[i]); g.classList.toggle('ke', i === ke); });
      }
      keNet();
      function pos(e) { var r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width * BW, y: (e.clientY - r.top) / r.height * BH }; }
      function butTai(q) { but.style.left = (q.x / BW * 100).toFixed(2) + '%'; but.style.top = (q.y / BH * 100).toFixed(2) + '%'; }
      // nét bút lông chu sa: nhanh thì mảnh, chậm thì đậm; lõi son tươi, sợi lông bút khô ở mép, lấm tấm hạt son
      function ve(a, b, w) {
        var dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
        cx.strokeStyle = '#8E140C'; cx.lineWidth = w; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
        cx.strokeStyle = 'rgba(214,58,30,.55)'; cx.lineWidth = Math.max(1, w * .38);
        cx.beginPath(); cx.moveTo(a.x - nx * w * .12, a.y - ny * w * .12); cx.lineTo(b.x - nx * w * .12, b.y - ny * w * .12); cx.stroke();
        [-.46, -.3, .34, .5].forEach(function (o, i) {
          cx.strokeStyle = 'rgba(' + (i % 2 ? '120,12,6' : '176,30,16') + ',' + (.35 + Math.random() * .4).toFixed(2) + ')'; cx.lineWidth = .6 + Math.random() * .9;
          cx.beginPath(); cx.moveTo(a.x + nx * w * o, a.y + ny * w * o); cx.lineTo(b.x + nx * w * o, b.y + ny * w * o); cx.stroke();
        });
        if (Math.random() < .35) { cx.fillStyle = 'rgba(150,20,10,.6)'; cx.beginPath(); cx.arc(b.x + nx * w * (Math.random() - .5) * 1.4, b.y + ny * w * (Math.random() - .5) * 1.4, .6 + Math.random() * 1.1, 0, 7); cx.fill(); }
      }
      function vung(q, r) { // giọt son đọng khi đặt bút
        cx.fillStyle = '#8E140C'; cx.beginPath(); cx.arc(q.x, q.y, r, 0, 7); cx.fill();
        cx.fillStyle = 'rgba(214,58,30,.5)'; cx.beginPath(); cx.arc(q.x - r * .25, q.y - r * .25, r * .45, 0, 7); cx.fill();
      }
      function mark(p) {
        var near = false, moi = false;
        pts.forEach(function (q) {
          var d = Math.hypot(q.x - p.x, q.y - p.y);
          if (d < 18 && !q.hit) { q.hit = true; trung[q.net]++; moi = true; }
          if (d < 34) near = true;
        });
        if (!near) {
          lech++;
          if (lech % 12 === 1) { $('bua-msg').textContent = 'Lệch nét rồi. Bám theo nét mờ.'; G.audio.sfx('bad'); FX.rung(giay); }
        } else if (moi) {
          var now = performance.now();
          if (now - tiaT > 90) { tiaT = now; var c = toaDo(p); FX.hat(c.x, c.y, { n: 3, kieu: 'tia', tam: 18, mau: ['#FFD06A', '#FF8A3A'] }); }
        }
        // nét nào đủ thì báo
        tong.forEach(function (n, i) {
          if (!xong[i] && trung[i] / n >= .85) {
            xong[i] = true; keNet(); G.audio.sfx('blip');
            var st = NET[i], e = st[st.length - 1], c2 = toaDo({ x: e[0] * BK, y: e[1] * BK });
            FX.hat(c2.x, c2.y, { n: 8, kieu: 'vang', tam: 30, mau: ['#FFE7A0', '#F6C84A'] });
          }
        });
        $('bua-n').textContent = xong.filter(Boolean).length + '/' + NET.length;
        var done = pts.filter(function (q) { return q.hit; }).length / pts.length;
        $('mg').querySelector('.prog i').style.width = Math.round(done * 100) + '%';
        if (done > 0.86 && !finished) {
          finished = true; drawing = false;
          $('bua-msg').textContent = 'Bùa đã thành.'; $('bua-n').textContent = NET.length + '/' + NET.length;
          G.audio.sfx('ok'); G.audio.sfx('bell', 0.3);
          // đóng ấn son góc dưới
          cx.save(); cx.translate(124, 434); cx.rotate(-0.1);
          cx.fillStyle = 'rgba(176,24,16,.9)'; cx.fillRect(-17, -17, 34, 34);
          cx.strokeStyle = '#F2D9A8'; cx.lineWidth = 2.4; cx.strokeRect(-13, -13, 26, 26);
          cx.beginPath(); cx.moveTo(-8, -6); cx.lineTo(8, -6); cx.moveTo(0, -10); cx.lineTo(0, 10); cx.moveTo(-8, 3); cx.lineTo(8, 3); cx.moveTo(-6, 9); cx.lineTo(6, 9); cx.stroke();
          cx.restore();
          giay.classList.add('thanh'); but.classList.remove('on');
          var t = FX.tam(giay);
          FX.hat(t.x, t.y + 200, { n: 22, kieu: 'bui', tam: 230, goc: -Math.PI / 2, toa: .7, tre: .6, mau: ['#FFE7A0', '#FFB040', '#FF7A1A'] });
          FX.hat(t.x, t.y - 140, { n: 14, kieu: 'vang', tam: 70, mau: ['#FFF6D8', '#FFD06A'] });
          setTimeout(function () { close(); p.classList.remove('buap'); res(); }, 1300);
        }
      }
      function toaDo(q) { // điểm trên giấy → toạ độ sân khấu (cho hạt bắn)
        var r = giay.getBoundingClientRect(), st = $('stage'), s = st.getBoundingClientRect(), k = s.width / (st.offsetWidth || s.width);
        return { x: (r.left + q.x / BW * r.width - s.left) / k, y: (r.top + q.y / BH * r.height - s.top) / k };
      }
      cv.addEventListener('pointerdown', function (e) {
        if (finished) return;
        drawing = true; last = pos(e); lastT = performance.now(); lw = 11;
        try { cv.setPointerCapture(e.pointerId); } catch (er) {}
        vung(last, 6.5); mark(last); butTai(last); but.classList.add('on', 'ha');
      });
      cv.addEventListener('pointermove', function (e) {
        var p = pos(e); butTai(p);
        if (!finished) but.classList.add('on');
        if (!drawing || finished) return;
        var now = performance.now(), d = Math.hypot(p.x - last.x, p.y - last.y), v = d / Math.max(8, now - lastT);
        lw = lw * .6 + Math.max(4.5, Math.min(13, 13 - v * 9)) * .4;
        ve(last, p, lw);
        var n = Math.ceil(d / 5);
        for (var i = 1; i <= n && !finished; i++) mark({ x: last.x + (p.x - last.x) * i / n, y: last.y + (p.y - last.y) * i / n });
        last = p; lastT = now;
      });
      ['pointerup', 'pointercancel'].forEach(function (ev) { cv.addEventListener(ev, function () { drawing = false; but.classList.remove('ha'); }); });
      cv.addEventListener('pointerleave', function () { if (!drawing) but.classList.remove('on'); });
    });
  };

  // ---------- gõ mõ theo nén nhang ----------
  // opt: {dur: giây, bpm, events: [{t, run}], title}
  // Cái mõ gỗ sơn son nằm trên đệm, dùi mõ bọc vải. Hạt tràng trôi theo sợi dây về phía mõ; gõ khi hạt vào vòng.
  function moSvg() {
    return '<svg class="mo-svg" viewBox="0 -24 130 136" aria-hidden="true"><defs>' +
      '<radialGradient id="mgMoSon" cx="38%" cy="30%" r="80%"><stop offset="0" stop-color="#D0482C"/><stop offset=".55" stop-color="#8E1E12"/><stop offset="1" stop-color="#4A0A06"/></radialGradient></defs>' +
      '<g stroke="' + INK + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">' +
      '<ellipse cx="62" cy="102" rx="54" ry="8" fill="#5A1E12"/><path d="M14,102 q-6,6 -4,10M110,102 q6,6 4,10" stroke="#D9A93A" stroke-width="2"/>' +
      '<g class="mo-than"><path d="M16,80 C8,50 32,24 62,24 C94,24 118,50 108,80 C102,96 82,100 62,100 C42,100 22,96 16,80 Z" fill="url(#mgMoSon)"/>' +
      '<path d="M22,66 C40,78 84,78 102,66" fill="none" stroke="#140604" stroke-width="6"/><path d="M26,70 C44,80 80,80 98,70" fill="none" stroke="#E8B84A" stroke-width="1.4" opacity=".7"/>' +
      '<g fill="none" stroke="#E8B84A" stroke-width="1.5" opacity=".85"><path d="M40,46 q6,-6 12,0 q6,-6 12,0 q6,-6 12,0 q6,-6 12,0"/><path d="M34,56 q6,-6 12,0 q6,-6 12,0 q6,-6 12,0 q6,-6 12,0 q6,-6 12,0"/>' +
      '<path d="M22,76 q-6,-6 0,-12 q5,-3 6,3" /><path d="M102,76 q6,-6 0,-12 q-5,-3 -6,3"/></g>' +
      '<circle cx="30" cy="54" r="5" fill="#E8B84A" stroke-width="1.6"/><circle cx="30" cy="54" r="2" fill="#140604" stroke="none"/>' +
      '<path d="M40,32 q22,-10 48,0" fill="none" stroke="#FFFFFF" stroke-width="4" opacity=".28"/></g>' +
      '<g class="mo-dui"><path d="M126,4 L72,18" stroke="#3A2414" stroke-width="7"/><path d="M126,4 L72,18" stroke="#A8784C" stroke-width="3.5"/>' +
      '<ellipse cx="66" cy="18" rx="11" ry="8.5" fill="#3A2A20" transform="rotate(-14 66 18)"/><path d="M60,14 q5,-3 10,0" fill="none" stroke="#7A6450" stroke-width="1.6"/></g>' +
      '</g></svg>';
  }
  M.mo = function (opt) {
    return new Promise(function (res) {
      var p = open('<div class="mo-dau"><h2>' + (opt.title || 'Gõ mõ') + '</h2><div class="hint">Gõ khi hạt tràng chạm vòng tròn: <b>Space / E</b> hoặc bấm vào dải. Đừng để mõ ngắt nhịp.</div></div>' +
        '<div class="mo-san"><div class="mo-track" id="mo-tr"><i class="mo-day"></i><div class="mo-trong" id="mo-trong">' + moSvg() + '</div><div class="mo-hit" id="mo-hit"></div></div>' +
        '<div class="nhang2" aria-label="Nén nhang"><div class="nh-que"><i id="mo-st"><b></b></i></div><div class="nh-bat"></div><span>Nén nhang</span></div></div>' +
        '<div class="mo-info"><span id="mo-say">&nbsp;</span><span id="mo-sc">Nhịp đều: 0</span></div>', true);
      p.classList.add('mop');
      var tr = $('mo-tr'), trong = $('mo-trong'), beat = 60 / (opt.bpm || 72), t = 0, nextSpawn = 0.6, notes = [], good = 0, miss = 0, ev = (opt.events || []).slice(), raf, lastTs = 0, ended = false;
      var W = tr.clientWidth || 640, SPD = 220, HITX = 150;
      function lai(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
      function hit() {
        var best = null, bd = 1e9;
        notes.forEach(function (n) { if (n.done) return; var d = Math.abs(n.x - HITX); if (d < bd) { bd = d; best = n; } });
        $('mo-hit').classList.add('flash'); setTimeout(function () { var h = $('mo-hit'); if (h) h.classList.remove('flash'); }, 90);
        lai(trong, 'go');
        G.audio.sfx('mo');
        var c = FX.tam($('mo-hit'));
        if (best && bd < 34) {
          best.done = true; best.el.remove(); good++;
          var sc = $('mo-sc'); sc.textContent = 'Nhịp đều: ' + good; lai(sc, 'nay');
          FX.vong(c.x, c.y, 'vang'); FX.hat(c.x, c.y, { n: 8, kieu: 'tia', tam: 34, mau: ['#FFE7A0', '#F6C84A', '#FF9A40'] });
          if (bd < 12) FX.chu(c.x, c.y - 40, 'Đều!', 'vang');
        } else FX.vong(c.x, c.y, 'mo');
      }
      M._moHit = hit;
      tr.onpointerdown = function (e) { e.preventDefault(); hit(); };
      function frame(ts) {
        if (!$('mo-st')) return; // bảng đã bị thay bằng minigame khác
        var dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0; lastTs = ts;
        t += dt;
        if (t >= nextSpawn && t < opt.dur - 1.5) {
          nextSpawn += beat;
          var el = document.createElement('div'); el.className = 'mo-note'; tr.appendChild(el);
          notes.push({ x: W + 20, el: el });
        }
        notes.forEach(function (n) {
          if (n.done) return;
          n.x -= SPD * dt; n.el.style.left = n.x + 'px';
          var gan = Math.abs(n.x - HITX) < 34; if (gan !== n.gan) { n.gan = gan; n.el.classList.toggle('gan', gan); }
          if (n.x < HITX - 40) {
            n.done = true; n.el.classList.add('truot'); miss++; lai(tr, 'lo');
            setTimeout(function () { n.el.remove(); }, 300); if (opt.onMiss) opt.onMiss(miss);
          }
        });
        while (ev.length && ev[0].t <= t) { var e = ev.shift(); e.run(function (s) { $('mo-say').innerHTML = G.ui.fmt(s); }); }
        $('mo-st').style.height = Math.max(0, 100 - t / opt.dur * 100) + '%';
        if (t >= opt.dur) { ended = true; M._moHit = null; p.classList.remove('mop'); close(); res({ good: good, miss: miss }); return; }
        raf = G.raf(frame);
      }
      raf = G.raf(frame);
    });
  };

  // ---------- xúc tép ----------
  // Mặt ruộng nhìn từ trên: tép nhảy vọt lên khỏi nước trong chốc lát, bấm trúng lúc đang nhảy thì xúc được.
  // Đỉa bơi ngang: bấm nhầm thì bị cắn, rơi mất tép. Bắt liền tay thì được thưởng thêm. Nắng tắt dần; gần cuối có bóng bàn tay trôi dưới nước.
  M.tep = function (need, secs) {
    return new Promise(function (res) {
      var W0 = 640, H0 = 300;
      open('<h2>Bắt tép</h2><div class="hint">Bấm vào con tép lúc nó <b>nhảy lên khỏi mặt nước</b>. Tránh <b>đỉa</b>. Cần <b>' + need + '</b> con trước khi tắt nắng.</div>' +
        '<div class="tep2" id="tep"><svg class="tep-nen" viewBox="0 0 640 300" preserveAspectRatio="none"></svg><div class="tep-lan"></div><div class="tep-toi"></div></div>' +
        '<div class="tep-hud"><div class="tep-gio" id="tep-gio"><i id="tep-day"></i><b id="tep-n">0/' + need + '</b></div><span id="tep-msg">&nbsp;</span><div class="tep-nang"><i id="tep-t"></i></div></div>');
      $('mg').classList.add('tepp');
      var box = $('tep'), n = 0, t = 0, over = false, last = 0, list = [], spawn = 0.4, diaT = 4, chuoi = 0, tayDa = false;
      // nền: nước ruộng phản chiếu trời chiều, mây trôi, khóm lúa, lá súng, bờ ruộng
      var R = (function (seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; })(9), nen = '';
      nen += '<defs><linearGradient id="tpN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8C8BC"/><stop offset=".55" stop-color="#7AA49C"/><stop offset="1" stop-color="#4E7A74"/></linearGradient>' +
        '<radialGradient id="tpM" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF4C8" stop-opacity=".7"/><stop offset="1" stop-color="#FFF4C8" stop-opacity="0"/></radialGradient></defs><rect width="640" height="300" fill="url(#tpN)"/>';
      nen += '<g class="tep-may"><ellipse cx="180" cy="80" rx="130" ry="24" fill="#FFFFFF" opacity=".2"/><ellipse cx="470" cy="190" rx="160" ry="20" fill="#FFFFFF" opacity=".14"/><ellipse cx="520" cy="60" rx="70" ry="12" fill="#FFFFFF" opacity=".16"/></g>';
      nen += '<ellipse cx="500" cy="110" rx="90" ry="36" fill="url(#tpM)"/>';
      if (G.ve) nen += '<g stroke="' + INK + '" stroke-width="1.6">' + G.ve.laSung(80, 250, 22, 20, R) + G.ve.laSung(560, 60, 18, 140, R) + G.ve.laSung(600, 250, 16, 260, R) + '</g>';
      for (var k = 0; k < 34; k++) {
        var x = R() * 640, y = R() * 300, g = '';
        for (var j = 0; j < 5; j++) g += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' q' + ((j - 2) * 4) + ',-14 ' + ((j - 2) * 9) + ',-24" stroke="' + (j % 2 ? '#6E8A3A' : '#5E7A3A') + '" stroke-width="2.4" fill="none"/>';
        nen += '<ellipse cx="' + x.toFixed(0) + '" cy="' + (y + 2).toFixed(0) + '" rx="10" ry="3" fill="#3E5A50" opacity=".35"/><path d="M' + (x - 9).toFixed(0) + ',' + (y + 6).toFixed(0) + ' q9,3 18,0" stroke="#E8F4F0" stroke-width="1" fill="none" opacity=".35"/>' + g;
      }
      nen += '<path d="M0,0 H640 V14 Q480,24 320,12 T0,16 Z" fill="#7A6A44" opacity=".75"/><path d="M0,300 H640 V288 Q480,280 320,290 T0,284 Z" fill="#7A6A44" opacity=".75"/>';
      box.querySelector('.tep-nen').innerHTML = nen;
      var TEP = '<svg viewBox="0 0 40 24"><g stroke="' + INK + '" stroke-width="1.8" stroke-linecap="round"><path d="M4,14 Q12,3 28,9 Q35,13 28,18 Q15,22 4,14 Z" fill="#E8B9A0"/><path d="M8,12 Q16,6 26,10" fill="none" stroke="#FFE0D0" stroke-width="1.4" opacity=".9"/><path d="M10,10 v8M15,8 v10M20,8 v10" stroke="#C88A70" stroke-width="1.2"/><path d="M28,9 l8,-6M29,10 l9,-1" fill="none"/><path d="M6,14 l-4,-4M6,14 l-4,4" fill="none"/><path d="M14,19 l-1,3M18,19 l0,3M22,18 l1,3" stroke-width="1" fill="none"/><circle cx="27" cy="12" r="1.3" fill="#000" stroke="none"/></g></svg>';
      var DIA = '<svg viewBox="0 0 60 20"><path d="M4,10 q8,-8 16,0 t16,0 t16,0 q4,4 4,0" fill="none" stroke="#2A1A14" stroke-width="7" stroke-linecap="round"/><path d="M4,10 q8,-8 16,0 t16,0 t16,0" fill="none" stroke="#5A3A2A" stroke-width="2" stroke-linecap="round"/><path d="M8,8 q6,-4 10,0" fill="none" stroke="#8A6A50" stroke-width="1" opacity=".8"/></svg>';
      var TAY = '<svg viewBox="0 0 120 160"><path d="M30,160 L22,80 Q20,64 32,64 L38,96 L36,20 Q38,6 48,8 L52,90 L58,4 Q62,-6 70,0 L70,90 L82,14 Q86,4 94,10 L86,96 L102,58 Q110,50 114,60 L96,120 Q86,154 64,160 Z" fill="#1E2A26"/></svg>';
      function vong(x, y) { var v = document.createElement('div'); v.className = 'tep-vong'; v.style.left = (x / W0 * 100) + '%'; v.style.top = (y / H0 * 100) + '%'; box.appendChild(v); setTimeout(function () { v.remove(); }, 900); }
      function noi(s) { $('tep-msg').innerHTML = G.ui.fmt(s); }
      function moi(loai) {
        var e = document.createElement('div'), x, y, o = { loai: loai, el: e, t: 0 };
        if (loai === 'tep') {
          x = 40 + Math.random() * (W0 - 80); y = 40 + Math.random() * (H0 - 80);
          o.x = x; o.y = y; o.dx = (Math.random() - .5) * 90; o.cao = 30 + Math.random() * 26; o.dai = 0.75 + Math.random() * 0.35;
          e.className = 'tep-con'; e.innerHTML = TEP; e.style.transform = 'scaleX(' + (o.dx < 0 ? -1 : 1) + ')';
          vong(x, y);
        } else if (loai === 'dia') {
          o.trai = Math.random() < .5; o.x = o.trai ? -60 : W0 + 60; o.y = 40 + Math.random() * (H0 - 80); o.v = (o.trai ? 1 : -1) * (70 + Math.random() * 40);
          e.className = 'tep-dia'; e.innerHTML = DIA; if (!o.trai) e.style.transform = 'scaleX(-1)';
        } else { o.x = W0 + 80; o.y = 120 + Math.random() * 80; o.v = -60; e.className = 'tep-tay'; e.innerHTML = TAY; }
        box.appendChild(e); list.push(o); return o;
      }
      function ve(o) {
        if (o.loai === 'tep') {
          var p = o.t / o.dai, lift = Math.sin(Math.min(1, p) * Math.PI) * o.cao;
          o.cx = o.x + o.dx * p; o.cy = o.y - lift;
          o.el.style.opacity = p < 1 ? 1 : 0; o.el.style.setProperty('--s', 0.8 + lift / o.cao * 0.4);
        } else { o.cx = o.x; o.cy = o.y; }
        o.el.style.left = (o.cx / W0 * 100) + '%'; o.el.style.top = (o.cy / H0 * 100) + '%';
      }
      function frame(ts) {
        if (over) return;
        var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts; t += dt;
        spawn -= dt; if (spawn <= 0) { spawn = 0.45 + Math.random() * 0.55; moi('tep'); if (Math.random() < .35) moi('tep'); }
        diaT -= dt; if (diaT <= 0) { diaT = 3.5 + Math.random() * 3; moi('dia'); }
        if (!tayDa && t > secs * 0.62) { tayDa = true; moi('tay'); G.audio.sfx('whisper'); noi('…có gì đó vừa trôi qua dưới mặt nước.'); }
        list = list.filter(function (o) {
          o.t += dt;
          if (o.loai === 'tep') { if (o.t > o.dai + 0.2) { if (o.t - dt <= o.dai + 0.2) vong(o.x + o.dx, o.y); o.el.remove(); return false; } }
          else { o.x += o.v * dt; if (o.x < -140 || o.x > W0 + 140) { o.el.remove(); return false; } }
          ve(o); return true;
        });
        var con = Math.max(0, 1 - t / secs);
        $('tep-t').style.width = (con * 100).toFixed(1) + '%';
        box.style.setProperty('--toi', (Math.max(0, 0.6 - con) * 1.1).toFixed(3));
        if (t >= secs) { ket(false); return; }
        G.raf(frame);
      }
      function ket(ok) {
        over = true;
        list.forEach(function (o) { o.el.remove(); }); list = [];
        $('mg').classList.remove('tepp');
        if (ok) { G.audio.sfx('ok'); var c = FX.tam($('tep-gio')); FX.hat(c.x, c.y, { n: 14, kieu: 'vang', tam: 50 }); setTimeout(function () { close(); res(true); }, 600); }
        else { close(); res(false); }
      }
      box.onpointerdown = function (e) {
        if (over) return;
        var r = box.getBoundingClientRect(), k = r.width / W0, x = (e.clientX - r.left) / k, y = (e.clientY - r.top) / k, c = FX.diem(e);
        var trung = null, bd = 1e9;
        list.forEach(function (o) {
          var d = Math.hypot((o.cx || o.x) - x, (o.cy || o.y) - y);
          var tam = o.loai === 'tep' ? (o.t < o.dai ? 34 : 0) : (o.loai === 'dia' ? 30 : 0);
          if (d < tam && d < bd) { bd = d; trung = o; }
        });
        if (!trung) { vong(x, y); G.audio.sfx('splash'); chuoi = 0; FX.hat(c.x, c.y, { n: 5, kieu: 'giot', tam: 22, roi: 10, mau: ['#E8F4F0', '#BFDCDC'] }); return; }
        if (trung.loai === 'dia') {
          G.audio.sfx('bad'); n = Math.max(0, n - 2); chuoi = 0; noi('[[Đỉa cắn!]] Tấm giật tay, rơi mất hai con tép.');
          box.classList.remove('dau'); void box.offsetWidth; box.classList.add('dau');
          FX.chu(c.x, c.y - 20, '−2', 'sai'); FX.rung($('mg'));
        } else {
          chuoi++; var them = chuoi > 0 && chuoi % 4 === 0 ? 2 : 1; n += them;
          G.audio.sfx('tep'); trung.el.remove(); list.splice(list.indexOf(trung), 1); vong(x, y);
          FX.hat(c.x, c.y, { n: 8, kieu: 'giot', tam: 30, roi: 14, mau: ['#FFFFFF', '#CFE8E4', '#E8B9A0'] });
          FX.chu(c.x, c.y - 24, '+' + them, them > 1 ? 'vang' : '');
          var gio = $('tep-gio'); gio.classList.remove('nay'); void gio.offsetWidth; gio.classList.add('nay');
          noi(them > 1 ? 'Xúc liền tay! Được thêm một con.' : '&nbsp;');
        }
        $('tep-n').textContent = n + '/' + need; $('tep-day').style.height = Math.min(100, n / need * 100) + '%';
        if (n >= need) ket(true);
      };
      G.raf(frame);
    });
  };

  // ---------- giữ phím / giữ chuột ----------
  // Vòng dây đỏ quấn dần quanh một bàn tay nắm chặt sợi thừng; giữ thì tay siết và rung.
  function tayNam() {
    var V = G.ve;
    if (!V) return '';
    return '<g transform="translate(60,84) scale(.2)" stroke="' + INK + '" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">' +
      V.ngonCai({}) + '<path d="M-220,4 H220" stroke="#5A3A20" stroke-width="40"/><path d="M-220,4 H220" stroke="#C9A35E" stroke-width="28"/>' +
      '<path d="M-200,-8 l20,24M-140,-8 l20,24M140,-8 l20,24M190,-8 l20,24" stroke="#8A6A3A" stroke-width="5"/>' +
      V.banTay({ kieu: 'nam', caiRieng: true, ao: false }) + '</g>';
  }
  // Giữ thì lực siết tăng, buông thì lực tụt. Phải giữ kim lực nằm trong vùng đỏ đang trôi (cái gì đó đang giằng lại).
  // Trong vùng thì vòng dây quấn thêm; ngoài vùng thì tuột dần. Thỉnh thoảng bị GIẬT: vùng nhảy sang chỗ khác.
  M.hold = function (text, secs) {
    return new Promise(function (res) {
      open('<div class="hold"><h2>' + text + '</h2><div class="hint">Nhấp-nhả <b>Space / E</b> (hoặc chuột) để giữ <b>kim lực</b> nằm trong <b>vùng đỏ</b>. Siết quá thì đứt, lỏng quá thì tuột.</div>' +
        '<div class="hold-vong"><svg viewBox="0 0 120 120" width="170" height="170"><circle cx="60" cy="60" r="50" fill="#2B1F1A" opacity=".08" stroke="none"/>' +
        '<circle cx="60" cy="60" r="50" fill="none" stroke="#2B1F1A" stroke-width="10" opacity=".2"/>' +
        '<circle id="hold-c" cx="60" cy="60" r="50" fill="none" stroke="#B84A3E" stroke-width="10" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="314" transform="rotate(-90 60 60)"/>' +
        '<circle cx="60" cy="60" r="50" fill="none" stroke="#FFE0B0" stroke-width="2" stroke-dasharray="3 9" opacity=".6" transform="rotate(-90 60 60)" class="hold-soi"/>' +
        '<g class="hold-tay">' + tayNam() + '</g></svg></div>' +
        '<div class="hold-luc" id="hold-luc"><span class="hl-nhan l">lỏng</span><div class="hl-ray"><i class="hl-vung" id="hl-vung"></i><b class="hl-kim" id="hl-kim"></b></div><span class="hl-nhan r">đứt</span></div>' +
        '<div class="hold-pct" id="hold-pct">0%</div><div class="hold-say" id="hold-say">&nbsp;</div></div>');
      var p = $('mg'), down = false, last = 0, bubT = 0, dang = null, xong = false;
      var can = secs * 1.6, v = 0, m = 0.15, vel = 0, z = 0.5, zDich = 0.5, zT = 1.2, giatT = 2.6 + Math.random() * 1.5, W = 0.24, ngoai = 0, trong0 = null;
      p.classList.add('holdp');
      p.onpointerdown = function () { down = true; }; p.onpointerup = p.onpointerleave = function () { down = false; };
      function noi(t) { $('hold-say').innerHTML = t; }
      function f(ts) {
        if (xong || !$('hold-c')) return;
        var dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts;
        var h = down || G.input.hold;
        if (h !== dang) { dang = h; p.classList.toggle('giu', h); }
        // kim lực: giữ thì đẩy lên, buông thì rơi, có quán tính
        vel += (h ? 2.4 : -2.0) * dt; vel *= Math.pow(0.18, dt);
        m += vel * dt;
        if (m < 0) { m = 0; vel = 0; } if (m > 1) { m = 1; vel = -0.4; }
        // vùng an toàn trôi về điểm đích ngẫu nhiên; càng về cuối càng nhanh và hẹp
        var tien = v / can;
        zT -= dt; if (zT <= 0) { zT = 0.9 + Math.random() * 1.3; zDich = 0.2 + Math.random() * 0.6; }
        z += (zDich - z) * Math.min(1, dt * (1.1 + tien * 1.6));
        W = 0.26 - tien * 0.08;
        giatT -= dt;
        if (giatT <= 0) { // bị giằng mạnh
          giatT = 2.2 + Math.random() * 2.2; zDich = z > .5 ? 0.15 + Math.random() * .2 : 0.65 + Math.random() * .2; z += (zDich - z) * .6; zT = 1.4;
          G.audio.sfx('whoosh'); FX.rung(p); noi('<b>Giật!</b> Có cái gì đó kéo ngược lại.');
        }
        var lo = z - W / 2, hi = z + W / 2, trong = m >= lo && m <= hi;
        if (trong !== trong0) { trong0 = trong; p.classList.toggle('lech', !trong); }
        if (trong) { v = Math.min(can, v + dt); ngoai = 0; }
        else { v = Math.max(0, v - dt * (m > hi ? 0.8 : 0.55)); ngoai += dt; }
        if (m >= 0.985 && ngoai > 0.3 && bubT <= 0) { noi('Siết quá tay, dây cứa vào da.'); }
        else if (m <= 0.02 && ngoai > 0.6) { noi('Lỏng tay, tuột mất một đoạn.'); }
        bubT -= dt; if (h && trong && bubT <= 0) { bubT = 0.5; G.audio.sfx('bubble'); var c = FX.tam(p.querySelector('.hold-vong')); FX.hat(c.x, c.y + 30, { n: 3, kieu: 'bui', tam: 60, goc: -Math.PI / 2, toa: 2, mau: ['#C9A35E', '#8A6A3A'] }); }
        $('hl-vung').style.left = (lo * 100).toFixed(1) + '%'; $('hl-vung').style.width = (W * 100).toFixed(1) + '%';
        $('hl-kim').style.left = (m * 100).toFixed(1) + '%';
        $('hold-c').setAttribute('stroke-dashoffset', 314 * (1 - v / can));
        $('hold-pct').textContent = Math.round(v / can * 100) + '%';
        if (v >= can) { xong = true; close(); p.onpointerdown = p.onpointerup = p.onpointerleave = null; p.classList.remove('holdp', 'giu', 'lech'); res(); return; }
        G.raf(f);
      }
      G.raf(f);
    });
  };
})();
