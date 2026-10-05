// Âm thanh tự sinh bằng Web Audio, không cần file: nhạc ngũ cung, gió, dế, mõ, rìu, ru "ầu ơ".
var G = window.G || (window.G = {});
G.audio = { on: true };

(function () {
  var A = G.audio, ctx = null, master, musicBus, sfxBus, ambBus, noiseBuf;
  var mode = null, timer = null, nextT = 0, step = 0, amb = [];

  A.init = function () {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = A.on ? 0.9 : 0; master.connect(ctx.destination);
    musicBus = ctx.createGain(); musicBus.gain.value = 0.32; musicBus.connect(master);
    sfxBus = ctx.createGain(); sfxBus.gain.value = 0.8; sfxBus.connect(master);
    ambBus = ctx.createGain(); ambBus.gain.value = 0.35; ambBus.connect(master);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    var d = noiseBuf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    // bóng vang nhẹ cho không gian
    A.verb = makeVerb();
  };
  A.toggle = function () {
    A.on = !A.on;
    if (master) master.gain.setTargetAtTime(A.on ? 0.9 : 0, ctx.currentTime, 0.1);
    try { localStorage.setItem('tpcc_audio', A.on ? '1' : '0'); } catch (e) {}
    return A.on;
  };
  try { A.on = localStorage.getItem('tpcc_audio') !== '0'; } catch (e) {}

  function makeVerb() {
    var len = ctx.sampleRate * 2.2, b = ctx.createBuffer(2, len, ctx.sampleRate);
    for (var c = 0; c < 2; c++) { var d = b.getChannelData(c); for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    var cv = ctx.createConvolver(); cv.buffer = b;
    var g = ctx.createGain(); g.gain.value = 0.35; cv.connect(g); g.connect(master);
    return cv;
  }

  function env(g, t, a, peak, dec) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  }
  function tone(freq, t, dur, type, peak, bus, opts) {
    opts = opts || {};
    var o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
    if (opts.bend) o.frequency.exponentialRampToValueAtTime(freq * opts.bend, t + dur);
    if (opts.vib) { var l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = opts.vib; lg.gain.value = freq * 0.012; l.connect(lg); lg.connect(o.frequency); l.start(t); l.stop(t + dur + 0.1); }
    env(g, t, opts.a || 0.01, peak || 0.3, dur);
    o.connect(g); g.connect(bus || sfxBus);
    if (opts.verb && A.verb) g.connect(A.verb);
    o.start(t); o.stop(t + dur + 0.2);
  }
  function noise(t, dur, peak, ftype, freq, q, bus, verb) {
    var s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = ftype || 'lowpass'; f.frequency.value = freq || 800; f.Q.value = q || 1;
    env(g, t, 0.005, peak || 0.3, dur);
    s.connect(f); f.connect(g); g.connect(bus || sfxBus);
    if (verb && A.verb) g.connect(A.verb);
    s.start(t, Math.random()); s.stop(t + dur + 0.1);
    return f;
  }

  // ---------- tiếng động ----------
  var SFX = {
    mo: function (t) { tone(520, t, 0.18, 'sine', 0.5, sfxBus, { bend: 0.85, verb: true }); tone(1040, t, 0.06, 'triangle', 0.15); },
    chop: function (t) { noise(t, 0.25, 0.9, 'lowpass', 420, 2, sfxBus, true); tone(90, t, 0.3, 'sine', 0.8, sfxBus, { bend: 0.5 }); noise(t + 0.01, 0.08, 0.5, 'highpass', 2500); },
    thud: function (t) { tone(140, t, 0.2, 'sine', 0.6, sfxBus, { bend: 0.4 }); noise(t, 0.1, 0.3, 'lowpass', 600); },
    crack: function (t) { noise(t, 0.12, 0.7, 'highpass', 1800, 1, sfxBus, true); noise(t + 0.05, 0.3, 0.4, 'bandpass', 900, 3); },
    fall: function (t) {
      var f = noise(t, 1.6, 0.6, 'lowpass', 2400, 1, sfxBus, true);
      f.frequency.exponentialRampToValueAtTime(200, t + 1.5);
      tone(60, t + 1.3, 1.2, 'sine', 1, sfxBus, { bend: 0.5 }); noise(t + 1.3, 0.8, 0.9, 'lowpass', 300, 1, sfxBus, true);
    },
    stinger: function (t) { [196, 207.6, 277, 293.7].forEach(function (f, i) { tone(f, t + i * 0.02, 2.2, 'sawtooth', 0.09, sfxBus, { a: 0.05, verb: true, vib: 5 + i }); }); noise(t, 1.2, 0.25, 'bandpass', 3000, 4, sfxBus, true); },
    heart: function (t) { tone(55, t, 0.15, 'sine', 0.9); tone(50, t + 0.22, 0.18, 'sine', 0.7); },
    drip: function (t) { tone(1400, t, 0.08, 'sine', 0.25, sfxBus, { bend: 0.4, verb: true }); },
    splash: function (t) { noise(t, 0.6, 0.6, 'bandpass', 1200, 0.7, sfxBus, true); },
    bubble: function (t) { for (var i = 0; i < 4; i++) tone(400 + Math.random() * 500, t + i * 0.07, 0.07, 'sine', 0.15, sfxBus, { bend: 2 }); },
    crow: function (t) { [0, 0.35].forEach(function (o) { var f = noise(t + o, 0.28, 0.5, 'bandpass', 1100, 6, sfxBus, true); f.frequency.exponentialRampToValueAtTime(700, t + o + 0.28); }); },
    rooster: function (t) { tone(600, t, 0.18, 'sawtooth', 0.12, sfxBus, { bend: 1.5 }); tone(900, t + 0.2, 0.5, 'sawtooth', 0.12, sfxBus, { bend: 0.7, vib: 9 }); },
    hen: function (t) { for (var i = 0; i < 5; i++) tone(700 + Math.random() * 300, t + i * 0.11, 0.08, 'square', 0.06, sfxBus, { bend: 1.3 }); },
    blip: function (t) { tone(660 + Math.random() * 60, t, 0.03, 'triangle', 0.04); },
    clue: function (t) { tone(784, t, 0.25, 'triangle', 0.2, sfxBus, { verb: true }); tone(1175, t + 0.1, 0.4, 'triangle', 0.15, sfxBus, { verb: true }); },
    ok: function (t) { [523, 659, 784, 1046].forEach(function (f, i) { tone(f, t + i * 0.08, 0.5, 'triangle', 0.16, sfxBus, { verb: true }); }); },
    bad: function (t) { tone(200, t, 0.25, 'square', 0.08); tone(150, t + 0.12, 0.3, 'square', 0.08); },
    paper: function (t) { noise(t, 0.25, 0.25, 'highpass', 3000); },
    bell: function (t) { [1, 2.76, 5.4].forEach(function (m) { tone(660 * m, t, 2.2 / m, 'sine', 0.2 / m, sfxBus, { verb: true }); }); },
    whoosh: function (t) { var f = noise(t, 0.9, 0.4, 'bandpass', 300, 2, sfxBus, true); f.frequency.exponentialRampToValueAtTime(3000, t + 0.8); },
    step: function (t) { noise(t, 0.05, 0.08, 'lowpass', 500); },
    giggle: function (t) { for (var i = 0; i < 5; i++) tone(880 - i * 40, t + i * 0.09, 0.07, 'sine', 0.08, sfxBus, { verb: true, bend: 1.2 }); },
    tep: function (t) { tone(1600, t, 0.05, 'sine', 0.15, sfxBus, { bend: 0.6 }); noise(t, 0.15, 0.25, 'bandpass', 2000, 2); }
  };
  A.sfx = function (name, delay) {
    if (!ctx || !SFX[name]) return;
    SFX[name](ctx.currentTime + (delay || 0) + 0.01);
  };

  // Ru "ầu ơ": giọng hát trầm dựng bằng sóng sin có rung, ngũ cung, chậm và lệch.
  var RU = [[392, 1.2], [440, 0.6], [392, 0.6], [349, 1.4], [0, 0.4], [294, 0.8], [349, 0.8], [392, 1.6], [0, 0.6], [440, 0.5], [392, 0.5], [349, 0.6], [294, 2.0]];
  A.lullaby = function (detune) {
    if (!ctx) return;
    var t = ctx.currentTime + 0.05;
    RU.forEach(function (n) {
      if (n[0]) tone(n[0] * (detune || 1), t, n[1] * 1.05, 'sine', 0.13, sfxBus, { a: 0.15, vib: 5.5, verb: true });
      t += n[1];
    });
  };

  // ---------- nhạc nền theo cảnh ----------
  // ngũ cung Bắc (Đô Rê Fa Sol La)
  var P = [261.6, 293.7, 349.2, 392, 440, 523.3, 587.3, 698.5, 784];
  var SONGS = {
    // ngày: tiếng đàn bầu gẩy thưa, nhạc ngũ cung
    day: { bpm: 62, pat: [5, -1, 4, 3, -1, -1, 4, -1, 2, -1, 3, -1, -1, -1, 1, -1, 2, 3, -1, 4, -1, -1, 3, -1, 2, -1, 0, -1, -1, -1, -1, -1],
           voice: function (f, t) { tone(f, t, 1.6, 'sine', 0.22, musicBus, { vib: 4.5, a: 0.01, bend: 1.004 }); tone(f * 2, t, 0.4, 'triangle', 0.04, musicBus); },
           bass: [0, 0, 3, 3], drone: 0 },
    // đêm: nốt trầm thưa, lệch tông
    night: { bpm: 40, pat: [3, -1, -1, -1, 2, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1],
             voice: function (f, t) { tone(f / 2 * 1.012, t, 3.5, 'sine', 0.16, musicBus, { vib: 3, a: 0.3, verb: true }); }, drone: 65.4 },
    // ký ức: hát đồng dao kiểu hộp nhạc
    memory: { bpm: 96, pat: [4, 4, 3, -1, 4, 4, 3, -1, 2, 3, 4, 3, 2, -1, 1, -1, 2, 2, 3, -1, 4, 3, 2, -1, 1, 1, 0, -1, -1, -1, -1, -1],
              voice: function (f, t) { tone(f * 2, t, 0.5, 'triangle', 0.12, musicBus, { verb: true }); }, drone: 0 },
    // ký ức méo: cùng giai điệu, chậm và lệch
    memory_lech: { bpm: 58, pat: [4, 4, 3, -1, 4, 4, 3, -1, 2, 3, 4, 3, 2, -1, 1, -1],
                   voice: function (f, t) { tone(f * 2 * 0.97, t, 0.9, 'triangle', 0.1, musicBus, { verb: true, vib: 6 }); tone(f * 2 * 1.03, t + 0.05, 0.9, 'sine', 0.05, musicBus); }, drone: 58 },
    // căng thẳng: nhịp tim + nốt kéo
    tense: { bpm: 70, pat: [0, -1, -1, -1, 0, -1, -1, -1, 1, -1, -1, -1, 0, -1, -1, -1],
             voice: function (f, t) { SFX.heart(t); }, drone: 55 },
    title: { bpm: 44, pat: [4, -1, -1, 3, -1, -1, 2, -1, -1, -1, -1, -1, 1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1],
             voice: function (f, t) { tone(f, t, 3.2, 'sine', 0.18, musicBus, { vib: 4, a: 0.02, verb: true }); }, drone: 65.4 }
  };
  var droneNodes = null;
  function setDrone(f) {
    if (droneNodes) { var dn = droneNodes; dn.g.gain.setTargetAtTime(0, ctx.currentTime, 0.8); setTimeout(function () { dn.o.forEach(function (o) { o.stop(); }); }, 3000); droneNodes = null; }
    if (!f) return;
    var g = ctx.createGain(); g.gain.value = 0; g.connect(musicBus);
    var o1 = ctx.createOscillator(), o2 = ctx.createOscillator(); o1.frequency.value = f; o2.frequency.value = f * 1.5 * 1.004; o1.type = 'sine'; o2.type = 'sine';
    var g2 = ctx.createGain(); g2.gain.value = 0.35; o2.connect(g2); g2.connect(g); o1.connect(g);
    o1.start(); o2.start();
    g.gain.setTargetAtTime(0.18, ctx.currentTime, 2);
    droneNodes = { g: g, o: [o1, o2] };
  }
  A.music = function (m) {
    if (!ctx || m === mode) return;
    mode = m;
    if (timer) { clearInterval(timer); timer = null; }
    var song = SONGS[m];
    setDrone(song && song.drone);
    if (!song) return;
    step = 0; nextT = ctx.currentTime + 0.2;
    timer = setInterval(function () {
      var spb = 60 / song.bpm / 2;
      while (nextT < ctx.currentTime + 0.3) {
        if (song.tracks) song.tracks.forEach(function (tr) { var v = tr.pat[step % tr.pat.length]; if (v !== null && v !== undefined && v >= 0) tr.play(v, nextT, step); });
        var n = song.pat ? song.pat[step % song.pat.length] : -1;
        if (n >= 0) song.voice(P[n], nextT);
        if (song.bass && step % 8 === 0) tone(P[song.bass[(step / 8) % song.bass.length]] / 4, nextT, 2.5, 'sine', 0.12, musicBus, { a: 0.05 });
        nextT += spb; step++;
      }
    }, 100);
  };
  A.mode = function () { return mode; };
  // cho module nhạc chương dùng lại bộ tạo tiếng
  A._ = function () { return { ctx: ctx, tone: tone, noise: noise, musicBus: musicBus, sfxBus: sfxBus, ambBus: ambBus, SONGS: SONGS, SFX: SFX, P: P }; };

  // ---------- âm nền ----------
  A.ambience = function (kind) {
    if (!ctx) return;
    amb.forEach(function (n) { try { n.g.gain.setTargetAtTime(0, ctx.currentTime, 0.6); setTimeout(function () { n.s.stop(); }, 2500); } catch (e) {} });
    amb = [];
    if (kind === 'none') return;
    // gió
    var s = ctx.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
    var f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = kind === 'dem' ? 380 : 600; f.Q.value = 0.6;
    var lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 0.08; lg.gain.value = 200; lfo.connect(lg); lg.connect(f.frequency); lfo.start();
    var g = ctx.createGain(); g.gain.value = 0; g.gain.setTargetAtTime(kind === 'dem' ? 0.35 : 0.18, ctx.currentTime, 1.5);
    s.connect(f); f.connect(g); g.connect(ambBus); s.start();
    amb.push({ s: s, g: g });
  };
  // dế kêu và chim lẻ tẻ: gọi định kỳ từ vòng lặp
  var ambT = 0;
  A.tick = function (dt, phase) {
    if (!ctx || !A.on) return;
    ambT -= dt;
    if (ambT > 0) return;
    ambT = 0.4 + Math.random() * 1.2;
    var t = ctx.currentTime;
    if (phase === 'dem') { for (var i = 0; i < 3; i++) tone(4200 + Math.random() * 300, t + i * 0.05, 0.03, 'sine', 0.012, ambBus); }
    else if (Math.random() < 0.3) { tone(2200 + Math.random() * 800, t, 0.08, 'sine', 0.02, ambBus, { bend: 1.3 }); tone(2600, t + 0.1, 0.08, 'sine', 0.015, ambBus, { bend: 0.8 }); }
  };
})();
