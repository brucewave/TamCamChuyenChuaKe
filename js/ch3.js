// Kịch bản CHƯƠNG 3: Khung cửi. Xem docs/dac-ta-ch3.md.
var G = window.G || (window.G = {});
G.ch3 = {};

Object.assign(G.CLUES, {
  L14: { type: 'L', title: 'Đăng nhớ: nốt ruồi chờ lộc', text: 'Thầy Cả có một nốt ruồi sát tai trái. Mười năm theo thầy, Đăng đùa về nó không biết bao lần.' },
  L15: { type: 'L', title: 'Chữ thầy trong sổ tay', text: 'Một trang sổ tay của Thầy Cả. Nét ngang nào cũng có một cái móc nhỏ ở cuối, rất riêng.' },
  L16: { type: 'L', title: 'Bà Tư: Nụ ngồi một mình', text: 'Đêm qua Nụ ngồi dệt một mình, cửa nhà dệt cài then từ trong. Không ai vào.' },
  L17: { type: 'L', title: 'Dì ghẻ: rắc tro ba ngả', text: 'Đốt xong thì hốt tro, rắc thật xa, mỗi ngả sông một nắm. Không để sót.' },
  L18: { type: 'L', title: 'Cám: chỉ đốt giữa sân', text: 'Ta chỉ ra lệnh đốt khung cửi giữa sân. Ta không bảo ai đốt nhà dệt!' },
  V19: { type: 'V', title: 'Tấm vải hoa văn', text: 'Tấm vải Nụ dệt suốt đêm. Hoa văn như sơ đồ một ngôi nhà ba gian, dấu chéo đỏ ở gian giữa, cạnh có cái giếng.' },
  V20: { type: 'V', title: 'Giấy bùa cháy dở trong tro bếp', text: 'Dì ghẻ đốt giấy trong bếp lò. Mẩu bùa còn sót có nét móc ở cuối nét ngang.' },
  V21: { type: 'V', title: 'Quả cau dính máu', text: 'Ký ức: quả cau trong tay Tấm có vết móng tay cào sâu. Cô còn sống khi rơi, rồi mới có thêm ba nhát rìu.' },
  V22: { type: 'V', title: 'Lửa ở ba góc nhà dệt', text: 'Lửa bùng cùng một lúc ở ba góc. Góc nào cũng có can dầu đổ sẵn.' }
});
G.DEDUCE.push(
  { id: 'C3D1', a: 'L16', b: 'V19', title: 'Nụ không dệt tấm vải ấy', text: 'Cửa cài then, Nụ một mình, mà tấm vải là [[sơ đồ một ngôi nhà Nụ chưa từng đến]]. Có thứ khác dệt qua tay Nụ.' },
  { id: 'C3D2', a: 'L18', b: 'V22', title: 'Đám cháy có người châm', text: 'Cám chỉ cho đốt khung cửi giữa sân. Lửa lại [[bùng ở ba góc nhà dệt cùng lúc]], có can dầu đổ sẵn.' },
  { id: 'C3D3', a: 'L14', b: 'V04', title: 'Cái xác không phải thầy', text: 'Thầy có nốt ruồi bên tai trái. Cái xác trên ngọn cau thì không. [[Đó là xác thế mạng.]]' },
  { id: 'C3D4', a: 'L15', b: 'V16', title: 'Bùa trong hộp ngải là chữ thầy', text: 'Cái móc ở cuối nét ngang. [[Thầy Cả đã viết lá bùa bỏ ngải Cám.]]' },
  { id: 'C3D5', a: 'L15', b: 'V20', title: 'Thầy vẫn còn viết bùa', text: 'Giấy bùa dì ghẻ vừa đốt trong bếp cũng là chữ thầy, mực còn mới. [[Thầy Cả còn sống.]]' },
  { id: 'C3D6', a: 'L17', b: 'V21', title: 'Xé hồn ra từng mảnh', text: 'Chặt thêm ba nhát cho chắc, rồi rắc tro ba ngả. [[Có người không muốn cô ấy về được nguyên vẹn.]]' }
);
Object.assign(G.DEATHS, {
  nu: { name: 'Nụ', img: 'por_nu',
    meta: function () { return 'Cung nữ dệt vải. Sáng ngày 2 thấy gục trên khung cửi gỗ xoan, mười ngón tay rách, sợi chỉ thắt quanh cổ.'; },
    ready: function (S) { return !!S.deduce.C3D1; },
    choices: ['Ma giết', 'Người giết: Dì ghẻ', 'Người giết: Đội Ngạn', 'Tự tử'], answer: 0,
    verdict: function (S) { var v = (S.verdict || {}).nu; return v !== undefined ? 'Kết luận: ' + G.DEATHS.nu.choices[v] : (G.DEATHS.nu.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } },
  chay: { name: 'Những người trong nhà dệt', img: 'por_chay',
    meta: function (S) { return 'Đêm đốt khung cửi, lửa bén sang nhà dệt. ' + (S.flags.c3_cuu_tu ? 'Bà Tư được Đăng kéo ra. ' : 'Bà Tư không ra kịp. ') + 'Ba cung nữ khác chết cháy.'; },
    ready: function (S) { return !!S.deduce.C3D2; },
    choices: ['Ma giết', 'Người giết: Hoàng hậu Cám', 'Người giết: kẻ châm lửa ba góc', 'Tai nạn'], answer: 2,
    verdict: function (S) { var v = (S.verdict || {}).chay; return v !== undefined ? 'Kết luận: ' + G.DEATHS.chay.choices[v] : (G.DEATHS.chay.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } }
});
// mở lại trang Thầy Cả: giờ đã có thể kết luận
(function () {
  var t = G.DEATHS.thay;
  t.choices = ['Ma giết (vong Tấm)', 'Xác thế mạng: Thầy Cả còn sống', 'Tự tử'];
  t.answer = 1;
  t.ready = function (S) { return S.chapter === 'ch3' && S.deduce.C3D3 && (S.deduce.C3D4 || S.deduce.C3D5); };
  t.verdict = function (S) { var v = (S.verdict || {}).thay; return v !== undefined ? 'Kết luận: ' + t.choices[v] : (t.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); };
})();

(function () {
  var C = G.ch3, W = G.world, $ = G.$, L = G.LOOKS;
  var PH = ['sang', 'chieu', 'toi', 'dem'], PHN = { sang: 'Sáng', chieu: 'Chiều', toi: 'Tối', dem: 'Đêm' };
  L.baTu = { hair: 'khan', khan: '#3A3A3A', hairColor: '#B8B0A0', shirt: '#6A5A7A', skirt: '#2B1F1A', eyes: 'tired' };
  L.nuDet = Object.assign({}, L.nu, { eyes: 'blank', mouth: 'open' });
  function nam(look, rot) { return '<div style="position:absolute;left:0;top:0;transform:scale(.5) rotate(' + (rot || 90) + 'deg);transform-origin:0 -40px">' + G.art.chibi(Object.assign({}, look, { view: 'front' })) + '</div>'; }

  C.begin = async function () {
    var s = G.S;
    s.chapter = 'ch3'; s.day = 1; s.phase = 'sang'; s.beat = 'c3';
    s.inv = s.inv || { nhang: 2, gao: 2, bua: 2 }; s.money = s.money || 4; s.verdict = s.verdict || {};
    if (s.inv.bua < 1) s.inv.bua = 1;
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
    if (G.danger.active) G.danger.stop();
    await G.cut.chuong('Chương 3', 'Khung cửi');
    W.enter('cung_bep', 760, 300);
    C.music(); W.locked = true;
    await G.ui.say([
      { text: 'Ba ngày sau. Khung cửi gỗ xoan đóng xong, đặt trong **nhà dệt** sau giếng giặt.', cls: 'think' },
      { who: 'Lính hầu', text: 'Thầy ơi, dì hoàng hậu cho mời thầy sang nhà dệt làm **lễ an vị** khung cửi mới.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.music = function () {
    var s = G.S;
    if (G.danger.active) { G.audio.music(G.audio.ten('nguy')); return; }
    if (s.phase === 'sang' || s.phase === 'chieu') { G.audio.music(G.audio.ten('ngay')); G.audio.ambience('ngay'); }
    else { G.audio.music(G.audio.ten('dem')); G.audio.ambience('dem'); }
  };

  // ---------- người ----------
  C.npcs = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [], day = p === 'sang' || p === 'chieu';
    if (s.loc === 'nha_det') {
      if (d === 1 && p === 'sang') list.push({ id: 'dighe', look: L.dighe, x: 600, y: 420, view: 'side', flip: -1, label: 'Dì ghẻ' });
      if (d === 1 && day) list.push({ id: 'nu', look: L.nu, x: 480, y: 360, view: 'back', label: 'Nụ' });
      if (d === 1 && day || d === 2 && day) list.push({ id: 'tu', look: L.baTu, x: 300, y: 470, view: 'front', label: 'Bà Tư thợ dệt' });
      if (d === 1 && (p === 'toi' || p === 'dem')) list.push({ id: 'nudem', look: L.nuDet, x: 480, y: 360, view: 'back', label: 'Nụ đang dệt' });
      if (d === 2 && p === 'sang' && !fl.c3_dot) list.push({ id: 'xacnu', html: G.art.xac(L.nu, { rot: 60, chi: true }), x: 470, y: 372, ghost: true });
    }
    if (s.loc === 'cung_gieng') {
      if (d === 2 && p === 'dem' && fl.c3_dot && !fl.c3_chay_xong) list.push({ id: 'cam', look: L.cam, x: 560, y: 470, view: 'side', flip: 1, label: 'Cám' }, { id: 'dighe', look: L.dighe, x: 520, y: 500, view: 'side', flip: 1 });
      if (fl.c3_chay_xong && d === 2) { list.push({ id: 'cam', look: L.cam, x: 560, y: 470, view: 'side', flip: 1, label: 'Cám' }); if (fl.c3_cuu_tu) list.push({ id: 'tu', look: L.baTu, x: 300, y: 470, view: 'front', label: 'Bà Tư' }); }
      if (d === 3 && p === 'sang') list.push({ id: 'linh', look: L.linhTre, x: 760, y: 480, view: 'side', flip: -1, label: 'Lính hốt tro' });
    }
    if (s.loc === 'cung_hau' && day) list.push({ id: 'cam', look: L.cam, x: 480, y: 320, view: 'front', label: 'Cám' });
    if (s.loc === 'cung_san' && (day || p === 'toi')) list.push({ id: 'linhtre', look: L.linhTre, x: 880, y: 320, view: 'front', label: 'Lính gác cổng bắc' });
    if (s.loc === 'cung_bep' && !fl.c1_basau_chet && (day || p === 'toi')) list.push({ id: 'basau', look: L.baSau, x: 220, y: 270, view: 'front', label: 'Bà Sáu bếp' });
    if (s.loc === 'hang_nuoc' && day) list.push({ id: 'bacu', look: L.baCu, x: 360, y: 372, view: 'front', label: 'Bà cụ hàng nước', fixedView: true });
    return list;
  };

  // ---------- đồ vật ----------
  C.things = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [];
    if (s.loc === 'cung_san') {
      list.push({ id: 'cua_dien', x: 480, y: 292, hit: [440, 160, 80, 120], label: 'Vào cung hoàng hậu', door: { to: 'cung_hau', x: 500, y: 520, view: 'back' } });
      list.push({ id: 'cua_bep', x: 124, y: 656, hit: [90, 556, 70, 80], label: 'Vào bếp & phòng Đăng', door: { to: 'cung_bep', x: 460, y: 520, view: 'back' } });
    }
    if (s.loc === 'cung_hau') list.push({ id: 'ra_san', x: 500, y: 530, hit: [460, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 480, y: 310 } });
    if (s.loc === 'cung_bep') {
      list.push({ id: 'ra_san', x: 460, y: 532, hit: [420, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 124, y: 668 } });
      list.push({ id: 'chong', x: 780, y: 240, hit: [706, 160, 150, 62], label: 'Chõng tre: nghỉ' });
      list.push({ id: 'trap', x: 700, y: 452, hit: [654, 380, 92, 56], label: fl.c3_lay_vai && !fl.c3_ky4 ? 'Tấm vải hoa văn' : 'Tráp của thầy', quest: (!s.clues.L15 && (d > 1 || p !== 'sang')) || (fl.c3_lay_vai && !fl.c3_ky4) });
      if (d === 2 && !s.clues.V20 && !fl.c3_giu_tro) list.push({ id: 'tro', x: 160, y: 226, hit: [100, 140, 200, 72], label: 'Tro bếp lò', quest: fl.c3_ra_lenh });
    }
    if (s.loc === 'cung_gieng') {
      if (!fl.c3_chay_xong) list.push({ id: 'cua_det', x: 460, y: 248, hit: [434, 118, 52, 120], label: 'Vào nhà dệt', door: { to: 'nha_det', x: 480, y: 520, view: 'back' } });
      else list.push({ id: 'nha_chay', x: 460, y: 248, hit: [434, 118, 52, 120], label: 'Nhà dệt cháy rụi' });
    }
    if (s.loc === 'nha_det') {
      list.push({ id: 'ra_gieng', x: 480, y: 532, hit: [440, 520, 80, 40], label: 'Ra sân giếng giặt', door: { to: 'cung_gieng', x: 460, y: 262 } });
      if (d === 1 && p === 'sang' && !fl.job_anvi) list.push({ id: 'anvi', x: 480, y: 370, hit: [418, 230, 124, 110], label: 'Lễ an vị khung cửi', quest: true });
      if (d === 2 && p === 'sang' && !fl.c3_lay_vai) list.push({ id: 'vai', x: 480, y: 370, hit: [418, 230, 124, 110], label: 'Tấm vải trên khung cửi', quest: true });
      if (fl.c3_chay && !fl.c3_thoi) list.push({ id: 'thoi', x: 770, y: 296, hit: [700, 160, 140, 110], label: 'Con thoi quấn tóc', quest: true });
      if (fl.c3_chay && !fl.c3_cuu_tu) list.push({ id: 'tu_ket', x: 770, y: 480, label: 'Bà Tư bị kẹt', quest: true });
    }
    if (s.loc === 'hang_nuoc') list.push({ id: 'mua', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Mua đồ nghề', cond: p === 'sang' || p === 'chieu' });
    return list.filter(function (t) { return t.cond !== false; });
  };

  C.objective = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, v = s.verdict || {};
    if (d === 1) {
      if (p === 'sang') return fl.job_anvi ? 'Nghỉ ở chõng tre đến chiều.' : 'Sang **nhà dệt** (cửa giữa dãy nhà sau giếng giặt), làm **lễ an vị** khung cửi.';
      if (p === 'chieu') return !s.clues.L15 ? 'Về phòng, mở **tráp của thầy**. Có một trang sổ tay dán hồ đã bong mép.' : 'Hỏi **Nụ** và **bà Tư** ở nhà dệt. Rồi nghỉ.';
      if (p === 'toi') return 'Nghỉ chờ đêm.';
      return fl.c3_dem1 ? 'Về phòng ngủ.' : 'Sang **nhà dệt**. Có tiếng cót két suốt từ chập tối.';
    }
    if (d === 2) {
      if (p === 'sang') {
        if (!fl.c3_lay_vai) return 'Sang **nhà dệt**. Có chuyện với Nụ.';
        if (!s.clues.V20 && !fl.c3_giu_tro) return 'Xem **tro bếp lò** trong bếp: sáng nay dì ghẻ đốt gì đó. Hỏi **bà Tư**.';
        return 'Nghỉ đến chiều.';
      }
      if (p === 'chieu') return fl.c3_ky4 ? 'Nghỉ chờ đêm.' : 'Về phòng. Mở **mắt âm dương (B)** vào tấm vải hoa văn.';
      if (p === 'toi') return 'Nghỉ chờ đêm. Đêm nay đốt khung cửi ở sân giếng giặt.';
      if (!fl.c3_dot) return 'Ra **sân giếng giặt**.';
      if (!fl.c3_thoat) return 'Chạy vào **nhà dệt**: lấy **con thoi** trước khi khói ngập. Kéo **bà Tư** ra nếu kịp.';
      return 'Nghỉ đến sáng.';
    }
    if (d === 3) {
      if (v.thay === undefined) return 'Mở **Sổ Tử**. Đặt **chữ trong sổ tay của thầy** cạnh các lá bùa, và **nốt ruồi** cạnh cái xác. Rồi kết luận lại trang **Thầy Cả**.';
      return '';
    }
    return '';
  };

  function gate(s) {
    var d = s.day, p = s.phase, fl = s.flags;
    if (d === 1 && p === 'sang' && !fl.job_anvi) return 'Làm lễ an vị khung cửi đã.';
    if (d === 1 && p === 'chieu' && !s.clues.L15) return 'Mở tráp của thầy xem đã.';
    if (d === 1 && p === 'dem' && !fl.c3_dem1) return 'Tiếng cót két ở nhà dệt… phải sang xem.';
    if (d === 2 && p === 'sang' && (!fl.c3_lay_vai || !(s.clues.V20 || fl.c3_giu_tro))) return 'Còn việc sáng nay (tấm vải, tro bếp).';
    if (d === 2 && p === 'chieu' && !fl.c3_ky4) return 'Mở mắt âm dương nhìn tấm vải đã.';
    if (d === 2 && p === 'dem' && !fl.c3_thoat) return 'Lửa! Không ngủ được lúc này.';
    if (d === 3) return 'Trời đã sáng.';
    return null;
  }
  C.gate = function (s) { return gate(s || G.S); };
  C.rest = function () {
    var s = G.S, why = gate(s);
    if (why) { G.ui.dialog([{ text: why, cls: 'think' }]); return; }
    var i = PH.indexOf(s.phase), next = PH[(i + 1) % 4], nd = next === 'sang' ? s.day + 1 : s.day;
    G.ui.dialog([{ text: next === 'sang' ? 'Về phòng ngủ đến sáng hôm sau?' : 'Để thời gian trôi đến ' + PHN[next].toLowerCase() + '?', choices: [
      { text: next === 'sang' ? 'Đi ngủ' : 'Đợi', run: function () { C.toPhase(nd, next); } }, { text: 'Thôi', run: function () {} }] }]);
  };
  C.toPhase = async function (day, ph) {
    var s = G.S;
    await G.ui.fade(function () { s.day = day; s.phase = ph; $('stage').classList.remove('soi'); if (ph === 'sang') W.enter('cung_bep', 760, 300); else W.enter(s.loc, s.x, s.y); });
    C.music();
    await G.ui.card('Ngày ' + day + ' · ' + PHN[ph], '');
    G.save();
    C.wake();
  };
  C.wake = async function () {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (d === 1 && p === 'toi' && !fl.c3_hat) {
      fl.c3_hat = true; W.locked = true;
      G.audio.sfx('mo'); G.audio.sfx('mo', 0.6);
      await G.ui.say([
        { text: 'Chập tối. Từ phía nhà dệt vọng sang tiếng cót két, đều như ai đang đạp go. Rồi tiếng cót két thành tiếng hát.', cls: 'think' },
        { who: 'Khung cửi', text: 'Cót ca cót két, lấy tranh chồng chị, chị khoét mắt ra.', cls: 'verse', sfx: 'stinger', img: 'khung_cui' },
        { text: 'Bên cung hoàng hậu có tiếng thét. Rồi tiếng đóng cửa sầm sầm.', cls: 'think', img: null }
      ]);
      W.locked = false; G.ui.hud(); return;
    }
    if (d === 2 && p === 'sang' && !fl.c3_nu_chet) {
      fl.c3_nu_chet = true; W.locked = true; G.audio.sfx('stinger');
      await G.ui.say([{ who: 'Bà Sáu', text: 'Thầy ơi… nhà dệt… con Nụ…' }]);
      W.locked = false; W.refresh(); G.ui.hud(); return;
    }
    if (d === 2 && p === 'dem') G.ui.toast('Ra **sân giếng giặt**. Người ta sắp đốt khung cửi.', 4000);
    if (d === 3 && p === 'sang') C.sang3();
  };

  C.onEnter = function (loc) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (G.danger.active && G.danger.cfg && G.danger.cfg.loc && G.danger.cfg.loc !== loc) {
      G.danger.stop(); C.music();
      if (loc === 'cung_gieng' && fl.c3_chay && !fl.c3_thoat) setTimeout(C.thoatRa, 300);
    }
    if (loc === 'nha_det' && d === 2 && p === 'sang' && !fl.c3_cam_den) setTimeout(C.camDen, 500);
    if (loc === 'cung_gieng' && d === 2 && p === 'dem' && !fl.c3_dot) setTimeout(C.dot, 400);
    if (loc === 'nha_det' && fl.c3_chay && !fl.c3_thoat && !G.danger.active) C.dangerLua();
  };
  C.canExit = function (dir, to) {
    var s = G.S, p = s.phase;
    if ((p === 'toi' || p === 'dem') && to === 'hang_nuoc') { G.ui.toast('Cổng thành đóng rồi.'); return false; }
    if (s.flags.c3_chay && !s.flags.c3_thoat && s.loc === 'cung_gieng') { G.ui.toast('Nhà dệt đang cháy! Còn con thoi bên trong.'); return false; }
    return true;
  };

  C.act = function (id) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    switch (id) {
      case 'chong': return C.rest();
      case 'anvi': return C.anVi();
      case 'trap': return fl.c3_lay_vai && !fl.c3_ky4 ? C.vai2() : C.soTay();
      case 'tro': return G.ui.dialog([{ text: 'Trong tro bếp lò còn một mẩu giấy bùa cháy dở. Nét ngang nào cũng có [[cái móc nhỏ ở cuối]]. Mực còn mới.', img: 'tro_bua' },
        { who: 'Bà Sáu', text: 'Sáng nay dì hoàng hậu xuống tận bếp đốt một xấp giấy. Già hỏi thì dì bảo thư nhà.', img: 'tro_bua', choices: [
          { text: 'Ghi mẩu giấy vào Sổ Tử', run: function () { G.addClue('V20'); W.refresh(); } },
          { text: '(Gấp mẩu giấy, cất vào ngực áo. Không ghi.)', run: function () { s.flags.bm_giu_bua = true; s.flags.c3_giu_tro = true; G.audio.sfx('paper'); W.refresh(); G.ui.hud(); } }] }]);
      case 'nu': return G.ui.dialog(p === 'sang' ? [{ who: 'Nụ', text: 'Em được giao dệt khung cửi mới. Gỗ thơm lắm thầy ạ. Mà nặng, như có ai ngồi sẵn trên ghế.' }] :
        [{ who: 'Nụ', text: '(nhìn tay) Sợi chỉ cứ tự quấn vào ngón tay em. Gỡ ra lại quấn vào.' }, { who: 'Nụ', text: 'Em không sợ đâu. Cô Tấm hiền lắm. Cô ấy từng cho em cái lược.' }]);
      case 'nudem': return C.nuDem();
      case 'tu':
        if (d === 2 && fl.c3_nu_chet && !fl.c3_chay) return G.ui.dialog([{ who: 'Bà Tư', text: 'Đêm qua nó ngồi dệt một mình. Cửa nhà dệt **cài then từ trong**, sáng ra phải phá cửa mới vào được.', run: function () { G.addClue('L16'); } },
          { who: 'Bà Tư', text: 'Tấm vải nó dệt ra… hoa văn lạ lắm. Như cái nhà, có cả cái giếng.' }]);
        if (fl.c3_chay_xong) return G.ui.dialog([{ who: 'Bà Tư', text: 'Thầy cứu già ra. Già còn nợ thầy cái mạng.' }, { who: 'Bà Tư', text: 'Lúc lửa bùng, già thấy một bóng người áo đen chạy qua cửa sau, tay xách can dầu. Người ấy gõ ba tiếng lên cột, như gõ mõ.' }]);
        return G.ui.dialog([{ who: 'Bà Tư', text: 'Già dệt ở đây bốn chục năm. Chưa thấy khung cửi nào nặng như cái này.' }]);
      case 'dighe': return G.ui.dialog([{ who: 'Dì ghẻ', text: 'Thầy làm lễ cho tử tế. Ta trả bốn đồng.' }]);
      case 'cam':
        if (fl.c3_chay_xong && !s.clues.L18) return G.ui.dialog([{ who: 'Cám', text: '(run rẩy) Ta chỉ ra lệnh đốt khung cửi giữa sân. Ta **không bảo ai đốt nhà dệt**! Ba người… ba người chết rồi…', run: function () { G.addClue('L18'); } }]);
        return G.ui.dialog([{ who: 'Cám', text: d >= 2 ? 'Đốt nó đi. Đêm nào nó cũng hát cái câu ấy…' : 'Khung cửi ấy là mẹ ta đặt đóng. Ta không muốn nhìn thấy nó.' }]);
      case 'vai': return C.layVai();
      case 'thoi': return C.layThoi();
      case 'tu_ket': return C.cuuTu();
      case 'nha_chay': return G.ui.dialog([{ text: 'Nhà dệt chỉ còn khung cột đen. Mùi dầu đèn còn nồng.', cls: 'think' }]);
      case 'linh': return G.ui.dialog([{ who: 'Lính', text: 'Lệnh trên: hốt hết tro, chia ba túi, rắc ba ngả sông. Một hạt cũng không được sót.' }]);
      case 'basau': return G.ui.dialog([{ who: 'Bà Sáu', text: d === 2 ? 'Dì hoàng hậu xuống bếp đốt giấy từ sáng sớm. Lạ thật.' : 'Thầy ăn gì chưa?' }]);
      case 'linhtre': return G.ui.dialog([{ who: 'Lính gác', text: 'Đêm nay đốt khung cửi. Bọn em được lệnh khiêng ra sân giếng giặt.' }]);
      case 'bacu': return G.ui.dialog([{ who: 'Bà cụ', text: 'Khung cửi hát à? Già nghe rồi. Cả kinh thành nghe.' }, { who: 'Bà cụ', text: 'Thầy cứ nhớ: **ăn quả nhớ kẻ trồng cây**. Sắp có quả rồi đấy.' }]);
      case 'mua': return G.ch1.shop();
    }
  };

  // ---------- ngày 1 ----------
  C.anVi = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([{ who: 'Dì ghẻ', text: 'Thầy vẽ lá bùa an vị dán lên khung cửi. Từ nay hoàng hậu dệt trên khung này.' }]);
    if (s.inv.bua < 1) { s.inv.bua = 1; G.ui.toast('Dì ghẻ đưa cho một tờ giấy bùa.'); }
    s.inv.bua--; G.ui.hud();
    await G.mg.bua({ title: 'Bùa an vị', hint: 'Tô theo nét mờ. Khi Đăng vẽ, cái khung cửi khẽ cót két một tiếng.' });
    fl.job_anvi = true; s.money += 4; G.audio.sfx('clue'); G.ui.hud();
    await G.ui.say([
      { text: 'Đăng dán lá bùa lên trụ khung cửi. Lá bùa [[tự quăn mép lại]], như bị hơ lửa.', sfx: 'stinger' },
      { who: 'Dì ghẻ', text: 'Bốn đồng của thầy. Nụ, từ hôm nay em dệt khung này.' },
      { who: 'Nụ', text: 'Dạ.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.soTay = async function () {
    var s = G.S;
    if (s.clues.L15) return G.ui.dialog([{ text: 'Sổ tay của thầy. Các trang còn lại vẫn dán kín.', img: 'so_tay' }]);
    W.locked = true;
    await G.ui.say([
      { text: 'Trong tráp, cuốn sổ tay của thầy. Mép một trang dán hồ đã bong ra vì ẩm.', sfx: 'paper' },
      { text: 'Bên trong là những dòng chữ của thầy. Nét ngang nào cũng có [[một cái móc nhỏ ở cuối]]. Đăng nhìn nét chữ ấy mười năm nay.', img: 'so_tay', run: function () { G.addClue('L15'); } },
      { who: 'Đăng', text: '(Thầy hay đùa: nốt ruồi chờ lộc bên tai trái của thầy là để kiếm tiền, còn cái móc cuối nét là để giữ tiền.)', cls: 'think', img: null, run: function () { G.addClue('L14'); } }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.nuDem = async function () {
    var s = G.S, fl = s.flags;
    if (fl.c3_dem1) return;
    W.locked = true;
    await G.ui.say([
      { text: 'Nụ ngồi trước khung cửi gỗ xoan. Hai chân đạp go đều đều. Mắt trắng dã.', sfx: 'stinger' },
      { text: 'Mười ngón tay Nụ [[rách toạc]]. Máu thấm đỏ cả sợi ngang. Nụ vẫn dệt.', img: 'ngon_tay' },
      { who: 'Đăng', text: 'Nụ! Dừng lại!', img: null }
    ]);
    await G.mg.hold('Kéo Nụ ra khỏi khung cửi', 3);
    G.audio.sfx('crack'); W.shake();
    await G.ui.say([
      { text: 'Đăng kéo được Nụ ra. Nhưng [[những sợi chỉ trên khung cửi bật lên]], quấn lại quanh cổ Nụ, kéo Nụ về chỗ ngồi.', sfx: 'stinger' },
      { text: 'Khung cửi hát. Đèn tắt.', sfx: 'whoosh', img: 'khung_cui' }
    ]);
    fl.c3_dem1 = true;
    await G.ui.fade(function () { W.enter('cung_bep', 760, 300); });
    W.locked = true;
    await G.ui.say([{ who: 'Đăng', text: '(Mình tỉnh dậy trên chõng. Không nhớ đã về bằng cách nào.)', cls: 'think' }]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- ngày 2 ----------
  C.camDen = async function () {
    var s = G.S, fl = s.flags; if (fl.c3_cam_den) return; fl.c3_cam_den = true;
    W.locked = true;
    await G.ui.say([
      { text: 'Nụ gục trên khung cửi gỗ xoan. Sợi chỉ thắt ba vòng quanh cổ. Mười ngón tay không còn móng.', sfx: 'stinger', run: function () { G.addDeath('nu'); } },
      { who: 'Cám', text: '(đứng ở cửa, không dám vào) Đốt nó đi. **Tối nay đốt nó giữa sân.**' },
      { who: 'Dì ghẻ', text: 'Đốt xong thì hốt tro. **Rắc thật xa, mỗi ngả sông một nắm.** Không để sót một hạt.', run: function () { G.addClue('L17'); fl.c3_ra_lenh = true; } },
      { who: 'Đăng', text: '(Rắc tro ba ngả. Ai dạy dì ghẻ điều đó? Đấy là cách của thầy pháp.)', cls: 'think' }
    ]);
    W.locked = false; W.refresh(); G.ui.hud(); G.save();
  };
  C.layVai = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([
      { text: 'Tấm vải Nụ dệt suốt đêm còn trên trục. Hoa văn không giống hoa văn nào: [[như sơ đồ một ngôi nhà ba gian]], có dấu chéo đỏ ở gian giữa, cạnh có một cái giếng.', img: 'vai_hoavan', run: function () { G.addClue('V19'); } },
      { who: 'Đăng', text: '(Nhà ba gian, giếng bên trái… Nhà dì ghẻ ở làng Đông? Dấu chéo ở gian thờ.)', cls: 'think', img: 'vai_hoavan' },
      { text: 'Đăng cắt tấm vải, cuộn lại mang về phòng.', img: null }
    ]);
    fl.c3_lay_vai = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.vai2 = function () {
    if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Tấm vải hoa văn. Sợi vải ấm như còn hơi người. Bấm **B** để mở mắt âm dương mà nhìn.', img: 'vai_hoavan' }]);
    G.memory4.enter();
  };
  C.afterKy4 = async function () {
    var s = G.S;
    s.flags.c3_ky4 = true; G.addClue('V21');
    W.refresh(); W.locked = true; C.music();
    await G.ui.say([{ who: 'Đăng', text: '(Tiếng rìu ấy đều như tiếng mõ. Ai dạy người cầm rìu chặt đều như thế?)', cls: 'think' }]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- đêm 2: đốt khung cửi, cháy nhà dệt ----------
  C.dot = async function () {
    var s = G.S, fl = s.flags; if (fl.c3_dot) return;
    W.locked = true;
    fl.c3_dot = true; W.refresh(); W.locked = true;
    G.audio.sfx('whoosh');
    await G.ui.say([
      { text: 'Lính khiêng khung cửi gỗ xoan ra giữa sân, chất củi, tưới dầu. Cám đứng xa, tay bịt tai.', cls: 'think' },
      { text: 'Lửa bén. Trong ngọn lửa, khung cửi [[hát lần cuối]], tiếng hát cao vút rồi đứt.', sfx: 'stinger', img: 'khung_chay' }
    ]);
    await G.cut.play([
      { ve: 'nhaDetChay', chu: 'Rồi phía sau lưng mọi người…', dur: 2200, cam: [1.35, 0, 40, 1.2, 0, 20], sfx: 'whoosh', nhac: 'cao_trao' },
      { ve: 'nhaDetChay', chu: 'Nhà dệt bùng cháy. **Cùng một lúc, ở ba góc.**', dur: 3600, cam: [1.2, 0, 20, 1, 0, 0], sfx: ['fall', 'lua'], rung: true, chop: 'do', hieu: 'tan' },
      { ve: 'nhaDetChay', noi: 'Bà Tư', mood: 'so', chu: '(trong nhà dệt) Cứu… cứu với…', dur: 2600, hieu: 'tan', cam: [1, 0, 0, 1.12, 0, -10] }
    ]);
    fl.c3_chay = true;
    await G.ui.say([
      { text: 'Rồi phía sau lưng mọi người, [[nhà dệt bùng cháy]]. Không phải từ đống lửa giữa sân.', sfx: 'crack' },
      { who: 'Bà Tư', text: '(trong nhà dệt) Cứu… cứu với…' },
      { who: 'Đăng', text: '(Con thoi của khung cửi xoan còn trong đó! Và bà Tư!)', cls: 'think' }
    ]);
    W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  // lửa lan từ ba góc, khói dâng: đồng hồ khói 75 giây
  C.dangerLua = function () {
    var s = G.S;
    var fires = [{ x: 80, y: 140, r: 70 }, { x: 880, y: 140, r: 70 }, { x: 80, y: 540, r: 70 }], khoi = 0, MAX = 75, tick = 0;
    G.danger.start({ loc: 'nha_det',
      tick: function (dt) {
        khoi += dt;
        fires.forEach(function (f) { f.r = Math.min(330, f.r + dt * 4); });
        tick -= dt; if (tick <= 0) { tick = 0.7; G.audio.sfx('crack'); }
        var S = G.S;
        for (var i = 0; i < fires.length; i++) if (Math.hypot(S.x - fires[i].x, (S.y - fires[i].y) * 1.2) < fires[i].r - 16) { G.die('Lửa liếm vào vạt áo. Đăng không chạy ra kịp.'); return true; }
        if (khoi >= MAX) { G.die('Khói đặc như bùn. Đăng ngạt thở giữa nhà dệt.'); return true; }
        if (!s.flags.c3_ba_goc && khoi > 1.5) { s.flags.c3_ba_goc = true; G.addClue('V22'); G.ui.toast('Lửa bùng ở **ba góc cùng lúc**. Góc nào cũng có can dầu đổ sẵn.', 4200); }
        return false;
      },
      draw: function (ctx, sx, sy, z) {
        var a = Math.min(0.7, khoi / MAX * 0.75), W2 = ctx.canvas.width, H2 = ctx.canvas.height;
        ctx.fillStyle = 'rgba(40,34,32,' + a.toFixed(2) + ')'; ctx.fillRect(0, 0, W2, H2); // khói phủ trước, lửa sáng đè lên
        ctx.globalCompositeOperation = 'lighter';
        fires.forEach(function (f, i) {
          var x = sx(f.x), y = sy(f.y), rr = f.r * z * (0.95 + Math.random() * 0.08);
          var g = ctx.createRadialGradient(x, y, 0, x, y, rr);
          g.addColorStop(0, 'rgba(255,240,160,.95)'); g.addColorStop(.35, 'rgba(255,150,40,.85)'); g.addColorStop(.75, 'rgba(200,60,10,.45)'); g.addColorStop(1, 'rgba(120,20,0,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill();
          // lưỡi lửa liếm lên
          for (var k = 0; k < 9; k++) {
            var ang = (k / 9) * Math.PI * 2 + i, px = x + Math.cos(ang) * rr * 0.6, py = y + Math.sin(ang) * rr * 0.5, hh = 30 + Math.random() * 50;
            ctx.fillStyle = 'rgba(255,' + (120 + Math.random() * 100 | 0) + ',30,.55)';
            ctx.beginPath(); ctx.moveTo(px - 12, py); ctx.quadraticCurveTo(px + (Math.random() - .5) * 20, py - hh, px + 12, py); ctx.fill();
          }
        });
        // tàn lửa bay
        for (var e = 0; e < 26; e++) {
          ctx.fillStyle = 'rgba(255,' + (160 + Math.random() * 80 | 0) + ',60,' + (0.4 + Math.random() * .5).toFixed(2) + ')';
          ctx.fillRect(Math.random() * W2, Math.random() * H2, 2 + Math.random() * 2, 2 + Math.random() * 2);
        }
        ctx.globalCompositeOperation = 'source-over';
        var w = 260, x0 = (W2 - w) / 2;
        ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(x0 - 4, 54, w + 8, 18);
        ctx.fillStyle = khoi / MAX > 0.7 ? '#E05A4A' : '#C8C0B0'; ctx.fillRect(x0, 58, w * (1 - khoi / MAX), 10);
        ctx.fillStyle = '#F3EEDF'; ctx.font = 'bold 12px sans-serif'; ctx.fillText('Khói còn ' + Math.max(0, Math.ceil(MAX - khoi)) + ' giây', x0, 50);
      },
      lights: function () { return fires.map(function (f) { return { x: f.x, y: f.y, r: f.r + 140, flick: true }; }); },
      restart: function () { C.dangerLua(); } });
    C.music();
    G.ui.toast('Lấy **con thoi** ở khung cửi cũ góc đông bắc. Tránh lửa. Thoát ra bằng cửa phía nam.', 5000);
  };
  C.layThoi = function () {
    var s = G.S;
    G.danger.holdAt({ x: 770, y: 296 }, 2, async function () {
      s.flags.c3_thoi = true; s.items.con_thoi = true; G.audio.sfx('clue');
      G.ui.closeup('thoi_toc'); setTimeout(function () { G.ui.closeup(null); }, 1500);
      G.ui.toast('Đã lấy **con thoi**. Sợi tóc quấn quanh nó [[ấm như tóc người sống]].', 4000);
      var cp = JSON.parse(G.danger.checkpoint); cp.flags.c3_thoi = true; cp.items.con_thoi = true; G.danger.checkpoint = JSON.stringify(cp);
      G.ui.hud();
    });
  };
  C.cuuTu = function () {
    var s = G.S;
    G.danger.holdAt({ x: 770, y: 480 }, 2.5, function () {
      s.flags.c3_cuu_tu = true; G.audio.sfx('thud');
      G.ui.toast('Đã kéo **bà Tư** dậy. Đưa bà ra cửa phía nam!', 3500);
      var cp = JSON.parse(G.danger.checkpoint); cp.flags.c3_cuu_tu = true; G.danger.checkpoint = JSON.stringify(cp);
      G.ui.hud();
    });
  };
  C.thoatRa = async function () {
    var s = G.S, fl = s.flags;
    if (!fl.c3_thoi) { // ra mà chưa có con thoi: quay vào được, lửa vẫn cháy
      G.ui.toast('Chưa lấy được con thoi! Vào lại nhà dệt.'); return;
    }
    fl.c3_thoat = true; fl.c3_chay_xong = true;
    W.refresh(); W.locked = true; C.music();
    await G.ui.say([
      { text: 'Đăng lao ra khỏi nhà dệt. Sau lưng, mái nhà sụp xuống.', sfx: 'fall' },
      fl.c3_cuu_tu ? { who: 'Bà Tư', text: '(ho sặc sụa) Thầy… thầy cứu già…' } : { text: 'Bà Tư không ra kịp.', cls: 'think' },
      { text: 'Ba cung nữ khác ngủ ở gian sau không ai ra được.', run: function () { G.addDeath('chay'); } }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- ngày 3 ----------
  C.sang3 = async function () {
    W.locked = true;
    await G.ui.say([
      { text: 'Sáng. Lính hốt tro khung cửi và tro nhà dệt, chia làm ba túi, mang đi ba ngả sông.', cls: 'think' },
      { who: 'Đăng', text: '(Con thoi vẫn trong tráp. Còn sợi tóc quấn quanh nó… vẫn ấm.)', cls: 'think' },
      { who: 'Đăng', text: '(Nốt ruồi. Nét móc cuối chữ. Tiếng rìu đều như mõ. Phải ghép lại cho rõ.)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud();
  };
  C.onVerdict = async function (id, k) {
    var s = G.S, d = G.DEATHS[id], dung = k === d.answer;
    s.verdict[id] = k; s.flags['c3_' + id] = dung ? 'dung' : 'sai'; G.save();
    var txt = {
      nu: dung ? '(Không ai vào nhà dệt. Thứ dệt qua tay Nụ là cô ấy. Cô ấy đang giết người vô tội.)' : '(…Mình chắc chứ?)',
      chay: dung ? '(Ba góc, ba can dầu. Có người lợi dụng đêm đốt khung cửi để đốt cả nhà dệt.)' : '(…Mình có bỏ sót gì không?)',
      thay: dung ? '' : '(…Hay mình chỉ không muốn tin.)'
    }[id];
    if (txt) await G.ui.say([{ who: 'Đăng', text: txt, cls: 'think' }]);
    G.ui.hud();
    if (id === 'thay') C.ket(dung);
  };

  C.ket = async function (dung) {
    var s = G.S, fl = s.flags;
    if (fl.c3_het) return;
    W.locked = true;
    await G.ui.say(dung ? [
      { who: 'Đăng', text: '(Cái xác trên ngọn cau không có nốt ruồi. Lá bùa trong hộp ngải là chữ thầy. Giấy dì ghẻ đốt sáng qua, mực còn mới.)', cls: 'think' },
      { who: 'Đăng', text: '(Thầy còn sống.)', cls: 'think', sfx: 'stinger' },
      { who: 'Đăng', text: '(Thầy bán ngải cho dì ghẻ. Thầy dạy bà rắc tro ba ngả. Và thầy là người đứng ngoài cửa buồng, gõ mõ, nhìn Tấm chôn xương Bống.)', cls: 'think' },
      { who: 'Đăng', text: '(Lọ xương thứ tư. Thầy lấy nó để làm gì?)', cls: 'think' }
    ] : [
      { who: 'Đăng', text: '(Thầy chết rồi. Mình chôn thầy trong lòng rồi. Đừng nghĩ nữa.)', cls: 'think' },
      { text: 'Nhưng nét móc cuối chữ vẫn hiện lên mỗi khi Đăng nhắm mắt.', cls: 'think' }
    ]);
    await G.ui.say([
      { who: 'Bà cụ', text: '(Đăng gặp bà ở cổng thành) Thầy biết chưa? Ở bìa rừng phía tây, người ta thấy **một cây thị** mọc lên ở chỗ lính đổ tro. Cả cây chỉ có **một quả**.' },
      { who: 'Bà cụ', text: 'Quả thị ấy… già muốn có nó.' }
    ]);
    fl.c3_het = true; G.save();
    G.audio.music('title');
    var nD = G.DEDUCE.filter(function (x) { return s.deduce[x.id]; }).length;
    var sai = Object.keys(s.verdict).filter(function (k) { return G.DEATHS[k] && s.verdict[k] !== G.DEATHS[k].answer; }).length;
    await G.ui.card('Hết chương 3', 'Sổ Tử: ' + Object.keys(s.clues).length + ' manh mối · ' + nD + '/' + G.DEDUCE.length +
      ' phép đối chiếu · kết luận sai ' + sai + ' trang · Đăng đã chết ' + (s.deaths || 0) + ' lần.' + (fl.c3_cuu_tu ? '<br>Bà Tư còn sống.' : ''), 'Sang Chương 4 ›');
    W.locked = false;
    G.ch4.begin();
  };
})();
