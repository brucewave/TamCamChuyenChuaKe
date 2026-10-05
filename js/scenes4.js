// Cảnh Chương 3: nhà dệt (trong nhà, có thể cháy), khung cửi giữa sân giếng giặt khi đem đốt, ký ức trèo cau.
var G = window.G || (window.G = {});

G.LOCATIONS.nha_det = { id: 'nha_det', name: 'Nhà dệt', width: 960, height: 620, exits: {} };
G.LOCATIONS.ky_cau = { id: 'ky_cau', name: 'Ký ức · Vườn cau ngày giỗ', width: 960, height: 720, exits: {} };

(function () {
  var K = G.sceneKit, B = K.B, rect = K.rect, ink = K.ink, INK = G.INK;

  // khung cửi nhìn chéo: hai trụ có mộng, trục sợi dọc, go, khổ vải hoa văn, bàn đạp, ghế ngồi
  G.art.khungCui = function (x, y, o) {
    o = o || {};
    var V = G.ve, toi = o.toi, go = toi ? '#4A3A30' : '#8A5A36', go2 = toi ? '#2E221A' : '#5E3A22', goS = toi ? '#5A4838' : '#B0804E', vai = o.vai || '#E9DDB0', soi = toi ? '#6A5A4A' : '#E6DABA';
    var s = V.bong(x, y + 2, 76, 13, .26);
    // hai trụ sau có mộng, sáng bên trái, tối bên phải
    [x - 60, x + 50].forEach(function (px) {
      s += rect(px, y - 102, 12, 104, go) + rect(px + 7, y - 102, 5, 104, go2, ' stroke="none" opacity=".75"') + rect(px + 1.5, y - 101, 2.5, 102, goS, ' stroke="none" opacity=".8"');
      s += '<path d="M' + px + ',' + (y - 78) + ' h12M' + px + ',' + (y - 40) + ' h12" stroke-width="1.4"/><circle cx="' + (px + 6) + '" cy="' + (y - 90) + '" r="1.8" fill="' + go2 + '" stroke="none"/>';
    });
    // xà trên, đầu xà chạm
    s += '<path d="M' + (x - 70) + ',' + (y - 98) + ' H' + (x + 70) + '" stroke="' + INK + '" stroke-width="11"/><path d="M' + (x - 70) + ',' + (y - 98) + ' H' + (x + 70) + '" stroke="' + go + '" stroke-width="7.5"/><path d="M' + (x - 68) + ',' + (y - 100.5) + ' H' + (x + 68) + '" stroke="' + goS + '" stroke-width="1.6"/>';
    s += '<path d="M' + (x - 70) + ',' + (y - 103) + ' q-8,0 -8,5 q0,5 8,5 M' + (x + 70) + ',' + (y - 103) + ' q8,0 8,5 q0,5 -8,5" fill="' + go + '" stroke-width="2"/>';
    // trục sợi dọc cuộn sợi
    s += '<rect x="' + (x - 50) + '" y="' + (y - 96) + '" width="100" height="7" rx="3.5" fill="' + soi + '" stroke-width="1.6"/>';
    // sợi dọc chia hai lớp so le (miệng vải) để thoi luồn qua
    var a = '', b2 = '';
    for (var i = 0; i < 36; i++) { var kx = -46 + i * 92 / 35; if (i % 2) a += 'M' + (x + kx).toFixed(1) + ',' + (y - 89) + ' L' + (x + kx * .97).toFixed(1) + ',' + (y - 77) + ' L' + (x + kx * .96).toFixed(1) + ',' + (y - 64); else b2 += 'M' + (x + kx).toFixed(1) + ',' + (y - 89) + ' L' + (x + kx * .97).toFixed(1) + ',' + (y - 73) + ' L' + (x + kx * .96).toFixed(1) + ',' + (y - 64); }
    s += '<path d="' + b2 + '" stroke="' + soi + '" stroke-width="1" opacity=".75" fill="none"/><path d="' + a + '" stroke="' + soi + '" stroke-width="1" fill="none"/>';
    // hai go treo dây, ròng rọc trên xà
    [y - 80, y - 73].forEach(function (gy, gi) {
      s += '<path d="M' + (x - 52) + ',' + gy + ' H' + (x + 52) + '" stroke="' + go2 + '" stroke-width="3.4"/>';
      var dg = ''; for (var k2 = -48; k2 <= 48; k2 += 4) dg += 'M' + (x + k2 + gi * 2) + ',' + (gy - 3) + ' v6'; s += '<path d="' + dg + '" stroke="' + go2 + '" stroke-width=".9"/>';
    });
    s += '<path d="M' + (x - 40) + ',' + (y - 98) + ' v18M' + (x + 40) + ',' + (y - 98) + ' v18" stroke="' + go2 + '" stroke-width="1.2"/><circle cx="' + (x - 40) + '" cy="' + (y - 95) + '" r="2.6" fill="' + goS + '" stroke-width="1.2"/><circle cx="' + (x + 40) + '" cy="' + (y - 95) + '" r="2.6" fill="' + goS + '" stroke-width="1.2"/>';
    // khung lược (con go đập)
    s += rect(x - 56, y - 68, 112, 6, go) + rect(x - 56, y - 68, 112, 1.6, goS, ' stroke="none"');
    var lc = ''; for (var k3 = -52; k3 <= 52; k3 += 2.4) lc += 'M' + (x + k3).toFixed(1) + ',' + (y - 67) + ' v4'; s += '<path d="' + lc + '" stroke="' + go2 + '" stroke-width=".7"/>';
    // khổ vải đã dệt: vân sợi ngang, dải viền, hoa văn quả trám hai màu
    s += rect(x - 48, y - 62, 96, 27, vai);
    var vn = ''; for (var yy = y - 60; yy < y - 36; yy += 2) vn += 'M' + (x - 47) + ',' + yy + ' h94'; s += '<path d="' + vn + '" stroke="#1A0E08" stroke-width=".5" opacity=".12"/>';
    var c1 = o.mau ? '#A8180E' : (toi ? '#3A2A22' : '#B8483A'), c2 = toi ? '#2A1E18' : '#2E5A6A';
    s += '<path d="M' + (x - 48) + ',' + (y - 58) + ' h96M' + (x - 48) + ',' + (y - 39) + ' h96" stroke="' + c2 + '" stroke-width="2"/>';
    var hv = '', hv2 = ''; for (var k4 = -40; k4 <= 36; k4 += 13) { hv += 'M' + (x + k4) + ',' + (y - 49) + ' l6,-6 l6,6 l-6,6 z'; hv2 += 'M' + (x + k4 + 6) + ',' + (y - 51.5) + ' l2.5,2.5 l-2.5,2.5 l-2.5,-2.5 z'; }
    s += '<path d="' + hv + '" fill="none" stroke="' + c1 + '" stroke-width="1.5"/><path d="' + hv2 + '" fill="' + c2 + '" stroke="none"/>';
    s += rect(x - 48, y - 62, 96, 4, '#FFFFFF', ' stroke="none" opacity=".18"');
    if (o.mau) s += '<path d="M' + (x - 30) + ',' + (y - 40) + ' q1,14 -1,30M' + (x + 10) + ',' + (y - 40) + ' q2,18 0,40" stroke="#8A0E08" stroke-width="3" fill="none"/><circle cx="' + (x + 10) + '" cy="' + (y + 1) + '" r="2.6" fill="#8A0E08" stroke="none"/>';
    // trục cuộn vải tròn, vải quấn quanh
    s += '<rect x="' + (x - 60) + '" y="' + (y - 37) + '" width="120" height="10" rx="5" fill="' + go + '"/><rect x="' + (x - 48) + '" y="' + (y - 37) + '" width="96" height="10" fill="' + vai + '" stroke-width="1.4"/>';
    s += '<path d="M' + (x - 48) + ',' + (y - 34.5) + ' h96" stroke="#FFFFFF" stroke-width="1.6" opacity=".4"/><path d="M' + (x - 48) + ',' + (y - 29) + ' h96" stroke="#1A0E08" stroke-width="1.6" opacity=".25"/>';
    // con thoi hình thuyền, suốt sợi
    if (!o.khongThoi) s += '<path d="M' + (x + 4) + ',' + (y - 62) + ' q14,-6 30,-3 q-4,4 -8,5 q-14,3 -22,-2 z" fill="' + (toi ? '#5A4838' : '#C9963A') + '" stroke-width="1.4"/><path d="M' + (x + 13) + ',' + (y - 63) + ' h10" stroke="' + (toi ? soi : '#B8483A') + '" stroke-width="2.4"/><path d="M' + (x + 23) + ',' + (y - 63) + ' q8,6 18,10" stroke="' + soi + '" stroke-width=".8" fill="none"/>';
    // dây go nối bàn đạp, hai bàn đạp
    s += '<path d="M' + (x - 30) + ',' + (y - 73) + ' L' + (x - 16) + ',' + (y - 8) + 'M' + (x + 30) + ',' + (y - 80) + ' L' + (x + 10) + ',' + (y - 8) + '" stroke="' + go2 + '" stroke-width=".9" opacity=".7"/>';
    s += '<path d="M' + (x - 24) + ',' + (y + 1) + ' l12,-10M' + (x + 2) + ',' + (y + 1) + ' l12,-10" stroke="' + INK + '" stroke-width="6"/><path d="M' + (x - 24) + ',' + (y + 1) + ' l12,-10M' + (x + 2) + ',' + (y + 1) + ' l12,-10" stroke="' + go + '" stroke-width="3.5"/>';
    // ghế ngồi dệt
    s += V.khoi(x - 30, y - 22, 60, 7, 6, toi ? ['#3A2A22', '#2A1E18', '#4A3A30', '#2A1E18'] : V.GO.nau, { chan: 7, van: false });
    return s;
  };

  G.scenes.nha_det = function (S) {
    var b = new B(960, 620), s = '', f = S.flags, chay = f.c3_chay;
    function m(c, toi) { return chay ? (toi || '#2A1E18') : c; }
    s += rect(0, 0, 960, 620, '#2A1A14');
    s += rect(60, 60, 840, 500, chay ? '#3A2A22' : 'url(#vangoc)');
    s += rect(60, 60, 840, 66, chay ? '#2A1A14' : '#9A6A44') + rect(60, 60, 840, 12, '#4A3222');
    // xà ngang và cửa sổ chấn song trên vách bắc
    s += '<path d="M60,92 H900" stroke="' + m('#6A4A30') + '" stroke-width="5"/>';
    [230, 690].forEach(function (wx) { s += rect(wx - 36, 74, 72, 40, m('#2A3A3A', '#0A0A0A')); for (var gx = wx - 30; gx < wx + 36; gx += 10) s += '<path d="M' + gx + ',74 v40" stroke="' + m('#8A6440') + '" stroke-width="3"/>'; });
    s += rect(60, 60, 14, 500, '#6A4A30') + rect(886, 60, 14, 500, '#6A4A30');
    s += rect(60, 546, 380, 14, '#6A4A30') + rect(520, 546, 380, 14, '#6A4A30');
    // kệ sợi dọc vách bắc: từng cuộn sợi nhuộm màu
    s += '<path d="M330,100 H630M330,120 H630" stroke="' + m('#6A4A30') + '" stroke-width="4"/>';
    var mau = ['#B84A3E', '#D9A93A', '#4E8C84', '#E9DDB0', '#3A4A7A', '#8A3A5A'];
    for (var k = 0; k < 14; k++) { var sx = 342 + k * 21, sy = k % 2 ? 112 : 92; s += '<ellipse cx="' + sx + '" cy="' + sy + '" rx="9" ry="7" fill="' + m(mau[k % 6]) + '" stroke-width="1.6"/><path d="M' + (sx - 7) + ',' + sy + ' q7,-4 14,0" fill="none" stroke-width="1" opacity=".6"/>'; }
    // vụn sợi rơi trên sàn
    if (!chay) [[260, 360], [520, 480], [690, 350], [380, 470], [610, 230]].forEach(function (q, i) { s += '<path d="M' + q[0] + ',' + q[1] + ' q8,-6 14,2 q6,6 14,-2" fill="none" stroke="' + mau[i % 6] + '" stroke-width="2"/>'; });
    if (chay) s += '<path d="M60,60 H900 V140 H60 Z" fill="#0A0606" opacity=".6"/>';
    b.bg += ink(s);
    b.solid(60, 0, 840, 128); b.solid(60, 60, 14, 500); b.solid(886, 60, 14, 500); b.solid(60, 546, 380, 20); b.solid(520, 546, 380, 20);
    b.solid(0, 0, 60, 620); b.solid(900, 0, 60, 620);
    // giá phơi con sợi (trái) và giá vải cuộn (phải) sát vách bắc
    var gs = '<path d="M296,166 V128M404,166 V128M290,134 H410" stroke="' + m('#6A4A30') + '" stroke-width="5"/>';
    for (var h = 0; h < 7; h++) gs += '<path d="M' + (304 + h * 15) + ',134 q-4,14 0,26 q4,-12 0,-26" fill="' + m(mau[h % 6]) + '" stroke-width="1.4"/>';
    b.prop(286, 124, 130, 50, gs, 162); b.solid(290, 140, 120, 22);
    var gv = G.ve.khoi(552, 130, 116, 10, 22, chay ? ['#3A2A22', '#2A1E18', '#4A3A30', '#2A1E18'] : G.ve.GO.nau, { chan: 6 });
    for (var v = 0; v < 5; v++) gv += '<ellipse cx="' + (566 + v * 22) + '" cy="' + (138 - (v % 2) * 4) + '" rx="10" ry="9" fill="' + m(['#E9DDB0', '#B84A3E', '#D9A93A', '#4E8C84', '#E9DDB0'][v]) + '" stroke-width="1.6"/><circle cx="' + (566 + v * 22) + '" cy="' + (138 - (v % 2) * 4) + '" r="3" fill="none" stroke-width="1.2"/>';
    b.prop(544, 112, 132, 66, gv, 162); b.solid(552, 140, 116, 22);
    // chum nhuộm chàm, chum nhuộm đỏ sát vách tây
    // chum nhuộm chàm và chum nhuộm đỏ: men sành, vết thuốc nhuộm loang miệng chum, que khuấy, vải nhúng dở
    var cn = G.ve.bong(106, 368, 34, 7, .26);
    cn += '<path d="M80,346 q-4,16 6,22 h20 q10,-6 6,-22 z" fill="' + m('#5A3A26') + '"/><ellipse cx="96" cy="356" rx="8" ry="10" fill="#1A0E08" opacity=".25" stroke="none" transform="translate(6,0)"/><path d="M84,348 q-2,8 1,14" fill="none" stroke="#B88A60" stroke-width="2.4" opacity=".55"/>';
    cn += '<ellipse cx="96" cy="345" rx="15" ry="4.6" fill="' + m('#4A3020') + '"/><ellipse cx="96" cy="345" rx="11.5" ry="3.2" fill="' + m('#1E2E66', '#0A0A0A') + '"/><path d="M90,344 h6" stroke="#8A9AD8" stroke-width="1.2" opacity=".6"/><path d="M82,348 q3,6 1,10M108,349 q-2,5 0,9" fill="none" stroke="' + m('#2A3A7A', '#0A0A0A') + '" stroke-width="2.2" opacity=".75"/>';
    cn += '<path d="M108,358 q-2,10 4,14 h16 q6,-4 4,-14 z" fill="' + m('#6A4428') + '"/><ellipse cx="120" cy="357" rx="12" ry="3.8" fill="' + m('#4A3020') + '"/><ellipse cx="120" cy="357" rx="9" ry="2.6" fill="' + m('#8A1414', '#0A0A0A') + '"/><path d="M112,361 q2,4 0,8" fill="none" stroke="' + m('#8A1414', '#0A0A0A') + '" stroke-width="2" opacity=".7"/>';
    cn += '<path d="M92,344 l18,-26" stroke="' + INK + '" stroke-width="4.4"/><path d="M92,344 l18,-26" stroke="' + m('#A07A4A') + '" stroke-width="2.4"/><path d="M118,357 q-6,-12 2,-22 q4,8 0,22" fill="' + m('#C84A3E') + '" stroke-width="1.2"/>';
    b.prop(70, 312, 70, 64, cn, 370);
    b.solid(80, 342, 52, 26);
    // xa quay tơ
    var xa = '<ellipse cx="625" cy="514" rx="32" ry="7" fill="' + INK + '" opacity=".2" stroke="none"/><circle cx="612" cy="486" r="22" fill="none" stroke="' + m('#8A5A3A') + '" stroke-width="4"/>';
    for (var sp = 0; sp < 6; sp++) { var an = sp / 6 * Math.PI; xa += '<path d="M' + (612 + Math.cos(an) * 20).toFixed(1) + ',' + (486 + Math.sin(an) * 20).toFixed(1) + ' L' + (612 - Math.cos(an) * 20).toFixed(1) + ',' + (486 - Math.sin(an) * 20).toFixed(1) + '" stroke="' + m('#6A4A30') + '" stroke-width="2"/>'; }
    xa += '<path d="M600,512 L612,486 L624,512M612,486 L650,500" fill="none" stroke="' + m('#6A4A30') + '" stroke-width="4"/><path d="M640,498 h14" stroke="' + m('#E9DDB0') + '" stroke-width="5"/><path d="M634,494 Q620,476 612,466" fill="none" stroke="' + m('#E9DDB0') + '" stroke-width="1.2"/>';
    b.prop(584, 456, 76, 64, xa, 514); b.solid(598, 496, 56, 18);
    // chồng nong tằm có kén vàng
    var nt = '';
    nt += G.ve.bong(868, 362, 24, 5, .24);
    for (var n = 0; n < 3; n++) nt += '<ellipse cx="868" cy="' + (358 - n * 8) + '" rx="22" ry="7" fill="' + m('#C79A5E') + '"/><ellipse cx="868" cy="' + (356 - n * 8) + '" rx="18" ry="5" fill="none" stroke="' + m('#A07A40') + '" stroke-width="1"/>';
    nt += '<path d="M852,341 q8,-3 16,0 q8,3 16,0" fill="none" stroke="' + m('#8AA850') + '" stroke-width="3"/>';
    for (var kn = 0; kn < 6; kn++) nt += '<ellipse cx="' + (858 + kn * 4) + '" cy="' + (339 + (kn % 2) * 2) + '" rx="2.6" ry="1.8" fill="' + m('#F0D060') + '" stroke-width="1"/>';
    b.prop(842, 326, 52, 40, nt, 364); b.solid(848, 344, 38, 20);
    // bốn khung cửi cũ hai bên
    [[190, 260], [190, 440], [770, 260], [770, 440]].forEach(function (p, i) {
      b.prop(p[0] - 78, p[1] - 106, 156, 118, G.art.khungCui(p[0], p[1], { vai: chay ? '#3A2A22' : ['#D8C8A0', '#C8D0C0', '#D8C0B8', '#D0C8A8'][i], toi: chay, khongThoi: i % 2 === 1, tinh: true }), p[1]);
      b.solid(p[0] - 62, p[1] - 30, 124, 34);
    });
    // khung cửi gỗ xoan ở giữa (chưa đem đốt)
    if (!f.c3_dot) {
      b.prop(402, 224, 156, 118, G.hoathan.ink(G.art.khungCui(480, 330, { vai: f.c3_nu_chet ? '#C8B898' : '#E9DDB0', mau: f.c3_nu_chet, toi: chay, ma: S.phase === 'dem' || S.phase === 'toi', neo: [480, 330] }) +
        // lá bùa an vị dán trên trụ khung cửi, mép tự quăn lại như bị hơ lửa
        (f.job_anvi && !chay ? '<g transform="translate(527,238) rotate(3) scale(.11)">' + G.ve.bua({ chu: G.ve.BUA.anVi, cu: true, chay: f.c3_nu_chet ? .18 : 0 }) + '</g><path d="M527,238 q-4,4 0,8M540,238 q4,4 0,8" fill="none" stroke="#8A5A10" stroke-width="1.6"/>' : '')), 330, '', true);
      b.solid(418, 300, 124, 34);
    }
    // đèn dầu treo giữa nhà
    b.bg += ink('<path d="M480,128 v30" stroke-width="2"/><path d="M470,158 h20 l-4,14 h-12 z" fill="#C8963A" stroke-width="1.8"/><path d="M480,154 q-3,-6 0,-10 q3,4 0,10" fill="#FFB040" class="flick" stroke-width="1"/>', 2);
    b.lights.push({ x: 480, y: 220, r: 110, flick: true });
    return b.out();
  };

  // sân giếng giặt: cửa nhà dệt; giàn khung cửi chất củi để đốt
  G.scenes.giengHook = function (b, S) {
    if (S.chapter !== 'ch3') return;
    var f = S.flags;
    b.bg += ink('<rect x="434" y="118" width="52" height="92" fill="#6A3A2A"/><path d="M424,98 h72 v20 h-72 z" fill="#6A1A12"/><path d="M427,101 h66 v14 h-66 z" fill="#8A2418" stroke="#D9A93A" stroke-width="1.2"/>' + G.ve.chuKhac(460, 113, 'NHÀ DỆT', 11.5, { ls: .8 }) + '', 2);
    if (f.c3_dot && !f.c3_chay_xong) {
      var s = '<path d="M620,470 l60,-30 l60,30 l-60,24 z" fill="#5A3A2A"/>' + G.art.khungCui(680, 450, { vai: '#3A2A22', ma: true, neo: [680, 450] });
      b.prop(600, 340, 160, 140, G.hoathan.ink(s), 470, '', true); b.solid(612, 440, 136, 30);
      b.lights.push({ x: 680, y: 420, r: 160, flick: true });
    }
    if (f.c3_chay_xong) b.bg += ink('<path d="M40,30 H900 V210 H40 Z" fill="#1A0E0A" opacity=".55" stroke="none"/><ellipse cx="680" cy="460" rx="70" ry="20" fill="#2A2420" stroke-width="2"/>', 2);
  };

  G.scenes.ky_cau = function (S) { return G.scenes.vuon_cau(Object.assign({}, S, { phase: 'chieu', _kyCau: true, flags: {}, beat: '' })); };
})();
