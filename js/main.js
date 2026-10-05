// Khởi động: chạm để bắt đầu (mở âm thanh), phim mở đầu, màn tiêu đề, vòng lặp, bàn phím.
var G = window.G || (window.G = {});

(function () {
  var $ = G.$;

  // ảnh bìa: vườn cau lúc chạng vạng, trăng to, Đăng cầm đèn lồng quay lưng
  function coverSvg() {
    var s = '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<linearGradient id="tSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A1424"/><stop offset=".55" stop-color="#4A2A32"/><stop offset="1" stop-color="#8A4A3A"/></linearGradient>' +
      '<radialGradient id="tMoon"><stop offset="0" stop-color="#F4E2B0"/><stop offset=".5" stop-color="#E8C890"/><stop offset=".58" stop-color="#E8C890" stop-opacity=".2"/><stop offset="1" stop-color="#E8C890" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="tLamp"><stop offset="0" stop-color="#FFC060" stop-opacity=".8"/><stop offset="1" stop-color="#FFC060" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#tSky)"/>';
    s += '<circle cx="700" cy="190" r="230" fill="url(#tMoon)"/><circle cx="700" cy="190" r="120" fill="#EED8A8"/><circle cx="670" cy="160" r="18" fill="#D8BC88" opacity=".5"/><circle cx="730" cy="220" r="26" fill="#D8BC88" opacity=".4"/>';
    // đàn quạ bay ngang trăng
    s += '<g fill="#0E0A10" class="fog">';
    [[620, 120], [660, 100], [700, 130], [760, 110], [590, 150]].forEach(function (p) { s += '<path d="M' + p[0] + ',' + p[1] + ' q8,-8 16,0 q8,-8 16,0 q-8,2 -16,6 q-8,-4 -16,-6 z"/>'; });
    s += '</g>';
    // hàng cau
    s += '<g fill="#120E16">';
    [[540, 300], [600, 340], [800, 320], [870, 290], [940, 350], [470, 330], [380, 360]].forEach(function (c) {
      var x = c[0], h = c[1];
      s += '<rect x="' + (x - 3) + '" y="' + (470 - h) + '" width="7" height="' + h + '"/>';
      for (var k = 0; k < 7; k++) s += '<path d="M' + x + ',' + (470 - h) + ' q' + ((k - 3) * 18) + ',-26 ' + ((k - 3) * 38) + ',' + (k % 2 ? 10 : -4) + '" stroke="#120E16" stroke-width="8" fill="none"/>';
    });
    s += '</g>';
    // cây cau non có bóng người vắt trên ngọn
    s += '<g fill="#0A080C"><rect x="696" y="300" width="5" height="170"/><ellipse cx="699" cy="296" rx="16" ry="9"/><path d="M684,296 q-8,16 -4,32 l6,-1 q-2,-14 6,-26 z"/><path d="M714,296 q10,18 4,34 l-6,-2 q4,-16 -4,-26 z"/><circle cx="684" cy="288" r="9"/></g>';
    s += '<path d="M0,470 Q300,450 560,466 T960,458 V540 H0 Z" fill="#0C0A0E"/>';
    s += '<g class="fog" opacity=".35"><ellipse cx="300" cy="476" rx="360" ry="26" fill="#C8B8A0"/><ellipse cx="820" cy="490" rx="300" ry="20" fill="#C8B8A0"/></g>';
    s += '<circle cx="470" cy="452" r="90" fill="url(#tLamp)" class="flick"/>';
    s += '</svg>';
    return s;
  }

  G.showTitle = function () {
    document.querySelectorAll('.panel').forEach(function (p) { p.hidden = true; });
    G.ui.modal = null;
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo', 'night');
    $('title-h').textContent = G.TITLE;
    var kets = G.ch5 ? G.ch5.dsKet() : [];
    $('title-sub').innerHTML = G.SUBTITLE + (kets.length ? '<br><small>Đã mở: ' + kets.map(function (k) { return 'Kết ' + k; }).join(' · ') + ' / 4</small>' : '');
    $('cover').innerHTML = G.tieude ? G.tieude.cover() : coverSvg() + '<div style="position:absolute;left:430px;top:300px;transform:scale(.9)">' +
      '<div style="position:relative">' + G.art.chibi(Object.assign({}, G.LOOKS.dang, { view: 'back', prop: 'lantern' })) + '</div></div>';
    if (G.tieude && !$('title').querySelector('.td-chumau')) $('title-h').insertAdjacentHTML('afterend', G.tieude.mauChu());
    $('btn-continue').hidden = !G.hasSave();
    $('title').hidden = false;
    G.S = null;
    G.audio.music('title'); G.audio.ambience('dem');
  };

  G.start = function (S) {
    var fresh = !S;
    document.querySelectorAll('.panel').forEach(function (p) { p.hidden = true; });
    G.ui.modal = null;
    G.S = S || G.newState();
    if (G.danger.active) G.danger.stop();
    if (G.S.loc.indexOf('ky_') === 0) { var r = G.S.memReturn || { loc: 'nha_dighe', x: 754, y: 500 }; G.S.loc = r.loc; G.S.x = r.x; G.S.y = r.y; G.S.mem = null; } // không lưu giữa ký ức
    $('title').hidden = true;
    G.world.locked = false;
    G.world.enter(G.S.loc, G.S.x, G.S.y);
    if (G.S.chapter === 'ch5') { G.ch5.music(); G.ch5.onEnter(G.S.loc); }
    else if (G.S.chapter === 'ch4') { G.ch4.music(); G.ch4.onEnter(G.S.loc); }
    else if (G.S.chapter === 'ch3') { G.ch3.music(); G.ch3.onEnter(G.S.loc); }
    else if (G.S.chapter === 'ch2') { G.ch2.music(); if (G.S.day === 2 && G.S.phase === 'dem') G.ch2.onEnter(G.S.loc); }
    else if (G.S.chapter === 'ch1') { G.ch1.music(); if (G.S.day === 3 && G.S.phase === 'dem' && G.S.loc === 'cung_vuon' && !G.S.flags.c1_long_chon) G.ch1.dangerDem3(); }
    else G.prologue.music();
    if (fresh) setTimeout(G.prologue.start, 200);
    else if (G.S.chapter === 'mo_dau' && G.S.flags.het_mo_dau) G.ch1.begin();
    else if (G.S.chapter === 'ch1' && G.S.flags.c1_het) G.ch2.begin();
    else if (G.S.chapter === 'ch2' && G.S.flags.c2_het) G.ch3.begin();
    else if (G.S.chapter === 'ch3' && G.S.flags.c3_het) G.ch4.begin();
    else if (G.S.chapter === 'ch4' && G.S.flags.c4_het) G.ch5.begin();
    else if (G.S.flags.c5_het) G.ui.dialog([{ text: 'Bạn đã chơi hết truyện (Kết ' + G.S.flags.c5_ket + '). Chơi lại từ Chọn chương để mở các kết khác.' }]);
  };

  var last = 0;
  // khi cửa sổ bị che, trình duyệt ngừng gọi khung hình: hẹn giờ dự phòng giữ cho game vẫn chạy
  setInterval(function () { var n = performance.now(); if (n - last > 150) step(n); }, 100);
  function loop(t) { step(performance.now()); requestAnimationFrame(loop); }
  function step(t) {
    var dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
    var busy = !!(G.ui && G.ui.modal) || !!(G.world && G.world.locked);
    if (busy !== step.busy) { step.busy = busy; $('stage').classList.toggle('busy', busy); }
    if (G.S && G.world.ready && $('title').hidden) {
      if (!G.ui.isBusy()) G.world.update(dt);
      else { G.input.act = false; if (G.world.prompt) G.world.prompt.hidden = true; if (G.world.locked) G.world.updateCamera(false); }
      G.world.tint();
      G.world.drawDark(dt);
      G.audio.tick(dt, G.S.phase);
    }
  }

  var KEYS = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down' };
  function onKey(e, down) {
    if (e.code === 'Space' || e.code === 'KeyE') G.input.hold = down;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') G.input.shift = down;
    if (KEYS[e.code]) { G.input[KEYS[e.code]] = down; e.preventDefault(); return; }
    if (!down || e.repeat || !G.S || !$('title').hidden) return;
    var m = G.ui.modal;
    if (m === 'mg') { if ((e.code === 'Space' || e.code === 'KeyE') && G.mg._moHit) { G.mg._moHit(); e.preventDefault(); } return; }
    if (e.code === 'Escape') { if (m === 'menu') G.ui.close('menu'); else if (m === 'notebook') { G.ui.close('notebook'); G.ui.hud(); } else if (!m) G.ui.menu(); return; }
    if (m === 'dialog') {
      var ck = { Digit1: 0, Digit2: 1, Digit3: 2, Numpad1: 0, Numpad2: 1 }[e.code];
      if (ck !== undefined && G.ui.choose) { G.ui.choose(ck); e.preventDefault(); return; }
      if (e.code === 'Space' || e.code === 'Enter' || e.code === 'KeyE') { if (G.ui.advance) G.ui.advance(); e.preventDefault(); }
      return;
    }
    if (m === 'notebook' && e.code === 'KeyJ') { G.ui.close('notebook'); G.ui.hud(); return; }
    if (m) return;
    if (G.world.locked) return;
    if (e.code === 'KeyE' || e.code === 'Space' || e.code === 'Enter') { G.input.act = true; e.preventDefault(); }
    if (e.code === 'KeyJ') G.notebook.open();
    if (e.code === 'KeyB') G.toggleBowl();
    if (e.code === 'KeyG' && G.S.inv) G.danger.gaoMuoi();
    if (e.code === 'KeyC' && G.S.items.chuong) G.lacChuong();
  }

  // Chuông đồng phải chờ ngân hết mới lắc lại được (hồi chiêu); vong cũng nghe tiếng chuông nên lắc nhiều là tự gọi nó tới.
  var CHUONG_HOI = 12, chuongLuc = -1e9;
  G.chuongCon = function () { return Math.max(0, CHUONG_HOI - (performance.now() - chuongLuc) / 1000); };
  G.lacChuong = function () {
    var S = G.S, con = G.chuongCon();
    if (con > 0) { G.ui.toast('Chuông còn đang ngân… chờ <b>' + Math.ceil(con) + ' giây</b> nữa.', 1600); G.audio.sfx('bad'); return; }
    chuongLuc = performance.now();
    var b = $('btn-chuong'); if (b) { b.classList.add('hoi'); b.style.setProperty('--hoi', CHUONG_HOI + 's'); setTimeout(function () { b.classList.remove('hoi'); }, CHUONG_HOI * 1000); }
    G.audio.sfx('bell');
    if (G.kynang) G.kynang.chuong(); // chuông đồng đung đưa trên đầu, sóng tiếng vàng loang ra
    if (G.danger.active) G.danger.noise(S.x, S.y, 320, 'chuông');
    var w = { cung_gieng: '…em không trượt chân… có người… tay to lắm…', cung_vuon: '…đừng chôn tôi một mình…', cung_hau: '…cái yếm này của chị…' }[S.loc];
    if (w && S.chapter === 'ch1' && S.day >= 3) setTimeout(function () { G.ui.toast('Tiếng thì thầm: <i>' + w + '</i>', 4200); }, 600);
  };

  document.addEventListener('DOMContentLoaded', function () {
    G.fit();
    window.addEventListener('resize', G.fit);
    window.addEventListener('keydown', function (e) { onKey(e, true); });
    window.addEventListener('keyup', function (e) { onKey(e, false); });
    window.addEventListener('blur', function () { G.input.left = G.input.right = G.input.up = G.input.down = G.input.hold = false; });
    if (G.isTouch) document.body.classList.add('touch');
    document.addEventListener('click', function (e) { if (e.target.closest('button') && G.audio.them) G.audio.them('bam'); }, true);
    $('world').addEventListener('click', function (e) { G.world.clickAt(e.clientX, e.clientY); });
    $('btn-act').addEventListener('pointerdown', function (e) { e.preventDefault(); if (!G.ui.isBusy()) G.input.act = true; else if (G.ui.advance) G.ui.advance(); });
    $('btn-menu').onclick = function () { if (G.S && !G.ui.modal) G.ui.menu(); };
    $('btn-note').onclick = function () { if (G.S && !G.ui.modal && !G.world.locked) G.notebook.open(); };
    $('btn-bowl').onclick = function () { if (!G.ui.modal) G.toggleBowl(); };
    $('btn-gao').onclick = function () { if (G.S && !G.ui.modal) G.danger.gaoMuoi(); };
    $('btn-chuong').onclick = function () { if (G.S && !G.ui.modal) G.lacChuong(); };
    $('btn-chay').onclick = function () { G.input.runToggle = !G.input.runToggle; G.ui.hud(); };
    if (window.ResizeObserver) new ResizeObserver(function () { G.fit(); }).observe(document.documentElement);
    $('btn-music').onclick = function () { var on = G.audio.toggle(); $('btn-music').classList.toggle('off', !on); $('btn-music').setAttribute('aria-pressed', on); };
    $('btn-music').classList.toggle('off', !G.audio.on);
    document.querySelectorAll('.music-toggle').forEach(function (b) {
      b.onclick = function () { var on = G.audio.toggle(); b.textContent = '♪ Âm thanh: ' + (on ? 'Bật' : 'Tắt'); };
      b.textContent = '♪ Âm thanh: ' + (G.audio.on ? 'Bật' : 'Tắt');
    });
    // hỏi bằng hộp trong game: confirm() của trình duyệt có thể bị chặn (bấm Chơi mới không có gì xảy ra)
    $('btn-new').onclick = async function () {
      if (G.hasSave() && !(await G.tieude.hoi('Chơi mới sẽ <b>xoá bản lưu cũ</b>.<br>Ván đang chơi dở sẽ mất hẳn.', 'Xoá, chơi mới', 'Thôi'))) return;
      try { localStorage.removeItem(G.SAVE_KEY); } catch (e) {}
      G.start(null);
    };
    $('btn-continue').onclick = function () { var S = G.loadSave(); if (S) G.start(S); else { G.ui.toast('Bản lưu hỏng.'); $('btn-continue').hidden = true; } };
    $('btn-jump').onclick = function () { G.jumpMenu(); };
    $('btn-replay').onclick = function () { $('title').hidden = true; G.cine.play(G.showTitle); };
    // chạm để bắt đầu: trình duyệt chỉ cho phát âm thanh sau một lần bấm
    $('tap').onclick = function () {
      G.audio.init();
      $('tap').remove();
      var seen = false; try { seen = localStorage.getItem('tpcc_cine') === '1'; } catch (e) {}
      if (seen) G.showTitle();
      else { try { localStorage.setItem('tpcc_cine', '1'); } catch (e) {} G.cine.play(G.showTitle); }
    };
    requestAnimationFrame(loop);
  });
})();
