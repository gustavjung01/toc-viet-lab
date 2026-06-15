ALTER TABLE `formulas` ADD COLUMN `slug` text;--> statement-breakpoint
ALTER TABLE `formulas` ADD COLUMN `excerpt` text;--> statement-breakpoint
ALTER TABLE `formulas` ADD COLUMN `content` text;--> statement-breakpoint
ALTER TABLE `formulas` ADD COLUMN `difficulty` text DEFAULT 'intermediate';--> statement-breakpoint
ALTER TABLE `formulas` ADD COLUMN `read_time` integer;--> statement-breakpoint
UPDATE `formulas` SET
  `slug` = 'lanh-khoi-anh-reu',
  `excerpt` = 'Công thức lạnh khói rêu cho nền vàng cam level 6, phù hợp balayage hoặc phần thân ngọn cần trung hòa ấm.',
  `content` = '## Khi nào dùng
Dùng cho nền level 6 có ánh vàng cam khi khách muốn tông lạnh nhưng không muốn màu bị xanh rêu gắt.

## Công thức tham khảo
- **Màu chính:** 7.1 + 7.2 + 0.11.
- **Tỷ lệ gợi ý:** 60% 7.1, 30% 7.2, 10% 0.11.
- **Oxy:** 6% / 20 vol.

## Lưu ý kỹ thuật
- Nền quá cam đỏ cần xử lý nền trước.
- Ngọn tóc xốp có thể hút 0.11 nhanh hơn thân tóc.',
  `difficulty` = 'advanced',
  `read_time` = 7,
  `image_key` = 'images/formulas/formula-lanh-khoi-anh-reu.png'
WHERE `title` = 'Lạnh khói ánh rêu';--> statement-breakpoint
UPDATE `formulas` SET
  `slug` = 'beige-sua-lanh',
  `excerpt` = 'Tông beige sáng, mềm và ít chói cho nền vàng nhạt level 8, hợp tóc Việt đã nâng nền sạch.',
  `content` = '## Khi nào dùng
Dùng khi tóc đã đạt level 8 vàng nhạt, nền tương đối sạch và khách muốn màu sáng nhưng vẫn sang.

## Công thức tham khảo
- **Màu chính:** 9.13 + 9.1 + clear.
- **Tỷ lệ gợi ý:** 50% 9.13, 30% 9.1, 20% clear.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Không dùng quá nhiều ash nếu muốn giữ sắc sữa.
- Nếu nền level 9, thêm clear để màu không bị đậm.',
  `difficulty` = 'intermediate',
  `read_time` = 6,
  `image_key` = 'images/formulas/formula-beige-sua-lanh.png'
WHERE `title` = 'Beige sữa lạnh';--> statement-breakpoint
UPDATE `formulas` SET
  `slug` = 'nau-tra-sua',
  `excerpt` = 'Tông nâu trà sữa dễ ứng dụng, hợp nền level 7 vàng và khách cần màu bền, tự nhiên, sáng da.',
  `content` = '## Khi nào dùng
Phù hợp khách muốn màu nhẹ, dễ chăm sóc, không cần tẩy quá sáng và có thể đi làm hằng ngày.

## Công thức tham khảo
- **Màu chính:** 7.13 + 7.0 + 8.3.
- **Tỷ lệ gợi ý:** 50% 7.13, 30% 7.0, 20% 8.3.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Nếu nền còn cam, thêm một lượng nhỏ ash/rêu để cân bằng.
- Nếu tóc bạc trên 30%, tăng base tự nhiên.',
  `difficulty` = 'basic',
  `read_time` = 5,
  `image_key` = 'images/formulas/formula-nau-tra-sua.png'
WHERE `title` = 'Nâu trà sữa';--> statement-breakpoint
INSERT OR IGNORE INTO `formulas` (`id`, `slug`, `title`, `excerpt`, `content`, `tag`, `base`, `developer`, `ratio`, `note`, `difficulty`, `read_time`, `image_key`, `published`) VALUES
('formula-nau-lanh-khoi', 'nau-lanh-khoi-khu-cam-nen-5', 'Nâu lạnh khói khử cam nền 5', 'Xử lý nền 5 còn cam đỏ để ra nâu lạnh có chiều sâu, không bị xanh rêu bẩn.', '## Khi nào dùng
Dùng cho tóc nền 5 còn cam đỏ sau nâng tông hoặc sau khi phai từ màu nâu ấm.

## Công thức tham khảo
- **Màu chính:** 6.1 + 5.0 + 0.11.
- **Tỷ lệ gợi ý:** 60% 6.1, 30% 5.0, 10% 0.11.
- **Oxy:** 6% / 20 vol.

## Lưu ý kỹ thuật
- Không kỳ vọng ra khói sáng nếu nền vẫn ở level 5.
- Nếu tóc từng phủ đen, test strand trước.', 'Sửa lỗi màu', 'Level 5 - nền cam đỏ', '6% / 20 vol', '1 : 1.2', 'Ưu tiên cân bằng nền trước, không dồn ash quá mạnh trên nền đỏ cam.', 'advanced', 8, 'images/formulas/formula-nau-lanh-khoi.png', 1),
('formula-ash-beige-highlight', 'ash-beige-highlight-nen-8', 'Ash beige highlight nền 8', 'Toner ash beige cho highlight nền 8 đến 9, giữ độ trong nhưng vẫn làm dịu vàng.', '## Khi nào dùng
Dùng sau khi nâng highlight lên level 8 đến 9, nền còn vàng sáng và cần chuyển sang beige lạnh tự nhiên.

## Công thức tham khảo
- **Màu chính:** 9.1 + 9.13 + clear.
- **Tỷ lệ gợi ý:** 40% 9.1, 40% 9.13, 20% clear.
- **Oxy:** 1.5% đến 3%.

## Lưu ý kỹ thuật
- Nếu nền level 9 rất sáng, tăng clear để tránh xám.
- Không dùng oxy cao vì có thể làm nền tối bị ấm thêm.', 'Highlight', 'Level 8-9 - nền vàng sáng', '1.5% - 3%', '1 : 2', 'Dùng oxy thấp để gửi tone, tránh làm highlight bị xám lì.', 'intermediate', 6, 'images/formulas/formula-ash-beige-highlight.png', 1),
('formula-nau-socola-phuc-hoi', 'nau-socola-phuc-hoi-toc-tay-xop', 'Nâu socola phục hồi tóc tẩy xốp', 'Công thức đưa tóc tẩy xốp về nâu socola mềm, có chiều sâu và dễ chăm sóc sau dịch vụ.', '## Khi nào dùng
Dùng khi khách có tóc tẩy sáng, xốp, phai màu nhanh và muốn quay về tông nâu dễ chăm sóc hơn.

## Công thức tham khảo
- **Bù nền:** 7.34 hoặc filler cam vàng loãng tùy nền.
- **Màu chính:** 6.7 + 6.0 + 5.3.
- **Oxy:** 3% / 10 vol.

## Lưu ý kỹ thuật
- Không hạ màu trực tiếp bằng nâu lạnh trên tóc tẩy xốp.
- Nếu tóc quá yếu, ưu tiên phục hồi trước.', 'Phục hồi màu', 'Level 8-9 - tóc tẩy xốp', '3% / 10 vol', '1 : 1.5', 'Cần bù nền ấm nhẹ trước khi hạ màu để tránh nâu bị xanh hoặc xỉn.', 'advanced', 8, 'images/formulas/formula-nau-socola-phuc-hoi.png', 1);--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `formulas_slug_unique` ON `formulas` (`slug`);