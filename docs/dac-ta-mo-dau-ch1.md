# Đặc tả: Mở đầu và Chương 1

Đi kèm [bang-chuong.md](bang-chuong.md) và [ca-dao-co-tich.md](ca-dao-co-tich.md).
Quy ước mã để dùng trong code: `L..` là lời khai, `V..` là vật chứng, `D..` là phép đối chiếu, `S..` là một trang Sổ Tử, `f_..` là cờ trạng thái.
Thời lượng mục tiêu: **Mở đầu 15–20 phút, Chương 1 35–45 phút.**

---

## A. Hệ thống dùng chung (làm trước, cả game dùng lại)

### A1. Đồ nghề thầy pháp

| Món | Phím | Tác dụng | Giới hạn | Mở ở |
|---|---|---|---|---|
| **Nén nhang** | tự dùng khi làm lễ | Là đồng hồ của mỗi nghi lễ: một nén cháy **90 giây thật**. Que nhang ngắn dần trên thanh trên cùng | Mua 2 đồng một bó 5 nén | Mở đầu |
| **Bát nước** | `B` | Bật **chế độ soi**: màn hình ngả xanh, hiện lớp ẩn (dấu tay, dấu chân, bóng vong). Soi vào di vật thì vào **Ký ức** | Mỗi đêm soi 3 lần, thay nước ở giếng hoặc chum | Mở đầu |
| **Gạo muối** | `G` | Rắc ra quanh người: vong lùi lại **4 giây**, dấu chân vô hình hiện lên trong 10 giây | 1 nắm mỗi lần, mua 1 đồng 3 nắm | Mở đầu (đêm 2) |
| **Chuông đồng** | `C` | Nghe được tiếng thì thầm (hiện chữ mờ). Tạo **vòng tiếng động** bán kính lớn, lính trong vòng sẽ quay đầu lại | Không giới hạn | Ch.1 |
| **Giấy bùa** | khi làm lễ | Minigame **vẽ bùa**: đi theo nét mẫu, cho phép lệch 12 px. Lệch quá 3 lần thì bùa cháy, mất 1 tờ và bị choáng 2 giây | Mua 1 đồng 2 tờ | Mở đầu |
| **Chỉ đỏ** | – | Chưa dùng ở hai chương này, chỉ cho người chơi thấy trong tráp | – | Mở đầu (chỉ xem) |

### A2. Sổ Tử (phím `J`)

- Có hai tab: **Lời khai** và **Vật chứng**, dùng lại cấu trúc sổ điều tra của LanNaySeKhac.
- Mỗi người chết có một trang `S..`. Trang gồm: tranh cận cảnh, nơi chết, giờ phát hiện, lời khai liên quan, và ô **Kết luận** với các lựa chọn `Ma giết / Người giết: [chọn người] / Chưa rõ`.
- Ô Kết luận chỉ mở khi đã làm đủ các phép đối chiếu cần cho trang đó. Trước khi đủ, ô hiện chữ *"Chưa đủ chứng cứ"*.
- **Kết luận sai** vẫn được ghi vào sổ, nhưng mở nhánh "hung thủ còn tự do" (xem C8).
- Nếu đã chọn "Giữ lại" ở một món đồ (điều kiện kết bí mật), một trang sổ sẽ **tự bị gạch xóa** kèm tiếng giấy xé.

### A3. Ký ức (nhập vai Tấm)

- Vào Ký ức bằng cách soi bát nước vào di vật có viền sáng mờ.
- Khi vào, màn hình chuyển sang **màu nắng, nét vẽ trẻ con**. Nhân vật là Tấm chibi, cũng dùng mẫu `nhan-vat-chibi-v3.svg`.
- Ký ức đi qua **3 nhịp méo dần**: *Bình thường* → *Lệch* (màu nhạt đi, nhạc chậm lại) → *Vỡ* (đen trắng, nhân vật quay đầu nhìn thẳng ra màn hình).
- Không chết được trong Ký ức. Đoạn nào làm sai thì chơi lại đoạn đó.
- Ra khỏi Ký ức thì nhận được 1 vật chứng, kèm một đoạn vỡ hình rất ngắn (ảnh chớp) về **gốc cau**.

### A4. Vùng nhìn và tiếng động

