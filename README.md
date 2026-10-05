# Thầy Pháp Cuối Cùng (tên tạm) · bản Mở đầu

Game HTML + JS thuần, góc nhìn chéo từ trên xuống, hình SVG theo mẫu chibi v2 của LanNaySeKhac. Không cần cài thư viện.
Cốt truyện tự viết, chỉ dựa trên trình tự cổ tích Tấm Cám dân gian. Xem `docs/`.

## Chạy

    python -m http.server 8124

rồi mở http://localhost:8124 (bấm "Chạm để bắt đầu" để bật âm thanh; lần đầu sẽ chạy phim mở đầu).

## Điều khiển
- Bấm vào cảnh để đi, bấm người / đồ vật để tương tác. WASD / mũi tên để đi, E / Space để tương tác.
- J: Sổ Tử (chọn 1 lời khai + 1 vật chứng → Đối chiếu). B: soi bát nước (sau lễ trấn vong). Esc: menu.

## Đã có
- Phim mở đầu (`js/cine.js`): đêm trăng, Tấm trèo cau, ba nhát rìu, cây đổ, ba nhát nữa trong bóng tối → tên game.
- 3 cảnh: Đường làng, Nhà dì ghẻ, Vườn cau. Đêm tối chỉ thấy quanh đèn lồng và nến (`G.world.drawDark`).
- Mở đầu đủ 3 ngày (`js/prologue.js`): bày mâm lễ, vẽ bùa, lễ gõ mõ theo nén nhang (buồng cau rụng thành răng), soi bát nước (dấu chân ướt, dấu tay trên cây), Ký ức 1 "Bắt tép" nhập vai Tấm (`js/memory.js`, 2 nhánh), cái chết của Thầy Cả, sứ giả, tráp có vảy rắn.
- Sổ Tử: 6 manh mối, 3 phép đối chiếu (D01 bắt buộc), 2 trang người chết.
- Âm thanh tự sinh (`js/audio.js`): ngũ cung, gió, dế, mõ, rìu, ru "ầu ơ".

## Chương 1: Vàng anh (`js/ch1.js`, `js/scenes2.js`, `js/danger.js`, `js/memory2.js`, `js/minigames2.js`)
- 6 cảnh trong cung: Hàng nước ngoài thành, Sân chầu, Vườn ngự, Giếng giặt, Cung hoàng hậu, Bếp cung + phòng Đăng (vào bằng cửa).
- 3 ngày × 4 buổi (sáng, chiều, tối, đêm), nghỉ ở chõng tre để sang buổi sau. NPC đứng theo lịch.
- Tiền và đồ nghề: việc vặt (gieo quẻ cho bà Sáu, cúng sào phơi áo giữ nhang trong gió, giải hạn cho Lài), mua nhang / gạo muối / giấy bùa ở hàng nước.
- Vụ án Lài: 7 phép đối chiếu mới, kết luận trong Sổ Tử (bấm hai lần để chốt). Kết luận sai thì bà Sáu chết thêm (trang S03b).
- Cảnh nguy hiểm: lính có vùng nhìn (dấu ?/!), chỗ nấp, vong chỉ nghe tiếng động. Shift / bấm đúp: chạy (ồn). G: gạo muối. C: chuông (dụ lính, nghe thì thầm, đánh thức vong). Chết thì về đầu cảnh.
- Ký ức 2 "Nuôi Bống": đọc vè gọi Bống theo nhịp, chăn trâu đồng xa, cục máu, con gà mắt trắng, chôn bốn lọ xương.
- Kết chương: Đội Ngạn được dì ghẻ che, mầm cây lá đỏ.

