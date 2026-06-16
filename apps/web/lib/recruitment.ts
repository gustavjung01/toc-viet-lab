export type RecruitmentUserRole = "free" | "member" | "pro";
export type RecruitmentPlanCode = "starter" | "growth" | "boost";

export const recruitmentLimits: Record<
  RecruitmentUserRole,
  {
    monthlyPosts: number;
    activePosts: number;
    monthlyBoosts: number;
  }
> = {
  free: { monthlyPosts: 1, activePosts: 1, monthlyBoosts: 0 },
  member: { monthlyPosts: 3, activePosts: 3, monthlyBoosts: 1 },
  pro: { monthlyPosts: 10, activePosts: 10, monthlyBoosts: 3 },
};

export const recruitmentPlanCards = [
  {
    code: "starter" as const,
    name: "Gói đăng thêm",
    price: "99.000đ",
    unit: "+3 tin / 30 ngày",
    desc: "Mua thêm quota khi tài khoản đã dùng hết số tin miễn phí trong tháng.",
    features: ["Không cần xác minh salon", "+3 credit đăng tin", "Dùng được cho cá nhân, salon, học viện, brand"],
    cta: "Liên hệ mua gói đăng",
  },
  {
    code: "growth" as const,
    name: "Gói tuyển nhiều",
    price: "249.000đ",
    unit: "+10 tin / 30 ngày",
    desc: "Phù hợp người tuyển nhiều vị trí cùng lúc, không khóa theo loại tài khoản salon.",
    popular: true,
    features: ["+10 credit đăng tin", "Nhiều tin hoạt động cùng lúc", "Hỗ trợ rà nội dung tuyển"],
    cta: "Liên hệ mua gói nhiều",
  },
  {
    code: "boost" as const,
    name: "Đẩy tin nổi bật",
    price: "49.000đ",
    unit: "+1 lượt đẩy / 7 ngày",
    desc: "Dành cho tin cần tuyển gấp hoặc muốn tăng lượt xem sau khi đã đăng.",
    features: ["Gắn nhãn nổi bật", "Ưu tiên danh sách", "Không cần nâng cấp salon"],
    cta: "Liên hệ mua lượt đẩy",
  },
];

export const recruitmentRoles = [
  "Thợ chính",
  "Thợ phụ",
  "Kỹ thuật màu",
  "Quản lý salon",
  "Lễ tân / CSKH",
  "Đào tạo viên",
];

export const jobPosts = [
  {
    id: "job-01",
    title: "Tuyển thợ chính chuyên màu",
    employer: "Linh Black Hair",
    employerType: "Cá nhân / salon nhỏ",
    location: "Quận 3, TP.HCM",
    salary: "15 - 25 triệu + hoa hồng",
    type: "Full-time",
    postedAt: "Hôm nay",
    featured: true,
    tags: ["Màu khói", "Balayage", "Có đào tạo"],
    desc: "Cần thợ có tư duy nền tóc Việt, biết tư vấn màu và chăm sóc khách sau dịch vụ.",
  },
  {
    id: "job-02",
    title: "Tuyển thợ phụ học nâng nền",
    employer: "The Labs Hair",
    employerType: "Salon",
    location: "Cầu Giấy, Hà Nội",
    salary: "8 - 12 triệu",
    type: "Full-time",
    postedAt: "2 ngày trước",
    featured: false,
    tags: ["Được kèm nghề", "Tẩy tóc", "Phục hồi"],
    desc: "Ưu tiên bạn chăm chỉ, giao tiếp tốt, muốn lên kỹ thuật màu trong 6 tháng.",
  },
  {
    id: "job-03",
    title: "Cộng tác viên viết nội dung tóc",
    employer: "Tóc Việt Lab",
    employerType: "Nền tảng",
    location: "Remote",
    salary: "Theo bài / theo dự án",
    type: "Part-time",
    postedAt: "5 ngày trước",
    featured: true,
    tags: ["Content", "Kỹ thuật tóc", "Remote"],
    desc: "Tìm người hiểu nghề tóc để biên tập case, công thức màu và tài liệu đào tạo.",
  },
];

export function getRecruitmentLimits(role?: string) {
  if (role === "pro" || role === "member" || role === "free") return recruitmentLimits[role];
  return recruitmentLimits.free;
}

export function getRecruitmentRoleLabel(role?: string) {
  const labels: Record<RecruitmentUserRole, string> = {
    free: "Tài khoản miễn phí",
    member: "Thành viên",
    pro: "Pro Member",
  };

  if (role === "pro" || role === "member" || role === "free") return labels[role];
  return labels.free;
}
