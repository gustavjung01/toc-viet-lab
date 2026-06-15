# Audit logic Công thức màu

## Kết luận sau audit

Phần Công thức màu không bị mất trắng. Trước khi sửa, dự án có 3 công thức mock trong `lib/data.ts` và script seed D1 cũng có 3 công thức. Vấn đề chính là trang public `/cong-thuc-mau` đọc data tĩnh, chưa đọc DB và chưa có trang chi tiết từng công thức.

## Logic đã chỉnh

- `/cong-thuc-mau` chuyển sang đọc `/api/formulas`.
- `/api/formulas` ưu tiên đọc bảng `formulas` trong D1.
- Nếu thiếu env D1, DB lỗi hoặc migration chưa chạy, API tự trả fallback từ `lib/formulas.ts`.
- Thêm route chi tiết `/cong-thuc-mau/[slug]`.
- Thêm API chi tiết `/api/formulas/[slug]`.
- Thêm thư viện fallback 6 công thức trong `lib/formulas.ts`.
- Thêm `slug`, `excerpt`, `content`, `difficulty`, `read_time` cho schema `formulas`.
- Thêm migration `0002_formula_content.sql` để nâng cấp DB và seed thêm 3 công thức mới.

## Nguồn dữ liệu đúng

Nguồn chính sau khi deploy:

```txt
D1 formulas table
```

Nguồn chống lỗi khi DB chưa sẵn:

```txt
lib/formulas.ts
```

Không nên quay lại để `/cong-thuc-mau` đọc trực tiếp `lib/data.ts`, vì như vậy bài trong DB có thể tồn tại nhưng UI không thấy.

## Các route liên quan

```txt
/cong-thuc-mau
/cong-thuc-mau/[slug]
/api/formulas
/api/formulas/[slug]
/cong-thuc-cua-toi
/api/user-formulas
```

## Tách luồng public và cá nhân

### Thư viện public

```txt
/cong-thuc-mau
```

Dành cho bài công thức chuẩn của nền tảng, có slug, SEO, ảnh, nội dung chi tiết và có thể mở rộng bằng DB/CMS.

### Công thức cá nhân

```txt
/cong-thuc-cua-toi
```

Dành cho user tự tạo và quản lý công thức riêng. Luồng này vẫn dùng bảng `user_formulas`.

## Việc nên làm tiếp

- Thêm nút copy công thức public sang `user_formulas`.
- Thêm admin/CMS quản lý bảng `formulas`.
- Thêm filter theo nền tóc, nhóm màu, độ khó.
- Thêm test cho fallback khi thiếu D1 env.
- Chạy migration và seed trên D1 production.
