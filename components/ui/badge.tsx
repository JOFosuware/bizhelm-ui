import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "danger" | "info";

const variants: Record<BadgeVariant, string> = {
  default: "bg-slate-100 text-slate-700",
  secondary: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700"
};

export function Badge({ variant = "default", className, children }: { variant?: BadgeVariant; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex h-6 items-center rounded-full px-2 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
