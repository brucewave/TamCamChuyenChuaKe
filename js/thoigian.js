// Thời gian: không bắt người chơi về chõng tre ngủ để sang buổi. Nút ⏳ Đợi trên HUD dùng được ở bất cứ đâu;
// trong ngày thì thời gian trôi ngay tại chỗ, chỉ sang ngày mới mới về phòng ngủ. Xong việc bắt buộc của buổi thì nút sáng lên
// nhắc nhẹ, không tự đẩy thời gian (vẫn làm tiếp được việc phụ). Chõng tre vẫn còn, ai thích thì vẫn nằm nghỉ được.
var G = window.G || (window.G = {});
G.thoigian = {};

(function () {
  var T = G.thoigian, $ = G.$;
  var KE = { sang: 'chieu', chieu: 'toi', toi: 'dem', dem: 'sang' };
  var NHAN = { chieu: 'Đợi đến chiều', toi: 'Đợi đến tối', dem: 'Đợi đến đêm', sang: 'Ngủ đến sáng' };
  var nut, truoc = { key: null, chan: null };

  function chuong() { var S = G.S; if (!S || S.loc.indexOf('ky_') === 0) return null; var C = G.story.cur(S); return C && C.gate && C.rest ? C : null; }

  T.bam = function () {
    var C = chuong(); if (!C || G.ui.modal || G.world.locked) return;
    var why = C.gate(G.S);
    if (why) { G.ui.toast(why, 3400); if (G.audio.sfx) G.audio.sfx('bad'); return; }
    C.rest();
  };

  function capNhat() {
    if (!nut) return;
    var S = G.S, C = chuong();
    var hien = !!(C && G.world.ready && $('title').hidden && $('cine').hidden && !(G.danger && G.danger.active));
    nut.hidden = !hien;
    if (!hien) return;
    var next = KE[S.phase], why = C.gate(S), chan = !!why;
    var nhan = NHAN[next] || 'Đợi';
    if (nut._n !== nhan) { nut._n = nhan; nut.querySelector('span').textContent = nhan; nut.setAttribute('aria-label', nhan + ' (phím T)'); }
    nut.classList.toggle('chua', chan);
    nut.title = chan ? why : nhan;
    // vừa xong việc bắt buộc của buổi: nhắc một lần
    var key = S.chapter + S.day + S.phase;
    if (truoc.key === key && truoc.chan === true && !chan) {
      nut.classList.remove('nhac'); void nut.offsetWidth; nut.classList.add('nhac');
      G.ui.toast('Việc buổi này đã xong. Bấm **⏳ ' + nhan + '** khi muốn, hoặc đi dạo hỏi chuyện thêm.', 4200);
    }
    if (truoc.key !== key) nut.classList.remove('nhac');
    truoc.key = key; truoc.chan = chan;
  }

  // lời nhắc cũ "nghỉ ở chõng tre" đổi thành nút ⏳
  var DOI = [
    [/Nghỉ ở \*\*chõng tre\*\* để sang buổi sau\.?/g, 'Xong việc thì bấm **⏳ Đợi** để sang buổi sau.'],
    [/Về \*\*chõng tre\*\* nghỉ, chờ đêm/g, 'Bấm **⏳ Đợi** đến đêm'],
    [/Nghỉ ở chõng tre đến chiều\.?/g, 'Bấm **⏳ Đợi** đến chiều.'],
    [/Nghỉ ở chõng tre\.?/g, 'Bấm **⏳ Đợi** để sang buổi sau.'],
    [/Nghỉ đến chiều/g, 'Bấm **⏳ Đợi** đến chiều'],
    [/Nghỉ chờ đêm rằm/g, 'Bấm **⏳ Đợi** đến đêm rằm'],
    [/Nghỉ chờ đêm/g, 'Bấm **⏳ Đợi** đến đêm'],
    [/Nghỉ đến sáng/g, 'Bấm **⏳ Ngủ** đến sáng'],
    [/Về phòng ngủ\.?/g, 'Bấm **⏳ Ngủ** để sang sáng hôm sau.']
  ];
  var obj0 = G.story.objective;
  G.story.objective = function (S) {
    var o = obj0.apply(this, arguments) || '';
    if (S && S.chapter !== 'mo_dau') DOI.forEach(function (d) { o = o.replace(d[0], d[1]); });
    return o;
  };

  document.addEventListener('DOMContentLoaded', function () {
    nut = document.createElement('button'); nut.id = 'btn-doi'; nut.hidden = true;
    nut.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 21h12"/><path d="M7 3c0 5 10 5 10 9s-10 4-10 9"/><path d="M17 3c0 5-10 5-10 9" opacity=".45"/><path d="M10 18h4"/></g></svg><span>Đợi</span><kbd>T</kbd>';
    nut.onclick = T.bam;
    $('hud-left').insertBefore(nut, $('objective'));
    window.addEventListener('keydown', function (e) { if (e.code === 'KeyT' && !e.repeat && G.S && $('title').hidden && !G.ui.modal) { T.bam(); e.preventDefault(); } });
    setInterval(capNhat, 250);
  });
})();
