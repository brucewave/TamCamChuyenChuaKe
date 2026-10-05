// Cảnh Chương 2: cây xoan đào trong vườn ngự (rào, hố đào sẵn, vết rìu chảy máu) và cảnh ký ức "Nhặt thóc".
var G = window.G || (window.G = {});

G.LOCATIONS.ky_hoi = { id: 'ky_hoi', name: 'Ký ức · Sân nhà ngày hội', width: 960, height: 720, exits: {} };

(function () {
  var K = G.sceneKit, ink = K.ink, rect = K.rect, INK = G.INK;

  // Vẽ cây xoan đào ở chỗ chôn lông (580, 600). Trả về true nếu đã vẽ.
  G.scenes.xoanHook = function (b, S) {
    if (S.chapter !== 'ch2' && !S.flags.c2_don_xong) return false;
    var f = S.flags, x = 580, y = 600;
    if (f.c2_don_xong) { // đã đốn: gốc cụt rỉ nhựa đỏ
      b.prop(x - 40, y - 30, 80, 40, '<ellipse cx="' + x + '" cy="' + (y - 6) + '" rx="30" ry="12" fill="#C8B090"/><ellipse cx="' + x + '" cy="' + (y - 10) + '" rx="26" ry="9" fill="#E0C8A8"/>' +
        '<path d="M' + (x - 10) + ',' + (y - 10) + ' q4,10 2,18M' + (x + 8) + ',' + (y - 8) + ' q-2,12 2,16" stroke="#8A1A12" stroke-width="4" fill="none"/>', y);
      b.solid(x - 28, y - 16, 56, 22);
      b.bg += ink('<ellipse cx="' + (x + 150) + '" cy="' + (y + 40) + '" rx="34" ry="14" fill="#3A2418"/><path d="M' + (x + 118) + ',' + (y + 34) + ' q32,-12 64,0" fill="none" stroke="#6A4A2E" stroke-width="5"/>' +
        (S.chapter === 'ch5' ? '<path d="M' + (x + 124) + ',' + (y + 32) + ' l10,8 l10,-6 l10,8" fill="none" stroke="#8A6A4A" stroke-width="4"/>' : ''), 2);
      b.solid(x + 118, y + 30, 64, 22);
      if (G.scenes.ch5Hook) G.scenes.ch5Hook(b, S);
      return true;
    }
    // cây xoan đào diễn hoạt (js/hoathan.js): cành đung đưa, hoa rơi, mặt người trong vỏ; prop không filter
    var s = G.hoathan.xoan({ x: x, y: y, chat: f.c2_chat, layVo: f.c2_lay_vo });
    // bóng người ngồi ru dưới gốc (chỉ thấy khi soi bát nước)
    s += '<g class="hid">' + G.art.vong(x + 50, y, 0.6, { mat: true }) + '</g>';
    b.prop(x - 170, y - 420, 340, 430, G.hoathan.ink(s), y, 'sway', true);
    b.solid(x - 26, y - 14, 52, 20);
    if (f.c2_rao) { // hàng rào tre quanh gốc ("ăn cây nào rào cây ấy")
      var rr = '';
      for (var k = -80; k <= 80; k += 12) rr += '<path d="M' + (x + k) + ',' + (y + 50) + ' v-24" stroke="#9A7A4A" stroke-width="5"/><path d="M' + (x + k) + ',' + (y + 50) + ' v-24" stroke-width="1.2"/>';
      rr += '<path d="M' + (x - 84) + ',' + (y + 34) + ' H' + (x + 84) + '" stroke-width="2"/>';
      b.prop(x - 90, y + 20, 180, 34, rr, y + 50);
      b.solid(x - 84, y + 40, 168, 10);
    }
    // hố đào sẵn sau rào, chưa ai giải thích
    b.bg += ink('<ellipse cx="' + (x + 150) + '" cy="' + (y + 40) + '" rx="34" ry="14" fill="#3A2418"/><path d="M' + (x + 118) + ',' + (y + 34) + ' q32,-12 64,0" fill="none" stroke="#6A4A2E" stroke-width="5"/>', 2);
    b.solid(x + 118, y + 30, 64, 22);
    return true;
  };

  // Ký ức 3: sân nhà ngày hội (dùng lại nhà dì ghẻ, ban ngày, có nong thóc gạo giữa sân)
  G.scenes.ky_hoi = function (S) {
    var out = G.scenes.nha_dighe(Object.assign({}, S, { phase: 'chieu', _kyGieng: true, flags: {} }));
    out.props.push({ x: 420, y: 520, w: 120, h: 60, z: 576, svg: '<svg class="prop" viewBox="420 520 120 60" width="120" height="60" overflow="visible">' +
      ink('<ellipse cx="480" cy="552" rx="56" ry="20" fill="#C79A5E"/><ellipse cx="480" cy="548" rx="46" ry="14" fill="#E9DDB0"/>' +
        '<g stroke="none"><circle cx="462" cy="546" r="2.5" fill="#C9A23A"/><circle cx="490" cy="550" r="2.5" fill="#C9A23A"/><circle cx="476" cy="544" r="2" fill="#FFF"/><circle cx="500" cy="545" r="2" fill="#FFF"/></g>') + '</svg>' });
    out.solids.push([424, 532, 112, 34]);
    return out;
  };
})();
