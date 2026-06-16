# Tóc Việt Lab - Knowledge Platform UI

Bộ code nền giao diện cho website **Tóc Việt Lab**.

## Trạng thái hiện tại

- Ưu tiên hiện tại: frontend public chạy ổn trên Vercel trước
- Backend VPS: để sau, chưa triển khai trong giai đoạn này
- Database mới: tính sau, chưa chuyển lúc này
- R2: giữ như hiện tại cho ảnh/assets
- Public UI: đang hoàn thiện
- Auth: mock/đang nối NextAuth
- Data: static fallback + schema D1/Drizzle bước đầu
- AI: mock
- Tuyển dụng: đã có UI chính, API đăng tin, quota logic, API quản lý tin và schema nền
- Công thức màu: đã có thư viện public DB-first, fallback 6 công thức và trang chi tiết theo slug

## Mục tiêu giai đoạn Vercel-first

- Next.js + Tailwind CSS chạy ổn trên Vercel.
- Responsive desktop/mobile.
- Theme: đen than, vàng champagne, kem sáng.
- Các trang public có fallback khi chưa có DB thật.
- R2 asset URL vẫn dùng qua `NEXT_PUBLIC_ASSET_BASE_URL`.
- Chưa phụ thuộc VPS để public site chạy.
- Chi tiết nằm ở `VERCEL_FRONTEND_FIRST_PLAN.md`.

## Cách chạy

```bash
npm install
npm run dev
```

Mở:

```txt
Local: http://localhost:3000
```

Build test trước khi deploy Vercel:

```bash
npm run build
```

## Trang đã có

Public:

```txt
/
/kien-thuc
/kien-thuc/[slug]
/case-thuc-te
/cong-thuc-mau
/cong-thuc-mau/[slug]
/tuyen-dung
/goi-thanh-vien
/cong-cu-ai
/login
```

Member/account:

```txt
/dashboard
/tuyen-dung-cua-toi
/tuyen-dung/dang-tin
/so-tay
/cong-thuc-cua-toi
/ai-tu-van-mau
/credit-ai
```

## Logic Công thức màu

- `/cong-thuc-mau` đọc `/api/formulas`.
- `/api/formulas` ưu tiên đọc bảng `formulas` trong D1.
- Nếu thiếu env D1 hoặc DB lỗi, API fallback về `lib/formulas.ts`.
- Mỗi công thức public có `slug`, `excerpt`, `content`, `difficulty`, `read_time`.
- Trang chi tiết nằm ở `/cong-thuc-mau/[slug]`.
- Chi tiết audit nằm ở `FORMULA_LOGIC_AUDIT.md`.

## Logic tuyển dụng

- Bất cứ tài khoản đăng nhập nào cũng có thể đăng tuyển.
- Không yêu cầu tài khoản phải có salon.
- `/tuyen-dung` đọc `/api/recruitment/jobs`, fallback khi D1 chưa sẵn.
- `/tuyen-dung/dang-tin` gọi `POST /api/recruitment/jobs` để tạo tin thật.
- `/tuyen-dung-cua-toi` gọi `GET /api/recruitment/jobs?mine=1` để lấy tin và quota của user.
- `PATCH /api/recruitment/jobs/[id]` hỗ trợ đóng/mở tin và đẩy tin.
- Khi vượt giới hạn, API trả lỗi để UI dẫn sang gói đăng thêm hoặc đẩy tin.
- Chi tiết audit nằm ở `RECRUITMENT_LOGIC_AUDIT.md`.

## Tạm hoãn

- Backend VPS / `server/` skeleton.
- `api.tocvietlab.studio`.
- PostgreSQL/SQLite VPS.
- Thanh toán thật cho gói đăng thêm/đẩy tin.
- Webhook/handler ghi `recruitment_orders` sau thanh toán.
- Chuyển auth sang VPS.
- Chuyển D1 sang DB mới.

## Chưa làm ở bản này

- Login/register hoàn chỉnh cho mọi flow.
- Admin/CMS quản lý công thức màu public.
- Copy công thức public sang công thức cá nhân của user.
- Filter public cho tuyển dụng và công thức màu.
- R2 upload ảnh runtime.
- AI API thật.
