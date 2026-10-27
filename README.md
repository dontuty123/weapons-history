# Weapons That Changed History

Kênh video giải thích lịch sử bằng tiếng Anh: một người dẫn kể chuyện, các nhân vật phụ vẽ phẳng đơn giản, có chèn ảnh hiện vật thật.

## Thư mục
- `part-1/storyboard.html`: kịch bản Part 1 (23 vũ khí, khoảng 15 phút), chia theo từng cú cắt hình, mỗi câu có hình phác.

## Công thức (đo từ video mẫu, 2026-10-27)
Kết quả đo một video mẫu cùng thể loại dài 15:33. Video mẫu và bản chép lời gốc không lưu trong kho này.

**Nhịp cắt**
- Đổi hình khoảng 3,4 giây một lần (phần lớn 2–5 giây).
- Khoảng 80% cú cắt rơi đúng chỗ ngắt hơi, thường ở đầu một ý mới ("Then…", "But…", "So…").
- Cứ mỗi câu hoặc vế câu có hình ảnh mới thì đổi hình, minh họa sát nghĩa đen của lời.

**Năm kiểu hình xoay vòng**
1. Người dẫn đứng trên nền trắng: câu chuyển ý, câu nhận xét.
2. Cận mặt người dẫn: câu đùa, câu nhận xét khô.
3. Cảnh minh họa có nền và nhân vật phụ: kể một tình huống.
4. Người dẫn đứng cạnh cái TV chiếu lại cảnh vừa rồi: bình luận cảnh vừa xem.
5. Ảnh hiện vật thật bên trái, người dẫn bên phải chỉ vào: dữ kiện, tên riêng. Mỗi chương mở bằng một bảng mục lục các biểu tượng tròn.

**Hoạt hình**
- Dạng cắt ghép: nhân vật làm từ các bộ phận rời.
- Miệng chỉ có 2–3 hình nhép.
- Tay hoặc vũ khí xoay qua lại giữa 3–4 tư thế lặp.
- Hành động lớn làm bằng cách trượt nhanh vào khung.
- Toàn cắt thẳng, không chuyển động máy quay.

**Âm thanh**
- Chỉ có giọng kể: không nhạc nền, gần như không tiếng động.
- Chỗ ngắt hơi cắt sát, thường khoảng 0,15 giây; chỗ chuyển chương ngắt dài hơn, khoảng 0,6–1 giây.
- Âm lượng rất đều.
- Cái hài đến từ giọng đời thường và hình minh họa sát lời, không đến từ tiếng động.

**Cách đẩy nhịp hài:** nói dữ kiện thật → minh họa theo nghĩa đen → cắt về người dẫn với một câu nhận xét khô → sang dữ kiện tiếp theo.


## Quy tắc vẽ (đo từ ảnh 1280×720 của video mẫu, 2026-10-27)
- **Ba cấp nét.**
  - Viền nhân vật khoảng 8 px, gần đen.
  - Đồ vật và nội thất 4–5 px.
  - Đồi, nền và biểu tượng mục lục 2 px, màu xanh than.
  - Mây và vệt sáng không có viền.
- **Màu phẳng.**
  - Không đổ bóng, chỉ có má hồng và vài vệt sáng.
  - Da hồng rất nhạt; nền pastel (trời chuyển nhẹ từ xanh sang trắng, cỏ xanh ngọc nhạt, đồi xanh và tím nhạt).
  - Chỉ đồ vật mới dùng màu đậm.
- **Tỉ lệ.**
  - Đầu to, chiếm khoảng 40% chiều cao.
  - Thân nhỏ; tay chân là một nét que cùng độ dày với viền.
  - Bàn tay và bàn chân là hình tròn đầy màu.
- **Mặt.**
  - Mắt chấm, mắt nhắm là hai vòng cung, mắt lim dim khi nhận xét khô.
  - Lông mày là nét ngắn; miệng nhỏ màu đỏ khi nói, một nét ngang khi tỉnh bơ.
- **Nét hơi run như vẽ tay** (một lớp nhiễu nhẹ phủ lên nhân vật), không dùng nét thẳng tuyệt đối.
- **Bố cục.**
  - Nhân vật trong cảnh to, bị mép dưới khung cắt ngang.
  - Người dẫn đứng một bên, chừa nhiều khoảng trắng.
  - Ô ảnh thật đặt bên trái, chú thích viết tay ngay dưới ảnh, người dẫn bên phải quay vào chỉ.
- **Bộ vẽ:** `art/kit.js` vẽ mọi khung bằng SVG 1280×720. Xem thử ở `art/sample.html`.
- **Người dẫn của kênh:** tóc xanh than rối có một chỏm, áo len cam gạch cổ kem, bút chì kẹp sau tai. Các nhân vật phụ cũng thiết kế riêng.

## Người dẫn Remy
Bảy nguyên tắc học từ cách người dẫn của video mẫu được thiết kế và diễn, cùng kho tư thế, cỡ khung và cách hóa trang của Remy: xem `art/host.html` (bộ vẽ `art/host.js`). Remy là thiết kế riêng, sắc cạnh: tóc xanh ngọc #12b5ad vuốt chéo ra sau, mái vát che thái dương trái; đầu nhiều góc, cằm phẳng; áo đào nhạt #ffd2b0; túi đưa thư đỏ rượu #7a1e3a đeo chéo bên hông; viền đen 8 px. Bộ màu chuẩn ở art/brand.html. Không làm mặt cằm nhọn hay túi bao tử để khỏi giống nhân vật kênh mẫu.
- **Màu nhận diện phải là màu ấm** (hồng, đỏ, cam): cảnh của kênh toàn trời xanh và cỏ xanh, nên người dẫn phải nằm ở phía đối diện trên bánh xe màu mới nổi. Áo dùng màu sáng nhạt và không dùng xanh lá hay xanh trời. Sáu bộ để chọn ở `art/looks.html`.
- **Remy chốt bộ 1 (2026-10-27):** tóc sóng hồng mâm xôi #d6336c có lọn xoăn trên đỉnh, mặt "V mềm" (má đầy, cằm nhỏ tròn; khuôn mochi trong art/host.js), áo thun cam mơ #ffa95e, túi nhỏ navy #1f2a5c nằm gọn bên hông, dây mảnh đeo chéo, nền avatar #b0607e. Giữ các điểm khác biệt này; không chỉnh thêm về phía nhân vật kênh mẫu (tóc dựng nhọn, cằm nhọn, áo vàng, túi bao tử tím trước ngực).
