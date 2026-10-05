// Ký ức 4: Giỗ cha, trèo cau. Một màn không thể thắng.
var G = window.G || (window.G = {});
G.memory4 = {};

(function () {
  var K = G.memory4, $ = G.$, W = G.world, INK = G.INK;

  // trèo cau: giữ thăng bằng bằng ← → (hoặc A/D, hoặc giữ chuột nửa trái / nửa phải khung). Cây rung mạnh dần khi tiếng rìu bắt đầu.
  function treoCau() {
    return new Promise(function (res) {
      // vườn cau lúc chiều tà: cây cau thật (G.ve.cau), Tấm trèo nhìn từ sau lưng (sprite), kẻ dưới gốc hiện ra khi tiếng rìu bắt đầu
      var V = G.ve, R = V ? V.rng(31) : null;
      function tam(tu) { return G.sprite ? G.sprite.ve(G.LOOKS.tam, { view: 'back', tu: tu, x: 150, y: 34, k: .3 }) : '<circle cx="150" cy="0" r="10" fill="#2B1F1A"/><rect x="140" y="8" width="20" height="22" rx="4" fill="#C9B48A" stroke="' + INK + '" stroke-width="2"/>'; }
      var nen = '<defs><linearGradient id="mgChieu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A3050"/><stop offset=".55" stop-color="#B8604A"/><stop offset="1" stop-color="#E8A860"/></linearGradient></defs>' +
        '<rect width="300" height="360" fill="url(#mgChieu)"/><circle cx="70" cy="250" r="26" fill="#FFD9A0" opacity=".6"/>' +
        (V ? '<g stroke="' + INK + '" stroke-width="1.4" opacity=".45">' + V.cau(40, 320, 200, R) + V.cau(262, 330, 240, R) + '</g>' : '') +
        '<path d="M0,330 Q150,316 300,332 V360 H0 Z" fill="#3A3A28" stroke="' + INK + '" stroke-width="2"/>';
      var cay = V ? '<g stroke="' + INK + '" stroke-width="2" transform="translate(150,350) scale(1.5,1) translate(-150,-350)">' + V.cau(150, 350, 326, R) + '</g>' :
        '<rect x="144" y="20" width="12" height="330" fill="#9A9078" stroke="' + INK + '" stroke-width="3"/>';
      var ke = G.sprite ? G.sprite.ve(G.LOOKS.dighe, { view: 'side', tu: 'riu', x: 104, y: 356, k: .42, riu: true, nhan: true, bong: '#060508', id: 'cau-ke' }) : '';
      var p = $('mg'); p.className = 'panel big caup'; G.ui.open('mg',
        '<h2>Trèo cau hái quả cúng cha</h2><div class="hint">Giữ thăng bằng bằng <b>← →</b> (hoặc A / D, hoặc giữ chuột bên trái / bên phải khung). Giữ kim trong vùng xanh để trèo lên.</div>' +
        '<div class="cau-wrap"><svg viewBox="0 0 300 360" width="300" height="360" id="cau-svg">' + nen + '<g id="cau-bong" style="opacity:0">' + ke + '</g>' +
        '<g id="cau-tree" style="transform-origin:150px 350px">' + cay + '<g id="cau-tam">' + tam('leo') + '</g></g></svg>' +
        '<div class="cau-side"><div class="lean"><i class="zone"></i><i id="cau-kim"></i></div><div class="cau-cao"><i id="cau-thang"></i></div><div id="cau-cao">Độ cao: 0%</div><div id="cau-say" class="hint">&nbsp;</div></div></div>');
      var lean = 0, v = 0, h = 0, t = 0, last = 0, chops = 0, nextChop = 0, done = false, dir = 0;
      var keys = {};
      function kd(e) { if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.l = true; if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.r = true; }
      function ku(e) { if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.l = false; if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.r = false; }
      window.addEventListener('keydown', kd); window.addEventListener('keyup', ku);
      var svg = $('cau-svg');
      p.onpointerdown = function (e) { var r = p.getBoundingClientRect(); dir = e.clientX < r.left + r.width / 2 ? -1 : 1; };
      p.onpointerup = p.onpointerleave = function () { dir = 0; };
      function say(s) { $('cau-say').innerHTML = s; }
      function end() {
        done = true; window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku);
        p.onpointerdown = p.onpointerup = p.onpointerleave = null;
        G.ui.close('mg'); res();
      }
      function f(ts) {
        if (done) return;
        var dt = last ? Math.min(0.1, (ts - last) / 1000) : 0; last = ts; t += dt;
        var input = (keys.r ? 1 : 0) - (keys.l ? 1 : 0) + dir;
        var gio = Math.sin(t * 1.3) * 0.6 + Math.sin(t * 3.1) * 0.3;
        v += (gio * (0.5 + chops * 0.9) + input * 2.2 - lean * 0.4) * dt;
        v *= 0.96; lean = Math.max(-1.2, Math.min(1.2, lean + v * dt * 1.6));
        var ok = Math.abs(lean) < 0.35;
        if (ok && h < 100) h = Math.min(100, h + dt * 9);
        if (!ok && h > 0 && !chops) h = Math.max(0, h - dt * 4);
        // tiếng rìu bắt đầu khi đã trèo được hơn nửa
        if (h > 55 && !chops) { chops = 1; nextChop = t + 0.3; say('Dưới gốc có tiếng gì đó. Đều đều. Như tiếng mõ.'); $('cau-bong').style.opacity = '.92'; }
        if (chops && t >= nextChop) {
          G.audio.sfx('chop'); v += (Math.random() < .5 ? -1 : 1) * (0.8 + chops * 0.4); chops++; nextChop = t + Math.max(0.7, 1.5 - chops * 0.1);
          if (G.sprite) G.sprite.lai($('cau-ke'), 'chat');
          var c = G.mg.fx.tam($('cau-svg')); G.mg.fx.hat(c.x, c.y + 170, { n: 6, kieu: 'bui', tam: 30, goc: -Math.PI / 2, toa: 2, mau: ['#C9A35E', '#8A6A3A'] });
          G.mg.fx.rung($('cau-svg'));
          if (chops === 3) { say('Cây rung. Tấm ôm chặt thân cau. <b>Ai đang chặt cây?</b>'); $('cau-tam').innerHTML = tam('bam'); }
          if (chops === 6) say('Không giữ được nữa.');
        }
        $('cau-kim').style.left = (50 + lean / 1.2 * 50) + '%';
        $('cau-cao').textContent = 'Độ cao: ' + Math.round(h) + '%';
        $('cau-thang').style.width = h.toFixed(1) + '%';
        $('cau-kim').classList.toggle('lech', !ok);
        $('cau-tam').setAttribute('transform', 'translate(0,' + (330 - h * 2.9) + ')');
        $('cau-tree').style.transform = 'rotate(' + (lean * (6 + chops * 2)) + 'deg)';
        if (chops >= 8 || (chops > 2 && Math.abs(lean) >= 1.15)) {
          G.audio.sfx('fall'); $('cau-tree').style.transition = 'transform 1.2s cubic-bezier(.55,0,.9,.4)'; $('cau-tree').style.transform = 'rotate(' + (lean >= 0 ? 85 : -85) + 'deg)';
          done = true; setTimeout(function () { done = false; end(); }, 1300); return;
        }
        if (!chops && Math.abs(lean) >= 1.15) { lean = 0; v = 0; h = Math.max(0, h - 15); say('Suýt tuột. Bám lại.'); G.audio.sfx('bad'); }
        G.raf(f);
      }
      G.raf(f);
    });
  }

  K.enter = function () {
    var S = G.S;
    S.memReturn = { loc: S.loc, x: S.x, y: S.y, phase: S.phase };
    S.mem = { step: 'treo' };
    $('stage').classList.remove('soi');
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.add('memory'); $('stage').classList.remove('lech', 'vo');
      W.enter('ky_cau', 420, 560);
      G.audio.music(null); G.audio.ambience('ngay');
    }, async function () {
      W.locked = true;
      await G.ui.card('Ký ức', 'Ngày giỗ cha. Vườn cau sau nhà.');
      await G.ui.say([
        { who: 'Dì ghẻ', text: 'Trèo lên hái buồng cau mà cúng cha mày. Cau trên ngọn mới ngon.' },
        { who: 'Tấm', text: '(Cây cau này cao nhất vườn. Hồi bé cha vẫn cõng mình đứng dưới gốc.)', cls: 'think' }
      ]);
      W.locked = false; G.ui.hud();
    }, 1200);
  };
  K.npcs = function (S) { return (S.mem || {}).step === 'treo' ? [{ id: 'dighe', look: G.LOOKS.dighe2, x: 330, y: 560, view: 'side', flip: 1 }] : []; };
  K.things = function (S) { return (S.mem || {}).step === 'treo' ? [{ id: 'cay', x: 480, y: 470, hit: [440, 120, 80, 340], label: 'Trèo cau', quest: true }] : []; };
  K.objective = function (S) { return (S.mem || {}).step === 'treo' ? 'Trèo lên ngọn **cây cau cao nhất** hái quả cúng cha' : ''; };

  K.act = async function (id) {
    var S = G.S;
    if (id !== 'cay') return;
    S.mem.step = 'roi'; W.refresh();
    await treoCau();
    W.locked = true;
    $('stage').classList.add('vo');
    G.ui.fadeTo(function () {}, null, 300);
    await G.wait(900);
    await G.ui.card('', '');
    for (var i = 0; i < 3; i++) { G.audio.sfx('chop'); await G.wait(900); }
    await G.ui.say([
      { text: 'Ba nhát rìu nữa. [[Sau khi Tấm đã nằm dưới đất.]]', sfx: 'stinger' },
      { text: 'Trong tay Tấm còn nắm một quả cau. Vỏ quả cau có [[vết móng tay cào sâu]], dính máu.', img: 'qua_cau_mau' },
      { who: 'Đăng', text: '(Cô ấy còn sống khi rơi xuống. Ba nhát rìu ấy… là để cho chắc.)', cls: 'think', img: null }
    ]);
    G.audio.sfx('whoosh');
    G.ui.fadeTo(function () {
      $('stage').classList.remove('memory', 'lech', 'vo');
      var r = S.memReturn; S.phase = r.phase; S.mem = null;
      W.enter(r.loc, r.x, r.y);
    }, function () { W.locked = false; G.ch3.afterKy4(); }, 1400);
  };
})();
