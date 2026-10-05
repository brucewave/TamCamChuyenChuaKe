// Hoá thân của Tấm: chim vàng anh, cây xoan đào, khung cửi gỗ xoan, quả thị (và cô gái bước ra từ quả thị).
// Mỗi hàm trả về chuỗi SVG; cử động do lớp CSS trong css/hoathan.css (nhóm <g> bọc ngoài mang transform,
// nhóm bên trong mang lớp động; gốc xoay tính theo toạ độ cục bộ). Không dùng filter SVG trong cảnh.
// Nạp sau phimchet.js vì ghi đè G.art.khungCui (scenes4.js), G.art.vangAnh / G.art.quaThi (vatpham.js),
// vài tranh đặc tả (closeups4/5, vatpham) và tranh phim V.motif / V.quaThi (cutscene.js).
var G = window.G || (window.G = {});
G.hoathan = {};

(function () {
  var H = G.hoathan, INK = G.INK || '#2B1F1A';
  function f(n) { return (+n).toFixed(1); }
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function rect(x, y, w, h, fill, extra) { return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" fill="' + fill + '"' + (extra || '') + '/>'; }
  // nét mực không filter (dùng cho prop có cử động, tránh vẽ lại filter mỗi khung hình)
  H.ink = function (inner, sw) { return '<g stroke="' + INK + '" stroke-width="' + (sw || 3) + '" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g>'; };
  function neo(o) { return o && o.neo ? ' ht-neo" data-x="' + o.neo[0] + '" data-y="' + o.neo[1] : ''; }

  // gradient dùng chung (quầng đỏ, quầng vàng, quầng hồn, thân quả thị)
  try {
    document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<radialGradient id="htHaoDo"><stop offset="0" stop-color="#FF3A2A" stop-opacity=".55"/><stop offset=".55" stop-color="#C8180E" stop-opacity=".18"/><stop offset="1" stop-color="#C8180E" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="htHaoV"><stop offset="0" stop-color="#FFF2B8" stop-opacity=".95"/><stop offset=".4" stop-color="#FFD98A" stop-opacity=".45"/><stop offset="1" stop-color="#FFD98A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="htHaoX"><stop offset="0" stop-color="#BFF6F2" stop-opacity=".5"/><stop offset="1" stop-color="#9FF0F0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="htThiG" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#FFF0A8"/><stop offset=".45" stop-color="#F4C23C"/><stop offset=".85" stop-color="#E09A2A"/><stop offset="1" stop-color="#C8762A"/></radialGradient>' +
      '<linearGradient id="htTia" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF2B8" stop-opacity=".85"/><stop offset="1" stop-color="#FFF2B8" stop-opacity="0"/></linearGradient>' +
      '</defs></svg>');
  } catch (e) {}

  // =====================================================================================
  // CHIM VÀNG ANH (vàng anh gáy đen: mình vàng, dải đen qua mắt vòng ra gáy, cánh đuôi đen, mắt đỏ, mỏ hồng)
  // o: { x, y, s, flip, kieu: 'dau' | 'nhay' | 'hot' | 'bay' | 'chet', ma (quầng đỏ, mắt loé), dau:false (bỏ chân), tre, neo:[x,y] }
  // gốc (0,0) ở giữa thân, chân bám cành ở y = 22, đầu quay phải (flip: quay trái)
  // =====================================================================================
  H.chim = function (o) {
    o = o || {};
    var s = o.s || 1, k = o.kieu || 'dau', ma = !!o.ma && k !== 'chet', chet = k === 'chet', bay = k === 'bay';
    function w(n) { return (n / s).toFixed(2); }
    var de = o.tre != null ? o.tre : ((Math.abs(o.x || 0) * .37 + Math.abs(o.y || 0) * .11) % 4);
    var den = '#1E1A16', vang = '#F2C230', vang2 = '#D89A18', sang = '#FFE680';
    var g = '<g transform="translate(' + f(o.x || 0) + ',' + f(o.y || 0) + ') scale(' + (o.flip ? -s : s) + ',' + s + ')" stroke="' + INK + '" stroke-width="' + w(2.2) + '" stroke-linejoin="round" stroke-linecap="round">';
    g += '<g class="ht-chim k-' + k + (ma ? ' ma' : '') + neo(o) + '" style="--d:-' + de.toFixed(2) + 's">';
    if (ma) g += '<circle class="hc-hao" cx="4" cy="-6" r="50" fill="url(#htHaoDo)" stroke="none"/>';
    g += '<g class="hc-nhay">';
    if (!bay && o.dau !== false) {
      g += '<g fill="none" stroke="#6E6A78" stroke-width="' + w(2.3) + '"><path d="M-3,12 L-5,21 M6,12 L8,21"/>' +
        '<path d="M-10.5,22.4 L-5,21 L0,22.6 M2.5,22.2 L8,21 L13,22.6 M-5,21 l-1,2.6 M8,21 l1,2.6" stroke-width="' + w(1.7) + '"/></g>';
    }
    g += '<g class="hc-tho">';
    // cánh xa (khi bay)
    var canhBay = 'M4,-9 Q-2,-30 -22,-46 Q-24,-40 -31,-41 Q-27,-34 -34,-31 Q-26,-25 -30,-20 Q-14,-17 -8,-5 Z';
    if (bay) g += '<g class="hc-canh-xa"><path d="' + canhBay + '" fill="#141210" transform="translate(6,-3)"/></g>';
    // đuôi: lông đen, chóp vàng
    g += '<g class="hc-duoi"><path d="M-19,-3 L-41,-7 Q-46,1 -40,11 L-18,5 Z" fill="' + den + '"/>' +
      '<path d="M-39.6,-6.6 Q-45,1 -38.6,10.4 L-35.6,9.2 Q-40.6,1.5 -36.6,-6 Z" fill="' + vang + '" stroke="none"/>' +
      '<path d="M-20,0 L-38,-2 M-20,2.6 L-37,4.6" stroke="#4A3E30" stroke-width="' + w(1) + '" fill="none"/></g>';
    // thân
    g += '<path d="M-22,0 Q-20,-16 2,-16 Q18,-16 22,-4 Q22,12 0,14 Q-18,14 -22,0 Z" fill="' + vang + '"/>';
    g += '<path d="M-19,6 Q-2,15 19,3 Q18,11 0,13.6 Q-14,13.4 -19,6 Z" fill="' + vang2 + '" stroke="none" opacity=".6"/>';
    g += '<path d="M-14,-11 Q0,-17.5 13,-13" fill="none" stroke="' + sang + '" stroke-width="' + w(2.6) + '" opacity=".8"/>';
    g += '<path d="M8,2 q2,2 4,0 M13,-2 q2,2 4,0 M3,7 q2,2 4,0 M10,7 q2,1.6 4,-.4" fill="none" stroke="#C88A18" stroke-width="' + w(1) + '" opacity=".8"/>';
    // cánh gập: đen, mảng vàng ở khớp vai, viền lông vàng
    if (!bay) g += '<g class="hc-canh"><path d="M-19,-5 Q-8,-15.5 9,-8 Q7,3 -5,7 L-29,6.5 Q-25,.5 -19,-5 Z" fill="' + den + '"/>' +
      '<path d="M1,-10 Q7,-9.6 9,-7.5 Q6,-3.5 0,-4.6 Z" fill="' + vang + '" stroke="none"/>' +
      '<path d="M-15,-1.5 q8,-6 16,-3 M-13,2.6 q8,-4 14,-1.2 M-27,5.6 l10,-1.4 M-25,3 l8,-1.2" fill="none" stroke="#E8B828" stroke-width="' + w(1.3) + '"/></g>';
    // đầu
    g += '<g class="hc-dau"><circle cx="18" cy="-12" r="10" fill="' + vang + '"/>';
    g += '<path d="M13,-20.6 Q18,-22.6 23,-20.4" fill="none" stroke="' + sang + '" stroke-width="' + w(2) + '" opacity=".85"/>';
    g += '<path d="M27.5,-13 Q20,-17.5 12,-15 Q7,-14 3.5,-10.5 Q6,-7.6 10,-9 Q18,-11.6 27,-8.6 Z" fill="' + den + '" stroke="none"/>';
    if (chet) g += '<path d="M17.6,-12.6 q2.6,1.8 5,0" fill="none" stroke="#5A4A3A" stroke-width="' + w(1.4) + '"/>';
    else {
      if (ma) g += '<circle class="hc-ma" cx="20.2" cy="-12.2" r="5.4" fill="url(#htHaoDo)" stroke="none"/>';
      g += '<circle cx="20" cy="-12.2" r="2.7" fill="#8A1A14" stroke-width="' + w(.8) + '"/><circle cx="20.4" cy="-12.2" r="1.3" fill="#050302" stroke="none"/>';
      g += ma ? '<circle class="hc-ma" cx="20.8" cy="-12.6" r=".8" fill="#FF5A3A" stroke="none"/>' : '<circle cx="19.4" cy="-13.1" r=".7" fill="#FFFFFF" stroke="none"/>';
      g += '<ellipse class="hc-mi" cx="20" cy="-12.2" rx="3.3" ry="3.3" fill="' + den + '" stroke="none"/>';
    }
    g += '<path d="M27,-13.2 Q33,-13.6 38.5,-10 Q33,-9.4 27,-9.6 Z" fill="#E88A8A"/>';
    g += '<g class="hc-mo"><path d="M27,-9.6 L37,-9.8 Q32,-6.6 27,-7.2 Z" fill="#C86A70"/></g>';
    g += '<circle cx="30" cy="-11.6" r=".7" fill="#6A2A2A" stroke="none"/></g>';
    // cánh gần (khi bay): giơ lên rồi đập xuống
    if (bay) g += '<g class="hc-canh-bay"><path d="' + canhBay + '" fill="' + den + '"/><path d="M4,-9 Q-1,-24 -12,-35 Q-9,-22 -6,-7 Z" fill="' + vang + '" stroke="none"/>' +
      '<path d="M-20,-40 l-6,6 M-24,-32 l-6,4 M-22,-24 l-6,2" stroke="#4A3E30" stroke-width="' + w(1) + '" fill="none"/></g>';
    g += '</g>'; // hc-tho
    if (k === 'hot') { // nốt nhạc, gợn tiếng hót (hồn ma: gợn xanh lạnh)
      var mn = ma ? '#BFF6F2' : '#4A3426';
      [[41, -17, 'n1'], [46, -22, 'n2'], [40, -26, 'n3']].forEach(function (n) {
        g += '<g class="hc-not ' + n[2] + '"><ellipse cx="' + n[0] + '" cy="' + n[1] + '" rx="2.6" ry="1.9" fill="' + mn + '" stroke="none"/><path d="M' + (n[0] + 2.3) + ',' + n[1] + ' v-8.5 q3.4,1 4,4.4" fill="none" stroke="' + mn + '" stroke-width="' + w(1.3) + '"/></g>';
      });
      g += '<path class="hc-gon" d="M40,-6.5 q4,-4 0,-8 M44,-4.5 q7,-6 0,-12 M48,-2.5 q10,-8 0,-16" fill="none" stroke="' + (ma ? '#9FF0F0' : '#8A6A4A') + '" stroke-width="' + w(1.4) + '"/>';
    }
    return g + '</g></g></g>';
  };

  // đầu chim vàng anh cận cảnh (trong quả thị giả): mắt còn mở, con ngươi đảo theo người xem
  H.dauChim = function (x, y, s) {
    var g = '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="' + (2.4 / s).toFixed(2) + '" stroke-linejoin="round"><g class="ht-dauchim">';
    g += '<circle r="40" fill="#F2C230"/><path d="M-30,20 q14,14 34,8" fill="none" stroke="#D89A18" stroke-width="' + (3 / s).toFixed(2) + '"/><path d="M-34,-14 q-6,8 -4,18" stroke="#FFE680" stroke-width="' + (4 / s).toFixed(2) + '" fill="none"/>';
    g += '<path d="M42,-4 Q16,-24 -14,-14 Q-34,-8 -42,8 Q-30,12 -14,2 Q12,-8 40,8 Z" fill="#1E1A16" stroke="none"/>';
    g += '<circle cx="12" cy="-6" r="9" fill="#8A1A14" stroke-width="' + (1.6 / s).toFixed(2) + '"/><g class="hd-nhin"><circle cx="13" cy="-6" r="4.4" fill="#050302" stroke="none"/><circle class="hc-ma" cx="15" cy="-8" r="1.5" fill="#FF5A3A" stroke="none"/></g>';
    g += '<path d="M38,-8 Q54,-6 66,2 Q52,3 38,4 Z" fill="#E88A8A"/><path d="M38,4 L64,3 Q52,10 38,10 Z" fill="#C86A70"/>';
    g += '<path d="M-20,32 q4,10 -2,22 M6,38 q2,10 -2,18" stroke="#7A0A06" stroke-width="' + (3 / s).toFixed(2) + '" fill="none"/>';
    return g + '</g></g>';
  };

  // =====================================================================================
  // CÂY XOAN ĐÀO (toạ độ thế giới, gốc ở x,y): vỏ xám nâu nứt dọc, cành đung đưa, lá kép lông chim,
  // chùm hoa tím, hoa rơi; hai mắt gỗ như gương mặt (rõ khi mở mắt âm dương); o.chat: vết rìu rỉ nhựa đỏ
  // =====================================================================================
  H.xoan = function (o) {
    o = o || {};
    var x = o.x, y = o.y, r = rng(o.seed || 33), V = G.ve, LA = V.LA.xanh;
    var VO = ['#7A6A5E', '#4E4038', '#A0907E'];
    var s = '<g class="ht-xoan' + (o.neo !== false ? ' ht-neo" data-x="' + x + '" data-y="' + y : '') + '">';
    s += V.bong(x, y, 92, 18, .24);
    // rễ nổi bò về phía dãy nhà
    var re = 'M' + (x - 20) + ',' + y + ' q-60,10 -110,-4 q-40,-10 -80,6 M' + (x + 20) + ',' + y + ' q70,6 120,-10 M' + (x - 6) + ',' + (y + 2) + ' q-10,12 -30,16';
    s += '<path d="' + re + '" fill="none" stroke="' + INK + '" stroke-width="12"/><path d="' + re + '" fill="none" stroke="' + VO[0] + '" stroke-width="7.5"/>' +
      '<path d="M' + (x - 40) + ',' + (y + 1) + ' q-40,6 -80,-2 M' + (x + 40) + ',' + (y - 1) + ' q40,2 80,-8" fill="none" stroke="' + VO[2] + '" stroke-width="1.6" opacity=".7"/>';
    // thân
    s += '<path d="M' + (x - 24) + ',' + y + ' Q' + (x - 14) + ',' + (y - 120) + ' ' + (x - 30) + ',' + (y - 232) + ' L' + (x + 4) + ',' + (y - 238) + ' Q' + (x + 16) + ',' + (y - 120) + ' ' + (x + 26) + ',' + y + ' Z" fill="' + VO[0] + '"/>';
    s += '<path d="M' + (x + 6) + ',' + y + ' Q' + (x + 6) + ',' + (y - 120) + ' ' + (x - 6) + ',' + (y - 236) + ' L' + (x + 4) + ',' + (y - 238) + ' Q' + (x + 16) + ',' + (y - 120) + ' ' + (x + 26) + ',' + y + ' Z" fill="' + VO[1] + '" stroke="none" opacity=".7"/>';
    s += '<path d="M' + (x - 18) + ',' + (y - 4) + ' Q' + (x - 9) + ',' + (y - 120) + ' ' + (x - 24) + ',' + (y - 226) + '" fill="none" stroke="' + VO[2] + '" stroke-width="3" opacity=".6"/>';
    var nut = '';
    for (var i = 0; i < 16; i++) { var nx = x - 16 + r() * 28, ny = y - 20 - r() * 200; nut += 'M' + f(nx) + ',' + f(ny) + ' q' + f(r() * 3 - 1.5) + ',' + f(8 + r() * 6) + ' ' + f(r() * 2 - 1) + ',' + f(16 + r() * 14); }
    s += '<path d="' + nut + '" fill="none" stroke="#3A2E26" stroke-width="1.4" opacity=".75"/>';
    var bi = ''; for (var j = 0; j < 14; j++) { var bx = x - 14 + r() * 24, by = y - 14 - r() * 210; bi += 'M' + f(bx) + ',' + f(by) + ' h' + f(2 + r() * 2); }
    s += '<path d="' + bi + '" stroke="#C8B8A4" stroke-width="1.6" opacity=".7"/>';
    // gương mặt trong vỏ cây: hai mắt gỗ chảy dọc, miệng hốc
    s += '<g class="ht-xmat">';
    s += '<path d="M' + (x - 13) + ',' + (y - 148) + ' q-2,16 1,32 M' + (x + 6) + ',' + (y - 152) + ' q2,14 -1,28" fill="none" stroke="#3A2A20" stroke-width="2.2"/>';
    s += '<ellipse cx="' + (x - 12) + '" cy="' + (y - 158) + '" rx="6.5" ry="8.5" fill="#5A4A3E" stroke-width="1.6"/><ellipse class="ht-xmo" cx="' + (x - 12) + '" cy="' + (y - 157) + '" rx="4" ry="6" fill="#140C08" stroke="none"/>';
    s += '<ellipse cx="' + (x + 6) + '" cy="' + (y - 161) + '" rx="5.5" ry="7.5" fill="#5A4A3E" stroke-width="1.6"/><ellipse class="ht-xmo" cx="' + (x + 6) + '" cy="' + (y - 160) + '" rx="3.4" ry="5.2" fill="#140C08" stroke="none"/>';
    s += '<circle class="ht-xdo" cx="' + (x - 12) + '" cy="' + (y - 157) + '" r="1.7" fill="#FF3A2A" stroke="none"/><circle class="ht-xdo" cx="' + (x + 6) + '" cy="' + (y - 160) + '" r="1.5" fill="#FF3A2A" stroke="none"/>';
    s += '<path d="M' + (x - 9) + ',' + (y - 124) + ' q5,-6 10,0 q-1,12 -5,15 q-4,-3 -5,-15 Z" fill="#1A100A" stroke-width="1.4"/>';
    s += '</g>';
    if (o.layVo) s += '<path d="M' + (x - 14) + ',' + (y - 110) + ' h18 v26 h-18 z" fill="#D8B8A0"/><path d="M' + (x - 10) + ',' + (y - 104) + ' v14 M' + (x - 2) + ',' + (y - 106) + ' v18" stroke="#B88A70" stroke-width="1.4"/>';
    if (o.chat) {
      s += '<path d="M' + (x - 18) + ',' + (y - 60) + ' l30,-10 l-4,14 z" fill="#3A0A06"/><path d="M' + (x - 16) + ',' + (y - 58) + ' l26,-8" stroke="#C8A888" stroke-width="1.6"/>';
      s += '<path d="M' + (x - 6) + ',' + (y - 56) + ' q-2,26 4,54M' + (x + 6) + ',' + (y - 60) + ' q4,30 -2,58" stroke="#A8180E" stroke-width="5" fill="none"/>';
      s += '<circle class="ht-giot" cx="' + (x - 4) + '" cy="' + (y - 52) + '" r="2.6" fill="#A8180E" stroke="none"/><circle class="ht-giot g2" cx="' + (x + 7) + '" cy="' + (y - 56) + '" r="2.2" fill="#A8180E" stroke="none"/>';
    }
    // tán: ba cành, mỗi cành một chùm lá kép và hoa tím
    function laKep(px, py, goc, dai) { // lá kép lông chim rủ xuống
      var t = '', l = '', ca = Math.cos(goc), sa = Math.sin(goc);
      var ex = px + ca * dai, ey = py + sa * dai + dai * .35;
      t += 'M' + f(px) + ',' + f(py) + ' Q' + f(px + ca * dai * .6) + ',' + f(py + sa * dai * .6 - 4) + ' ' + f(ex) + ',' + f(ey);
      for (var q = 1; q <= 5; q++) {
        var tt = q / 6, lx = px + (ex - px) * tt, ly = py + (ey - py) * tt - 2 * Math.sin(Math.PI * tt), a = goc * 57.3;
        l += '<ellipse cx="' + f(lx) + '" cy="' + f(ly - 3) + '" rx="4.4" ry="1.8" transform="rotate(' + f(a - 50) + ' ' + f(lx) + ' ' + f(ly - 3) + ')"/>';
        l += '<ellipse cx="' + f(lx) + '" cy="' + f(ly + 3) + '" rx="4.4" ry="1.8" transform="rotate(' + f(a + 50) + ' ' + f(lx) + ' ' + f(ly + 3) + ')"/>';
      }
      return '<path d="' + t + '" fill="none" stroke="#4E6A2E" stroke-width="1.2"/><g fill="' + (r() < .5 ? LA[2] : LA[1]) + '" stroke="' + LA[4] + '" stroke-width=".8">' + l + '</g>';
    }
    function chumHoa(cx, cy, n) {
      var h = '', mau = ['#B49AD8', '#C8B4E8', '#A88AD0'];
      for (var q = 0; q < n; q++) { var a = r() * Math.PI * 2, d = r() * 9; h += '<circle cx="' + f(cx + Math.cos(a) * d) + '" cy="' + f(cy + Math.sin(a) * d * .8 + q * .8) + '" r="' + f(2.4 + r() * 1.4) + '" fill="' + mau[q % 3] + '"/>'; }
      h += '<circle cx="' + f(cx - 2) + '" cy="' + f(cy - 2) + '" r="1.2" fill="#F2EAFA" stroke="none"/><circle cx="' + f(cx + 3) + '" cy="' + f(cy + 3) + '" r=".9" fill="#6A4A8A" stroke="none"/>';
      return '<g stroke-width=".8">' + h + '</g>';
    }
    function canh(x0, y0, x1, y1, wd, cx, cy, rx, ry, de, dur) {
      var c = '<g class="ht-xcanh" style="transform-origin:' + f(x0) + 'px ' + f(y0) + 'px;animation-delay:-' + f(de) + 's;animation-duration:' + f(dur) + 's">';
      var p = 'M' + f(x0) + ',' + f(y0) + ' Q' + f((x0 + x1) / 2 + (y1 - y0) * .12) + ',' + f((y0 + y1) / 2 - 10) + ' ' + f(x1) + ',' + f(y1);
      c += '<path d="' + p + '" fill="none" stroke="' + INK + '" stroke-width="' + (wd + 3) + '"/><path d="' + p + '" fill="none" stroke="' + VO[0] + '" stroke-width="' + wd + '"/>';
      c += '<path d="M' + f(x1) + ',' + f(y1) + ' l' + f(-rx * .4) + ',' + f(-ry * .5) + ' M' + f(x1) + ',' + f(y1) + ' l' + f(rx * .45) + ',' + f(-ry * .4) + ' M' + f(x1) + ',' + f(y1) + ' l' + f(rx * .05) + ',' + f(-ry * .7) + '" fill="none" stroke="' + VO[1] + '" stroke-width="' + f(wd * .45) + '"/>';
      c += '<g class="ht-xla" style="animation-delay:-' + f(de * 1.7) + 's">' + V.tan(cx, cy, rx, ry, r, LA, { n: 11, la: 26 });
      for (var q = 0; q < 7; q++) { var a = Math.PI * (.05 + r() * .9), lx = cx + Math.cos(a) * rx * .82 * (r() < .5 ? -1 : 1), ly = cy + Math.sin(a) * ry * .55; s2 += laKep(lx, ly, lx < cx ? Math.PI * .8 : Math.PI * .2, 16 + r() * 10); }
      c += s2; s2 = '';
      for (var h = 0; h < 6; h++) c += chumHoa(cx - rx * .75 + r() * rx * 1.5, cy - ry * .5 + r() * ry * 1.1, 6 + Math.floor(r() * 4));
      return c + '</g></g>';
    }
    var s2 = '';
    s += '<g class="ht-xtan" style="transform-origin:' + (x - 12) + 'px ' + (y - 234) + 'px">';
    s += canh(x - 26, y - 200, x - 110, y - 272, 12, x - 100, y - 300, 66, 46, 0, 5.2);
    s += canh(x - 2, y - 210, x + 90, y - 290, 12, x + 86, y - 318, 70, 46, 1.8, 4.6);
    s += canh(x - 14, y - 232, x - 20, y - 320, 14, x - 8, y - 358, 92, 52, 3.1, 5.8);
    s += '</g>';
    // hoa xoan rơi lả tả, vài lá chét rơi
    for (var k = 0; k < 10; k++) {
      var px = x - 150 + r() * 300, py = y - 330 + r() * 80, dx = -30 + r() * 70, dy = y - 6 - py - r() * 30;
      s += '<g class="ht-xroi" style="--dx:' + f(dx) + 'px;--dy:' + f(dy) + 'px;animation-duration:' + f(7 + r() * 5) + 's;animation-delay:-' + f(r() * 12) + 's">';
      if (k % 4 === 3) s += '<ellipse cx="' + f(px) + '" cy="' + f(py) + '" rx="4.4" ry="1.8" fill="' + LA[2] + '" stroke-width=".8"/>';
      else s += '<g stroke-width=".7"><circle cx="' + f(px) + '" cy="' + f(py - 2.2) + '" r="1.9" fill="#C8B4E8"/><circle cx="' + f(px + 2.1) + '" cy="' + f(py - .4) + '" r="1.9" fill="#B49AD8"/><circle cx="' + f(px + 1.3) + '" cy="' + f(py + 2) + '" r="1.9" fill="#C8B4E8"/><circle cx="' + f(px - 1.3) + '" cy="' + f(py + 2) + '" r="1.9" fill="#B49AD8"/><circle cx="' + f(px - 2.1) + '" cy="' + f(py - .4) + '" r="1.9" fill="#C8B4E8"/><circle cx="' + f(px) + '" cy="' + f(py) + '" r="1" fill="#6A4A8A" stroke="none"/></g>';
      s += '</g>';
    }
    return s + '</g>';
  };

  // =====================================================================================
  // KHUNG CỬI (ghi đè G.art.khungCui ở scenes4.js, giữ hình dáng cũ): con thoi chạy qua miệng vải, go nhấp,
  // khung lược đập, sợi dọc rung, khổ vải nhích dần về trục cuộn, bàn đạp nhún, cả khung cót két.
  // o: { vai, mau, toi (cháy/tối: đứng im), khongThoi, tinh (đứng im), ma (đang hát: sợi đỏ, mặt người trong vải, rung bần bật), neo }
  // =====================================================================================
  H.khungCui = function (x, y, o) {
    o = o || {};
    var V = G.ve, toi = o.toi, dong = !toi && !o.tinh, ma = !!o.ma && !toi;
    var go = toi ? '#4A3A30' : '#8A5A36', go2 = toi ? '#2E221A' : '#5E3A22', goS = toi ? '#5A4838' : '#B0804E', vai = o.vai || '#E9DDB0', soi = toi ? '#6A5A4A' : '#E6DABA';
    var id = 'hk' + Math.round(x) + '_' + Math.round(y) + (o.mau ? 'm' : '') + (ma ? 'h' : '');
    var de = ((x * .29 + y * .13) % 3).toFixed(2);
    var s = V.bong(x, y + 2, 76, 13, .26);
    s += '<g class="ht-cui' + (dong ? ' dong' : '') + (ma ? ' ma' : '') + neo(o) + '" style="transform-origin:' + x + 'px ' + (y + 2) + 'px;--d:-' + de + 's">';
    if (ma) s += '<ellipse class="hk-hao" cx="' + x + '" cy="' + (y - 56) + '" rx="100" ry="80" fill="url(#htHaoDo)" stroke="none"/>';
    // hai trụ có mộng
    [x - 60, x + 50].forEach(function (px) {
      s += rect(px, y - 102, 12, 104, go) + rect(px + 7, y - 102, 5, 104, go2, ' stroke="none" opacity=".75"') + rect(px + 1.5, y - 101, 2.5, 102, goS, ' stroke="none" opacity=".8"');
      s += '<path d="M' + px + ',' + (y - 78) + ' h12M' + px + ',' + (y - 40) + ' h12" stroke-width="1.4"/><circle cx="' + (px + 6) + '" cy="' + (y - 90) + '" r="1.8" fill="' + go2 + '" stroke="none"/>';
    });
    // xà trên, đầu xà chạm
    s += '<path d="M' + (x - 70) + ',' + (y - 98) + ' H' + (x + 70) + '" stroke="' + INK + '" stroke-width="11"/><path d="M' + (x - 70) + ',' + (y - 98) + ' H' + (x + 70) + '" stroke="' + go + '" stroke-width="7.5"/><path d="M' + (x - 68) + ',' + (y - 100.5) + ' H' + (x + 68) + '" stroke="' + goS + '" stroke-width="1.6"/>';
    s += '<path d="M' + (x - 70) + ',' + (y - 103) + ' q-8,0 -8,5 q0,5 8,5 M' + (x + 70) + ',' + (y - 103) + ' q8,0 8,5 q0,5 -8,5" fill="' + go + '" stroke-width="2"/>';
    s += '<rect x="' + (x - 50) + '" y="' + (y - 96) + '" width="100" height="7" rx="3.5" fill="' + soi + '" stroke-width="1.6"/>';
    // sợi dọc hai lớp (miệng vải)
    var a = '', b2 = '';
    for (var i = 0; i < 36; i++) { var kx = -46 + i * 92 / 35; if (i % 2) a += 'M' + f(x + kx) + ',' + (y - 89) + ' L' + f(x + kx * .97) + ',' + (y - 77) + ' L' + f(x + kx * .96) + ',' + (y - 64); else b2 += 'M' + f(x + kx) + ',' + (y - 89) + ' L' + f(x + kx * .97) + ',' + (y - 73) + ' L' + f(x + kx * .96) + ',' + (y - 64); }
    s += '<g class="hk-soiB"><path d="' + b2 + '" stroke="' + soi + '" stroke-width="1" opacity=".75" fill="none"/></g><g class="hk-soiA"><path d="' + a + '" stroke="' + soi + '" stroke-width="1" fill="none"/></g>';
    if (ma) s += '<path class="hk-soido" d="' + a + b2 + '" stroke="#FF3A2A" stroke-width="1.2" fill="none"/>';
    // hai go treo dây nhấp lên xuống so le
    [y - 80, y - 73].forEach(function (gy, gi) {
      var dg = ''; for (var k2 = -48; k2 <= 48; k2 += 4) dg += 'M' + (x + k2 + gi * 2) + ',' + (gy - 3) + ' v6';
      s += '<g class="hk-go' + (gi + 1) + '"><path d="M' + (x - 52) + ',' + gy + ' H' + (x + 52) + '" stroke="' + go2 + '" stroke-width="3.4"/><path d="' + dg + '" stroke="' + go2 + '" stroke-width=".9"/></g>';
    });
    s += '<path d="M' + (x - 40) + ',' + (y - 98) + ' v18M' + (x + 40) + ',' + (y - 98) + ' v18" stroke="' + go2 + '" stroke-width="1.2"/><circle cx="' + (x - 40) + '" cy="' + (y - 95) + '" r="2.6" fill="' + goS + '" stroke-width="1.2"/><circle cx="' + (x + 40) + '" cy="' + (y - 95) + '" r="2.6" fill="' + goS + '" stroke-width="1.2"/>';
    // khung lược đập sợi ngang
    var lc = ''; for (var k3 = -52; k3 <= 52; k3 += 2.4) lc += 'M' + f(x + k3) + ',' + (y - 67) + ' v4';
    s += '<g class="hk-luoc">' + rect(x - 56, y - 68, 112, 6, go) + rect(x - 56, y - 68, 112, 1.6, goS, ' stroke="none"') + '<path d="' + lc + '" stroke="' + go2 + '" stroke-width=".7"/></g>';
    // khổ vải: hoa văn nhích dần xuống trục cuộn (cắt trong khung vải)
    s += '<clipPath id="' + id + '"><rect x="' + (x - 48) + '" y="' + (y - 62) + '" width="96" height="27"/></clipPath>';
    s += rect(x - 48, y - 62, 96, 27, vai);
    var c1 = o.mau ? '#A8180E' : (toi ? '#3A2A22' : '#B8483A'), c2 = toi ? '#2A1E18' : '#2E5A6A';
    var vn = ''; for (var yy = y - 82; yy < y - 34; yy += 2) vn += 'M' + (x - 47) + ',' + yy + ' h94';
    var hv = '', hv2 = '', vien = '';
    for (var p = -1; p < 2; p++) {
      var py = y - 58 + p * 19;
      vien += 'M' + (x - 48) + ',' + py + ' h96';
      for (var k4 = -40; k4 <= 36; k4 += 13) { hv += 'M' + (x + k4) + ',' + (py + 9) + ' l6,-6 l6,6 l-6,6 z'; hv2 += 'M' + (x + k4 + 6) + ',' + (py + 6.5) + ' l2.5,2.5 l-2.5,2.5 l-2.5,-2.5 z'; }
    }
    s += '<g clip-path="url(#' + id + ')"><g class="hk-vai"><path d="' + vn + '" stroke="#1A0E08" stroke-width=".5" opacity=".12"/><path d="' + vien + '" stroke="' + c2 + '" stroke-width="2"/>' +
      '<path d="' + hv + '" fill="none" stroke="' + c1 + '" stroke-width="1.5"/><path d="' + hv2 + '" fill="' + c2 + '" stroke="none"/></g></g>';
    s += rect(x - 48, y - 62, 96, 4, '#FFFFFF', ' stroke="none" opacity=".18"');
    if (dong) s += '<path class="hk-fell" d="M' + (x - 48) + ',' + (y - 61) + ' h96" stroke="#FFF6D8" stroke-width="1.4" opacity="0"/>';
    if (ma) { // gương mặt người hiện trong khổ vải, mắt đỏ, miệng hát
      s += '<g class="hk-mat" stroke="none"><path d="M' + (x - 24) + ',' + (y - 52) + ' q8,-7 16,0 q-8,5 -16,0 Z M' + (x + 8) + ',' + (y - 52) + ' q8,-7 16,0 q-8,5 -16,0 Z" fill="#2A0604" opacity=".75"/>' +
        '<circle cx="' + (x - 16) + '" cy="' + (y - 52.5) + '" r="1.6" fill="#FF3A2A"/><circle cx="' + (x + 16) + '" cy="' + (y - 52.5) + '" r="1.6" fill="#FF3A2A"/>' +
        '<ellipse class="hk-mieng" cx="' + x + '" cy="' + (y - 42) + '" rx="5" ry="3.4" fill="#2A0604" opacity=".8"/></g>';
    }
    if (o.mau) s += '<path d="M' + (x - 30) + ',' + (y - 40) + ' q1,14 -1,30M' + (x + 10) + ',' + (y - 40) + ' q2,18 0,40" stroke="#8A0E08" stroke-width="3" fill="none"/><circle cx="' + (x + 10) + '" cy="' + (y + 1) + '" r="2.6" fill="#8A0E08" stroke="none"/>' +
      (dong ? '<circle class="ht-giot" cx="' + (x + 10) + '" cy="' + (y - 2) + '" r="1.8" fill="#8A0E08" stroke="none" style="--rg:14px"/>' : '');
    // trục cuộn vải
    s += '<rect x="' + (x - 60) + '" y="' + (y - 37) + '" width="120" height="10" rx="5" fill="' + go + '"/><rect x="' + (x - 48) + '" y="' + (y - 37) + '" width="96" height="10" fill="' + vai + '" stroke-width="1.4"/>';
    s += '<path d="M' + (x - 48) + ',' + (y - 34.5) + ' h96" stroke="#FFFFFF" stroke-width="1.6" opacity=".4"/><path d="M' + (x - 48) + ',' + (y - 29) + ' h96" stroke="#1A0E08" stroke-width="1.6" opacity=".25"/>';
    // con thoi hình thuyền + suốt sợi (chạy ngang miệng vải)
    if (!o.khongThoi) {
      var tx = dong ? x - 40 : x + 4;
      s += '<g class="hk-thoi"><path d="M' + tx + ',' + (y - 62) + ' q14,-6 30,-3 q-4,4 -8,5 q-14,3 -22,-2 z" fill="' + (toi ? '#5A4838' : '#C9963A') + '" stroke-width="1.4"/><path d="M' + (tx + 9) + ',' + (y - 63) + ' h10" stroke="' + (toi ? soi : (ma ? '#E8281A' : '#B8483A')) + '" stroke-width="2.4"/>' +
        '<path d="M' + (tx + 2) + ',' + (y - 61.4) + ' q8,-3.4 22,-2.4" fill="none" stroke="#FFF2C8" stroke-width="1" opacity=".6"/></g>';
    }
    // dây go, bàn đạp nhún so le
    s += '<path d="M' + (x - 30) + ',' + (y - 73) + ' L' + (x - 16) + ',' + (y - 8) + 'M' + (x + 30) + ',' + (y - 80) + ' L' + (x + 10) + ',' + (y - 8) + '" stroke="' + go2 + '" stroke-width=".9" opacity=".7"/>';
    [[x - 24, 'hk-dap1'], [x + 2, 'hk-dap2']].forEach(function (d) {
      s += '<g class="' + d[1] + '" style="transform-origin:' + d[0] + 'px ' + (y + 1) + 'px"><path d="M' + d[0] + ',' + (y + 1) + ' l12,-10" stroke="' + INK + '" stroke-width="6"/><path d="M' + d[0] + ',' + (y + 1) + ' l12,-10" stroke="' + go + '" stroke-width="3.5"/></g>';
    });
    // ghế ngồi dệt
    s += V.khoi(x - 30, y - 22, 60, 7, 6, toi ? ['#3A2A22', '#2A1E18', '#4A3A30', '#2A1E18'] : V.GO.nau, { chan: 7, van: false });
    if (ma) s += '<path class="hk-tieng" d="M' + (x + 76) + ',' + (y - 70) + ' q8,-8 0,-16 M' + (x + 84) + ',' + (y - 66) + ' q14,-12 0,-24 M' + (x - 76) + ',' + (y - 70) + ' q-8,-8 0,-16 M' + (x - 84) + ',' + (y - 66) + ' q-14,-12 0,-24" fill="none" stroke="#FF8A6A" stroke-width="2"/>';
    return s + '</g>';
  };
  G.art.khungCui = H.khungCui;

  // =====================================================================================
  // QUẢ THỊ: quả tròn dẹt vàng ươm, núm tai bốn cánh, đung đưa trên cuống; quầng sáng thở, hương bốc lên
  // gốc (0,0) ở giữa quả, cuống lên tới y = -43. o: { tat (không sáng), canh:false (không vẽ cành lá), tinh, tre }
  // =====================================================================================
  H.quaThi = function (x, y, s, o) {
    o = o || {}; s = s || 1;
    function w(n) { return (n / s).toFixed(2); }
    var de = o.tre != null ? o.tre : ((Math.abs(x) * .21 + Math.abs(y) * .07) % 4);
    var g = '<g transform="translate(' + f(x) + ',' + f(y) + ') scale(' + s + ')" stroke="' + INK + '" stroke-width="' + w(2.4) + '" stroke-linejoin="round" stroke-linecap="round">';
    g += '<g class="ht-thi' + (o.tinh ? ' tinh' : '') + '" style="--d:-' + de.toFixed(2) + 's">';
    if (!o.tat) g += '<circle class="hq-hao" cx="0" cy="0" r="80" fill="url(#htHaoV)" stroke="none"/><circle class="hq-hao2" cx="0" cy="0" r="42" fill="url(#htHaoV)" stroke="none"/>';
    if (o.canh !== false) { // cành con và hai lá thị dày bóng
      g += '<path d="M-40,-50 Q-10,-40 0,-43 Q20,-48 38,-58" fill="none" stroke="' + INK + '" stroke-width="' + w(6) + '"/><path d="M-40,-50 Q-10,-40 0,-43 Q20,-48 38,-58" fill="none" stroke="#5A4430" stroke-width="' + w(3.6) + '"/>';
      g += '<path d="M-22,-46 Q-36,-64 -54,-60 Q-42,-44 -22,-46 Z" fill="#3E5A2A"/><path d="M-22,-46 Q-38,-56 -52,-59" fill="none" stroke="#6E9248" stroke-width="' + w(1.2) + '"/>';
      g += '<path d="M18,-51 Q30,-72 50,-70 Q42,-52 18,-51 Z" fill="#55763A"/><path d="M18,-51 Q34,-64 48,-69" fill="none" stroke="#94B464" stroke-width="' + w(1.2) + '"/>';
    }
    g += '<g class="hq-dua">';
    g += '<path d="M0,-21 Q-2,-32 0,-43" fill="none" stroke="' + INK + '" stroke-width="' + w(5) + '"/><path d="M0,-21 Q-2,-32 0,-43" fill="none" stroke="#6A4A2A" stroke-width="' + w(2.6) + '"/>';
    g += '<path d="M-28,0 Q-29,-20 -12,-23 Q0,-26 12,-23 Q29,-20 28,0 Q27,22 0,25 Q-27,22 -28,0 Z" fill="url(#htThiG)"/>';
    g += '<path d="M-10,-21 q-7,21 -2,44 M10,-21 q7,21 2,44 M0,-23 v46" fill="none" stroke="#C8862A" stroke-width="' + w(1) + '" opacity=".55"/>';
    g += '<path d="M-24,10 Q0,30 24,10 Q22,22 0,25 Q-22,22 -24,10 Z" fill="#B8662A" stroke="none" opacity=".45"/>';
    g += '<g fill="#B8762A" stroke="none" opacity=".7"><circle cx="8" cy="4" r="1"/><circle cx="16" cy="-6" r=".8"/><circle cx="-6" cy="12" r=".9"/><circle cx="18" cy="10" r="1.1"/><circle cx="-14" cy="2" r=".7"/></g>';
    g += '<ellipse class="hq-sang" cx="-5" cy="-3" rx="16" ry="12" fill="#FFF6C8" stroke="none" opacity=".35"/>';
    g += '<path d="M-17,-12 q-5,8 -1,17" fill="none" stroke="#FFFBEA" stroke-width="' + w(4) + '" opacity=".75"/><circle cx="-12" cy="-16" r="2.4" fill="#FFFBEA" stroke="none"/>';
    g += '<path d="M0,-22 Q-12,-24 -17,-30 Q-7,-31 -1,-25 Q-4,-33 0,-37 Q4,-33 1,-25 Q7,-31 17,-30 Q12,-24 0,-22 Z" fill="#6A7A3A"/><path d="M-12,-27 q6,2 10,4 M12,-27 q-6,2 -10,4" fill="none" stroke="#3E4A20" stroke-width="' + w(1) + '"/>';
    g += '</g>';
    if (!o.tat) {
      [[-12, 'h1'], [3, 'h2'], [15, 'h3']].forEach(function (h) { g += '<path class="hq-huong ' + h[1] + '" d="M' + h[0] + ',-30 q-5,-7 0,-14 q5,-7 0,-14" fill="none" stroke="#FFE8A0" stroke-width="' + w(2) + '" opacity="0"/>'; });
      [[-26, 6, -8, .3], [24, -4, 10, 1.4], [-6, 20, -4, 2.6], [30, 16, 14, 3.5], [-34, -10, -14, 4.4]].forEach(function (m) {
        g += '<circle class="hq-dom" cx="' + m[0] + '" cy="' + m[1] + '" r="1.7" fill="#FFF2B8" stroke="none" style="--mx:' + m[2] + 'px;animation-delay:-' + m[3] + 's"/>';
      });
    }
    return g + '</g></g>';
  };
  G.art.quaThi = function (x, y, s, o) { return H.quaThi(x, y, s, Object.assign({ canh: false }, o || {})); };

  // chim vàng anh dùng chung (thay G.art.vangAnh của vatpham.js, giữ chữ ký cũ)
  G.art.vangAnh = function (x, y, s, flip, o) {
    o = o || {};
    return H.chim({ x: x, y: y, s: s, flip: flip, kieu: o.kieu || (o.chet ? 'chet' : 'dau'), ma: o.ma, dau: o.dau, tre: o.tre });
  };

  // =====================================================================================
  // CẢNH GIỚI: rung tán cây / chim giật mình / khung cửi rung khi bắt đầu nói chuyện ở gần
  // =====================================================================================
  H.rung = function () {
    var S = G.S; if (!S) return;
    var els = document.querySelectorAll('#ents .ht-neo');
    for (var i = 0; i < els.length; i++) {
      var e = els[i], dx = (+e.getAttribute('data-x')) - S.x, dy = (+e.getAttribute('data-y')) - S.y;
      if (dx * dx + dy * dy > 230 * 230) continue;
      (function (el) { el.classList.remove('rung'); void el.getBoundingClientRect(); el.classList.add('rung'); setTimeout(function () { el.classList.remove('rung'); }, 1500); })(e);
    }
  };
  if (G.ui && G.ui.dialog && !G.ui.dialog._ht) {
    var dlg = G.ui.dialog;
    G.ui.dialog = function () { try { H.rung(); } catch (e) {} return dlg.apply(this, arguments); };
    G.ui.dialog._ht = true;
  }

  // =====================================================================================
  // TRANH ĐẶC TẢ (400x300, không filter để cử động nhẹ)
  // =====================================================================================
  var C = G.CLOSEUPS;
  function wrap(inner, bg, defs) {
    return '<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">' + (defs ? '<defs>' + defs + '</defs>' : '') + '<rect width="400" height="300" fill="' + (bg || '#E9E2D0') + '"/>' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></svg>';
  }
  function nguoi(look, o) { try { return G.sprite.ve(look, o); } catch (e) { return ''; } }

  // qua bát nước: cô gái ngồi trên cành đào, cạnh con vàng anh đang hót bằng giọng người
  C.bong_dao = function () {
    var A = G.art, s = '<rect width="400" height="300" fill="#0A1A1E" stroke="none"/>';
    for (var i = 0; i < 11; i++) s += '<circle cx="' + (20 + i * 38) + '" cy="' + (30 + (i % 3) * 26) + '" r="34" fill="' + (i % 2 ? '#3A2A3A' : '#4A2E3E') + '" stroke="none"/>';
    for (var j = 0; j < 30; j++) s += '<circle cx="' + (j * 47 % 400) + '" cy="' + (20 + j * 29 % 110) + '" r="3" fill="#D88898" stroke="none" opacity=".7"/>';
    s += '<circle cx="190" cy="170" r="120" fill="url(#htHaoX)" stroke="none" class="hq-hao"/>';
    s += '<path d="M0,240 Q160,200 400,170" fill="none" stroke="#2A1E1A" stroke-width="24"/><path d="M250,206 q20,-30 60,-44" fill="none" stroke="#2A1E1A" stroke-width="9"/>';
    s += '<g class="ht-troi">' + A.vong(170, 220, 1.2, { mat: true }) + '</g>';
    s += H.chim({ x: 300, y: 172, s: 1.6, flip: true, kieu: 'hot', ma: true, tre: 0 });
    for (var k = 0; k < 6; k++) s += '<ellipse class="ht-canhroi" style="animation-delay:-' + (k * 1.3) + 's" cx="' + (60 + k * 58) + '" cy="' + (40 + (k % 3) * 20) + '" rx="3" ry="2" fill="#F0B8C4" stroke="none"/>';
    return wrap(s, '#0A1A1E');
  };

  // khung cửi đang hát: nhà dệt tối, sợi chỉ đỏ rực, mặt người hiện trong khổ vải
  C.khung_cui = function () {
    var s = '<rect width="400" height="300" fill="#1A100C" stroke="none"/><ellipse cx="200" cy="150" rx="190" ry="130" fill="#3A2218" stroke="none"/>';
    s += '<path d="M0,250 H400 V300 H0 Z" fill="#24160F" stroke="none"/>';
    for (var i = 0; i < 6; i++) s += '<path class="ht-soibay" style="animation-delay:-' + (i * .9) + 's" d="M' + (40 + i * 64) + ',' + (40 + (i % 2) * 30) + ' q20,30 -6,60 q-20,30 8,60" fill="none" stroke="#C8302A" stroke-width="1.6" opacity=".6"/>';
    s += '<g transform="translate(200,176) scale(2.1) translate(-200,-212)">' + H.khungCui(200, 260, { mau: true, ma: true }) + '</g>';
    return wrap(s, '#1A100C');
  };
  // khung cửi trong đống lửa giữa sân, hát lần cuối
  C.khung_chay = function () {
    var s = '<rect width="400" height="300" fill="#140A08" stroke="none"/><circle cx="200" cy="190" r="170" fill="#5A1A08" opacity=".55" stroke="none"/>';
    s += '<g transform="translate(200,178) scale(1.9) translate(-200,-212)">' + H.khungCui(200, 260, { vai: '#6A4A3A', ma: true }) + '</g>';
    s += '<path d="M60,300 L120,246 L200,262 L284,244 L346,300 Z" fill="#3A2418"/><path d="M110,256 l60,-20 M220,258 l70,-14 M150,270 l80,10" stroke="#5A3A2A" stroke-width="8"/>';
    [[110, 1], [160, 1.3], [210, 1.1], [258, 1.4], [300, .9], [190, .8]].forEach(function (l, i) {
      s += '<g class="ht-lua" style="animation-delay:-' + (i * .17).toFixed(2) + 's;transform-origin:' + l[0] + 'px 280px"><path d="M' + (l[0] - 30 * l[1]) + ',282 q8,-' + (70 * l[1]) + ' 22,-' + (40 * l[1]) + ' q8,-' + (60 * l[1]) + ' 18,-' + (90 * l[1]) + ' q10,' + (40 * l[1]) + ' 20,' + (60 * l[1]) + ' q10,' + (20 * l[1]) + ' 4,' + (70 * l[1]) + ' z" fill="#F08A1A" stroke="none" opacity=".9"/>' +
        '<path d="M' + (l[0] - 14 * l[1]) + ',282 q6,-' + (40 * l[1]) + ' 14,-' + (30 * l[1]) + ' q6,-' + (30 * l[1]) + ' 12,-' + (46 * l[1]) + ' q6,' + (30 * l[1]) + ' 4,' + (76 * l[1]) + ' z" fill="#FFE070" stroke="none"/></g>';
    });
    for (var k = 0; k < 12; k++) s += '<circle class="ht-tan" style="animation-delay:-' + (k * .37).toFixed(2) + 's" cx="' + (80 + k * 22) + '" cy="250" r="' + (1.4 + k % 3) + '" fill="#FFB040" stroke="none"/>';
    return wrap(s, '#140A08');
  };

  // cây thị một quả ở bìa rừng: đêm, quả vàng sáng như đèn lồng, chỗ lính đổ tro dưới gốc
  C.cay_thi = function () {
    var V = G.ve, r = rng(44), s = '<rect width="400" height="300" fill="#121C16" stroke="none"/>';
    for (var i = 0; i < 8; i++) s += '<circle cx="' + (i * 56) + '" cy="' + (190 + (i % 3) * 14) + '" r="56" fill="#18261C" stroke="none"/>';
    s += '<path d="M0,250 Q200,236 400,252 V300 H0 Z" fill="#1E2A1C" stroke="none"/>';
    // tro đổ dưới gốc, bát hương
    s += '<path d="M40,262 q40,-26 90,-6 q30,10 60,6 l6,20 H34 Z" fill="#6A6460"/><g fill="#9A948C" stroke="none">' + [52, 70, 88, 110, 140, 160].map(function (x, k) { return '<circle cx="' + x + '" cy="' + (262 - (k % 3) * 4) + '" r="1.6"/>'; }).join('') + '</g>';
    s += '<path d="M180,270 h26 q-2,12 -13,12 q-11,0 -13,-12 z" fill="#7A6A5A" stroke-width="2"/><path d="M188,270 v-14 M193,270 v-10 M198,270 v-16" stroke="#5A2A1E" stroke-width="1.6"/>';
    // thân thị cổ thụ, hốc cây, dải vải đỏ
    s += '<path d="M60,300 Q80,220 120,190 Q150,160 170,90 L206,92 Q196,170 160,220 Q140,260 150,300 Z" fill="#4A3A2A"/><path d="M150,300 Q140,250 168,212 Q196,170 206,92 L194,92 Q186,170 150,222 Q126,262 132,300 Z" fill="#2E241A" stroke="none" opacity=".7"/>';
    s += '<path d="M90,280 q10,-30 30,-50 M140,200 q14,-30 30,-70" fill="none" stroke="#2E2418" stroke-width="2.4"/><ellipse cx="140" cy="226" rx="9" ry="15" fill="#140E0A" transform="rotate(30 140 226)"/>';
    s += '<path d="M104,236 Q130,224 158,232" fill="none" stroke="#B8241A" stroke-width="7"/><path d="M154,232 l6,26 l6,-3 M156,232 l14,18" fill="none" stroke="#B8241A" stroke-width="4"/>';
    // cành chìa ra ôm lấy quả
    s += '<path d="M190,110 Q240,120 300,100" fill="none" stroke="' + INK + '" stroke-width="14"/><path d="M190,110 Q240,120 300,100" fill="none" stroke="#4A3A2A" stroke-width="9"/>';
    s += '<g class="ht-xla" style="transform-origin:200px 0px">' + V.tan(130, 50, 140, 62, r, V.LA.dam, { n: 16 }) + V.tan(320, 60, 100, 52, r, V.LA.dam, { n: 12 }) + '</g>';
    s += '<circle cx="250" cy="170" r="110" fill="url(#htHaoV)" stroke="none" opacity=".35"/>';
    s += H.quaThi(250, 168, 1.9, { canh: false, tre: 0 });
    s += '<path d="M250,88 Q250,104 250,128" fill="none" stroke="#4A3A2A" stroke-width="5"/>';
    for (var k = 0; k < 7; k++) s += '<circle class="ht-dom" style="animation-delay:-' + (k * .8).toFixed(1) + 's;--mx:' + (k % 2 ? 12 : -10) + 'px" cx="' + (40 + k * 50) + '" cy="' + (200 + (k % 3) * 18) + '" r="2" fill="#E8F2A0" stroke="none"/>';
    return wrap(s, '#121C16');
  };
  // quả thị rụng vào bị bà cụ: cả bìa rừng sáng lên một thoáng
  C.qua_thi = function () {
    var s = '<rect width="400" height="300" fill="#2A2018" stroke="none"/>';
    s += '<g class="hq-tia" style="transform-origin:200px 150px">';
    for (var i = 0; i < 12; i++) s += '<path d="M200,150 L' + f(200 + Math.cos(i / 12 * Math.PI * 2) * 260) + ',' + f(150 + Math.sin(i / 12 * Math.PI * 2) * 260) + ' L' + f(200 + Math.cos((i + .35) / 12 * Math.PI * 2) * 260) + ',' + f(150 + Math.sin((i + .35) / 12 * Math.PI * 2) * 260) + ' Z" fill="#FFE8A0" opacity=".12" stroke="none"/>';
    s += '</g><circle class="hq-buc" cx="200" cy="150" r="150" fill="url(#htHaoV)" stroke="none"/>';
    // cái bị cói mở miệng, dây rút
    s += '<path d="M90,170 Q86,286 200,290 Q314,286 310,170 Q200,196 90,170 Z" fill="#9A7A4A"/>';
    var dan = ''; for (var k = 0; k < 9; k++) dan += 'M' + (100 + k * 25) + ',' + (178 + Math.abs(k - 4) * -1) + ' q-4,50 6,104 ';
    s += '<path d="' + dan + '" fill="none" stroke="#7A5A30" stroke-width="2"/><path d="M96,206 Q200,230 304,206 M100,246 Q200,268 300,246" fill="none" stroke="#7A5A30" stroke-width="2"/>';
    s += '<path d="M90,170 Q200,150 310,170 Q200,196 90,170 Z" fill="#3A2A18"/><path d="M90,170 Q200,150 310,170" fill="none" stroke="#C8A86A" stroke-width="4"/>';
    s += H.quaThi(200, 150, 2.6, { canh: false, tre: 0 });
    s += '<path d="M90,170 Q200,196 310,170" fill="none" stroke="#9A7A4A" stroke-width="10"/><path d="M90,170 Q200,196 310,170" fill="none" stroke="' + INK + '" stroke-width="3"/>';
    s += '<path d="M300,172 q30,10 40,40 M100,172 q-30,10 -34,44" fill="none" stroke="#6A4A2A" stroke-width="4"/>';
    return wrap(s, '#2A2018');
  };
  // quả thị trong chĩnh sành, miếng trầu cánh phượng trên nắp: trong chĩnh gõ ba cái
  C.thi_go = function () {
    var s = '<rect width="400" height="300" fill="#1A1210" stroke="none"/><circle cx="200" cy="170" r="150" fill="#3A2818" opacity=".6" stroke="none"/>';
    s += '<ellipse cx="200" cy="278" rx="120" ry="14" fill="#000" opacity=".4" stroke="none"/>';
    s += '<path d="M126,120 Q90,170 104,230 Q122,282 200,284 Q278,282 296,230 Q310,170 274,120 Z" fill="#6A4A30"/><path d="M250,124 Q296,170 284,232 Q270,272 226,280 Q280,230 250,124 Z" fill="#3A2818" stroke="none" opacity=".7"/>';
    s += '<path d="M120,160 Q200,176 282,160 M110,206 Q200,224 292,206" fill="none" stroke="#4A3020" stroke-width="2.4"/><path d="M134,140 q-20,40 -12,90" fill="none" stroke="#B88A60" stroke-width="5" opacity=".45"/>';
    s += '<ellipse class="hq-ro" cx="200" cy="112" rx="120" ry="44" fill="url(#htHaoV)" stroke="none"/>';
    s += '<path class="hq-ro" d="M128,118 Q200,134 272,118" fill="none" stroke="#FFE070" stroke-width="6"/>';
    s += '<g class="hq-go" style="transform-origin:200px 116px"><ellipse cx="200" cy="112" rx="78" ry="16" fill="#5A3A24"/><ellipse cx="200" cy="106" rx="60" ry="10" fill="#7A5A3A"/><path d="M190,100 q10,-14 20,0" fill="#5A3A24"/>';
    s += '<g transform="translate(206,92) rotate(-8)"><path d="M-30,6 Q-10,-24 26,-6 Q6,12 -30,6 Z" fill="#4E8A3A"/><path d="M-24,4 Q0,-8 22,-6" fill="none" stroke="#2E5A22" stroke-width="2"/>' +
      '<path d="M-6,-6 q8,-20 22,-18 q-4,8 -12,12 q10,-4 16,0 q-8,8 -22,8 z" fill="#C8302A" stroke-width="2"/><path d="M-30,6 l-6,6" stroke="#C8B060" stroke-width="3"/></g></g>';
    [[118, 96], [282, 96], [200, 60]].forEach(function (p, i) { s += '<path class="hq-cot c' + (i + 1) + '" d="M' + p[0] + ',' + p[1] + ' m-8,0 q8,-10 16,0 M' + (p[0] - 14) + ',' + (p[1] - 6) + ' q14,-16 28,0" fill="none" stroke="#FFE070" stroke-width="2.6"/>'; });
    return wrap(s, '#1A1210');
  };
  // vỏ quả thị nở ra như búp sen, một người con gái bước ra từ vầng sáng
  C.thi_mo = function () {
    var s = '<rect width="400" height="300" fill="#2A1E16" stroke="none"/>';
    s += '<rect x="250" y="20" width="110" height="230" fill="#E8C890" opacity=".35" stroke="none"/><path d="M250,20 h110 v230 h-110 z" fill="none" stroke="#5A3A24" stroke-width="10"/>';
    s += '<path d="M0,250 H400 V300 H0 Z" fill="#4A3424" stroke="none"/><path d="M60,250 h220 l-10,18 h-200 z" fill="#6A4A30"/>';
    s += '<path class="hq-cot2" d="M200,248 L150,0 L250,0 Z" fill="url(#htTia)" stroke="none"/>';
    s += '<circle class="hq-hao" cx="200" cy="232" r="80" fill="url(#htHaoV)" stroke="none"/>';
    // vỏ quả nở bốn cánh
    s += '<path d="M200,250 Q150,250 140,218 Q170,222 200,246 Z" fill="#E09A2A"/><path d="M200,250 Q250,250 260,218 Q230,222 200,246 Z" fill="#E09A2A"/>';
    s += '<path d="M200,250 Q168,236 174,206 Q194,222 200,246 Z" fill="#F4C23C"/><path d="M200,250 Q232,236 226,206 Q206,222 200,246 Z" fill="#F4C23C"/>';
    s += '<path d="M188,250 q12,-8 24,0" fill="#6A7A3A"/>';
    var tam = nguoi(G.LOOKS && (G.LOOKS.tamHau || G.LOOKS.tam), { view: 'front', tu: 'dung', x: 200, y: 238, k: .92, them: { eyes: 'big', mouth: null } });
    if (!tam) tam = '<g fill="#F4E4C0" stroke="none"><circle cx="200" cy="120" r="24"/><path d="M178,146 Q200,138 222,146 L230,236 Q200,244 170,236 Z"/></g>';
    s += '<g class="hq-ra"><g opacity=".92">' + tam + '</g></g>';
    for (var k = 0; k < 8; k++) s += '<circle class="hq-dom" style="--mx:' + (k % 2 ? 14 : -12) + 'px;animation-delay:-' + (k * .6).toFixed(1) + 's" cx="' + (160 + k * 11) + '" cy="' + (230 - (k % 3) * 12) + '" r="2" fill="#FFF2B8" stroke="none"/>';
    return wrap(s, '#2A1E16');
  };

  // =====================================================================================
  // TRANH PHIM (G.cut.ve): nền chương 1, 2, 4 và cảnh quả thị giả
  // =====================================================================================
  if (G.cut && G.cut.ve) {
    var CV = G.cut.ve;
    var khung = function (inner, bg, style) {
      return '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><style>' + (style || '') + '</style><rect width="960" height="540" fill="' + bg + '"/>' +
        '<g class="cam"><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g></g></svg>';
    };
    var trang = function (x, y, r, mau) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r * 1.8) + '" fill="' + (mau || '#E8D8A8') + '" opacity=".18" stroke="none"/><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (mau || '#E8D8A8') + '" stroke="none"/>'; };
    var motifCu = CV.motif;
    CV.motif = function (b) {
      var s;
      if (b === 1) { // vàng anh bay qua trăng, quầng đỏ
        s = trang(700, 190, 70, '#3A3428');
        s += '<g class="ht-baylg">' + H.chim({ x: 470, y: 260, s: 2.6, kieu: 'bay', ma: true, tre: 0 }) + '</g>';
        return khung(s, '#0A0808');
      }
      if (b === 2) { // cành xoan, chùm hoa tím, hoa rơi
        var r = rng(7);
        s = '<g class="ht-xcanh" style="transform-origin:200px 540px;animation-duration:6s"><path d="M200,540 Q300,300 520,180 Q640,120 760,140" fill="none" stroke="#4A3A30" stroke-width="18"/><path d="M520,180 q40,-60 30,-110 M640,128 q30,40 80,50" fill="none" stroke="#4A3A30" stroke-width="8"/>';
        [[520, 180], [600, 150], [680, 140], [430, 240], [560, 210], [560, 80], [720, 176]].forEach(function (p) {
          for (var q = 0; q < 9; q++) s += '<circle cx="' + f(p[0] + (r() - .5) * 30) + '" cy="' + f(p[1] + (r() - .3) * 26) + '" r="' + f(4 + r() * 3) + '" fill="' + ['#B49AD8', '#C8B4E8', '#A88AD0'][q % 3] + '" stroke="none" opacity=".85"/>';
        });
        s += '</g>';
        for (var k = 0; k < 14; k++) s += '<circle class="ht-xroi" style="--dx:' + f(-60 + r() * 80) + 'px;--dy:' + f(260 + r() * 140) + 'px;animation-duration:' + f(5 + r() * 4) + 's;animation-delay:-' + f(r() * 8) + 's" cx="' + f(380 + r() * 420) + '" cy="' + f(120 + r() * 120) + '" r="4" fill="#C8B4E8" stroke="none"/>';
        return khung(s, '#0A0808');
      }
      if (b === 4) { // quả thị treo, sáng như đèn lồng
        s = '<circle cx="480" cy="250" r="160" fill="url(#htHaoV)" stroke="none" opacity=".25"/>' + H.quaThi(480, 260, 2.4, { tre: 0 });
        return khung(s, '#0A0808');
      }
      return motifCu(b);
    };
    CV.quaThi = function (b) { // quả thị rụng vào bị; buoc 2: bổ ra là đầu chim vàng anh, mắt còn mở
      var s = '<rect width="960" height="540" fill="#0E1810" stroke="none"/>';
      for (var i = 0; i < 9; i++) s += '<circle cx="' + (200 + i * 70) + '" cy="' + (90 + (i % 3) * 30) + '" r="80" fill="#1E3020" stroke="none"/>';
      if (b < 2) {
        s += '<g class="roi">' + H.quaThi(480, 160, 2, { canh: false, tre: 0 }) + '</g>';
        s += '<path d="M400,420 q80,60 160,0 l-20,90 h-120 z" fill="#7A5A3A"/><path d="M400,420 q80,24 160,0" fill="none" stroke="#3A2A18" stroke-width="8"/>';
        return khung(s, '#0E1810', '.roi{animation:roi1 1.2s cubic-bezier(.5,0,.9,.4) forwards}@keyframes roi1{to{transform:translateY(270px)}}');
      }
      s += '<path d="M330,280 Q330,140 480,134 Q630,140 630,280 Z" fill="#E0A23A"/><path d="M560,150 Q630,200 622,276 L600,276 Q606,210 560,150 Z" fill="#B8762A" stroke="none" opacity=".7"/>';
      s += '<path d="M352,280 Q480,252 608,280 Z" fill="#F4E2A0"/><path d="M370,286 Q480,262 590,286" fill="#3A2A1A"/>';
      s += '<path d="M470,134 q-6,-30 10,-50" fill="none" stroke="#6A4A2A" stroke-width="7"/>';
      s += H.dauChim(470, 290, 1.4);
      s += '<path d="M400,300 q-4,40 6,80 M560,300 q6,30 -2,64" stroke="#7A0A06" stroke-width="6" fill="none"/>';
      return khung(s, '#0E1810');
    };
  }
})();
