# Kế hoạch chuyển backend Tóc Việt Lab sang VPS

## 1. Mục tiêu

Hiện dự án đang dồn nhiều logic vào Vercel + Cloudflare:

- Next.js chạy frontend và API routes.
- Cloudflare D1 làm database qua HTTP driver.
- Cloudflare R2 dự kiến giữ ảnh/assets.
- Vercel/NextAuth xử lý session và auth flow.

Mục tiêu mới:

```txt
Vercel: frontend Next.js, SEO pages, UI public/account
Cloudflare: DNS, CDN, SSL, R2 assets, optional WAF
VPS: backend API, database chính, worker/cron, webhook thanh toán, queue/job
```

Không tách nhiều nhánh. Mọi thay đổi repo vẫn đi vào `main`.

## 2. Hiện trạng kỹ thuật trong repo

### Package/runtime

Repo là Next.js app, có script `dev`, `build`, `start`, `db:migrate`, `db:seed` trong `package.json`.

### Database hiện tại

`drizzle.config.ts` đang dùng:

```ts
dialect: "sqlite"
driver: "d1-http"
```

và cần env:

```env
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_D1_DATABASE_ID
CLOUDFLARE_D1_TOKEN
```

### Code đang query D1 trực tiếp

Một số phần đang query Cloudflare D1 qua HTTP:

- `lib/d1-http.ts`
- `auth.ts`
- API công thức màu
- API tuyển dụng
- API user formulas / saved items / articles nếu có
- scripts seed/migrate D1

Điểm cần xử lý: nếu backend sang VPS, frontend/API không nên query D1 trực tiếp nữa. Cần có lớp API backend và database backend riêng.

## 3. Kiến trúc đề xuất

### Phương án khuyên dùng: Hybrid tách backend

```txt
Client browser
  ↓
Vercel Next frontend: tocvietlab.studio
  ↓ gọi server-side hoặc client-side
VPS API: api.tocvietlab.studio
  ↓
PostgreSQL hoặc SQLite VPS
  ↓
Worker/cron/payment/webhook
```

Giữ Cloudflare ở lớp DNS/CDN:

```txt
Cloudflare DNS
- tocvietlab.studio -> Vercel
- api.tocvietlab.studio -> VPS public IP
- cdn/assets -> Cloudflare R2 hoặc CDN hiện tại
```

## 4. Chọn database trên VPS

### Khuyến nghị production: PostgreSQL

Ưu điểm:

- Ổn hơn cho user/account/order/payment.
- Dễ backup, restore, scale sau này.
- Hợp với VPS lâu dài.

Nhược điểm:

- Phải đổi Drizzle schema từ `sqlite-core` sang `pg-core` hoặc tạo schema song song.
- Migration sẽ cần viết lại cẩn thận.

### Phương án nhanh MVP: SQLite file trên VPS

Ưu điểm:

- Gần với D1/SQLite hiện tại.
- Ít đổi schema hơn.
- Nhanh để chạy backend riêng.

Nhược điểm:

- Không tốt nếu nhiều instance.
- Backup/lock/write concurrency phải kiểm soát kỹ.

### Quyết định đề xuất

```txt
Giai đoạn 1: dùng SQLite VPS nếu cần đi nhanh.
Giai đoạn 2: nâng sang PostgreSQL trước khi traffic lớn hoặc thanh toán thật.
```

Nếu đã chắc chắn đi production nghiêm túc: chọn PostgreSQL ngay để khỏi di cư lần hai.

## 5. Các module backend cần tách sang VPS

### 5.1 Auth/account

Hiện `auth.ts` query trực tiếp D1 để kiểm email/password. Khi backend chuyển VPS, cần đổi sang một trong hai hướng:

#### Hướng A: Auth vẫn ở Next/Vercel, nhưng gọi VPS API

```txt
NextAuth Credentials authorize()
  -> POST https://api.tocvietlab.studio/auth/login
  -> VPS kiểm DB
  -> trả user id, email, role
  -> NextAuth tạo JWT session
```

Ưu điểm: ít thay đổi UI, giữ middleware NextAuth hiện tại.

