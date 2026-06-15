import Link from "next/link";
import { AlertTriangle, Briefcase, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { auth } from "@/auth";
import { getRecruitmentLimits, getRecruitmentRoleLabel, recruitmentRoles } from "@/lib/recruitment";

export default async function CreateRecruitmentPostPage() {
  const session = await auth();
  const role = (session?.user as any)?.role ?? "free";
  const limits = getRecruitmentLimits(role);

  return (
    <AppShell>
      <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <section className="rounded-[2rem] bg-charcoal p-7 text-white shadow-soft">
          <div className="inline-flex items-center gap-2 rounded-full bg-champagne/15 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-champagne">
            <Briefcase size={15} /> Đăng tuyển
          </div>
          <h1 className="mt-6 text-3xl font-black leading-tight md:text-4xl">Ai cũng có thể đăng tuyển.</h1>
          <p className="mt-4 leading-8 text-white/65">
            Logic mới không yêu cầu tài khoản phải là salon. Tài khoản chỉ cần đăng nhập, sau đó hệ thống kiểm tra quota đăng tin và lượt đẩy tin theo gói.
          </p>

          <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-bold text-white/60">Gói hiện tại</p>
            <div className="mt-2 text-2xl font-black text-champagne">{getRecruitmentRoleLabel(role)}</div>
            <div className="mt-4 grid gap-3 text-sm text-white/70">
              <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                <span>Tin / tháng</span>
                <strong className="text-white">{limits.monthlyPosts}</strong>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                <span>Tin đang hoạt động</span>
                <strong className="text-white">{limits.activePosts}</strong>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-3">
                <span>Lượt đẩy / tháng</span>
                <strong className="text-white">{limits.monthlyBoosts}</strong>
              </div>
            </div>
          </div>

          <div className="mt-5 flex gap-3 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <p>Form này là UI để khớp logic. Bước tiếp theo là nối server action/API để ghi vào bảng job_posts và trừ quota.</p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#D6A84F]">Thông tin tin tuyển</p>
              <h2 className="mt-2 text-3xl font-black text-charcoal">Tạo tin mới</h2>
            </div>
            <Link href="/tuyen-dung-cua-toi" className="hidden rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-charcoal md:block">
              Tin của tôi
            </Link>
          </div>

          <form className="mt-8 grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Vị trí tuyển
                <input placeholder="VD: Thợ chính chuyên màu" className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Nhóm vị trí
                <select className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" defaultValue="">
                  <option value="" disabled>Chọn nhóm</option>
                  {recruitmentRoles.map((roleName) => <option key={roleName}>{roleName}</option>)}
                </select>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Tên người / đơn vị tuyển
                <input placeholder="VD: Anh Minh, Salon Mộc, Học viện..." className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Loại người tuyển
                <select className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" defaultValue="individual">
                  <option value="individual">Cá nhân</option>
                  <option value="salon">Salon</option>
                  <option value="academy">Học viện</option>
                  <option value="brand">Brand / nhà phân phối</option>
                </select>
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Khu vực
                <input placeholder="VD: Quận 3, TP.HCM" className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-charcoal">
                Lương / thu nhập
                <input placeholder="VD: 15 - 25 triệu + hoa hồng" className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-bold text-charcoal">
              Mô tả công việc
              <textarea rows={5} placeholder="Nêu yêu cầu tay nghề, ca làm, quyền lợi, thông tin liên hệ..." className="rounded-2xl border border-black/10 px-4 py-3 font-medium outline-none focus:border-[#D6A84F]" />
            </label>

            <div className="rounded-3xl bg-cream p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#D6A84F]" />
                <div>
                  <h3 className="font-black text-charcoal">Rule kiểm tra khi submit</h3>
                  <p className="mt-1 text-sm leading-6 text-warmgray">
                    Nếu còn quota: đăng thường. Nếu hết quota: chuyển sang màn mua gói đăng thêm. Nếu chọn nổi bật: kiểm tra lượt đẩy hoặc gói push riêng.
                  </p>
                </div>
              </div>
            </div>

            <button type="button" className="rounded-full bg-charcoal px-6 py-4 text-sm font-extrabold text-champagne shadow-soft transition hover:brightness-110">
              Lưu nháp UI mock
            </button>
          </form>
        </section>
      </div>
    </AppShell>
  );
}