## Chương 2: Xoan đào (`js/ch2.js`, `js/scenes3.js`, `js/memory3.js`, `js/closeups3.js`, đặc tả `docs/dac-ta-ch2.md`)
- Cây xoan mọc trong một đêm ở chỗ chôn lông chim. Lão Mộc rào cây, hố đào sẵn cạnh rào.
- Hai cái chết: bé Mít (vong: cái chết đầu tiên do hồn Tấm gây ra) và lão Mộc (người: chốt rìu bị nới, thư dì ghẻ).
- Về làng Đông bằng xe bò (2 đồng): ông lão kể về thầy cúng già, đào được 3 lọ xương Bống, lọ thứ tư đã mất.
- Đêm 2: hai cảnh lẻn (vườn ngự: lính + rễ cây nghe tiếng; cung hoàng hậu: dì ghẻ đi tuần) để lấy vỏ xoan và hộp ngải.
- Ký ức 3 "Nhặt thóc, đi hội": tách thóc gạo trong một nén nhang hoặc đọc vè gọi chim sẻ; đàn chim không bay đi; hài thêu rơi xuống sông.
- Kết: cây bị đốn, gỗ đem đóng khung cửi cho hoàng hậu.

## Chương 3: Khung cửi (`js/ch3.js`, `js/scenes4.js`, `js/memory4.js`, `js/closeups4.js`, đặc tả `docs/dac-ta-ch3.md`)
- Cảnh mới: Nhà dệt (cửa giữa dãy nhà sau giếng giặt).
- Lễ an vị khung cửi (vẽ bùa). Khung cửi tự hát câu vè dân gian. Nụ dệt mất hồn rồi chết vì sợi chỉ thắt cổ (ma giết).
- Sổ tay của thầy: nét móc cuối nét ngang, nhớ ra nốt ruồi chờ lộc. Ghép với cái xác, lá bùa trong hộp ngải, giấy bùa trong tro bếp: kết luận lại trang Thầy Cả, ra **Thầy Cả còn sống**.
- Đêm 2: đốt khung cửi, nhà dệt bùng cháy ở ba góc. Cảnh lửa có đồng hồ khói 75 giây: lấy con thoi quấn tóc, cứu bà Tư (không bắt buộc).
- Ký ức 4 "Giỗ cha, trèo cau": giữ thăng bằng, không thể thắng; quả cau dính máu có vết móng tay.
- Kết: tro rắc ba ngả sông; tin đồn cây thị một quả ở bìa rừng.

## Chương 4: Quả thị (`js/ch4.js`, `js/scenes5.js`, `js/closeups5.js`, đặc tả `docs/dac-ta-ch4.md`)
- Cảnh mới: Đường rừng (đêm rằm thành chợ âm), Bìa rừng phía tây (cây thị một quả, ao thị), Nhà bà cụ (cửa sau quán nước). Đường rừng chỉ mở từ chương 4.
- Trông hàng nước giúp bà cụ (đưa đúng món), khách kể chuyện. Bà cụ từng là bà đồng.
- Đêm 1: lẻn theo Đội Ngạn, nhìn vong kéo hắn xuống ao (ma giết). Đêm 2: lẻn vào nhà dì ghẻ, hai người áo đen canh: sổ nợ ngải, hũ sành gọi tên Đăng ("Dạ, thầy" = cờ kết bí mật `bm_da_thay`), chọn mang hũ hay để lại.
- Đêm rằm: áo giấy + tiền âm, câu đố đồng dao ở cửa chợ âm, trả tiền cho từng hồn, đừng chạy. Quả thị giả, quả thị thật. Têm trầu cánh phượng, đặt quả vào chĩnh.

## Chương 5: Nồi nước sôi (`js/ch5.js`, `js/closeups6.js`, đặc tả `docs/dac-ta-ch5.md`)
- Sáng: vua nhận ra Tấm qua miếng trầu cánh phượng. Tấm về, mắt không chớp, qua bát nước chỉ có một nửa người. Bà cụ dặn về hũ, ba lọ xương, chỉ đỏ.
- Chiều: Cám hỏi chị làm sao mà trắng; hố đào sẵn có bậc; đáy hũ khắc ngày sinh của Cám.
- Đêm: Thầy Cả còn sống ra mặt. Cảnh nguy hiểm ba nén nhang: Thầy Cả có vùng nhìn, vong Sổ Tử nghe tiếng; đập hũ bằng ba lọ xương, thả chỉ đỏ kéo Cám lên.
- 4 kết: 1 Như cổ tích, 2 Muộn một nén nhang, 3 Chuyện chưa kể, 4 Đệ tử chân truyền (bí mật, nối sang phim gốc đa). Các kết đã mở hiện ở màn hình chính.
- Điều kiện kết bí mật: giữ lại mẩu giấy bùa ở tro bếp (Chương 3), đáp "Dạ, thầy" (Chương 4), có ba lọ xương.

