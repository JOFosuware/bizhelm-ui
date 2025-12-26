import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  onAction,
  secondary
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  secondary?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        {secondary}
        {actionLabel && actionHref ? (
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : actionLabel && onAction ? (
          <Button onClick={onAction}>{actionLabel}</Button>
        ) : null}
      </div>
    </div>
  );
}
