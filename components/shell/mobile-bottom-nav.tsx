"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ShoppingCart, Receipt, Boxes, MoreHorizontal } from "lucide-react";

const items = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/pos", label: "POS", icon: ShoppingCart },
  { href: "/sales", label: "Sales", icon: Receipt },
  { href: "/products", label: "Products", icon: Boxes }
] as const;

export function MobileBottomNav({ onMore }: { onMore: () => void }) {
  const pathname = usePathname();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 pb-[env(safe-area-inset-bottom)] pt-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/home" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex w-full flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-[11px] transition",
                active ? "text-slate-900" : "text-slate-500"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "" : "")} />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={onMore}
          className="flex w-full flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-[11px] text-slate-500 transition hover:bg-slate-50"
          aria-label="More"
        >
          <MoreHorizontal className="h-5 w-5" />
          <span className="truncate">More</span>
        </button>
      </div>
    </div>
  );
}