## Ghi chú
- Đổi tên game ở `G.TITLE` trong `js/core.js`.
- Sau mỗi lần sửa JS/CSS, tăng số `?v=` trong `index.html`.
- Xem lại phim mở đầu: nút "Xem lại đoạn mở đầu" ở màn hình chính.

## Đồ hoạ (`js/dohoa.js`, `css/dohoa.css`, `js/ve.js`)
- `js/ve.js` (`G.ve`): bộ vẽ chi tiết dùng chung — tán lá nhiều lớp sáng tối (`tan`), thân cây vỏ sần (`than`), cau lá kép, bụi tre, rào tre, đống rơm, lá súng / hoa súng, mái rạ có sợi, chữ khắc vàng trên biển gỗ (`chuKhac`, phông Playfair Display).
- `js/dohoa.js` (`G.dohoa`): lớp ánh sáng theo buổi (tia nắng chiều, sương sáng, hoàng hôn, trăng đêm), sương trôi có thị sai, bóng mây trôi trên mặt đất, chất liệu nền, hạt bụi / đom đóm phát sáng, hạt phim. Móc vào `G.world.enter` và `G.world.drawDark`.
- Nhân vật có đổ khối (gradient `gShd`, `gHead`, `gBody` trong `index.html`); ánh đèn đêm vẽ lại trong `G.world.drawDark` (tắt dần mềm, lõi đèn ấm).
- Menu Esc → "Đồ hoạ: Cao / Thấp". Mặc định Thấp trên điện thoại. Lưu ở `localStorage.tpcc_dohoa`.
- Tránh `mix-blend-mode` và `filter` trên lớp phủ toàn màn hoặc trên `#world`: nền SVG có bộ lọc nét run tay rất nặng, mỗi lần phải hoà trộn lại là cả khung bị vẽ lại.

## Thời gian và bản đồ
- `js/thoigian.js`: nút **⏳ Đợi** (phím T) trên HUD thay cho việc phải về chõng tre ngủ. Trong ngày, thời gian trôi tại chỗ; chỉ sang ngày mới mới về phòng. Điều kiện sang buổi lấy từ `C.gate` của từng chương; xong việc bắt buộc thì nút sáng lên nhắc một lần. Lời nhắc "nghỉ ở chõng tre" trong mục tiêu được đổi lúc chạy. Phần Mở đầu vẫn giữ các lần ngủ theo kịch bản.
- Bản đồ là đồ nghề: nút **Bản đồ** trên thanh đồ nghề (phím M) lấy ra / cất đi tờ bản đồ nhỏ; bấm vào tờ bản đồ để mở bản đồ lớn. Trạng thái lưu ở `localStorage.tpcc_mm`.

## Sổ Tử (`js/notebook.js`, `css/sotu.css`)
- Dáng một cuốn sổ âm phủ: bìa sơn then chữ thếp vàng, giấy dó kẻ cột son, dấu son vuông (`dau()`), hai dải lụa đánh dấu trang một đen một trắng (gợi Hắc Bạch Vô Thường).
- Dấu chìm "SINH TỬ BỘ" sau bìa và góc mỗi trang người chết: mối nối về sau, sổ của Đăng là một trang rời của sổ Sinh Tử nhà Diêm Vương.
- Trang người chết: chân dung thờ vẽ từ ngoại hình nhân vật (`N.anhTho`, bảng `MAT` nối id người chết với `G.LOOKS`), băng tang đen, bát hương; ảnh hiện trường thu nhỏ bên dưới; dấu "ĐÃ KẾT" / "CHƯA RÕ". Thêm người chết mới thì thêm một dòng vào `MAT`.
- Dấu "SINH TỬ BỘ" rõ dần theo chương (bảng `STB` trong `js/notebook.js`): gần như vô hình ở Mở đầu, ngả đỏ từ Chương 4, Chương 5 hiện thêm dòng "Âm ty · Diêm La điện". Lần đầu mở sổ ở Chương 3, 4, 5 Đăng có một câu nghĩ (`NHAN_RA`, cờ `stb_ch3`…).

