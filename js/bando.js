// Bản đồ nhỏ góc màn hình, bản đồ lớn (phím M) và bí pháp độn thổ: đi nhanh tới nơi đã đặt chân, trong cùng một vùng đất.
var G = window.G || (window.G = {});
G.dun = {};

(function () {
  var D = G.dun, $ = G.$, W = G.world, INK = G.INK;

  // vùng đất: độn thổ chỉ đi trong một vùng; về làng phải đi xe bò
  var VUNG = { lang_duong: 'lang', nha_dighe: 'lang', vuon_cau: 'lang',
    hang_nuoc: 'thanh', cung_san: 'thanh', cung_vuon: 'thanh', cung_gieng: 'thanh', cung_bep: 'thanh', cung_hau: 'thanh', nha_det: 'thanh', cho_am: 'thanh', bia_rung: 'thanh', nha_bacu: 'thanh' };
  // chỗ đứng khi độn thổ tới (tự dịch ra chỗ trống nếu vướng)
  var DIEM = { lang_duong: [480, 500], nha_dighe: [600, 540], vuon_cau: [300, 520], hang_nuoc: [640, 520], cung_san: [480, 580], cung_vuon: [480, 560], cung_gieng: [480, 470],
    cung_bep: [460, 500], cung_hau: [500, 500], nha_det: [480, 510], cho_am: [480, 500], bia_rung: [800, 500], nha_bacu: [460, 480] };
  // toạ độ trên bản đồ lớn (khung 720x340) và các lối nối
  var NUT = { lang_duong: [70, 282], nha_dighe: [170, 282], vuon_cau: [270, 282],
    bia_rung: [330, 116], cho_am: [420, 116], hang_nuoc: [510, 116], nha_bacu: [510, 48], cung_san: [600, 116], cung_hau: [600, 48], cung_bep: [600, 196], cung_vuon: [690, 116], cung_gieng: [690, 196], nha_det: [690, 270] };
  var NGAN = { hang_nuoc: 'Hàng nước', cung_hau: 'Cung hậu', bia_rung: 'Bìa rừng', cho_am: 'Đường rừng', nha_dighe: 'Nhà dì ghẻ' };
  var NOI = [['lang_duong', 'nha_dighe'], ['nha_dighe', 'vuon_cau'], ['bia_rung', 'cho_am'], ['cho_am', 'hang_nuoc'], ['hang_nuoc', 'nha_bacu'], ['hang_nuoc', 'cung_san'], ['cung_san', 'cung_hau'], ['cung_san', 'cung_bep'],
    ['cung_san', 'cung_vuon'], ['cung_vuon', 'cung_gieng'], ['cung_gieng', 'nha_det']];
  var NEN = { lang_duong: '#8FA35C', nha_dighe: '#C98A6C', vuon_cau: '#7E8E58', hang_nuoc: '#97A867', cung_san: '#A8A898', cung_vuon: '#8FA060', cung_gieng: '#A8A898',
    cung_bep: '#8B6A4A', cung_hau: '#8B6A4A', nha_det: '#8B6A4A', nha_bacu: '#9A7A54', cho_am: '#6E8250', bia_rung: '#566C42' };

  // biểu tượng vẽ tay cho từng nơi, khung 40x40 quanh gốc (0,0)
  var IC = {
    lang_duong: '<path d="M-17,-5 q17,-9 34,0 l-3,4 h-28 z" fill="#8A4A32"/><path d="M-17,-5 q-3,-4 0,-7M17,-5 q3,-4 0,-7" fill="none" stroke-width="1.6"/><rect x="-12" y="-1" width="5" height="14" fill="#E2D8C0"/><rect x="7" y="-1" width="5" height="14" fill="#E2D8C0"/><rect x="-7" y="1" width="14" height="5" fill="#8A2418"/><path d="M-5,3.5 h10" stroke="#E8C05A" stroke-width="1.2"/>',
    nha_dighe: '<path d="M-16,0 L0,-13 L16,0 Z" fill="#C9A35E"/><path d="M-6,-8 l3,4M2,-10 l3,5M8,-6 l2,4" stroke="#8E6A30" stroke-width="1"/><rect x="-12" y="0" width="24" height="12" fill="#B98C5E"/><rect x="-3" y="3" width="6" height="9" fill="#5A3A2A"/><rect x="-10" y="3" width="5" height="4" fill="#E8A848"/>',
    vuon_cau: '<path d="M-1,14 L0,-9 L1.6,14 Z" fill="#A49A82"/><path d="M0,-9 q-8,-2 -14,4M0,-9 q-6,-6 -10,-12M0,-9 q2,-8 1,-14M0,-9 q7,-5 12,-10M0,-9 q8,-1 14,5" fill="none" stroke="#5E8A3A" stroke-width="2.6"/><circle cx="-2" cy="-6" r="1.8" fill="#D9A93A" stroke-width=".8"/><circle cx="2" cy="-5" r="1.8" fill="#8AB84A" stroke-width=".8"/><path d="M-9,14 q4,-6 8,-2M3,14 q4,-6 8,-2" fill="none" stroke="#6E8A40" stroke-width="1.4"/>',
    bia_rung: '<path d="M-2,14 L-1,-2 L2,-2 L3,14 Z" fill="#5A4A3A"/><circle cx="-6" cy="-6" r="8" fill="#3E5A2A"/><circle cx="6" cy="-7" r="8" fill="#4E6A30"/><circle cx="0" cy="-12" r="8" fill="#55763A"/><circle cx="5" cy="-6" r="7" fill="url(#bdSang)" stroke="none"/><circle cx="5" cy="-6" r="3.4" fill="#E8B83A" stroke-width="1.1"/><path d="M5,-9.4 v-2" stroke-width="1"/>',
    cho_am: '<path d="M-10,14 v-10M9,14 v-12" stroke="#3A2E24" stroke-width="2.4"/><path d="M-10,-2 l-7,8 h14 z M-10,-8 l-5,7 h10 z" fill="#2E4A26"/><path d="M9,0 l-7,8 h14 z M9,-7 l-5,8 h10 z" fill="#2E4A26"/><circle cx="0" cy="-4" r="9" fill="url(#bdMa)" stroke="none"/><rect x="-3" y="-8" width="6" height="8" rx="2.4" fill="#8FD0D8" stroke-width="1"/><path d="M0,-8 v-4" stroke-width="1"/>',
    hang_nuoc: '<path d="M-17,-2 L-4,-12 L4,-12 L17,-2 Z" fill="#C9A35E"/><path d="M-13,-2 v14M13,-2 v14" stroke="#9A7A44" stroke-width="2.2"/><rect x="-11" y="5" width="22" height="4" fill="#C8A462"/><path d="M-6,5 q-2,-6 3,-7 h3 q4,1 3,7 z" fill="#5A3A2A"/><path d="M3,5 h4 l-.6,-3 h-2.8 z M8,5 h4 l-.6,-3 h-2.8 z" fill="#E9E2D0" stroke-width=".8"/>',
    nha_bacu: '<path d="M-13,1 L0,-10 L13,1 Z" fill="#B8924E"/><rect x="-10" y="1" width="20" height="11" fill="#A07A50"/><rect x="-3" y="4" width="6" height="8" fill="#4A2E1C"/><path d="M7,-8 v-6 h4 v8" fill="#7A5A3A" stroke-width="1"/><path d="M9,-15 q-4,-4 0,-8 q4,-3 0,-7" fill="none" stroke="#B8B0A0" stroke-width="1.6"/>',
    cung_san: '<rect x="-14" y="0" width="28" height="11" fill="#A8322A"/><path d="M-10,2 v8M-4,2 v8M4,2 v8M10,2 v8" stroke="#D9A93A" stroke-width="1"/><path d="M-19,1 q2,-3 5,-3 L-10,-9 H10 L14,-2 q3,0 5,3 z" fill="#C9963A"/><path d="M-10,-9 H10" stroke-width="2.4"/><path d="M-1,-9 q1,-5 2,0" fill="#D9A93A" stroke-width="1"/><rect x="-14" y="11" width="28" height="3" fill="#B8B0A0"/>',
    cung_hau: '<rect x="-11" y="1" width="22" height="11" fill="#8A2418"/><path d="M-16,2 q2,-3 4,-3 L-8,-7 H8 L12,-1 q2,0 4,3 z" fill="#C9963A"/><circle cx="0" cy="6" r="3.6" fill="#D8D8C8" stroke="#B8862E" stroke-width="1.4"/><path d="M-7,-12 q2,-5 4,0 q2,-5 4,0 q2,-5 4,0" fill="#E89AA6" stroke-width="1"/>',
    cung_bep: '<rect x="-14" y="0" width="28" height="12" fill="#8A6A56"/><path d="M-8,12 v-6 q4,-3 8,0 v6" fill="#1A0E0A"/><ellipse cx="-4" cy="9" rx="3" ry="1.4" fill="#E8701A" stroke="none"/><ellipse cx="4" cy="-1" rx="8" ry="3" fill="#3A3640"/><path d="M-1,-5 q-3,-5 1,-9M5,-5 q-3,-6 1,-10" fill="none" stroke="#D8D0C0" stroke-width="1.6"/>',
    cung_vuon: '<ellipse cx="0" cy="6" rx="16" ry="7" fill="#6F9C9A"/><path d="M-12,6 q6,-3 12,0" fill="none" stroke="#C8E4DE" stroke-width="1"/><ellipse cx="-7" cy="8" rx="6" ry="3" fill="#5E8E44" stroke-width=".9"/><path d="M0,-12 v14" stroke="#4E7A3A" stroke-width="1.6"/><path d="M0,-6 q-8,-4 -4,-12 q3,4 4,6 q1,-2 4,-6 q4,8 -4,12 z" fill="#E89AA6" stroke-width="1"/><path d="M0,-8 q-2,-5 0,-9 q2,4 0,9" fill="#F6C6CC" stroke-width=".8"/>',
    cung_gieng: '<ellipse cx="0" cy="6" rx="13" ry="6" fill="#9A9488"/><ellipse cx="0" cy="5" rx="9" ry="3.6" fill="#1E3436"/><path d="M-5,4 h5" stroke="#BFE0E0" stroke-width="1" opacity=".7"/><path d="M-12,5 v-17 M12,5 v-17 M-14,-12 h28" stroke="#6A4A30" stroke-width="2.2"/><path d="M0,-12 v8" stroke-width="1"/><path d="M-3,-4 h6 l-1,5 h-4 z" fill="#8A6440" stroke-width="1"/>',
    nha_det: '<rect x="-13" y="-12" width="3" height="24" fill="#8A5A36"/><rect x="10" y="-12" width="3" height="24" fill="#8A5A36"/><path d="M-15,-12 h30" stroke="#5E3A22" stroke-width="2.4"/><path d="M-8,-10 v8M-5,-10 v8M-2,-10 v8M1,-10 v8M4,-10 v8M7,-10 v8" stroke="#E6DABA" stroke-width=".8"/><rect x="-9" y="-2" width="18" height="7" fill="#E9DDB0" stroke-width="1"/><path d="M-6,1.5 l2,-2 l2,2 l-2,2 z M2,1.5 l2,-2 l2,2 l-2,2 z" fill="none" stroke="#B8483A" stroke-width=".9"/><path d="M-10,9 h20" stroke="#5E3A22" stroke-width="2.4"/>'
  };
  function huyHieu(id, p, m, laCur, viec) { // huy hiệu tròn: viền mực, nền giấy, hình vẽ nơi đó; chưa đến thì mờ và có dấu ?
    var x = p[0], y = p[1], h = '<g transform="translate(' + x + ',' + y + ')">';
    h += '<circle class="bd-bong" cx="1.5" cy="3" r="21" fill="#2B1F1A" opacity=".25" stroke="none"/>';
    h += '<circle class="bd-dia" r="20"/>';
    h += '<circle r="16.5" fill="none" stroke="' + (laCur ? '#F2D080' : '#B89A6A') + '" stroke-width="1.2" stroke-dasharray="' + (m === 1 ? '3 3' : 'none') + '"/>';
    h += '<g class="bd-hinh" stroke="' + INK + '" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"' + (m === 1 ? ' opacity=".28"' : '') + '>' + (IC[id] || '') + '</g>';
    if (m === 1) h += '<text y="6" text-anchor="middle" class="bd-hoi">?</text>';
    if (laCur) h += '<g class="bd-dang"><path d="M-6,-30 h12 l-6,8 z" fill="#C8301E" stroke="#FFF6E0" stroke-width="1.6"/></g>';
    if (viec) h += '<g transform="translate(15,-15)"><circle r="8" fill="#E2B44C" stroke="' + INK + '" stroke-width="2"/><text y="4.5" text-anchor="middle" class="bd-viec">!</text></g>';
    return h + '</g>';
  }
  // nền bản đồ: giấy dó, núi mực, sông, rặng tre, mây, la bàn
  function nenBanDo() {
    var h = '<defs><pattern id="bdGiay" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#EADFC2"/><circle cx="8" cy="10" r="1.2" fill="#D2C29A"/><circle cx="38" cy="40" r="1.5" fill="#D2C29A"/><path d="M20,28 q8,-2 14,3M44,12 q6,2 10,-1" stroke="#DCCDA6" stroke-width="1" fill="none"/></pattern>' +
      '<radialGradient id="bdSang"><stop offset="0" stop-color="#FFE08A" stop-opacity=".9"/><stop offset="1" stop-color="#FFE08A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bdMa"><stop offset="0" stop-color="#9FE8F0" stop-opacity=".8"/><stop offset="1" stop-color="#9FE8F0" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="bdVien" cx=".5" cy=".5" r=".7"><stop offset=".7" stop-color="#8A6A3A" stop-opacity="0"/><stop offset="1" stop-color="#8A6A3A" stop-opacity=".35"/></radialGradient>' +
      '<filter id="bdRun"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="2.5"/></filter></defs>';
    h += '<rect x="2" y="2" width="756" height="346" rx="10" fill="url(#bdGiay)"/><rect x="2" y="2" width="756" height="346" rx="10" fill="url(#bdVien)"/>';
    h += '<g filter="url(#bdRun)" stroke="' + INK + '" stroke-linejoin="round" stroke-linecap="round">';
    // núi mực phía tây bắc
    h += '<path d="M14,150 L48,92 L70,118 L98,66 L132,122 L150,104 L182,150" fill="#C8BC9C" stroke-width="2"/><path d="M48,92 l6,18 l-8,12M98,66 l8,26 l-10,14 l6,14M150,104 l4,14" fill="none" stroke-width="1.2" opacity=".6"/>';
    h += '<path d="M120,172 L150,138 L176,162 L200,130 L236,176" fill="#D4C8A8" stroke-width="1.6"/>';
    // sông uốn từ bắc xuống nam, chia làng và thành
    h += '<path d="M250,4 Q236,70 270,120 Q300,170 262,214 Q228,256 268,300 Q290,326 280,348" fill="none" stroke="#8DB4B0" stroke-width="12" opacity=".75"/><path d="M250,4 Q236,70 270,120 Q300,170 262,214 Q228,256 268,300 Q290,326 280,348" fill="none" stroke="#B8D4CC" stroke-width="3" opacity=".9"/>';
    h += '<path d="M258,60 q6,-3 10,0M272,150 q6,-3 10,0M252,250 q6,-3 10,0" fill="none" stroke="#5E8A8A" stroke-width="1.2"/>';
    // rặng tre quanh làng
    [[30, 318], [44, 312], [312, 314], [326, 320]].forEach(function (q) { h += '<path d="M' + q[0] + ',' + q[1] + ' q-2,-14 1,-26M' + (q[0] + 4) + ',' + q[1] + ' q2,-12 6,-22" fill="none" stroke="#5E7A3A" stroke-width="2"/><path d="M' + (q[0] - 4) + ',' + (q[1] - 22) + ' l6,-4 l2,6 M' + (q[0] + 6) + ',' + (q[1] - 18) + ' l6,-3 l0,6" fill="#7E9A4A" stroke-width="1"/>'; });
    // tường thành răng cưa bao kinh thành
    var tuong = 'M560,4'; for (var tx = 560; tx < 746; tx += 12) tuong += ' h6 v6 h6 v-6'; h += '<path d="' + tuong + '" fill="none" stroke="#9A6A52" stroke-width="2.4"/>';
    // mây cuộn
    [[420, 300], [140, 40], [690, 296]].forEach(function (c) { h += '<path d="M' + c[0] + ',' + c[1] + ' q8,-10 18,-2 q8,-10 18,0 q10,-2 8,8 h-40 q-6,-4 -4,-6 z" fill="#F4ECD8" stroke-width="1.4"/><path d="M' + (c[0] + 10) + ',' + (c[1] - 2) + ' q4,-4 8,0" fill="none" stroke-width="1"/>'; });
    h += '</g>';
    // la bàn
    h += '<g transform="translate(724,46)" stroke="' + INK + '" stroke-width="1.4"><circle r="20" fill="#F4ECD8"/><circle r="15" fill="none" stroke="#B89A6A"/><path d="M0,-18 L4,0 L0,18 L-4,0 Z" fill="#C8301E"/><path d="M0,0 L4,0 L0,18 Z" fill="#2B1F1A"/><path d="M-18,0 L0,-3 L18,0 L0,3 Z" fill="#E2D8C0"/><text y="-23" text-anchor="middle" class="bd-bac">B</text></g>';
    return h;
  }
  function S() { return G.S; }
  function daDen(id) { var s = S(); return !!(s && s.daDen && s.daDen[id]); }
  D.biet = function () { var s = S(); return !!(s && s.items && s.items.don_tho); };

  // ghi lại nơi đã đặt chân
  var enter0 = W.enter;
  W.enter = function (loc) {
    enter0.apply(this, arguments);
    var s = S();
    if (s && !s.daDen) s.daDen = daDenTheoChuong(s);
    if (s && loc.indexOf('ky_') !== 0) s.daDen[loc] = true;
    veNen();
  };

  // bản lưu cũ chưa ghi nơi đã đến: suy ra từ chương đang chơi (những nơi truyện chắc chắn đã đi qua)
  function daDenTheoChuong(s) {
    var i = (G.CH_ORDER || []).indexOf(s.chapter), r = {};
    var them = function (ds) { ds.forEach(function (id) { r[id] = true; }); };
    if (i >= 1) them(['lang_duong', 'nha_dighe', 'vuon_cau', 'hang_nuoc', 'cung_san', 'cung_vuon', 'cung_gieng', 'cung_bep', 'cung_hau']);
    if (i >= 4) them(['nha_det']);
    if (i >= 5) them(['cho_am', 'bia_rung', 'nha_bacu']);
    return r;
  }
  // ---------- bản đồ nhỏ ----------
  // bản đồ là một món đồ nghề: cất trong tráp, lấy ra mới xem được (không che tầm nhìn khi không dùng)
  var mm, mmNen, mmDong, cam = false, nut;
  try { cam = localStorage.getItem('tpcc_mm') === 'cam'; } catch (e) {}
  function taoMini() {
    mm = document.createElement('div'); mm.id = 'minimap'; mm.setAttribute('role', 'button'); mm.setAttribute('tabindex', '0'); mm.setAttribute('aria-label', 'Mở bản đồ lớn');
    mm.innerHTML = '<i class="mm-truc"></i><div class="mm-h"><span class="mm-ten"></span><button class="mm-thu" aria-label="Cất bản đồ (phím M)" title="Cất bản đồ (M)">✕</button></div><svg class="mm-svg" preserveAspectRatio="xMidYMid meet"><g class="mm-nen"></g><g class="mm-dong"></g></svg><div class="mm-goi">Bấm để mở rộng</div><i class="mm-truc"></i>';
    $('hud-right').appendChild(mm);
    mmNen = mm.querySelector('.mm-nen'); mmDong = mm.querySelector('.mm-dong');
    mm.querySelector('.mm-thu').onclick = function (e) { e.stopPropagation(); D.camBanDo(false); };
    mm.onclick = function () { D.moBanDo(); };
    mm.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); D.moBanDo(); } };
    // nút trên thanh đồ nghề
    nut = document.createElement('button'); nut.id = 'btn-bando'; nut.className = 'tool'; nut.setAttribute('aria-label', 'Lấy bản đồ ra / cất đi (phím M)'); nut.setAttribute('aria-pressed', 'false');
    nut.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/></g></svg><span>Bản đồ</span><kbd>M</kbd>';
    nut.onclick = function () { if (G.S && !G.ui.modal) D.camBanDo(!cam); };
    $('tools').appendChild(nut);
  }
  D.camBanDo = function (v) {
    cam = !!v;
    try { localStorage.setItem('tpcc_mm', cam ? 'cam' : 'cat'); } catch (er) {}
    if (G.audio && G.audio.sfx) G.audio.sfx('paper');
    capNhatMini();
  };
  function capNhatMini() {
    var hien = !!(G.S && W.ready && $('title').hidden && $('cine').hidden);
    var dangHien = !mm.hidden;
    mm.hidden = !(hien && cam);
    if (!mm.hidden && !dangHien) { mm.classList.remove('mo'); void mm.offsetWidth; mm.classList.add('mo'); veNen(); veDong(); }
    nut.hidden = !hien || (G.S && G.S.loc.indexOf('ky_') === 0);
    nut.classList.toggle('on', cam); nut.setAttribute('aria-pressed', cam);
  }
  function veNen() {
    if (!mm) return;
    var s = S(); if (!s) return;
    var L = G.LOCATIONS[s.loc], w = L.width, h = L.height, out = '';
    mm.querySelector('.mm-svg').setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    mm.querySelector('.mm-ten').textContent = L.name;
    out += '<rect width="' + w + '" height="' + h + '" fill="' + (NEN[s.loc] || '#7E8E58') + '"/>';
    (W.solids || []).forEach(function (r) {
      var x = Math.max(0, r[0]), y = Math.max(0, r[1]), x2 = Math.min(w, r[0] + r[2]), y2 = Math.min(h, r[1] + r[3]);
      if (x2 - x < 2 || y2 - y < 2 || (x2 - x >= w - 1 && y2 - y >= h - 1)) return;
      out += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x) + '" height="' + (y2 - y) + '" fill="#2B1F1A" opacity=".55"/>';
    });
    ['left', 'right'].forEach(function (d) {
      if (!L.exits[d]) return;
      var x = d === 'left' ? 6 : w - 6, k = d === 'left' ? 1 : -1;
      out += '<path d="M' + x + ',' + (h / 2) + ' l' + (34 * k) + ',-34 v68 z" fill="#F1E7D6" stroke="#2B1F1A" stroke-width="6"/>';
    });
    mmNen.innerHTML = out;
  }
  function veDong() {
    if (!mm) return;
    var s = S(); if (!s || !W.ready) return;
    var out = '', obj = G.story.objective(s) || '';
    (G.story.things(s) || []).forEach(function (t) {
      if (t.door) { out += '<path d="M' + (t.x - 18) + ',' + (t.y + 18) + ' v-24 q18,-20 36,0 v24 z" fill="#8A5A36" stroke="#2B1F1A" stroke-width="5"/><circle cx="' + (t.x + 8) + '" cy="' + (t.y + 6) + '" r="3.5" fill="#E2B44C"/>'; return; }
      if (t.quest) out += '<circle cx="' + t.x + '" cy="' + t.y + '" r="26" fill="#E2B44C" stroke="#2B1F1A" stroke-width="5" class="mm-viec"/><path d="M' + t.x + ',' + (t.y - 13) + ' v13" stroke="#2B1F1A" stroke-width="7" stroke-linecap="round"/><circle cx="' + t.x + '" cy="' + (t.y + 11) + '" r="4" fill="#2B1F1A"/>';
      else out += '<path d="M' + t.x + ',' + (t.y - 15) + ' l15,15 l-15,15 l-15,-15 z" fill="#F1E7D6" stroke="#2B1F1A" stroke-width="5"/>';
    });
    for (var k in W.npcs) {
      var n = W.npcs[k], d = n.def; if (!d.label && !d.follow) continue;
      var viec = d.quest || (d.label && obj.toLowerCase().indexOf(d.label.toLowerCase().split(' ').pop()) >= 0 && obj.indexOf('**') >= 0);
      // người: đầu tròn trên vai, vàng nếu có việc
      out += '<path d="M' + (n.x - 20) + ',' + (n.y + 4) + ' q20,-26 40,0 z" fill="' + (viec ? '#C8962E' : '#5E8E98') + '" stroke="#2B1F1A" stroke-width="5"/><circle cx="' + n.x + '" cy="' + (n.y - 22) + '" r="13" fill="' + (viec ? '#E2B44C' : '#9FC8D0') + '" stroke="#2B1F1A" stroke-width="5"/>';
    }
    if (G.danger && G.danger.active) (G.danger.guards || []).forEach(function (g) { if (g.e) out += '<circle cx="' + g.e.x + '" cy="' + g.e.y + '" r="18" fill="#A8352B" stroke="#000" stroke-width="5"/>'; });
    var vw = W.viewW(), vh = W.viewH();
    out += '<rect x="' + W.camX + '" y="' + W.camY + '" width="' + vw + '" height="' + vh + '" fill="none" stroke="#FFF6E0" stroke-width="7" stroke-dasharray="26 16" opacity=".8"/>';
    // Đăng: mũi tên đỏ chỉ hướng đang quay mặt
    var fx = s.view === 'side' ? (s.flip || 1) : 0, fy = s.view === 'front' ? 1 : (s.view === 'back' ? -1 : 0), ax = s.x, ay = s.y - 20;
    out += '<circle cx="' + ax + '" cy="' + ay + '" r="40" fill="#C8301E" opacity=".25"/>';
    out += '<path d="M' + (ax + fx * 34) + ',' + (ay + fy * 34) + ' L' + (ax - fy * 22 - fx * 16) + ',' + (ay + fx * 22 - fy * 16) + ' L' + (ax - fx * 6) + ',' + (ay - fy * 6) + ' L' + (ax + fy * 22 - fx * 16) + ',' + (ay - fx * 22 - fy * 16) + ' Z" fill="#C8301E" stroke="#FFF6E0" stroke-width="7" stroke-linejoin="round"/>';
    mmDong.innerHTML = out;
  }
  setInterval(function () {
    if (!mm) return;
    capNhatMini();
    if (!mm.hidden) veDong();
  }, 160);

  // ---------- bản đồ lớn ----------
  function tenViec() { // nơi được nhắc tới trong mục tiêu (chữ đậm)
    var obj = (G.story.objective(S()) || '').toLowerCase(), r = {};
    Object.keys(NUT).forEach(function (id) { var n = G.LOCATIONS[id] && G.LOCATIONS[id].name.toLowerCase(); if (n && obj.indexOf(n) >= 0) r[id] = true; });
    return r;
  }
  function hienNut(id) { // đã đến, hoặc kề một nơi đã đến (hiện dấu ?)
    if (daDen(id)) return 2;
    var L = G.LOCATIONS[id]; if (!L) return 0;
    if (L.ch && (G.CH_ORDER || []).indexOf(S().chapter) < L.ch) return 0;
    if (id === 'nha_bacu' || id === 'nha_det') return 0;
    return NOI.some(function (e) { return (e[0] === id && daDen(e[1])) || (e[1] === id && daDen(e[0])); }) ? 1 : 0;
  }
  D.moBanDo = function () {
    var s = S(); if (!s || G.ui.modal || W.locked) return;
    var cur = s.loc, viec = tenViec(), biet = D.biet();
    var h = '<h2>Bản đồ</h2><div class="hint">' + (biet ? 'Bấm vào nơi đã đến để <b>độn thổ</b> tới đó (1 nén nhang). Chỉ đi được trong cùng một vùng.' :
      (s.chapter === 'mo_dau' ? 'Những nơi Đăng đã đặt chân.' : 'Những nơi Đăng đã đặt chân. Nghe nói <b>bà cụ hàng nước</b> biết một bí pháp đi đường đất.')) + '</div>';
    h += '<svg class="bd-svg" viewBox="0 0 760 350">';
    h += nenBanDo();
    // hai vùng
    h += '<path d="M24,234 Q150,210 310,234 L310,332 Q160,346 24,332 Z" fill="#B8C890" opacity=".55"/><text x="40" y="256" class="bd-vung">LÀNG ĐÔNG</text>';
    h += '<path d="M290,80 Q300,14 460,14 L748,14 L748,320 Q640,340 560,320 L460,160 Q340,170 290,80 Z" fill="#D8B8A0" opacity=".45"/><text x="610" y="340" class="bd-vung" text-anchor="middle">KINH THÀNH</text>';
    h += '<path d="M270,282 Q380,270 420,210 Q460,160 510,130" fill="none" stroke="#8A6A3A" stroke-width="3" stroke-dasharray="8 7"/><text x="372" y="242" class="bd-duong">đường xe bò</text>';
    h += '<g transform="translate(404,226)" stroke="' + INK + '" stroke-width="1.2"><rect x="-9" y="-6" width="16" height="7" fill="#A07A4A"/><circle cx="-4" cy="3" r="4" fill="#C8A462"/><path d="M7,-3 h6" stroke-width="1.6"/><ellipse cx="17" cy="-3" rx="5" ry="3.4" fill="#8A7A6A"/></g>';
    NOI.forEach(function (e) {
      var a = hienNut(e[0]), b = hienNut(e[1]); if (!a || !b) return;
      var p = NUT[e[0]], q = NUT[e[1]];
      var mx = (p[0] + q[0]) / 2 + (q[1] - p[1]) * .12, my = (p[1] + q[1]) / 2 - (q[0] - p[0]) * .12, d = 'M' + p[0] + ',' + p[1] + ' Q' + mx + ',' + my + ' ' + q[0] + ',' + q[1];
      if (a === 2 && b === 2) h += '<path d="' + d + '" fill="none" stroke="#6A4A2A" stroke-width="7" opacity=".25"/><path d="' + d + '" fill="none" stroke="#C8A86C" stroke-width="4"/><path d="' + d + '" fill="none" stroke="#6A4A2A" stroke-width="1.2" stroke-dasharray="2 6"/>';
      else h += '<path d="' + d + '" fill="none" stroke="#6A4A2A" stroke-width="2" stroke-dasharray="5 5" opacity=".7"/>';
    });
    Object.keys(NUT).forEach(function (id) {
      var m = hienNut(id); if (!m) return;
      var p = NUT[id], ten = NGAN[id] || G.LOCATIONS[id].name, laCur = id === cur, di = biet && m === 2 && !laCur;
      h += '<g class="bd-nut' + (laCur ? ' cur' : '') + (m === 1 ? ' mo' : '') + (di ? ' di' : '') + '"' + (di ? ' data-toi="' + id + '" tabindex="0" role="button" aria-label="Độn thổ tới ' + ten + '"' : '') + '>';
      h += huyHieu(id, p, m, laCur, viec[id]);
      h += '<text x="' + p[0] + '" y="' + (p[1] + (p[1] < 80 ? -27 : 36)) + '" text-anchor="middle" class="bd-ten">' + (m === 1 ? 'Chưa đến' : ten) + '</text></g>';
    });
    h += '</svg><div class="bd-chu"><span><i class="bd-c cur"></i> Đang ở đây</span><span><i class="bd-c"></i> Đã đến</span><span><i class="bd-c mo"></i> Chưa đến</span><span><b class="bd-viec2">!</b> Có việc cần làm</span>' +
      (biet ? '<span class="bd-nhang">Nhang: <b>' + (s.inv ? s.inv.nhang : 0) + '</b></span>' : '') + '</div><button class="close primary" data-a="dong">Đóng</button>';
    G.ui.open('bando', h);
    $('bando').onclick = function (e) {
      if (e.target.closest('[data-a="dong"]')) { G.ui.close('bando'); return; }
      var n = e.target.closest('[data-toi]'); if (n) D.hoiDi(n.dataset.toi);
    };
    $('bando').onkeydown = function (e) { var n = e.target.closest && e.target.closest('[data-toi]'); if (n && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); D.hoiDi(n.dataset.toi); } };
  };

  // ---------- độn thổ ----------
  function camDi(id) {
    var s = S(), L = G.LOCATIONS[id];
    if (!D.biet()) return 'Đăng chưa biết bí pháp độn thổ.';
    if (G.danger && G.danger.active) return 'Đang bị săn đuổi, không thể ngồi niệm chú.';
    if (s.loc.indexOf('ky_') === 0) return 'Đang ở trong ký ức.';
    if (VUNG[id] !== VUNG[s.loc]) return 'Độn thổ chỉ đi được trong một vùng đất. Muốn về làng thì đi **xe bò**.';
    if (L.ch && (G.CH_ORDER || []).indexOf(s.chapter) < L.ch) return 'Giờ chưa có việc gì ở đó.';
    if (!s.inv || s.inv.nhang < 1) return 'Hết nhang rồi. Mua ở hàng nước của bà cụ.';
    return '';
  }
  D.hoiDi = function (id) {
    var ly = camDi(id);
    if (ly) { G.ui.toast(ly, 3600); G.audio.sfx('bad'); return; }
    var c = G.story.cur(S());
    if (c.canExit && !c.canExit('dun', id)) return; // truyện không cho rời đi lúc này (đã báo lý do)
    G.ui.close('bando');
    D.di(id);
  };
  D.di = function (id) {
    var s = S(), p = DIEM[id] || [480, 500];
    s.inv.nhang--; G.ui.hud();
    W.locked = true; W.route = null;
    var fx = document.createElement('div'); fx.className = 'dun-fx';
    if (G.kynang) G.kynang.donTho(fx); // bùa sáng rồi cháy từ dưới lên, đất nứt vòng quanh, người chìm xuống
    else fx.innerHTML = '<div class="dun-bua">' + G.ve.buaSvg({ chu: G.ve.BUA.donTho }) + '</div><div class="dun-khoi"></div>';
    $('stage').appendChild(fx);
    G.audio.sfx('whoosh'); G.audio.sfx('bell', 0.3); if (G.audio.them) G.audio.them('chieng', 0.5);
    setTimeout(function () {
      G.ui.fadeTo(function () {
        s.view = 'front';
        W.enter(id, p[0], p[1]);
        fx.remove();
      }, function () {
        W.locked = false; G.ui.hud(); G.save();
        G.ui.toast('Độn thổ tới **' + G.LOCATIONS[id].name + '**. Còn ' + s.inv.nhang + ' nén nhang.', 3000);
      }, 900);
    }, 1100);
  };

  // ---------- học bí pháp ở bà cụ hàng nước ----------
  D.luaChon = function () {
    var s = S();
    if (!s || s.chapter === 'mo_dau' || D.biet()) return [];
    return [{ text: 'Hỏi về **bí pháp độn thổ** · 6 đồng', run: function () { D.hoc(); } }];
  };
  D.hoc = async function () {
    var s = S();
    await G.ui.say([
      { who: 'Bà cụ', text: 'Hồi còn ngồi đồng, già đi khắp các phủ mà chân chẳng mỏi. Cậu biết vì sao không?' },
      { who: 'Bà cụ', text: 'Độn thổ. Đốt một nén nhang, vẽ một lá bùa, niệm câu chú. Đất mở đường dưới chân cho mình đi.' },
      { who: 'Bà cụ', text: 'Nhưng nhớ lấy: chỉ tới được chỗ **chân mình từng đặt lên**, và không ra khỏi vùng đất mình đang đứng.' }
    ]);
    if (s.money < 6) { G.ui.dialog([{ who: 'Bà cụ', text: 'Già dạy thì cũng phải có lễ. **6 đồng**, cậu kiếm đủ rồi hẵng quay lại.' }]); return; }
    s.money -= 6; G.ui.hud();
    await G.ui.say([{ who: 'Bà cụ', text: 'Được. Vẽ cho già xem nét bùa. Tay run là đất nuốt mất chân đấy.' }]);
    await G.mg.bua({ title: 'Vẽ bùa độn thổ', hint: 'Tô theo nét mờ. Bùa thành thì đất nhận người.' });
    s.items.don_tho = true; G.audio.sfx('clue');
    await G.ui.say([
      { who: 'Bà cụ', text: 'Bùa thành rồi. Từ nay muốn đi đâu, cứ mở bản đồ trong đầu mà nghĩ tới chỗ ấy.' },
      { text: 'Đã học **bí pháp độn thổ**. Lấy bản đồ ra (phím **M**, hoặc nút **Bản đồ** trên thanh đồ nghề), bấm vào tờ bản đồ để mở rộng rồi bấm nơi đã đến để đi tới. Mỗi lần tốn **1 nén nhang**.', cls: 'think' }
    ]);
    G.ui.hud(); G.save();
  };

  // ---------- phím M, khởi tạo ----------
  document.addEventListener('DOMContentLoaded', function () {
    var p = document.createElement('div'); p.id = 'bando'; p.className = 'panel big'; p.hidden = true; p.setAttribute('role', 'dialog'); p.setAttribute('aria-label', 'Bản đồ');
    $('stage').appendChild(p);
    taoMini();
    window.addEventListener('keydown', function (e) {
      if (e.code !== 'KeyM' || e.repeat || !G.S || !$('title').hidden) return;
      if (G.ui.modal === 'bando') { G.ui.close('bando'); e.preventDefault(); return; }
      if (!G.ui.modal) { D.camBanDo(!cam); e.preventDefault(); } // M: lấy bản đồ ra / cất đi
    });
    window.addEventListener('keydown', function (e) { if (e.code === 'Escape' && G.ui.modal === 'bando') { G.ui.close('bando'); e.stopImmediatePropagation(); } }, true);
  });
})();
