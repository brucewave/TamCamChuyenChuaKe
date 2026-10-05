// Sprite diễn hoạt cho phim: dựng từ chính model nhân vật trong game (G.art.chibi), giữ các khớp tay chân
// (.ar1 .ar2 .lg1 .lg2 .bd) để css/sprite.css cho cử động: trèo, vung rìu, vùng vẫy, ngã lộn, thở yếu.
var G = window.G || (window.G = {});
G.sprite = {};

(function () {
  var SP = G.sprite, INK = G.INK;
  function f(n) { return (+n).toFixed(1); }

  // o: { view, tu (động tác), x, y (chân), k (tỉ lệ), lat (quay trái), riu (rìu trong tay phải), nhan (nhẫn bạc tay phải),
  //      bong (tô thành bóng tối màu này), dem (tối như dưới trăng), id (gắn id cho nhóm ngoài), them (thuộc tính model) }
  SP.ve = function (look, o) {
    o = o || {};
    var lk = Object.assign({}, look, { view: o.view || 'front', prop: null }, o.them || {});
    var s = G.art.chibi(lk).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
    // rìu buộc vào tay phải: cán nối dài từ bàn tay, lưỡi ở đầu cán (xoay theo tay)
    if (o.riu) s = s.replace('<g class="ar ar2">', '<g class="ar ar2"><g class="sp-cu"><path d="M108,146 L118,196" stroke="' + INK + '" stroke-width="7"/><path d="M108,146 L118,196" stroke="#6A4A2E" stroke-width="4"/>' +
      '<path d="M112,190 q20,-2 26,16 l-18,8 q-2,-12 -8,-24 z" fill="#A8AEB2" stroke-width="2.5"/><path d="M128,192 q8,6 8,14" stroke="#E8ECEE" stroke-width="1.6" fill="none"/></g>');
    if (o.nhan) s = s.replace('<g class="ar ar2">', '<g class="ar ar2"><circle class="sp-nhan" cx="111" cy="141" r="3.2" fill="none" stroke="#E8ECEE" stroke-width="2.2"/>');
    if (o.bong) s = s.replace(/fill="(#[0-9A-Fa-f]{3,6}|url\([^)]*\))"/g, 'fill="' + o.bong + '"').replace(/<[^>]+>/g, function (t) { // nét màu (dải buộc, sợi tóc, vệt sáng) cũng thành bóng; giữ nét mực và nhẫn bạc
      return t.indexOf('sp-nhan') >= 0 ? t : t.replace(/stroke="(#[0-9A-Fa-f]{3,6})"/g, function (m, c) { return c.toUpperCase() === INK.toUpperCase() ? m : 'stroke="' + o.bong + '"'; });
    }).replace(/class="sp-nhan"([^>]*)fill="[^"]*"/, 'class="sp-nhan"$1fill="none"');
    // trèo / bám nhìn từ sau lưng: tay ôm thân cây ở phía trước người nên khuất sau lưng, chỉ lộ hai bàn tay bám thân cây phía trên đầu
    if (lk.view === 'back' && /^(leo|bam)$/.test(o.tu || '')) {
      s = s.replace(/<g class="ar ar1"[\s\S]*?<\/g><g class="ar ar2"[\s\S]*?<\/g>/, '');
      var da = o.bong || lk.skin || G.SKIN;
      s = s.replace(/<\/g><\/g>$/, '<g class="tl1"><ellipse cx="70" cy="34" rx="7.5" ry="6" fill="' + da + '"/><path d="M65,30 h10" stroke-width="1.4" opacity=".6"/></g>' +
        '<g class="tl2"><ellipse cx="90" cy="24" rx="7.5" ry="6" fill="' + da + '"/><path d="M85,20 h10" stroke-width="1.4" opacity=".6"/></g></g></g>');
    }
    // động tác giơ tay qua đầu (nhìn trước / nghiêng): chuyển hai tay lên lớp trên cùng để đầu không che mất
    else if (/^(leo|bam|vung|keo)$/.test(o.tu || '')) {
      var m = s.match(/<g class="ar ar1"[\s\S]*?<\/g><g class="ar ar2"[\s\S]*?<\/g>(?=(<ellipse|<path|<g class="(?!ar)))/);
      if (m) { s = s.replace(m[0], ''); s = s.replace(/<\/g><\/g>$/, m[0] + '</g></g>'); }
    }
    var k = o.k || 1, x = o.x || 0, y = o.y || 0;
    var tf = o.lat ? 'translate(' + f(x + 80 * k) + ',' + f(y - 176 * k) + ') scale(' + (-k) + ',' + k + ')' : 'translate(' + f(x - 80 * k) + ',' + f(y - 176 * k) + ') scale(' + k + ')';
    return '<g' + (o.id ? ' id="' + o.id + '"' : '') + ' class="sp sp-' + (o.tu || 'dung') + (o.dem ? ' sp-dem' : '') + '" transform="' + tf + '"><g class="sp-goc">' + s + '</g></g>';
  };
  // chạy lại một động tác một lần (vd. mỗi nhát rìu)
  SP.lai = function (el, cls) {
    if (!el) return;
    el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls);
  };
})();