## Xác người chết (`js/xac.js`)
- `G.art.xac(look, { rot, nuoc, mau, chi, tre, cauNon })`: xác nằm buông tay chân, da tái, quầng mắt thâm, môi tím, không thở; vũng nước (chết đuối), vũng máu, sợi chỉ thắt cổ.
- `G.art.xacVat()`: Thầy Cả vắt trên ngọn cau, đầu chúc xuống, miệng nhồi cau non, quạ đậu. Dùng chung cho cảnh vườn cau (`xacVatCanh`), ảnh cận `xac_cau` và phim `cauThayCa`.
- Phim cảnh chết (`js/phimchet.js`, ghi đè `G.cut.ve`): giếng của Lài (xác úp mặt, tóc loang, tay giơ lông vàng anh), ao của Đội Ngạn (đứng trên cành với quả thị; bước 2 những bàn tay tái kéo xuống), nhà dệt cháy ba góc (Bà Tư sau song cửa), cây xoan rỉ máu (bước 2 dấu bàn tay hiện trên vỏ). Nhân vật trong phim dùng model ngoài game qua hàm `nguoi()`.

## Sprite diễn hoạt (`js/sprite.js`, `css/sprite.css`)
- `G.sprite.ve(look, { view, tu, x, y, k, riu, nhan, bong, dem, id })`: dựng nhân vật cho phim từ model trong game, giữ khớp tay chân để CSS cho cử động. Động tác (`tu`): `leo` trèo cây, `bam` bám chặt run, `riu` cầm rìu (thêm lớp `chat` để bổ một nhát, `G.sprite.lai(el, 'chat')`), `vung` vùng vẫy, `keo` bị kéo xuống, `tho` thở yếu, `dung` đứng thở.
- Xoay khớp luôn bằng CSS (`style="transform:rotate(..deg)"`), không dùng thuộc tính `transform="rotate(a x y)"`: CSS `transform-origin` ở vai/hông sẽ cộng thêm lần nữa làm tay chân văng ra.
- Phim mở đầu (`js/cine.js`) dùng sprite: Tấm trèo cau, nghe tiếng rìu thì bám chặt, cây đổ thì quơ tay; kẻ dưới gốc (bóng tối, nhẫn bạc) bổ từng nhát. `G.cine.tranh.canh/dat/riu()` trả về từng khung để xem riêng.
- Hai hồi ức của Tấm (`hupBun`, `riuNhan` trong `js/phimchet.js`) cũng dùng sprite.
- Cận chiếc nhẫn bạc (`G.cut.ve.canNhan` trong `js/phimchet.js`): bàn tay nắm cán rìu, nhẫn loé sáng, máu chảy từ nhẫn nhỏ giọt. Dùng chung cho bước 3 hồi ức `riuNhan` và khung cuối phim mở đầu (`riuSvg` trong `js/cine.js`).
- Bàn tay dùng chung (`G.ve.banTay({ kieu: 'nam' | 'buong' | 'an', nhan, mau, ao })` trong `js/ve.js`): tay áo → cổ tay → mu bàn tay có gân → khớp đốt → ngón có móng → ngón cái. Dùng cho khung cận nhẫn và các ảnh đặc tả có bàn tay.
- Ảnh đặc tả vẽ lại bằng sprite (`js/closeups7.js`, ghi đè hình cũ cùng tên): `flash_riu`, `tui_tien`, `qua_hu`, `bong_dao`, `be_mit`, `tam_nua`, `por_tam`, `por_nu`, `por_basau`.
- Sprite trèo / bám nhìn từ sau lưng không vẽ tay (tay ôm thân cây khuất sau người), chỉ lộ hai bàn tay bám phía trên đầu. Tư thế `giau` (giấu rìu sau lưng) và lớp `sp-rut` (từ từ rút rìu lên qua vai) dùng trong phim mở đầu.
- Lá bùa (`G.ve.bua(o)` / `G.ve.buaSvg(o)` trong `js/ve.js`, khung 120×360): giấy vàng viền son kép, bát quái quanh vầng mặt trời, chữ 敕令 (phông Ma Shan Zheng), vòng cung ôm ba chữ dọc (`o.chu`, mẫu sẵn `G.ve.BUA`), hai cột ô vuông / chấm tròn. `o.cu` giấy cũ, `o.chay` cháy đáy, `o.moc` nét móc cuối nét ngang (chữ tay Thầy Cả — manh mối). Đã dùng ở: đầu cửa và chĩnh nhà bà cụ, bàn viết bùa phòng Đăng, gốc cau sau lễ trấn vong, trụ khung cửi sau lễ an vị, các ảnh đặc tả hũ sành / hộp ngải / tro bếp / miệng hũ và phim `quaHu`.
- Ảnh cận bộ phận cơ thể (cùng trong `js/closeups7.js`): `co_lai` (năm vết ngón tay to bản quanh cổ Lài, viền lam qua mắt âm dương), `co_chan` (dấu tay nhỏ bấu cổ chân Đội Ngạn), `ngon_tay` (hai bàn tay Nụ, đầu ngón rách rướm máu trên khổ vải), `ban_tay` (bàn tay ma móng dài trồi khỏi bùn dưới tay Tấm), `chan_tran` (dấu chân trần phát sáng về phía đông). `G.ve.banTay` có thêm `mongDai` (móng dài đen) và `rach` (đầu ngón rách).
- `dau_ca` (cũng trong `js/closeups7.js`): đầu cá bống to bằng đầu người trồi khỏi mặt giếng — vây lưng gai, vây ngực, vảy/đốm/nhớt, môi dày lộ răng người, và một con MẮT NGƯỜI (lòng trắng gân máu, tròng nâu, mí và lông mi); nước nhỏ giọt, sóng tròn, bóng con mắt in dưới nước.