- **Lính gác:** vùng nhìn hình quạt hiện trên mặt đất (giống người gác ở đình). Khi bắt đầu nghi ngờ thì hiện dấu `?` trong 1,5 giây, phát hiện thì hiện `!`.
- **Vong:** không có vùng nhìn. Chỉ có **vòng nghe**. Đi bộ thì không sao. Chạy, lắc chuông, đánh rơi đồ thì phát ra vòng tiếng động. Vòng tiếng động chạm vào vong thì vong lao về phía đó.
- Khi vong ở gần, phát tiếng ru *"Ầu ơ…"*, càng gần càng to. Tiếng này thay cho tiếng tim đập.

### A5. Chết và điểm lưu

- Tự lưu vào **đầu mỗi cảnh đêm** và **đầu mỗi Ký ức**.
- Khi chết: màn hình tối kèm một dòng chữ riêng cho từng kiểu chết. Dòng này ghi vào trang **"Đăng"** cuối Sổ Tử (đếm số lần chết, chỉ để vui).
- Sau đó tải lại điểm lưu của cảnh. Không mất tiền, không mất ngày.

---

## B. MỞ ĐẦU: Gốc cau

### B1. Bối cảnh

Hôm nay là **ngày bốn mươi chín** của Tấm. Dì ghẻ thuê Thầy Cả về làng làm **lễ trấn vong** dưới gốc cau nơi Tấm "ngã". Cám, nay đã là hoàng hậu, về theo cùng vài người hầu, trong đó có **cung nữ Lài**. Lài từng là người hầu riêng của Tấm.

### B2. Khu vực (3 cảnh)

| Mã | Cảnh | Nội dung chính |
|---|---|---|
| `lang_duong` | **Đường làng** | Cổng làng, cây gạo, quán nước nhỏ. Nơi bắt đầu game |
| `nha_dighe` | **Nhà dì ghẻ** | Sân gạch, chuồng gà, gian thờ có ảnh thờ Tấm, buồng cũ của Tấm (giường tre bốn chân), bếp có **giỏ tép treo trên vách**, cái **giếng cũ đã lấp** ở sau nhà (để dành cho Ch.1 và Ch.2) |
| `vuon_cau` | **Vườn cau** | Hàng cau sau nhà. **Gốc cau của Tấm** có đất mới đắp, cây đã bị thay bằng một cây cau non trồng vội |

### B3. Nhân vật

| Nhân vật | Ở đâu | Nét chính khi gặp |
|---|---|---|
| **Thầy Cả** | Theo Đăng, ban đêm ngồi ở vườn cau | Hiền, hay đùa, gõ mõ suốt. Nói câu **"Đi với Bụt mặc áo cà sa, đi với ma mặc áo giấy"** khi dạy Đăng. *Tai trái có nốt ruồi*, được nhắc một lần trong cảnh mở đầu (Đăng đùa "nốt ruồi chờ lộc") |
| **Dì ghẻ** | Gian thờ, sân | Lịch sự quá mức, trả tiền rất hào phóng. Không bao giờ bước vào vườn cau |
| **Cám** | Buồng của Tấm | Ít nói, ôm chiếc **yếm đỏ** cũ. Tránh nhìn ra vườn cau |
| **Lài** | Bếp | Hiền, cho Đăng ăn bánh đúc. Mỗi lần nghe tiếng mõ là tay run |

### B4. Diễn biến

**Ngày 1: chiều, đến làng** (hướng dẫn đi lại, nói chuyện)
1. Thầy trò vào làng. Trẻ con ở cây gạo đang hát vè **"Cái bống là cái bống bang…"** (lời gốc). Đây là lần đầu nghe, sau này mới bị đổi lời.
2. Dì ghẻ đón tiếp. Lấy **`L01` dì ghẻ**: *"Con bé trèo hái cau cúng cha, trượt chân ngã. Số nó vậy."*
3. Dì ghẻ đưa tiền công cho Thầy Cả. Thầy Cả nhấc túi tiền lên, cười: *"Nặng tay quá bà ạ."* Lấy **`V02` túi tiền nặng gấp ba lệ thường**.
4. Hướng dẫn **bày mâm lễ**: kéo 6 món vào đúng ô (nhang, hoa, quả, chén nước, gạo muối, vàng mã). Đặt sai chỗ thì Thầy Cả nhắc **"Có thờ có thiêng, có kiêng có lành"**.

