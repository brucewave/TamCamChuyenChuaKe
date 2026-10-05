// Làm giàu cảnh: chi tiết mặt đất (cỏ, hoa dại, sỏi, lá, rêu, vũng nước), bóng chân tường, nắng qua cửa sổ,
// và hiệu ứng chuyển động nhẹ (hoa rơi, lá rơi, đom đóm, bụi trong nắng). Không đổi vùng va chạm.
var G = window.G || (window.G = {});
G.decor = {};

(function () {
  var D = G.decor, INK = G.INK;
  // loại nền của từng cảnh
  var KIEU = {
    lang_duong: 'co', vuon_cau: 'co', cung_vuon: 'co', bia_rung: 'co', cho_am: 'co', ky_ruong: 'co', ky_cau: 'co',
    nha_dighe: 'san', ky_gieng: 'san', ky_hoi: 'san', cung_san: 'da', cung_gieng: 'da', hang_nuoc: 'co',
    cung_bep: 'nha', cung_hau: 'nha', nha_det: 'nha', nha_bacu: 'nha'
  };
  var HOA = { lang_duong: '#C9473A', cung_vuon: '#E8A8B0', vuon_cau: null, bia_rung: null, ky_ruong: '#F3EEDF', hang_nuoc: '#C9473A' };

  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }
  function hash(s) { var h = 7; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000; return h; }
  function trong(x, y, solids) { // điểm có nằm trên vật cản không
    for (var i = 0; i < solids.length; i++) { var r = solids[i]; if (x > r[0] - 6 && x < r[0] + r[2] + 6 && y > r[1] - 6 && y < r[1] + r[3] + 6) return true; }
    return false;
  }

  // lớp chi tiết nền, vẽ đè lên nền cảnh, dưới nhân vật
  D.nen = function (loc, sc, S) {
    var L = G.LOCATIONS[loc], k = KIEU[loc], r = rng(hash(loc)), s = '', W = L.width, H = L.height, sol = sc.solids;
    if (!k) return '';
    if (k === 'co') {
      for (var i = 0; i < 90; i++) {
        var x = r() * W, y = 40 + r() * (H - 60);
        if (trong(x, y, sol)) continue;
        var t = r();
        if (t < .55) s += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' l-3,-9 M' + (x + 3).toFixed(0) + ',' + y.toFixed(0) + ' l1,-11 M' + (x + 6).toFixed(0) + ',' + y.toFixed(0) + ' l4,-8" stroke="#5E7040" stroke-width="2" fill="none" opacity=".75"/>';
        else if (t < .72) { var mau = ['#F3EEDF', '#E8C04A', '#C9A0D8', '#E89A8A'][Math.floor(r() * 4)]; s += '<g opacity=".9"><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="3" fill="' + mau + '" stroke="' + INK + '" stroke-width="1.2"/><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="1" fill="#E8B040"/></g>'; }
        else if (t < .86) s += '<ellipse cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" rx="' + (3 + r() * 4).toFixed(1) + '" ry="' + (2 + r() * 2).toFixed(1) + '" fill="#A8A08C" stroke="' + INK + '" stroke-width="1.2" opacity=".85"/>';
        else s += '<path d="M' + x.toFixed(0) + ',' + y.toFixed(0) + ' q5,-6 10,0 q-5,4 -10,0 z" fill="' + (r() < .5 ? '#9A8A4A' : '#B8742E') + '" stroke="' + INK + '" stroke-width="1" opacity=".8" transform="rotate(' + Math.floor(r() * 360) + ' ' + x.toFixed(0) + ' ' + y.toFixed(0) + ')"/>';
      }
      // khóm cỏ lau, bụi hoa dại, đá tảng nhỏ: thấp, đi xuyên qua được
      for (var c = 0; c < 16; c++) {
        var bx = 30 + r() * (W - 60), by = 60 + r() * (H - 90);
        if (trong(bx, by, sol) || trong(bx - 14, by, sol) || trong(bx + 14, by, sol)) continue;
        var kieu = r();
        if (kieu < .45) { var lau = ''; for (var l = 0; l < 7; l++) { var lx = bx - 12 + l * 4; lau += '<path d="M' + lx.toFixed(0) + ',' + by.toFixed(0) + ' q' + ((l - 3) * 2) + ',-14 ' + ((l - 3) * 5) + ',-' + (18 + (l % 3) * 5) + '" stroke="' + (l % 2 ? '#6E8044' : '#5E7040') + '" stroke-width="2.4" fill="none"/>'; } s += '<ellipse cx="' + bx.toFixed(0) + '" cy="' + (by + 1).toFixed(0) + '" rx="14" ry="3" fill="#000" opacity=".12"/>' + lau; }
        else if (kieu < .75) { var hoaMau = ['#F3EEDF', '#E8C04A', '#C9A0D8', '#E89A8A'][Math.floor(r() * 4)]; s += '<ellipse cx="' + bx.toFixed(0) + '" cy="' + by.toFixed(0) + '" rx="16" ry="7" fill="#6E8A40" stroke="' + INK + '" stroke-width="1.4"/>'; for (var h2 = 0; h2 < 5; h2++) s += '<circle cx="' + (bx - 10 + r() * 20).toFixed(0) + '" cy="' + (by - 4 + r() * 6).toFixed(0) + '" r="2.4" fill="' + hoaMau + '" stroke="' + INK + '" stroke-width="1"/>'; }
        else s += '<ellipse cx="' + bx.toFixed(0) + '" cy="' + (by + 3).toFixed(0) + '" rx="13" ry="4" fill="#000" opacity=".15"/><path d="M' + (bx - 12).toFixed(0) + ',' + (by + 2).toFixed(0) + ' q2,-12 12,-12 q12,0 12,12 z" fill="#A8A08C" stroke="' + INK + '" stroke-width="1.6"/><path d="M' + (bx - 4).toFixed(0) + ',' + (by - 6).toFixed(0) + ' q4,-2 8,0" stroke="#D8D2C2" stroke-width="2" fill="none"/>';
      }
    } else if (k === 'da' || k === 'san') {
      for (var j = 0; j < 60; j++) {
        var x2 = r() * W, y2 = 40 + r() * (H - 60);
        if (trong(x2, y2, sol)) continue;
        var t2 = r();
        if (t2 < .35) s += '<path d="M' + x2.toFixed(0) + ',' + y2.toFixed(0) + ' l8,3 l5,-4 l7,5" fill="none" stroke="' + INK + '" stroke-width="1.3" opacity=".35"/>'; // vết nứt
        else if (t2 < .6) s += '<path d="M' + x2.toFixed(0) + ',' + y2.toFixed(0) + ' l-2,-6 M' + (x2 + 3).toFixed(0) + ',' + y2.toFixed(0) + ' l1,-7" stroke="#6E8044" stroke-width="2" opacity=".7"/>'; // cỏ kẽ gạch
        else if (t2 < .75) s += '<ellipse cx="' + x2.toFixed(0) + '" cy="' + y2.toFixed(0) + '" rx="' + (10 + r() * 14).toFixed(0) + '" ry="' + (4 + r() * 4).toFixed(0) + '" fill="#6F8A88" opacity=".28"/>'; // vũng nước
        else if (t2 < .9) s += '<path d="M' + x2.toFixed(0) + ',' + y2.toFixed(0) + ' q5,-6 10,0 q-5,4 -10,0 z" fill="#B8742E" stroke="' + INK + '" stroke-width="1" opacity=".75"/>';
        else s += '<ellipse cx="' + x2.toFixed(0) + '" cy="' + y2.toFixed(0) + '" rx="8" ry="4" fill="#5E7A44" opacity=".35"/>'; // rêu
      }
    } else if (k === 'nha') {
      // bóng chân tường phía bắc và hai bên, sàn mòn ở lối đi, chiếu/thảm
      s += '<defs><linearGradient id="ao-n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="ao-w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="nang" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE6A8" stop-opacity=".42"/><stop offset="1" stop-color="#FFE6A8" stop-opacity="0"/></linearGradient></defs>';
      var top = { cung_bep: 126, cung_hau: 130, nha_det: 126, nha_bacu: 136 }[loc] || 126, left = { cung_bep: 74, cung_hau: 96, nha_det: 74, nha_bacu: 134 }[loc] || 74;
      s += '<rect x="' + left + '" y="' + top + '" width="' + (W - left * 2) + '" height="46" fill="url(#ao-n)"/>';
      s += '<rect x="' + left + '" y="' + top + '" width="30" height="' + (H - top - 80) + '" fill="url(#ao-w)"/>';
      s += '<rect x="' + (W - left - 30) + '" y="' + top + '" width="30" height="' + (H - top - 80) + '" fill="url(#ao-w)" transform="scale(-1,1) translate(' + (-W) + ',0)"/>';
      s += '<ellipse cx="' + (W / 2) + '" cy="' + (H - 120) + '" rx="120" ry="40" fill="#000" opacity=".06"/>';
      if (S.phase === 'sang' || S.phase === 'chieu') { // vệt nắng qua cửa sổ / cửa
        var nx = loc === 'cung_hau' ? 600 : W / 2 - 60;
        s += '<path d="M' + nx + ',' + top + ' h120 l70,240 h-120 z" fill="url(#nang)"/>';
      }
      // chiếu cói trải giữa phòng nếu chỗ đó trống
      var cw = 150, chh = 80, cx0 = W / 2 - cw / 2, cy0 = H - 210;
      if (loc !== 'nha_bacu' && !trong(cx0, cy0, sol) && !trong(cx0 + cw, cy0, sol) && !trong(cx0, cy0 + chh, sol) && !trong(cx0 + cw, cy0 + chh, sol) && !trong(W / 2, cy0 + chh / 2, sol)) {
        s += '<rect x="' + cx0 + '" y="' + cy0 + '" width="' + cw + '" height="' + chh + '" rx="4" fill="#D9C27A" opacity=".85" stroke="' + INK + '" stroke-width="2"/>';
        for (var cl = 1; cl < 8; cl++) s += '<path d="M' + (cx0 + 4) + ',' + (cy0 + cl * 10) + ' h' + (cw - 8) + '" stroke="#C2A85E" stroke-width="1.5"/>';
        s += '<rect x="' + (cx0 + 8) + '" y="' + (cy0 + 8) + '" width="' + (cw - 16) + '" height="' + (chh - 16) + '" fill="none" stroke="#A8352B" stroke-width="2"/>';
      }
      for (var q = 0; q < 14; q++) { var x3 = left + 40 + r() * (W - left * 2 - 80), y3 = top + 60 + r() * (H - top - 160); if (trong(x3, y3, sol)) continue; s += '<path d="M' + x3.toFixed(0) + ',' + y3.toFixed(0) + ' h' + (10 + r() * 30).toFixed(0) + '" stroke="' + INK + '" stroke-width="1.2" opacity=".18"/>'; }
    }
    return '<svg class="decor" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" style="position:absolute;left:0;top:0;pointer-events:none"><g filter="url(#w)">' + s + '</g></svg>';
  };

  // hiệu ứng chuyển động nhẹ, nằm trên cùng
  D.hieuUng = function (loc, S) {
    if (G.reduceMotion) return '';
    var L = G.LOCATIONS[loc], k = KIEU[loc], dem = S.phase === 'dem' || S.phase === 'toi', r = rng(hash(loc) + 3), h = '', W = L.width, H = L.height;
    var hoa = HOA[loc] || null;
    if (loc === 'cung_vuon' && S.chapter === 'ch2' && !S.flags.c2_don_xong) hoa = '#B49AD8'; // hoa xoan tím
    if (loc.indexOf('ky_') === 0) hoa = '#F6EED8';
    if (dem && (k === 'co' || loc === 'nha_dighe')) { // đom đóm
      for (var i = 0; i < 14; i++) h += '<i class="fx-dom" style="left:' + (r() * W).toFixed(0) + 'px;top:' + (80 + r() * (H - 140)).toFixed(0) + 'px;animation-delay:-' + (r() * 6).toFixed(1) + 's;animation-duration:' + (5 + r() * 5).toFixed(1) + 's"></i>';
    } else if (!dem && hoa) { // hoa rơi
      for (var j = 0; j < 12; j++) h += '<i class="fx-hoa" style="left:' + (r() * W).toFixed(0) + 'px;top:-20px;background:' + hoa + ';animation-delay:-' + (r() * 12).toFixed(1) + 's;animation-duration:' + (9 + r() * 6).toFixed(1) + 's"></i>';
    } else if (!dem && (loc === 'bia_rung' || loc === 'vuon_cau' || loc === 'cho_am')) { // lá rơi
      for (var m = 0; m < 9; m++) h += '<i class="fx-la" style="left:' + (r() * W).toFixed(0) + 'px;top:-20px;animation-delay:-' + (r() * 12).toFixed(1) + 's;animation-duration:' + (10 + r() * 6).toFixed(1) + 's"></i>';
    } else if (!dem && k === 'nha') { // bụi trong nắng
      for (var n = 0; n < 16; n++) h += '<i class="fx-bui" style="left:' + (W / 2 - 80 + r() * 260).toFixed(0) + 'px;top:' + (160 + r() * 260).toFixed(0) + 'px;animation-delay:-' + (r() * 8).toFixed(1) + 's"></i>';
    }
    return h ? '<div class="fx">' + h + '</div>' : '';
  };
})();