## Nhân vật: hình vẽ và hoạt ảnh (`js/art.js`, `css/nhanvat.css`)
- `G.art.chibi` vẽ chi tiết hơn, vẫn giữ tỉ lệ chibi và nét mực: sợi tóc + vệt sáng theo từng kiểu tóc (búi Đăng buộc dải vải đỏ, Tấm rẽ ngôi với hai lọn tóc buông trước vai và tóc dài buộc dải sau lưng, búi tó bà cụ, nan và quai nón lá, khăn vấn bắt chéo trước trán), tai, lông mày cho mắt to, mắt có tròng nâu và hai điểm sáng, má hồng nhạt; nhìn nghiêng có mảng tóc sau gáy, tai và sống mũi ở mép mặt.
- Áo: cổ chữ V viền đậm (đàn bà lộ yếm đỏ, đàn ông lộ ngực), khuy tết, nếp áo, gấu áo, ánh sáng trên vai; thắt lưng (`sash`, đàn bà mặc định lụa xanh hoa lý) có nút và hai dải buông. Tay áo rộng có cổ tay viền, bàn tay có ngón cái và ngón. Ống quần loe có gấu gập, dép quai (hoặc chân trần với trẻ con / `shoes` = màu da). Váy có gấu sẫm và nếp xếp. `body: 'wide'` làm thân rộng. Tráp của Đăng có nắp, quai qua vai, dán lá bùa.
- Nhóm động mới: `.dau` (đầu), `.mt` (nét mặt), `.toc` (tóc / dải buông), `.tua` (dải thắt lưng), `.vay` (váy). Các nhóm cũ giữ nguyên markup (`.bd .e .lg1 .lg2 .ar1 .ar2 .shd`) cho `js/sprite.js` và `js/xac.js`. Sprite tô bóng (`bong`) giờ tô cả nét màu (trừ nét mực và nhẫn bạc).
- `css/nhanvat.css`: đi (chu kỳ .5s, khớp tiếng bước): nhìn nghiêng chạm gót → trụ → đẩy → nhấc chân qua, tay đánh ngược chân, người hơi đổ tới, hông nhún hai lần mỗi chu kỳ, đầu trễ nhịp; nhìn trước / sau chân nhấc và co, thân lắc sang chân trụ. Chạy (`.walk.run`, `js/world.js` gắn khi giữ Shift / bật chạy, .36s): bước dài, nhấc cao, đổ người nhiều hơn. Đứng: thở, thỉnh thoảng nghiêng đầu ngó quanh và liếc mắt (mỗi NPC một nhịp). Tóc, dải thắt lưng, váy đung đưa trễ nhịp sau thân. Treo / xác đứng im; `prefers-reduced-motion` tắt chuyển động phụ.

