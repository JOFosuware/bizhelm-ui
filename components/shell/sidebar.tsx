"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  ShoppingCart,
  Receipt,
  Boxes,
  Users,
  Truck,
  FileText,
  Wallet,
  BarChart3,
  Shield
} from "lucide-react";

export const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/pos", label: "POS", icon: ShoppingCart },
  { href: "/sales", label: "Sales", icon: Receipt },
  { href: "/products", label: "Products", icon: Boxes },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/suppliers", label: "Suppliers", icon: Truck },
  { href: "/purchase-orders", label: "Purchase Orders", icon: FileText },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/expenses", label: "Expenses", icon: Wallet },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/users", label: "Admin", icon: Shield }
] as const;

export function SidebarNav({
  onNavigate,
  showTip = true,
  className
}: {
  onNavigate?: () => void;
  showTip?: boolean;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col", className)}>
      <nav className="flex min-h-0 flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition",
                active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {showTip ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
          Tip: Press <span className="font-semibold">Ctrl/Cmd + K</span> to search.
        </div>
      ) : null}
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden h-full w-[264px] flex-col border-r border-slate-200 bg-white p-4 md:flex">
      <div className="mb-4 flex items-center gap-2 px-2">
        <div className="h-9 w-9 rounded-2xl bg-slate-900" />
        <div className="text-sm font-semibold tracking-tight">BizHelm</div>
      </div>

      <SidebarNav />
    </aside>
  );
}
