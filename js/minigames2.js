// Minigame Chương 1: gieo quẻ, giữ nhang trong gió, đọc vè gọi Bống theo nhịp, chôn bốn lọ xương.
var G = window.G || (window.G = {});

(function () {
  var M = G.mg, $ = G.$, INK = G.INK, FX = G.mg.fx;
  function open(html, cls) { var p = $('mg'); p.className = 'panel big ' + (cls || ''); G.ui.open('mg', html); return p; }
  function close() { G.ui.close('mg'); var p = $('mg'); p.onclick = p.onpointerdown = p.onpointerup = null; p.className = 'panel big'; }

  // ---------- gieo quẻ: cần ra một sấp một ngửa 2 trên 3 lần ----------
  // Đồng tiền đồng lỗ vuông: mặt ngửa có bốn chữ "景興通寶", mặt sấp trơn, rỉ xanh.
  function coin(up) {
    var FONT = 'font-family="\'Ma Shan Zheng\', \'KaiTi\', serif"';
    var s = '<svg class="xu ' + (up ? 'ngua' : 'sap') + '" viewBox="0 0 60 60" width="78" height="78"><g stroke="' + INK + '" stroke-width="2.4">';
    s += '<circle cx="30" cy="30" r="26" fill="' + (up ? '#C8963A' : '#7A5A30') + '"/>';
    s += '<circle cx="30" cy="30" r="22" fill="none" stroke="' + (up ? '#8A5A1E' : '#4E3418') + '" stroke-width="1.6"/>';
    s += '<rect x="23" y="23" width="14" height="14" fill="#1A120C" stroke-width="2"/><rect x="20.5" y="20.5" width="19" height="19" fill="none" stroke="' + (up ? '#8A5A1E' : '#4E3418') + '" stroke-width="1.4"/>';
    if (up) s += '<g fill="#4A2A0A" stroke="none" font-size="10" text-anchor="middle" ' + FONT + '><text x="30" y="17">景</text><text x="30" y="51">興</text><text x="45.5" y="34">通</text><text x="14.5" y="34">寶</text></g>';
    else s += '<g fill="#5E7A5A" stroke="none" opacity=".75"><circle cx="15" cy="22" r="3"/><circle cx="44" cy="40" r="4"/><circle cx="20" cy="44" r="2"/></g><path d="M30,8 q6,4 0,8" fill="none" stroke="#4E3418" stroke-width="1.6"/>';
    s += '<path d="M12,22 q6,-12 18,-14" fill="none" stroke="#FFF2C8" stroke-width="2.4" opacity="' + (up ? '.6' : '.25') + '"/>';
    return s + '</g></svg>';
  }
  M.gieoQue = function () {
    return new Promise(function (res) {
      var lan = 0, dung = 0, busy = false, roi = false;
      function render(a, b, msg) {
        $('mg').innerHTML = '<h2>Gieo quẻ xem ngày</h2><div class="hint">Gieo hai đồng xu. Một sấp một ngửa là <b>quẻ thuận</b>. Cần 2 quẻ thuận trong 3 lần gieo.</div>' +
          '<div class="que"><div class="que-dia"><div class="coins' + (busy ? ' spin' : '') + (roi ? ' roi' : '') + '">' + coin(a) + coin(b) + '</div></div>' +
          '<div class="que-r">' + [0, 1, 2].map(function (k) { return '<span class="' + (k < lan ? (k < dungArr.length && dungArr[k] ? 'ok' : 'no') : '') + '">' + (k < lan ? (dungArr[k] ? 'Thuận' : 'Nghịch') : '·') + '</span>'; }).join('') + '</div>' +
          '<div class="hint que-msg">' + (msg || '&nbsp;') + '</div><button class="primary" data-a="gieo"' + (busy ? ' disabled' : '') + '>Gieo</button></div>';
        roi = false;
      }
      var dungArr = [];
      open('', 'quep'); render(true, false);
      $('mg').onclick = function (e) {
        if (!e.target.closest('[data-a="gieo"]') || busy) return;
        busy = true; render(Math.random() < .5, Math.random() < .5); G.audio.sfx('mo');
        setTimeout(function () {
          busy = false;
          var a = Math.random() < .5, b = Math.random() < .5;
          if (dung === 0 && lan === 2) b = !a; // không để thua quá oan
          var ok = a !== b; dungArr.push(ok); lan++; if (ok) dung++;
          G.audio.sfx(ok ? 'clue' : 'bad');
          roi = true;
          if (dung >= 2) { render(a, b, 'Quẻ thuận. Ngày làm cỗ được.'); hieuUng(true); setTimeout(function () { close(); res(true); }, 1100); return; }
          if (lan >= 3) { render(a, b, 'Quẻ nghịch. Gieo lại từ đầu.'); hieuUng(false); setTimeout(function () { lan = 0; dung = 0; dungArr = []; render(true, false, 'Thành tâm, gieo lại.'); }, 1300); return; }
          render(a, b, ok ? 'Thuận.' : (a ? 'Hai mặt ngửa: dương quá.' : 'Hai mặt sấp: âm quá.')); hieuUng(ok);
        }, 700);
      };
      function hieuUng(ok) {
        var c = FX.tam($('mg').querySelector('.coins'));
        if (ok) { FX.hat(c.x, c.y, { n: 12, kieu: 'vang', tam: 60 }); FX.chu(c.x, c.y - 50, 'Thuận', 'vang'); }
        else { FX.rung($('mg').querySelector('.que-dia')); FX.chu(c.x, c.y - 50, 'Nghịch', 'sai'); }
      }
    });
  };

  // ---------- giữ nhang khi gió thổi (cúng sào phơi áo) ----------
  // Sân đêm, sào tre phơi áo, bát hương đặt dưới sào. Gió đến thì áo bay, vệt gió quét ngang; hai bàn tay khum che đốm lửa.
  function gioNen() {
    var s = '<svg class="gio-nen" viewBox="0 0 640 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<linearGradient id="mgDem" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1A2230"/><stop offset=".7" stop-color="#2E3A48"/><stop offset="1" stop-color="#3A3428"/></linearGradient></defs>' +
      '<rect width="640" height="220" fill="url(#mgDem)"/><circle cx="540" cy="40" r="18" fill="#E8E2C8" opacity=".85"/><circle cx="540" cy="40" r="34" fill="#E8E2C8" opacity=".12"/>' +
      '<g fill="#E8E2C8" opacity=".6"><circle cx="80" cy="30" r="1.2"/><circle cx="210" cy="18" r="1"/><circle cx="420" cy="26" r="1.3"/><circle cx="600" cy="90" r="1"/></g>' +
      '<g stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round">' +
      '<path d="M40,220 L70,40M600,220 L570,40" stroke="#6A5A36" stroke-width="7"/><path d="M40,220 L70,40M600,220 L570,40" stroke="#A8925A" stroke-width="3"/>' +
      '<path d="M50,48 L590,48" stroke="#8A7A4A" stroke-width="6"/><path d="M50,48 L590,48" stroke="#C9B47A" stroke-width="2"/>' +
      '<g class="gio-ao"><path d="M120,48 h70 l10,22 l-14,6 v54 h-62 v-54 l-14,-6 z" fill="#C9B48A"/><path d="M155,48 v82" stroke="#9A8460" stroke-width="1.6"/></g>' +
      '<g class="gio-ao g2"><path d="M420,48 h60 l8,18 l-12,5 v70 h-52 v-70 l-12,-5 z" fill="#5A4A6A"/><path d="M432,90 h36" stroke="#7A6A8A" stroke-width="1.6"/></g>' +
      '<g class="gio-ao g3"><path d="M250,48 h40 v66 q-20,8 -40,0 z" fill="#8A3A2E"/></g>' +
      '<path d="M0,196 Q320,184 640,198 V220 H0 Z" fill="#2A2418"/></g></svg>';
    return s;
  }
  function tayChe() {
    var V = G.ve; if (!V) return '';
    var o = { kieu: 'buong', ao: '#8A5A36', vienAo: '#A8784C' };
    return '<svg viewBox="0 0 200 150" aria-hidden="true"><g stroke="' + INK + '" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">' +
      '<g transform="translate(72,74) rotate(205) scale(.26)">' + V.banTay(o) + '</g>' +
      '<g transform="translate(128,74) scale(-1,1) rotate(205) scale(.26)">' + V.banTay(o) + '</g></g></svg>';
  }
  // Gió thổi từ TRÁI hoặc PHẢI (báo trước nửa giây). Che đúng phía: ← / A hoặc giữ chuột nửa trái; → / D hoặc nửa phải.
  // Che sai phía thì như không che. Che khi không có gió thì tay úp làm ngạt lửa. Về sau có gió quẩn: đang thổi thì đổi chiều.
  M.giuNhang = function (secs) {
    return new Promise(function (res) {
      open('<h2>Cúng sào phơi áo</h2><div class="hint">Gió thổi từ <b>một phía</b>. Che đúng phía đó: <b>← / A</b> hoặc giữ chuột nửa trái, <b>→ / D</b> hoặc nửa phải. Úp tay khi không có gió thì <b>ngạt lửa</b>. Tắt 3 lần là hỏng lễ.</div>' +
        '<div class="gio" id="gio">' + gioNen() + '<div class="gio-lan"><i></i><i></i><i></i><i></i></div>' +
        '<div class="gio-bat"></div><div class="stk"></div><div class="gio-khoi"><i></i><i></i></div><div class="flame" id="fl"></div><div class="gust" id="gu">GIÓ!</div><div class="hands" id="hd">' + tayChe() + '</div></div>' +
        '<div class="mo-info gi-info"><span id="gi-t"></span><div class="gi-song" title="Lửa nhang"><i id="gi-l"></i></div><span id="gi-s">Nhang tắt: 0/3</span></div>', 'giop');
      var t = 0, life = 1, tat = 0, gust = 0, bao = 0, huong = 1, quan = false, nextG = 2 + Math.random() * 1.5, chuot = 0, last = 0, tt = '', xong = false;
      var box = $('gio');
      function ben(e) { var r = box.getBoundingClientRect(); return e.clientX < r.left + r.width / 2 ? -1 : 1; }
      box.onpointerdown = function (e) { chuot = ben(e); }; box.onpointermove = function (e) { if (chuot) chuot = ben(e); };
      box.onpointerup = box.onpointerleave = function () { chuot = 0; };
      function f(ts) {
        if (xong || !$('fl')) return;
        var dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts; t += dt;
        var che = chuot || (G.input.left && !G.input.right ? -1 : G.input.right && !G.input.left ? 1 : 0);
        var muon = t / secs;
        if (bao > 0) { bao -= dt; if (bao <= 0) { gust = 1.1 + Math.random() * (0.6 + muon); quan = muon > .4 && Math.random() < .45; G.audio.sfx('whoosh'); } }
        else if (gust > 0) {
          gust -= dt;
          if (quan && gust < 0.7) { quan = false; huong = -huong; G.audio.sfx('whoosh'); FX.rung(box); } // gió quẩn đổi chiều
          if (che !== huong) life -= dt * (0.95 + muon * 0.5);
          else life = Math.min(1, life + dt * 0.05);
          if (gust <= 0) nextG = t + 1.1 + Math.random() * (2.4 - muon);
        } else {
          if (t > nextG) { huong = Math.random() < .5 ? -1 : 1; bao = 0.55 - muon * 0.2; }
          if (che) life -= dt * 0.4; // úp tay làm ngạt
          else life = Math.min(1, life + dt * 0.22);
        }
        if (life <= 0) {
          tat++; life = 1; gust = 0; G.audio.sfx('bad'); $('gi-s').textContent = 'Nhang tắt: ' + tat + '/3';
          var c = FX.tam($('fl')); FX.hat(c.x, c.y, { n: 8, kieu: 'khoi', tam: 50, goc: -Math.PI / 2, toa: 1.4, mau: ['#9A9488', '#C8C2B4'] }); FX.rung(box);
          nextG = t + 1.5;
        }
        var thoi = gust > 0, dung = thoi && che === huong;
        var cls = (thoi ? 'thoi ' : '') + (bao > 0 ? 'bao ' : '') + (huong < 0 ? 'trai ' : 'phai ') + (dung ? 'che ' : '') + (che && !thoi ? 'ngat ' : '') + (life < .4 ? 'yeu' : '');
        if (cls !== tt) { tt = cls; box.className = 'gio ' + cls; }
        var gu = $('gu');
        gu.textContent = huong < 0 ? '→ GIÓ TRÁI' : 'GIÓ PHẢI ←';
        gu.style.opacity = thoi || bao > 0 ? 1 : 0;
        var hd = $('hd'); hd.style.opacity = che ? 1 : 0; hd.style.transform = 'translateX(' + (che * 46) + 'px) rotate(' + (che * 14) + 'deg)';
        $('fl').style.transform = 'scale(' + (0.3 + life * 0.7) + ') skewX(' + (thoi && !dung ? huong * -25 : 0) + 'deg)';
        $('gi-l').style.width = Math.max(0, life * 100).toFixed(0) + '%';
        $('gi-t').textContent = 'Còn ' + Math.max(0, Math.ceil(secs - t)) + ' giây';
        if (tat >= 3) { xong = true; close(); res(false); return; }
        if (t >= secs) { xong = true; G.audio.sfx('ok'); close(); res(true); return; }
        G.raf(f);
      }
      G.raf(f);
    });
  };

  // ---------- đọc vè theo nhịp: chọn đúng vế tiếp theo trước khi nhịp trôi qua ----------
  // ve: ['vế 1', 'vế 2', ...]; sai: các vế nhiễu
  M.ve = function (title, ve, sai, beat) {
    return new Promise(function (res) {
      var i = 0, loi = 0, t = 0, last = 0, done = false, gap = false;
      function opts() {
        var c = [ve[i]], pool = sai.slice().concat(ve.filter(function (x, k) { return k !== i; }));
        while (c.length < 3 && pool.length) c.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
        return c.sort(function () { return Math.random() - .5; });
      }
      function render() {
        gap = false;
        $('mg').innerHTML = '<h2>' + title + '</h2><div class="hint">Chọn vế tiếp theo trước khi tiếng gõ nhịp dừng. Đọc sai thì thứ ngoi lên có thể không phải Bống.</div>' +
          '<div class="ve-done">' + ve.slice(0, i).map(function (x, k) { return '<span' + (k === i - 1 ? ' class="moi"' : '') + '>' + x + '</span>'; }).join(' ') + '<span class="cur">…</span></div>' +
          '<div class="beat"><i id="ve-b"></i></div><div class="ve-opts">' + opts().map(function (x) { return '<button data-v="' + x + '">' + x + '</button>'; }).join('') + '</div>';
      }
      open('', 'vep'); render();
      $('mg').onclick = function (e) {
        var b = e.target.closest('[data-v]'); if (!b || done) return;
        var c = FX.tam(b);
        if (b.dataset.v === ve[i]) {
          G.audio.sfx('mo'); FX.hat(c.x, c.y, { n: 8, kieu: 'vang', tam: 40 });
          i++; t = 0; if (i >= ve.length) { done = true; G.audio.sfx('ok'); setTimeout(function () { close(); res(loi); }, 500); return; } render();
        }
        else { loi++; G.audio.sfx('bad'); b.disabled = true; FX.rung(b); FX.chu(c.x, c.y - 24, 'Sai vế', 'sai'); }
      };
      function f(ts) {
        if (done) return;
        var dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts; t += dt;
        var el = $('ve-b');
        if (el) { el.style.width = Math.max(0, 100 - t / beat * 100) + '%'; if (!gap && t / beat > .7) { gap = true; el.parentNode.classList.add('gap'); } }
        if (t >= beat) { loi++; t = 0; G.audio.sfx('bad'); FX.rung($('mg').querySelector('.ve-done')); render(); }
        G.raf(f);
      }
      G.raf(f);
    });
  };

  // ---------- chôn bốn lọ xương dưới bốn chân giường ----------
  M.chonLo = function () {
    return new Promise(function (res) {
      var LEGS = [[90, 70], [310, 70], [90, 210], [310, 210]], placed = 0, drag = null;
      var lo = '<svg viewBox="0 0 40 50" width="44" height="54"><g stroke="' + INK + '" stroke-width="2.4" stroke-linejoin="round">' +
        '<path d="M10,12 h20 v6 q8,6 6,18 q-2,10 -16,10 q-14,0 -16,-10 q-2,-12 6,-18 z" fill="#A8744E"/>' +
        '<path d="M6,30 q14,5 28,0" fill="none" stroke="#6E4428" stroke-width="1.6"/><path d="M9,22 q-2,8 0,14" fill="none" stroke="#E8C8A0" stroke-width="2" opacity=".7"/>' +
        '<rect x="12" y="5" width="16" height="8" rx="2" fill="#6E4428"/><path d="M11,14 h18" stroke="#B0180C" stroke-width="2.6"/><path d="M28,14 q4,4 2,9" fill="none" stroke="#B0180C" stroke-width="1.8"/></g></svg>';
      // phản gỗ nhìn từ trên: ván ghép, chiếu trải, bốn chân giường trên nền đất
      var V = G.ve, nen = '<svg viewBox="0 0 400 280" width="400" height="280"><defs><pattern id="mgDat" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#5A4430"/><circle cx="4" cy="5" r="1.2" fill="#3E2E20"/><circle cx="12" cy="11" r="1" fill="#7A6044"/></pattern></defs>' +
        '<rect width="400" height="280" fill="url(#mgDat)"/><g stroke="' + INK + '" stroke-width="3" stroke-linejoin="round">' +
        '<rect x="76" y="58" width="260" height="180" fill="#000" opacity=".3" stroke="none"/>' +
        (V ? V.khoi(70, 50, 260, 170, 10, V.GO.sam, { van: true }) : '<rect x="70" y="50" width="260" height="180" fill="#6A4428"/>') +
        (V ? V.chieu(92, 64, 216, 140) : '') + '</g></svg>';
      var h = '<h2>Chôn xương Bống</h2><div class="hint">Kéo từng lọ xương vào chỗ đất dưới bốn chân giường.</div><div class="lo-wrap"><div class="giuong">' + nen;
      LEGS.forEach(function (p, k) { h += '<div class="leg" data-l="' + k + '" style="left:' + p[0] + 'px;top:' + p[1] + 'px"></div>'; });
      h += '</div><div class="los">' + [0, 1, 2, 3].map(function (k) { return '<div class="lo" data-o="' + k + '">' + lo + '</div>'; }).join('') + '</div></div>';
      var p = open(h, 'lop');
      function grab(e) {
        var o = e.target.closest('[data-o]'); if (!o || o.classList.contains('used')) return;
        drag = { o: o, g: document.createElement('div') }; drag.g.className = 'drag-ghost'; drag.g.innerHTML = lo; document.body.appendChild(drag.g); o.classList.add('nhac'); mv(e);
      }
      function mv(e) { if (drag) { drag.g.style.left = e.clientX + 'px'; drag.g.style.top = e.clientY + 'px'; } }
      function up(e) {
        if (!drag) return;
        var d = drag; drag = null; d.g.remove(); d.o.classList.remove('nhac');
        var el = document.elementFromPoint(e.clientX, e.clientY), l = el && el.closest('[data-l]');
        if (l && !l.classList.contains('ok')) {
          l.classList.add('ok'); l.innerHTML = lo; d.o.classList.add('used'); placed++; G.audio.sfx('thud');
          var c = FX.tam(l); FX.hat(c.x, c.y + 10, { n: 10, kieu: 'bui', tam: 40, goc: -Math.PI / 2, toa: 2.6, mau: ['#7A6044', '#5A4430', '#A8906A'] });
          if (placed === 4) { G.audio.sfx('ok'); fin(); }
        }
      }
      function fin() { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); setTimeout(function () { close(); res(); }, 700); }
      p.onpointerdown = grab;
      window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up);
    });
  };
})();