#### Hướng B: Backend VPS tự phát JWT/session

```txt
Frontend login
  -> VPS /auth/login
  -> VPS set cookie/session
  -> frontend gọi API bằng cookie/token
```

Ưu điểm: backend độc lập hơn.
Nhược điểm: phải sửa auth/middleware nhiều hơn.

Khuyến nghị: làm Hướng A trước.

### 5.2 Recruitment backend

Đưa các logic này sang VPS:

```txt
GET    /recruitment/jobs
POST   /recruitment/jobs
GET    /recruitment/jobs/mine
PATCH  /recruitment/jobs/:id
DELETE /recruitment/jobs/:id
POST   /recruitment/orders/mock-paid
POST   /recruitment/orders/payment-webhook
```

Luồng quota giữ nguyên:

```txt
isLoggedIn == true
AND không check salon
AND còn quota role hoặc còn paid credits
```

### 5.3 Formula backend

Đưa các logic này sang VPS:

```txt
GET /formulas
GET /formulas/:slug
POST /me/formulas/copy-from-public
GET /me/formulas
POST /me/formulas
DELETE /me/formulas/:id
```

### 5.4 Content backend

```txt
GET /articles
GET /articles/:slug
GET /cases
GET /cases/:id hoặc /cases/:slug
POST /saved-items
GET /saved-items
```

### 5.5 Payment/order backend

Bắt đầu bằng mock paid order để test quota:

```txt
POST /recruitment/orders/mock-paid
body: { packageCode: "starter" | "growth" | "boost" }
```

Sau đó mới nối cổng thật:

```txt
POST /payment/create-checkout
POST /payment/webhook
```

Khi thanh toán thành công, backend ghi:

```txt
recruitment_orders.status = 'paid'
quantity_total = số lượt mua
quantity_used = 0
expires_at = hạn gói
payment_ref = mã giao dịch
```

### 5.6 Worker/cron

Chạy trên VPS bằng cron hoặc systemd timer:

```txt
- Expire job_posts quá hạn 30 ngày
- Clear boost_until hết hạn
- Gửi notification/email nhắc tin sắp hết hạn
- Backup DB hằng ngày
- Sync/report payment failed nếu cần
```

## 6. Cấu trúc repo đề xuất

Có 2 hướng.

### Hướng 1: Monorepo trong repo hiện tại

```txt
apps/web       -> Next.js frontend hiện tại
apps/api       -> VPS backend Node API
packages/db    -> schema/db client dùng chung
packages/shared -> types/constants dùng chung
```

Ưu điểm: sạch, tách rõ.
Nhược điểm: cần reorganize repo khá lớn.

### Hướng 2: Giữ cấu trúc hiện tại, thêm thư mục backend

```txt
app/           -> Next.js frontend + một số API proxy nhẹ
server/        -> VPS backend
lib/           -> shared helpers hiện tại
```

Ưu điểm: ít xáo trộn, hợp giai đoạn hiện tại.
Nhược điểm: về lâu dài kém sạch hơn monorepo chuẩn.

Khuyến nghị hiện tại:

```txt
Giai đoạn đầu dùng Hướng 2: thêm server/ trong repo hiện tại.
Sau khi ổn mới cân nhắc tách apps/web, apps/api.
```

## 7. Biến môi trường cần thiết

### Vercel frontend

