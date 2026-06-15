# Tóc Việt Lab - Knowledge Platform UI

Bộ code nền giao diện cho website **Tóc Việt Lab**.

## Trạng thái hiện tại

- Public UI: đang hoàn thiện
- Auth: mock/đang nối NextAuth
- Data: static fallback + schema D1/Drizzle bước đầu
- AI: mock
- R2: chưa tích hợp runtime
- Tuyển dụng: đã thêm UI chính, quota logic và schema nền
- Công thức màu: đã có thư viện public DB-first, fallback 6 công thức và trang chi tiết theo slug

## Mục tiêu

- Next.js + Tailwind CSS.
- Responsive desktop/mobile.
- Theme: đen than, vàng champagne, kem sáng.
- Có mock data, chưa nối backend thật toàn bộ.
- Có đủ các trang chính để bắt đầu push Git và phát triển tiếp.

## Cách chạy

```bash
npm install
npm run dev
```

Mở:

```txt
Local: http://localhost:3000
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
- Giới hạn đăng tin theo role tài khoản.
- Khi vượt giới hạn, bán gói đăng thêm.
- Khi muốn nổi bật, bán gói đẩy tin.
- Chi tiết audit nằm ở `RECRUITMENT_LOGIC_AUDIT.md`.

## Chưa làm ở bản này

- Login/register hoàn chỉnh cho mọi flow.
- API/server action thật cho đăng tuyển.
- Thanh toán thật cho gói đăng thêm/đẩy tin.
- Admin/CMS quản lý công thức màu public.
- Copy công thức public sang công thức cá nhân của user.
- R2 upload ảnh.
- AI API thật.
