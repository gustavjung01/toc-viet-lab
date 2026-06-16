# Runbook triển khai backend VPS cho Tóc Việt Lab

## 0. Quy ước bắt buộc

- Repo chỉ dùng **1 nhánh**: `main`.
- Không tạo nhánh `frontend`, `backend`, `dev`, `vps`.
- Chia frontend/backend bằng **thư mục và nơi deploy**, không chia bằng branch.
- Vercel build phần frontend Next.js.
- VPS chạy phần backend trong thư mục `server/`.
- Cloudflare giữ DNS/CDN/SSL/R2 nếu cần.

```txt
Repo: gustavjung01/toc-viet-lab
Branch: main
Local: F:\1_A_Disk_D\Toc-Viet-Lab
VPS path: /var/www/toc-viet-lab
Frontend domain: https://tocvietlab.studio
Backend API domain: https://api.tocvietlab.studio
```

## 1. Kiến trúc mục tiêu

```txt
User browser
  ↓
Vercel frontend: https://tocvietlab.studio
  ↓ gọi API
VPS backend: https://api.tocvietlab.studio
  ↓
Database trên VPS
  ↓
Cron / payment webhook / backup / logs
```

Cloudflare:

```txt
tocvietlab.studio       -> Vercel
api.tocvietlab.studio   -> VPS IP
cdn.tocvietlab.studio   -> R2/CDN nếu dùng
```

## 2. Cấu trúc repo sau khi tách runtime

```txt
toc-viet-lab/
├─ app/                  # Frontend Next.js chạy Vercel
├─ components/           # UI frontend
├─ lib/                  # Shared helpers/types
├─ server/               # Backend chạy VPS
│  ├─ index.ts
│  ├─ routes/
│  │  ├─ health.ts
│  │  ├─ auth.ts
│  │  ├─ recruitment.ts
│  │  ├─ formulas.ts
│  │  ├─ user-formulas.ts
│  │  └─ payment.ts
│  ├─ db/
│  │  ├─ index.ts
│  │  ├─ schema.ts
│  │  └─ migrations/
│  ├─ middleware/
│  │  ├─ auth.ts
│  │  └─ cors.ts
│  └─ jobs/
│     ├─ expire-jobs.ts
│     └─ backup-db.ts
├─ scripts/
├─ package.json
└─ README.md
```

## 3. Lộ trình triển khai theo giai đoạn

### Giai đoạn A: Chuẩn bị repo cho backend VPS

Mục tiêu: thêm skeleton backend nhưng chưa cắt D1/Vercel.

Checklist:

- [ ] Thêm thư mục `server/`.
- [ ] Thêm `server/index.ts`.
- [ ] Thêm route `GET /health`.
- [ ] Thêm env API base cho frontend.
- [ ] Thêm scripts backend vào `package.json`.
- [ ] Đảm bảo `npm run dev` frontend vẫn chạy.
- [ ] Đảm bảo `npm run api:dev` backend chạy local.

Scripts cần thêm:

```json
{
  "api:dev": "tsx server/index.ts",
  "api:build": "tsc -p server/tsconfig.json",
  "api:start": "node dist/server/index.js"
}
```

Env frontend:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.tocvietlab.studio
SERVER_API_BASE_URL=https://api.tocvietlab.studio
```

Test local:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
git pull origin main
npm install
npm run dev
```

Backend local sau khi có `server/`:

```powershell
npm run api:dev
```

Kỳ vọng:

```txt
GET http://localhost:4000/health
-> { "ok": true }
```

### Giai đoạn B: Chuẩn bị VPS

Mục tiêu: VPS sẵn Node, Nginx, firewall, repo path.

Lệnh VPS:

```bash
apt update && apt upgrade -y
apt install -y git nginx ufw curl build-essential
```

Firewall:

```bash
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

Tạo thư mục:

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/gustavjung01/toc-viet-lab.git
cd /var/www/toc-viet-lab
npm install
```

Cài process manager:

```bash
npm install -g pm2
```

Env VPS:

```bash
nano /var/www/toc-viet-lab/.env
```

Tối thiểu:

```env
NODE_ENV=production
PORT=4000
API_PUBLIC_URL=https://api.tocvietlab.studio
CORS_ORIGIN=https://tocvietlab.studio
DATABASE_URL=file:/var/www/toc-viet-lab/data/prod.sqlite
JWT_SECRET=change_me
```

Nếu dùng PostgreSQL:

```env
DATABASE_URL=postgres://tocviet:password@127.0.0.1:5432/tocvietlab
```

