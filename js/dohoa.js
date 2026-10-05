// Đồ hoạ: lớp ánh sáng và khí quyển phủ lên mọi cảnh mà không đụng tới hình vẽ từng cảnh.
// Trong thế giới: chất liệu nền, bóng mây trôi, hơi xa mờ. Trên màn hình: tia nắng, chỉnh màu theo buổi,
// sương trôi có thị sai, hạt bụi / đom đóm phát sáng, hạt phim.
var G = window.G || (window.G = {});
G.dohoa = {};

(function () {
  var D = G.dohoa, $ = G.$;
  var NHA = { cung_bep: 1, cung_hau: 1, nha_det: 1, nha_bacu: 1 };
  var KEY = 'tpcc_dohoa';
  D.cao = (function () { try { var v = localStorage.getItem(KEY); if (v) return v === 'cao'; } catch (e) {} return !G.isTouch; })();

  // ---------- ảnh sinh bằng canvas, làm một lần ----------
  function canvas(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function rng(seed) { return function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }; }

  // hạt phim: nhiễu xám mịn
  function anhHat() {
    var n = 160, c = canvas(n, n), x = c.getContext('2d'), d = x.createImageData(n, n);
    // hạt sáng / tối rời rạc trên nền trong suốt: trộn thường được, không cần chế độ hoà trộn
    for (var i = 0; i < d.data.length; i += 4) { var v = Math.random(), sang = v > .5; d.data[i] = d.data[i + 1] = d.data[i + 2] = sang ? 255 : 0; d.data[i + 3] = Math.pow(Math.abs(v - .5) * 2, 3) * 60; }
    x.putImageData(d, 0, 0); return c.toDataURL();
  }
  // chất liệu: nhiễu mịn + mảng loang sáng tối, lặp liền mạch
  function anhChatLieu() {
    var n = 256, c = canvas(n, n), x = c.getContext('2d'), r = rng(42);
    x.fillStyle = '#808080'; x.fillRect(0, 0, n, n);
    for (var k = 0; k < 26; k++) {
      var cx = r() * n, cy = r() * n, rr = 20 + r() * 60, sang = r() < .5, a = .06 + r() * .1;
      for (var ox = -1; ox <= 1; ox++) for (var oy = -1; oy <= 1; oy++) {
        var g = x.createRadialGradient(cx + ox * n, cy + oy * n, 0, cx + ox * n, cy + oy * n, rr);
        g.addColorStop(0, sang ? 'rgba(255,255,255,' + a + ')' : 'rgba(0,0,0,' + a + ')'); g.addColorStop(1, 'rgba(128,128,128,0)');
        x.fillStyle = g; x.fillRect(cx + ox * n - rr, cy + oy * n - rr, rr * 2, rr * 2);
      }
    }
    var d = x.getImageData(0, 0, n, n);
    for (var i = 0; i < d.data.length; i += 4) { var v = (Math.random() - .5) * 34; d.data[i] += v; d.data[i + 1] += v; d.data[i + 2] += v; }
    x.putImageData(d, 0, 0); return c.toDataURL();
  }
  // sương: các mảng trắng mờ, lặp liền mạch theo chiều ngang
  function anhSuong(seed) {
    var w = 1200, h = 540, c = canvas(w, h), x = c.getContext('2d'), r = rng(seed);
    for (var k = 0; k < 34; k++) {
      var cx = r() * w, cy = r() * h, rx = 90 + r() * 220, a = .05 + r() * .12;
      [-w, 0, w].forEach(function (o) {
        x.save(); x.translate(cx + o, cy); x.scale(1, .38 + r() * .2);
        var g = x.createRadialGradient(0, 0, 0, 0, 0, rx);
        g.addColorStop(0, 'rgba(255,255,255,' + a + ')'); g.addColorStop(.6, 'rgba(255,255,255,' + (a * .45) + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
        x.fillStyle = g; x.beginPath(); x.arc(0, 0, rx, 0, 7); x.fill(); x.restore();
      });
    }
    return c.toDataURL();
  }
  // bóng mây: mảng tối mềm, lặp liền mạch hai chiều
  function anhMay() {
    var w = 1400, h = 1000, c = canvas(w, h), x = c.getContext('2d'), r = rng(7);
    for (var k = 0; k < 9; k++) {
      var cx = r() * w, cy = r() * h, rx = 160 + r() * 260;
      for (var j = 0; j < 5; j++) {
        var px = cx + (r() - .5) * rx, py = cy + (r() - .5) * rx * .5, pr = rx * (.4 + r() * .4);
        for (var ox = -1; ox <= 1; ox++) for (var oy = -1; oy <= 1; oy++) {
          var g = x.createRadialGradient(px + ox * w, py + oy * h, 0, px + ox * w, py + oy * h, pr);
          g.addColorStop(0, 'rgba(30,26,22,.22)'); g.addColorStop(.55, 'rgba(30,26,22,.13)'); g.addColorStop(1, 'rgba(30,26,22,0)');
          x.fillStyle = g; x.fillRect(px + ox * w - pr, py + oy * h - pr, pr * 2, pr * 2);
        }
      }
    }
    return c.toDataURL();
  }
  // tia nắng xiên từ góc trên, nhoè mềm
  function anhTia() {
    var w = 1200, h = 540, c = canvas(w, h), x = c.getContext('2d'), r = rng(19);
    var sx = -160, sy = -260;
    if ('filter' in x) x.filter = 'blur(14px)';
    for (var k = 0; k < 11; k++) {
      var a0 = 0.48 + k * 0.075 + r() * .03, rong = .018 + r() * .035, dai = 1200 + r() * 300, al = .16 + r() * .2;
      var g = x.createLinearGradient(sx, sy, sx + Math.cos(a0) * dai, sy + Math.sin(a0) * dai);
      g.addColorStop(0, 'rgba(255,226,170,' + al + ')'); g.addColorStop(.55, 'rgba(255,214,150,' + (al * .55) + ')'); g.addColorStop(1, 'rgba(255,214,150,0)');
      x.fillStyle = g; x.beginPath(); x.moveTo(sx, sy);
      x.lineTo(sx + Math.cos(a0 - rong) * dai, sy + Math.sin(a0 - rong) * dai);
      x.lineTo(sx + Math.cos(a0 + rong) * dai, sy + Math.sin(a0 + rong) * dai); x.closePath(); x.fill();
    }
    return c.toDataURL();
  }
  // đốm sáng tròn cho hạt
  function dom(mau, n) {
    var c = canvas(n, n), x = c.getContext('2d'), g = x.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.12, mau.replace('A', '1')); g.addColorStop(.4, mau.replace('A', '.35')); g.addColorStop(1, mau.replace('A', '0'));
    x.fillStyle = g; x.fillRect(0, 0, n, n); return c;
  }

  var IMG = {}, SPR = {};
  function chuanBi() {
    if (IMG.hat) return;
    IMG.hat = anhHat(); IMG.tex = anhChatLieu(); IMG.s1 = anhSuong(3); IMG.s2 = anhSuong(11); IMG.may = anhMay(); IMG.tia = anhTia();
    SPR.vang = dom('rgba(255,222,150,A)', 48); SPR.dom = dom('rgba(214,255,120,A)', 64); SPR.trang = dom('rgba(255,246,224,A)', 64);
    SPR.lam = dom('rgba(150,220,255,A)', 64); SPR.lua = dom('rgba(255,150,60,A)', 48);
    SPR.khoi = (function () { // bụi đất: đốm mềm không có lõi sáng
      var n = 64, c = canvas(n, n), x = c.getContext('2d'), g = x.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
      g.addColorStop(0, 'rgba(196,178,150,.6)'); g.addColorStop(.5, 'rgba(176,156,128,.24)'); g.addColorStop(1, 'rgba(160,140,112,0)');
      x.fillStyle = g; x.fillRect(0, 0, n, n); return c;
    })();
  }

  // ---------- dựng các lớp trên sân khấu ----------
  var el = {}, cv, ctx;
  function dung() {
    chuanBi();
    var st = $('stage');
    function div(id, html, after) { var d = document.createElement('div'); d.id = id; d.innerHTML = html || ''; after.parentNode.insertBefore(d, after.nextSibling); return d; }
    el.suong = div('dh-suong', '<i class="s1"></i><i class="s2"></i>', $('world'));
    el.anh = div('dh-anh', '<i class="grade"></i><i class="tia"></i><i class="mat"></i><i class="ha"></i>', $('tint'));
    cv = document.createElement('canvas'); cv.id = 'dh-hat'; cv.width = G.VIEW_W; cv.height = G.VIEW_H; el.anh.parentNode.insertBefore(cv, el.anh.nextSibling);
    ctx = cv.getContext('2d');
    el.grain = document.createElement('div'); el.grain.id = 'dh-grain'; st.appendChild(el.grain);
    el.suong.querySelector('.s1').style.backgroundImage = 'url(' + IMG.s1 + ')';
    el.suong.querySelector('.s2').style.backgroundImage = 'url(' + IMG.s2 + ')';
    el.anh.querySelector('.tia').style.backgroundImage = 'url(' + IMG.tia + ')';
    el.grain.style.backgroundImage = 'url(' + IMG.hat + ')';
    st.classList.toggle('dh-cao', D.cao);
  }

  // kiểu cảnh: ngoài trời / trong nhà / ký ức
  function kieu(loc) { return loc.indexOf('ky_') === 0 ? 'ky' : (NHA[loc] ? 'nha' : 'ngoai'); }

  // lớp trong thế giới: dựng lại mỗi khi vào cảnh
  D.vao = function (loc) {
    if (!el.anh) dung();
    var S = G.S, L = G.LOCATIONS[loc], k = kieu(loc), ph = S.phase;
    var tex = document.createElement('div'); tex.className = 'dh-tex';
    tex.style.cssText = 'width:' + L.width + 'px;height:' + L.height + 'px;background-image:url(' + IMG.tex + ')';
    $('bg').appendChild(tex);
    var fg = '';
    if (k === 'ngoai' && (ph === 'chieu' || ph === 'sang')) // bóng mây trôi chậm qua mặt đất và người
      fg += '<div class="dh-may" style="width:' + L.width + 'px;height:' + L.height + 'px"><i style="width:' + (L.width + 1400) + 'px;background-image:url(' + IMG.may + ')"></i></div>';
    if (k === 'ngoai') // phía xa mờ hơi nước
      fg += '<div class="dh-xa ph-' + ph + '" style="width:' + L.width + 'px;height:' + L.height + 'px"></div>';
    if (fg) $('fg').insertAdjacentHTML('beforeend', fg);
    ban.length = 0; // sang cảnh: bỏ hạt bắn ra của cảnh cũ
    taoHat(loc, k, ph);
    lop();
  };

  // lớp trên màn hình: đổi theo buổi và kiểu cảnh
  function lop() {
    var S = G.S; if (!S || !el.anh) return;
    var k = kieu(S.loc), ph = S.phase, key = k + '-' + ph;
    if (el._k === key) return; el._k = key;
    var st = $('stage');
    ['ngoai', 'nha', 'ky'].forEach(function (x) { st.classList.toggle('dh-' + x, x === k); });
    ['sang', 'chieu', 'toi', 'dem'].forEach(function (x) { st.classList.toggle('dh-' + x, x === ph); });
  }

  // ---------- hạt: bụi trong nắng, đom đóm, đốm sáng ký ức ----------
  var hat = [], t = 0;
  function taoHat(loc, k, ph) {
    hat = []; var L = G.LOCATIONS[loc], kind, n;
    if (G.reduceMotion) return;
    if (k === 'ky') { kind = 'trang'; n = 26; }
    else if (ph === 'dem') { kind = k === 'ngoai' || loc === 'nha_dighe' ? 'dom' : 'vang'; n = kind === 'dom' ? 26 : 14; }
    else if (ph === 'toi') { kind = k === 'ngoai' ? 'dom' : 'vang'; n = 12; }
    else { kind = 'vang'; n = k === 'nha' ? 40 : 34; }
    if (!D.cao) n = Math.round(n * .5);
    for (var i = 0; i < n; i++) hat.push({
      x: Math.random() * L.width, y: Math.random() * L.height, kind: kind,
      r: kind === 'dom' ? 9 + Math.random() * 7 : kind === 'trang' ? 10 + Math.random() * 18 : 3 + Math.random() * 4,
      vx: (Math.random() - .5) * (kind === 'dom' ? 22 : 8), vy: kind === 'trang' ? -6 - Math.random() * 8 : (Math.random() - .5) * 6,
      ph: Math.random() * 6.28, tw: .6 + Math.random() * 1.6
    });
  }
  function veHat(dt) {
    if (!ctx) return;
    if (cv.width !== G.VIEW_W) cv.width = G.VIEW_W;
    ctx.clearRect(0, 0, cv.width, cv.height);
    var S = G.S; if (!S || !$('title').hidden) { ban.length = 0; return; }
    if (hat.length) veNen(dt, S);
    if (ban.length) veBan(dt);
  }
  function veNen(dt, S) {
    t += dt;
    var W = G.world, z = W.zoom, L = G.LOCATIONS[S.loc], soi = $('stage').classList.contains('soi');
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < hat.length; i++) {
      var p = hat[i];
      p.x += (p.vx + Math.sin(t * .7 + p.ph) * (p.kind === 'dom' ? 18 : 5)) * dt;
      p.y += (p.vy + Math.cos(t * .5 + p.ph * 1.3) * (p.kind === 'dom' ? 12 : 4)) * dt;
      if (p.x < -20) p.x += L.width + 40; if (p.x > L.width + 20) p.x -= L.width + 40;
      if (p.y < -20) p.y += L.height + 40; if (p.y > L.height + 20) p.y -= L.height + 40;
      var sx = (p.x - W.camX) * z, sy = (p.y - W.camY) * z;
      if (sx < -40 || sy < -40 || sx > cv.width + 40 || sy > cv.height + 40) continue;
      var nhay = .5 + .5 * Math.sin(t * p.tw * 2 + p.ph), a, spr = SPR[p.kind === 'dom' ? (soi ? 'lam' : 'dom') : p.kind];
      if (p.kind === 'dom') a = Math.pow(nhay, 3) * .95;
      else if (p.kind === 'trang') a = .12 + nhay * .18;
      else a = (S.phase === 'dem' ? .12 : .22) + nhay * .35;
      var rr = p.r * z;
      ctx.globalAlpha = a; ctx.drawImage(spr, sx - rr, sy - rr, rr * 2, rr * 2);
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // ---------- hạt bắn ra (kỹ năng): toạ độ thế giới, có độ cao h, trọng lực, rơi nằm trên đất ----------
  // G.dohoa.phun(kind, x, y, o): x, y là chân trên mặt đất; o: h, vx, vy, vh, g, life, r, nam (giây nằm trên đất), mau, a...
  // kind: gao (hạt gạo), muoi (tinh thể muối), dat (cục đất), bui (bụi / khói, to dần), tan (tàn lửa), tro (tàn tro),
  //       hon (đốm hồn xanh), xeo (tia xèo), vong (vòng sóng: r0 → r1, det = tỉ lệ dẹt; 1 là vòng tròn đứng)
  var ban = [], MAX_BAN = 360, SANG = { tan: 1, hon: 1, xeo: 1 };
  D.phun = function (kind, x, y, o) {
    o = o || {};
    if (ban.length >= MAX_BAN) ban.shift();
    var p = { k: kind, x: x, y: y, h: o.h || 0, vx: o.vx || 0, vy: o.vy || 0, vh: o.vh || 0, g: o.g || 0, t: -(o.tre || 0), life: o.life || 1,
      r: o.r || 3, rot: o.rot !== undefined ? o.rot : Math.random() * 6.28, vr: o.vr || 0, nam: o.nam || 0, mau: o.mau, a: o.a !== undefined ? o.a : 1,
      keo: o.keo || 0, ph: Math.random() * 6.28, r0: o.r0 || 0, r1: o.r1 || 0, det: o.det || 1, w: o.w || 2, dat: false };
    ban.push(p); return p;
  };
  D.xoaHat = function () { ban.length = 0; };
  function veBan(dt) {
    var W = G.world, z = W.zoom, cx = W.camX, cy = W.camY, sang = false, i, p;
    for (i = ban.length - 1; i >= 0; i--) {
      p = ban[i]; p.t += dt;
      if (p.t >= p.life) { ban.splice(i, 1); continue; }
      if (p.t < 0) continue;
      if (p.keo) { var k = Math.max(0, 1 - p.keo * dt); p.vx *= k; p.vy *= k; if (!p.g) p.vh *= k; }
      if (!p.dat) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vh -= p.g * dt; p.h += p.vh * dt; p.rot += p.vr * dt;
        if (p.g && p.h <= 0) { // chạm đất: nảy nhẹ rồi nằm yên
          p.h = 0;
          if (p.vh < -90) { p.vh = -p.vh * .28; p.vx *= .45; p.vy *= .45; p.vr *= .5; }
          else { p.dat = true; p.vx = p.vy = p.vh = p.vr = 0; p.life = Math.min(p.life, p.t + p.nam + .5); }
        }
      }
    }
    // lượt 1: hạt thường; lượt 2: hạt phát sáng (cộng sáng)
    for (var luot = 0; luot < 2; luot++) {
      ctx.globalCompositeOperation = luot ? 'lighter' : 'source-over';
      for (i = 0; i < ban.length; i++) {
        p = ban[i]; if (p.t < 0) continue;
        var cuoi = p.life - p.t, a = p.a * Math.min(1, cuoi / Math.min(.5, p.life * .35), p.k === 'bui' || p.k === 'hon' ? p.t / .15 : 1);
        if (a <= .01) continue;
        var sx = (p.x - cx) * z, sy = (p.y - p.h - cy) * z;
        if (sx < -200 || sy < -200 || sx > cv.width + 200 || sy > cv.height + 200) continue;
        var k2 = p.k;
        if (k2 === 'muoi' && luot) { // muối lấp lánh dưới đèn
          var nh = Math.pow(.5 + .5 * Math.sin(p.t * 14 + p.ph), 6);
          if (nh > .05) { var rs = 5 * z; ctx.globalAlpha = a * nh; ctx.drawImage(SPR.trang, sx - rs, sy - rs, rs * 2, rs * 2); }
          continue;
        }
        if (!luot === !!SANG[k2]) continue;
        ctx.globalAlpha = a;
        if (k2 === 'gao' || k2 === 'muoi' || k2 === 'dat' || k2 === 'tro') {
          var c = Math.cos(p.rot) * z, s = Math.sin(p.rot) * z;
          ctx.setTransform(c, s, -s, c, sx, sy);
          ctx.fillStyle = p.mau || (k2 === 'gao' ? '#F1E8CF' : k2 === 'muoi' ? '#FFFFFF' : k2 === 'dat' ? '#4A3626' : '#3A3430');
          if (k2 === 'gao') ctx.fillRect(-2.2, -.9, 4.4, 1.8);
          else if (k2 === 'muoi') ctx.fillRect(-.9, -.9, 1.8, 1.8);
          else if (k2 === 'tro') ctx.fillRect(-p.r, -p.r * .5, p.r * 2, p.r);
          else ctx.fillRect(-p.r, -p.r * .8, p.r * 2, p.r * 1.6);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          if (p.h > 2 && k2 !== 'tro') { ctx.globalAlpha = a * .25; ctx.fillStyle = '#000'; ctx.fillRect((p.x - cx) * z - z, (p.y - cy) * z - .5 * z, 2 * z, z); } // bóng hạt trên đất
        } else if (k2 === 'bui') {
          var rb = p.r * (1 + 1.6 * p.t / p.life) * z;
          ctx.globalAlpha = a * .8; ctx.drawImage(p.mau === 'trang' ? SPR.trang : SPR.khoi, sx - rb, sy - rb * .7, rb * 2, rb * 1.4);
        } else if (k2 === 'vong') {
          var f = p.t / p.life, rr = (p.r0 + (p.r1 - p.r0) * (1 - Math.pow(1 - f, 2))) * z;
          ctx.globalCompositeOperation = 'lighter';
          ctx.beginPath(); ctx.ellipse(sx, sy, rr, rr * p.det, 0, 0, 6.2832);
          ctx.strokeStyle = p.mau || 'rgba(255,214,130,1)'; ctx.globalAlpha = a * (1 - f); ctx.lineWidth = p.w * (1 - f * .6) * z; ctx.stroke();
          ctx.globalCompositeOperation = luot ? 'lighter' : 'source-over';
        } else { // tan, hon, xeo: đốm sáng
          var spr = k2 === 'tan' ? SPR.lua : k2 === 'hon' ? SPR.lam : SPR.trang, rd = p.r * z;
          if (k2 === 'hon') { sx += Math.sin(p.t * 1.7 + p.ph) * 6 * z; ctx.globalAlpha = a * (.55 + .45 * Math.sin(p.t * 3 + p.ph)); }
          if (k2 === 'tan') ctx.globalAlpha = a * (.6 + .4 * Math.random());
          ctx.drawImage(spr, sx - rd, sy - rd, rd * 2, rd * 2);
        }
      }
    }
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  // ---------- mỗi khung hình ----------
  var sT = 0;
  D.tick = function (dt) {
    if (!el.anh) return;
    lop();
    veHat(dt);
    // sương trôi chậm, lệch theo camera để có chiều sâu
    sT += dt;
    var W = G.world, z = W.zoom, ox1 = ((W.camX * z * .55 + sT * 9) % 1200), ox2 = ((W.camX * z * .8 + sT * 16) % 1200);
    var s1 = el.suong.firstChild, s2 = el.suong.lastChild;
    s1.style.transform = 'translate3d(' + (-ox1).toFixed(1) + 'px,' + (-W.camY * z * .3 % 540).toFixed(1) + 'px,0)';
    s2.style.transform = 'translate3d(' + (-ox2).toFixed(1) + 'px,' + (-W.camY * z * .5 % 540).toFixed(1) + 'px,0)';
  };

  D.datChatLuong = function (cao) {
    D.cao = cao; try { localStorage.setItem(KEY, cao ? 'cao' : 'thap'); } catch (e) {}
    $('stage').classList.toggle('dh-cao', cao);
    if (G.S && G.world.ready) taoHat(G.S.loc, kieu(G.S.loc), G.S.phase);
  };

  // ---------- móc vào thế giới ----------
  var W = G.world;
  var enter0 = W.enter;
  W.enter = function (locId) { var r = enter0.apply(this, arguments); D.vao(G.S.loc); return r; };
  var dark0 = W.drawDark;
  W.drawDark = function (dt) { dark0.call(this, dt); D.tick(dt || 0); theoDoi(); };

  // Tự giảm đồ hoạ: đang ở đồ hoạ cao mà khung hình chậm kéo dài (trung bình > 30 ms trong 5 giây liền, tab đang hiện)
  // thì chuyển sang đồ hoạ thấp một lần và báo cho người chơi; họ vẫn bật lại được trong menu.
  var tdT = 0, tdN = 0, tdTong = 0, tdDaGiam = false;
  function theoDoi() {
    var n = performance.now(), dt = tdT ? n - tdT : 0; tdT = n;
    if (!D.cao || tdDaGiam || document.hidden || !dt || dt > 400) { tdN = tdTong = 0; return; } // bỏ qua lúc chuyển tab / tải cảnh
    tdN++; tdTong += dt;
    if (tdTong < 5000) return;
    var tb = tdTong / tdN; tdN = tdTong = 0;
    if (tb > 30) {
      tdDaGiam = true; D.datChatLuong(false);
      if (G.ui && G.ui.toast) G.ui.toast('Máy đang hơi chậm nên game đã <b>tự giảm đồ hoạ</b>. Bật lại trong Menu (Esc) → Đồ hoạ.', 5200);
    }
  }
})();
