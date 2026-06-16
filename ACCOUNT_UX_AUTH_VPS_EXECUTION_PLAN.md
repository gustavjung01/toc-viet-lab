# Kế hoạch thực thi sửa khu tài khoản, auth và chuẩn bị VPS backend

Ngày lập: 16/06/2026
Repo: `gustavjung01/toc-viet-lab`
Branch: `main`
Frontend: Vercel, root `apps/web`
Backend mục tiêu: VPS riêng, domain `api.tocvietlab.studio`
Assets: Cloudflare R2 giữ nguyên
DB hiện tại: D1 legacy còn giữ đến khi VPS backend đủ checklist cắt runtime

## 0. Nguyên tắc bám theo logic repo hiện có

Kế hoạch này nối tiếp 3 tài liệu đã có:

- `VERCEL_FRONTEND_FIRST_PLAN.md`
- `BACKEND_VPS_MIGRATION_PLAN.md`
- `VPS_BACKEND_DEPLOYMENT_RUNBOOK.md`

Quy ước bắt buộc:

```txt
- Chỉ dùng branch main.
- Không tách repo.
- Frontend vẫn deploy Vercel trước.
- Backend VPS chuẩn bị theo hướng server/ hoặc apps/api sau khi frontend account ổn.
- Không bỏ D1 env khỏi Vercel khi chưa có VPS backend thay thế đầy đủ.
- R2 không đổi.
- Không commit .env.local hoặc token thật.
```

## 1. Vấn đề hiện tại cần sửa

### 1.1 UI/account contrast lỗi nặng

Khu tài khoản đang dùng nền sáng `bg-cream`, nhiều card/input nền trắng, nhưng global body đang mặc định chữ sáng theo theme tối. Các phần không khai báo màu chữ riêng có thể bị trắng trên trắng hoặc vàng/gray quá nhạt.

Nhóm lỗi:

```txt
- AppShell chưa set text-charcoal ở root.
- text-warmgray quá nhạt trên nền trắng/cream.
- text-champagne/gold dùng làm chữ nhỏ trên nền sáng khó đọc.
- Input account thiếu text-charcoal và placeholder color rõ ràng.
- Một số page mock viết quá gấp, chưa đúng design system.
```

### 1.2 Sai ranh giới server/client

Một số page có `"use client"` nhưng import `AppShell`, trong khi `AppShell` là server component vì gọi `auth()`. Cần tách page server wrapper và client component con.

Page cần xử lý:

```txt
/settings
/so-tay
/cong-thuc-cua-toi
/ai-tu-van-mau
/credit-ai
```

### 1.3 Auth/account logic chưa đủ thật

```txt
- Tab đăng ký đang đổi label nhưng chưa tạo user thật.
- Google login chưa có plan upsert user DB rõ ràng.
- Dashboard stats đang catch lỗi DB thành số 0, dễ che lỗi thật.
- Account APIs vẫn query D1 trực tiếp, sau này cần chuyển qua VPS hoặc proxy VPS.
```

### 1.4 Backend VPS đang là hướng chuẩn bị, chưa cắt runtime ngay

Theo kế hoạch repo hiện có, không chuyển auth đầu tiên. Recruitment/quota/order nên là module backend VPS ưu tiên vì liên quan doanh thu.

## 2. Mục tiêu theo mốc ngày

### Mốc A: 16/06/2026 - 17/06/2026

Mục tiêu: sửa account UI để preview đọc được ngay, chưa động backend.

Việc làm:

```txt
1. AppShell: set root `bg-cream text-charcoal`.
2. Thêm màu/tokens cho nền sáng:
   - mutedLight
   - goldText
   - surfaceLight nếu cần
3. Chuẩn hóa input account:
   - text-charcoal
   - placeholder:text-mutedLight/70
   - bg-white
   - disabled:bg-black/[0.03]
4. Thay text-warmgray trên nền sáng bằng text-mutedLight hoặc text-charcoal/70.
5. Rewrite /credit-ai từ one-line JSX thành page rõ layout.
6. Giữ các khối tối dùng text-white/text-white/70 như hiện tại.
```

