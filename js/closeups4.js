// Tranh cận cảnh Chương 3.
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  C.khung_cui = function () {
    return wrap('<rect width="400" height="300" fill="#2A1A14" stroke="none"/>' + '<ellipse cx="200" cy="160" rx="170" ry="120" fill="#4A2E20" stroke="none"/><g transform="translate(200,168) scale(2) translate(-200,-212)">' + G.art.khungCui(200, 260, { mau: true }) + '</g>', '#2A1A14');
  };
  C.ngon_tay = function () { // ngón tay rách vì dệt suốt đêm (không vẽ mặt)
    var s = '<rect width="400" height="300" fill="#3A2A20" stroke="none"/><rect x="40" y="40" width="320" height="120" fill="#E9DDB0"/>';
    for (var k = 50; k < 360; k += 10) s += '<path d="M' + k + ',40 v120" stroke="#B8A880" stroke-width="1.5"/>';
    s += '<path d="M120,300 L140,170 q8,-14 16,0 l4,130 M180,300 L196,160 q8,-14 16,0 l0,140 M240,300 L250,170 q8,-14 16,0 l-4,130" fill="#D8C2A0"/>';
    s += '<path d="M144,176 l8,10M200,166 l8,10M254,176 l8,10" stroke="#A8180E" stroke-width="5"/><path d="M150,200 v40M206,190 v50" stroke="#A8180E" stroke-width="3"/>';
    s += '<path d="M60,120 Q200,180 340,110" fill="none" stroke="#B8241A" stroke-width="3"/>';
    return wrap(s);
  };
  C.vai_hoavan = function () { // tấm vải tự dệt: hoa văn giống sơ đồ một ngôi nhà, có dấu chéo ở gian giữa
    var s = '<rect width="400" height="300" fill="#E9DDB0" stroke="none"/>';
    for (var k = 0; k < 400; k += 8) s += '<path d="M' + k + ',0 v300" stroke="#D8C8A0" stroke-width="1"/>';
    s += '<rect x="70" y="60" width="260" height="120" fill="none" stroke="#8A3424" stroke-width="5"/><path d="M156,60 v120M244,60 v120" stroke="#8A3424" stroke-width="4"/>';
    s += '<path d="M70,180 h40M150,180 h100M290,180 h40" stroke="#8A3424" stroke-width="4"/><circle cx="50" cy="150" r="16" fill="none" stroke="#8A3424" stroke-width="4"/>';
    s += '<path d="M186,100 l28,28M214,100 l-28,28" stroke="#B8241A" stroke-width="6"/>';
    s += '<path d="M90,240 q20,-14 40,0 q20,14 40,0 q20,-14 40,0 q20,14 40,0 q20,-14 40,0" fill="none" stroke="#4E8C84" stroke-width="4"/>';
    return wrap(s);
  };
  C.tro_bua = function () { // tro bếp lẫn giấy bùa cháy dở
    var s = '<rect width="400" height="300" fill="#4A4040" stroke="none"/>';
    for (var i = 0; i < 40; i++) s += '<circle cx="' + (i * 47 % 400) + '" cy="' + (i * 31 % 300) + '" r="' + (4 + i % 6) + '" fill="#6A6060" stroke="none"/>';
    s += '<path d="M140,60 l120,10 l-10,180 q-30,20 -60,-6 q-30,14 -50,-20 z" fill="#E8CB6A"/><path d="M150,230 q30,20 60,-6 q30,24 50,-10" fill="none" stroke="#2A1A10" stroke-width="10"/>';
    s += '<path d="M200,80 v120M170,110 h60M176,160 q20,-18 40,0" fill="none" stroke="#8A1A10" stroke-width="4"/><path d="M226,110 q10,6 6,14" fill="none" stroke="#8A1A10" stroke-width="4"/>';
    return wrap(s);
  };
  C.so_tay = function () { // một trang sổ tay của thầy: nét móc cuối nét ngang rất riêng
    var s = '<rect width="400" height="300" fill="#5A3A2A" stroke="none"/><rect x="60" y="30" width="280" height="240" fill="#E9D9A8"/>';
    s += '<path d="M90,70 h110 q10,6 6,14M90,110 h80 q10,6 6,14M90,150 h130 q10,6 6,14M90,190 h90 q10,6 6,14" fill="none" stroke="#2A1A10" stroke-width="4"/>';
    s += '<path d="M260,60 v160M240,90 h40M246,140 q14,-14 28,0" fill="none" stroke="#8A1A10" stroke-width="4"/><path d="M280,90 q10,6 6,14" fill="none" stroke="#8A1A10" stroke-width="4"/>';
    return wrap(s);
  };
  C.ba_goc = function () { // ba điểm cháy ở ba góc nhà dệt
    var s = '<rect width="400" height="300" fill="#1A0E0A" stroke="none"/><rect x="40" y="40" width="320" height="220" fill="none" stroke="#6A4A30" stroke-width="8"/>';
    [[52, 52], [348, 52], [52, 248]].forEach(function (p) {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="34" fill="#E8701A" stroke="none" opacity=".8"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="16" fill="#FFD050" stroke="none"/>' +
        '<path d="M' + (p[0] - 10) + ',' + (p[1] + 8) + ' l8,-8 l6,6" fill="none" stroke="#3A2A1A" stroke-width="3"/>';
    });
    s += '<text x="200" y="160" text-anchor="middle" font-size="15" fill="#E9E2D0" stroke="none" font-weight="800">ba góc, cùng một lúc</text>';
    s += '<path d="M330,230 l20,-10 l6,16 l-22,6 z" fill="#8A6A3A"/><text x="290" y="280" font-size="12" fill="#C9B898" stroke="none">can dầu</text>';
    return wrap(s, '#1A0E0A');
  };
  C.qua_cau_mau = function () { // quả cau dính máu, vết móng tay cào vào vỏ
    var s = '<rect width="400" height="300" fill="#2A2A20" stroke="none"/><ellipse cx="200" cy="160" rx="70" ry="90" fill="#C9A23A"/>';
    s += '<path d="M150,120 l40,60M164,110 l40,62M178,104 l38,62" stroke="#5A1A0A" stroke-width="5"/>';
    s += '<path d="M220,90 q30,40 10,100 q-10,30 -40,40" fill="none" stroke="#9A140A" stroke-width="9"/><path d="M200,70 v-26" stroke-width="6"/>';
    return wrap(s);
  };
  C.thoi_toc = function () { // con thoi quấn tóc người
    var s = '<rect width="400" height="300" fill="#3A2A20" stroke="none"/><path d="M60,170 Q200,110 340,170 Q200,200 60,170 Z" fill="#B8865A"/>';
    for (var k = 0; k < 9; k++) s += '<path d="M' + (120 + k * 18) + ',140 q8,20 0,46" fill="none" stroke="#1A1210" stroke-width="5"/>';
    s += '<path d="M330,170 q40,10 60,60M340,166 q50,-10 60,-50" fill="none" stroke="#1A1210" stroke-width="4"/>';
    return wrap(s);
  };
  C.por_nu = function () {
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><path d="M80,300 Q200,140 320,300 Z" fill="#E8A0B0"/>';
    s += '<path d="M120,210 Q200,250 280,210" fill="none" stroke="#B8241A" stroke-width="5"/><path d="M110,200 Q200,240 290,200" fill="none" stroke="#B8241A" stroke-width="3"/>';
    return wrap(s);
  };
  C.por_chay = function () { return C.ba_goc(); };
})();
