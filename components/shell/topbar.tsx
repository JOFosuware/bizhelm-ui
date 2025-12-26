"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";

export function TopBar({
  title,
  subtitle,
  actionLabel,
  onAction
}: {
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="min-w-0">
          {title ? <div className="truncate text-sm font-semibold">{title}</div> : null}
          {subtitle ? <div className="truncate text-xs text-slate-500">{subtitle}</div> : null}
        </div>

        <div className="hidden min-w-[360px] max-w-[720px] flex-1 md:block">
          <Input placeholder="Search products, customers, sales…" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actionLabel && onAction ? (
          <Button variant="secondary" onClick={onAction}>
            <Plus className="h-4 w-4" />
            {actionLabel}
          </Button>
        ) : null}
        <Button variant="tertiary" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="h-9 w-9 rounded-full bg-slate-200" />
      </div>
    </header>
  );
}
