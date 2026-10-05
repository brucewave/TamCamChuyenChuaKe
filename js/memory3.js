// Ký ức 3: Nhặt thóc, đi hội. Tấm tách thóc gạo; chim sẻ xuống giúp rồi không chịu bay đi. Tấm đi hội, đánh rơi hài.
var G = window.G || (window.G = {});
G.memory3 = {};

(function () {
  var K = G.memory3, $ = G.$, W = G.world, INK = G.INK;

  // ---------- minigame tách thóc gạo ----------
  function nhatThoc(secs) {
    return new Promise(function (res) {
      var grains = [], sel = null, left = secs, over = false, chim = false;
      // rải hạt bên trong lòng nia (hình elip, toạ độ theo %), cách mép một khoảng và không chồng lên nhau
      for (var i = 0; i < 26; i++) {
        var x, y, thu = 0;
        do {
          var a = Math.random() * Math.PI * 2, u = Math.sqrt(Math.random()) * 0.8;
          x = 50 + Math.cos(a) * u * 50; y = 50 + Math.sin(a) * u * 50;
        } while (thu++ < 40 && grains.some(function (g) { return Math.abs(g.x - x) < 6 && Math.abs(g.y - y) < 8; }));
        grains.push({ t: i % 2 ? 'thoc' : 'gao', x: x, y: y, done: false });
      }
      var p = $('mg'); p.className = 'panel big thocp'; G.ui.open('mg', '');
      // hạt xoay ngẫu nhiên cho tự nhiên; thúng tre đan vẽ bằng SVG
      grains.forEach(function (g) { g.r = Math.round(Math.random() * 180); });
      function thung(loai) {
        var day = loai === 'thoc' ? '#C9A23A' : '#F6F2E6', hat = '';
        for (var k = 0; k < 14; k++) hat += '<ellipse cx="' + (22 + (k * 37) % 56) + '" cy="' + (30 + (k * 13) % 10) + '" rx="3.4" ry="1.8" fill="' + day + '" stroke="#2B1F1A" stroke-width=".8" transform="rotate(' + (k * 47 % 180) + ' ' + (22 + (k * 37) % 56) + ' ' + (30 + (k * 13) % 10) + ')"/>';
        return '<svg viewBox="0 0 100 90" aria-hidden="true"><g stroke="#2B1F1A" stroke-width="2.4" stroke-linejoin="round">' +
          '<ellipse cx="50" cy="84" rx="40" ry="5" fill="#000" opacity=".25" stroke="none"/>' +
          '<path d="M10,32 Q12,80 50,82 Q88,80 90,32 Z" fill="#B88A50"/>' +
          '<path d="M14,44 Q50,52 86,44M16,56 Q50,64 84,56M22,68 Q50,76 78,68" fill="none" stroke="#7A5530" stroke-width="1.6"/>' +
          '<path d="M30,34 L32,80M50,36 V82M70,34 L68,80" fill="none" stroke="#7A5530" stroke-width="1.2" opacity=".7"/>' +
          '<ellipse cx="50" cy="32" rx="40" ry="11" fill="#6E4A28"/><ellipse cx="50" cy="32" rx="34" ry="7.5" fill="' + (loai === 'thoc' ? '#9A7A30' : '#D8D0BA') + '" stroke-width="1.4"/>' +
          hat + '</g></svg>';
      }
      function render() {
        var n = grains.filter(function (g) { return g.done; }).length;
        var h = '<h2>Nhặt thóc ra thóc, gạo ra gạo</h2><div class="hint">Bấm một hạt rồi bấm đúng thúng. Hết nén nhang mà chưa xong thì phải nhặt lại.</div>' +
          '<div class="thoc-wrap' + (sel !== null ? ' cam' : '') + '"><div class="thung" data-b="thoc">' + thung('thoc') + '<span>Thúng thóc</span></div><div class="nong">';
        grains.forEach(function (g, k) {
          if (!g.done) h += '<i class="hat ' + g.t + (sel === k ? ' sel' : '') + '" data-g="' + k + '" style="left:' + g.x.toFixed(1) + '%;top:' + g.y.toFixed(1) + '%;--r:' + g.r + 'deg"></i>';
        });
        h += '</div><div class="thung" data-b="gao">' + thung('gao') + '<span>Thúng gạo</span></div></div>' +
          '<div class="mo-info thoc-info"><span>Đã nhặt <b>' + n + '/' + grains.length + '</b></span><div class="thoc-nhang"><i style="width:' + (left / secs * 100).toFixed(1) + '%"></i></div><span>Nhang còn <b>' + left + '</b> giây</span></div>' +
          (chim ? '' : '<button class="thoc-chim" data-a="chim">Đọc vè gọi chim sẻ xuống nhặt</button>');
        p.innerHTML = h;
      }
      render();
      function xong() {
        if (over) return; over = true; clearInterval(iv);
        G.audio.sfx('ok'); setTimeout(function () { G.ui.close('mg'); p.onclick = null; res(true); }, 500);
      }
      p.onclick = async function (e) {
        if (over) return;
        var g = e.target.closest('[data-g]'); if (g) { sel = +g.dataset.g; G.audio.sfx('blip'); render(); return; }
        var b = e.target.closest('[data-b]');
        if (b && sel !== null) {
          var c = G.mg.fx.tam(b), dung = grains[sel].t === b.dataset.b;
          if (dung) { grains[sel].done = true; sel = null; G.audio.sfx('tep'); }
          else { G.audio.sfx('bad'); b.classList.add('bad'); }
          render();
          if (dung) G.mg.fx.hat(c.x, c.y - 30, { n: 6, kieu: 'vang', tam: 30, mau: b.dataset.b === 'thoc' ? ['#E8C24A', '#C9A23A'] : ['#FFFFFF', '#F6F2E6'] });
          else { var b2 = p.querySelector('[data-b="' + b.dataset.b + '"]'); if (b2) { b2.classList.add('bad'); G.mg.fx.rung(b2); } G.mg.fx.chu(c.x, c.y - 50, 'Nhầm thúng', 'sai'); }
          if (grains.every(function (x) { return x.done; })) xong();
          return;
        }
        if (e.target.closest('[data-a="chim"]')) {
          chim = true; G.ui.close('mg');
          var loi = await G.mg.ve('Gọi chim sẻ', ['Rặt rặt xuống nhặt cho tao,', 'ăn mất hạt nào', 'thì tao đánh chết.'], ['bay đi bay lại,', 'cho tao hạt thóc,', 'về tổ mà ăn.'], 3.4);
          G.ui.open('mg'); p.className = 'panel big thocp';
          // chim sẻ sà xuống nhặt hết
          G.audio.sfx('whoosh');
          var rest = grains.filter(function (x) { return !x.done; });
          rest.forEach(function (x, k) { setTimeout(function () { x.done = true; G.audio.sfx('tep'); render(); if (grains.every(function (y) { return y.done; })) xong(); }, 120 * k + 300); });
          render();
        }
      };
      var iv = setInterval(function () {
        if (over) { clearInterval(iv); return; }
        left--; render();
        if (left <= 0) { over = true; clearInterval(iv); G.ui.close('mg'); p.onclick = null; res(false); }
      }, 1000);
    });
  }

  K.enter = function () {
    var S = G.S;
    S.memReturn = { loc: S.loc, x: S.x, y: S.y, phase: S.phase };
    S.mem = { step: 'tron' };
    $('stage').classList.remove('soi');
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.add('memory'); $('stage').classList.remove('lech', 'vo');
      W.enter('ky_hoi', 480, 640);
      G.audio.music('memory'); G.audio.ambience('ngay');
    }, async function () {
      W.locked = true;
      await G.ui.card('Ký ức', 'Ngày hội làng. Nhiều năm trước.');
      await G.ui.say([
        { text: 'Ngoài đường, trống hội đã nổi. Cám mặc áo mới, chạy ra cổng.', sfx: 'mo' },
        { who: 'Dì ghẻ', text: 'Còn mày thì ở nhà. Mẹ trộn thóc vào nong gạo rồi đấy. Nhặt cho xong, thóc ra thóc, gạo ra gạo, rồi hãy đi.' },
        { who: 'Tấm', text: '(Cả một nong… nhặt đến tối cũng không xong.)', cls: 'think' }
      ]);
      var dg = W.npcs.dighe; if (dg) await W.walkEnt(dg, -40, 560, 160);
      S.mem.step = 'nhat'; W.refresh(); W.locked = false; G.ui.hud();
    }, 1200);
  };

  K.npcs = function (S) {
    var m = S.mem || {};
    if (m.step === 'tron') return [{ id: 'dighe', look: G.LOOKS.dighe2, x: 380, y: 600, view: 'side', flip: 1 }];
    return [];
  };
  K.things = function (S) {
    var m = S.mem || {};
    if (m.step === 'nhat') return [{ id: 'nong', x: 480, y: 600, hit: [420, 520, 120, 60], label: 'Nhặt thóc gạo', quest: true }];
    return [];
  };
  K.objective = function (S) { return (S.mem || {}).step === 'nhat' ? 'Nhặt **thóc ra thóc, gạo ra gạo** trong nong giữa sân' : ''; };

  K.act = async function (id) {
    var S = G.S;
    if (id !== 'nong') return;
    var ok = await nhatThoc(60);
    if (!ok) { await G.ui.say([{ who: 'Tấm', text: '(Nhang tàn mất rồi. Phải nhặt lại từ đầu.)', cls: 'think' }]); return; }
    S.mem.step = 'xong'; W.locked = true; G.ui.hud();
    $('stage').classList.add('lech'); G.audio.music('memory_lech');
    await G.ui.say([
      { text: 'Nhặt xong rồi. Nhưng lũ chim sẻ [[không bay đi]].', img: 'chim_se' },
      { text: 'Chúng đậu kín bờ rào, mái bếp, cành khế. Không con nào kêu. Con nào cũng quay đầu nhìn Tấm.', img: 'chim_se' }
    ]);
    $('stage').classList.add('vo'); G.audio.sfx('stinger');
    await G.ui.say([
      { text: 'Một con nhỏ nhất mổ trộm một hạt gạo trong thúng.', img: 'chim_se' },
      { text: 'Cả đàn quay sang nó. [[Tiếng mổ dồn dập như mưa đá trên mái tôn.]]', img: 'chim_se', sfx: 'crack' },
      { text: 'Khi đàn chim bay đi, giữa sân chỉ còn lại một nhúm lông.', img: null },
      { who: 'Tấm', text: '(…Ăn mất hạt nào thì đánh chết. Mình đã bảo chúng như thế.)', cls: 'think' }
    ]);
    await G.ui.fade(function () {});
    await G.ui.card('Đi hội', 'Tấm chạy ra hội. Qua cầu, một chiếc hài tuột khỏi chân.');
    await G.ui.say([{ text: 'Chiếc hài thêu rơi xuống nước, trôi theo dòng về phía kinh thành.', img: 'hai_theu', sfx: 'splash' }]);
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.remove('memory', 'lech', 'vo');
      var r = S.memReturn; S.phase = r.phase; S.mem = null;
      W.enter(r.loc, r.x, r.y);
    }, function () { W.locked = false; G.ch2.afterKy3(); }, 1400);
  };
})();
