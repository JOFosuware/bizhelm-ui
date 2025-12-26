import { Sidebar } from "@/components/shell/sidebar";
import { TopBar } from "@/components/shell/topbar";

export function AppShell({
  title,
  subtitle,
  actionLabel,
  onAction,
  children,
  rightRail
}: {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  rightRail?: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar title={title} subtitle={subtitle} actionLabel={actionLabel} onAction={onAction} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
          {rightRail ? (
            <aside className="hidden w-[320px] border-l border-slate-200 bg-white p-4 lg:block overflow-auto">
              {rightRail}
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  );
}
