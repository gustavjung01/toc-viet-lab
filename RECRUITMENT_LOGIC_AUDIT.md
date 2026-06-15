# Audit logic tuyển dụng Tóc Việt Lab

## Mục tiêu sản phẩm

Tuyển dụng trở thành một mảng chính của Tóc Việt Lab, ngang hàng với kiến thức, case, công thức màu và công cụ AI.

Logic cốt lõi:

1. Bất cứ tài khoản đăng nhập nào cũng có thể tuyển dụng.
2. Không bắt buộc tài khoản phải là salon.
3. Hệ thống giới hạn số tin miễn phí và số tin đang hoạt động.
4. Khi vượt giới hạn, người dùng mua gói đăng thêm.
5. Khi muốn nổi bật, người dùng mua lượt đẩy tin riêng.

## Rule quyền đăng tuyển

Không dùng điều kiện `hasSalon`, `salonId` hoặc `salon_verified` để cho phép đăng tin.

Điều kiện đúng:

```txt
isLoggedIn === true
AND quota còn lượt đăng hoặc user có order tuyển dụng đã thanh toán còn lượt
```

Điều kiện sai cần tránh:

```txt
isLoggedIn === true
AND user.salonId != null
```

## Quota đề xuất

| Role tài khoản | Tin/tháng | Tin đang hoạt động | Lượt đẩy/tháng |
| --- | ---: | ---: | ---: |
| Free | 1 | 1 | 0 |
| Member | 3 | 3 | 1 |
| Pro | 10 | 10 | 3 |

Các quota này đang được khai báo trong `lib/recruitment.ts` để UI và server rule sau này cùng dùng một nguồn.

## Luồng đăng tin chuẩn

1. User vào `/tuyen-dung/dang-tin`.
2. Middleware yêu cầu đăng nhập.
3. Server lấy `user.id` và `user.role` từ session.
4. Server kiểm tra số tin đã đăng trong kỳ hiện tại.
5. Server kiểm tra số tin đang hoạt động.
6. Nếu còn quota: tạo `job_posts` status `published` hoặc `draft`.
7. Nếu hết quota: redirect sang màn mua gói đăng vượt.
8. Nếu mua thành công: ghi `recruitment_orders`, tăng lượt khả dụng.

## Luồng đẩy tin

1. User chọn tin thuộc chính mình.
2. Tin phải ở trạng thái `published`.
3. Nếu còn lượt đẩy theo role hoặc order đã thanh toán: set `boost_until`.
4. Nếu hết lượt: redirect sang mua gói `boost`.
5. Public listing ưu tiên sort theo `boost_until > now` trước, rồi `created_at`.

## Bảng dữ liệu đã thêm

### `job_posts`

Bảng tin tuyển dụng. Khóa chủ là `employer_user_id`, không phải `salon_id`, để đảm bảo cá nhân cũng đăng được.

Trường quan trọng:

- `employer_user_id`: user đăng tin.
- `employer_display_name`: tên hiển thị của người hoặc đơn vị tuyển.
- `employer_type`: `individual`, `salon`, `academy`, `brand`.
- `plan_code`: `free`, `starter`, `growth`.
- `boost_until`: thời điểm hết hiệu lực đẩy tin.
- `status`: `draft`, `published`, `expired`, `closed`, `rejected`.

### `recruitment_orders`

Bảng đơn mua lượt đăng hoặc lượt đẩy.

Trường quan trọng:

- `order_type`: `post_package` hoặc `boost_package`.
- `package_code`: `starter`, `growth`, `boost`.
- `quantity_total`, `quantity_used`: dùng để trừ lượt.
- `status`: `pending`, `paid`, `failed`, `refunded`.
- `payment_ref`: mã giao dịch từ cổng thanh toán sau này.

## Những điểm UI đã khớp

- Header public có mục `Tuyển dụng`.
- Trang chủ có section preview tuyển dụng.
- Mobile bottom nav có mục `Tuyển`.
- Có trang public `/tuyen-dung`.
- Có trang đăng tin `/tuyen-dung/dang-tin`.
- Có trang tài khoản `/tuyen-dung-cua-toi`.
- AppShell có menu `Tin tuyển dụng`.
- Middleware bảo vệ route đăng tin và quản lý tin.

## Việc còn lại để đi production

1. Tạo server action/API thật cho đăng tin.
2. Tạo service tính quota theo tháng và theo order đã thanh toán.
3. Tạo màn thanh toán thật cho gói đăng vượt và đẩy tin.
4. Thêm kiểm duyệt tin tuyển dụng.
5. Thêm filter public: khu vực, vị trí, lương, loại hình làm việc.
6. Thêm cron/job hết hạn tin và hết hạn boost.
7. Viết test cho rule: user không có salon vẫn đăng được nếu còn quota.