## Hoá thân của Tấm (`js/hoathan.js`, `css/hoathan.css`)
- `G.hoathan.chim({ x, y, s, flip, kieu, ma })`: chim vàng anh gáy đen (mình vàng, dải đen qua mắt vòng ra gáy, cánh đuôi đen viền vàng, mắt đỏ, mỏ hồng). `kieu`: `dau` (đậu: thở, nghiêng đầu, chớp mắt, vẫy đuôi), `nhay` (nhảy dọc cành), `hot` (ngẩng đầu, há mỏ theo nhịp, nốt nhạc và gợn tiếng), `bay` (đập cánh), `chet` (nằm im). `ma`: quầng đỏ thở, mắt loé, đầu giật cục. Dùng ở cây đào vườn ngự chương 1 (ngày: nhảy, chiều: hót cho vua nghe, đêm: hồn ma), ảnh `bong_dao`, nền tiêu đề chương 1. `G.art.vangAnh` cũ nay gọi hàm này.
- `G.hoathan.xoan({ x, y, chat, layVo })`: cây xoan đào chương 2 — ba cành đung đưa lệch pha, lá kép lông chim, chùm hoa tím, hoa và lá chét rơi lả tả, cơn gió rung tán mỗi ~11 giây; trong vỏ có hai mắt gỗ và miệng hốc từ từ mở, mở mắt âm dương thì hiện rõ, mắt đỏ, cả tán rùng mình; vết rìu rỉ nhựa đỏ nhỏ giọt. Nền tiêu đề chương 2 cũng là cành xoan hoa rơi.
- `G.art.khungCui(x, y, o)` (ghi đè bản trong `js/scenes4.js`): con thoi chạy qua miệng vải, go nhấp so le, khung lược đập, bàn đạp nhún, sợi dọc rung, hoa văn vải nhích dần về trục cuộn, cả khung cót két. `o.tinh` đứng im (bốn khung cũ), `o.toi` cháy đen đứng im, `o.ma` đang hát: thoi lao nhanh, khung rung bần bật, sợi đỏ rực, mặt người hiện trong khổ vải, quầng đỏ (khung giữa nhà dệt chiều tối/đêm, khung đem đốt giữa sân). Ảnh mới `khung_cui` (khung hát) và `khung_chay` (hát lần cuối trong lửa), gắn vào lời thoại chương 3.
- `G.hoathan.quaThi(x, y, s, o)` (`G.art.quaThi` gọi hàm này): quả thị vàng ươm, núm bốn cánh, đung đưa trên cuống, quầng sáng thở, hương bốc lên, đốm sáng bay. Dùng ở cây thị bìa rừng, ảnh `cay_thi`, `qua_thi`, phim `quaThi` (bước 2 là đầu chim `G.hoathan.dauChim`, con ngươi đảo), nền tiêu đề chương 4. Ảnh mới `thi_go` (chĩnh sành gõ ba cái, nắp nảy, ánh vàng rỉ ra) ở chương 4 và `thi_mo` (vỏ quả nở bốn cánh, Tấm hiện ra trong vầng sáng) khi Tấm bước ra ở chương 5.
- Cây, chim, quả và khung cửi có cử động được vẽ thành prop riêng không filter (`G.hoathan.ink`, tham số `raw` của `b.prop`) cùng khung với cây để đung đưa cùng nhịp mà không phải vẽ lại filter nét run mỗi khung hình. Hình gắn `neo: [x, y]` sẽ rung / giật mình khi mở hội thoại trong vòng 230px (bọc `G.ui.dialog`).
- Giảm chuyển động (`prefers-reduced-motion`): mọi hình đứng ở dáng nghỉ, nốt nhạc / hoa rơi / đốm sáng ẩn đi.

