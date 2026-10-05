// Màn tiêu đề và màn "chạm để bắt đầu": trăng máu, vườn cau, xác vắt trên ngọn cau, Đăng cầm đèn quay lưng,
// lá bùa trấn rách dính máu treo lủng lẳng, bàn thờ nhang khói, tay vong trồi khỏi sương, máu nhỏ từ mép trên.
var G = window.G || (window.G = {});
G.tieude = {};

(function () {
  var T = G.tieude;
  function f(n) { return (+n).toFixed(1); }

  // một cây cau đen in trên nền trời
  function cauDen(x, h, mau, day) {
    var y = 470, ty = y - h, s = '<path d="M' + (x - 4) + ',' + y + ' L' + (x - 2.5) + ',' + ty + ' L' + (x + 2.5) + ',' + ty + ' L' + (x + 4) + ',' + y + ' Z" fill="' + mau + '"/>';
    var la = '';
    [[-62, 18], [-50, -12], [-24, -30], [6, -36], [32, -26], [56, -8], [64, 20], [-34, 30], [38, 30]].forEach(function (p) {
      var ex = x + p[0], ey = ty + p[1], mx = x + p[0] * .45, my = ty + p[1] - 16;
      la += 'M' + x + ',' + ty + ' Q' + f(mx) + ',' + f(my) + ' ' + f(ex) + ',' + f(ey);
      for (var t = .25; t < 1; t += .15) {
        var bx = (1 - t) * (1 - t) * x + 2 * (1 - t) * t * mx + t * t * ex, by = (1 - t) * (1 - t) * ty + 2 * (1 - t) * t * my + t * t * ey;
        la += 'M' + f(bx) + ',' + f(by) + ' l' + f(-4 + (p[0] < 0 ? -6 : 6)) + ',12M' + f(bx) + ',' + f(by) + ' l' + f(p[0] < 0 ? 2 : -2) + ',13';
      }
    });
    return s + '<path d="' + la + '" fill="none" stroke="' + mau + '" stroke-width="' + (day || 3) + '" stroke-linecap="round"/>';
  }

  // bàn tay vong trắng bệch trồi khỏi sương
  function tayVong(x, y, k, rot) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + k + ')"><g class="td-tay">' +
      '<path d="M-14,60 L-12,8 Q-16,-6 -12,-30 Q-10,-38 -6,-30 L-4,-6 L-2,-44 Q0,-52 4,-44 L5,-8 L9,-40 Q12,-48 15,-39 L13,-4 L18,-28 Q22,-34 24,-26 L18,10 Q16,30 12,60 Z" fill="#B8C4C0" stroke="#2A3634" stroke-width="2"/>' +
      '<path d="M-12,-30 l2,-6M-2,-44 l2,-7M9,-40 l3,-7M18,-28 l3,-6" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M-8,20 q10,4 20,0" stroke="#7A8884" stroke-width="1.6" fill="none"/></g></g>';
  }

  T.cover = function () {
    var V = G.ve, r = V ? V.rng(47) : Math.random;
    var s = '<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice"><defs>' +
      '<linearGradient id="tdTroi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07040A"/><stop offset=".45" stop-color="#2A0A10"/><stop offset=".8" stop-color="#5A1414"/><stop offset="1" stop-color="#7A2A1A"/></linearGradient>' +
      '<radialGradient id="tdQuang"><stop offset="0" stop-color="#D8402A" stop-opacity=".55"/><stop offset=".45" stop-color="#A8201A" stop-opacity=".22"/><stop offset="1" stop-color="#A8201A" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="tdTrang" cx=".42" cy=".4" r=".62"><stop offset="0" stop-color="#F0A070"/><stop offset=".6" stop-color="#C8442A"/><stop offset="1" stop-color="#7A1A12"/></radialGradient>' +
      '<radialGradient id="tdDen"><stop offset="0" stop-color="#FFC060" stop-opacity=".75"/><stop offset="1" stop-color="#FFC060" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="tdNen"><stop offset="0" stop-color="#FFB050" stop-opacity=".6"/><stop offset="1" stop-color="#FFB050" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="tdToi" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>' +
      '<linearGradient id="tdBan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A1A12"/><stop offset="1" stop-color="#1A0806"/></linearGradient></defs>';
    s += '<rect width="960" height="540" fill="url(#tdTroi)"/>';
    // sao lác đác
    for (var i = 0; i < 40; i++) s += '<circle cx="' + f(r() * 960) + '" cy="' + f(r() * 220) + '" r="' + f(.5 + r() * 1.1) + '" fill="#E8D8C8" opacity="' + f(.2 + r() * .5) + '"/>';
    // trăng máu: quầng, mặt trăng, vết rỗ, mây đen cắt ngang
    s += '<circle cx="700" cy="180" r="260" fill="url(#tdQuang)"/><circle cx="700" cy="180" r="112" fill="url(#tdTrang)"/>' +
      '<g fill="#8A2416" opacity=".45"><circle cx="668" cy="150" r="20"/><circle cx="736" cy="214" r="28"/><circle cx="720" cy="140" r="9"/><circle cx="660" cy="214" r="12"/></g>' +
      '<g class="td-may"><path d="M540,112 q60,-12 120,-4 q60,-8 130,4 q40,2 80,-6 l0,12 q-60,8 -130,4 q-80,8 -150,0 q-30,2 -50,-10 z" fill="#14060A" opacity=".8"/>' +
      '<path d="M620,70 q40,-8 90,0 q40,-6 70,2 l-10,8 q-50,6 -80,0 q-40,6 -70,-10 z" fill="#14060A" opacity=".55"/></g>';
    // quạ
    s += '<g fill="#050306" class="td-qua">';
    [[600, 96], [632, 80], [780, 92], [812, 112], [560, 132], [846, 70]].forEach(function (p) { s += '<path d="M' + p[0] + ',' + p[1] + ' q8,-8 16,0 q8,-8 16,0 q-8,2 -16,6 q-8,-4 -16,-6 z"/>'; });
    s += '</g>';
    // vườn cau đen, xa mờ hơn gần
    [[360, 300, '#1A0A10'], [440, 330, '#1A0A10'], [560, 290, '#14070C'], [600, 340, '#14070C'], [820, 310, '#14070C'], [880, 280, '#100509'], [945, 340, '#100509']].forEach(function (c) { s += cauDen(c[0], c[1], c[2], 3); });
    // cây cau giữa trăng: xác người vắt trên ngọn, tóc rủ, tay buông thõng, máu chảy dọc thân
    s += cauDen(700, 232, '#070305', 4);
    s += '<g fill="#060304">' +
      '<path d="M664,228 q16,-18 46,-12 q26,6 34,22 q-6,8 -22,8 q-14,10 -30,4 q-18,-4 -28,-22 z"/>' + // lưng gập vắt qua ngọn
      '<path d="M736,234 q14,10 18,30 l6,26 l-7,2 l-8,-24 q-6,-16 -14,-24 z"/><path d="M752,290 l-4,10 l8,0 z"/>' + // chân buông bên phải
      '<ellipse cx="660" cy="250" rx="13" ry="14"/>' + // đầu chúc xuống
      '<path d="M648,254 q-8,30 -4,70 q4,-26 8,-38 q2,34 8,58 q2,-36 2,-56 q6,22 10,36 q-2,-34 -10,-62 z"/>' + // tóc dài rủ
      '<path d="M682,240 q-6,26 -4,60 l6,1 q2,-26 4,-56 z"/><path d="M678,298 q-5,6 1,12 q6,-5 3,-12 z"/></g>' + // tay buông thõng, bàn tay
      '<path d="M681,312 q1,30 -1,60" fill="none" stroke="#8A0C08" stroke-width="2.2"/><ellipse cx="681" cy="316" rx="2.6" ry="3.6" fill="#9A0E0A" class="td-giot"/>' +
      '<path d="M702,252 q2,70 -1,130 q2,40 0,88" fill="none" stroke="#6A0806" stroke-width="2.4"/>';
    // mặt đất, nấm mộ đất xa
    s += '<path d="M0,462 Q260,444 520,460 T960,452 V540 H0 Z" fill="#0A0406"/>' +
      '<path d="M120,462 q40,-26 84,0 z M800,456 q30,-18 62,0 z" fill="#140A0A"/><path d="M160,440 v-20M152,428 h16" stroke="#2A1414" stroke-width="3"/>';
    // tay vong trồi khỏi sương
    s += '<g opacity=".55">' + tayVong(600, 470, .7, -8) + tayVong(760, 480, .55, 10) + tayVong(240, 486, .6, -14) + tayVong(860, 492, .45, 6) + '</g>';
    // sương máu loang
    s += '<g class="td-suong"><ellipse cx="320" cy="472" rx="380" ry="26" fill="#C8A8A0" opacity=".16"/><ellipse cx="780" cy="486" rx="320" ry="22" fill="#C8A8A0" opacity=".14"/><ellipse cx="520" cy="500" rx="420" ry="20" fill="#8A2A20" opacity=".18"/></g>';
    // quầng đèn lồng của Đăng
    s += '<circle cx="488" cy="430" r="110" fill="url(#tdDen)" class="td-lap"/>';
    // bàn thờ góc phải dưới: mép bàn sơn đỏ, bát hương ba nén nhang, ngọn nến, chén máu, vàng mã vương vãi
    s += '<g stroke="#0A0404" stroke-width="2.5" stroke-linejoin="round">' +
      '<path d="M700,540 L720,500 L960,496 L960,540 Z" fill="url(#tdBan)"/><path d="M720,500 L960,496" stroke="#C8A040" stroke-width="2"/>' +
      '<circle cx="860" cy="470" r="70" fill="url(#tdNen)" stroke="none" class="td-lap"/>' +
      '<path d="M790,500 q0,-26 36,-26 q36,0 36,26 z" fill="#3A4A5A"/><path d="M792,486 q34,10 68,0" fill="none" stroke="#C8D0D8" stroke-width="2"/><path d="M800,478 q26,6 52,0" fill="none" stroke="#8A9AAA" stroke-width="1.4"/>' +
      '<path d="M816,476 L812,420M826,476 L826,414M836,476 L842,422" stroke="#8A2A18" stroke-width="2.6"/>' +
      '<g stroke="none"><circle cx="812" cy="420" r="2.6" fill="#FF7A2A" class="td-dom"/><circle cx="826" cy="414" r="2.6" fill="#FF7A2A" class="td-dom"/><circle cx="842" cy="422" r="2.6" fill="#FF7A2A" class="td-dom"/></g>' +
      '<g class="td-khoi" fill="none" stroke="#C8B8B0" stroke-width="2" stroke-linecap="round" opacity=".5"><path d="M812,418 q-8,-20 4,-36 q10,-16 -2,-34"/><path d="M826,412 q8,-22 -4,-40 q-8,-14 4,-30"/><path d="M842,420 q10,-18 0,-34 q-8,-16 6,-30"/></g>' +
      '<rect x="884" y="440" width="18" height="58" rx="2" fill="#E8DCC8"/><path d="M886,446 q4,10 2,22" stroke="#C8B8A0" stroke-width="2" fill="none"/><path d="M890,440 q2,6 0,12" stroke="#B8A890" stroke-width="2.4" fill="none"/>' +
      '<path d="M893,438 q-7,-10 0,-22 q7,12 0,22 z" fill="#FFD27A" stroke="none" class="td-lua"/><path d="M893,436 q-3,-5 0,-11 q3,6 0,11 z" fill="#FFF4D0" stroke="none" class="td-lua"/>' +
      '<path d="M730,498 q0,-12 24,-12 q24,0 24,12 z" fill="#E8E0D0"/><ellipse cx="754" cy="488" rx="20" ry="3.4" fill="#6A0806" stroke="none"/>' +
      '<path d="M920,490 l26,-4 l4,14 l-26,4 z" fill="#C8A040"/><path d="M928,492 l10,-2" stroke="#8A6A20" stroke-width="1.4"/>' +
      '</g>';
    // lá bùa trấn rách treo lủng lẳng mép phải, dính dấu tay máu
    if (V && V.bua) {
      s += '<path d="M878,0 L878,38" stroke="#4A2A1A" stroke-width="2"/>' +
        '<defs><clipPath id="tdRach"><path d="M0,0 H120 V292 l-10,10 l-8,-6 l-10,16 l-12,-10 l-8,20 l-14,-14 l-10,8 l-12,-12 l-8,18 l-14,-10 L0,318 Z"/></clipPath></defs>' +
        '<g class="td-bua"><g transform="translate(846,36) rotate(3) scale(.56)"><g clip-path="url(#tdRach)">' + V.bua({ chu: V.BUA.tranVong, cu: true }) + '</g>' +
        '<path d="M120,292 l-10,10 l-8,-6 l-10,16 l-12,-10 l-8,20 l-14,-14 l-10,8 l-12,-12 l-8,18 l-14,-10 L0,318" fill="none" stroke="#8A5A10" stroke-width="2"/>' + // mép rách sém
        '<g fill="#7A0806" opacity=".88"><ellipse cx="66" cy="150" rx="22" ry="26"/><ellipse cx="40" cy="112" rx="6" ry="16" transform="rotate(-20 40 112)"/><ellipse cx="56" cy="102" rx="6" ry="18" transform="rotate(-6 56 102)"/><ellipse cx="74" cy="100" rx="6" ry="18" transform="rotate(6 74 100)"/><ellipse cx="90" cy="110" rx="5.4" ry="15" transform="rotate(18 90 110)"/><ellipse cx="94" cy="160" rx="5" ry="13" transform="rotate(50 94 160)"/>' +
        '<path d="M58,172 q2,20 -2,40 q4,2 6,0 q2,-20 2,-40z"/><path d="M76,170 q2,12 0,26 q3,2 5,0 q0,-14 -1,-26z"/></g></g></g>';
    }
    s += '<rect width="960" height="540" fill="url(#tdToi)"/>';
    s += '</svg>';
    // Đăng quay lưng cầm đèn, tối đi dưới trăng máu
    var dang = G.art && G.LOOKS ? G.art.chibi(Object.assign({}, G.LOOKS.dang, { view: 'back', prop: 'lantern' })) : '';
    var h = s + '<div class="td-dang">' + dang + '</div>';
    // máu nhỏ giọt từ mép trên, vàng mã bay
    h += '<div class="td-mau">';
    [[34, 60, 0], [118, 120, 1.4], [205, 44, .6], [330, 90, 2.2], [520, 70, 1], [610, 140, 2.8], [742, 52, .3], [930, 100, 1.8]].forEach(function (d) {
      h += '<i style="left:' + d[0] + 'px;--d:' + d[1] + 'px;animation-delay:-' + d[2] + 's"></i>';
    });
    h += '</div><div class="td-vang"><i></i><i></i><i></i><i></i><i></i></div>';
    return h;
  };

  // vệt máu chảy dưới tên game
  T.mauChu = function () {
    var s = '<svg class="td-chumau" viewBox="0 0 520 70" aria-hidden="true"><path d="M8,4 Q120,0 260,6 T512,4 L512,10 Q470,12 462,30 q-3,10 -6,0 Q452,14 420,12 Q330,10 300,14 q-6,30 -10,44 q-4,8 -7,0 q-2,-24 -8,-44 Q200,10 150,14 q-10,2 -12,20 q-3,9 -6,0 q-2,-16 -14,-20 Q60,10 8,10 Z" fill="#8A0C08"/>' +
      '<path d="M40,6 Q200,2 480,6" stroke="#C83020" stroke-width="1.6" fill="none" opacity=".7"/><circle cx="287" cy="66" r="3" fill="#8A0C08"/></svg>';
    return s;
  };

  // màn chạm để bắt đầu: dấu tay máu mờ trên nền đen, ngọn nến
  function tayMau(x, y, rot, k, mau, a, chay) {
    return '<g fill="' + mau + '" opacity="' + a + '" transform="translate(' + x + ',' + y + ') rotate(' + rot + ') scale(' + k + ')">' +
      '<path d="M-38,10 Q-44,-20 -30,-30 Q0,-40 30,-30 Q46,-16 40,20 Q38,60 10,74 Q-24,80 -36,52 Q-42,34 -38,10 Z"/>' + // lòng bàn tay
      '<path d="M-30,-22 Q-54,-56 -50,-74 Q-44,-84 -36,-74 Q-26,-50 -16,-30 Z"/>' + // ngón út
      '<path d="M-16,-30 Q-24,-80 -18,-100 Q-10,-110 -4,-98 Q-2,-66 0,-34 Z"/>' + // áp út
      '<path d="M2,-34 Q4,-84 12,-104 Q20,-110 24,-98 Q20,-66 16,-30 Z"/>' + // giữa
      '<path d="M18,-28 Q30,-70 40,-84 Q48,-88 50,-78 Q44,-50 32,-18 Z"/>' + // trỏ
      '<path d="M36,14 Q60,0 74,-14 Q84,-18 82,-8 Q72,14 40,40 Z"/>' + // ngón cái
      '<g opacity=".7"><circle cx="-56" cy="-4" r="3"/><circle cx="60" cy="40" r="4"/><circle cx="-8" cy="-118" r="2.4"/><circle cx="84" cy="-30" r="2"/></g>' +
      (chay ? '<path d="M-22,70 q-2,50 0,110 q3,8 6,0 q2,-56 2,-106 z M8,74 q-1,30 1,64 q3,6 5,0 q1,-34 0,-64 z M28,62 q2,20 0,40 q3,4 5,0 q0,-20 -1,-40 z"/>' : '') + '</g>';
  }
  T.tap = function () {
    var tap = G.$('tap'); if (!tap || tap.querySelector('.td-tapnen')) return;
    var s = '<svg class="td-tapnen" viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="tdTapN"><stop offset="0" stop-color="#FFB050" stop-opacity=".35"/><stop offset="1" stop-color="#FFB050" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="480" cy="300" r="240" fill="url(#tdTapN)" class="td-lap"/>' +
      tayMau(250, 170, -14, 1, '#5A0604', .75, true) + tayMau(730, 360, 18, .7, '#3A0504', .6, false) +
      '<g transform="translate(480,410)"><rect x="-9" y="0" width="18" height="70" rx="2" fill="#D8CCB8"/><path d="M-6,4 q4,12 1,26" stroke="#B8A890" stroke-width="2" fill="none"/>' +
      '<path d="M0,-2 q-8,-12 0,-26 q8,14 0,26 z" fill="#FFC060" class="td-lua"/><path d="M0,-4 q-3,-6 0,-13 q3,7 0,13 z" fill="#FFF4D0" class="td-lua"/></g></svg>';
    tap.insertAdjacentHTML('afterbegin', s);
  };
  document.addEventListener('DOMContentLoaded', T.tap);

  // hộp hỏi lại kiểu lá bùa (thay confirm() của trình duyệt); trả về Promise<boolean>
  T.hoi = function (html, co, khong) {
    return new Promise(function (res) {
      var cu = document.querySelector('.td-hoi'); if (cu) cu.remove();
      var d = document.createElement('div'); d.className = 'td-hoi'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
      d.innerHTML = '<div class="td-hoi-giay"><i class="td-hoi-an" aria-hidden="true">敕</i><p>' + html + '</p>' +
        '<div class="td-hoi-nut"><button class="co">' + (co || 'Đồng ý') + '</button><button class="khong">' + (khong || 'Thôi') + '</button></div></div>';
      (G.$('title').hidden ? G.$('stage') : G.$('title')).appendChild(d);
      function xong(v) { d.remove(); document.removeEventListener('keydown', phim, true); res(v); }
      function phim(e) { if (e.code === 'Escape') { e.stopPropagation(); xong(false); } }
      d.onclick = function (e) { if (e.target.closest('.co')) xong(true); else if (e.target.closest('.khong') || e.target === d) xong(false); };
      document.addEventListener('keydown', phim, true);
      d.querySelector('.khong').focus();
    });
  };
})();
