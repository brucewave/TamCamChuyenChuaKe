// Ký ức 2: Nuôi Bống. Người chơi nhập vai Tấm ở giếng sau nhà. Bình thường → Lệch → Vỡ.
var G = window.G || (window.G = {});
G.memory2 = {};

(function () {
  var K = G.memory2, $ = G.$, W = G.world, INK = G.INK;
  var VE = ['Bống bống bang bang,', 'lên ăn cơm vàng cơm bạc nhà ta,', 'chớ ăn cơm hẩm', 'cháo hoa nhà người.'];
  var SAI = ['lên ăn cơm nguội', 'Bống ơi bống hỡi,', 'cháo loãng nhà ta.', 'chớ về nhà người.'];
  var GA = '<svg width="60" height="56" viewBox="-30 -50 60 56" style="position:absolute;left:-30px;top:-50px;overflow:visible"><g stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round" filter="url(#w)">' +
    '<ellipse cx="0" cy="-18" rx="18" ry="14" fill="#E9E2D0"/><circle cx="14" cy="-32" r="9" fill="#E9E2D0"/><path d="M12,-42 q4,-8 8,0" fill="#B8241A"/><path d="M22,-32 l7,2 l-7,2" fill="#D9A93A"/>' +
    '<circle cx="16" cy="-33" r="3" fill="#F3EEDF" stroke-width="1.5"/><path d="M-16,-22 q-10,-12 -4,-20" fill="none"/><path d="M-4,-4 v8M6,-4 v8" stroke-width="2"/></g></svg>';
  var BONG_MO = '<div style="position:absolute;left:-40px;top:-90px;width:80px;height:90px;opacity:.55" class="ghostbody">' +
    '<svg viewBox="0 0 80 90" width="80" height="90"><path d="M20,90 Q18,40 40,30 Q62,40 60,90 Z" fill="#0A0810"/><circle cx="40" cy="22" r="14" fill="#0A0810"/><ellipse cx="66" cy="60" rx="10" ry="8" fill="#0A0810"/></svg></div>';

  K.enter = function () {
    var S = G.S;
    S.memReturn = { loc: S.loc, x: S.x, y: S.y, phase: S.phase };
    S.mem = { step: 'goi', bua: 0 };
    $('stage').classList.remove('soi');
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.add('memory'); $('stage').classList.remove('lech', 'vo');
      W.enter('ky_gieng', 110, 360);
      G.audio.music('memory'); G.audio.ambience('ngay');
    }, async function () {
      W.locked = true;
      await G.ui.card('Ký ức', 'Giếng sau nhà. Nhiều năm trước.');
      await G.ui.say([
        { who: 'Tấm', text: '(Bát cơm này mình nhịn để dành. Bống đang đợi.)', cls: 'think' },
        { text: 'Tấm cầm bát cơm ra **giếng sau nhà**.' }
      ]);
      W.locked = false; G.ui.hud();
    }, 1200);
  };

  K.npcs = function (S) {
    var m = S.mem || {}, L = G.LOOKS, list = [];
    if (m.step === 'dighe') list.push({ id: 'dighe', look: L.dighe2, x: 330, y: 470, view: 'side', flip: -1, label: 'Dì ghẻ' });
    if (m.step === 've') list.push({ id: 'dighe_xa', look: L.dighe2, x: 82, y: 344, view: 'back', ghost: true });
    if (m.step === 'ga' || m.step === 'rac') list.push({ id: 'ga', html: GA, x: m.gaX || 880, y: m.gaY || 520, label: m.step === 'ga' ? 'Con gà' : null, ghost: true });
    if (m.step === 'het') list.push({ id: 'bong', html: BONG_MO, x: 300, y: 330, ghost: true });
    return list;
  };
  K.things = function (S) {
    var m = S.mem || {}, list = [];
    if (m.step === 'goi' || m.step === 've') list.push({ id: 'gieng', x: 110, y: 340, hit: [26, 276, 90, 50], label: 'Gọi Bống', quest: true });
    if (m.step === 'rac') list.push({ id: 'rac', x: 780, y: 330, hit: [740, 290, 80, 50], label: 'Bới đống rác', quest: true });
    if (m.step === 'chon') list.push({ id: 'giuong', x: 258, y: 218, hit: [194, 104, 132, 86], label: 'Chôn xương dưới giường', quest: true });
    return list;
  };
  K.objective = function (S) {
    var m = S.mem || {};
    if (m.step === 'goi') return 'Ra **giếng** gọi Bống lên ăn (' + m.bua + '/3 bữa)';
    if (m.step === 'dighe') return 'Dì ghẻ gọi';
    if (m.step === 've') return 'Về tới nhà. Ra **giếng** gọi Bống';
    if (m.step === 'ga') return 'Con gà trong sân đang kêu';
    if (m.step === 'rac') return 'Theo con gà ra **đống rác**';
    if (m.step === 'chon') return 'Chôn xương Bống dưới **giường** trong buồng';
    return '';
  };

  K.act = async function (id) {
    var S = G.S, m = S.mem;
    if (id === 'gieng' && m.step === 'goi') {
      var loi = await G.mg.ve('Gọi Bống (bữa ' + (m.bua + 1) + ')', VE, SAI, 3.2);
      if (loi > 1) { await G.ui.say([{ text: 'Mặt giếng gợn lên rồi lặng. Bống không lên. (Đọc sai quá nhiều, thử lại.)' }]); return; }
      G.audio.sfx('splash');
      m.bua++;
      await G.ui.say([{ text: m.bua === 1 ? 'Một con cá bống nhỏ ngoi lên, đớp hạt cơm trên tay Tấm.' : (m.bua === 2 ? 'Bống lớn nhanh lắm. Nó dụi đầu vào ngón tay Tấm.' : 'Bống quẫy đuôi, té nước lên mặt Tấm. Tấm bật cười.') }]);
      if (m.bua < 3) { await G.ui.fade(function () {}); await G.ui.card('Hôm sau', ''); return; }
      m.step = 'dighe'; W.refresh(); W.locked = true;
      await G.ui.say([
        { who: 'Dì ghẻ', text: 'Con ơi. Làng đã cấm đồng rồi. Mai con đi chăn trâu,' },
        { who: 'Dì ghẻ', text: 'chăn đồng xa, chớ chăn đồng nhà, làng bắt mất trâu.', cls: 'verse' },
        { who: 'Tấm', text: 'Vâng ạ.' }
      ]);
      // đi chăn trâu ở đồng xa, ngoái lại
      $('stage').classList.add('lech'); G.audio.music('memory_lech');
      await G.ui.fade(function () { m.step = 've'; W.refresh(); });
      await G.ui.card('Đồng xa', 'Bóng nắng ngả dần.');
      W.camFocus = { x: 110, y: 380 };
      await G.wait(900);
      await G.ui.say([
        { who: 'Tấm', text: '(Tấm ngoái lại. Từ bờ ruộng xa nhìn về, thấy nhà mình nhỏ xíu.)', cls: 'think' },
        { text: 'Dì ghẻ đứng ở **miệng giếng**. Trên tay, chiếc **nhẫn bạc** loé lên một cái.', sfx: 'stinger' }
      ]);
      W.camFocus = null;
      await G.ui.fade(function () { m.dighe_di = true; S.x = 300; S.y = 470; W.refresh(); });
      W.locked = false; G.ui.hud();
      return;
    }
    if (id === 'gieng' && m.step === 've') {
      var l2 = await G.mg.ve('Gọi Bống', VE, SAI, 2.6);
      $('stage').classList.add('vo'); G.audio.music(G.audio.ten('dem'));
      if (l2 > 0) {
        await G.ui.say([{ text: 'Mặt nước sủi lên. Thứ ngoi lên [[không phải Bống]].', img: 'dau_ca', sfx: 'stinger' },
          { text: 'Một cái đầu cá to bằng đầu người. Mắt nó là mắt người. Nó nhìn Tấm rồi chìm xuống.', img: 'dau_ca' },
          { who: 'Tấm', text: '(Đọc lại. Đọc cho đúng.)', cls: 'think', img: null }]);
        return;
      }
      m.mau = true; W.refresh(); W.locked = true;
      await G.ui.say([{ text: 'Mặt giếng chỉ nổi lên [[một cục máu]].', img: 'mau_gieng', sfx: 'stinger' },
        { who: 'Tấm', text: 'Bống ơi…', img: 'mau_gieng' }]);
      m.step = 'ga'; m.gaX = 880; m.gaY = 520; W.refresh(); W.locked = false; G.ui.hud();
      G.audio.sfx('hen');
      var gaKeu = setInterval(function () { if (!G.S || !G.S.mem || G.S.mem.step !== 'ga') { clearInterval(gaKeu); return; } if (!G.ui.modal) G.audio.sfx('hen'); }, 2600);
      return;
    }
    if (id === 'ga') {
      await G.ui.say([{ who: 'Con gà', text: 'Cục ta cục tác, cho ta nắm thóc, ta bới xương cho.', cls: 'verse', sfx: 'hen' },
        { text: 'Con gà nghiêng đầu. Mắt nó [[trắng dã]].', cls: 'think' }]);
      G.audio.sfx('paper');
      m.step = 'rac'; W.refresh(); W.locked = true;
      var ga = W.npcs.ga; if (ga) await W.walkEnt(ga, 790, 360, 120);
      m.gaX = 790; m.gaY = 360; W.locked = false; G.ui.hud();
      return;
    }
    if (id === 'rac') {
      await G.ui.say([{ text: 'Dưới đống rác sau bếp: xương Bống, trắng và nhỏ, được gói vội trong lá chuối.' },
        { who: 'Tấm', text: '(Mình sẽ cho Bống một chỗ nằm. Không ai bới được.)', cls: 'think' }]);
      m.step = 'chon'; W.refresh(); G.ui.hud();
      return;
    }
    if (id === 'giuong') {
      await G.mg.chonLo();
      m.step = 'het'; W.refresh(); W.locked = true;
      for (var i = 0; i < 3; i++) { G.audio.sfx('mo'); await G.wait(500); }
      await G.ui.say([{ text: 'Lúc chôn lọ cuối cùng, ngoài cửa buồng có [[một bóng người đàn ông]] đứng nhìn. Tay gõ mõ.', sfx: 'stinger' },
        { who: 'Tấm', text: '(Ai đấy?)', cls: 'think' }]);
      K.ra();
    }
  };

  K.ra = async function () {
    var S = G.S;
    // ảnh chớp: chỉ có tiếng ba nhát rìu, không có hình
    $('stage').classList.add('vo');
    G.ui.fadeTo(function () {}, null, 200);
    for (var j = 0; j < 3; j++) { G.audio.sfx('chop'); await G.wait(700); }
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.remove('memory', 'lech', 'vo');
      var r = S.memReturn; S.phase = r.phase; S.mem = null;
      W.enter(r.loc, r.x, r.y);
    }, function () { W.locked = false; G.ch1.afterKy2(); }, 1400);
  };
})();
