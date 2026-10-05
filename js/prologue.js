// Kịch bản MỞ ĐẦU: Gốc cau. Ngày bốn mươi chín của Tấm. Xem docs/dac-ta-mo-dau-ch1.md, mục B.
var G = window.G || (window.G = {});
G.prologue = {};

// ---------- lời khai, vật chứng, đối chiếu ----------
G.CLUES = {
  L01: { type: 'L', title: 'Dì ghẻ: con bé trượt chân', text: 'Tấm trèo hái cau cúng cha, trượt chân ngã. "Số nó vậy."' },
  L02: { type: 'L', title: 'Lài: hôm ấy em cũng ở đây', text: 'Hôm giỗ cha cô Tấm, Lài cũng về làng. Lài định nói gì đó rồi bị gọi đi.' },
  V01: { type: 'V', title: 'Vết rìu trên gốc cau', text: 'Dưới lớp đất mới đắp, gốc cau cũ có ba vết rìu chéo, sâu, gọn.' },
  V02: { type: 'V', title: 'Túi tiền nặng gấp ba', text: 'Tiền công dì ghẻ trả cho một lễ trấn vong, nặng gấp ba lệ thường.' },
  V03: { type: 'V', title: 'Giỏ tép trống', text: 'Giỏ tép cũ treo trong bếp, ướt sũng. Đáy giỏ còn một con cá bống khô.' },
  V04: { type: 'V', title: 'Tai trái của xác', text: 'Xác trên ngọn cau. Tai trái không thấy nốt ruồi. (Chắc mình nhớ nhầm?)' }
};
G.DEDUCE = [
  { id: 'D01', a: 'L01', b: 'V01', title: 'Cây cau bị chặt', text: 'Tấm không tự ngã. Có người đã [[chặt gốc cau]] lúc cô đang ở trên ngọn.',
    after: function () { G.prologue.afterD01(); } },
  { id: 'D02', a: 'L01', b: 'V02', title: 'Lễ này để bịt miệng ai?', text: 'Trả gấp ba tiền công cho một lễ trấn vong. Dì ghẻ [[sợ cái vong này nói ra điều gì đó]].' },
  { id: 'D03', a: 'L02', b: 'V01', title: 'Lài đã thấy gì?', text: 'Lài có mặt hôm giỗ cha cô Tấm, đúng hôm gốc cau bị chặt. [[Lài có thể là người làm chứng.]]' }
];
G.DEATHS = {
  tam: { name: 'Tấm', img: 'por_tam',
    meta: function (S) { return 'Chết ngày giỗ cha, dưới gốc cau sau nhà. Hôm nay là ngày bốn mươi chín.<br>Người nhà khai: trèo cau hái quả, trượt chân.' + (S.deduce.D01 ? '<br>Đã biết: **gốc cau bị chặt**.' : ''); },
    verdict: function (S) { return S.deduce.D01 ? 'Người giết: chưa rõ ai cầm rìu' : 'Chưa đủ chứng cứ'; } },
  thay: { name: 'Thầy Cả', img: 'por_thay',
    meta: function () { return 'Sáng ngày thứ ba, vắt trên ngọn cây cau non trồng thay chỗ gốc cũ. Miệng nhồi đầy cau non.<br>Dân làng nói: vong cô Tấm bắt.'; },
    verdict: function () { return 'Chưa đủ chứng cứ'; } }
};

