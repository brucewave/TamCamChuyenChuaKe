// Hiệu ứng kinh dị dùng chung trên sân khấu: mặt ma ló ra, dấu tay ướt áp lên màn, máu nhỏ từ trên xuống,
// tắt đèn chớp, hù (mặt áp sát kèm tiếng thét), đỏ dần quanh mép. Thêm tiếng động: gà gáy, gà cục tác, thì thầm, gõ, thét.
var G = window.G || (window.G = {});
G.hu = {};

(function () {
  var H = G.hu, $ = G.$, INK = G.INK;
  function lop() {
    var l = $('hu');
    if (!l) { l = document.createElement('div'); l.id = 'hu'; l.setAttribute('aria-hidden', 'true'); $('stage').appendChild(l); }
    return l;
  }
  function them(cls, html, ms, cha) {
    var e = document.createElement('div'); e.className = cls; e.innerHTML = html || '';
    (cha || lop()).appendChild(e);
    if (ms) setTimeout(function () { e.classList.add('tan'); setTimeout(function () { e.remove(); }, 700); }, ms);
    return e;
  }
  // mặt người con gái: da tái, hốc mắt đen, tóc xoã ướt, miệng hé
  H.matSvg = function (doMau) {
    return '<svg viewBox="0 0 200 240"><defs><radialGradient id="huDa" cx="50%" cy="42%" r="60%"><stop offset="0" stop-color="#E8E4D8"/><stop offset=".7" stop-color="#B8B8A8"/><stop offset="1" stop-color="#6A6E66"/></radialGradient></defs>' +
      '<path d="M20,240 Q10,120 40,60 Q100,-10 160,60 Q190,120 180,240 Z" fill="#050405"/>' +
      '<ellipse cx="100" cy="118" rx="54" ry="70" fill="url(#huDa)"/>' +
      '<path d="M46,96 Q60,40 100,36 Q150,40 156,100 Q140,70 120,64 L118,120 L106,64 Q92,62 86,120 L80,66 Q60,74 46,96 Z" fill="#050405"/>' +
      '<ellipse cx="80" cy="120" rx="13" ry="16" fill="#0A0606"/><ellipse cx="122" cy="120" rx="13" ry="16" fill="#0A0606"/>' +
      '<circle cx="82" cy="123" r="2.4" fill="#F4F0E6"/><circle cx="120" cy="123" r="2.4" fill="#F4F0E6"/>' +
      '<path d="M84,170 Q100,162 118,170 Q114,190 100,192 Q86,190 84,170 Z" fill="#1A0606"/>' +
      (doMau ? '<path d="M80,136 q-2,30 2,60M122,136 q3,24 0,44M96,190 q0,20 4,40" stroke="#7A0A06" stroke-width="5" fill="none" stroke-linecap="round"/>' : '') +
      '<path d="M40,240 Q40,150 56,110M160,240 Q164,150 146,108M70,240 Q66,190 72,150" stroke="#050405" stroke-width="10" fill="none"/></svg>';
  };
  // ló mặt tại vị trí % màn hình, to nhỏ theo co (1 = cao 26% màn)
  H.mat = function (x, y, ms, co) {
    if (G.reduceMotion) return;
    var e = them('hu-mat', H.matSvg(false), ms || 1400);
    e.style.left = x + '%'; e.style.top = y + '%'; e.style.setProperty('--co', co || 1);
    G.audio.sfx('whisper');
  };
  H.tay = function (n, mau) {
    var tay = '<svg viewBox="0 0 80 110"><path d="M18,108 L14,60 Q12,48 20,48 L24,70 L24,16 Q26,8 32,10 L34,62 L38,6 Q42,0 47,4 L46,62 L54,12 Q58,6 63,10 L58,66 L68,38 Q74,32 77,40 L66,86 Q60,104 46,108 Z" fill="' + (mau ? '#5A0A06' : '#6A7A78') + '" opacity=".72"/></svg>';
    for (var i = 0; i < (n || 3); i++) (function (i) {
      setTimeout(function () {
        var e = them('hu-tay', tay, 5200 - i * 400);
        e.style.left = (12 + Math.random() * 70) + '%'; e.style.top = (8 + Math.random() * 50) + '%';
        e.style.transform = 'rotate(' + (Math.random() * 50 - 25) + 'deg) scale(' + (0.9 + Math.random() * .5) + ')';
        G.audio.sfx('thud'); G.audio.sfx('splash', 0.02);
      }, i * 520);
    })(i);
  };
  H.mauRo = function (n) {
    for (var i = 0; i < (n || 6); i++) {
      var e = them('hu-mau', '', 7000);
      e.style.left = (6 + Math.random() * 88) + '%'; e.style.width = (6 + Math.random() * 10) + 'px';
      e.style.animationDelay = (Math.random() * 1.6).toFixed(2) + 's'; e.style.animationDuration = (2.4 + Math.random() * 2).toFixed(2) + 's';
    }
  };
  H.tat = function (ms) { var e = them('hu-tat', '', ms || 500); G.audio.sfx('whoosh'); return e; };
  H.do = function (muc) { var l = lop(); l.style.setProperty('--do', muc || 0); l.classList.toggle('do', !!muc); };
  H.nhay = function () { // hù: mặt áp sát, thét, rung, rồi mất
    if (G.reduceMotion) { H.chop(true); return; }
    var e = them('hu-nhay', H.matSvg(true), 520, $('stage'));
    G.audio.sfx('scream'); G.audio.sfx('stinger');
    var st = $('stage'); st.classList.remove('shake'); void st.offsetWidth; st.classList.add('shake');
    return e;
  };
  H.chop = function (do_) { var e = them('hu-chop' + (do_ ? ' do' : ''), '', 120); return e; };
  H.xoa = function () { var l = $('hu'); if (l) { l.innerHTML = ''; l.classList.remove('do'); } };

  // ---------- tiếng động thêm vào bảng SFX chung ----------
  document.addEventListener('DOMContentLoaded', function () {
    var k = G.audio._ && G.audio._(); if (!k) return;
    var SFX = k.SFX;
    function tone() { var kk = G.audio._(); return kk.tone.apply(null, arguments); }
    function noise() { var kk = G.audio._(); return kk.noise.apply(null, arguments); }
    function bus() { return G.audio._().sfxBus; }
    function ctx() { return G.audio._().ctx; }
    // gà trống gáy "ò ó o o": bốn âm, âm cuối kéo dài và rung, lọc dải cho giống tiếng họng
    SFX.rooster = function (t) {
      var c = ctx(); if (!c) return;
      [[520, 0.16, 1.15], [700, 0.16, 1.05], [820, 0.22, 0.98], [760, 0.85, 0.72]].forEach(function (s, i) {
        var t0 = t + [0, 0.2, 0.42, 0.7][i];
        var o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(), v = c.createOscillator(), vg = c.createGain();
        o.type = 'sawtooth'; o.frequency.setValueAtTime(s[0], t0); o.frequency.exponentialRampToValueAtTime(s[0] * s[2], t0 + s[1]);
        v.frequency.value = i === 3 ? 11 : 6; vg.gain.value = i === 3 ? 28 : 8; v.connect(vg); vg.connect(o.frequency);
        f.type = 'bandpass'; f.frequency.value = 1500; f.Q.value = 2.2;
        g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.16, t0 + 0.03); g.gain.setValueAtTime(0.16, t0 + s[1] * 0.7); g.gain.exponentialRampToValueAtTime(0.001, t0 + s[1]);
        o.connect(f); f.connect(g); g.connect(bus()); if (G.audio.verb) g.connect(G.audio.verb);
        o.start(t0); v.start(t0); o.stop(t0 + s[1] + 0.05); v.stop(t0 + s[1] + 0.05);
      });
    };
    // gà mái "cục cục cục… tác": tiếng ngắn đứt quãng, tiếng cuối cao và dài hơn
    SFX.hen = function (t) {
      var c = ctx(); if (!c) return;
      var nhip = [0, 0.16, 0.3, 0.42, 0.62];
      nhip.forEach(function (o, i) {
        var t0 = t + o, dai = i === 4 ? 0.22 : 0.07, f0 = i === 4 ? 980 : 560 + Math.random() * 80;
        var osc = c.createOscillator(), fl = c.createBiquadFilter(), g = c.createGain();
        osc.type = 'square'; osc.frequency.setValueAtTime(f0, t0); osc.frequency.exponentialRampToValueAtTime(f0 * (i === 4 ? 0.7 : 0.62), t0 + dai);
        fl.type = 'bandpass'; fl.frequency.value = i === 4 ? 1400 : 900; fl.Q.value = 3;
        g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t0 + dai);
        osc.connect(fl); fl.connect(g); g.connect(bus());
        osc.start(t0); osc.stop(t0 + dai + 0.02);
      });
    };
    SFX.ga_vo = function (t) { SFX.hen(t); SFX.hen(t + 0.5); noise(t + 0.1, 0.5, 0.25, 'bandpass', 2600, 1.5, bus()); }; // gà đập cánh loạn chuồng
    // thì thầm: tiếng xì xào lọc dải, ngắt quãng như có chữ
    SFX.whisper = function (t) {
      for (var i = 0; i < 9; i++) { var f = noise(t + i * 0.13 + Math.random() * 0.05, 0.1 + Math.random() * 0.08, 0.16, 'bandpass', 1800 + Math.random() * 2200, 5, bus(), true); }
    };
    SFX.knock = function (t) { [0, 0.42, 0.84].forEach(function (o) { tone(110, t + o, 0.12, 'sine', 0.7, bus(), { bend: 0.6, verb: true }); noise(t + o, 0.05, 0.4, 'lowpass', 700, 1, bus()); }); };
    // thét: giọng nữ cao, rè, có rung mạnh
    SFX.scream = function (t) {
      [880, 1175, 1320].forEach(function (f, i) { tone(f, t + i * 0.01, 0.9, 'sawtooth', 0.07, bus(), { bend: 0.7, vib: 14 + i * 3, a: 0.02, verb: true }); });
      noise(t, 0.9, 0.35, 'bandpass', 2400, 1.2, bus(), true);
    };
    SFX.heart2 = function (t) { tone(48, t, 0.16, 'sine', 1.1); tone(44, t + 0.24, 0.2, 'sine', 0.85); };
  });
})();

// tiếng gà quanh nhà: ban ngày gà mái cục tác ở sân, ban đêm thỉnh thoảng gà trống gáy lúc nửa đêm (nhà dì ghẻ)
(function () {
  var dem = 8;
  setInterval(function () {
    var S = G.S; if (!S || !G.world.ready || G.ui.modal || G.world.locked || !G.audio.on) return;
    dem -= 1;
    if (dem > 0) return;
    dem = 9 + Math.floor(Math.random() * 9);
    var nha = S.loc === 'nha_dighe' || S.loc === 'lang_duong' || S.loc === 'ky_gieng' || S.loc === 'ky_hoi';
    if (!nha) return;
    if (S.phase === 'dem') { if (S.loc === 'nha_dighe' && Math.random() < .35) G.audio.sfx('rooster'); }
    else G.audio.sfx(Math.random() < .8 ? 'hen' : 'rooster');
  }, 1000);
})();