**Đêm 1: lễ trấn vong** (hướng dẫn nhang, vẽ bùa)
1. Ra vườn cau. Thầy Cả bảo Đăng vẽ bùa trấn: **minigame vẽ bùa lần đầu**, có nét mẫu, không giới hạn số lần sai.
2. Lúc dọn chỗ đặt mâm, Đăng gạt chân vào lớp đất mới đắp thì lộ ra **`V01` vết rìu trên gốc cau cũ**. Thanh trên màn hình hiện gợi ý *"Mở Sổ Tử (J)"*.
3. **Đối chiếu đầu tiên (hướng dẫn)**: **`D01` = L01 × V01** → *"Cây cau bị chặt, không phải Tấm tự ngã."* Thầy Cả xem rồi gập sổ của Đăng lại: *"Chuyện nhà người ta, mình làm lễ thôi con."*
4. Thắp **một nén nhang**, Thầy Cả tụng. Nhang cháy tới nửa thì xảy ra **sự kiện kinh dị 1**: cả buồng cau trên cây non rụng xuống cùng lúc, quả nào cũng nứt đôi ra thành **hàm răng người**. Thầy Cả vẫn bình thản tụng cho hết nén, rồi chôn lá bùa xuống gốc cây.
5. Về nhà. Thầy Cả dặn: *"Đêm nay đừng soi nước trong nhà này."*

**Đêm 2: Ký ức 1, Bắt tép** (hướng dẫn bát nước, gạo muối)
1. Nửa đêm, Đăng nghe tiếng nước nhỏ giọt trong bếp. Giỏ tép trên vách có **viền sáng mờ**.
2. Người chơi có thể nghe lời thầy dặn và đi ngủ. Khi đó sáng hôm sau giỏ tép biến mất, mất Ký ức này, nhưng Ký ức sẽ mở lại ở Ch.1 qua chiếc yếm của Cám. Hoặc người chơi soi bát nước vào giỏ tép.
3. **Ký ức 1: Bắt tép** (xem mục D1).
4. Ra khỏi Ký ức thì có **gạo muối** (Lài đưa cho, *"Bà ngoại em bảo rắc cái này thì ma không theo"*) và nhận **`V03` giỏ tép trống, trong đáy có một con cá bống khô**.
5. **`L02` Lài** nói nhỏ khi đưa gạo muối: *"Hôm giỗ cha cô Tấm, em cũng về đây… Thầy đừng hỏi nữa."* Ngay lúc đó dì ghẻ gọi Lài đi.

**Sáng ngày 3: cái chết của Thầy Cả**
1. Gà kêu loạn lên. Ở vườn cau, xác **Thầy Cả** bị treo vắt trên ngọn cây cau non (cây chỉ cao bằng hai người nhưng xác ở tít trên ngọn), **miệng nhồi đầy cau non**. Cảnh cận dùng hình bóng, không vẽ rõ mặt.
2. Mở **`S01` Tấm** (đã có sẵn, để trống, đánh dấu "Chưa đủ chứng cứ") và **`S02` Thầy Cả**. Khi xem tranh cận của S02, có một dòng quan sát được ghi lại: **`V04` tai trái không thấy nốt ruồi**. Đăng tự nhủ trong lúc rối: *"…chắc mình nhớ nhầm."* (gài dấu hiệu, chưa dùng).
3. Dân làng xì xào: *"Vong cô Tấm bắt thầy rồi."*
4. Một **sứ giả từ cung** đến, mang theo hợp đồng Thầy Cả đã nhận: *trấn yểm vĩnh viễn "con chim có hồn người" trong cung hoàng hậu*. Dì ghẻ: *"Thầy mất thì trò làm thay."* Đăng nhận tráp đồ nghề của thầy.
5. Mở tráp ra thấy: chỉ đỏ, chuông đồng, sổ tay của thầy (nhiều trang bị khóa), và **một mảnh vảy rắn to bằng bàn tay** (dấu hiệu Thạch Sanh, không có lời giải thích).
6. Màn hình: **"Hết Mở đầu"**.

### B5. Bảng lời khai, vật chứng, đối chiếu (Mở đầu)

