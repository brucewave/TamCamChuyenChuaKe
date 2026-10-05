// Lõi: không gian tên G, trạng thái, lưu/tải, co giãn sân khấu.
var G = window.G || (window.G = {});
G.TITLE = 'Thầy Pháp Cuối Cùng';            // tên game tạm, đổi ở đây
G.SUBTITLE = 'Trinh thám kinh dị · cổ tích Tấm Cám';
G.VIEW_W = 960; G.VIEW_H = 540;
G.SAVE_KEY = 'tpcc_save_v1';
G.SAVE_VERSION = 1;
G.$ = function (id) { return document.getElementById(id); };
G.isTouch = ('ontouchstart' in window) || window.matchMedia('(pointer:coarse)').matches;
G.input = { left: false, right: false, up: false, down: false, act: false, hold: false };

// phase: 'chieu' (chiều tà), 'dem' (đêm, chỉ thấy quanh đèn lồng), 'sang' (sáng sớm có sương)
G.newState = function () {
  return {
    v: G.SAVE_VERSION,
    chapter: 'mo_dau',
    day: 1, phase: 'chieu',
    beat: 'den_lang',
    loc: 'lang_duong', x: 120, y: 500, view: 'side', flip: 1,
    flags: {}, clues: {}, deduce: {}, items: {}, seen: {},
    deaths: 0
  };
};

G.save = function () {
  try { localStorage.setItem(G.SAVE_KEY, JSON.stringify(G.S)); return true; } catch (e) { return false; }
};
G.hasSave = function () { try { return !!localStorage.getItem(G.SAVE_KEY); } catch (e) { return false; } };
G.loadSave = function () {
  try {
    var S = JSON.parse(localStorage.getItem(G.SAVE_KEY) || 'null');
    if (!S || S.v !== G.SAVE_VERSION) return null;
    var base = G.newState();
    for (var k in base) if (S[k] === undefined) S[k] = base[k];
    return S;
  } catch (e) { return null; }
};

// Sân khấu cao 540, bề ngang giãn 960–1200 theo tỉ lệ cửa sổ.
G.fit = function () {
  if (!window.innerWidth || !window.innerHeight) return; // cửa sổ đang ẩn: giữ kích thước cũ
  var ar = window.innerWidth / window.innerHeight;
  G.VIEW_H = 540; G.VIEW_W = Math.round(Math.max(960, Math.min(1200, 540 * ar)));
  var s = Math.min(window.innerWidth / G.VIEW_W, window.innerHeight / G.VIEW_H);
  var st = G.$('stage');
  st.style.width = G.VIEW_W + 'px'; st.style.height = G.VIEW_H + 'px';
  st.style.transform = 'translate(-50%,-50%) scale(' + s + ')';
  var c = G.$('dark'); c.width = G.VIEW_W; c.height = G.VIEW_H;
  if (G.S && G.world && G.world.ready) G.world.updateCamera(true);
};

G.wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

// khung hình cho cảnh dàn dựng và minigame: chạy bằng hẹn giờ để không đứng hình khi cửa sổ bị che
G.raf = function (cb) { return setTimeout(function () { cb(performance.now()); }, 16); };

// người chơi bật chế độ giảm chuyển động: bỏ chữ chạy, rung màn hình, nét run
G.reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
