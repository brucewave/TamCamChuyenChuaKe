// Biểu cảm theo lời thoại: chân dung người nói cạnh khung hội thoại, và đổi nét mặt nhân vật đang đứng trong cảnh.
var G = window.G || (window.G = {});
G.bieuCam = {};

(function () {
  var B = G.bieuCam, L = G.LOOKS;
  var KHONG_MAT = ['???', 'Hũ sành', 'Khung cửi', 'Vàng anh', 'Con quạ', 'Con gà', 'Cách chơi'];
  var KE_XAU = ['Dì ghẻ', 'Thầy Cả', 'Đội Ngạn', 'Người áo đen'];

  // tên người nói → ngoại hình
  B.lookOf = function (who) {
    if (!who || KHONG_MAT.indexOf(who) >= 0) return null;
    var S = G.S || {};
    if (who.indexOf('Hồn') === 0) return Object.assign({}, L.ongLao, { skin: '#C8D8D8', expr: 'trang' });
    var m = {
      'Đăng': L.dang, 'Thầy Cả': L.thay, 'Dì ghẻ': L.dighe, 'Cám': L.cam, 'Lài': L.lai, 'Nụ': L.nu,
      'Tấm': S.chapter === 'ch5' ? L.tamHau : L.tam, 'Bà cụ': L.baCu, 'Bà Sáu': L.baSau, 'Bà Tư': L.baTu, 'Chị Hến': L.hen,
      'Đội Ngạn': L.ngan, 'Nhà vua': L.vua, 'Lão Mộc': L.moc, 'Thợ phụ': L.tho, 'Sứ giả': L.suGia, 'Ông lão': L.ongLao,
      'Dân làng': L.danLang, 'Tiều phu': L.tieuPhu, 'Lái đò': L.danLang, 'Bà bán cá': L.danLang2, 'Người áo đen': L.aoDen,
      'Lính hầu': L.linhHau, 'Lính gác': L.linhTre, 'Lính': L.linhTre, 'Thằng cu': L.kid1, 'Con bé': L.kid2, 'Đám trẻ': L.kid1,
      'Lũ trẻ': L.kid1, 'Thằng bé': L.kid3, 'Bé Mít': L.mit && Object.assign({}, L.mit, { eyes: 'big' }), 'Thằng cháu': L.kid3
    };
    return m[who] || null;
  };

  // đoán biểu cảm từ câu thoại (dòng thoại có thể ghi đè bằng mood)
  B.doan = function (l) {
    if (l.mood) return l.mood;
    var who = l.who || '', t = String(l.text || ''), tl = t.toLowerCase();
    if (/\(khóc|khóc\)|nức nở|sụt sịt/.test(tl)) return 'khoc';
    if (/\(run|run rẩy|hớt hải|thất thanh/.test(tl)) return 'so';
    if (/\(cười|cười\)|\(cười khẩy/.test(tl)) return KE_XAU.indexOf(who) >= 0 ? 'khay' : 'vui';
    if (/\(thì thầm|\(nói rất khẽ|\(nói khẽ/.test(tl)) return 'so';
    if (l.cls === 'think') return /\?\)?$/.test(t) ? 'nghi' : (/…\)?$/.test(t) ? 'buon' : 'nghi');
    if (/!\s*$/.test(t) || /!\*\*\s*$/.test(t)) {
      if (/(chết|giết|đốt|đốn|ném|đổ đi|cút|về ngay|im|đi đi|dọn đi)/.test(tl)) return 'gian';
      return 'soc';
    }
    if (l.sfx === 'stinger' && who === 'Đăng') return 'soc';
    if (/\?\s*$/.test(t)) return 'nghi';
    if (/…\s*$/.test(t) || /^…/.test(t)) return 'buon';
    if (/(ngoan|khá lắm|tốt\.|cảm ơn|đa tạ|hay lắm)/.test(tl)) return KE_XAU.indexOf(who) >= 0 ? 'khay' : 'vui';
    if (who === 'Đội Ngạn' || who === 'Người áo đen') return 'khay';
    return null;
  };

  // chân dung: cắt phần đầu của chibi
  B.chanDung = function (who, mood) {
    var look = B.lookOf(who);
    if (!look) return '';
    var o = Object.assign({}, look, { view: 'front', prop: null, expr: mood || look.expr });
    return '<div class="por' + (mood ? ' m-' + mood : '') + '">' + G.art.chibi(o).replace('viewBox="0 0 160 190" width="160" height="190"', 'viewBox="24 22 112 112" width="112" height="112"') + '</div>';
  };

  // đổi nét mặt nhân vật trong cảnh; trả lại bình thường khi hội thoại đóng
  var doi = [];
  function ent(who) {
    var W = G.world;
    if (!W.ready || !G.S) return null;
    if (who === 'Đăng') return { e: W.player, look: G.story.playerLook(G.S) };
    for (var k in W.npcs) {
      var n = W.npcs[k], d = n.def;
      if (!d.look) continue;
      if ((d.label && d.label.indexOf(who) === 0) || (d.name === who)) return { e: n, look: d.look };
    }
    return null;
  }
  function ve(x, mood) {
    var h = '';
    ['front', 'side', 'back'].forEach(function (v) { h += G.art.chibi(Object.assign({}, x.look, { view: v, expr: mood })); });
    x.e.fl.innerHTML = h;
  }
  B.nhanVat = function (who, mood) {
    var x = ent(who); if (!x) return;
    if (x.e._mood === (mood || null)) return;
    x.e._mood = mood || null; ve(x, mood);
    if (doi.indexOf(x) < 0) doi.push(x);
  };
  B.traLai = function () {
    doi.forEach(function (x) { if (x.e._mood && x.e.el.isConnected) { x.e._mood = null; ve(x, null); } });
    doi = [];
  };
})();
