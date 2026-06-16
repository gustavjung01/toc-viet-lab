# Runbook triển khai backend VPS cho Tóc Việt Lab

## 0. Quy ước bắt buộc

- Repo chỉ dùng **1 nhánh**: `main`.
- Không tạo nhánh `frontend`, `backend`, `dev`, `vps`.
- Chia frontend/backend bằng **thư mục và nơi deploy**, không chia bằng branch.
- Vercel build phần frontend Next.js.
- VPS chạy phần backend trong thư mục `server/`.
- Cloudflare giữ DNS/CDN/SSL/R2 nếu cần.
- Backend Tóc Việt dùng namespace riêng `tocviet`, không đụng runtime `vlgn` hoặc web khác.

```txt
Repo: gustavjung01/toc-viet-lab
Branch: main
Local: F:\1_A_Disk_D\Toc-Viet-Lab
VPS app root: /srv/apps/tocviet
VPS source: /srv/apps/tocviet/source
VPS current: /srv/apps/tocviet/current -> /srv/apps/tocviet/source
Env: /etc/app-env/tocviet.env
Service: tocviet-api.service
Backups: /srv/backups/tocviet
Frontend domain: https://tocvietlab.studio
Backend API domain: https://api.tocvietlab.studio
```

## 1. Kiến trúc mục tiêu

```txt
User browser
  ↓
Vercel frontend: https://tocvietlab.studio
  ↓ gọi API hoặc Next proxy
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

## 2. Cấu trúc VPS mục tiêu

```txt
/srv/apps/tocviet/current -> /srv/apps/tocviet/source
/srv/apps/tocviet/source
  apps
  server
  infra
  scripts
  package.json
  package-lock.json

/srv/apps/tocviet/source.git
/srv/apps/tocviet/releases
/srv/apps/tocviet/shared/tmp
/srv/apps/tocviet/shared/uploads
/srv/backups/tocviet
/etc/app-env/tocviet.env
/etc/systemd/system/tocviet-api.service
```

Code backend hiện nằm trong:

```txt
server/src/index.ts
```

Build output:

```txt
server/dist/index.js
```

## 3. Giai đoạn A: Chuẩn bị repo cho backend VPS

Mục tiêu: thêm skeleton backend nhưng chưa cắt D1/Vercel.

Checklist:

- [x] Thêm thư mục `server/`.
- [x] Thêm route `GET /health`.
- [x] Thêm scripts backend vào `package.json`.
- [x] Thêm `server/tsconfig.json`.
- [x] Thêm bridge test từ Vercel: `/api/backend/health`, `/api/backend/jobs`.
- [ ] Đảm bảo frontend `apps/web` vẫn build.
- [ ] Đảm bảo backend chạy trên VPS qua systemd.

Scripts backend:

```json
{
  "api:build": "tsc -p server/tsconfig.json",
  "api:start": "node server/dist/index.js",
  "api:dev": "npm run api:build && node server/dist/index.js"
}
```

Env frontend cho bridge:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.tocvietlab.studio
SERVER_API_BASE_URL=https://api.tocvietlab.studio
```

Test local:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab"
git pull origin main
npm install
npm run api:build
npm run api:start
```

Kỳ vọng:

```txt
GET http://localhost:4000/health -> 200, namespace: tocviet
GET http://localhost:4000/recruitment/jobs -> 200, jobs: []
```

## 4. Giai đoạn B: Chuẩn bị VPS

Mục tiêu: VPS sẵn Node, Nginx, firewall, repo path.

Cài gói nền:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx ufw curl build-essential
```

Firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

Tạo thư mục riêng cho Tóc Việt:

```bash
sudo mkdir -p /srv/apps/tocviet/source /srv/apps/tocviet/releases /srv/apps/tocviet/shared/tmp /srv/apps/tocviet/shared/uploads /srv/backups/tocviet /etc/app-env
sudo chown -R www-data:www-data /srv/apps/tocviet
```

Clone hoặc pull repo vào source:

```bash
cd /srv/apps/tocviet/source
git clone https://github.com/gustavjung01/toc-viet-lab.git .
```

Tạo symlink runtime:

```bash
sudo ln -sfn /srv/apps/tocviet/source /srv/apps/tocviet/current
```

Env VPS:

```bash
sudo nano /etc/app-env/tocviet.env
sudo chown root:root /etc/app-env/tocviet.env
sudo chmod 600 /etc/app-env/tocviet.env
```

Tối thiểu:

```env
NODE_ENV=production
PORT=4000
API_PORT=4000
SERVICE_NAME=tocviet-api
APP_NAMESPACE=tocviet
APP_VERSION=0.1.0
CORS_ORIGIN=https://tocvietlab.studio
```

