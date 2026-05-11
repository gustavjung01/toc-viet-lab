import { BookOpen, BrainCircuit, Camera, ClipboardCheck, FlaskConical, Gem, Layers, Palette, PenLine, Scissors, Sparkles, Users } from "lucide-react";

export const navItems = [
  { label: "Kiến thức tóc", href: "/kien-thuc" },
  { label: "Công thức màu", href: "/cong-thuc-mau" },
  { label: "Case thực tế", href: "/case-thuc-te" },
  { label: "Công cụ AI", href: "/cong-cu-ai" },
  { label: "Gói thành viên", href: "/goi-thanh-vien" }
];

export const categories = [
  { title: "Nền tóc & level", count: "128 bài", icon: Layers },
  { title: "Nhuộm màu", count: "842 bài", icon: Palette },
  { title: "Tẩy & nâng nền", count: "246 bài", icon: FlaskConical },
  { title: "Phủ bạc", count: "118 bài", icon: Gem },
  { title: "Sửa lỗi màu", count: "164 bài", icon: ClipboardCheck },
  { title: "Phục hồi tóc", count: "204 bài", icon: Sparkles },
  { title: "Cắt tạo kiểu", count: "312 bài", icon: Scissors },
  { title: "Kinh doanh salon", count: "132 bài", icon: Users }
];

export const articles = [
  { slug:"toc-nen-5-nhuom-nau-lanh-de-bi-anh-cam", title:"Vì sao tóc nền 5 nhuộm nâu lạnh dễ bị ánh cam?", category:"Kỹ thuật nhuộm", level:"Trung cấp", minutes:8, excerpt:"Phân tích sắc tố nền, ánh cam và nguyên tắc kiểm soát màu lạnh trên nền tóc Việt.", visual:"from-[#2d1d14] via-[#85613b] to-[#d7bd83]" },
  { slug:"tay-toc-an-toan-quy-trinh-5-buoc", title:"Tẩy tóc an toàn: Quy trình 5 bước đạt nền vàng chuẩn", category:"Tẩy & nâng nền", level:"Nâng cao", minutes:12, excerpt:"Cách kiểm soát nền, oxy, thời gian và phục hồi trong quá trình nâng sáng.", visual:"from-[#423324] via-[#c9a45c] to-[#f7f1e8]" },
  { slug:"phu-bac-tu-nhien-cho-toc-bac-50-80", title:"Phủ bạc tự nhiên cho tóc bạc 50% - 80%", category:"Phủ bạc", level:"Trung cấp", minutes:7, excerpt:"Tư duy chọn nền, base tự nhiên và cách tránh sáng chân khi phủ bạc.", visual:"from-[#2d2924] via-[#78664b] to-[#d7d2c8]" },
  { slug:"sua-loi-mau-khoi-bi-xanh-reu", title:"Sửa lỗi màu khói bị xanh rêu: nguyên nhân và xử lý", category:"Sửa lỗi màu", level:"Nâng cao", minutes:10, excerpt:"Các tình huống màu khói lệch rêu, tóc xốp hút màu và hướng cân bằng lại.", visual:"from-[#1a2420] via-[#637a4d] to-[#c9a45c]" }
];

export const cases = [
  { title:"Từ nền đen tự nhiên sang Beige Ash ánh khói", tag:"Nâng tông", condition:"Tóc đen tự nhiên, sợi to, khô xơ nhẹ", goal:"Level 8–9, beige ash trong và bóng", time:"240 phút", salon:"Salon Tuấn Nguyễn", visual:"from-[#171717] via-[#7a6046] to-[#d6c0a0]" },
  { title:"Balayage xám khói trên nền nâu tự nhiên", tag:"Balayage", condition:"Nền nâu tự nhiên, thân tóc khỏe", goal:"Hiệu ứng chuyển màu mềm, ít lộ chân", time:"180 phút", salon:"The Labs Hair", visual:"from-[#2b2b2b] via-[#8d8a7f] to-[#f0e6cf]" },
  { title:"Phục hồi và nhuộm nâu socola cho tóc tẩy hư tổn", tag:"Phục hồi", condition:"Tóc tẩy khô, xốp, thiếu bóng", goal:"Nâu socola mềm, giảm xơ, dễ chăm sóc", time:"150 phút", salon:"Linh Black Hair", visual:"from-[#3a261d] via-[#7b4f35] to-[#c9a45c]" }
];

export const formulas = [
  { title:"Lạnh khói ánh rêu", tag:"Balayage", base:"Level 6 - nền vàng cam", developer:"6% / 20 vol", ratio:"1 : 1.5", note:"Khử vàng nhẹ phần thân, giữ khói ở ngọn.", visual:"from-[#20231f] via-[#637a4d] to-[#c9a45c]" },
  { title:"Beige sữa lạnh", tag:"Nhuộm toàn bộ", base:"Level 8 - nền vàng nhạt", developer:"3% / 10 vol", ratio:"1 : 1.5", note:"Tạo be sáng, cân bằng rêu nhẹ.", visual:"from-[#5f5342] via-[#c9a45c] to-[#f7f1e8]" },
  { title:"Nâu trà sữa", tag:"Nhuộm toàn bộ", base:"Level 7 - nền vàng", developer:"3% / 10 vol", ratio:"1 : 1.5", note:"Tông tự nhiên, phù hợp da ấm.", visual:"from-[#3a261d] via-[#9b7354] to-[#d6b48f]" }
];

export const aiTools = [
  { title:"AI tư vấn màu", desc:"Phân tích nền tóc, mục tiêu màu và rủi ro kỹ thuật.", icon: BrainCircuit },
  { title:"Gợi ý công thức", desc:"Tạo công thức tham khảo theo nền, tông và tình trạng tóc.", icon: FlaskConical },
  { title:"Tạo phiếu tư vấn", desc:"Viết nội dung giải thích dễ hiểu cho khách salon.", icon: PenLine },
  { title:"Viết bài Facebook", desc:"Tạo caption, kịch bản chăm sóc và nội dung bán hàng.", icon: BookOpen },
  { title:"Phân tích ảnh tóc", desc:"Mock UI cho phân tích ảnh before/after sau này.", icon: Camera }
];

export const dashboardStats = [
  { label:"Bài đã lưu", value:"32", sub:"bài viết" },
  { label:"Công thức màu", value:"14", sub:"công thức" },
  { label:"Ghi chú", value:"27", sub:"ghi chú" },
  { label:"Credit AI", value:"120", sub:"credit" }
];