| Mã | Loại | Nội dung | Lấy ở đâu |
|---|---|---|---|
| L01 | Lời khai | Dì ghẻ: Tấm trượt chân ngã từ cây cau | Ngày 1, gặp dì ghẻ |
| L02 | Lời khai | Lài: hôm giỗ cha cô Tấm, Lài cũng có mặt ở đây | Đêm 2, sau Ký ức 1 |
| V01 | Vật chứng | Vết rìu trên gốc cau cũ dưới lớp đất mới | Đêm 1, vườn cau |
| V02 | Vật chứng | Túi tiền nặng gấp ba lệ thường | Ngày 1 |
| V03 | Vật chứng | Giỏ tép trống, đáy có cá bống khô | Ký ức 1 |
| V04 | Quan sát | Tai trái xác Thầy Cả không có nốt ruồi | Sáng ngày 3 (gài, mở ở Ch.3) |
| **D01** | L01 × V01 | → Tấm bị chặt cây, không phải tự ngã | Bắt buộc (hướng dẫn) |
| **D02** | L01 × V02 | → *"Lễ này để bịt miệng ai?"* | Không bắt buộc |

---

## C. CHƯƠNG 1: Vàng anh

### C1. Bối cảnh

Đăng vào cung. Trong vườn ngự có một con **chim vàng anh** đêm nào cũng hót gần chỗ phơi áo của vua, bằng câu vè dân gian về chuyện giặt áo, phơi áo của chồng. Vua rất mến nó. Cám và dì ghẻ thì sợ nó.
Chương này kéo dài **3 ngày 3 đêm** trong game.

### C2. Khu vực (7 cảnh)

| Mã | Cảnh | Nội dung chính | Mở |
|---|---|---|---|
| `cung_san` | **Sân chầu** | Cảnh trung tâm nối các khu. Lính đứng gác ban ngày | Luôn mở |
| `cung_vuon` | **Vườn ngự** | Hồ sen, sào phơi áo của vua, cây đào già (chỗ chim đậu). Ban đêm có lính tuần | Luôn mở |
| `cung_gieng` | **Giếng giặt** | Giếng đá, cầu ao giặt, dãy nhà cung nữ | Luôn mở |
| `cung_bep` | **Bếp cung** | Bếp lò, nồi ninh, chạn bát, **bàn thờ Táo** có đĩa bánh đúc | Luôn mở |
| `cung_hau` | **Cung hoàng hậu** | Phòng của Cám, có treo chiếc **yếm đỏ ướt không bao giờ khô** | Chỉ ban ngày khi được gọi vào, ban đêm thì phải lẻn |
| `phong_dang` | **Phòng trọ của Đăng** | Phòng nhỏ cạnh bếp. Có chum nước để thay nước bát, có giường để ngủ hoặc chờ qua giờ | Luôn mở |
| `hang_nuoc` | **Hàng nước bà cụ** | Ở ngoài cổng thành. Bà cụ bán trà, trầu, bánh đúc | Chỉ ban ngày (6:00 đến 18:00) |

### C3. Nhân vật và lịch theo giờ

| Nhân vật | Sáng | Chiều | Tối | Đêm |
|---|---|---|---|---|
| **Cám** | Cung hoàng hậu | Vườn ngự (đi dạo, tránh cây đào) | Cung hoàng hậu | Ngủ (mở cửa sổ nhìn ra vườn) |
| **Dì ghẻ** | Bếp (sai bảo) | Cung hoàng hậu | Gian thờ trong cung | – |
| **Nhà vua** | – | – | Vườn ngự, ngồi nghe chim (chỉ ngày 1 và 2) | – |
| **Lài** | Giếng giặt | Bếp | Cung hoàng hậu (hầu) | Nhà cung nữ |
| **Nụ** | Nhà cung nữ, ngồi dệt | Giếng giặt | Nhà cung nữ | – (giới thiệu cho Ch.3) |
| **Đội Ngạn** | Sân chầu | Sân chầu | Cổng bắc | **Đi tuần vườn ngự và giếng giặt** |
| **Bà Sáu bếp** | Bếp | Bếp | Bếp | – |
| **Bà cụ hàng nước** | Hàng nước | Hàng nước | – | – |

### C4. Việc ban ngày (kiếm tiền, làm thân)