File dự kiến sửa:

```txt
apps/web/tailwind.config.ts
apps/web/components/app-shell.tsx
apps/web/app/credit-ai/page.tsx
apps/web/app/settings/page.tsx
apps/web/app/so-tay/page.tsx
apps/web/app/cong-thuc-cua-toi/page.tsx
apps/web/app/ai-tu-van-mau/page.tsx
apps/web/components/recruitment/my-recruitment-dashboard.tsx
```

Tiêu chí xong:

```txt
- Không còn chữ trắng trên nền trắng/cream trong khu account.
- Form input đọc rõ trên desktop/mobile.
- Button vàng trên nền sáng vẫn dùng text-black.
- Badge vàng trên nền sáng dùng text-charcoal hoặc goldText đậm.
- npm run build không lỗi.
```

### Mốc B: 18/06/2026 - 19/06/2026

Mục tiêu: sửa ranh giới server/client trong account để tránh build/hydration lỗi.

Việc làm:

```txt
1. Giữ AppShell là server component.
2. Tách client component cho từng page tương tác.
3. Page route chỉ bọc AppShell và render client child.
4. Không gọi auth() trong client component.
```

Cấu trúc dự kiến:

```txt
apps/web/app/settings/page.tsx
apps/web/components/settings/settings-client.tsx

apps/web/app/so-tay/page.tsx
apps/web/components/account/notebook-client.tsx

apps/web/app/cong-thuc-cua-toi/page.tsx
apps/web/components/account/my-formulas-client.tsx

apps/web/app/ai-tu-van-mau/page.tsx
apps/web/components/account/ai-color-client.tsx

apps/web/app/credit-ai/page.tsx
apps/web/components/account/credit-ai-client.tsx nếu cần
```

Tiêu chí xong:

```txt
- Không còn client page import trực tiếp AppShell server.
- npm run build pass.
- Middleware vẫn bảo vệ account routes.
- UI không đổi xấu sau khi tách.
```

### Mốc C: 20/06/2026 - 21/06/2026

Mục tiêu: sửa auth/account UX mà chưa chuyển VPS.

Việc làm:

```txt
1. Login page: chốt trạng thái đăng ký.
   - Nếu chưa làm API register: ẩn tab đăng ký hoặc ghi rõ `Đăng ký đang chuẩn bị`.
   - Nếu làm nhanh: thêm /api/register legacy D1 tạm thời.
2. Profile/settings: hiển thị lỗi thân thiện khi /api/profile lỗi hoặc user chưa có row DB.
3. Dashboard: không che lỗi stats thành 0 im lặng.
4. Credit AI: gọi GET /api/ai-usage để lấy credit/log thật nếu có, fallback rõ ràng nếu lỗi.
5. Chuẩn hóa unauthorized/error message tiếng Việt.
```

Tiêu chí xong:

```txt
- Người dùng không bấm `Tạo tài khoản` giả.
- Google/credentials lỗi có thông báo rõ.
- Dashboard phân biệt được 0 thật và lỗi tải dữ liệu.
- Credit AI không còn dữ liệu mock trông như thật.
```

### Mốc D: 22/06/2026 - 23/06/2026

Mục tiêu: khóa logic tuyển dụng trong khu account theo đúng hướng thu phí vượt quota, không yêu cầu salon.

Việc làm:

```txt
1. Audit /tuyen-dung-cua-toi UI sau khi sửa màu.
2. Kiểm tra usage card:
   - tin còn lại
   - slot đang hoạt động
   - lượt đẩy còn lại
   - paid credits
3. Sửa wording để rõ:
   - ai cũng đăng tuyển được nếu login
   - không bắt buộc salon
   - hết quota thì mua gói đăng/đẩy
4. Gói mua hiện chưa thanh toán thật thì gắn nhãn `Mock/chưa nối thanh toán` hoặc đổi CTA sang `Liên hệ mua gói`.
5. Đảm bảo không có nút `Mua gói mock` ở UI production nếu chưa muốn lộ mock.
```

