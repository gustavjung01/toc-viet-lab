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

## Quota hiện tại

| Role tài khoản | Tin/tháng | Tin đang hoạt động | Lượt đẩy/tháng |
| --- | ---: | ---: | ---: |
| Free | 1 | 1 | 0 |
| Member | 3 | 3 | 1 |
| Pro | 10 | 10 | 3 |

Các quota này đang được khai báo trong `lib/recruitment.ts`. API tuyển dụng đọc cùng nguồn này để kiểm quyền đăng tin và quyền đẩy tin.

## API đã thêm

```txt
GET    /api/recruitment/jobs
POST   /api/recruitment/jobs
GET    /api/recruitment/jobs?mine=1
PATCH  /api/recruitment/jobs/[id]
DELETE /api/recruitment/jobs/[id]
```

### Public listing

`GET /api/recruitment/jobs` đọc bảng `job_posts`, chỉ trả tin `published` chưa hết hạn. Tin có `boost_until > now` được sort lên trước. Nếu thiếu D1 env hoặc DB lỗi, API trả fallback từ `lib/recruitment.ts`.

### Đăng tin

`POST /api/recruitment/jobs` yêu cầu đăng nhập và D1 env. API kiểm:

1. `session.user.id` tồn tại.
2. Không kiểm salon.
3. Số tin đã đăng trong tháng.
4. Số tin đang hoạt động.
5. Lượt mua thêm trong `recruitment_orders` nếu đã hết quota miễn phí.

Nếu còn quota, API tạo dòng mới trong `job_posts` với `status = published` và hạn 30 ngày.

### Quản lý tin của tôi

`GET /api/recruitment/jobs?mine=1` yêu cầu đăng nhập, trả danh sách tin của user và object `usage` gồm:

- `postsThisMonth`
- `activePosts`
- `boostsThisMonth`
- `paidPostCredits`
- `paidBoostCredits`
- `remainingPosts`
- `remainingActive`
- `remainingBoosts`
- `canPost`

### Đóng/mở/đẩy tin

`PATCH /api/recruitment/jobs/[id]` hỗ trợ:

```json
{ "action": "close" }
{ "action": "publish" }
{ "action": "boost" }
```

Action `boost` kiểm lượt đẩy theo role và gói đã thanh toán. Nếu còn lượt, API set `boost_until` thêm 7 ngày.

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

## UI đã nối API

- Header public có mục `Tuyển dụng`.
- Trang chủ có section preview tuyển dụng.
- Mobile bottom nav có mục `Tuyển`.
- `/tuyen-dung` đọc API public, fallback nếu DB chưa sẵn.
- `/tuyen-dung/dang-tin` dùng form client gọi `POST /api/recruitment/jobs`.
- `/tuyen-dung-cua-toi` dùng client dashboard gọi `GET /api/recruitment/jobs?mine=1`.
- Dashboard có nút đóng/mở tin và đẩy tin qua `PATCH /api/recruitment/jobs/[id]`.
- AppShell có menu `Tin tuyển dụng`.
- Middleware bảo vệ route đăng tin và quản lý tin.

## Việc còn lại để đi production

1. Tạo thanh toán thật cho gói đăng vượt và đẩy tin.
2. Khi thanh toán thành công, ghi `recruitment_orders` với `status = paid`.
3. Thêm kiểm duyệt tin tuyển dụng trước khi public nếu cần.
4. Thêm filter public: khu vực, vị trí, lương, loại hình làm việc.
5. Thêm cron/job hết hạn tin và hết hạn boost.
6. Viết test cho rule: user không có salon vẫn đăng được nếu còn quota.
