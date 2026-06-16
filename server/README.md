# Toc Viet Lab VPS Backend

Backend skeleton for the safe VPS-first rollout under the `tocviet` namespace.

## Current state

This stage exposes the minimum backend surface:

```txt
GET /health -> 200
GET / -> 200
GET /recruitment/jobs -> 200, empty jobs list for bridge testing
POST/PATCH/DELETE /recruitment/jobs -> 501 not implemented yet
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

Health and skeleton checks:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/recruitment/jobs
```

Expected skeleton response includes:

```txt
namespace: tocviet
source: vps-skeleton
jobs: []
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

Real env file on VPS:

```txt
/etc/app-env/tocviet.env
```

Recommended owner and mode:

```bash
sudo chown root:root /etc/app-env/tocviet.env
sudo chmod 600 /etc/app-env/tocviet.env
```

Do not commit real env values, private keys, tokens, or database passwords.

## Safe namespace

All backend deploy work for Toc Viet must stay under:

```txt
App root: /srv/apps/tocviet
Runtime symlink: /srv/apps/tocviet/current -> /srv/apps/tocviet/source
Source path: /srv/apps/tocviet/source
Backup root: /srv/backups/tocviet
Env file: /etc/app-env/tocviet.env
Service unit: tocviet-api.service
Database schema: tocviet
Public API: https://api.tocvietlab.studio
```

Do not touch another site's runtime namespace such as `vlgn`, `vlgn-api.service`, `vlgn.env`, or `vieclamgannha.me` Nginx config.

## VPS layout target

```txt
/srv/apps/tocviet/current -> /srv/apps/tocviet/source
/srv/apps/tocviet/source
/srv/apps/tocviet/source.git
/srv/apps/tocviet/releases
/srv/apps/tocviet/shared/tmp
/srv/apps/tocviet/shared/uploads
/srv/backups/tocviet
```

Backend service runs from:

```txt
/srv/apps/tocviet/current/server
```

Build output:

```txt
/srv/apps/tocviet/current/server/dist/index.js
```

## VPS quick deploy with systemd

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

Logs:

```bash
journalctl -u tocviet-api -f
```

Test on VPS before Nginx:

```bash
curl http://127.0.0.1:4000/health
curl http://127.0.0.1:4000/recruitment/jobs
```

## Nginx

Template config:

```txt
infra/vps/api.tocvietlab.studio.conf
```

Install on VPS:

```bash
sudo cp infra/vps/api.tocvietlab.studio.conf /etc/nginx/sites-available/api.tocvietlab.studio.conf
sudo ln -sfn /etc/nginx/sites-available/api.tocvietlab.studio.conf /etc/nginx/sites-enabled/api.tocvietlab.studio.conf
sudo nginx -t
sudo systemctl reload nginx
```

After DNS and SSL are configured:

```bash
curl https://api.tocvietlab.studio/health
curl https://api.tocvietlab.studio/recruitment/jobs
```

## Not in scope for this stage

```txt
- No auth migration to VPS yet.
- No D1 migration to the VPS database yet.
- No production route change for /api/recruitment/jobs yet.
- No D1 env removal from Vercel yet.
- No R2 changes.
```
