// ═══ 30 bài kiến thức Tóc Việt Lab ═══
// A1 (1-10): Nền kỹ thuật màu tóc
// A2 (11-20): Phủ bạc, correction, phục hồi
// A3 (21-30): Balayage, da đầu, màu nâng cao

export const ARTICLES = [
// ─── A1: 1-10 ───
{
  slug:"toc-nen-5-anh-cam",title:"Tóc nền 5 ánh cam là gì? Vì sao tóc Việt dễ lộ cam khi nâng nền",
  category:"Nền tóc & sắc tố",difficulty:"basic",readTime:7,
  image_key:"images/articles/article-toc-nen-5-anh-cam.webp",
  tags:JSON.stringify(["nền tóc","level tóc","ánh cam","tóc Việt"]),
  excerpt:"Tóc người Việt phần lớn ở nền 1-3, khi nâng lên level 5 sẽ lộ ra ánh cam do sắc tố pheomelanin. Hiểu cơ chế này giúp bạn chọn đúng công thức trung hoà.",
  content:`## Tóm tắt nhanh\n\nTóc nền 5 là mức mà sắc tố eumelanin (đen/nâu) đã bị phá đáng kể, để lộ pheomelanin — sắc tố ấm tạo ánh cam và vàng cam. Đây là giai đoạn phổ biến nhất khi nâng tóc Việt.\n\n## Vì sao vấn đề này quan trọng?\n\nNếu không hiểu nền tóc, thợ dễ phủ màu lạnh trực tiếp lên nền cam → kết quả xỉn, bùn hoặc phai nhanh. Khách thất vọng, salon mất uy tín.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Quan sát tóc dưới ánh sáng tự nhiên, không phải đèn vàng salon.\n- Kéo một lọn mỏng để đánh giá level chính xác từ chân đến ngọn.\n- So sánh với bảng level chuẩn (swatch book) trước khi quyết định công thức.\n\n## Rủi ro thường gặp\n\n- Phủ ash/lạnh trực tiếp lên nền cam → xỉn xanh rêu hoặc bùn.\n- Ép nâng quá nhanh để tránh cam → hư tổn sợi tóc.\n- Không tính đến lịch sử nhuộm → nền không đồng đều.\n\n## Gợi ý xử lý an toàn\n\n- Trung hoà cam bằng đối màu xanh dương liều nhỏ (0.1 hoặc blue additive).\n- Nếu khách muốn beige/ash: nâng nền lên 7-8 trước, toner sau.\n- Kiểm soát thời gian để (processing time) — quá lâu không giúp nâng thêm mà chỉ phá tóc.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu tóc đã qua nhiều lần nhuộm hoặc tẩy, nền sẽ không đồng nhất. Luôn hỏi rõ lịch sử tóc trước khi quyết định công thức.`
},
{
  slug:"chon-oxydant",title:"Chọn oxydant thế nào cho đúng nền tóc?",
  category:"Công thức nhuộm",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-chon-oxydant.webp",
  tags:JSON.stringify(["oxydant","developer","nhuộm tóc","kỹ thuật màu"]),
  excerpt:"Oxydant (developer) quyết định mức nâng nền và độ bền màu. Chọn sai vol sẽ không đạt màu mong muốn hoặc gây hư tóc không cần thiết.",
  content:`## Tóm tắt nhanh\n\nOxydant có các nồng độ phổ biến: 3% (10 vol), 6% (20 vol), 9% (30 vol), 12% (40 vol). Mỗi nồng độ có công dụng riêng — không phải "càng cao càng tốt".\n\n## Vì sao vấn đề này quan trọng?\n\nChọn sai oxydant là nguyên nhân hàng đầu gây: màu không lên đúng, tóc khô xơ, hoặc màu phai quá nhanh.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- 10 vol (3%): deposit only — phủ màu, phủ bạc, toner. Không nâng nền.\n- 20 vol (6%): nâng 1-2 level. Dùng phổ biến nhất cho nhuộm thường.\n- 30 vol (9%): nâng 2-3 level. Dùng cho highlight, balayage.\n- 40 vol (12%): nâng 3-4 level. Chỉ dùng khi cần thiết, kèm bond protector.\n\n## Rủi ro thường gặp\n\n- Dùng 40 vol cho phủ bạc → cháy da đầu, tóc xơ.\n- Dùng 10 vol cho nâng nền → màu không lên, phí thuốc.\n- Trộn sai tỷ lệ thuốc:oxy → phản ứng không đủ hoặc quá mạnh.\n\n## Gợi ý xử lý an toàn\n\n- Luôn đọc hướng dẫn nhà sản xuất về tỷ lệ pha.\n- Khi phân vân giữa 2 nồng độ, chọn nồng độ thấp hơn và tăng thời gian để.\n- Tóc đã tẩy/xốp: luôn giảm vol xuống 1 bậc so với bình thường.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tóc có nhiều vùng nền khác nhau (chân mới mọc vs thân vs ngọn tẩy), mỗi vùng có thể cần oxydant khác nhau.`
},
{
  slug:"do-xop-toc",title:"Độ xốp tóc là gì và vì sao ảnh hưởng đến màu nhuộm?",
  category:"Chẩn đoán tóc",difficulty:"basic",readTime:7,
  image_key:"images/articles/article-do-xop-toc.webp",
  tags:JSON.stringify(["độ xốp tóc","porosity","hấp thụ màu","chất tóc"]),
  excerpt:"Tóc xốp hút màu nhanh nhưng cũng phai nhanh. Hiểu porosity giúp thợ điều chỉnh công thức và thời gian để chính xác hơn.",
  content:`## Tóm tắt nhanh\n\nĐộ xốp (porosity) là khả năng hấp thụ và giữ nước/hoá chất của sợi tóc. Tóc xốp cao có lớp cuticle mở, hút màu rất nhanh nhưng cũng thải màu nhanh.\n\n## Vì sao vấn đề này quan trọng?\n\nCùng một công thức, tóc xốp và tóc khoẻ sẽ cho kết quả hoàn toàn khác. Nếu không đánh giá porosity trước, thợ sẽ gặp: ngọn đậm hơn chân, màu loang, phai sau 1-2 tuần.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- **Test nước**: thả sợi tóc vào cốc nước. Chìm nhanh = xốp cao, nổi = xốp thấp.\n- **Test sờ**: vuốt ngược sợi tóc. Ráp/khô = xốp cao, mượt = bình thường.\n- **Quan sát**: tóc khô nhanh sau gội, ngọn xơ rối = xốp cao.\n\n## Rủi ro thường gặp\n\n- Bôi toner đều toàn đầu → ngọn xốp hút đậm, chân nhạt.\n- Tẩy tiếp tóc đã xốp → đứt gãy.\n- Không pre-treat → màu phai rất nhanh.\n\n## Gợi ý xử lý an toàn\n\n- Tóc xốp: bôi chân-thân trước, ngọn bôi sau 10-15 phút.\n- Pha clear/conditioner vào thuốc cho vùng xốp để giảm hấp thụ.\n- Dùng acid rinse hoặc bond treatment trước khi nhuộm.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu tóc đã qua tẩy, uốn, duỗi nhiều lần — luôn yêu cầu thợ test porosity trước khi quyết định công thức.`
},
{
  slug:"mau-nhanh-phai",title:"Vì sao màu tóc nhanh phai sau khi nhuộm?",
  category:"Chăm sóc sau nhuộm",difficulty:"basic",readTime:6,
  image_key:"images/articles/article-mau-nhanh-phai.webp",
  tags:JSON.stringify(["phai màu","giữ màu","aftercare","màu nhuộm"]),
  excerpt:"Màu phai nhanh không chỉ do thuốc kém. Nguyên nhân thường nằm ở nền tóc, độ xốp, nhiệt độ nước gội và sản phẩm chăm sóc.",
  content:`## Tóm tắt nhanh\n\nMàu nhuộm phai nhanh là khiếu nại phổ biến nhất trong salon. Nguyên nhân đa phần không phải do thuốc, mà do: nền tóc xốp, gội nước nóng, dùng dầu gội sulfate mạnh, hoặc không dùng sản phẩm giữ màu.\n\n## Vì sao vấn đề này quan trọng?\n\nKhách trả tiền nhuộm nhưng chỉ giữ được 1-2 tuần sẽ mất niềm tin vào salon.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Kiểm tra nền tóc trước nhuộm: nền xốp = phai nhanh hơn.\n- Hỏi khách về routine chăm sóc: gội ngày mấy lần, nước nóng hay mát.\n- Đánh giá loại màu: semi-permanent phai nhanh hơn permanent.\n\n## Rủi ro thường gặp\n\n- Hứa màu bền 6-8 tuần trên tóc tẩy xốp → thất vọng.\n- Không hướng dẫn aftercare → khách nghĩ salon làm dở.\n- Dùng toner deposit trên tóc xốp → phai sau 3-5 lần gội.\n\n## Gợi ý xử lý an toàn\n\n- Gội nước mát trong 48 giờ đầu sau nhuộm.\n- Dùng dầu gội không sulfate, pH thấp.\n- Toner bền: dùng demi-permanent với oxy 1.5-3% thay vì rinse.\n- Acid gloss sau nhuộm giúp khép cuticle, giữ màu lâu hơn.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu bạn hay gội nước nóng hoặc bơi nhiều, hãy nói trước để thợ chọn loại màu bền hơn.`
},
{
  slug:"vong-tron-mau",title:"Vòng tròn màu trong nhuộm tóc: nền tảng để khử cam, vàng, xanh",
  category:"Lý thuyết màu",difficulty:"basic",readTime:8,
  image_key:"images/articles/article-vong-tron-mau.webp",
  tags:JSON.stringify(["vòng tròn màu","color wheel","khử màu","sửa màu"]),
  excerpt:"Vòng tròn màu là công cụ cốt lõi giúp thợ hiểu cách trung hoà ánh không mong muốn. Cam đối xanh, vàng đối tím — đơn giản nhưng hay bị bỏ qua.",
  content:`## Tóm tắt nhanh\n\nVòng tròn màu cho thấy các cặp đối màu: cam ↔ xanh dương, vàng ↔ tím, đỏ ↔ xanh lá. Trong nhuộm tóc, ta dùng đối màu để trung hoà ánh không mong muốn.\n\n## Vì sao vấn đề này quan trọng?\n\nMọi kỹ thuật sửa màu, khử cam, toner ash/beige đều dựa trên nguyên tắc đối màu. Không hiểu color wheel = không thể sửa lỗi màu chính xác.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Nền cam (level 5-6): cần xanh dương (blue) → dùng 0.1 hoặc blue additive.\n- Nền vàng (level 7-8): cần tím (violet) → dùng 0.2 hoặc violet shampoo.\n- Nền vàng nhạt (level 9-10): cần tím nhẹ → toner ash-violet.\n\n## Rủi ro thường gặp\n\n- Dùng quá nhiều đối màu → tóc bị xỉn, bùn, mất độ trong.\n- Nhầm đối màu: dùng xanh lá khử cam (sai) → ra xám bẩn.\n- Không tính nền thật → kết quả không như swatch.\n\n## Gợi ý xử lý an toàn\n\n- Bắt đầu với liều đối màu nhỏ (5-10% trong công thức), tăng dần.\n- Luôn test trên lọn trước khi áp dụng toàn đầu.\n- Ghi chú công thức mỗi lần để có data cho lần sau.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn màu lạnh (ash, khói, bạc) trên nền ấm — hỏi thợ có tính đối màu chưa.`
},
{
  slug:"tay-toc-an-toan",title:"Tẩy tóc an toàn: cần kiểm tra gì trước khi nâng nền?",
  category:"Tẩy & nâng nền",difficulty:"high-risk",readTime:9,
  image_key:"images/articles/article-tay-toc-an-toan.webp",
  tags:JSON.stringify(["tẩy tóc","nâng nền","an toàn hóa chất","strand test"]),
  excerpt:"Tẩy tóc là bước rủi ro cao nhất trong salon. Strand test, đánh giá porosity và lịch sử tóc là bắt buộc trước mỗi lần tẩy.",
  content:`## Tóm tắt nhanh\n\nTẩy tóc phá vỡ melanin để nâng nền sáng. Quá trình này không thể đảo ngược — sợi tóc đã tẩy sẽ yếu hơn vĩnh viễn.\n\n## Vì sao vấn đề này quan trọng?\n\nTẩy sai có thể gây: đứt tóc, cháy da đầu, loang màu, hoặc tóc nhũn không thể cứu. Đây là dịch vụ rủi ro pháp lý cao nhất.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- **Strand test**: bắt buộc với khách mới hoặc tóc lịch sử không rõ.\n- **Porosity check**: tóc xốp cao cần giảm vol và thời gian.\n- **Lịch sử tóc**: hỏi rõ đã tẩy/nhuộm/duỗi bao nhiêu lần.\n- **Incompatibility test**: nếu nghi ngờ henna hoặc metallic dye.\n\n## Rủi ro thường gặp\n\n- Tẩy trên nền đen hộp (box dye) → loang, kẹt màu.\n- Ép nâng level 1→9 trong một buổi → đứt tóc.\n- Không bảo vệ da đầu → bỏng hoá chất.\n\n## Gợi ý xử lý an toàn\n\n- Luôn dùng bond protector (Olaplex, Fibreplex, K18...) khi tẩy.\n- Bôi petroleum jelly quanh đường chân tóc và tai.\n- Không tẩy quá 50 phút mỗi lần. Nếu chưa đạt level → dừng, phục hồi, hẹn buổi sau.\n- Rửa bằng nước mát, không chà xát.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nLuôn luôn. Nếu thợ không hỏi lịch sử tóc và không test lọn — đó là dấu hiệu cần cân nhắc.`
},
{
  slug:"sac-to-melanin",title:"Sắc tố melanin và nền tóc Việt Nam: vì sao tóc dễ ra đỏ cam?",
  category:"Nền tóc & sắc tố",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-sac-to-melanin.webp",
  tags:JSON.stringify(["melanin","sắc tố tóc","eumelanin","pheomelanin"]),
  excerpt:"Tóc Việt Nam chứa nhiều eumelanin. Khi nâng nền, eumelanin bị phá trước, để lộ pheomelanin — tạo ánh đỏ, cam, vàng theo từng level.",
  content:`## Tóm tắt nhanh\n\nCó hai loại melanin trong tóc: eumelanin (đen/nâu) và pheomelanin (đỏ/vàng). Tóc Việt Nam giàu eumelanin, nên khi nâng nền sẽ lần lượt lộ: đỏ → cam → vàng cam → vàng → vàng nhạt.\n\n## Vì sao vấn đề này quan trọng?\n\nHiểu sắc tố giúp thợ dự đoán chính xác nền tóc sẽ ra màu gì ở mỗi level, từ đó chọn đúng công thức trung hoà.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Level 1-3: eumelanin áp đảo → đen đặc.\n- Level 4-5: bắt đầu lộ đỏ cam.\n- Level 6-7: cam → vàng cam.\n- Level 8-9: vàng → vàng nhạt.\n- Level 10: vàng rất nhạt, gần trắng.\n\n## Rủi ro thường gặp\n\n- Mong đợi beige ash trên level 5-6 → không khả thi vì nền cam quá mạnh.\n- Không tính sắc tố còn lại khi chọn toner.\n- Hứa hẹn kết quả theo ảnh Pinterest trên tóc Caucasian → không match tóc Việt.\n\n## Gợi ý xử lý an toàn\n\n- Luôn đọc nền thật (underlying pigment) thay vì chỉ nhìn level bề mặt.\n- Nền cam mạnh: cần 2 bước — nâng nền + toner, không phủ trực tiếp.\n- Giải thích cho khách: tóc Việt cần nhiều bước hơn tóc sáng tự nhiên.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn màu lạnh/sáng nhưng tóc đen tự nhiên — hỏi thợ dự tính nền sẽ ra gì.`
},
{
  slug:"tay-nhieu-lan",title:"Khi nào cần tẩy tóc nhiều lần thay vì cố nâng trong một buổi?",
  category:"Tẩy & nâng nền",difficulty:"high-risk",readTime:9,
  image_key:"images/articles/article-tay-nhieu-lan.webp",
  tags:JSON.stringify(["tẩy nhiều lần","lộ trình nâng nền","tóc yếu","an toàn"]),
  excerpt:"Ép tẩy một buổi để tiết kiệm thời gian là nguyên nhân hàng đầu gây đứt tóc. Lộ trình nhiều buổi an toàn và cho kết quả đẹp hơn.",
  content:`## Tóm tắt nhanh\n\nTẩy tóc từ nền đen (level 1-3) lên sáng (level 8-10) thường cần 2-3 buổi cách nhau 2-4 tuần. Cố nâng trong một buổi sẽ phá huỷ cấu trúc sợi tóc.\n\n## Vì sao vấn đề này quan trọng?\n\nKhách thường muốn kết quả nhanh, nhưng tẩy quá mức có thể gây hậu quả không thể sửa: tóc nhũn, đứt, hoặc rụng.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Test đàn hồi: kéo sợi tóc ướt nhẹ. Nếu không co lại hoặc đứt → dừng ngay.\n- Kiểm tra level sau mỗi 20 phút: nếu không nâng thêm → tóc đã đạt giới hạn.\n- So sánh ngọn vs chân: nếu ngọn đã sáng hơn 3 level → bôi theo vùng.\n\n## Rủi ro thường gặp\n\n- Tẩy liên tục 2 lần trong ngày → gãy tóc hàng loạt.\n- Khách áp lực "phải xong hôm nay" → thợ chiều theo → hư tóc.\n- Không có bond protector → cấu trúc disulfide bị phá vĩnh viễn.\n\n## Gợi ý xử lý an toàn\n\n- Buổi 1: nâng đến level 6-7, rửa, bond repair, hẹn 2-3 tuần sau.\n- Buổi 2: nâng đến level 8-9, toner.\n- Buổi 3 (nếu cần): toner lại hoặc gloss.\n- Giữa các buổi: mask protein + dưỡng ẩm.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn tóc sáng level 8+ từ nền đen — hỏi thợ dự kiến bao nhiêu buổi.`
},
{
  slug:"strand-test",title:"Strand test là gì và khi nào bắt buộc phải test lọn?",
  category:"Chẩn đoán tóc",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-strand-test.webp",
  tags:JSON.stringify(["strand test","test lọn","kiểm tra tóc","trước khi tẩy"]),
  excerpt:"Test lọn giúp thợ biết trước kết quả trên tóc thật của khách trước khi áp dụng toàn đầu. Bỏ qua bước này là đánh cược.",
  content:`## Tóm tắt nhanh\n\nStrand test là lấy một lọn nhỏ (thường vùng sau gáy), thoa thuốc và quan sát kết quả trước khi làm toàn đầu.\n\n## Vì sao vấn đề này quan trọng?\n\nMỗi mái tóc khác nhau về lịch sử hoá chất, porosity, sắc tố, sức khoẻ. Không có công thức "one size fits all".\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Lấy lọn nhỏ vùng gáy (ít thấy nếu kết quả xấu).\n- Bôi đúng công thức dự kiến, để đúng thời gian.\n- Quan sát: level nâng, ánh màu, độ đàn hồi sau rửa.\n\n## Rủi ro thường gặp\n\n- Bỏ qua strand test trên tóc lịch sử không rõ → kết quả bất ngờ.\n- Test trên tóc rụng (không gắn da đầu) → thiếu nhiệt, kết quả sai.\n- Không đợi đủ thời gian test → đánh giá sai level.\n\n## Gợi ý xử lý an toàn\n\n- Bắt buộc khi: khách mới, tóc có henna/metallic, muốn nâng >3 level.\n- Nên test khi: tóc đã qua nhiều lần hoá chất, tóc mỏng/yếu.\n- Ghi lại kết quả test để so sánh với kết quả toàn đầu.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu thợ bắt đầu bôi thuốc ngay mà không test — yêu cầu test lọn trước.`
},
{
  slug:"banding-ba-vung",title:"Banding ba vùng: vì sao chân, thân và ngọn tóc lên màu khác nhau?",
  category:"Sửa lỗi màu",difficulty:"advanced",readTime:9,
  image_key:"images/articles/article-banding-ba-vung.webp",
  tags:JSON.stringify(["banding","ba vùng tóc","sửa màu","nền không đều"]),
  excerpt:"Banding xảy ra khi chân, thân và ngọn tóc có nền khác nhau. Bôi cùng một công thức lên cả ba vùng sẽ cho kết quả loang lổ.",
  content:`## Tóm tắt nhanh\n\nBanding là hiện tượng tóc có nhiều dải màu khác nhau do lịch sử nhuộm/tẩy. Chân tóc thường đen, thân nâu/cam, ngọn sáng nhất.\n\n## Vì sao vấn đề này quan trọng?\n\nBôi cùng thuốc lên cả 3 vùng → kết quả 3 màu khác nhau. Đây là lỗi phổ biến nhất khi thợ không "đọc nền".\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Chia tóc ra 3 zone: chân (0-3cm từ da đầu), thân (giữa), ngọn.\n- Đánh giá level từng zone riêng biệt.\n- Vẽ "bản đồ nền" trước khi chọn công thức.\n\n## Rủi ro thường gặp\n\n- Bôi tẩy đều → ngọn xốp bị cháy, chân chưa nâng đủ.\n- Bôi toner đều → ngọn đậm, chân nhạt.\n- Cố sửa bằng nhuộm chồng → tệ hơn.\n\n## Gợi ý xử lý an toàn\n\n- Bôi theo zone: vùng tối nhất trước, vùng sáng nhất sau cùng.\n- Dùng vol/thời gian khác nhau cho mỗi zone.\n- Toner pha loãng cho vùng xốp (thêm clear mix).\n- Kiểm tra mỗi 15 phút, không để hết giờ mới rửa.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tóc có nhiều vùng màu khác nhau rõ rệt — hỏi thợ có xử lý theo vùng không.`
},
// ─── A2: 11-20 ───
{
  slug:"phu-bac-tu-nhien",title:"Phủ bạc tự nhiên: làm sao để tóc không bị đen cứng?",
  category:"Phủ bạc",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-phu-bac-tu-nhien.webp",
  tags:JSON.stringify(["phủ bạc","tóc bạc","màu tự nhiên","nâu tự nhiên"]),
  excerpt:"Phủ bạc không nhất thiết phải nhuộm đen. Chọn đúng tone nâu tự nhiên sẽ che bạc mà vẫn mềm mại, tự nhiên.",
  content:`## Tóm tắt nhanh\n\nPhủ bạc truyền thống thường dùng màu đen → kết quả cứng, giả, lộ chân nhanh. Cách hiện đại: dùng tone nâu tự nhiên (N/NN) pha với ánh ấm nhẹ.\n\n## Vì sao vấn đề này quan trọng?\n\nKhách phủ bạc thường trung thành — quay lại mỗi 3-4 tuần. Kết quả đẹp tự nhiên = nguồn thu ổn định.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Đánh giá tỷ lệ bạc: <30%, 30-50%, 50-75%, >75%.\n- Tỷ lệ > 50%: cần NN (double natural) để đủ sắc tố che.\n- Vùng bạc tập trung: thường ở thái dương và đường ngôi.\n\n## Rủi ro thường gặp\n\n- Dùng fashion shade để phủ bạc → không che đủ.\n- Oxy quá cao cho phủ bạc → kích ứng da đầu.\n- Bôi không đều vùng bạc → loang.\n\n## Gợi ý xử lý an toàn\n\n- Công thức: 50% NN + 50% N hoặc fashion tone nhẹ, oxy 6%.\n- Pre-soften vùng kháng: bôi oxy 6% lên vùng bạc trước 10 phút.\n- Để đủ 35-45 phút, không rút ngắn.\n- Bôi vùng bạc trước, phần còn lại sau 10-15 phút.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu không muốn tóc đen cứng — yêu cầu thợ dùng nâu tự nhiên và hỏi có dùng NN formula không.`
},
{
  slug:"toc-bac-khang-mau",title:"Tóc bạc kháng màu là gì và vì sao vùng thái dương khó ăn màu?",
  category:"Phủ bạc",difficulty:"advanced",readTime:8,
  image_key:"images/articles/article-toc-bac-khang-mau.webp",
  tags:JSON.stringify(["tóc bạc kháng màu","thái dương","phủ bạc","tóc bạc"]),
  excerpt:"Tóc bạc vùng thái dương thường cứng, cuticle khép chặt, khiến thuốc khó thấm. Cần pre-soften và kỹ thuật bôi riêng.",
  content:`## Tóm tắt nhanh\n\nTóc bạc kháng màu (resistant grey) có lớp cuticle khép rất chặt, sợi cứng và ít xốp. Thuốc nhuộm không thấm đủ sâu → phai nhanh hoặc không ăn.\n\n## Vì sao vấn đề này quan trọng?\n\nVùng thái dương và trán là nơi dễ thấy nhất. Phủ bạc không ăn ở đây = cả đầu thất bại.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Sờ sợi bạc: cứng, bóng, thẳng đơ = kháng màu cao.\n- Quan sát sau nhuộm: vùng thái dương phai trước = chưa ăn đủ.\n- So sánh với vùng gáy: gáy thường ăn màu tốt hơn.\n\n## Rủi ro thường gặp\n\n- Bôi đều toàn đầu → thái dương không ăn, gáy quá đậm.\n- Không pre-soften → lãng phí thuốc.\n- Oxy quá thấp (10 vol) → không mở cuticle đủ.\n\n## Gợi ý xử lý an toàn\n\n- Pre-soften: bôi oxy 6% lên vùng kháng 10 phút trước khi nhuộm.\n- Saturation kỹ: bôi đầy đủ thuốc, không tiết kiệm ở vùng bạc.\n- Dùng NN + oxy 20 vol cho vùng kháng.\n- Để thêm 5-10 phút cho vùng kháng trước khi rửa.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu vùng thái dương hay phai sau 2 tuần — yêu cầu thợ pre-soften riêng vùng này.`
},
{
  slug:"grey-blending",title:"Grey blending là gì và khác phủ bạc truyền thống thế nào?",
  category:"Grey blending",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-grey-blending.webp",
  tags:JSON.stringify(["grey blending","tóc bạc","blend bạc","ít bảo trì"]),
  excerpt:"Grey blending không che kín bạc mà hoà trộn bạc với tóc tự nhiên, tạo hiệu ứng multi-tonal. Lợi thế: ít bảo trì, regrowth mềm.",
  content:`## Tóm tắt nhanh\n\nGrey blending hoà trộn tóc bạc với phần tóc còn sắc tố, thay vì che 100% bạc. Dùng highlight, lowlight, hoặc semi-permanent.\n\n## Vì sao vấn đề này quan trọng?\n\nNhiều khách mệt mỏi với dặm chân mỗi 3-4 tuần. Grey blending giảm tần suất xuống 8-12 tuần.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Bạc < 30%: blend dễ, highlight mảnh xen kẽ.\n- Bạc 30-50%: lowlight + root blend.\n- Bạc > 50%: grey blending toàn phần, toner lạnh.\n\n## Rủi ro thường gặp\n\n- Khách quen phủ đen → chưa quen nhìn bạc lộ → cần tư vấn kỹ.\n- Blend không đều → nhìn loang.\n- Toner quá ash → tóc xám bẩn.\n\n## Gợi ý xử lý an toàn\n\n- Buổi đầu: giảm 30-40% vùng phủ, thêm highlight mảnh.\n- Buổi 2-3: giảm tiếp, thêm chiều sáng/tối.\n- Dùng semi/demi-permanent cho vùng blend → phai tự nhiên.\n- Gloss ash nhẹ toàn đầu cuối cùng.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu muốn giảm tần suất dặm chân — hỏi thợ về grey blending.`
},
{
  slug:"tone-mau-phu-bac",title:"Chọn tone màu phủ bạc: nâu tự nhiên, nâu ấm hay nâu lạnh?",
  category:"Phủ bạc",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-tone-mau-phu-bac.webp",
  tags:JSON.stringify(["tone phủ bạc","nâu tự nhiên","nâu lạnh","nâu ấm"]),
  excerpt:"Tone phủ bạc ảnh hưởng trực tiếp đến vẻ tự nhiên. Nâu tự nhiên che tốt nhất, nâu ấm mềm mại, nâu lạnh sang trọng nhưng cần nền tốt.",
  content:`## Tóm tắt nhanh\n\nPhủ bạc có 3 nhóm tone: Natural (N/NN) — che bạc tốt nhất, Warm (vàng, đồng) — mềm mại, Cool (ash, beige) — sang trọng nhưng che bạc kém hơn.\n\n## Vì sao vấn đề này quan trọng?\n\nChọn sai tone → bạc không che đủ hoặc tóc trông giả.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Skin tone ấm: nâu ấm (5.3, 5.34) sẽ hợp.\n- Skin tone lạnh: nâu lạnh (5.1, 5.11) có thể dùng.\n- Không chắc: nâu tự nhiên (5N, 5NN) là an toàn nhất.\n\n## Rủi ro thường gặp\n\n- Dùng ash để phủ bạc → không đủ sắc tố che, phai nhanh.\n- Dùng đỏ/copper mạnh → khách không quen, khó sửa.\n- Pha quá nhiều fashion shade → giảm khả năng che bạc.\n\n## Gợi ý xử lý an toàn\n\n- Công thức an toàn: 60% NN + 40% fashion shade nhẹ.\n- Test thử trên 1 vùng trước khi toàn đầu.\n- Giải thích cho khách: fashion shade đẹp nhưng che bạc kém hơn.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn phủ bạc nhưng không muốn đen — hỏi thợ tone nào phù hợp da và tỷ lệ bạc.`
},
{
  slug:"sua-loi-mau-khoi-xanh-reu",title:"Sửa lỗi màu khói bị xanh rêu: nguyên nhân và hướng xử lý",
  category:"Sửa lỗi màu",difficulty:"advanced",readTime:9,
  image_key:"images/articles/article-sua-loi-mau-khoi-xanh-reu.webp",
  tags:JSON.stringify(["sửa màu","màu khói","xanh rêu","color correction"]),
  excerpt:"Màu khói bị chuyển xanh rêu là lỗi phổ biến khi dùng ash trên nền vàng cam hoặc tóc xốp. Cần ấm hoá nhẹ thay vì tẩy thêm.",
  content:`## Tóm tắt nhanh\n\nXanh rêu xảy ra khi ash (xanh) + nền vàng = xanh rêu. Hoặc tóc xốp hút quá nhiều sắc tố xanh từ toner ash.\n\n## Vì sao vấn đề này quan trọng?\n\nĐây là ca correction phổ biến nhất với màu khói/ash. Xử lý sai (tẩy thêm) sẽ làm tệ hơn.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Xanh rêu nhẹ: chỉ thấy dưới ánh sáng tự nhiên → ấm hoá nhẹ.\n- Xanh rêu rõ: thấy rõ mọi ánh sáng → color cleanser + ấm hoá.\n- Xanh rêu + xỉn: tóc bẩn, mất độ trong → cleanser + fill ấm + nhuộm lại.\n\n## Rủi ro thường gặp\n\n- Tẩy thêm để "gỡ" xanh → chỉ làm tóc xốp hơn.\n- Quá nhiều đối màu ấm → tóc ra cam/vàng.\n- Không xử lý theo vùng → vùng xốp vẫn xanh.\n\n## Gợi ý xử lý an toàn\n\n- Ấm hoá nhẹ: mix 0.3 (gold) + 0.43 (copper gold) liều 5-10%.\n- Oxy 1.5-3%, để 20 phút, kiểm tra mỗi 10 phút.\n- Gloss acid toàn đầu để khép cuticle.\n- Xanh nhẹ: toner beige ấm có thể đủ.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nTóc đang xanh rêu — không tự sửa ở nhà. Yêu cầu thợ dùng đối màu, không tẩy thêm.`
},
{
  slug:"color-correction",title:"Color correction là gì? Khi nào cần sửa màu thay vì nhuộm chồng?",
  category:"Sửa lỗi màu",difficulty:"advanced",readTime:9,
  image_key:"images/articles/article-color-correction.webp",
  tags:JSON.stringify(["color correction","sửa màu","nhuộm chồng","nền tóc"]),
  excerpt:"Nhuộm chồng lên màu lỗi thường cho kết quả tệ hơn. Color correction cần phân tích nền, chọn đúng kỹ thuật: cleanse, fill, re-deposit.",
  content:`## Tóm tắt nhanh\n\nColor correction là phân tích lỗi màu hiện tại, xác định nền thật, và sửa bằng kỹ thuật phù hợp (cleanse → fill → re-deposit) thay vì nhuộm chồng.\n\n## Vì sao vấn đề này quan trọng?\n\nNhuộm chồng trên màu lỗi = chồng lỗi. Kết quả: xỉn hơn, đậm hơn, khó sửa hơn.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Step 1: Xác định lỗi — loang, xỉn, sai tone, banding?\n- Step 2: Đọc nền thật — gỡ lớp màu lỗi bằng cleanser.\n- Step 3: Chọn kỹ thuật — fill sắc tố thiếu, deposit màu mục tiêu.\n\n## Rủi ro thường gặp\n\n- Cố sửa trong 1 buổi → kết quả ổ.\n- Không test lọn trước → kết quả khác dự đoán.\n- Nhuộm chồng đen lên loang → tạm che nhưng loang lại khi phai.\n\n## Gợi ý xử lý an toàn\n\n- Luôn test lọn trước correction.\n- Chia thành 2-3 buổi nếu lỗi nặng.\n- Ghi lại công thức mỗi buổi.\n- Báo trước cho khách: correction cần thời gian và chi phí.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tóc bị loang/sai màu — hỏi thợ dự kiến bao nhiêu buổi và mục tiêu thực tế.`
},
{
  slug:"pre-pigment-fill",title:"Pre-pigment fill là gì khi hạ sáng hoặc đưa tóc về nâu?",
  category:"Sửa lỗi màu",difficulty:"advanced",readTime:8,
  image_key:"images/articles/article-pre-pigment-fill.webp",
  tags:JSON.stringify(["pre pigment","fill màu","hạ sáng","tóc xốp"]),
  excerpt:"Khi đưa tóc sáng về nâu/đen, cần fill sắc tố ấm trước. Không fill → tóc ra xanh rêu hoặc xám bẩn sau vài lần gội.",
  content:`## Tóm tắt nhanh\n\nPre-pigment fill là bổ sung sắc tố ấm cho tóc đã tẩy/xốp trước khi nhuộm tối. Tóc sáng thiếu sắc tố ấm → nhuộm tối trực tiếp sẽ bị xanh/xám.\n\n## Vì sao vấn đề này quan trọng?\n\nNhiều thợ bỏ qua vì "tốn thời gian". Kết quả: khách nhuộm nâu nhưng ra xanh rêu sau 2-3 lần gội.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Tóc level 8-10 muốn về 6: fill bằng vàng cam (0.3, 0.34).\n- Tóc level 7-8 muốn về 5: fill bằng cam (0.4, 0.43).\n- Tóc level 9-10 muốn về 4-5: fill bằng đỏ cam (0.4, 0.44).\n\n## Rủi ro thường gặp\n\n- Không fill → nâu ra xanh rêu/xám sau 1-2 tuần.\n- Fill quá mạnh → nâu ra cam.\n- Fill không đều → loang.\n\n## Gợi ý xử lý an toàn\n\n- Fill: pha 0.3 hoặc 0.4 với nước, bôi đều, để 15 phút, không rửa.\n- Bôi màu mục tiêu lên trên, oxy 3-6%, để 35-40 phút.\n- Test trên 1 lọn trước.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tóc sáng muốn về nâu/đen — hỏi thợ có fill trước không.`
},
{
  slug:"mau-khong-deu",title:"Tóc nhuộm không đều màu: đọc lỗi trước khi sửa",
  category:"Sửa lỗi màu",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-mau-khong-deu.webp",
  tags:JSON.stringify(["không đều màu","loang màu","banding","sửa màu"]),
  excerpt:"Tóc không đều có thể do nền không đồng nhất, bôi thuốc không đều, hoặc thời gian xử lý sai. Phải đọc đúng lỗi trước khi sửa.",
  content:`## Tóm tắt nhanh\n\nMàu không đều có nhiều nguyên nhân: nền nhiều vùng khác nhau, bôi thuốc không đều, rửa sớm vùng này muộn vùng kia.\n\n## Vì sao vấn đề này quan trọng?\n\nSửa sai cách (nhuộm chồng, tẩy toàn bộ) sẽ làm tệ hơn.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Loang theo chiều dọc: do bôi thuốc không đều → bôi lại đều hơn.\n- Loang ngang (banding): do nền khác nhau → xử lý theo zone.\n- Đậm ngọn nhạt chân: ngọn xốp hút nhiều → pha loãng cho ngọn.\n\n## Rủi ro thường gặp\n\n- Nhuộm chồng toàn bộ → vùng đã đậm càng đậm.\n- Tẩy toàn bộ để "reset" → hư thêm.\n- Không chia zone → lặp lại lỗi cũ.\n\n## Gợi ý xử lý an toàn\n\n- Phân tích từng vùng: vẽ bản đồ nền, ghi level + tone.\n- Công thức riêng cho từng vùng.\n- Bôi theo thứ tự: vùng cần xử lý nhiều nhất trước.\n- Kiểm tra sau 20 phút, điều chỉnh thời gian.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tóc đã loang — hỏi thợ cách xử lý cụ thể, không chấp nhận "nhuộm lại cho đều".`
},
{
  slug:"bond-repair",title:"Bond repair là gì và giúp gì cho tóc sau hóa chất?",
  category:"Phục hồi",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-bond-repair.webp",
  tags:JSON.stringify(["bond repair","phục hồi tóc","tóc tẩy","liên kết tóc"]),
  excerpt:"Bond repair giúp tái tạo liên kết disulfide bị phá trong quá trình tẩy/nhuộm. Không phải phép màu, nhưng là bước quan trọng.",
  content:`## Tóm tắt nhanh\n\nBond repair (Olaplex, K18, Fibreplex...) hoạt động ở cấp liên kết hoá học bên trong sợi tóc, không chỉ phủ bề mặt như dưỡng thông thường.\n\n## Vì sao vấn đề này quan trọng?\n\nTóc sau tẩy/nhuộm mất liên kết → yếu, dễ gãy, mất đàn hồi. Bond repair giúp khôi phục phần nào cấu trúc, giữ tóc khoẻ hơn cho lần hoá chất tiếp.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Tóc mất đàn hồi: kéo không co lại = liên kết yếu.\n- Tóc khô xơ dù đã dưỡng: có thể thiếu liên kết bên trong.\n- Sau tẩy: luôn cần bond repair.\n\n## Rủi ro thường gặp\n\n- Nghĩ bond repair = có thể tẩy vô hạn → sai.\n- Dùng bond repair thay cho dưỡng ẩm → thiếu moisture.\n- Sản phẩm fake/kém chất lượng → không hiệu quả.\n\n## Gợi ý xử lý an toàn\n\n- Dùng bond protector trong lúc tẩy (step 1).\n- Dùng bond repair sau tẩy/nhuộm (step 2).\n- Duy trì tại nhà: mask bond 1-2 lần/tuần.\n- Kết hợp với dưỡng ẩm, không thay thế.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi tẩy hoặc nhuộm — hỏi thợ có dùng bond protector trong quá trình không.`
},
{
  slug:"tu-choi-hoa-chat",title:"Khi nào salon nên từ chối làm hóa chất để bảo vệ tóc khách?",
  category:"An toàn hóa chất",difficulty:"high-risk",readTime:8,
  image_key:"images/articles/article-tu-choi-hoa-chat.webp",
  tags:JSON.stringify(["từ chối hóa chất","an toàn tóc","tóc yếu","chẩn đoán tóc"]),
  excerpt:"Từ chối dịch vụ hóa chất khi tóc quá yếu là trách nhiệm chuyên môn. Làm tiếp khi tóc không đủ khoẻ sẽ gây hậu quả lớn hơn.",
  content:`## Tóm tắt nhanh\n\nCó những trường hợp tóc quá yếu, quá xốp, hoặc da đầu có vấn đề mà salon nên từ chối làm hoá chất. Đây không phải mất khách — đây là bảo vệ khách.\n\n## Vì sao vấn đề này quan trọng?\n\nLàm hoá chất trên tóc yếu có thể gây: đứt tóc, bỏng da đầu, rụng tóc, hoặc tóc nhũn không thể cứu. Rủi ro pháp lý và uy tín.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Tóc kéo không co lại, nhũn khi ướt → KHÔNG tẩy/nhuộm.\n- Da đầu đỏ, trầy, nổi mụn → KHÔNG tiếp xúc hoá chất.\n- Tóc đã tẩy >3 lần trong 3 tháng → cần phục hồi trước.\n- Khách mang thai/cho con bú: tư vấn rủi ro, không ép.\n\n## Rủi ro thường gặp\n\n- Thợ chiều khách → làm tiếp → tóc đứt → mất khách vĩnh viễn.\n- Không ghi nhận tình trạng → không có chứng cứ khi tranh cãi.\n- Khách tự tẩy ở nhà rồi đến salon sửa → tóc đã quá yếu.\n\n## Gợi ý xử lý an toàn\n\n- Từ chối lịch sự, giải thích rõ lý do.\n- Đề xuất lộ trình phục hồi 4-8 tuần.\n- Ghi nhận tình trạng (ảnh, ghi chú) nếu khách yêu cầu.\n- Hẹn lại khi tóc đủ khoẻ.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu tóc đã rất yếu/xơ — hỏi thợ có nên làm tiếp không, và tin tưởng nếu thợ nói "chưa nên".`
},
// ─── A3: 21-30 ───
{
  slug:"lo-trinh-phuc-hoi",title:"Lộ trình phục hồi tóc sau tẩy, nhuộm, uốn hoặc duỗi",
  category:"Phục hồi",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-lo-trinh-phuc-hoi.webp",
  tags:JSON.stringify(["lộ trình phục hồi","tóc hư tổn","aftercare","phục hồi tóc"]),
  excerpt:"Phục hồi tóc hư tổn không phải 1 buổi là xong. Cần lộ trình 4-8 tuần kết hợp protein, dưỡng ẩm và bảo vệ nhiệt.",
  content:`## Tóm tắt nhanh\n\nTóc hư tổn sau hoá chất cần lộ trình phục hồi kết hợp: bond repair, protein treatment, dưỡng ẩm sâu, và hạn chế nhiệt. Không có sản phẩm nào "sửa tóc ngay lập tức".\n\n## Vì sao vấn đề này quan trọng?\n\nTóc yếu mà tiếp tục làm hoá chất = đứt gãy. Phục hồi đúng cách giúp tóc đủ khoẻ cho lần nhuộm/tẩy tiếp theo.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Tuần 1-2: bond repair tại salon + mask protein tại nhà.\n- Tuần 3-4: chuyển sang dưỡng ẩm sâu (moisture mask).\n- Tuần 5-8: duy trì bond + moisture luân phiên.\n- Đánh giá lại sau 8 tuần trước khi làm hoá chất tiếp.\n\n## Rủi ro thường gặp\n\n- Chỉ dùng protein → tóc cứng, giòn (protein overload).\n- Chỉ dùng moisture → tóc nhũn, mất form.\n- Bỏ qua bảo vệ nhiệt → hư thêm.\n\n## Gợi ý xử lý an toàn\n\n- Luân phiên protein và moisture (2:1 hoặc 1:1 tuỳ tình trạng).\n- Hạn chế sấy nóng, dùng heat protectant.\n- Cắt ngọn chẻ mỗi 6-8 tuần.\n- Không tẩy/nhuộm lại trong giai đoạn phục hồi.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nSau mỗi lần tẩy/nhuộm — hỏi thợ lộ trình phục hồi cụ thể, không chỉ "về nhà dưỡng đi".`
},
{
  slug:"balayage-vs-foilyage",title:"Balayage và foilyage khác nhau thế nào?",
  category:"Balayage & highlight",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-balayage-vs-foilyage.webp",
  tags:JSON.stringify(["balayage","foilyage","highlight","kỹ thuật nhuộm"]),
  excerpt:"Balayage quét tay tự do, foilyage kết hợp quét tay + bọc foil. Kết quả: balayage mềm hơn, foilyage sáng hơn và nhanh hơn.",
  content:`## Tóm tắt nhanh\n\nBalayage là kỹ thuật quét tay tự do lên bề mặt tóc, tạo hiệu ứng sáng mềm tự nhiên. Foilyage là biến thể — quét tay rồi bọc foil để tăng lực nâng.\n\n## Vì sao vấn đề này quan trọng?\n\nChọn đúng kỹ thuật ảnh hưởng đến: mức sáng đạt được, thời gian thực hiện, và kết quả tự nhiên hay rõ nét.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Balayage: mềm, tự nhiên, regrowth ít lộ. Phù hợp khách muốn low-maintenance.\n- Foilyage: sáng hơn, rõ hơn, nâng được nhiều level hơn. Phù hợp tóc đen Việt cần sáng đáng kể.\n- Cả hai đều cần thợ có kỹ thuật tay tốt.\n\n## Rủi ro thường gặp\n\n- Balayage trên tóc đen → sáng không đủ, khách thất vọng.\n- Foilyage để foil quá lâu → spot bleaching, loang.\n- Không toner sau → vàng cam thay vì beige.\n\n## Gợi ý xử lý an toàn\n\n- Tóc đen Việt: foilyage thường cho kết quả rõ hơn balayage thuần.\n- Luôn toner sau để trung hoà ánh vàng/cam.\n- Bôi bond protector trong hỗn hợp tẩy.\n- Kiểm tra foil mỗi 15 phút.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn highlight tự nhiên — hỏi thợ nên balayage hay foilyage cho nền tóc của mình.`
},
{
  slug:"root-shadow",title:"Root shadow là gì và vì sao giúp tóc sáng ít lộ chân hơn?",
  category:"Balayage & highlight",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-root-shadow.webp",
  tags:JSON.stringify(["root shadow","shadow root","chân tóc","balayage"]),
  excerpt:"Root shadow là kỹ thuật tạo vùng tối nhẹ ở chân tóc, giúp transition mượt từ chân đến phần sáng. Giảm tần suất dặm chân.",
  content:`## Tóm tắt nhanh\n\nRoot shadow (shadow root) là bôi một lớp màu tối nhẹ ở vùng chân tóc (1-3cm) sau khi highlight/balayage, tạo transition mượt thay vì đường kẻ rõ.\n\n## Vì sao vấn đề này quan trọng?\n\nKhông có root shadow → chân tóc mọc lại sẽ lộ rõ ranh giới tối/sáng. Khách phải dặm chân sớm hơn → tốn tiền và hư tóc.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Root shadow 1-2cm: cho look tự nhiên, chân mọc 4-6 tuần mới lộ.\n- Root shadow 3-5cm: cho look "rooted", kéo dài 8-12 tuần.\n- Tone root: chọn gần với nền tự nhiên ± 1 level.\n\n## Rủi ro thường gặp\n\n- Root quá đậm → đường kẻ rõ thay vì blend mềm.\n- Root quá ngắn → không đủ transition.\n- Tone root khác xa nền tự nhiên → vẫn lộ chân.\n\n## Gợi ý xử lý an toàn\n\n- Dùng demi-permanent cho root → phai mềm, không tạo line.\n- Blend root xuống thân bằng cọ ướt hoặc tay.\n- Tone root nên ấm hơn highlight 1 bậc để tạo chiều sâu.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi làm highlight/balayage — hỏi thợ có root shadow không. Nếu không, hỏi vì sao.`
},
{
  slug:"toner-sau-balayage",title:"Toner sau balayage: vì sao quyết định màu cuối cùng?",
  category:"Balayage & highlight",difficulty:"advanced",readTime:8,
  image_key:"images/articles/article-toner-sau-balayage.webp",
  tags:JSON.stringify(["toner","balayage","khử vàng","beige ash"]),
  excerpt:"Toner là bước cuối quyết định tone màu: beige, ash, champagne hay platinum. Không toner đúng = balayage đẹp nhưng vàng cam.",
  content:`## Tóm tắt nhanh\n\nSau khi tẩy/balayage, tóc thường ở nền vàng-vàng cam. Toner trung hoà ánh không muốn và đưa tóc về tone mục tiêu: beige, ash, silver, champagne...\n\n## Vì sao vấn đề này quan trọng?\n\nBalayage đẹp hay xấu 50% do toner. Tẩy xong nền vàng cam mà không toner = khách đi về với tóc vàng cháy.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Nền vàng cam (level 7-8): toner beige hoặc ash + chút violet.\n- Nền vàng (level 8-9): toner ash nhẹ hoặc champagne.\n- Nền vàng nhạt (level 9-10): toner silver, platinum, hoặc pastel.\n- Oxy: 1.5-3% cho deposit, không nâng thêm.\n\n## Rủi ro thường gặp\n\n- Toner quá ash trên nền cam → xanh rêu.\n- Toner để quá lâu → quá đậm, mất chiều sáng.\n- Không toner → vàng cam, khách không hài lòng.\n\n## Gợi ý xử lý an toàn\n\n- Chọn toner theo nền thật, không theo swatch.\n- Oxy 1.5-3%, để 15-25 phút, kiểm tra mỗi 10 phút.\n- Rinse khi đạt — đừng "thêm vài phút cho chắc".\n- Có thể layer toner: lần 1 trung hoà, lần 2 lên tone.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn tone cụ thể (beige, ash, silver) — hỏi thợ dùng toner gì và dự kiến kết quả trên nền tóc mình.`
},
{
  slug:"patch-test",title:"Patch test trước khi nhuộm: bước nhỏ nhưng tránh rủi ro lớn",
  category:"An toàn hóa chất",difficulty:"basic",readTime:6,
  image_key:"images/articles/article-patch-test.webp",
  tags:JSON.stringify(["patch test","dị ứng thuốc nhuộm","an toàn","da đầu"]),
  excerpt:"Patch test 48 giờ trước khi nhuộm giúp phát hiện dị ứng PPD/PTD. Bước nhỏ nhưng có thể tránh phản ứng nghiêm trọng.",
  content:`## Tóm tắt nhanh\n\nPatch test là bôi một lượng nhỏ thuốc nhuộm lên da (thường sau tai hoặc cổ tay) và chờ 48 giờ. Nếu không có phản ứng (đỏ, ngứa, sưng), thuốc an toàn để dùng.\n\n## Vì sao vấn đề này quan trọng?\n\nDị ứng PPD (thành phần phổ biến trong thuốc nhuộm) có thể gây: phù mặt, bỏng da đầu, sốc phản vệ. Một số ca nặng phải nhập viện.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Khách lần đầu nhuộm: patch test bắt buộc.\n- Khách đổi thương hiệu thuốc: patch test lại.\n- Khách có tiền sử dị ứng da: patch test + tư vấn bác sĩ.\n\n## Rủi ro thường gặp\n\n- Bỏ qua patch test → dị ứng nặng, rủi ro pháp lý.\n- Test sai (bôi quá ít, chờ không đủ 48h) → âm tính giả.\n- Thuốc khác batch/lot có thể cho kết quả khác.\n\n## Gợi ý xử lý an toàn\n\n- Bôi 1 giọt nhỏ sau tai, không rửa trong 48 giờ.\n- Nếu đỏ/ngứa/sưng: KHÔNG dùng thuốc đó.\n- Ghi lại kết quả vào hồ sơ khách.\n- Nếu khách từ chối test: ghi nhận bằng văn bản.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nLần đầu nhuộm hoặc đổi salon — yêu cầu patch test. Nếu salon từ chối test, cân nhắc.`
},
{
  slug:"da-dau-nhan-cam",title:"Da đầu nhạy cảm trước khi nhuộm: salon cần kiểm tra gì?",
  category:"Da đầu",difficulty:"intermediate",readTime:7,
  image_key:"images/articles/article-da-dau-nhan-cam.webp",
  tags:JSON.stringify(["da đầu nhạy cảm","nhuộm tóc","an toàn da đầu","patch test"]),
  excerpt:"Da đầu nhạy cảm cần được đánh giá trước mọi dịch vụ hoá chất. Bỏ qua bước này có thể gây bỏng, ngứa hoặc viêm.",
  content:`## Tóm tắt nhanh\n\nDa đầu nhạy cảm có thể do: viêm da, vảy nến, tổn thương do gãi, hoặc phản ứng với hoá chất trước đó. Cần đánh giá trước khi bôi bất cứ thứ gì.\n\n## Vì sao vấn đề này quan trọng?\n\nHoá chất trên da đầu đã tổn thương sẽ gây đau, bỏng, và có thể viêm nhiễm. Salon chịu trách nhiệm nếu không kiểm tra trước.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Kiểm tra da đầu bằng mắt trước khi bắt đầu.\n- Hỏi: có ngứa, đỏ, trầy xước không?\n- Có vết thương hở → KHÔNG làm hoá chất.\n- Da đầu khô, bong → cân nhắc pre-treatment.\n\n## Rủi ro thường gặp\n\n- Bôi tẩy lên da đầu trầy → bỏng hoá chất.\n- Khách nói "không sao" nhưng da đầu có vấn đề → thợ phải tự kiểm tra.\n- Dùng oxy cao (30-40 vol) trên da nhạy → rát, đỏ.\n\n## Gợi ý xử lý an toàn\n\n- Bôi petroleum jelly quanh chân tóc.\n- Dùng scalp protector trước khi tẩy.\n- Giảm oxy (dùng 20 vol thay 30 vol) nếu da nhạy.\n- Không gội trước nhuộm — dầu tự nhiên bảo vệ da đầu.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu da đầu hay ngứa hoặc nhạy cảm — báo thợ trước. Đừng chờ đến khi rát mới nói.`
},
{
  slug:"rung-toc-sau-hoa-chat",title:"Rụng tóc sau hóa chất: phân biệt gãy tóc và rụng từ chân",
  category:"Da đầu & tóc yếu",difficulty:"advanced",readTime:8,
  image_key:"images/articles/article-rung-toc-sau-hoa-chat.webp",
  tags:JSON.stringify(["rụng tóc","gãy tóc","hóa chất","tóc yếu"]),
  excerpt:"Rụng tóc sau hoá chất có 2 dạng: gãy giữa thân (do hư tổn cấu trúc) và rụng từ chân (do kích ứng nang). Phân biệt đúng mới xử lý đúng.",
  content:`## Tóm tắt nhanh\n\nGãy tóc: sợi tóc đứt ở giữa, đầu gãy không có gốc trắng. Rụng từ chân: sợi tóc rơi có gốc trắng (nang tóc). Hai vấn đề cần xử lý khác nhau.\n\n## Vì sao vấn đề này quan trọng?\n\nGãy tóc = hư tổn cấu trúc → cần phục hồi bond + cắt. Rụng từ chân = vấn đề nang tóc/da đầu → có thể cần gặp bác sĩ.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Kiểm tra sợi tóc rụng: có gốc trắng không?\n- Gốc trắng = rụng nang → tham khảo bác sĩ da liễu.\n- Không có gốc = gãy → bond repair + giảm hoá chất.\n- Rụng đều toàn đầu vs rụng vùng: khác nhau về nguyên nhân.\n\n## Rủi ro thường gặp\n\n- Nhầm gãy tóc với rụng tóc → xử lý sai.\n- Tiếp tục hoá chất khi tóc đang gãy nhiều → nặng hơn.\n- Không ghi nhận tình trạng → không theo dõi được.\n\n## Gợi ý xử lý an toàn\n\n- Gãy tóc: dừng hoá chất, bond repair, cắt phần hư.\n- Rụng từ chân: ngưng hoá chất, tham khảo bác sĩ.\n- Cả hai: dùng dầu gội dịu nhẹ, không gội nước nóng.\n- Ghi nhận số lượng tóc rụng/ngày để theo dõi.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nNếu đang rụng tóc nhiều — báo thợ và yêu cầu kiểm tra trước khi làm bất cứ dịch vụ hoá chất nào.`
},
{
  slug:"nau-lanh-nen-den",title:"Nâu lạnh trên nền đen: kỳ vọng thật và lộ trình an toàn",
  category:"Nhuộm màu",difficulty:"intermediate",readTime:8,
  image_key:"images/articles/article-nau-lanh-nen-den.webp",
  tags:JSON.stringify(["nâu lạnh","nền đen","tóc Việt","nhuộm màu"]),
  excerpt:"Nâu lạnh trên tóc đen Việt cần nâng nền trước. Nhuộm phủ trực tiếp sẽ không thấy được ánh lạnh — chỉ thấy nâu đen.",
  content:`## Tóm tắt nhanh\n\nTóc đen (level 1-3) muốn ra nâu lạnh (ash brown) cần nâng nền lên ít nhất level 5-6. Nhuộm phủ trực tiếp sẽ không hiện ánh lạnh vì nền quá tối.\n\n## Vì sao vấn đề này quan trọng?\n\nKhách mang ảnh nâu lạnh đến salon nhưng không biết tóc mình cần nâng nền trước. Thợ cần giải thích rõ để đặt kỳ vọng đúng.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Nền đen virgin: cần tẩy nhẹ hoặc high-lift color lên level 5-6.\n- Nền đen nhuộm: khó nâng hơn, có thể cần color remover trước.\n- Target nâu lạnh: 6.1, 6.11, hoặc 6 + 0.1 additive.\n\n## Rủi ro thường gặp\n\n- Nhuộm phủ ash trực tiếp lên đen → không thấy gì, lãng phí.\n- Nâng quá mạnh → hư tóc chỉ để ra nâu.\n- Không trung hoà cam ở level 5 → nâu ra nâu ấm thay vì lạnh.\n\n## Gợi ý xử lý an toàn\n\n- Pre-lighten lên level 6 bằng oxy 20-30 vol + bond protector.\n- Toner nâu lạnh sau khi nền đạt.\n- Giải thích cho khách: nâu lạnh trên đen cần ít nhất 2 bước.\n- Lần đầu có thể chưa lạnh hoàn hảo — cần dặm toner.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn nâu lạnh từ tóc đen — hỏi thợ có cần nâng nền không và bao nhiêu bước.`
},
{
  slug:"beige-ash-lo-trinh",title:"Beige ash cần lộ trình thế nào để không bị vàng cam?",
  category:"Nhuộm màu",difficulty:"advanced",readTime:9,
  image_key:"images/articles/article-beige-ash-lo-trinh.webp",
  tags:JSON.stringify(["beige ash","vàng cam","nâng nền","toner"]),
  excerpt:"Beige ash là màu đòi hỏi nền level 8-9. Từ tóc đen Việt cần lộ trình 2-3 buổi: nâng nền dần + toner chính xác.",
  content:`## Tóm tắt nhanh\n\nBeige ash yêu cầu nền vàng nhạt (level 8-9). Tóc đen Việt (level 1-3) cần nâng 5-7 level — không thể an toàn trong 1 buổi.\n\n## Vì sao vấn đề này quan trọng?\n\nBeige ash là một trong những màu được yêu cầu nhiều nhất nhưng cũng gây thất vọng nhiều nhất nếu thợ không giải thích lộ trình.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Buổi 1: tẩy lên level 6-7, bond repair, hẹn 3 tuần.\n- Buổi 2: tẩy lên level 8-9, toner beige ash.\n- Buổi 3 (nếu cần): toner lại hoặc gloss.\n- Tổng: 6-8 tuần, 2-3 buổi.\n\n## Rủi ro thường gặp\n\n- Ép nâng lên 9 trong 1 buổi → tóc nhũn/đứt.\n- Toner beige trên nền 6-7 → ra nâu, không ra beige.\n- Không maintenance → phai thành vàng cam.\n\n## Gợi ý xử lý an toàn\n\n- Kiên nhẫn theo lộ trình, không cắt bớt buổi.\n- Dùng bond protector trong mỗi lần tẩy.\n- Toner: beige + chút violet để counteract vàng.\n- Maintenance: violet shampoo 1-2 lần/tuần.\n- Gloss salon mỗi 4-6 tuần.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn beige ash — hỏi thợ cần bao nhiêu buổi, chi phí tổng, và liệu tóc mình có đủ khoẻ để tẩy.`
},
{
  slug:"pastel-ky-thuat",title:"Màu pastel: vì sao đẹp nhưng là nhóm kỹ thuật rủi ro cao?",
  category:"Màu nâng cao",difficulty:"high-risk",readTime:9,
  image_key:"images/articles/article-pastel-ky-thuat.webp",
  tags:JSON.stringify(["pastel","màu sáng","tẩy tóc","kỹ thuật cao"]),
  excerpt:"Màu pastel (hồng nhạt, tím nhạt, xanh baby) yêu cầu nền level 9-10, gần trắng. Đây là nhóm kỹ thuật rủi ro cao nhất trong salon.",
  content:`## Tóm tắt nhanh\n\nMàu pastel cần nền gần trắng (level 9-10) để hiện đúng tone. Từ tóc đen Việt, cần 3-4 lần tẩy trong 2-3 tháng. Tóc phải cực khoẻ hoặc sẽ hỏng.\n\n## Vì sao vấn đề này quan trọng?\n\nPastel là trend phổ biến trên mạng nhưng phần lớn ảnh trên Pinterest/Instagram là tóc Caucasian hoặc wig. Tóc Việt đen đặc cần lộ trình rất dài và rủi ro cao.\n\n## Cách Tóc Việt Lab đọc tình trạng này\n\n- Nền hiện tại level 1-3: cần 3-4 buổi tẩy, mỗi buổi cách 3-4 tuần.\n- Nền hiện tại level 7-8: có thể pastel sau 1-2 buổi.\n- Tóc đã xốp/yếu: KHÔNG nên làm pastel.\n- Test đàn hồi bắt buộc trước mỗi buổi.\n\n## Rủi ro thường gặp\n\n- Ép tẩy lên 10 nhanh → tóc tan, đứt, nhũn.\n- Pastel trên nền 7-8 → ra pastel bẩn, không trong.\n- Khách không biết pastel phai rất nhanh (2-4 tuần) → thất vọng.\n\n## Gợi ý xử lý an toàn\n\n- Lộ trình rõ ràng: số buổi, chi phí, thời gian.\n- Bond protector trong mọi lần tẩy.\n- Pastel = semi-permanent → phai nhanh, cần redo.\n- Giải thích rõ: pastel là "high maintenance" color.\n- Nếu tóc không đủ khoẻ → từ chối, đề xuất màu khác.\n\n## Khi nào nên hỏi thợ trước khi làm?\n\nKhi muốn pastel — hỏi thợ: tóc mình có đủ khoẻ không, cần bao lâu, và có thay thế nào ít rủi ro hơn không.`
},
];
