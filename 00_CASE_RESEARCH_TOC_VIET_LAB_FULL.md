# CASE_RESEARCH_TOC_VIET_LAB

> **Mục tiêu:** tài liệu nghiên cứu case thực tế ngành tóc/salon Việt Nam để làm dữ liệu nền cho trang `/case-thuc-te` của Tóc Việt Lab.  
> **Phạm vi:** chỉ nghiên cứu nội dung, taxonomy, case, tag/filter và đề xuất cách hiển thị. Không sửa code, không chỉnh UI, không tạo ảnh, không nạp dữ liệu app.  
> **Ngày soạn:** 2026-05-11  
> **Ghi chú chuyên môn:** công thức/kỹ thuật trong tài liệu là khung tham khảo để xây case, không thay thế hướng dẫn kỹ thuật của hãng thuốc, kiểm tra da đầu, test dị ứng, test lọn và phán đoán của thợ chính.

---

## Mục lục

1. [Nguyên tắc nghiên cứu case](#1-nguyên-tắc-nghiên-cứu-case)
2. [Cấu trúc dữ liệu chuẩn cho mỗi case](#2-cấu-trúc-dữ-liệu-chuẩn-cho-mỗi-case)
3. [Taxonomy 4 tầng](#3-taxonomy-4-tầng)
4. [Bảng tag/filter cho trang case-thuc-te](#4-bảng-tagfilter-cho-trang-case-thuc-te)
5. [Danh sách case giai đoạn đầu](#5-danh-sách-case-giai-đoạn-đầu)
6. [30 case quan trọng viết chi tiết](#6-30-case-quan-trọng-viết-chi-tiết)
7. [Đề xuất hiển thị trên trang case-thuc-te](#7-đề-xuất-hiển-thị-trên-trang-case-thuc-te)
8. [Checklist dữ liệu khi nhập case thật](#8-checklist-dữ-liệu-khi-nhập-case-thật)
9. [Nguồn tham khảo chuyên môn](#9-nguồn-tham-khảo-chuyên-môn)

---

## 1. Nguyên tắc nghiên cứu case

### 1.1. Ưu tiên thực tế salon Việt Nam

Các case được xây theo nền tóc thường gặp tại Việt Nam:

- Nền tóc tự nhiên tối, phổ biến level 1-3.
- Tóc từng nhuộm đen/nâu/đỏ, tự nhuộm tại nhà hoặc đổi nhiều salon.
- Nhu cầu cao với nâu lạnh, beige, trà sữa, khói, rêu, xanh đen, phủ bạc, balayage mềm.
- Rủi ro thường gặp: đỏ cam, vàng cam, loang màu, hot root, ngọn xốp hút màu, tóc đứt do tẩy/duỗi/uốn chồng hóa chất.
- Khách thường đem ảnh mẫu đã chỉnh sáng/filter, dễ kỳ vọng sai với nền tóc thật.

### 1.2. Phân loại độ khó

| Mức độ | Ý nghĩa | Ví dụ |
|---|---|---|
| Cơ bản | Ít hóa chất, nền đơn giản, rủi ro thấp | Cắt nam, nâu trầm cùng level, chăm sóc da đầu cơ bản |
| Trung cấp | Có điều chỉnh sắc tố hoặc lịch sử tóc vừa phải | Nâu lạnh level 5-6, phủ bạc 30-50%, bob/layer theo mặt |
| Nâng cao | Cần map nền, chia vùng, chỉnh màu, nhiều kỹ thuật | Balayage, sửa hot root, tóc xốp hút màu, beige ash |
| Rủi ro cao | Có khả năng đứt/kích ứng/không đạt nếu xử lý sai | Tẩy nền đen lên 9-10, tẩy tóc nhuộm đen hộp, uốn/duỗi tóc tẩy |

### 1.3. Nguyên tắc test lọn / từ chối dịch vụ

- **Bắt buộc test lọn** khi: tóc từng nhuộm đen hộp, henna/thuốc không rõ, tẩy cũ, duỗi/uốn cũ, tóc xốp, tóc yêu cầu sáng mạnh, correction nhiều vùng.
- **Nên từ chối hoặc trì hoãn** khi: tóc nhũn/mất đàn hồi, da đầu trầy/viêm, tiền sử dị ứng màu, khách không chấp nhận test, khách đòi kết quả vượt giới hạn nền tóc.
- **Luôn tư vấn trước**: level hiện tại, level mục tiêu, số buổi, chi phí, bảo dưỡng, rủi ro màu không giống ảnh mẫu.

---

## 2. Cấu trúc dữ liệu chuẩn cho mỗi case

### 2.1. Schema đề xuất

```yaml
case_id: "TVL-COLOR-001"
ten_case: "Nền đen tự nhiên lên nâu lạnh"
nhom_case: "Nhuộm màu"
tinh_trang_toc_ban_dau: "Tóc đen Việt Nam, sợi trung bình/khỏe"
lich_su_toc_truoc_do: "Chưa nhuộm hoặc nhuộm rất lâu"
nen_toc_level_hien_tai: "Level 1-3"
muc_tieu_khach_muon: "Nâu lạnh level 5-6"
rui_ro_ky_thuat: "Lộ đỏ/cam, màu lạnh xỉn, không đủ sáng"
huong_xu_ly_chuyen_mon: "Nâng nhẹ hoặc dùng màu nâng tông; kiểm soát ánh ấm"
cong_thuc_ky_thuat_tham_khao: "Full color; cân bằng xanh/tím theo nền thực tế"
thoi_gian_xu_ly_du_kien: "2-4 giờ"
muc_do_kho: "Trung cấp"
can_test_lon: "Nên"
co_nen_tu_choi_dich_vu: "Không, trừ tóc yếu hoặc dị ứng"
ghi_chu_tu_van_khach_hang: "Giải thích nâu lạnh trên nền đen không thể giống ảnh khói sáng nếu không nâng nền"
goi_y_anh_before_after: "before-tvl-color-001.jpg / after-tvl-color-001.jpg"
tag_loc_web: ["nhuom", "level-1-3", "nau-lanh", "rui-ro-cam", "trung-cap"]
```

### 2.2. Quy ước mã case

| Mã nhóm | Nhóm case |
|---|---|
| `TVL-COLOR` | Nhuộm màu |
| `TVL-BLEACH` | Tẩy tóc / nâng nền |
| `TVL-CORR` | Sửa lỗi màu |
| `TVL-GRAY` | Phủ bạc / grey blending |
| `TVL-HILITE` | Balayage / highlight / ombre |
| `TVL-REPAIR` | Phục hồi tóc hư tổn |
| `TVL-TEXTURE` | Uốn / duỗi / ép / keratin |
| `TVL-CUT` | Cắt tạo kiểu |
| `TVL-SCALP` | Chăm sóc da đầu / tóc yếu / tóc mỏng |
| `TVL-CONSULT` | Tư vấn khách hàng / aftercare / lỗi kỹ thuật salon |

---

## 3. Taxonomy 4 tầng

### 3.1. Cấu trúc tổng quát

| Level | Nội dung | Ví dụ |
|---|---|---|
| Level 1 | Nhóm dịch vụ lớn | Nhuộm màu |
| Level 2 | Tình huống kỹ thuật | Nhuộm màu lạnh trên nền tối |
| Level 3 | Case cụ thể | Nền đen tự nhiên lên nâu lạnh |
| Level 4 | Biến thể theo nền/chất tóc/lịch sử | Level 2 khỏe, level 3 nhuộm đen cũ, tóc xốp ngọn |

### 3.2. Taxonomy chi tiết theo nhóm

| Level 1 | Level 2 | Level 3 ví dụ | Level 4 biến thể cần lưu |
|---|---|---|---|
| Nhuộm màu | Màu lạnh/nâu/beige | Nền đen lên nâu lạnh; nền 7 lên trà sữa | Level 1-3, 5, 6, 7; tóc khỏe/xốp; từng nhuộm đen/đỏ |
| Nhuộm màu | Màu thời trang | Đỏ cherry, xanh đen, copper, pastel | Cần tẩy/không cần tẩy; direct dye; độ phai |
| Tẩy/nâng nền | Nâng nền virgin hair | Level 2 lên 7, level 2 lên 8-9 | Sợi mảnh/to; da đầu nhạy; nhu cầu sáng trong 1 buổi |
| Tẩy/nâng nền | Nền màu cũ | Tẩy nền nhuộm đen, đỏ, henna nghi ngờ | Box dye, màu salon, metallic salt, tóc yếu |
| Sửa lỗi màu | Lỗi sắc tố | Xanh rêu, đỏ cam, vàng chuối, xám bùn | Nền level 5-10; tóc xốp/khỏe; direct dye |
| Sửa lỗi màu | Lỗi phân bố màu | Hot root, banding, highlight sọc | Chân/thân/ngọn khác level; cần root melt/lowlight |
| Phủ bạc | Che kín bạc | Bạc 30%, 50%, 80%, bạc thái dương | Sợi thô/mảnh; da đầu nhạy; khách muốn đen/nâu/lạnh |
| Phủ bạc | Grey blending | Blend bạc, không muốn lộ chân | Highlight/lowlight/root shadow; ít bảo trì |
| Balayage/highlight | Dimension sáng | Balayage caramel/beige/ash, money piece | Nền tối; màu cũ; tóc yếu; thời gian dài |
| Phục hồi | Hư do hóa chất | Tẩy nhũn, đứt sau duỗi, khô sau uốn | Mất đàn hồi, xốp cao, cần cắt hay không |
| Uốn/duỗi/keratin | Đổi texture | Uốn lạnh, uốn nóng, duỗi, keratin | Tóc tẩy/nhuộm/virgin; test đàn hồi; da đầu |
| Cắt tạo kiểu | Theo mặt/chất tóc | Bob, lob, layer, mái bay, fade nam | Tóc mỏng/dày/xoăn; độ dài; routine styling |
| Da đầu/tóc yếu | Chẩn đoán salon | Dầu, khô, gàu nghi ngờ, rụng, mỏng | Có dấu hiệu cần chuyên khoa; không chẩn đoán bệnh |
| Tư vấn/aftercare | Kỳ vọng & duy trì | Ảnh filter, chăm sóc sai, không test | Chính sách salon, checklist, lịch bảo dưỡng |

---

## 4. Bảng tag/filter cho trang case-thuc-te

### 4.1. Bộ lọc chính

| Nhóm filter | Giá trị đề xuất | Ghi chú triển khai |
|---|---|---|
| Dịch vụ | Nhuộm, Tẩy, Sửa lỗi màu, Phủ bạc, Balayage/Highlight, Phục hồi, Uốn/Duỗi/Keratin, Cắt, Da đầu/Tóc yếu, Tư vấn/Aftercare | Filter chính nên hiển thị trên đầu trang |
| Nền tóc | Level 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 | Cho phép chọn nhiều level |
| Lịch sử tóc | Tóc tự nhiên, Nhuộm nâu cũ, Nhuộm đen cũ, Box dye, Tẩy cũ, Highlight cũ, Duỗi/ép cũ, Uốn cũ, Henna/không rõ | Quan trọng cho case correction |
| Tình trạng tóc | Khỏe, Khô, Xốp, Đứt gãy, Mất đàn hồi, Sợi mảnh, Sợi to, Da đầu nhạy, Bạc 30%, Bạc 50%, Bạc 80% | Nên có icon hoặc chip màu |
| Mục tiêu màu | Nâu lạnh, Beige, Ash, Khói, Rêu, Socola, Đỏ, Tím, Xanh đen, Copper, Trà sữa, Blonde, Pastel | Dùng cho nhóm nhuộm/tẩy/correction |
| Độ khó | Cơ bản, Trung cấp, Nâng cao, Rủi ro cao | Có thể dùng badge trên card |
| Kỹ thuật | Full color, Gloss/Toner, Highlight, Balayage, Ombre, Money piece, Root shadow, Root melt, Lowlight, Color correction, Grey blending, Bond repair, Keratin, Uốn nóng, Uốn lạnh, Duỗi | Cho thợ lọc nhanh |
| Rủi ro | Đứt tóc, Loang màu, Xỉn màu, Không lên màu, Lộ ánh cam, Lộ ánh xanh, Sáng chân, Bạc không ăn, Kích ứng da đầu, Phai nhanh | Nên cho filter phụ |
| Test lọn | Bắt buộc, Nên, Không cần | Dùng để xếp mức cảnh báo |
| Quyền truy cập | Miễn phí, Thành viên, Pro | Gợi ý monetization |

### 4.2. Tag chuẩn hóa gợi ý

```text
service:nhuom
service:tay
service:sua-loi-mau
service:phu-bac
service:balayage-highlight
service:phuc-hoi
service:uon-duoi-keratin
service:cat-tao-kieu
service:da-dau-toc-yeu
service:tu-van-aftercare

level:1-3
level:4-5
level:6-7
level:8-10
history:toc-tu-nhien
history:nhuom-den-cu
history:box-dye
history:tay-cu
history:duoi-ep-cu
condition:khoe
condition:xop
condition:dut-gay
condition:bac-50
risk:cam
risk:xanh-reu
risk:hot-root
risk:banding
risk:dut-toc
access:free
access:pro
```

---

## 5. Danh sách case giai đoạn đầu

> Tổng số case trong danh sách này: **161 case**.  
> Cột `Before/lịch sử/level` gộp 3 trường: tình trạng tóc ban đầu, lịch sử tóc trước đó, nền tóc/level hiện tại.  
> Cột `Xử lý/kỹ thuật` gộp hướng xử lý chuyên môn và công thức/kỹ thuật tham khảo.  
> Cột `Vận hành` gộp thời gian, độ khó, test lọn và quyết định từ chối dịch vụ.  
> Như vậy mỗi dòng vẫn có đủ toàn bộ trường của schema chuẩn.

### 5.1. Nhuộm màu
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-COLOR-001 | Nền đen tự nhiên lên nâu lạnh | Tóc đen Việt Nam, sợi trung bình/khỏe<br>Lịch sử: Chưa nhuộm hoặc nhuộm rất lâu<br>Level: 1-3 | Nâu lạnh cấp 5-6 | Lộ đỏ/cam, không đủ sáng, màu lạnh xỉn | Nâng nhẹ/hoặc màu nâng tông, kiểm soát ánh ấm bằng mix xanh/tím phù hợp<br>Kỹ thuật: Full color; nền 1-3 lên 5-6 cần xử lý ánh đỏ cam | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-001.jpg / after-tvl-color-001.jpg`<br>Tag: `dich-vu:nhuom,level:1-3,muc-tieu:nau-lanh-cap-5-6,rui-ro:lo-o-cam` |
| TVL-COLOR-002 | Nền đen tự nhiên lên beige ash | Tóc đen khỏe, dày<br>Lịch sử: Chưa tẩy<br>Level: 2-3 | Beige ash level 7-8 | Không đạt beige nếu chỉ nhuộm; dễ cam | Tư vấn nâng nền 1-2 lần rồi gloss beige/ash<br>Kỹ thuật: Lightening + toner beige/ash; ưu tiên test lọn | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-002.jpg / after-tvl-color-002.jpg`<br>Tag: `dich-vu:nhuom,level:2-3,muc-tieu:beige-ash-level-7-8,rui-ro:khong-at-beige-neu-chi-nhuom-de-cam` |
| TVL-COLOR-003 | Nền 5 bị ánh cam muốn nâu lạnh | Thân tóc nâu level 5 có cam<br>Lịch sử: Nhuộm nâu hoặc nâng nhẹ trước đó<br>Level: 5 | Nâu lạnh tự nhiên | Dùng ash quá mạnh gây xỉn/rêu | Cân bằng cam bằng ash xanh ở liều thấp, thêm nền nâu tự nhiên<br>Kỹ thuật: Color balancing + low ash correction | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-003.jpg / after-tvl-color-003.jpg`<br>Tag: `dich-vu:nhuom,level:5,muc-tieu:nau-lanh-tu-nhien,rui-ro:dung-ash-qua-manh-gay-xin-reu` |
| TVL-COLOR-004 | Nền 6 bị đỏ cam sau nhuộm | Nền 6 đỏ cam rõ<br>Lịch sử: Từng nhuộm nâu đỏ/copper<br>Level: 6 | Nâu trà/ash brown | Đỏ cam quay lại nhanh | Làm sạch build-up, neutralize đỏ cam, khóa màu sau dịch vụ<br>Kỹ thuật: Nâu ash/chocolate lạnh theo nền | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-004.jpg / after-tvl-color-004.jpg`<br>Tag: `dich-vu:nhuom,level:6,muc-tieu:nau-tra-ash-brown,rui-ro:o-cam-quay-lai-nhanh` |
| TVL-COLOR-005 | Nền 7 vàng cam muốn trà sữa | Nền 7 không đều, vàng cam<br>Lịch sử: Có nâng nền nhẹ<br>Level: 7 | Milk tea/beige | Toner lên đục, loang | Làm đều nền, toner beige-violet rất nhẹ<br>Kỹ thuật: Gloss/toner 1.9-6 vol tùy hãng | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-005.jpg / after-tvl-color-005.jpg`<br>Tag: `dich-vu:nhuom,level:7,muc-tieu:milk-tea-beige,rui-ro:toner-len-uc` |
| TVL-COLOR-006 | Nhuộm màu lạnh bị xỉn | Màu nâu lạnh/khói bị tối bẩn<br>Lịch sử: Toner lạnh quá tay hoặc tóc xốp<br>Level: 5-7 | Nâu trong, sáng hơn | Làm sáng quá mạnh gây loang | Clarify nhẹ/soap cap kiểm soát, refill warmth nếu cần<br>Kỹ thuật: Color remover nhẹ + gloss ấm cân bằng | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-006.jpg / after-tvl-color-006.jpg`<br>Tag: `dich-vu:nhuom,level:5-7,muc-tieu:nau-trong-sang-hon,rui-ro:lam-sang-qua-manh-gay-loang` |
| TVL-COLOR-007 | Nhuộm màu khói bị xanh rêu | Tóc có ánh xanh/rêu ở ngọn<br>Lịch sử: Tẩy/toner ash mạnh<br>Level: 7-9 | Khói beige hoặc nâu lạnh sạch | Bù đỏ/cam quá tay thành nâu đỏ | Khử xanh bằng đối màu ấm liều nhỏ, sau đó gloss mục tiêu<br>Kỹ thuật: Toner corrective: warm beige/copper micro-dose | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-007.jpg / after-tvl-color-007.jpg`<br>Tag: `dich-vu:nhuom,level:7-9,muc-tieu:khoi-beige-hoac-nau-lanh-sach,rui-ro:bu-o-cam-qua-tay-thanh-nau-o` |
| TVL-COLOR-008 | Nhuộm nâu bị ra đỏ | Màu nâu lộ đỏ khi ra nắng<br>Lịch sử: Từng nhuộm nâu đỏ hoặc tóc nền đỏ<br>Level: 4-6 | Nâu lạnh/chocolate ít đỏ | Dập đỏ quá nhiều thành xỉn | Giảm độ đỏ bằng nâu ash/chocolate lạnh; hẹn bảo dưỡng<br>Kỹ thuật: Full color/refresh with neutral-ash balance | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-008.jpg / after-tvl-color-008.jpg`<br>Tag: `dich-vu:nhuom,level:4-6,muc-tieu:nau-lanh-chocolate-it-o,rui-ro:dap-o-qua-nhieu-thanh-xin` |
| TVL-COLOR-009 | Nhuộm đen xong muốn sáng lại | Tóc đen nhân tạo, bệt màu<br>Lịch sử: Nhuộm đen/box dye<br>Level: 1-3 nhân tạo | Nâu 5-7 | Loang đỏ cam, không đều, đứt nếu ép sáng | Color remover/làm sạch màu, nâng nền theo buổi<br>Kỹ thuật: Color correction nhiều phiên, không cam kết sáng 1 lần | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-009.jpg / after-tvl-color-009.jpg`<br>Tag: `dich-vu:nhuom,level:1-3 nhân tạo,muc-tieu:nau-5-7,rui-ro:loang-o-cam` |
| TVL-COLOR-010 | Nhuộm phủ bạc bị sáng chân | Chân tóc sáng/vàng hơn thân<br>Lịch sử: Phủ bạc gần đây<br>Level: Chân 5-7, thân 3-5 | Đều màu, phủ bạc ổn | Chân nóng do nhiệt da đầu, thân hút màu | Hạ chân/retouch riêng vùng chân; chọn nền tự nhiên đủ sâu<br>Kỹ thuật: Root correction + mids refresh | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-010.jpg / after-tvl-color-010.jpg`<br>Tag: `dich-vu:nhuom,level:Chân 5-7, thân 3-5,muc-tieu:eu-mau-phu-bac-on,rui-ro:chan-nong-do-nhiet-da-au` |
| TVL-COLOR-011 | Nhuộm không đều màu toàn đầu | Vùng sáng tối rải rác<br>Lịch sử: Tự nhuộm hoặc nhiều salon<br>Level: 3-8 | Đều màu nâu/ash | Mỗi vùng hút khác nhau | Chia zone, xử lý từng nền trước khi lên màu chung<br>Kỹ thuật: Zone mapping + fill/neutralize | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-011.jpg / after-tvl-color-011.jpg`<br>Tag: `dich-vu:nhuom,level:3-8,muc-tieu:eu-mau-nau-ash,rui-ro:moi-vung-hut-khac-nhau` |
| TVL-COLOR-012 | Chân tóc sáng hơn thân tóc | Hot root 1-3cm<br>Lịch sử: Nhuộm nâng tông hoặc phủ bạc<br>Level: Chân 6-8, thân 4-6 | Chân-thân đồng nhất | Dặm chân quá đậm tạo vòng tối | Root smudge/root melt cùng hệ màu<br>Kỹ thuật: Root shadow cấp 4-6 tùy thân | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-012.jpg / after-tvl-color-012.jpg`<br>Tag: `dich-vu:nhuom,level:Chân 6-8, thân 4-6,muc-tieu:chan-than-ong-nhat,rui-ro:dam-chan-qua-am-tao-vong-toi` |
| TVL-COLOR-013 | Thân tóc tối hơn ngọn tóc | Mid-band tối, ngọn sáng<br>Lịch sử: Nhuộm chồng nhiều lần<br>Level: Mid 3-5, ends 6-8 | Màu chuyển đều | Mở mid-band làm hư | Tẩy/soap cap chỉ vùng mid-band, sau đó gloss<br>Kỹ thuật: Band correction theo vùng | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-013.jpg / after-tvl-color-013.jpg`<br>Tag: `dich-vu:nhuom,level:Mid 3-5, ends 6-8,muc-tieu:mau-chuyen-eu,rui-ro:mo-mid-band-lam-hu` |
| TVL-COLOR-014 | Ngọn tóc hút màu quá đậm | Ngọn khô/xốp, màu bám đen<br>Lịch sử: Tẩy/duỗi/nhuộm nhiều<br>Level: Ends 6-9 xốp | Ngọn trong, không bệt | Tóc xốp càng xử lý càng rỗ | Pre-treatment, pha loãng toner, bôi ngọn sau cùng<br>Kỹ thuật: Porosity equalizer + gloss loãng | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-014.jpg / after-tvl-color-014.jpg`<br>Tag: `dich-vu:nhuom,level:Ends 6-9 xốp,muc-tieu:ngon-trong-khong-bet,rui-ro:toc-xop-cang-xu-ly-cang-ro` |
| TVL-COLOR-015 | Tóc xốp hút màu | Sợi khô, rỗ, chạm ráp<br>Lịch sử: Tẩy/duỗi/nhiệt<br>Level: 6-10 | Màu đều, bóng | Đậm loang, nhanh phai | Cân bằng độ xốp, fill pigment thiếu, gloss acid nhẹ<br>Kỹ thuật: Treatment + fill + demi gloss | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-015.jpg / after-tvl-color-015.jpg`<br>Tag: `dich-vu:nhuom,level:6-10,muc-tieu:mau-eu-bong,rui-ro:am-loang` |
| TVL-COLOR-016 | Tóc khỏe không ăn màu | Sợi to, cuticle chặt<br>Lịch sử: Ít hóa chất<br>Level: 1-4 | Nâng 1-2 level | Màu trầm, không thấy tông | Tăng thời gian/độ mở cuticle hợp lý; không bôi ngọn quá lâu<br>Kỹ thuật: Permanent color + kiểm soát developer | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-016.jpg / after-tvl-color-016.jpg`<br>Tag: `dich-vu:nhuom,level:1-4,muc-tieu:nang-1-2-level,rui-ro:mau-tram` |
| TVL-COLOR-017 | Màu nhanh phai sau 1-2 tuần | Màu mới phai, ngọn vàng/cam<br>Lịch sử: Tẩy cũ hoặc gội mạnh<br>Level: 6-9 | Giữ màu lâu hơn | Lặp toner liên tục làm tóc xỉn | Xem độ xốp, sau màu dùng gloss, hướng dẫn chăm sóc<br>Kỹ thuật: Acid gloss + aftercare sulfate-free | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-017.jpg / after-tvl-color-017.jpg`<br>Tag: `dich-vu:nhuom,level:6-9,muc-tieu:giu-mau-lau-hon,rui-ro:lap-toner-lien-tuc-lam-toc-xin` |
| TVL-COLOR-018 | Màu bị loang sau tự nhuộm | Có mảng đậm/nhạt<br>Lịch sử: Tự nhuộm tại nhà<br>Level: 3-8 | Màu salon đều | Không thể đều tuyệt đối trong 1 lần | Map vùng, làm sạch mảng đậm, fill vùng sáng<br>Kỹ thuật: Corrective color zoning | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-018.jpg / after-tvl-color-018.jpg`<br>Tag: `dich-vu:nhuom,level:3-8,muc-tieu:mau-salon-eu,rui-ro:khong-the-eu-tuyet-oi-trong-1-lan` |
| TVL-COLOR-019 | Màu không giống ảnh mẫu | Nền không đủ sáng/khác chất tóc<br>Lịch sử: Tùy khách<br>Level: 1-10 | Giống ảnh tham khảo | Kỳ vọng sai, ảnh filter | Tư vấn level thật, ánh sáng, số buổi; chọn phiên bản phù hợp<br>Kỹ thuật: Consultation-first color planning | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-019.jpg / after-tvl-color-019.jpg`<br>Tag: `dich-vu:nhuom,level:1-10,muc-tieu:giong-anh-tham-khao,rui-ro:ky-vong-sai` |
| TVL-COLOR-020 | Chân tự nhiên + thân nhuộm nâu cũ | Chân đen, thân nâu cũ<br>Lịch sử: Nhuộm 2-4 tháng trước<br>Level: Chân 2-3, thân 5-6 | Nâu đều 5-6 | Chân không nâng đủ hoặc thân đậm | Bôi thân/đuôi khác chân; xử lý độ hút màu<br>Kỹ thuật: Regrowth application + refresh | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-020.jpg / after-tvl-color-020.jpg`<br>Tag: `dich-vu:nhuom,level:Chân 2-3, thân 5-6,muc-tieu:nau-eu-5-6,rui-ro:chan-khong-nang-u-hoac-than-am` |
| TVL-COLOR-021 | Chân bạc + thân màu cũ | Chân bạc 30-50%, thân nâu phai<br>Lịch sử: Phủ bạc định kỳ<br>Level: Chân bạc/level tự nhiên, thân 4-6 | Đồng nhất, không lộ bạc | Chân khác độ hút so với thân | Công thức chân riêng, thân refresh mềm<br>Kỹ thuật: Root coverage + color balancing | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-021.jpg / after-tvl-color-021.jpg`<br>Tag: `dich-vu:nhuom,level:Chân bạc/level tự nhiên, thân 4-6,muc-tieu:ong-nhat-khong-lo-bac,rui-ro:chan-khac-o-hut-so-voi-than` |
| TVL-COLOR-022 | Tóc muốn đỏ thời trang | Nền nâu/đen<br>Lịch sử: Có thể chưa tẩy<br>Level: 3-6 | Đỏ cherry/wine | Phai nhanh, dây màu, khó đổi màu sau | Nâng nền theo độ rực, tư vấn duy trì<br>Kỹ thuật: Pre-lighten if vivid; direct/permanent red | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-022.jpg / after-tvl-color-022.jpg`<br>Tag: `dich-vu:nhuom,level:3-6,muc-tieu:o-cherry-wine,rui-ro:phai-nhanh` |
| TVL-COLOR-023 | Copper bị xuống nâu | Tóc copper phai tối<br>Lịch sử: Nhuộm copper trước<br>Level: 6-8 | Copper sáng, trong | Quá cam hoặc quá tối | Gloss copper/gold; giữ nền đủ sáng<br>Kỹ thuật: Copper refresh + shine gloss | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-023.jpg / after-tvl-color-023.jpg`<br>Tag: `dich-vu:nhuom,level:6-8,muc-tieu:copper-sang-trong,rui-ro:qua-cam-hoac-qua-toi` |
| TVL-COLOR-024 | Xanh đen phai ra xanh rêu | Tóc phai rêu/xanh, ngọn xỉn<br>Lịch sử: Nhuộm blue-black<br>Level: 3-6 | Nâu đen sạch hoặc xanh đen mới | Xanh bám dai, khó đổi ấm | Clarify/làm sạch nhẹ, bù ấm nếu đổi sang nâu<br>Kỹ thuật: Direct dye removal + fill | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-024.jpg / after-tvl-color-024.jpg`<br>Tag: `dich-vu:nhuom,level:3-6,muc-tieu:nau-en-sach-hoac-xanh-en-moi,rui-ro:xanh-bam-dai` |
| TVL-COLOR-025 | Pastel không lên vì nền chưa đủ sáng | Nền vàng/cam<br>Lịch sử: Tẩy chưa tới<br>Level: 7-8 | Hồng pastel/xám pastel | Pastel bẩn, không thấy tông | Giải thích cần level 9-10 và nền sạch; hẹn buổi nâng nền<br>Kỹ thuật: Prelighten to pale yellow + pastel toner | Time: 2-5 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Không, trừ tóc yếu/dị ứng | Chốt kỳ vọng theo level thật, ánh sáng ảnh mẫu và lịch bảo dưỡng.<br>Ảnh: `before-tvl-color-025.jpg / after-tvl-color-025.jpg`<br>Tag: `dich-vu:nhuom,level:7-8,muc-tieu:hong-pastel-xam-pastel,rui-ro:pastel-ban` |

### 5.2. Tẩy tóc / nâng nền
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-BLEACH-001 | Tẩy nền đen tự nhiên lên level 7 | Tóc đen Việt, khỏe<br>Lịch sử: Chưa tẩy<br>Level: 1-3 | Nền 7 vàng cam sạch | Cam mạnh, khô, không đều | Chia section mỏng, kiểm soát nhiệt, toner sau nâng<br>Kỹ thuật: Bleach virgin hair + toner | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-001.jpg / after-tvl-bleach-001.jpg`<br>Tag: `dich-vu:tay,level:1-3,ky-thuat:bleach-virgin-hair-toner,rui-ro:cam-manh` |
| TVL-BLEACH-002 | Tẩy nền đen tự nhiên lên level 8-9 | Tóc đen dày/khỏe<br>Lịch sử: Chưa tẩy<br>Level: 1-3 | Blonde/beige level 8-9 | Cần nhiều phiên, đứt nếu ép | Tư vấn 2 buổi, test lọn, không cam kết platinum<br>Kỹ thuật: Multi-session lightening | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-002.jpg / after-tvl-bleach-002.jpg`<br>Tag: `dich-vu:tay,level:1-3,ky-thuat:multi-session-lightening,rui-ro:can-nhieu-phien` |
| TVL-BLEACH-003 | Tẩy sát da đầu tóc mảnh | Tóc mảnh, da đầu nhạy<br>Lịch sử: Có/không nhuộm<br>Level: 2-6 | Nền sáng đều sát chân | Bỏng rát, hot root, đứt chân | Kiểm tra da đầu, dùng kỹ thuật an toàn, theo dõi liên tục<br>Kỹ thuật: Scalp bleach protocol | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-003.jpg / after-tvl-bleach-003.jpg`<br>Tag: `dich-vu:tay,level:2-6,ky-thuat:scalp-bleach-protocol,rui-ro:bong-rat` |
| TVL-BLEACH-004 | Tẩy trên nền nhuộm đen hộp | Tóc bệt đen, khó xác định<br>Lịch sử: Box dye/nhuộm đen nhiều lần<br>Level: 1-3 nhân tạo | Nâu sáng/blonde | Loang đỏ cam, không nâng đều | Color remover trước, test lọn, chia nhiều buổi<br>Kỹ thuật: Color remover + strand test | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-004.jpg / after-tvl-bleach-004.jpg`<br>Tag: `dich-vu:tay,level:1-3 nhân tạo,ky-thuat:color-remover-strand-test,rui-ro:loang-o-cam` |
| TVL-BLEACH-005 | Nền henna/metallic salt nghi ngờ | Tóc có màu lạ, khô cứng<br>Lịch sử: Henna/thuốc không rõ<br>Level: 2-6 | Nâng nền | Phản ứng hóa chất, nóng/đứt | Incompatibility test; nếu nghi ngờ cao thì từ chối<br>Kỹ thuật: Incompatibility test bắt buộc | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-005.jpg / after-tvl-bleach-005.jpg`<br>Tag: `dich-vu:tay,level:2-6,ky-thuat:incompatibility-test-bat-buoc,rui-ro:phan-ung-hoa-chat` |
| TVL-BLEACH-006 | Tóc sợi to kháng tẩy | Sợi to, đen, khỏe<br>Lịch sử: Ít hóa chất<br>Level: 1-3 | Level 7-8 | Nâng chậm, vàng cam | Saturation đầy đủ, section mỏng, thời gian kiểm soát<br>Kỹ thuật: Bleach + proper saturation | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-006.jpg / after-tvl-bleach-006.jpg`<br>Tag: `dich-vu:tay,level:1-3,ky-thuat:bleach-proper-saturation,rui-ro:nang-cham` |
| TVL-BLEACH-007 | Ngọn tẩy cũ xốp khi nâng chân | Chân đen, ngọn sáng/xốp<br>Lịch sử: Tẩy cũ<br>Level: Chân 2-3, ngọn 8-10 | Đều nền | Overlap gây đứt ngọn | Bảo vệ ngọn, chỉ tẩy vùng chân/mid cần thiết<br>Kỹ thuật: Retouch bleach no overlap | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-007.jpg / after-tvl-bleach-007.jpg`<br>Tag: `dich-vu:tay,level:Chân 2-3, ngọn 8-10,ky-thuat:retouch-bleach-no-overlap,rui-ro:overlap-gay-ut-ngon` |
| TVL-BLEACH-008 | Banding 3 vùng chân-thân-ngọn | Chân tối, thân cam, ngọn vàng<br>Lịch sử: Nhiều lần tẩy/nhuộm<br>Level: 2-9 | Nền đều | Mỗi vùng nâng khác nhau | Lập bản đồ nền, tẩy theo zone, toner sau<br>Kỹ thuật: Zone lightening | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-008.jpg / after-tvl-bleach-008.jpg`<br>Tag: `dich-vu:tay,level:2-9,ky-thuat:zone-lightening,rui-ro:moi-vung-nang-khac-nhau` |
| TVL-BLEACH-009 | Kẹt cam ở level 6 | Nền cam đậm<br>Lịch sử: Đã tẩy một lần<br>Level: 6 | Level 7-8 hoặc nâu lạnh | Tẩy tiếp dễ khô, toner không ăn | Đánh giá sức tóc; nâng tiếp hoặc chọn màu phù hợp level 6<br>Kỹ thuật: Re-lighten or formulate at level 6 | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-009.jpg / after-tvl-bleach-009.jpg`<br>Tag: `dich-vu:tay,level:6,ky-thuat:re-lighten-or-formulate-at-level-6,rui-ro:tay-tiep-de-kho` |
| TVL-BLEACH-010 | Kẹt vàng cam level 7 | Nền vàng cam<br>Lịch sử: Tẩy/nâng màu<br>Level: 7 | Beige/milk tea | Toner quá tím/xanh thành xỉn | Nâng nhẹ vùng còn cam, toner beige-violet<br>Kỹ thuật: Corrective toner | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-010.jpg / after-tvl-bleach-010.jpg`<br>Tag: `dich-vu:tay,level:7,ky-thuat:corrective-toner,rui-ro:toner-qua-tim-xanh-thanh-xin` |
| TVL-BLEACH-011 | Tẩy loang do bôi thiếu thuốc | Mảng sáng/mảng tối<br>Lịch sử: Làm tại nhà/salon yếu<br>Level: 4-9 | Nền đều | Đứt vùng đã sáng | Chỉ bôi lại vùng tối, tránh overlap<br>Kỹ thuật: Spot lightening | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-011.jpg / after-tvl-bleach-011.jpg`<br>Tag: `dich-vu:tay,level:4-9,ky-thuat:spot-lightening,rui-ro:ut-vung-a-sang` |
| TVL-BLEACH-012 | Hot root khi tẩy | Chân sáng hơn thân<br>Lịch sử: Nâng/tẩy sát da đầu<br>Level: Chân 8-10, thân 6-8 | Nền cân bằng | Dặm chân quá tối | Root shadow hoặc nâng thân để cân bằng<br>Kỹ thuật: Root shadow/zone lift | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-012.jpg / after-tvl-bleach-012.jpg`<br>Tag: `dich-vu:tay,level:Chân 8-10, thân 6-8,ky-thuat:root-shadow-zone-lift,rui-ro:dam-chan-qua-toi` |
| TVL-BLEACH-013 | Overlap tẩy gây yếu tóc | Có đoạn trắng/xốp<br>Lịch sử: Tẩy nhiều lần<br>Level: 8-10 | Tiếp tục sáng | Đứt tóc cao | Từ chối tẩy tiếp; phục hồi/cắt trước<br>Kỹ thuật: Stop chemical + repair | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-013.jpg / after-tvl-bleach-013.jpg`<br>Tag: `dich-vu:tay,level:8-10,ky-thuat:stop-chemical-repair,rui-ro:ut-toc-cao` |
| TVL-BLEACH-014 | Khách muốn bạch kim trong một ngày | Nền đen/nhuộm cũ<br>Lịch sử: Không rõ<br>Level: 1-5 | Platinum level 10 | Kỳ vọng không thực tế, đứt tóc | Tư vấn lộ trình 2-4 buổi, ký xác nhận rủi ro<br>Kỹ thuật: Multi-session blonde plan | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-014.jpg / after-tvl-bleach-014.jpg`<br>Tag: `dich-vu:tay,level:1-5,ky-thuat:multi-session-blonde-plan,rui-ro:ky-vong-khong-thuc-te` |
| TVL-BLEACH-015 | Money piece từ nền đen | Nền đen/nâu<br>Lịch sử: Có thể màu cũ<br>Level: 2-5 | Mảng sáng mặt | Lộ vàng cam, khác nền tổng thể | Foil cô lập vùng mặt, toner phù hợp màu nền<br>Kỹ thuật: Money piece foiling | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-015.jpg / after-tvl-bleach-015.jpg`<br>Tag: `dich-vu:tay,level:2-5,ky-thuat:money-piece-foiling,rui-ro:lo-vang-cam` |
| TVL-BLEACH-016 | Dặm chân tẩy định kỳ | Chân mọc 1-3cm<br>Lịch sử: Blonde cũ<br>Level: Chân 2-4, thân 8-10 | Chân sáng khớp thân | Overlap/đứt band | Bôi chính xác chân, xử lý band nếu có<br>Kỹ thuật: Bleach retouch | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-016.jpg / after-tvl-bleach-016.jpg`<br>Tag: `dich-vu:tay,level:Chân 2-4, thân 8-10,ky-thuat:bleach-retouch,rui-ro:overlap-ut-band` |
| TVL-BLEACH-017 | Tẩy trên tóc vừa duỗi/ép | Tóc thẳng hóa chất, khô<br>Lịch sử: Duỗi/ép gần đây<br>Level: 3-7 | Sáng màu | Đứt, mất đàn hồi | Test đàn hồi; trì hoãn nếu yếu<br>Kỹ thuật: Elasticity test + delay | Time: 3-8 giờ / nhiều buổi<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-017.jpg / after-tvl-bleach-017.jpg`<br>Tag: `dich-vu:tay,level:3-7,ky-thuat:elasticity-test-delay,rui-ro:ut` |
| TVL-BLEACH-018 | Tẩy tóc đã nhuộm đỏ | Nền đỏ/đỏ nâu<br>Lịch sử: Nhuộm đỏ lâu ngày<br>Level: 4-6 | Nâu sáng/beige | Đỏ bám dai, cam hồng | Làm sạch màu đỏ, nâng dần, tránh ash quá mạnh<br>Kỹ thuật: Red removal + controlled lift | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-018.jpg / after-tvl-bleach-018.jpg`<br>Tag: `dich-vu:tay,level:4-6,ky-thuat:red-removal-controlled-lift,rui-ro:o-bam-dai` |
| TVL-BLEACH-019 | Tẩy ngọn để ombre | Chân tối, ngọn cần sáng<br>Lịch sử: Có/không màu cũ<br>Level: 3-6 | Ombre mềm | Ranh giới cứng, ngọn hư | Backcomb/teasy light, kiểm soát chuyển tiếp<br>Kỹ thuật: Ombre lightening | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-019.jpg / after-tvl-bleach-019.jpg`<br>Tag: `dich-vu:tay,level:3-6,ky-thuat:ombre-lightening,rui-ro:ranh-gioi-cung` |
| TVL-BLEACH-020 | Nâng nền trước màu thời trang | Nền tối<br>Lịch sử: Tùy<br>Level: 1-6 | Vivid/pastel | Không đủ sáng làm màu bẩn | Nâng tới level yêu cầu của màu, test lọn<br>Kỹ thuật: Pre-lightening for fashion color | Time: 3-8 giờ / nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu, dị ứng, henna/metallic, da đầu tổn thương | Không bán kết quả quá mức; phải nói rõ số buổi và giới hạn an toàn.<br>Ảnh: `before-tvl-bleach-020.jpg / after-tvl-bleach-020.jpg`<br>Tag: `dich-vu:tay,level:1-6,ky-thuat:pre-lightening-for-fashion-color,rui-ro:khong-u-sang-lam-mau-ban` |

### 5.3. Sửa lỗi màu
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-CORR-001 | Khử ánh xanh/rêu sau toner khói | Ngọn xanh/rêu<br>Lịch sử: Tẩy + ash/green toner<br>Level: 7-10 | Beige/nâu sạch | Bù ấm quá tay | Warm corrective gloss liều thấp<br>Kỹ thuật: Micro warm toner | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-001.jpg / after-tvl-corr-001.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:7-10,ky-thuat:micro-warm-toner,rui-ro:bu-am-qua-tay` |
| TVL-CORR-002 | Màu bị bùn/xỉn sau dập cam | Tóc tối, mất trong<br>Lịch sử: Toner ash quá mạnh<br>Level: 5-8 | Nâu trong/sáng | Mở màu gây loang | Clarify/soap cap nhẹ, fill lại ánh ấm<br>Kỹ thuật: Mild cleanse + gloss | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-002.jpg / after-tvl-corr-002.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:5-8,ky-thuat:mild-cleanse-gloss,rui-ro:mo-mau-gay-loang` |
| TVL-CORR-003 | Lộ đỏ cam sau nhuộm nâu lạnh | Nền đỏ cam<br>Lịch sử: Nâng/nâu lạnh<br>Level: 5-6 | Nâu lạnh tự nhiên | Xỉn nếu dùng xanh nhiều | Neutralize vừa đủ, không ép ash<br>Kỹ thuật: Neutral brown ash | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-003.jpg / after-tvl-corr-003.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:5-6,ky-thuat:neutral-brown-ash,rui-ro:xin-neu-dung-xanh-nhieu` |
| TVL-CORR-004 | Nền vàng chuối sau tẩy | Vàng sáng nhưng gắt<br>Lịch sử: Tẩy gần đây<br>Level: 8-10 | Blonde beige/pearl | Tím quá tay thành xám tím | Toner tím/beige kiểm soát thời gian<br>Kỹ thuật: Violet-beige toner | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-004.jpg / after-tvl-corr-004.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:8-10,ky-thuat:violet-beige-toner,rui-ro:tim-qua-tay-thanh-xam-tim` |
| TVL-CORR-005 | Màu xanh/blue stain bám dai | Xanh ở ngọn<br>Lịch sử: Direct dye xanh/xanh đen<br>Level: 5-9 | Nâu/beige | Màu không sạch hết | Làm sạch direct dye, bù cam nhẹ nếu cần<br>Kỹ thuật: Direct dye remover | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-005.jpg / after-tvl-corr-005.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:5-9,ky-thuat:direct-dye-remover,rui-ro:mau-khong-sach-het` |
| TVL-CORR-006 | Overtone tím/xám quá tay | Tóc tím/xám đục<br>Lịch sử: Toner/purple shampoo quá nhiều<br>Level: 8-10 | Blonde sáng sạch | Gội mạnh khô tóc | Clarify nhẹ, gloss trong<br>Kỹ thuật: Clarifying + clear gloss | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-006.jpg / after-tvl-corr-006.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:8-10,ky-thuat:clarifying-clear-gloss,rui-ro:goi-manh-kho-toc` |
| TVL-CORR-007 | Màu quá tối so với mong muốn | Toàn đầu tối<br>Lịch sử: Nhuộm mới<br>Level: 3-5 | Sáng hơn 1-2 level | Gỡ màu gây cam | Color remover/soap cap tùy độ bám<br>Kỹ thuật: Mild color remover | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-007.jpg / after-tvl-corr-007.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:3-5,ky-thuat:mild-color-remover,rui-ro:go-mau-gay-cam` |
| TVL-CORR-008 | Màu quá sáng, khách muốn trầm lại | Nền sáng/nhợt<br>Lịch sử: Tẩy/nhuộm sáng<br>Level: 7-10 | Nâu 5-7 | Thiếu fill làm màu xanh/xám | Pre-pigment/fill ấm rồi đặt màu mục tiêu<br>Kỹ thuật: Filler + target shade | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-008.jpg / after-tvl-corr-008.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:7-10,ky-thuat:filler-target-shade,rui-ro:thieu-fill-lam-mau-xanh-xam` |
| TVL-CORR-009 | Hot root sau nhuộm nâng tông | Chân sáng cam<br>Lịch sử: Nhuộm tại nhà/salon<br>Level: Chân 6-8, thân 4-6 | Đồng đều | Tạo vòng tối | Root melt/smudge, thân refresh<br>Kỹ thuật: Root correction | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-009.jpg / after-tvl-corr-009.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:Chân 6-8, thân 4-6,ky-thuat:root-correction,rui-ro:tao-vong-toi` |
| TVL-CORR-010 | Root shadow quá đậm | Chân/melt đen cứng<br>Lịch sử: Sau highlight<br>Level: Root 2-4, thân 8-10 | Melt mềm | Gỡ shadow làm loang | Làm mềm bằng gloss/cleanse vùng shadow<br>Kỹ thuật: Shadow softening | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-010.jpg / after-tvl-corr-010.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:Root 2-4, thân 8-10,ky-thuat:shadow-softening,rui-ro:go-shadow-lam-loang` |
| TVL-CORR-011 | Highlight sọc vằn | Line sáng cứng<br>Lịch sử: Foil dày/ít blending<br>Level: 5-10 | Highlight mềm | Tóc yếu nếu tẩy thêm | Lowlight, root smudge, gloss<br>Kỹ thuật: Lowlight + smudge | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-011.jpg / after-tvl-corr-011.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:5-10,ky-thuat:lowlight-smudge,rui-ro:toc-yeu-neu-tay-them` |
| TVL-CORR-012 | Balayage bị mảng | Mảng sáng không đều<br>Lịch sử: Tẩy tự do sai<br>Level: 4-9 | Chuyển màu mềm | Đụng mảng sáng gây đứt | Foilyage/lowlight theo vùng<br>Kỹ thuật: Balayage correction | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-012.jpg / after-tvl-corr-012.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:4-9,ky-thuat:balayage-correction,rui-ro:ung-mang-sang-gay-ut` |
| TVL-CORR-013 | Toner chỉ ăn ở ngọn xốp | Ngọn đậm, thân vàng<br>Lịch sử: Tóc xốp ngọn<br>Level: 7-10 | Blonde đều | Ngọn càng đậm | Porosity equalizer, bôi toner thân trước<br>Kỹ thuật: Porosity control | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-013.jpg / after-tvl-corr-013.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:7-10,ky-thuat:porosity-control,rui-ro:ngon-cang-am` |
| TVL-CORR-014 | Loại bỏ màu đỏ direct dye | Đỏ bám ở ngọn/thân<br>Lịch sử: Màu thời trang<br>Level: 5-9 | Nâu/beige/blonde | Đỏ hồng quay lại | Direct dye remover, không dùng ash đơn độc<br>Kỹ thuật: Direct dye correction | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-014.jpg / after-tvl-corr-014.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:5-9,ky-thuat:direct-dye-correction,rui-ro:o-hong-quay-lai` |
| TVL-CORR-015 | Nhuộm đen hộp loang khi gỡ | Mảng nâu/cam/đen<br>Lịch sử: Box dye nhiều lần<br>Level: 1-6 | Nâu đều | Không thể đều 1 lần | Làm sạch nhiều bước, chọn mục tiêu an toàn<br>Kỹ thuật: Black box correction | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-015.jpg / after-tvl-corr-015.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:1-6,ky-thuat:black-box-correction,rui-ro:khong-the-eu-1-lan` |
| TVL-CORR-016 | Band màu ngang thân | Dải màu rõ<br>Lịch sử: Retouch sai nhiều lần<br>Level: 3-9 | Không còn band | Mỗi band phản ứng khác | Tẩy/đặt màu theo band, gloss tổng<br>Kỹ thuật: Band mapping | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-016.jpg / after-tvl-corr-016.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:3-9,ky-thuat:band-mapping,rui-ro:moi-band-phan-ung-khac` |
| TVL-CORR-017 | Phủ bạc không ăn vùng thái dương | Bạc lộ thái dương<br>Lịch sử: Phủ bạc thất bại<br>Level: Bạc/level tự nhiên | Che bạc kín | Tóc bạc kháng màu | Pre-soften hoặc công thức neutral sâu hơn<br>Kỹ thuật: Resistant grey correction | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-017.jpg / after-tvl-corr-017.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:Bạc/level tự nhiên,ky-thuat:resistant-grey-correction,rui-ro:toc-bac-khang-mau` |
| TVL-CORR-018 | Chân lạnh, ngọn ấm lệch tông | Chân ash, ngọn vàng/cam<br>Lịch sử: Toner không đều<br>Level: 6-10 | Tone đồng nhất | Bôi một công thức càng lệch | Toner theo vùng: ngọn riêng/chân riêng<br>Kỹ thuật: Zone toning | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-018.jpg / after-tvl-corr-018.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:6-10,ky-thuat:zone-toning,rui-ro:boi-mot-cong-thuc-cang-lech` |
| TVL-CORR-019 | Split color lệch hai bên | Hai bên sáng/tối khác<br>Lịch sử: Tẩy/nhuộm chia bên<br>Level: 4-10 | Hai bên đều | Khó khớp tuyệt đối | Đo level từng bên, chỉnh bên thiếu trước<br>Kỹ thuật: Side balancing | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-019.jpg / after-tvl-corr-019.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:4-10,ky-thuat:side-balancing,rui-ro:kho-khop-tuyet-oi` |
| TVL-CORR-020 | Toner salon quá smoky, khách thấy già | Tóc xám khói đậm<br>Lịch sử: Mới toner<br>Level: 7-10 | Beige mềm/trẻ hơn | Gỡ quá nhiều thành vàng | Làm mềm khói bằng gloss beige/clear<br>Kỹ thuật: Smoky softening gloss | Time: 2-6 giờ / có thể nhiều buổi<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc mất đàn hồi hoặc khách yêu cầu quá mức | Đưa phương án A/B: đẹp tối đa hôm nay và lộ trình sửa hoàn chỉnh.<br>Ảnh: `before-tvl-corr-020.jpg / after-tvl-corr-020.jpg`<br>Tag: `dich-vu:sua-loi-mau,level:7-10,ky-thuat:smoky-softening-gloss,rui-ro:go-qua-nhieu-thanh-vang` |

### 5.4. Phủ bạc / grey blending
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-GRAY-001 | Bạc 30% phủ nâu tự nhiên | Bạc rải rác<br>Lịch sử: Ít/không nhuộm<br>Level: Bạc 30% | Nâu tự nhiên | Bạc không ăn đều | Dùng nền tự nhiên phối tông mục tiêu<br>Kỹ thuật: Permanent root coverage | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-001.jpg / after-tvl-gray-001.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-30,ky-thuat:permanent-root-coverage` |
| TVL-GRAY-002 | Bạc 50% kháng màu | Bạc dày vùng chân<br>Lịch sử: Phủ bạc nhiều lần<br>Level: Bạc 50% | Che kín | Trôi bạc, chân trong | Tăng nền natural/NN, đủ thời gian xử lý<br>Kỹ thuật: Resistant grey coverage | Time: 1.5-4 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-002.jpg / after-tvl-gray-002.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-50,ky-thuat:resistant-grey-coverage` |
| TVL-GRAY-003 | Bạc 80% muốn nâu sáng | Bạc nhiều, sợi thô<br>Lịch sử: Có thể nhuộm đen cũ ở thân<br>Level: Bạc 80% | Nâu 6-7 | Chân sáng, thân tối | Chân và thân công thức riêng<br>Kỹ thuật: Grey coverage + mids balancing | Time: 1.5-4 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-003.jpg / after-tvl-gray-003.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-80,ky-thuat:grey-coverage-mids-balancing` |
| TVL-GRAY-004 | Thái dương trắng khó ăn màu | Vùng thái dương trắng cứng<br>Lịch sử: Phủ bạc thất bại<br>Level: Bạc vùng | Che kín thái dương | Không bám màu | Pre-soften/thoa kỹ vùng kháng<br>Kỹ thuật: Pre-softening grey | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-004.jpg / after-tvl-gray-004.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-vung,ky-thuat:pre-softening-grey` |
| TVL-GRAY-005 | Phủ bạc bị sáng chân | Chân vàng/nâu sáng<br>Lịch sử: Phủ bạc gần đây<br>Level: Chân bạc+hot root | Đều màu | Dặm sai làm đen vòng chân | Retouch low-volume, chọn depth đúng<br>Kỹ thuật: Root correction grey | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-005.jpg / after-tvl-gray-005.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:chan-bac-hot-root,ky-thuat:root-correction-grey` |
| TVL-GRAY-006 | Bạc chuyển màu trong/translucent | Tóc bạc bóng, màu xuyên<br>Lịch sử: Nhuộm sáng/ash<br>Level: Bạc 40-80% | Màu đặc hơn | Fashion tone không đủ nền | Thêm nền tự nhiên/neutral vào công thức<br>Kỹ thuật: Natural base support | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-006.jpg / after-tvl-gray-006.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-40-80,ky-thuat:natural-base-support` |
| TVL-GRAY-007 | Phủ bạc tông ash brown | Bạc 30-60%<br>Lịch sử: Muốn màu lạnh<br>Level: Bạc 30-60% | Ash brown | Ash đơn lẻ che bạc yếu | Cân bằng natural + ash<br>Kỹ thuật: Natural + ash blend | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-007.jpg / after-tvl-gray-007.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-30-60,ky-thuat:natural-ash-blend` |
| TVL-GRAY-008 | Grey blending ít bảo trì | Bạc rải + tóc tối<br>Lịch sử: Không muốn che kín<br>Level: Bạc 20-50% | Blend tự nhiên | Highlight quá sáng | Babylight/lowlight/root blend<br>Kỹ thuật: Grey blending | Time: 1.5-4 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-008.jpg / after-tvl-gray-008.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-20-50,ky-thuat:grey-blending` |
| TVL-GRAY-009 | Dặm chân bạc, thân phai đỏ | Chân bạc, thân nâu đỏ<br>Lịch sử: Phủ bạc cũ<br>Level: Chân bạc; thân 4-6 | Đều nâu lạnh | Chân/thân lệch tông | Công thức chân che bạc, thân gloss khử đỏ<br>Kỹ thuật: Root coverage + gloss | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-009.jpg / after-tvl-gray-009.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:chan-bac-than-4-6,ky-thuat:root-coverage-gloss` |
| TVL-GRAY-010 | Bạc sợi thô, tóc khỏe | Sợi thô cứng<br>Lịch sử: Nhuộm không bám<br>Level: Bạc 50-90% | Màu bền | Kháng thuốc | Thời gian đủ, saturation cao, công thức grey chuyên dụng<br>Kỹ thuật: Resistant coarse grey | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-010.jpg / after-tvl-gray-010.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-50-90,ky-thuat:resistant-coarse-grey` |
| TVL-GRAY-011 | Bạc + da đầu nhạy | Da đầu dễ rát<br>Lịch sử: Từng kích ứng<br>Level: Bạc 30-80% | Phủ bạc an toàn | Kích ứng/dị ứng | Patch test, tránh da đầu tổn thương, chọn kỹ thuật phù hợp<br>Kỹ thuật: Patch test + gentle application | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-011.jpg / after-tvl-gray-011.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-30-80,ky-thuat:patch-test-gentle-application` |
| TVL-GRAY-012 | Nam giới phủ bạc tự nhiên | Bạc hai bên mai<br>Lịch sử: Ít nhuộm<br>Level: Bạc 20-60% | Tự nhiên không đen bệt | Quá đen giả | Grey blending nam, thời gian ngắn<br>Kỹ thuật: Men grey blending | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-012.jpg / after-tvl-gray-012.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-20-60,ky-thuat:men-grey-blending` |
| TVL-GRAY-013 | Chân bạc trắng, thân đen cũ | Chân trắng, thân đen<br>Lịch sử: Nhuộm đen định kỳ<br>Level: Bạc + thân 1-3 | Nâu mềm | Tương phản mạnh | Chân phủ riêng, thân làm mềm theo lộ trình<br>Kỹ thuật: Grey root + black mids plan | Time: 1.5-4 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-013.jpg / after-tvl-gray-013.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-than-1-3,ky-thuat:grey-root-black-mids-plan` |
| TVL-GRAY-014 | Bạc muốn đỏ/rượu vang | Bạc 30-60%<br>Lịch sử: Tóc nâu/đen<br>Level: Bạc 30-60% | Đỏ wine | Fashion đỏ che bạc không bền | Nền natural + đỏ mục tiêu<br>Kỹ thuật: Natural base + red target | Time: 1.5-4 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-014.jpg / after-tvl-gray-014.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-30-60,ky-thuat:natural-base-red-target` |
| TVL-GRAY-015 | Khách không muốn thấy đường mọc chân | Bạc 30-70%<br>Lịch sử: Phủ bạc truyền thống<br>Level: Bạc 30-70% | Regrowth mềm | Che kín gây đường chân rõ | Grey blending/highlight/lowlight thay vì phủ kín<br>Kỹ thuật: Soft grey transition | Time: 1.5-4 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu có tiền sử dị ứng/da đầu tổn thương | Hỏi % bạc, mong muốn che kín hay blend, lịch dặm chân chấp nhận được.<br>Ảnh: `before-tvl-gray-015.jpg / after-tvl-gray-015.jpg`<br>Tag: `dich-vu:phu-bac,tinh-trang:bac-30-70,ky-thuat:soft-grey-transition` |

### 5.5. Balayage / highlight / ombre
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-HILITE-001 | Balayage nâu mềm trên nền đen | Nền đen Việt<br>Lịch sử: Chưa tẩy<br>Level: 2-3 | Nâu caramel mềm | Cam/ranh giới cứng | Teasy light/foilyage nhẹ, toner nâu caramel<br>Kỹ thuật: Soft balayage | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-001.jpg / after-tvl-hilite-001.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:soft-balayage,level:2-3` |
| TVL-HILITE-002 | Caramel balayage nền level 4-5 | Nền nâu tối<br>Lịch sử: Nhuộm nâu cũ<br>Level: 4-5 | Caramel nổi nhẹ | Nâng không đều | Foilyage vùng cần sáng, root giữ tối<br>Kỹ thuật: Foilyage caramel | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-002.jpg / after-tvl-hilite-002.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:foilyage-caramel,level:4-5` |
| TVL-HILITE-003 | Beige balayage nền tối | Nền tối sợi dày<br>Lịch sử: Có thể màu cũ<br>Level: 2-5 | Beige level 8 | Cần nhiều phiên | Nâng vùng highlight đủ level, toner beige<br>Kỹ thuật: Balayage + beige toner | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-003.jpg / after-tvl-hilite-003.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:balayage-beige-toner,level:2-5` |
| TVL-HILITE-004 | Ash balayage nền level 5 | Nền nâu ấm<br>Lịch sử: Nhuộm cũ<br>Level: 5 | Ash brown dimension | Ash xỉn | Giữ depth, neutralize vùng sáng<br>Kỹ thuật: Ash balayage | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-004.jpg / after-tvl-hilite-004.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:ash-balayage,level:5` |
| TVL-HILITE-005 | Ombre nâu sang trà sữa | Chân tối, ngọn cần sáng<br>Lịch sử: Có màu cũ<br>Level: 3-6 | Ombre milk tea | Đường chuyển gắt | Backcomb/handpaint, toner gradient<br>Kỹ thuật: Ombre + melt | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-005.jpg / after-tvl-hilite-005.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:ombre-melt,level:3-6` |
| TVL-HILITE-006 | Highlight sọc cần làm mềm | Line highlight dày<br>Lịch sử: Foil cũ<br>Level: 6-10 | Sợi mảnh tự nhiên | Làm thêm hư tóc | Lowlight + root shadow<br>Kỹ thuật: Highlight softening | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-006.jpg / after-tvl-hilite-006.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:highlight-softening,level:6-10` |
| TVL-HILITE-007 | Airtouch trên nền đen châu Á | Nền đen, tóc dày<br>Lịch sử: Chưa tẩy hoặc màu cũ<br>Level: 2-4 | Sáng mềm, low maintenance | Thời gian dài, cam | Airtouch section chuẩn, nhiều phiên nếu cần<br>Kỹ thuật: Airtouch | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-007.jpg / after-tvl-hilite-007.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:airtouch,level:2-4` |
| TVL-HILITE-008 | Highlight blend bạc | Bạc rải + nền tối<br>Lịch sử: Phủ bạc trước đó<br>Level: Bạc 30-60% | Blend bạc mềm | Sọc sáng, không che bạc | Babylight + lowlight + root blend<br>Kỹ thuật: Grey blending highlight | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-008.jpg / after-tvl-hilite-008.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:grey-blending-highlight,level:Bạc 30-60%` |
| TVL-HILITE-009 | Money piece sáng vùng mặt | Nền tối<br>Lịch sử: Có thể màu cũ<br>Level: 2-6 | Mặt sáng nổi bật | Vàng/cam vùng mặt | Foil cô lập, toner riêng<br>Kỹ thuật: Money piece | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-009.jpg / after-tvl-hilite-009.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:money-piece,level:2-6` |
| TVL-HILITE-010 | Root shadow sau highlight | Chân tương phản<br>Lịch sử: Highlight mới/cũ<br>Level: Root 2-5, ends 8-10 | Chân mềm | Root quá tối | Smudge 1-2 level sâu hơn nền<br>Kỹ thuật: Root shadow | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-010.jpg / after-tvl-hilite-010.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:root-shadow,level:Root 2-5, ends 8-10` |
| TVL-HILITE-011 | Foilyage trên nền màu cũ | Nền nâu/đen nhân tạo<br>Lịch sử: Nhuộm nhiều lần<br>Level: 3-6 | Dimension sáng | Loang do màu cũ | Test lọn, chọn vị trí highlight an toàn<br>Kỹ thuật: Foilyage correction | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-011.jpg / after-tvl-hilite-011.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:foilyage-correction,level:3-6` |
| TVL-HILITE-012 | Highlight trên tóc yếu | Tóc khô/xốp<br>Lịch sử: Tẩy/duỗi cũ<br>Level: 6-10 | Sáng nhẹ | Đứt vùng foil | Chỉ highlight ít, hoặc từ chối nếu đàn hồi kém<br>Kỹ thuật: Low-risk highlighting | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-012.jpg / after-tvl-hilite-012.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:low-risk-highlighting,level:6-10` |
| TVL-HILITE-013 | Lowlight thêm chiều sâu cho tóc quá sáng | Blonde nhạt thiếu depth<br>Lịch sử: Tẩy/highlight nhiều<br>Level: 8-10 | Có chiều sâu | Lowlight bám đậm trên tóc xốp | Fill nhẹ, chọn lowlight mềm<br>Kỹ thuật: Lowlight dimension | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-013.jpg / after-tvl-hilite-013.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:lowlight-dimension,level:8-10` |
| TVL-HILITE-014 | Face framing tóc ngắn | Tóc bob/lob<br>Lịch sử: Có hoặc không màu cũ<br>Level: 3-7 | Khung mặt sáng | Mảng sáng quá to | Chọn panel mảnh, toner khớp tổng thể<br>Kỹ thuật: Face frame | Time: 3-7 giờ<br>Khó: Trung cấp<br>Test: Nên<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-014.jpg / after-tvl-hilite-014.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:face-frame,level:3-7` |
| TVL-HILITE-015 | Sửa balayage sau nhuộm hộp | Mảng tối/đỏ cam<br>Lịch sử: Box dye<br>Level: 2-7 | Balayage sạch | Không đều trong 1 lần | Color remove + highlight chiến lược<br>Kỹ thuật: Balayage correction | Time: 3-7 giờ<br>Khó: Nâng cao<br>Test: Có<br>Từ chối: Có nếu tóc yếu hoặc mục tiêu quá sáng | Tư vấn chi phí/bảo dưỡng theo vùng sáng, không hứa giống ảnh filter.<br>Ảnh: `before-tvl-hilite-015.jpg / after-tvl-hilite-015.jpg`<br>Tag: `dich-vu:balayage-highlight,ky-thuat:balayage-correction,level:2-7` |

### 5.6. Phục hồi tóc hư tổn
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-REPAIR-001 | Tóc tẩy xốp, kéo giãn như kẹo | Tóc nhũn khi ướt<br>Lịch sử: Tẩy nhiều lần<br>Level: 8-10 | Ngưng gãy, phục hồi cảm giác | Không thể phục hồi 100% phần chết | Ngưng hóa chất, bond repair, cắt phần mất đàn hồi<br>Kỹ thuật: Bond repair + cut | Time: 45 phút-3 giờ / liệu trình<br>Khó: Nâng cao<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-001.jpg / after-tvl-repair-001.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:toc-nhun-khi-uot,rui-ro:khong-the-phuc-hoi-100-phan-chet` |
| TVL-REPAIR-002 | Tóc khô chẻ ngọn nặng | Ngọn xơ, chẻ<br>Lịch sử: Nhiệt/nhuộm<br>Level: Mọi level | Mượt, giảm chẻ | Chẻ ngọn không dán vĩnh viễn | Cắt tỉa + treatment ẩm/protein cân bằng<br>Kỹ thuật: Trim + moisture/protein | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-002.jpg / after-tvl-repair-002.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:ngon-xo-che,rui-ro:che-ngon-khong-dan-vinh-vien` |
| TVL-REPAIR-003 | Đứt sau duỗi/ép | Gãy ngang, tóc thẳng đơ<br>Lịch sử: Duỗi/ép hóa chất<br>Level: 3-8 | Giảm gãy | Hóa chất tiếp làm đứt thêm | Phục hồi, cắt định hình, không tẩy/nhuộm mạnh<br>Kỹ thuật: Repair after straightening | Time: 45 phút-3 giờ / liệu trình<br>Khó: Nâng cao<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-003.jpg / after-tvl-repair-003.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:gay-ngang-toc-thang-o,rui-ro:hoa-chat-tiep-lam-ut-them` |
| TVL-REPAIR-004 | Tóc giòn sau uốn | Sợi khô, xoăn rối<br>Lịch sử: Uốn lạnh/nóng<br>Level: 3-8 | Mềm, giữ form | Lạm dụng protein làm cứng | Cân bằng ẩm-protein, styling curl care<br>Kỹ thuật: Curl repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-004.jpg / after-tvl-repair-004.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:soi-kho-xoan-roi,rui-ro:lam-dung-protein-lam-cung` |
| TVL-REPAIR-005 | Tóc high porosity phai màu nhanh | Hút nước nhanh, khô<br>Lịch sử: Tẩy/nhuộm<br>Level: 6-10 | Màu bền hơn | Toner bám đậm rồi phai | Porosity equalizer, gloss acid, chăm sóc tại nhà<br>Kỹ thuật: Porosity repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Nâng cao<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-005.jpg / after-tvl-repair-005.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:hut-nuoc-nhanh-kho,rui-ro:toner-bam-am-roi-phai` |
| TVL-REPAIR-006 | Tóc low porosity nặng bết | Sợi cứng, lâu thấm<br>Lịch sử: Ít hóa chất, nhiều sản phẩm<br>Level: 1-5 | Nhẹ, thấm dưỡng | Dưỡng nặng càng bết | Clarify, treatment nhẹ, hơi ấm<br>Kỹ thuật: Clarify + light hydration | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-006.jpg / after-tvl-repair-006.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:soi-cung-lau-tham,rui-ro:duong-nang-cang-bet` |
| TVL-REPAIR-007 | Tóc frizz do độ ẩm | Xù, mất bóng<br>Lịch sử: Nhiệt/môi trường<br>Level: 3-8 | Giảm xù | Keratin sai làm bết/hư | Cắt shape + treatment/keratin nhẹ nếu phù hợp<br>Kỹ thuật: Anti-frizz care | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-007.jpg / after-tvl-repair-007.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:xu-mat-bong,rui-ro:keratin-sai-lam-bet-hu` |
| TVL-REPAIR-008 | Rụng sau sinh/stress cần tư vấn | Rụng nhiều toàn đầu<br>Lịch sử: Sau sinh/stress<br>Level: Mọi level | Giảm lo lắng, chăm sóc đúng | Salon không chẩn đoán bệnh | Tư vấn nhẹ, chăm sóc da đầu, giới thiệu bác sĩ nếu nặng<br>Kỹ thuật: Scalp/hair fall consult | Time: 45 phút-3 giờ / liệu trình<br>Khó: Nâng cao<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-008.jpg / after-tvl-repair-008.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:rung-nhieu-toan-au,rui-ro:salon-khong-chan-oan-benh` |
| TVL-REPAIR-009 | Tóc cháy nhiệt máy kẹp | Đoạn tóc khô cứng<br>Lịch sử: Nhiệt cao thường xuyên<br>Level: 3-8 | Giảm khô, dễ chải | Phần cháy không hồi phục hoàn toàn | Cắt phần hư, heat protect, treatment<br>Kỹ thuật: Heat damage repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-009.jpg / after-tvl-repair-009.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:oan-toc-kho-cung,rui-ro:phan-chay-khong-hoi-phuc-hoan-toan` |
| TVL-REPAIR-010 | Tóc hư do nắng/hồ bơi | Khô, đổi màu, rít<br>Lịch sử: Nắng/chlorine<br>Level: 5-10 | Bóng, ít rít | Tẩy thêm làm hư | Chelating/clarify nhẹ, dưỡng ẩm, gloss<br>Kỹ thuật: Mineral/chlorine care | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-010.jpg / after-tvl-repair-010.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:kho-oi-mau-rit,rui-ro:tay-them-lam-hu` |
| TVL-REPAIR-011 | Tóc hư sau nhuộm lặp lại | Thân/ngọn khô, màu bệt<br>Lịch sử: Nhuộm chồng nhiều lần<br>Level: 3-8 | Mềm, màu trong hơn | Gỡ màu gây khô | Làm sạch build-up nhẹ + phục hồi + refresh<br>Kỹ thuật: Build-up cleanse + repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-011.jpg / after-tvl-repair-011.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:than-ngon-kho-mau-bet,rui-ro:go-mau-gay-kho` |
| TVL-REPAIR-012 | Ngọn tóc trong suốt/mỏng | Ngọn mỏng, thiếu mật độ<br>Lịch sử: Tẩy/nhiệt/cắt tỉa nhiều<br>Level: 6-10 | Trông dày khỏe hơn | Không thể làm dày sợi chết | Cắt blunt/soft layer, treatment bề mặt<br>Kỹ thuật: Density visual repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-012.jpg / after-tvl-repair-012.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:ngon-mong-thieu-mat-o,rui-ro:khong-the-lam-day-soi-chet` |
| TVL-REPAIR-013 | Da đầu dầu, ngọn khô | Bết chân, xơ ngọn<br>Lịch sử: Gội/nhuộm/nhiệt<br>Level: 3-8 | Cân bằng | Dưỡng sai vùng làm bết | Routine tách da đầu và ngọn<br>Kỹ thuật: Scalp-oil/ends-dry plan | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-013.jpg / after-tvl-repair-013.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:bet-chan-xo-ngon,rui-ro:duong-sai-vung-lam-bet` |
| TVL-REPAIR-014 | Protein overload tóc cứng | Tóc cứng, dễ gãy<br>Lịch sử: Dùng phục hồi protein nhiều<br>Level: Mọi level | Mềm lại | Thêm protein càng giòn | Tạm dừng protein, tăng ẩm/lipid<br>Kỹ thuật: Moisture reset | Time: 45 phút-3 giờ / liệu trình<br>Khó: Trung cấp<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-014.jpg / after-tvl-repair-014.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:toc-cung-de-gay,rui-ro:them-protein-cang-gion` |
| TVL-REPAIR-015 | Phục hồi chuẩn bị trước nhuộm/tẩy | Tóc hơi khô/yếu<br>Lịch sử: Có lịch màu sắp tới<br>Level: 3-8 | Tóc đủ sức làm màu | Bỏ qua test gây hư | Bond repair trước 1-2 tuần, test lọn<br>Kỹ thuật: Pre-service repair | Time: 45 phút-3 giờ / liệu trình<br>Khó: Nâng cao<br>Test: Có nếu định làm hóa chất sau đó<br>Từ chối: Có nếu tóc mất đàn hồi nặng và khách vẫn đòi tẩy/uốn/duỗi | Nói rõ phục hồi là cải thiện cảm giác và giảm rủi ro, không hồi sinh tóc đã chết.<br>Ảnh: `before-tvl-repair-015.jpg / after-tvl-repair-015.jpg`<br>Tag: `dich-vu:phuc-hoi,tinh-trang:toc-hoi-kho-yeu,rui-ro:bo-qua-test-gay-hu` |

### 5.7. Uốn / duỗi / ép / keratin
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-TEXTURE-001 | Uốn lạnh tóc tự nhiên khỏe | Tóc tự nhiên, sợi trung bình<br>Lịch sử: Ít hóa chất<br>Level: 2-5 | Sóng mềm | Không ra form nếu chọn trục sai | Test đàn hồi, chọn thuốc/trục theo chất tóc<br>Kỹ thuật: Cold perm | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-001.jpg / after-tvl-texture-001.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:cold-perm,rui-ro:khong-ra-form-neu-chon-truc-sai` |
| TVL-TEXTURE-002 | Uốn nóng tóc dày/sợi to | Tóc dày, khó vào nếp<br>Lịch sử: Có/không nhuộm<br>Level: 2-5 | Lọn bền | Khô ngọn, lọn cứng | Cắt layer phù hợp, canh nhiệt/thuốc<br>Kỹ thuật: Digital perm | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-002.jpg / after-tvl-texture-002.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:digital-perm,rui-ro:kho-ngon` |
| TVL-TEXTURE-003 | Uốn trên tóc nhuộm | Tóc màu level 4-7<br>Lịch sử: Nhuộm trước đó<br>Level: 4-7 | Sóng tự nhiên | Màu phai, tóc khô | Test lọn, dùng thuốc nhẹ, phục hồi kèm<br>Kỹ thuật: Perm colored hair | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-003.jpg / after-tvl-texture-003.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:perm-colored-hair,rui-ro:mau-phai` |
| TVL-TEXTURE-004 | Uốn trên tóc tẩy | Tóc tẩy/xốp<br>Lịch sử: Tẩy/highlight<br>Level: 7-10 | Uốn lọn | Đứt/mất đàn hồi rất cao | Thường từ chối; chỉ xử lý nếu test đạt và khách ký rủi ro<br>Kỹ thuật: High-risk perm | Time: 2-5 giờ<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-004.jpg / after-tvl-texture-004.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:high-risk-perm,rui-ro:ut-mat-an-hoi-rat-cao` |
| TVL-TEXTURE-005 | Uốn phồng chân | Tóc xẹp chân<br>Lịch sử: Ít hóa chất<br>Level: 2-6 | Phồng tự nhiên | Gãy chân, mất volume không đều | Chọn vùng, thời gian ngắn, không làm trên chân yếu<br>Kỹ thuật: Root perm | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-005.jpg / after-tvl-texture-005.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:root-perm,rui-ro:gay-chan` |
| TVL-TEXTURE-006 | Uốn texture nam | Tóc nam thẳng/cứng<br>Lịch sử: Ít hóa chất<br>Level: 2-5 | Texture dễ vuốt | Xù quá mức | Trục nhỏ-vừa, kiểm soát hướng lọn<br>Kỹ thuật: Men texture perm | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-006.jpg / after-tvl-texture-006.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:men-texture-perm,rui-ro:xu-qua-muc` |
| TVL-TEXTURE-007 | Duỗi tóc tự nhiên xù | Tóc xoăn/xù tự nhiên<br>Lịch sử: Chưa tẩy<br>Level: 2-5 | Thẳng mượt | Thẳng đơ, mất volume | Chẩn đoán độ xoăn, chọn thuốc và nhiệt hợp lý<br>Kỹ thuật: Straightening | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-007.jpg / after-tvl-texture-007.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:straightening,rui-ro:thang-o` |
| TVL-TEXTURE-008 | Duỗi trên tóc tẩy/highlight | Tóc sáng/xốp<br>Lịch sử: Tẩy/highlight<br>Level: 7-10 | Giảm xù | Đứt nặng | Không duỗi thẳng mạnh; chọn treatment/keratin nhẹ nếu phù hợp<br>Kỹ thuật: High-risk smoothing | Time: 2-5 giờ<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-008.jpg / after-tvl-texture-008.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:high-risk-smoothing,rui-ro:ut-nang` |
| TVL-TEXTURE-009 | Keratin tóc nhuộm xù | Tóc nhuộm khô/xù<br>Lịch sử: Nhuộm level 4-7<br>Level: 4-7 | Mượt, giảm frizz | Phai màu, khói hóa chất/nhiệt | Kiểm tra thành phần, thông gió, nhiệt phù hợp<br>Kỹ thuật: Keratin smoothing | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-009.jpg / after-tvl-texture-009.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:keratin-smoothing,rui-ro:phai-mau` |
| TVL-TEXTURE-010 | Keratin sau tẩy dưới 4 tuần | Tóc mới tẩy<br>Lịch sử: Tẩy gần đây<br>Level: 8-10 | Mượt nhanh | Tóc yếu, nhiệt làm gãy | Trì hoãn, phục hồi trước, test lọn<br>Kỹ thuật: Delay keratin | Time: 2-5 giờ<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-010.jpg / after-tvl-texture-010.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:delay-keratin,rui-ro:toc-yeu` |
| TVL-TEXTURE-011 | Tóc duỗi quá thẳng muốn mềm lại | Tóc xẹp, thiếu chuyển động<br>Lịch sử: Duỗi/ép cũ<br>Level: 3-7 | Có độ phồng | Uốn lại gây hư | Cắt layer, styling, phục hồi; không hóa chất mạnh sớm<br>Kỹ thuật: Shape correction | Time: 2-5 giờ<br>Khó: Trung cấp<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-011.jpg / after-tvl-texture-011.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:shape-correction,rui-ro:uon-lai-gay-hu` |
| TVL-TEXTURE-012 | Dặm chân duỗi bị overlap | Chân xoăn, thân đã duỗi<br>Lịch sử: Duỗi định kỳ<br>Level: 2-6 | Chân thẳng khớp thân | Overlap gãy ngang | Chỉ chấm chân mọc mới, bảo vệ thân<br>Kỹ thuật: Straightening retouch | Time: 2-5 giờ<br>Khó: Rủi ro cao<br>Test: Có<br>Từ chối: Có nếu tóc tẩy yếu, da đầu tổn thương, lịch sử hóa chất không rõ | Luôn hỏi lịch sử hóa chất 12 tháng và test đàn hồi trước khi nhận.<br>Ảnh: `before-tvl-texture-012.jpg / after-tvl-texture-012.jpg`<br>Tag: `dich-vu:uon-duoi-keratin,ky-thuat:straightening-retouch,rui-ro:overlap-gay-ngang` |

### 5.8. Cắt tạo kiểu
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-CUT-001 | Layer dài cho mặt tròn | Tóc dài, nặng mặt<br>Lịch sử: Không liên quan<br>Level: Mọi level | Mặt thon, tóc nhẹ | Layer quá cao làm phồng ngang | Layer thấp-vừa, curtain frame<br>Kỹ thuật: Long layer | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-001.jpg / after-tvl-cut-001.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:long-layer,doi-tuong:toc-dai-nang-mat` |
| TVL-CUT-002 | Bob cho tóc mỏng | Tóc mảnh, ít mật độ<br>Lịch sử: Có thể nhuộm<br>Level: Mọi level | Dày hơn trực quan | Tỉa nhiều làm mỏng | Bob/blunt bob, ít layer<br>Kỹ thuật: Blunt bob | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-002.jpg / after-tvl-cut-002.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:blunt-bob,doi-tuong:toc-manh-it-mat-o` |
| TVL-CUT-003 | Lob cho tóc dày | Tóc dày, nặng<br>Lịch sử: Có/không hóa chất<br>Level: Mọi level | Gọn, sang | Tỉa rỗng quá xù | Lob + internal layer kiểm soát<br>Kỹ thuật: Lob cut | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-003.jpg / after-tvl-cut-003.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:lob-cut,doi-tuong:toc-day-nang` |
| TVL-CUT-004 | Mái bay/cửa rèm | Tóc dài/medium<br>Lịch sử: Có thể uốn/nhuộm<br>Level: Mọi level | Mềm mặt | Mái quá ngắn khó sửa | Cắt khô kiểm tra rơi tóc<br>Kỹ thuật: Curtain bangs | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-004.jpg / after-tvl-cut-004.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:curtain-bangs,doi-tuong:toc-dai-medium` |
| TVL-CUT-005 | Cắt sửa tóc đứt sau tẩy | Tóc gãy không đều<br>Lịch sử: Tẩy hư<br>Level: 8-10 | Form gọn, đỡ xơ | Khách tiếc độ dài | Cắt chiến lược giữ tối đa độ dài<br>Kỹ thuật: Repair haircut | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-005.jpg / after-tvl-cut-005.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:repair-haircut,doi-tuong:toc-gay-khong-eu` |
| TVL-CUT-006 | Fade nam chuyên nghiệp | Tóc nam dày/cứng<br>Lịch sử: Không liên quan<br>Level: Mọi level | Gọn, sắc | Fade lỗi line | Chọn low/mid/high fade theo đầu<br>Kỹ thuật: Men fade | Time: 30-90 phút<br>Khó: Cơ bản<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-006.jpg / after-tvl-cut-006.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:men-fade,doi-tuong:toc-nam-day-cung` |
| TVL-CUT-007 | Textured crop nam | Tóc nam cứng/thẳng<br>Lịch sử: Không liên quan<br>Level: Mọi level | Dễ vuốt | Tỉa quá mỏng dựng xù | Point cut/texture phù hợp<br>Kỹ thuật: Textured crop | Time: 30-90 phút<br>Khó: Cơ bản<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-007.jpg / after-tvl-cut-007.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:textured-crop,doi-tuong:toc-nam-cung-thang` |
| TVL-CUT-008 | Cắt tóc trẻ em khó ngồi yên | Tóc trẻ em<br>Lịch sử: Không hóa chất<br>Level: Mọi level | Gọn an toàn | Bé sợ/kéo nguy hiểm | Cắt nhanh, dụng cụ an toàn, cha mẹ hỗ trợ<br>Kỹ thuật: Kids cut | Time: 30-90 phút<br>Khó: Cơ bản<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-008.jpg / after-tvl-cut-008.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:kids-cut,doi-tuong:toc-tre-em` |
| TVL-CUT-009 | Cắt tóc xoăn tự nhiên | Tóc xoăn, co rút<br>Lịch sử: Có/không màu<br>Level: Mọi level | Form xoăn đẹp | Cắt ướt quá ngắn khi khô | Dry/curly cut theo curl pattern<br>Kỹ thuật: Curly cut | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-009.jpg / after-tvl-cut-009.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:curly-cut,doi-tuong:toc-xoan-co-rut` |
| TVL-CUT-010 | Cắt cho khách trung niên cần phồng | Tóc yếu/mỏng dần<br>Lịch sử: Nhuộm/phủ bạc<br>Level: Mọi level | Trẻ, có volume | Layer sai làm lộ mỏng | Soft layer + styling volume<br>Kỹ thuật: Mature volume cut | Time: 30-90 phút<br>Khó: Trung cấp<br>Test: Không<br>Từ chối: Không, trừ da đầu có vết thương/khách không hợp tác an toàn | Tư vấn bằng ảnh thật, nói rõ cần styling hằng ngày hay không.<br>Ảnh: `before-tvl-cut-010.jpg / after-tvl-cut-010.jpg`<br>Tag: `dich-vu:cat-tao-kieu,ky-thuat:mature-volume-cut,doi-tuong:toc-yeu-mong-dan` |

### 5.9. Chăm sóc da đầu / tóc yếu / tóc mỏng
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-SCALP-001 | Da đầu dầu có vảy | Bết nhanh, vảy trắng/vàng<br>Lịch sử: Gội sai/sản phẩm nặng<br>Level: Không áp dụng | Sạch, giảm bết | Nhầm gàu bệnh lý | Phân biệt dầu/vảy, làm sạch nhẹ, routine phù hợp<br>Kỹ thuật: Scalp cleansing | Time: 20-90 phút / liệu trình<br>Khó: Cơ bản<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-001.jpg / after-tvl-scalp-001.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:bet-nhanh-vay-trang-vang,rui-ro:nham-gau-benh-ly` |
| TVL-SCALP-002 | Da đầu khô bong vảy | Căng, ngứa nhẹ<br>Lịch sử: Gội mạnh/nước nóng<br>Level: Không áp dụng | Giảm khô | Dùng treatment dầu làm bết | Dưỡng da đầu nhẹ, tránh tẩy/rát<br>Kỹ thuật: Dry scalp care | Time: 20-90 phút / liệu trình<br>Khó: Cơ bản<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-002.jpg / after-tvl-scalp-002.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:cang-ngua-nhe,rui-ro:dung-treatment-dau-lam-bet` |
| TVL-SCALP-003 | Gàu nghi ngờ | Vảy nhiều, ngứa<br>Lịch sử: Tái phát<br>Level: Không áp dụng | Kiểm soát | Salon không chẩn đoán bệnh | Tư vấn chăm sóc, nếu nặng giới thiệu da liễu<br>Kỹ thuật: Dandruff consult | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-003.jpg / after-tvl-scalp-003.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:vay-nhieu-ngua,rui-ro:salon-khong-chan-oan-benh` |
| TVL-SCALP-004 | Viêm da tiết bã nghi ngờ | Đỏ, vảy dầu, ngứa<br>Lịch sử: Tái phát lâu<br>Level: Không áp dụng | An toàn | Làm hóa chất khiến nặng | Từ chối hóa chất, khuyên khám chuyên khoa<br>Kỹ thuật: Refer dermatologist | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-004.jpg / after-tvl-scalp-004.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:o-vay-dau-ngua,rui-ro:lam-hoa-chat-khien-nang` |
| TVL-SCALP-005 | Ngứa sau nhuộm | Rát/ngứa sau màu<br>Lịch sử: Mới nhuộm hoặc tiền sử kích ứng<br>Level: Không áp dụng | Xử lý an toàn | Dị ứng nghiêm trọng | Ngưng hóa chất, rửa sạch, khuyên y tế nếu sưng/rát<br>Kỹ thuật: Post-color irritation | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-005.jpg / after-tvl-scalp-005.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:rat-ngua-sau-mau,rui-ro:di-ung-nghiem-trong` |
| TVL-SCALP-006 | Tóc thưa đường ngôi | Đường ngôi rộng<br>Lịch sử: Rụng từ từ<br>Level: Không áp dụng | Che thưa, theo dõi | Dấu hiệu bệnh lý | Tư vấn kiểu cắt/volume, giới thiệu chuyên khoa nếu tiến triển<br>Kỹ thuật: Thinning consult | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-006.jpg / after-tvl-scalp-006.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:uong-ngoi-rong,rui-ro:dau-hieu-benh-ly` |
| TVL-SCALP-007 | Rụng tóc nam kiểu hói | Thưa trán/đỉnh<br>Lịch sử: Gia đình có tiền sử<br>Level: Không áp dụng | Tạo kiểu phù hợp | Cam kết mọc tóc sai | Cắt/tạo kiểu che, giới thiệu bác sĩ nếu muốn điều trị<br>Kỹ thuật: Male hair loss consult | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-007.jpg / after-tvl-scalp-007.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:thua-tran-inh,rui-ro:cam-ket-moc-toc-sai` |
| TVL-SCALP-008 | Rụng telogen sau stress/sốt/sinh | Rụng lan tỏa<br>Lịch sử: 3-4 tháng sau stress/sinh<br>Level: Không áp dụng | Giảm lo lắng | Bỏ qua bệnh nền | Hỏi thời gian, khuyên khám nếu rụng nặng/kéo dài<br>Kỹ thuật: Shedding consult | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-008.jpg / after-tvl-scalp-008.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:rung-lan-toa,rui-ro:bo-qua-benh-nen` |
| TVL-SCALP-009 | Tóc mảnh xẹp | Tóc mềm, thiếu volume<br>Lịch sử: Có thể dầu<br>Level: Mọi level | Phồng nhẹ | Dưỡng nặng làm xẹp | Cắt + sản phẩm nhẹ + sấy chân<br>Kỹ thuật: Fine hair volume | Time: 20-90 phút / liệu trình<br>Khó: Cơ bản<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-009.jpg / after-tvl-scalp-009.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:toc-mem-thieu-volume,rui-ro:duong-nang-lam-xep` |
| TVL-SCALP-010 | Chân dầu ngọn khô | Bết chân, khô đuôi<br>Lịch sử: Nhuộm/nhiệt<br>Level: 3-8 | Cân bằng | Dùng dầu sai vùng | Routine 2 vùng: da đầu và thân/ngọn<br>Kỹ thuật: Combination hair care | Time: 20-90 phút / liệu trình<br>Khó: Cơ bản<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-010.jpg / after-tvl-scalp-010.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:bet-chan-kho-uoi,rui-ro:dung-dau-sai-vung` |
| TVL-SCALP-011 | Da đầu nhạy trước dịch vụ hóa chất | Dễ đỏ/rát<br>Lịch sử: Từng kích ứng<br>Level: Không áp dụng | Dịch vụ an toàn | Dị ứng, bỏng rát | Patch test, tránh dịch vụ nếu có vết thương<br>Kỹ thuật: Sensitive scalp protocol | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-011.jpg / after-tvl-scalp-011.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:de-o-rat,rui-ro:di-ung` |
| TVL-SCALP-012 | Da đầu có mụn/vết thương | Mụn, trầy, đau<br>Lịch sử: Gãi/viêm<br>Level: Không áp dụng | An toàn | Nhiễm trùng/kích ứng | Từ chối hóa chất/cắt nếu chảy dịch, khuyên khám<br>Kỹ thuật: Open scalp refer | Time: 20-90 phút / liệu trình<br>Khó: Trung cấp<br>Test: Không, trừ hóa chất đi kèm<br>Từ chối: Có nếu đỏ, viêm, vết thương, rụng đột ngột nặng | Không chẩn đoán bệnh; chỉ tư vấn chăm sóc salon và khuyến nghị chuyên khoa khi có dấu hiệu đỏ.<br>Ảnh: `before-tvl-scalp-012.jpg / after-tvl-scalp-012.jpg`<br>Tag: `dich-vu:da-dau-toc-yeu,tinh-trang:mun-tray-au,rui-ro:nhiem-trung-kich-ung` |

### 5.10. Tư vấn khách hàng / chăm sóc sau dịch vụ / lỗi kỹ thuật salon
| Mã case | Tên case | Before / lịch sử / level | Mục tiêu | Rủi ro | Xử lý / kỹ thuật | Vận hành | Tư vấn / ảnh / tag |
|---|---|---|---|---|---|---|---|
| TVL-CONSULT-001 | Khách đưa ảnh mẫu đã chỉnh filter | Ảnh mẫu quá sáng/mịn<br>Lịch sử: Không rõ<br>Level: Tùy nền | Giống ảnh | Kỳ vọng sai | Phân tích level/ánh/tóc thật, đề xuất phiên bản khả thi<br>Kỹ thuật: Expectation mapping | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-001.jpg / after-tvl-consult-001.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:expectation-mapping,rui-ro:ky-vong-sai` |
| TVL-CONSULT-002 | Khách không nhớ lịch sử hóa chất | Tóc nhiều vùng lạ<br>Lịch sử: Không rõ<br>Level: 1-10 | Dịch vụ an toàn | Phản ứng bất ngờ | Bảng hỏi + test lọn + xử lý bảo thủ<br>Kỹ thuật: Unknown history protocol | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-002.jpg / after-tvl-consult-002.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:unknown-history-protocol,rui-ro:phan-ung-bat-ngo` |
| TVL-CONSULT-003 | Khách từ chối test lọn | Muốn làm ngay<br>Lịch sử: Có hóa chất cũ<br>Level: Tùy | Làm nhanh | Rủi ro pháp lý/kỹ thuật | Giải thích bắt buộc; không nhận case rủi ro nếu không test<br>Kỹ thuật: Mandatory strand test | Time: 10-60 phút / tùy dịch vụ<br>Khó: Rủi ro cao<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-003.jpg / after-tvl-consult-003.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:mandatory-strand-test,rui-ro:rui-ro-phap-ly-ky-thuat` |
| TVL-CONSULT-004 | Khách muốn đổi màu sát ngày cưới/sự kiện | Tóc cần sửa lớn<br>Lịch sử: Tùy<br>Level: Tùy | Đẹp ngay | Không kịp sửa lỗi | Chọn phương án an toàn, không làm thay đổi cực đoan<br>Kỹ thuật: Event-safe plan | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-004.jpg / after-tvl-consult-004.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:event-safe-plan,rui-ro:khong-kip-sua-loi` |
| TVL-CONSULT-005 | Khách hạn chế ngân sách nhưng muốn màu phức tạp | Nền tối/màu cũ<br>Lịch sử: Tùy<br>Level: 1-6 | Balayage/blonde | Cắt bước làm gây lỗi | Tách gói: hôm nay an toàn, lộ trình sau<br>Kỹ thuật: Budget staging | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-005.jpg / after-tvl-consult-005.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:budget-staging,rui-ro:cat-buoc-lam-gay-loi` |
| TVL-CONSULT-006 | Khách muốn uốn và tẩy cùng ngày | Tóc cần hai hóa chất mạnh<br>Lịch sử: Tùy<br>Level: 2-8 | Vừa uốn vừa sáng | Đứt tóc | Từ chối combo cùng ngày; ưu tiên dịch vụ chính<br>Kỹ thuật: Chemical scheduling | Time: 10-60 phút / tùy dịch vụ<br>Khó: Rủi ro cao<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-006.jpg / after-tvl-consult-006.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:chemical-scheduling,rui-ro:ut-toc` |
| TVL-CONSULT-007 | Sau nhuộm gội quá sớm | Màu phai nhanh<br>Lịch sử: Mới nhuộm<br>Level: Tùy | Giữ màu | Phai/loang | Hướng dẫn 48h đầu, nước mát, dầu gội phù hợp<br>Kỹ thuật: Color aftercare | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-007.jpg / after-tvl-consult-007.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:color-aftercare,rui-ro:phai-loang` |
| TVL-CONSULT-008 | Sau tẩy dùng dầu gội tím quá mức | Tóc tím/xám khô<br>Lịch sử: Tẩy/blonde<br>Level: 8-10 | Blonde sạch | Xỉn màu, khô | Giảm tần suất, dùng mask ẩm, gloss nếu cần<br>Kỹ thuật: Purple shampoo control | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-008.jpg / after-tvl-consult-008.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:purple-shampoo-control,rui-ro:xin-mau` |
| TVL-CONSULT-009 | Sau keratin dùng dầu gội sulfate/salt | Mượt giảm nhanh<br>Lịch sử: Keratin mới<br>Level: Tùy | Giữ hiệu quả | Bay keratin sớm | Hướng dẫn sản phẩm phù hợp và lịch gội<br>Kỹ thuật: Keratin aftercare | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-009.jpg / after-tvl-consult-009.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:keratin-aftercare,rui-ro:bay-keratin-som` |
| TVL-CONSULT-010 | Đi bơi sau màu/tẩy | Màu đổi/xanh/khô<br>Lịch sử: Màu sáng<br>Level: 7-10 | Bảo vệ màu | Chlorine/mineral stain | Khuyên bảo vệ trước bơi, clarify nhẹ sau<br>Kỹ thuật: Pool aftercare | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-010.jpg / after-tvl-consult-010.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:pool-aftercare,rui-ro:chlorine-mineral-stain` |
| TVL-CONSULT-011 | Không đặt lịch bảo dưỡng toner | Màu lạnh phai vàng<br>Lịch sử: Blonde/ash<br>Level: 7-10 | Màu duy trì | Khách nghĩ màu lỗi | Hẹn gloss 4-8 tuần tùy tóc<br>Kỹ thuật: Maintenance booking | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-011.jpg / after-tvl-consult-011.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:maintenance-booking,rui-ro:khach-nghi-mau-loi` |
| TVL-CONSULT-012 | Salon bôi tẩy chồng lên tóc sáng | Đoạn overlap yếu<br>Lịch sử: Tẩy retouch<br>Level: 8-10 | Chân sáng | Đứt band | Quy trình chống overlap, bảo vệ lengths<br>Kỹ thuật: No-overlap protocol | Time: 10-60 phút / tùy dịch vụ<br>Khó: Rủi ro cao<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-012.jpg / after-tvl-consult-012.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:no-overlap-protocol,rui-ro:ut-band` |
| TVL-CONSULT-013 | Salon thiếu saturation khi tẩy | Mảng tối/sáng<br>Lịch sử: Tẩy mới<br>Level: 4-9 | Nền đều | Loang màu | Section mỏng, đủ thuốc, kiểm tra giữa thời gian<br>Kỹ thuật: Saturation control | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-013.jpg / after-tvl-consult-013.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:saturation-control,rui-ro:loang-mau` |
| TVL-CONSULT-014 | Salon chọn developer quá mạnh | Tóc khô, chân nóng<br>Lịch sử: Nhuộm/tẩy<br>Level: Tùy | Màu đúng | Bỏng/đứt/hot root | Chọn developer theo nền/mục tiêu, không mặc định mạnh<br>Kỹ thuật: Developer selection | Time: 10-60 phút / tùy dịch vụ<br>Khó: Rủi ro cao<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-014.jpg / after-tvl-consult-014.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:developer-selection,rui-ro:bong-ut-hot-root` |
| TVL-CONSULT-015 | Salon không ghi hồ sơ công thức | Khó lặp màu<br>Lịch sử: Khách quay lại<br>Level: Tùy | Duy trì màu | Sai màu mỗi lần | Lưu công thức, ảnh before/after, thời gian xử lý<br>Kỹ thuật: Client record | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-015.jpg / after-tvl-consult-015.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:client-record,rui-ro:sai-mau-moi-lan` |
| TVL-CONSULT-016 | Khách chăm sóc tại nhà sai routine | Màu/tóc xuống nhanh<br>Lịch sử: Sau dịch vụ<br>Level: Tùy | Duy trì kết quả | Đổ lỗi salon | Checklist aftercare rõ ràng, sản phẩm theo tóc<br>Kỹ thuật: Homecare checklist | Time: 10-60 phút / tùy dịch vụ<br>Khó: Trung cấp<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-016.jpg / after-tvl-consult-016.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:homecare-checklist,rui-ro:o-loi-salon` |
| TVL-CONSULT-017 | Khách dị ứng màu trước đây | Tiền sử sưng/ngứa<br>Lịch sử: Từng dị ứng<br>Level: Tùy | Muốn nhuộm | Dị ứng nghiêm trọng | Không nhuộm nếu có tiền sử phản ứng mạnh; khuyên y tế<br>Kỹ thuật: Allergy refusal | Time: 10-60 phút / tùy dịch vụ<br>Khó: Rủi ro cao<br>Test: Có nếu đi kèm hóa chất<br>Từ chối: Có nếu khách không chấp nhận test/quy trình an toàn | Nên có checklist ký xác nhận kỳ vọng, rủi ro và hướng chăm sóc.<br>Ảnh: `before-tvl-consult-017.jpg / after-tvl-consult-017.jpg`<br>Tag: `dich-vu:tu-van-aftercare,ky-thuat:allergy-refusal,rui-ro:di-ung-nghiem-trong` |


---

## 6. 30 case quan trọng viết chi tiết

> Đây là nhóm case nên ưu tiên làm nội dung trước vì: nhu cầu cao, dễ phát sinh lỗi salon, dễ kéo traffic tìm kiếm, và phù hợp để phân cấp miễn phí/Pro.

### 1. TVL-COLOR-001 — Nâu lạnh cho nền đen Việt Nam không bị đỏ cam

- **Tiêu đề case dùng trên web:** Nâu lạnh cho nền đen Việt Nam không bị đỏ cam
- **Mô tả ngắn 1 câu:** Từ nền đen tự nhiên, mục tiêu là nâu lạnh thực tế ở cấp 5-6, không ép sáng quá mức.
- **Tình trạng before:** Tóc đen tự nhiên level 1-3, sợi khỏe, chưa có hóa chất nặng.
- **Kết quả after:** Nâu lạnh mềm, ít đỏ dưới ánh nắng, bề mặt bóng.
- **Phân tích kỹ thuật:** Tóc Việt Nam nền tối thường lộ đỏ/cam khi nâng; cần chọn mục tiêu trong giới hạn level 5-6 hoặc nâng nền trước nếu khách muốn sáng hơn.
- **Rủi ro:** Dễ bị cam, màu lạnh bị xỉn nếu dùng ash quá nhiều.
- **Hướng tư vấn khách:** Cho khách xem bảng level thật; nói rõ nâu lạnh không đồng nghĩa xám khói.
- **Tag:** `dich-vu:nhuom,level:1-3,muc-tieu:nau-lanh-cap-5-6,rui-ro:lo-o-cam`
- **Gợi ý tên file ảnh before:** `before-tvl-color-001.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-001.jpg`

### 2. TVL-COLOR-002 — Beige ash từ nền đen: case phải tư vấn theo buổi

- **Tiêu đề case dùng trên web:** Beige ash từ nền đen: case phải tư vấn theo buổi
- **Mô tả ngắn 1 câu:** Beige ash cần nền đủ sáng; không nên hứa chỉ nhuộm một lần trên nền đen.
- **Tình trạng before:** Tóc level 2-3, khỏe, đen tự nhiên hoặc màu cũ nhẹ.
- **Kết quả after:** Beige ash level 7-8, ánh mềm, không cam quá rõ.
- **Phân tích kỹ thuật:** Cần nâng nền có kiểm soát trước khi toner; nếu không đạt level, chọn nâu beige thay vì ash sáng.
- **Rủi ro:** Cam, khô, không đạt ảnh mẫu, phải nhiều giờ.
- **Hướng tư vấn khách:** Chia lộ trình 1-2 buổi và thống nhất phiên bản an toàn trước.
- **Tag:** `dich-vu:nhuom,level:2-3,muc-tieu:beige-ash-level-7-8,rui-ro:khong-at-beige-neu-chi-nhuom-de-cam`
- **Gợi ý tên file ảnh before:** `before-tvl-color-002.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-002.jpg`

### 3. TVL-COLOR-005 — Nền vàng cam level 7 lên màu trà sữa

- **Tiêu đề case dùng trên web:** Nền vàng cam level 7 lên màu trà sữa
- **Mô tả ngắn 1 câu:** Case phổ biến: nền chưa sạch nhưng khách muốn trà sữa/beige.
- **Tình trạng before:** Nền 7 vàng cam, có vùng đậm nhạt.
- **Kết quả after:** Beige/milk tea trong hơn, giảm vàng cam.
- **Phân tích kỹ thuật:** Cần làm đều nền trước; toner beige-violet nhẹ tránh bệt xám.
- **Rủi ro:** Toner lên đục hoặc lộ cam nếu nền chưa đủ.
- **Hướng tư vấn khách:** Cho khách biết trà sữa cần nền sạch; nếu tóc yếu nên chọn beige nâu.
- **Tag:** `dich-vu:nhuom,level:7,muc-tieu:milk-tea-beige,rui-ro:toner-len-uc`
- **Gợi ý tên file ảnh before:** `before-tvl-color-005.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-005.jpg`

### 4. TVL-COLOR-006 — Màu lạnh bị xỉn: làm trong lại màu không phá tóc

- **Tiêu đề case dùng trên web:** Màu lạnh bị xỉn: làm trong lại màu không phá tóc
- **Mô tả ngắn 1 câu:** Tóc bị tối bẩn sau khi dập cam/toner ash quá mạnh.
- **Tình trạng before:** Nâu lạnh/xám bị bệt, thiếu độ trong.
- **Kết quả after:** Màu sáng hơn nhẹ, trong và tự nhiên hơn.
- **Phân tích kỹ thuật:** Xử lý bằng làm sạch màu nhẹ, cân bằng lại ánh ấm, không tẩy mạnh toàn đầu.
- **Rủi ro:** Gỡ quá tay gây loang, ngọn xốp đậm hơn.
- **Hướng tư vấn khách:** Nói rõ mục tiêu là cải thiện độ trong, không đổi tone cực sáng ngay.
- **Tag:** `dich-vu:nhuom,level:5-7,muc-tieu:nau-trong-sang-hon,rui-ro:lam-sang-qua-manh-gay-loang`
- **Gợi ý tên file ảnh before:** `before-tvl-color-006.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-006.jpg`

### 5. TVL-COLOR-007 — Khử xanh rêu sau màu khói bị lệch

- **Tiêu đề case dùng trên web:** Khử xanh rêu sau màu khói bị lệch
- **Mô tả ngắn 1 câu:** Màu khói/ash có thể chuyển xanh rêu trên tóc xốp hoặc thiếu nền ấm.
- **Tình trạng before:** Ngọn xanh/rêu, thân có thể xám bẩn.
- **Kết quả after:** Beige/nâu lạnh sạch hơn, giảm xanh rõ.
- **Phân tích kỹ thuật:** Dùng đối màu ấm liều nhỏ; xử lý theo vùng xốp trước.
- **Rủi ro:** Bù ấm quá tay thành cam/nâu đỏ.
- **Hướng tư vấn khách:** Giải thích xanh là lỗi cân bằng sắc tố, cần sửa từ từ.
- **Tag:** `dich-vu:nhuom,level:7-9,muc-tieu:khoi-beige-hoac-nau-lanh-sach,rui-ro:bu-o-cam-qua-tay-thanh-nau-o`
- **Gợi ý tên file ảnh before:** `before-tvl-color-007.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-007.jpg`

### 6. TVL-COLOR-009 — Nhuộm đen xong muốn sáng lại

- **Tiêu đề case dùng trên web:** Nhuộm đen xong muốn sáng lại
- **Mô tả ngắn 1 câu:** Đây là case rủi ro cao vì màu đen nhân tạo rất khó nâng đều.
- **Tình trạng before:** Tóc đen nhân tạo, có thể nhuộm hộp nhiều lần.
- **Kết quả after:** Nâu sáng an toàn hoặc lộ trình sáng dần.
- **Phân tích kỹ thuật:** Cần color remover/test lọn; thường không thể lên beige/blonde sạch trong một lần.
- **Rủi ro:** Loang đỏ cam, khô, đứt nếu ép sáng.
- **Hướng tư vấn khách:** Không cam kết ảnh mẫu; ký xác nhận rủi ro nếu làm.
- **Tag:** `dich-vu:nhuom,level:1-3 nhân tạo,muc-tieu:nau-5-7,rui-ro:loang-o-cam`
- **Gợi ý tên file ảnh before:** `before-tvl-color-009.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-009.jpg`

### 7. TVL-COLOR-011 — Nhuộm không đều màu do nền nhiều lịch sử

- **Tiêu đề case dùng trên web:** Nhuộm không đều màu do nền nhiều lịch sử
- **Mô tả ngắn 1 câu:** Nền nhiều vùng khác nhau cần map trước khi đặt màu.
- **Tình trạng before:** Chân, thân, ngọn khác level; từng tự nhuộm hoặc nhiều salon.
- **Kết quả after:** Màu đồng nhất tương đối, giảm mảng loang.
- **Phân tích kỹ thuật:** Chia zone theo level/độ xốp; không dùng một công thức cho toàn đầu.
- **Rủi ro:** Mỗi vùng hút màu khác nhau, không đều tuyệt đối lần đầu.
- **Hướng tư vấn khách:** Báo rõ đây là color correction, không phải nhuộm thường.
- **Tag:** `dich-vu:nhuom,level:3-8,muc-tieu:eu-mau-nau-ash,rui-ro:moi-vung-hut-khac-nhau`
- **Gợi ý tên file ảnh before:** `before-tvl-color-011.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-011.jpg`

### 8. TVL-COLOR-014 — Ngọn xốp hút màu quá đậm

- **Tiêu đề case dùng trên web:** Ngọn xốp hút màu quá đậm
- **Mô tả ngắn 1 câu:** Tóc xốp sẽ hút toner/màu nhanh, thường làm ngọn bệt tối.
- **Tình trạng before:** Ngọn khô, xốp, sáng hơn thân nhưng hút màu mạnh.
- **Kết quả after:** Ngọn trong hơn, không bị đen bệt.
- **Phân tích kỹ thuật:** Cân bằng độ xốp, bôi màu ngọn sau cùng hoặc pha loãng/clear.
- **Rủi ro:** Màu bám đậm và nhanh phai, ngọn thêm khô.
- **Hướng tư vấn khách:** Dặn khách dưỡng và gloss định kỳ; hạn chế tự dùng dầu gội tím.
- **Tag:** `dich-vu:nhuom,level:Ends 6-9 xốp,muc-tieu:ngon-trong-khong-bet,rui-ro:toc-xop-cang-xu-ly-cang-ro`
- **Gợi ý tên file ảnh before:** `before-tvl-color-014.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-014.jpg`

### 9. TVL-COLOR-017 — Màu nhanh phai sau 1-2 tuần

- **Tiêu đề case dùng trên web:** Màu nhanh phai sau 1-2 tuần
- **Mô tả ngắn 1 câu:** Không chỉ là lỗi thuốc; thường do độ xốp, nền tẩy cũ và chăm sóc sai.
- **Tình trạng before:** Tóc tẩy/nhuộm cũ, màu phai vàng/cam nhanh.
- **Kết quả after:** Màu bền hơn, bóng hơn, có lịch bảo dưỡng.
- **Phân tích kỹ thuật:** Cần đánh giá porosity, dùng gloss/acid care và routine tại nhà.
- **Rủi ro:** Toner lặp quá nhiều làm xỉn và khô.
- **Hướng tư vấn khách:** Giải thích màu lạnh/sáng cần bảo dưỡng, không bền như nâu trầm.
- **Tag:** `dich-vu:nhuom,level:6-9,muc-tieu:giu-mau-lau-hon,rui-ro:lap-toner-lien-tuc-lam-toc-xin`
- **Gợi ý tên file ảnh before:** `before-tvl-color-017.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-017.jpg`

### 10. TVL-COLOR-025 — Pastel không lên vì nền chưa đủ sáng

- **Tiêu đề case dùng trên web:** Pastel không lên vì nền chưa đủ sáng
- **Mô tả ngắn 1 câu:** Pastel cần nền level 9-10 sạch; nền 7-8 sẽ bẩn hoặc không thấy màu.
- **Tình trạng before:** Nền vàng cam level 7-8, tóc có thể yếu.
- **Kết quả after:** Pastel chỉ đạt khi nền đủ sáng; nếu không chọn beige/nâu sáng.
- **Phân tích kỹ thuật:** Test lọn để xem tóc có nâng tiếp được không.
- **Rủi ro:** Ép sáng gây đứt, pastel ra bẩn.
- **Hướng tư vấn khách:** Tư vấn thẳng: đẹp pastel đổi bằng thời gian, chi phí và sức tóc.
- **Tag:** `dich-vu:nhuom,level:7-8,muc-tieu:hong-pastel-xam-pastel,rui-ro:pastel-ban`
- **Gợi ý tên file ảnh before:** `before-tvl-color-025.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-color-025.jpg`

### 11. TVL-BLEACH-002 — Nền đen Việt lên level 8-9: không ép một phiên

- **Tiêu đề case dùng trên web:** Nền đen Việt lên level 8-9: không ép một phiên
- **Mô tả ngắn 1 câu:** Tẩy sáng mạnh trên nền đen cần lộ trình kiểm soát sức tóc.
- **Tình trạng before:** Tóc đen level 1-3, sợi dày/khỏe.
- **Kết quả after:** Level 8-9 tương đối sạch hoặc kế hoạch nhiều buổi.
- **Phân tích kỹ thuật:** Nền đỏ-cam-vàng xuất hiện theo quá trình nâng; cần theo dõi và toner sau.
- **Rủi ro:** Đứt, khô, bỏng da đầu nếu tăng lực quá mức.
- **Hướng tư vấn khách:** Tư vấn bằng level chart; ưu tiên an toàn hơn ảnh mẫu.
- **Tag:** `dich-vu:tay,level:1-3,ky-thuat:multi-session-lightening,rui-ro:can-nhieu-phien`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-002.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-002.jpg`

### 12. TVL-BLEACH-004 — Tẩy trên nền nhuộm đen hộp

- **Tiêu đề case dùng trên web:** Tẩy trên nền nhuộm đen hộp
- **Mô tả ngắn 1 câu:** Box dye/đen nhân tạo có thể nâng rất loang, là case cần test lọn bắt buộc.
- **Tình trạng before:** Tóc đen bệt, có thể nhiều lớp màu hộp.
- **Kết quả after:** Nâu sáng hoặc nền đủ để đổi màu theo lộ trình.
- **Phân tích kỹ thuật:** Color remover trước, sau đó đánh giá vùng kẹt màu.
- **Rủi ro:** Loang đỏ cam, không nâng đều, hư tóc.
- **Hướng tư vấn khách:** Không nhận nếu khách muốn sáng nhanh nhưng không chấp nhận rủi ro.
- **Tag:** `dich-vu:tay,level:1-3 nhân tạo,ky-thuat:color-remover-strand-test,rui-ro:loang-o-cam`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-004.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-004.jpg`

### 13. TVL-BLEACH-005 — Nền henna/metallic nghi ngờ: case nên từ chối nếu test xấu

- **Tiêu đề case dùng trên web:** Nền henna/metallic nghi ngờ: case nên từ chối nếu test xấu
- **Mô tả ngắn 1 câu:** Một số lịch sử màu không rõ có thể phản ứng không an toàn với hóa chất.
- **Tình trạng before:** Tóc màu lạ, khô cứng, khách từng dùng henna/thuốc không rõ.
- **Kết quả after:** Chỉ làm nếu test tương thích an toàn.
- **Phân tích kỹ thuật:** Incompatibility test trước; ưu tiên từ chối tẩy nếu có phản ứng bất thường.
- **Rủi ro:** Nóng, đổi màu lạ, đứt, kích ứng.
- **Hướng tư vấn khách:** Đặt an toàn lên trước doanh thu; ghi chú hồ sơ khách.
- **Tag:** `dich-vu:tay,level:2-6,ky-thuat:incompatibility-test-bat-buoc,rui-ro:phan-ung-hoa-chat`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-005.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-005.jpg`

### 14. TVL-BLEACH-008 — Banding 3 vùng chân-thân-ngọn

- **Tiêu đề case dùng trên web:** Banding 3 vùng chân-thân-ngọn
- **Mô tả ngắn 1 câu:** Tóc có nhiều dải màu cần xử lý theo bản đồ nền.
- **Tình trạng before:** Chân tối, thân cam, ngọn vàng/xốp.
- **Kết quả after:** Nền đồng nhất hơn để toner hoặc nhuộm mục tiêu.
- **Phân tích kỹ thuật:** Bôi theo vùng: vùng tối trước, vùng sáng bảo vệ, toner cuối.
- **Rủi ro:** Overlap làm đứt ngọn; còn band nếu xử lý thiếu.
- **Hướng tư vấn khách:** Cho khách xem ảnh before phân vùng để hiểu vì sao giá/thời gian cao.
- **Tag:** `dich-vu:tay,level:2-9,ky-thuat:zone-lightening,rui-ro:moi-vung-nang-khac-nhau`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-008.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-008.jpg`

### 15. TVL-BLEACH-013 — Overlap tẩy gây yếu tóc: dừng hóa chất

- **Tiêu đề case dùng trên web:** Overlap tẩy gây yếu tóc: dừng hóa chất
- **Mô tả ngắn 1 câu:** Khi tóc đã trắng/xốp, làm thêm thường không phải giải pháp.
- **Tình trạng before:** Đoạn tóc mềm, nhũn, dễ đứt khi ướt.
- **Kết quả after:** Giữ lại tóc còn sống, giảm gãy.
- **Phân tích kỹ thuật:** Ngưng tẩy/nhuộm mạnh; phục hồi, cắt, chờ tóc mới.
- **Rủi ro:** Đứt tóc hàng loạt nếu tiếp tục.
- **Hướng tư vấn khách:** Từ chối dịch vụ hóa chất là tư vấn chuyên nghiệp, không phải mất khách.
- **Tag:** `dich-vu:tay,level:8-10,ky-thuat:stop-chemical-repair,rui-ro:ut-toc-cao`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-013.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-013.jpg`

### 16. TVL-BLEACH-014 — Khách muốn bạch kim trong một ngày

- **Tiêu đề case dùng trên web:** Khách muốn bạch kim trong một ngày
- **Mô tả ngắn 1 câu:** Case kinh điển cần kiểm soát kỳ vọng và pháp lý salon.
- **Tình trạng before:** Nền đen hoặc màu cũ, không rõ sức tóc.
- **Kết quả after:** Kế hoạch platinum theo nhiều buổi nếu tóc cho phép.
- **Phân tích kỹ thuật:** Test lọn, phân tích nền, báo trước giới hạn.
- **Rủi ro:** Bỏng da đầu, đứt, màu vàng/cam không như ảnh.
- **Hướng tư vấn khách:** Không hứa platinum 1 ngày; đưa phương án blonde an toàn hơn.
- **Tag:** `dich-vu:tay,level:1-5,ky-thuat:multi-session-blonde-plan,rui-ro:ky-vong-khong-thuc-te`
- **Gợi ý tên file ảnh before:** `before-tvl-bleach-014.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-bleach-014.jpg`

### 17. TVL-CORR-001 — Sửa tóc bị xanh rêu sau màu khói

- **Tiêu đề case dùng trên web:** Sửa tóc bị xanh rêu sau màu khói
- **Mô tả ngắn 1 câu:** Case phải xử lý bằng đối màu rất tiết chế.
- **Tình trạng before:** Ngọn xanh/rêu, thân xám/khói.
- **Kết quả after:** Beige/ash brown sạch, bớt rêu.
- **Phân tích kỹ thuật:** Ấm hóa nhẹ vùng xanh, sau đó gloss toàn đầu.
- **Rủi ro:** Quá tay thành cam/nâu đỏ; không đủ thì xanh còn.
- **Hướng tư vấn khách:** Giải thích cần sửa theo vùng, không dùng một công thức.
- **Tag:** `dich-vu:sua-loi-mau,level:7-10,ky-thuat:micro-warm-toner,rui-ro:bu-am-qua-tay`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-001.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-001.jpg`

### 18. TVL-CORR-002 — Màu bị bùn/xỉn sau dập cam

- **Tiêu đề case dùng trên web:** Màu bị bùn/xỉn sau dập cam
- **Mô tả ngắn 1 câu:** Khi dập cam quá mạnh, tóc mất độ trong và trông già.
- **Tình trạng before:** Nâu/xám tối bẩn, thiếu bóng.
- **Kết quả after:** Nâu trong hoặc beige nhẹ.
- **Phân tích kỹ thuật:** Làm sạch màu nhẹ, trả lại sắc tố ấm cần thiết.
- **Rủi ro:** Gỡ màu gây loang hoặc khô thêm.
- **Hướng tư vấn khách:** Mục tiêu là trong và mềm hơn, không phải sáng bật ngay.
- **Tag:** `dich-vu:sua-loi-mau,level:5-8,ky-thuat:mild-cleanse-gloss,rui-ro:mo-mau-gay-loang`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-002.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-002.jpg`

### 19. TVL-CORR-008 — Tóc quá sáng muốn trầm lại không bị xanh

- **Tiêu đề case dùng trên web:** Tóc quá sáng muốn trầm lại không bị xanh
- **Mô tả ngắn 1 câu:** Khi xuống màu từ blonde, cần fill sắc tố thiếu.
- **Tình trạng before:** Nền sáng 8-10, xốp, thiếu pigment ấm.
- **Kết quả after:** Nâu/beige 5-7 đều, không xanh xám.
- **Phân tích kỹ thuật:** Pre-pigment/fill trước khi đặt màu mục tiêu.
- **Rủi ro:** Bỏ qua fill dễ ra xanh/rêu, ngọn tối bệt.
- **Hướng tư vấn khách:** Cho khách biết màu trầm trên nền tẩy vẫn cần bảo dưỡng.
- **Tag:** `dich-vu:sua-loi-mau,level:7-10,ky-thuat:filler-target-shade,rui-ro:thieu-fill-lam-mau-xanh-xam`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-008.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-008.jpg`

### 20. TVL-CORR-011 — Highlight sọc vằn cần làm mềm

- **Tiêu đề case dùng trên web:** Highlight sọc vằn cần làm mềm
- **Mô tả ngắn 1 câu:** Foil quá dày hoặc thiếu root shadow gây line cứng.
- **Tình trạng before:** Các đường sáng rõ, tương phản mạnh.
- **Kết quả after:** Highlight mảnh, mềm, có chiều sâu.
- **Phân tích kỹ thuật:** Dùng lowlight, root smudge và gloss thay vì tẩy thêm toàn bộ.
- **Rủi ro:** Tẩy thêm làm hư và sọc sáng hơn.
- **Hướng tư vấn khách:** Giải thích “mềm lại” có thể cần thêm vùng tối, không phải cứ thêm sáng.
- **Tag:** `dich-vu:sua-loi-mau,level:5-10,ky-thuat:lowlight-smudge,rui-ro:toc-yeu-neu-tay-them`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-011.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-011.jpg`

### 21. TVL-CORR-015 — Nhuộm đen hộp loang khi gỡ màu

- **Tiêu đề case dùng trên web:** Nhuộm đen hộp loang khi gỡ màu
- **Mô tả ngắn 1 câu:** Đen hộp là nguồn gốc nhiều ca correction khó.
- **Tình trạng before:** Mảng đen/cam/nâu không đều.
- **Kết quả after:** Nâu đều hơn, giảm mảng, có kế hoạch nâng tiếp.
- **Phân tích kỹ thuật:** Làm sạch nhiều bước, chấp nhận mục tiêu thấp hơn ảnh mẫu.
- **Rủi ro:** Không đều tuyệt đối lần đầu, tóc khô.
- **Hướng tư vấn khách:** Tư vấn theo lộ trình và chụp hồ sơ mỗi buổi.
- **Tag:** `dich-vu:sua-loi-mau,level:1-6,ky-thuat:black-box-correction,rui-ro:khong-the-eu-1-lan`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-015.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-015.jpg`

### 22. TVL-CORR-017 — Phủ bạc không ăn vùng thái dương

- **Tiêu đề case dùng trên web:** Phủ bạc không ăn vùng thái dương
- **Mô tả ngắn 1 câu:** Tóc bạc vùng mai/thái dương thường kháng màu hơn.
- **Tình trạng before:** Bạc trắng lộ sau khi nhuộm.
- **Kết quả after:** Che kín hoặc blend tự nhiên hơn.
- **Phân tích kỹ thuật:** Pre-softening, saturation kỹ, công thức natural/NN đủ nền.
- **Rủi ro:** Quá tối vùng mai hoặc vẫn trong màu.
- **Hướng tư vấn khách:** Hỏi khách thích che kín hay blend mềm để chọn cách.
- **Tag:** `dich-vu:sua-loi-mau,level:Bạc/level tự nhiên,ky-thuat:resistant-grey-correction,rui-ro:toc-bac-khang-mau`
- **Gợi ý tên file ảnh before:** `before-tvl-corr-017.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-corr-017.jpg`

### 23. TVL-GRAY-002 — Bạc 50% kháng màu cần công thức nền chắc

- **Tiêu đề case dùng trên web:** Bạc 50% kháng màu cần công thức nền chắc
- **Mô tả ngắn 1 câu:** Fashion tone đơn lẻ thường không che được bạc kháng.
- **Tình trạng before:** Bạc khoảng 50%, sợi cứng, từng phủ không ăn.
- **Kết quả after:** Màu nâu/ash/chocolate che bạc ổn định.
- **Phân tích kỹ thuật:** Tăng vai trò nền natural/NN, đủ thời gian xử lý.
- **Rủi ro:** Bạc trong màu, trôi nhanh.
- **Hướng tư vấn khách:** Nói rõ màu che bạc bền thường cần hy sinh một phần độ thời trang.
- **Tag:** `dich-vu:phu-bac,tinh-trang:bac-50,ky-thuat:resistant-grey-coverage`
- **Gợi ý tên file ảnh before:** `before-tvl-gray-002.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-gray-002.jpg`

### 24. TVL-GRAY-008 — Grey blending cho khách không muốn dặm chân liên tục

- **Tiêu đề case dùng trên web:** Grey blending cho khách không muốn dặm chân liên tục
- **Mô tả ngắn 1 câu:** Blend bạc giúp regrowth mềm hơn phủ kín truyền thống.
- **Tình trạng before:** Bạc 20-50%, nền tối hoặc nâu.
- **Kết quả after:** Bạc hòa với highlight/lowlight, mọc chân nhẹ hơn.
- **Phân tích kỹ thuật:** Babylight/lowlight/root blend theo mật độ bạc.
- **Rủi ro:** Sọc sáng nếu làm highlight quá thô.
- **Hướng tư vấn khách:** Phù hợp khách muốn tự nhiên, không cần che kín 100%.
- **Tag:** `dich-vu:phu-bac,tinh-trang:bac-20-50,ky-thuat:grey-blending`
- **Gợi ý tên file ảnh before:** `before-tvl-gray-008.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-gray-008.jpg`

### 25. TVL-GRAY-015 — Chuyển từ phủ bạc sang grey blending ít bảo trì

- **Tiêu đề case dùng trên web:** Chuyển từ phủ bạc sang grey blending ít bảo trì
- **Mô tả ngắn 1 câu:** Case chiến lược để giữ khách lâu dài và tạo nội dung Pro.
- **Tình trạng before:** Bạc 30-70%, từng phủ kín, sợ đường chân mọc.
- **Kết quả after:** Màu chuyển tiếp mềm, ít lộ chân hơn.
- **Phân tích kỹ thuật:** Giảm dần độ phủ đặc, thêm chiều sáng/tối để hòa bạc.
- **Rủi ro:** Giai đoạn chuyển tiếp không đều ngay.
- **Hướng tư vấn khách:** Tư vấn đây là hành trình 2-4 buổi, không phải một lần.
- **Tag:** `dich-vu:phu-bac,tinh-trang:bac-30-70,ky-thuat:soft-grey-transition`
- **Gợi ý tên file ảnh before:** `before-tvl-gray-015.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-gray-015.jpg`

### 26. TVL-HILITE-003 — Beige balayage trên nền tối Việt Nam

- **Tiêu đề case dùng trên web:** Beige balayage trên nền tối Việt Nam
- **Mô tả ngắn 1 câu:** Đẹp nhưng cần kiểm soát level và độ ấm nền.
- **Tình trạng before:** Nền level 2-5, có thể màu cũ.
- **Kết quả after:** Balayage beige sáng vừa, chuyển mềm.
- **Phân tích kỹ thuật:** Foilyage vùng cần sáng, toner beige; giữ root tự nhiên.
- **Rủi ro:** Cam, khô, không đủ beige nếu nền chưa sạch.
- **Hướng tư vấn khách:** Báo trước có thể ra caramel/beige nâu ở buổi đầu.
- **Tag:** `dich-vu:balayage-highlight,ky-thuat:balayage-beige-toner,level:2-5`
- **Gợi ý tên file ảnh before:** `before-tvl-hilite-003.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-hilite-003.jpg`

### 27. TVL-HILITE-007 — Airtouch trên nền đen châu Á

- **Tiêu đề case dùng trên web:** Airtouch trên nền đen châu Á
- **Mô tả ngắn 1 câu:** Airtouch đẹp nhưng tốn thời gian và dễ quá tải nếu tóc dày.
- **Tình trạng before:** Tóc dày, nền đen hoặc nâu cũ.
- **Kết quả after:** Sáng mềm, ít bảo trì, không line cứng.
- **Phân tích kỹ thuật:** Chia section chuẩn, kiểm soát từng foil, toner mềm.
- **Rủi ro:** Thời gian dài, cam, mỏi khách, chi phí cao.
- **Hướng tư vấn khách:** Chỉ nên nhận khi khách hiểu thời gian và ngân sách.
- **Tag:** `dich-vu:balayage-highlight,ky-thuat:airtouch,level:2-4`
- **Gợi ý tên file ảnh before:** `before-tvl-hilite-007.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-hilite-007.jpg`

### 28. TVL-REPAIR-001 — Tóc tẩy nhũn như kẹo: case phải ưu tiên cứu tóc

- **Tiêu đề case dùng trên web:** Tóc tẩy nhũn như kẹo: case phải ưu tiên cứu tóc
- **Mô tả ngắn 1 câu:** Tóc mất đàn hồi không nên tiếp tục hóa chất.
- **Tình trạng before:** Tóc ướt kéo giãn, nhũn, đứt khi chải.
- **Kết quả after:** Giữ tóc, giảm gãy, cắt phần chết.
- **Phân tích kỹ thuật:** Bond repair chỉ hỗ trợ; phần tóc mất cấu trúc cần cắt.
- **Rủi ro:** Tiếp tục màu/tẩy/uốn sẽ đứt nhiều.
- **Hướng tư vấn khách:** Từ chối dịch vụ đẹp trước mắt, đề xuất lịch phục hồi.
- **Tag:** `dich-vu:phuc-hoi,tinh-trang:toc-nhun-khi-uot,rui-ro:khong-the-phuc-hoi-100-phan-chet`
- **Gợi ý tên file ảnh before:** `before-tvl-repair-001.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-repair-001.jpg`

### 29. TVL-TEXTURE-008 — Duỗi/ép trên tóc tẩy: rủi ro cao

- **Tiêu đề case dùng trên web:** Duỗi/ép trên tóc tẩy: rủi ro cao
- **Mô tả ngắn 1 câu:** Tóc tẩy và duỗi mạnh là tổ hợp dễ đứt nhất trong salon.
- **Tình trạng before:** Tóc sáng level 7-10, xốp/khô.
- **Kết quả after:** Giảm xù an toàn hơn, không nhất thiết thẳng tuyệt đối.
- **Phân tích kỹ thuật:** Test đàn hồi; ưu tiên keratin/treatment nhẹ hoặc không làm.
- **Rủi ro:** Gãy ngang, mất đàn hồi, cháy nhiệt.
- **Hướng tư vấn khách:** Không nhận nếu khách đòi thẳng đơ trên tóc yếu.
- **Tag:** `dich-vu:uon-duoi-keratin,ky-thuat:high-risk-smoothing,rui-ro:ut-nang`
- **Gợi ý tên file ảnh before:** `before-tvl-texture-008.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-texture-008.jpg`

### 30. TVL-SCALP-011 — Da đầu nhạy trước dịch vụ hóa chất

- **Tiêu đề case dùng trên web:** Da đầu nhạy trước dịch vụ hóa chất
- **Mô tả ngắn 1 câu:** Case giúp salon tránh khiếu nại và bảo vệ khách.
- **Tình trạng before:** Da đầu dễ đỏ/rát, từng ngứa sau màu.
- **Kết quả after:** Dịch vụ an toàn hoặc trì hoãn đúng lúc.
- **Phân tích kỹ thuật:** Patch test, kiểm tra vết thương, chọn kỹ thuật tránh da đầu nếu cần.
- **Rủi ro:** Dị ứng, bỏng rát, kích ứng kéo dài.
- **Hướng tư vấn khách:** Luôn giải thích test là quyền lợi của khách, không phải làm khó.
- **Tag:** `dich-vu:da-dau-toc-yeu,tinh-trang:de-o-rat,rui-ro:di-ung`
- **Gợi ý tên file ảnh before:** `before-tvl-scalp-011.jpg`
- **Gợi ý tên file ảnh after:** `after-tvl-scalp-011.jpg`


---

## 7. Đề xuất hiển thị trên trang case-thuc-te

### 7.1. Bộ lọc nên có

#### Bộ lọc cấp 1 — bắt buộc

- Dịch vụ: Nhuộm / Tẩy / Sửa lỗi màu / Phủ bạc / Balayage / Phục hồi / Uốn-Duỗi-Keratin / Cắt / Da đầu / Tư vấn.
- Độ khó: Cơ bản / Trung cấp / Nâng cao / Rủi ro cao.
- Level nền tóc: 1-3 / 4-5 / 6-7 / 8-10.
- Tình trạng tóc: Khỏe / Khô / Xốp / Đứt gãy / Tẩy cũ / Nhuộm đen cũ / Bạc 30-50-80%.
- Mục tiêu: Nâu lạnh / Beige / Ash / Khói / Rêu / Trà sữa / Phủ bạc / Blonde / Phục hồi.

#### Bộ lọc cấp 2 — nên có

- Lịch sử hóa chất: Box dye, nhuộm đen, tẩy, highlight, duỗi/ép, uốn, henna/không rõ.
- Kỹ thuật: Full color, toner/gloss, root shadow, balayage, foilyage, lowlight, direct dye removal, bond repair.
- Rủi ro: Cam, xanh rêu, hot root, banding, đứt tóc, kích ứng da đầu, bạc không ăn.
- Test lọn: Bắt buộc / Nên / Không cần.
- Quyền truy cập: Free / Member / Pro.

### 7.2. Card case nên hiển thị thông tin gì

Card nên ngắn, quét nhanh được trong 3-5 giây:

| Thành phần | Nội dung |
|---|---|
| Ảnh | Before/After dạng split hoặc carousel nhỏ |
| Badge dịch vụ | Nhuộm / Tẩy / Sửa lỗi màu / Phủ bạc... |
| Badge độ khó | Cơ bản / Trung cấp / Nâng cao / Rủi ro cao |
| Tiêu đề | Tên case sát ngôn ngữ thợ và khách |
| Before ngắn | Level, lịch sử, tình trạng tóc |
| After ngắn | Màu/kết quả đạt được |
| Rủi ro chính | 1-2 rủi ro nổi bật |
| Thời gian | ước tính giờ/buổi |
| Test lọn | Có/Nên/Không |
| Quyền truy cập | Miễn phí/Pro |

### 7.3. Trang chi tiết case nên có các mục

1. Tiêu đề + ảnh before/after.
2. Tóm tắt 1 câu.
3. Hồ sơ tóc ban đầu:
   - Level nền.
   - Lịch sử hóa chất.
   - Độ xốp/độ khỏe.
   - Tỷ lệ bạc nếu có.
4. Mục tiêu khách muốn.
5. Phân tích kỹ thuật:
   - Sắc tố nền đang có.
   - Rủi ro chính.
   - Vì sao ảnh mẫu có thể khác thực tế.
6. Hướng xử lý salon:
   - Phương án an toàn.
   - Phương án đẹp hơn nhưng rủi ro hơn.
   - Khi nào cần nhiều buổi.
7. Công thức/kỹ thuật tham khảo:
   - Chỉ ghi logic, không khóa vào 1 hãng thuốc.
   - Có cảnh báo phải theo hướng dẫn hãng.
8. Checklist test lọn / patch test / từ chối.
9. Hướng tư vấn khách.
10. Chăm sóc sau dịch vụ.
11. Tag liên quan.
12. Case liên quan.

### 7.4. Case nên miễn phí để kéo người dùng

Nên miễn phí các case dễ hiểu, nhu cầu tìm kiếm cao, giúp khách/thợ mới vào web thấy giá trị ngay:

- TVL-COLOR-001 — Nền đen tự nhiên lên nâu lạnh.
- TVL-COLOR-005 — Nền 7 vàng cam muốn trà sữa.
- TVL-COLOR-017 — Màu nhanh phai.
- TVL-GRAY-001 — Bạc 30% phủ nâu tự nhiên.
- TVL-GRAY-012 — Nam giới phủ bạc tự nhiên.
- TVL-CUT-001 — Layer dài cho mặt tròn.
- TVL-CUT-006 — Fade nam chuyên nghiệp.
- TVL-SCALP-001 — Da đầu dầu có vảy.
- TVL-SCALP-009 — Tóc mảnh xẹp.
- TVL-CONSULT-001 — Khách đưa ảnh mẫu filter.

### 7.5. Case nên khóa Pro

Nên khóa Pro các case có giá trị chuyên môn cao, nhiều bước, nhiều rủi ro, cần thợ hiểu kỹ thuật:

- Tẩy nền đen lên level 8-9.
- Tẩy nền nhuộm đen hộp.
- Henna/metallic salt nghi ngờ.
- Banding 3 vùng chân-thân-ngọn.
- Overlap tẩy gây yếu tóc.
- Khách muốn bạch kim trong một ngày.
- Sửa xanh rêu sau toner khói.
- Sửa màu bùn/xỉn.
- Tóc quá sáng muốn trầm lại không xanh.
- Highlight sọc vằn cần làm mềm.
- Grey blending chuyển từ phủ bạc truyền thống.
- Beige balayage nền tối.
- Airtouch nền đen châu Á.
- Tóc tẩy nhũn như kẹo.
- Duỗi/ép trên tóc tẩy.
- Da đầu nhạy trước dịch vụ hóa chất.

### 7.6. Gợi ý cấu trúc nội dung theo phễu

| Tầng nội dung | Mục tiêu | Case phù hợp |
|---|---|---|
| Free | Kéo traffic, tạo niềm tin, giải thích lỗi thường gặp | Nâu lạnh nền đen, màu nhanh phai, phủ bạc cơ bản, tóc dầu/gàu, cắt layer |
| Member | Cho thợ/salon học logic xử lý | Nền cam/vàng, hot root, ngọn xốp, grey blending, balayage cơ bản |
| Pro | Case correction/chemical risk, có giá trị giữ chân thành viên | Tẩy đen hộp, banding, direct dye removal, overlap bleach, uốn/duỗi tóc tẩy |

---

## 8. Checklist dữ liệu khi nhập case thật

### 8.1. Checklist bắt buộc trước khi nhận case hóa chất

- [ ] Chụp ảnh tóc dưới ánh sáng tự nhiên.
- [ ] Chụp cận chân/thân/ngọn.
- [ ] Hỏi lịch sử 12 tháng: nhuộm, tẩy, uốn, duỗi, phủ bạc, thuốc hộp, henna.
- [ ] Xác định level từng vùng.
- [ ] Xác định độ xốp: thấp / trung bình / cao.
- [ ] Test đàn hồi khi tóc từng tẩy/uốn/duỗi.
- [ ] Test lọn khi có màu cũ, nền tối, mục tiêu sáng, tóc yếu.
- [ ] Patch/allergy test khi dùng màu theo quy định hãng và khi khách có tiền sử nhạy cảm.
- [ ] Ghi rõ kỳ vọng khách: giống ảnh bao nhiêu %, chấp nhận mấy buổi, ngân sách.
- [ ] Báo rủi ro bằng ngôn ngữ dễ hiểu.

### 8.2. Checklist sau dịch vụ

- [ ] Chụp after đủ ánh sáng.
- [ ] Ghi công thức/kỹ thuật, thời gian xử lý, thời điểm bôi từng vùng.
- [ ] Ghi vấn đề phát sinh nếu có.
- [ ] Hướng dẫn gội/xả/mask/heat protect.
- [ ] Hẹn lịch gloss/toner/dặm chân/phục hồi.
- [ ] Gắn tag case theo taxonomy.

### 8.3. Checklist ảnh before/after chuẩn cho website

- [ ] Cùng góc chụp.
- [ ] Cùng ánh sáng hoặc ghi rõ ánh sáng khác nhau.
- [ ] Có ảnh tổng thể sau lưng.
- [ ] Có ảnh cận màu/chất tóc.
- [ ] Có ảnh chân tóc nếu case phủ bạc/hot root/root shadow.
- [ ] Không dùng filter làm sai màu.
- [ ] Tên file theo mã case: `before-tvl-color-001.jpg`, `after-tvl-color-001.jpg`.

---

## 9. Nguồn tham khảo chuyên môn

Tài liệu này tổng hợp theo thực tế salon Việt Nam và đối chiếu thêm các nguyên tắc giáo dục nghề tóc quốc tế. Các nguồn nên dùng để kiểm chứng logic khi viết bài public:

1. Wella Professionals / Wella Colour Portfolio: lightening curve, underlying pigment, opposite colors neutralize, allergy alert test, ứng dụng màu và phủ bạc.
2. Redken Pro: color correction, high contrast canvas, botched highlights, lightener/bonder trong correction.
3. Goldwell Education: resistant white/grey hair cần xử lý đặc biệt do cấu trúc tóc bạc và khả năng phủ màu.
4. Clairol Professional: hướng dẫn gray coverage với developer 20-volume và thời gian xử lý tham khảo.
5. Salons Direct: strand test trước dịch vụ hóa chất giúp đánh giá tóc, thời gian xử lý, tránh màu không đều, breakage và over-processing.
6. Avola College: porosity test, elasticity test, incompatibility test, pre-perm curl test trước hóa chất/uốn.
7. Redken Hair Porosity: low/medium/high porosity ảnh hưởng khả năng hấp thụ, giữ ẩm, giữ màu và độ xơ rối.
8. SalonCentric/Biolage education: scalp analysis cần phân biệt dryness/dandruff, dấu hiệu cần chú ý và cá nhân hóa treatment.
9. Elite Learning Cosmetology: tư vấn rụng tóc cần hỏi routine, tiền sử, gia đình, lifestyle; cần nhận diện dấu hiệu nên giới thiệu chuyên khoa.
10. Healthline: keratin treatment có lợi ích làm mượt/giảm frizz nhưng cần lưu ý thành phần, thông gió, formaldehyde/formaldehyde-free và đối tượng không phù hợp.

---

## Ghi chú triển khai sau tài liệu

- Giai đoạn đầu nên nhập khoảng **30 case chi tiết** trước, sau đó mở rộng toàn bộ danh sách case matrix.
- Không nên public công thức quá cụ thể theo gram nếu chưa có chuyên gia/brand kiểm duyệt.
- Nên dùng ngôn ngữ “logic xử lý” thay vì “công thức tuyệt đối”.
- Với case rủi ro cao, nên có badge cảnh báo: `Cần test lọn`, `Không khuyến khích tự làm`, `Nên do thợ chính xử lý`.
- Nên giữ mỗi case có 2 lớp nội dung:
  - Lớp cho khách/salon owner: dễ hiểu, tư vấn, kỳ vọng.
  - Lớp cho thợ/Pro: phân tích nền, kỹ thuật, rủi ro, checklist.
