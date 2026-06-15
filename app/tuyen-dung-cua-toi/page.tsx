import { AppShell } from "@/components/app-shell";
import { MyRecruitmentDashboard } from "@/components/recruitment/my-recruitment-dashboard";
import { auth } from "@/auth";

export default async function MyRecruitmentPage() {
  const session = await auth();
  const role = (session?.user as any)?.role ?? "free";

  return (
    <AppShell>
      <MyRecruitmentDashboard role={role} />
    </AppShell>
  );
}
