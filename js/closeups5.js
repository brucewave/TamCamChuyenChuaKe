// Tranh cận cảnh Chương 4 và minigame: bán hàng nước, têm trầu cánh phượng.
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK, $ = G.$;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  C.cay_thi = function () {
    var s = '<rect width="400" height="300" fill="#1E2A20" stroke="none"/>';
    for (var i = 0; i < 9; i++) s += '<circle cx="' + (40 + i * 42) + '" cy="' + (60 + (i % 3) * 30) + '" r="44" fill="#3E5A30" stroke="none"/>';
    s += '<path d="M150,300 Q170,200 200,150" fill="none" stroke="#4A3A2A" stroke-width="20"/>';
    s += '<circle cx="230" cy="160" r="60" fill="#FFD98A" opacity=".35" stroke="none"/><circle cx="230" cy="160" r="26" fill="#E8C030"/><path d="M230,134 v-14" stroke-width="4"/>';
    return wrap(s, '#1E2A20');
  };
  C.chan_tran = function () {
    var s = '<rect width="400" height="300" fill="#6A5A40" stroke="none"/>';
    for (var j = 0; j < 5; j++) { var x = 60 + j * 70, y = 150 + (j % 2) * 40; s += '<ellipse cx="' + x + '" cy="' + y + '" rx="16" ry="28" fill="#4A3A28"/>'; for (var k = 0; k < 5; k++) s += '<circle cx="' + (x - 12 + k * 6) + '" cy="' + (y - 32 - Math.abs(k - 2) * 2) + '" r="4" fill="#4A3A28"/>'; }
    s += '<path d="M330,150 l40,0 l-10,-10M370,150 l-10,10" stroke="#F3EEDF" stroke-width="4" fill="none"/><text x="300" y="200" font-size="14" fill="#F3EEDF" stroke="none">về phía đông</text>';
    return wrap(s);
  };
  C.co_chan = function () { // cổ chân Đội Ngạn: dấu tay nhỏ như tay đàn bà
    var s = '<rect width="400" height="300" fill="#2E4A4A" stroke="none"/><path d="M80,120 L320,100 L330,180 L90,200 Z" fill="#C8B8A0"/>';
    [[160, 120], [180, 116], [200, 114], [220, 114], [240, 118]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="7" ry="12" fill="#3A5A6A" opacity=".8" stroke="none"/>'; });
    s += '<path d="M150,190 Q200,170 250,188" fill="none" stroke="#3A5A6A" stroke-width="8" opacity=".6"/><path d="M80,200 L60,260 L120,270 L130,206" fill="#3A2A20"/>';
    return wrap(s, '#2E4A4A');
  };
  C.so_no = function () { // sổ nợ ngải trên bàn thờ nhà dì ghẻ
    var s = '<rect width="400" height="300" fill="#4A2A1E" stroke="none"/><rect x="60" y="30" width="280" height="240" fill="#E9D9A8"/>';
    s += '<text x="80" y="66" font-size="15" fill="#3A2418" stroke="none" font-weight="800">Sổ nợ</text>';
    s += '<text x="80" y="100" font-size="13" fill="#3A2418" stroke="none">Ngải vào cung: một hũ, một lá bùa.</text><text x="80" y="126" font-size="13" fill="#3A2418" stroke="none">Đổi: hồn đứa con gái của chồng.</text>';
    s += '<text x="80" y="160" font-size="13" fill="#3A2418" stroke="none">Rắc tro: ba ngả. Đã trả.</text><text x="80" y="194" font-size="13" fill="#8A1A12" stroke="none" font-weight="800">Còn nợ: một hồn nữa, đúng ngày.</text>';
    s += '<circle cx="290" cy="236" r="16" fill="none" stroke="#B8241A" stroke-width="3"/><path d="M100,240 h120 q10,6 6,14" fill="none" stroke="#2A1A10" stroke-width="3"/>';
    return wrap(s);
  };
  C.hu_sanh = function () { // hũ sành dán bùa, đáy là lọ xương thứ tư
    var s = '<rect width="400" height="300" fill="#1A1210" stroke="none"/><path d="M150,60 h100 q40,40 30,120 q-10,60 -80,64 q-70,-4 -80,-64 q-10,-80 30,-120 z" fill="#6A5A4A"/>';
    s += '<rect x="186" y="100" width="28" height="110" fill="#E8CB6A" transform="rotate(-8 200 155)"/><path d="M200,110 v90M190,130 h20M192,170 q8,-8 16,0" fill="none" stroke="#8A1A10" stroke-width="3" transform="rotate(-8 200 155)"/>';
    s += '<path d="M160,236 h80 v14 q0,14 -40,14 q-40,0 -40,-14 z" fill="#B0805A"/><text x="250" y="262" font-size="12" fill="#E9E2D0" stroke="none">đáy: lọ xương</text>';
    s += '<ellipse cx="200" cy="60" rx="50" ry="12" fill="#2A1A14"/>';
    return wrap(s, '#1A1210');
  };
  C.thi_gia = function () { // quả thị giả: bổ ra là một cái đầu chim
    var s = '<rect width="400" height="300" fill="#1E2A20" stroke="none"/><path d="M110,160 Q110,80 200,76 Q290,80 290,160 Z" fill="#C9A23A"/><path d="M110,170 Q110,250 200,254 Q290,250 290,170 Z" fill="#C9A23A"/>';
    s += '<path d="M130,166 Q200,150 270,166" fill="#3A2A1A"/><circle cx="200" cy="166" r="30" fill="#E8C030"/><circle cx="212" cy="158" r="6" fill="#F3EEDF"/><circle cx="213" cy="158" r="3" fill="#2B1F1A" stroke="none"/><path d="M226,166 l18,4 l-18,4 z" fill="#C88A2A"/>';
    return wrap(s, '#1E2A20');
  };
  C.qua_thi = function () {
    var s = '<rect width="400" height="300" fill="#3A2A20" stroke="none"/><circle cx="200" cy="160" r="90" fill="#FFD98A" opacity=".3" stroke="none"/><circle cx="200" cy="160" r="62" fill="#E8C030"/><path d="M200,98 v-20M190,90 q10,-14 24,-6" fill="none" stroke-width="4"/>';
    s += '<path class="s" d="M232,110 A62,62 0 0 1 240,210 Q256,160 232,110 Z"/>';
    return wrap(s);
  };
  C.por_ngan = function () { return C.co_chan(); };

  // ---------- minigame: bán hàng nước giúp bà cụ ----------
  var MON = { tra: 'Bát chè xanh', trau: 'Miếng trầu', banh: 'Bánh đúc', voi: 'Bát nước vối' };
  G.mg.hangNuoc = function (khach) {
    return new Promise(function (res) {
      var i = 0, sai = 0, p = $('mg'); p.className = 'panel big'; G.ui.open('mg', '');
      function render(msg) {
        var k = khach[i];
        p.innerHTML = '<h2>Trông hàng nước</h2><div class="hint">Khách gọi gì thì đưa đúng món ấy. Khách vừa ăn uống vừa kể chuyện.</div>' +
          '<div class="hn"><div class="khach"><b>' + k.ten + '</b><div class="goi">“' + k.goi + '”</div></div><div class="mon">' +
          Object.keys(MON).map(function (m) { return '<button data-m="' + m + '">' + MON[m] + '</button>'; }).join('') + '</div></div>' +
          '<div class="hint">' + (msg || 'Khách ' + (i + 1) + '/' + khach.length) + '</div>';
      }
      render();
      p.onclick = function (e) {
        var b = e.target.closest('[data-m]'); if (!b) return;
        if (b.dataset.m === khach[i].mon) { G.audio.sfx('clue'); i++; if (i >= khach.length) { G.ui.close('mg'); p.onclick = null; res(sai); return; } render(); }
        else { sai++; G.audio.sfx('bad'); render('Không phải món ấy. Khách nhắc lại.'); }
      };
    });
  };

  // ---------- minigame: têm trầu cánh phượng ----------
  var BUOC = [
    { hint: 'Quệt vôi lên lá trầu', vung: [150, 110, 100, 80] },
    { hint: 'Gấp đôi lá theo sống lá', vung: [190, 60, 20, 180] },
    { hint: 'Xẻ hai cánh ở đuôi lá', vung: [230, 190, 70, 50] },
    { hint: 'Cuộn lá lại thành thân phượng', vung: [120, 140, 80, 60] },
    { hint: 'Cài tăm, xòe cánh phượng', vung: [180, 30, 60, 40] }
  ];
  function la(buoc) {
    var s = '<svg viewBox="0 0 400 260" width="400" height="260"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round">';
    if (buoc < 2) s += '<path d="M200,40 Q320,80 300,170 Q260,240 200,250 Q140,240 100,170 Q80,80 200,40 Z" fill="#5E8A3A"/><path d="M200,44 V246" stroke="#3E6A2A" stroke-width="2"/>';
    else if (buoc < 4) s += '<path d="M200,40 Q260,80 250,170 Q230,240 200,250 Z" fill="#5E8A3A"/>' + (buoc >= 3 ? '<path d="M210,230 l40,-20 l-6,30 z M220,240 l46,0 l-20,20 z" fill="#6E9A4A"/>' : '');
    else s += '<path d="M180,70 Q150,130 170,200 L220,200 Q240,130 220,70 Z" fill="#5E8A3A"/><path d="M210,190 q40,-10 60,-40 q-10,30 -40,56 z M190,190 q-40,-10 -60,-40 q10,30 40,56 z" fill="#6E9A4A"/>' + (buoc >= 5 ? '<path d="M200,30 v60" stroke="#C9A35E" stroke-width="5"/>' : '');
    if (buoc >= 1 && buoc < 4) s += '<path d="M150,120 q50,-20 100,10" stroke="#F3EEDF" stroke-width="8" fill="none" opacity=".8"/>';
    return s + '</g></svg>';
  }
  G.mg.temTrau = function () {
    return new Promise(function (res) {
      var b = 0, p = $('mg'); p.className = 'panel big'; G.ui.open('mg', '');
      function render() {
        var v = BUOC[b];
        p.innerHTML = '<h2>Têm trầu cánh phượng</h2><div class="hint">Bà cụ bảo: "Trầu têm thì quả mới chịu mở." Bước ' + (b + 1) + '/5: <b>' + v.hint + '</b>. Bấm vào đúng chỗ trên lá.</div>' +
          '<div class="trau" id="trau">' + la(b) + '<div class="vung" style="left:' + v.vung[0] + 'px;top:' + v.vung[1] + 'px;width:' + v.vung[2] + 'px;height:' + v.vung[3] + 'px"></div></div>';
      }
      render();
      p.onclick = function (e) {
        var t = $('trau'); if (!t || !t.contains(e.target)) return;
        if (e.target.classList.contains('vung')) { b++; G.audio.sfx('paper'); if (b >= BUOC.length) { G.audio.sfx('ok'); p.innerHTML = '<h2>Têm trầu cánh phượng</h2><div class="trau">' + la(5) + '</div>'; setTimeout(function () { G.ui.close('mg'); p.onclick = null; res(); }, 900); return; } render(); }
        else { G.audio.sfx('bad'); t.classList.add('bad'); setTimeout(function () { t.classList.remove('bad'); }, 400); }
      };
    });
  };
})();
