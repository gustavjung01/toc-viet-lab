-- Seed articles
INSERT OR IGNORE INTO articles (id, slug, title, excerpt, category, difficulty, read_time, image_key, published) VALUES
('art001', 'toc-nen-5-nhuom-nau-lanh-de-bi-anh-cam', 'Vì sao tóc nền 5 nhuộm nâu lạnh dễ bị ánh cam?', 'Phân tích sắc tố nền, ánh cam và nguyên tắc kiểm soát màu lạnh trên nền tóc Việt.', 'Kỹ thuật nhuộm', 'intermediate', 8, 'images/articles/article-toc-nen-5-anh-cam.png', 1),
('art002', 'tay-toc-an-toan-quy-trinh-5-buoc', 'Tẩy tóc an toàn: Quy trình 5 bước đạt nền vàng chuẩn', 'Cách kiểm soát nền, oxy, thời gian và phục hồi trong quá trình nâng sáng.', 'Tẩy & nâng nền', 'advanced', 12, 'images/articles/article-tay-toc-an-toan.png', 1),
('art003', 'phu-bac-tu-nhien-cho-toc-bac-50-80', 'Phủ bạc tự nhiên cho tóc bạc 50% - 80%', 'Tư duy chọn nền, base tự nhiên và cách tránh sáng chân khi phủ bạc.', 'Phủ bạc', 'intermediate', 7, 'images/articles/article-phu-bac-tu-nhien.png', 1),
('art004', 'sua-loi-mau-khoi-bi-xanh-reu', 'Sửa lỗi màu khói bị xanh rêu: nguyên nhân và xử lý', 'Các tình huống màu khói lệch rêu, tóc xốp hút màu và hướng cân bằng lại.', 'Sửa lỗi màu', 'advanced', 10, 'images/articles/article-sua-loi-mau-khoi-xanh-reu.png', 1);

-- Seed cases
INSERT OR IGNORE INTO cases (id, title, description, category, before_image_key, after_image_key, formula, published) VALUES
('case001', 'Từ nền đen tự nhiên sang Beige Ash ánh khói', 'Tóc đen tự nhiên, sợi to, khô xơ nhẹ. Mục tiêu level 8–9, beige ash trong và bóng.', 'Nâng tông', 'images/cases/case-01-before-nen-den-tu-nhien.png', 'images/cases/case-01-after-beige-ash.png', 'Tẩy 2 lần + nhuộm beige ash level 9', 1),
('case002', 'Balayage xám khói trên nền nâu tự nhiên', 'Nền nâu tự nhiên, thân tóc khỏe. Hiệu ứng chuyển màu mềm, ít lộ chân.', 'Balayage', 'images/cases/case-02-before-nen-nau-tu-nhien.png', 'images/cases/case-02-after-balayage-xam-khoi.png', 'Balayage tẩy + toner xám khói', 1),
('case003', 'Phục hồi và nhuộm nâu socola cho tóc tẩy hư tổn', 'Tóc tẩy khô, xốp, thiếu bóng. Mục tiêu nâu socola mềm, giảm xơ.', 'Phục hồi', 'images/cases/case-03-before-toc-tay-hu-ton.png', 'images/cases/case-03-after-nau-socola-phuc-hoi.png', 'Phục hồi bond + nhuộm nâu socola level 5', 1);

-- Seed formulas
INSERT OR IGNORE INTO formulas (id, title, tag, base, developer, ratio, note, image_key, published) VALUES
('form001', 'Lạnh khói ánh rêu', 'Balayage', 'Level 6 - nền vàng cam', '6% / 20 vol', '1 : 1.5', 'Khử vàng nhẹ phần thân, giữ khói ở ngọn.', 'images/formulas/formula-lanh-khoi-anh-reu.png', 1),
('form002', 'Beige sữa lạnh', 'Nhuộm toàn bộ', 'Level 8 - nền vàng nhạt', '3% / 10 vol', '1 : 1.5', 'Tạo be sáng, cân bằng rêu nhẹ.', 'images/formulas/formula-beige-sua-lanh.png', 1),
('form003', 'Nâu trà sữa', 'Nhuộm toàn bộ', 'Level 7 - nền vàng', '3% / 10 vol', '1 : 1.5', 'Tông tự nhiên, phù hợp da ấm.', 'images/formulas/formula-nau-tra-sua.png', 1);
