# Scripts — Tóc Việt Lab

Tất cả scripts đọc credentials từ `.env.local` (hoặc biến môi trường).
Yêu cầu: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_D1_DATABASE_ID`, `CLOUDFLARE_D1_TOKEN`.

---

## Database — Cases

### Dataset

**Hiện tại có đúng 30 case** được định nghĩa trong `seed-30-cases.mjs`.
Không có nguồn dữ liệu 60 case nào — con số 30 là toàn bộ dataset được lên kế hoạch.

Để thêm case mới:
1. Mở `scripts/seed-30-cases.mjs`
2. Bổ sung object vào cuối mảng `CASES` với `slug` duy nhất
3. Slug format: `tvl-{loại}-{số}`, ví dụ: `tvl-color-026`
4. Chạy lại script — `INSERT OR REPLACE` sẽ chỉ thêm record mới, không ảnh hưởng record cũ

### Scripts

| npm script | File | Mô tả |
|---|---|---|
| `npm run db:seed:cases` | `seed-30-cases.mjs` | Seed/upsert 30 case — **idempotent, an toàn chạy lại** |
| `npm run db:dedupe:cases` | `dedupe-cases.mjs` | Phát hiện và xóa duplicate (title / image key trùng) |
| `npm run db:dedupe:cases -- --dry-run` | `dedupe-cases.mjs` | Chỉ báo cáo duplicate, không xóa |
| `npm run db:reseed:cases` | `reseed-cases-clean.mjs` | **Xóa toàn bộ** cases rồi seed lại từ đầu — có confirm |
| `npm run db:reseed:cases -- --yes` | `reseed-cases-clean.mjs` | Như trên, bỏ qua confirm (dùng cho CI) |

### ID strategy

```
ID = slug (ổn định, không random)
Ví dụ: "tvl-color-001", "tvl-bleach-002", "tvl-scalp-011"

Trước đây (đã sửa): slug + "-" + Math.random() → tạo duplicate khi chạy lại
Hiện tại: INSERT OR REPLACE + stable slug → idempotent
```

### Kiểm tra nhanh số lượng

```bash
# Qua API (production)
curl https://www.tocvietlab.studio/api/cases/count

# Qua audit script (D1 trực tiếp)
node scripts/audit-cases-db.mjs
```

---

## Database — Articles

| npm script | File | Mô tả |
|---|---|---|
| `npm run db:seed` | `seed-d1.mjs` | Seed articles tổng hợp |
| — | `seed-30-articles.mjs` | Seed 30 articles kỹ thuật |
| — | `audit-articles-content.mjs` | Kiểm tra articles có content ngắn/rỗng |
| — | `backfill-4-empty-articles.mjs` | Backfill 4 articles cũ thiếu content |

---

## Assets — R2

| npm script | File | Mô tả |
|---|---|---|
| `npm run upload:assets` | `upload-assets-to-r2.mjs` | Upload local images lên R2 |
| `npm run sync:images` | `sync-assets-dot1.mjs` | Sync asset keys vào `lib/image-assets.ts` |
| — | `check-cases-cdn.mjs` | Kiểm tra ảnh case có tồn tại trên CDN không |
| — | `fix-case-extensions.mjs` | Sửa extension sai trong D1 (webp/png/jpg) |

---

## Audit / Diagnostics

| File | Mô tả |
|---|---|
| `audit-cases-db.mjs` | Full audit bảng cases: tổng số, category breakdown, duplicate detection |
| `audit-articles-content.mjs` | Audit content length của articles |
| `audit-cases-content.mjs` | Audit content length của cases |