| Việc | Ai nhờ | Minigame | Tiền | Mở ra thêm |
|---|---|---|---|---|
| Xem ngày làm cỗ | Bà Sáu bếp | **Gieo quẻ**: tung 2 đồng xu, cần ra *một sấp một ngửa* 2 trên 3 lần | 3 đồng | Bà Sáu cho phép vào bếp ban đêm |
| Giải hạn | Lài | Vẽ bùa (nét khó vừa) | 2 đồng | **`L04` Lài** (C6) |
| Cúng đất sào phơi áo | Lính hầu của vua | Bày mâm lễ ngoài trời. Có gió thổi, phải giữ nhang không tắt | 4 đồng | Được vào vườn ngự lúc chạng vạng mà không bị hỏi |
| Mua đồ nghề | Bà cụ hàng nước | – | – | Nhang, gạo muối, giấy bùa. Bà cụ nói câu thành ngữ của ngày (C6) |

### C5. Diễn biến theo ngày

**Ngày 1**
- *Sáng:* vào cung, dì ghẻ dẫn đi. Lấy **`L03` Cám**: *"Con chim ấy là điềm gở. Thầy trấn nó đi, bao nhiêu tiền cũng được."*
- *Ban ngày:* làm các việc ở C4. Lần đầu ra hàng nước, bà cụ nói: **"Đợi cậu lâu rồi."** (dấu hiệu twist quả thị) Bà cũng nhắc đến làng có cây đa nộp người sống (dấu hiệu Thạch Sanh).
- *Tối:* vua ngồi trong vườn nghe chim. Vàng anh hót câu vè dân gian về chuyện giặt áo, phơi áo của chồng. Vua nói **"Ở hiền gặp lành"** khi nhắc tới Tấm.
- *Đêm 1:* lần đầu soi bát nước vào chim. Trên cây đào hiện ra **bóng một người con gái ngồi**, tóc xõa, cùng hót bằng miệng. **Sự kiện kinh dị 2:** con chim quay đầu lại, cất tiếng bằng **giọng Thầy Cả**: *"Đăng ơi, về đi con."* Nếu người chơi bỏ chạy thì phát ra tiếng động. Đây là lần đầu dạy cơ chế vong nghe tiếng.

**Ngày 2**
- *Sáng:* Cám ra lệnh bắt chim làm thịt (như trong cổ tích). Ở bếp, Lài bị sai vặt lông chim. Tay Lài run, nhìn Đăng như muốn nói gì đó.
- Trẻ con trong cung hát vè **đã bị đổi lời** về giếng nước sâu và chuyện ai đẩy ai (xem ca-dao-co-tich.md, mục 2). Ghi lại thành **`L05` vè trẻ con**.
- *Trưa:* **Sự kiện kinh dị 3:** nồi ninh chim sôi sùng sục, mở vung ra thấy **tim chim vẫn còn đập**. Bà Sáu đánh rơi muôi. Nhặt được **`V05` xương chim bị bẻ gãy cổ** trong rổ lông.
- Cám ăn vài miếng rồi sai đem **lông chim vứt ra sau vườn** (như cổ tích).
- *Chiều:* lấy **`L04` Lài** trong lúc làm lễ giải hạn: *"Em… em thấy ở làng hôm ấy. Có người cầm…"* Đội Ngạn bước vào. Lài im bặt.
- *Đêm 2:* nếu Đăng ra giếng giặt sau 22:00, nghe thấy tiếng nước động. Đội Ngạn đang đi tuần chặn lối. Người chơi **không thể cứu Lài**, đây là cảnh được dàn sẵn. Nếu cố vượt qua thì bị phát hiện, tải lại điểm lưu.