```env
NEXT_PUBLIC_SITE_URL=https://tocvietlab.studio
NEXT_PUBLIC_API_BASE_URL=https://api.tocvietlab.studio
NEXT_PUBLIC_ASSET_BASE_URL=https://cdn.tocvietlab.studio
NEXTAUTH_URL=https://tocvietlab.studio
NEXTAUTH_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Sau khi backend VPS ổn, Vercel không nên cần:

```env
CLOUDFLARE_D1_TOKEN
CLOUDFLARE_D1_DATABASE_ID
CLOUDFLARE_ACCOUNT_ID
```

trừ khi còn route legacy chưa chuyển.

### VPS backend

Nếu dùng PostgreSQL:

```env
NODE_ENV=production
PORT=4000
API_PUBLIC_URL=https://api.tocvietlab.studio
DATABASE_URL=postgres://tocviet:password@127.0.0.1:5432/tocvietlab
JWT_SECRET=...
CORS_ORIGIN=https://tocvietlab.studio
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=...
PAYMENT_SECRET=...
```

Nếu dùng SQLite VPS:

```env
DATABASE_URL=file:/var/www/toc-viet-lab/data/prod.sqlite
```

## 8. Các bước triển khai chi tiết

### Phase 0: Chốt kiến trúc

- Chọn backend framework: Express/Fastify/Hono.
- Chọn DB: PostgreSQL hoặc SQLite VPS.
- Chốt domain API: `api.tocvietlab.studio`.
- Chốt frontend vẫn ở Vercel.

Đề xuất:

```txt
API: Fastify hoặc Hono
DB: PostgreSQL nếu làm production thật
Proxy: Nginx
Process manager: PM2 hoặc systemd
```

### Phase 1: Chuẩn bị VPS

Trên VPS:

```bash
apt update && apt upgrade -y
apt install -y git nginx ufw curl build-essential
```

Cài Node LTS mới, PM2 hoặc systemd service.

Firewall:

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

Nginx reverse proxy:

```txt
api.tocvietlab.studio -> localhost:4000
```

Cloudflare DNS:

```txt
A api -> VPS_IP
Proxy: on hoặc DNS only tùy SSL setup
```

### Phase 2: Tạo backend skeleton trong repo

Thêm:

```txt
server/index.ts
server/routes/health.ts
server/routes/auth.ts
server/routes/recruitment.ts
server/routes/formulas.ts
server/routes/me-formulas.ts
server/db/index.ts
server/middleware/auth.ts
server/middleware/cors.ts
```

Thêm script:

```json
"api:dev": "tsx server/index.ts",
"api:build": "tsc -p server/tsconfig.json",
"api:start": "node dist/server/index.js"
```

Endpoint đầu tiên:

```txt
GET /health -> { ok: true }
```

### Phase 3: Tạo database backend

Nếu PostgreSQL:

- Cài PostgreSQL.
- Tạo database/user.
- Tạo Drizzle config mới cho backend.
- Port schema từ SQLite sang PostgreSQL.
- Viết migration tương ứng.

Nếu SQLite VPS:

- Tạo file DB.
- Dùng driver SQLite server-side.
- Reuse phần lớn schema hiện tại.

### Phase 4: Tách data access layer

Mục tiêu: frontend không gọi D1 trực tiếp.

Tạo lớp API client:

```txt
lib/api-client.ts
```

Có function:

```ts
apiGet('/recruitment/jobs')
apiPost('/recruitment/jobs', data)
```

Với server-side Next:

```txt
SERVER_API_BASE_URL=https://api.tocvietlab.studio
```

Với client-side:

```txt
NEXT_PUBLIC_API_BASE_URL=https://api.tocvietlab.studio
```

### Phase 5: Di chuyển recruitment trước

Lý do: tuyển dụng liên quan doanh thu, quota, order.

Thứ tự:

1. Copy logic quota từ `app/api/recruitment/jobs/route.ts` sang VPS backend.
2. Tạo routes tương ứng trên VPS.
3. Vercel API route cũ chuyển thành proxy hoặc frontend gọi thẳng VPS.
4. Test user free đăng 1 tin.
5. Test user free đăng tin thứ 2 bị chặn.
6. Tạo mock paid order.
7. Test mua gói mock rồi đăng tiếp.
8. Test boost.

### Phase 6: Di chuyển formula/content

1. Di chuyển `/api/formulas` sang VPS.
2. Di chuyển `/api/formulas/[slug]` sang VPS.
3. Di chuyển `/api/user-formulas` sang VPS.
4. Thêm API copy công thức public vào công thức cá nhân.
5. Cập nhật frontend dùng API base URL.

### Phase 7: Di chuyển auth

Khuyến nghị không làm auth đầu tiên, vì dễ làm gãy toàn bộ app.

Bước an toàn:

1. Backend VPS có `/auth/login` kiểm DB.
2. `auth.ts` trên Vercel gọi `/auth/login` thay vì query D1 trực tiếp.
3. NextAuth vẫn phát JWT session.
4. Các API gọi VPS gửi `Authorization: Bearer` hoặc cookie/session token.
5. Backend verify token bằng shared secret.

### Phase 8: Payment

1. Tạo bảng/order flow đầy đủ.
2. Tạo `POST /payment/create-checkout`.
3. Tạo `POST /payment/webhook`.
4. Sau webhook paid, ghi `recruitment_orders`.
5. UI gói tuyển dụng bỏ chữ mock.
6. Log audit payment.

### Phase 9: Deploy VPS

Cấu trúc VPS:

```txt
/var/www/toc-viet-lab
  server
  .env
  logs
  data hoặc backup
