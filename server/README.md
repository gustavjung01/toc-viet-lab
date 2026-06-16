# Tóc Việt Lab VPS Backend

Backend skeleton cho giai đoạn VPS-first API.

## Trạng thái hiện tại

Đợt 6 chỉ thêm server tối thiểu:

```txt
GET /health
GET /
GET|POST|PATCH|DELETE /recruitment/jobs -> 501 not-implemented
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

## VPS quick deploy

```bash
cd /var/www/toc-viet-lab
git pull origin main
npm install
npm run api:build
pm2 start server/dist/index.js --name tocviet-api --update-env
pm2 save
pm2 logs tocviet-api
```

Nếu process đã tồn tại:

```bash
pm2 restart tocviet-api --update-env
pm2 logs tocviet-api
```

## Nginx gợi ý

```nginx
server {
  server_name api.tocvietlab.studio;

  location / {
    proxy_pass http://127.0.0.1:4000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Sau khi cấu hình SSL:

```bash
curl https://api.tocvietlab.studio/health
```

## Không làm ở đợt này

```txt
- Chưa chuyển auth sang VPS.
- Chưa chuyển D1 sang database VPS.
- Chưa đổi production /api/recruitment/jobs.
- Chưa gỡ D1 env khỏi Vercel.
- Chưa đụng R2.
```
