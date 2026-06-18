import { AdminShell } from "@/components/admin/shell";
import { AdminGuardMessage } from "@/components/admin/guard-message";
import { RecruitmentJobsManager } from "@/components/admin/recruitment-jobs-manager";
import { readAdminAccess } from "@/lib/admin-permission";

export default async function AdminRecruitmentJobsPage() {
  const access = await readAdminAccess();
  if (!access.ok) return <AdminGuardMessage status={access.status} reason={access.reason} />;

  return (
    <AdminShell>
      <RecruitmentJobsManager />
    </AdminShell>
  );
}
