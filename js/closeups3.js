// Tranh cận cảnh Chương 2.
var G = window.G || (window.G = {});

(function () {
  var C = G.CLOSEUPS, INK = G.INK;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  C.cay_mau = function () { // nhát rìu đầu tiên: thân xoan chảy máu
    var s = '<rect width="400" height="300" fill="#2A2A20" stroke="none"/><path d="M140,0 L150,300 L260,300 L250,0 Z" fill="#7A5A4A"/>';
    for (var y = 20; y < 300; y += 36) s += '<path class="d" d="M150,' + y + ' q50,8 100,0"/>';
    s += '<path d="M150,130 L240,110 L236,150 Z" fill="#3A0A06"/>';
    s += '<path d="M180,140 q-6,60 4,160M206,136 q8,70 -2,164M226,132 q6,50 0,110" stroke="#B0140A" stroke-width="9" fill="none"/>';
    return wrap(s);
  };
  C.riu_chot = function () { // lưỡi rìu, chốt nêm bị nới lỏng
    var s = '<rect width="400" height="300" fill="#6A5A48" stroke="none"/><path d="M40,200 L300,120" stroke="#5A3A20" stroke-width="22"/>';
    s += '<path d="M280,60 q80,-10 90,70 l-60,30 q-6,-50 -30,-100 Z" fill="#A8AEB2"/>';
    s += '<path d="M292,118 l18,-6 l6,16 l-18,6 z" fill="#C8A040"/><path d="M300,108 l30,-26" stroke="#E04030" stroke-width="3" stroke-dasharray="6 4"/>';
    s += '<text x="60" y="260" font-size="16" fill="#F3EEDF" stroke="none" font-weight="800">Chốt nêm bị rút lỏng</text>';
    return wrap(s);
  };
  C.thu_dighe = function () {
    var s = '<rect width="400" height="300" fill="#5A3A2A" stroke="none"/><rect x="70" y="30" width="260" height="240" fill="#E9D9A8"/>';
    s += '<text x="90" y="80" font-size="15" fill="#3A2418" stroke="none">Ông Mộc,</text><text x="90" y="110" font-size="15" fill="#3A2418" stroke="none">Rào cây cho kỹ.</text>';
    s += '<text x="90" y="140" font-size="15" fill="#3A2418" stroke="none">Chuyện ở làng Đông hôm giỗ,</text><text x="90" y="170" font-size="15" fill="#8A1A12" stroke="none" font-weight="800">ông quên đi thì hơn.</text>';
    s += '<circle cx="280" cy="230" r="18" fill="none" stroke="#B8241A" stroke-width="4"/><circle cx="280" cy="230" r="9" fill="none" stroke="#B8241A" stroke-width="2"/>';
    return wrap(s);
  };
  C.re_cay = function () { // rễ chui qua khe cửa vào nhà
    var s = '<rect width="400" height="300" fill="#3A2A20" stroke="none"/><rect x="0" y="0" width="160" height="300" fill="#6A4A30"/><rect x="152" y="0" width="12" height="300" fill="#2A1A10"/>';
    s += '<path d="M0,240 Q100,230 158,250 Q220,262 300,220 Q350,200 400,230" fill="none" stroke="#5A3A2A" stroke-width="14"/>';
    s += '<path d="M240,240 q20,-40 60,-50M300,226 q30,10 60,-20" fill="none" stroke="#5A3A2A" stroke-width="7"/>';
    s += '<ellipse cx="330" cy="180" rx="40" ry="16" fill="#C8A890"/>';
    return wrap(s);
  };
  C.be_mit = function () { // đứa bé ôm gốc cây, chỉ vẽ dáng
    var s = '<rect width="400" height="300" fill="#C8CCC0" stroke="none"/><path d="M150,300 L170,0 L240,0 L250,300 Z" fill="#7A5A4A"/>';
    s += '<path d="M110,300 q0,-70 40,-90 q30,-10 40,20 l-6,70 z" fill="#E8B04A" stroke-width="3"/><circle cx="148" cy="196" r="22" fill="#2B1F1A"/>';
    s += '<path d="M180,230 q20,-10 40,6" fill="none" stroke="#EBCDAA" stroke-width="10"/><path d="M120,300 q-30,-30 -40,-60M260,280 q40,-20 60,-60" fill="none" stroke="#5A3A2A" stroke-width="8"/>';
    return wrap(s);
  };
  C.ba_lo = function () { // ba lọ xương và một hố trống dưới chân giường
    var s = '<rect width="400" height="300" fill="#4A3222" stroke="none"/><rect x="70" y="50" width="260" height="190" fill="#C9A35E"/>';
    [[70, 50], [330, 50], [70, 240]].forEach(function (p) { s += '<path d="M' + (p[0] - 14) + ',' + (p[1] + 10) + ' h28 v8 q10,8 8,22 q-4,12 -22,12 q-18,0 -22,-12 q-2,-14 8,-22 z" fill="#B0805A"/>'; });
    s += '<ellipse cx="330" cy="262" rx="24" ry="12" fill="#1E120C"/><path d="M310,256 q20,-10 40,0" fill="none" stroke="#7A5A3A" stroke-width="4"/>';
    s += '<text x="250" y="295" font-size="13" fill="#E9E2D0" stroke="none">đất còn mới</text>';
    return wrap(s);
  };
  C.hop_ngai = function () { // hộp ngải: túi thóc trộn gạo, búi tóc rối, lá bùa nét chữ lạ
    var s = '<rect width="400" height="300" fill="#2A1A14" stroke="none"/><rect x="60" y="60" width="280" height="190" rx="6" fill="#5A2418"/><rect x="74" y="74" width="252" height="162" fill="#1E120C"/>';
    s += '<ellipse cx="140" cy="170" rx="44" ry="34" fill="#C79A5E"/><g stroke="none"><circle cx="128" cy="160" r="3" fill="#D9A93A"/><circle cx="146" cy="172" r="3" fill="#FFF"/><circle cx="138" cy="182" r="3" fill="#D9A93A"/><circle cx="154" cy="158" r="3" fill="#FFF"/></g>';
    s += '<path d="M200,120 q20,30 0,50 q-20,30 10,60" fill="none" stroke="#2B1F1A" stroke-width="5"/>';
    s += '<rect x="240" y="90" width="60" height="120" fill="#E8CB6A" transform="rotate(6 270 150)"/><path d="M270,100 v100M250,120 h40M256,160 q14,-14 28,0" fill="none" stroke="#8A1A10" stroke-width="3" transform="rotate(6 270 150)"/>';
    return wrap(s);
  };
  C.hai_theu = function () { // chiếc hài thêu rơi xuống nước
    var s = '<rect width="400" height="300" fill="#6F9C9A" stroke="none"/><path d="M0,180 q100,-14 200,0 t200,0 V300 H0 Z" fill="#4E7C7A" stroke="none"/>';
    s += '<path d="M110,160 q20,-60 120,-50 q60,8 70,40 q-80,30 -190,10 z" fill="#B8241A"/><path d="M140,140 q30,-20 60,0 q30,20 60,0" fill="none" stroke="#D9A93A" stroke-width="4"/>';
    s += '<circle cx="190" cy="150" r="6" fill="#D9A93A"/><path d="M90,190 q30,-10 60,0M240,196 q30,-10 60,0" fill="none" stroke="#C8E0DC" stroke-width="3"/>';
    return wrap(s);
  };
  C.chim_se = function () { // đàn chim sẻ đứng im nhìn
    var s = '<rect width="400" height="300" fill="#A8A898" stroke="none"/>';
    for (var i = 0; i < 18; i++) {
      var x = 40 + (i % 6) * 60, y = 70 + Math.floor(i / 6) * 80;
      s += '<g transform="translate(' + x + ',' + y + ')"><ellipse rx="18" ry="13" fill="#8A6A4A"/><circle cx="12" cy="-10" r="9" fill="#8A6A4A"/><circle cx="15" cy="-12" r="3" fill="#F3EEDF" stroke-width="1"/><circle cx="16" cy="-12" r="1.4" fill="#2B1F1A" stroke="none"/><path d="M20,-9 l7,2" stroke-width="2"/></g>';
    }
    return wrap(s);
  };
  C.por_moc = function () { return C.riu_chot(); };
  C.por_mit = function () { return C.be_mit(); };
})();
