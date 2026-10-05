// Kịch bản CHƯƠNG 2: Xoan đào. Xem docs/dac-ta-ch2.md.
var G = window.G || (window.G = {});
G.ch2 = {};

Object.assign(G.CLUES, {
  L09: { type: 'L', title: 'Lão Mộc: chuyện ở làng Đông', text: '"Hôm giỗ ở làng Đông, lão đi ngang vườn cau nhà ấy… thôi, chuyện cũ." Lão được trả tiền rào cây.' },
  L10: { type: 'L', title: 'Thợ phụ: ma làm rìu văng', text: 'Cây chảy máu, rồi ma giật lưỡi rìu văng ngược vào cổ thầy cả.' },
  L11: { type: 'L', title: 'Ông lão quán nước: thầy cúng già', text: 'Đêm trước lễ bốn mươi chín ngày, ông thấy một thầy cúng già vào nhà ấy một mình, tay xách thuổng.' },
  L12: { type: 'L', title: 'Cám: ngủ mê', text: 'Hoàng hậu ngủ li bì giữa ban ngày. Tỉnh dậy không nhớ gì, đêm nào cũng mơ thấy chị.' },
  L13: { type: 'L', title: 'Mẹ bé Mít: cửa cài then', text: 'Đêm qua con ngủ trong nhà, cửa cài then. Sáng ra con đã ôm gốc xoan ngoài vườn.' },
  V12: { type: 'V', title: 'Lưỡi rìu bị nới chốt', text: 'Chốt nêm giữ lưỡi rìu của lão Mộc bị rút lỏng từ trước.' },
  V14: { type: 'V', title: 'Thư dì ghẻ gửi lão Mộc', text: '"Rào cây cho kỹ. Chuyện ở làng Đông hôm giỗ, ông quên đi thì hơn." Có dấu nhẫn.' },
  V15: { type: 'V', title: 'Ba lọ xương, một hố trống', text: 'Dưới giường Tấm còn ba lọ xương Bống. Chỗ lọ thứ tư là một hố trống, đất còn mới.' },
  V16: { type: 'V', title: 'Hộp ngải dưới giường Cám', text: 'Túi thóc trộn gạo, búi tóc rối, một lá bùa nét chữ quen quen.' },
  V17: { type: 'V', title: 'Rễ cây chui qua khe cửa', text: 'Rễ xoan bò qua khe cửa vào nhà cung nữ. Mắt âm dương: không có dấu chân người.' },
  V18: { type: 'V', title: 'Chiếc hài thêu', text: 'Ký ức: Tấm đánh rơi một chiếc hài thêu xuống sông ngày hội.' }
});
G.DEDUCE.push(
  { id: 'C2D1', a: 'L10', b: 'V12', title: 'Không phải ma làm rìu văng', text: 'Chốt rìu [[bị nới từ trước]]. Có người muốn lưỡi rìu bay ra.' },
  { id: 'C2D2', a: 'L09', b: 'V14', title: 'Lão Mộc bị bịt miệng', text: 'Lão thấy chuyện ở vườn cau hôm giỗ. [[Dì ghẻ muốn lão im.]]' },
  { id: 'C2D3', a: 'L13', b: 'V17', title: 'Không ai bế bé Mít ra vườn', text: 'Cửa cài then, không dấu chân người. Rễ cây vào tận nơi. [[Lần này là vong.]]' },
  { id: 'C2D4', a: 'L11', b: 'V15', title: 'Ai lấy lọ xương thứ tư?', text: 'Trước lễ bốn mươi chín ngày, [[một thầy cúng già]] đã vào buồng Tấm với cái thuổng.' },
  { id: 'C2D5', a: 'L12', b: 'V16', title: 'Cám bị bỏ ngải', text: 'Hoàng hậu ngủ mê vì [[túi ngải dưới gầm giường]]. Ai đặt nó ở đó?' }
);
Object.assign(G.DEATHS, {
  moc: { name: 'Lão Mộc (thợ cả)', img: 'por_moc',
    meta: function () { return 'Chết trong lễ đốn cây xoan. Lưỡi rìu văng ngược vào cổ ngay nhát đầu tiên. Thợ phụ nói: ma làm.'; },
    ready: function (S) { return S.deduce.C2D1 && S.deduce.C2D2; },
    choices: ['Ma giết', 'Người giết: Dì ghẻ', 'Người giết: Đội Ngạn', 'Tai nạn'], answer: 1,
    verdict: function (S) { var v = (S.verdict || {}).moc; return v !== undefined ? 'Kết luận: ' + G.DEATHS.moc.choices[v] : (G.DEATHS.moc.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } },
  mit: { name: 'Bé Mít', img: 'por_mit',
    meta: function () { return 'Năm tuổi, con chị Hến giặt đồ. Sáng ra thấy ôm gốc xoan, người lạnh ngắt, không một vết thương.'; },
    ready: function (S) { return !!S.deduce.C2D3; },
    choices: ['Ma giết', 'Người giết: Dì ghẻ', 'Người giết: Đội Ngạn', 'Bệnh'], answer: 0,
    verdict: function (S) { var v = (S.verdict || {}).mit; return v !== undefined ? 'Kết luận: ' + G.DEATHS.mit.choices[v] : (G.DEATHS.mit.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } }
});

(function () {
  var C = G.ch2, W = G.world, $ = G.$, L = G.LOOKS;
  var PH = ['sang', 'chieu', 'toi', 'dem'], PHN = { sang: 'Sáng', chieu: 'Chiều', toi: 'Tối', dem: 'Đêm' };
  L.moc = { hair: 'old', shirt: '#7A6A4A', pants: '#4A4650', eyes: 'tired', beard: true, prop: 'axe' };
  L.tho = { hair: 'non_la', shirt: '#9A7A4A', pants: '#4A4650', eyes: 'big' };
  L.hen = { hair: 'khan', khan: '#4A3A30', shirt: '#7A8A6A', skirt: '#3A3A48', eyes: 'tired', mouth: 'sad' };
  L.mit = { kid: true, hair: 'trai_dao', shirt: '#E8B04A', pants: '#EBCDAA', shoes: '#EBCDAA', eyes: 'closed' };
  var LINH = Object.assign({}, L.linh || {}, { prop: 'lantern' });
  var DIGHE_DEN = Object.assign({}, L.dighe, { prop: 'lantern' });
  function chibiNam(look, rot) { return '<div style="position:absolute;left:0;top:0;transform:scale(.5) rotate(' + (rot || 90) + 'deg);transform-origin:0 -40px">' + G.art.chibi(Object.assign({}, look, { view: 'front' })) + '</div>'; }

  // ---------- bắt đầu ----------
  C.begin = async function () {
    var s = G.S;
    s.chapter = 'ch2'; s.day = 1; s.phase = 'sang'; s.beat = 'c2';
    s.inv = s.inv || { nhang: 2, gao: 2, bua: 2 }; s.money = s.money || 4; s.verdict = s.verdict || {};
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
    if (G.danger.active) G.danger.stop();
    await G.cut.chuong('Chương 2', 'Xoan đào');
    W.enter('cung_bep', 760, 300);
    C.music();
    W.locked = true;
    await G.ui.say([
      { text: 'Sáng. Ngoài sân người ta nói chuyện ồn ào khác thường.', cls: 'think' },
      { who: 'Lính hầu', text: '(gõ cửa) Thầy ơi! Ra vườn ngự mà xem. Chỗ có cái mầm lá đỏ hôm qua, sáng nay mọc lên **một cây xoan to bằng người ôm**!' }
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
    if (s.loc === 'cung_vuon') {
      if (d === 1 && day) {
        list.push({ id: 'moc', look: L.moc, x: 470, y: 660, view: 'side', flip: 1, label: 'Lão Mộc (thợ cả)' });
        if (p === 'sang') list.push({ id: 'vua', look: L.vua, x: 700, y: 660, view: 'side', flip: -1, label: 'Nhà vua' });
      }
      if (d === 1 && p === 'dem') {
        list.push({ id: 'linh', look: LINH, x: 690, y: 560, view: 'side', flip: -1, label: 'Lính gác cây' });
        list.push({ id: 'mit', look: L.mit, x: 610, y: 575, view: 'front', cls: 'hid', ghost: true });
      }
      if (d === 2 && p === 'sang') {
        if (!fl.c2_le) list.push({ id: 'xacmit', html: G.art.xac(L.mit, { rot: -70, tre: true, mieng: 'sad' }), x: 600, y: 576, ghost: true });
        list.push({ id: 'dighe', look: L.dighe, x: 380, y: 640, view: 'side', flip: 1, label: 'Dì ghẻ' });
        if (!fl.c2_moc_chet) list.push({ id: 'moc', look: L.moc, x: 520, y: 560, view: 'side', flip: 1, label: 'Lão Mộc' });
        else list.push({ id: 'xacmoc', html: G.art.xac(L.moc, { rot: 90, mau: true }), x: 500, y: 600, ghost: true });
        list.push({ id: 'tho', look: L.tho, x: 690, y: 560, view: 'side', flip: -1, label: 'Thợ phụ' });
      }
    }
    if (s.loc === 'cung_gieng') {
      if (d === 1 && p === 'chieu') list.push({ id: 'hen', look: L.hen, x: 300, y: 470, view: 'front', label: 'Chị Hến' }, { id: 'mitsong', look: Object.assign({}, L.mit, { eyes: 'big' }), x: 340, y: 486, view: 'side', flip: -1, label: 'Bé Mít' });
      if (d === 2 && day) list.push({ id: 'hen', look: L.hen, x: 220, y: 300, view: 'front', label: 'Chị Hến' });
    }
    if (s.loc === 'cung_hau') {
      if (d === 1 && p === 'chieu') list.push({ id: 'cam', html: chibiNam(L.cam, 80), x: 230, y: 250, ghost: true, label: 'Cám (đang ngủ)' });
      if (d === 1 && p === 'sang') list.push({ id: 'dighe', look: L.dighe, x: 560, y: 330, view: 'front', label: 'Dì ghẻ' });
      if (d === 2 && p === 'dem') list.push({ id: 'camngu', html: chibiNam(L.cam, 80), x: 230, y: 250, ghost: true });
    }
    if (s.loc === 'cung_san') {
      if (d === 1 && day) list.push({ id: 'nu', look: L.nu, x: 300, y: 560, view: 'front', label: 'Nụ' });
      if (day || p === 'toi') list.push({ id: 'linhtre', look: L.linhTre, x: 880, y: 320, view: 'front', label: 'Lính gác cổng bắc' });
    }
    if (s.loc === 'cung_bep' && !fl.c1_basau_chet && (day || p === 'toi')) list.push({ id: 'basau', look: L.baSau, x: 220, y: 270, view: 'front', label: 'Bà Sáu bếp' });
    if (s.loc === 'hang_nuoc' && day) list.push({ id: 'bacu', look: L.baCu, x: 360, y: 372, view: 'front', label: 'Bà cụ hàng nước', fixedView: true });
    if (s.loc === 'lang_duong') list.push({ id: 'onglao', look: L.ongLao, x: 800, y: 440, view: 'front', label: 'Ông lão bán nước' });
    return list;
  };

  // ---------- đồ vật ----------
  C.things = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [], day = p === 'sang' || p === 'chieu';
    if (s.loc === 'cung_san') {
      list.push({ id: 'cua_dien', x: 480, y: 292, hit: [440, 160, 80, 120], label: 'Vào cung hoàng hậu', door: { to: 'cung_hau', x: 500, y: 520, view: 'back' } });
      list.push({ id: 'cua_bep', x: 124, y: 656, hit: [90, 556, 70, 80], label: 'Vào bếp & phòng Đăng', door: { to: 'cung_bep', x: 460, y: 520, view: 'back' } });
    }
    if (s.loc === 'cung_hau') {
      list.push({ id: 'ra_san', x: 500, y: 530, hit: [460, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 480, y: 310 } });
      if (d === 2 && p === 'dem' && !fl.c2_hop) list.push({ id: 'hop', x: 240, y: 300, hit: [140, 150, 200, 140], label: 'Lục gầm giường', quest: true });
    }
    if (s.loc === 'cung_bep') {
      list.push({ id: 'ra_san', x: 460, y: 532, hit: [420, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 124, y: 668 } });
      list.push({ id: 'chong', x: 780, y: 240, hit: [706, 160, 150, 62], label: 'Chõng tre: nghỉ' });
      if (fl.c2_vo && fl.c2_hop && !fl.c2_ky3) list.push({ id: 'vo_xoan', x: 700, y: 452, hit: [654, 380, 92, 56], label: 'Mảnh vỏ xoan', quest: true });
    }
    if (s.loc === 'cung_vuon') {
      if (d === 2 && p === 'sang' && fl.c2_moc_chet && !s.clues.V12) list.push({ id: 'riu', x: 560, y: 640, label: 'Cái rìu văng ra', quest: true });
      if (d === 2 && p === 'sang' && fl.c2_moc_chet && !s.clues.V14) list.push({ id: 'tui', x: 440, y: 640, label: 'Túi đồ nghề của lão Mộc', quest: true });
      if (d === 2 && p === 'dem' && !fl.c2_vo) list.push({ id: 'vo', x: 580, y: 572, hit: [540, 380, 80, 200], label: 'Cạo vỏ cây xoan', quest: true });
      if (d === 1 && p === 'dem' && !fl.c2_dem1) list.push({ id: 'goc', x: 600, y: 572, hit: [520, 380, 120, 200], label: 'Gốc xoan', quest: true });
      list.push({ id: 'ho', x: 730, y: 660, hit: [694, 620, 72, 40], label: 'Cái hố mới đào' });
    }
    if (s.loc === 'cung_gieng' && d === 2 && day) list.push({ id: 're', x: 150, y: 250, hit: [110, 120, 80, 110], label: 'Cửa nhà chị Hến', quest: !s.clues.V17 });
    if (s.loc === 'hang_nuoc') {
      list.push({ id: 'mua', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Mua đồ nghề', cond: p === 'sang' || p === 'chieu' });
      if (d === 2 && p === 'chieu' && !fl.c2_ve_lang) list.push({ id: 'xe', x: 620, y: 500, label: 'Thuê xe bò về làng Đông (2 đồng)', quest: true });
    }
    if (s.loc === 'lang_duong') list.push({ id: 'xe_ve', x: 140, y: 500, label: 'Đi xe bò về kinh thành', quest: !!fl.c2_dao_lo });
    if (s.loc === 'nha_dighe' && !fl.c2_dao_lo) list.push({ id: 'dao', x: 258, y: 218, hit: [194, 104, 132, 86], label: 'Đào dưới chân giường Tấm', quest: true });
    return list.filter(function (t) { return t.cond !== false; });
  };

  C.objective = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, v = s.verdict || {};
    if (d === 1) {
      if (p === 'sang') return fl.c2_gap_moc ? 'Nghỉ ở chõng tre. Chiều nay hỏi chuyện quanh cung (Cám, Nụ, chị Hến).' : 'Ra **vườn ngự** xem cây xoan. Nói chuyện với **lão Mộc**.';
      if (p === 'chieu') return 'Hỏi chuyện: **Cám** (cung hoàng hậu), **Nụ** (sân chầu), **chị Hến** (giếng giặt). Rồi nghỉ.';
      if (p === 'toi') return 'Nghỉ chờ đêm.';
      return fl.c2_dem1 ? 'Về phòng ngủ.' : 'Ra **vườn ngự**, mở **mắt âm dương (B)** ở gốc xoan.';
    }
    if (d === 2) {
      if (p === 'sang') {
        if (!fl.c2_le) return 'Ra **vườn ngự**. Có chuyện ở gốc xoan.';
        if (!s.clues.V12 || !s.clues.V14) return 'Xem **cái rìu** và **túi đồ nghề** của lão Mộc.';
        return 'Hỏi **chị Hến** ở giếng giặt, xem **cửa nhà** chị. Kết luận hai cái chết trong **Sổ Tử**. Rồi nghỉ.';
      }
      if (p === 'chieu') return fl.c2_ve_lang ? 'Về phòng nghỉ.' : (s.loc === 'nha_dighe' || s.loc === 'lang_duong' || s.loc === 'vuon_cau' ?
        (fl.c2_dao_lo ? 'Hỏi **ông lão quán nước**, rồi đi xe về kinh thành.' : 'Vào buồng Tấm ở **nhà dì ghẻ**, đào dưới chân giường.') :
        'Ra **hàng nước ngoài thành**, thuê xe bò **về làng Đông** đào lọ xương.');
      if (p === 'toi') return 'Nghỉ chờ đêm.';
      if (p === 'dem') {
        if (!fl.c2_vo || !fl.c2_hop) return 'Lẻn lấy ' + [!fl.c2_vo ? '**mảnh vỏ xoan** (vườn ngự)' : '', !fl.c2_hop ? '**hộp ngải dưới giường Cám** (cung hoàng hậu)' : ''].filter(Boolean).join(' và ') + '.';
        if (!fl.c2_ky3) return 'Về phòng. Mở **mắt âm dương (B)** vào mảnh vỏ xoan.';
        if (v.moc === undefined || v.mit === undefined) return 'Kết luận cái chết của **lão Mộc** và **bé Mít** trong Sổ Tử, rồi nghỉ.';
        return 'Nghỉ đến sáng.';
      }
    }
    if (d === 3) return 'Ra **vườn ngự**.';
    return '';
  };

  // ---------- nghỉ ----------
  function gate(s) {
    var d = s.day, p = s.phase, fl = s.flags, v = s.verdict || {};
    if (d === 1 && p === 'sang' && !fl.c2_gap_moc) return 'Ra vườn ngự xem cây xoan đã.';
    if (d === 1 && p === 'dem' && !fl.c2_dem1) return 'Đêm nay phải ra gốc xoan một chuyến.';
    if (d === 2 && p === 'sang' && (!s.clues.V12 || !s.clues.V14)) return 'Còn việc ở vườn ngự.';
    if (d === 2 && p === 'chieu' && !fl.c2_ve_lang) return 'Phải về làng Đông đào lọ xương trước đã.';
    if (d === 2 && p === 'dem' && (!fl.c2_ky3 || v.moc === undefined || v.mit === undefined)) return 'Còn việc đêm nay (vỏ xoan, hộp ngải, Sổ Tử).';
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
  C.toPhase = async function (day, ph, loc, x, y) {
    var s = G.S;
    await G.ui.fade(function () {
      s.day = day; s.phase = ph;
      $('stage').classList.remove('soi');
      if (loc || ph === 'sang') W.enter(loc || 'cung_bep', x || 760, y || 300); else W.enter(s.loc, s.x, s.y);
    });
    C.music();
    await G.ui.card('Ngày ' + day + ' · ' + PHN[ph], '');
    G.save();
    C.wake();
  };
  C.wake = async function () {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (d === 2 && p === 'sang' && !fl.c2_mit_chet) {
      fl.c2_mit_chet = true; W.locked = true; G.audio.sfx('stinger');
      await G.ui.say([{ who: 'Bà Sáu', text: '(hớt hải) Thầy ơi… con bé Mít nhà chị Hến… người ta thấy nó **ôm gốc xoan**, lạnh ngắt từ bao giờ.' }]);
      W.locked = false; G.ui.hud(); return;
    }
    if (d === 2 && p === 'dem') { G.ui.toast('Đêm nay: lấy **vỏ xoan** ở vườn ngự và **hộp ngải** ở cung hoàng hậu. Cả hai nơi đều có người canh.', 5000); }
    if (d === 3 && p === 'sang') C.ket();
  };

  // ---------- vào cảnh: cảnh nguy hiểm theo nơi ----------
  C.onEnter = function (loc) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (G.danger.active && G.danger.cfg && G.danger.cfg.loc && G.danger.cfg.loc !== loc) { G.danger.stop(); C.music(); }
    if (loc === 'cung_vuon' && d === 1 && p === 'sang' && !fl.c2_thay_cay) setTimeout(C.thayCay, 400);
    if (loc === 'cung_vuon' && d === 2 && p === 'sang' && !fl.c2_le) setTimeout(C.leDon, 400);
    if (loc === 'cung_vuon' && d === 2 && p === 'dem' && !fl.c2_vo && !G.danger.active) C.dangerVuon();
    if (loc === 'cung_hau' && d === 2 && p === 'dem' && !fl.c2_hop && !G.danger.active) C.dangerHau();
    if (loc === 'lang_duong' && !fl.c2_den_lang) { fl.c2_den_lang = true; G.ui.toast('Làng Đông. Nhà dì ghẻ ở cuối đường, đi về phía đông.'); }
  };
  C.canExit = function (dir, to) {
    var s = G.S, p = s.phase;
    if ((p === 'toi' || p === 'dem') && to === 'hang_nuoc') { G.ui.toast('Cổng thành đóng rồi.'); return false; }
    if (s.loc === 'lang_duong' && dir === 'left') return false;
    return true;
  };

  // ---------- tương tác ----------
  C.act = function (id) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    switch (id) {
      case 'chong': return C.rest();
      case 'moc': return C.moc();
      case 'vua': return G.ui.dialog([{ who: 'Nhà vua', text: 'Cây mọc một đêm mà thành bóng mát. Trẫm ngồi dưới gốc, thấy lòng yên lạ.' }, { who: 'Nhà vua', text: 'Hoàng hậu lại bảo chặt đi. Đàn bà thật khó hiểu.' }]);
      case 'nu': return G.ui.dialog([{ who: 'Nụ', text: 'Hoàng hậu bắt bọn em rang thóc trộn với gạo, bỏ vào túi để dưới gầm giường. **Thóc gạo lẫn lộn**, chẳng hiểu để làm gì.' }, { who: 'Nụ', text: 'Mà từ hôm ấy, người ngủ li bì như bị bỏ bùa.' }]);
      case 'cam': return G.ui.dialog([{ text: 'Hoàng hậu nằm ngủ giữa ban ngày, mắt nhắm mà miệng vẫn mấp máy.', cls: 'think' },
        { who: 'Cám', text: '(nói mê) …chị ơi… đừng nhìn em… em không biết mẹ cầm rìu… em không biết…', run: function () { G.addClue('L12'); } },
        { who: 'Đăng', text: '(Ngủ mê kiểu này không phải ngủ thường. Phòng có mùi gì đó hăng hắc.)', cls: 'think' }]);
      case 'dighe': return G.ui.dialog([{ who: 'Dì ghẻ', text: d === 2 ? 'Đốn. Đốn ngay hôm nay. Ta không để cái cây ấy đứng thêm một đêm nào nữa.' : 'Thầy lo việc của thầy. Cái cây ấy, mai người ta đốn.' }]);
      case 'hen':
        if (d === 1) return G.ui.dialog([{ who: 'Chị Hến', text: 'Thầy ơi, con Mít nhà em cứ đòi ra ngồi gốc cây xoan mới mọc. Nó bảo có cô xinh lắm ngồi trên cành, hát ru nó.' }, { who: 'Chị Hến', text: 'Trẻ con nói nhảm, thầy nhỉ?' }]);
        return G.ui.dialog([{ who: 'Chị Hến', text: '(khóc) Đêm qua con ngủ trong nhà với em. Em **cài then cửa** cẩn thận. Sáng dậy đã không thấy con đâu…', run: function () { G.addClue('L13'); } }]);
      case 'mitsong': return G.ui.dialog([{ who: 'Bé Mít', text: 'Cô trên cây xoan hát hay lắm. Cô bảo tối cô ru cháu ngủ.' }]);
      case 'tho': return G.ui.dialog([{ who: 'Thợ phụ', text: 'Ma… ma giật lưỡi rìu. Tôi thấy tận mắt. Cây nó chảy máu rồi lưỡi rìu tự bay ra.', run: function () { G.addClue('L10'); } }]);
      case 'linh': return G.ui.dialog([{ who: 'Lính gác', text: 'Lệnh dì hoàng hậu: đêm nay không ai được lại gần cây. Thầy về đi.' }]);
      case 'basau': return G.ui.dialog([{ who: 'Bà Sáu', text: d === 2 ? 'Tội con bé. Già trông nó từ lúc lọt lòng.' : 'Cây ấy mọc đúng chỗ thầy chôn lông chim, già nghe lính nói. Thầy cẩn thận.' }]);
      case 'linhtre': return G.ui.dialog([{ who: 'Lính gác', text: 'Thầy mà cần xem sổ gác thì lúc nào cũng được.' }]);
      case 'bacu': return G.ui.dialog([{ who: 'Bà cụ', text: d === 2 ? 'Về làng hả thầy? Xe bò của thằng cháu già đỗ ngay đây.' : 'Cây mọc trong một đêm à? Ăn quả thì nhớ kẻ trồng cây. Ai trồng cái cây ấy, thầy nhỉ?' }]);
      case 'mua': return G.ch1.shop();
      case 'onglao': return C.ongLao();
      case 'xe': return C.veLang();
      case 'xe_ve': return C.veKinh();
      case 'dao': return C.daoLo();
      case 'goc': return C.gocDem1();
      case 'riu': return G.ui.dialog([{ text: 'Cái rìu văng ra cắm xuống đất. Lưỡi rìu lỏng lẻo trên cán: [[chốt nêm đã bị rút lỏng]] từ trước, không phải do chặt.', img: 'riu_chot', run: function () { G.addClue('V12'); } }]);
      case 'tui': return G.ui.dialog([{ text: 'Trong túi đồ nghề của lão Mộc có một lá thư gấp tư, dấu son hình chiếc nhẫn.', img: 'thu_dighe', run: function () { G.addClue('V14'); } }]);
      case 're': return G.ui.dialog(
        $('stage').classList.contains('soi') ? [{ text: 'Qua mắt âm dương: quanh cửa [[không có một dấu chân người]] nào. Chỉ có rễ cây.', img: 're_cay', run: function () { if (s.clues.V17) return; } }] :
          [{ text: 'Một cái rễ xoan to bằng cổ tay bò từ vườn sang, [[chui qua khe cửa]] vào tận chỗ con bé nằm.', img: 're_cay', run: function () { G.addClue('V17'); } }, { text: '(Mở mắt âm dương xem có dấu chân người không.)', cls: 'think', img: null }]);
      case 'ho': return G.ui.dialog([{ text: 'Một cái hố mới đào, sâu ngang ngực, cạnh hàng rào. Không ai nói nó để làm gì.', cls: 'think' }]);
      case 'vo': return C.layVo();
      case 'hop': return C.layHop();
      case 'vo_xoan':
        if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Mảnh vỏ xoan, mặt trong ươn ướt như da. Bấm **B** để mở mắt âm dương mà nhìn.', cls: 'think' }]);
        return G.memory3.enter();
    }
  };

  // ---------- ngày 1 ----------
  C.thayCay = async function () {
    var fl = G.S.flags; if (fl.c2_thay_cay) return; fl.c2_thay_cay = true;
    W.locked = true; W.camFocus = { x: 580, y: 420 };
    await G.wait(800);
    await G.ui.say([
      { text: 'Đúng chỗ chôn lông chim, một **cây xoan đào** đứng sừng sững, hoa tím rắc đầy mặt đất. Cây như đã sống ở đây trăm năm.', sfx: 'stinger' },
      { text: 'Rễ nó nổi trên mặt đất, bò về phía dãy nhà cung nữ.', cls: 'think' }
    ]);
    W.camFocus = null; W.locked = false; G.ui.hud();
  };
  C.moc = async function () {
    var s = G.S, fl = s.flags;
    if (fl.c2_gap_moc) return G.ui.dialog([{ who: 'Lão Mộc', text: 'Mai lão đốn. Thầy nhớ ra cúng đất cho lão nhé.' }]);
    W.locked = true;
    await G.ui.say([
      { who: 'Lão Mộc', text: 'Thầy cúng đấy à? Lão là Mộc, thợ cả. Bà lớn sai lão rào cây này lại, mai thì đốn.' },
      { who: 'Lão Mộc', text: 'Ăn cây nào rào cây ấy. Người ta trả tiền thì lão rào.', run: function () { fl.c2_rao = true; } },
      { who: 'Lão Mộc', text: 'Đời lão đốn cây nhiều rồi. Hồi trẻ lão đốn củi chung với một thằng bé mồ côi, khỏe lạ khỏe lùng, một mình vác cả cây gỗ lim. Giờ nó ở đâu chẳng biết.' },
      { who: 'Đăng', text: 'Lão có hay về làng Đông không?' },
      { who: 'Lão Mộc', text: '(khựng lại) …Hôm giỗ ở làng Đông, lão có đi ngang vườn cau nhà ấy. Lão thấy…', run: function () { G.addClue('L09'); } },
      { who: 'Lão Mộc', text: 'Thôi. Chuyện cũ. Già rồi, nói nhiều không tốt.' }
    ]);
    fl.c2_gap_moc = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.gocDem1 = async function () {
    var s = G.S, fl = s.flags;
    if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Gốc xoan tối om. Có tiếng gì như ai đang hát rất khẽ. Bấm **B** để mở mắt âm dương.', cls: 'think' }]);
    W.locked = true;
    G.audio.lullaby(0.96);
    await G.ui.say([
      { text: 'Qua mắt âm dương: dưới gốc xoan có [[một người con gái ngồi ru]]. Trong lòng cô là một đứa bé đang ngủ.', sfx: 'stinger' },
      { who: 'Đăng', text: '(…Bé Mít?)', cls: 'think' },
      { text: 'Người con gái ngẩng lên. Cô không có mặt. Chỉ có tóc.', sfx: 'heart' },
      { who: 'Lính gác', text: 'Ai đấy! Thầy làm gì ở đây? Lệnh cấm lại gần cây. Về ngay!' }
    ]);
    $('stage').classList.remove('soi');
    fl.c2_dem1 = true; W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- ngày 2: lễ đốn cây ----------
  C.leDon = async function () {
    var s = G.S, fl = s.flags; if (fl.c2_le) return;
    W.locked = true;
    await G.ui.say([
      { text: 'Bé Mít nằm ôm gốc xoan, hai tay vòng quanh rễ cây như ôm mẹ. Người lạnh ngắt, không một vết xước.', img: 'be_mit', sfx: 'stinger', run: function () { G.addDeath('mit'); } },
      { who: 'Dì ghẻ', text: 'Đốn. Đốn ngay. Thầy cúng đất đi, rồi để lão Mộc làm việc.', img: null }
    ]);
    fl.c2_le = true; W.refresh(); W.locked = true;
    await G.mg.mam(function () { G.ui.toast('**Có thờ có thiêng, có kiêng có lành.** Đặt cho đúng chỗ.'); });
    await G.ui.say([{ who: 'Lão Mộc', text: 'Được rồi. Lão xin phép thổ thần.' }, { text: 'Lão Mộc giơ rìu.', sfx: 'whoosh' }]);
    await G.cut.play([
      { ve: 'xoanMau', chu: 'Nhát rìu đầu tiên.', dur: 2400, cam: [1.3, 0, 0, 1.05, 0, 0], sfx: ['trong', 'chop'], rung: true, chop: 'do', nhac: 'nguy' },
      { ve: 'xoanMau', buoc: 2, chu: 'Nhát thứ hai.', dur: 2200, sfx: ['chop', 'crack'], rung: true, chop: true },
      { ve: 'xoanMau', buoc: 2, noi: 'Thợ phụ', mood: 'soc', chu: 'Ma! Ma giật lưỡi rìu!', dur: 2400 }
    ]);
    G.audio.sfx('chop'); W.shake();
    fl.c2_chat = true; W.refresh(); W.locked = true;
    await G.ui.say([{ text: 'Nhát đầu tiên. Từ vết chặt, [[nhựa đỏ phun ra như máu]].', img: 'cay_mau', sfx: 'stinger' }]);
    G.audio.sfx('chop', 0.1); G.audio.sfx('crack', 0.2); W.shake();
    fl.c2_moc_chet = true; W.refresh(); W.locked = true;
    await G.ui.say([
      { text: 'Nhát thứ hai, lưỡi rìu bật khỏi cán, [[văng ngược vào cổ lão Mộc]].', img: null, sfx: 'thud', run: function () { G.addDeath('moc'); } },
      { who: 'Thợ phụ', text: 'Ma! Ma giật lưỡi rìu! Cây nó chảy máu rồi ma giật lưỡi rìu!', run: function () { G.addClue('L10'); } },
      { who: 'Dì ghẻ', text: '(rất bình tĩnh) Dọn đi. Mai gọi thợ khác.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- về làng ----------
  C.veLang = async function () {
    var s = G.S;
    if (s.money < 2) return G.ui.dialog([{ who: 'Thằng cháu', text: 'Hai đồng một chuyến thầy ạ.' }, { text: '(Không đủ tiền. Làm việc vặt hoặc bán bớt gì đó.)', cls: 'think' }]);
    s.money -= 2; G.ui.hud();
    await G.ui.fade(function () { W.enter('lang_duong', 160, 520); });
    G.audio.music(G.audio.ten('ngay'));
    await G.ui.card('Làng Đông', 'Chiều. Xe bò lọc cọc đến cổng làng.');
  };
  C.ongLao = function () {
    var s = G.S;
    G.ui.dialog([
      { who: 'Ông lão', text: 'Ơ, cậu thầy cúng! Nghe nói thầy cậu mất rồi. Tội.' },
      { who: 'Ông lão', text: 'Mà lạ lắm. Đêm trước lễ bốn mươi chín ngày, tôi thấy **một thầy cúng già** vào nhà ấy một mình, tay xách cái thuổng. Tôi tưởng thầy cậu đến xem đất trước.', run: function () { G.addClue('L11'); } },
      { who: 'Đăng', text: '(Đêm trước lễ? Hôm ấy thầy với mình còn đang trên đường…)', cls: 'think' }
    ]);
  };
  C.daoLo = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([{ text: 'Nhà vắng. Buồng của Tấm vẫn còn chiếc giường tre bốn chân.', cls: 'think' }]);
    await G.mg.hold('Đào đất dưới chân giường', 2.5);
    await G.ui.say([
      { text: 'Dưới ba chân giường là [[ba lọ sành nhỏ]], trong có xương cá trắng muốt.', img: 'ba_lo', sfx: 'thud' },
      { text: 'Dưới chân thứ tư chỉ có [[một hố trống]]. Đất còn mới, có vết thuổng.', img: 'ba_lo', sfx: 'stinger', run: function () { G.addClue('V15'); s.items.lo_xuong = 3; } },
      { who: 'Đăng', text: '(Ai đó đã đến trước mình. Và chỉ lấy đúng một lọ.)', cls: 'think', img: null }
    ]);
    fl.c2_dao_lo = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.veKinh = async function () {
    var s = G.S;
    if (!s.flags.c2_dao_lo) return G.ui.dialog([{ text: 'Chưa đào được lọ xương. Chưa về được.', cls: 'think' }]);
    s.flags.c2_ve_lang = true;
    C.toPhase(2, 'toi', 'cung_bep', 760, 300); // đi xe bò về kinh: tới nơi trong cung
  };

  // ---------- đêm 2: hai cảnh lẻn ----------
  C.dangerVuon = function () {
    G.danger.start({ loc: 'cung_vuon',
      guards: [
        { id: 'l1', look: LINH, path: [[420, 520], [760, 520], [760, 440], [420, 440]], speed: 48, range: 160, fov: 70 },
        { id: 'l2', look: LINH, path: [[260, 620], [260, 470], [460, 470], [460, 620]], speed: 40, range: 140, fov: 60 }
      ],
      ghosts: [{ id: 'goc', x: 640, y: 560, hear: 230, speed: 90, html: G.ch1.ghostHtml(false) }],
      hides: [[730, 320, 170, 70], [850, 580, 100, 70], [40, 590, 160, 80]],
      onCaught: function (k) { return k === 'linh' ? 'Thị vệ chém trước tâu sau.' : 'Rễ cây quấn quanh cổ chân, kéo Đăng xuống đất. Đất ấm như da người.'; },
      restart: function () { C.dangerVuon(); } });
    C.music();
    G.ui.toast('Hai lính gác quanh cây. Gốc xoan có thứ nghe được tiếng động. Lại gần cây từ **phía bắc**.', 5000);
  };
  C.dangerHau = function () {
    G.danger.start({ loc: 'cung_hau',
      guards: [{ id: 'dg', look: DIGHE_DEN, path: [[600, 330], [600, 470], [380, 470], [380, 330]], speed: 42, range: 170, fov: 70 }],
      hides: [[420, 225, 120, 40], [740, 235, 100, 40], [130, 285, 70, 30]],
      onCaught: function () { return 'Dì ghẻ quay lại. Chiếc nhẫn bạc lóe lên, rồi tối sầm.'; },
      restart: function () { C.dangerHau(); } });
    C.music();
    G.ui.toast('Dì ghẻ đi tuần trong phòng. Nấp sau **bàn trang điểm** hoặc **giá yếm**. Hộp ngải ở gầm giường.', 5000);
  };
  C.layVo = function () {
    var s = G.S;
    G.danger.holdAt({ x: 580, y: 572 }, 3, async function () {
      s.flags.c2_vo = true; G.audio.sfx('crack');
      G.danger.stop(); C.music();
      W.refresh(); W.locked = true;
      await G.ui.say([{ text: 'Đăng cạo được một mảnh vỏ xoan. Mặt trong ươn ướt, ấm, [[như da người]].', sfx: 'stinger' }]);
      W.locked = false; G.ui.hud(); G.save();
    });
  };
  C.layHop = function () {
    var s = G.S;
    G.danger.holdAt({ x: 240, y: 300 }, 3, async function () {
      s.flags.c2_hop = true; G.audio.sfx('paper');
      G.danger.stop(); C.music();
      W.refresh(); W.locked = true;
      await G.ui.say([
        { text: 'Dưới gầm giường: một hộp gỗ sơn son. Trong hộp có túi thóc trộn gạo, một búi tóc rối, và một lá bùa.', img: 'hop_ngai', run: function () { G.addClue('V16'); } },
        { who: 'Đăng', text: '(Nét bùa này… sao quen thế. Cách móc nét ngang ở cuối…)', cls: 'think', img: 'hop_ngai' },
        { who: 'Cám', text: '(nói mê) …chị ơi…', img: null }
      ]);
      W.locked = false; G.ui.hud(); G.save();
    });
  };
  C.afterKy3 = async function () {
    var s = G.S;
    s.flags.c2_ky3 = true; G.addClue('V18');
    W.refresh(); W.locked = true; C.music();
    await G.ui.say([{ who: 'Đăng', text: '(Chiếc hài trôi về kinh thành. Rồi cô ấy thành hoàng hậu. Rồi cô ấy chết dưới gốc cau.)', cls: 'think' },
      { who: 'Đăng', text: '(Lũ chim sẻ… cô ấy chỉ nói một câu, chúng đã giết nhau.)', cls: 'think' }]);
    W.locked = false; G.ui.hud(); G.save();
  };

  C.onVerdict = async function (id, k) {
    var s = G.S, d = G.DEATHS[id], dung = k === d.answer;
    s.verdict[id] = k;
    s.flags['c2_' + id] = dung ? 'dung' : 'sai';
    G.save();
    var txt = {
      moc: dung ? '(Dì ghẻ. Chốt rìu bị nới, thư dặn lão quên chuyện làng Đông. Lão thấy cảnh chặt cau.)' : '(…Nếu không phải ma thì là ai? Mình có bỏ sót gì không?)',
      mit: dung ? '(Không ai bế con bé ra vườn. Lần này… là cô ấy. Hồn Tấm đã bắt đầu giết người vô tội.)' : '(…Mình chắc chứ?)'
    }[id];
    await G.ui.say([{ who: 'Đăng', text: txt, cls: 'think' }]);
    G.ui.hud();
  };

  // ---------- kết chương ----------
  C.ket = async function () {
    var s = G.S, fl = s.flags;
    if (fl.c2_het) return;
    W.locked = true;
    await G.ui.fade(function () { fl.c2_don_xong = true; W.enter('cung_vuon', 420, 660); });
    W.locked = true;
    await G.ui.say([
      { text: 'Sáng. Thợ mới đến từ tờ mờ. Đến trưa, cây xoan đã nằm dài trên cỏ, cưa thành từng tấm.', cls: 'think', sfx: 'chop' },
      { who: 'Dì ghẻ', text: 'Gỗ tốt thế này đốt thì phí. Đem đóng cho hoàng hậu **một khung cửi**.' },
      { text: 'Người ta khiêng ván gỗ đi ngang qua Đăng. Một tấm ván [[rỉ ra một dòng nhựa đỏ]], nhỏ xuống thành vệt dài trên đá.', sfx: 'drip' },
      { who: 'Đăng', text: '(Chim vàng anh. Cây xoan. Giờ là khung cửi. Cô ấy vẫn chưa đi.)', cls: 'think' },
      { who: 'Đăng', text: '(Còn lá bùa trong hộp ngải… mình đã thấy nét chữ ấy ở đâu?)', cls: 'think' }
    ]);
    fl.c2_het = true; G.save();
    G.audio.music('title');
    var nD = G.DEDUCE.filter(function (x) { return s.deduce[x.id]; }).length;
    var sai = ['lai', 'basau', 'moc', 'mit'].filter(function (k) { return s.verdict[k] !== undefined && s.verdict[k] !== G.DEATHS[k].answer; }).length;
    await G.ui.card('Hết chương 2', 'Sổ Tử: ' + Object.keys(s.clues).length + ' manh mối · ' + nD + '/' + G.DEDUCE.length +
      ' phép đối chiếu · kết luận sai ' + sai + ' trang · Đăng đã chết ' + (s.deaths || 0) + ' lần.<br>Lọ xương Bống đang giữ: **' + (s.items.lo_xuong || 0) + '**.', 'Sang Chương 3 ›');
    W.locked = false;
    G.ch3.begin();
  };
})();