**Ngày 3: cái chết của Lài**
- *Sáng:* Lài được vớt lên từ giếng giặt. **Tay Lài nắm chặt một chiếc lông vàng anh.** Mở trang **`S03` Lài**.
- Lấy **`L06` Đội Ngạn**: *"Con bé trượt chân. Đêm qua tôi gác cổng bắc, không rời nửa bước."*
- Xem xác (tranh cận, chế độ soi): **`V06` vết ngón tay to trên cổ** (thấy rõ khi soi bát nước); **`V07` sợi chỉ đỏ trong móng tay Lài**, cùng màu với dải lưng áo thị vệ.
- Hỏi người lính gác trẻ ở cổng bắc (chỉ chịu nói nếu đã làm việc cúng đất sào phơi áo): **`V08` sổ gác ghi Đội Ngạn đổi ca lúc giờ Tý**.
- Ra hàng nước: bà cụ đưa đĩa bánh đúc, nói câu thành ngữ **"Mấy đời bánh đúc có xương, mấy đời dì ghẻ mà thương con chồng"**. Trên **bàn thờ Táo trong bếp cung**, đĩa bánh đúc cúng Tấm **có một mẩu xương cá nhỏ**, lấy được **`V09`**. Xương này là của Bống, từ lọ bị trộm. Dấu hiệu này dùng cho Ch.2 trở đi.
- *Đêm 3: lẻn trong vườn ngự* (xem C7). Phần lông chim Cám vứt đi đang **xếp dần thành hình một người con gái nằm**. Phải **chôn đủ 5 nhúm lông** trước giờ Dần (lính quét vườn lúc bình minh). Chôn xong, chỗ đất ấy **ấm như da người**. Đây là chỗ cây xoan đào sẽ mọc ở Ch.2.
- Soi bát nước vào **chiếc lông trong tay Lài** (đã lấy từ S03) thì vào **Ký ức 2: Nuôi Bống** (D2).

### C6. Bảng lời khai, vật chứng, đối chiếu (Chương 1)

| Mã | Loại | Nội dung | Lấy ở đâu |
|---|---|---|---|
| L03 | Lời khai | Cám: con chim là điềm gở | Ngày 1 sáng |
| L04 | Lời khai | Lài: "em thấy ở làng hôm ấy, có người cầm…" | Ngày 2 chiều, việc giải hạn |
| L05 | Lời khai | Vè trẻ con, lời bị đổi về giếng sâu | Ngày 2, sân chầu |
| L06 | Lời khai | Đội Ngạn: Lài trượt chân, hắn gác cổng bắc cả đêm | Ngày 3 |
| L07 | Lời khai | Cám (hỏi sau khi có V05): "Chim bệnh rồi tự chết" | Ngày 2–3 |
| V05 | Vật chứng | Xương chim bị bẻ gãy cổ | Bếp, ngày 2 |
| V06 | Vật chứng | Vết ngón tay to trên cổ Lài | Ngày 3, khi soi |
| V07 | Vật chứng | Sợi chỉ đỏ trong móng tay Lài | Ngày 3 |
| V08 | Vật chứng | Sổ gác: Đội Ngạn đổi ca giờ Tý | Ngày 3, cổng bắc |
| V09 | Vật chứng | Xương cá trong đĩa bánh đúc cúng | Ngày 3, bếp |
| V10 | Vật chứng | Bốn lọ xương dưới chân giường (biết chỗ) | Ký ức 2 |

| Phép | Ghép | Kết quả | Bắt buộc |
|---|---|---|---|
| **D03** | L07 × V05 | Cám nói dối: chim bị giết theo lệnh | Không |
| **D04** | L06 × V06 | Lài bị bóp cổ trước khi rơi xuống nước | **Có** |
| **D05** | L06 × V08 | Đội Ngạn không ở cổng bắc lúc giờ Tý | **Có** |
| **D06** | L06 × V07 | Sợi chỉ đỏ là của áo thị vệ, trùng với Đội Ngạn | Không (thay được D05) |
| **D07** | L04 × V01 | Lài là người chứng kiến vụ gốc cau, nên bị giết để bịt miệng | **Có** |
| **D08** | L05 × V06 | Bài vè trẻ con đã biết trước chuyện | Không (thưởng thêm lời thoại) |
| **D09** | V09 × V10 | Có người đã đào lọ xương Bống | Không (mở ở Ch.2) |

**Kết luận S03 (Lài):** cần có D04, D07 và (D05 hoặc D06). Đáp án đúng là **"Người giết: Đội Ngạn"**.

### C7. Màn lẻn trốn đêm 3 (vườn ngự)

