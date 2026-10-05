// Nhảy thẳng vào chương / cảnh để chơi thử. Mỗi điểm nhảy dựng sẵn trạng thái như người chơi đã đi tới đó.
var G = window.G || (window.G = {});

(function () {
  var $ = G.$;
  var MO_DAU_CLUES = ['L01', 'V02', 'V01', 'V03', 'L02', 'V04'];
  var D3_CLUES = MO_DAU_CLUES.concat(['L03', 'L05', 'V05', 'L04', 'L07']);

  function base() {
    var S = G.newState();
    S.flags.intro_done = S.flags.het_mo_dau = true;
    S.items.bat_nuoc = S.items.gao_muoi = true;
    MO_DAU_CLUES.forEach(function (k) { S.clues[k] = { isNew: false, day: 3 }; });
    S.deduce.D01 = { day: 1 }; S.deduce.death_tam = {}; S.deduce.death_thay = {};
    return S;
  }
  function ch1(S, day, phase, loc, x, y) {
    S.chapter = 'ch1'; S.day = day; S.phase = phase; S.beat = 'c1';
    S.money = 12; S.inv = { nhang: 3, gao: 4, bua: 3 }; S.items.chuong = true; S.verdict = {};
    S.loc = loc; S.x = x; S.y = y;
    S.flags.c1_vao = S.flags.c1_bacu = true;
    return S;
  }
  function addClues(S, list) { list.forEach(function (k) { S.clues[k] = { isNew: false, day: S.day }; }); }

  var POINTS = [
    { id: 'md', name: 'Mở đầu · từ đầu', run: function () { G.start(null); } },
    { id: 'md_dem', name: 'Mở đầu · Đêm 1 (lễ trấn vong)', run: function () {
      var S = G.newState(); S.flags.intro_done = S.flags.met_dighe = S.flags.mam_done = true; S.clues.L01 = {}; S.clues.V02 = {};
      S.loc = 'nha_dighe'; S.x = 754; S.y = 500; S.beat = 'gap_dighe';
      G.start(S); setTimeout(G.prologue.sangDem, 300); } },
    { id: 'md_dem2', name: 'Mở đầu · Đêm 2 (Ký ức Bắt tép)', run: function () {
      var S = G.newState(); ['intro_done', 'met_dighe', 'mam_done', 'found_riu', 'cau_rung', 'le_done'].forEach(function (k) { S.flags[k] = true; });
      ['L01', 'V02', 'V01'].forEach(function (k) { S.clues[k] = {}; }); S.deduce.D01 = {}; S.items.bat_nuoc = true;
      S.phase = 'dem'; S.beat = 'dem2'; S.loc = 'nha_dighe'; S.x = 640; S.y = 160;
      G.start(S); } },
    { id: 'c1', name: 'Chương 1 · từ đầu', run: function () { var S = base(); S.loc = 'nha_dighe'; S.x = 754; S.y = 500; G.start(S); } },
    { id: 'c1_dem1', name: 'Chương 1 · Đêm 1 (chim có hồn người)', run: function () {
      var S = ch1(base(), 1, 'dem', 'cung_vuon', 700, 470); S.flags.c1_vua = true; addClues(S, ['L03']); G.start(S); } },
    { id: 'c1_d2', name: 'Chương 1 · Chiều ngày 2 (nồi ninh, giải hạn)', run: function () {
      var S = ch1(base(), 2, 'chieu', 'cung_bep', 300, 300);
      ['c1_vua', 'c1_soi_chim', 'c1_dem1', 'c1_giet_chim', 'c1_vut_long', 'job_sao', 'job_que'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, ['L03', 'L05']); G.start(S); } },
    { id: 'c1_d3', name: 'Chương 1 · Sáng ngày 3 (Lài chết)', run: function () {
      var S = ch1(base(), 3, 'sang', 'cung_san', 700, 520);
      ['c1_vua', 'c1_soi_chim', 'c1_dem1', 'c1_giet_chim', 'c1_vut_long', 'c1_noi', 'c1_noi_xong', 'job_giaihan', 'job_sao', 'job_que', 'c1_lai_chet'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, D3_CLUES); S.deduce.C1D1 = {}; G.start(S); } },
    { id: 'c1_dem3', name: 'Chương 1 · Đêm 3 (lẻn chôn lông)', run: function () {
      var S = ch1(base(), 3, 'dem', 'cung_vuon', 60, 520);
      ['c1_vua', 'c1_soi_chim', 'c1_dem1', 'c1_giet_chim', 'c1_vut_long', 'c1_noi', 'c1_noi_xong', 'job_giaihan', 'job_sao', 'job_que',
        'c1_lai_chet', 'c1_xem_lai_intro', 'c1_xem_lai', 'c1_lay_long'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, D3_CLUES.concat(['L06', 'V06', 'V07', 'V08'])); S.deduce.death_lai = {}; S.deduce.C1D2 = S.deduce.C1D3 = S.deduce.C1D5 = {};
      S.verdict.lai = 1; S.flags.c1_s03 = 'dung';
      S.c1Spots = [{ x: 180, y: 470 }, { x: 430, y: 455 }, { x: 610, y: 470 }, { x: 760, y: 560 }, { x: 330, y: 610 }];
      G.start(S); } },
    { id: 'c1_ky2', name: 'Chương 1 · Ký ức 2 (Nuôi Bống)', run: function () {
      var S = ch1(base(), 3, 'dem', 'cung_bep', 700, 460);
      ['c1_vua', 'c1_soi_chim', 'c1_dem1', 'c1_giet_chim', 'c1_noi_xong', 'job_giaihan', 'job_sao', 'c1_lai_chet', 'c1_xem_lai_intro', 'c1_xem_lai', 'c1_lay_long', 'c1_long_chon'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, D3_CLUES.concat(['L06', 'V06', 'V07', 'V08'])); S.deduce.death_lai = {}; S.verdict.lai = 1; S.flags.c1_s03 = 'dung';
      S.c1Spots = [];
      G.start(S); setTimeout(G.memory2.enter, 400); } }
    ,
    { id: 'c2', name: 'Chương 2 · từ đầu', run: function () { var S = c2base(); G.start(S); setTimeout(G.ch2.begin, 300); } },
    { id: 'c2_d2', name: 'Chương 2 · Sáng ngày 2 (bé Mít, lễ đốn cây)', run: function () {
      var S = c2base(); S.day = 2; S.phase = 'sang'; S.loc = 'cung_bep'; S.x = 760; S.y = 300;
      ['c2_thay_cay', 'c2_gap_moc', 'c2_rao', 'c2_dem1', 'c2_mit_chet'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, ['L09', 'L12']); G.start(S); } },
    { id: 'c2_lang', name: 'Chương 2 · Chiều ngày 2 (về làng đào lọ)', run: function () {
      var S = c2d2(); S.phase = 'chieu'; S.loc = 'hang_nuoc'; S.x = 560; S.y = 500; G.start(S); } },
    { id: 'c2_dem', name: 'Chương 2 · Đêm 2 (lẻn lấy vỏ xoan, hộp ngải)', run: function () {
      var S = c2d2(); S.phase = 'dem'; S.loc = 'cung_san'; S.x = 700; S.y = 520;
      ['c2_ve_lang', 'c2_dao_lo', 'c2_den_lang'].forEach(function (k) { S.flags[k] = true; }); addClues(S, ['L11', 'V15']); S.items.lo_xuong = 3;
      G.start(S); } }
    ,
    { id: 'c3', name: 'Chương 3 · từ đầu', run: function () { var S = c3base(); G.start(S); setTimeout(G.ch3.begin, 300); } },
    { id: 'c3_dem1', name: 'Chương 3 · Đêm 1 (Nụ dệt mất hồn)', run: function () {
      var S = c3base(); S.chapter = 'ch3'; S.phase = 'dem'; S.loc = 'cung_gieng'; S.x = 460; S.y = 300;
      ['job_anvi', 'c3_hat'].forEach(function (k) { S.flags[k] = true; }); addClues(S, ['L14', 'L15']); G.start(S); } },
    { id: 'c3_d2', name: 'Chương 3 · Chiều ngày 2 (Ký ức Trèo cau)', run: function () {
      var S = c3d2(); S.phase = 'chieu'; S.loc = 'cung_bep'; S.x = 700; S.y = 470; G.start(S); } },
    { id: 'c3_chay', name: 'Chương 3 · Đêm 2 (đốt khung cửi, cháy nhà dệt)', run: function () {
      var S = c3d2(); S.phase = 'dem'; S.flags.c3_ky4 = true; addClues(S, ['V21']); S.loc = 'cung_vuon'; S.x = 900; S.y = 520; G.start(S); } },
    { id: 'c3_d3', name: 'Chương 3 · Sáng ngày 3 (Thầy Cả còn sống?)', run: function () {
      var S = c3d2(); S.day = 3; S.phase = 'sang'; ['c3_ky4', 'c3_dot', 'c3_chay', 'c3_ba_goc', 'c3_thoi', 'c3_thoat', 'c3_chay_xong', 'c3_cuu_tu'].forEach(function (k) { S.flags[k] = true; });
      addClues(S, ['V21', 'V22', 'L18']); S.deduce.death_chay = {}; S.items.con_thoi = true; S.loc = 'cung_bep'; S.x = 760; S.y = 300; G.start(S); } }
    ,
    { id: 'c4', name: 'Chương 4 · từ đầu', run: function () { var S = c4base(); G.start(S); setTimeout(G.ch4.begin, 300); } },
    { id: 'c4_dem1', name: 'Chương 4 · Đêm 1 (theo Đội Ngạn ra bìa rừng)', run: function () {
      var S = c4base(); S.phase = 'dem'; S.loc = 'hang_nuoc'; S.x = 120; S.y = 500;
      ['c4_moi', 'c4_trong_hang'].forEach(function (k) { S.flags[k] = true; }); addClues(S, ['L19', 'V23', 'V24']); G.start(S); } },
    { id: 'c4_nha', name: 'Chương 4 · Đêm 2 (lẻn vào nhà dì ghẻ, hũ sành)', run: function () {
      var S = c4d2(); S.phase = 'dem'; S.loc = 'lang_duong'; S.x = 800; S.y = 520; S.flags.c4_ve_lang = true; addClues(S, ['L22']); G.start(S); } },
    { id: 'c4_ram', name: 'Chương 4 · Đêm rằm (chợ âm, quả thị)', run: function () {
      var S = c4d2(); S.day = 3; S.phase = 'dem'; S.loc = 'hang_nuoc'; S.x = 200; S.y = 500;
      ['c4_ve_lang', 'c4_lay_xong', 'c4_lay_hu'].forEach(function (k) { S.flags[k] = true; }); S.items.hu_sanh = true; S.items.ao_giay = true; S.inv.tienam = 4;
      addClues(S, ['L22', 'V26', 'V27', 'L23']); G.start(S); } }
    ,
    { id: 'c5', name: 'Chương 5 · từ đầu (đang giữ hũ)', run: function () { var S = c5base(true); G.start(S); setTimeout(G.ch5.begin, 300); } },
    { id: 'c5_dem', name: 'Chương 5 · Đêm cao trào (giữ hũ, Sổ Tử đúng hết)', run: function () { var S = c5dem(true); G.start(S); } },
    { id: 'c5_dem_k1', name: 'Chương 5 · Đêm cao trào (đã để lại hũ)', run: function () { var S = c5dem(false); G.start(S); } },
    { id: 'c5_bimat', name: 'Chương 5 · Đêm cao trào (đủ điều kiện kết bí mật)', run: function () { var S = c5dem(true); S.flags.bm_giu_bua = S.flags.bm_da_thay = true; G.start(S); } }
  ];

  function c5base(hu) {
    var S = c4d2(); S.chapter = 'ch5'; S.day = 1; S.phase = 'sang';
    ['c4_ve_lang', 'c4_lay_xong', 'c4_do', 'c4_tra1', 'c4_tra2', 'c4_tra3', 'c4_qua_cho', 'c4_thi_gia', 'c4_hai', 'c4_bo_chinh', 'c4_het'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L22', 'V26', 'V27', 'L23']); S.verdict.ngan = 0;
    if (hu) { S.items.hu_sanh = true; S.flags.c4_lay_hu = true; }
    return S;
  }
  function c5dem(hu) {
    var S = c5base(hu); S.phase = 'dem'; S.loc = 'cung_san'; S.x = 900; S.y = 520; S.flags.c5_vua_di = true;
    addClues(S, ['L24', 'L25', 'V28']); if (hu) addClues(S, ['V29']);
    return S;
  }

  function c4base() {
    var S = c3base(); S.chapter = 'ch4'; S.day = 1; S.phase = 'sang';
    ['job_anvi', 'c3_hat', 'c3_dem1', 'c3_nu_chet', 'c3_cam_den', 'c3_ra_lenh', 'c3_lay_vai', 'c3_ky4', 'c3_dot', 'c3_chay', 'c3_thoi', 'c3_thoat', 'c3_chay_xong', 'c3_het'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L14', 'L15', 'L16', 'L17', 'L18', 'V19', 'V20', 'V21', 'V22']); S.items.con_thoi = true;
    S.verdict.nu = 0; S.verdict.chay = 2; S.verdict.thay = 1; S.inv.tienam = 0;
    return S;
  }
  function c4d2() {
    var S = c4base(); S.day = 2;
    ['c4_moi', 'c4_trong_hang', 'c4_ngan_chet'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L19', 'V23', 'V24', 'L20', 'L21', 'V25']); S.deduce.death_ngan = {};
    return S;
  }

  function c3base() {
    var S = c2base(); S.chapter = 'ch3'; S.day = 1; S.phase = 'sang'; S.loc = 'cung_bep'; S.x = 760; S.y = 300;
    ['c2_thay_cay', 'c2_gap_moc', 'c2_rao', 'c2_dem1', 'c2_mit_chet', 'c2_le', 'c2_chat', 'c2_moc_chet', 'c2_ve_lang', 'c2_dao_lo', 'c2_vo', 'c2_hop', 'c2_ky3', 'c2_don_xong', 'c2_het'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L09', 'L10', 'L11', 'L12', 'L13', 'V12', 'V14', 'V15', 'V16', 'V17', 'V18']); S.items.lo_xuong = 3;
    S.verdict.moc = 1; S.verdict.mit = 0;
    return S;
  }
  function c3d2() {
    var S = c3base(); S.day = 2;
    ['job_anvi', 'c3_hat', 'c3_dem1', 'c3_nu_chet', 'c3_cam_den', 'c3_ra_lenh', 'c3_lay_vai'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L14', 'L15', 'L16', 'L17', 'V19', 'V20']); S.deduce.death_nu = {};
    return S;
  }

  function c2base() {
    var S = ch1(base(), 1, 'sang', 'cung_bep', 760, 300);
    S.chapter = 'ch2';
    ['c1_vua', 'c1_soi_chim', 'c1_dem1', 'c1_giet_chim', 'c1_noi_xong', 'job_giaihan', 'job_sao', 'job_que', 'c1_lai_chet', 'c1_xem_lai', 'c1_lay_long', 'c1_long_chon', 'c1_ky2', 'c1_mam_cay', 'c1_het'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, D3_CLUES.concat(['L06', 'V06', 'V07', 'V08', 'V10'])); S.verdict.lai = 1; S.flags.c1_s03 = 'dung';
    return S;
  }
  function c2d2() {
    var S = c2base(); S.day = 2;
    ['c2_thay_cay', 'c2_gap_moc', 'c2_rao', 'c2_dem1', 'c2_mit_chet', 'c2_le', 'c2_chat', 'c2_moc_chet'].forEach(function (k) { S.flags[k] = true; });
    addClues(S, ['L09', 'L12', 'L10', 'V12', 'V14', 'L13', 'V17']); S.deduce.death_mit = {}; S.deduce.death_moc = {};
    return S;
  }

  G.jumpMenu = function () {
    var p = $('jump');
    p.innerHTML = '<h2>Chọn chỗ chơi thử</h2><p class="sub">Dành cho thử nghiệm. Nhảy vào sẽ ghi đè bản lưu hiện tại.</p><div class="list">' +
      POINTS.map(function (pt, i) { return '<button data-j="' + i + '">' + pt.name + '</button>'; }).join('') +
      '</div><button class="close">Đóng</button>';
    p.hidden = false;
    p.onclick = function (e) {
      if (e.target.closest('.close')) { p.hidden = true; return; }
      var b = e.target.closest('[data-j]'); if (!b) return;
      p.hidden = true;
      try { localStorage.removeItem(G.SAVE_KEY); } catch (er) {}
      if (G.danger.active) G.danger.stop();
      $('stage').classList.remove('soi', 'memory', 'lech', 'vo');
      POINTS[+b.dataset.j].run();
    };
  };
})();
