import { AppShell } from "@/components/app-shell";
import { NotebookClient } from "@/components/account/notebook-client";

export default function NotebookPage() {
  return (
    <AppShell>
      <NotebookClient />
    </AppShell>
  );
}
