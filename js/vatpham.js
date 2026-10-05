// Hình vật phẩm chính dùng chung: chim vàng anh, vong hồn, quả cau. Vẽ lại các tranh cận cảnh dùng tới chúng
// và thay hình vong trong màn lẻn (G.ch1.ghostHtml). Nạp sau các file closeups và ch1.
var G = window.G || (window.G = {});

(function () {
  var INK = G.INK, A = G.art;

  // ---------- chim vàng anh ----------
  // đầu quay phải, mỏ hồng cam, dải đen qua mắt, cánh đen viền vàng, đuôi đen chóp vàng; o.dau: đậu trên cành; o.chet: mắt nhắm
  A.vangAnh = function (x, y, s, flip, o) {
    o = o || {};
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + (s * (flip ? -1 : 1)) + ',' + s + ')" stroke="' + INK + '" stroke-width="' + (2.2 / s).toFixed(2) + '" stroke-linejoin="round" stroke-linecap="round">';
    g += '<path d="M-20,2 L-40,10 L-38,0 L-42,-6 L-20,-4 Z" fill="#1E1A16"/><path d="M-40,10 l-2,-4 l4,-2 z" fill="#F2C230" stroke-width="1"/>';
    g += '<path d="M-22,0 Q-20,-16 2,-16 Q18,-16 22,-4 Q22,12 0,14 Q-18,14 -22,0 Z" fill="#F2C230"/>';
    g += '<path d="M-10,8 Q2,14 16,6" fill="none" stroke="#D89A18" stroke-width="' + (3 / s).toFixed(2) + '" opacity=".7"/>';
    g += '<path d="M-18,-4 Q-6,-14 8,-6 Q2,4 -16,6 Z" fill="#1E1A16"/><path d="M-14,-2 q8,-6 16,-2M-12,2 q8,-4 14,-1" fill="none" stroke="#F2C230" stroke-width="' + (1.6 / s).toFixed(2) + '"/>';
    g += '<circle cx="18" cy="-12" r="10" fill="#F2C230"/>';
    g += '<path d="M10,-14 Q18,-18 28,-12 L26,-8 Q18,-12 10,-9 Z" fill="#1E1A16" stroke="none"/>';
    g += o.chet ? '<path d="M17,-12 h6" stroke-width="' + (1.8 / s).toFixed(2) + '"/>' : '<circle cx="20" cy="-12" r="2.6" fill="#F4EFE4" stroke-width="' + (1 / s).toFixed(2) + '"/><circle cx="20.6" cy="-12" r="1.3" fill="#000" stroke="none"/>';
    g += '<path d="M27,-12 L37,-9 L27,-6 Z" fill="#E87A6A"/>';
    if (o.dau !== false) g += '<path d="M-2,14 l-2,8M6,13 l2,9" stroke="#8A6A5A" stroke-width="' + (2.4 / s).toFixed(2) + '"/>';
    return g + '</g>';
  };

  // ---------- vong hồn ----------
  // người con gái tóc xoã che mặt, áo trắng, tay buông, phần dưới tan thành sương. o.mat: hé một bên mặt; o.mau: vệt máu
  A.vong = function (x, y, s, o) {
    o = o || {};
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" stroke="none">';
    g += '<ellipse cx="0" cy="-4" rx="34" ry="8" fill="#BFF0EA" opacity=".25"/>';
    [[.16, 0], [.28, -16], [.45, -32]].forEach(function (k, i) { g += '<path d="M' + (-26 + i * 3) + ',' + k[1] + ' Q0,' + (k[1] + 10) + ' ' + (26 - i * 3) + ',' + k[1] + ' L' + (20 - i * 2) + ',' + (k[1] - 18) + ' Q0,' + (k[1] - 12) + ' ' + (-20 + i * 2) + ',' + (k[1] - 18) + ' Z" fill="#E8F4F0" opacity="' + k[0] + '"/>'; });
    g += '<path d="M-20,-46 Q-26,-90 -12,-112 L12,-112 Q26,-90 20,-46 Q0,-40 -20,-46 Z" fill="#EEF6F2" opacity=".82"/>';
    g += '<path d="M-14,-108 Q-28,-80 -24,-54 M14,-108 Q28,-80 24,-54" fill="none" stroke="#EEF6F2" stroke-width="7" opacity=".75"/>';
    g += '<path d="M-24,-56 l-2,8 l4,-3 l1,6 l3,-7M24,-56 l2,8 l-4,-3 l-1,6 l-3,-7" fill="none" stroke="#C8D8D2" stroke-width="2.4" opacity=".8"/>';
    g += '<ellipse cx="0" cy="-124" rx="14" ry="16" fill="#E6EEEA" opacity=".9"/>';
    if (o.mat) g += '<ellipse cx="5" cy="-124" rx="3" ry="2.4" fill="#0A0606"/><circle cx="5.4" cy="-124" r=".9" fill="#F4F0E6"/>';
    g += '<path d="M-16,-128 Q-14,-146 0,-146 Q14,-146 16,-128 Q20,-100 16,-70 L10,-70 Q12,-100 ' + (o.mat ? '8' : '4') + ',-130 Q0,-134 -4,-130 Q-10,-100 -10,-70 L-18,-70 Q-22,-100 -16,-128 Z" fill="#0A0A10" opacity=".92"/>';
    if (o.mau) g += '<path d="M4,-112 q2,14 -1,30" stroke="#7A0A06" stroke-width="2.4" fill="none"/>';
    return g + '</g>';
  };

  // ---------- quả cau ----------
  // quả thuôn, vỏ xanh ngả vàng cam, đài cau xoè ở cuống, vân thớ dọc. o.chin: vàng cam; o.nut: nứt đôi khoe răng
  A.quaCau = function (x, y, s, o) {
    o = o || {};
    var vo = o.chin ? '#E8A23A' : '#8AB84A', vo2 = o.chin ? '#C8781E' : '#6A9A3A';
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="' + (2.4 / s).toFixed(2) + '" stroke-linejoin="round">';
    g += '<path d="M0,-30 Q22,-26 22,4 Q20,30 0,34 Q-20,30 -22,4 Q-22,-26 0,-30 Z" fill="' + vo + '"/>';
    g += '<path d="M8,-26 Q22,-10 18,14 Q14,28 4,32 Q16,6 8,-26 Z" fill="' + vo2 + '" stroke="none" opacity=".7"/>';
    g += '<path d="M-8,-20 q-6,20 -2,44M0,-24 v52M8,-20 q4,22 0,44" fill="none" stroke="' + vo2 + '" stroke-width="' + (1.2 / s).toFixed(2) + '"/>';
    g += '<path d="M-9,-27 q-5,-3 -4,-9 q5,1 7,5 q1,-6 6,-7 q3,4 1,8 q4,-4 9,-3 q-1,6 -8,8 Q0,-24 -9,-27 Z" fill="#6A5A2A"/><path d="M0,-31 v-6" stroke-width="' + (3 / s).toFixed(2) + '"/>';
    g += '<path d="M-6,-14 q-6,10 -4,22" fill="none" stroke="#FFF6D8" stroke-width="' + (3 / s).toFixed(2) + '" opacity=".5"/>';
    return g + '</g>';
  };

  // ---------- quả thị ----------
  // quả tròn dẹt vàng cam, núm tai bốn cánh ở cuống, vệt sáng
  A.quaThi = function (x, y, s) {
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="' + (2.4 / s).toFixed(2) + '" stroke-linejoin="round">';
    g += '<path d="M0,-22 v-12" stroke-width="' + (3 / s).toFixed(2) + '"/>';
    g += '<path d="M-28,0 Q-28,-24 0,-24 Q28,-24 28,0 Q28,26 0,26 Q-28,26 -28,0 Z" fill="#F0B830"/>';
    g += '<path d="M14,-20 Q30,0 18,22 Q26,0 14,-20 Z" fill="#D8862A" stroke="none" opacity=".8"/>';
    g += '<path d="M-14,-12 q-4,10 0,20" fill="none" stroke="#FFF2C0" stroke-width="' + (4 / s).toFixed(2) + '" opacity=".6"/>';
    g += '<path d="M0,-24 l-12,-4 l4,-6 l8,6 l4,-10 l6,8 l10,-2 l-4,8 Z" fill="#6A7A3A"/>';
    return g + '</g>';
  };

  // ---------- tranh cận cảnh dùng các hình trên ----------
  var C = G.CLOSEUPS;
  function wrap(inner, bg) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  }
  function rang(x0, y0, n, w, xuong) { var s = ''; for (var i = 0; i < n; i++) { var x = x0 + i * w, h = 12 + Math.abs(i - n / 2) * -1.2 + 6; s += '<path d="M' + x + ',' + y0 + ' q' + (w / 2) + ',' + (xuong ? h : -h) + ' ' + w + ',0" fill="#F2EEDC" stroke-width="1.8"/>'; } return s; }

  C.cau_rang = function () { // quả cau nứt đôi thành hàm răng người, lợi đỏ, nhựa trầu rỉ ra
    var s = '<rect width="400" height="300" fill="#141218" stroke="none"/><circle cx="200" cy="150" r="150" fill="#3A2A1E" opacity=".6" stroke="none"/>';
    s += '<path d="M200,30 Q280,40 284,138 L116,138 Q120,40 200,30 Z" fill="#E8A23A"/><path d="M252,44 Q284,90 282,136 L258,136 Q266,90 252,44 Z" fill="#C8781E" stroke="none" opacity=".8"/>';
    s += '<path d="M116,170 L284,170 Q280,262 200,272 Q120,262 116,170 Z" fill="#E8A23A"/><path d="M270,172 Q290,220 260,250 Q276,210 270,172 Z" fill="#C8781E" stroke="none" opacity=".8"/>';
    s += '<path d="M120,138 Q200,120 280,138 L280,150 Q200,138 120,150 Z" fill="#B8323A"/><path d="M120,170 Q200,188 280,170 L280,160 Q200,172 120,160 Z" fill="#B8323A"/>';
    s += '<path d="M124,150 Q200,168 276,150 L276,160 Q200,178 124,160 Z" fill="#2A0604"/>';
    s += rang(128, 150, 10, 14.4, true) + rang(128, 160, 10, 14.4, false);
    s += '<path d="M182,34 q-10,-6 -8,-18 q10,2 14,10 q2,-12 12,-14 q6,8 2,18 q8,-8 18,-6 q-2,12 -16,14 Q196,30 182,34 Z" fill="#6A5A2A"/><path d="M200,22 v-14" stroke-width="5"/>';
    s += '<path d="M150,176 q-4,30 6,60M240,178 q6,26 -2,54" fill="none" stroke="#8A1A10" stroke-width="5"/><path d="M200,262 q2,14 -2,26" stroke="#8A1A10" stroke-width="6" fill="none"/>';
    return wrap(s, '#141218');
  };
  C.qua_cau_mau = function () { // quả cau chín dính máu, vết móng tay cào trên vỏ
    var s = '<rect width="400" height="300" fill="#22201A" stroke="none"/><ellipse cx="200" cy="270" rx="120" ry="16" fill="#000" opacity=".4" stroke="none"/>';
    s += A.quaCau(200, 150, 3.2, { chin: true });
    s += '<path d="M156,110 l34,54M170,102 l34,56M184,98 l30,54" stroke="#4A1206" stroke-width="5"/><path d="M158,112 l30,50" stroke="#F2C878" stroke-width="1.5" opacity=".6"/>';
    s += '<path d="M234,96 q30,40 10,100 q-10,30 -40,46" fill="none" stroke="#8A0C06" stroke-width="10"/><path d="M200,252 q4,14 -2,22" stroke="#8A0C06" stroke-width="7" fill="none"/>';
    return wrap(s, '#22201A');
  };
  C.long_vang = function () { // chiếc lông vàng anh nằm trong bàn tay lạnh ngắt
    var s = '<rect width="400" height="300" fill="#24302E" stroke="none"/>';
    s += '<path d="M90,300 Q100,230 150,200 L280,196 Q320,214 316,300 Z" fill="#C4CAC0"/>';
    s += '<path d="M150,206 Q132,170 104,150 Q94,144 100,136 Q112,132 124,146 L170,196 Z" fill="#C4CAC0"/>';
    [[178, 196, 166, 110], [210, 192, 210, 98], [242, 194, 254, 106], [270, 200, 294, 128]].forEach(function (f) { s += '<path d="M' + f[0] + ',' + f[1] + ' L' + f[2] + ',' + f[3] + '" stroke="' + INK + '" stroke-width="27" stroke-linecap="round"/><path d="M' + f[0] + ',' + f[1] + ' L' + f[2] + ',' + f[3] + '" stroke="#C4CAC0" stroke-width="20" stroke-linecap="round"/><path d="M' + ((f[0] + f[2]) / 2 - 6) + ',' + ((f[1] + f[3]) / 2) + ' h12" stroke="#8A9A94" stroke-width="1.6"/>'; });
    s += '<path d="M160,244 q50,-20 110,-10M150,270 q40,-10 80,4" fill="none" stroke="#8A9A94" stroke-width="2"/>';
    s += '<path d="M150,200 Q210,150 300,92 Q246,170 160,212 Z" fill="#F2C230"/>';
    for (var i = 0; i < 12; i++) { var t = i / 12, x = 160 + 140 * t, y = 206 - 112 * t; s += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' l' + (-14 + t * 4).toFixed(0) + ',-10M' + x.toFixed(0) + ',' + y.toFixed(0) + ' l10,' + (12 - t * 4).toFixed(0) + '" stroke="#D89A18" stroke-width="1.6"/>'; }
    s += '<path d="M152,204 L298,94" stroke="#B8781A" stroke-width="2.4"/><path d="M262,118 Q290,100 300,92 Q286,112 268,126 Z" fill="#1E1A16"/>';
    s += '<path d="M200,200 q4,16 0,26" stroke="#7A0A06" stroke-width="3" fill="none"/>';
    return wrap(s, '#24302E');
  };
  C.chim_se = function () { // đàn chim sẻ đậu kín bờ rào, con nào cũng quay đầu nhìn
    var s = '<rect width="400" height="300" fill="#B8B4A4" stroke="none"/><rect y="200" width="400" height="100" fill="#9A8A6A" stroke="none"/>';
    s += '<path d="M0,120 H400M0,210 H400" stroke="#6A4A2E" stroke-width="7"/>';
    for (var k = 0; k < 400; k += 22) s += '<path d="M' + k + ',100 v130" stroke="#8A6A3E" stroke-width="5"/>';
    function se(x, y, f) {
      return '<g transform="translate(' + x + ',' + y + ') scale(' + (f ? -1 : 1) + ',1)"><path d="M-14,4 l-14,6 l2,-8 z" fill="#5A3E28"/><ellipse rx="16" ry="12" fill="#A07850"/><ellipse cx="2" cy="5" rx="11" ry="6" fill="#E2D2B4" stroke="none"/>' +
        '<path d="M-12,-4 q8,-8 18,-2 q-6,8 -18,6 z" fill="#6A4A2E" stroke-width="1.5"/><path d="M-8,-2 l4,4M-2,-4 l4,4" stroke="#E2D2B4" stroke-width="1.4"/>' +
        '<circle cx="10" cy="-10" r="9" fill="#7A5638"/><path d="M4,-6 q6,4 12,0 l0,6 q-6,2 -12,-2 z" fill="#2A1E16" stroke="none"/><circle cx="12" cy="-12" r="3" fill="#F4EFE4" stroke-width="1"/><circle cx="12.6" cy="-12" r="1.6" fill="#000" stroke="none"/>' +
        '<path d="M18,-10 l7,2 l-7,2 z" fill="#3A2A20"/><path d="M-2,12 v6M4,12 v6" stroke-width="2"/></g>';
    }
    for (var i = 0; i < 9; i++) s += se(26 + i * 44, 98 - (i % 2) * 4, i % 3 === 1);
    for (var j = 0; j < 8; j++) s += se(46 + j * 46, 188 - (j % 2) * 3, j % 4 === 2);
    s += '<path d="M180,262 q10,-6 20,0 q10,-6 20,0" fill="none" stroke="#5A3E28" stroke-width="3"/><path d="M192,264 l-4,8M208,264 l4,8" stroke="#E2D2B4" stroke-width="2"/>';
    return wrap(s);
  };
  C.thi_gia = function () { // quả thị bổ đôi: bên trong là đầu chim vàng anh, mắt còn mở
    var s = '<rect width="400" height="300" fill="#1E2A20" stroke="none"/>';
    s += '<path d="M100,150 Q100,66 200,62 Q300,66 300,150 Z" fill="#D8862A"/><path d="M100,166 Q100,250 200,256 Q300,250 300,166 Z" fill="#D8862A"/>';
    s += '<path d="M118,150 Q200,132 282,150 Z" fill="#F4E2A0"/><path d="M118,166 Q200,184 282,166 Z" fill="#F4E2A0"/>';
    s += '<path d="M200,62 v-20M188,50 q12,-16 30,-6" fill="none" stroke-width="4"/>';
    s += '<ellipse cx="200" cy="158" rx="64" ry="22" fill="#5A3A1A"/>';
    s += '<g transform="translate(192,160)"><circle r="40" fill="#F2C230"/><path d="M-6,-8 Q10,-22 40,-8 L38,4 Q12,-6 -4,6 Z" fill="#1E1A16"/>' +
      '<circle cx="12" cy="-6" r="8" fill="#F4EFE4" stroke-width="2"/><circle cx="13" cy="-6" r="4" fill="#000" stroke="none"/><circle cx="15" cy="-8" r="1.4" fill="#FFF" stroke="none"/>' +
      '<path d="M36,-6 L64,2 L36,10 Z" fill="#E87A6A"/><path d="M-30,20 q10,10 26,8" fill="none" stroke="#D89A18" stroke-width="3"/><path d="M-36,-14 q-6,8 -4,18" stroke="#F8E2A0" stroke-width="4" fill="none"/></g>';
    s += '<path d="M150,172 q-2,20 4,40M246,170 q4,18 -2,36" stroke="#8A1A10" stroke-width="4" fill="none"/>';
    return wrap(s, '#1E2A20');
  };
  C.bong_dao = function () { // qua mắt âm dương: cô gái ngồi trên cành đào, cạnh con vàng anh
    var s = '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/>';
    for (var i = 0; i < 11; i++) s += '<circle cx="' + (20 + i * 38) + '" cy="' + (30 + (i % 3) * 26) + '" r="34" fill="' + (i % 2 ? '#3A2A3A' : '#4A2E3E') + '" stroke="none"/>';
    for (var j = 0; j < 30; j++) s += '<circle cx="' + (j * 47 % 400) + '" cy="' + (20 + j * 29 % 110) + '" r="3" fill="#D88898" stroke="none" opacity=".7"/>';
    s += '<path d="M0,240 Q160,200 400,170" fill="none" stroke="#2A1E1A" stroke-width="24"/>';
    s += A.vong(170, 220, 1.2, { mat: true });
    s += A.vangAnh(300, 172, 1.6, true);
    return wrap(s, '#0A1A1E');
  };

  // ---------- vong trong màn lẻn ----------
  // nam: xác bó chiếu nằm sóng soài, tóc tràn ra ngoài; đứng: vong người con gái
  if (G.ch1) G.ch1.ghostHtml = function (nam) {
    var svg = nam ?
      '<svg viewBox="0 0 120 60" width="120" height="60" overflow="visible"><g stroke="' + INK + '" stroke-width="2" stroke-linejoin="round">' +
        '<path d="M14,30 Q12,14 40,12 L98,14 Q110,22 106,36 Q100,46 40,46 Q14,44 14,30 Z" fill="#D9C27A"/>' +
        '<path d="M30,13 v32M50,12 v34M70,13 v33M90,14 v31" stroke="#B8A05A" stroke-width="1.5"/><path d="M40,12 l-4,34M80,14 l-2,32" stroke="#8A3A2A" stroke-width="2.5"/>' +
        '<path d="M14,26 Q0,24 -8,36 M14,32 Q2,36 -4,48 M14,22 Q4,14 -2,10" fill="none" stroke="#0A0A10" stroke-width="4"/>' +
        '<path d="M104,24 l10,-4 l2,6 z M106,34 l10,2 l-2,6 z" fill="#C8C2B4"/></g></svg>' :
      '<svg viewBox="-50 -160 100 170" width="100" height="170" overflow="visible">' + A.vong(0, 0, 0.8, { mat: true, mau: true }) + '</svg>';
    return '<div style="position:absolute;left:' + (nam ? -60 : -50) + 'px;top:' + (nam ? -34 : -160) + 'px" class="ghostbody">' + svg + '</div>';
  };
})();
