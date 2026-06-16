# Kế hoạch ưu tiên Frontend Vercel trước

## Quyết định hiện tại

Giai đoạn này ưu tiên đưa frontend chạy ổn trên Vercel trước.

```txt
Frontend: Vercel
Assets: Cloudflare R2 giữ như hiện tại
Backend VPS: để sau
Database: tính sau, chưa chuyển lúc này
Branch: chỉ dùng main
```

Không tách nhánh `frontend`/`backend`. Không tách repo.

## Mục tiêu

1. Public site chạy ổn trên Vercel.
2. Các trang public có fallback khi chưa có DB thật.
3. R2 vẫn giữ làm nguồn ảnh/assets.
4. Auth, payment, backend thật chưa phải trọng tâm.
5. Chưa triển khai `server/` VPS trong giai đoạn này.

## Trang ưu tiên test

```txt
/
/kien-thuc
/kien-thuc/[slug]
/case-thuc-te
/cong-thuc-mau
/cong-thuc-mau/[slug]
/tuyen-dung
/goi-thanh-vien
/cong-cu-ai
/login
```

## Env Vercel cần có

Frontend/app URL:

```env
NEXT_PUBLIC_SITE_URL=https://tocvietlab.studio
NEXT_PUBLIC_APP_URL=https://tocvietlab.studio
NEXTAUTH_URL=https://tocvietlab.studio
AUTH_URL=https://tocvietlab.studio
```

R2 giữ như hiện tại:

```env
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_R2_ACCESS_KEY_ID=...
CLOUDFLARE_R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_R2_BUCKET_NAME=toc-viet-lab
CLOUDFLARE_R2_ENDPOINT=...
NEXT_PUBLIC_ASSET_BASE_URL=...
```

D1 tạm thời: có thì API đọc D1, chưa có thì public pages phải fallback được.

```env
CLOUDFLARE_D1_DATABASE_ID=...
CLOUDFLARE_D1_TOKEN=...
```

## Việc cần làm ngay

### 1. Làm sạch local

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
git switch main
git pull origin main
git status --short
```

### 2. Test build local

```powershell
npm install
npm run build
```

Nếu build lỗi, sửa lỗi frontend trước. Không động VPS/backend.

### 3. Test local dev

```powershell
npm run dev
```

Mở:

```txt
http://localhost:3000
http://localhost:3000/cong-thuc-mau
http://localhost:3000/tuyen-dung
```

### 4. Set env trên Vercel

Vercel Project Settings -> Environment Variables.

Không commit `.env.local`. Không commit token thật.

### 5. Deploy Vercel

Build command:

```txt
npm run build
```

Framework: Next.js auto-detect.

### 6. Test production

```txt
https://tocvietlab.studio
https://tocvietlab.studio/cong-thuc-mau
https://tocvietlab.studio/cong-thuc-mau/lanh-khoi-anh-reu
https://tocvietlab.studio/tuyen-dung
https://tocvietlab.studio/goi-thanh-vien
```

## Việc tạm hoãn

```txt
server/ VPS skeleton
api.tocvietlab.studio
PostgreSQL/SQLite VPS
Payment webhook
Cron/backup VPS
Chuyển auth sang VPS
Chuyển D1 sang DB khác
```

Các phần này vẫn nằm trong `BACKEND_VPS_MIGRATION_PLAN.md` và `VPS_BACKEND_DEPLOYMENT_RUNBOOK.md`, nhưng chưa triển khai ngay.

## Nguyên tắc giai đoạn Vercel-first

1. Không thêm phụ thuộc backend VPS vào frontend.
2. Public pages phải có fallback khi thiếu DB.
3. R2 asset URL dùng `NEXT_PUBLIC_ASSET_BASE_URL`.
4. Không commit `.env.local`.
5. Không commit token thật.
6. Giữ một nhánh `main`.

## Checklist đạt mốc frontend ổn

- [ ] `npm run build` chạy thành công local.
- [ ] Vercel deploy thành công.
- [ ] Trang chủ load đúng.
- [ ] Header/mobile nav đúng.
- [ ] `/cong-thuc-mau` có dữ liệu fallback hoặc D1.
- [ ] `/cong-thuc-mau/[slug]` mở được.
- [ ] `/tuyen-dung` có fallback job list.
- [ ] R2 images load đúng hoặc fallback visual không vỡ layout.
- [ ] Không yêu cầu VPS để public site chạy.
- [ ] Không yêu cầu DB mới để public site chạy.

## Kết luận

Tạm thời đi theo hướng:

```txt
Vercel trước
R2 giữ nguyên
DB để sau
Backend VPS để sau
```

Sau khi frontend public ổn trên Vercel, mới quay lại backend VPS.
