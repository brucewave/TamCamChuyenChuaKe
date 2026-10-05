// Cảnh nguy hiểm: lính đi tuần có vùng nhìn, vong chỉ nghe tiếng động, chỗ nấp, giữ phím làm việc tại chỗ, chết và điểm lưu.
var G = window.G || (window.G = {});
G.danger = { active: false };

(function () {
  var D = G.danger, W = G.world, $ = G.$;
  var rings = [];

  // cfg: {guards:[{id, look, path:[[x,y]..], speed, range, fov}], ghosts:[{id, x, y, html, hear, speed}], hides:[[x,y,w,h]], onCaught(kind)}
  D.start = function (cfg) {
    D.cfg = cfg; D.active = true; D.guards = []; D.ghosts = []; D.hold = null; D.holding = false; rings = [];
    D.checkpoint = JSON.stringify(G.S);
    (cfg.guards || []).forEach(function (g) {
      var e = W.makeEnt(g.look, 'npc guard');
      var p0 = g.path[0];
      W.place(e, p0[0], p0[1], 'side', 1);
      var b = document.createElement('div'); b.className = 'alert'; b.hidden = true; e.el.appendChild(b);
      D.guards.push({ def: g, e: e, i: 1 % g.path.length, susp: 0, look: null, lookT: 0, dir: 0, bub: b });
    });
    (cfg.ghosts || []).forEach(function (g) {
      var el = document.createElement('div'); el.className = 'ent npc ghostent';
      el.innerHTML = '<div class="fl">' + g.html + '</div>'; $('ents').appendChild(el);
      var e = { el: el, fl: el.firstChild, x: 0, y: 0, view: 'front', flip: 1, scale: 1 };
      W.place(e, g.x, g.y);
      D.ghosts.push({ def: g, e: e, state: 'ngu', home: [g.x, g.y], tx: g.x, ty: g.y, t: 0 });
    });
  };
  D.stop = function () {
    D.active = false; D.hold = null; D.holding = false;
    (D.guards || []).forEach(function (g) { g.e.el.remove(); });
    (D.ghosts || []).forEach(function (g) { g.e.el.remove(); });
    D.guards = []; D.ghosts = []; rings = [];
  };

  // tiếng động: lính quay về phía tiếng, vong lao tới
  D.noise = function (x, y, r, why) {
    if (!D.active) return;
    rings.push({ x: x, y: y, r: 0, max: r, t: 0 });
    D.guards.forEach(function (g) {
      if (Math.hypot(g.e.x - x, g.e.y - y) < r + 120) { g.look = [x, y]; g.lookT = 2.6; }
    });
    D.ghosts.forEach(function (g) {
      if (g.state === 'lui') return;
      if (Math.hypot(g.e.x - x, g.e.y - y) < Math.max(r, g.def.hear || 200)) {
        if (g.state === 'ngu') { G.audio.sfx('stinger'); G.audio.lullaby(0.95); }
        g.state = 'san'; g.tx = x; g.ty = y; g.t = 0;
        g.e.el.classList.add('awake');
      }
    });
  };
  // rắc gạo muối: vong ở gần lùi lại 4 giây
  D.gaoMuoi = function () {
    var S = G.S;
    if (!S.inv || !(S.inv.gao > 0)) { G.ui.toast('Hết gạo muối. Mua ở hàng nước của bà cụ.'); return; }
    S.inv.gao--; G.audio.sfx('paper'); G.ui.hud();
    if (G.kynang) G.kynang.gaoMuoi(); // vốc gạo muối bay theo hướng mặt, rơi lấp lánh trên đất
    else { var fx = document.createElement('div'); fx.className = 'gaomuoi'; fx.style.transform = 'translate3d(' + S.x + 'px,' + S.y + 'px,0)'; $('ents').appendChild(fx); setTimeout(function () { fx.remove(); }, 900); }
    $('stage').classList.add('soi'); setTimeout(function () { if (!S.soiOn) $('stage').classList.remove('soi'); }, 10000); // dấu chân vô hình hiện 10 giây
    if (!D.active) return;
    D.ghosts.forEach(function (g) {
      if (Math.hypot(g.e.x - S.x, g.e.y - S.y) < 190) { g.state = 'lui'; g.t = 4; G.audio.sfx('whoosh'); if (G.kynang) G.kynang.xeo(g); }
    });
  };

  function seen(g, S) {
    var d = g.def, dx = S.x - g.e.x, dy = S.y - g.e.y, dist = Math.hypot(dx, dy);
    if (dist > (d.range || 190)) return 0;
    var a = Math.atan2(dy, dx), diff = Math.abs(((a - g.dir + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    if (diff > (d.fov || 60) * Math.PI / 360) return 0;
    for (var k = 1; k < 10; k++) if (W.blocked(g.e.x + dx * k / 10, g.e.y - 10 + dy * k / 10)) return 0;
    var hid = (D.cfg.hides || []).some(function (h) { return S.x > h[0] && S.x < h[0] + h[2] && S.y > h[1] && S.y < h[1] + h[3]; });
    if (hid && !W.moving) return 0;
    return dist < 90 ? 2.2 : 1;
  }

  D.update = function (dt) {
    var S = G.S;
    rings.forEach(function (r) { r.t += dt; r.r = r.max * Math.min(1, r.t / 0.5); });
    rings = rings.filter(function (r) { return r.t < 0.7; });
    // lính
    for (var i = 0; i < D.guards.length; i++) {
      var g = D.guards[i], d = g.def;
      if (g.lookT > 0) {
        g.lookT -= dt;
        g.dir = Math.atan2(g.look[1] - g.e.y, g.look[0] - g.e.x);
        W.place(g.e, g.e.x, g.e.y, 'side', Math.cos(g.dir) >= 0 ? 1 : -1);
        g.e.el.classList.remove('walk');
      } else {
        var t = d.path[g.i], dx = t[0] - g.e.x, dy = t[1] - g.e.y, dd = Math.hypot(dx, dy);
        if (dd < 3) g.i = (g.i + 1) % d.path.length;
        else {
          var st = Math.min(dd, (d.speed || 60) * dt);
          g.dir = Math.atan2(dy, dx);
          W.place(g.e, g.e.x + dx / dd * st, g.e.y + dy / dd * st, Math.abs(dx) > Math.abs(dy) ? 'side' : (dy > 0 ? 'front' : 'back'), dx >= 0 ? 1 : -1);
          g.e.el.classList.add('walk');
        }
      }
      var v = seen(g, S);
      g.susp = Math.max(0, g.susp + (v ? dt * v : -dt * 0.6));
      g.bub.hidden = g.susp < 0.12;
      g.bub.textContent = g.susp > 0.8 ? '!' : '?';
      g.bub.classList.toggle('hot', g.susp > 0.8);
      if (g.susp >= 1.25) { caught('linh', d); return true; }
    }
    // vong
    for (var j = 0; j < D.ghosts.length; j++) {
      var h = D.ghosts[j], spd = h.def.speed || 70;
      if (h.state === 'lui') {
        h.t -= dt;
        var ax = h.e.x - S.x, ay = h.e.y - S.y, al = Math.hypot(ax, ay) || 1;
        W.place(h.e, h.e.x + ax / al * 120 * dt, h.e.y + ay / al * 120 * dt);
        if (h.t <= 0) { h.state = 've'; }
      } else if (h.state === 'san') {
        var gx = h.tx - h.e.x, gy = h.ty - h.e.y, gd = Math.hypot(gx, gy);
        if (gd > 4) W.place(h.e, h.e.x + gx / gd * Math.min(gd, spd * dt), h.e.y + gy / gd * Math.min(gd, spd * dt), null, gx >= 0 ? 1 : -1);
        else { h.t += dt; if (h.t > 3) h.state = 've'; }
      } else if (h.state === 've') {
        var hx = h.home[0] - h.e.x, hy = h.home[1] - h.e.y, hd = Math.hypot(hx, hy);
        if (hd > 4) W.place(h.e, h.e.x + hx / hd * Math.min(hd, 40 * dt), h.e.y + hy / hd * Math.min(hd, 40 * dt));
        else { h.state = 'ngu'; h.e.el.classList.remove('awake'); }
      }
      if (h.state !== 'lui' && h.state !== 'ngu' && Math.hypot(h.e.x - S.x, h.e.y - S.y) < 30) { caught('vong', h.def); return true; }
    }
    if (D.cfg.tick && D.cfg.tick(dt)) return true; // luật riêng của cảnh (lửa, khói...)
    // giữ phím làm việc tại chỗ (chôn lông...)
    if (D.hold) {
      var o = D.hold, near = Math.hypot(o.x - S.x, (o.y - S.y) * 1.3) < 70;
      D.holding = near && (G.input.hold || D.mouseDown) && !W.moving;
      o.v = Math.max(0, o.v + (D.holding ? dt : -dt * 0.5));
      if (!near && o.v === 0) { D.hold = null; D.holding = false; }
      else if (o.v >= o.secs) { var cb = o.done; D.hold = null; D.holding = false; cb(); }
    }
    return false;
  };
  D.holdAt = function (t, secs, done) { D.hold = { x: t.x, y: t.y, secs: secs, v: 0, done: done }; G.ui.toast('Giữ **E / Space** (hoặc giữ chuột) để làm. Đứng yên.'); };

  // vẽ vùng nhìn, vòng tiếng động, vòng tiến độ: gọi sau lớp tối, toạ độ màn hình
  D.draw = function (ctx) {
    if (!D.active) return;
    var z = W.zoom;
    function sx(x) { return (x - W.camX) * z; } function sy(y) { return (y - W.camY) * z; }
    D.guards.forEach(function (g) {
      var d = g.def, r = (d.range || 190) * z, f = (d.fov || 60) * Math.PI / 360, x = sx(g.e.x), y = sy(g.e.y - 10);
      ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r, g.dir - f, g.dir + f); ctx.closePath();
      ctx.fillStyle = g.susp > 0.8 ? 'rgba(230,70,50,.30)' : (g.susp > 0.1 ? 'rgba(240,180,60,.26)' : 'rgba(255,220,140,.16)');
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,220,140,.35)'; ctx.lineWidth = 1.5; ctx.stroke();
    });
    rings.forEach(function (r) {
      ctx.beginPath(); ctx.arc(sx(r.x), sy(r.y), r.r * z, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(220,240,255,' + (0.5 * (1 - r.t / 0.7)).toFixed(2) + ')'; ctx.lineWidth = 2; ctx.stroke();
    });
    if (D.cfg.draw) D.cfg.draw(ctx, sx, sy, z);
    if (D.hold) {
      var o = D.hold, px = sx(G.S.x), py = sy(G.S.y - 110);
      ctx.beginPath(); ctx.arc(px, py, 16, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 14, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * o.v / o.secs);
      ctx.strokeStyle = '#E8B04A'; ctx.lineWidth = 5; ctx.stroke();
    }
  };
  D.lights = function () {
    if (!D.active) return [];
    return D.guards.filter(function (g) { return g.def.lantern !== false; }).map(function (g) { return { x: g.e.x + 10, y: g.e.y - 30, r: 110, flick: true }; }).concat(D.cfg.lights ? D.cfg.lights() : []);
  };

  function caught(kind, def) {
    var msg = (D.cfg.onCaught && D.cfg.onCaught(kind, def)) || (kind === 'linh' ? 'Thị vệ chém trước tâu sau.' : 'Bàn tay lạnh ngắt nắm lấy cổ chân.');
    G.die(msg);
  }

  // Chết: màn đen một dòng chữ, ghi sổ, tải lại điểm lưu của cảnh
  G.die = function (msg) {
    if (D.dying) return;
    D.dying = true;
    G.audio.sfx('stinger'); G.audio.sfx('heart', 0.2);
    var cp = D.checkpoint, cfg = D.cfg;
    D.stop();
    G.world.locked = true;
    var c = $('card');
    c.innerHTML = '<h2 style="color:#C9473A">Đăng đã chết</h2><p>' + G.ui.fmt(msg) + '</p><button class="primary">Thử lại từ đầu cảnh</button>';
    c.hidden = false; G.ui.modal = 'card';
    c.querySelector('button').onclick = function () {
      c.hidden = true; G.ui.modal = null; D.dying = false;
      var deaths = (G.S.deaths || 0) + 1;
      if (cp) { G.S = JSON.parse(cp); }
      G.S.deaths = deaths;
      G.world.locked = false;
      $('stage').classList.remove('soi');
      G.world.enter(G.S.loc, G.S.x, G.S.y);
      if (cfg && cfg.restart) cfg.restart();
      G.save();
    };
  };

  document.addEventListener('pointerdown', function () { D.mouseDown = true; });
  document.addEventListener('pointerup', function () { D.mouseDown = false; });
})();
