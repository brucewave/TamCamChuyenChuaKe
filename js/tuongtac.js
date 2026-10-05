// Tương tác: dấu ? (có thể nói chuyện / xem) và ! (việc cần làm) trên đầu người và vật, bấm thẳng vào người hay vật,
// menu hỏi chuyện thường ngày hoặc chuyện đang điều tra, mũi tên sang cảnh, và mắt âm dương có thời gian hồi.
var G = window.G || (window.G = {});
G.tt = {};

(function () {
  var T = G.tt, $ = G.$, W = G.world;
  var marks = {}, nearKey = null, objSig = null;

  // ---------- chuyện thường ngày ----------
  // mỗi người: chao (câu mở lời khi bấm vào), noi: danh sách lượt chuyện (xoay vòng). Có thể ghi đè theo chương: ch1: {...}
  var TG = {
    thay: { chao: 'Gì đấy con?', noi: [
      [{ who: 'Đăng', text: 'Thầy ơi, làng này vắng quá.' }, { who: 'Thầy Cả', text: 'Làng nào có người chết trẻ cũng vắng. Người ta đóng cửa sớm, con ạ.' }],
      [{ who: 'Thầy Cả', text: 'Ăn no rồi hẵng làm. Bụng đói thì vía yếu, vía yếu thì dễ bị trêu.' }],
      [{ who: 'Thầy Cả', text: 'Hồi thầy bằng tuổi con, thầy còn chưa được cầm dùi mõ. Phải gánh nước cho sư phụ ba năm.' }, { who: 'Đăng', text: 'Thế con còn may chán.' }],
      [{ who: 'Đăng', text: 'Thầy có sợ ma không?' }, { who: 'Thầy Cả', text: 'Sợ chứ. Người không biết sợ thì không làm được nghề này lâu.' }]
    ] },
    dighe: { chao: 'Cậu cần gì?', noi: [
      [{ who: 'Dì ghẻ', text: 'Cậu cứ tự nhiên. Có điều nhà đang có tang, đừng đi lại lung tung.' }],
      [{ who: 'Dì ghẻ', text: 'Ăn miếng trầu không cậu?' }, { who: 'Đăng', text: 'Dạ, cháu không ăn trầu.' }, { who: 'Dì ghẻ', text: 'Không ăn thì thôi.' }],
      [{ who: 'Dì ghẻ', text: 'Đàn bà goá nuôi hai đứa con gái, cậu tưởng dễ à?' }]
    ], ch1: { chao: 'Lại là cậu.', noi: [
      [{ who: 'Dì ghẻ', text: 'Trong cung này tai vách mạch rừng. Cậu liệu mà giữ mồm.' }],
      [{ who: 'Dì ghẻ', text: 'Hoàng hậu dạo này ăn ít, ngủ ít. Cậu làm lễ cho nhanh để nó còn yên.' }]
    ] } },
    cam: { chao: '…', noi: [
      [{ text: 'Cám xoắn vạt áo, không ngẩng lên.', cls: 'think' }, { who: 'Cám', text: 'Thầy đừng nhìn tôi như thế.' }],
      [{ who: 'Cám', text: 'Hồi bé, chị ấy hay tết tóc cho tôi. Mẹ mà thấy là mắng cả hai.' }],
      [{ who: 'Cám', text: 'Thầy có tin người chết còn nghe được không?' }, { who: 'Đăng', text: 'Thầy tôi bảo, nghe được những gì mình nói thật lòng.' }, { who: 'Cám', text: '…' }]
    ] },
    lai: { chao: 'Dạ, thầy gọi em?', noi: [
      [{ who: 'Lài', text: 'Bánh đúc em đổ còn nhiều lắm, thầy ăn thêm không?' }],
      [{ who: 'Lài', text: 'Ở trong cung, canh tư đã phải dậy quét sân. Chậm một chút là bị phạt quỳ.' }],
      [{ who: 'Lài', text: 'Quê em ở bên kia sông. Mùa này chắc lúa chín vàng cả cánh đồng rồi.' }]
    ] },
    kid1: { chao: 'Chú thầy cúng!', noi: [
      [{ who: 'Thằng cu', text: 'Chú có biết vẽ bùa cho diều bay cao không?' }, { who: 'Đăng', text: 'Bùa thì không. Nhưng phết thêm hồ cho cánh diều thì được.' }],
      [{ who: 'Con bé', text: 'Đứa nào chơi thua phải ra vườn cau một mình. Thế mà chưa đứa nào dám thua.' }]
    ] },
    onglao: { chao: 'Thầy ngồi đã.', noi: [
      [{ who: 'Ông lão', text: 'Nước chè xanh nấu lá tươi, uống thì chát nhưng mát ruột.' }],
      [{ who: 'Ông lão', text: 'Tôi ngồi gốc gạo này bán nước từ thời tóc còn xanh. Người ra kẻ vào, thấy nhiều lắm.' }],
      [{ who: 'Ông lão', text: 'Thầy trò đi đường xa có mỏi chân không? Ngồi nghỉ một lát.' }]
    ] },
    sugia: { chao: 'Chuyện gì?', noi: [
      [{ who: 'Sứ giả', text: 'Ta đi ngựa cả ngày, bụi đầy mũ áo.' }],
      [{ who: 'Sứ giả', text: 'Việc trong cung, cậu nói càng ít càng tốt.' }]
    ] },
    bacu: { chao: 'Cậu đấy à. Ngồi xuống.', noi: [
      [{ who: 'Bà cụ', text: 'Uống bát nước chè đã. Chuyện đâu còn có đó.' }],
      [{ who: 'Bà cụ', text: 'Già ngồi hàng nước cổng thành mấy chục năm. Ai vào, ai ra, ai không ra nữa, già nhớ cả.' }],
      [{ who: 'Bà cụ', text: 'Trời này sắp đổ mưa. Đầu gối già nhức từ sáng.' }],
      [{ who: 'Bà cụ', text: 'Ngày trước già cũng ngồi đồng. Thôi, chuyện cũ rồi, nhắc làm gì.' }]
    ] },
    basau: { chao: 'Cậu ăn gì chưa?', noi: [
      [{ who: 'Bà Sáu', text: 'Nồi cơm còn miếng cháy, để bà cạo cho một miếng.' }],
      [{ who: 'Bà Sáu', text: 'Bếp cung này khổ lắm cậu ạ. Củi ướt cũng bị mắng, lửa to cũng bị mắng.' }],
      [{ who: 'Bà Sáu', text: 'Đừng ngồi bậu cửa bếp. Ông Táo không ưa.' }]
    ] },
    linhhau: { chao: 'Gì?', noi: [[{ who: 'Lính hầu', text: 'Đi đâu thì đi cho nhanh. Đứng đây người ta lại tưởng tôi lười.' }]] },
    linhtre: { chao: 'Cậu thầy pháp.', noi: [
      [{ who: 'Lính gác', text: 'Gác đêm ở cổng bắc lạnh thấu xương.' }],
      [{ who: 'Lính gác', text: 'Cậu là thầy pháp à? Xem giúp tôi bao giờ được về quê cưới vợ.' }, { who: 'Đăng', text: 'Tôi chỉ biết xem đất, không biết xem duyên.' }]
    ] },
    linh: { chao: 'Không có việc thì đi đi.', noi: [[{ who: 'Lính', text: 'Lệnh trên bảo gác thì gác. Hỏi tôi cũng chẳng biết gì đâu.' }]] },
    ngan: { chao: 'Thầy pháp.', noi: [
      [{ who: 'Đội Ngạn', text: 'Thị vệ không nói chuyện phiếm.' }],
      [{ who: 'Đội Ngạn', text: 'Cậu đi lại trong cung hơi nhiều đấy.' }]
    ] },
    nu: { chao: 'Dạ?', noi: [
      [{ who: 'Nụ', text: 'Em đang tập dệt hoa văn mới. Khó lắm, sai một sợi là hỏng cả tấm.' }],
      [{ who: 'Nụ', text: 'Lài với em vào cung cùng một năm. Nó nhát lắm, sấm to cũng khóc.' }]
    ], ch2: { chao: 'Dạ?', noi: [
      [{ who: 'Nụ', text: 'Từ ngày Lài mất, đêm nào em cũng thắp cho nó một nén hương.' }],
      [{ who: 'Nụ', text: 'Em đang tập dệt hoa văn mới. Khó lắm, sai một sợi là hỏng cả tấm.' }]
    ] } },
    tre: { chao: 'Chú ơi!', noi: [[{ who: 'Lũ trẻ', text: 'Chú có thấy con vàng anh không? Nó hót hay lắm, mà không cho ai bắt.' }]] },
    vua: { chao: 'Ngươi muốn gì?', noi: [
      [{ who: 'Nhà vua', text: 'Ngươi cứ làm việc của ngươi.' }],
      [{ who: 'Nhà vua', text: 'Ngày trước, hoàng hậu cũ hay ra vườn này ngồi hái hoa.' }]
    ] },
    hen: { chao: 'Cậu thầy pháp đấy à?', noi: [
      [{ who: 'Chị Hến', text: 'Hôm nay nước ròng, mò được có rổ hến con.' }],
      [{ who: 'Chị Hến', text: 'Làm gì thì làm, đừng để mẹ con tôi dính vào.' }]
    ] },
    moc: { chao: 'Hửm?', noi: [
      [{ who: 'Lão Mộc', text: 'Gỗ xoan nhẹ mà bền. Đóng khung cửi là nhất.' }],
      [{ who: 'Lão Mộc', text: 'Bốn chục năm cầm rìu, chưa gặp cây nào như cây này.' }]
    ] },
    tho: { chao: 'Dạ.', noi: [[{ who: 'Thợ phụ', text: 'Lão Mộc khó tính lắm. Cậu đừng chọc lão.' }]] },
    tu: { chao: 'Cậu ngồi đi.', noi: [
      [{ who: 'Bà Tư', text: 'Sợi tơ năm nay óng lắm. Dệt lụa thì đẹp phải biết.' }],
      [{ who: 'Bà Tư', text: 'Mắt già rồi, xâu kim phải nhờ con Nụ.' }]
    ] },
    dan1: { chao: 'Hả?', noi: [[{ who: 'Dân làng', text: 'Thôi, cậu đi đi. Đứng gần cái cây ấy làm gì.' }]] }
  };
  function tg(id, S) { var e = TG[id]; if (!e) return null; return e[S.chapter] || (S.chapter !== 'mo_dau' && S.chapter !== 'ch1' && e.ch2) || e; }

  // ---------- ai đang có việc: đối chiếu nhãn với chữ đậm trong mục tiêu ----------
  var ALIAS = { lai: ['lài'], cam: ['cám'], dighe: ['dì ghẻ'], thay: ['thầy cả', 'thầy'], sugia: ['sứ giả'], vua: ['nhà vua', 'vua'], basau: ['bà sáu'],
    bacu: ['bà cụ'], ngan: ['đội ngạn', 'ngạn'], nu: ['nụ'], tu: ['bà tư'], moc: ['lão mộc'], hen: ['chị hến'], tam: ['tấm'], tre: ['lũ trẻ'] };
  function words(s) { return s.toLowerCase().replace(/[^\p{L}\s]/gu, ' ').split(/\s+/).filter(Boolean); }
  function chua(hay, kim) { var a = words(hay), b = words(kim); if (!b.length) return false; for (var i = 0; i + b.length <= a.length; i++) { var ok = true; for (var k = 0; k < b.length; k++) if (a[i + k] !== b[k]) { ok = false; break; } if (ok) return true; } return false; }
  function laViec(id, label) {
    var obj = G.story.objective(G.S) || '', dam = obj.match(/\*\*(.+?)\*\*/g);
    var hay = dam ? dam.join(' | ') : obj;
    var ten = (ALIAS[id] || []).concat(label ? [label] : []);
    return ten.some(function (n) { return chua(hay, n); });
  }

  // ---------- dấu trên đầu ----------
  T.danhDau = function () {
    for (var k in marks) if (marks[k].parentNode) marks[k].remove();
    marks = {}; nearKey = null; objSig = G.story.objective(G.S) || '';
    var nho = G.S.loc.indexOf('ky_') === 0;
    for (var id in W.npcs) {
      var n = W.npcs[id], d = n.def; if (!d.label) continue;
      var viec = d.quest || laViec(id, d.label) || (nho && !d.ghost);
      var m = document.createElement('div'); m.className = 'mk ' + (viec ? 'viec' : 'hoi'); m.textContent = viec ? '!' : '?';
      m.style.top = (d.html ? -96 : (d.look && d.look.kid ? -100 : -122) - (d.bubble ? 34 : 0)) + 'px';
      n.el.appendChild(m); marks['n:' + id] = m;
    }
    (G.story.things(G.S) || []).forEach(function (t) {
      if (t.door) return;
      var m = document.createElement('div'); m.className = 'mk vat ' + (t.quest ? 'viec' : 'hoi'); m.textContent = t.quest ? '!' : '?';
      m.style.left = t.x + 'px'; m.style.top = ((t.hit ? t.hit[1] : t.y - 60) - 18) + 'px';
      $('ents').appendChild(m); marks['t:' + t.id] = m;
    });
  };
  function key(t) { return t ? (t.npc ? 'n:' : 't:') + t.id : null; }
  T.ganNhat = function (t) {
    var k = key(t);
    if (nearKey && marks[nearKey]) marks[nearKey].classList.remove('gan');
    nearKey = k; if (k && marks[k]) marks[k].classList.add('gan');
  };
  // mục tiêu đổi thì tính lại ai có việc
  var hud0 = G.ui.hud;
  G.ui.hud = function () {
    hud0.apply(this, arguments);
    if (G.S && W.ready && (G.story.objective(G.S) || '') !== objSig) T.danhDau();
    capNhatMat();
  };

  // ---------- bấm vào người: chọn chuyện ----------
  T.hoi = function (t) {
    var S = G.S, n = W.npcs[t.id], d = n && n.def;
    if (!d || S.loc.indexOf('ky_') === 0 || d.ghost || d.html) return false;
    var e = tg(t.id, S); if (!e) return false;
    var viec = d.quest || laViec(t.id, d.label);
    G.ui.dialog([{ who: d.label.replace(/ \(.*\)$/, ''), text: e.chao, choices: [
      { text: 'Hỏi han vài câu', run: function () { chuyenThuong(t.id, e); } },
      { text: (viec ? '[[!]] ' : '') + 'Hỏi chuyện đang điều tra', run: function () { chuyenViec(t); } },
      { text: 'Thôi, để lúc khác' }
    ] }]);
    return true;
  };
  function chuyenThuong(id, e) {
    var S = G.S; S.tg = S.tg || {};
    var i = S.tg[id] || 0, l = e.noi[i % e.noi.length]; S.tg[id] = i + 1;
    G.ui.dialog(l);
  }
  function chuyenViec(t) {
    G.story.act(t.id, t);
    if (!G.ui.modal && !W.locked) G.ui.dialog([{ text: '(Lúc này chẳng có gì để hỏi thêm.)', cls: 'think' }]);
  }

  // ---------- mắt âm dương: mở 10 giây, nhắm lại thì mỏi mắt một lúc mới mở lại được ----------
  var MO = 10, HOI = 14, mat = { mo: false, con: 0, hoi: 0, tong: HOI };
  function ngoaiKyUc() { var S = G.S; return S && S.loc.indexOf('ky_') !== 0; }
  function chopMi(giua) {
    var mi = $('mi'); mi.classList.remove('chop'); void mi.offsetWidth; mi.classList.add('chop');
    setTimeout(giua, 260);
  }
  T.moMat = function () {
    var S = G.S;
    if (!S || !S.items.bat_nuoc || !ngoaiKyUc()) return;
    if (mat.mo) { T.nhamMat(); return; }
    if (mat.hoi > 0) { G.ui.toast('Mắt âm dương còn mỏi. Chờ thêm ' + Math.ceil(mat.hoi) + ' giây.'); G.audio.sfx('bad'); return; }
    mat.mo = true; mat.con = MO; mat.cho = true;
    G.audio.sfx('whoosh'); G.audio.sfx('bell', 0.2);
    chopMi(function () {
      mat.cho = false; $('stage').classList.add('soi', 'mat-mo');
      if (G.kynang) G.kynang.matMo(); // nhịp mở mắt: vòng sáng, đồng tử, hồn bay
      if (S.loc === 'nha_dighe' && S.phase === 'dem' && !S.flags.thay_dau_chan) {
        S.flags.thay_dau_chan = true;
        setTimeout(function () { G.ui.toast('Mắt âm dương thấy [[dấu chân ướt]] đi từ giếng cũ vào buồng cô Tấm.', 4200); }, 300);
      }
      if (S.loc === 'vuon_cau' && !S.flags.thay_dau_tay) {
        S.flags.thay_dau_tay = true;
        setTimeout(function () { G.ui.toast('Mắt âm dương thấy [[dấu bàn tay]] in dọc thân cây cau non, từ gốc lên ngọn.', 4200); }, 300);
      }
      G.ui.hud();
    });
  };
  T.nhamMat = function (khongHoi) {
    if (!mat.mo) return;
    var daMo = MO - mat.con;
    mat.mo = false; mat.con = 0;
    mat.tong = mat.hoi = khongHoi ? 0 : Math.min(HOI, 4 + daMo * 1.2);
    G.audio.sfx('paper');
    if (G.kynang) G.kynang.matNham();
    chopMi(function () { $('stage').classList.remove('soi', 'mat-mo'); G.ui.hud(); });
  };
  G.toggleBowl = T.moMat;
  T.matCon = function () { return mat.mo && !mat.cho ? mat.con : 0; }; // số giây mắt còn mở (cho hiệu ứng mỏi mắt)
  function capNhatMat() {
    var b = $('btn-bowl'); if (!b || b.hidden) return;
    b.classList.toggle('on', mat.mo); b.setAttribute('aria-pressed', mat.mo);
    b.classList.toggle('cd', !mat.mo && mat.hoi > 0);
    var p = mat.mo ? mat.con / MO : (mat.hoi > 0 ? 1 - mat.hoi / (mat.tong || HOI) : 1);
    b.style.setProperty('--p', (p * 100).toFixed(1) + '%');
  }
  var last = performance.now();
  setInterval(function () {
    var now = performance.now(), dt = Math.min(0.5, (now - last) / 1000); last = now;
    if (!G.S) return;
    var ranh = !G.ui.modal && !W.locked;
    // cảnh khác tự tắt lớp soi (chuyển cảnh, ký ức): coi như đã nhắm mắt, không tính mỏi
    if (mat.mo && !mat.cho && !$('stage').classList.contains('soi')) { mat.mo = false; mat.con = 0; $('stage').classList.remove('mat-mo'); }
    if (mat.mo && ranh) { mat.con -= dt; if (mat.con <= 0) { T.nhamMat(); G.ui.toast('Mắt âm dương nhắm lại.'); } }
    else if (!mat.mo && mat.hoi > 0 && ranh) mat.hoi = Math.max(0, mat.hoi - dt);
    capNhatMat();
  }, 150);

  // ---------- chuột: con trỏ tay khi lướt qua thứ bấm được; mũi tên sang cảnh ----------
  var hoverRaf = 0, hx = 0, hy = 0;
  document.addEventListener('DOMContentLoaded', function () {
    $('world').addEventListener('mousemove', function (e) {
      hx = e.clientX; hy = e.clientY;
      if (hoverRaf) return;
      hoverRaf = requestAnimationFrame(function () {
        hoverRaf = 0;
        if (!G.S || !W.ready || G.ui.isBusy() || W.locked) { $('stage').classList.remove('tro'); return; }
        var p = W.toWorld(hx, hy), t = W.hitAt(p.x, p.y), k = key(t);
        $('stage').classList.toggle('tro', !!t);
        document.querySelectorAll('.mk.luot').forEach(function (m) { m.classList.remove('luot'); });
        if (k && marks[k]) marks[k].classList.add('luot');
      });
    });
    $('edge-l').addEventListener('click', function (e) { e.stopPropagation(); W.diToiMep('left'); });
    $('edge-r').addEventListener('click', function (e) { e.stopPropagation(); W.diToiMep('right'); });
  });
})();
