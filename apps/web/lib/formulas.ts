export type FormulaDifficulty = "basic" | "intermediate" | "advanced";

export type PublicFormula = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  base: string;
  developer: string;
  ratio: string;
  note: string;
  imageKey: string;
  difficulty: FormulaDifficulty;
  readTime: number;
  published?: boolean | number;
  createdAt?: string | number | null;
};

export const publicFormulaLibrary: PublicFormula[] = [
  {
    id: "formula-lanh-khoi-anh-reu",
    slug: "lanh-khoi-anh-reu",
    title: "Lạnh khói ánh rêu",
    excerpt: "Công thức lạnh khói rêu cho nền vàng cam level 6, phù hợp balayage hoặc phần thân ngọn cần trung hòa ấm.",
    tag: "Balayage",
    base: "Level 6 - nền vàng cam",
    developer: "6% / 20 vol",
    ratio: "1 : 1.5",
    note: "Khử vàng nhẹ phần thân, giữ khói ở ngọn. Luôn test strand nếu tóc xốp hoặc từng phủ đen.",
    imageKey: "images/formulas/formula-lanh-khoi-anh-reu.png",
    difficulty: "advanced",
    readTime: 7,
    content: `## Khi nào dùng
Công thức này hợp với nền level 6 có ánh vàng cam, đặc biệt khi khách muốn tông lạnh nhưng không muốn màu bị xanh rêu gắt.

## Mục tiêu màu
- Tạo hiệu ứng khói lạnh có ánh rêu nhẹ.
- Hạ cảm giác cam ở thân tóc mà vẫn giữ chiều sâu.
- Phù hợp balayage, ombre hoặc phần ngọn đã nâng sáng không đều.

## Công thức tham khảo
- **Màu chính:** 7.1 + 7.2 + 0.11.
- **Tỷ lệ gợi ý:** 60% 7.1, 30% 7.2, 10% 0.11.
- **Oxy:** 6% / 20 vol nếu cần vừa gửi màu vừa bám màu trên nền level 6.
- **Tỷ lệ pha:** 1 : 1.5.

## Quy trình
- Làm sạch tóc, lau khô 70% nếu dùng dòng toner/nhuộm bán vĩnh viễn.
- Bôi thân và ngọn trước ở vùng còn cam nhiều.
- Canh màu mỗi 5 đến 7 phút, không để công thức lạnh nằm quá lâu trên phần tóc xốp.
- Xả khi ánh cam dịu xuống và màu vẫn còn độ trong.

## Lưu ý kỹ thuật
- Nền quá cam đỏ cần xử lý nền trước, không nên ép bằng xanh/rêu quá mạnh.
- Ngọn tóc xốp có thể hút 0.11 nhanh hơn thân tóc.
- Nếu nền level 7 trở lên, giảm oxy xuống 3% để màu mềm hơn.`
  },
  {
    id: "formula-beige-sua-lanh",
    slug: "beige-sua-lanh",
    title: "Beige sữa lạnh",
    excerpt: "Tông beige sáng, mềm và ít chói cho nền vàng nhạt level 8, hợp tóc Việt đã nâng nền sạch.",
    tag: "Nhuộm toàn bộ",
    base: "Level 8 - nền vàng nhạt",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Tạo be sáng, cân bằng rêu nhẹ. Giữ thời gian ngắn nếu nền xốp.",
    imageKey: "images/formulas/formula-beige-sua-lanh.png",
    difficulty: "intermediate",
    readTime: 6,
    content: `## Khi nào dùng
Dùng khi tóc đã đạt level 8 vàng nhạt, nền tương đối sạch và khách muốn màu sáng nhưng vẫn sang, không bị vàng gắt.

## Mục tiêu màu
- Beige sữa có độ lạnh nhẹ.
- Giữ cảm giác mềm, không bị xám đục.
- Hợp nền tóc đã tẩy hoặc nâng tông 1 đến 2 lần.

## Công thức tham khảo
- **Màu chính:** 9.13 + 9.1 + clear.
- **Tỷ lệ gợi ý:** 50% 9.13, 30% 9.1, 20% clear.
- **Oxy:** 3% / 10 vol.
- **Tỷ lệ pha:** 1 : 1.5.

## Quy trình
- Kiểm tra nền: nếu còn vàng cam, cần tiền xử lý nhẹ trước.
- Bôi đều từ vùng tối hơn đến vùng sáng hơn.
- Theo dõi liên tục vì beige có thể chuyển xám nhanh trên tóc xốp.
- Xả bằng nước mát, dùng phục hồi acid hoặc mask khóa màu.

## Lưu ý kỹ thuật
- Không dùng quá nhiều ash nếu muốn giữ sắc sữa.
- Nếu khách da ấm, tăng 9.13 và giảm 9.1.
- Nếu nền level 9, nên thêm clear để màu không bị đậm hơn mong muốn.`
  },
  {
    id: "formula-nau-tra-sua",
    slug: "nau-tra-sua",
    title: "Nâu trà sữa",
    excerpt: "Tông nâu trà sữa dễ ứng dụng, hợp nền level 7 vàng và khách cần màu bền, tự nhiên, sáng da.",
    tag: "Nhuộm toàn bộ",
    base: "Level 7 - nền vàng",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Tông tự nhiên, phù hợp da ấm. Có thể tăng nâu tự nhiên nếu tóc bạc nhẹ.",
    imageKey: "images/formulas/formula-nau-tra-sua.png",
    difficulty: "basic",
    readTime: 5,
    content: `## Khi nào dùng
Công thức này phù hợp khách muốn màu nhẹ, dễ chăm sóc, không cần tẩy quá sáng và có thể đi làm hằng ngày.

## Mục tiêu màu
- Nâu sữa mềm, sáng hơn nâu chocolate.
- Giữ độ tự nhiên, không quá lạnh.
- Bền màu hơn các tông khói sáng.

## Công thức tham khảo
- **Màu chính:** 7.13 + 7.0 + 8.3.
- **Tỷ lệ gợi ý:** 50% 7.13, 30% 7.0, 20% 8.3.
- **Oxy:** 3% / 10 vol trên nền đã đủ sáng.
- **Tỷ lệ pha:** 1 : 1.5.

## Quy trình
- Chia tóc thành 4 khu vực để kiểm soát đều màu.
- Bôi vùng thân và ngọn trước nếu chân tóc còn tự nhiên.
- Với tóc đã nâng nền đều, có thể bôi toàn đầu và kiểm tra sau 15 phút.
- Xả khi màu đạt độ sữa mong muốn.

## Lưu ý kỹ thuật
- Nếu nền còn cam, thêm một lượng nhỏ ash/rêu để cân bằng.
- Nếu tóc bạc trên 30%, tăng base tự nhiên.
- Không nên nâng nền quá sáng vì màu dễ bị trong và thiếu chiều sâu.`
  },
  {
    id: "formula-nau-lanh-khoi",
    slug: "nau-lanh-khoi-khu-cam-nen-5",
    title: "Nâu lạnh khói khử cam nền 5",
    excerpt: "Xử lý nền 5 còn cam đỏ để ra nâu lạnh có chiều sâu, không bị xanh rêu bẩn.",
    tag: "Sửa lỗi màu",
    base: "Level 5 - nền cam đỏ",
    developer: "6% / 20 vol",
    ratio: "1 : 1.2",
    note: "Ưu tiên cân bằng nền trước, không dồn ash quá mạnh trên nền đỏ cam.",
    imageKey: "images/formulas/formula-nau-lanh-khoi.png",
    difficulty: "advanced",
    readTime: 8,
    content: `## Khi nào dùng
Dùng cho tóc nền 5 còn cam đỏ sau nâng tông hoặc sau khi phai từ màu nâu ấm, khách muốn chuyển sang nâu lạnh nhưng không muốn tẩy sáng hơn.

## Mục tiêu màu
- Giảm cam đỏ rõ rệt.
- Tạo nâu lạnh có chiều sâu ở level 5 đến 6.
- Tránh hiện tượng xanh rêu bẩn ở vùng tóc xốp.

## Công thức tham khảo
- **Màu chính:** 6.1 + 5.0 + 0.11.
- **Tỷ lệ gợi ý:** 60% 6.1, 30% 5.0, 10% 0.11.
- **Oxy:** 6% / 20 vol nếu cần mở nhẹ biểu bì và gửi màu.
- **Tỷ lệ pha:** 1 : 1.2.

## Quy trình
- Đánh giá vùng cam đỏ mạnh nhất trước khi pha.
- Bôi vùng cam đỏ trước, vùng xốp sau.
- Canh màu sát, tránh để màu lạnh phủ quá lâu ở ngọn.
- Sau khi xả, dùng sản phẩm cân bằng pH để giảm trôi màu.

## Lưu ý kỹ thuật
- Không kỳ vọng ra khói sáng nếu nền vẫn ở level 5.
- Nếu khách muốn lạnh rõ hơn, cần nâng nền lên level 6 đến 7 trước.
- Nếu tóc từng phủ đen, nên test strand trước khi làm toàn đầu.`
  },
  {
    id: "formula-ash-beige-highlight",
    slug: "ash-beige-highlight-nen-8",
    title: "Ash beige highlight nền 8",
    excerpt: "Toner ash beige cho highlight nền 8 đến 9, giữ độ trong nhưng vẫn làm dịu vàng.",
    tag: "Highlight",
    base: "Level 8-9 - nền vàng sáng",
    developer: "1.5% - 3%",
    ratio: "1 : 2",
    note: "Dùng oxy thấp để gửi tone, tránh làm highlight bị xám lì.",
    imageKey: "images/formulas/formula-ash-beige-highlight.png",
    difficulty: "intermediate",
    readTime: 6,
    content: `## Khi nào dùng
Dùng sau khi nâng highlight lên level 8 đến 9, nền còn vàng sáng và cần chuyển sang beige lạnh tự nhiên.

## Mục tiêu màu
- Làm dịu ánh vàng trên highlight.
- Giữ độ sáng và độ trong.
- Không làm nền tối bị lem lạnh quá nhiều.

## Công thức tham khảo
- **Màu chính:** 9.1 + 9.13 + clear.
- **Tỷ lệ gợi ý:** 40% 9.1, 40% 9.13, 20% clear.
- **Oxy:** 1.5% đến 3%.
- **Tỷ lệ pha:** 1 : 2.

## Quy trình
- Gội sạch bột tẩy và lau ráo tóc.
- Bôi toner lên phần highlight trước.
- Kéo nhanh qua vùng chuyển nếu muốn hiệu ứng mềm.
- Quan sát mỗi 3 đến 5 phút vì highlight hút tone rất nhanh.

## Lưu ý kỹ thuật
- Nếu nền highlight level 8 vàng đậm, giảm clear để tone bám rõ hơn.
- Nếu nền level 9 rất sáng, tăng clear để tránh xám.
- Không dùng oxy cao vì có thể làm nền tối bị ấm thêm.`
  },
  {
    id: "formula-nau-socola-phuc-hoi",
    slug: "nau-socola-phuc-hoi-toc-tay-xop",
    title: "Nâu socola phục hồi tóc tẩy xốp",
    excerpt: "Công thức đưa tóc tẩy xốp về nâu socola mềm, có chiều sâu và dễ chăm sóc sau dịch vụ.",
    tag: "Phục hồi màu",
    base: "Level 8-9 - tóc tẩy xốp",
    developer: "3% / 10 vol",
    ratio: "1 : 1.5",
    note: "Cần bù nền ấm nhẹ trước khi hạ màu để tránh nâu bị xanh hoặc xỉn.",
    imageKey: "images/formulas/formula-nau-socola-phuc-hoi.png",
    difficulty: "advanced",
    readTime: 8,
    content: `## Khi nào dùng
Dùng khi khách có tóc tẩy sáng, xốp, phai màu nhanh và muốn quay về tông nâu dễ chăm sóc hơn.

## Mục tiêu màu
- Hạ màu về nâu socola mềm.
- Bù sắc ấm để tránh màu bị xanh xỉn.
- Tăng cảm giác bóng và khỏe sau khi nhuộm.

## Công thức tham khảo
- **Bù nền:** 7.34 hoặc filler cam vàng loãng tùy nền.
- **Màu chính:** 6.7 + 6.0 + 5.3.
- **Tỷ lệ gợi ý:** 50% 6.7, 30% 6.0, 20% 5.3.
- **Oxy:** 3% / 10 vol.
- **Tỷ lệ pha:** 1 : 1.5.

## Quy trình
- Kiểm tra độ xốp và độ đàn hồi trước khi nhuộm.
- Nếu tóc quá rỗng sắc tố, bù nền trước rồi mới vào màu chính.
- Bôi vùng xốp sau cùng hoặc pha loãng hơn ở ngọn.
- Khóa màu bằng phục hồi acid/protein nhẹ sau khi xả.

## Lưu ý kỹ thuật
- Không hạ màu trực tiếp bằng nâu lạnh trên tóc tẩy xốp.
- Nếu tóc quá yếu, ưu tiên phục hồi trước và nhuộm ở buổi sau.
- Tư vấn khách dùng dầu gội giữ màu trong 2 tuần đầu.`
  }
];

