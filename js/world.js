// Thế giới nhìn từ trên xuống: dựng cảnh, đi 8 hướng có va chạm, bấm để đi, camera, NPC, tương tác, bóng tối có đèn lồng.
var G = window.G || (window.G = {});
G.world = { camX: 0, camY: 0, zoom: 1.25, ready: false };

(function () {
  var W = G.world, $ = G.$;
  var SPEED = 220, SCALE = 0.5, REACH = 64, FOOT_W = 22, FOOT_H = 12;

  W.makeEnt = function (look, cls) {
    var el = document.createElement('div');
    el.className = 'ent ' + (cls || '');
    var h = '<div class="fl">';
    ['front', 'side', 'back'].forEach(function (v) { h += G.art.chibi(Object.assign({}, look, { view: v })); });
    el.innerHTML = h + '</div>';
    $('ents').appendChild(el);
    return { el: el, fl: el.firstChild, x: 0, y: 0, view: 'front', flip: 1, scale: SCALE };
  };
  W.place = function (e, x, y, view, flip) {
    e.x = x; e.y = y;
    if (view) e.view = view;
    if (flip) e.flip = flip;
    e.el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    e.el.style.zIndex = Math.round(y);
    e.fl.style.transform = 'scale(' + (e.flip * e.scale) + ',' + e.scale + ')';
    if (e._v !== e.view) { e.el.dataset.view = e.view; e._v = e.view; }
  };

  W.enter = function (locId, x, y) {
    var S = G.S, L = G.LOCATIONS[locId];
    var sc = G.scenes[locId](S);
    S.loc = locId;
    if (x !== undefined) { S.x = x; S.y = y; }
    W.sc = sc; W.solids = sc.solids; W.lights = sc.lights;
    $('world').style.width = L.width + 'px'; $('world').style.height = L.height + 'px';
    $('bg').innerHTML = sc.svg + (G.decor ? G.decor.nen(locId, sc, S) : ''); $('fg').innerHTML = sc.fg + (G.decor ? G.decor.hieuUng(locId, S) : ''); $('ents').innerHTML = '';
    sc.props.forEach(function (p) {
      var d = document.createElement('div');
      d.className = 'propw';
      d.style.cssText = 'left:' + p.x + 'px;top:' + p.y + 'px;z-index:' + Math.round(p.z);
      d.innerHTML = p.svg;
      $('ents').appendChild(d);
    });
    W.route = null; W.pending = null; W.exitAfter = null;
    W.player = W.makeEnt(G.story.playerLook(S), 'player');
    W.prompt = document.createElement('div'); W.prompt.className = 'prompt'; W.prompt.hidden = true; $('ents').appendChild(W.prompt);
    W.buildNpcs();
    if (blocked(S.x, S.y)) { var f = freeNear(S.x, S.y); S.x = f[0]; S.y = f[1]; }
    G.path.build(L);
    W.syncPlayer(false);
    W.ready = true;
    W.updateCamera(true);
    G.ui.hud();
    if (G.audio.canh) G.audio.canh(locId, S);
    if (G.story.onEnter) G.story.onEnter(locId);
  };
  // dựng lại cảnh tại chỗ (sau khi cờ đổi làm hình nền đổi)
  W.refresh = function () { W.enter(G.S.loc); };

  W.buildNpcs = function () {
    W.npcs = {}; W.follower = null;
    (G.story.npcs(G.S) || []).forEach(function (n) {
      var e;
      if (n.html) { // thực thể tự vẽ (vầng sáng, vật treo...)
        var el = document.createElement('div'); el.className = 'ent npc ' + (n.cls || '');
        el.innerHTML = '<div class="fl">' + n.html + '</div>'; $('ents').appendChild(el);
        e = { el: el, fl: el.firstChild, x: 0, y: 0, view: 'front', flip: 1, scale: 1 };
      } else e = W.makeEnt(n.look, 'npc ' + (n.cls || ''));
      e.def = n;
      if (n.follow && (n.atPlayer || n.x === undefined)) { n.x = G.S.x - 44 * (G.S.flip || 1); n.y = G.S.y + 6; n.view = 'side'; n.flip = G.S.flip || 1; }
      W.place(e, n.x, n.y, n.view || 'front', n.flip || 1);
      if (n.bubble) { var bb = document.createElement('div'); bb.className = 'bubble'; bb.textContent = n.bubble; e.el.appendChild(bb); bb.style.transform = 'translate(-50%,-112px)'; }
      W.npcs[n.id] = e;
      if (n.follow) { // người đi theo: đặt sau lưng người chơi
        W.follower = e;
      }
    });
    if (G.tt) G.tt.danhDau();
  };

  function blocked(x, y) {
    var ax = x - FOOT_W / 2, ay = y - FOOT_H, s = W.solids;
    for (var i = 0; i < s.length; i++) { var r = s[i]; if (ax < r[0] + r[2] && ax + FOOT_W > r[0] && ay < r[1] + r[3] && ay + FOOT_H > r[1]) return true; }
    for (var k in W.npcs) { var n = W.npcs[k]; if (!n.def.ghost && !n.def.follow && Math.abs(n.x - x) < 18 && Math.abs(n.y - y) < 8) return true; }
    return false;
  }
  W.blocked = function (x, y) { // dùng cho tìm đường: chỉ tính vật cản tĩnh
    var ax = x - FOOT_W / 2, ay = y - FOOT_H, s = W.solids;
    for (var i = 0; i < s.length; i++) { var r = s[i]; if (ax < r[0] + r[2] && ax + FOOT_W > r[0] && ay < r[1] + r[3] && ay + FOOT_H > r[1]) return true; }
    return false;
  };
  function freeNear(x, y) {
    for (var d = 8; d < 300; d += 8) for (var a = 0; a < 8; a++) {
      var nx = x + Math.cos(a / 8 * Math.PI * 2) * d, ny = y + Math.sin(a / 8 * Math.PI * 2) * d;
      if (!blocked(nx, ny)) return [nx, ny];
    }
    return [x, y];
  }

  W.syncPlayer = function (walking) {
    var S = G.S;
    W.place(W.player, S.x, S.y, S.view || 'front', S.flip || 1);
    W.player.el.classList.toggle('walk', !!walking);
  };

  W.viewW = function () { return G.VIEW_W / W.zoom; };
  W.viewH = function () { return G.VIEW_H / W.zoom; };
  W.updateCamera = function (snap) {
    var L = G.LOCATIONS[G.S.loc], vw = W.viewW(), vh = W.viewH();
    var tx = W.camFocus ? W.camFocus.x : G.S.x, ty = W.camFocus ? W.camFocus.y : G.S.y - 40;
    var cx = Math.max(0, Math.min(L.width - vw, tx - vw / 2));
    var cy = Math.max(0, Math.min(L.height - vh, ty - vh / 2));
    W.camX = snap ? cx : W.camX + (cx - W.camX) * 0.12;
    W.camY = snap ? cy : W.camY + (cy - W.camY) * 0.12;
    $('world').style.transform = 'translate3d(' + (-W.camX * W.zoom).toFixed(1) + 'px,' + (-W.camY * W.zoom).toFixed(1) + 'px,0) scale(' + W.zoom + ')';
  };

  // chỗ tương tác được: đồ vật + NPC
  W.things = function () {
    var list = (G.story.things(G.S) || []).slice();
    var co = [];
    for (var k in W.npcs) { var n = W.npcs[k]; if (n.def.label) { list.push({ id: n.def.id, x: n.x, y: n.y, label: n.def.label, npc: true }); co.push(n); } }
    // người không có nhãn đứng cạnh người có nhãn (một nhóm, vd. đám trẻ): bấm vào ai trong nhóm cũng được
    for (var k2 in W.npcs) {
      var m = W.npcs[k2]; if (m.def.label || m.def.ghost || m.def.html || m.def.follow) continue;
      var dai = co.filter(function (c) { return Math.hypot(c.x - m.x, c.y - m.y) < 120; })[0];
      if (dai) list.push({ id: dai.def.id, x: m.x, y: m.y, label: dai.def.label, npc: true, thay: true });
    }
    return list;
  };
  // mục tiêu còn trong cảnh và đang trong tầm với (cộng thêm them px) thì trả về mục tiêu đó
  function ganMucTieu(pt, them) {
    var S = G.S, best = null, bd = REACH + them; // cùng id có thể có nhiều chỗ đứng (cả nhóm): lấy chỗ gần nhất
    W.things().forEach(function (x) { if (x.id !== pt.id) return; var d = Math.hypot(x.x - S.x, (x.y - S.y) * 1.3); if (d < bd) { bd = d; best = x; } });
    return best;
  }
  function nearest() {
    var S = G.S, best = null, bd = REACH;
    W.things().forEach(function (t) { var d = Math.hypot(t.x - S.x, (t.y - S.y) * 1.3); if (d < bd) { bd = d; best = t; } });
    return best;
  }

  W.update = function (dt) {
    var S = G.S, L = G.LOCATIONS[S.loc], I = G.input;
    if (W.locked) { W.prompt.hidden = true; I.act = false; W.updateFollower(dt); W.updateCamera(false); if (G.story.tick) G.story.tick(dt); return; }
    var vx = (I.right ? 1 : 0) - (I.left ? 1 : 0), vy = (I.down ? 1 : 0) - (I.up ? 1 : 0);
    if (vx || vy) { W.route = null; W.pending = null; W.exitAfter = null; }
    else if (W.route && W.pending && ganMucTieu(W.pending, 0)) { // đã đủ gần người / vật đang tới: dừng lại nói chuyện luôn
      var pt0 = W.pending; W.route = null; W.pending = null; W.routeRun = false;
      W.syncPlayer(false); W.interact(ganMucTieu(pt0, 0)); return;
    }
    else if (W.route) {
      var p = W.route[0], ddx = p.x - S.x, ddy = p.y - S.y, dd = Math.hypot(ddx, ddy);
      if (dd < 3) {
        W.route.shift();
        if (!W.route.length) {
          W.route = null; W.routeRun = false;
          if (W.exitAfter) { var dir = W.exitAfter; W.exitAfter = null; W.goExit(dir); return; }
        }
      } else {
        var sp = Math.min(1, dd / (SPEED * dt));
        vx = ddx / dd * sp; vy = ddy / dd * sp;
        W.stuckT = (Math.abs(S.x - (W.lx || 0)) + Math.abs(S.y - (W.ly || 0)) < 0.4) ? (W.stuckT || 0) + dt : 0;
        W.lx = S.x; W.ly = S.y;
        if (W.stuckT > 0.5) {
          var ptk = W.pending, lk = ptk && ganMucTieu(ptk, 40);
          W.route = null; W.pending = null; W.stuckT = 0;
          if (lk) { W.syncPlayer(false); W.interact(lk); return; }
        }
      }
    }
    var len = Math.hypot(vx, vy), moving = len > 0.05;
    if (moving) {
      if (len > 1) { vx /= len; vy /= len; }
      var run = (G.input.shift || W.routeRun || G.input.runToggle) && !(G.danger && G.danger.holding);
      var spd = SPEED * (run ? 1.7 : 1);
      var nx = S.x + vx * spd * dt, ny = S.y + vy * spd * dt;
      if (nx < 20 && L.exits.left) { W.goExit('left'); return; }
      if (nx > L.width - 20 && L.exits.right) { W.goExit('right'); return; }
      if (!blocked(nx, S.y)) S.x = nx;
      if (!blocked(S.x, ny)) S.y = ny;
      if (Math.abs(vx) > Math.abs(vy) * 0.8) { S.view = 'side'; S.flip = vx > 0 ? 1 : -1; }
      else S.view = vy > 0 ? 'front' : 'back';
      W.stepT = (W.stepT || 0) - dt;
      if (W.stepT <= 0) { W.stepT = run ? 0.18 : 0.25; if (G.audio.buoc) G.audio.buoc(S.loc); else G.audio.sfx('step'); if (run && G.danger) G.danger.noise(S.x, S.y, 170, 'chạy'); }
    }
    W.moving = moving;
    W.syncPlayer(moving);
    W.player.el.classList.toggle('run', !!(moving && (I.shift || W.routeRun || I.runToggle) && !(G.danger && G.danger.holding))); // dáng chạy (css/nhanvat.css)
    W.updateFollower(dt);
    W.updateCamera(false);
    if (G.danger && G.danger.active && G.danger.update(dt)) return;
    if (G.story.tick) G.story.tick(dt);
    if (W.pending && !W.route) {
      var pt = W.pending; W.pending = null;
      var live = ganMucTieu(pt, 14);
      if (live) { W.interact(live); return; }
    }
    var t = nearest();
    if (W.near !== t && G.tt) G.tt.ganNhat(t);
    W.near = t;
    W.prompt.hidden = true; // không hiện chữ trên đầu: dấu ? / ! sáng lên khi đứng gần
    var ab = $('btn-act'); ab.classList.toggle('ready', !!t); ab.textContent = t ? t.label : '●';
    if (I.act) { I.act = false; if (t) W.interact(t); }
    edgeHints(L);
  };

  // người đi theo bám sau lưng, giữ khoảng cách, không chặn đường
  W.updateFollower = function (dt) {
    var e = W.follower, S = G.S;
    if (!e || e._script) return;
    var px = W.locked ? W.player.x : S.x, py = W.locked ? W.player.y : S.y;
    var dx = px - e.x, dy = py - e.y, d = Math.hypot(dx, dy);
    if (d > 58) {
      var sp = Math.min(SPEED * (d > 140 ? 1.25 : 0.98) * dt, d - 46);
      var view = Math.abs(dx) > Math.abs(dy) * 0.8 ? 'side' : (dy > 0 ? 'front' : 'back');
      W.place(e, e.x + dx / d * sp, e.y + dy / d * sp, view, dx > 0 ? 1 : -1);
      e.el.classList.add('walk');
    } else if (e.el.classList.contains('walk')) {
      e.el.classList.remove('walk');
      W.place(e, e.x, e.y, 'side', dx > 0 ? 1 : -1);
    }
  };

  W.goExit = function (dir) {
    var S = G.S, L = G.LOCATIONS[S.loc], to = G.LOCATIONS[L.exits[dir]];
    if (to.ch && (G.CH_ORDER || []).indexOf(S.chapter) < to.ch) { G.ui.toast('Đường vào rừng. Giờ chưa có việc gì ở đó.'); W.route = null; return; }
    if (G.story.canExit && !G.story.canExit(dir, to.id)) { W.route = null; return; }
    G.ui.fadeTo(function () {
      if (dir === 'left') { S.flip = -1; S.view = 'side'; W.enter(to.id, to.width - 50, Math.max(440, Math.min(560, S.y))); }
      else { S.flip = 1; S.view = 'side'; W.enter(to.id, 50, Math.max(440, Math.min(560, S.y))); }
    });
  };

  // bấm trúng người hay vật nào (toạ độ thế giới); người được ưu tiên, vùng bấm rộng hơn hình một chút
  W.hitAt = function (x, y) {
    var best = null, bd = 1e9;
    W.things().forEach(function (t) {
      var on;
      if (t.npc) on = Math.abs(x - t.x) < 40 && y > t.y - 130 && y < t.y + 22;
      else if (t.hit) on = x >= t.hit[0] - 10 && x <= t.hit[0] + t.hit[2] + 10 && y >= t.hit[1] - 10 && y <= t.hit[1] + t.hit[3] + 10;
      else on = Math.hypot(x - t.x, y - t.y) < 54;
      if (!on) return;
      var d = Math.hypot(x - t.x, y - t.y) - (t.npc ? 40 : 0);
      if (d < bd) { bd = d; best = t; }
    });
    return best;
  };
  W.toWorld = function (clientX, clientY) {
    var r = $('stage').getBoundingClientRect(), k = r.width / G.VIEW_W * W.zoom;
    return { x: (clientX - r.left) / k + W.camX, y: (clientY - r.top) / k + W.camY };
  };
  // đi tới mép cảnh để sang cảnh bên cạnh
  W.diToiMep = function (dir) {
    var S = G.S, L = G.LOCATIONS[S.loc];
    if (!L.exits[dir] || G.ui.isBusy() || W.locked) return;
    var tx = dir === 'left' ? 30 : L.width - 30, path = G.path.find(S.x, S.y, tx, S.y) || G.path.find(S.x, S.y, tx, 500);
    if (!path) { W.goExit(dir); return; }
    W.pending = null; W.exitAfter = dir; W.route = path; W.stuckT = 0;
  };

  W.clickAt = function (clientX, clientY) {
    if (!G.S || G.ui.isBusy() || W.locked) return;
    var S = G.S, L = G.LOCATIONS[S.loc];
    var r = $('stage').getBoundingClientRect(), k = r.width / G.VIEW_W * W.zoom;
    var x = (clientX - r.left) / k + W.camX, y = (clientY - r.top) / k + W.camY;
    var now = Date.now(); W.routeRun = now - (W.lastClick || 0) < 320; W.lastClick = now;
    var hit = W.hitAt(x, y);
    var tx = x, ty = y;
    W.exitAfter = null; W.pending = null;
    if (hit) {
      tx = hit.x; ty = hit.y; W.pending = hit;
      if (hit.npc) { var side = S.x < hit.x ? -1 : 1, cx = hit.x + side * 40; if (W.blocked(cx, hit.y + 4)) cx = hit.x - side * 40; tx = cx; ty = hit.y + 4; }
    }
    else if (x < 60 && L.exits.left) { tx = 30; W.exitAfter = 'left'; }
    else if (x > L.width - 60 && L.exits.right) { tx = L.width - 30; W.exitAfter = 'right'; }
    if (hit && Math.hypot(hit.x - S.x, (hit.y - S.y) * 1.3) < REACH) { W.route = null; W.pending = null; W.interact(hit); return; }
    var path = G.path.find(S.x, S.y, tx, ty);
    if (!path && hit) path = G.path.find(S.x, S.y, hit.x, hit.y);
    if (!path) { W.pending = null; W.exitAfter = null; return; }
    W.route = path; W.stuckT = 0;
    var m = document.createElement('div'); m.className = 'marker';
    m.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
    $('ents').appendChild(m); setTimeout(function () { m.remove(); }, 700);
  };

  function edgeHints(L) {
    // mũi tròn ở hai mép: bấm vào là tự đi sang cảnh bên cạnh, tên cảnh chỉ để trong nhãn đọc màn hình
    ['left', 'right'].forEach(function (dir) {
      var el = $(dir === 'left' ? 'edge-l' : 'edge-r'), to = L.exits[dir], key = to || '';
      el.hidden = !to;
      if (el._k !== key) { el._k = key; if (to) { var n = G.LOCATIONS[to].name; el.setAttribute('aria-label', 'Sang ' + n); el.title = n; } }
    });
  }

  W.interact = function (t) {
    W.route = null;
    var S = G.S;
    if (t.npc) { var n = W.npcs[t.id]; if (n) { S.view = 'side'; S.flip = n.x > S.x ? 1 : -1; if (!n.def.fixedView) W.place(n, n.x, n.y, 'side', n.x > S.x ? -1 : 1); } }
    W.syncPlayer(false);
    if (t.door) { var d = t.door; if (G.audio.them) G.audio.them('cua'); G.ui.fadeTo(function () { S.view = d.view || 'front'; W.enter(d.to, d.x, d.y); }, null, 600); return; }
    if (t.npc && G.tt && G.tt.hoi(t)) return; // người: hỏi chọn chuyện thường hay chuyện đang điều tra
    G.story.act(t.id, t);
  };

  // ---------- cảnh dàn dựng: đi bộ theo kịch bản ----------
  W.walkEnt = function (e, x, y, speed) {
    return new Promise(function (res) {
      var sp = speed || 140, last = performance.now();
      e.el.classList.add('walk'); e._script = true;
      function f() {
        var now = performance.now(), dt = Math.min(1, (now - last) / 1000); last = now;
        var dx = x - e.x, dy = y - e.y, d = Math.hypot(dx, dy);
        if (d < 2) { e.el.classList.remove('walk'); e._script = false; W.place(e, x, y); res(); return; }
        var st = Math.min(d, sp * dt);
        var view = Math.abs(dx) > Math.abs(dy) * 0.8 ? 'side' : (dy > 0 ? 'front' : 'back');
        W.place(e, e.x + dx / d * st, e.y + dy / d * st, view, dx > 0 ? 1 : (dx < 0 ? -1 : e.flip));
        G.raf(f);
      }
      f();
    });
  };
  W.walkPlayer = function (x, y, speed) {
    var S = G.S, e = W.player;
    return W.walkEnt(e, x, y, speed).then(function () { S.x = x; S.y = y; S.view = e.view; S.flip = e.flip; });
  };
  W.shake = function () {
    if (G.reduceMotion) return; var st = $('stage'); st.classList.remove('shake'); void st.offsetWidth; st.classList.add('shake'); };

  // ---------- bóng tối ban đêm: tô tối cả màn, khoét lỗ sáng quanh đèn ----------
  var flickT = 0;
  W.drawDark = function (dt) {
    var c = $('dark'), ctx = c.getContext('2d'), S = G.S;
    ctx.clearRect(0, 0, c.width, c.height);
    if (S.phase !== 'dem' || S.loc.indexOf('ky_') === 0) return;
    flickT += dt;
    ctx.globalCompositeOperation = 'source-over';
    var soi = $('stage').classList.contains('soi');
    var a = soi ? 0.5 : (W.darkAlpha !== undefined ? W.darkAlpha : 0.86);
    // trời đêm xanh trăng, sáng hơn một chút ở phía trên (ánh trăng), sẫm dần xuống dưới
    var sky = ctx.createLinearGradient(0, 0, 0, c.height);
    sky.addColorStop(0, 'rgba(14,20,44,' + (a * 0.94) + ')'); sky.addColorStop(1, 'rgba(5,6,16,' + Math.min(1, a * 1.04) + ')');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = 'destination-out';
    var lights = (W.lights || []).concat(G.story.lights ? G.story.lights(S) : [], G.danger ? G.danger.lights() : []);
    lights.push({ x: S.x + 10 * (S.flip || 1), y: S.y - 30, r: W.lanternR || 150, flick: true, me: true });
    var lit = [];
    lights.forEach(function (l) {
      if (!l.r) return;
      var sx = (l.x - W.camX) * W.zoom, sy = (l.y - W.camY) * W.zoom, k = l.flick ? (0.94 + Math.sin(flickT * 9 + l.x) * 0.04 + Math.random() * 0.03) : 1, rr = l.r * W.zoom * k;
      if (!isFinite(sx) || !isFinite(sy) || !isFinite(rr) || rr <= 0) return;
      if (sx < -rr || sy < -rr || sx > c.width + rr || sy > c.height + rr) return;
      lit.push([sx, sy, rr, k, l]);
      // ánh sáng tắt dần mềm như nguồn sáng thật (gần tâm sáng hẳn, xa tắt nhanh)
      var g = ctx.createRadialGradient(sx, sy, 0, sx, sy, rr);
      g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.22, 'rgba(0,0,0,.96)'); g.addColorStop(0.45, 'rgba(0,0,0,.78)');
      g.addColorStop(0.7, 'rgba(0,0,0,.38)'); g.addColorStop(0.88, 'rgba(0,0,0,.1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, rr, 0, Math.PI * 2); ctx.fill();
    });
    // ánh lửa: màu cam ấm trùm vùng sáng, lõi sáng chói ở ngọn đèn
    ctx.globalCompositeOperation = 'lighter';
    lit.forEach(function (o) {
      var sx = o[0], sy = o[1], rr = o[2], k = o[3];
      var gw = ctx.createRadialGradient(sx, sy, 0, sx, sy, rr * 0.95);
      gw.addColorStop(0, 'rgba(255,160,70,' + (0.2 * k) + ')'); gw.addColorStop(0.5, 'rgba(255,120,50,' + (0.08 * k) + ')'); gw.addColorStop(1, 'rgba(255,110,40,0)');
      ctx.fillStyle = gw; ctx.fillRect(sx - rr, sy - rr, rr * 2, rr * 2);
      var cr = Math.max(10, rr * 0.16);
      var gc = ctx.createRadialGradient(sx, sy, 0, sx, sy, cr);
      gc.addColorStop(0, 'rgba(255,236,190,' + (0.55 * k) + ')'); gc.addColorStop(0.4, 'rgba(255,190,110,' + (0.22 * k) + ')'); gc.addColorStop(1, 'rgba(255,170,90,0)');
      ctx.fillStyle = gc; ctx.fillRect(sx - cr, sy - cr, cr * 2, cr * 2);
    });
    ctx.globalCompositeOperation = 'source-over';
    if (G.danger && G.danger.active) G.danger.draw(ctx);
  };

  W.tint = function () {
    var S = G.S, tn = $('tint'), bg;
    if (S.loc.indexOf('ky_') === 0) bg = 'transparent';
    else if (S.phase === 'chieu') bg = 'linear-gradient(180deg, rgba(240,140,60,.06), rgba(120,50,40,.10))'; // tia nắng vẽ ở G.dohoa
    else if (S.phase === 'sang') bg = 'radial-gradient(ellipse at 20% 0%, rgba(255,248,220,.25), transparent 60%), linear-gradient(180deg, rgba(210,220,230,.30), rgba(160,175,190,.14))';
    else bg = 'transparent';
    if (tn._bg !== bg) { tn._bg = bg; tn.style.background = bg; }
    $('stage').classList.toggle('night', S.phase === 'dem' && S.loc.indexOf('ky_') !== 0);
  };
})();
