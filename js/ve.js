// Bộ vẽ chi tiết dùng chung cho các cảnh: tán lá nhiều lớp sáng tối, cau lá kép, tre, rào tre, đống rơm,
// lá súng, hoa súng, mái rạ có sợi. Ánh sáng quy ước chiếu từ trên trái. Trả về chuỗi SVG (chưa bọc nét mực).
var G = window.G || (window.G = {});
G.ve = {};

(function () {
  var V = G.ve, INK = '#2B1F1A';
  function f(n) { return (+n).toFixed(1); }
  V.rng = function (seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; };

  // bảng màu lá: [tối, vừa, sáng, rất sáng, hốc tối]
  V.LA = {
    xanh: ['#4E6A2E', '#6A8A3C', '#86A64C', '#AEC86C', '#2E3E1C'],
    dam: ['#3E5A2A', '#55763A', '#6E9248', '#94B464', '#24331A'],
    vang: ['#6A7A2E', '#8A9A3C', '#A8B650', '#CED676', '#3A4218'],
    tim: ['#4A5A3A', '#62764A', '#7C905A', '#A2B47A', '#2A3420']
  };

  // Tán cây: bóng viền gợn ở ngoài (có nét mực), lớp sáng dồn lên trên trái, chùm lá nhỏ, hốc tối phía dưới.
  V.tan = function (cx, cy, rx, ry, r, pal, o) {
    pal = pal || V.LA.xanh; o = o || {};
    var s = '', lumps = [], n = o.n || Math.max(10, Math.round((rx + ry) / 9)), i, a, R = (rx + ry) / 2;
    for (i = 0; i < n; i++) {
      a = i / n * Math.PI * 2 + r() * .3;
      lumps.push([cx + Math.cos(a) * rx * (.72 + r() * .12), cy + Math.sin(a) * ry * (.7 + r() * .12), R * (.3 + r() * .14)]);
    }
    // viền ngoài: vẽ có nét, rồi phủ lại không nét để giấu nét bên trong
    var outer = lumps.map(function (l) { return '<circle cx="' + f(l[0]) + '" cy="' + f(l[1]) + '" r="' + f(l[2]) + '"/>'; }).join('');
    s += '<g fill="' + pal[0] + '">' + outer + '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx * .8) + '" ry="' + f(ry * .78) + '"/></g>';
    s += '<g fill="' + pal[0] + '" stroke="none">' + outer + '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="' + f(rx * .84) + '" ry="' + f(ry * .82) + '"/></g>';
    // lớp vừa và lớp sáng dịch lên trên trái
    var g1 = '', g2 = '', g3 = '';
    for (i = 0; i < n; i++) {
      a = r() * Math.PI * 2; var d = r() * .62;
      g1 += '<circle cx="' + f(cx - rx * .1 + Math.cos(a) * rx * d) + '" cy="' + f(cy - ry * .14 + Math.sin(a) * ry * d) + '" r="' + f(R * (.24 + r() * .12)) + '"/>';
    }
    for (i = 0; i < Math.round(n * .7); i++) {
      a = Math.PI * (1.0 + r() * .75); var d2 = .2 + r() * .5;
      g2 += '<circle cx="' + f(cx - rx * .12 + Math.cos(a) * rx * d2) + '" cy="' + f(cy - ry * .16 + Math.sin(a) * ry * d2) + '" r="' + f(R * (.15 + r() * .1)) + '"/>';
    }
    for (i = 0; i < Math.round(n * .45); i++) {
      a = Math.PI * (1.1 + r() * .6); var d3 = .3 + r() * .45;
      g3 += '<circle cx="' + f(cx - rx * .14 + Math.cos(a) * rx * d3) + '" cy="' + f(cy - ry * .2 + Math.sin(a) * ry * d3) + '" r="' + f(R * (.07 + r() * .06)) + '"/>';
    }
    s += '<g stroke="none"><g fill="' + pal[1] + '">' + g1 + '</g><g fill="' + pal[2] + '">' + g2 + '</g><g fill="' + pal[3] + '" opacity=".85">' + g3 + '</g></g>';
    // hốc tối giữa các chùm lá
    var h = '';
    for (i = 0; i < Math.round(n * .5); i++) {
      a = Math.PI * (r() * 1.0) + .1; var d4 = .25 + r() * .45;
      h += '<ellipse cx="' + f(cx + Math.cos(a) * rx * d4) + '" cy="' + f(cy + Math.sin(a) * ry * d4) + '" rx="' + f(4 + r() * 7) + '" ry="' + f(2.5 + r() * 4) + '"/>';
    }
    s += '<g fill="' + pal[4] + '" opacity=".45" stroke="none">' + h + '</g>';
    // lá lẻ trên viền và mặt tán
    var la = ['', '', ''];
    for (i = 0; i < (o.la || Math.round(R * 1.1)); i++) {
      var la0 = lumps[Math.floor(r() * lumps.length)], aa = r() * Math.PI * 2, rr = la0[2] * (.6 + r() * .5);
      var lx = la0[0] + Math.cos(aa) * rr, ly = la0[1] + Math.sin(aa) * rr, k = ly < cy ? (r() < .6 ? 2 : 1) : (r() < .7 ? 0 : 1), sz = 3 + r() * 3;
      la[k] += '<ellipse cx="' + f(lx) + '" cy="' + f(ly) + '" rx="' + f(sz) + '" ry="' + f(sz * .45) + '" transform="rotate(' + Math.round(aa * 57 + 90) + ' ' + f(lx) + ' ' + f(ly) + ')"/>';
    }
    s += '<g stroke="none"><g fill="' + pal[0] + '">' + la[0] + '</g><g fill="' + pal[1] + '">' + la[1] + '</g><g fill="' + pal[3] + '">' + la[2] + '</g></g>';
    // vài nét mực gợi cụm lá
    var nt = '';
    for (i = 0; i < Math.round(n * .5); i++) {
      var px = cx - rx * .5 + r() * rx, py = cy - ry * .3 + r() * ry * .8;
      nt += 'M' + f(px) + ',' + f(py) + ' q' + f(5 + r() * 4) + ',' + f(-4 - r() * 3) + ' ' + f(11 + r() * 6) + ',0';
    }
    s += '<path d="' + nt + '" fill="none" stroke="' + pal[4] + '" stroke-width="1.4" opacity=".5"/>';
    return s;
  };

  // thân cây có vỏ sần, sáng bên trái, tối bên phải
  V.than = function (x, y, h, w0, w1, mau, r) {
    mau = mau || ['#7A5A3A', '#5A402A', '#9A7A54'];
    var s = '<path d="M' + f(x - w0) + ',' + f(y) + ' Q' + f(x - w1 * 1.2) + ',' + f(y - h * .5) + ' ' + f(x - w1) + ',' + f(y - h) + ' L' + f(x + w1) + ',' + f(y - h) + ' Q' + f(x + w1 * 1.2) + ',' + f(y - h * .5) + ' ' + f(x + w0) + ',' + f(y) + ' Z" fill="' + mau[0] + '"/>';
    s += '<path d="M' + f(x + w0 * .25) + ',' + f(y) + ' Q' + f(x + w1 * .6) + ',' + f(y - h * .5) + ' ' + f(x + w1 * .3) + ',' + f(y - h) + ' L' + f(x + w1) + ',' + f(y - h) + ' Q' + f(x + w1 * 1.2) + ',' + f(y - h * .5) + ' ' + f(x + w0) + ',' + f(y) + ' Z" fill="' + mau[1] + '" stroke="none" opacity=".75"/>';
    s += '<path d="M' + f(x - w0 * .7) + ',' + f(y - 4) + ' Q' + f(x - w1 * .9) + ',' + f(y - h * .5) + ' ' + f(x - w1 * .6) + ',' + f(y - h) + '" fill="none" stroke="' + mau[2] + '" stroke-width="2.5" opacity=".7"/>';
    var v = '';
    for (var i = 0; i < Math.round(h / 14); i++) { var py = y - 8 - r() * (h - 16), px = x - w1 * .6 + r() * w1 * 1.2; v += 'M' + f(px) + ',' + f(py) + ' q' + f(r() * 4 - 2) + ',-5 ' + f(r() * 2 - 1) + ',-' + f(8 + r() * 8); }
    s += '<path d="' + v + '" fill="none" stroke="' + INK + '" stroke-width="1.2" opacity=".45"/>';
    // rễ nổi ở gốc
    s += '<path d="M' + f(x - w0) + ',' + f(y) + ' q-8,2 -14,6 M' + f(x + w0) + ',' + f(y) + ' q8,2 14,5 M' + f(x - w0 * .2) + ',' + f(y + 1) + ' q-2,4 -6,7" fill="none" stroke="' + mau[0] + '" stroke-width="5"/>';
    return s;
  };

  // bóng đổ mềm của vật trên mặt đất (lệch về phải dưới, theo nắng chiều)
  V.bong = function (cx, cy, rx, ry, a) {
    return '<ellipse cx="' + f(cx + rx * .12) + '" cy="' + f(cy + ry * .15) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" fill="#1A0E08" opacity="' + (a || .22) + '" stroke="none"/>' +
      '<ellipse cx="' + f(cx + rx * .06) + '" cy="' + f(cy) + '" rx="' + f(rx * .6) + '" ry="' + f(ry * .55) + '" fill="#1A0E08" opacity="' + ((a || .22) * .8) + '" stroke="none"/>';
  };

  // cây cau: thân xám có đốt, bẹ xanh, tàu lá kép rủ xuống, buồng quả
  V.cau = function (x, y, h, r) {
    var s = V.bong(x, y, 26, 7, .25);
    s += '<path d="M' + (x - 5) + ',' + y + ' L' + (x - 3) + ',' + (y - h) + ' L' + (x + 3) + ',' + (y - h) + ' L' + (x + 5) + ',' + y + ' Z" fill="#A49A82"/>';
    s += '<path d="M' + (x + 1) + ',' + y + ' L' + (x + 1) + ',' + (y - h) + ' L' + (x + 3) + ',' + (y - h) + ' L' + (x + 5) + ',' + y + ' Z" fill="#6E6656" stroke="none" opacity=".6"/>';
    s += '<path d="M' + (x - 3.5) + ',' + y + ' L' + (x - 2) + ',' + (y - h) + '" stroke="#D4CCB4" stroke-width="1.6" opacity=".7"/>';
    var dot = '';
    for (var k = 12; k < h; k += 10 + (k % 3)) dot += 'M' + (x - 4.4) + ',' + (y - k) + ' q4.4,2 8.8,0';
    s += '<path d="' + dot + '" fill="none" stroke-width="1.2" opacity=".75"/>';
    s += '<path d="M' + (x - 4) + ',' + (y - 2) + ' L' + (x - 3) + ',' + (y - h * .3) + '" stroke="#6E7A4A" stroke-width="2.5" opacity=".45"/>';
    var ty = y - h;
    s += '<path d="M' + (x - 4) + ',' + (ty + 24) + ' q4,3 8,0 v-26 h-8 z" fill="#6E9A4A"/><path d="M' + (x + 1) + ',' + (ty + 24) + ' v-26" stroke="#9AC070" stroke-width="2" opacity=".7"/>';
    // tàu lá: cuống cong, lá chét rủ hai bên
    var fronds = [[-66, 16], [-54, -14], [-26, -34], [6, -40], [34, -30], [58, -10], [68, 18], [-38, 26], [40, 28]];
    fronds.forEach(function (p, i) {
      var ex = x + p[0], ey = ty + p[1], mx = x + p[0] * .45, my = ty + p[1] - 18;
      var sang = p[0] < 0 && p[1] < 10, col = sang ? '#7EA448' : (p[1] > 20 ? '#4A7030' : '#5E8A3A'), lc = '';
      for (var t = .14; t <= 1; t += .085) {
        var bx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * mx + t * t * ex, by = (1 - t) * (1 - t) * ty + 2 * (1 - t) * t * my + t * t * ey;
        var dx = 2 * (1 - t) * (mx - x) + 2 * t * (ex - mx), dy = 2 * (1 - t) * (my - ty) + 2 * t * (ey - my), dl = Math.hypot(dx, dy) || 1;
        var nx = -dy / dl, ny = dx / dl, L = 13 * Math.sin(Math.PI * Math.min(1, t * 1.1)) + 4;
        lc += 'M' + f(bx) + ',' + f(by) + ' q' + f(nx * L * .5) + ',' + f(ny * L * .5 + 3) + ' ' + f(nx * L + dx / dl * 3) + ',' + f(ny * L + 7);
        lc += 'M' + f(bx) + ',' + f(by) + ' q' + f(-nx * L * .5) + ',' + f(-ny * L * .5 + 3) + ' ' + f(-nx * L + dx / dl * 3) + ',' + f(-ny * L + 7);
      }
      s += '<path d="' + lc + '" fill="none" stroke="' + INK + '" stroke-width="3.6" opacity=".55"/>';
      s += '<path d="' + lc + '" fill="none" stroke="' + col + '" stroke-width="2.2"/>';
      s += '<path d="M' + x + ',' + ty + ' Q' + f(mx) + ',' + f(my) + ' ' + f(ex) + ',' + f(ey) + '" fill="none" stroke="#8A8A4A" stroke-width="1.6"/>';
    });
    // buồng cau
    [[-7, 15], [5, 17], [-2, 21], [8, 23], [-9, 23], [1, 27], [-5, 28], [6, 29]].forEach(function (q, i) {
      s += '<ellipse cx="' + (x + q[0]) + '" cy="' + (ty + q[1]) + '" rx="3.6" ry="4.4" fill="' + (i % 3 ? '#7EAA44' : '#D9A93A') + '" stroke-width="1.2"/>' +
        '<circle cx="' + (x + q[0] - 1.2) + '" cy="' + (ty + q[1] - 1.6) + '" r="1.1" fill="#F2F0C8" stroke="none" opacity=".7"/>';
    });
    return s;
  };

  // bụi tre: cây tre có đốt, nhiều tông xanh, lá thuôn mọc thành chùm, măng ở gốc
  V.tre = function (x, y, r) {
    var s = V.bong(x, y, 48, 11, .24), cay = '', la = ['', '', ''];
    for (var i = 0; i < 9; i++) {
      var bx = x - 36 + i * 9 + r() * 6, h = 150 + r() * 80, lean = (i - 4) * 7 + (r() - .5) * 6;
      var col = ['#5E7A3A', '#6E8A42', '#7E9A4A', '#4E6A30'][i % 4];
      var d = 'M' + f(bx) + ',' + y + ' Q' + f(bx + lean / 2) + ',' + f(y - h / 2) + ' ' + f(bx + lean) + ',' + f(y - h);
      cay += '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="8"/><path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="5"/>' +
        '<path d="' + d + '" fill="none" stroke="#B8CC80" stroke-width="1.2" opacity=".55" transform="translate(-1.4,0)"/>';
      var dot = '';
      for (var k = 1; k < 9; k++) { var t = k / 9, px = (1 - t) * (1 - t) * bx + 2 * (1 - t) * t * (bx + lean / 2) + t * t * (bx + lean), py = y - h * t; dot += 'M' + f(px - 3) + ',' + f(py) + ' h6'; }
      cay += '<path d="' + dot + '" stroke="' + INK + '" stroke-width="1.6"/>';
      for (var c = 0; c < 6; c++) {
        var tt = .4 + c * .11, lx = bx + lean * tt, ly = y - h * tt, dir = c % 2 ? 1 : -1;
        for (var q = 0; q < 4; q++) {
          var ang = (dir > 0 ? -20 : 200) + (q - 1.5) * 22 + (r() - .5) * 18, L = 18 + r() * 12, rad = ang * Math.PI / 180;
          var ex = lx + Math.cos(rad) * L, ey = ly + Math.sin(rad) * L + 6, k2 = ly < y - h * .7 ? 2 : (q % 2 ? 1 : 0);
          var nx = -Math.sin(rad) * 2.6, ny = Math.cos(rad) * 2.6;
          la[k2] += 'M' + f(lx) + ',' + f(ly) + ' Q' + f((lx + ex) / 2 + nx) + ',' + f((ly + ey) / 2 + ny) + ' ' + f(ex) + ',' + f(ey) + ' Q' + f((lx + ex) / 2 - nx) + ',' + f((ly + ey) / 2 - ny) + ' ' + f(lx) + ',' + f(ly) + 'Z';
        }
      }
    }
    s += cay;
    s += '<path d="' + la[0] + '" fill="#4E6E30" stroke-width="1.1"/><path d="' + la[1] + '" fill="#6E9040" stroke-width="1.1"/><path d="' + la[2] + '" fill="#92B256" stroke-width="1.1"/>';
    // măng và bẹ khô ở gốc
    s += '<path d="M' + (x - 22) + ',' + y + ' l4,-16 l4,16 z M' + (x + 16) + ',' + y + ' l3,-12 l3,12 z" fill="#B8A060" stroke-width="1.5"/>';
    s += '<path d="M' + (x - 40) + ',' + (y + 2) + ' q10,-6 20,-2 M' + (x + 26) + ',' + (y + 2) + ' q10,-5 18,0" fill="none" stroke="#B89A5A" stroke-width="3"/>';
    return s;
  };

  // hàng rào tre: cọc cao thấp có đốt, đầu vát, hai nẹp ngang buộc lạt
  V.rao = function (x0, x1, y, r) {
    var coc = '', sang = '', dot = '', h0 = 26;
    for (var x = x0; x < x1; x += 10) {
      var h = h0 + (r ? r() * 6 - 3 : 0), c = r && r() < .3 ? '#8A6A3A' : '#A4844E';
      coc += '<path d="M' + f(x - 2.5) + ',' + y + ' v' + f(-h) + ' l2.5,-3 l2.5,3 v' + f(h) + ' z" fill="' + c + '"/>';
      sang += 'M' + f(x - 1.3) + ',' + (y - 1) + ' v' + f(-h + 2);
      dot += 'M' + f(x - 2.5) + ',' + f(y - h * .5) + ' h5';
    }
    var s = '<path d="M' + x0 + ',' + (y + 2) + ' H' + x1 + '" stroke="#1A0E08" stroke-width="6" opacity=".18"/>';
    s += '<g stroke-width="1.4">' + coc + '</g><path d="' + sang + '" stroke="#D2B47A" stroke-width="1.2" opacity=".75"/><path d="' + dot + '" stroke="' + INK + '" stroke-width="1" opacity=".6"/>';
    [y - 19, y - 9].forEach(function (yy) {
      s += '<path d="M' + x0 + ',' + yy + ' H' + x1 + '" stroke="' + INK + '" stroke-width="5.5"/><path d="M' + x0 + ',' + yy + ' H' + x1 + '" stroke="#9A7A44" stroke-width="3.2"/><path d="M' + x0 + ',' + (yy - 1) + ' H' + x1 + '" stroke="#C8A86C" stroke-width="1" opacity=".8"/>';
      var lat = ''; for (var xx = x0 + 15; xx < x1; xx += 30) lat += 'M' + (xx - 2) + ',' + (yy - 3) + ' l4,6 M' + (xx + 2) + ',' + (yy - 3) + ' l-4,6';
      s += '<path d="' + lat + '" stroke="#5A3E20" stroke-width="1.3"/>';
    });
    return s;
  };

  // đống rơm quấn quanh cọc: lớp rơm xếp tầng, đỉnh sáng, chân tối, sợi rơm rủ
  V.rom = function (cx, by, rw, h, r) {
    var s = V.bong(cx, by, rw * 1.05, rw * .24, .26), top = by - h;
    var body = 'M' + f(cx - rw) + ',' + by + ' Q' + f(cx - rw * 1.04) + ',' + f(by - h * .6) + ' ' + f(cx - rw * .55) + ',' + f(top + h * .14) + ' Q' + f(cx) + ',' + f(top - h * .06) + ' ' + f(cx + rw * .55) + ',' + f(top + h * .14) + ' Q' + f(cx + rw * 1.04) + ',' + f(by - h * .6) + ' ' + f(cx + rw) + ',' + by + ' Q' + cx + ',' + f(by + rw * .16) + ' ' + f(cx - rw) + ',' + by + ' Z';
    s += '<path d="' + body + '" fill="#D2AE58"/>';
    s += '<path d="M' + f(cx + rw * .2) + ',' + f(top + 4) + ' Q' + f(cx + rw * 1.0) + ',' + f(by - h * .5) + ' ' + f(cx + rw) + ',' + by + ' Q' + cx + ',' + f(by + rw * .16) + ' ' + f(cx - rw * .2) + ',' + f(by + 2) + ' Q' + f(cx + rw * .5) + ',' + f(by - h * .5) + ' ' + f(cx + rw * .2) + ',' + f(top + 4) + 'Z" fill="#9A7A34" stroke="none" opacity=".55"/>';
    s += '<path d="M' + f(cx - rw * .5) + ',' + f(top + h * .2) + ' Q' + f(cx - rw * .1) + ',' + f(top + 2) + ' ' + f(cx + rw * .2) + ',' + f(top + h * .12) + ' Q' + f(cx - rw * .3) + ',' + f(top + h * .3) + ' ' + f(cx - rw * .7) + ',' + f(top + h * .5) + 'Z" fill="#F0D888" stroke="none" opacity=".7"/>';
    var tang = '', soi = ['', '', ''];
    for (var k = 1; k < 5; k++) { var yy = top + h * (.18 + k * .19), w = rw * (.62 + k * .1); tang += 'M' + f(cx - w) + ',' + f(yy) + ' Q' + cx + ',' + f(yy + 7) + ' ' + f(cx + w) + ',' + f(yy); }
    s += '<path d="' + tang + '" fill="none" stroke="#8E6E2E" stroke-width="1.6" opacity=".8"/>';
    for (var i = 0; i < 130; i++) {
      var tY = r(), w2 = rw * (.4 + tY * .62), px = cx - w2 + r() * w2 * 2, py = top + h * (.12 + tY * .86), L = 5 + r() * 7, a = (px - cx) / rw * .9 + (r() - .5) * .5;
      soi[px < cx - rw * .2 ? 0 : (px > cx + rw * .3 ? 2 : 1)] += 'M' + f(px) + ',' + f(py) + ' l' + f(Math.sin(a) * L) + ',' + f(Math.cos(a) * L);
    }
    s += '<path d="' + soi[0] + '" stroke="#FAE6A6" stroke-width="1.5"/><path d="' + soi[1] + '" stroke="#A8822E" stroke-width="1.4"/><path d="' + soi[2] + '" stroke="#7A5A22" stroke-width="1.4"/>';
    var chan = ''; for (var j = 0; j < 22; j++) { var qx = cx - rw + r() * rw * 2; chan += 'M' + f(qx) + ',' + f(by - 2) + ' l' + f(r() * 6 - 3) + ',' + f(5 + r() * 5); }
    s += '<path d="' + chan + '" stroke="#C8A452" stroke-width="1.2"/>';
    s += '<path d="M' + cx + ',' + f(top + 4) + ' v-18" stroke="' + INK + '" stroke-width="5"/><path d="M' + cx + ',' + f(top + 4) + ' v-18" stroke="#7A5A34" stroke-width="2.6"/>';
    s += '<path d="M' + f(cx - 9) + ',' + f(top + 2) + ' q9,-8 18,0" fill="#E2C474" stroke-width="1.6"/>';
    return s;
  };

  // lá súng: lá tròn có khía, gân toả, mép sẫm, bóng trên mặt nước
  V.laSung = function (cx, cy, rr, rot, r) {
    var a0 = (rot || 0) * Math.PI / 180, w = .36;
    var x1 = cx + Math.cos(a0 - w / 2) * rr, y1 = cy + Math.sin(a0 - w / 2) * rr * .6, x2 = cx + Math.cos(a0 + w / 2) * rr, y2 = cy + Math.sin(a0 + w / 2) * rr * .6;
    var d = 'M' + f(cx) + ',' + f(cy) + ' L' + f(x1) + ',' + f(y1) + ' A' + f(rr) + ',' + f(rr * .6) + ' 0 1,0 ' + f(x2) + ',' + f(y2) + ' Z';
    var s = '<ellipse cx="' + f(cx + 2) + '" cy="' + f(cy + 3) + '" rx="' + f(rr) + '" ry="' + f(rr * .6) + '" fill="#1E3A3A" opacity=".35" stroke="none"/>';
    s += '<path d="' + d + '" fill="#5E8E44" stroke-width="1.6"/>';
    s += '<path d="' + d + '" fill="#86B25A" stroke="none" transform="translate(' + f(-rr * .12) + ',' + f(-rr * .1) + ') scale(.82)" transform-origin="' + f(cx) + ' ' + f(cy) + '" opacity=".75"/>';
    var g = ''; for (var i = 0; i < 9; i++) { var a = a0 + w / 2 + .2 + i * ((Math.PI * 2 - w - .4) / 8); g += 'M' + f(cx) + ',' + f(cy) + ' L' + f(cx + Math.cos(a) * rr * .85) + ',' + f(cy + Math.sin(a) * rr * .85 * .6); }
    s += '<path d="' + g + '" stroke="#3E6A2E" stroke-width="1" opacity=".6"/>';
    s += '<path d="M' + f(cx - rr * .55) + ',' + f(cy - rr * .2) + ' q' + f(rr * .3) + ',' + f(-rr * .25) + ' ' + f(rr * .7) + ',' + f(-rr * .26) + '" fill="none" stroke="#D8EAA8" stroke-width="1.4" opacity=".7"/>';
    return s;
  };
  // hoa súng hồng: cánh nhọn xếp hai vòng, nhuỵ vàng
  V.hoaSung = function (cx, cy, s0) {
    var s = '<ellipse cx="' + f(cx + 1) + '" cy="' + f(cy + 3) + '" rx="' + f(s0 * 1.1) + '" ry="' + f(s0 * .45) + '" fill="#1E3A3A" opacity=".3" stroke="none"/>', ring = function (n, L, wd, col, off) {
      var p = ''; for (var i = 0; i < n; i++) { var a = (i / n) * Math.PI * 2 + off, ex = cx + Math.cos(a) * L, ey = cy + Math.sin(a) * L * .55 - L * .25, nx = -Math.sin(a) * wd, ny = Math.cos(a) * wd * .55;
        p += 'M' + f(cx) + ',' + f(cy) + ' Q' + f((cx + ex) / 2 + nx) + ',' + f((cy + ey) / 2 + ny) + ' ' + f(ex) + ',' + f(ey) + ' Q' + f((cx + ex) / 2 - nx) + ',' + f((cy + ey) / 2 - ny) + ' ' + f(cx) + ',' + f(cy) + 'Z'; }
      return '<path d="' + p + '" fill="' + col + '" stroke-width="1.1"/>';
    };
    s += ring(8, s0, s0 * .32, '#E89AA6', 0) + ring(6, s0 * .72, s0 * .26, '#F6C6CC', .4);
    s += '<circle cx="' + f(cx) + '" cy="' + f(cy - s0 * .2) + '" r="' + f(s0 * .22) + '" fill="#E8C040" stroke-width="1"/>';
    return s;
  };

  // mái rạ nhìn chéo: sợi rạ, nóc buộc lạt, mép mái tua rua, bóng dưới mái
  V.maiRa = function (x, y, w, h, r) {
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#ra)"/>';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + f(h * .45) + '" fill="#FFE8A8" opacity=".16" stroke="none"/>';
    s += '<rect x="' + x + '" y="' + f(y + h * .55) + '" width="' + w + '" height="' + f(h * .45) + '" fill="#3A2210" opacity=".16" stroke="none"/>';
    var soi = ''; for (var i = 0; i < w / 5; i++) { var px = x + r() * w, py = y + 4 + r() * (h - 10); soi += 'M' + f(px) + ',' + f(py) + ' l' + f(r() * 2 - 1) + ',' + f(5 + r() * 6); }
    s += '<path d="' + soi + '" stroke="#7E5E28" stroke-width="1" opacity=".55"/>';
    // nóc
    s += '<path d="M' + x + ',' + f(y + 3) + ' H' + (x + w) + '" stroke="' + INK + '" stroke-width="7"/><path d="M' + x + ',' + f(y + 3) + ' H' + (x + w) + '" stroke="#8A6A34" stroke-width="4"/>';
    var lat = ''; for (var xx = x + 12; xx < x + w; xx += 26) lat += 'M' + xx + ',' + (y - 1) + ' v8';
    s += '<path d="' + lat + '" stroke="#4A3018" stroke-width="2"/>';
    // mép tua rua
    var tua = 'M' + x + ',' + (y + h);
    for (var t = x; t < x + w; t += 6) tua += ' l3,' + f(3 + r() * 4) + ' l3,' + f(-(3 + r() * 4));
    s += '<path d="' + tua + '" fill="none" stroke="#B08A44" stroke-width="2.4"/>';
    s += '<path d="M' + x + ',' + (y + h) + ' H' + (x + w) + '" stroke-width="2.5"/>';
    return s;
  };

  // nét khắc chữ: chữ vàng có bóng lõm trên biển gỗ
  V.chuKhac = function (x, y, text, size, o) {
    o = o || {};
    var font = 'font-family="\'Playfair Display\', \'Noto Serif\', Georgia, serif" font-weight="900" font-size="' + size + '" text-anchor="middle" letter-spacing="' + (o.ls || 1.5) + '"';
    return '<text x="' + f(x + .8) + '" y="' + f(y + 1.2) + '" ' + font + ' fill="#1A0804" stroke="none" opacity=".7">' + text + '</text>' +
      '<text x="' + f(x) + '" y="' + f(y) + '" ' + font + ' fill="' + (o.mau || '#E8C05A') + '" stroke="none">' + text + '</text>' +
      '<text x="' + f(x - .5) + '" y="' + f(y - .6) + '" ' + font + ' fill="#FFF0B8" stroke="none" opacity=".35">' + text + '</text>';
  };
  // ---------- đồ đạc trong nhà ----------
  // bảng màu gỗ: [mặt trước, cạnh tối, mặt trên, vân]
  V.GO = {
    nau: ['#8A5A36', '#5E3A22', '#A8784C', '#6E4428'],
    sam: ['#6A4428', '#46281A', '#86583A', '#52321E'],
    son: ['#7A2418', '#4E120A', '#9A3424', '#5E1A10'],
    tre: ['#C9A35E', '#9A7A40', '#DDBC78', '#B08A48'],
    sang: ['#A07A4A', '#76562E', '#BC9462', '#86643A']
  };
  // Khối đồ gỗ nhìn chéo: (x, y) góc trái trên của mặt trên, d: bề sâu mặt trên, h: cao mặt trước.
  // o.chan: chiều cao chân; o.ngan: số ô / ngăn kéo mặt trước; o.vien: màu viền thếp; o.van: vẽ vân gỗ (mặc định có)
  V.khoi = function (x, y, w, d, h, mau, o) {
    mau = mau || V.GO.nau; o = o || {};
    var s = '', yf = y + d, yb = yf + h, ch = o.chan || 0;
    s += '<rect x="' + f(x + 3) + '" y="' + f(yb + ch - 5) + '" width="' + f(w + 4) + '" height="10" rx="5" fill="#1A0E08" opacity=".26" stroke="none"/>';
    if (ch) {
      var leg = '';
      [[x + 2, mau[1]], [x + w - 8, mau[1]]].forEach(function (p) { leg += '<rect x="' + f(p[0]) + '" y="' + f(yb - 2) + '" width="6" height="' + f(ch + 2) + '" fill="' + p[1] + '"/>'; });
      s += leg;
    }
    // mặt trước
    s += '<rect x="' + f(x) + '" y="' + f(yf) + '" width="' + f(w) + '" height="' + f(h) + '" fill="' + mau[0] + '"/>';
    s += '<rect x="' + f(x + w - Math.min(10, w * .12)) + '" y="' + f(yf) + '" width="' + f(Math.min(10, w * .12)) + '" height="' + f(h) + '" fill="' + mau[1] + '" opacity=".7" stroke="none"/>';
    s += '<rect x="' + f(x) + '" y="' + f(yf) + '" width="' + f(w) + '" height="4" fill="#1A0E08" opacity=".3" stroke="none"/>';
    if (o.van !== false && h > 10) {
      var v = ''; for (var i = 1; i < Math.min(5, h / 7); i++) { var vy = yf + 3 + i * (h - 4) / Math.min(5, h / 7); v += 'M' + f(x + 3) + ',' + f(vy) + ' q' + f(w * .25) + ',' + (i % 2 ? 1.5 : -1.5) + ' ' + f(w * .5) + ',0 t' + f(w * .5 - 6) + ',0'; }
      s += '<path d="' + v + '" fill="none" stroke="' + mau[3] + '" stroke-width="1" opacity=".55"/>';
    }
    if (o.ngan) {
      var pw = (w - 8) / o.ngan;
      for (var k = 0; k < o.ngan; k++) {
        var px = x + 4 + k * pw;
        s += '<rect x="' + f(px + 2) + '" y="' + f(yf + 5) + '" width="' + f(pw - 4) + '" height="' + f(h - 10) + '" fill="none" stroke="' + (o.vien || mau[1]) + '" stroke-width="1.4"/>';
        s += '<circle cx="' + f(px + pw / 2) + '" cy="' + f(yf + h / 2) + '" r="2" fill="' + (o.vien || '#C8963A') + '" stroke-width="1"/>';
      }
    }
    if (o.vien) s += '<path d="M' + f(x + 2) + ',' + f(yf + 2) + ' h' + f(w - 4) + ' M' + f(x + 2) + ',' + f(yb - 2) + ' h' + f(w - 4) + '" stroke="' + o.vien + '" stroke-width="1.6"/>';
    // mặt trên
    s += '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(d) + '" fill="' + mau[2] + '"/>';
    if (o.van !== false && d > 6) {
      var t = ''; for (var j = 1; j < Math.min(4, d / 5); j++) { var ty = y + j * d / Math.min(4, d / 5); t += 'M' + f(x + 4) + ',' + f(ty) + ' q' + f(w * .3) + ',' + (j % 2 ? -1.2 : 1.2) + ' ' + f(w * .6) + ',0'; }
      s += '<path d="' + t + '" fill="none" stroke="' + mau[3] + '" stroke-width=".9" opacity=".5"/>';
    }
    s += '<path d="M' + f(x + 2) + ',' + f(y + 1.8) + ' h' + f(w - 4) + '" stroke="#FFF2D0" stroke-width="1.3" opacity=".45"/>';
    if (o.vien) s += '<rect x="' + f(x + 3) + '" y="' + f(y + 3) + '" width="' + f(w - 6) + '" height="' + f(Math.max(2, d - 6)) + '" fill="none" stroke="' + o.vien + '" stroke-width="1.2" opacity=".8"/>';
    return s;
  };
  // chiếu cói hoa: viền đỏ, sọc đan, hoa văn quả trám
  V.chieu = function (x, y, w, h, o) {
    o = o || {};
    var s = '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="2" fill="' + (o.mau || '#D9C27A') + '" stroke-width="1.8"/>';
    var l = ''; for (var yy = y + 4; yy < y + h - 2; yy += 3.2) l += 'M' + f(x + 2) + ',' + f(yy) + ' h' + f(w - 4);
    s += '<path d="' + l + '" stroke="#B89A52" stroke-width=".8" opacity=".7"/>';
    s += '<rect x="' + f(x + 4) + '" y="' + f(y + 4) + '" width="' + f(w - 8) + '" height="' + f(h - 8) + '" fill="none" stroke="#A8352B" stroke-width="1.8"/>';
    if (w > 40 && h > 24) { var hv = ''; for (var px = x + 16; px < x + w - 12; px += 18) hv += 'M' + f(px) + ',' + f(y + h / 2 - 5) + ' l5,5 l-5,5 l-5,-5 z'; s += '<path d="' + hv + '" fill="none" stroke="#3A6A5A" stroke-width="1.3"/>'; }
    return s;
  };
  // gối mây / gối vải
  V.goi = function (x, y, w, h, mau) {
    return '<rect x="' + f(x) + '" y="' + f(y) + '" width="' + f(w) + '" height="' + f(h) + '" rx="' + f(h / 2.4) + '" fill="' + (mau || '#E9E2D0') + '" stroke-width="1.6"/>' +
      '<rect x="' + f(x + 3) + '" y="' + f(y + 2) + '" width="' + f(w - 10) + '" height="' + f(h * .35) + '" rx="' + f(h * .2) + '" fill="#FFFFFF" opacity=".35" stroke="none"/>' +
      '<path d="M' + f(x + 4) + ',' + f(y + h - 3) + ' h' + f(w - 8) + '" stroke="#1A0E08" stroke-width="1.5" opacity=".2"/>';
  };
  // bình / lọ sứ trắng hoa lam: thân bầu, cổ cao, vạch men lam, vệt bóng
  V.su = function (cx, by, h, o) {
    o = o || {};
    var r = h * .34, s = '<ellipse cx="' + f(cx + 3) + '" cy="' + f(by) + '" rx="' + f(r * 1.05) + '" ry="' + f(r * .28) + '" fill="#1A0E08" opacity=".25" stroke="none"/>';
    var nk = o.thap ? h * .1 : h * .28, nw = r * .3;
    var d = 'M' + f(cx - nw) + ',' + f(by - h) + ' L' + f(cx - nw) + ',' + f(by - h + nk) + ' C' + f(cx - r * 1.1) + ',' + f(by - h * .7) + ' ' + f(cx - r * 1.15) + ',' + f(by - h * .25) + ' ' + f(cx - r * .6) + ',' + f(by) +
      ' L' + f(cx + r * .6) + ',' + f(by) + ' C' + f(cx + r * 1.15) + ',' + f(by - h * .25) + ' ' + f(cx + r * 1.1) + ',' + f(by - h * .7) + ' ' + f(cx + nw) + ',' + f(by - h + nk) + ' L' + f(cx + nw) + ',' + f(by - h) + ' Z';
    s += '<path d="' + d + '" fill="' + (o.mau || '#ECEEF0') + '"/>';
    s += '<ellipse cx="' + f(cx + r * .55) + '" cy="' + f(by - h * .38) + '" rx="' + f(r * .4) + '" ry="' + f(h * .3) + '" fill="#6A7488" opacity=".22" stroke="none"/>';
    var lam = o.lam || '#2E4E8E';
    s += '<path d="M' + f(cx - r * .9) + ',' + f(by - h * .5) + ' q' + f(r * .9) + ',' + f(h * .07) + ' ' + f(r * 1.8) + ',0 M' + f(cx - r * .8) + ',' + f(by - h * .22) + ' q' + f(r * .8) + ',' + f(h * .06) + ' ' + f(r * 1.6) + ',0" fill="none" stroke="' + lam + '" stroke-width="2"/>';
    s += '<path d="M' + f(cx - r * .3) + ',' + f(by - h * .42) + ' q' + f(r * .2) + ',-' + f(h * .1) + ' ' + f(r * .5) + ',-' + f(h * .02) + ' q-' + f(r * .1) + ',' + f(h * .1) + ' -' + f(r * .5) + ',' + f(h * .02) + ' z M' + f(cx + r * .3) + ',' + f(by - h * .36) + ' q' + f(r * .15) + ',-' + f(h * .07) + ' ' + f(r * .4) + ',0" fill="' + lam + '" stroke="none"/>';
    s += '<path d="M' + f(cx - r * .62) + ',' + f(by - h * .6) + ' q-' + f(r * .15) + ',' + f(h * .25) + ' ' + f(r * .05) + ',' + f(h * .45) + '" fill="none" stroke="#FFFFFF" stroke-width="2.4" opacity=".8"/>';
    s += '<ellipse cx="' + f(cx) + '" cy="' + f(by - h) + '" rx="' + f(r * .32) + '" ry="' + f(r * .1) + '" fill="#C8CCD4" stroke-width="1.4"/>';
    return s;
  };
  // đèn dầu đĩa / đèn dầu ống có ngọn lửa và quầng sáng
  V.denDau = function (x, y, o) {
    o = o || {};
    var s = '<circle cx="' + f(x) + '" cy="' + f(y - 14) + '" r="' + (o.r || 18) + '" fill="url(#glowY)" stroke="none" opacity=".75" class="flick"/>';
    s += '<path d="M' + f(x - 7) + ',' + f(y) + ' h14 l-2,-4 h-10 z" fill="#8A6A3A" stroke-width="1.4"/>';
    s += '<path d="M' + f(x - 4) + ',' + f(y - 4) + ' q-2,-8 4,-10 q6,2 4,10 z" fill="#C8963A" stroke-width="1.4"/><path d="M' + f(x - 2) + ',' + f(y - 10) + ' q-1,3 0,5" stroke="#F2D080" stroke-width="1" fill="none" opacity=".8"/>';
    s += '<path d="M' + f(x) + ',' + f(y - 14) + ' q-3.4,-6 0,-11 q3.4,5 0,11" fill="#FFB040" class="flick" stroke-width=".9"/><path d="M' + f(x) + ',' + f(y - 15) + ' q-1.4,-3 0,-5 q1.4,2 0,5" fill="#FFF2B0" stroke="none" class="flick"/>';
    return s;
  };
  // đèn lồng đá: bệ hai tầng, thân tròn có ngấn, buồng đèn có cửa sổ sáng, mái cong, búp sen đỉnh, rêu
  V.denDa = function (x, y, r) {
    var DA = ['#B8B0A0', '#8A8478', '#D2CCBE'], s = V.bong(x, y, 22, 6, .28);
    s += '<path d="M' + f(x - 17) + ',' + f(y) + ' h34 v-7 h-34 z" fill="' + DA[1] + '"/><path d="M' + f(x - 17) + ',' + f(y - 7) + ' l3,-3 h28 l3,3 z" fill="' + DA[2] + '"/>';
    s += '<path d="M' + f(x - 11) + ',' + f(y - 10) + ' h22 v-6 h-22 z" fill="' + DA[0] + '"/><path d="M' + f(x - 11) + ',' + f(y - 16) + ' l2,-2 h18 l2,2 z" fill="' + DA[2] + '"/>';
    s += '<path d="M' + f(x - 5) + ',' + f(y - 18) + ' h10 v-32 h-10 z" fill="' + DA[0] + '"/><rect x="' + f(x + 1.5) + '" y="' + f(y - 50) + '" width="3.5" height="32" fill="' + DA[1] + '" stroke="none" opacity=".7"/><rect x="' + f(x - 4) + '" y="' + f(y - 50) + '" width="2" height="32" fill="#F0ECE0" stroke="none" opacity=".6"/>';
    s += '<path d="M' + f(x - 6) + ',' + f(y - 26) + ' h12M' + f(x - 6) + ',' + f(y - 42) + ' h12" stroke-width="1.4"/>';
    s += '<path d="M' + f(x - 15) + ',' + f(y - 50) + ' h30 l-3,-5 h-24 z" fill="' + DA[2] + '"/>';
    // buồng đèn
    s += '<circle cx="' + f(x) + '" cy="' + f(y - 64) + '" r="26" fill="url(#glowY)" stroke="none" opacity=".6" class="flick"/>';
    s += '<rect x="' + f(x - 12) + '" y="' + f(y - 76) + '" width="24" height="21" fill="' + DA[0] + '"/>';
    s += '<rect x="' + f(x - 7) + '" y="' + f(y - 72) + '" width="14" height="13" fill="#FFC860" class="flick"/><path d="M' + f(x) + ',' + f(y - 72) + ' v13M' + f(x - 7) + ',' + f(y - 65.5) + ' h14" stroke="' + DA[1] + '" stroke-width="2"/>';
    s += '<rect x="' + f(x + 7) + '" y="' + f(y - 76) + '" width="5" height="21" fill="' + DA[1] + '" stroke="none" opacity=".6"/>';
    // mái cong
    s += '<path d="M' + f(x - 22) + ',' + f(y - 76) + ' q2,-2 6,-2 q6,-6 16,-12 q10,6 16,12 q4,0 6,2 q-4,2 -8,1 h-28 q-4,1 -8,-1 z" fill="' + DA[1] + '"/>';
    s += '<path d="M' + f(x - 14) + ',' + f(y - 80) + ' q8,-6 14,-10 q6,4 12,8" fill="none" stroke="' + DA[2] + '" stroke-width="2" opacity=".8"/>';
    s += '<path d="M' + f(x - 4) + ',' + f(y - 89) + ' q4,-10 8,0 z" fill="' + DA[0] + '"/><circle cx="' + f(x) + '" cy="' + f(y - 95) + '" r="3" fill="' + DA[2] + '" stroke-width="1.4"/>';
    // rêu
    s += '<g fill="#6E8A4A" opacity=".65" stroke="none"><ellipse cx="' + f(x - 12) + '" cy="' + f(y - 2) + '" rx="6" ry="2.6"/><ellipse cx="' + f(x + 8) + '" cy="' + f(y - 13) + '" rx="4" ry="2"/><ellipse cx="' + f(x - 10) + '" cy="' + f(y - 79) + '" rx="5" ry="1.8"/></g>';
    return s;
  };
  // ---------- bàn tay nhìn mu (ngón chúc xuống) ----------
  // Đúng giải phẫu: tay áo → cổ tay thắt lại → mu bàn tay rộng dần có gân → hàng khớp đốt → bốn ngón có móng → ngón cái bên trái.
  // Gốc toạ độ: giữa hàng khớp đốt ở (0,-62); ngón chúc xuống phía y dương.
  // o.kieu: 'nam' (quặp quanh một cán nằm ngang ở y≈0), 'buong' (thả lỏng), 'an' (xoè ấn xuống mặt phẳng)
  // o.da, o.da2 (màu da sáng / tối), o.ao (màu tay áo, false = không có), o.nhan (nhẫn bạc ở ngón áp út), o.mau (vết máu)
  V.banTay = function (o) {
    o = o || {};
    var kieu = o.kieu || 'buong', DA = o.da || '#D8B496', DA2 = o.da2 || '#B88E70', SANG = o.sang || '#F4DCC4', s = '';
    if (o.ao !== false) s += '<path d="M-96,-430 L96,-430 L80,-252 Q0,-236 -80,-252 Z" fill="' + (o.ao || '#5A3048') + '"/><path d="M-80,-252 Q0,-236 80,-252" fill="none" stroke="' + (o.vienAo || '#7A4A66') + '" stroke-width="10"/><path d="M-30,-420 q10,90 -4,160" fill="none" stroke="#1A0A14" stroke-width="3" opacity=".45"/>';
    // cổ tay và mu bàn tay liền một khối
    s += '<path d="M-72,-258 Q0,-270 70,-258 L60,-184 C94,-162 106,-112 102,-62 L-102,-62 C-106,-112 -96,-162 -62,-184 Z" fill="' + DA + '"/>';
    s += '<path d="M60,-184 C94,-162 106,-112 102,-62 L70,-62 C76,-110 70,-150 52,-176 Z" fill="' + DA2 + '" stroke="none" opacity=".55"/>';
    s += '<path d="M-60,-188 Q0,-178 58,-188" fill="none" stroke="' + DA2 + '" stroke-width="2.4"/>'; // nếp cổ tay
    s += '<path d="M-32,-180 L-70,-72 M-10,-180 L-24,-70 M10,-180 L24,-70 M30,-180 L68,-72" fill="none" stroke="#9A7258" stroke-width="2.2" opacity=".45"/>'; // gân
    s += '<path d="M-60,-176 C-80,-140 -90,-100 -88,-70" fill="none" stroke="' + SANG + '" stroke-width="5" opacity=".7"/>'; // viền sáng
    var X = [-72, -24, 24, 72], W = [40, 42, 40, 34], ngon = '';
    X.forEach(function (x, i) {
      var w = W[i], d, tip;
      if (kieu === 'nam') { d = 'M' + x + ',-70 q' + (12 + i * 2) + ',52 4,' + (100 - i * 8); tip = [x + 4, 28 - i * 8]; }
      else if (kieu === 'an') { var dx = (i - 1.5) * 18; d = 'M' + x + ',-70 l' + dx + ',' + (96 - Math.abs(i - 1.5) * 10); tip = [x + dx, 24 - Math.abs(i - 1.5) * 10]; }
      else { var dx2 = (i - 1.5) * 8; d = 'M' + x + ',-70 q' + (dx2 * .4 + 6) + ',60 ' + dx2 + ',' + (124 - Math.abs(i - 1.5) * 14 - (i === 3 ? 16 : 0)); tip = [x + dx2, 54 - Math.abs(i - 1.5) * 14 - (i === 3 ? 16 : 0)]; }
      ngon += '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w + 7) + '"/><path d="' + d + '" fill="none" stroke="' + (i === 3 ? DA2 : DA) + '" stroke-width="' + w + '"/>';
      ngon += '<ellipse cx="' + x + '" cy="-64" rx="' + (w * .32) + '" ry="7" fill="' + SANG + '" stroke="none" opacity=".55"/>'; // khớp đốt
      var gy = (-70 + tip[1]) / 2;
      ngon += '<path d="M' + (x + (tip[0] - x) * .5 - w * .3) + ',' + gy + ' q' + (w * .3) + ',6 ' + (w * .6) + ',0" fill="none" stroke="#9A6E52" stroke-width="2.4"/>'; // nếp đốt giữa
      if (o.mongDai) ngon += '<path d="M' + (tip[0] - w * .26) + ',' + (tip[1] - 8) + ' Q' + tip[0] + ',' + (tip[1] + w * .9) + ' ' + (tip[0] + w * .3) + ',' + (tip[1] + w * 1.1) + ' Q' + (tip[0] + w * .2) + ',' + (tip[1] + w * .2) + ' ' + (tip[0] + w * .26) + ',' + (tip[1] - 8) + ' Z" fill="#1A1416" stroke-width="2"/>'; // móng dài đen
      else ngon += '<ellipse cx="' + tip[0] + '" cy="' + (tip[1] - 6) + '" rx="' + (w * .26) + '" ry="' + (w * .2) + '" fill="' + (o.mauMong || '#ECCCBC') + '" stroke-width="2"/>'; // móng
      if (o.rach) ngon += '<path d="M' + (tip[0] - w * .4) + ',' + (tip[1] - 2) + ' q' + (w * .4) + ',' + (w * .3) + ' ' + (w * .8) + ',0" fill="none" stroke="#8A0A06" stroke-width="' + (w * .32).toFixed(1) + '" stroke-linecap="round"/><circle cx="' + (tip[0] + 2) + '" cy="' + (tip[1] + 4) + '" r="' + (w * .14).toFixed(1) + '" fill="#A8120A" stroke="none"/>'; // đầu ngón rách, rướm máu
      ngon += '<path d="M' + (x - w * .34) + ',-58 q2,-8 10,-10" fill="none" stroke="' + SANG + '" stroke-width="4" opacity=".7"/>';
    });
    s += ngon;
    // ngón cái: ngắn hơn bốn ngón kia. Khi nắm cán, ngón cái vòng xuống DƯỚI cán: vẽ riêng bằng V.ngonCai() trước khi vẽ cán (o.caiRieng)
    if (kieu === 'nam') { if (!o.caiRieng) s = V.ngonCai(o) + s; }
    else s += '<path d="M-98,-156 C-140,-136 -156,-96 -152,-66 C-150,-54 -134,-54 -132,-66 C-128,-92 -112,-112 -90,-120 Z" fill="' + DA2 + '"/><ellipse cx="-144" cy="-62" rx="8" ry="6" fill="#ECCCBC" stroke-width="2"/>';
    // nhẫn bạc ở ngón áp út
    if (o.nhan) {
      var ny = kieu === 'nam' ? -34 : -28, nx = 26;
      s += '<path d="M' + (nx - 24) + ',' + (ny - 6) + ' Q' + nx + ',' + (ny + 12) + ' ' + (nx + 26) + ',' + (ny - 6) + ' L' + (nx + 24) + ',' + (ny + 10) + ' Q' + nx + ',' + (ny + 30) + ' ' + (nx - 24) + ',' + (ny + 10) + ' Z" fill="url(#cnBac)" stroke-width="2.6"/>';
      s += '<path d="M' + (nx - 18) + ',' + (ny + 1) + ' Q' + nx + ',' + (ny + 17) + ' ' + (nx + 20) + ',' + (ny - 1) + '" fill="none" stroke="#FFFFFF" stroke-width="2.6" opacity=".9"/>';
      for (var h = 0; h < 5; h++) { var t = -16 + h * 8; s += '<circle cx="' + (nx + t) + '" cy="' + f(ny + 12 + (1 - Math.pow(t / 22, 2)) * 7) + '" r="1.5" fill="#4A545C" stroke="none"/>'; }
      s += '<g class="nhanLoe" transform="translate(' + (nx + 12) + ',' + ny + ')"><circle r="22" fill="url(#cnLoe)" stroke="none"/><path d="M0,-24 L3,-3 L24,0 L3,3 L0,24 L-3,3 L-24,0 L-3,-3 Z" fill="#FFFFFF" stroke="none"/></g>';
    }
    if (o.mau) {
      var r = V.rng(77), m = '';
      for (var k = 0; k < 26; k++) m += '<ellipse cx="' + f(-90 + r() * 190) + '" cy="' + f(-190 + r() * 150) + '" rx="' + f(1.4 + r() * 4.6) + '" ry="' + f(1.2 + r() * 3.2) + '" fill="#6A0604" opacity="' + f(.6 + r() * .4) + '"/>';
      s += '<g stroke="none">' + m + '</g>';
    }
    return s;
  };
  // ngón cái khi nắm cán (kiểu 'nam'): gốc ở mép mu bàn tay, vòng xuống phía dưới cán, chỉ đầu ngón ló ra dưới mép cán
  V.ngonCai = function (o) {
    o = o || {};
    var DA2 = o.da2 || '#B88E70';
    return '<path d="M-100,-150 C-128,-100 -112,-10 -74,36 C-60,52 -38,56 -34,42 C-32,32 -44,26 -52,18 C-76,-20 -88,-88 -82,-134 Z" fill="' + DA2 + '"/>' +
      '<ellipse cx="-44" cy="42" rx="9" ry="6.5" fill="#ECCCBC" stroke-width="2" transform="rotate(30 -44 42)"/>';
  };
  // các định nghĩa màu bạc / ánh loé dùng cho nhẫn (đặt một lần trong <defs> của tranh có bàn tay đeo nhẫn)
  V.defsNhan = '<linearGradient id="cnBac" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".4" stop-color="#C8D0D6"/><stop offset="1" stop-color="#6A747C"/></linearGradient>' +
    '<radialGradient id="cnLoe"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".3" stop-color="#FFF4F0" stop-opacity=".8"/><stop offset="1" stop-color="#FFF4F0" stop-opacity="0"/></radialGradient>';
  V.cssNhan = '.nhanLoe{animation:nhanLoe 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%}@keyframes nhanLoe{0%,70%,100%{opacity:0;transform:scale(.3)}82%{opacity:1;transform:scale(1) rotate(20deg)}}';
  // ---------- lá bùa ----------
  // Giấy vàng, viền son kép, vầng mặt trời và quẻ bát quái trên đỉnh, chữ "敕令" bút lông, nét vòng cung dài ôm hàng chữ dọc,
  // hai cột ô vuông / chấm tròn hai bên. Khung 120 x 360 (gốc 0,0). o.chu: các chữ dọc giữa (mặc định 驱邪符),
  // o.giay / o.son: màu giấy, màu son; o.cu: giấy cũ ố mép; o.chay (0..1): phần đáy đã cháy thành tro.
  V.BUA = { tranVong: ['镇', '鬼', '符'], donTho: ['遁', '地', '符'], giaiHan: ['解', '厄', '符'], truTa: ['驱', '邪', '符'], anVi: ['安', '神', '符'] };
  V.bua = function (o) {
    o = o || {};
    var chu = o.chu || V.BUA.truTa, son = o.son || '#C42A18', id = 'bua' + (V._buaId = (V._buaId || 0) + 1);
    var FONT = 'font-family="\'Ma Shan Zheng\', \'STKaiti\', \'KaiTi\', \'Kaiti SC\', serif"';
    var s = '<defs><linearGradient id="' + id + 'G" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + (o.giay || '#F7D23A') + '"/><stop offset="1" stop-color="' + (o.giay2 || '#EDB61C') + '"/></linearGradient>' +
      '<radialGradient id="' + id + 'M" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#F08A1E" stop-opacity=".7"/><stop offset=".75" stop-color="#E8781A" stop-opacity=".45"/><stop offset="1" stop-color="#E8781A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + id + 'O" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#8A5A10" stop-opacity="0"/><stop offset="1" stop-color="#8A5A10" stop-opacity="' + (o.cu ? .55 : .22) + '"/></radialGradient></defs>';
    // giấy: thớ giấy, ố mép
    s += '<rect width="120" height="360" rx="1.5" fill="url(#' + id + 'G)" stroke="none"/>';
    var th = ''; for (var t = 0; t < 14; t++) { var ty = 10 + t * 25 + (t * 7) % 11; th += 'M' + (4 + (t * 13) % 30) + ',' + ty + ' q30,' + ((t % 3) - 1) * 2 + ' ' + (60 + (t * 17) % 40) + ',0'; }
    s += '<path d="' + th + '" fill="none" stroke="#FFF3B0" stroke-width=".8" opacity=".55"/><rect width="120" height="360" fill="url(#' + id + 'O)" stroke="none"/>';
    // viền son kép
    s += '<g fill="none" stroke="' + son + '"><rect x="4.5" y="4.5" width="111" height="351" stroke-width="3"/><rect x="9" y="9" width="102" height="342" stroke-width="1"/></g>';
    // vầng mặt trời + tám quẻ xếp vòng
    s += '<circle cx="60" cy="66" r="30" fill="url(#' + id + 'M)" stroke="none"/><circle cx="60" cy="66" r="21" fill="#E8901E" opacity=".45" stroke="none"/>';
    var que = [[1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]], q = '';
    que.forEach(function (v, i) {
      var a = -Math.PI / 2 + i * Math.PI / 4, cx = 60 + Math.cos(a) * 40, cy = 66 + Math.sin(a) * 40, deg = a * 180 / Math.PI + 90;
      if (cy > 100) return; // nửa dưới bị chữ che, không vẽ
      var g = '';
      v.forEach(function (lien, k) { var yy = -4 + k * 4; g += lien ? 'M-6,' + yy + ' h12' : 'M-6,' + yy + ' h4.6M1.4,' + yy + ' h4.6'; });
      q += '<path transform="translate(' + cx.toFixed(1) + ',' + cy.toFixed(1) + ') rotate(' + deg.toFixed(0) + ')" d="' + g + '"/>';
    });
    s += '<g fill="none" stroke="' + son + '" stroke-width="1.8" opacity=".8">' + q + '</g>';
    // 敕令: nét bút lông son, chữ lệnh to đè lên mặt trời
    s += '<g fill="' + son + '" stroke="none"><text x="60" y="78" text-anchor="middle" font-size="36" ' + FONT + '>敕</text><text x="60" y="104" text-anchor="middle" font-size="24" ' + FONT + '>令</text></g>';
    // nét mũ toả ra từ chữ lệnh, rồi hai nét vòng cung dài kéo xuống gần đáy ôm hàng chữ
    s += '<g fill="none" stroke="' + son + '" stroke-linecap="round">' +
      '<path d="M24,118 Q44,106 60,104 Q76,106 96,118" stroke-width="2.6"/>' +
      '<path d="M60,108 C44,118 36,140 38,190 C40,250 40,300 42,336" stroke-width="2.4"/><path d="M60,108 C76,118 84,140 82,190 C80,250 80,300 78,336" stroke-width="2.4"/>' +
      '<path d="M46,336 q14,6 28,0" stroke-width="2"/></g>';
    // hàng chữ dọc trong vòng cung
    s += '<g fill="' + son + '" stroke="none">' + chu.map(function (c, i) { return '<text x="60" y="' + (172 + i * 54) + '" text-anchor="middle" font-size="30" ' + FONT + '>' + c + '</text>'; }).join('') + '</g>';
    // hai cột ô vuông / chấm tròn
    var cot = '';
    [17, 103].forEach(function (x) {
      cot += '<path d="M' + x + ',132 V340" stroke="' + son + '" stroke-width="1.6"/>';
      for (var k = 0; k < 7; k++) { var y = 146 + k * 30; cot += k % 2 ? '<circle cx="' + x + '" cy="' + y + '" r="5.2" fill="' + son + '"/>' : '<rect x="' + (x - 5) + '" y="' + (y - 5) + '" width="10" height="10" fill="' + son + '"/>'; }
    });
    s += '<g stroke="none">' + cot + '</g>';
    // nét móc cuối nét ngang: chữ ký riêng của người vẽ (manh mối Thầy Cả)
    if (o.moc) s += '<path d="M30,128 H86 q12,3 7,15" fill="none" stroke="' + son + '" stroke-width="3.6" stroke-linecap="round"/><path d="M40,300 H80 q10,3 6,13" fill="none" stroke="' + son + '" stroke-width="3" stroke-linecap="round"/>';
    // dấu son nhỏ góc dưới
    s += '<rect x="50" y="340" width="20" height="10" fill="none" stroke="' + son + '" stroke-width="1.2" opacity=".7"/>';
    if (o.chay) { // đáy cháy thành tro, mép than đỏ
      var cy0 = 360 - o.chay * 360;
      s += '<path d="M0,' + cy0 + ' q15,-10 30,0 t30,0 t30,0 t30,0 V360 H0 Z" fill="#1A120C" stroke="none"/><path d="M0,' + cy0 + ' q15,-10 30,0 t30,0 t30,0 t30,0" fill="none" stroke="#FF7A1A" stroke-width="3"/>';
    }
    return '<g class="bua-giay">' + s + '</g>';
  };
  // lá bùa thành một thẻ <svg> riêng (dùng trong HTML: minigame, hiệu ứng)
  V.buaSvg = function (o, cls) { return '<svg class="' + (cls || 'bua-svg') + '" viewBox="0 0 120 360" aria-hidden="true">' + V.bua(o) + '</svg>'; };
})();
