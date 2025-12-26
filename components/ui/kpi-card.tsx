import { Card, CardContent } from "@/components/ui/card";

export function KpiCard({ label, value, meta }: { label: string; value: string; meta?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
        {meta ? <div className="mt-1 text-xs text-slate-500">{meta}</div> : null}
      </CardContent>
    </Card>
  );
}