### Giai đoạn C: Cloudflare DNS + Nginx

Cloudflare DNS:

```txt
Type: A
Name: api
Value: VPS_PUBLIC_IP
Proxy: on hoặc DNS only tùy SSL setup
```

Nginx config:

```bash
nano /etc/nginx/sites-available/tocviet-api
```

Nội dung:

```nginx
server {
  listen 80;
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

Enable site:

```bash
ln -s /etc/nginx/sites-available/tocviet-api /etc/nginx/sites-enabled/tocviet-api
nginx -t
systemctl reload nginx
```

Test:

```bash
curl http://api.tocvietlab.studio/health
```

Kỳ vọng:

```json
{ "ok": true }
```

### Giai đoạn D: Deploy backend skeleton

Sau khi repo có `server/`:

```bash
cd /var/www/toc-viet-lab
git pull origin main
npm install
npm run api:build
pm2 start dist/server/index.js --name tocviet-api
pm2 save
pm2 startup
```

Update backend sau mỗi lần sửa repo:

```bash
cd /var/www/toc-viet-lab
git pull origin main
npm install
npm run api:build
pm2 restart tocviet-api
```

Xem log:

```bash
pm2 logs tocviet-api
```

### Giai đoạn E: Chuyển tuyển dụng sang VPS trước

Lý do: tuyển dụng liên quan doanh thu, quota, gói đăng vượt, gói đẩy tin.

API VPS cần có:

```txt
GET    /recruitment/jobs
POST   /recruitment/jobs
GET    /recruitment/jobs/mine
PATCH  /recruitment/jobs/:id
DELETE /recruitment/jobs/:id
POST   /recruitment/orders/mock-paid
```

Logic bắt buộc:

```txt
Cho phép đăng tuyển khi:
- user đã đăng nhập
- còn quota role hoặc còn paid credits
- KHÔNG yêu cầu salon
```

Test case:

```txt
1. User free chưa có tin -> đăng tin thành công.
2. User free đăng tin thứ 2 -> bị chặn quota.
3. User mua mock package starter -> có thêm lượt đăng.
4. User đăng tiếp -> thành công.
5. User boost khi còn lượt -> boost_until + 7 ngày.
6. User boost khi hết lượt -> bị yêu cầu mua gói boost.
```

Cập nhật frontend:

```txt
/tuyen-dung                 -> gọi VPS /recruitment/jobs
/tuyen-dung/dang-tin        -> gọi VPS POST /recruitment/jobs
/tuyen-dung-cua-toi         -> gọi VPS /recruitment/jobs/mine
```

Giai đoạn đầu có thể giữ Next API route làm proxy:

```txt
Next frontend -> /api/recruitment/jobs -> VPS API
```

Sau khi ổn, frontend gọi thẳng:

```txt
Next frontend -> https://api.tocvietlab.studio/recruitment/jobs
```

### Giai đoạn F: Mock paid order

Mục tiêu: test thu phí logic trước khi nối cổng thanh toán thật.

Endpoint:

```txt
POST /recruitment/orders/mock-paid
```

Body:

```json
{
  "packageCode": "starter"
}
```

Mapping:

```txt
starter -> post_package, quantity_total = 3, expires_at = 30 ngày
 growth -> post_package, quantity_total = 10, expires_at = 30 ngày
 boost   -> boost_package, quantity_total = 1, expires_at = 7 ngày
