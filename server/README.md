# Tóc Việt Lab VPS Backend

Backend skeleton cho giai đoạn VPS-first API.

## Trạng thái hiện tại

Đợt 6 thêm server tối thiểu:

```txt
GET /health -> 200
GET / -> 200
GET /recruitment/jobs -> 200, jobs rỗng để test bridge
POST/PATCH/DELETE /recruitment/jobs -> 501 not-implemented
```

Frontend Vercel vẫn chạy production route cũ. Route bridge để test là:

```txt
/apps/web: /api/backend/health
/apps/web: /api/backend/jobs
```

## Local run

Từ root repo:

```bash
npm run api:build
npm run api:start
```

Hoặc dev mode:

```bash
npm run api:dev
```

Mặc định server chạy port `4000`.

```bash
curl http://localhost:4000/health
curl http://localhost:4000/recruitment/jobs
```

## Env

```txt
PORT=4000
API_PORT=4000
SERVICE_NAME=tocviet-api
APP_VERSION=0.1.0
NODE_ENV=production
CORS_ORIGIN=https://tocvietlab.studio
```

Env thật đặt tại:

```txt
/etc/app-env/tocviet.env
```

Owner/mode đề xuất:

```bash
sudo chown root:root /etc/app-env/tocviet.env
sudo chmod 600 /etc/app-env/tocviet.env
```

## VPS layout mục tiêu

```txt
/srv/apps/tocviet/current -> /srv/apps/tocviet/source
/srv/apps/tocviet/source
/srv/apps/tocviet/source.git
/srv/apps/tocviet/releases
/srv/apps/tocviet/shared/tmp
/srv/apps/tocviet/shared/uploads
/srv/backups/tocviet
```

Backend service chạy từ:

```txt
/srv/apps/tocviet/current/server
```

Build output:

```txt
/srv/apps/tocviet/current/server/dist/index.js
```

## VPS quick deploy với systemd

```bash
cd /srv/apps/tocviet/source
git pull origin main
npm install
npm run api:build

sudo mkdir -p /etc/app-env /srv/backups/tocviet /srv/apps/tocviet/shared/tmp /srv/apps/tocviet/shared/uploads
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

## Nginx

Mẫu config nằm ở:

```txt
infra/vps/api.tocvietlab.studio.conf
```

Cài vào VPS:

```bash
sudo cp infra/vps/api.tocvietlab.studio.conf /etc/nginx/sites-available/api.tocvietlab.studio.conf
sudo ln -sfn /etc/nginx/sites-available/api.tocvietlab.studio.conf /etc/nginx/sites-enabled/api.tocvietlab.studio.conf
sudo nginx -t
sudo systemctl reload nginx
```

Sau khi cấu hình DNS/SSL:

```bash
curl https://api.tocvietlab.studio/health
curl https://api.tocvietlab.studio/recruitment/jobs
```

## Không làm ở đợt này

```txt
- Chưa chuyển auth sang VPS.
- Chưa chuyển D1 sang database VPS.
- Chưa đổi production /api/recruitment/jobs.
- Chưa gỡ D1 env khỏi Vercel.
- Chưa đụng R2.
```
