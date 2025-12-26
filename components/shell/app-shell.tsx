"use client";

import { useState } from "react";
import { Sidebar, SidebarNav } from "@/components/shell/sidebar";
import { TopBar } from "@/components/shell/topbar";
import { MobileBottomNav } from "@/components/shell/mobile-bottom-nav";
import { X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-dvh bg-slate-100">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onAction={onAction}
          onMenu={() => setMobileMenuOpen(true)}
        />

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <main className="min-h-0 flex-1 overflow-auto p-4 md:p-6 pb-24 md:pb-6">
            {children}
          </main>

          {rightRail ? (
            <aside className="hidden w-[320px] overflow-auto border-l border-slate-200 bg-white p-4 lg:block">
              {rightRail}
            </aside>
          ) : null}
        </div>
      </div>

      {/* Mobile navigation */}
      <MobileBottomNav onMore={() => setMobileMenuOpen(true)} />

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
          <button
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[86%] max-w-[340px] overflow-hidden bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-2xl bg-slate-900" />
                <div className="text-sm font-semibold tracking-tight">BizHelm</div>
              </div>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[calc(100%-4rem)] overflow-auto p-4">
              <SidebarNav onNavigate={() => setMobileMenuOpen(false)} showTip={false} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