(function () {
  var P = G.prologue, W = G.world, $ = G.$, L = G.LOOKS;

  // ---------- nhân vật trong cảnh ----------
  P.npcs = function (S) {
    var b = S.beat, f = S.flags, list = [];
    if (S.loc === 'lang_duong') {
      if (b === 'den_lang') list.push({ id: 'thay', look: L.thay, x: f.intro_done ? S.x + 60 : 120, y: 520, view: 'side', flip: 1, label: 'Thầy Cả', follow: f.intro_done, atPlayer: f.intro_done });
      list.push({ id: 'kid1', look: L.kid1, x: 520, y: 438, view: 'front', label: 'Đám trẻ', bubble: 'Cái bống là cái bống bang…' });
      list.push({ id: 'kid2', look: L.kid2, x: 600, y: 442, view: 'side', flip: -1 });
      list.push({ id: 'kid3', look: L.kid3, x: 560, y: 462, view: 'back' });
      list.push({ id: 'onglao', look: L.ongLao, x: 800, y: 440, view: 'front', label: 'Ông lão bán nước' });
    }
    if (S.loc === 'nha_dighe') {
      if (b === 'gap_dighe') {
        list.push({ id: 'dighe', look: L.dighe, x: 520, y: 430, view: 'front', label: 'Dì ghẻ' });
        list.push({ id: 'thay', look: L.thay, label: 'Thầy Cả', follow: true, atPlayer: true });
        list.push({ id: 'cam', look: L.cam, x: 260, y: 230, view: 'front', label: 'Cám' });
        list.push({ id: 'lai', look: L.lai, x: 700, y: 262, view: 'front', label: 'Cung nữ Lài' });
      }
      if (b === 'sau_ky' && !f.lai_noi) list.push({ id: 'lai', look: Object.assign({}, L.lai, { prop: 'lantern' }), x: 690, y: 330, view: 'front', label: 'Lài' });
      if (b === 'su_gia') {
        list.push({ id: 'sugia', look: L.suGia, x: 470, y: 570, view: 'front', label: 'Sứ giả' });
        list.push({ id: 'dighe', look: L.dighe, x: 400, y: 560, view: 'side', flip: 1 });
        list.push({ id: 'cam', look: L.cam, x: 330, y: 560, view: 'side', flip: 1 });
      }
    }
    if (S.loc === 'vuon_cau') {
      if (b === 'dem_le' || b === 'le_xong') list.push({ id: 'thay', look: L.thay, x: f.thay_toi_vuon ? 560 : 240, y: f.thay_toi_vuon ? 560 : 530, view: 'side', flip: -1, label: 'Thầy Cả' });
      if (b === 'sang3' || b === 'su_gia') {
        // xác treo trên ngọn cau non: không có nốt ruồi, mắt nhắm
        list.push({ id: 'xac', html: G.art.xacVatCanh(193), x: 505, y: 450, cls: 'hang noshadow', ghost: true, fixedView: true }); // y thấp để vẽ trước thân cau (ngọn ở y=257)
        if (b === 'sang3') {
          list.push({ id: 'dan1', look: L.danLang, x: 400, y: 590, view: 'back', label: 'Dân làng' });
          list.push({ id: 'dan2', look: L.danLang2, x: 600, y: 600, view: 'back' });
          list.push({ id: 'dighe', look: L.dighe, x: 330, y: 540, view: 'side', flip: 1 });
        }
      }
    }
    return list;
  };

  P.things = function (S) {
    var b = S.beat, f = S.flags, list = [];
    if (S.loc === 'nha_dighe') {
      if (b === 'gap_dighe' && f.met_dighe && !f.mam_done) list.push({ id: 'mam', x: 480, y: 524, hit: [420, 450, 120, 60], label: 'Bày mâm lễ', quest: true });
      if (b === 'gap_dighe' && f.mam_done) list.push({ id: 'chong', x: 754, y: 484, hit: [704, 418, 100, 50], label: 'Nghỉ chờ đến đêm', quest: true });
      if (b === 'dem2') {
        list.push({ id: 'gio_tep', x: 636, y: 140, hit: [618, 66, 44, 52], label: 'Giỏ tép', quest: !f.ky1_done });
        list.push({ id: 'chong', x: 754, y: 484, hit: [704, 418, 100, 50], label: 'Đi ngủ' });
      }
      if (b === 'sau_ky' && f.lai_noi) list.push({ id: 'chong', x: 754, y: 484, hit: [704, 418, 100, 50], label: 'Đi ngủ', quest: true });
      if (b === 'su_gia' && f.nhan_hop_dong && !f.mo_trap) list.push({ id: 'trap', x: 754, y: 484, hit: [704, 418, 100, 50], label: 'Mở tráp của thầy', quest: true });
      list.push({ id: 'ban_tho', x: 480, y: 214, hit: [418, 64, 124, 128], label: 'Bàn thờ' });
      list.push({ id: 'gieng_lap', x: 120, y: 330, hit: [26, 276, 90, 44], label: 'Giếng cũ' });
    }
    if (S.loc === 'vuon_cau') {
      if (b === 'dem_le' && !f.found_riu) list.push({ id: 'goc_cau', x: 470, y: 476, hit: [420, 410, 110, 70], label: 'Dọn chỗ dưới gốc cau', quest: true });
      if (b === 'sang3' || b === 'su_gia') list.push({ id: 'xac', x: 505, y: 460, hit: [460, 230, 90, 230], label: 'Nhìn lên ngọn cau', quest: !f.xem_xac });
    }
    if (S.loc === 'lang_duong') list.push({ id: 'ao', x: 300, y: 590, hit: [60, 590, 360, 120], label: 'Ao làng' });
    return list;
  };

  P.objective = function (S) {
    var b = S.beat, f = S.flags;
    if (b === 'den_lang') return f.intro_done ? 'Theo đường làng sang **nhà dì ghẻ** (đi về mép phải)' : '';
    if (b === 'gap_dighe') {
      if (!f.met_dighe) return 'Chào **dì ghẻ** ở giữa sân';
      if (!f.mam_done) return 'Bày **mâm lễ** giữa sân';
      return 'Nghỉ ở **chõng tre** chờ đến đêm';
    }
    if (b === 'dem_le') {
      if (!f.found_riu) return 'Dọn chỗ đặt lễ dưới **gốc cau**';
      if (!S.deduce.D01) return 'Mở **Sổ Tử** (J): đặt lời dì ghẻ cạnh vết rìu, rồi bấm Đối chiếu';
      return 'Nói với **Thầy Cả** để bắt đầu lễ';
    }
    if (b === 'le_xong') return 'Về nhà ngủ (đi về mép trái)';
    if (b === 'dem2') return f.ky1_done ? 'Đi ngủ ở **chõng tre**' : 'Tìm chỗ phát ra **tiếng nước nhỏ giọt**. Hoặc nghe lời thầy, đi ngủ.';
    if (b === 'sau_ky') return f.lai_noi ? 'Đi ngủ ở **chõng tre**' : 'Có người đứng ở cửa bếp';
    if (b === 'sang3') return f.xem_xac ? 'Về **sân nhà**, có người từ kinh thành tới' : 'Ra **vườn cau**, dân làng đang xúm lại';
    if (b === 'su_gia') return f.nhan_hop_dong ? 'Mở **tráp đồ nghề** của thầy ở chõng tre' : 'Gặp **sứ giả** ở sân';
    return '';
  };

  P.canExit = function (dir, to) {
    var S = G.S, b = S.beat;
    if (b === 'den_lang' && !S.flags.intro_done) return false;
    if (b === 'gap_dighe' && to === 'lang_duong') { G.ui.toast('Thầy đang chờ ở nhà dì ghẻ.'); return false; }
    if (b === 'gap_dighe' && to === 'vuon_cau') { G.ui.toast('Chưa tới giờ làm lễ. Vườn cau để đêm hãy ra.'); return false; }
    if (b === 'dem_le' && to === 'nha_dighe') { G.ui.toast('Lễ chưa xong. Không được bỏ thầy một mình.'); return false; }
    if ((b === 'dem2' || b === 'sau_ky') && to !== 'nha_dighe') { G.ui.toast('Đêm khuya. Ra ngoài lúc này không ổn.'); return false; }
    if (b === 'su_gia' && to === 'lang_duong') { G.ui.toast('Sứ giả còn đang đợi.'); return false; }
    return true;
  };

  P.lights = function (S) { return []; };

  // ---------- khi vào cảnh ----------
  P.onEnter = function (loc) {
    var S = G.S, f = S.flags;
    if (loc === 'nha_dighe' && S.beat === 'den_lang') { S.beat = 'gap_dighe'; W.refresh(); return; }
    if (loc === 'nha_dighe' && S.beat === 'gap_dighe' && !f.met_dighe) { setTimeout(P.gapDighe, 400); }
    if (loc === 'nha_dighe' && S.beat === 'le_xong') { S.beat = 'dem2'; f.dem2_start = false; }
    if (loc === 'vuon_cau' && S.beat === 'sang3' && !f.thay_vuon) { f.thay_vuon = true; setTimeout(P.thayVuon, 500); }
    if (loc === 'nha_dighe' && S.beat === 'sang3' && f.xem_xac) { S.beat = 'su_gia'; W.refresh(); setTimeout(P.suGiaDen, 400); }
  };

  // ---------- tương tác ----------
  P.act = function (id) {
    var S = G.S, f = S.flags;
    switch (id) {
      case 'thay':
        if (S.beat === 'den_lang') return G.ui.dialog([{ who: 'Thầy Cả', text: 'Đi thôi con. Nhà dì ghẻ ở cuối đường, có hàng cau cao nhất làng.' }]);
        if (S.beat === 'gap_dighe') return G.ui.dialog(f.mam_done ?
          [{ who: 'Thầy Cả', text: 'Ngả lưng một lát đi. Giờ Tý mình ra vườn cau.' }] :
          [{ who: 'Thầy Cả', text: 'Bày mâm cho cẩn thận. **Có thờ có thiêng, có kiêng có lành.**' }]);
        if (S.beat === 'dem_le') {
          if (!f.found_riu) return G.ui.dialog([{ who: 'Thầy Cả', text: 'Dọn chỗ dưới gốc cau đã con. Đất mới đắp, gạt cho phẳng.' }]);
          if (!S.deduce.D01) return G.ui.dialog([{ who: 'Thầy Cả', text: 'Con cứ đứng nhìn cái gốc ấy mãi làm gì?' }, { text: '(Mở **Sổ Tử** bằng phím **J** hoặc nút trên góc phải.)', cls: 'think' }]);
          return P.batDauLe();
        }
        if (S.beat === 'le_xong') return G.ui.dialog([{ who: 'Thầy Cả', text: 'Về ngủ đi. Nhớ lời thầy: **đêm nay đừng mở mắt âm dương trong nhà ấy**.' }]);
        return;
      case 'kid1':
        return G.ui.dialog([
          { who: 'Đám trẻ', text: 'Cái bống là cái bống bang, khéo sảy khéo sàng cho mẹ nấu cơm…', cls: 'verse' },
          { who: 'Thằng cu', text: 'Chú là thầy cúng à? Mẹ cháu bảo không được ra **vườn cau** nhà ấy. Chị Tấm ngã ở đấy.' },
          { who: 'Con bé', text: 'Đêm nào cũng có người hát ru ở trên ngọn cau. Mà nhà ấy có ai ru con đâu.' }
        ]);
      case 'onglao':
        return G.ui.dialog([
          { who: 'Ông lão', text: 'Thầy về làm lễ cho nhà ấy hả? Ừ, bốn mươi chín ngày rồi còn gì.' },
          { who: 'Ông lão', text: 'Từ hôm con bé mất, gà nhà ấy không gáy sáng nữa. Chỉ gáy lúc **nửa đêm**.', sfx: 'rooster' },
          { who: 'Ông lão', text: 'Mà thôi, tôi già rồi, nói lẩm cẩm. Thầy uống bát nước chè cho ấm bụng.' }
        ]);
      case 'ao':
        return G.ui.dialog([{ text: 'Mặt ao phẳng lặng. Bóng cây gạo đỏ in dưới nước, đỏ hơn cả trên cây.', cls: 'think' }]);
      case 'dighe':
        if (S.beat === 'gap_dighe') return G.ui.dialog([{ who: 'Dì ghẻ', text: 'Thầy trò cứ tự nhiên. Cần gì cứ gọi con Lài.' }]);
        return;
      case 'cam':
        if (S.beat === 'gap_dighe') return G.ui.dialog([
          { who: 'Cám', text: '…' },
          { text: 'Hoàng hậu ngồi trên mép giường tre, ôm chặt một chiếc **yếm đỏ** cũ. Cô không nhìn ra phía vườn cau.', cls: 'think' },
          { who: 'Cám', text: 'Chiếc yếm này… là của chị ấy. Mẹ bảo đốt đi. Tôi không đốt được.' },
          { who: 'Cám', text: 'Thầy làm lễ cho nhanh rồi đi đi.' }
        ]);
        return G.ui.dialog([{ who: 'Cám', text: '…' }]);
      case 'lai':
        if (S.beat === 'gap_dighe') return G.ui.dialog([
          { who: 'Lài', text: 'Em là Lài, hầu trong cung. Ngày trước em hầu cô Tấm, giờ em hầu… hoàng hậu.' },
          { who: 'Lài', text: 'Thầy ăn miếng bánh đúc cho đỡ đói. Em mới đổ chiều nay.' },
          { text: 'Ngoài sân, thầy gõ thử mõ một tiếng. Tay Lài run, suýt đánh rơi đĩa bánh.', sfx: 'mo', cls: 'think' }
        ]);
        if (S.beat === 'sau_ky') return P.laiNoi();
        return;
      case 'mam': return P.bayMam();
      case 'chong':
        if (S.beat === 'gap_dighe') return P.sangDem();
        if (S.beat === 'dem2') return G.ui.dialog([{ who: 'Đăng', text: 'Thầy dặn đêm nay đừng mở mắt âm dương. Hay là… đi ngủ?', choices: [
          { text: 'Nghe lời thầy, đi ngủ', run: function () { f.ky1_skip = true; P.sang3(); } },
          { text: 'Chưa. Tiếng nước kia là gì đã', run: function () {} }] }]);
        if (S.beat === 'sau_ky') return P.sang3();
        return;
      case 'gio_tep': return P.gioTep();
      case 'goc_cau': return P.gocCau();
      case 'xac': return P.xemXac();
      case 'sugia': return P.suGia();
      case 'trap': return P.moTrap();
      case 'ban_tho':
        return G.ui.dialog([
          { text: 'Bàn thờ cô Tấm. Bài vị gỗ mới sơn son, chữ thếp vàng còn sáng. Bát hương cắm kín chân nhang.', cls: 'think' },
          { text: 'Mâm quả trên bàn thờ đã héo cả. Riêng **buồng cau** đặt giữa thì tươi rói, như vừa mới hái.', cls: 'think' },
          { who: 'Đăng', text: '(Nhà này còn dám cúng cau cho cô ấy à?)', cls: 'think' }
        ]);
      case 'gieng_lap':
        return G.ui.dialog(S.phase === 'dem' ?
          [{ text: 'Cái giếng cũ đã lấp. Áp tai xuống đá thì nghe như có tiếng **nước chảy** bên dưới.', cls: 'think', sfx: 'drip' }] :
          [{ text: 'Một cái giếng cũ đã bị lấp kín bằng đất đá. Đá xếp vội, còn mới.', cls: 'think' }]);
    }
  };

  // ---------- NGÀY 1: vào làng ----------
  P.start = async function () {
    var S = G.S;
    W.locked = true;
    await G.ui.card('Ngày thứ bốn mươi chín', 'Chiều. Làng Đông.');
    var thay = W.npcs.thay;
    await Promise.all([W.walkPlayer(220, 500, 120), W.walkEnt(thay, 300, 520, 120)]);
    W.place(thay, 300, 520, 'side', -1);
    await G.ui.say([
      { who: 'Thầy Cả', text: 'Tới rồi đấy. Làng Đông. Nhà có đám bốn mươi chín ngày ở cuối đường.' },
      { who: 'Đăng', text: 'Thầy ơi, nốt ruồi chờ lộc bên tai trái của thầy hôm nay giật lắm. Chắc tiền công to.' },
      { who: 'Thầy Cả', text: 'Cái thằng. Nhớ lấy: **đi với Bụt mặc áo cà sa, đi với ma mặc áo giấy**. Vào nhà người ta có tang thì bớt nói.' },
      { who: 'Thầy Cả', text: 'Lễ hôm nay là **lễ trấn vong**. Con bé nhà ấy chết trẻ, chết ở gốc cau. Nhà người ta muốn nó nằm yên.' },
      { who: 'Đăng', text: '(Trấn vong… chứ không phải cầu siêu. Lạ thật.)', cls: 'think' }
    ]);
    S.flags.intro_done = true;
    W.npcs.thay.def.follow = true; W.follower = W.npcs.thay;
    W.locked = false;
    G.ui.hud(); G.save();
    G.ui.toast('**Thầy Cả** sẽ đi theo bạn.');
  };

  P.gapDighe = async function () {
    var S = G.S, f = S.flags;
    if (f.met_dighe) return;
    W.locked = true;
    await W.walkPlayer(500, 520, 160);
    S.view = 'back'; W.syncPlayer(false);
    await G.ui.say([
      { who: 'Dì ghẻ', text: 'Thầy về rồi. Mời thầy, mời cậu vào.' },
      { who: 'Dì ghẻ', text: 'Con bé nhà tôi… nó trèo hái cau cúng cha, trượt chân ngã. Số nó vậy.', run: function () { G.addClue('L01'); } },
      { who: 'Dì ghẻ', text: 'Hoàng hậu về đây cùng tôi. Thầy làm lễ sao cho nó **nằm yên**, đừng về quấy nữa.' },
      { text: 'Dì ghẻ đặt túi tiền vào tay thầy. Bàn tay bà đeo một chiếc **nhẫn bạc**.', img: 'tui_tien' },
      { who: 'Thầy Cả', text: '(nhấc túi tiền lên) Nặng tay quá bà ạ.', img: 'tui_tien', run: function () { G.addClue('V02'); } },
      { who: 'Dì ghẻ', text: 'Của đáng tội. Thầy cứ nhận.', img: null },
      { who: 'Thầy Cả', text: 'Đăng. Bày mâm giữa sân đi con.' }
    ]);
    f.met_dighe = true;
    W.locked = false; W.refresh(); G.save();
  };

  P.bayMam = async function () {
    var S = G.S;
    var wrong = 0;
    if (!S.flags.mam_dan) {
      S.flags.mam_dan = true;
      await G.ui.say([
        { who: 'Thầy Cả', text: 'Mâm cúng đất thì bày thế này, nghe cho kỹ, thầy chỉ nói một lần.' },
        { who: 'Thầy Cả', text: 'Bát hương ở giữa. Hoa bên tả, quả bên hữu. Nước gần chỗ mình quỳ, gạo muối để xa nhất. Vàng mã thì không bao giờ đặt lên mâm.' },
        { who: 'Đăng', text: '(Tả là tay trái mình khi quỳ trước mâm…)', cls: 'think' }
      ]);
    }
    await G.mg.mam(function () { wrong++; if (wrong === 1) G.ui.toast('Thầy Cả: "**Có thờ có thiêng, có kiêng có lành.** Đặt cho đúng chỗ."'); });
    S.flags.mam_done = true;
    W.refresh();
    await G.ui.say([{ who: 'Thầy Cả', text: 'Được. Mâm này để cúng đất. Mâm trấn vong thầy mang ra vườn cau sau.' },
      { who: 'Thầy Cả', text: 'Ngả lưng lên **chõng tre** một lát. Giờ Tý mình ra vườn.' }]);
    G.save();
  };

  // ---------- ĐÊM 1: lễ trấn vong ----------
  P.sangDem = async function () {
    var S = G.S;
    await G.ui.fade(function () { });
    await G.ui.card('Đêm', 'Giờ Tý.');
    S.phase = 'dem'; S.beat = 'dem_le';
    W.enter('vuon_cau', 300, 520);
    P.music();
    W.locked = true;
    // hai thầy trò cùng đi vào vườn cau
    await Promise.all([W.walkPlayer(430, 560, 110), W.walkEnt(W.npcs.thay, 560, 560, 120)]);
    W.place(W.npcs.thay, 560, 560, 'side', -1);
    S.flags.thay_toi_vuon = true;
    await G.ui.say([
      { who: 'Thầy Cả', text: 'Đây. Gốc cau của con bé. Họ trồng cây non ngay cạnh để che gốc cũ đi.' },
      { who: 'Thầy Cả', text: 'Dọn chỗ dưới gốc cho thầy. Đất còn mới, gạt cho phẳng.' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };

  P.gocCau = async function () {
    var S = G.S;
    await G.ui.say([
      { text: 'Đăng lấy chân gạt lớp đất mới đắp.', sfx: 'step' },
      { text: 'Bên dưới là gốc cau cũ, cụt ngang. Trên gốc có [[ba vết rìu chéo]], sâu và gọn.', img: 'vet_riu', sfx: 'stinger', run: function () { S.flags.found_riu = true; W.refresh(); G.addClue('V01'); } },
      { who: 'Đăng', text: '(Trượt chân ngã… thì sao gốc cây lại có vết rìu?)', cls: 'think', img: null }
    ]);
    G.ui.toast('Mở **Sổ Tử** (phím J) để đối chiếu.', 4000);
    G.addDeath('tam');
    G.ui.hud();
  };

  P.afterD01 = async function () {
    W.locked = true;
    await G.ui.say([
      { who: 'Thầy Cả', text: '(gập cuốn sổ của Đăng lại) Chuyện nhà người ta, con ạ.' },
      { who: 'Thầy Cả', text: 'Mình là thầy pháp. Mình làm lễ. Người sống làm gì nhau, để người sống lo.' },
      { who: 'Đăng', text: 'Nhưng thầy ơi, nếu cô ấy chết oan thì trấn vong là…' },
      { who: 'Thầy Cả', text: 'Là việc của mình. Lại đây, vẽ bùa.' }
    ]);
    W.locked = false; G.ui.hud();
  };

  P.batDauLe = async function () {
    var S = G.S, f = S.flags;
    W.locked = true;
    await G.ui.say([{ who: 'Thầy Cả', text: 'Vẽ lá bùa trấn. Tay cho vững, nét nào ra nét ấy.' }]);
    await G.mg.bua({ title: 'Vẽ bùa trấn vong', hint: 'Giữ chuột (hoặc ngón tay) tô theo nét mờ. Lần đầu, cứ thong thả.' });
    await G.ui.say([
      { who: 'Thầy Cả', text: 'Được. Giờ thầy thắp **một nén nhang** rồi tụng. Con gõ mõ giữ nhịp cho thầy.' },
      { who: 'Thầy Cả', text: 'Nhang chưa tàn, **mõ không được ngắt**. Có nghe thấy gì cũng mặc.' }
    ]);
    S.beat = 'dem_le'; W.refresh(); W.locked = true;
    G.audio.music(null); G.audio.ambience('none');
    var tim = setInterval(function () { G.audio.sfx('heart2'); }, 1500), lanSai = 0;
    var r = await G.mg.mo({
      title: 'Lễ trấn vong', dur: 46, bpm: 66,
      onMiss: function (n) {
        lanSai++;
        if (n % 3 === 0) { // mỗi lần ngắt nhịp, cái mặt sau thân cau lại gần thêm
          W.darkAlpha = Math.min(0.96, 0.86 + n * 0.01); G.hu.mat(56 + Math.random() * 10, 34 + Math.min(20, n * 2), 900, 0.8 + Math.min(1.6, n * 0.12));
        }
      },
      events: [
        { t: 2, run: function (say) { G.hu.do(0.15); say('**Thầy Cả** tụng lầm rầm. Khói nhang bò sát mặt đất, không chịu bay lên.'); } },
        { t: 7, run: function (say) { G.audio.sfx('whisper'); say('Có tiếng ai thì thầm theo nhịp mõ. Chậm hơn nửa nhịp.'); } },
        { t: 11, run: function (say) { G.audio.sfx('knock'); say('Cộc. Cộc. Cộc. Có tiếng gõ trong thân cây cau. Không ai gõ cả.'); } },
        { t: 14, run: function (say) { W.darkAlpha = 0.95; G.hu.tat(600); G.audio.sfx('whoosh'); say('Gió nổi. Đèn lồng chao, tắt phụt, rồi bùng lên.'); } },
        { t: 16, run: function (say) { W.darkAlpha = 0.88; G.hu.mat(61, 30, 1800, 0.9); say('Sau thân cau non… có ai vừa [[ló mặt ra]].'); } },
        { t: 19, run: function (say) {
          for (var i = 0; i < 7; i++) G.audio.sfx('thud', i * 0.13);
          W.shake(); f.cau_rung = true; W.refresh(); W.locked = true; G.hu.do(0.35);
          say('[[Cả buồng cau rụng xuống cùng một lúc!]]');
        } },
        { t: 21, run: function (say) { G.audio.sfx('stinger'); G.ui.closeup('cau_rang'); say('Quả nào cũng [[nứt đôi ra thành hàm răng người]]. Hàm răng còn đang nhai.'); } },
        { t: 24, run: function (say) { G.ui.closeup(null); say('**Thầy Cả**: Đừng ngừng gõ. Đừng ngẩng lên.'); } },
        { t: 27, run: function (say) { G.hu.tay(4); say('Những bàn tay [[ướt và lạnh]] áp lên mặt Đăng, từng bàn một.'); } },
        { t: 31, run: function (say) { G.audio.lullaby(0.97); G.hu.do(0.55); say('Có tiếng ai hát ru… từ trên ngọn cau non.'); } },
        { t: 35, run: function (say) { G.hu.mauRo(7); G.audio.sfx('drip'); G.audio.sfx('drip', 0.5); say('Có gì nhỏ xuống tóc Đăng. [[Đặc, và ấm.]]'); } },
        { t: 39, run: function (say) { say('**Thầy Cả**: Sắp tàn nén rồi. Gõ cho đều.'); } },
        { t: 42.5, run: function (say) { G.hu.nhay(); say('…'); } },
        { t: 43.5, run: function (say) { say('Im lặng. Cả vườn cau im phăng phắc.'); } }
      ]
    });
    clearInterval(tim); G.hu.xoa(); G.hu.do(0); G.audio.ambience('dem');
    W.darkAlpha = undefined;
    f.le_done = true; f.mo_good = r.good; S.beat = 'le_xong';
    W.refresh(); W.locked = true;
    P.music();
    await G.ui.say([
      { text: 'Nhang tàn. Thầy Cả chôn lá bùa xuống gốc cau cũ, nén đất thật chặt.' },
      { who: 'Thầy Cả', text: r.miss > 8 ? 'Mõ của con ngắt nhịp mấy lần. Mong là nó không nghe thấy.' : 'Mõ đều tay. Khá lắm.' },
      { who: 'Thầy Cả', text: 'Về ngủ đi. Thầy ngồi đây canh đến sáng.' },
      { who: 'Thầy Cả', text: 'À, còn điều này. Thầy khai **mắt âm dương** cho con từ bé, con nhớ chứ? **Đêm nay đừng mở nó trong nhà ấy.**', run: function () { S.items.bat_nuoc = true; } },
      { who: 'Đăng', text: '(Mắt âm dương: nhìn được những thứ mắt thường không thấy. Chỉ mở được một lúc, nhắm lại thì phải chờ mắt hết mỏi. Phím **B**.)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- ĐÊM 2 ----------
  var dripT = 0;
  P.tick = function (dt) {
    var S = G.S;
    if (S.beat === 'dem2' && S.loc === 'nha_dighe') {
      if (!S.flags.dem2_start) { S.flags.dem2_start = true; setTimeout(P.dem2Intro, 300); }
      dripT -= dt;
      if (dripT <= 0 && !S.flags.ky1_done) { dripT = 1.6 + Math.random(); G.audio.sfx('drip'); }
    }
  };
  P.dem2Intro = async function () {
    var S = G.S;
    W.locked = true;
    S.x = 754; S.y = 500; W.syncPlayer(false); W.updateCamera(true);
    await G.ui.say([
      { text: 'Đăng nằm trên chõng tre mà không ngủ được.', cls: 'think' },
      { text: 'Tách. Tách. Có tiếng nước nhỏ giọt, từ phía **bếp**.', sfx: 'drip', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud();
  };
  P.gioTep = function () {
    var S = G.S, soi = $('stage').classList.contains('soi');
    if (S.flags.ky1_done) return G.ui.dialog([{ text: 'Giỏ tép đã khô. Không còn nhỏ giọt nữa.', cls: 'think' }]);
    G.ui.dialog([
      { text: 'Một cái giỏ tép cũ treo trên vách. Treo trong bếp mà [[ướt sũng]], nước nhỏ từ đáy giỏ xuống nền đất.', img: 'gio_tep' },
      { who: 'Đăng', text: soi ? '(Qua mắt âm dương, cái giỏ sáng lên như có ai vừa cầm.)' : '(Thầy dặn đừng mở mắt âm dương trong nhà này…)', cls: 'think', img: 'gio_tep', choices: [
        { text: 'Mở mắt âm dương nhìn cái giỏ', run: function () { G.addClue('V03', true); G.memory.enter(); } },
        { text: 'Thôi. Nghe lời thầy', run: function () {} }
      ] }
    ]);
  };
  P.afterMemory = async function () {
    var S = G.S;
    S.flags.ky1_done = true; S.beat = 'sau_ky';
    G.addClue('V03');
    W.refresh(); W.locked = true;
    await G.ui.say([
      { who: 'Đăng', text: '(Mình vừa… là cô ấy. Cái giỏ, con bống, cái vầng sáng…)', cls: 'think' },
      { who: 'Đăng', text: '(Và bàn tay đeo nhẫn bạc cầm rìu.)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  P.laiNoi = async function () {
    var S = G.S;
    W.locked = true;
    await G.ui.say([
      { who: 'Lài', text: 'Thầy… thầy chưa ngủ ạ? Em nghe tiếng động trong bếp.' },
      { who: 'Lài', text: 'Thầy cầm lấy cái này. Gạo với muối. Bà ngoại em bảo rắc ra thì ma không theo về.', run: function () { S.items.gao_muoi = true; } },
      { who: 'Đăng', text: 'Lài này. Hôm cô Tấm mất, em ở đâu?' },
      { who: 'Lài', text: 'Hôm giỗ cha cô Tấm… em cũng về đây. Em…', run: function () { G.addClue('L02'); } },
      { who: 'Dì ghẻ', text: '(từ trong nhà) **Lài!** Đêm hôm còn lang thang đâu đấy?' },
      { who: 'Lài', text: 'Thầy đừng hỏi nữa. Em xin thầy.' }
    ]);
    var lai = W.npcs.lai; if (lai) await W.walkEnt(lai, 560, 330, 160);
    S.flags.lai_noi = true; W.refresh();
    W.locked = false; G.ui.hud(); G.save();
  };

  // ---------- SÁNG NGÀY 3 ----------
  P.sang3 = async function () {
    var S = G.S;
    await G.ui.fade(function () {});
    S.day = 3; S.phase = 'sang'; S.beat = 'sang3';
    $('stage').classList.remove('soi');
    G.audio.sfx('ga_vo'); G.audio.sfx('rooster', 0.8); G.audio.sfx('ga_vo', 1.6);
    await G.ui.card('Ngày thứ ba', 'Gà kêu loạn từ lúc trời còn chưa sáng.');
    W.enter('nha_dighe', 754, 500);
    P.music();
    G.audio.sfx('hen'); G.audio.sfx('rooster', 0.4); G.audio.sfx('hen', 0.9);
    W.locked = true;
    await G.ui.say([
      { text: 'Gà trong chuồng đập cánh như điên. Ngoài **vườn cau** có tiếng người la.', cls: 'think', sfx: 'ga_vo' },
      { who: 'Đăng', text: '(Thầy ngồi canh ngoài vườn cả đêm…)', cls: 'think' }
    ]);
    W.locked = false; G.ui.hud(); G.save();
  };
  P.thayVuon = async function () {
    W.locked = true;
    G.audio.sfx('crow'); G.audio.sfx('crow', 0.8);
    await W.walkPlayer(420, 520, 160);
    await G.ui.say([{ who: 'Dân làng', text: 'Trời đất ơi… thầy cúng… ở trên ngọn cau…' }]);
    await G.cut.play([
      { ve: 'cauThayCa', chu: 'Đăng ngẩng lên.', dur: 2600, cam: [1.5, 0, 160, 1.15, 0, 60], sfx: ['crow', 'crow'], hieu: 'suong', nhac: 'ket_toi' },
      { ve: 'cauThayCa', chu: 'Trên ngọn cây cau non, có một người **vắt ngang như tấm áo phơi**.', dur: 3600, cam: [1.15, 0, 60, 1, 0, 0], sfx: 'stinger', hieu: 'suong' },
      { ve: 'cauThayCa', chu: 'Máu chảy dọc thân cau, đọng thành vũng dưới gốc.', dur: 3200, cam: [1.25, 0, -60, 1.7, 0, -280], sfx: ['drip', 'drip'] },
      { ve: 'matXac', chu: 'Đầu chúc ngược. Miệng [[nhồi đầy cau non]], ken đặc đến bật cả quai hàm.', dur: 4000, cam: [1.25, 0, 30, 1.05, 0, 0], sfx: ['stinger', 'crack'], chop: 'do', rung: true },
      { ve: 'cauThayCa', buoc: 2, chu: 'Một con quạ đậu trên vai xác, mổ nhẹ vào gáy.', dur: 3000, cam: [1.6, -80, 150, 1.8, -90, 190], sfx: 'crow' },
      { ve: 'cauThayCa', buoc: 2, noi: 'Đăng', mood: 'soc', chu: 'Thầy…', dur: 2600, cam: [1, 0, 0, 1.08, 0, 10] }
    ]);
    W.locked = false; G.ui.hud();
  };
  P.xemXac = async function () {
    var S = G.S, f = S.flags;
    if (f.xem_xac) return G.ui.dialog([{ text: 'Xác vẫn vắt trên ngọn cau non. Không ai dám trèo lên gỡ.', img: 'xac_cau' }]);
    W.locked = true; W.camFocus = { x: 505, y: 360 };
    await G.ui.say([
      { text: 'Trên ngọn cây cau non chỉ cao bằng hai người, có một người vắt ngang như tấm áo phơi.', img: 'xac_cau' },
      { text: 'Áo the đen. Đầu cạo. Miệng [[nhồi đầy cau non]], ken đặc đến bật cả quai hàm.', img: 'xac_cau' },
      { who: 'Đăng', text: 'Thầy…', img: 'xac_cau' },
      { who: 'Dân làng', text: 'Vong cô Tấm bắt thầy rồi. Trấn nó, nó bắt lại.', img: 'xac_cau', run: function () { G.addDeath('thay'); } },
      { who: 'Đăng', text: '(Cây non bé thế này… ai đưa được người lên tít trên ấy?)', cls: 'think', img: 'xac_cau' },
      { who: 'Đăng', text: '(Tai trái của thầy… nốt ruồi chờ lộc đâu rồi?)', cls: 'think', img: 'xac_cau', run: function () { G.addClue('V04'); } },
      { who: 'Đăng', text: '(…Chắc mình nhớ nhầm. Chắc thế.)', cls: 'think', img: null }
    ]);
    f.xem_xac = true; W.camFocus = null;
    await G.ui.say([{ who: 'Dì ghẻ', text: 'Cậu về sân đi. Có người **từ kinh thành** tới tìm thầy cậu.' }]);
    W.locked = false; G.ui.hud(); G.save();
  };

  P.suGiaDen = async function () {
    W.locked = true;
    await G.ui.say([{ text: 'Giữa sân là một người mặc áo quan, đội mũ cánh chuồn. Tay cầm một cuộn giấy có dấu son.', cls: 'think' }]);
    W.locked = false; G.ui.hud();
  };
  P.suGia = async function () {
    var S = G.S, f = S.flags;
    if (f.nhan_hop_dong) return G.ui.dialog([{ who: 'Sứ giả', text: 'Ba ngày nữa, cậu có mặt ở cổng thành. Đừng để hoàng hậu phải chờ.' }]);
    W.locked = true;
    await G.ui.say([
      { who: 'Sứ giả', text: 'Thầy Cả có nhận của cung hoàng hậu một việc. Đây là giấy giao ước, thầy đã điểm chỉ.', img: 'hop_dong' },
      { who: 'Sứ giả', text: 'Việc là: **trấn yểm vĩnh viễn con chim có hồn người** trong vườn ngự.', img: 'hop_dong' },
      { who: 'Đăng', text: 'Con chim… có hồn người?', img: 'hop_dong' },
      { who: 'Dì ghẻ', text: 'Thầy mất thì trò làm thay. Cậu theo thầy bao nhiêu năm, chẳng lẽ không làm nổi.', img: null },
      { who: 'Cám', text: '(nói rất khẽ) Đêm nào nó cũng hót. Bằng giọng chị ấy.' }
    ]);
    G.ui.dialog([{ who: 'Đăng', text: 'Nhận việc của thầy?', choices: [
      { text: '"Con nhận. Đó là việc thầy con còn dở."', run: done },
      { text: '(Im lặng. Nhìn chiếc nhẫn bạc trên tay dì ghẻ.)', run: function () { f.nhin_nhan = true; done(); } }
    ] }]);
    async function done() {
      await G.ui.say([{ who: 'Sứ giả', text: 'Vậy là xong. Ba ngày nữa, cổng thành.' },
        { who: 'Dì ghẻ', text: f.nhin_nhan ? '(rụt tay vào ống áo) Cậu nhìn gì?' : 'Tốt.' },
        { text: 'Tráp đồ nghề của thầy để trên **chõng tre**. Giờ nó là của Đăng.', cls: 'think' }]);
      f.nhan_hop_dong = true; W.refresh(); W.locked = false; G.ui.hud(); G.save();
    }
  };
  P.moTrap = async function () {
    var S = G.S;
    W.locked = true;
    await G.ui.say([
      { text: 'Tráp gỗ của thầy. Mùi trầm, mùi mực tàu.', img: 'trap', sfx: 'paper' },
      { text: 'Một cuộn **chỉ đỏ**. Một cái **chuông đồng**. Cuốn **sổ tay** của thầy, nhiều trang dán kín bằng hồ.', img: 'trap' },
      { text: 'Và một thứ Đăng chưa thấy bao giờ: [[một mảnh vảy rắn to bằng bàn tay]], cứng như sừng.', img: 'trap', sfx: 'stinger', run: function () { S.flags.vay_ran = true; } },
      { who: 'Đăng', text: '(Thầy chưa từng kể với mình về thứ này.)', cls: 'think', img: 'trap' },
      { who: 'Đăng', text: '(Con chim có hồn người. Cái gốc cau bị chặt. Chiếc nhẫn bạc. Và thầy…)', cls: 'think', img: null },
      { who: 'Đăng', text: '(Thầy ơi. Con sẽ tìm ra.)', cls: 'think' }
    ]);
    S.flags.mo_trap = true; S.flags.het_mo_dau = true;
    G.save();
    G.audio.music('title');
    await G.ui.card('Hết Mở đầu', 'Chương 1 · **Vàng anh** · đang viết.<br><br>Sổ Tử đã ghi: ' + Object.keys(S.clues).length + ' manh mối, ' +
      ['D01', 'D02', 'D03'].filter(function (d) { return S.deduce[d]; }).length + '/3 phép đối chiếu.', 'Sang Chương 1 ›');
    W.locked = false;
    G.ch1.begin();
  };

  P.music = function () {
    var S = G.S;
    if (S.loc === 'ky_ruong') return;
    if (S.phase === 'chieu') { G.audio.music(G.audio.ten('ngay')); G.audio.ambience('ngay'); }
    else if (S.phase === 'dem') { G.audio.music(G.audio.ten('dem')); G.audio.ambience('dem'); }
    else { G.audio.music(G.audio.ten('nguy')); G.audio.ambience('dem'); }
  };
})();

// ---------- bộ điều phối câu chuyện: ký ức hay hiện tại ----------
G.story = {
  cur: function (S) {
    if (S.loc === 'ky_ruong') return G.memory;
    if (S.loc === 'ky_gieng') return G.memory2;
    if (S.loc === 'ky_hoi') return G.memory3;
    if (S.loc === 'ky_cau') return G.memory4;
    return S.chapter === 'ch5' ? G.ch5 : S.chapter === 'ch4' ? G.ch4 : S.chapter === 'ch3' ? G.ch3 : S.chapter === 'ch2' ? G.ch2 : (S.chapter === 'ch1' ? G.ch1 : G.prologue);
  },
  playerLook: function (S) {
    if (S.loc === 'ky_ruong') return Object.assign({}, G.LOOKS.tam, { prop: (S.mem && S.mem.step === 'ket') ? null : 'basket' });
    if (S.loc === 'ky_gieng') return Object.assign({}, G.LOOKS.tam, { prop: 'bowl' });
    if (S.loc === 'ky_hoi') return Object.assign({}, G.LOOKS.tam, { prop: null });
    if (S.loc === 'ky_cau') return Object.assign({}, G.LOOKS.tam, { prop: null });
    return Object.assign({}, G.LOOKS.dang, S.phase === 'dem' || S.phase === 'toi' ? { prop: 'lantern' } : {});
  },
  npcs: function (S) { return G.story.cur(S).npcs(S); },
  things: function (S) { return G.story.cur(S).things(S); },
  act: function (id, t) { return G.story.cur(G.S).act(id, t); },
  objective: function (S) { return G.story.cur(S).objective(S); },
  canExit: function (dir, to) { var c = G.story.cur(G.S); return c.canExit ? c.canExit(dir, to) : false; },
  onEnter: function (loc) { var c = G.story.cur(G.S); if (c.onEnter) c.onEnter(loc); },
  tick: function (dt) { if (G.S.chapter === 'mo_dau') G.prologue.tick(dt); },
  lights: function (S) { return []; }
};