export function slugifyFormulaTitle(title: string) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeFormula(row: any): PublicFormula {
  const title = String(row?.title ?? "Công thức màu");
  const slug = String(row?.slug ?? slugifyFormulaTitle(title));

  return {
    id: row?.id ? String(row.id) : undefined,
    slug,
    title,
    excerpt: String(row?.excerpt ?? row?.note ?? "Công thức màu đang được cập nhật nội dung chi tiết."),
    content: String(row?.content ?? ""),
    tag: String(row?.tag ?? "Công thức màu"),
    base: String(row?.base ?? ""),
    developer: String(row?.developer ?? ""),
    ratio: String(row?.ratio ?? ""),
    note: String(row?.note ?? ""),
    imageKey: String(row?.imageKey ?? row?.image_key ?? ""),
    difficulty: (row?.difficulty ?? "intermediate") as FormulaDifficulty,
    readTime: Number(row?.readTime ?? row?.read_time ?? 6),
    published: row?.published,
    createdAt: row?.createdAt ?? row?.created_at ?? null,
  };
}

export function getFallbackFormulas() {
  return publicFormulaLibrary.map(normalizeFormula);
}

export function getFallbackFormulaBySlug(slug: string) {
  return getFallbackFormulas().find((formula) => formula.slug === slug) ?? null;
}

export function filterFallbackFormulas({ q, tag, limit = 50, offset = 0 }: { q?: string | null; tag?: string | null; limit?: number; offset?: number }) {
  const needle = q?.trim().toLowerCase();
  const normalizedTag = tag?.trim();
  let rows = getFallbackFormulas();

  if (normalizedTag && normalizedTag !== "Tất cả") {
    rows = rows.filter((formula) => formula.tag === normalizedTag);
  }

  if (needle) {
    rows = rows.filter((formula) =>
      [formula.title, formula.excerpt, formula.tag, formula.base, formula.note]
        .some((value) => value.toLowerCase().includes(needle))
    );
  }

  return {
    formulas: rows.slice(offset, offset + limit),
    total: rows.length,
  };
}
