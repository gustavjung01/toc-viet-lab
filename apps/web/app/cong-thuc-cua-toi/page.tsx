import { AppShell } from "@/components/app-shell";
import { ColorRecipesClient } from "@/components/account/color-recipes-client";

export default function MyFormulaPage() {
  return (
    <AppShell>
      <ColorRecipesClient />
    </AppShell>
  );
}
