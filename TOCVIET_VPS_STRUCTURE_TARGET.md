# Tóc Việt Lab VPS Structure Target

Nguồn tham chiếu: live VPS audit của `vieclamgannha.me`.
Ngày lập: 16/06/2026.

Mục tiêu tài liệu này là chuẩn hóa cấu trúc VPS cho Tóc Việt Lab theo mô hình đã chạy ổn ở `vieclamgannha.me`, nhưng đổi namespace, domain, service, env và schema cho Tóc Việt.

## Host

```txt
Hostname: vps-canada-1-1-e1 hoặc VPS mới tương đương
Main app runtime target: /srv/apps/tocviet/source
API domain: https://api.tocvietlab.studio
Frontend domain: https://tocvietlab.studio
```

## Application Layout

### Runtime tree đề xuất

```txt
/srv/apps/tocviet/current -> /srv/apps/tocviet/source
/srv/apps/tocviet/source.git
/srv/apps/tocviet/source
  apps
  server
  dist hoặc server/dist
  docs
  infra
  node_modules
  public
  scripts
  package.json
  package-lock.json

/srv/apps/tocviet/releases/20260616_xxxxxx_<sha>
/srv/apps/tocviet/shared/tmp
/srv/apps/tocviet/shared/uploads
```

Ghi chú:

- `current` là symlink runtime, giống mô hình `vlgn/current -> vlgn/source`.
- Code backend Tóc Việt hiện nằm trong `server/`.
- Build output backend hiện là `server/dist/index.js`.
- Không deploy backend từ release cũ nếu đã chốt `current -> source`.

### Live web root đề xuất

Frontend vẫn ưu tiên Vercel, nên VPS web root chỉ để asset tĩnh hoặc fallback bảo trì nếu cần:

```txt
/var/www/toc-viet-lab
  assets
  data
  images
  js
```

Không chuyển frontend Next.js production sang VPS trong giai đoạn này.

## Backend Service

### systemd unit đề xuất

```txt
Service: tocviet-api.service
Unit file: /etc/systemd/system/tocviet-api.service
Working directory: /srv/apps/tocviet/current/server
Environment file: /etc/app-env/tocviet.env
Exec: /usr/bin/node dist/index.js
User/group: www-data
Restart policy: always
```

Lý do chọn systemd:

- Khớp mô hình `vlgn-api.service` đã ổn định.
- Không phụ thuộc PM2 nếu VPS chuẩn đang dùng systemd.
- Dễ audit bằng `systemctl status`, `journalctl`.

## Config / Secret Paths

```txt
App env directory: /etc/app-env
Active env file: /etc/app-env/tocviet.env
Owner: root
Mode: 600
```

Env tối thiểu giai đoạn skeleton:

```txt
PORT=4000
API_PORT=4000
SERVICE_NAME=tocviet-api
APP_VERSION=0.1.0
NODE_ENV=production
CORS_ORIGIN=https://tocvietlab.studio
```

Env database khi chuyển khỏi D1:

```txt
DATABASE_URL=postgres://...
DATABASE_SCHEMA=tocviet
```

Không commit token thật hoặc `.env` thật vào repo.

## Nginx

### Enabled site files đề xuất

```txt
/etc/nginx/sites-enabled/api.tocvietlab.studio.conf
/etc/nginx/sites-enabled/tocvietlab.studio.conf
```

### Available site files đề xuất

```txt
/etc/nginx/sites-available/api.tocvietlab.studio.conf
/etc/nginx/sites-available/tocvietlab.studio.conf
```

Trong giai đoạn frontend vẫn ở Vercel, file `tocvietlab.studio.conf` không bắt buộc trên VPS. Trọng tâm là `api.tocvietlab.studio.conf` proxy về `127.0.0.1:4000`.

## Backups

### Backup root đề xuất

```txt
/srv/backups/tocviet
```

### Backup categories đề xuất

```txt
pre-vps-api-deploy
pre-db-cutover
pg-cutover
sqlite-or-d1-export-before-cutover
backend-code-deploy
```

### Ví dụ backup paths

```txt
/srv/backups/tocviet/pre-vps-api-deploy/20260616_120000/
/srv/backups/tocviet/pg-cutover/20260616_121500/
/srv/backups/tocviet/backend-code-deploy/20260616_123000/
```

## Database Target

Giai đoạn hiện tại:

```txt
Database mode: D1 legacy trên Vercel/Cloudflare
Runtime API: Next API legacy + VPS bridge test
```

Giai đoạn VPS backend thật:

```txt
Database mode: Postgres
Schema: tocviet
Owner/app user: tocviet_app hoặc tương đương
```

Legacy D1 chỉ được cắt sau khi checklist đã đủ.

## Public API Endpoints

### Skeleton hiện có

```txt
https://api.tocvietlab.studio/health
https://api.tocvietlab.studio/recruitment/jobs
```

### Bridge từ Vercel hiện có

```txt
https://tocvietlab.studio/api/backend/health
https://tocvietlab.studio/api/backend/jobs
```

### Endpoint mục tiêu sau khi chuyển recruitment

```txt
GET    /recruitment/jobs
GET    /recruitment/jobs/mine
POST   /recruitment/jobs
PATCH  /recruitment/jobs/:id
DELETE /recruitment/jobs/:id
POST   /recruitment/orders/mock-paid hoặc payment webhook thật
```

## Notes for Future Backend Agents

Mọi backend change nên tôn trọng:

```txt
tocviet-api.service
/etc/app-env/tocviet.env
Postgres schema tocviet
/srv/apps/tocviet/current -> /srv/apps/tocviet/source
/srv/backups/tocviet
```

Không đổi các phần sau khi chưa có checklist:

```txt
- Không gỡ D1 env khỏi Vercel.
- Không đổi R2 asset flow.
- Không chuyển auth sang VPS trước recruitment.
- Không đổi frontend từ Vercel sang VPS.
- Không dùng route production VPS nếu /health, recruitment read/write, quota và rollback chưa pass.
```

## Deployment Commands Draft

```bash
sudo mkdir -p /srv/apps/tocviet /srv/backups/tocviet /etc/app-env
sudo chown -R www-data:www-data /srv/apps/tocviet

cd /srv/apps/tocviet/source
git pull origin main
npm install
npm run api:build

sudo cp infra/vps/tocviet-api.service /etc/systemd/system/tocviet-api.service
sudo systemctl daemon-reload
sudo systemctl enable tocviet-api
sudo systemctl restart tocviet-api
sudo systemctl status tocviet-api --no-pager

curl http://127.0.0.1:4000/health
curl https://api.tocvietlab.studio/health
```
