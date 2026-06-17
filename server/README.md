# Toc Viet Lab VPS Backend

PostgreSQL-backed backend for the safe VPS-first rollout under the `tocviet` namespace.

## Current state

This stage exposes the minimum backend surface:

```txt
GET /health -> 200
GET / -> 200
GET /recruitment/jobs -> 200 when DATABASE_URL is configured
GET /recruitment/jobs -> 503 when DATABASE_URL is missing
GET /recruitment/jobs?mine=1 -> 501
POST /recruitment/jobs -> 201 when INTERNAL_API_SECRET + user headers are present
PATCH/DELETE /recruitment/jobs -> 501
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

Health and recruitment checks:

```bash
curl http://localhost:4000/health
curl http://localhost:4000/recruitment/jobs
```

Expected successful recruitment response includes:

```txt
namespace: tocviet
source: vps-postgres
jobs: []
```

Write requests are intentionally internal. The VPS backend expects:

```txt
x-tocviet-source: vercel-next-proxy
x-internal-api-secret: <shared secret>
x-tocviet-user-id: <logged-in user id>
x-tocviet-user-role: free | member | pro
```

Optional user headers forwarded by the Vercel bridge:

```txt
x-tocviet-user-display-name
x-tocviet-user-email
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
DATABASE_URL=postgres://tocviet:change_me@127.0.0.1:5432/tocviet
INTERNAL_API_SECRET=change_me
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

## PostgreSQL migration

Migration file:

```txt
server/migrations/001_recruitment.sql
server/migrations/002_recruitment_quota.sql
```

Apply it on the VPS:

```bash
cd /srv/apps/tocviet/source
psql "$DATABASE_URL" -f server/migrations/001_recruitment.sql
psql "$DATABASE_URL" -f server/migrations/002_recruitment_quota.sql
```

If your VPS user cannot reach `psql` directly, run the same command with the database owner account or via `sudo -u postgres`.

## VPS quick deploy with systemd

```bash
cd /srv/apps/tocviet/source
git pull origin main
npm install
npm run api:build

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

Example internal write smoke test on the VPS:

```bash
curl -X POST http://127.0.0.1:4000/recruitment/jobs \
  -H "Content-Type: application/json" \
  -H "x-tocviet-source: vercel-next-proxy" \
  -H "x-internal-api-secret: change_me" \
  -H "x-tocviet-user-id: user-123" \
  -H "x-tocviet-user-role: free" \
  -d '{"title":"Test","position":"Test","employerDisplayName":"Test","city":"HCM","description":"Test"}'
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