```

PM2:

```bash
pm2 start dist/server/index.js --name tocviet-api
pm2 save
pm2 startup
```

Nginx:

```nginx
server {
  server_name api.tocvietlab.studio;

  location / {
    proxy_pass http://127.0.0.1:4000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### Phase 10: Giám sát và backup

- Log API theo ngày.
- Backup DB hằng ngày.
- Healthcheck `/health`.
- Error log cho payment/webhook.
- Uptime monitor.
- Cảnh báo disk usage.

## 9. Lộ trình commit trên main

Không tạo nhánh phụ. Chia nhỏ theo commit trên `main`:

### Commit 1

```txt
Add backend migration plan
```

### Commit 2

```txt
Add API client config for VPS backend
```

### Commit 3

```txt
Add server health endpoint skeleton
```

### Commit 4

```txt
Move recruitment API logic to VPS server
```

### Commit 5

```txt
Proxy/repoint frontend recruitment calls to VPS API
```

### Commit 6

```txt
Add mock paid recruitment orders on VPS
```

### Commit 7

```txt
Move formula APIs to VPS server
```

### Commit 8

```txt
Move auth credential check to VPS API
```

### Commit 9

```txt
Add production deploy docs and systemd/pm2 config
```

## 10. Checklist trước khi cắt D1 khỏi backend

- [ ] VPS API `/health` chạy ổn.
- [ ] Domain `api.tocvietlab.studio` hoạt động qua HTTPS.
- [ ] DB VPS có đầy đủ schema.
- [ ] Data D1 đã export/import sang DB VPS.
- [ ] Recruitment public list đọc từ VPS.
- [ ] Đăng tin, quota, boost chạy trên VPS.
- [ ] Formula public list/detail chạy trên VPS.
- [ ] User formulas chạy trên VPS.
- [ ] Auth login gọi VPS hoặc backend session hoạt động.
- [ ] Vercel không còn phụ thuộc D1 env cho runtime chính.
- [ ] Backup DB tự động chạy.
- [ ] Có rollback: Vercel env quay lại D1 legacy nếu cần.

## 11. Rủi ro cần tránh

### Cắt D1 quá sớm

Nếu auth, user formulas, saved items còn query D1 mà đã bỏ env Cloudflare khỏi Vercel, login/account sẽ gãy.

### Chuyển auth và DB cùng lúc

Auth là dây thần kinh trung ương. Nên chuyển từng bước: recruitment trước, formulas/content sau, auth sau.

### Không có backup

Nếu dùng SQLite VPS, bắt buộc backup file DB. Nếu dùng PostgreSQL, bắt buộc `pg_dump` định kỳ.

### CORS/cookie sai domain

Nếu frontend ở `tocvietlab.studio` và API ở `api.tocvietlab.studio`, cần cấu hình CORS, cookie domain, secure cookie và SameSite đúng.

## 12. Kết luận

Không nên chuyển toàn bộ backend sang VPS một lần. Nên đi theo thứ tự:

```txt
1. VPS API skeleton + healthcheck
2. Recruitment API sang VPS
3. Mock paid orders để test quota vượt
4. Formula/content APIs sang VPS
5. Auth login đổi sang VPS
6. Payment thật + webhook
7. Cron/backup/monitoring
8. Gỡ D1 runtime khỏi Vercel
```

Lý do: tuyển dụng là mảng kiếm tiền, công thức là mảng giữ user, auth là phần rủi ro cao nên chuyển sau cùng.
