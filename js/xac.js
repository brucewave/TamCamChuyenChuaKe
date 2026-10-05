// Xác người chết trong cảnh: không dùng lại dáng đứng xoay ngang mà dựng model riêng.
// Nằm buông: tay chân xoè ra, da tái xám, quầng mắt thâm, môi tím, không thở không chớp; tuỳ cái chết mà thêm vũng nước,
// vũng máu, sợi chỉ thắt cổ. Riêng Thầy Cả: vắt ngang ngọn cau non như tấm áo phơi, đầu chúc xuống, miệng nhồi cau non.
var G = window.G || (window.G = {});

(function () {
  var INK = G.INK, A = G.art;
  var TAI = '#D2C8B8'; // da người chết

  // thân nằm: lấy model nhân vật, buông tay chân, tái da, thêm dấu vết của cái chết
  // xoay khớp bằng style (CSS): .chibi .ar1… đã đặt transform-origin ở vai/hông; dùng thuộc tính transform="rotate(a x y)" sẽ bị xoay lệch hai lần
  function than(look, o) {
    var s = A.chibi(Object.assign({}, look, { view: 'front', eyes: 'closed', expr: null, prop: null, blush: false, skin: TAI,
      mouth: o.mieng || 'open', mole: o.notRuoi === false ? false : look.mole, kid: false }));
    s = s.replace('class="chibi v-front"', 'class="chibi v-front xac-than"')
      .replace('<g class="ar ar1">', '<g class="ar ar1" style="transform:rotate(58deg)">')
      .replace('<g class="ar ar2">', '<g class="ar ar2" style="transform:rotate(-48deg)">')
      .replace('<g class="lg lg1">', '<g class="lg lg1" style="transform:rotate(16deg)">')
      .replace('<g class="lg lg2">', '<g class="lg lg2" style="transform:rotate(-10deg)">')
      .replace(/<ellipse class="shd"[^>]*\/>/g, '')
      .replace(new RegExp('fill="' + G.SKIN + '"', 'g'), 'fill="' + TAI + '"');
    var them = '<g stroke="none">' +
      '<ellipse cx="66" cy="92" rx="7" ry="3.4" fill="#5A4A6A" opacity=".45"/><ellipse cx="94" cy="92" rx="7" ry="3.4" fill="#5A4A6A" opacity=".45"/>' + // quầng mắt thâm
      '<ellipse cx="80" cy="101" rx="5.5" ry="4" fill="#5A5A7A" opacity=".55"/>' + // môi tím
      '<ellipse cx="80" cy="76" rx="38" ry="33" fill="#7A8AA0" opacity=".12"/></g>'; // tái xanh
    if (o.chi) them += '<path d="M60,110 Q80,120 100,110" fill="none" stroke="#A8180E" stroke-width="3.2"/><path d="M60,110 Q80,120 100,110" fill="none" stroke="#5A0A06" stroke-width="1" stroke-dasharray="2 3"/><path d="M98,111 q8,6 6,16 M100,110 q12,2 14,12" fill="none" stroke="#A8180E" stroke-width="1.8"/>';
    if (o.nuoc) them += '<path d="M44,70 q-14,10 -18,26 M46,84 q-12,14 -10,30 M116,70 q14,10 18,26 M114,84 q12,14 10,30" fill="none" stroke="' + (look.hairColor || INK) + '" stroke-width="3"/><g fill="#A8C8D0" stroke="none" opacity=".7"><circle cx="60" cy="70" r="2"/><circle cx="104" cy="96" r="1.6"/><circle cx="74" cy="130" r="1.8"/></g>';
    if (o.cauNon) them += '<g stroke-width="1.4"><ellipse cx="74" cy="101" rx="5" ry="4" fill="#6E9A4A"/><ellipse cx="84" cy="102" rx="5" ry="4" fill="#7EAA52"/><ellipse cx="79" cy="97" rx="4.4" ry="3.6" fill="#8AB85A"/></g>';
    return s.replace(/<\/g><\/svg>$/, them + '</g></svg>');
  }

  A.thanXac = than; // dùng trong phim: chuỗi <svg class=chibi> của thân nằm

  // Xác nằm trên đất. rot: góc nằm (90 / -90...). Trả về html cho thực thể (gốc toạ độ ở giữa thân)
  A.xac = function (look, o) {
    o = o || {};
    var rot = o.rot || 90, k = o.tre ? .42 : .5, nen = '';
    if (o.nuoc) nen += '<ellipse cx="0" cy="-36" rx="66" ry="26" fill="#2E4A4E" opacity=".55"/><ellipse cx="-6" cy="-40" rx="50" ry="17" fill="#4E7478" opacity=".5"/><path d="M-38,-46 q12,-4 24,0M10,-30 q10,-3 20,0" stroke="#BFE0E0" stroke-width="1.5" fill="none" opacity=".6"/>';
    if (o.mau) nen += '<path d="M-20,-30 q-26,6 -30,-8 q-2,-14 18,-14 q10,-12 30,-4 q22,4 16,18 q-6,14 -34,8 z" fill="#5A0A06" opacity=".7"/><ellipse cx="-8" cy="-34" rx="14" ry="5" fill="#8A140C" opacity=".6"/>';
    nen += '<ellipse cx="0" cy="-36" rx="' + (o.tre ? 38 : 48) + '" ry="14" fill="#1A0E08" opacity=".28"/>';
    return '<svg style="position:absolute;left:-80px;top:-80px;overflow:visible" width="160" height="80" viewBox="-80 -80 160 80" aria-hidden="true">' + nen + '</svg>' +
      '<div class="xac-than-w" style="position:absolute;left:0;top:0;transform:translate(0,-36px) scale(' + k + ',' + (k * .9) + ') rotate(' + rot + 'deg) translate(0,66px);transform-origin:0 0">' +
      '<div style="position:absolute;left:0;top:0">' + than(look, o) + '</div></div>'; // .ent .chibi tự đặt left:-80 top:-178 (chân ở gốc)
  };

  // Thầy Cả vắt trên ngọn cau non: eo gác lên ngọn, nửa trên rủ bên trái đầu chúc xuống, hai chân buông bên phải.
  // Vẽ trong khung 160x150, eo ở (80,34). Dùng cả ở cảnh (thu nhỏ) lẫn ảnh cận.
  A.xacVat = function (o) {
    o = o || {};
    var ao = '#3E3A4A', quan = '#2B2A33', s = '';
    // dải thắt lưng đỏ, thân áo rủ trái
    s += '<path d="M86,26 Q64,20 52,40 L40,92 Q52,100 66,94 L72,52 Q78,40 92,40 Z" fill="' + ao + '"/>';
    s += '<path d="M52,40 L40,92 Q46,96 52,96 L60,48 Z" fill="#1E1C26" opacity=".55" stroke="none"/><path d="M70,34 q-10,4 -14,14" fill="none" stroke="#5A5668" stroke-width="2" opacity=".7"/>';
    s += '<path d="M64,30 Q80,22 98,32" fill="none" stroke="#B84A3E" stroke-width="6"/><path d="M96,32 q6,8 2,18" fill="none" stroke="#B84A3E" stroke-width="3.4"/>';
    // hai tay buông qua đầu
    s += '<path d="M44,86 Q34,104 30,128" fill="none" stroke="' + INK + '" stroke-width="11"/><path d="M44,86 Q34,104 30,128" fill="none" stroke="' + ao + '" stroke-width="6"/><circle cx="29" cy="131" r="5" fill="' + TAI + '"/>';
    s += '<path d="M64,92 Q70,112 66,134" fill="none" stroke="' + INK + '" stroke-width="11"/><path d="M64,92 Q70,112 66,134" fill="none" stroke="' + ao + '" stroke-width="6"/><circle cx="66" cy="137" r="5" fill="' + TAI + '"/>';
    // đầu cạo chúc ngược, tóc mai bạc, râu dựng ngược lên phía cằm, miệng nhồi cau non (không có nốt ruồi)
    s += '<g transform="rotate(176 52 110)"><ellipse cx="52" cy="110" rx="20" ry="18" fill="' + TAI + '"/><ellipse cx="52" cy="110" rx="19" ry="17" fill="#7A8AA0" opacity=".15" stroke="none"/>' +
      '<path d="M33,114 Q32,104 36,100 Q37,108 39,114 Z M71,114 Q72,104 68,100 Q67,108 65,114 Z" fill="#D8D0C0"/>' +
      '<ellipse cx="46.5" cy="110.5" rx="3.6" ry="1.6" fill="#ECE6D6" stroke-width="1.2"/><ellipse cx="58.5" cy="110.5" rx="3.6" ry="1.6" fill="#ECE6D6" stroke-width="1.2"/><path d="M42.5,109.4 h8M54.5,109.4 h8" stroke-width="2"/><ellipse cx="46" cy="112" rx="4" ry="2" fill="#5A4A6A" opacity=".45" stroke="none"/><ellipse cx="58" cy="112" rx="4" ry="2" fill="#5A4A6A" opacity=".45" stroke="none"/>' +
      '<path d="M41,118 Q42,132 52,136 Q62,132 63,118 Q57,122 52,121 Q47,122 41,118 Z" fill="#E9E2D0"/>' +
      '<g stroke-width="1.2"><ellipse cx="47" cy="120" rx="4" ry="3.4" fill="#6E9A4A"/><ellipse cx="56" cy="120" rx="4" ry="3.4" fill="#7EAA52"/><ellipse cx="51.5" cy="116.5" rx="3.8" ry="3" fill="#8AB85A"/><ellipse cx="51.5" cy="123" rx="3.4" ry="2.6" fill="#6E9A4A"/></g></g>';
    // hai chân buông bên phải, giày vải
    s += '<path d="M82,36 Q92,58 96,96" fill="none" stroke="' + INK + '" stroke-width="14"/><path d="M82,36 Q92,58 96,96" fill="none" stroke="' + quan + '" stroke-width="9"/>';
    s += '<path d="M94,34 Q108,54 112,90" fill="none" stroke="' + INK + '" stroke-width="14"/><path d="M94,34 Q108,54 112,90" fill="none" stroke="' + quan + '" stroke-width="9"/>';
    s += '<ellipse cx="97" cy="100" rx="6" ry="9" fill="#4A3A30"/><ellipse cx="113" cy="94" rx="6" ry="9" fill="#4A3A30"/>';
    // quả cau rơi lưng chừng, con quạ đậu trên ngọn
    if (!o.khongQua) s += '<g transform="translate(118,8)"><path d="M0,14 q4,-12 14,-12 q8,0 10,6 l8,-2 l-6,6 q0,10 -12,12 q-10,2 -14,-10 z" fill="#141018"/><path d="M8,26 l-2,6M14,26 l2,6" stroke-width="1.4"/><circle cx="18" cy="6" r="1.4" fill="#E8D8A0" stroke="none"/></g>';
    return s;
  };
  // thực thể xác vắt trên cây trong cảnh vườn cau: eo trùng ngọn cau (gốc thực thể đặt ở ngọn)
  // nang: gốc thực thể nằm thấp hơn ngọn bao nhiêu px (để xác vẽ đè lên thân cây, không bị cây che)
  A.xacVatCanh = function (nang) {
    return '<svg class="xac-vat" style="position:absolute;left:-52px;top:' + (-22 - (nang || 0)) + 'px;overflow:visible" width="104" height="98" viewBox="0 0 160 150" aria-hidden="true">' +
      '<g stroke="' + INK + '" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#w)">' + A.xacVat() + '</g></svg>';
  };
})();
