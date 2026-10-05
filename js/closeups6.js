// Chương 5: tranh cận cảnh, bếp lửa nồi nước sôi ở vườn ngự, phim gốc đa (kết bí mật).
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK, $ = G.$, K = G.sceneKit;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  C.tam_nua = function () { // Tấm trở về, qua bát nước: một nửa người trong suốt
    var s = '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/><path d="M120,300 Q200,140 280,300 Z" fill="#D9A93A"/><circle cx="200" cy="120" r="50" fill="#EBCDAA"/>';
    s += '<path d="M150,110 Q150,60 200,58 Q250,60 250,110 Q240,80 200,80 Q160,80 150,110 Z" fill="#2B1F1A"/>';
    s += '<circle cx="184" cy="122" r="5" fill="#2B1F1A"/><path d="M186,146 q14,10 28,0" fill="none" stroke-width="3"/>';
    s += '<rect x="200" y="0" width="200" height="300" fill="#0A1A1E" opacity=".78" stroke="none"/><path d="M200,0 V300" stroke="#9FF0F0" stroke-width="2" stroke-dasharray="6 6"/>';
    return wrap(s, '#0A1A1E');
  };
  C.day_hu = function () { // đáy hũ khắc ngày sinh của Cám
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><ellipse cx="200" cy="150" rx="140" ry="110" fill="#6A5A4A"/><ellipse cx="200" cy="150" rx="110" ry="84" fill="#7A6A5A"/>';
    s += '<text x="200" y="135" text-anchor="middle" font-size="18" fill="#2A1A10" stroke="none" font-weight="800">Giờ Dậu</text><text x="200" y="165" text-anchor="middle" font-size="18" fill="#2A1A10" stroke="none" font-weight="800">mùng chín tháng chín</text>';
    s += '<text x="200" y="195" text-anchor="middle" font-size="14" fill="#8A1A12" stroke="none">(ngày sinh của Cám)</text>';
    return wrap(s);
  };
  C.ho_dao = function () {
    var s = '<rect width="400" height="300" fill="#4A5A3A" stroke="none"/><ellipse cx="200" cy="170" rx="150" ry="70" fill="#2A1A10"/><path d="M80,150 l20,20 l20,-10 l20,20" fill="none" stroke="#8A6A4A" stroke-width="6"/>';
    [[300, 90], [330, 110], [310, 120]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="16" ry="12" fill="#9A8A7A"/>'; });
    s += '<text x="200" y="285" text-anchor="middle" font-size="13" fill="#E9E2D0" stroke="none">bậc đất xuống hố · ba ông đầu rau kê sẵn</text>';
    return wrap(s);
  };
  C.qua_mai = function () { // quạ đậu kín mái nhà dưới trăng
    var s = '<rect width="400" height="300" fill="#141220" stroke="none"/><circle cx="300" cy="80" r="50" fill="#E8D8A8" stroke="none"/><path d="M0,200 L200,120 L400,200 V300 H0 Z" fill="#2A2028"/>';
    for (var i = 0; i < 22; i++) { var x = 20 + i * 17, y = 200 - Math.min(x, 400 - x) * 0.4 - 8; s += '<path d="M' + x + ',' + y + ' q6,-12 12,0 q-6,4 -12,0 z" fill="#0A0808" stroke="none"/><circle cx="' + (x + 9) + '" cy="' + (y - 7) + '" r="1.5" fill="#E8C030" stroke="none"/>'; }
    return wrap(s, '#141220');
  };
  C.qua_hu = function () { // nhìn ra qua miệng hũ: một bàn tay dán bùa
    var s = '<rect width="400" height="300" fill="#000" stroke="none"/><circle cx="200" cy="150" r="90" fill="#3A3A48" stroke="none"/>';
    s += '<path d="M150,90 L250,96 L240,210 L160,206 Z" fill="#E8CB6A"/><path d="M200,100 v96M180,124 h40M186,160 q14,-14 28,0" fill="none" stroke="#8A1A10" stroke-width="3"/><path d="M220,124 q10,6 6,14" fill="none" stroke="#8A1A10" stroke-width="3"/>';
    s += '<path d="M260,170 q40,-10 60,20 l-30,30 q-20,-30 -40,-20 z" fill="#D8C2A0"/>';
    s += '<circle cx="200" cy="150" r="140" fill="none" stroke="#000" stroke-width="100"/>';
    return wrap(s, '#000');
  };
  C.so_tu = function () { // trang cuối Sổ Tử
    var s = '<rect width="400" height="300" fill="#4A3222" stroke="none"/><rect x="60" y="30" width="280" height="240" fill="#EFE6CF"/>';
    for (var y = 70; y < 240; y += 26) s += '<path class="d" d="M84,' + y + ' h' + (160 + (y % 52)) + '"/>';
    s += '<text x="84" y="58" font-size="15" fill="#3A2418" stroke="none" font-weight="800">Trang cuối</text><path d="M240,230 q20,-30 50,-10" fill="none" stroke="#B8241A" stroke-width="3"/>';
    return wrap(s);
  };
  C.so_khach = function () { // sổ khách của Thầy Cả: trang mới
    var s = '<rect width="400" height="300" fill="#1A1210" stroke="none"/><rect x="60" y="30" width="280" height="240" fill="#E9D9A8"/>';
    s += '<text x="84" y="70" font-size="14" fill="#3A2418" stroke="none" text-decoration="line-through">Dì ghẻ · làng Đông · đã đủ</text>';
    s += '<text x="84" y="110" font-size="14" fill="#3A2418" stroke="none">Gốc đa · làng bên kia sông:</text><text x="84" y="136" font-size="14" fill="#8A1A12" stroke="none">cần một người khỏe, không cha</text><text x="84" y="160" font-size="14" fill="#8A1A12" stroke="none">không mẹ, không ai đi tìm.</text>';
    s += '<path d="M84,200 h120 q10,6 6,14" fill="none" stroke="#2A1A10" stroke-width="3"/>';
    return wrap(s, '#1A1210');
  };

  // bếp lửa ba ông đầu rau và nồi nước ở vườn ngự (chương 5)
  G.scenes.ch5Hook = function (b, S) {
    if (S.chapter !== 'ch5') return;
    var x = 640, y = 570, f = S.flags;
    var s = '<ellipse cx="' + x + '" cy="' + (y + 6) + '" rx="40" ry="12" fill="#2A1A14"/>';
    [[x - 22, y], [x + 22, y], [x, y + 12]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="9" ry="7" fill="#9A8A7A" stroke-width="2"/>'; });
    if (S.phase === 'dem') s += '<path d="M' + (x - 14) + ',' + (y - 4) + ' q6,-20 12,-4 q6,-18 12,0" fill="#FF9A30" class="flick" stroke-width="1.5"/>';
    s += '<path d="M' + (x - 26) + ',' + (y - 14) + ' Q' + x + ',' + (y - 40) + ' ' + (x + 26) + ',' + (y - 14) + ' Q' + (x + 26) + ',' + (y + 2) + ' ' + x + ',' + (y + 4) + ' Q' + (x - 26) + ',' + (y + 2) + ' ' + (x - 26) + ',' + (y - 14) + ' Z" fill="#4A4650"/><ellipse cx="' + x + '" cy="' + (y - 16) + '" rx="24" ry="7" fill="#7AB0C0"/>';
    if (S.phase === 'dem') s += '<path d="M' + (x - 8) + ',' + (y - 26) + ' q4,-14 0,-26M' + (x + 8) + ',' + (y - 28) + ' q4,-16 0,-28" fill="none" stroke="#E9E2D0" stroke-width="3" opacity=".7"/>';
    if (f.c5_pha) s += '<path d="M' + (x + 30) + ',' + (y + 10) + ' l10,-6 l6,8 l-8,6 z M' + (x + 44) + ',' + (y + 4) + ' l8,-2 l2,8 z" fill="#6A5A4A" stroke-width="2"/>';
    b.prop(x - 40, y - 60, 80, 74, s, y + 8);
    b.solid(x - 30, y - 14, 60, 26);
    if (S.phase === 'dem') b.lights.push({ x: x, y: y - 10, r: 150, flick: true });
  };

  // phim gốc đa: mở sang Thạch Sanh (kết bí mật)
  G.cine.gocDa = function (done) {
    var c = $('cine');
    var s = '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><rect width="960" height="540" fill="#0C0A12"/>';
    s += '<circle cx="760" cy="110" r="60" fill="#D8C898" opacity=".8"/>';
    // cây đa cổ thụ với rễ phụ buông
    s += '<g fill="#14101A"><path d="M440,470 Q430,330 470,250 L530,250 Q560,330 560,470 Z"/>';
    for (var i = 0; i < 12; i++) s += '<circle cx="' + (300 + i * 40) + '" cy="' + (170 + (i % 3) * 30) + '" r="' + (70 + (i % 4) * 12) + '"/>';
    for (var j = 0; j < 14; j++) s += '<rect x="' + (330 + j * 24) + '" y="220" width="3" height="' + (150 + (j % 5) * 30) + '"/>';
    s += '</g><path d="M0,470 Q480,450 960,470 V540 H0 Z" fill="#08060C"/>';
    // cổng làng treo giấy đỏ
    s += '<rect x="90" y="300" width="14" height="170" fill="#2A1A14"/><rect x="230" y="300" width="14" height="170" fill="#2A1A14"/><path d="M70,300 H264 L250,280 H84 Z" fill="#2A1A14"/>';
    s += '<rect x="130" y="320" width="74" height="96" fill="#8A1A12"/><path d="M140,336 h54M140,352 h48M140,368 h54M140,384 h40" stroke="#E8C030" stroke-width="3"/>';
    // đống lửa, chàng trai đốn củi, chiếc rìu, niêu cơm
    s += '<g id="gd-lua"><path d="M590,470 q10,-40 20,-10 q10,-44 22,0 q8,-30 16,0 z" fill="#E8701A"/></g><circle cx="610" cy="460" r="70" fill="#E8701A" opacity=".15"/>';
    s += '<g fill="#0A0808"><circle cx="560" cy="398" r="16"/><path d="M540,416 q20,-10 40,0 l6,54 h-52 z"/><path d="M590,470 L612,404" stroke="#0A0808" stroke-width="6"/><path d="M606,398 q14,-6 20,8 l-12,6 z" fill="#9AA0A4"/>';
    s += '<ellipse cx="520" cy="462" rx="14" ry="10" fill="#3A2A20"/></g>';
    s += '<g id="gd-mat" opacity="0"><circle cx="555" cy="396" r="2" fill="#E8C030"/><circle cx="565" cy="396" r="2" fill="#E8C030"/></g>';
    s += '</svg><div class="ctext"></div><div class="flash"></div>';
    c.innerHTML = s; c.hidden = false;
    var t = c.querySelector('.ctext'), skip = false;
    function say(m, cls) { t.className = 'ctext ' + (cls || ''); t.style.opacity = 0; setTimeout(function () { t.textContent = m; t.style.opacity = 1; }, 60); }
    function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
    (async function () {
      G.audio.music(null); G.audio.ambience('dem');
      await wait(800); say('Làng bên kia sông. Đầu làng có một cây đa cổ thụ.');
      await wait(3600); say('Cổng làng treo một tờ giấy đỏ: danh sách năm nay.');
      await wait(3600); say('Dưới gốc đa, một chàng trai đốn củi ngồi bên đống lửa. Chiếc rìu cắm cạnh chân. Một chiếc niêu nhỏ.');
      await wait(4200);
      $('gd-mat').setAttribute('opacity', '1'); G.audio.sfx('stinger');
      say('Chàng ngẩng lên. Nhìn thẳng về phía này.');
      await wait(3400);
      c.querySelector('svg').style.transition = 'opacity 1s'; c.querySelector('svg').style.opacity = 0; t.style.opacity = 0;
      await wait(1400);
      [0, 0.5, 1.1, 1.5].forEach(function (d) { G.audio.sfx('bell', d); });
      await wait(2600);
      say('Năm nay đến lượt ai?', 'center serif');
      await wait(3600);
      say('Còn tiếp…', 'center');
      await wait(3000);
      c.hidden = true; c.innerHTML = '';
      if (done) done();
    })();
  };
})();
