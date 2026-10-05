// Kịch bản CHƯƠNG 4: Quả thị. Xem docs/dac-ta-ch4.md.
var G = window.G || (window.G = {});
G.ch4 = {};

Object.assign(G.CLUES, {
  L19: { type: 'L', title: 'Bà cụ từng là bà đồng', text: '"Hồn người có khi bị xẻ làm đôi. Nửa thương nhớ thì đi tìm đường về, nửa căm hờn thì bị người ta giữ lại."' },
  L20: { type: 'L', title: 'Đội Ngạn: thầy dặn hái trước rằm', text: 'Trước khi chết, Đội Ngạn lẩm bẩm: "Thầy dặn hái trước rằm. Thầy trả gấp đôi."' },
  L21: { type: 'L', title: 'Lính: cả chuồng ngựa bỏ ăn', text: 'Đêm qua Đội Ngạn đi rừng một mình. Từ nửa đêm cả chuồng ngựa bỏ ăn. "Một con ngựa đau, cả tàu bỏ cỏ."' },
  L22: { type: 'L', title: 'Ông lão: người áo đen', text: 'Dạo này đêm nào cũng có người áo đen đi chân đất ra vào nhà dì ghẻ.' },
  L23: { type: 'L', title: 'Dì ghẻ: không nợ ai', text: '"Ta không nợ ai cái gì. Ai đòi thì bảo người ấy đến gặp ta."' },
  V23: { type: 'V', title: 'Cây thị một quả', text: 'Cây thị mọc ở chỗ lính đổ tro. Cả cây chỉ có một quả, sáng như đèn.' },
  V24: { type: 'V', title: 'Dấu chân trần về phía đông', text: 'Quanh gốc thị có dấu chân trần to, đi về phía đông, phía làng Đông.' },
  V25: { type: 'V', title: 'Dấu tay nhỏ trên cổ chân Đội Ngạn', text: 'Năm vết ngón tay nhỏ như tay con gái quấn quanh cổ chân. Không có dấu chân người nào ra mép ao.' },
  V26: { type: 'V', title: 'Sổ nợ ngải', text: 'Ngải vào cung đổi bằng hồn con gái của chồng. Rắc tro ba ngả: đã trả. Còn nợ một hồn nữa, đúng ngày.' },
  V27: { type: 'V', title: 'Hũ sành dán bùa', text: 'Dưới bàn thờ nhà dì ghẻ. Đáy hũ chính là lọ xương Bống thứ tư. Hũ biết gọi tên Đăng.' }
});
G.DEDUCE.push(
  { id: 'C4D1', a: 'L21', b: 'V25', title: 'Đội Ngạn bị vong kéo', text: 'Đi một mình, ngựa bỏ ăn vì thấy vong. Dấu tay nhỏ trên cổ chân. [[Lần này là cô ấy.]]' },
  { id: 'C4D2', a: 'L19', b: 'V27', title: 'Nửa hồn bị nhốt trong hũ', text: 'Nửa hồn căm hờn của Tấm [[bị giữ trong hũ sành]], đáy hũ là xương người bạn duy nhất của cô.' },
  { id: 'C4D3', a: 'L23', b: 'V26', title: 'Dì ghẻ nợ ngải', text: 'Dì ghẻ đổi hồn Tấm lấy ngải đưa Cám vào cung. [[Và còn nợ một hồn nữa.]]' },
  { id: 'C4D4', a: 'L20', b: 'V24', title: 'Đội Ngạn là người của thầy', text: 'Dấu chân trần về làng Đông, Đội Ngạn hái quả "theo lời thầy". [[Thầy Cả có tay chân trong cung.]]' }
);
G.DEATHS.ngan = { name: 'Đội Ngạn', img: 'por_ngan',
  meta: function () { return 'Thị vệ trưởng. Sáng ngày 2 nổi ở ao thị bìa rừng. Đêm trước hắn đi hái quả thị một mình.'; },
  ready: function (S) { return !!S.deduce.C4D1; },
  choices: ['Ma giết', 'Người giết: Thầy Cả', 'Người giết: Dì ghẻ', 'Trượt chân'], answer: 0,
  verdict: function (S) { var v = (S.verdict || {}).ngan; return v !== undefined ? 'Kết luận: ' + G.DEATHS.ngan.choices[v] : (G.DEATHS.ngan.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } };

(function () {
  var C = G.ch4, W = G.world, $ = G.$, L = G.LOOKS;
  var PH = ['sang', 'chieu', 'toi', 'dem'], PHN = { sang: 'Sáng', chieu: 'Chiều', toi: 'Tối', dem: 'Đêm' };
  var NGAY = { 1: 'mười ba', 2: 'mười bốn', 3: 'rằm' };
  L.aoDen = { hair: 'non_la', shirt: '#1E1A22', pants: '#1E1A22', shoes: '#EBCDAA', eyes: 'narrow', prop: 'lantern' };
  L.tieuPhu = { hair: 'non_la', shirt: '#7A6A4A', pants: '#4A4650', eyes: 'tired', prop: 'axe' };
  function ma(look, k) { return '<div style="position:absolute;left:0;top:0;opacity:.62;filter:url(#wob)"><div style="position:absolute;left:0;top:0;transform:scale(.5);transform-origin:0 0">' + G.art.chibi(Object.assign({}, look, { view: 'front', eyes: 'blank', skin: '#C8D8D8' })) + '</div></div>'; }
  function nam(look, rot) { return '<div style="position:absolute;left:0;top:0;transform:scale(.5) rotate(' + (rot || 90) + 'deg);transform-origin:0 -40px">' + G.art.chibi(Object.assign({}, look, { view: 'front' })) + '</div>'; }
  C.choMo = function (S) { return S.chapter === 'ch4' && S.day === 3 && S.phase === 'dem'; };

  C.begin = async function () {
    var s = G.S;
    s.chapter = 'ch4'; s.day = 1; s.phase = 'sang'; s.beat = 'c4';
    s.inv = s.inv || { nhang: 2, gao: 2, bua: 2 }; s.inv.tienam = s.inv.tienam || 0; s.money = s.money || 4; s.verdict = s.verdict || {};
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
    if (G.danger.active) G.danger.stop();
    await G.cut.chuong('Chương 4', 'Quả thị');
    W.enter('cung_bep', 760, 300);
    C.music(); W.locked = true;
    await G.ui.say([
      { text: 'Mười ba tháng Tám. Còn hai ngày nữa là rằm.', cls: 'think' },
      { who: 'Đăng', text: '(Thầy còn sống. Thầy ở đâu đó quanh đây. Và cây thị một quả…)', cls: 'think' },
      { who: 'Lính hầu', text: 'Thầy ơi, bà cụ hàng nước ngoài cổng thành nhắn: nhờ thầy ra trông hàng giúp bà một buổi.' }
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
    if (s.loc === 'hang_nuoc' && day) list.push({ id: 'bacu', look: L.baCu, x: 360, y: 372, view: 'front', label: 'Bà cụ hàng nước', fixedView: true });
    if (s.loc === 'cung_san') {
      if (day || p === 'toi') list.push({ id: 'linhtre', look: L.linhTre, x: 880, y: 320, view: 'front', label: 'Lính gác cổng bắc' });
      if (d === 1 && day) list.push({ id: 'ngan', look: L.ngan, x: 600, y: 560, view: 'side', flip: -1, label: 'Đội Ngạn' });
    }
    if (s.loc === 'cung_hau' && day) list.push({ id: 'dighe', look: L.dighe, x: 560, y: 330, view: 'front', label: 'Dì ghẻ' }, { id: 'cam', look: L.cam, x: 420, y: 320, view: 'front', label: 'Cám' });
    if (s.loc === 'cung_bep' && !fl.c1_basau_chet && (day || p === 'toi')) list.push({ id: 'basau', look: L.baSau, x: 220, y: 270, view: 'front', label: 'Bà Sáu bếp' });
    if (s.loc === 'bia_rung') {
      if (d === 2 && p === 'sang') {
        list.push({ id: 'xacngan', html: G.art.xac(L.ngan, { rot: 95, nuoc: true }), x: 420, y: 480, ghost: true });
        list.push({ id: 'linh', look: L.linhTre, x: 560, y: 520, view: 'side', flip: -1, label: 'Lính' });
      }
      if (C.choMo(s) && !fl.c4_bo_chinh) {
        if (!fl.c4_hai) list.push({ id: 'bacu', look: L.baCu, x: 600, y: 470, view: 'side', flip: -1, label: 'Bà cụ' });
        if (!fl.c4_thi_gia) list.push({ id: 'aoden', look: L.aoDen, x: 460, y: 470, view: 'side', flip: 1, label: 'Người áo đen' });
      }
    }
    if (s.loc === 'cho_am' && C.choMo(s)) {
      if (!fl.c4_do) list.push({ id: 'canh', html: ma(L.ongLao), x: 880, y: 500, label: 'Hồn canh chợ', ghost: true });
      if (!fl.c4_tra1) list.push({ id: 'ban1', html: ma(L.danLang2), x: 600, y: 500, label: 'Hồn bán nhang', ghost: true });
      if (!fl.c4_tra2) list.push({ id: 'ban2', html: ma(L.danLang), x: 400, y: 500, label: 'Hồn bán lông chim', ghost: true });
      if (!fl.c4_tra3) list.push({ id: 'ban3', html: ma(L.baTu || L.danLang2), x: 200, y: 500, label: 'Hồn bán bóng người', ghost: true });
    }
    if (s.loc === 'lang_duong') list.push({ id: 'onglao', look: L.ongLao, x: 800, y: 440, view: 'front', label: 'Ông lão bán nước' });
    if (s.loc === 'nha_bacu') list.push({ id: 'bacu', look: L.baCu, x: 560, y: 330, view: 'front', label: 'Bà cụ' });
    return list;
  };

  // ---------- đồ vật ----------
  C.things = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [], day = p === 'sang' || p === 'chieu';
    if (s.loc === 'cung_san') {
      list.push({ id: 'cua_dien', x: 480, y: 292, hit: [440, 160, 80, 120], label: 'Vào cung hoàng hậu', door: { to: 'cung_hau', x: 500, y: 520, view: 'back' } });
      list.push({ id: 'cua_bep', x: 124, y: 656, hit: [90, 556, 70, 80], label: 'Vào bếp & phòng Đăng', door: { to: 'cung_bep', x: 460, y: 520, view: 'back' } });
    }
    if (s.loc === 'cung_hau') list.push({ id: 'ra_san', x: 500, y: 530, hit: [460, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 480, y: 310 } });
    if (s.loc === 'cung_bep') {
      list.push({ id: 'ra_san', x: 460, y: 532, hit: [420, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 124, y: 668 } });
      list.push({ id: 'chong', x: 780, y: 240, hit: [706, 160, 150, 62], label: 'Chõng tre: nghỉ' });
    }
    if (s.loc === 'hang_nuoc') {
      if (d === 1 && p === 'sang' && !fl.c4_trong_hang) list.push({ id: 'trong_hang', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Trông hàng giúp bà cụ', quest: true });
      else if (day) list.push({ id: 'mua', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Mua đồ nghề' });
      if (d === 2 && p === 'chieu' && !fl.c4_ve_lang) list.push({ id: 'xe', x: 700, y: 520, label: 'Thuê xe bò về làng Đông (2 đồng)', quest: true });
      if (fl.c4_hai && !fl.c4_bo_chinh) list.push({ id: 'cua_bacu', x: 560, y: 424, hit: [540, 340, 40, 70], label: 'Vào nhà bà cụ', quest: true, door: { to: 'nha_bacu', x: 460, y: 500, view: 'back' } });
    }
    if (s.loc === 'nha_bacu') {
      list.push({ id: 'ra_hang', x: 460, y: 512, hit: [420, 520, 80, 40], label: 'Ra ngoài', door: { to: 'hang_nuoc', x: 560, y: 440 } });
      if (!fl.c4_bo_chinh) list.push({ id: 'chinh', x: 700, y: 300, hit: [640, 180, 120, 110], label: 'Chĩnh sành của bà cụ', quest: true });
    }
    if (s.loc === 'bia_rung') {
      if (!fl.c4_hai) list.push({ id: 'cay', x: 540, y: 430, hit: [400, 100, 280, 320], label: 'Cây thị', quest: d === 1 && !s.clues.V23 });
      if (d === 1 && p === 'chieu' && !s.clues.V24) list.push({ id: 'chan', x: 640, y: 470, hit: [580, 420, 120, 60], label: 'Mặt đất quanh gốc' });
      if (d === 1 && p === 'dem' && !fl.c4_ngan_chet) list.push({ id: 'nap', x: 780, y: 400, hit: [700, 320, 140, 100], label: 'Nấp sau gốc cây mà nhìn', quest: true });
      if (d === 2 && p === 'sang' && !s.clues.V25) list.push({ id: 'xacngan', x: 420, y: 500, hit: [360, 440, 120, 60], label: 'Xem xác Đội Ngạn', quest: true });
      if (C.choMo(s) && fl.c4_thi_gia && !fl.c4_hai) list.push({ id: 'goi_thi', x: 560, y: 470, label: 'Để bà cụ gọi quả thị', quest: true });
    }
    if (s.loc === 'lang_duong') {
      if (d === 2 && p === 'chieu') list.push({ id: 'doi', x: 820, y: 470, label: 'Ngồi quán đợi đến đêm', quest: true });
      if (fl.c4_lay_xong) list.push({ id: 'xe_ve', x: 140, y: 500, label: 'Đi xe bò về kinh thành', quest: true });
    }
    if (s.loc === 'nha_dighe' && d === 2 && p === 'dem' && !fl.c4_lay_xong) list.push({ id: 'ban_tho', x: 480, y: 214, hit: [418, 64, 124, 128], label: 'Bàn thờ', quest: true });
    return list;
  };

  C.objective = function (s) {
    var d = s.day, p = s.phase, fl = s.flags;
    if (d === 1) {
      if (p === 'sang') return fl.c4_trong_hang ? 'Nghỉ đến chiều, rồi ra **bìa rừng phía tây** (đi tiếp sang trái từ hàng nước).' : 'Ra **hàng nước ngoài thành** trông hàng giúp bà cụ.';
      if (p === 'chieu') return !s.clues.V23 || !s.clues.V24 ? 'Ra **bìa rừng phía tây** xem cây thị. Mở **mắt âm dương (B)** quanh gốc.' : 'Về nghỉ.';
      if (p === 'toi') return 'Nghỉ chờ đêm.';
      return fl.c4_ngan_chet ? 'Về phòng ngủ.' : 'Đội Ngạn vừa đi ra phía rừng. **Theo hắn** ra bìa rừng, đừng để hắn thấy.';
    }
    if (d === 2) {
      if (p === 'sang') return !s.clues.V25 ? 'Ra **bìa rừng**: người ta vớt được xác ở ao thị.' : 'Kết luận cái chết của **Đội Ngạn** trong Sổ Tử, rồi nghỉ.';
      if (p === 'chieu') return fl.c4_ve_lang ? 'Ở **làng Đông**: hỏi ông lão, rồi **ngồi quán đợi đến đêm**.' : 'Thuê xe bò ở **hàng nước** về **làng Đông**.';
      if (p === 'dem') return fl.c4_lay_xong ? 'Ra **đường làng**, đi xe bò về kinh.' : 'Lẻn vào **nhà dì ghẻ**. Xem **bàn thờ**. Có người áo đen canh.';
    }
    if (d === 3) {
      if (p === 'sang') return 'Đêm nay rằm. Hỏi **dì ghẻ** ở cung hoàng hậu. Rồi nghỉ.';
      if (p === 'chieu') return (!s.items.ao_giay || s.inv.tienam < 3) ? 'Ở **hàng nước**: mua **áo giấy** và **3 tờ tiền âm phủ** từ bà cụ.' : 'Nghỉ chờ đêm rằm.';
      if (p === 'toi') return 'Nghỉ chờ đêm rằm.';
      if (!fl.c4_qua_cho) return 'Đi qua **đường rừng** (sang trái từ hàng nước). Đêm nay nó là **chợ âm**. Đừng chạy.';
      if (!fl.c4_hai) return 'Tới **cây thị**. Bà cụ đang đợi.';
      return 'Mang quả thị về **nhà bà cụ** (cửa sau quán nước).';
    }
    return '';
  };

  function gate(s) {
    var d = s.day, p = s.phase, fl = s.flags;
    if (d === 1 && p === 'sang' && !fl.c4_trong_hang) return 'Bà cụ đang đợi ở hàng nước.';
    if (d === 1 && p === 'chieu' && (!s.clues.V23 || !s.clues.V24)) return 'Ra bìa rừng xem cây thị đã.';
    if (d === 1 && p === 'dem' && !fl.c4_ngan_chet) return 'Đội Ngạn đi rừng một mình… phải theo xem.';
    if (d === 2 && p === 'sang' && !s.clues.V25) return 'Ra bìa rừng đã.';
    if (d === 2 && p === 'chieu') return 'Về làng Đông, ngồi quán ông lão đợi đến đêm.';
    if (d === 2 && p === 'dem') return 'Không ngủ ở đây được.';
    if (d === 3 && p === 'chieu' && (!s.items.ao_giay || s.inv.tienam < 3)) return 'Phải mua áo giấy và tiền âm phủ đã.';
    if (d === 3 && p === 'dem') return 'Đêm rằm. Không ngủ được.';
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
    await G.ui.fade(function () { s.day = day; s.phase = ph; $('stage').classList.remove('soi'); if (loc || ph === 'sang') W.enter(loc || 'cung_bep', x || 760, y || 300); else W.enter(s.loc, s.x, s.y); });
    C.music();
    await G.ui.card('Ngày ' + NGAY[day] + ' · ' + PHN[ph], day === 3 && ph === 'dem' ? 'Trăng rằm tròn vành vạnh.' : '');
    G.save();
    C.wake();
  };
  C.wake = async function () {
    var s = G.S, d = s.day, p = s.phase;
    if (d === 1 && p === 'toi') { W.locked = true; await G.ui.say([{ who: 'Lính hầu', text: '(thì thầm) Thầy ơi, Đội Ngạn vừa cưỡi ngựa ra cổng tây một mình. Mặt hắn trắng bệch.' }]); W.locked = false; }
    if (d === 2 && p === 'sang') { W.locked = true; G.audio.sfx('stinger'); await G.ui.say([{ who: 'Bà Sáu', text: 'Thầy ơi… người ta vớt được Đội Ngạn ở cái ao cạnh cây thị.' }]); W.locked = false; }
    G.ui.hud();
  };

  C.onEnter = function (loc) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (G.danger.active && G.danger.cfg && G.danger.cfg.loc && G.danger.cfg.loc !== loc) { G.danger.stop(); C.music(); }
    if (loc === 'hang_nuoc' && d === 1 && p === 'sang' && !fl.c4_moi) { fl.c4_moi = true; setTimeout(function () { G.ui.dialog([{ who: 'Bà cụ', text: 'Thầy đến rồi. Già đau lưng, thầy trông hàng giúp già một lúc. Khách gọi gì thì đưa nấy.' }]); }, 400); }
    if (loc === 'bia_rung' && d === 1 && p === 'dem' && !fl.c4_ngan_chet && !G.danger.active) C.dangerNgan();
    if (loc === 'nha_dighe' && d === 2 && p === 'dem' && !fl.c4_lay_xong && !G.danger.active) C.dangerNha();
    if (loc === 'cho_am' && C.choMo(s) && !fl.c4_qua_cho && !G.danger.active) C.vaoCho();
    if (loc === 'bia_rung' && C.choMo(s) && !fl.c4_thi_gia) setTimeout(C.thiGia, 500);
  };
  C.canExit = function (dir, to) {
    var s = G.S, d = s.day, p = s.phase, fl = s.flags;
    if (to === 'cung_san' && s.loc === 'hang_nuoc' && C.choMo(s) && !fl.c4_bo_chinh && fl.c4_hai) { G.ui.toast('Mang quả thị vào **nhà bà cụ** trước đã.'); return false; }
    if (to === 'cho_am' && C.choMo(s) && !s.items.ao_giay) { G.ui.toast('Bà cụ dặn: **đi với ma mặc áo giấy**. Chưa có áo giấy thì đừng vào.'); return false; }
    if (to === 'bia_rung' && C.choMo(s) && !(fl.c4_do && fl.c4_tra1 && fl.c4_tra2 && fl.c4_tra3)) { G.ui.toast('Các hồn trong chợ còn đứng chắn lối.'); return false; }
    if (s.loc === 'lang_duong' && dir === 'left') return false;
    if (s.loc === 'nha_dighe' && to === 'vuon_cau') { G.ui.toast('Không có việc gì ở vườn cau lúc này.'); return false; }
    return true;
  };

  // ---------- tương tác ----------
  C.act = function (id) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    switch (id) {
      case 'chong': return C.rest();
      case 'trong_hang': return C.trongHang();
      case 'mua': return C.shop();
      case 'bacu':
        if (s.loc === 'nha_bacu') return G.ui.dialog([{ who: 'Bà cụ', text: 'Đặt quả thị vào chĩnh đi thầy. Têm cho già miếng trầu đã.' }]);
        if (C.choMo(s)) return G.ui.dialog([{ who: 'Bà cụ', text: 'Đợi nó đọc xong đã. Kẻ tham thì bao giờ cũng đọc trước.' }]);
        return G.ui.dialog([{ who: 'Bà cụ', text: d === 3 ? 'Rằm rồi. Thầy nhớ mặc áo giấy. **Đi với Bụt mặc áo cà sa, đi với ma mặc áo giấy.**' : 'Quả thị ấy chỉ rụng vào bị người già, vào đêm rằm. Già biết câu gọi nó.' }]);
      case 'ngan': return G.ui.dialog([{ who: 'Đội Ngạn', text: '(nhìn ra phía tây, không nghe Đăng nói) …hai ngày nữa…' }]);
      case 'dighe': return G.ui.dialog([{ who: 'Dì ghẻ', text: 'Ta **không nợ ai cái gì**. Ai đòi thì bảo người ấy đến gặp ta.', run: function () { G.addClue('L23'); } }]);
      case 'cam': return G.ui.dialog([{ who: 'Cám', text: 'Đêm qua ta mơ thấy chị ấy ngồi trong một quả thị. Chị ấy gõ vào vỏ, gõ ba cái, như gõ cửa.' }]);
      case 'basau': return G.ui.dialog([{ who: 'Bà Sáu', text: 'Cả chuồng ngựa bỏ ăn từ đêm qua. Già sợ lắm thầy ạ.' }]);
      case 'linhtre': return G.ui.dialog([{ who: 'Lính gác', text: d >= 2 ? 'Đội Ngạn chết rồi. Bọn em nhẹ cả người, nói thật với thầy.' : 'Đội Ngạn hỏi em đường ra bìa rừng phía tây.' }]);
      case 'linh': return G.ui.dialog([{ who: 'Lính', text: 'Đêm qua Đội Ngạn đi một mình, không cho ai theo. Từ nửa đêm cả chuồng ngựa bỏ ăn, đứng run. **Một con ngựa đau, cả tàu bỏ cỏ**, mà đây là cả tàu cùng sợ.', run: function () { G.addClue('L21'); } }]);
      case 'cay':
        if (!s.clues.V23) return G.ui.dialog([{ text: 'Cây thị không cao lắm mà cả cây chỉ có [[đúng một quả]], vàng ươm, sáng như đèn lồng. Chỗ này là chỗ lính đổ tro.', img: 'cay_thi', run: function () { G.addClue('V23'); } },
          { who: 'Đăng', text: '(Ăn quả nhớ kẻ trồng cây… ai trồng cây này? Tro của cô ấy.)', cls: 'think', img: null }]);
        return G.ui.dialog([{ text: 'Đăng với tay, rồi trèo lên. Cành thị cứ dài ra, quả thị cứ xa thêm một gang. [[Không hái được.]]', cls: 'think' }]);
      case 'chan':
        if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Đất quanh gốc bị giẫm nát. Mở **mắt âm dương (B)** xem kỹ hơn.', cls: 'think' }]);
        return G.ui.dialog([{ text: 'Qua mắt âm dương: [[dấu chân trần]] to bản, đi vòng quanh gốc thị rồi đi thẳng về phía đông.', img: 'chan_tran', run: function () { G.addClue('V24'); } }]);
      case 'nap': return C.xemNgan();
      case 'xacngan': return C.xemXacNgan();
      case 'xe': return C.veLang();
      case 'onglao': return G.ui.dialog([{ who: 'Ông lão', text: 'Lại cậu thầy cúng. Dạo này đêm nào cũng có **người áo đen**, đi chân đất, ra vào nhà dì ghẻ. Nhà ấy có ai ở đâu.', run: function () { G.addClue('L22'); } }]);
      case 'doi': return C.doiDem();
      case 'ban_tho': return C.banTho();
      case 'xe_ve': return C.veKinh();
      case 'canh': return C.canhCho();
      case 'ban1': return C.tra(1, 'Hồn bán nhang', 'Nhang của tôi thắp cho người chưa chết. Một tờ.');
      case 'ban2': return C.tra(2, 'Hồn bán lông chim', 'Lông đại bàng đây. Người trong hang không cần nữa. Một tờ.');
      case 'ban3': return C.tra(3, 'Hồn bán bóng người', 'Cậu muốn bán cái bóng của cậu không? Thôi, đưa một tờ rồi đi.');
      case 'aoden': return G.ui.dialog([{ who: 'Người áo đen', text: '(không quay lại) Thầy dặn: quả thị phải về tay **ta**.' }]);
      case 'goi_thi': return C.goiThi();
      case 'chinh': return C.boChinh();
    }
  };

  // ---------- ngày 1 ----------
  C.trongHang = async function () {
    var s = G.S;
    var sai = await G.mg.hangNuoc([
      { ten: 'Tiều phu', goi: 'Cho bát nước vối, khát cháy họng.', mon: 'voi' },
      { ten: 'Lái đò', goi: 'Một miếng trầu cho ấm miệng.', mon: 'trau' },
      { ten: 'Bà bán cá', goi: 'Bát chè xanh, đặc vào.', mon: 'tra' }
    ]);
    s.flags.c4_trong_hang = true; s.money += 3; G.ui.hud();
    W.locked = true;
    await G.ui.say([
      { who: 'Tiều phu', text: 'Thầy biết chưa, bìa rừng phía tây, chỗ lính đổ tro hôm nọ, mọc một cây thị. Cả cây **một quả**. Không ai dám hái. Cái ao bên cạnh sâu không đáy.' },
      { who: 'Lái đò', text: 'Đêm qua tôi chèo đò khuya, thấy một người áo đen **đi chân trần** từ rừng ra, đi thẳng về phía làng Đông.' },
      { who: 'Bà bán cá', text: 'Thầy không biết à? Bà cụ đây ngày trước là **bà đồng** có tiếng, ngồi đồng ba làng.' },
      { who: 'Bà cụ', text: '(cười) Chuyện cũ. Già chỉ nhớ một điều: hồn người có khi bị xẻ làm đôi. Nửa thương nhớ thì đi tìm đường về, nửa căm hờn thì bị người ta giữ lại.', run: function () { G.addClue('L19'); } },
      { who: 'Bà cụ', text: 'Thầy cầm **3 đồng**. Chiều ra mà xem cây thị. Nhưng đừng hái. Đêm rằm già sẽ gọi nó.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.shop = function () {
    var s = G.S;
    var items = [['nhang', 'Bó nhang (5 nén)', 2, 5], ['gao', 'Gạo muối (3 nắm)', 1, 3], ['bua', 'Giấy bùa (2 tờ)', 1, 2]];
    if (s.day === 3) items.push(['tienam', 'Tiền âm phủ (3 tờ)', 1, 3], ['ao_giay', 'Áo giấy', 1, 1]);
    G.ui.dialog([{ who: 'Bà cụ', text: 'Tiền của thầy: **' + s.money + ' đồng**. Nhang ' + s.inv.nhang + ', gạo muối ' + s.inv.gao + ', giấy bùa ' + s.inv.bua + (s.day === 3 ? ', tiền âm ' + (s.inv.tienam || 0) + (s.items.ao_giay ? ', đã có áo giấy' : '') : '') + '.', choices: items.map(function (it) {
      return { text: 'Mua ' + it[1] + ' · ' + it[2] + ' đồng', run: function () {
        if (it[0] === 'ao_giay' && s.items.ao_giay) { G.ui.toast('Đã có áo giấy rồi.'); C.shop(); return; }
        if (s.money < it[2]) { G.ui.toast('Không đủ tiền.'); return; }
        s.money -= it[2];
        if (it[0] === 'ao_giay') { s.items.ao_giay = true; G.ui.toast('Bà cụ: "**Đi với Bụt mặc áo cà sa, đi với ma mặc áo giấy.**"', 4000); }
        else s.inv[it[0]] = (s.inv[it[0]] || 0) + it[3];
        G.audio.sfx('clue'); G.ui.hud(); C.shop();
      } };
    }).concat(G.dun ? G.dun.luaChon() : []).concat([{ text: 'Xong', run: function () {} }]) }]);
  };
  C.dangerNgan = function () {
    G.danger.start({ loc: 'bia_rung',
      guards: [{ id: 'ngan', look: Object.assign({}, L.ngan, { prop: 'lantern' }), path: [[600, 460], [420, 430], [460, 330], [620, 330], [680, 430]], speed: 45, range: 170, fov: 75 }],
      hides: [[700, 320, 150, 110], [160, 260, 100, 80]],
      onCaught: function () { return 'Đội Ngạn quay lại. "Thầy cúng à? Thầy dặn ta gặp mày thì cứ chém."'; },
      restart: function () { C.dangerNgan(); } });
    C.music();
    G.ui.toast('Đội Ngạn đi quanh gốc thị. Tới **gốc cây phía đông** mà nấp, đừng để hắn thấy.', 5000);
  };
  C.xemNgan = async function () {
    var s = G.S;
    G.danger.stop(); W.locked = true;
    await G.cut.play([
      { ve: 'aoNgan', chu: 'Đội Ngạn với ra tận đầu cành chìa trên mặt ao.', dur: 3000, cam: [1.35, -80, -90, 1.05, -20, -20], hieu: 'dom', nhac: 'ch4_dem' },
      { ve: 'aoNgan', noi: 'Đội Ngạn', mood: 'khay', chu: 'Thầy dặn hái trước rằm…', dur: 2400 },
      { ve: 'aoNgan', buoc: 2, chu: 'Mặt ao **mở ra**.', dur: 3200, sfx: ['stinger', 'splash'], rung: true, chop: true }
    ]);
    await G.ui.say([
      { text: 'Đăng nấp sau gốc cây. Đội Ngạn treo đèn lồng lên cành, rồi trèo lên cây thị.', cls: 'think' },
      { who: 'Đội Ngạn', text: '(lẩm bẩm) Thầy dặn hái trước rằm. Thầy trả gấp đôi…', run: function () { G.addClue('L20'); } },
      { text: 'Cành thị dài ra. Quả thị lùi xa. Đội Ngạn với theo, với theo, ra tận đầu cành chìa trên mặt ao.', sfx: 'whoosh' },
      { text: 'Rồi từ dưới mặt ao [[có những bàn tay nhỏ thò lên]]. Năm bàn tay. Mười bàn tay.', sfx: 'stinger' },
      { text: 'Đội Ngạn không kịp kêu. Mặt ao khép lại như chưa từng mở.', sfx: 'splash' },
      { who: 'Đăng', text: '(…Hắn giết Lài. Giờ hắn chết như Lài.)', cls: 'think' }
    ]);
    s.flags.c4_ngan_chet = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- ngày 2 ----------
  C.xemXacNgan = async function () {
    W.locked = true;
    await G.ui.say([
      { text: 'Đội Ngạn nằm sấp ở mép ao. Quanh cổ chân hắn có [[năm vết ngón tay nhỏ]], nhỏ như tay con gái. Quanh mép ao không có dấu chân người nào.', img: 'co_chan', run: function () { G.addClue('V25'); G.addDeath('ngan'); } }
    ]);
    W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.veLang = async function () {
    var s = G.S;
    if (s.money < 2) return G.ui.dialog([{ text: 'Không đủ 2 đồng. Mua bớt đồ nghề thì còn đủ tiền đi xe.', cls: 'think' }]);
    s.money -= 2; s.flags.c4_ve_lang = true; G.ui.hud();
    await G.ui.fade(function () { W.enter('lang_duong', 160, 520); });
    await G.ui.card('Làng Đông', 'Chiều mười bốn.');
    G.ui.hud();
  };
  C.doiDem = async function () {
    var s = G.S;
    await G.ui.fade(function () { s.phase = 'dem'; W.enter('lang_duong', 800, 520); });
    C.music();
    await G.ui.card('Đêm mười bốn', 'Làng Đông tắt đèn sớm.');
    G.ui.toast('Nhà dì ghẻ ở phía đông (sang phải).');
    G.save(); G.ui.hud();
  };
  C.dangerNha = function () {
    G.danger.start({ loc: 'nha_dighe',
      guards: [
        { id: 'ad1', look: L.aoDen, path: [[200, 420], [760, 420], [760, 600], [200, 600]], speed: 46, range: 160, fov: 70 },
        { id: 'ad2', look: L.aoDen, path: [[880, 380], [880, 620], [600, 620], [600, 380]], speed: 40, range: 150, fov: 60 }
      ],
      hides: [[0, 360, 150, 210], [840, 400, 120, 110], [160, 230, 60, 50]],
      onCaught: function () { return 'Người áo đen bước tới. Chân hắn trần, lạnh như đá. "Thầy dặn: đứa học trò thì giữ lại."'; },
      restart: function () { C.dangerNha(); } });
    C.music();
    G.ui.toast('Hai người áo đen canh sân. Nấp ở **gốc khế**, **chuồng gà**, **cạnh hòm gỗ**. Bàn thờ ở gian giữa.', 5000);
  };
  C.banTho = async function () {
    var s = G.S, fl = s.flags;
    G.danger.holdAt({ x: 480, y: 214 }, 3, async function () {
      W.locked = true;
      await G.ui.say([
        { text: 'Trên bàn thờ có một quyển sổ bìa đen. Sổ nợ.', img: 'so_no', run: function () { G.addClue('V26'); } },
        { text: 'Dưới gầm bàn thờ: [[một hũ sành dán bùa]]. Đáy hũ là một lọ sành nhỏ, giống hệt ba lọ xương Bống Đăng đào được.', img: 'hu_sanh', run: function () { G.addClue('V27'); } },
        { text: 'Hũ rung lên. Từ trong hũ có tiếng người.', img: 'hu_sanh', sfx: 'stinger' },
        { who: 'Hũ sành', text: 'Đăng ơi.', img: 'hu_sanh' },
        { who: 'Hũ sành', text: 'Đăng. Thầy đây con.', img: 'hu_sanh' }
      ]);
      G.ui.dialog([{ who: 'Đăng', text: '(Giọng thầy. Đúng giọng thầy.)', cls: 'think', img: 'hu_sanh', choices: [
        { text: '"Dạ, thầy."', run: function () { fl.bm_da_thay = true; dapHu(true); } },
        { text: '(Bịt tai lại.)', run: function () { dapHu(false); } }
      ] }]);
    });
    async function dapHu(da) {
      await G.ui.say(da ? [
        { who: 'Hũ sành', text: 'Ngoan. Con vẫn là đứa ngoan nhất. Đêm mai, quả thị, con mang về cho người già nhé.', img: 'hu_sanh' },
        { text: 'Trong Sổ Tử, [[một trang tự bị gạch xóa]]. Tiếng giấy xé khẽ.', sfx: 'paper', img: null }
      ] : [
        { text: 'Đăng bịt tai. Tiếng gọi vẫn lọt qua kẽ ngón tay, rồi tắt dần.', img: 'hu_sanh' }
      ]);
      G.ui.dialog([{ who: 'Đăng', text: 'Mang cái hũ đi?', choices: [
        { text: 'Mang hũ đi (giấu vào tráp)', run: function () { s.items.hu_sanh = true; fl.c4_lay_hu = true; xong(); } },
        { text: 'Để lại. Không dám động vào', run: function () { xong(); } }
      ] }]);
    }
    async function xong() {
      fl.c4_lay_xong = true; G.danger.stop(); C.music();
      await G.ui.say([{ who: 'Đăng', text: fl.c4_lay_hu ? '(Hũ nặng hơn mình tưởng. Như ôm một đứa trẻ đang ngủ.)' : '(Để nó lại. Thầy sẽ biết mình đã đến.)', cls: 'think' },
        { text: 'Ra **đường làng** đi xe bò về kinh.', cls: 'think' }]);
      W.locked = false; G.ui.hud(); G.save();
    }
  };
  C.veKinh = function () { C.toPhase(3, 'sang'); };

  // ---------- ngày 3: chợ âm ----------
  C.vaoCho = function () {
    G.danger.start({ loc: 'cho_am',
      ghosts: [{ id: 'g1', x: 640, y: 600, hear: 160, speed: 75, html: G.ch1.ghostHtml(false) }, { id: 'g2', x: 300, y: 610, hear: 160, speed: 75, html: G.ch1.ghostHtml(false) }],
      onCaught: function () { return 'Chạy trong chợ âm. Cả chợ quay lại nhìn. Đăng bị giữ lại làm hàng.'; },
      restart: function () { C.vaoCho(); } });
    C.music();
    G.ui.toast('Chợ âm. **Đừng chạy**, ma sẽ nghe. Trả mỗi hồn bán hàng một tờ tiền âm để qua.', 5000);
  };
  C.canhCho = async function () {
    var s = G.S;
    await G.ui.say([{ who: 'Hồn canh chợ', text: 'Người sống vào chợ phải nối được câu hát. Nghe đây.' }, { who: 'Hồn canh chợ', text: 'Cái bống là cái bống bang…', cls: 'verse' }]);
    var loi = await G.mg.ve('Nối câu đồng dao', ['khéo sảy khéo sàng', 'cho mẹ nấu cơm.', 'Mẹ bống đi chợ đường trơn,', 'bống ra gánh đỡ chạy cơn mưa ròng.'], ['bống đi chợ Đông,', 'cho mẹ đi chợ.', 'bống về nhà ngủ.'], 4);
    if (loi > 2) { G.die('Đọc sai câu hát. Hồn canh chợ nhìn kỹ mặt Đăng: người sống. Cửa chợ khép lại.'); return; }
    s.flags.c4_do = true; W.refresh(); G.ui.toast('Hồn canh chợ tránh sang bên.'); G.save();
  };
  C.tra = function (k, ten, loi) {
    var s = G.S;
    if (!s.flags.c4_do) return G.ui.dialog([{ who: ten, text: 'Chưa qua cửa chợ mà đã đòi mua?' }]);
    if ((s.inv.tienam || 0) < 1) return G.ui.dialog([{ who: ten, text: loi }, { text: '(Hết tiền âm phủ. Không qua được.)', cls: 'think' }]);
    G.ui.dialog([{ who: ten, text: loi, choices: [{ text: 'Đưa một tờ tiền âm', run: function () {
      s.inv.tienam--; s.flags['c4_tra' + k] = true; G.audio.sfx('paper'); G.ui.hud();
      if (s.flags.c4_tra1 && s.flags.c4_tra2 && s.flags.c4_tra3) { s.flags.c4_qua_cho = true; G.ui.toast('Lối đi đã mở. Cây thị ở phía tây (sang trái).'); }
      G.danger.stop(); C.music(); W.refresh(); if (!s.flags.c4_qua_cho) C.vaoCho(); G.save();
    } }, { text: 'Thôi', run: function () {} }] }]);
  };
  C.thiGia = async function () {
    var s = G.S, fl = s.flags; if (fl.c4_thi_gia) return;
    W.locked = true;
    await G.ui.say([
      { text: 'Dưới gốc thị, bà cụ đứng chống gậy. Cách đó mươi bước là một **người áo đen**, chân trần, tay cầm cái bị.', cls: 'think' },
      { who: 'Người áo đen', text: 'Thị ơi thị rụng bị bà, bà để bà ngửi chứ bà không ăn.', cls: 'verse' },
    ]);
    await G.cut.play([
      { ve: 'quaThi', chu: 'Quả thị rụng.', dur: 1900, sfx: 'thud', hieu: 'dom' },
      { ve: 'quaThi', buoc: 2, chu: 'Hắn mở bị ra. Bên trong là **một cái đầu chim vàng anh**, mắt còn mở.', dur: 3400, cam: [1, 0, 0, 1.3, 0, -20], sfx: 'stinger', chop: true }
    ]);
    await G.ui.say([
      { who: 'Người áo đen', text: '(ném cái bị, lùi lại) Thầy… thầy không nói…', img: null },
      { text: 'Hắn bỏ chạy về phía đông. Trên cành, chỗ quả vừa rụng, [[quả thị thật vẫn còn]].', cls: 'think' },
      { who: 'Bà cụ', text: 'Kẻ tham bao giờ cũng gọi trước. Quả giả để cho kẻ tham.' }
    ]);
    fl.c4_thi_gia = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.goiThi = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([
      { who: 'Bà cụ', text: 'Thị ơi thị rụng bị bà, bà để bà ngửi chứ bà không ăn.', cls: 'verse' },
      { text: 'Quả thị rụng nhẹ như một chiếc lá, nằm gọn trong bị bà cụ. Cả bìa rừng sáng lên một thoáng.', img: 'qua_thi', sfx: 'bell' },
      { who: 'Bà cụ', text: 'Già đi chậm. Thầy cầm hộ già về nhà.', img: null },
      { text: 'Bà cụ đặt quả thị vào tay Đăng. Ấm như một đứa trẻ.', cls: 'think' },
      { who: 'Đăng', text: '(…Câu này mình nghe ở đâu rồi.)', cls: 'think' },
      { text: '<i>Mười năm trước. Thầy Cả xoa đầu thằng bé Đăng: "Sau này gặp quả thị thì nhớ mang về cho người già, con nhé."</i>', cls: 'think', sfx: 'mo' }
    ]);
    fl.c4_hai = true; s.items.qua_thi = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.boChinh = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    await G.ui.say([{ who: 'Bà cụ', text: 'Têm cho già miếng trầu cánh phượng. Trầu têm thì quả mới chịu mở.' }]);
    await G.mg.temTrau();
    fl.c4_bo_chinh = true; s.items.qua_thi = false; W.refresh(); W.locked = true;
    await G.ui.say([
      { text: 'Đăng đặt quả thị vào chĩnh sành, đặt miếng trầu lên nắp. Trong chĩnh có tiếng [[gõ ba cái]], khẽ, như gõ cửa.', sfx: 'mo', img: 'thi_go' },
      { who: 'Bà cụ', text: 'Ăn quả nhớ kẻ trồng cây. Thầy có biết ai trồng cây thị ấy không?', img: null },
      { who: 'Đăng', text: 'Tro cô ấy. Lính đổ ở đấy.' },
      { who: 'Bà cụ', text: 'Lính đổ theo lệnh ai? Ai dạy dì ghẻ rắc tro ba ngả, mà ngả nào cũng chảy về bìa rừng này?' },
      { who: 'Đăng', text: '(Thầy. Thầy cần cô ấy sống lại. Thầy cần mình mang quả thị về.)', cls: 'think', sfx: 'stinger' },
      { who: 'Đăng', text: '(Nửa hồn thương nhớ trong quả thị. Nửa hồn căm hờn trong hũ sành. Khi cô ấy về đủ một nửa… thầy định làm gì với nửa kia?)', cls: 'think' },
      { who: 'Bà cụ', text: '(nhìn cái chĩnh) Già đợi cậu lâu rồi. Không phải đợi cậu. Đợi cô ấy.' }
    ]);
    G.save();
    G.audio.music('title');
    var nD = G.DEDUCE.filter(function (x) { return s.deduce[x.id]; }).length;
    var sai = Object.keys(s.verdict).filter(function (k) { return G.DEATHS[k] && s.verdict[k] !== G.DEATHS[k].answer; }).length;
    fl.c4_het = true; G.save();
    await G.ui.card('Hết chương 4', 'Sổ Tử: ' + Object.keys(s.clues).length + ' manh mối · ' + nD + '/' + G.DEDUCE.length +
      ' phép đối chiếu · kết luận sai ' + sai + ' trang · Đăng đã chết ' + (s.deaths || 0) + ' lần.<br>Lọ xương Bống: **' + (s.items.lo_xuong || 0) + '** · Hũ sành: **' + (s.items.hu_sanh ? 'đang giữ' : 'để lại') + '**' +
      (fl.bm_da_thay ? '<br><i>Bạn đã đáp lại tiếng gọi trong hũ.</i>' : ''), 'Sang Chương 5 ›');
    W.locked = false;
    G.ch5.begin();
  };

  C.onVerdict = async function (id, k) {
    var s = G.S, d = G.DEATHS[id], dung = k === d.answer;
    s.verdict[id] = k; s.flags['c4_' + id] = dung ? 'dung' : 'sai'; G.save();
    await G.ui.say([{ who: 'Đăng', text: dung ? '(Không ai kéo hắn xuống ngoài cô ấy. Hắn đáng chết, nhưng cô ấy đang mạnh lên từng đêm.)' : '(…Mình chắc chứ?)', cls: 'think' }]);
    G.ui.hud();
  };
})();
