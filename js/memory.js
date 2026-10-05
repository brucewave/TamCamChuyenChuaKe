// Ký ức 1: Bắt tép. Người chơi nhập vai Tấm. Ba nhịp: Bình thường → Lệch → Vỡ.
var G = window.G || (window.G = {});
G.memory = {};

(function () {
  var K = G.memory, $ = G.$, W = G.world;
  var ORB = '<svg width="120" height="120" viewBox="-60 -60 120 120" style="position:absolute;left:-60px;top:-110px;overflow:visible">' +
    '<circle r="56" fill="url(#glowY)" class="glowpulse"/><circle r="16" fill="#FFF4D0" opacity=".9"/></svg>';

  K.enter = function () {
    var S = G.S;
    S.memReturn = { loc: S.loc, x: S.x, y: S.y, phase: S.phase };
    S.mem = { step: 'dau' };
    $('stage').classList.remove('soi');
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.add('memory');
      $('stage').classList.remove('lech', 'vo');
      W.enter('ky_ruong', 200, 650);
      G.audio.music('memory'); G.audio.ambience('ngay');
    }, function () { K.intro(); }, 1200);
  };

  K.intro = async function () {
    W.locked = true;
    await G.ui.card('Ký ức', 'Một buổi chiều cuối hè, nhiều năm trước.');
    await G.ui.say([
      { who: 'Dì ghẻ', text: 'Hai đứa cầm giỏ ra đồng bắt tép cho mẹ. Đứa nào bắt được đầy giỏ, mẹ thưởng cho **cái yếm đỏ**.' },
      { who: 'Cám', text: 'Mẹ nói thật đấy nhé! Không được đổi ý đâu.', sfx: 'giggle' },
      { who: 'Dì ghẻ', text: 'Ừ. Đi đi, kẻo tắt nắng.' },
      { who: 'Tấm', text: '(Cái yếm đỏ… Từ ngày cha mất, chưa ai cho mình cái gì mới.)', cls: 'think' }
    ]);
    var dg = W.npcs.dighe; if (dg) await W.walkEnt(dg, -40, 650, 160);
    await G.ui.say([{ text: 'Cám xách giỏ chạy trước, vừa chạy vừa ngoái lại lè lưỡi. Ruộng chiều nước ấm, tép nhảy lách tách quanh gốc lúa.', cls: 'think' }]);
    S().mem.step = 'xuc';
    W.refresh(); W.locked = false; G.ui.hud();
  };
  function S() { return G.S; }

  K.npcs = function (S) {
    var m = S.mem || {}, list = [];
    if (m.step === 'dau') list.push({ id: 'dighe', look: G.LOOKS.dighe2, x: 300, y: 650, view: 'side', flip: -1 });
    if (m.step === 'dau') list.push({ id: 'cam', look: G.LOOKS.camNho, x: 360, y: 655, view: 'side', flip: -1 });
    if (m.step === 'xuc') list.push({ id: 'cam', look: G.LOOKS.camNho, x: 640, y: 470, view: 'front', bubble: 'Chị chậm thế!' });
    if (m.step === 'goi') list.push({ id: 'cam', look: G.LOOKS.camNho, x: 505, y: 232, view: 'front', label: 'Cám đang gọi' });
    if (m.step === 'ket' && m.orb) list.push({ id: 'orb', html: ORB, x: 560, y: 420, cls: 'orb', ghost: true });
    return list;
  };
  K.things = function (S) {
    var m = S.mem || {}, list = [];
    if (m.step === 'xuc') list.push({ id: 'cho_tep', x: 470, y: 430, hit: [400, 360, 140, 120], label: 'Xúc tép', quest: true });
    if (m.step === 'ket' && m.orb) list.push({ id: 'gio', x: S.x, y: S.y, label: 'Nhìn vào đáy giỏ', quest: true });
    return list;
  };
  K.objective = function (S) {
    var m = S.mem || {};
    if (m.step === 'xuc') return 'Lội xuống ruộng **xúc tép** cho đầy giỏ';
    if (m.step === 'goi') return 'Cám đứng trên bờ ruộng phía bắc, đang gọi';
    if (m.step === 'ket') return m.orb ? 'Nhìn vào **đáy giỏ**' : '…';
    return '';
  };

  K.act = async function (id) {
    var S = G.S, m = S.mem;
    if (id === 'cho_tep') {
      var ok = await G.mg.tep(15, 40);
      if (!ok) { G.ui.dialog([{ who: 'Tấm', text: '(Nắng tắt mất rồi… mình làm lại thôi.)', cls: 'think' }]); return; }
      await G.ui.say([{ text: 'Giỏ đầy ắp. Tép búng tanh tách trong lòng giỏ, nước rỉ xuống ướt cả vạt áo.', cls: 'think' },
        { who: 'Tấm', text: '(Lần này chắc mẹ sẽ khen mình.)', cls: 'think' }]);
      m.step = 'goi'; W.refresh(); G.ui.hud();
      await G.wait(900);
      G.ui.toast('Có tiếng Cám gọi từ bờ ruộng phía bắc.');
      return;
    }
    if (id === 'cam' && m.step === 'goi') {
      $('stage').classList.add('lech');
      G.audio.music('memory_lech');
      await G.ui.say([
        { text: 'Cám đứng trên bờ, giỏ của nó trống trơn. Nó cười rất tươi.', cls: 'think' },
        { who: 'Cám', text: 'Chị Tấm ơi chị Tấm,', cls: 'verse' },
        { who: 'Cám', text: 'Đầu chị lấm, chị hụp cho sâu, kẻo về mẹ mắng.', cls: 'verse' },
        { who: 'Tấm', text: '(Giọng Cám… sao nghe chậm thế. Như có ai đọc theo sau lưng nó.)', cls: 'think' }
      ]);
      G.ui.dialog([{ who: 'Tấm', text: 'Hụp xuống gội đầu, hay quay lên bờ?', choices: [
        { text: 'Hụp xuống cho sâu', run: function () { K.hup(); } },
        { text: 'Quay lên bờ', run: function () { K.quayLen(); } }
      ] }]);
      return;
    }
    if (id === 'gio') { K.ra(); }
  };

  K.hup = async function () {
    var S = G.S;
    W.locked = true;
    G.audio.sfx('splash');
    $('stage').classList.add('vo');
    await G.ui.say([{ text: 'Tấm tin lời em. Cô lội ra chỗ nước sâu, nín thở, hụp xuống.', cls: 'think' }]);
    await G.cut.play([
      { ve: 'hupBun', buoc: 1, chu: 'Nước đục ngầu. Tối đen. Lạnh hơn lúc nãy nhiều.', dur: 3200, sfx: ['splash', 'bubble'], cam: [1, 0, 0, 1.1, 0, 10], hieu: 'suong' },
      { ve: 'hupBun', buoc: 1, chu: 'Dưới lớp bùn, có gì đó [[cựa quậy]].', dur: 3000, sfx: 'bubble', cam: [1.1, 0, 10, 1.4, 0, -70] },
      { ve: 'hupBun', buoc: 2, chu: '[[Một bàn tay]] trồi lên từ bùn. Móng tay đen kịt, ngón dài bất thường.', dur: 4200, sfx: ['stinger', 'whisper'], cam: [1.25, 0, -50, 1.5, 0, -100] },
      { ve: 'hupBun', buoc: 3, chu: 'Nó chộp lấy cổ tay Tấm. [[Kéo xuống.]]', dur: 3200, sfx: ['thud', 'scream'], chop: 'do', rung: true, cam: [1.35, 40, 70, 1.1, 0, 0] }
    ]);
    await G.mg.hold('Ngoi lên!', 3);
    G.audio.sfx('splash');
    S.flags.ky1_hup = true;
    await G.ui.say([{ who: 'Tấm', text: '(Bờ ruộng vắng tanh. Cám đi đâu rồi?)', cls: 'think' }]);
    K.ket();
  };
  K.quayLen = async function () {
    var S = G.S;
    W.locked = true;
    var cam = W.npcs.cam;
    cam.el.classList.add('noshadow');
    $('stage').classList.add('vo');
    G.audio.sfx('stinger');
    await G.ui.say([
      { who: 'Tấm', text: '(Giỏ của mình… Cám đang cầm giỏ của mình.)', cls: 'think' },
      { text: 'Cám đứng trên bờ, cười. Nắng chiếu thẳng xuống mà dưới chân nó [[không có bóng]].' }
    ]);
    G.audio.sfx('giggle');
    await G.wait(800);
    await W.walkEnt(cam, 980, 232, 260);
    S.flags.ky1_quay = true;
    K.ket();
  };

  K.ket = async function () {
    var S = G.S;
    S.mem.step = 'ket';
    W.refresh(); W.locked = true;
    G.audio.music(null);
    await G.ui.say([
      { text: 'Giỏ trống trơn. Đến một con tép cũng không còn.', cls: 'think' },
      { who: 'Tấm', text: 'Về nhà… mẹ lại đánh…' },
      { text: 'Tấm ngồi bệt xuống bờ ruộng, ôm cái giỏ không mà khóc.' }
    ]);
    await G.wait(1400);
    G.audio.ambience('none');
    await G.ui.say([
      { text: 'Tiếng ếch nhái quanh ruộng [[im bặt]].', cls: 'think' },
      { text: 'Gió cũng ngừng. Ngọn lúa đứng yên như vẽ. Mặt nước phẳng lì.', cls: 'think' }
    ]);
    await G.wait(1000);
    S.mem.orb = true; W.refresh(); W.locked = true;
    G.audio.sfx('bell'); G.audio.sfx('bell', 1.4);
    await G.wait(1800);
    await G.ui.say([
      { text: 'Giữa ruộng, một vầng sáng nhạt nổi lên khỏi mặt nước. Không có mặt. Không có bóng.' },
      { who: 'Giọng nói', text: 'Làm sao con khóc?' },
      { text: 'Giọng nói ấy không vọng tới từ đâu cả. Nó vang lên ngay trong đầu Tấm, trầm và chậm như tiếng chuông chùa.', cls: 'think' },
      { who: 'Tấm', text: 'Con… con bắt được đầy giỏ tép. Em con bảo con hụp xuống gội đầu, rồi… rồi trút hết sang giỏ nó.' },
      { who: 'Giọng nói', text: 'Con hãy nhìn vào giỏ xem còn gì không.' },
      { text: 'Rồi vầng sáng lặng im, không nói thêm một câu nào nữa.', cls: 'think' }
    ]);
    G.audio.ambience('ngay');
    W.locked = false; G.ui.hud();
  };

  K.ra = async function () {
    var S = G.S;
    W.locked = true;
    await G.ui.say([
      { text: 'Dưới đáy giỏ còn sót đúng một con [[cá bống]], mắt nó nhìn lên.', img: 'gio_tep' }
    ]);
    await G.wait(600);
    // ký ức chen vào: gốc cau, bàn tay đeo nhẫn bạc cầm rìu
    await G.cut.play([
      { ve: 'riuNhan', buoc: 1, chu: 'Mắt con cá bống. Rồi bỗng là một đêm khác. Dưới gốc cau.', dur: 3200, sfx: 'whoosh', cam: [1.15, 0, 0, 1, 0, 0] },
      { ve: 'riuNhan', buoc: 2, chu: 'Nhát rìu thứ nhất.', dur: 2000, sfx: ['chop', 'crack'], chop: 'do', rung: true },
      { ve: 'riuNhan', buoc: 2, chu: 'Nhát thứ hai.', dur: 1800, sfx: 'chop', chop: true, rung: true },
      { ve: 'riuNhan', buoc: 2, chu: 'Nhát thứ ba.', dur: 1800, sfx: ['chop', 'fall'], chop: 'do', rung: true },
      { ve: 'riuNhan', buoc: 3, chu: 'Trên bàn tay cầm rìu: [[một chiếc nhẫn bạc]]. Máu nhỏ từng giọt.', dur: 4200, sfx: ['stinger', 'drip'], cam: [1.1, 0, 0, 1.3, 0, 10] }
    ]);
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.remove('memory', 'lech', 'vo', 'shake');
      var r = S.memReturn; S.phase = r.phase; S.mem = null;
      W.enter(r.loc, r.x, r.y);
      G.audio.music(G.audio.ten('dem')); G.audio.ambience('dem');
    }, function () { W.locked = false; G.prologue.afterMemory(); }, 1400);
  };
})();
