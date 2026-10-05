// Giao diện phủ trên sân khấu: hội thoại (chữ chạy), thông báo, mục tiêu, chuyển cảnh, thẻ chữ, menu.
var G = window.G || (window.G = {});
G.ui = { modal: null };

(function () {
  var U = G.ui, $ = G.$;
  U.isBusy = function () { return !!U.modal; };
  U.open = function (id, html) { var p = $(id); if (html !== undefined) p.innerHTML = html; p.hidden = false; U.modal = id; };
  U.close = function (id) { $(id).hidden = true; if (U.modal === id) U.modal = null; };

  // **chữ** = vàng (người, nơi chốn), [[chữ]] = đỏ (manh mối)
  U.fmt = function (s) { return String(s).replace(/\[\[(.+?)\]\]/g, '<b class="clue">$1</b>').replace(/\*\*(.+?)\*\*/g, '<b class="hl">$1</b>'); };

  U.toast = function (msg, ms) {
    var t = document.createElement('div'); t.className = 'toast'; t.innerHTML = U.fmt(msg);
    $('toasts').appendChild(t);
    setTimeout(function () { t.classList.add('out'); }, ms || 2800);
    setTimeout(function () { t.remove(); }, (ms || 2800) + 400);
  };

  // ---------- hội thoại ----------
  // lines: [{who, text, cls ('verse'|'think'), img, sfx, run, choices:[{text, run}]}]
  U.dialog = function (lines, onEnd) {
    if (typeof lines === 'string') lines = [{ text: lines }];
    var i = 0, img = null, typing = null, full = '';
    var box = $('dialog');
    function show() {
      var l = lines[i];
      if (l.run) l.run();
      if (l.sfx) G.audio.sfx(l.sfx);
      if (l.img !== undefined) img = l.img;
      G.ui.closeup(img);
      full = U.fmt(l.text);
      var ch = l.choices ? '<div class="choices">' + l.choices.map(function (c, k) { return '<button data-c="' + k + '">' + (k + 1) + '. ' + U.fmt(c.text) + '</button>'; }).join('') + '</div>' : '';
      var mood = G.bieuCam ? G.bieuCam.doan(l) : null, por = l.who && G.bieuCam ? G.bieuCam.chanDung(l.who, mood) : '';
      if (l.who && G.bieuCam) G.bieuCam.nhanVat(l.who, mood);
      box.classList.toggle('co-por', !!por);
      box.innerHTML = por + (l.who ? '<div class="who">' + l.who + '</div>' : '') + '<div class="txt ' + (l.cls || '') + '"></div>' + ch +
        (ch ? '' : '<div class="next">' + (i < lines.length - 1 ? 'Tiếp' : 'Đóng') + '</div>');
      typeText(box.querySelector('.txt'), full);
    }
    function typeText(el, html) {
      if (typing) clearInterval(typing);
      var plain = html.replace(/<[^>]+>/g, ''), n = 0;
      if (G.reduceMotion) { el.innerHTML = html; return; }
      typing = setInterval(function () {
        n += 2;
        if (n >= plain.length) { el.innerHTML = html; clearInterval(typing); typing = null; return; }
        el.innerHTML = cut(html, n);
        if (n % 6 === 0) G.audio.sfx('blip');
      }, 18);
    }
    // cắt chuỗi html theo số ký tự hiển thị, giữ thẻ
    function cut(html, n) {
      var out = '', c = 0, inTag = false, open = [];
      for (var k = 0; k < html.length && c < n; k++) {
        var ch = html[k];
        out += ch;
        if (ch === '<') inTag = true;
        else if (ch === '>') inTag = false;
        else if (!inTag) c++;
      }
      return out + (out.lastIndexOf('<b') > out.lastIndexOf('</b>') ? '</b>' : '');
    }
    function done() { if (typing) { clearInterval(typing); typing = null; box.querySelector('.txt').innerHTML = full; return false; } return true; }
    function choose(k) {
      var c = lines[i].choices[k];
      U.close('dialog'); U.advance = null; U.choose = null; G.ui.closeup(null); if (G.bieuCam) G.bieuCam.traLai();
      if (c.run) c.run(G.S);
      U.hud();
    }
    box.onclick = function (e) {
      var b = e.target.closest('button[data-c]');
      if (b) { if (done()) choose(+b.dataset.c); return; }
      advance();
    };
    U.choose = function (k) { if (lines[i] && lines[i].choices && lines[i].choices[k]) { done(); choose(k); } };
    function advance() {
      if (!done()) return;
      if (lines[i].choices) return;
      i++;
      if (i >= lines.length) { U.close('dialog'); U.advance = null; G.ui.closeup(null); if (G.bieuCam) G.bieuCam.traLai(); U.hud(); if (onEnd) onEnd(); return; }
      show();
    }
    U.advance = advance;
    U.open('dialog');
    show();
  };
  U.say = function (lines) { return new Promise(function (res) { U.dialog(lines, res); }); };

  // ---------- chuyển cảnh mờ ----------
  U.fadeTo = function (mid, then, ms) {
    var f = $('fade'); f.classList.add('on'); var prev = U.modal; U.modal = 'fade';
    setTimeout(function () {
      if (mid) mid();
      setTimeout(function () { f.classList.remove('on'); if (U.modal === 'fade') U.modal = null; if (then) then(); }, 120);
    }, ms || 820);
  };
  U.fade = function (mid, ms) { return new Promise(function (res) { U.fadeTo(mid, res, ms); }); };

  // thẻ chữ giữa màn: chuyển ngày, hết chương
  U.card = function (title, sub, btn) {
    return new Promise(function (res) {
      var c = $('card');
      c.innerHTML = '<h2>' + title + '</h2>' + (sub ? '<p>' + U.fmt(sub) + '</p>' : '') + (btn ? '<button class="primary">' + btn + '</button>' : '');
      c.hidden = false; U.modal = 'card';
      function close() { c.hidden = true; U.modal = null; res(); }
      if (btn) c.querySelector('button').onclick = close;
      else setTimeout(close, 2600);
    });
  };

  // ---------- HUD và mục tiêu ----------
  var PH = { chieu: 'Chiều', dem: 'Đêm', sang: 'Sáng', toi: 'Tối' };
  U.hud = function () {
    var S = G.S; if (!S) return;
    var d = S.loc.indexOf('ky_') === 0 ? 'Nhiều năm trước' : (S.chapter === 'ch1' ? 'Ngày ' + S.day + ' trong cung' : 'Ngày ' + S.day) + ' · ' + PH[S.phase];
    var inv = S.inv ? [['tien', 'Tiền', S.money], ['nhang', 'Nhang', S.inv.nhang], ['gao', 'Gạo muối', S.inv.gao], ['bua', 'Giấy bùa', S.inv.bua]]
      .concat(S.inv.tienam ? [['tienam', 'Tiền âm', S.inv.tienam]] : []).concat(S.items.lo_xuong ? [['lo', 'Lọ xương', S.items.lo_xuong]] : [])
      .map(function (c) { return '<span class="chip chip-' + c[0] + '" title="' + c[1] + '"><b>' + c[2] + '</b> ' + c[1] + '</span>'; }).join('') : '';
    if ($('hud-inv')._t !== inv) { $('hud-inv')._t = inv; $('hud-inv').innerHTML = inv; $('hud-inv').hidden = !inv; }
    var memo = S.loc.indexOf('ky_') === 0;
    $('btn-gao').hidden = !S.inv || memo; $('btn-chuong').hidden = !S.items.chuong || memo; $('btn-chay').hidden = memo;
    if (S.inv) { var gc = String(S.inv.gao); if ($('gao-cnt')._t !== gc) { $('gao-cnt')._t = gc; $('gao-cnt').textContent = gc; } }
    $('btn-chay').classList.toggle('on', !!G.input.runToggle); $('btn-chay').setAttribute('aria-pressed', !!G.input.runToggle);
    if ($('hud-day')._t !== d) { $('hud-day')._t = d; $('hud-day').textContent = d; }
    var ln = G.LOCATIONS[S.loc].name; if ($('hud-loc')._t !== ln) { $('hud-loc')._t = ln; $('hud-loc').textContent = ln; }
    var obj = G.story.objective(S) || '';
    if ($('objective')._t !== obj) {
      if ($('objective')._t && obj) { G.audio.sfx('paper'); $('objective').classList.remove('moi'); void $('objective').offsetWidth; $('objective').classList.add('moi'); }
      $('objective')._t = obj; $('objective').innerHTML = obj ? '<div class="obj-h">Việc cần làm</div><div class="obj-t">' + U.fmt(obj) + '</div>' : '';
    }
    $('btn-bowl').hidden = !S.items.bat_nuoc || memo;
    var nn = G.notebook ? G.notebook.newCount() : 0;
    $('note-badge').hidden = !nn; $('note-badge').textContent = nn;
  };

  // ---------- menu ----------
  // Bảng tạm dừng: tấm gỗ sơn then viền vàng như hoành phi trên bàn thờ; bên trái lá bùa trấn treo và nén nhang cháy dở,
  // bên phải các nút là dải giấy bùa vàng có chữ son. Dòng đầu ghi chương, ngày, buổi.
  var TEN_CHUONG = { ch1: 'Chương 1 · Vàng anh', ch2: 'Chương 2 · Xoan đào', ch3: 'Chương 3 · Khung cửi', ch4: 'Chương 4 · Quả thị', ch5: 'Chương 5 · Nồi nước sôi' };
  function nutMenu(a, chu, txt, cls) { return '<button data-a="' + a + '"' + (cls ? ' class="' + cls + '"' : '') + '><i class="mn-chu" aria-hidden="true">' + chu + '</i><span>' + txt + '</span></button>'; }
  U.menu = function () {
    var S = G.S, dong = S ? (S.loc.indexOf('ky_') === 0 ? 'Trong ký ức · Nhiều năm trước' : (TEN_CHUONG[S.chapter] || '') + ' — Ngày ' + S.day + ' · ' + (PH[S.phase] || '')) : '';
    var bua = G.ve && G.ve.buaSvg ? G.ve.buaSvg({ chu: G.ve.BUA.anVi, cu: true }, 'mn-bua') : '';
    U.open('menu', '<div class="mn-trai" aria-hidden="true"><i class="mn-day"></i>' + bua +
      '<div class="mn-nhang"><i class="mn-que"><b></b></i><i class="mn-khoi"></i><i class="mn-khoi k2"></i><i class="mn-bat"></i></div></div>' +
      '<div class="mn-phai"><h2>Tạm dừng</h2><p class="mn-dong">' + dong + '</p><div class="list">' +
      nutMenu('back', '敕', 'Chơi tiếp', 'primary') +
      nutMenu('save', '印', 'Lưu game') +
      nutMenu('snd', '鐘', G.audio.on ? 'Tắt âm thanh' : 'Bật âm thanh') +
      nutMenu('dohoa', '眼', G.dohoa && G.dohoa.cao ? 'Đồ hoạ: Cao (bấm để giảm)' : 'Đồ hoạ: Thấp (bấm để tăng)') +
      nutMenu('help', '書', 'Cách chơi') +
      nutMenu('title', '門', 'Về màn hình chính', 'mn-ve') + '</div></div>');
    $('menu').classList.remove('mnh'); $('menu').classList.add('mn');
    $('menu').onclick = function (e) {
      var n = e.target.closest('[data-a]'), a = n && n.dataset.a; if (!a) return;
      if (a === 'back') U.close('menu');
      if (a === 'save') { G.save(); U.toast('Đã lưu.'); U.close('menu'); }
      if (a === 'snd') { G.audio.toggle(); U.menu(); }
      if (a === 'dohoa' && G.dohoa) { G.dohoa.datChatLuong(!G.dohoa.cao); U.menu(); }
      if (a === 'help') { U.close('menu'); U.help(); }
      if (a === 'title') { G.save(); U.close('menu'); G.showTitle(); }
    };
  };
  U.help = function () {
    var rows = [['Đi lại', 'Bấm vào cảnh · WASD / mũi tên. Bấm mũi tròn ở mép màn hình để sang cảnh bên'], ['Tương tác', 'Bấm thẳng vào người, đồ vật · E / Space khi đứng gần. Dấu ? là xem được, dấu ! là việc cần làm'], ['Chạy (gây ồn)', 'Bấm đúp · giữ Shift · nút Chạy'],
      ['Sổ Tử', 'J · chọn 1 lời khai + 1 vật chứng rồi Đối chiếu'], ['Mắt âm dương', 'B · mở 10 giây để thấy dấu vết ẩn, vào ký ức; nhắm lại phải chờ mắt hết mỏi'], ['Gạo muối', 'G · đẩy lùi vong vài giây'],
      ['Chuông', 'C · nghe tiếng thì thầm, dụ lính, nhưng vong cũng nghe. Lắc xong phải chờ 12 giây chuông ngân hết mới lắc lại được'], ['Bản đồ', 'M · nút Bản đồ trên thanh đồ nghề: lấy ra xem, bấm lần nữa để cất cho đỡ vướng mắt. Bấm vào tờ bản đồ để mở rộng. Học bí pháp độn thổ ở bà cụ hàng nước để đi nhanh tới nơi đã đến'], ['Đợi / Ngủ', 'T · nút ⏳ góc trên trái: để thời gian trôi sang buổi sau ngay tại chỗ, hoặc ngủ sang sáng hôm sau. Không cần về chõng tre'], ['Menu', 'Esc']];
    $('menu').classList.remove('mn'); $('menu').classList.add('mnh');
    U.open('menu', '<h2>Cách chơi</h2><table class="keys">' + rows.map(function (r) { return '<tr><th>' + r[0] + '</th><td>' + r[1] + '</td></tr>'; }).join('') +
      '</table><button class="close primary" data-a="back">Đã hiểu</button>');
    $('menu').onclick = function (e) { if (e.target.dataset.a === 'back') U.close('menu'); };
  };

})();
