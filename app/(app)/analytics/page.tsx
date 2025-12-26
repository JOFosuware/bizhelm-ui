import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { KpiCard } from "@/components/ui/kpi-card";
import { getHome } from "@/lib/data";
import { fmtCurrency } from "@/lib/format";

export default async function AnalyticsPage() {
  const data = await getHome();
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Revenue, cashflow, inventory turns, and customer insights." />

      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Today Sales" value={fmtCurrency(data.kpis.todaySales)} />
        <KpiCard label="Cash Collected" value={fmtCurrency(data.kpis.cashCollected)} />
        <KpiCard label="Low Stock" value={String(data.kpis.lowStockCount)} />
        <KpiCard label="Unpaid" value={String(data.kpis.unpaidBalances)} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Sales trend (stub)</div>
            <div className="mt-1 text-xs text-slate-500">Replace this with your real chart component.</div>
            <div className="mt-4 grid grid-cols-12 items-end gap-2">
              {[4, 6, 3, 9, 7, 10, 5, 8, 6, 11, 7, 9].map((h, i) => (
                <div key={i} className="rounded-xl bg-slate-200" style={{ height: `${h * 10}px` }} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Top products (stub)</div>
            <div className="mt-1 text-xs text-slate-500">Wire to /reports/top-products (or equivalent).</div>
            <div className="mt-4 space-y-3">
              {data.lowStock.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-2xl border border-slate-200 px-3 py-2">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">Stock: {p.units}</div>
                </div>
              ))}
              {data.lowStock.length === 0 ? <div className="text-sm text-slate-600">No data yet.</div> : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
