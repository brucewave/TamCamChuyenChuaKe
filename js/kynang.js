// Hiệu ứng kỹ năng: mắt âm dương, gạo muối, chuông, chạy, độn thổ. Chỉ là phần nhìn, không đổi luật chơi.
// Hạt bay vẽ bằng G.dohoa.phun (toạ độ thế giới, chung canvas #dh-hat); lớp phủ chỉ đổi opacity / transform.
var G = window.G || (window.G = {});
G.kynang = {};

(function () {
  var K = G.kynang, $ = G.$, W = G.world;
  function R(a, b) { return a + Math.random() * (b - a); }
  function phun(k, x, y, o) { // giảm chuyển động: chỉ còn hạt gạo muối nằm yên
    if (G.reduceMotion && k !== 'gao' && k !== 'muoi') return;
    if (G.dohoa && G.dohoa.phun) G.dohoa.phun(k, x, y, o);
  }
  // số hạt theo cấu hình: giảm chuyển động thì không bắn, đồ hoạ Thấp thì bớt một nửa
  function nhieu(n) { return G.reduceMotion ? 0 : Math.round(n * (G.dohoa && G.dohoa.cao === false ? .55 : 1)); }
  // hướng mặt của Đăng trên mặt đất
  function huong() { var S = G.S; if (S.view === 'side') return [S.flip || 1, 0]; return S.view === 'back' ? [0, -1] : [0, 1]; }
  function lai(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  // ---------- lớp phủ: dựng một lần ----------
  var am, mat;
  function dung() {
    if (am || !$('stage')) return;
    am = document.createElement('div'); am.id = 'kn-am'; // màu thủy mặc xanh âm: thế giới người sống nhạt đi
    $('dark').parentNode.insertBefore(am, $('dark').nextSibling);
    mat = document.createElement('div'); mat.id = 'kn-mat'; mat.setAttribute('aria-hidden', 'true');
    mat.innerHTML = '<i class="mong"></i><i class="mach">' + machSvg() + '</i><i class="nhip"></i><b class="taiji">' + taijiSvg() + '</b>';
    $('soi').parentNode.insertBefore(mat, $('soi').nextSibling);
  }
  document.addEventListener('DOMContentLoaded', dung);

  // gân máu đỏ bò vào từ mép mắt (mỏi mắt)
  function machSvg() {
    var s = '', r = Math.random;
    function nhanh(x, y, a, dai, w, sau) {
      var d = 'M' + x.toFixed(0) + ',' + y.toFixed(0), n = Math.round(dai / 16);
      for (var i = 0; i < n; i++) {
        a += R(-.45, .45); x += Math.cos(a) * 16; y += Math.sin(a) * 16; d += ' L' + x.toFixed(0) + ',' + y.toFixed(0);
        if (sau < 2 && r() < .16) s += nhanh(x, y, a + (r() < .5 ? -.8 : .8), dai * .5, w * .6, sau + 1);
      }
      return '<path d="' + d + '" stroke-width="' + w.toFixed(1) + '"/>';
    }
    for (var i = 0; i < 18; i++) {
      var c = i % 4, x = c === 1 ? 1000 : c === 3 ? 0 : r() * 1000, y = c === 0 ? 0 : c === 2 ? 560 : r() * 560;
      var a = [Math.PI / 2, Math.PI, -Math.PI / 2, 0][c];
      s += nhanh(x, y, a, R(90, 200), R(1.6, 3.2), 0);
    }
    return '<svg viewBox="0 0 1000 560" preserveAspectRatio="none"><g fill="none" stroke="rgba(150,18,28,.6)" stroke-linecap="round">' + s + '</g></svg>';
  }
  // thái cực loé lên giữa mắt lúc mở
  function taijiSvg() {
    var S = 'A23,23 0 0 1 0,0 A23,23 0 0 0 0,-46Z';
    return '<svg viewBox="-50 -50 100 100"><circle r="47" fill="none" stroke="rgba(170,255,240,.8)" stroke-width="1.6"/>' +
      '<path d="M0,-46 A46,46 0 0 1 0,46 ' + S + '" fill="rgba(170,255,240,.5)"/><path d="M0,-46 A46,46 0 0 0 0,46 ' + S + '" fill="rgba(4,22,26,.6)"/>' +
      '<circle cy="-23" r="6" fill="rgba(170,255,240,.75)"/><circle cy="23" r="6" fill="rgba(4,22,26,.75)"/></svg>';
  }

  // ---------- 1. mắt âm dương ----------
  K.matMo = function () {
    dung(); if (!mat) return;
    lai(mat, 'kn-nhip');
    var S = G.S;
    phun('vong', S.x, S.y, { r0: 10, r1: 260, det: .42, life: 1.1, w: 2.5, a: .8, mau: 'rgba(140,255,235,1)' });
    for (var i = 0, n = nhieu(22); i < n; i++) { // hồn vía quanh người bung ra rồi bay lên
      var a = R(0, 6.28), v = R(30, 90);
      phun('hon', S.x, S.y, { h: R(20, 70), vx: Math.cos(a) * v, vy: Math.sin(a) * v * .5, vh: R(10, 40), keo: 1.2, life: R(1.4, 2.6), r: R(4, 9), a: .8 });
    }
  };
  K.matNham = function () {
    var st = $('stage'); st.classList.remove('kn-moi', 'kn-moi2');
    if (mat) mat.classList.remove('kn-nhip');
  };
  // vết hồn: lấy vị trí các dấu .hid đang hiện để toả đốm xanh lên từ đó
  var vet = [], vetT = 0, honT = 0, moiCu = false;
  function layVet() {
    vet = [];
    var ds = document.querySelectorAll('#world .hid');
    for (var i = 0; i < ds.length && vet.length < 30; i++) {
      var r = ds[i].getBoundingClientRect(); if (r.width < 2 && r.height < 2) continue;
      var a = W.toWorld(r.left, r.top), b = W.toWorld(r.right, r.bottom);
      vet.push([a.x, a.y, b.x - a.x, b.y - a.y, Math.min(2.5, 1 + (b.x - a.x) * (b.y - a.y) / 6000)]);
    }
  }
  function capNhatMat(dt, st) {
    var soi = st.classList.contains('soi');
    if (!soi) { vet.length = 0; vetT = 0; } else if (!G.reduceMotion) {
      vetT -= dt; if (vetT <= 0) { vetT = 1.5; layVet(); }
      var k = G.dohoa && G.dohoa.cao === false ? .5 : 1;
      for (var i = 0; i < vet.length; i++) {
        var v = vet[i]; if (Math.random() > v[4] * 2.6 * k * dt) continue;
        phun('hon', v[0] + Math.random() * v[2], v[1] + Math.random() * v[3], { vh: R(8, 22), vx: R(-5, 5), life: R(.9, 1.8), r: R(2.5, 5), a: .95 });
      }
      honT -= dt; // hồn vất vưởng trôi trong tầm mắt
      if (honT <= 0) {
        honT = k < 1 ? .5 : .28;
        phun('hon', W.camX + Math.random() * W.viewW(), W.camY + Math.random() * W.viewH(), { vh: R(12, 30), vx: R(-8, 8), life: R(2.6, 4.4), r: R(5, 11), a: .55 });
      }
    }
    // mỏi mắt ở mấy giây cuối: gân đỏ, tim đập, mi trĩu xuống
    var con = G.tt && G.tt.matCon ? G.tt.matCon() : 0, moi = con > 0 && con < 3.2;
    st.classList.toggle('kn-moi', moi); st.classList.toggle('kn-moi2', con > 0 && con < 1.4);
    if (moi && !moiCu) G.audio.sfx('heart');
    moiCu = moi;
  }

  // ---------- 2. gạo muối: vốc một nắm ném ra trước mặt ----------
  K.gaoMuoi = function () {
    var S = G.S, d = huong(), p = W.player;
    if (p && p.el && !G.reduceMotion) { p.el.style.setProperty('--kx', d[0]); p.el.style.setProperty('--ky', d[1]); lai(p.el, 'kn-nem'); setTimeout(function () { p.el.classList.remove('kn-nem'); }, 420); }
    var hx = S.x + d[0] * 14, hy = S.y + d[1] * 6, a0 = Math.atan2(d[1], d[0]), n = nhieu(56);
    for (var i = 0; i < n; i++) {
      var a = a0 + R(-.55, .55), v = R(90, 270), muoi = Math.random() < .38;
      phun(muoi ? 'muoi' : 'gao', hx + R(-4, 4), hy + R(-2, 2), { h: d[1] < 0 ? 52 : 44, vx: Math.cos(a) * v, vy: Math.sin(a) * v * .72, vh: R(50, 190), g: 640,
        vr: R(-22, 22), life: R(2.6, 3.6), nam: R(1.1, 2.1), tre: R(0, .09) });
    }
    if (G.reduceMotion) for (var j = 0; j < 14; j++) // không chuyển động: rải sẵn trên đất
      phun(j % 3 ? 'gao' : 'muoi', hx + d[0] * R(30, 110) + R(-30, 30), hy + d[1] * R(20, 70) + R(-14, 14), { life: 1.8 });
    for (var k = 0, m = nhieu(4); k < m; k++) // bụi muối mịn bay theo tay
      phun('bui', hx + d[0] * R(10, 40), hy + d[1] * R(4, 20), { h: R(36, 50), vx: d[0] * R(30, 60), vy: d[1] * R(15, 30), vh: R(-5, 10), keo: 2, life: R(.5, .8), r: R(6, 10), a: .3, mau: 'trang' });
  };
  // vong trúng gạo muối: xèo lên, giật nảy, loá trắng
  K.xeo = function (g) {
    var S = G.S, tre = Math.min(.35, Math.hypot(g.e.x - S.x, g.e.y - S.y) / 600);
    setTimeout(function () {
      var el = g.e.el; if (!el || !el.parentNode) return;
      lai(el, 'kn-xeo'); setTimeout(function () { el.classList.remove('kn-xeo'); }, 700);
      for (var i = 0, n = nhieu(16); i < n; i++) {
        var a = R(0, 6.28), v = R(60, 170);
        phun('xeo', g.e.x, g.e.y, { h: R(30, 80), vx: Math.cos(a) * v, vy: Math.sin(a) * v * .5, vh: R(-30, 110), keo: 4, life: R(.25, .55), r: R(3, 6) });
      }
      for (var j = 0, m = nhieu(6); j < m; j++)
        phun('bui', g.e.x + R(-16, 16), g.e.y, { h: R(30, 80), vh: R(25, 50), vx: R(-10, 10), keo: 1, life: R(.9, 1.4), r: R(10, 16), a: .4, mau: 'trang' });
    }, tre * 1000);
  };

  // ---------- 3. chuông đồng ----------
  var CHUONG = '<svg viewBox="0 0 40 60" width="30" height="45" aria-hidden="true"><defs><linearGradient id="knDong" x1="0" x2="1">' +
    '<stop offset="0" stop-color="#5A3010"/><stop offset=".3" stop-color="#E8B455"/><stop offset=".5" stop-color="#C88A2E"/><stop offset="1" stop-color="#4A2808"/></linearGradient></defs>' +
    '<path d="M20,0 V9" stroke="#8A2418" stroke-width="2.2"/><rect x="16.5" y="7" width="7" height="5" rx="2" fill="#7A4A16" stroke="#3A2008" stroke-width=".8"/>' +
    '<g class="kc-qua"><path d="M20,30 V47" stroke="#3A2008" stroke-width="1.6"/><circle cx="20" cy="48.5" r="2.8" fill="#5A3A14"/><path d="M20,51 v5" stroke="#B0281C" stroke-width="1.6"/><path d="M18.4,55 h3.2 l1,5 h-5.2z" fill="#C8301E"/></g>' +
    '<path d="M20,11 C11,11 9.5,19 9.5,29 C9.5,37 7,41 4,45 H36 C33,41 30.5,37 30.5,29 C30.5,19 29,11 20,11 Z" fill="url(#knDong)" stroke="#3A2008" stroke-width="1"/>' +
    '<path d="M10,23 H30 M9.8,27 H30.2" stroke="#6A4014" stroke-width="1" opacity=".7"/>' +
    '<path d="M3,44.5 H37 a1.8,1.8 0 0 1 0,3.6 H3 a1.8,1.8 0 0 1 0,-3.6Z" fill="#A8722A" stroke="#3A2008" stroke-width=".8"/>' +
    '<path d="M14.5,15 C12.6,22 12.4,32 11.2,40" stroke="#FFE7A8" stroke-width="1.6" opacity=".75" fill="none" stroke-linecap="round"/></svg>';
  K.chuong = function () {
    var S = G.S, H = 132;
    var el = document.createElement('div'); el.className = 'kn-chuong';
    el.style.transform = 'translate3d(' + S.x.toFixed(1) + 'px,' + S.y.toFixed(1) + 'px,0)'; el.style.zIndex = Math.round(S.y) + 3;
    el.innerHTML = '<div class="kc-day">' + CHUONG + '</div>';
    $('ents').appendChild(el); setTimeout(function () { el.remove(); }, 1500);
    // sóng tiếng: vòng tròn quanh chuông và vòng dẹt loang trên mặt đất
    for (var i = 0; i < 3; i++) phun('vong', S.x, S.y, { h: H, r0: 8, r1: 80 + i * 26, life: .9, tre: .05 + i * .17, w: 3 - i * .6, a: .9, mau: 'rgba(255,208,110,1)' });
    for (var j = 0; j < 2; j++) phun('vong', S.x, S.y, { r0: 16, r1: 230, det: .42, life: 1.15, tre: .08 + j * .3, w: 2.4, a: .55, mau: 'rgba(255,214,130,1)' });
    for (var k = 0, n = nhieu(10); k < n; k++) { var a = R(0, 6.28), v = R(20, 60); phun('xeo', S.x, S.y, { h: H + R(-8, 8), vx: Math.cos(a) * v, vy: Math.sin(a) * v * .4, vh: Math.sin(a) * v, keo: 2, life: R(.5, 1), r: R(2, 3.5), a: .7 }); }
    // màn hình gợn nhẹ như không khí rung
    var st = $('stage'), z = W.zoom, ng = document.createElement('div'); ng.className = 'kn-ngan';
    ng.style.left = ((S.x - W.camX) * z).toFixed(0) + 'px'; ng.style.top = ((S.y - H - W.camY) * z).toFixed(0) + 'px';
    st.insertBefore(ng, $('mi')); setTimeout(function () { ng.remove(); }, 1000);
  };

  // ---------- 4. chạy: bụi tung dưới gót ----------
  var buiT = 0;
  function capNhatChay(dt) {
    var S = G.S, I = G.input;
    var chay = W.moving && !W.locked && (I.shift || W.routeRun || I.runToggle) && !(G.danger && G.danger.holding) && !G.ui.isBusy();
    if (!chay || G.reduceMotion) { buiT = 0; return; }
    buiT -= dt; if (buiT > 0) return;
    buiT = G.dohoa && G.dohoa.cao === false ? .13 : .07;
    var d = huong();
    phun('bui', S.x - d[0] * 8 + R(-5, 5), S.y + R(-2, 2), { h: R(1, 4), vx: -d[0] * R(12, 34) + R(-8, 8), vy: -d[1] * R(6, 16), vh: R(6, 18), keo: 2.4,
      life: R(.5, .85), r: R(5, 9), a: .5 });
    if (Math.random() < .35) phun('dat', S.x + R(-6, 6), S.y, { h: 2, vx: -d[0] * R(20, 50) + R(-15, 15), vy: -d[1] * R(10, 30), vh: R(40, 90), g: 520, life: .9, nam: .3, r: R(.8, 1.4) });
  }

  // ---------- 5. độn thổ: bùa sáng, cháy từ dưới lên, đất nứt, người chìm ----------
  // dòng thời gian khớp với D.di: 1,1 giây rồi mới tối màn (0,9 giây)
  var BUA_TREN = 222, BUA_CAO = 120, CHAY0 = 300, CHAY = 750;
  function nutSvg() {
    var s = '', g = '';
    for (var i = 0; i < 11; i++) {
      var a = i / 11 * 6.28 + R(-.2, .2), r = R(12, 18), x = Math.cos(a) * r, y = Math.sin(a) * r * .45, d = 'M' + x.toFixed(1) + ',' + y.toFixed(1), dai = R(55, 92);
      while (r < dai) { r += R(7, 12); var b = a + R(-.22, .22); x = Math.cos(b) * r; y = Math.sin(b) * r * .45; d += ' L' + x.toFixed(1) + ',' + y.toFixed(1); }
      if (Math.random() < .5) { var rr = r * R(.5, .7), b2 = a + (Math.random() < .5 ? .35 : -.35); d += ' M' + (Math.cos(a) * rr * .8).toFixed(1) + ',' + (Math.sin(a) * rr * .36).toFixed(1) + ' L' + (Math.cos(b2) * rr * 1.2).toFixed(1) + ',' + (Math.sin(b2) * rr * .54).toFixed(1); }
      s += '<path pathLength="1" d="' + d + '"/>'; g += '<path pathLength="1" d="' + d + '"/>';
    }
    return '<svg viewBox="-100 -45 200 90" width="200" height="90" aria-hidden="true"><ellipse class="kn-ho" rx="30" ry="13"/>' +
      '<g class="kn-sang" fill="none" stroke="#FFB45A" stroke-width="4.5" stroke-linecap="round">' + g + '</g>' +
      '<g class="kn-ke" fill="none" stroke="#1A0F08" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + s + '</g></svg>';
  }
  K.donTho = function (fx) {
    var S = G.S, x = S.x, y = S.y, p = W.player;
    fx.innerHTML = '<div class="dun-khoi"></div>';
    // lá bùa trong thế giới, lơ lửng trên đầu
    var bua = document.createElement('div'); bua.className = 'kn-bua';
    bua.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)'; bua.style.zIndex = 99990;
    bua.innerHTML = '<i class="kb-hao"></i><div class="kb-giay">' + G.ve.buaSvg({ chu: G.ve.BUA.donTho }) + '<i class="kb-than"></i></div>';
    var nut = document.createElement('div'); nut.className = 'kn-nut';
    nut.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)'; nut.style.zIndex = Math.round(y) - 1;
    nut.innerHTML = nutSvg();
    $('ents').appendChild(nut); $('ents').appendChild(bua);
    var t0 = performance.now(), hen = [];
    function sau(ms, f) { hen.push(setTimeout(f, ms)); }
    // tàn lửa và tro bay lên từ mép cháy
    if (!G.reduceMotion) (function tan() {
      var t = performance.now() - t0; if (t > CHAY0 + CHAY + 60 || !bua.parentNode) return;
      if (t >= CHAY0) {
        var q = Math.min(1, (t - CHAY0) / CHAY), e = Math.max(0, Math.min(1, 1.1 - 1.2 * q)), ey = y - BUA_TREN + e * BUA_CAO;
        for (var i = 0, n = nhieu(3); i < n; i++) phun('tan', x + R(-19, 19), ey, { vh: R(25, 70), vx: R(-18, 18), keo: .6, life: R(.45, 1), r: R(2, 4.5) });
        if (Math.random() < .6) phun('tro', x + R(-18, 18), ey, { vh: R(15, 45), vx: R(-25, 25), keo: .8, vr: R(-8, 8), life: R(.8, 1.3), r: R(1.2, 2.2), a: .85 });
      }
      sau(40, tan);
    })();
    sau(380, function () { // đất nứt vòng quanh chân
      nut.classList.add('mo'); G.audio.sfx('crack'); W.shake();
      for (var i = 0, n = nhieu(26); i < n; i++) {
        var a = R(0, 6.28), r = R(22, 62);
        phun('dat', x + Math.cos(a) * r, y + Math.sin(a) * r * .45, { h: 1, vx: Math.cos(a) * R(15, 70), vy: Math.sin(a) * R(8, 30), vh: R(120, 260), g: 700, vr: R(-15, 15), life: 1.4, nam: .6, r: R(1.2, 2.8) });
      }
      for (var j = 0, m = nhieu(12); j < m; j++) {
        var b = j / 12 * 6.28, rb = R(30, 60);
        phun('bui', x + Math.cos(b) * rb, y + Math.sin(b) * rb * .45, { h: 2, vx: Math.cos(b) * R(10, 30), vy: Math.sin(b) * R(4, 12), vh: R(14, 40), keo: 1.4, life: R(.9, 1.4), r: R(12, 20), a: .6 });
      }
    });
    sau(520, function () { // người chìm xuống đất
      if (p && p.el && !G.reduceMotion) p.el.classList.add('kn-chim');
      if (G.audio.sfx) G.audio.sfx('thud');
      for (var i = 0, n = nhieu(10); i < n; i++) phun('bui', x + R(-26, 26), y + R(-6, 6), { h: 2, vh: R(20, 50), vx: R(-20, 20), keo: 1.2, life: R(.8, 1.2), r: R(10, 18), a: .55 });
    });
    // W.enter dựng lại #ents nên bùa, vết nứt tự mất; chỉ cần dọn hẹn giờ
    sau(2200, function () { hen.forEach(clearTimeout); });
  };

  // ---------- mỗi khung hình: móc vào G.dohoa.tick ----------
  function moc() {
    if (!G.dohoa || !G.dohoa.tick || G.dohoa.tick._kn) return;
    var t0 = G.dohoa.tick;
    G.dohoa.tick = function (dt) {
      try { if (G.S && W.ready && $('title').hidden) { dung(); var st = $('stage'); capNhatMat(dt || 0, st); capNhatChay(dt || 0); } } catch (e) {}
      return t0.apply(this, arguments);
    };
    G.dohoa.tick._kn = true;
  }
  moc();
})();
