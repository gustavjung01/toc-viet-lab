# VPS API Bridge Env

Ngày lập: 16/06/2026

Tài liệu này ghi lại phần chuẩn bị Đợt 5: frontend Vercel sẵn sàng gọi backend VPS, nhưng chưa cắt D1 legacy.

## Mục tiêu

- Frontend Next.js vẫn chạy trên Vercel.
- D1 legacy vẫn giữ để rollback.
- R2 assets giữ nguyên.
- Backend VPS sẽ dùng domain `https://api.tocvietlab.studio` sau khi triển khai.
- Tuyển dụng là module đầu tiên được test qua VPS bridge.

## Env mới

Trên Vercel có thể thêm sau khi VPS backend có `/health`:

```txt
SERVER_API_BASE_URL=https://api.tocvietlab.studio
NEXT_PUBLIC_API_BASE_URL=https://api.tocvietlab.studio
```

Ghi chú:

- `SERVER_API_BASE_URL` dùng cho Next API route server-side proxy.
- `NEXT_PUBLIC_API_BASE_URL` để dành cho client-side call sau này nếu cần.
- Không gỡ D1 env khi chưa qua checklist cắt runtime.

## Route bridge đã thêm

```txt
GET /api/backend/health
GET /api/backend/jobs
POST /api/backend/jobs
```

Ý nghĩa:

- `/api/backend/health` gọi VPS `/health` để kiểm tra kết nối.
- `/api/backend/jobs` proxy sang VPS `/recruitment/jobs` để test tuyển dụng.
- Route legacy production vẫn là `/api/recruitment/jobs`.

## Cách test local

Chưa set VPS env:

```powershell
Set-Location "F:\1_A_Disk_D\Toc-Viet-Lab\apps\web"
npm run dev
```

Mở:

```txt
http://localhost:3000/api/backend/health
http://localhost:3000/api/backend/jobs
```

Kỳ vọng: trả `503` và báo chưa cấu hình backend VPS.

Khi có VPS backend:

```powershell
$env:SERVER_API_BASE_URL="https://api.tocvietlab.studio"
$env:NEXT_PUBLIC_API_BASE_URL="https://api.tocvietlab.studio"
npm run dev
```

Mở lại:

```txt
http://localhost:3000/api/backend/health
http://localhost:3000/api/backend/jobs
```

Kỳ vọng:

- `/api/backend/health` trả dữ liệu từ VPS `/health`.
- `/api/backend/jobs` trả dữ liệu từ VPS `/recruitment/jobs`.
- Response có header `x-tocviet-api-source: vps` nếu đi qua proxy helper.

## Khi nào mới đổi production route?

Chỉ đổi UI hoặc `/api/recruitment/jobs` sang VPS sau khi đủ:

```txt
- VPS /health OK qua HTTPS.
- GET /recruitment/jobs OK.
- GET /recruitment/jobs/mine OK với auth/cookie phù hợp.
- POST /recruitment/jobs OK.
- PATCH/DELETE job OK.
- Quota đăng tin đúng.
- Quota đẩy tin đúng.
- Gói đăng thêm/gói đẩy có flow test rõ.
- Rollback D1 legacy còn hoạt động.
```

## Không được làm trong giai đoạn này

```txt
- Không gỡ D1 env khỏi Vercel.
- Không đổi R2 asset flow.
- Không chuyển auth sang VPS trước tuyển dụng.
- Không đổi route production nếu VPS chưa đủ checklist.
```
