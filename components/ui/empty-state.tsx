import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <Card>
      <CardContent className="py-14 text-center">
        <div className="mx-auto mb-3 h-10 w-10 rounded-2xl bg-slate-100" />
        <div className="text-base font-semibold">{title}</div>
        {description ? <div className="mx-auto mt-2 max-w-md text-sm text-slate-600">{description}</div> : null}
        {actionLabel && onAction ? (
          <div className="mt-5 flex justify-center">
            <Button variant="secondary" onClick={onAction}>{actionLabel}</Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
