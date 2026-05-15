/**
 * Backfill content cho 4 bài articles cũ có content trống.
 * Run: node scripts/backfill-4-empty-articles.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const p = resolve(process.cwd(), ".env.local");
  const env = {};
  if (existsSync(p)) {
    for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
      const t = line.trim(); if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("="); if (i === -1) continue;
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  }
  return env;
}

const local = loadEnv();
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || local.CLOUDFLARE_ACCOUNT_ID;
const DATABASE_ID = process.env.CLOUDFLARE_D1_DATABASE_ID || local.CLOUDFLARE_D1_DATABASE_ID;
const TOKEN = process.env.CLOUDFLARE_D1_TOKEN || local.CLOUDFLARE_D1_TOKEN;
if (!ACCOUNT_ID || !DATABASE_ID || !TOKEN) { console.error("❌ Missing D1 envs"); process.exit(1); }

const API = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`;
async function q(sql, params = []) {
  const res = await fetch(API, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ sql, params }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(JSON.stringify(data.errors));
  return data.result?.[0]?.results || [];
}

const BACKFILL = [
  {
    slug: "toc-nen-5-nhuom-nau-lanh-de-bi-anh-cam",
    content: `## Tại sao tóc nền 5 nhuộm nâu lạnh lại dễ bị ánh cam?

### Nguyên nhân gốc rễ

Tóc nền level 5 chứa nhiều sắc tố vàng cam (underlying pigment). Khi nhuộm tone lạnh (ash, xám khói) mà không xử lý triệt để nền cam bên dưới, màu lạnh sẽ bị "đè" bởi cam nền, kết quả ra ánh cam không mong muốn.

### Cơ chế khoa học

- **Melanin nền 5**: eumelanin giảm nhưng pheomelanin (vàng-cam) vẫn chiếm ưu thế
- **Oxy hóa không đủ**: oxydant 6% trên nền 5 chỉ nâng được 1-2 level, chưa đủ "mở" hết cam
- **Thiếu pre-pigment xanh**: không bổ sung sắc tố xanh dương/tím để trung hòa cam trước khi phủ lạnh

### Hướng xử lý đúng

1. **Pre-lighten nền lên level 7** trước khi phủ tone lạnh
2. **Sử dụng pre-pigment fill** với sắc tố xanh dương (.1) hoặc tím (.2) 
3. **Chọn shade đậm hơn** target 1 level (ví dụ muốn 6.1 thì pha 5.1)
4. **Thêm booster xanh** 2-3cm vào công thức nhuộm chính

### Công thức tham khảo

| Bước | Sản phẩm | Tỉ lệ | Thời gian |
|------|----------|--------|-----------|
| Pre-lighten | Bột tẩy + 6% | 1:2 | 30-35 phút |
| Toner fill | 0.1 + 0.2 | 1:1 | 10 phút |
| Nhuộm chính | 6.1 + 6% | 1:1.5 | 35 phút |

### Lưu ý salon

- Luôn strand test trước khi áp dụng toàn đầu
- Tóc đã xử lý hóa chất nhiều lần cần giảm oxydant xuống 3%
- Kết hợp bond protector trong quá trình pre-lighten`
  },
  {
    slug: "tay-toc-an-toan-quy-trinh-5-buoc",
    content: `## Tẩy tóc an toàn: Quy trình 5 bước đạt nền vàng chuẩn

### Tại sao cần quy trình chuẩn?

Tẩy tóc (bleaching) là kỹ thuật có rủi ro cao nhất trong ngành nhuộm. Nếu không tuân thủ quy trình, hậu quả có thể là tóc cháy, đứt gãy, hoặc da đầu bỏng rát. Quy trình 5 bước dưới đây giúp đạt nền vàng level 8-9 an toàn.

### Bước 1: Đánh giá tình trạng tóc

- Kiểm tra độ đàn hồi (elasticity test)
- Kiểm tra độ xốp (porosity test) 
- Xác định lịch sử hóa chất trên tóc
- Strand test ở 3 vùng: gốc, thân, ngọn

### Bước 2: Chuẩn bị hỗn hợp tẩy

- **Bột tẩy chất lượng**: chọn loại có bond protector tích hợp
- **Oxydant phù hợp**: 6% cho tóc virgin, 3% cho tóc đã xử lý
- **Tỉ lệ pha**: 1:2 (bột:oxy) cho độ ẩm tối ưu
- **Thêm bond protector**: Olaplex No.1, K18 Mist, hoặc tương đương

### Bước 3: Kỹ thuật thoa

- Bắt đầu từ thân và ngọn (cách gốc 2cm)
- Gốc tóc xử lý sau 15 phút (nhiệt da đầu giúp tẩy nhanh hơn)
- Thoa đều, không chồng lớp
- Tách section mỏng (0.5cm) để đảm bảo đồng đều

### Bước 4: Kiểm soát thời gian

| Nền tóc | Thời gian max | Target level |
|---------|---------------|--------------|
| Level 2-3 | 40 phút | Level 7 |
| Level 4-5 | 35 phút | Level 8 |
| Level 6-7 | 25 phút | Level 9 |

- Check mỗi 10 phút
- KHÔNG vượt quá 45 phút bất kể mục tiêu

### Bước 5: Rửa và trung hòa

1. Rửa bột tẩy bằng nước ấm (không nóng)
2. Shampoo pH acid (4.5-5.5) để đóng cuticle
3. Áp bond treatment 5-10 phút
4. Dưỡng ẩm chuyên sâu

### Cảnh báo quan trọng

⚠️ Không tẩy lại trong vòng 2 tuần
⚠️ Tóc đã tẩy > 2 lần: KHÔNG tẩy tiếp, chỉ nhuộm đè
⚠️ Da đầu nhạy cảm: bôi dầu dừa bảo vệ trước 12h`
  },
  {
    slug: "phu-bac-tu-nhien-cho-toc-bac-50-80",
    content: `## Phủ bạc tự nhiên cho tóc bạc 50% - 80%

### Thách thức khi phủ bạc tỉ lệ cao

Tóc bạc 50-80% đặt ra thách thức lớn: sợi bạc cứng, cuticle đóng chặt, kháng thuốc nhuộm. Kỹ thuật phủ bạc tự nhiên giúp tạo hiệu ứng blend mà không cần che 100%, trông tự nhiên và dễ bảo trì.

### Tại sao chọn kỹ thuật "Grey Blending" thay vì "Grey Coverage"?

| Tiêu chí | Grey Coverage (che 100%) | Grey Blending (hòa quyện) |
|----------|--------------------------|---------------------------|
| Tự nhiên | ❌ Lộ chân tóc sau 2 tuần | ✅ Tự nhiên, mọc ra đẹp |
| Bảo trì | Mỗi 3-4 tuần | 6-8 tuần |
| Hư tổn | Cao (oxy mạnh) | Thấp (oxy nhẹ) |
| Phù hợp | Bạc < 30% | Bạc 50-80% |

### Quy trình Grey Blending

#### 1. Pre-soften sợi bạc
- Thoa oxydant 6% hoặc 9% trực tiếp lên vùng bạc nhiều
- Để 5-10 phút cho cuticle mở ra
- KHÔNG rửa, tiếp tục bước 2

#### 2. Pha công thức phủ

**Công thức chuẩn cho bạc 60-80%:**
- Base tone: 7.0 (natural) — 50%
- Tone mong muốn: 7.1 (ash) hoặc 7.73 (chocolate) — 30%
- Intensifier 0.0 (clear) — 20%
- Oxydant: 6% (20vol)
- Tỉ lệ thuốc:oxy = 1:1

#### 3. Kỹ thuật thoa

- Thoa đậm lên vùng bạc tập trung (thái dương, đỉnh đầu)
- Thoa nhẹ vùng ít bạc
- Không kéo thuốc xuống ngọn (nếu ngọn không bạc)

#### 4. Thời gian xử lý

- 35-40 phút (check từ phút 30)
- Vùng thái dương có thể cần thêm 5 phút

### Tips cho kết quả tự nhiên

1. **Chọn shade sáng hơn** target 1 level cho vùng bạc (bạc absorb đậm hơn dự kiến)
2. **Thêm warm reflect** (.3 hoặc .03) để tránh bạc phủ ra tông xanh xám
3. **Lowlight xen kẽ** ở vùng bạc ít tạo chiều sâu
4. **Recommend homecare** shampoo silver 1 lần/tuần giữ tone

### Kết quả mong đợi

- Vùng bạc 80%: phủ 70%, còn lại blend tự nhiên
- Tông màu hài hòa giữa vùng bạc và vùng tóc còn melanin
- Chân tóc mọc lại không lộ ranh giới`
  },
  {
    slug: "sua-loi-mau-khoi-bi-xanh-reu",
    content: `## Sửa lỗi màu khói bị xanh rêu: Nguyên nhân và xử lý

### Tình huống phổ biến

Khách yêu cầu nhuộm màu khói (ash/grey), nhưng kết quả ra xanh rêu (green-olive). Đây là lỗi phổ biến nhất khi thợ chưa nắm vững lý thuyết màu bổ sung.

### Nguyên nhân chính

#### 1. Nền tóc còn vàng cam
- Nền level 7 có underlying pigment vàng
- Xanh (blue ash) + Vàng (yellow base) = Xanh rêu (green)
- **Giải pháp**: nâng nền lên level 8-9 trước khi phủ ash

#### 2. Chọn sai shade
- Dùng .1 (blue ash) thay vì .11 (intense ash/violet ash) trên nền chưa đủ sáng
- Dùng shade có reflect xanh lá (.7 hoặc .17)

#### 3. Toner không đúng
- Toner quá mạnh chỉ số xanh
- Không thêm sắc tố trung hòa (tím/đỏ)

### Vòng tròn màu — hiểu để sửa

- Xanh dương (Blue) → trung hòa Cam (Orange)
- Tím (Violet) → trung hòa Vàng (Yellow)  
- Đỏ (Red) → trung hòa Xanh lá (Green) ← DÙNG ĐỂ SỬA LỖI NÀY

**Màu trung hòa của xanh rêu = Đỏ (Red)**

### Quy trình sửa lỗi

#### Phương án A: Sửa nhẹ (xanh rêu nhạt)
1. Pha color correct: shade .6 (red) + 0.0 (clear) tỉ lệ 1:3
2. Oxydant 3% (10vol), tỉ lệ 1:2
3. Thoa đều, để 10-15 phút
4. Check — khi hết ánh xanh thì rửa ngay
5. Phủ lại tone mong muốn với shade .11 (violet ash)

#### Phương án B: Sửa nặng (xanh rêu đậm)
1. Rửa màu bằng vitamin C wash hoặc color remover nhẹ
2. Đánh giá lại nền sau khi rửa
3. Pre-pigment fill với .5 (mahogany) + .6 (red) pha loãng
4. Đợi 10 phút, không rửa
5. Nhuộm lại với công thức đúng

#### Công thức sửa tham khảo

| Mức độ xanh | Sản phẩm | Tỉ lệ | Thời gian |
|-------------|----------|--------|-----------|
| Nhẹ | 8.6 + clear (1:2) + oxy 3% | 1:2 | 10 phút |
| Trung bình | 7.46 + oxy 6% | 1:1.5 | 20 phút |
| Nặng | Color remover → fill .6 → re-color | Theo SP | 45-60 phút tổng |

### Phòng ngừa lần sau

1. **Luôn test strand** trước khi phủ ash trên nền vàng
2. **Nâng nền đủ sáng** (minimum level 8 cho ash, level 9 cho grey)
3. **Chọn violet ash (.11)** thay vì blue ash (.1) trên nền còn warmth
4. **Thêm đỏ/tím neutralizer** 1-2cm vào công thức ash khi nền < level 9

### Cách giải thích với khách

> "Chị ơi, màu khói cần nền tóc rất sáng và sạch sắc tố vàng. Hôm nay nền chị còn ánh vàng nên màu khói bị lệch sang xanh. Em sẽ sửa lại miễn phí, kết quả sẽ đẹp hơn nhiều ạ."`
  },
];

console.log(`\n📝 Backfill content cho ${BACKFILL.length} bài trống...\n`);

let ok = 0, fail = 0;
for (const item of BACKFILL) {
  try {
    await q("UPDATE articles SET content = ? WHERE slug = ?", [item.content, item.slug]);
    console.log(`  ✅ ${item.slug} (${item.content.length} chars)`);
    ok++;
  } catch (e) {
    console.error(`  ❌ ${item.slug}: ${e.message || e}`);
    fail++;
  }
}

console.log(`\n✅ Done. Updated: ${ok}, Failed: ${fail}\n`);
