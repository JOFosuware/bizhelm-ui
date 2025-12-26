import { AppShell } from "@/components/shell/app-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="BizHelm" subtitle="Operations dashboard">
      {children}
    </AppShell>
  );
}
