// Sổ Tử: lời khai, vật chứng, đối chiếu, và trang của từng người chết.
var G = window.G || (window.G = {});
G.notebook = {};

(function () {
  var N = G.notebook, $ = G.$, tab = 'doi', selL = null, selV = null, lastResult = '', lastOk = false;

  G.addClue = function (id, quiet) {
    var S = G.S;
    if (S.clues[id]) return false;
    S.clues[id] = { isNew: true, day: S.day };
    var c = G.CLUES[id];
    G.audio.sfx('clue');
    if (!quiet) G.ui.toast((c.type === 'L' ? 'Ghi lời khai: ' : 'Ghi vật chứng: ') + '[[' + c.title + ']]  ·  Sổ Tử (J)', 3200);
    G.ui.hud();
    return true;
  };
  G.addDeath = function (id) {
    var S = G.S;
    if (S.deduce['death_' + id]) return;
    S.deduce['death_' + id] = { isNew: true };
    G.ui.toast('Sổ Tử mở trang mới: [[' + G.DEATHS[id].name + ']]', 3200);
    G.ui.hud();
  };
  N.newCount = function () {
    var S = G.S, n = 0;
    for (var k in S.clues) if (S.clues[k].isNew) n++;
    for (var d in S.deduce) if (S.deduce[d].isNew) n++;
    return n;
  };

  // dấu chìm "Sinh Tử Bộ": mỗi chương hiện rõ thêm một chút (sổ của Đăng là một trang rời của sổ Diêm Vương)
  var STB = { mo_dau: .03, ch1: .06, ch2: .1, ch3: .17, ch4: .27, ch5: .42 };
  var NHAN_RA = {
    ch3: '(Dưới chữ "Sổ Tử" hình như có một dấu son cũ in chìm. Trước giờ mình không để ý.)',
    ch4: '(Dấu chìm rõ hơn rồi: SINH TỬ BỘ. Sổ thầy truyền cho mình… sao lại mang dấu này?)',
    ch5: '(Sinh Tử Bộ. Sổ của Diêm Vương. Thì ra những tờ này chưa bao giờ là của mình.)'
  };
  N.open = function (startTab) {
    if (startTab) tab = startTab;
    selL = selV = null; lastResult = '';
    var S = G.S, ch = S.chapter, nb = $('notebook');
    nb.style.setProperty('--stb', STB[ch] !== undefined ? STB[ch] : .03);
    nb.classList.toggle('stb-ro', ch === 'ch4' || ch === 'ch5');
    nb.classList.toggle('stb-ro2', ch === 'ch5');
    G.ui.open('notebook');
    render();
    if (NHAN_RA[ch] && !S.flags['stb_' + ch]) { S.flags['stb_' + ch] = true; setTimeout(function () { G.ui.toast(NHAN_RA[ch], 5200); }, 700); }
  };

  // ---------- hình vẽ trong sổ ----------
  // ngoại hình người chết để vẽ chân dung thờ
  var MAT = { tam: 'tam', thay: 'thay', lai: 'lai', basau: 'baSau', moc: 'moc', mit: 'mit', nu: 'nu', ngan: 'ngan', chay: 'baTu' };
  function nguoi(id) {
    var k = MAT[id], o = Object.assign({}, (k && G.LOOKS[k]) || G.LOOKS.danLang2, { view: 'front', prop: null, expr: null, kid: false });
    if (o.eyes === 'closed' || o.eyes === 'blank') o.eyes = 'down';
    o.mouth = o.mouth === 'grin' ? null : o.mouth;
    return G.art.chibi(o).replace('<svg class="chibi v-front" viewBox="0 0 160 190" width="160" height="190" overflow="visible">', '').replace(/<\/svg>$/, '');
  }
  // chân dung thờ: khung gỗ chỉ vàng, ảnh ngả màu, dải băng tang đen góc trên, bát hương ba nén
  N.anhTho = function (id, daKet) {
    var s = '<svg class="anhtho" viewBox="0 0 150 190" aria-hidden="true"><defs>' +
      '<linearGradient id="atNen' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8DCC0"/><stop offset="1" stop-color="#B8A47C"/></linearGradient>' +
      '<radialGradient id="atToi' + id + '" cx=".5" cy=".45" r=".7"><stop offset=".55" stop-color="#2B1F1A" stop-opacity="0"/><stop offset="1" stop-color="#2B1F1A" stop-opacity=".55"/></radialGradient>' +
      '<clipPath id="atKhung' + id + '"><rect x="17" y="15" width="116" height="128" rx="4"/></clipPath></defs>';
    // khung gỗ
    s += '<rect x="5" y="3" width="140" height="152" rx="6" fill="#3A1E14" stroke="#1A0E08" stroke-width="2"/><rect x="9" y="7" width="132" height="144" rx="4" fill="none" stroke="#6A3A22" stroke-width="3"/>';
    s += '<rect x="14" y="12" width="122" height="134" rx="5" fill="none" stroke="#C8962E" stroke-width="2"/>';
    // ảnh
    s += '<g clip-path="url(#atKhung' + id + ')"><rect x="17" y="15" width="116" height="128" fill="url(#atNen' + id + ')"/>';
    s += '<g class="at-nguoi' + (daKet ? '' : ' mo') + '" transform="translate(11,12) scale(.8)">' + nguoi(id) + '</g>';
    s += '<rect x="17" y="15" width="116" height="128" fill="url(#atToi' + id + ')"/><rect x="17" y="15" width="116" height="128" fill="#8A6A3A" opacity=".12"/></g>';
    // băng tang đen chéo góc
    s += '<path d="M103,12 L136,12 L136,45 Z" fill="#141010"/><path d="M107,12 L136,41" stroke="#3A3434" stroke-width="2"/>';
    // bát hương và nhang
    s += '<path d="M54,170 h42 q-3,16 -21,16 q-18,0 -21,-16 z" fill="#B8862E" stroke="#5A3A12" stroke-width="1.6"/><ellipse cx="75" cy="170" rx="21" ry="4" fill="#6A4A1E" stroke="#5A3A12" stroke-width="1.2"/>';
    s += '<path d="M68,170 v-16M75,170 v-19M82,170 v-16" stroke="#8A2A1E" stroke-width="1.8"/><g fill="#FF8A3A" class="flick"><circle cx="68" cy="154" r="1.5"/><circle cx="75" cy="151" r="1.5"/><circle cx="82" cy="154" r="1.5"/></g>';
    s += '<path class="at-khoi" d="M75,150 q-6,-8 0,-14 q6,-6 0,-14" fill="none" stroke="#D8D0C0" stroke-width="1.4" opacity=".55"/>';
    return s + '</svg>';
  };
  // dấu son vuông
  function dau(chu, mau) {
    return '<span class="nb-dau" style="--m:' + (mau || '#B0241A') + '">' + chu.split(' ').map(function (c) { return '<i>' + c + '</i>'; }).join('') + '</span>';
  }

  function render() {
    var S = G.S;
    var h = '<div class="nb-bia"><span class="nb-chim" aria-hidden="true">SINH TỬ BỘ<small>Âm ty · Diêm La điện</small></span><h2>Sổ Tử</h2><small>sổ tay của Đăng</small>' + dau('SỔ TỬ') +
      '<i class="nb-dai hac" aria-hidden="true"></i><i class="nb-dai bach" aria-hidden="true"></i></div>';
    h += '<div class="tabs"><button data-t="doi" class="' + (tab === 'doi' ? 'on' : '') + '">Lời khai &amp; vật chứng</button>' +
      '<button data-t="so" class="' + (tab === 'so' ? 'on' : '') + '">Người chết</button></div>';
    if (tab === 'doi') {
      var L = [], V = [];
      Object.keys(S.clues).forEach(function (id) { (G.CLUES[id].type === 'L' ? L : V).push(id); });
      h += '<div class="cols"><div class="col"><h3><span class="nb-ico l"></span>Lời khai · ' + L.length + '</h3><div class="colbody">' + (L.length ? L.slice().reverse().map(card).join('') : '<p class="empty">Chưa ghi lời khai nào. Nói chuyện với mọi người.</p>') + '</div></div>' +
        '<div class="col"><h3><span class="nb-ico v"></span>Vật chứng · ' + V.length + '</h3><div class="colbody">' + (V.length ? V.slice().reverse().map(card).join('') : '<p class="empty">Chưa có vật chứng. Xem xét đồ vật, mở mắt âm dương.</p>') + '</div></div></div>';
      var ready = selL && selV;
      h += '<div class="bar"><div class="pick">' + (ready ? 'Đặt <b>' + G.CLUES[selL].title + '</b> cạnh <b>' + G.CLUES[selV].title + '</b>' :
        'Chọn <b>một lời khai</b> và <b>một vật chứng</b> rồi bấm Đối chiếu.') + '</div>' +
        '<button class="primary" data-a="doi"' + (ready ? '' : ' disabled') + '>Đối chiếu</button></div>';
      if (lastResult) h += '<div class="result' + (lastOk ? ' ok' : '') + '">' + (lastOk ? dau('ĐỐI CHIẾU') : '') + '<div>' + lastResult + '</div></div>';
      // đánh dấu đã xem
      Object.keys(S.clues).forEach(function (id) { S.clues[id].isNew = false; });
    } else {
      var co = Object.keys(G.DEATHS).some(function (id) { return S.deduce['death_' + id]; });
      h += '<div class="pages">' + (co ? '' : '<p class="empty">Chưa có trang nào.</p>');
      var to = 0;
      Object.keys(G.DEATHS).forEach(function (id) {
        if (!S.deduce['death_' + id]) return;
        var d = G.DEATHS[id], ket = (S.verdict || {})[id] !== undefined;
        to++;
        S.deduce['death_' + id].isNew = false;
        h += '<div class="page"><div class="nb-trai">' + N.anhTho(id, ket) + '<div class="por" title="Hiện trường">' + G.CLOSEUPS[d.img]() + '<span>Hiện trường</span></div></div><div class="nb-noi">' +
          '<div class="nb-so">Tờ ' + (to < 10 ? '0' : '') + to + '</div>' + (ket ? dau('ĐÃ KẾT') : dau('CHƯA RÕ', '#7A6A5A')) + '<h4>' + d.name + '</h4>' +
          '<div class="meta">' + G.ui.fmt(d.meta(S)) + '</div><div class="verdict">' + G.ui.fmt(d.verdict(S)) + '</div>' +
          (d.choices && d.ready && d.ready(S) && (S.verdict || {})[id] === undefined ? '<div class="pickv">' + d.choices.map(function (c, k) { return '<button data-v="' + id + ':' + k + '">' + c + '</button>'; }).join('') + '</div>' : '') +
          '</div></div>';
      });
      h += '</div>';
    }
    h += '<button class="close">Đóng sổ (J)</button>';
    $('notebook').innerHTML = h;
  }
  function card(id) {
    var c = G.CLUES[id], S = G.S;
    var used = G.DEDUCE.some(function (d) { return S.deduce[d.id] && (d.a === id || d.b === id); });
    return '<div class="card ' + (c.type === 'L' ? 'loi' : 'vat') + (selL === id || selV === id ? ' sel' : '') + (S.clues[id].isNew ? ' new' : '') + (used ? ' used' : '') + '" data-c="' + id + '">' +
      G.ui.fmt(c.title) + '<small>' + G.ui.fmt(c.text) + '</small></div>';
  }

  function deduce() {
    var S = G.S;
    var d = G.DEDUCE.filter(function (x) { return (x.a === selL && x.b === selV) || (x.a === selV && x.b === selL); })[0];
    if (!d) {
      G.audio.sfx('bad');
      lastResult = 'Hai thứ này chưa nói lên điều gì. Thử ghép thứ khác.'; lastOk = false;
      selL = selV = null; render(); return;
    }
    if (S.deduce[d.id]) { lastOk = false; lastResult = 'Đã đối chiếu rồi: <b>' + d.title + '</b>'; selL = selV = null; render(); return; }
    S.deduce[d.id] = { day: S.day };
    G.audio.sfx('ok');
    lastResult = '<b>' + d.title + '</b><br>' + G.ui.fmt(d.text); lastOk = true;
    selL = selV = null; render();
    if (d.after) { var f = d.after; setTimeout(function () { G.ui.close('notebook'); f(S); }, 1500); }
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('notebook').addEventListener('click', function (e) {
      var t = e.target.closest('[data-t]'); if (t) { tab = t.dataset.t; lastResult = ''; render(); return; }
      var c = e.target.closest('[data-c]');
      if (c) { var id = c.dataset.c; if (G.CLUES[id].type === 'L') selL = selL === id ? null : id; else selV = selV === id ? null : id; G.audio.sfx('paper'); render(); return; }
      if (e.target.closest('[data-a="doi"]')) { deduce(); return; }
      var v = e.target.closest('[data-v]');
      if (v) { var pr = v.dataset.v.split(':'); if (!v.classList.contains('chot')) { document.querySelectorAll('#notebook [data-v]').forEach(function (b) { b.classList.remove('chot'); b.textContent = G.DEATHS[pr[0]].choices[+b.dataset.v.split(':')[1]]; }); v.classList.add('chot'); v.textContent = 'Bấm lần nữa để chốt: ' + v.textContent; return; } G.ui.close('notebook'); (G[G.S.chapter] && G[G.S.chapter].onVerdict ? G[G.S.chapter] : G.ch1).onVerdict(pr[0], +pr[1]); return; }
      if (e.target.closest('.close')) { G.ui.close('notebook'); G.ui.hud(); }
    });
  });
})();