- **Lính:** Đội Ngạn đi một vòng quanh hồ sen, mất 40 giây một vòng. Thêm 2 lính cầm đèn lồng đi theo hình số 8 qua sào phơi áo. Vùng nhìn hình quạt dài 5 ô, chỗ sáng của đèn lồng xa thêm 2 ô.
- **Chỗ nấp:** bóng cây đào, sau chum nước, dưới cầu ao, trong bụi chuối.
- **Vong:** bóng người con gái nằm (do lông chim xếp thành) **ngồi dậy** mỗi khi có vòng tiếng động chạm tới, rồi lết về phía tiếng động. Nếu nó chạm vào Đăng thì Đăng bị kéo xuống hồ sen, **chết** với dòng chữ: *"Nước hồ sen lạnh hơn nước giếng."*
- **Nhiệm vụ:** chôn 5 nhúm lông. Mỗi nhúm cần **giữ phím tương tác 3 giây**. Trong lúc chôn thì không di chuyển được.
- **Mẹo:** lắc chuông ở một góc xa để dụ lính quay đầu. Nhưng tiếng chuông cũng đánh thức vong, phải tính.
- **Bị lính bắt:** chết với dòng chữ *"Thị vệ chém trước tâu sau."* Tải lại đầu đêm 3.

### C8. Nhánh khi kết luận sai cái chết của Lài

- Nếu chọn **"Ma giết"** hoặc kết luận sai người: Đội Ngạn vẫn tự do. **Đêm 4 có thêm** cái chết của **bà Sáu bếp** (bà biết chuyện xương chim). Mở trang **`S03b`**.
- Ở S03b người chơi được kết luận lại. Lần này đối chiếu dễ hơn: có thêm dấu giày to bên chạn bát.
- Tính vào Sổ Tử: S03 sai, S03b đúng thì vẫn được tính là "**sai 1 trang**" khi xét điều kiện kết.

### C9. Kết chương

Điều kiện: kết luận xong S03 (hoặc S03b), chôn đủ lông, xong Ký ức 2.
1. Đội Ngạn bị dì ghẻ **bảo vệ**: *"Thị vệ của ta, thầy lấy gì mà buộc tội?"* Hắn chưa bị bắt (để dành cho Ch.4). Nhưng **từ giờ hắn ghét Đăng**, ban đêm đi tuần gắt hơn.
2. Sáng hôm sau, ở chỗ chôn lông chim, mọc lên một **mầm cây non** cao bằng đầu gối, lá đỏ như máu.
3. Đăng ghi vào sổ tay: *"Bốn lọ xương dưới chân giường. Phải về làng."*
4. Màn hình: **"Hết chương 1"**.

---

## D. Ký ức

### D1. Ký ức 1: Bắt tép (Mở đầu)

| Nhịp | Diễn biến | Cách chơi |
|---|---|---|
| **Bình thường** | Ruộng nắng, nhạc đồng dao. Dì ghẻ hứa đứa nào bắt nhiều tép thì được **yếm đỏ** (như cổ tích). Tấm và Cám mỗi người một giỏ | **Xúc tép**: 45 giây, tép nhảy qua lại, bấm đúng lúc để xúc. Giỏ phải đầy 20 con |
| **Lệch** | Cám đứng trên bờ gọi câu vè dân gian bảo chị hụp xuống cho sâu kẻo về mẹ mắng. Màu bắt đầu nhạt đi | Chọn: **Hụp xuống** hoặc **Quay lên** |
| **Vỡ (nếu chọn Hụp)** | Dưới nước tối đen, có **một bàn tay người khác** cũng đang mò trong bùn, chạm vào tay Tấm | Giữ phím ngoi lên, 3 giây |
| **Vỡ (nếu chọn Quay lên)** | Giỏ đã rỗng. Cám đứng trên bờ cười, **dưới chân Cám không có bóng** | Không cần làm gì |
| **Kết** | Hai nhánh gặp lại nhau: Tấm ngồi khóc bên giỏ trống. Một **vầng sáng không có mặt** hỏi *"Làm sao con khóc?"* (Bụt, chỉ nói đúng một câu). Đáy giỏ còn một con cá bống | Chạm vào con cá, ra khỏi Ký ức |

Ảnh chớp lúc ra: **gốc cau**, một bàn tay **đeo nhẫn bạc** cầm rìu. Đây là dấu hiệu cho dì ghẻ: cảnh ở hiện tại phải vẽ dì ghẻ luôn đeo nhẫn bạc.