Tiêu chí xong:

```txt
- User free thấy đúng quota.
- Hết quota thấy CTA mua gói rõ.
- Không có logic ép khai báo salon.
- Không còn chữ mock gây mất niềm tin ở giao diện public/account.
```

### Mốc E: 24/06/2026 - 25/06/2026

Mục tiêu: chuẩn bị frontend để sau này gọi VPS API mà chưa cắt D1.

Việc làm:

```txt
1. Thêm API client dùng env:
   - NEXT_PUBLIC_API_BASE_URL
   - SERVER_API_BASE_URL
2. Tạo helper cho mode legacy/proxy:
   - nếu chưa có VPS: gọi Next API hiện tại
   - nếu có VPS: gọi api.tocvietlab.studio
3. Không bỏ các route D1 legacy.
4. Không gỡ env D1 khỏi Vercel.
5. Tài liệu hóa route nào sẽ chuyển sang VPS trước.
```

File dự kiến:

```txt
apps/web/lib/api-client.ts
apps/web/lib/account-api.ts
apps/web/lib/recruitment-api.ts hoặc mở rộng logic hiện có
```

Tiêu chí xong:

```txt
- Frontend build vẫn chạy nếu chưa có SERVER_API_BASE_URL.
- D1 legacy vẫn hoạt động như rollback.
- Có đường chuyển mềm sang VPS mà không đập app.
```

### Mốc F: 26/06/2026 - 28/06/2026

Mục tiêu: tạo backend VPS skeleton, chưa chuyển module lớn.

Việc làm:

```txt
1. Thêm server/ theo runbook.
2. Chọn framework nhẹ: Fastify hoặc Hono.
3. Thêm GET /health.
4. Thêm CORS chỉ cho tocvietlab.studio và localhost.
5. Thêm script api:dev/api:build/api:start.
6. Thêm server/tsconfig.json nếu cần.
7. Không migrate auth/account ngay.
```

Cấu trúc tối thiểu:

```txt
server/index.ts
server/routes/health.ts
server/middleware/cors.ts
server/config.ts
```

Tiêu chí xong:

```txt
npm run api:dev
GET http://localhost:4000/health -> { ok: true }
npm run build frontend vẫn pass
```

### Mốc G: 29/06/2026 - 02/07/2026

Mục tiêu: chuyển module tuyển dụng sang VPS trước theo logic repo đã chốt.

Việc làm:

```txt
1. Port quota logic từ Next API recruitment sang server/.
2. Tạo VPS API:
   - GET /recruitment/jobs
   - GET /recruitment/jobs/mine
   - POST /recruitment/jobs
   - PATCH /recruitment/jobs/:id
   - DELETE /recruitment/jobs/:id
   - POST /recruitment/orders/mock-paid
3. Giai đoạn đầu: Next API route ở Vercel làm proxy sang VPS hoặc fallback D1.
4. Test free quota, paid post credits, paid boost credits.
5. Không yêu cầu salon trong mọi logic đăng tin.
```

Tiêu chí xong:

```txt
- User login đăng tin nếu còn quota.
- User free đăng quá quota bị chặn và thấy CTA mua gói.
- Mock paid order tăng quota.
- Boost hết lượt bị chặn mua boost.
- Public job list vẫn có fallback nếu VPS lỗi.
```

### Mốc H: 03/07/2026 - 05/07/2026

Mục tiêu: VPS deploy thử nghiệm và chuẩn bị domain API.

Việc làm trên VPS:

```bash
apt update && apt upgrade -y
apt install -y git nginx ufw curl build-essential
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
mkdir -p /var/www
cd /var/www
git clone https://github.com/gustavjung01/toc-viet-lab.git
cd /var/www/toc-viet-lab
npm install
npm run api:build
```

Domain/DNS:

```txt
api.tocvietlab.studio -> VPS_PUBLIC_IP
```

Nginx:

```txt
api.tocvietlab.studio -> 127.0.0.1:4000
```

Tiêu chí xong:

```txt
curl https://api.tocvietlab.studio/health
-> { ok: true }
```

### Mốc I: 06/07/2026 - 08/07/2026

Mục tiêu: kiểm thử cắt module tuyển dụng sang VPS ở mức an toàn.

Việc làm:

```txt
1. Set SERVER_API_BASE_URL và NEXT_PUBLIC_API_BASE_URL trên Vercel preview/prod.
2. Giữ D1 env legacy.
3. Bật proxy route cho recruitment.
4. Test production:
   - /tuyen-dung
   - /tuyen-dung/dang-tin
   - /tuyen-dung-cua-toi
5. Log lỗi VPS và Next proxy.
6. Nếu lỗi, rollback bằng cách đổi API base về same-origin hoặc dùng fallback Next API.
```

Tiêu chí xong:

```txt
- Tuyển dụng chạy qua VPS hoặc proxy VPS.
- Không cần salon để đăng.
- Quota và gói vượt hoạt động đúng.
- Rollback đã test.
```

### Mốc J: 09/07/2026 - 12/07/2026

Mục tiêu: sau tuyển dụng mới tính auth/formula/content.

Thứ tự đề xuất:

```txt
1. Formula/content public.
2. User formulas/saved items.
3. Auth credentials gọi VPS /auth/login.
4. Payment thật sau mock paid order.
```

Không làm auth đầu tiên vì auth là dây thần kinh chính của dashboard.

## 3. Checklist build/test mỗi lần sửa frontend

Local root:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
git pull origin main
```

Frontend:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab\apps\web"
npm install
npm run build
npm run dev
```

URL test account:

```txt
http://localhost:3000/login
http://localhost:3000/dashboard
http://localhost:3000/settings
http://localhost:3000/so-tay
http://localhost:3000/cong-thuc-cua-toi
http://localhost:3000/ai-tu-van-mau
http://localhost:3000/credit-ai
http://localhost:3000/tuyen-dung-cua-toi
http://localhost:3000/tuyen-dung/dang-tin
```

## 4. Checklist build/test khi có backend VPS

Local backend:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
npm run api:dev
```

Test:

```txt
GET http://localhost:4000/health
```

VPS update:

```bash
cd /var/www/toc-viet-lab
git pull origin main
npm install
npm run api:build
pm2 restart tocviet-api
pm2 logs tocviet-api
```

## 5. Không được làm trong giai đoạn này

```txt
- Không gỡ D1 env khỏi Vercel khi chưa hoàn thành checklist cắt runtime.
- Không chuyển auth sang VPS trước tuyển dụng.
- Không bỏ R2 hoặc đổi asset flow.
- Không tạo branch mới.
- Không lộ token trong repo.
- Không để UI production có chữ `mock` nếu người dùng cuối nhìn thấy.
```

## 6. Ưu tiên thực thi ngay sau plan này

Thứ tự commit nên làm:

```txt
1. Fix account shell contrast and readable controls
2. Split account client pages from server AppShell
3. Clean credit AI and recruitment account wording
4. Add API client fallback for future VPS backend
5. Add VPS backend health skeleton
6. Move recruitment API to VPS/proxy mode
```

## 7. Definition of Done tổng

Plan này coi là hoàn thành khi:

```txt
- Account UI đọc rõ trên mobile/desktop.
- `npm run build` frontend pass.
- Không còn client page import AppShell server.
- Login/register không gây hiểu nhầm.
- Dashboard/account không che lỗi DB thành dữ liệu giả.
- Recruitment không yêu cầu salon, quota/gói vượt rõ.
- VPS /health chạy.
- Recruitment có đường chạy VPS hoặc proxy VPS.
- D1 legacy vẫn có rollback cho đến khi checklist cắt runtime hoàn tất.
```
