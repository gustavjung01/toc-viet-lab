import { AppShell } from "@/components/app-shell";
import { AccountSettingsPanel } from "@/components/account/account-settings-panel";

export default function SettingsPage() {
  return (
    <AppShell>
      <AccountSettingsPanel />
    </AppShell>
  );
}
