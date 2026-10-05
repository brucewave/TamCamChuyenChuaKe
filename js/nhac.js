// Nhạc nền riêng từng chương (tự sáng tác, ngũ cung, tự sinh bằng Web Audio), âm nền theo nơi chốn, tiếng bước chân theo mặt đất.
var G = window.G || (window.G = {});

(function () {
  var A = G.audio;
  // ngũ cung: Đô Rê Fa Sol La qua ba quãng tám
  var N = [130.8, 146.8, 174.6, 196, 220, 261.6, 293.7, 349.2, 392, 440, 523.3, 587.3, 698.5, 784, 880];
  function K() { return A._(); }
  var _ = null; // điền khi ctx có

  // ---------- nhạc cụ ----------
  var I = {
    danBau: function (n, t, v) { var k = K(), f = N[n]; k.tone(f, t, 2.2, 'sine', 0.2 * (v || 1), k.musicBus, { vib: 5, a: 0.02, bend: 1.03, verb: true }); k.tone(f * 2, t, 0.5, 'triangle', 0.035, k.musicBus); },
    sao: function (n, t, v) { var k = K(), f = N[n] * 2; k.tone(f, t, 0.9, 'triangle', 0.09 * (v || 1), k.musicBus, { vib: 6, a: 0.08, verb: true }); k.noise(t, 0.3, 0.03, 'bandpass', f * 2, 6, k.musicBus); },
    luyen: function (n, t) { var k = K(), f = N[n] * 2; k.tone(f * 1.12, t, 0.08, 'triangle', 0.06, k.musicBus); k.tone(f, t + 0.08, 0.6, 'triangle', 0.08, k.musicBus, { vib: 7, verb: true }); }, // sáo luyến như chim
    mo: function (n, t) { var k = K(); k.tone(520 + n * 20, t, 0.14, 'sine', 0.22, k.musicBus, { bend: 0.85, verb: true }); },
    phach: function (n, t) { var k = K(); k.noise(t, 0.05, 0.16, 'highpass', 2600 + n * 200, 2, k.musicBus); },
    trong: function (n, t) { var k = K(); k.tone(70 + n * 6, t, 0.45, 'sine', 0.45, k.musicBus, { bend: 0.55 }); k.noise(t, 0.06, 0.12, 'lowpass', 400, 1, k.musicBus); },
    chieng: function (n, t, v) { var k = K(), f = N[n]; [1, 2.76, 5.4, 8.9].forEach(function (m, j) { k.tone(f * m, t, 3.2 / (j + 1), 'sine', 0.09 / (j + 1) * (v || 1), k.musicBus, { verb: true }); }); },
    nhi: function (n, t, v) { var k = K(), f = N[n]; k.tone(f, t, 1.6, 'sawtooth', 0.035 * (v || 1), k.musicBus, { vib: 6.5, a: 0.25, verb: true }); },
    hop: function (n, t) { var k = K(), f = N[n] * 4; k.tone(f, t, 0.7, 'triangle', 0.05, k.musicBus, { verb: true }); k.tone(f * 3.01, t, 0.2, 'sine', 0.012, k.musicBus); },
    tim: function (n, t) { var k = K(); k.tone(55, t, 0.14, 'sine', 0.55, k.musicBus); k.tone(50, t + 0.2, 0.16, 'sine', 0.42, k.musicBus); },
    cot: function (n, t) { var k = K(); k.noise(t, 0.09, 0.14, 'bandpass', 900 + n * 120, 8, k.musicBus); k.tone(300 + n * 30, t, 0.06, 'square', 0.03, k.musicBus); }, // khung cửi cót két
    tram: function (n, t) { var k = K(), f = N[n] / 2; k.tone(f, t, 4, 'sine', 0.14, k.musicBus, { a: 0.6, vib: 2.5, verb: true }); k.tone(f * 1.5 * 1.006, t, 4, 'sine', 0.05, k.musicBus, { a: 0.8 }); }
  };
  function tr(inst, pat) { return { pat: pat, play: function (n, t, st) { I[inst](n, t); } }; }
  var _x = -1; // nghỉ

  // ---------- bài nhạc (mỗi ô là một nửa phách) ----------
  var BAI = {
    // MỞ ĐẦU: chiều làng quê, đàn bầu thong thả; đêm trấn vong: mõ đều, đàn nhị kéo
    mo_dau_ngay: { bpm: 60, tracks: [tr('danBau', [9, _x, 8, _x, 7, _x, _x, _x, 8, _x, 9, _x, 11, _x, _x, _x, 9, _x, 8, 7, _x, 5, _x, _x, 7, _x, _x, _x, _x, _x, _x, _x]), tr('phach', [0, _x, _x, _x, _x, _x, _x, _x])] },
    mo_dau_dem: { bpm: 52, drone: 65.4, tracks: [tr('mo', [0, _x, _x, _x, 0, _x, _x, _x]), tr('nhi', [_x, _x, _x, _x, 7, _x, _x, _x, _x, _x, _x, _x, 6, _x, _x, _x, _x, _x, _x, _x, 5, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    // CHƯƠNG 1: vàng anh, sáo luyến như tiếng chim; đêm: tiếng sáo lạc giọng
    ch1_ngay: { bpm: 70, tracks: [tr('luyen', [11, _x, 10, _x, _x, _x, 12, _x, 11, _x, 9, _x, _x, _x, _x, _x, 10, _x, 9, _x, 8, _x, _x, _x, 9, _x, _x, _x, _x, _x, _x, _x]), tr('trong', [0, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x]), tr('danBau', [4, _x, _x, _x, _x, _x, _x, _x, 3, _x, _x, _x, _x, _x, _x, _x])] },
    ch1_dem: { bpm: 44, drone: 61.7, tracks: [tr('sao', [12, _x, _x, _x, _x, _x, 11, _x, _x, _x, _x, _x, _x, _x, _x, _x, 13, _x, _x, _x, 12, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x]), tr('chieng', [_x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, 2, _x, _x, _x])] },
    // CHƯƠNG 2: xoan đào, gõ gỗ, đàn bầu trầm; đêm: kẽo kẹt
    ch2_ngay: { bpm: 64, tracks: [tr('mo', [0, _x, 1, _x, _x, _x, 0, _x, _x, _x, 1, _x, 0, _x, _x, _x]), tr('danBau', [7, _x, _x, _x, 5, _x, 4, _x, _x, _x, _x, _x, 5, _x, 7, _x, 8, _x, _x, _x, 7, _x, 5, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    ch2_dem: { bpm: 40, drone: 58.3, tracks: [tr('cot', [0, _x, _x, _x, _x, _x, _x, _x, _x, _x, 2, _x, _x, _x, _x, _x]), tr('nhi', [5, _x, _x, _x, _x, _x, _x, _x, 4, _x, _x, _x, _x, _x, _x, _x, 3, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    // CHƯƠNG 3: khung cửi, nhịp go đều như máy dệt; đêm: nhịp go chậm, lời ru lạc
    ch3_ngay: { bpm: 84, tracks: [tr('cot', [0, _x, 1, _x, 0, _x, 1, _x]), tr('phach', [_x, _x, _x, 0, _x, _x, _x, 0]), tr('nhi', [9, _x, _x, _x, 8, _x, _x, _x, 7, _x, 8, _x, 9, _x, _x, _x, 11, _x, _x, _x, 9, _x, _x, _x, 8, _x, _x, _x, _x, _x, _x, _x])] },
    ch3_dem: { bpm: 46, drone: 55, tracks: [tr('cot', [0, _x, _x, _x, _x, _x, 1, _x, _x, _x, _x, _x, _x, _x, _x, _x]), tr('hop', [4, _x, 4, _x, 3, _x, _x, _x, 2, _x, 3, _x, 1, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    // CHƯƠNG 4: quả thị, chiêng ngân; đêm rằm, chợ âm: chiêng lệch tông
    ch4_ngay: { bpm: 56, tracks: [tr('chieng', [7, _x, _x, _x, _x, _x, _x, _x, 5, _x, _x, _x, _x, _x, _x, _x]), tr('sao', [_x, _x, 9, _x, 10, _x, _x, _x, _x, _x, 8, _x, 7, _x, _x, _x])] },
    ch4_dem: { bpm: 38, drone: 49, tracks: [tr('chieng', [3, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, 4, _x, _x, _x]), tr('tram', [2, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, 1, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    // CHƯƠNG 5: hộp nhạc lệch, tim đập; cao trào: trống dồn
    ch5_ngay: { bpm: 72, drone: 65.4, tracks: [tr('hop', [5, _x, 6, _x, 7, _x, 6, _x, 5, _x, 3, _x, _x, _x, _x, _x, 4, _x, 5, _x, 4, _x, 2, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    ch5_dem: { bpm: 60, drone: 55, tracks: [tr('tim', [0, _x, _x, _x, _x, _x, _x, _x]), tr('nhi', [_x, _x, _x, _x, 6, _x, _x, _x, _x, _x, _x, _x, 7, _x, _x, _x])] },
    // căng thẳng chung và cao trào
    nguy: { bpm: 76, drone: 55, tracks: [tr('tim', [0, _x, _x, _x, 0, _x, _x, _x]), tr('trong', [_x, _x, _x, _x, _x, _x, 1, _x]), tr('nhi', [_x, _x, _x, _x, _x, _x, _x, _x, 4, _x, _x, _x, _x, _x, _x, _x])] },
    cao_trao: { bpm: 96, drone: 49, tracks: [tr('trong', [0, _x, 0, _x, 1, _x, 0, 0]), tr('tim', [0, _x, _x, _x, 0, _x, _x, _x]), tr('nhi', [7, _x, _x, _x, 8, _x, _x, _x, 9, _x, _x, _x, 8, _x, 7, _x]), tr('chieng', [_x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, 2, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x])] },
    // các kết
    ket_sang: { bpm: 58, tracks: [tr('danBau', [7, _x, 8, _x, 9, _x, _x, _x, 11, _x, 9, _x, 8, _x, _x, _x, 9, _x, 8, _x, 7, _x, 5, _x, 7, _x, _x, _x, _x, _x, _x, _x]), tr('sao', [_x, _x, _x, _x, _x, _x, _x, _x, 12, _x, _x, _x, _x, _x, _x, _x])] },
    ket_toi: { bpm: 36, drone: 49, tracks: [tr('chieng', [2, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x, _x]), tr('hop', [_x, _x, _x, _x, 4, _x, 3, _x, _x, _x, 1, _x, _x, _x, _x, _x])] }
  };

  var gan = false;
  function nap() { if (gan || !A._ || !A._().ctx) return; Object.assign(A._().SONGS, BAI); gan = true; }
  // chọn bài theo chương: kind 'ngay' | 'dem' | 'nguy'
  A.ten = function (kind) {
    nap();
    var S = G.S || {}, ch = S.chapter || 'mo_dau';
    if (kind === 'nguy') return ch === 'ch5' ? 'cao_trao' : 'nguy';
    var t = ch + '_' + kind;
    return BAI[t] ? t : (kind === 'dem' ? 'night' : 'day');
  };
  var goc = A.music;
  A.music = function (m) { nap(); return goc(m); };

  // ---------- âm nền theo nơi chốn ----------
  var NUOC = ['lang_duong', 'cung_vuon', 'cung_gieng', 'bia_rung', 'ky_ruong'];
  var TRE = ['lang_duong', 'vuon_cau', 'nha_dighe', 'ky_gieng', 'ky_hoi', 'ky_cau'];
  var BEP = ['cung_bep', 'nha_bacu'];
  var nuocNode = null, loc = null, hen = 0;
  A.canh = function (l, S) {
    var k = A._ && A._(); if (!k || !k.ctx) return;
    loc = l;
    var can = NUOC.indexOf(l) >= 0;
    if (can && !nuocNode) { // tiếng nước lăn tăn
      var c = k.ctx, s = c.createBufferSource(); s.buffer = (function () { var b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b; })(); s.loop = true;
      var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 520;
      var g = c.createGain(); g.gain.value = 0; g.gain.setTargetAtTime(0.08, c.currentTime, 1);
      var lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 0.3; lg.gain.value = 0.03; lfo.connect(lg); lg.connect(g.gain); lfo.start();
      s.connect(f); f.connect(g); g.connect(k.ambBus); s.start(); nuocNode = { s: s, g: g, lfo: lfo };
    } else if (!can && nuocNode) { var n = nuocNode; n.g.gain.setTargetAtTime(0, k.ctx.currentTime, 0.5); setTimeout(function () { try { n.s.stop(); n.lfo.stop(); } catch (e) {} }, 2000); nuocNode = null; }
  };
  var goc2 = A.tick;
  A.tick = function (dt, phase) {
    goc2(dt, phase);
    var k = A._ && A._(); if (!k || !k.ctx || !A.on || !loc) return;
    hen -= dt; if (hen > 0) return;
    hen = 1.2 + Math.random() * 2.5;
    var t = k.ctx.currentTime, S = G.S || {};
    if (TRE.indexOf(loc) >= 0 && Math.random() < .5) k.tone(260 + Math.random() * 120, t, 0.18, 'sine', 0.05, k.ambBus, { bend: 0.8 }); // tre gõ vào nhau
    if (BEP.indexOf(loc) >= 0) for (var i = 0; i < 4; i++) k.noise(t + i * 0.07 + Math.random() * 0.1, 0.03, 0.06, 'highpass', 2500, 1, k.ambBus); // lửa bếp lách tách
    if (loc === 'nha_det' && S.chapter === 'ch3' && (S.phase === 'sang' || S.phase === 'chieu')) { I.cot(0, t); I.cot(1, t + 0.4); }
    if (loc === 'cho_am' && G.ch4 && G.ch4.choMo(S)) k.noise(t, 1.2, 0.04, 'bandpass', 600 + Math.random() * 400, 5, k.ambBus); // tiếng thì thào của chợ âm
    if (loc === 'cung_san' && phase !== 'dem' && Math.random() < .3) k.tone(1800, t, 0.3, 'sine', 0.015, k.ambBus, { bend: 1.4 }); // én lượn
  };

  // ---------- tiếng bước chân theo mặt đất ----------
  var MAT = { co: ['lang_duong', 'vuon_cau', 'cung_vuon', 'bia_rung', 'cho_am', 'ky_ruong', 'ky_cau', 'hang_nuoc'], da: ['cung_san', 'cung_gieng'],
    go: ['cung_bep', 'cung_hau', 'nha_det', 'nha_bacu'] };
  A.buoc = function (l) {
    var k = A._ && A._(); if (!k || !k.ctx) return;
    var t = k.ctx.currentTime + 0.01;
    if (MAT.co.indexOf(l) >= 0) k.noise(t, 0.07, 0.07, 'lowpass', 380 + Math.random() * 80, 1);
    else if (MAT.da.indexOf(l) >= 0) { k.noise(t, 0.035, 0.09, 'bandpass', 1800 + Math.random() * 300, 2); }
    else if (MAT.go.indexOf(l) >= 0) { k.tone(180 + Math.random() * 30, t, 0.06, 'sine', 0.08); k.noise(t, 0.03, 0.04, 'lowpass', 900, 1); }
    else k.noise(t, 0.05, 0.08, 'lowpass', 500, 1);
  };

  // ---------- tiếng động thêm ----------
  A.them = function (ten, t0) {
    var k = A._ && A._(); if (!k || !k.ctx) return;
    var t = k.ctx.currentTime + (t0 || 0) + 0.01;
    if (ten === 'cua') { var f = k.noise(t, 0.6, 0.12, 'bandpass', 500, 9); f.frequency.exponentialRampToValueAtTime(900, t + 0.5); }
    if (ten === 'chieng') I.chieng(5, t, 2);
    if (ten === 'trong') I.trong(0, t);
    if (ten === 'soi') for (var i = 0; i < 8; i++) k.tone(200 + Math.random() * 300, t + i * 0.09, 0.08, 'sine', 0.06, k.sfxBus, { bend: 1.8 });
    if (ten === 'lua') for (var j = 0; j < 10; j++) k.noise(t + j * 0.05 + Math.random() * 0.05, 0.04, 0.12, 'highpass', 2000, 1);
    if (ten === 'bam') k.tone(880, t, 0.04, 'triangle', 0.035);
  };
})();