Nếu dùng PostgreSQL sau này:

```env
DATABASE_URL=postgres://tocviet:password@127.0.0.1:5432/tocvietlab
DATABASE_SCHEMA=tocviet
```

## 5. Giai đoạn C: Cloudflare DNS + Nginx

Cloudflare DNS:

```txt
Type: A
Name: api
Value: VPS_PUBLIC_IP
Proxy: DNS only trước, sau SSL ổn có thể bật proxied
```

Nginx config mẫu có sẵn:

```txt
infra/vps/api.tocvietlab.studio.conf
```

Cài config:

```bash
cd /srv/apps/tocviet/source
sudo cp infra/vps/api.tocvietlab.studio.conf /etc/nginx/sites-available/api.tocvietlab.studio.conf
sudo ln -sfn /etc/nginx/sites-available/api.tocvietlab.studio.conf /etc/nginx/sites-enabled/api.tocvietlab.studio.conf
sudo nginx -t
sudo systemctl reload nginx
```

Test:

```bash
curl http://api.tocvietlab.studio/health
```

Kỳ vọng:

```json
{ "ok": true, "namespace": "tocviet" }
```

## 6. Giai đoạn D: Deploy backend skeleton bằng systemd

```bash
cd /srv/apps/tocviet/source
git pull origin main
npm install
npm run api:build

sudo cp infra/vps/tocviet-api.service /etc/systemd/system/tocviet-api.service
sudo systemctl daemon-reload
sudo systemctl enable tocviet-api
sudo systemctl restart tocviet-api
sudo systemctl status tocviet-api --no-pager
```

Xem log:

```bash
journalctl -u tocviet-api -f
```

Test local trên VPS:

```bash
curl http://127.0.0.1:4000/health
curl http://127.0.0.1:4000/recruitment/jobs
```

Update backend sau mỗi lần sửa repo:

```bash
cd /srv/apps/tocviet/source
git pull origin main
npm install
npm run api:build
sudo systemctl restart tocviet-api
sudo systemctl status tocviet-api --no-pager
journalctl -u tocviet-api -f
```

## 7. Giai đoạn E: Chuyển tuyển dụng sang VPS trước

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

Giai đoạn đầu giữ Next API route làm proxy:

```txt
Next frontend -> /api/backend/jobs -> VPS /recruitment/jobs
Legacy production /api/recruitment/jobs vẫn giữ cho rollback.
```

## 8. Giai đoạn F: Mock paid order

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
growth  -> post_package, quantity_total = 10, expires_at = 30 ngày
boost   -> boost_package, quantity_total = 1, expires_at = 7 ngày
```

Sau khi tạo mock order:

```txt
recruitment_orders.status = paid
quantity_used = 0
```

## 9. Giai đoạn G: Chuyển công thức màu/content

API VPS cần có:

```txt
GET  /formulas
GET  /formulas/:slug
GET  /user-formulas
POST /user-formulas
POST /user-formulas/copy-from-public
DELETE /user-formulas/:id
```

## 10. Giai đoạn H: Chuyển auth sau cùng

Không chuyển auth đầu tiên.

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

## 11. Giai đoạn I: Payment thật

Sau mock paid order mới nối payment thật.

API VPS:

```txt
POST /payment/create-checkout
POST /payment/webhook
```

Không cho frontend tự set `paid`.

## 12. Cron, backup, monitor

Backup root:

```txt
/srv/backups/tocviet
```

Backup PostgreSQL:

```bash
pg_dump tocvietlab > /srv/backups/tocviet/tocvietlab-$(date +%F).sql
```

Monitor tối thiểu:

```bash
systemctl status tocviet-api --no-pager
journalctl -u tocviet-api -f
systemctl status nginx --no-pager
curl https://api.tocvietlab.studio/health
```

## 13. Checklist cắt Cloudflare D1 khỏi runtime

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

## 14. Rollback

Nếu backend VPS lỗi, quay về mode cũ.

Trên Vercel giữ lại env D1 legacy:

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

Không revert toàn bộ nếu không cần. Chỉ chuyển frontend về API cũ hoặc giữ proxy fallback.

## 15. Không được đụng namespace web khác

Không thao tác vào:

```txt
/srv/apps/vlgn
/var/www/viec-lam-gan-nha
/etc/systemd/system/vlgn-api.service
/etc/app-env/vlgn.env
/srv/backups/vlgn
Postgres schema vlgn
api.vieclamgannha.me nginx config
viec-lam-gan-nha nginx config
```