### D2. Ký ức 2: Nuôi Bống (Chương 1)

| Nhịp | Diễn biến | Cách chơi |
|---|---|---|
| **Bình thường** | Giếng sau nhà (cái giếng đã bị lấp ở hiện tại). Tấm để dành cơm, ra giếng gọi Bống | **Đọc vè gọi Bống**: câu vè dân gian chia thành 4 vế, chọn đúng vế tiếp theo trong 3 lựa chọn, theo nhịp gõ. Làm đúng 3 lần (3 bữa) |
| **Lệch** | Dì ghẻ sai đi chăn trâu, dặn câu dân gian *chăn đồng xa, chớ chăn đồng nhà*. Đi trên bờ ruộng, ngoái lại thấy dì ghẻ **đứng ở miệng giếng, tay đeo nhẫn bạc** | Dắt trâu đi xa, có đồng hồ theo bóng nắng |
| **Vỡ** | Về nhà gọi Bống. Đọc vè **đúng** thì mặt giếng chỉ nổi lên **một cục máu**. Đọc **sai** thì thứ ngoi lên là một **cái đầu cá to bằng đầu người, mắt người**, rồi chìm xuống | Không chết, chỉ rùng mình và phải đọc lại |
| **Vỡ 2** | Con gà trong sân kêu câu vè dân gian xin một nắm thóc rồi sẽ bới xương cho. Mắt gà **trắng dã** | Cho gà ăn thóc. Gà dẫn đến **đống rác sau bếp** |
| **Kết** | Tấm nhặt xương Bống, chia vào **bốn lọ**, chôn dưới **bốn chân giường** (như cổ tích). Lúc chôn lọ cuối cùng, ngoài cửa sổ có **một bóng người đàn ông gõ mõ**, đứng nhìn | Chôn 4 lọ (kéo lọ vào 4 chân giường). Nhận **V10** |

Ảnh chớp lúc ra: **gốc cau**, ba nhát rìu nữa **sau khi Tấm đã rơi**, nhưng chỉ có tiếng không có hình (xem trước cảnh trèo cau ở Ch.3).
*Bóng người gõ mõ chính là Thầy Cả.* Ở Ch.1 người chơi chưa biết điều này, nhưng tiếng mõ trong Ký ức **cùng nhịp** với tiếng mõ của Thầy Cả ở Mở đầu.

---

## E. Cờ trạng thái

| Cờ | Bật khi | Dùng ở |
|---|---|---|
| `f_d01` | Làm D01 | Mở các phép đối chiếu sau |
| `f_ky1` | Xong Ký ức 1 (ở Mở đầu, hoặc mở lại ở Ch.1 qua yếm của Cám) | Có gạo muối từ Lài |
| `f_thay_chet` | Sáng ngày 3 Mở đầu | Mở Ch.1 |
| `f_vay_ran` | Mở tráp | Kết bí mật, game sau |
| `f_lai_chet` | Sáng ngày 3 Ch.1 | – |
| `f_s03_dung` / `f_s03_sai` | Kết luận S03 | Đếm số trang Sổ Tử sai khi xét kết |
| `f_long_chon` | Chôn đủ 5 nhúm | Mầm xoan đào ở Ch.2 |
| `f_ky2` | Xong Ký ức 2 | Mở việc về làng đào lọ ở Ch.2 |
| `f_ngan_ghet` | Kết Ch.1 | Lính đi tuần gắt hơn ở Ch.2 |

## F. Tiếng và tranh cận cần làm

- **Tiếng:** mõ (nhịp riêng của Thầy Cả), quả cau rụng và nứt, chim hót giọng người (lọc tiếng nói sang tiếng chim), nồi sôi kèm tim đập, nước giếng, ru *"Ầu ơ…"*, tiếng giấy xé (sổ tự xóa).
- **Tranh cận:** gốc cau có vết rìu, buồng cau nứt thành răng, xác trên ngọn cau (chỉ hình bóng), túi tiền, giỏ tép, bóng người con gái trên cây đào, tim chim trong nồi, cổ Lài (chỉ vết tay, không vẽ mặt), sổ gác, đĩa bánh đúc có xương, bốn lọ dưới giường, mầm cây lá đỏ.