## Minigame (`js/minigames.js`, `js/minigames2.js`, `css/minigame.css`)
- Khung minigame là đồ vật: giấy dó viền son (mặc định), bàn gỗ (vẽ bùa), dải sơn then (gõ mõ). Luật chơi, thời gian và giá trị trả về giữ nguyên.
- `G.mg.fx`: hạt bắn (`hat`), chữ nổi (`chu`), vòng sóng (`vong`), rung khung (`rung`); lớp `#mgfx` nằm trong `#stage` nên không mất khi minigame vẽ lại. Tôn trọng `prefers-reduced-motion`.
- Vẽ bùa dùng lá bùa thật (`G.ve.buaSvg`, chữ chọn theo tiêu đề: trấn vong / độn thổ / giải hạn / an vị); tô lại 7 nét son chính, nét kế tiếp sáng lên; xong thì chữ son hiện, lá bùa bừng sáng.

### Màn tiêu đề (`js/tieude.js`, `css/tieude.css`)
- `G.tieude.cover()`: trăng máu, vườn cau đen, xác người vắt trên ngọn cau (tóc rủ, tay buông, máu chảy dọc thân), Đăng cầm đèn quay lưng, tay vong trồi khỏi sương, bàn thờ (bát hương ba nén, nến, chén máu, vàng mã), lá bùa trấn rách dính dấu tay máu treo mép phải, máu nhỏ giọt từ mép trên, vàng mã bay. `G.showTitle` dùng hàm này nếu có.
- Nút menu là dải giấy bùa vàng viền son có chữ 敕; "Chơi tiếp" là giấy đỏ chữ vàng; rê chuột thì vệt máu quệt ngang. `G.tieude.mauChu()` vẽ vệt máu chảy dưới tên game.
- Màn "Chạm để bắt đầu": nền đen, dấu tay máu, ngọn nến.

### Độ khó minigame giữ / che
- `G.mg.hold(text, secs)`: nhấp-nhả để giữ kim lực trong vùng đỏ đang trôi (hẹp và nhanh dần, thỉnh thoảng bị GIẬT). Giữ liên tục hay buông hẳn đều không tiến. Thời gian cần trong vùng = `secs × 1.6`.
- `G.mg.giuNhang(secs)`: gió thổi từ trái hoặc phải (báo trước ~0,5 giây); che đúng phía bằng ← / A, → / D hoặc giữ chuột nửa khung tương ứng. Úp tay khi không có gió làm ngạt lửa; nửa sau có gió quẩn đổi chiều giữa cơn.
- Chuông (`G.lacChuong`): hồi 12 giây (`G.chuongCon()` trả số giây còn lại), nút tối dần trong lúc hồi; vẫn gây tiếng động thu hút vong như cũ.

### Bảng tạm dừng (`js/ui.js` → `U.menu`, `css/ui2.css`)
- Tấm gỗ sơn then viền vàng như hoành phi; bên trái lá bùa an vị treo đung đưa và nén nhang cháy có khói; dòng đầu ghi chương, ngày, buổi. Nút là dải giấy bùa vàng có ô chữ son (敕 印 鐘 眼 書 門), "Chơi tiếp" đỏ chữ vàng. Bảng "Cách chơi" (`#menu.mnh`) cùng tông.
- Nhặt thóc (`js/memory3.js`): hạt rải theo % bên trong lòng nia hình elip, không còn rơi ra ngoài.
- Nút màn tiêu đề mang chữ riêng qua `data-chu` (續 Chơi tiếp, 生 Chơi mới, 憶 Xem lại, 卷 Chọn chương, 鐘 Âm thanh) trong ấn son vuông, cột chấm son và nét son dọc ở mép phải như lá bùa. "Chơi mới" hỏi lại bằng `G.tieude.hoi(html, co, khong)` (hộp giấy bùa trong game, trả về Promise) thay cho `confirm()` vì trình duyệt nhúng có thể chặn hộp thoại gốc.
