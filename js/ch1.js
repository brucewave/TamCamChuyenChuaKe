// Kịch bản CHƯƠNG 1: Vàng anh. Xem docs/dac-ta-mo-dau-ch1.md, mục C.
var G = window.G || (window.G = {});
G.ch1 = {};

Object.assign(G.CLUES, {
  L03: { type: 'L', title: 'Cám: con chim là điềm gở', text: 'Hoàng hậu muốn trấn con chim vàng anh, bao nhiêu tiền cũng được.' },
  L04: { type: 'L', title: 'Lài: "em thấy ở làng hôm ấy…"', text: 'Lài nói thấy có người cầm… thì Đội Ngạn bước vào. Lài im bặt.' },
  L05: { type: 'L', title: 'Vè trẻ con trong cung', text: '"…giặt áo chồng tao giặt nước giếng sâu, ai đẩy ai đâu, giếng sâu biết rồi."' },
  L06: { type: 'L', title: 'Đội Ngạn: con bé trượt chân', text: 'Lài trượt chân xuống giếng. Đêm qua hắn gác cổng bắc, không rời nửa bước.' },
  L07: { type: 'L', title: 'Cám: chim bệnh tự chết', text: 'Hoàng hậu nói con vàng anh tự lăn ra chết vì bệnh.' },
  L08: { type: 'L', title: 'Bà cụ: bánh đúc có xương', text: '"Mấy đời bánh đúc có xương, mấy đời dì ghẻ mà thương con chồng."' },
  V05: { type: 'V', title: 'Xương chim bị bẻ cổ', text: 'Trong rổ lông ở bếp: cổ con vàng anh bị bẻ gãy gọn.' },
  V06: { type: 'V', title: 'Vết ngón tay trên cổ Lài', text: 'Qua mắt âm dương: năm vết ngón tay to bản quanh cổ Lài.' },
  V07: { type: 'V', title: 'Sợi chỉ đỏ trong móng tay', text: 'Trong móng tay Lài mắc một sợi chỉ đỏ, cùng màu dải lưng áo thị vệ.' },
  V08: { type: 'V', title: 'Sổ gác: đổi ca giờ Tý', text: 'Sổ gác cổng bắc ghi: giờ Tý đêm qua, Ngạn đổi ca, rời cổng.' },
  V09: { type: 'V', title: 'Xương cá trên bàn thờ Táo', text: 'Đĩa bánh đúc cúng cô Tấm có một mẩu xương cá nhỏ.' },
  V10: { type: 'V', title: 'Bốn lọ xương dưới giường', text: 'Tấm chôn xương Bống trong bốn lọ, dưới bốn chân giường ở làng.' },
  V11: { type: 'V', title: 'Dấu giày to bên chạn bát', text: 'Cạnh chỗ bà Sáu ngã có dấu giày to, đế đóng đinh như giày thị vệ.' }
});
G.DEDUCE.push(
  { id: 'C1D1', a: 'L07', b: 'V05', title: 'Cám nói dối', text: 'Chim không chết vì bệnh. Nó bị [[bẻ cổ theo lệnh]].' },
  { id: 'C1D2', a: 'L06', b: 'V06', title: 'Lài bị bóp cổ', text: 'Có [[bàn tay to bóp cổ Lài]] trước khi Lài rơi xuống giếng.' },
  { id: 'C1D3', a: 'L06', b: 'V08', title: 'Đội Ngạn nói dối', text: 'Giờ Tý đêm qua, [[Đội Ngạn không ở cổng bắc]].' },
  { id: 'C1D4', a: 'L06', b: 'V07', title: 'Sợi chỉ của áo thị vệ', text: 'Lài đã cào được [[áo thị vệ]] của kẻ đẩy mình.' },
  { id: 'C1D5', a: 'L04', b: 'V01', title: 'Lài là người làm chứng', text: 'Lài thấy kẻ cầm rìu ở gốc cau. [[Lài bị giết để bịt miệng.]]' },
  { id: 'C1D6', a: 'L05', b: 'V06', title: 'Bài vè đã biết trước', text: 'Lũ trẻ hát về giếng sâu và người đẩy [[từ trước khi Lài chết]]. Ai dạy chúng?' },
  { id: 'C1D7', a: 'L08', b: 'V09', title: 'Ai cầm xương Bống?', text: 'Xương cá bống trên bàn thờ: [[có người đã đào lọ xương Bống]] ở làng.' }
);
Object.assign(G.DEATHS, {
  lai: { name: 'Lài', img: 'por_lai',
    meta: function (S) { return 'Cung nữ, từng hầu cô Tấm. Vớt lên từ giếng giặt sáng ngày thứ ba trong cung. Tay nắm chặt một chiếc lông vàng anh.'; },
    ready: function (S) { return S.deduce.C1D2 && S.deduce.C1D5 && (S.deduce.C1D3 || S.deduce.C1D4); },
    choices: ['Ma giết', 'Người giết: Đội Ngạn', 'Người giết: Hoàng hậu Cám', 'Người giết: Dì ghẻ'], answer: 1,
    verdict: function (S) { var v = (S.verdict || {}).lai; return v !== undefined ? 'Kết luận: ' + G.DEATHS.lai.choices[v] : (G.DEATHS.lai.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } },
  basau: { name: 'Bà Sáu bếp', img: 'por_basau',
    meta: function () { return 'Ngã cạnh chạn bát trong bếp cung, gáy đập vào cạnh bếp. Bà là người thấy xương chim bị bẻ cổ.'; },
    ready: function (S) { return !!S.clues.V11; },
    choices: ['Ma giết', 'Người giết: Đội Ngạn', 'Tai nạn'], answer: 1,
    verdict: function (S) { var v = (S.verdict || {}).basau; return v !== undefined ? 'Kết luận: ' + G.DEATHS.basau.choices[v] : (G.DEATHS.basau.ready(S) ? 'Đủ chứng cứ, hãy kết luận' : 'Chưa đủ chứng cứ'); } }
});

(function () {
  var C = G.ch1, W = G.world, $ = G.$, L = G.LOOKS;
  var PH = ['sang', 'chieu', 'toi', 'dem'], PHN = { sang: 'Sáng', chieu: 'Chiều', toi: 'Tối', dem: 'Đêm' };
  L.vua = { hair: 'mu', shirt: '#D9A93A', pants: '#8A3424', eyes: 'tired', sash: '#B84A3E' };
  L.ngan = { hair: 'mu', shirt: '#8A2A22', pants: '#2B2A33', eyes: 'narrow', sash: '#B8241A', mouth: 'grin' };
  L.linh = { hair: 'non_la', shirt: '#6A3A2A', pants: '#2B2A33', eyes: 'tired', prop: 'lantern', sash: '#B8241A' };
  L.linhTre = { hair: 'non_la', shirt: '#6A3A2A', pants: '#2B2A33', eyes: 'big', sash: '#B8241A' };
  L.linhHau = { hair: 'topknot', shirt: '#4E6A8C', pants: '#2B2A33', eyes: 'default' };
  L.baSau = { hair: 'khan', khan: '#5A4A3A', shirt: '#9A6A4A', skirt: '#4A4650', eyes: 'tired', body: 'wide' };
  L.baCu = { hair: 'khan', khan: '#3A3A3A', hairColor: '#B8B0A0', shirt: '#7A5236', skirt: '#2B1F1A', eyes: 'tired', mouth: 'smile' };
  L.nu = { hair: 'bun', shirt: '#E8A0B0', skirt: '#4A4650', eyes: 'down', mouth: 'sad' };
  L.laiChet = Object.assign({}, L.lai, { eyes: 'closed', mouth: 'open' });
  var NGAN_DEM = Object.assign({}, L.ngan, { prop: 'lantern' });

  function S() { return G.S; }
  function f() { return G.S.flags; }
  C.ph = function () { return G.S.phase; };

  // ---------- bắt đầu chương ----------
  C.begin = async function () {
    var s = G.S;
    s.chapter = 'ch1'; s.day = 1; s.phase = 'sang'; s.beat = 'c1';
    s.money = 6; s.inv = { nhang: 2, gao: s.items.gao_muoi ? 3 : 1, bua: 2 }; s.items.chuong = true; s.items.bat_nuoc = true;
    s.verdict = s.verdict || {};
    $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
    await G.cut.chuong('Chương 1', 'Vàng anh');
    W.enter('cung_san', 80, 520);
    C.music();
    W.locked = true;
    var dg = W.npcs.dighe, cam = W.npcs.cam;
    await W.walkPlayer(380, 520, 120);
    await G.ui.say([
      { text: 'Ba ngày sau. Kinh thành. Sân chầu lát đá xanh, cột son, mái ngói vàng.', cls: 'think' },
      { who: 'Dì ghẻ', text: 'Cậu tới rồi. Ở cung này, cậu ở **phòng cạnh bếp**. Cần gì cứ hỏi bà Sáu.' },
      { who: 'Cám', text: 'Con chim ấy là điềm gở. Đêm nào nó cũng hót cạnh sào phơi áo của bệ hạ.', run: function () { G.addClue('L03'); } },
      { who: 'Cám', text: 'Thầy trấn nó đi. Bao nhiêu tiền cũng được.' },
      { who: 'Dì ghẻ', text: 'Ban ngày cậu muốn kiếm thêm thì trong cung lắm việc: xem ngày, cúng bái, giải hạn. Ban đêm thì… đừng đi lung tung.' }
    ]);
    if (dg) await W.walkEnt(dg, 480, 300, 140);
    s.flags.c1_vao = true; W.refresh(); W.locked = false;
    G.ui.toast('Xong việc trong buổi thì bấm **⏳ Đợi** ở góc trên bên trái để sang buổi sau, đứng đâu cũng được.', 4800);
    G.ui.hud(); G.save();
  };

  // ---------- người theo lịch ----------
  C.npcs = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [];
    var day = p === 'sang' || p === 'chieu';
    if (s.loc === 'cung_san') {
      if (d === 1 && p === 'sang' && !fl.c1_vao) { list.push({ id: 'dighe', look: L.dighe, x: 480, y: 470, view: 'front', label: 'Dì ghẻ' }); list.push({ id: 'cam', look: L.cam, x: 560, y: 480, view: 'front', label: 'Cám' }); }
      if (day || p === 'toi') list.push({ id: 'linhtre', look: L.linhTre, x: 880, y: 320, view: 'front', label: 'Lính gác cổng bắc' });
      if (p === 'chieu' && d < 4) list.push({ id: 'ngan', look: L.ngan, x: 600, y: 560, view: 'side', flip: -1, label: 'Đội Ngạn' });
      if (d === 2 && day) { list.push({ id: 'tre', look: L.kid1, x: 300, y: 560, view: 'front', label: 'Lũ trẻ trong cung', bubble: 'Giặt áo chồng tao…' }); list.push({ id: 'tre2', look: L.kid2, x: 340, y: 580, view: 'side', flip: -1 }); }
      if (d === 4) { list.push({ id: 'dighe', look: L.dighe, x: 520, y: 470, view: 'front', label: 'Dì ghẻ' }); list.push({ id: 'ngan', look: L.ngan, x: 600, y: 480, view: 'side', flip: -1, label: 'Đội Ngạn' }); }
    }
    if (s.loc === 'cung_vuon') {
      if (day && d <= 2 && !fl.job_sao) list.push({ id: 'linhhau', look: L.linhHau, x: 220, y: 470, view: 'front', label: 'Lính hầu' });
      if (p === 'chieu' && d <= 3) list.push({ id: 'cam', look: L.cam, x: 560, y: 570, view: 'side', flip: -1, label: 'Cám' });
      if (p === 'toi' && d <= 2) list.push({ id: 'vua', look: L.vua, x: 690, y: 430, view: 'side', flip: 1, label: 'Nhà vua' });
      if (p === 'dem' && d === 2) list.push({ id: 'ngan', look: NGAN_DEM, x: 900, y: 510, view: 'side', flip: -1, label: 'Đội Ngạn' });
    }
    if (s.loc === 'cung_gieng') {
      if (day && d <= 2) list.push({ id: 'lai', look: L.lai, x: 300, y: 470, view: 'front', label: 'Lài' });
      if (p === 'chieu' && d <= 2) list.push({ id: 'nu', look: L.nu, x: 760, y: 470, view: 'front', label: 'Nụ' });
      if (d === 3 && p === 'sang') {
        list.push({ id: 'xaclai', html: G.art.xac(L.lai, { rot: -90, nuoc: true }), x: 600, y: 480, ghost: true });
        list.push({ id: 'ngan', look: L.ngan, x: 640, y: 440, view: 'side', flip: -1, label: 'Đội Ngạn' });
        list.push({ id: 'nu', look: L.nu, x: 300, y: 480, view: 'side', flip: 1, label: 'Nụ' });
      }
    }
    if (s.loc === 'cung_bep') {
      var basauChet = fl.c1_basau_chet;
      if ((day || p === 'toi') && !basauChet) list.push({ id: 'basau', look: L.baSau, x: 220, y: 270, view: 'front', label: 'Bà Sáu bếp' });
      if (d === 2 && p === 'sang') list.push({ id: 'lai', look: L.lai, x: 160, y: 360, view: 'front', label: 'Lài' });
      if (d === 2 && p === 'chieu' && !fl.job_giaihan) list.push({ id: 'lai', look: L.lai, x: 430, y: 330, view: 'front', label: 'Lài' });
      if (basauChet && !fl.c1_s03b_xong) list.push({ id: 'xacbasau', html: G.art.xac(L.baSau, { rot: 90, mau: true }), x: 370, y: 250, ghost: true });
    }
    if (s.loc === 'cung_hau') {
      if (p === 'sang' || p === 'toi') list.push({ id: 'cam', look: L.cam, x: 480, y: 320, view: 'front', label: 'Cám' });
      if (p === 'chieu') list.push({ id: 'dighe', look: L.dighe, x: 560, y: 330, view: 'front', label: 'Dì ghẻ' });
    }
    if (s.loc === 'hang_nuoc' && day) list.push({ id: 'bacu', look: L.baCu, x: 360, y: 372, view: 'front', label: 'Bà cụ hàng nước', fixedView: true });
    return list;
  };

  C.things = function (s) {
    var d = s.day, p = s.phase, fl = s.flags, list = [];
    if (s.loc === 'cung_san') {
      list.push({ id: 'cua_dien', x: 480, y: 292, hit: [440, 160, 80, 120], label: 'Vào cung hoàng hậu', door: { to: 'cung_hau', x: 500, y: 520, view: 'back' } });
      list.push({ id: 'cua_bep', x: 124, y: 656, hit: [90, 556, 70, 80], label: 'Vào bếp & phòng Đăng', door: { to: 'cung_bep', x: 460, y: 520, view: 'back' } });
    }
    if (s.loc === 'cung_hau') list.push({ id: 'ra_san', x: 500, y: 530, hit: [460, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 480, y: 310 } });
    if (s.loc === 'cung_hau') list.push({ id: 'yem', x: 790, y: 250, hit: [740, 130, 100, 110], label: 'Chiếc yếm đỏ' });
    if (s.loc === 'cung_bep') {
      list.push({ id: 'ra_san', x: 460, y: 532, hit: [420, 520, 80, 40], label: 'Ra sân chầu', door: { to: 'cung_san', x: 124, y: 668 } });
      list.push({ id: 'chong', x: 780, y: 240, hit: [706, 160, 150, 62], label: 'Chõng tre: nghỉ' });
      list.push({ id: 'ban_tao', x: 510, y: 186, hit: [456, 96, 108, 78], label: 'Bàn thờ Táo', quest: d >= 3 && !s.clues.V09 });
      if (d === 2 && p === 'chieu' && !fl.c1_noi_xong) list.push({ id: 'noi', x: 240, y: 226, hit: [200, 130, 80, 60], label: 'Nồi ninh', quest: true });
      if (fl.c1_lay_long && !fl.c1_ky2) list.push({ id: 'long', x: 700, y: 452, hit: [654, 380, 92, 56], label: 'Chiếc lông vàng anh', quest: fl.c1_long_chon });
      if (fl.c1_basau_chet && !s.clues.V11) list.push({ id: 'chan', x: 374, y: 214, hit: [330, 120, 90, 80], label: 'Cạnh chạn bát', quest: true });
    }
    if (s.loc === 'cung_vuon') {
      if (d === 1 && p === 'dem' && !fl.c1_dem1) list.push({ id: 'chim', x: 820, y: 384, hit: [740, 120, 160, 260], label: 'Con vàng anh', quest: true });
      (s.c1Spots || []).forEach(function (sp, i) { if (!sp.done) list.push({ id: 'spot' + i, x: sp.x, y: sp.y + 10, label: 'Chôn nhúm lông', quest: true }); });
      if (fl.c1_mam_cay) list.push({ id: 'mam', x: 580, y: 616, label: 'Mầm cây lá đỏ' });
    }
    if (s.loc === 'cung_gieng') {
      list.push({ id: 'gieng', x: 400, y: 430, hit: [344, 300, 112, 110], label: 'Giếng đá' });
      if (d === 3 && p === 'sang') list.push({ id: 'xaclai', x: 600, y: 500, hit: [540, 450, 120, 50], label: 'Xem xác Lài', quest: !fl.c1_xem_lai });
    }
    if (s.loc === 'hang_nuoc') list.push({ id: 'mua', x: 360, y: 440, hit: [276, 380, 168, 40], label: 'Mua đồ nghề', cond: p === 'sang' || p === 'chieu' });
    return list.filter(function (t) { return t.cond !== false; });
  };

  // ---------- việc cần làm ----------
  C.objective = function (s) {
    var d = s.day, p = s.phase, fl = s.flags;
    if (d === 1) {
      if (p === 'sang' || p === 'chieu') return (fl.c1_bacu ? '' : 'Ra **hàng nước ngoài thành** (đi về phía tây). ') + 'Tìm việc trong cung để kiếm tiền. Nghỉ ở **chõng tre** để sang buổi sau.';
      if (p === 'toi') return fl.c1_vua ? 'Về **chõng tre** nghỉ, chờ đêm' : 'Ra **vườn ngự** nghe chim hót';
      if (p === 'dem') return !fl.c1_soi_chim ? 'Ra **vườn ngự**. Mở **mắt âm dương (B)** vào con vàng anh trên cây đào' : (fl.c1_dem1 ? 'Về phòng ngủ' : 'Rời vườn ngự. **Đừng chạy.**');
    }
    if (d === 2) {
      if (p === 'sang') return 'Hoàng hậu cho bắt con chim. Xuống **bếp** xem. Lũ trẻ đang hát ở **sân chầu**.';
      if (p === 'chieu') return (!fl.c1_noi_xong ? 'Xem **nồi ninh** trong bếp. ' : '') + (!fl.job_giaihan ? '**Lài** nhờ giải hạn (ở bếp, cần 1 giấy bùa).' : 'Nghỉ ở chõng tre.');
      if (p === 'toi') return 'Nghỉ chờ đêm.';
      if (p === 'dem') return 'Đêm khuya. Có tiếng nước ở phía **giếng giặt**…';
    }
    if (d === 3) {
      if (p === 'sang' && !fl.c1_xem_lai) return 'Có người la ở **giếng giặt**!';
      var v = (s.verdict || {}).lai;
      if (v === undefined) return G.DEATHS.lai.ready(s) ? 'Mở **Sổ Tử** → tab Người chết → kết luận cái chết của Lài' :
        'Điều tra cái chết của **Lài**: đối chiếu lời Đội Ngạn với vật chứng. (Lính gác cổng bắc, bàn thờ Táo, bà cụ hàng nước)';
      if (p !== 'dem') return 'Nghỉ chờ đêm. Lông chim Cám vứt ngoài **vườn ngự** đang xếp thành hình người.';
      if (!fl.c1_long_chon) return 'Chôn đủ **5 nhúm lông** trong vườn ngự trước bình minh. Tránh lính và đừng đánh thức thứ đang nằm giữa vườn.';
      return 'Về phòng. Mở **mắt âm dương (B)** vào **chiếc lông** trong tay Lài.';
    }
    if (d === 4) {
      if (fl.c1_basau_chet && (s.verdict || {}).basau === undefined) return 'Bà Sáu chết trong **bếp**. Tìm chứng cứ và kết luận trong Sổ Tử.';
      return 'Ra **sân chầu**.';
    }
    return '';
  };

  // ---------- nghỉ: sang buổi tiếp theo ----------
  function gate(s) {
    var d = s.day, p = s.phase, fl = s.flags;
    if (d === 1 && p === 'toi' && !fl.c1_vua) return 'Đi nghe chim hót ở vườn ngự đã.';
    if (d === 1 && p === 'dem' && !fl.c1_dem1) return 'Chưa xong việc đêm nay.';
    if (d === 2 && p === 'chieu' && (!fl.c1_noi_xong || !fl.job_giaihan)) return 'Còn việc dở trong chiều nay (nồi ninh, giải hạn cho Lài).';
    if (d === 3 && p === 'sang' && !fl.c1_xem_lai) return 'Có chuyện ở giếng giặt!';
    if (d === 3 && p === 'toi' && (s.verdict || {}).lai === undefined) return 'Phải kết luận cái chết của Lài trước đã.';
    if (d === 3 && p === 'dem') return 'Đêm nay còn việc ở vườn ngự.';
    if (d === 4) return 'Trời đã sáng.';
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
    await G.ui.fade(function () {
      s.day = day; s.phase = ph;
      $('stage').classList.remove('soi');
      if (ph === 'sang') W.enter('cung_bep', 760, 300); else W.enter(s.loc, s.x, s.y);
    });
    C.music();
    await G.ui.card('Ngày ' + day + ' trong cung · ' + PHN[ph], '');
    G.save();
    C.wake();
  };

  C.music = function () {
    var s = G.S;
    if (G.danger.active) { G.audio.music(G.audio.ten('nguy')); return; }
    if (s.phase === 'sang' || s.phase === 'chieu') { G.audio.music(G.audio.ten('ngay')); G.audio.ambience('ngay'); }
    else { G.audio.music(G.audio.ten('dem')); G.audio.ambience('dem'); }
  };

  // sự kiện khi vừa tỉnh / sang buổi mới
  C.wake = async function () {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (d === 2 && p === 'sang' && !fl.c1_giet_chim) {
      W.locked = true;
      await G.ui.say([
        { who: 'Bà Sáu', text: '(gõ cửa) Thầy ơi. Sáng nay hoàng hậu cho lính bắt con vàng anh rồi. Bảo làm thịt.' },
        { who: 'Bà Sáu', text: 'Con Lài đang vặt lông ngoài bếp. Tay nó run lắm.' }
      ]);
      fl.c1_giet_chim = true; W.refresh(); W.locked = false; G.ui.hud(); return;
    }
    if (d === 2 && p === 'chieu' && !fl.c1_vut_long) {
      fl.c1_vut_long = true;
      G.ui.toast('Nghe nói hoàng hậu ăn vài miếng chim rồi sai **vứt lông ra sau vườn ngự**.', 4200);
    }
    if (d === 3 && p === 'sang' && !fl.c1_lai_chet) {
      fl.c1_lai_chet = true; W.locked = true;
      G.audio.sfx('stinger');
      await G.ui.say([{ text: 'Trời còn chưa rõ mặt người. Ngoài kia có tiếng la thất thanh từ phía **giếng giặt**.', cls: 'think' }]);
      W.locked = false; G.ui.hud(); return;
    }
    if (d === 3 && p === 'dem') { C.startDem3(); return; }
    if (d === 4 && p === 'sang') { C.sang4(); return; }
  };

  // ---------- khi vào cảnh ----------
  C.onEnter = function (loc) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (loc === 'hang_nuoc' && !fl.c1_bacu && (p === 'sang' || p === 'chieu')) setTimeout(C.gapBaCu, 400);
    if (loc === 'cung_vuon' && d === 1 && p === 'toi' && !fl.c1_vua) setTimeout(C.vuaNgheChim, 400);
    if (loc === 'cung_gieng' && d === 3 && p === 'sang' && !fl.c1_xem_lai_intro) setTimeout(C.laiIntro, 400);
    if (loc === 'cung_vuon' && d === 2 && p === 'dem') setTimeout(function () { G.audio.sfx('splash'); G.ui.toast('Tiếng nước ùm một cái, phía giếng giặt.'); }, 900);
    if (loc !== 'cung_vuon' && G.danger.active && G.danger.cfg && G.danger.cfg.vuonOnly) { G.danger.stop(); }
    if (loc === 'cung_vuon' && d === 3 && p === 'dem' && !fl.c1_long_chon && !G.danger.active) C.dangerDem3();
    if (loc === 'cung_bep' && d === 4 && fl.c1_basau_chet && !fl.c1_basau_intro) setTimeout(C.basauIntro, 400);
    if (loc !== 'cung_vuon' && d === 1 && p === 'dem' && fl.c1_soi_chim && !fl.c1_dem1) { fl.c1_dem1 = true; G.danger.stop(); G.ui.toast('Thoát khỏi vườn ngự. Về phòng ngủ.'); G.save(); C.music(); }
  };
  C.canExit = function (dir, to) {
    var s = G.S, d = s.day, p = s.phase;
    if (d === 2 && p === 'dem' && s.loc === 'cung_vuon' && to === 'cung_gieng') { C.nganChan(); return false; }
    if (d === 3 && p === 'dem' && !s.flags.c1_long_chon && s.loc === 'cung_vuon') { G.ui.toast('Phải chôn đủ 5 nhúm lông trước bình minh.'); return false; }
    if ((p === 'toi' || p === 'dem') && to === 'hang_nuoc') { G.ui.toast('Cổng thành đóng rồi.'); return false; }
    if (d === 4 && to !== 'cung_san' && s.loc === 'cung_san') { G.ui.toast('Mọi người đang đợi ở sân chầu.'); return false; }
    return true;
  };

  // ---------- tương tác ----------
  C.act = function (id, t) {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (id.indexOf('spot') === 0) return C.chonLong(+id.slice(4), t);
    switch (id) {
      case 'chong': return C.rest();
      case 'bacu': return C.baCu();
      case 'mua': return C.shop();
      case 'basau': return C.baSau();
      case 'linhhau': return C.linhHau();
      case 'lai': return C.laiTalk();
      case 'linhtre': return C.linhTre();
      case 'noi': return C.noi();
      case 'chim': return C.chim();
      case 'xaclai': return C.xemLai();
      case 'ban_tao': return C.banTao();
      case 'long': return C.long();
      case 'chan': return C.chanBat();
      case 'mam': return G.ui.dialog([{ text: 'Một mầm cây non mọc lên đúng chỗ chôn lông chim. Lá đỏ như máu.', img: 'mam_cay' }]);
      case 'yem': return G.ui.dialog([{ text: 'Chiếc yếm đỏ cũ của cô Tấm treo trên giá. Phơi đã ba ngày mà vẫn [[ướt sũng]], nước nhỏ xuống thành vũng.', cls: 'think', sfx: 'drip' }]);
      case 'gieng':
        if (d === 3 && $('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Qua mắt âm dương: trên thành giếng có [[vệt kéo lê]] từ cầu ao tới. Nước giếng đục một vệt hồng.', cls: 'think' }]);
        return G.ui.dialog([{ text: 'Giếng đá sâu hun hút. Nước đen như mực.', cls: 'think', sfx: 'drip' }]);
      case 'tre':
        if (!s.clues.L05) return G.ui.dialog([
          { who: 'Lũ trẻ', text: 'Giặt áo chồng tao thì giặt cho sạch…', cls: 'verse' },
          { who: 'Lũ trẻ', text: '…giặt áo chồng tao giặt nước giếng sâu, ai đẩy ai đâu, giếng sâu biết rồi.', cls: 'verse', run: function () { G.addClue('L05'); } },
          { who: 'Đăng', text: 'Ai dạy các cháu hát thế?' },
          { who: 'Thằng bé', text: 'Con chim dạy ạ. Nó hót thế mà.' }
        ]);
        return G.ui.dialog([{ who: 'Lũ trẻ', text: '…ai đẩy ai đâu, giếng sâu biết rồi.', cls: 'verse' }]);
      case 'cam':
        if (s.clues.V05 && !s.clues.L07) return G.ui.dialog([
          { who: 'Đăng', text: 'Tâu hoàng hậu, con vàng anh…' },
          { who: 'Cám', text: 'Nó bệnh. Sáng nay tự lăn ra chết. Thầy khỏi phải trấn nữa.', run: function () { G.addClue('L07'); } },
          { who: 'Cám', text: '(nhìn xuống tay) …Lông nó cứ dính vào tay ta. Rửa mãi không sạch.' }
        ]);
        return G.ui.dialog([{ who: 'Cám', text: d >= 3 ? 'Lài… hôm qua còn chải tóc cho ta.' : 'Thầy đừng đứng gần cây đào. Ta không thích cây ấy.' }]);
      case 'dighe':
        if (d === 4) return C.ket();
        return G.ui.dialog([{ who: 'Dì ghẻ', text: 'Việc của cậu là con chim. Đừng để ta phải nhắc.' }]);
      case 'vua': return G.ui.dialog([{ who: 'Nhà vua', text: d === 2 ? 'Sáng nay con chim không còn hót nữa. Ai đó đã… thôi. Lui ra.' : 'Con chim này hót như người ta trò chuyện. Nghe nó, trẫm lại nhớ một người. Ở hiền gặp lành, vậy mà…' }]);
      case 'nu': return G.ui.dialog([{ who: 'Nụ', text: d === 3 ? 'Lài sợ nước lắm. Chị ấy không bao giờ ra giếng một mình ban đêm đâu.' : 'Em ngồi dệt cả ngày. Đêm nào cũng nghe con chim ấy hót đúng giọng cô Tấm.' }]);
      case 'ngan':
        if (d === 2 && p === 'dem') return C.nganChan();
        if (d === 3 && !s.clues.L06) return G.ui.dialog([{ who: 'Đội Ngạn', text: 'Con bé trượt chân. Đêm qua ta gác cổng bắc, không rời nửa bước.', run: function () { G.addClue('L06'); } }]);
        return G.ui.dialog([{ who: 'Đội Ngạn', text: 'Thầy cúng thì lo mà cúng. Đừng đi lại nhiều trong cung.' }]);
    }
  };

  // ---------- ngày 1 ----------
  C.gapBaCu = async function () {
    var fl = G.S.flags; if (fl.c1_bacu) return;
    fl.c1_bacu = true; W.locked = true;
    await G.ui.say([
      { who: 'Bà cụ', text: 'Cậu là thầy cúng mới vào cung đấy à? **Đợi cậu lâu rồi.**' },
      { who: 'Đăng', text: 'Bà biết cháu?' },
      { who: 'Bà cụ', text: 'Biết thì không biết. Nhưng già thì cứ hay đợi. Uống bát nước chè đã.' },
      { who: 'Bà cụ', text: 'Già bán nhang, gạo muối, giấy bùa cho mấy thầy. Có làng bên kia sông còn nộp cả người sống cho gốc đa cơ đấy, thầy nào cũng ghé đây mua đồ.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.baCu = function () {
    var s = G.S;
    var lines = [{ who: 'Bà cụ', text: 'Cần gì thì cứ nói.' }];
    if (s.day >= 3 && !s.clues.L08) lines = [
      { who: 'Bà cụ', text: 'Con bé Lài hôm trước còn ra đây mua bánh đúc cúng cô Tấm. Nay đã…' },
      { who: 'Bà cụ', text: '**Mấy đời bánh đúc có xương, mấy đời dì ghẻ mà thương con chồng.** Thầy hiểu không?', run: function () { G.addClue('L08'); } },
      { who: 'Đăng', text: '(Bánh đúc… có xương?)', cls: 'think' }];
    G.ui.dialog(lines.concat([{ who: 'Bà cụ', text: 'Mua gì không thầy?', choices: [
      { text: 'Xem hàng', run: C.shop }, { text: 'Thôi ạ', run: function () {} }] }]));
  };
  C.shop = function () {
    var s = G.S;
    var items = [['nhang', 'Bó nhang (5 nén)', 2, 5], ['gao', 'Gạo muối (3 nắm)', 1, 3], ['bua', 'Giấy bùa (2 tờ)', 1, 2]];
    G.ui.dialog([{ who: 'Bà cụ', text: 'Tiền của thầy: **' + s.money + ' đồng**. Nhang ' + s.inv.nhang + ', gạo muối ' + s.inv.gao + ', giấy bùa ' + s.inv.bua + '.', choices: items.map(function (it) {
      return { text: 'Mua ' + it[1] + ' · ' + it[2] + ' đồng', run: function () {
        if (s.money < it[2]) { G.ui.toast('Không đủ tiền. Làm việc trong cung để kiếm thêm.'); return; }
        s.money -= it[2]; s.inv[it[0]] += it[3]; G.audio.sfx('clue'); G.ui.hud(); C.shop();
      } };
    }).concat(G.dun ? G.dun.luaChon() : []).concat([{ text: 'Xong', run: function () {} }]) }]);
  };
  C.baSau = async function () {
    var s = G.S, fl = s.flags;
    if (!fl.job_que && (s.phase === 'sang' || s.phase === 'chieu')) {
      await G.ui.say([{ who: 'Bà Sáu', text: 'Thầy biết xem ngày không? Bếp sắp làm cỗ giỗ, mà già không dám tự chọn ngày.' }]);
      var ok = await G.mg.gieoQue();
      fl.job_que = true; s.money += 3; G.audio.sfx('clue'); G.ui.hud();
      await G.ui.say([{ who: 'Bà Sáu', text: 'Quẻ thuận. Thầy cầm **3 đồng**. Đêm nào đói thì cứ xuống bếp, già để phần.' }]);
      G.save(); return;
    }
    if (s.day === 2 && s.clues.V05) return G.ui.dialog([{ who: 'Bà Sáu', text: 'Con chim bị bẻ cổ, thầy ạ. Không phải bệnh. Già làm bếp bốn chục năm, già biết.' }, { who: 'Bà Sáu', text: 'Thầy đừng nói già bảo.' }]);
    G.ui.dialog([{ who: 'Bà Sáu', text: s.day >= 3 ? 'Con Lài… tội con bé. Nó hiền như đất.' : 'Thầy ăn gì chưa? Còn nồi cháo.' }]);
  };
  C.linhHau = async function () {
    var s = G.S, fl = s.flags;
    if (fl.job_sao) return G.ui.dialog([{ who: 'Lính hầu', text: 'Cảm ơn thầy.' }]);
    await G.ui.say([{ who: 'Lính hầu', text: 'Thầy cúng hộ cái sào phơi áo của bệ hạ được không? Từ hôm con chim đến, áo phơi cứ bị nó đậu lên.' }]);
    if (s.inv.nhang < 1) return G.ui.dialog([{ who: 'Đăng', text: '(Hết nhang rồi. Ra hàng nước của bà cụ mua đã.)', cls: 'think' }]);
    s.inv.nhang--; G.ui.hud();
    var ok = await G.mg.giuNhang(22);
    if (!ok) { await G.ui.say([{ text: 'Nhang tắt ba lần. Hỏng lễ. (Mất 1 nén nhang, thử lại.)', cls: 'think' }]); return; }
    fl.job_sao = true; s.money += 4; G.audio.sfx('clue'); G.ui.hud();
    await G.ui.say([{ who: 'Lính hầu', text: 'Thầy cầm **4 đồng**. Em có thằng bạn gác **cổng bắc**, có gì cần hỏi cứ bảo nó là người quen của em.' }]);
    W.refresh(); G.save();
  };
  C.vuaNgheChim = async function () {
    var fl = G.S.flags; if (fl.c1_vua) return;
    W.locked = true;
    await G.ui.say([
      { text: 'Trên cây đào, con vàng anh hót. Nhà vua đứng lặng nghe.', cls: 'think' },
      { who: 'Vàng anh', text: 'Giặt áo chồng tao thì giặt cho sạch, phơi áo chồng tao thì phơi bằng sào…', cls: 'verse' },
      { who: 'Nhà vua', text: 'Nghe giọng nó, trẫm lại nhớ một người. **Ở hiền gặp lành**, vậy mà…' },
      { who: 'Đăng', text: '(Ban đêm phải ra đây lần nữa, nhớ mở mắt âm dương.)', cls: 'think' }
    ]);
    fl.c1_vua = true; W.locked = false; G.ui.hud(); G.save();
  };
  C.chim = async function () {
    var s = G.S, fl = s.flags;
    if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Con vàng anh đậu im trên cành. Mắt thường thì chỉ thấy một con chim. Bấm **B** để mở mắt âm dương.', cls: 'think' }]);
    if (fl.c1_soi_chim) return;
    fl.c1_soi_chim = true; W.locked = true;
    await G.ui.say([
      { text: 'Qua mắt âm dương: trên cành đào có [[một người con gái ngồi]], tóc xõa, đang cùng hót bằng miệng.', img: 'bong_dao', sfx: 'stinger' },
      { text: 'Con chim quay đầu lại. Nó cất tiếng, nhưng [[không phải tiếng chim]].', img: 'bong_dao' },
      { who: '???', text: 'Đăng ơi. Về đi con.', img: 'bong_dao' },
      { who: 'Đăng', text: '(…Giọng thầy.)', cls: 'think', img: null }
    ]);
    $('stage').classList.remove('soi');
    W.locked = false;
    G.danger.start({ vuonOnly: true, ghosts: [{ id: 'co_gai', x: 850, y: 320, hear: 230, speed: 85, html: C.ghostHtml(false) }],
      onCaught: function () { return 'Nước hồ sen lạnh hơn nước giếng.'; },
      restart: function () { G.S.flags.c1_soi_chim = false; } });
    G.audio.music(G.audio.ten('nguy'));
    G.ui.toast('Vong không nhìn thấy, chỉ **nghe**. Đừng chạy (**Shift**/bấm đúp là chạy). Rắc gạo muối: phím **G**.', 6000);
    G.ui.hud();
  };
  C.ghostHtml = function (nam) {
    return '<div style="position:absolute;left:-40px;top:' + (nam ? -30 : -96) + 'px;width:80px;height:100px" class="ghostbody">' +
      '<svg viewBox="0 0 80 100" width="80" height="100">' + (nam ?
        '<path d="M6,24 q14,-16 34,-12 q26,4 34,16 q-30,10 -68,-4 z" fill="#D9C27A" opacity=".85"/><path d="M8,22 q-6,-8 0,-14" stroke="#2B1F1A" stroke-width="3" fill="none"/>' :
        '<path d="M18,100 q-4,-50 22,-64 q26,14 22,64 z" fill="#CFF6F2" opacity=".75"/><circle cx="40" cy="28" r="15" fill="#CFF6F2" opacity=".8"/><path d="M26,26 q-6,40 -2,70M54,26 q6,40 2,70" stroke="#1A2A2A" stroke-width="6" fill="none"/>') +
      '</svg></div>';
  };

  // ---------- ngày 2 ----------
  C.laiTalk = async function () {
    var s = G.S, fl = s.flags, d = s.day, p = s.phase;
    if (d === 1) return G.ui.dialog([{ who: 'Lài', text: 'Thầy vào cung rồi ạ. Em hầu hoàng hậu, rảnh thì ra giặt ở giếng.' }, { who: 'Lài', text: '(nhìn quanh) Đêm thầy đừng ra giếng giặt nhé.' }]);
    if (d === 2 && p === 'sang') return G.ui.dialog([{ who: 'Lài', text: '(vặt lông chim, tay run) Con chim… nó nhìn em, thầy ạ. Đến lúc chết vẫn nhìn em.' }]);
    if (d === 2 && p === 'chieu' && !fl.job_giaihan) {
      await G.ui.say([{ who: 'Lài', text: 'Thầy giải hạn cho em được không? Mấy đêm nay em mơ thấy nước. Em sợ lắm.' }]);
      if (s.inv.bua < 1) return G.ui.dialog([{ who: 'Đăng', text: '(Hết giấy bùa. Ra hàng nước của bà cụ mua đã.)', cls: 'think' }]);
      s.inv.bua--; G.ui.hud();
      await G.mg.bua({ title: 'Bùa giải hạn', hint: 'Nét bùa giải hạn. Tô theo nét mờ.' });
      fl.job_giaihan = true; s.money += 2; G.ui.hud();
      W.locked = true;
      await G.ui.say([
        { who: 'Lài', text: 'Em cảm ơn thầy. Em gửi thầy **2 đồng**.' },
        { who: 'Lài', text: '(nói rất nhỏ) Thầy ơi… em thấy ở làng hôm ấy. Có người cầm…', run: function () { G.addClue('L04'); } },
        { text: 'Cửa bếp mở. **Đội Ngạn** đứng chắn ngoài cửa, nhìn vào.', sfx: 'stinger' },
        { who: 'Đội Ngạn', text: 'Lài. Hoàng hậu gọi.' },
        { who: 'Lài', text: '…Dạ.' }
      ]);
      W.refresh(); W.locked = false; G.ui.hud(); G.save(); return;
    }
    G.ui.dialog([{ who: 'Lài', text: 'Dạ.' }]);
  };
  C.noi = async function () {
    var s = G.S, fl = s.flags;
    W.locked = true;
    fl.c1_noi = true; W.refresh(); W.locked = true;
    await G.ui.say([
      { text: 'Nồi ninh trên bếp sôi sùng sục. Bà Sáu mở vung.', sfx: 'bubble' },
      { text: 'Giữa nồi nước dùng, quả tim con vàng anh [[vẫn còn đập]].', img: 'chim_tim', sfx: 'heart' },
      { who: 'Bà Sáu', text: '(đánh rơi muôi) Lạy trời lạy đất…', img: 'chim_tim', sfx: 'thud' },
      { text: 'Trong rổ lông bên cạnh: bộ xương con chim. Cổ nó [[bị bẻ gãy gọn]], không phải chết vì bệnh.', img: 'xuong_chim', run: function () { G.addClue('V05'); } }
    ]);
    fl.c1_noi_xong = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
  };
  C.nganChan = function () {
    G.ui.dialog([
      { who: 'Đội Ngạn', text: 'Đêm khuya, cung cấm. Thầy đi đâu?' },
      { text: 'Phía sau lưng hắn, ở giếng giặt, có tiếng nước động.', cls: 'think', sfx: 'splash', choices: [
        { text: 'Quay về phòng', run: function () {} },
        { text: 'Cố lách qua', run: function () { G.danger.checkpoint = G.danger.checkpoint || JSON.stringify(Object.assign({}, G.S, { loc: 'cung_vuon', x: 600, y: 520 })); G.die('Thị vệ chém trước tâu sau.'); } }
      ] }
    ]);
  };

  // ---------- ngày 3: cái chết của Lài ----------
  C.laiIntro = async function () {
    var s = G.S, fl = s.flags; if (fl.c1_xem_lai_intro) return;
    fl.c1_xem_lai_intro = true; W.locked = true;
    await G.cut.play([
      { ve: 'gieng', chu: 'Giếng giặt. Trời còn chưa rõ mặt người.', dur: 2800, cam: [1, 0, 0, 1.25, 0, 0], sfx: 'drip', hieu: 'suong', nhac: 'ket_toi' },
      { ve: 'gieng', chu: 'Tay Lài vẫn nắm chặt **một chiếc lông vàng anh**.', dur: 3400, cam: [1.25, 0, 0, 1.45, 0, -30], sfx: 'stinger' },
      { ve: 'gieng', noi: 'Đăng', mood: 'buon', chu: '(Hôm qua Lài còn định nói với mình điều gì đó…)', dur: 3000 }
    ]);
    await G.ui.say([
      { text: 'Người ta vừa vớt Lài lên từ giếng giặt. Áo còn sũng nước. Tay Lài nắm chặt một chiếc [[lông vàng anh]].', sfx: 'stinger', run: function () { G.addDeath('lai'); } },
      { who: 'Nụ', text: '(khóc) Lài sợ nước lắm… chị ấy không bao giờ ra giếng một mình…' },
      { who: 'Đội Ngạn', text: 'Con bé trượt chân. Đêm qua ta gác cổng bắc, không rời nửa bước.', run: function () { G.addClue('L06'); } },
      { who: 'Đội Ngạn', text: 'Khiêng đi.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.xemLai = async function () {
    var s = G.S, fl = s.flags, soi = $('stage').classList.contains('soi');
    W.locked = true;
    var lines = [{ text: 'Đăng quỳ xuống cạnh Lài.', cls: 'think' }];
    if (!s.clues.V07) lines.push({ text: 'Trong móng tay Lài mắc [[một sợi chỉ đỏ]]. Cùng màu dải lưng áo thị vệ.', img: 'chi_do', run: function () { G.addClue('V07'); } });
    if (soi && !s.clues.V06) lines.push({ text: 'Qua mắt âm dương: quanh cổ Lài hiện [[năm vết ngón tay to bản]].', img: 'co_lai', run: function () { G.addClue('V06'); } });
    else if (!soi && !s.clues.V06) lines.push({ text: '(Cổ Lài trông bình thường. Có lẽ phải **mở mắt âm dương (B)** mới thấy.)', cls: 'think', img: null });
    if (!fl.c1_lay_long) lines.push({ text: 'Đăng gỡ chiếc lông vàng anh khỏi tay Lài, cất vào tráp.', img: 'long_vang', run: function () { fl.c1_lay_long = true; } });
    await G.ui.say(lines);
    fl.c1_xem_lai = !!(s.clues.V06 && s.clues.V07);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.linhTre = function () {
    var s = G.S, fl = s.flags;
    if (s.day < 3) return G.ui.dialog([{ who: 'Lính gác', text: 'Cổng bắc. Không phận sự miễn vào.' }]);
    if (s.clues.V08) return G.ui.dialog([{ who: 'Lính gác', text: 'Em chỉ nói với thầy thôi đấy.' }]);
    if (!fl.job_sao) return G.ui.dialog([{ who: 'Lính gác', text: 'Thầy là ai mà hỏi sổ gác? Đi đi.' }, { text: '(Hắn không tin mình. Có lẽ phải quen ai đó trong cung trước.)', cls: 'think' }]);
    G.ui.dialog([
      { who: 'Đăng', text: 'Thằng bạn lính hầu của cậu bảo tôi tới.' },
      { who: 'Lính gác', text: '…Thầy là người cúng sào hôm trước. Được. Thầy xem đi.' },
      { text: 'Sổ gác ghi: giờ Tý đêm qua, Ngạn đổi ca, [[rời cổng bắc]].', img: 'so_gac', run: function () { G.addClue('V08'); } },
      { who: 'Lính gác', text: 'Em không biết gì đâu đấy.', img: null }
    ]);
  };
  C.banTao = function () {
    var s = G.S;
    if (s.day < 3) return G.ui.dialog([{ text: 'Bàn thờ Táo quân. Có đĩa bánh đúc cúng cô Tấm, Lài đặt từ hôm trước.', cls: 'think' }]);
    if (s.clues.V09) return G.ui.dialog([{ text: 'Đĩa bánh đúc có mẩu xương cá.', img: 'banh_duc' }]);
    G.ui.dialog([{ text: 'Đĩa bánh đúc cúng cô Tấm. Bẻ ra thì thấy [[một mẩu xương cá nhỏ]], trắng muốt, như xương cá bống.', img: 'banh_duc', run: function () { G.addClue('V09'); } }]);
  };

  // kết luận trong Sổ Tử
  C.onVerdict = async function (id, k) {
    var s = G.S, d = G.DEATHS[id];
    s.verdict[id] = k;
    var dung = k === d.answer;
    if (id === 'lai') { s.flags.c1_s03 = dung ? 'dung' : 'sai'; }
    if (id === 'basau') { s.flags.c1_s03b = dung ? 'dung' : 'sai'; s.flags.c1_s03b_xong = true; }
    G.save();
    await G.ui.say([{ who: 'Đăng', text: dung ? '(Đội Ngạn. Hắn bóp cổ Lài rồi đẩy xuống giếng, vì Lài đã thấy kẻ cầm rìu ở gốc cau.)' :
      '(…Mình chắc chưa? Nếu sai, kẻ giết người vẫn còn ngoài kia.)', cls: 'think' }]);
    G.ui.hud();
    if (id === 'basau') C.ket();
  };

  // ---------- đêm 3: chôn lông trong vườn ngự ----------
  C.startDem3 = async function () {
    var s = G.S;
    s.c1Spots = s.c1Spots || [{ x: 180, y: 470 }, { x: 430, y: 455 }, { x: 610, y: 470 }, { x: 760, y: 560 }, { x: 330, y: 610 }];
    W.locked = true;
    await G.ui.say([
      { text: 'Nửa đêm. Ngoài vườn ngự, những nhúm lông vàng Cám sai vứt đi đang [[tự xếp thành hình một người con gái nằm]].', cls: 'think', sfx: 'stinger' },
      { who: 'Đăng', text: '(Phải chôn hết số lông ấy trước khi lính quét vườn lúc bình minh.)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  C.dangerDem3 = function () {
    G.danger.start({
      vuonOnly: true,
      guards: [
        { id: 'ngan', look: NGAN_DEM, path: [[260, 440], [520, 440], [720, 430], [720, 230], [520, 150], [280, 170], [240, 300]], speed: 62, range: 170, fov: 70 },
        { id: 'l1', look: L.linh, path: [[700, 600], [880, 520], [700, 460], [420, 560], [160, 560], [420, 520]], speed: 50, range: 150, fov: 60 }
      ],
      ghosts: [{ id: 'nam', x: 500, y: 640, hear: 210, speed: 75, html: C.ghostHtml(true) }],
      hides: [[730, 320, 170, 70], [850, 580, 100, 70], [40, 590, 160, 80]],
      onCaught: function (kind) { return kind === 'linh' ? 'Thị vệ chém trước tâu sau.' : 'Thứ nằm giữa vườn ngồi dậy. Nó kéo Đăng xuống hồ sen. Nước hồ sen lạnh hơn nước giếng.'; },
      restart: function () { C.dangerDem3(); }
    });
    C.music();
    G.ui.toast('Lính có vùng nhìn trên mặt đất. Nấp ở **bóng cây đào**, **sau chum**, **bụi chuối**. Phím **C** lắc chuông để dụ lính, nhưng vong sẽ nghe.', 7000);
  };
  C.chonLong = function (i, t) {
    var s = G.S, sp = s.c1Spots[i];
    G.danger.holdAt({ x: sp.x, y: sp.y + 10 }, 3, function () {
      sp.done = true; G.audio.sfx('thud');
      var left = s.c1Spots.filter(function (x) { return !x.done; }).length;
      G.ui.toast(left ? 'Đã chôn. Còn ' + left + ' nhúm.' : 'Chôn xong. Đất chỗ ấy [[ấm như da người]].');
      if (!left) { s.flags.c1_long_chon = true; G.danger.stop(); C.music(); G.save(); }
      var cp = G.danger.active ? JSON.parse(G.danger.checkpoint) : null;
      if (cp) { cp.c1Spots = s.c1Spots; G.danger.checkpoint = JSON.stringify(cp); } // chôn rồi thì không phải chôn lại khi chết
      W.sc = null; var keep = G.danger.active; var gs = keep ? G.danger : null;
      // vẽ lại nền cho vết đất mới mà không dựng lại lính
      var sc = G.scenes.cung_vuon(s); G.$('bg').innerHTML = sc.svg;
      G.ui.hud();
    });
  };
  C.long = function () {
    var s = G.S, fl = s.flags;
    if (!fl.c1_long_chon) return G.ui.dialog([{ text: 'Chiếc lông vàng anh gỡ từ tay Lài. Để sau đã.', img: 'long_vang' }]);
    if (!$('stage').classList.contains('soi')) return G.ui.dialog([{ text: 'Chiếc lông vàng anh. Bấm **B** để mở mắt âm dương mà nhìn.', img: 'long_vang' }]);
    G.memory2.enter();
  };
  C.afterKy2 = async function () {
    var s = G.S;
    s.flags.c1_ky2 = true; G.addClue('V10');
    W.refresh(); W.locked = true;
    C.music();
    await G.ui.say([
      { who: 'Đăng', text: '(Bốn lọ xương dưới bốn chân giường. Cái bóng gõ mõ ngoài cửa…)', cls: 'think' },
      { who: 'Đăng', text: '(Nhịp mõ ấy. Mình nghe nó suốt mười năm.)', cls: 'think' }
    ]);
    W.locked = false;
    await G.ui.fade(function () {});
    s.day = 4; s.phase = 'sang';
    if (s.flags.c1_s03 === 'sai') s.flags.c1_basau_chet = true;
    W.enter('cung_bep', 760, 300);
    C.music();
    await G.ui.card('Ngày 4 trong cung · Sáng', '');
    G.save();
    if (s.flags.c1_basau_chet) { G.ui.hud(); return; }
    C.sang4();
  };
  C.basauIntro = async function () {
    var s = G.S; s.flags.c1_basau_intro = true; W.locked = true;
    await G.ui.say([
      { text: 'Bà Sáu nằm cạnh chạn bát, gáy đập vào cạnh bếp. Mắt còn mở.', sfx: 'stinger', run: function () { G.addDeath('basau'); } },
      { who: 'Đăng', text: '(Bà là người nói với mình con chim bị bẻ cổ. Nếu mình kết luận đúng từ đầu…)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud();
  };
  C.chanBat = function () {
    G.ui.dialog([{ text: 'Cạnh chạn bát có [[dấu giày to]], đế đóng đinh như giày thị vệ. Mở Sổ Tử để kết luận.', img: 'por_basau', run: function () { G.addClue('V11'); } }]);
  };
  C.sang4 = function () { G.ui.toast('Mọi người đang đợi ở **sân chầu**.'); G.ui.hud(); };

  // ---------- kết chương ----------
  C.ket = async function () {
    var s = G.S, fl = s.flags;
    if (fl.c1_het) return;
    if (fl.c1_basau_chet && fl.c1_s03b !== 'dung') {
      if ((s.verdict || {}).basau === undefined) { G.ui.toast('Còn trang Sổ Tử của bà Sáu chưa kết luận.'); return; }
    }
    W.locked = true;
    if (s.loc !== 'cung_san') { await G.ui.fade(function () { W.enter('cung_san', 480, 580); }); W.locked = true; }
    var dung = fl.c1_s03 === 'dung' || fl.c1_s03b === 'dung';
    await G.ui.say(dung ? [
      { who: 'Đăng', text: 'Tâu… Lài không trượt chân. Có người bóp cổ Lài rồi đẩy xuống giếng. Sổ gác ghi Đội Ngạn rời cổng bắc lúc giờ Tý.' },
      { who: 'Dì ghẻ', text: 'Thị vệ của ta. **Thầy lấy gì mà buộc tội?** Một quyển sổ gác với một sợi chỉ?' },
      { who: 'Đội Ngạn', text: '(cười) Thầy cúng thì lo mà cúng.' },
      { text: 'Đội Ngạn không bị bắt. Nhưng từ hôm nay, hắn nhìn Đăng [[như nhìn một cái xác]].', cls: 'think' }
    ] : [
      { who: 'Dì ghẻ', text: 'Con Lài số khổ. Thôi, chuyện đã rồi. Thầy lo việc của thầy.' },
      { text: 'Không ai bị hỏi tội. Đội Ngạn vẫn đi tuần như mọi đêm.', cls: 'think' }
    ]);
    fl.c1_mam_cay = true; fl.c1_het = true;
    await G.ui.fade(function () { W.enter('cung_vuon', 560, 660); });
    W.locked = true;
    await G.ui.say([
      { text: 'Ở chỗ chôn lông chim, sau một đêm, đã mọc lên một [[mầm cây non]] cao bằng đầu gối. Lá đỏ như máu.', img: 'mam_cay' },
      { who: 'Đăng', text: '(Bốn lọ xương dưới giường. Phải về làng.)', cls: 'think', img: null }
    ]);
    G.save();
    G.audio.music('title');
    var nDeduce = G.DEDUCE.filter(function (x) { return s.deduce[x.id]; }).length;
    await G.ui.card('Hết chương 1', 'Sổ Tử: ' + Object.keys(s.clues).length + ' manh mối · ' + nDeduce + '/' + G.DEDUCE.length +
      ' phép đối chiếu · Đăng đã chết ' + (s.deaths || 0) + ' lần.' + (fl.c1_basau_chet ? '<br>Vì kết luận sai, [[bà Sáu đã chết]].' : ''), 'Sang Chương 2 ›');
    W.locked = false;
    G.ch2.begin();
  };
})();
