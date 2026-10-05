// Nhân vật chibi theo mẫu nhan-vat-chibi-v2.svg: viền mực nâu dày, da ấm, bóng mờ, nét run tay (filter #w).
// Chi tiết: sợi tóc + vệt sáng, tai, lông mày, mũi nghiêng, cổ áo viền, khuy tết, thắt lưng có dải buông, nếp áo,
// cổ tay áo, bàn tay có ngón, dép quai / chân trần. Các nhóm động (css/nhanvat.css): .dau (đầu), .mt (nét mặt),
// .toc (tóc buông), .tua (dải thắt lưng), .vay (váy) — ngoài các nhóm cũ .bd .e .lg1 .lg2 .ar1 .ar2 .shd (js/sprite.js, js/xac.js dùng).
var G = window.G || (window.G = {});
G.art = {};
G.INK = '#2B1F1A';
G.SKIN = '#EBCDAA';

(function () {
  var INK = G.INK, SKIN = G.SKIN, SANG = '#FFF8E8';

  function rgb(h) {
    h = String(h || '').replace('#', '');
    if (h.length === 3) h = h.replace(/./g, '$&$&');
    return /^[0-9a-f]{6}$/i.test(h) ? [0, 2, 4].map(function (i) { return parseInt(h.substr(i, 2), 16); }) : null;
  }
  function mix(a, b, t) { // trộn hai màu hex
    var x = rgb(a), y = rgb(b);
    if (!x || !y) return a;
    return '#' + x.map(function (v, i) { var c = Math.round(v + (y[i] - v) * t); return (c < 16 ? '0' : '') + c.toString(16); }).join('').toUpperCase();
  }
  function sang(c) { var x = rgb(c); return x ? x[0] * 0.3 + x[1] * 0.59 + x[2] * 0.11 : 0; }
  // nét sợi tóc: tóc tối thì sợi sáng hơn, tóc bạc thì sợi tối hơn
  function soi(c, d, w) { return '<path d="' + d + '" fill="none" stroke="' + (sang(c) < 90 ? mix(c, SANG, 0.2) : mix(c, INK, 0.3)) + '" stroke-width="' + (w || 1.4) + '"/>'; }
  function vetSang(d, op) { return '<path d="' + d + '" fill="none" stroke="' + SANG + '" stroke-width="2.4" opacity="' + (op || 0.3) + '"/>'; }

  function hair(o, view) {
    var c = o.hairColor || INK, sd = view === 'side' ? -12 : 0; // nhìn nghiêng: búi / chỏm lệch về sau gáy
    switch (o.hair) {
      case 'non_la':
        return '<path d="M42,72 Q39,94 48,102 Q48,84 56,72 Z" fill="' + c + '"/><path d="M118,72 Q121,94 112,102 Q112,84 104,72 Z" fill="' + c + '"/>' +
          (view === 'back' ? '' : '<path d="M48,66 Q52,100 80,112 Q108,100 112,66" fill="none" stroke="#E9E2D0" stroke-width="2" opacity=".85"/>') + // quai nón
          '<path class="s" d="M44,66 Q80,80 116,66 L117,76 Q80,90 43,76 Z"/>' +
          '<path d="M80,14 L140,60 Q80,76 20,60 Z" fill="#D9C27A"/>' +
          '<path d="M80,16 L62,64M80,16 L98,65M80,16 L42,59M80,16 L118,59" fill="none" stroke="#B89A50" stroke-width="1.1" opacity=".75"/>' + // nan nón
          '<path class="s" d="M80,14 L140,60 Q112,67 88,68 Z"/>' +
          '<path class="d" d="M54,36 Q80,43 106,36M37,50 Q80,62 123,50M66,25 Q80,30 94,25"/>' +
          '<path d="M24,61 Q80,75 136,61" fill="none" stroke="#F4E6B0" stroke-width="2" opacity=".55"/>' + vetSang('M72,24 L50,46', 0.4);
      case 'topknot': // tóc ngắn búi nhỏ trên đỉnh, buộc dải vải (Đăng)
        return '<ellipse cx="' + (80 + sd) + '" cy="35" rx="11" ry="10" fill="' + c + '"/>' + soi(c, 'M' + (73 + sd) + ',33 q7,-6 14,0M' + (73 + sd) + ',38 q7,3 14,0') +
          '<path d="M43,74 Q40,42 80,42 Q120,42 117,74 Q108,58 92,57 Q84,62 70,57 Q54,60 43,74 Z" fill="' + c + '"/>' +
          soi(c, 'M54,64 Q60,50 76,45M66,58 Q72,49 80,46M98,58 Q92,49 84,46M108,66 Q102,52 88,45') +
          '<path d="M44,73 q-2,9 2,16M116,73 q2,9 -2,16" fill="none" stroke="' + c + '" stroke-width="3"/>' + // tóc mai
          '<path d="M' + (72 + sd) + ',42 h16" stroke="#8A3424" stroke-width="3.6"/>' +
          '<g class="toc"><path d="M' + (86 + sd) + ',43 q5,8 3,16M' + (88 + sd) + ',43 q9,6 10,13" fill="none" stroke="#8A3424" stroke-width="2.4"/></g>' +
          vetSang('M56,58 q10,-11 26,-12', 0.3);
      case 'bald': // đầu cạo, tóc mai bạc (Thầy Cả)
        return '<path d="M42,82 Q40,66 47,60 Q48,74 52,82 Z" fill="#D8D0C0"/><path d="M118,82 Q120,66 113,60 Q112,74 108,82 Z" fill="#D8D0C0"/>' +
          soi('#D8D0C0', 'M45,66 l2,10M115,66 l-2,10', 1.1) +
          '<path class="d" d="M64,52 q16,-6 32,0M68,58 q12,-4 24,0" opacity=".7"/>' + vetSang('M56,58 q8,-11 22,-12', 0.5);
      case 'khan': // khăn vấn quấn quanh đầu
        var kc = o.khan || '#4A3A30', kl = mix(kc, SANG, 0.22);
        return '<path d="M43,80 Q40,48 80,46 Q120,48 117,80 Q104,64 80,64 Q56,64 43,80 Z" fill="' + c + '"/>' + soi(c, 'M60,66 Q51,70 46,78M100,66 Q109,70 114,78M70,64 Q62,66 56,70') +
          '<path d="M38,66 Q40,36 80,32 Q120,36 122,66 Q100,54 80,54 Q60,54 38,66 Z" fill="' + kc + '"/>' +
          '<path d="M46,52 Q80,40 114,52M42,60 Q80,46 118,60" fill="none" stroke="' + kl + '" stroke-width="1.6"/>' +
          '<path d="M70,35 Q80,47 90,35M76,34 Q80,40 84,34" fill="none" stroke="' + kl + '" stroke-width="1.5"/>' + // chỗ khăn bắt chéo trước trán
          '<path d="M38,66 Q60,54 80,54 Q100,54 122,66" fill="none" stroke="' + mix(kc, INK, 0.4) + '" stroke-width="2.2"/>' +
          vetSang('M48,50 Q62,39 78,37', 0.28);
      case 'bun':
        return '<circle cx="' + (80 + sd) + '" cy="36" r="13" fill="' + c + '"/>' + soi(c, 'M' + (70 + sd) + ',32 q10,-8 20,0M' + (69 + sd) + ',38 q11,6 22,0') +
          (o.pin ? '<path d="M' + (62 + sd) + ',30 L' + (98 + sd) + ',42" stroke="#D9A93A" stroke-width="3"/><circle cx="' + (97 + sd) + '" cy="41.6" r="2.6" fill="#E8C060" stroke-width="1.4"/>' : '') +
          '<path d="M43,76 Q40,44 80,44 Q120,44 117,76 Q104,60 80,60 Q56,60 43,76 Z" fill="' + c + '"/>' +
          soi(c, 'M78,46 Q64,50 54,66M82,46 Q96,50 106,66M70,54 Q60,60 52,72M90,54 Q100,60 108,72') + vetSang('M54,62 q10,-12 24,-14', 0.3);
      case 'long':
        return '<path d="M42,80 Q38,40 80,40 Q122,40 118,80 Q106,60 80,62 Q54,60 42,80 Z" fill="' + c + '"/>' +
          soi(c, 'M79,42 Q66,46 56,62M81,42 Q94,46 104,62M76,48 Q60,54 50,72M84,48 Q100,54 110,72') +
          (view === 'side' ? '' : '<path d="M80,41 V60" fill="none" stroke="' + mix(c, SKIN, 0.45) + '" stroke-width="1.5"/>') + // đường rẽ ngôi
          vetSang('M52,62 q8,-14 22,-17', 0.3) + vetSang('M92,46 q10,2 16,10', 0.16);
      case 'trai_dao': // tóc trái đào của trẻ con
        return '<circle cx="80" cy="44" r="9" fill="' + c + '"/><circle cx="54" cy="56" r="7" fill="' + c + '"/><circle cx="106" cy="56" r="7" fill="' + c + '"/>' +
          soi(c, 'M75,42 q5,-4 10,0M51,55 q3,-3 6,0M103,55 q3,-3 6,0', 1.2) + vetSang('M62,52 q8,-6 14,-6', 0.25);
      case 'old':
        return '<path d="M43,82 Q42,64 50,58 Q50,72 54,80 Z" fill="#B8B0A0"/><path d="M117,82 Q118,64 110,58 Q110,72 106,80 Z" fill="#B8B0A0"/>' +
          '<path d="M60,52 Q80,40 100,52 Q80,48 60,52 Z" fill="#B8B0A0"/>' + soi('#B8B0A0', 'M46,66 l3,8M114,66 l-3,8M70,47.5 l3,1.5M90,47.5 l-3,1.5', 1.2) +
          '<path class="d" d="M66,60 q14,-4 28,0" opacity=".5"/>' + vetSang('M58,60 q10,-8 22,-8', 0.4);
      case 'mu': // mũ cánh chuồn của sứ giả
        return '<path d="M43,74 Q40,46 80,44 Q120,46 117,74 Q100,60 80,60 Q60,60 43,74 Z" fill="' + c + '"/>' + soi(c, 'M56,60 Q50,64 46,72M104,60 Q110,64 114,72') +
          '<path d="M52,54 Q52,26 80,26 Q108,26 108,54 Z" fill="#2B1F1A"/><path d="M50,46 q-26,-8 -30,4 q14,4 30,2 Z M110,46 q26,-8 30,4 q-14,4 -30,2 Z" fill="#2B1F1A"/>' +
          '<path d="M53,50 Q80,44 107,50" fill="none" stroke="#D9A93A" stroke-width="2.4"/><path d="M62,34 Q80,28 98,34" fill="none" stroke="#5A4A5A" stroke-width="1.8"/>' +
          vetSang('M58,46 Q58,32 72,29', 0.25);
      default:
        return '<path d="M43,74 Q40,40 80,40 Q120,40 117,74 Q110,58 92,56 Q86,62 70,57 Q54,60 43,74 Z" fill="' + c + '"/>' +
          soi(c, 'M58,50 Q64,54 66,58M74,44 Q78,50 77,57M92,45 Q95,51 93,56M104,50 Q110,57 112,66') + vetSang('M54,58 q10,-12 26,-13', 0.3);
    }
  }
  function hairBack(o) {
    var c = o.hairColor || INK, xam = '#B8B0A0';
    var shd = '<path class="s" d="M102,50 Q119,64 118,80 Q113,100 96,108 Q110,82 102,50 Z"/>';
    if (o.hair === 'bald') return '<path d="M44,84 Q46,104 80,108 Q114,104 116,84 Q100,92 80,92 Q60,92 44,84 Z" fill="#D8D0C0"/>' + vetSang('M58,54 q12,-10 26,-8', 0.45) + shd;
    if (o.hair === 'old') return '<ellipse cx="80" cy="72" rx="37" ry="31" fill="' + xam + '"/>' + soi(xam, 'M62,50 Q56,70 60,92M80,42 V94M98,50 Q104,70 100,92', 1.2) +
      '<ellipse cx="80" cy="97" rx="9" ry="7" fill="' + xam + '"/>' + soi(xam, 'M73,96 q7,-4 14,0', 1.2) + vetSang('M60,52 q12,-10 24,-9', 0.35) + shd; // búi tó sau gáy
    if (o.hair === 'trai_dao') return '<circle cx="80" cy="44" r="9" fill="' + c + '"/><circle cx="54" cy="56" r="7" fill="' + c + '"/><circle cx="106" cy="56" r="7" fill="' + c + '"/>' + shd;
    var s = '<ellipse cx="80" cy="76" rx="38" ry="33" fill="' + c + '"/>' + soi(c, 'M80,46 Q70,70 72,104M80,46 Q90,70 88,104M64,50 Q52,72 56,98M96,50 Q108,72 104,98');
    if (o.hair === 'long') s += '<g class="toc"><path d="M46,84 Q42,122 58,148 Q80,158 102,148 Q118,122 114,84 Z" fill="' + c + '"/>' +
      soi(c, 'M64,96 Q60,124 66,146M80,98 V152M96,96 Q100,124 94,146') + '<path d="M66,112 Q80,118 94,112" fill="none" stroke="#B84A3E" stroke-width="3"/></g>';
    if (o.hair === 'bun') s += '<circle cx="80" cy="40" r="13" fill="' + c + '"/>' + soi(c, 'M70,36 q10,-8 20,0M70,42 q10,5 20,0') + (o.pin ? '<path d="M62,34 L98,46" stroke="#D9A93A" stroke-width="3"/>' : '');
    if (o.hair === 'topknot') s += '<ellipse cx="80" cy="38" rx="11" ry="10" fill="' + c + '"/>' + soi(c, 'M73,36 q7,-6 14,0') + '<path d="M72,46 h16" stroke="#8A3424" stroke-width="3.6"/>' +
      '<g class="toc"><path d="M77,47 q-3,8 -1,15M83,47 q4,7 2,14" fill="none" stroke="#8A3424" stroke-width="2.4"/></g>';
    if (o.hair === 'khan' || o.hair === 'non_la' || o.hair === 'mu') s += hair(o, 'back');
    else s += vetSang('M58,56 q12,-12 28,-10', 0.25);
    return s + shd;
  }
  // nhìn nghiêng: mảng tóc sau gáy và tai
  function hairSide(o, skin) {
    var c = o.hairColor || INK, s = '';
    if (['bald', 'old', 'trai_dao', 'non_la'].indexOf(o.hair) < 0) s += '<path d="M43,64 Q37,90 50,107 L60,101 Q55,88 58,76 Q61,62 72,52 Q52,50 43,64 Z" fill="' + c + '"/>' + soi(c, 'M48,70 Q46,88 52,100M54,66 Q52,80 55,92');
    if (o.hair !== 'non_la') s += '<ellipse cx="56.5" cy="91" rx="4.4" ry="6" fill="' + skin + '" stroke-width="2.6"/><path d="M55.6,88.4 q2.6,2.2 .2,5" fill="none" stroke-width="1.2" opacity=".5"/>';
    return s;
  }

  // Mặt và biểu cảm. o.eyes: nét mắt riêng của nhân vật. o.expr: biểu cảm đang có (đè lên nét mắt khi khác 'thuong').
  var BI = { // các biểu cảm và nét mặt tương ứng
    vui: 1, buon: 1, so: 1, soc: 1, gian: 1, khay: 1, khoc: 1, nghi: 1, trang: 1, nham: 1
  };
  G.art.BIEU_CAM = Object.keys(BI);
  function n1(v) { return Math.round(v * 10) / 10; }
  function mat(cx, cy, r, look) { // mắt tròn: tròng nâu, hai điểm sáng; look: lệch con ngươi
    var x = cx + (look ? look[0] : 0), y = cy + (look ? look[1] : 0);
    return '<g class="e"><circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + INK + '" stroke="none"/>' +
      (r >= 3.5 ? '<circle cx="' + x + '" cy="' + n1(y + r * 0.3) + '" r="' + n1(r * 0.6) + '" fill="#5A3A2A" stroke="none"/>' : '') +
      '<circle cx="' + n1(x + r * 0.35) + '" cy="' + n1(y - r * 0.4) + '" r="' + n1(Math.max(0.9, r * 0.32)) + '" fill="' + SANG + '" stroke="none"/>' +
      (r >= 3 ? '<circle cx="' + n1(x - r * 0.38) + '" cy="' + n1(y + r * 0.42) + '" r="' + n1(r * 0.15) + '" fill="' + SANG + '" opacity=".75" stroke="none"/>' : '') + '</g>';
  }
  function eyes(o, side) {
    var e = '', ex = o.expr && o.expr !== 'thuong' ? o.expr : null, mouth = null;
    var bR = o.eyes === 'big' ? 4.4 : 3.2;
    if (!ex) {
      switch (o.eyes) {
        case 'big': e = mat(65, 87, 4.4) + mat(95, 87, 4.4) + '<path d="M59.5,79.5 q5,-3.4 10.5,-1.2M90,78.3 q5.5,-2.2 10.5,1.2" fill="none" stroke-width="2" opacity=".8"/>' +
          (o.skirt ? '<path d="M60.8,85.4 l-2.8,-1.6M99.2,85.4 l2.8,-1.6" fill="none" stroke-width="1.6"/>' : ''); break;
        case 'narrow': e = '<path class="e" d="M61,88 h10M89,88 h10" fill="none" stroke-width="2.4"/><path class="d" d="M60,81 l12,2M100,81 l-12,2"/>'; break;
        case 'tired': e = mat(66, 88, 3) + mat(94, 88, 3) + '<path class="d" d="M59,83 h13M88,83 h13M61,94 q5,2 9,0M90,94 q5,2 9,0"/>'; break;
        case 'closed': e = '<path d="M60,88 q6,4 12,0M88,88 q6,4 12,0" fill="none" stroke-width="2.4"/>'; break;
        case 'blank': e = '<circle cx="66" cy="87" r="6" fill="#F3EEDF" stroke-width="2"/><circle cx="94" cy="87" r="6" fill="#F3EEDF" stroke-width="2"/>'; break;
        case 'down': e = mat(66, 91, 3) + mat(94, 91, 3) + '<path class="d" d="M59,84 l13,2M101,84 l-13,2"/>' +
          (o.skirt ? '<path d="M62.6,89.4 l-2.6,-1.2M97.4,89.4 l2.6,-1.2" fill="none" stroke-width="1.4"/>' : ''); break;
        default: e = mat(67, 87, 3.2) + mat(93, 87, 3.2) + '<path d="M60,79 h13M87,79 h13" fill="none" stroke-width="2.2"/>';
      }
    } else switch (ex) {
      case 'vui': // mắt cong, miệng cười
        e = '<path d="M60,89 q6,-8 12,0M88,89 q6,-8 12,0" fill="none" stroke-width="2.6"/>';
        mouth = '<path d="M71,98 q9,10 18,0 z" fill="#7A2A1E" stroke-width="2"/>'; break;
      case 'buon': // lông mày chụm, mắt nhìn xuống
        e = mat(66, 90, bR - 0.4) + mat(94, 90, bR - 0.4) + '<path d="M59,83 L72,79M101,83 L88,79" fill="none" stroke-width="2.2"/>';
        mouth = '<path d="M73,104 q7,-6 14,0" fill="none" stroke-width="2.2"/>'; break;
      case 'so': // mắt mở to, lông mày nhướng, mồ hôi
        e = '<circle cx="66" cy="87" r="5.5" fill="#FFF8E8" stroke-width="2"/><circle cx="94" cy="87" r="5.5" fill="#FFF8E8" stroke-width="2"/>' +
          '<circle cx="66" cy="88" r="2.3" fill="' + INK + '" stroke="none"/><circle cx="94" cy="88" r="2.3" fill="' + INK + '" stroke="none"/>' +
          '<path d="M59,77 q7,-4 13,0M88,77 q6,-4 13,0" fill="none" stroke-width="2.2"/>' +
          '<path d="M113,66 q5,8 0,12 q-5,-4 0,-12 z" fill="#9FD0E0" stroke-width="1.6"/>';
        mouth = '<path d="M74,102 q3,-4 6,0 q3,4 6,0" fill="none" stroke-width="2"/>'; break;
      case 'soc': // tròng trắng, con ngươi nhỏ, miệng há
        e = '<circle cx="66" cy="86" r="6.5" fill="#FFF8E8" stroke-width="2"/><circle cx="94" cy="86" r="6.5" fill="#FFF8E8" stroke-width="2"/>' +
          '<circle cx="66" cy="86" r="1.6" fill="' + INK + '" stroke="none"/><circle cx="94" cy="86" r="1.6" fill="' + INK + '" stroke="none"/>' +
          '<path d="M58,74 l14,-2M88,72 l14,2" fill="none" stroke-width="2.2"/><path class="d" d="M40,64 l-6,-4M42,72 l-8,-1M120,64 l6,-4M118,72 l8,-1"/>';
        mouth = '<ellipse cx="80" cy="103" rx="5" ry="7" fill="#5A1A12" stroke-width="2"/>'; break;
      case 'gian': // lông mày chữ V, mắt nheo
        e = '<path d="M61,89 h10M89,89 h10" fill="none" stroke-width="2.8"/><path d="M58,78 L73,84M102,78 L87,84" fill="none" stroke-width="3"/>';
        mouth = '<path d="M71,102 h18" stroke-width="2.4"/><path d="M73,102 v-3M78,102 v-3M83,102 v-3M87,102 v-3" stroke-width="1.4"/>'; break;
      case 'khay': // cười khẩy: một bên lông mày nhướng, mí sụp
        e = mat(67, 89, 2.8) + mat(93, 89, 2.8) + '<path d="M60,86 h13M87,86 h13" fill="none" stroke-width="2.4"/><path d="M60,81 l12,1M87,78 q7,-4 13,1" fill="none" stroke-width="2.2"/>';
        mouth = '<path d="M72,101 q9,3 16,-4" fill="none" stroke-width="2.4"/>'; break;
      case 'khoc': // mắt nhắm, nước mắt chảy
        e = '<path d="M60,87 q6,4 12,0M88,87 q6,4 12,0" fill="none" stroke-width="2.6"/><path d="M59,82 L72,79M101,82 L88,79" fill="none" stroke-width="2"/>' +
          '<path d="M64,91 q-2,10 0,18M96,91 q2,10 0,18" fill="none" stroke="#6FB0D0" stroke-width="3"/>';
        mouth = '<path d="M72,104 q8,-7 16,0 q-8,3 -16,0 z" fill="#7A2A1E" stroke-width="2"/>'; break;
      case 'nghi': // nhìn lên một bên, một bên lông mày nhướng
        e = mat(67, 87, 3, [2, -2]) + mat(93, 87, 3, [2, -2]) + '<path d="M60,80 h13M87,76 q7,-3 13,1" fill="none" stroke-width="2.2"/>';
        mouth = '<path d="M76,101 q4,-2 8,0" fill="none" stroke-width="2.2"/>'; break;
      case 'trang': // mắt trắng dã
        e = '<circle cx="66" cy="87" r="6" fill="#F3EEDF" stroke-width="2"/><circle cx="94" cy="87" r="6" fill="#F3EEDF" stroke-width="2"/>'; break;
      case 'nham':
        e = '<path d="M60,88 q6,4 12,0M88,88 q6,4 12,0" fill="none" stroke-width="2.4"/>'; break;
    }
    // mũi nhỏ (nhìn nghiêng thì mũi vẽ ở mép mặt) và má
    if (!side && o.eyes !== 'blank' && ex !== 'trang') e += '<path d="M78.8,92.2 q2.6,2.2 .2,3.8" fill="none" stroke-width="1.6" opacity=".7"/>';
    if (o.mole) e += '<circle cx="45" cy="84" r="2.6" fill="' + INK + '" stroke="none"/>'; // nốt ruồi sát tai trái
    if (o.blush || ex === 'vui' || ex === 'khoc') e += '<ellipse cx="56" cy="97" rx="5" ry="3" fill="#E08A7A" stroke="none" opacity=".55"/>' + (side ? '' : '<ellipse cx="104" cy="97" rx="5" ry="3" fill="#E08A7A" stroke="none" opacity=".55"/>');
    else e += '<ellipse cx="56" cy="97" rx="5" ry="2.8" fill="#E08A7A" stroke="none" opacity=".2"/>' + (side ? '' : '<ellipse cx="104" cy="97" rx="5" ry="2.8" fill="#E08A7A" stroke="none" opacity=".2"/>');
    if (ex === 'so' || ex === 'soc') e += '<path d="M54,96 l4,3M58,94 l4,3" stroke="#6A8AA0" stroke-width="1.4" opacity=".6"/>';
    if (!mouth) mouth = o.mouth === 'smile' ? '<path d="M73,99 q7,6 14,0" fill="none" stroke-width="2.2"/>' :
      o.mouth === 'grin' ? '<path d="M68,98 q12,12 24,0 z" fill="#5A1A12" stroke-width="2"/><path d="M71,99 h18" stroke="#F3EEDF" stroke-width="2"/>' :
      o.mouth === 'open' ? '<ellipse cx="80" cy="101" rx="5" ry="6" fill="#5A1A12" stroke-width="2"/>' :
      o.mouth === 'sad' ? '<path d="M73,103 q7,-5 14,0" fill="none" stroke-width="2.2"/>' :
      '<path d="M75,100 q5,1.6 10,0" fill="none" stroke-width="2.2"/><path d="M77.5,103.2 q2.5,1 5,0" fill="none" stroke-width="1.2" opacity=".35"/>';
    if (o.beard) {
      e += '<path d="M60,98 Q62,124 80,130 Q98,124 100,98 Q90,106 80,104 Q70,106 60,98 Z" fill="#E9E2D0"/><path class="d" d="M71,110 q2,6 2,12M89,110 q-2,6 -2,12M80,108 q1.5,8 0,16" opacity=".55"/>' +
        '<path d="M66,104 q3,-4 7,-2" fill="none" stroke="' + SANG + '" stroke-width="1.6" opacity=".5"/>';
      if (ex === 'khay' || ex === 'gian' || ex === 'vui' || ex === 'soc') e += mouth.replace(/cy="10[0-9]"/, 'cy="104"'); // vẫn thấy miệng qua râu khi biểu cảm mạnh
      return e;
    }
    return e + mouth;
  }

  function prop(o) {
    switch (o.prop) {
      case 'lantern':
        return '<path class="d" d="M108,146 v10"/><path d="M98,154 h20 l-2,22 h-16 z" fill="#E8B04A" stroke-width="2.5"/><path d="M98,160 h20M98,170 h20" stroke-width="1.5"/>' +
          '<path d="M104,148 h8" stroke-width="3"/><path d="M103,158 v14" stroke="#FFF2C0" stroke-width="2" opacity=".6"/>';
      case 'mo': // mõ gỗ
        return '<ellipse cx="114" cy="150" rx="15" ry="12" fill="#A0602E"/><path d="M104,152 q10,4 20,0" stroke-width="2"/><path d="M106,144 q6,-4 12,-3" fill="none" stroke="#D89A5E" stroke-width="2" opacity=".7"/>' +
          '<path d="M124,134 L140,118" stroke-width="4"/><circle cx="141" cy="116" r="4" fill="#C79A5E" stroke-width="2"/>';
      case 'ring': // nhẫn bạc ở tay phải
        return '';
      case 'yem': // ôm chiếc yếm đỏ
        return '<path d="M64,120 Q80,112 98,122 L94,146 Q80,152 66,146 Z" fill="#B84A3E"/><path class="d" d="M66,124 l-8,-14M96,124 l8,-14"/>';
      case 'basket': // giỏ tép
        return '<path d="M98,140 h28 l-4,22 h-20 z" fill="#C79A5E"/><path class="d" d="M100,148 h24M101,155 h22M106,141 l-1,20M114,141 v20M120,141 l-1,20"/><path d="M100,140 Q112,124 124,140" fill="none" stroke-width="2.5"/>';
      case 'axe':
        return '<path d="M106,148 L140,92" stroke-width="7"/><path d="M106,148 L140,92" stroke="#6A4A2E" stroke-width="3.5"/>' +
          '<path d="M134,86 q16,-6 20,12 l-14,8 q-2,-12 -6,-20 Z" fill="#9AA0A4" stroke-width="2.5"/>';
      case 'scroll':
        return '<rect x="100" y="132" width="26" height="16" rx="4" fill="#E9D9A8"/><path d="M100,132 v16M126,132 v16" stroke-width="4"/>';
      case 'bowl':
        return '<path d="M98,144 h28 q-2,14 -14,14 q-12,0 -14,-14 z" fill="#E9E2D0"/><path d="M100,146 h24" stroke="#6F9C9A" stroke-width="3"/>';
    }
    return '';
  }

  function accBack(o, view) {
    if (o.back === 'trap') { // tráp đồ nghề đeo sau lưng
      if (view === 'back') return '';
      var x = view === 'side' ? 34 : 104;
      return '<rect x="' + x + '" y="98" width="30" height="40" rx="3" fill="#7A5236"/><rect x="' + x + '" y="98" width="30" height="9" rx="3" fill="#5A3A26"/>' +
        '<path class="d" d="M' + x + ',112 h30"/><path d="M' + (x + 3) + ',134 h5M' + (x + 22) + ',134 h5" stroke="#C79A5E" stroke-width="2.2"/>';
    }
    return '';
  }
  function accFront(o, view) {
    var s = '';
    if (o.yemShow) s += '<path d="M68,110 Q80,116 92,110 L90,132 Q80,138 70,132 Z" fill="#B84A3E"/>';
    if (o.back === 'trap') {
      if (view === 'back') s += '<rect x="64" y="104" width="32" height="42" rx="3" fill="#7A5236"/><rect x="64" y="104" width="32" height="10" rx="3" fill="#5A3A26"/>' +
        '<path class="d" d="M64,116 h32M68,104 l-6,-6M92,104 l6,-6"/>' +
        '<rect x="73" y="120" width="14" height="20" fill="#E8D27A" stroke-width="1.5"/><path d="M80,123 q-3,3 0,5 q3,3 0,5 q-3,3 0,4" fill="none" stroke="#B8241A" stroke-width="1.4"/>' + // lá bùa dán trên tráp
        '<circle cx="67.5" cy="142.5" r="1.6" fill="#C79A5E" stroke="none"/><circle cx="92.5" cy="142.5" r="1.6" fill="#C79A5E" stroke="none"/>';
      else if (view === 'side') s += '<path d="M90,106 Q82,120 70,130" fill="none" stroke="#5A3A26" stroke-width="3.4"/>';
      else s += '<path d="M66,106 Q63,118 64,132M94,106 Q97,118 96,132" fill="none" stroke="#5A3A26" stroke-width="3.2"/>'; // quai tráp qua vai
    }
    return s;
  }

  // Chuỗi SVG của một nhân vật trong khung 160x190, bàn chân ở y≈176.
  G.art.chibi = function (o) {
    var view = o.view || 'front', side = view === 'side', back = view === 'back';
    var shirt = o.shirt || '#4E8C84', pants = o.pants || '#4A4650', shoes = o.shoes || '#7A5236', skin = o.skin || SKIN;
    var aoT = mix(shirt, INK, 0.32), aoS = mix(shirt, SANG, 0.35), nu = !!o.skirt, w = o.body === 'wide' ? 4 : 0;
    var bare = shoes === SKIN || shoes === skin; // chân trần
    function ongQuan(x1, x2, y, toi) { // ống quần rộng hơi loe, gấu gập, nếp dọc
      var m = (x1 + x2) / 2, d = 'M' + x1 + ',' + y + ' H' + x2 + ' L' + (x2 + 1) + ',171 Q' + m + ',173.5 ' + (x1 - 1) + ',171 Z';
      var r = '<path d="' + d + '" fill="' + pants + '"/><path d="M' + (x2 - 3.5) + ',' + (y + 1) + ' L' + (x2 - 2.5) + ',170.5 L' + x2 + ',171 L' + (x2 - 0.8) + ',' + (y + 1) + ' Z" fill="' + INK + '" opacity=".18" stroke="none"/>';
      if (pants !== skin) r += '<path d="M' + (x1 - 0.6) + ',167.2 Q' + m + ',169.8 ' + (x2 + 0.6) + ',167.2" fill="none" stroke-width="1.5" opacity=".6"/><path d="M' + (m - 1) + ',' + (y + 4) + ' q1.5,6 .5,11" fill="none" stroke-width="1.3" opacity=".35"/>';
      if (toi) r += '<path d="' + d + '" fill="' + INK + '" opacity=".2" stroke="none"/>';
      return r;
    }
    function ban(cx, cy) { // bàn chân nhìn trước / sau: dép quai hoặc chân trần
      if (bare) return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="10" ry="5.2" fill="' + shoes + '"/><path d="M' + (cx - 4.5) + ',' + (cy + 1.2) + ' v1.8M' + (cx - 1.5) + ',' + (cy + 2.2) + ' v1.8M' + (cx + 1.5) + ',' + (cy + 2.2) + ' v1.8M' + (cx + 4.5) + ',' + (cy + 1.2) + ' v1.8" fill="none" stroke-width="1.1" opacity=".55"/>';
      return '<ellipse cx="' + cx + '" cy="' + (cy + 1.4) + '" rx="11" ry="4.6" fill="' + shoes + '"/><ellipse cx="' + cx + '" cy="' + (cy - 0.8) + '" rx="8.4" ry="4.4" fill="' + skin + '"/>' +
        '<path d="M' + (cx - 7) + ',' + (cy - 1.6) + ' Q' + cx + ',' + (cy + 2.6) + ' ' + (cx + 7) + ',' + (cy - 1.6) + '" fill="none" stroke="' + shoes + '" stroke-width="3"/>';
    }
    function banS(x) { // bàn chân nhìn nghiêng (mũi chân về bên phải), x: gót
      var f = '<path d="M' + (x - 1) + ',177 Q' + (x - 1) + ',169 ' + (x + 7) + ',169 Q' + (x + 15) + ',171 ' + (x + 19) + ',177 Q' + (x + 19) + ',180 ' + (x + 12) + ',180 H' + (x + 2) + ' Q' + (x - 1) + ',180 ' + (x - 1) + ',177 Z" fill="' + (bare ? shoes : skin) + '"/>';
      if (bare) return f + '<path d="M' + (x + 14) + ',176 v2.4M' + (x + 16.5) + ',176.4 v2" fill="none" stroke-width="1.1" opacity=".5"/>';
      return f + '<path d="M' + (x - 2) + ',178 H' + (x + 20) + ' Q' + (x + 20) + ',181.4 ' + (x + 15) + ',181.4 H' + (x + 1) + ' Q' + (x - 2) + ',181.4 ' + (x - 2) + ',178 Z" fill="' + shoes + '"/>' +
        '<path d="M' + (x + 6) + ',170 q2.4,4 1.2,8" fill="none" stroke="' + shoes + '" stroke-width="2.6"/>';
    }

    var s = '<ellipse class="shd" cx="80" cy="179" rx="46" ry="9" fill="url(#gShd)" stroke="none"/><ellipse class="shd" cx="80" cy="177" rx="24" ry="4" fill="#1A0E08" opacity=".22" stroke="none"/>';
    if (nu) { // váy dài: che chân, lộ mũi chân
      s += '<g class="lg lg1">' + ban(68, 175) + '</g><g class="lg lg2">' + ban(92, 175) + '</g>';
    } else if (side) {
      s += '<g class="lg lg2">' + ongQuan(76, 89, 148, true) + banS(76) + '</g>';
      s += '<g class="lg lg1">' + ongQuan(70, 83, 148) + banS(70) + '</g>';
    } else {
      s += '<g class="lg lg1">' + ongQuan(63, 76, 150) + ban(67, 175) + '</g>';
      s += '<g class="lg lg2">' + ongQuan(84, 97, 150) + ban(93, 175) + '</g>';
    }
    s += '<g class="bd">';
    s += accBack(o, view);
    if (o.prop && !back) s += prop(o);
    if (nu) { // váy: gấu sẫm, nếp xếp, đung đưa khi đi (.vay)
      var VAY = 'M56,140 Q80,134 104,140 L110,174 Q80,180 50,174 Z';
      s += '<g class="vay"><path d="' + VAY + '" fill="' + o.skirt + '"/>' +
        '<path d="M51,169 Q80,175 109.4,169 L110,174 Q80,180 50,174 Z" fill="' + mix(o.skirt, INK, 0.35) + '" stroke="none"/>' +
        '<path class="s" d="M94,138 L104,140 L110,174 Q100,177 92,177 Q98,156 94,138 Z"/>' +
        '<path d="' + VAY + '" fill="url(#gBody)" stroke="none"/>' +
        '<path d="M67,150 l-3,22M80,152 v24M93,150 l3,22" fill="none" stroke-width="1.3" opacity=".4"/>' +
        '<path d="M56,150 Q59,160 55,170" fill="none" stroke="' + SANG + '" stroke-width="2" opacity=".18"/>' +
        '<path d="' + VAY + '" fill="none"/></g>';
    }
    // áo: thân, bóng, gấu, nếp, ánh sáng vai
    var AO = 'M58,108 Q80,101 102,108 L' + (110 + w) + ',153 Q80,' + (161 + w / 2) + ' ' + (50 - w) + ',153 Z';
    s += '<path d="' + AO + '" fill="' + shirt + '"/>';
    s += '<path d="' + AO + '" fill="url(#gBody)" stroke="none"/>';
    s += '<path class="s" d="M92,105 L102,108 L' + (110 + w) + ',153 Q100,157 90,158 Q97,132 92,105 Z"/>';
    s += '<path d="M' + (52.5 - w) + ',148.5 Q80,' + (156.5 + w / 2) + ' ' + (107.5 + w) + ',148.5" fill="none" stroke="' + aoT + '" stroke-width="1.8" opacity=".75"/>';
    s += '<path class="d" d="M80,106 V158" opacity=".8"/>';
    s += '<path d="M61,122 q4,7 1,15M99,122 q-4,7 -1,15M63.5,113 q5,3 10,2M96.5,113 q-5,3 -10,2" fill="none" stroke-width="1.3" opacity=".35"/>';
    s += vetSang('M59.5,110.5 Q68,105.8 77,104.8', 0.35);
    var belt = o.sash || (nu ? '#8FAE6E' : null); // thắt lưng (đàn bà: lụa xanh hoa lý)
    if (belt) s += '<path d="M' + (53 - w) + ',137 Q80,145 ' + (107 + w) + ',137 L' + (108 + w) + ',144 Q80,152 ' + (52 - w) + ',144 Z" fill="' + belt + '"/>' +
      '<path d="M' + (55 - w) + ',140.6 Q80,148.2 ' + (105 + w) + ',140.6" fill="none" stroke="' + mix(belt, INK, 0.35) + '" stroke-width="1.2"/>';
    if (!back) { // mặt trước áo: yếm / ngực trong cổ chữ V, cổ áo viền, khuy tết, nút thắt lưng
      var f = side ? '<g transform="translate(6,0)">' : '';
      f += '<path d="M70,106 L80,118 L90,106 Q80,103 70,106 Z" fill="' + (nu ? '#C8604E' : skin) + '" stroke="none"/>';
      f += '<path d="M67.5,105 L80,119.5 L92.5,105" fill="none" stroke-width="5.6"/><path d="M67.5,105 L80,119.5 L92.5,105" fill="none" stroke="' + aoT + '" stroke-width="2.6"/>';
      if (!nu) [124, 133].concat(belt ? [] : [142]).forEach(function (y) {
        f += '<path d="M76.4,' + y + ' h7.2" stroke-width="1.2"/><circle cx="80" cy="' + y + '" r="1.9" fill="' + aoS + '" stroke-width="1.2"/>';
      });
      if (belt) {
        var kx = nu ? 90 : 66;
        f += '<g class="tua"><path d="M' + (kx - 2) + ',146 q-3,9 -1,19 l5,-1 q-1,-9 1,-17 Z" fill="' + belt + '"/><path d="M' + (kx + 2) + ',146 q4,8 5,16 l4,-2 q-2,-8 -5,-14 Z" fill="' + belt + '"/></g>' +
          '<ellipse cx="' + kx + '" cy="144.5" rx="4.2" ry="3.4" fill="' + belt + '"/>';
      }
      s += f + (side ? '</g>' : '');
    }
    s += accFront(o, view);
    // tay áo rộng, cổ tay áo viền, bàn tay có ngón cái và ngón
    [[61, 48, 52, 'ar1', 1], [99, 112, 108, 'ar2', -1]].forEach(function (a, k) {
      var d = 'M' + a[0] + ',116 Q' + a[1] + ',128 ' + a[2] + ',142', h = a[2], dir = a[4];
      s += '<g class="ar ' + a[3] + '"><path d="' + d + '" fill="none" stroke-width="13.5"/><path d="' + d + '" fill="none" stroke="' + shirt + '" stroke-width="7.6"/>' +
        '<path d="M' + (a[0] - 2 * dir) + ',119 Q' + (a[1] - 1.5 * dir) + ',129 ' + (h - 2.6 * dir) + ',137" fill="none" stroke="' + INK + '" stroke-width="2.4" opacity=".16"/>' +
        '<path d="M' + (a[1] + 1.5 * dir) + ',126 q' + (2 * dir) + ',1.6 ' + (4.5 * dir) + ',.6" fill="none" stroke-width="1.2" opacity=".4"/>' +
        '<path d="M' + (h - 0.9 * dir) + ',137.6 L' + h + ',142" fill="none" stroke="' + aoT + '" stroke-width="7.6"/>' +
        '<path d="M' + (h - 5.2) + ',137.2 L' + (h + 5.2) + ',138" fill="none" stroke-width="1.5"/>' +
        '<ellipse cx="' + h + '" cy="145.5" rx="5.6" ry="6" fill="' + skin + '"/>' +
        '<path d="M' + (h - 2.6) + ',149.2 q.4,1.4 .2,2.4M' + (h + 0.2) + ',150 v2.2M' + (h + 2.8) + ',149.2 q-.2,1.4 -.4,2.4" fill="none" stroke-width="1.1" opacity=".5"/>' +
        '<path d="M' + (h + 3.4 * dir) + ',142 q' + (2.4 * dir) + ',2 ' + (0.6 * dir) + ',4.8" fill="none" stroke-width="1.3" opacity=".7"/>' +
        (k === 1 && o.prop === 'ring' ? '<circle cx="' + (h + 3) + '" cy="141" r="3" fill="none" stroke="#D8DDE0" stroke-width="2.4"/>' : '') + '</g>';
    });
    s += '<ellipse cx="80" cy="111" rx="25" ry="7" fill="#1A0E08" opacity=".2" stroke="none"/>'; // bóng cằm đổ xuống áo
    // đầu (.dau): xoay nhẹ khi đứng ngó, trễ nhịp khi đi
    s += '<g class="dau">';
    var hc = o.hairColor || INK;
    if (o.hair === 'long' && !back) {
      if (side) s += '<g class="toc"><path d="M48,76 Q32,104 40,140 Q50,148 60,140 Q54,114 62,88 Z" fill="' + hc + '"/>' + soi(hc, 'M44,100 Q40,120 46,138M52,96 Q48,118 54,136') + '</g>';
      else [1, -1].forEach(function (m) { // hai lọn tóc buông trước vai
        var X = function (x) { return m > 0 ? x : 160 - x; };
        s += '<g class="toc"><path d="M' + X(45) + ',70 Q' + X(31) + ',98 ' + X(37) + ',126 Q' + X(44) + ',133 ' + X(52) + ',124 Q' + X(48) + ',100 ' + X(56) + ',76 Z" fill="' + hc + '"/>' +
          soi(hc, 'M' + X(40) + ',96 q' + (-2 * m) + ',14 ' + (2 * m) + ',26') + '</g>';
      });
    }
    if (!back && !side && o.hair !== 'long' && o.hair !== 'non_la') s += '<ellipse cx="43" cy="89" rx="6" ry="8" fill="' + skin + '"/><ellipse cx="117" cy="89" rx="6" ry="8" fill="' + skin + '"/>' +
      '<path d="M41.5,85 q-3.6,4 0,8M118.5,85 q3.6,4 0,8" fill="none" stroke-width="1.3" opacity=".55"/>'; // tai
    s += '<ellipse cx="80" cy="76" rx="38" ry="33" fill="' + skin + '"/>';
    s += '<ellipse cx="80" cy="76" rx="36.5" ry="31.5" fill="url(#gHead)" stroke="none"/>';
    if (back) s += hairBack(o);
    else {
      s += '<path class="s" d="M102,50 Q119,64 118,80 Q113,100 96,108 Q110,82 102,50 Z"/>';
      if (side) s += hairSide(o, skin) + '<path d="M113,84.5 Q123,89.5 110.5,95 L108,95 L110,84.5 Z" fill="' + skin + '" stroke="none"/><path d="M116.3,86 Q122,89.6 112,94.2" fill="none" stroke-width="2.4"/>'; // mũi nhìn nghiêng
      s += '<g class="mt">' + (side ? '<g transform="translate(9,1)">' + eyes(o, true) + '</g>' : eyes(o)) + '</g>' + hair(o, view);
    }
    s += '</g></g>';
    var inner = o.kid ? '<g transform="translate(80,178) scale(.8) translate(-80,-178)">' + s + '</g>' : s;
    return '<svg class="chibi v-' + view + '" viewBox="0 0 160 190" width="160" height="190" overflow="visible">' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + inner + '</g></svg>';
  };

  // Ngoại hình các nhân vật
  G.LOOKS = {
    dang:   { hair: 'topknot', shirt: '#8A5A36', pants: '#4A4650', back: 'trap' },
    thay:   { hair: 'bald', beard: true, mole: true, shirt: '#3E3A4A', pants: '#2B2A33', eyes: 'tired', prop: 'mo', sash: '#B84A3E' },
    dighe:  { hair: 'khan', khan: '#3A2A3A', shirt: '#6A3E58', skirt: '#2B1F1A', eyes: 'narrow', mouth: 'smile', prop: 'ring' },
    cam:    { hair: 'bun', pin: true, shirt: '#D9A93A', skirt: '#B84A3E', eyes: 'down', prop: 'yem' },
    lai:    { hair: 'khan', khan: '#7A5236', shirt: '#6E9A5A', skirt: '#4A4650', eyes: 'big', blush: true },
    tam:    { hair: 'long', shirt: '#C9B48A', skirt: '#3A3A48', eyes: 'big', prop: 'basket', blush: true },
    camNho: { hair: 'bun', shirt: '#B84A3E', skirt: '#4A4650', eyes: 'big', mouth: 'smile', prop: 'basket' },
    dighe2: { hair: 'khan', khan: '#3A2A3A', shirt: '#6A3E58', skirt: '#2B1F1A', eyes: 'narrow', mouth: 'smile', prop: 'ring' },
    kid1:   { kid: true, hair: 'trai_dao', shirt: '#D9A93A', pants: '#EBCDAA', shoes: '#EBCDAA', eyes: 'big' },
    kid2:   { kid: true, hair: 'long', shirt: '#B84A3E', pants: '#EBCDAA', shoes: '#EBCDAA', eyes: 'big' },
    kid3:   { kid: true, hair: 'trai_dao', shirt: '#6E9A5A', pants: '#EBCDAA', shoes: '#EBCDAA', eyes: 'big' },
    ongLao: { hair: 'old', shirt: '#C79A5E', pants: '#4A4650', eyes: 'tired', beard: true },
    danLang:{ hair: 'non_la', shirt: '#4E8C84', pants: '#4A4650', eyes: 'tired' },
    danLang2:{ hair: 'khan', khan: '#5A4A3A', shirt: '#9A6A4A', skirt: '#2B1F1A', eyes: 'tired', mouth: 'sad' },
    suGia:  { hair: 'mu', shirt: '#4E6A8C', pants: '#2B2A33', eyes: 'narrow', prop: 'scroll', sash: '#D9A93A' }
  };
})();
