// Tranh cận cảnh Chương 1.
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }

  C.chim_tim = function () { // nồi ninh: tim chim vẫn đập
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><ellipse cx="200" cy="170" rx="160" ry="90" fill="#4A4650"/><ellipse cx="200" cy="150" rx="140" ry="60" fill="#6A5A3A"/>';
    for (var i = 0; i < 8; i++) s += '<circle cx="' + (90 + i * 30) + '" cy="' + (140 + (i % 3) * 10) + '" r="' + (6 + i % 3 * 2) + '" fill="#8A7A4A" stroke-width="1.5"/>';
    s += '<g class="tim"><path d="M200,170 q-30,-30 -10,-48 q10,-8 10,6 q0,-14 10,-6 q20,18 -10,48 z" fill="#A8241A"/></g>';
    s += '<path d="M160,90 q6,-20 0,-40M240,86 q6,-22 0,-44" fill="none" stroke="#D8D0C0" stroke-width="4" opacity=".6"/>';
    return wrap(s);
  };
  C.xuong_chim = function () {
    var s = '<rect width="400" height="300" fill="#C79A5E" stroke="none"/><ellipse cx="200" cy="160" rx="150" ry="100" fill="#A07A4A"/>';
    s += '<path d="M150,200 L210,130 L260,150" fill="none" stroke="#F3EEDF" stroke-width="10"/><path d="M210,130 l-8,-30 l16,4" fill="none" stroke="#F3EEDF" stroke-width="8"/>';
    s += '<path d="M205,118 l14,10" stroke="#8A1A12" stroke-width="4"/><circle cx="218" cy="96" r="12" fill="#F3EEDF"/><path d="M228,96 l14,2" stroke-width="3"/>';
    for (var i = 0; i < 6; i++) s += '<path d="M' + (90 + i * 40) + ',230 q10,-14 20,0" fill="none" stroke="#E8C030" stroke-width="5"/>';
    return wrap(s);
  };
  C.co_lai = function () { // cổ tay áo, vết ngón tay to (không vẽ mặt)
    var s = '<rect width="400" height="300" fill="#3A4A48" stroke="none"/><path d="M60,300 Q120,120 200,110 Q280,120 340,300 Z" fill="#D8C8B0"/>';
    s += '<path d="M120,300 Q160,220 200,216 Q240,220 280,300" fill="#6E9A5A"/>';
    [[150, 160], [176, 146], [210, 142], [242, 150], [262, 176]].forEach(function (p) { s += '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="11" ry="17" fill="#6A4A6A" opacity=".75" stroke="none"/>'; });
    s += '<path d="M120,190 Q200,240 280,190" fill="none" stroke="#6A4A6A" stroke-width="10" opacity=".5"/>';
    return wrap(s);
  };
  C.chi_do = function () {
    var s = '<rect width="400" height="300" fill="#3A4A48" stroke="none"/><path d="M120,300 L150,120 q8,-30 26,-6 l6,120 M190,300 L220,90 q10,-28 26,-2 l-4,150" fill="#D8C8B0"/>';
    s += '<path d="M150,124 q12,-8 22,4M222,94 q12,-8 22,4" fill="none" stroke="#8A6A5A" stroke-width="3"/>';
    s += '<path d="M156,120 q30,-40 70,-30 q40,10 80,-20" fill="none" stroke="#C8241A" stroke-width="4"/>';
    return wrap(s);
  };
  C.so_gac = function () {
    var s = '<rect width="400" height="300" fill="#5A3A2A" stroke="none"/><rect x="60" y="40" width="280" height="220" fill="#E9D9A8"/>';
    for (var y = 70; y < 240; y += 24) s += '<path class="d" d="M80,' + y + ' h' + (120 + (y % 48)) + '"/>';
    s += '<rect x="76" y="150" width="250" height="26" fill="none" stroke="#B8241A" stroke-width="3"/><text x="90" y="168" font-size="15" fill="#5A1A12" stroke="none" font-weight="800">Giờ Tý · Ngạn · đổi ca</text>';
    return wrap(s);
  };
  C.banh_duc = function () {
    var s = '<rect width="400" height="300" fill="#7A3A2A" stroke="none"/><ellipse cx="200" cy="170" rx="150" ry="70" fill="#E9E2D0"/><ellipse cx="200" cy="160" rx="110" ry="46" fill="#D8D8C0"/>';
    s += '<path d="M150,160 l60,-10" stroke="#F8F4E8" stroke-width="6"/><path d="M162,152 l4,14M178,150 l4,14M194,148 l4,14" stroke="#F8F4E8" stroke-width="3"/>';
    s += '<path d="M150,160 l60,-10" stroke-width="1.5"/>';
    return wrap(s);
  };
  C.long_vang = function () {
    var s = '<rect width="400" height="300" fill="#2A3A3A" stroke="none"/><path d="M120,300 Q160,180 220,170 Q290,180 300,300 Z" fill="#B8C0B8"/>';
    s += '<path d="M200,190 Q240,120 300,80 Q260,140 210,200 Z" fill="#E8C030"/><path d="M204,190 Q250,130 296,84" fill="none" stroke-width="2"/>';
    return wrap(s);
  };
  C.dau_ca = function () { // thứ ngoi lên khi đọc sai: đầu cá to bằng đầu người, mắt người
    var s = '<rect width="400" height="300" fill="#0E1616" stroke="none"/><ellipse cx="200" cy="170" rx="150" ry="80" fill="#1E2A2A"/>';
    s += '<path d="M90,200 Q150,90 250,110 Q320,130 310,200 Q240,240 150,230 Z" fill="#6A7A6A"/>';
    s += '<ellipse cx="230" cy="150" rx="22" ry="14" fill="#F3EEDF"/><circle cx="236" cy="150" r="8" fill="#3A2A1A"/><path d="M208,140 q22,-12 44,0" fill="none" stroke-width="3"/>';
    s += '<path d="M120,190 q30,14 60,0" fill="none" stroke="#3A2A2A" stroke-width="4"/><path d="M260,180 l18,-6 l-6,16 z" fill="#4A5A4A"/>';
    return wrap(s, '#0E1616');
  };
  C.mau_gieng = function () {
    var s = '<rect width="400" height="300" fill="#0E1616" stroke="none"/><ellipse cx="200" cy="150" rx="170" ry="120" fill="#7A6A5A"/><ellipse cx="200" cy="150" rx="140" ry="96" fill="#142020"/>';
    s += '<ellipse cx="200" cy="160" rx="46" ry="22" fill="#7A100A" stroke="none"/><ellipse cx="190" cy="154" rx="16" ry="6" fill="#A8241A" stroke="none"/>';
    return wrap(s, '#0E1616');
  };
  C.bon_lo = function () {
    var s = '<rect width="400" height="300" fill="#4A3222" stroke="none"/><rect x="70" y="60" width="260" height="170" fill="#C9A35E"/>';
    [[70, 60], [330, 60], [70, 230], [330, 230]].forEach(function (p) { s += '<rect x="' + (p[0] - 8) + '" y="' + (p[1] - 8) + '" width="16" height="16" fill="#8A6A3A"/><ellipse cx="' + p[0] + '" cy="' + (p[1] + 26) + '" rx="16" ry="8" fill="#6A4A2E"/>'; });
    return wrap(s);
  };
  C.mam_cay = function () {
    var s = '<rect width="400" height="300" fill="#97A867" stroke="none"/><ellipse cx="200" cy="250" rx="80" ry="20" fill="#6A4A2E"/><path d="M200,250 v-110" stroke="#6A4A2E" stroke-width="8"/>';
    s += '<path d="M200,190 q-60,-30 -70,-80 q60,14 70,80 z M200,170 q60,-40 70,-90 q-60,14 -70,90 z" fill="#B8241A"/>';
    return wrap(s);
  };
  C.bong_dao = function () { // bóng cô gái trên cây đào (qua bát nước)
    var s = '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/>';
    for (var i = 0; i < 9; i++) s += '<circle cx="' + (40 + i * 40) + '" cy="' + (40 + (i % 3) * 30) + '" r="34" fill="#1E3A3E" stroke="none"/>';
    s += '<path d="M120,300 Q160,200 150,120" fill="none" stroke="#2A2A2A" stroke-width="22"/>';
    s += '<path d="M170,150 q14,-60 44,-60 q30,0 34,46 l12,70 q-46,14 -92,0 z" fill="#BFF0EA" opacity=".8" stroke="none"/>';
    s += '<path d="M186,110 q-10,80 -6,130M238,110 q14,80 6,130" fill="none" stroke="#0A1A1E" stroke-width="10"/>';
    s += '<g transform="translate(270,90)"><ellipse rx="14" ry="10" fill="#E8C030"/><circle cx="12" cy="-6" r="7" fill="#E8C030"/></g>';
    return wrap(s, '#0A1A1E');
  };
  C.por_lai = function () { return C.co_lai(); };
  C.por_basau = function () {
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><path d="M60,300 Q200,160 340,300 Z" fill="#9A6A4A"/><path d="M120,240 l20,30 l14,-20 l20,30" fill="none" stroke="#6A4A6A" stroke-width="6"/>';
    s += '<ellipse cx="290" cy="250" rx="30" ry="12" fill="#3A2A2A"/><text x="260" y="290" font-size="14" fill="#E9E2D0" stroke="none">dấu giày to</text>';
    return wrap(s);
  };
})();
