// Kịch bản CHƯƠNG 5: Nồi nước sôi. Cao trào và bốn kết. Xem docs/dac-ta-ch5.md.
var G = window.G || (window.G = {});
G.ch5 = {};

Object.assign(G.CLUES, {
  L24: { type: 'L', title: 'Bà cụ: hũ không để trống', text: 'Lấy nửa hồn ra thì phải có hồn khác thay vào: người cùng nhà, đúng ngày sinh. Ba lọ xương Bống là thứ duy nhất đập vỡ được hũ.' },
  L25: { type: 'L', title: 'Tấm: muốn trắng thì tắm nước sôi', text: 'Cám hỏi chị làm sao mà trắng đẹp. Tấm cười, mắt không chớp: "Tắm nước sôi, em ạ."' },
  V28: { type: 'V', title: 'Hố đào sẵn có bậc', text: 'Cái hố cạnh gốc xoan giờ có bậc đất đi xuống. Ba ông đầu rau kê sẵn ngay miệng hố.' },
  V29: { type: 'V', title: 'Đáy hũ khắc ngày sinh', text: 'Đáy hũ sành khắc: giờ Dậu, mùng chín tháng chín. Ngày sinh của Cám.' }
});
G.DEDUCE.push(
  { id: 'C5D1', a: 'L24', b: 'V29', title: 'Hồn thay vào hũ là Cám', text: 'Người cùng nhà, đúng ngày sinh. [[Thầy Cả cần hồn Cám để lấp vào hũ.]]' },
  { id: 'C5D2', a: 'L25', b: 'V28', title: 'Cám sẽ bị dụ xuống hố', text: 'Bậc đất, bếp kê sẵn, lời dỗ "tắm nước sôi". [[Đêm nay.]]' }
);

