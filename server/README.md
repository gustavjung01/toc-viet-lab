# Toc Viet Lab VPS Backend

Backend skeleton for the safe VPS-first rollout.

## Current state

<<<<<<< HEAD
Đợt 6 thêm server tối thiểu:

```txt
GET /health -> 200
GET / -> 200
GET /recruitment/jobs -> 200, jobs rỗng để test bridge
POST/PATCH/DELETE /recruitment/jobs -> 501 not-implemented
=======
This stage only exposes the minimum backend surface:

```txt
GET /health
GET /
GET|POST|PATCH|DELETE /recruitment/jobs -> 501 for write paths
>>>>>>> 43a781d (Align VPS backend docs and namespace)
```

The Vercel frontend still keeps the legacy production route. The bridge routes for testing are:

```txt
/apps/web: /api/backend/health
/apps/web: /api/backend/jobs
```

## Local run

From the repo root:

```bash
npm run api:build
npm run api:start
```

Or in dev mode:

```bash
npm run api:dev
```

Default port:

```txt
4000
```

Health check:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/recruitment/jobs
```

## Env

```txt
PORT=4000
API_PORT=4000
SERVICE_NAME=tocviet-api
APP_NAMESPACE=tocviet
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
<<<<<<< HEAD
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
=======
cd /srv/apps/tocviet
>>>>>>> 43a781d (Align VPS backend docs and namespace)
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

<<<<<<< HEAD
Xem log:
=======
If the process already exists:
>>>>>>> 43a781d (Align VPS backend docs and namespace)

```bash
journalctl -u tocviet-api -f
```

<<<<<<< HEAD
Test local trên VPS:
=======
## Nginx example
>>>>>>> 43a781d (Align VPS backend docs and namespace)

```bash
curl http://127.0.0.1:4000/health
curl http://127.0.0.1:4000/recruitment/jobs
```

<<<<<<< HEAD
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
=======
After SSL is configured:
>>>>>>> 43a781d (Align VPS backend docs and namespace)

```bash
curl https://api.tocvietlab.studio/health
curl https://api.tocvietlab.studio/recruitment/jobs
```

## Safe namespace

- App root: `/srv/apps/tocviet`
- Backup root: `/srv/backups/tocviet`
- Env file: `/etc/app-env/tocviet.env`
- Service unit: `tocviet-api.service`
- Database schema: `tocviet`
- Public API: `https://api.tocvietlab.studio`

## Not in scope for this stage

```txt
- No auth migration to VPS yet.
- No D1 migration to the VPS database yet.
- No production route change for /api/recruitment/jobs yet.
- No D1 env removal from Vercel yet.
- No R2 changes.
```