```

Sau khi tạo mock order:

```txt
recruitment_orders.status = paid
quantity_used = 0
```

### Giai đoạn G: Chuyển công thức màu/content

API VPS cần có:

```txt
GET  /formulas
GET  /formulas/:slug
GET  /user-formulas
POST /user-formulas
POST /user-formulas/copy-from-public
DELETE /user-formulas/:id
```

Frontend cần chuyển:

```txt
/cong-thuc-mau             -> VPS /formulas
/cong-thuc-mau/[slug]      -> VPS /formulas/:slug
/cong-thuc-cua-toi         -> VPS /user-formulas
```

Test case:

```txt
1. Public list công thức hiện đủ.
2. Detail theo slug chạy.
3. User login copy công thức public về sổ tay.
4. User sửa bản copy riêng.
5. User xóa công thức riêng.
```

### Giai đoạn H: Chuyển auth sau cùng

Không chuyển auth đầu tiên.

Lý do: auth là dây thần kinh chính. Gãy auth là gãy dashboard, tuyển dụng, công thức cá nhân.

Cách an toàn:

```txt
NextAuth vẫn nằm ở Vercel.
Credentials authorize() gọi VPS /auth/login.
VPS kiểm DB và trả user id/email/role.
NextAuth phát JWT session như hiện tại.
```

Endpoint VPS:

```txt
POST /auth/login
POST /auth/register
GET  /auth/me
```

Test case:

```txt
1. Login email/password đúng -> vào dashboard.
2. Login sai -> bị từ chối.
3. Session có user.id và role.
4. Đăng tuyển lấy đúng user.id.
5. User không salon vẫn đăng được nếu còn quota.
```

### Giai đoạn I: Payment thật

Sau mock paid order mới nối payment thật.

API VPS:

```txt
POST /payment/create-checkout
POST /payment/webhook
```

Luồng:

```txt
User chọn gói
-> VPS tạo checkout/payment link
-> Payment gateway callback webhook
-> VPS verify webhook
-> VPS ghi recruitment_orders status paid
-> user có quota mới
```

Không cho frontend tự set `paid`.

### Giai đoạn J: Cron, backup, monitor

Cron cần có:

```txt
- Expire job_posts hết hạn
- Clear boost_until hết hạn
- Backup DB hằng ngày
- Dọn logs cũ
```

Backup SQLite:

```bash
mkdir -p /var/backups/tocviet
cp /var/www/toc-viet-lab/data/prod.sqlite /var/backups/tocviet/prod-$(date +%F).sqlite
```

Backup PostgreSQL:

```bash
pg_dump tocvietlab > /var/backups/tocviet/tocvietlab-$(date +%F).sql
```

Monitor tối thiểu:

```bash
pm2 status
pm2 logs tocviet-api
systemctl status nginx
curl https://api.tocvietlab.studio/health
```

## 4. Checklist cắt Cloudflare D1 khỏi runtime

Chỉ bỏ D1 env khỏi Vercel khi đã tick hết:

- [ ] VPS `/health` chạy HTTPS.
- [ ] Recruitment public chạy VPS.
- [ ] Đăng tin chạy VPS.
- [ ] Quota đăng tin chạy VPS.
- [ ] Boost chạy VPS.
- [ ] Mock paid order chạy VPS.
- [ ] Formula public chạy VPS.
- [ ] User formulas chạy VPS.
- [ ] Auth login gọi VPS.
- [ ] Backup DB chạy.
- [ ] Rollback đã chuẩn bị.

## 5. Rollback

Nếu backend VPS lỗi, quay về mode cũ:

### Trên Vercel

Giữ lại env D1 legacy:

```env
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_D1_DATABASE_ID=...
CLOUDFLARE_D1_TOKEN=...
```

Đổi API base về route cũ hoặc tạm dùng Next API fallback:

```env
NEXT_PUBLIC_API_BASE_URL=https://tocvietlab.studio
SERVER_API_BASE_URL=https://tocvietlab.studio
```

### Trên repo

Không revert toàn bộ nếu không cần. Chỉ chuyển frontend về API cũ hoặc giữ proxy fallback.

### Trên VPS

```bash
pm2 stop tocviet-api
pm2 logs tocviet-api
```

## 6. Thứ tự commit trên main

```txt
1. Add VPS backend deployment runbook
2. Add server skeleton and health route
3. Add frontend API base client
4. Move recruitment routes to server
5. Add mock paid recruitment orders
6. Repoint recruitment frontend to VPS API/proxy
7. Move formulas routes to server
8. Add copy public formula to user formulas
9. Move auth credential check to VPS
10. Add payment webhook skeleton
11. Add deploy scripts and PM2/systemd docs
```

## 7. Lệnh vận hành hằng ngày

### Local frontend

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
git pull origin main
npm install
npm run dev
```

### VPS backend

```bash
cd /var/www/toc-viet-lab
git pull origin main
npm install
npm run api:build
pm2 restart tocviet-api
```

### Kiểm tra sau deploy

```bash
curl https://api.tocvietlab.studio/health
pm2 status
pm2 logs tocviet-api --lines 50
```

Frontend check:

```txt
https://tocvietlab.studio
https://tocvietlab.studio/tuyen-dung
https://tocvietlab.studio/cong-thuc-mau
```

## 8. Kết luận triển khai

Không chia nhánh. Không tách repo giai đoạn này.

Dùng:

```txt
1 repo
1 branch main
2 runtime:
- Vercel frontend
- VPS backend
```

Chuyển theo thứ tự an toàn:

```txt
server skeleton -> recruitment -> mock paid order -> formulas -> auth -> payment -> cron/backup
```