(function () {
  var C = G.ch5, W = G.world, $ = G.$, L = G.LOOKS;
  var PHN = { sang: 'Sáng', chieu: 'Chiều', toi: 'Tối', dem: 'Đêm' };
  L.tamHau = { hair: 'long', shirt: '#D9A93A', skirt: '#B84A3E', eyes: 'big', mouth: 'smile', blush: true };
  var KETS = { 1: 'Như cổ tích', 2: 'Muộn một nén nhang', 3: 'Chuyện chưa kể', 4: 'Đệ tử chân truyền' };

  function sai(s) { return Object.keys(s.verdict || {}).filter(function (k) { return G.DEATHS[k] && G.DEATHS[k].answer !== undefined && s.verdict[k] !== G.DEATHS[k].answer; }).length; }
  C.sai = sai;
  C.biMat = function (s) { return !!(s.flags.bm_giu_bua && s.flags.bm_da_thay && (s.items.lo_xuong || 0) >= 3); };

  C.begin = async function () {
    var s = G.S;
    s.chapter = 'ch5'; s.day = 1; s.phase = 'sang'; s.beat = 'c5';
    s.inv = s.inv || { nhang: 2, gao: 2, bua: 2 }; s.money = s.money || 4; s.verdict = s.verdict || {};
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
    if (G.danger.active) G.danger.stop();
    await G.cut.chuong('Chương 5', 'Nồi nước sôi');
    W.enter('hang_nuoc', 640, 520);
    C.music();
    C.vuaDen();
  };
  C.music = function () {
    var s = G.S;
    if (G.danger.active) { G.audio.music(G.audio.ten('nguy')); return; }
    if (s.phase === 'sang' || s.phase === 'chieu') { G.audio.music(G.audio.ten('ngay')); G.audio.ambience('ngay'); }
    else { G.audio.music(G.audio.ten('dem')); G.audio.ambience('dem'); }
  };

  // ---------- người ----------
  C.npcs = function (s) {
    var p = s.phase, fl = s.flags, list = [], day = p === 'sang' || p === 'chieu';
    if (s.loc === 'hang_nuoc' && day) {
      list.push({ id: 'bacu', look: L.baCu, x: 360, y: 372, view: 'front', label: 'Bà cụ hàng nước', fixedView: true });
      if (!fl.c5_vua_di) { list.push({ id: 'vua', look: L.vua, x: 760, y: 500, view: 'side', flip: -1, label: 'Nhà vua' }); list.push({ id: 'tam', look: L.tamHau, x: 600, y: 470, view: 'front', cls: 'noblink', label: 'Tấm' }); }
    }
    if (s.loc === 'cung_hau' && p === 'chieu') list.push({ id: 'tam', look: L.tamHau, x: 560, y: 330, view: 'front', cls: 'noblink', label: 'Tấm' }, { id: 'cam', look: L.cam, x: 420, y: 330, view: 'side', flip: 1, label: 'Cám' });
    if (s.loc === 'cung_bep' && !fl.c1_basau_chet && (day || p === 'toi')) list.push({ id: 'basau', look: L.baSau, x: 220, y: 270, view: 'front', label: 'Bà Sáu bếp' });
    if (s.loc === 'cung_san' && (day || p === 'toi')) list.push({ id: 'linhtre', look: L.linhTre, x: 880, y: 320, view: 'front', label: 'Lính gác cổng bắc' });
    if (s.loc === 'cung_vuon' && p === 'dem' && !fl.c5_het) {
      list.push({ id: 'tam', look: fl.c5_pha ? Object.assign({}, L.tamHau, { mouth: 'sad' }) : L.tamHau, x: 680, y: 610, view: 'side', flip: 1, cls: fl.c5_pha ? '' : 'noblink', ghost: true, label: 'Tấm' });
      if (!fl.c5_cam) list.push({ id: 'cam_ho', look: Object.assign({}, L.cam, { prop: null, eyes: 'big', mouth: 'open' }), x: 730, y: 652, view: 'front', ghost: true });
      else list.push({ id: 'cam_len', look: Object.assign({}, L.cam, { prop: null }), x: 800, y: 600, view: 'side', flip: -1, ghost: true });
      if (!fl.c5_bat_dau) list.push({ id: 'thay_mo', look: L.thay, x: 520, y: 560, view: 'side', flip: 1, label: 'Thầy Cả' });
    }
    return list;
  };

  // ---------- đồ vật ----------
  C.things = function (s) {
    var p = s.phase, fl = s.flags, list = [];
    if (s.loc === 'cung_san') {
      list.push({ id: 'cua_dien', x: 480, y: 292, hit: [440, 160, 80, 120], label: 'Vào cung hoàng hậu', door: { to: 'cung_hau', x: 500, y: 520, view: 'back' } });
      list.push({ id: 'cua_bep', x: 124, y: 656, hit: [90, 556, 70, 80], label: 'Vào bếp & phòng Đăng', door: { to: 'cung_bep', x: 460, y: 520, view: 'back' } });
    }
    if (s.loc === 'cung_hau') list.push({ id: 'ra_san', x: 500, y: 530, hit: [460, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 480, y: 310 } });
    if (s.loc === 'cung_bep') {
      list.push({ id: 'ra_san', x: 460, y: 532, hit: [420, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 124, y: 668 } });
      list.push({ id: 'chong', x: 780, y: 240, hit: [706, 160, 150, 62], label: 'Chõng tre: nghỉ' });
      if (s.items.hu_sanh && !s.clues.V29) list.push({ id: 'hu', x: 700, y: 452, hit: [654, 380, 92, 56], label: 'Hũ sành trong tráp', quest: p === 'chieu' });
    }
    if (s.loc === 'cung_vuon') {
      if (p !== 'dem' && !s.clues.V28) list.push({ id: 'ho', x: 730, y: 616, hit: [694, 620, 72, 40], label: 'Cái hố cạnh gốc xoan', quest: p === 'chieu' });
      if (p === 'dem' && fl.c5_bat_dau && !fl.c5_pha && s.items.hu_sanh) list.push({ id: 'pha_hu', x: 640, y: 604, label: 'Đập hũ sành bằng ba lọ xương', quest: true });
      if (p === 'dem' && fl.c5_bat_dau && !fl.c5_cam) list.push({ id: 'keo_cam', x: 730, y: 616, label: 'Thả chỉ đỏ kéo Cám lên', quest: true });
    }
    if (s.loc === 'hang_nuoc') list.push({ id: 'mua', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Mua đồ nghề', cond: p === 'sang' || p === 'chieu' });
    return list.filter(function (t) { return t.cond !== false; });
  };

  C.objective = function (s) {
    var p = s.phase, fl = s.flags;
    if (p === 'sang') return fl.c5_vua_di ? 'Về cung. Nghỉ ở chõng tre đến chiều.' : '';
    if (p === 'chieu') {
      var can = [];
      if (!s.clues.L25) can.push('hỏi **Cám** ở cung hoàng hậu');
      if (!s.clues.V28) can.push('xem **cái hố** cạnh gốc xoan (vườn ngự)');
      if (s.items.hu_sanh && !s.clues.V29) can.push('lật **đáy hũ sành** trong tráp');
      return can.length ? 'Trước đêm nay: ' + can.join(', ') + '.' : 'Đối chiếu trong Sổ Tử. Rồi nghỉ chờ đêm.';
    }
    if (p === 'toi') return 'Nghỉ chờ đêm.';
    if (!fl.c5_bat_dau) return 'Ra **vườn ngự**.';
    var v = [];
    if (s.items.hu_sanh && !fl.c5_pha) v.push('**đập hũ** bên nồi nước');
    if (!fl.c5_cam) v.push('**thả chỉ đỏ** kéo Cám lên');
    return 'Trước khi tàn ba nén nhang: ' + (v.join(' và ') || 'xong rồi') + '. Tránh vùng nhìn của Thầy Cả. Đừng làm vong thức.';
  };

  function gate(s) {
    var p = s.phase, fl = s.flags;
    if (p === 'sang' && !fl.c5_vua_di) return 'Chưa đâu.';
    if (p === 'chieu' && (!s.clues.L25 || !s.clues.V28)) return 'Còn việc phải làm trước đêm nay.';
    if (p === 'dem') return 'Không ngủ được nữa.';
    return null;
  }
  C.gate = function (s) { return gate(s || G.S); };
  C.rest = function () {
    var s = G.S, why = gate(s);
    if (why) { G.ui.dialog([{ text: why, cls: 'think' }]); return; }
    var next = { sang: 'chieu', chieu: 'toi', toi: 'dem' }[s.phase];
    G.ui.dialog([{ text: 'Để thời gian trôi đến ' + PHN[next].toLowerCase() + '?', choices: [{ text: 'Đợi', run: function () { C.toPhase(next); } }, { text: 'Thôi', run: function () {} }] }]);
  };
  C.toPhase = async function (ph) {
    var s = G.S;
    await G.ui.fade(function () { s.phase = ph; $('stage').classList.remove('soi'); W.enter(s.loc, s.x, s.y); });
    C.music();
    await G.ui.card('Ngày mười sáu · ' + PHN[ph], ph === 'dem' ? 'Quạ kéo về đậu kín mái cung.' : '');
    G.save();
    if (ph === 'dem') { G.audio.sfx('crow'); G.audio.sfx('crow', 0.7); G.ui.toast('Ra **vườn ngự**.'); }
  };
  C.canExit = function (dir, to) {
    var s = G.S;
    if (to === 'cho_am') { G.ui.toast('Không còn việc gì ở rừng.'); return false; }
    if (s.phase === 'dem' && s.loc === 'cung_vuon' && s.flags.c5_bat_dau && !s.flags.c5_het) { G.ui.toast('Không bỏ đi lúc này được.'); return false; }
    if (s.phase !== 'sang' && s.phase !== 'chieu' && to === 'hang_nuoc') { G.ui.toast('Cổng thành đóng rồi.'); return false; }
    return true;
  };
  C.onEnter = function (loc) {
    var s = G.S;
    if (loc === 'cung_vuon' && s.phase === 'dem' && !s.flags.c5_bat_dau) setTimeout(C.caoTrao, 400);
    if (loc === 'cung_vuon' && s.phase === 'dem' && s.flags.c5_bat_dau && !s.flags.c5_het && !G.danger.active) C.dangerCuoi();
  };

  C.act = function (id) {
    var s = G.S, fl = s.flags;
    switch (id) {
      case 'chong': return C.rest();
      case 'mua': return G.ch4 ? G.ch4.shop() : G.ch1.shop();
      case 'bacu': return G.ui.dialog([{ who: 'Bà cụ', text: 'Nhớ lời già: ba lọ xương đập vào hũ. Chỉ đỏ thì buộc vào cổ tay người sống mà kéo.' }]);
      case 'basau': return G.ui.dialog([{ who: 'Bà Sáu', text: 'Bà hoàng hậu mới về sai bếp nhóm lửa từ chiều, bắc **một nồi nước thật to** ra vườn ngự. Già chẳng hiểu để làm gì.' }]);
      case 'linhtre': return G.ui.dialog([{ who: 'Lính gác', text: 'Quạ ở đâu kéo về đậu kín mái, đuổi không đi. Thầy ơi, đêm nay có chuyện gì phải không?' }]);
      case 'tam': return G.ui.dialog([{ who: 'Tấm', text: s.phase === 'dem' ? '…' : 'Thầy cúng. Ta nhớ thầy. Thầy đứng ngoài cửa buồng hôm ta chôn xương Bống.' }, { text: 'Cô cười. Mắt không chớp lấy một lần.', cls: 'think' }]);
      case 'cam': return C.camHoi();
      case 'ho': return G.ui.dialog([{ text: 'Cái hố đào sẵn từ hôm trước giờ có [[bậc đất đi xuống]]. Ngay miệng hố kê sẵn ba ông đầu rau.', img: 'ho_dao', run: function () { G.addClue('V28'); } }]);
      case 'hu': return G.ui.dialog([{ text: 'Đăng lật cái hũ. Dưới đáy, quanh lọ xương Bống, có khắc một dòng chữ nhỏ: [[giờ Dậu, mùng chín tháng chín]]. Ngày sinh của Cám.', img: 'day_hu', run: function () { G.addClue('V29'); } }]);
      case 'thay_mo': return;
      case 'pha_hu': return C.phaHu();
      case 'keo_cam': return C.keoCam();
    }
  };

  // ---------- sáng: vua nhận ra Tấm ----------
  C.vuaDen = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([
      { text: 'Sáng mười sáu. Đoàn xa giá của vua dừng trước hàng nước ngoài cổng thành.', cls: 'think' },
      { who: 'Nhà vua', text: 'Bà cụ cho ta bát nước. Miếng trầu này ai têm? Cánh phượng… chỉ một người têm được như thế.' },
      { who: 'Bà cụ', text: 'Con gái già têm đấy ạ.' },
      { text: 'Từ cửa sau quán bước ra một người con gái. Vua đứng sững.', sfx: 'bell', img: 'thi_mo' },
      { who: 'Nhà vua', text: 'Tấm…' },
      { who: 'Tấm', text: 'Bệ hạ.' },
      { text: 'Cô đẹp hơn ngày trước. Cô cười. [[Đôi mắt cô không chớp lấy một lần.]]', cls: 'think' }
    ]);
    $('stage').classList.add('soi');
    await G.ui.say([{ text: 'Qua mắt âm dương: người Tấm [[chỉ có một nửa]]. Nửa kia trong suốt như sương.', img: 'tam_nua', sfx: 'stinger' }]);
    $('stage').classList.remove('soi');
    await G.ui.say([
      { who: 'Bà cụ', text: '(nói khẽ với Đăng) Thấy chưa. Mới về được một nửa. Nửa kia còn trong hũ.' },
      { who: 'Bà cụ', text: 'Nhớ cho già: **hũ không để trống được**. Lấy nửa hồn ra thì phải có hồn khác thay vào, người cùng nhà, đúng ngày sinh.', run: function () { G.addClue('L24'); } },
      { who: 'Bà cụ', text: 'Ba lọ xương Bống là thứ duy nhất đập vỡ được hũ. Còn chỉ đỏ thì buộc vào cổ tay người sống mà kéo.' },
      { who: 'Đăng', text: s.items.hu_sanh ? '(Cái hũ… đang nằm trong tráp của mình.)' : '(Cái hũ… mình đã để lại dưới bàn thờ.)', cls: 'think' }
    ]);
    fl.c5_vua_di = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.camHoi = async function () {
    var s = G.S;
    if (s.phase !== 'chieu') return G.ui.dialog([{ who: 'Cám', text: '…' }]);
    if (s.clues.L25) return G.ui.dialog([{ who: 'Cám', text: 'Chị bảo tối nay chị tắm cho ta. Thầy… thầy nghĩ ta có nên không?' }]);
    W.locked = true;
    await G.ui.say([
      { who: 'Cám', text: 'Chị Tấm ơi, chị dầm sương dãi nắng, đi vắng lâu thế, sao giờ chị trắng thế?' },
      { who: 'Tấm', text: '(cười, mắt không chớp) Em muốn trắng thì chị giúp. **Tắm nước sôi, em ạ.**', run: function () { G.addClue('L25'); } },
      { who: 'Cám', text: '…Tối nay ạ?' },
      { who: 'Tấm', text: 'Tối nay. Ở vườn ngự. Chị đã sai đào sẵn chỗ rồi.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- đêm: cao trào ----------
  C.caoTrao = async function () {
    var s = G.S, fl = s.flags; if (fl.c5_bat_dau) return;
    W.locked = true;
    W.camFocus = { x: 640, y: 540 };
    G.audio.sfx('crow'); G.audio.sfx('crow', 0.5);
    await G.ui.say([
      { text: 'Vườn ngự. Quạ đậu kín mái, kín cành, không con nào kêu.', img: 'qua_mai' },
      { text: 'Cám đứng dưới đáy hố, chỉ mặc yếm. Nồi nước trên ba ông đầu rau bắt đầu reo.', img: null, sfx: 'bubble' },
      { text: 'Tấm đứng trên miệng hố, cười.', cls: 'think' }
    ]);
    await G.cut.play([
      { ve: 'thayCaRa', chu: 'Tiếng mõ. Một. Hai. Ba.', dur: 2800, cam: [1, 0, 0, 1.15, 0, -50], sfx: ['mo', 'mo', 'mo'], nhac: 'cao_trao' },
      { ve: 'thayCaRa', chu: '**Thầy Cả** bước ra từ bóng tối.', dur: 3200, cam: [1.15, 0, -50, 1.4, 0, -140], sfx: ['stinger', 'chieng'] },
      { ve: 'thayCaRa', noi: 'Thầy Cả', mood: 'khay', chu: 'Đăng. Con đến đúng giờ.', dur: 3000, cam: [1.4, 0, -140, 1.5, 0, -170] }
    ]);
    await G.ui.say([
      { who: 'Thầy Cả', text: 'Đăng. Con đến đúng giờ.' },
      { who: 'Đăng', text: '…Thầy.' },
      { who: 'Thầy Cả', text: 'Nốt ruồi chờ lộc. Thầy biết con sẽ để ý. Con vẫn là đứa tinh ý nhất.' },
      { who: 'Thầy Cả', text: 'Nửa hồn thương nhớ đã về, nhờ con mang quả thị. Nửa hồn căm hờn đang ở trong hũ. Khi nước sôi, hồn đứa em sẽ thế chỗ, và nửa căm hờn kia thành của thầy. Một vong nuôi như thế, cả đời không thiếu việc.' },
      { who: 'Thầy Cả', text: 'Ba nén nhang. Thầy thắp rồi.' }
    ]);
    if (C.biMat(s)) {
      await G.ui.say([{ who: 'Thầy Cả', text: '(chìa tay ra) Con có ba lọ xương. Đưa thầy. Con là đứa duy nhất thầy muốn truyền nghề.' }]);
      W.camFocus = null;
      G.ui.dialog([{ who: 'Đăng', text: '(Bàn tay thầy. Bàn tay đã xoa đầu mình mười năm.)', cls: 'think', choices: [
        { text: 'Đưa ba lọ xương cho thầy', run: function () { C.ket(4); } },
        { text: 'Không.', run: function () { batDau(); } }
      ] }]);
      return;
    }
    W.camFocus = null;
    batDau();
    function batDau() { fl.c5_bat_dau = true; W.refresh(); W.locked = false; C.dangerCuoi(); G.ui.hud(); }
  };
  C.dangerCuoi = function () {
    var s = G.S, t = 0, MAX = 180;
    G.danger.start({ loc: 'cung_vuon',
      guards: [{ id: 'thay', look: L.thay, path: [[520, 520], [800, 520], [820, 690], [520, 690]], speed: 52, range: 180, fov: 80, lantern: false }],
      ghosts: [
        { id: 'vlai', x: 300, y: 560, hear: 170, speed: 70, html: G.ch1.ghostHtml(false) },
        { id: 'vmoc', x: 180, y: 450, hear: 170, speed: 65, html: G.ch1.ghostHtml(false) },
        { id: 'vnu', x: 440, y: 650, hear: 170, speed: 70, html: G.ch1.ghostHtml(false) }
      ],
      hides: [[40, 590, 160, 80], [850, 580, 100, 70], [730, 320, 170, 70]],
      tick: function (dt) {
        t += dt;
        if (t >= MAX) { G.danger.stop(); C.hetNhang(); return true; }
        return false;
      },
      draw: function (ctx) {
        var W2 = ctx.canvas.width, x0 = W2 / 2 - 90;
        ctx.fillStyle = 'rgba(0,0,0,.55)'; ctx.fillRect(x0 - 10, 40, 200, 46);
        for (var i = 0; i < 3; i++) {
          var con = Math.max(0, Math.min(1, 1 - (t - i * 60) / 60)), x = x0 + i * 60 + 20;
          ctx.fillStyle = '#5A3A2A'; ctx.fillRect(x, 50, 6, 30);
          ctx.fillStyle = '#B84A3E'; ctx.fillRect(x, 50 + 30 * (1 - con), 6, 30 * con);
          if (con > 0 && con < 1) { ctx.fillStyle = '#FFB040'; ctx.beginPath(); ctx.arc(x + 3, 50 + 30 * (1 - con), 3, 0, 7); ctx.fill(); }
        }
        ctx.fillStyle = '#F3EEDF'; ctx.font = 'bold 12px sans-serif'; ctx.fillText('Nén thứ ' + Math.min(3, Math.floor(t / 60) + 1) + ' / 3', x0 + 50, 38);
      },
      onCaught: function (k) { return k === 'linh' ? 'Thầy Cả quay lại. Một lá bùa dán lên trán. Đăng đứng im như tượng, nhìn nước sôi.' : 'Một bàn tay quen quen níu cổ chân. Vong của người mình chưa kịp kết luận cho đúng.'; },
      restart: function () { C.dangerCuoi(); } });
    C.music();
    G.ui.toast('Ba nén nhang. ' + (s.items.hu_sanh ? '**Đập hũ** bên nồi và ' : '') + '**thả chỉ đỏ** kéo Cám lên. Thầy Cả có vùng nhìn. Vong nghe tiếng động.', 6000);
  };
  C.phaHu = function () {
    var s = G.S;
    if ((s.items.lo_xuong || 0) < 3) { G.ui.toast('Cần đủ ba lọ xương Bống.'); return; }
    G.danger.holdAt({ x: 640, y: 604 }, 3, function () {
      s.flags.c5_pha = true; G.audio.sfx('crack'); G.audio.sfx('stinger', 0.1); W.shake();
      G.ui.closeup('hu_sanh'); setTimeout(function () { G.ui.closeup(null); }, 900);
      G.ui.toast('Hũ vỡ! Một làn khói đen thoát ra, lao về phía Tấm. [[Tấm chớp mắt.]]', 4500);
      var cp = JSON.parse(G.danger.checkpoint); cp.flags.c5_pha = true; G.danger.checkpoint = JSON.stringify(cp);
      G.ui.hud(); C.kiemTra();
    });
  };
  C.keoCam = function () {
    var s = G.S;
    G.danger.holdAt({ x: 730, y: 616 }, 3, function () {
      s.flags.c5_cam = true; G.audio.sfx('splash');
      G.ui.toast('Chỉ đỏ quấn cổ tay Cám. Đăng kéo. **Cám lên khỏi hố.**', 4000);
      var cp = JSON.parse(G.danger.checkpoint); cp.flags.c5_cam = true; G.danger.checkpoint = JSON.stringify(cp);
      G.ui.hud(); C.kiemTra();
    });
  };
  C.kiemTra = function () {
    var s = G.S;
    if (s.flags.c5_cam && (s.flags.c5_pha || !s.items.hu_sanh)) { G.danger.stop(); C.hetNhang(); }
  };
  C.hetNhang = function () {
    var s = G.S, n = sai(s), fl = s.flags;
    if (!fl.c5_pha || n >= 3) return C.ket(1);
    if (!fl.c5_cam || n >= 1) return C.ket(2);
    return C.ket(3);
  };

  // ---------- các kết ----------
  C.ket = async function (n) {
    var s = G.S, fl = s.flags;
    if (fl.c5_het) return;
    fl.c5_het = true; fl.c5_ket = n;
    W.locked = true; W.camFocus = null;
    if (G.danger.active) G.danger.stop();
    G.audio.music(n === 3 ? 'ket_sang' : 'ket_toi');
    if (n === 1) {
      await G.ui.say([
        { text: fl.c5_pha ? 'Hũ đã vỡ, nhưng Đăng hiểu sai quá nhiều người đã chết. Hồn Tấm không nhận ra ai mới là kẻ thù.' : 'Nén nhang cuối tàn. Cái hũ vẫn nằm đâu đó, nguyên vẹn.', cls: 'think' },
        { who: 'Tấm', text: '(mắt không chớp) Đổ đi.', sfx: 'stinger' },
        { text: 'Nồi nước sôi đổ xuống hố. Tiếng hét của Cám tắt rất nhanh.', sfx: 'splash' },
        { text: 'Ít hôm sau, dì ghẻ nhận được một chĩnh mắm, "quà của con gái gửi biếu". Bà ăn mãi, khen mãi.', cls: 'think' },
        { who: 'Con quạ', text: 'Ngon gì mà ngon, mẹ ăn thịt con, có còn xin miếng.', cls: 'verse', img: 'qua_mai', sfx: 'crow' },
        { who: 'Thầy Cả', text: '(nhặt cái hũ trống) Hũ không để trống được, con ạ. Con là đứa ngoan nhất.', img: null },
        { text: 'Mọi thứ tối sầm. Khi Đăng mở mắt, chỉ còn thấy một vòng tròn ánh sáng ở trên cao. Một bàn tay dán bùa lên miệng hũ.', img: 'qua_hu', sfx: 'paper' }
      ]);
    } else if (n === 2) {
      await G.ui.say([
        { text: 'Hũ vỡ. Làn khói đen lao vào Tấm. Tấm chớp mắt, lần đầu tiên.', sfx: 'crack' },
        { who: 'Tấm', text: '…Em ơi?' },
        fl.c5_cam ? { text: 'Cám run rẩy trên miệng hố, cổ tay còn quấn chỉ đỏ. Nhưng Đăng đã kết luận sai về những người đã chết, và bàn tay thầy kịp làm nốt việc của nó.', cls: 'think' } :
          { text: 'Đã muộn. Dưới đáy hố, Cám nằm im trong làn hơi nước.', cls: 'think', sfx: 'stinger' },
        { text: 'Lá bùa trên tay Thầy Cả bốc cháy ngược vào người lão. Lão ngã xuống cạnh gốc xoan, không kêu được một tiếng.', sfx: 'whoosh' },
        { text: 'Ít hôm sau, người của lão vẫn gửi chĩnh mắm cho dì ghẻ, mượn tên Tấm. Cả kinh thành đồn hoàng hậu Tấm độc ác.', cls: 'think' },
        { text: 'Trong đồ của Thầy Cả có một quyển sổ khách. [[Trang cuối đã bị xé.]]', img: 'so_khach' },
        { who: 'Đăng', text: '(Mình viết hết vào Sổ Tử. Không ai tin.)', cls: 'think', img: 'so_tu' }
      ]);
    } else if (n === 3) {
      await G.ui.say([
        { text: 'Hũ vỡ. Làn khói đen lao vào Tấm. Tấm chớp mắt, lần đầu tiên. Rồi cô khóc.', sfx: 'crack' },
        { who: 'Tấm', text: 'Em ơi…' },
        { who: 'Cám', text: '(cổ tay còn quấn chỉ đỏ) Chị ơi. Lần này… **chị ngã em nâng**.' },
        { text: 'Lá bùa trên tay Thầy Cả bốc cháy ngược vào người lão. Lão ngã xuống cạnh gốc xoan.', sfx: 'whoosh' },
        { who: 'Dì ghẻ', text: '(chạy đến, quỳ sụp) Là ta. Ta chặt cây cau. Ta sai giết con Lài, giết lão Mộc. Con Cám không biết gì. **Con dại cái mang.**' },
        { text: 'Dì ghẻ bị bắt. Cám bị đuổi khỏi cung, nhưng còn sống. Tấm ở lại, đủ cả hồn lẫn xác.', cls: 'think' },
        { text: 'Đăng đem tro sư phụ về chôn dưới gốc cau ở làng Đông. Trong đồ của lão có một quyển sổ khách, [[trang cuối đã bị xé]].', img: 'so_khach' },
        { text: 'Nhiều năm sau, dưới làng, người ta vẫn kể bản có nồi nước sôi và chĩnh mắm. "Kể thế mới sợ," họ bảo.', img: null },
        { who: 'Đăng', text: '(Chỉ mình biết chuyện thật.)', cls: 'think', img: 'so_tu' },
        { text: 'Đăng gập Sổ Tử lại.', img: null, sfx: 'paper' }
      ]);
    } else {
      await G.ui.say([
        { text: 'Đăng đặt ba lọ xương vào tay thầy.', sfx: 'mo' },
        { text: 'Trong Sổ Tử, [[một trang nữa tự bị gạch xóa]].', sfx: 'paper' },
        { who: 'Thầy Cả', text: 'Ngoan.' },
        { text: 'Nồi nước sôi đổ xuống hố. Hồn Cám thế vào chỗ trống trong hũ. Tấm làm hoàng hậu, đôi mắt không bao giờ chớp. Cổ tích diễn ra y như người ta vẫn kể.', sfx: 'splash' },
        { who: 'Con quạ', text: 'Ngon gì mà ngon, mẹ ăn thịt con, có còn xin miếng.', cls: 'verse', img: 'qua_mai', sfx: 'crow' },
        { who: 'Thầy Cả', text: '(ôm cái hũ, đưa Đăng một quyển sổ) Từ nay con là đệ tử chân truyền. Đây là sổ khách. Mình còn nhiều nơi phải đi.', img: 'so_khach' },
        { who: 'Thầy Cả', text: 'Cái hũ này là tiền đặt cọc. Đi thôi. Có một cây đa đang đợi.', img: null }
      ]);
    }
    if (n === 3) await G.cut.play([{ ve: 'chiEm', chu: 'Bình minh.', dur: 2400, cam: [1.3, 0, -130, 1.15, 0, -80], sfx: 'bell', hieu: 'suong' }, { ve: 'chiEm', noi: 'Cám', mood: 'khoc', chu: 'Lần này, **chị ngã em nâng**.', dur: 4200, cam: [1.15, 0, -80, 1, 0, -20] }]);
    if (n === 1) await G.cut.play([{ ve: 'quaHu', chu: 'Hũ không để trống được.', dur: 3600, sfx: 'paper' }]);
    C.ghiKet(n);
    G.save();
    if (n === 4) { await new Promise(function (r) { G.cine.gocDa(r); }); }
    G.audio.music('title');
    var nD = G.DEDUCE.filter(function (x) { return s.deduce[x.id]; }).length;
    await G.ui.card('Hết truyện', '**Kết ' + n + ' · ' + KETS[n] + '**<br><br>Sổ Tử: ' + Object.keys(s.clues).length + ' manh mối · ' + nD + '/' + G.DEDUCE.length +
      ' phép đối chiếu · kết luận sai ' + sai(s) + ' trang · Đăng đã chết ' + (s.deaths || 0) + ' lần.<br>Đã mở: ' + C.dsKet().map(function (k) { return 'Kết ' + k; }).join(', ') + ' / 4', 'Về màn hình chính');
    W.locked = false;
    G.showTitle();
  };
  C.ghiKet = function (n) {
    var ds = C.dsKet(); if (ds.indexOf(n) < 0) ds.push(n);
    try { localStorage.setItem('tpcc_kets', JSON.stringify(ds.sort())); } catch (e) {}
  };
  C.dsKet = function () { try { return JSON.parse(localStorage.getItem('tpcc_kets') || '[]'); } catch (e) { return []; } };

  C.onVerdict = async function (id, k) {
    var s = G.S; s.verdict[id] = k; G.save(); G.ui.hud();
  };
})();
