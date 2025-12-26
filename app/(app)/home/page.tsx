import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getHome } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function HomePage() {
  const data = await getHome();

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiCard label="Today Sales" value={fmtCurrency(data.kpis.todaySales)} />
        <KpiCard label="Cash Collected" value={fmtCurrency(data.kpis.cashCollected)} />
        <KpiCard label="Low Stock" value={String(data.kpis.lowStockCount)} meta="Items at or below reorder" />
        <KpiCard label="Unpaid Balances" value={String(data.kpis.unpaidBalances)} meta="Sales pending" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Action Queue</div>
                <div className="text-xs text-slate-500">Focus on what needs attention now.</div>
              </div>
              <Link className="text-sm text-slate-900 hover:underline" href="/analytics">View analytics</Link>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <Link href="/inventory/low-stock" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
                <div className="text-sm font-semibold">Low stock</div>
                <div className="mt-1 text-xs text-slate-600">{data.lowStock.length} items to reorder</div>
              </Link>
              <Link href="/purchase-orders" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
                <div className="text-sm font-semibold">Purchase orders</div>
                <div className="mt-1 text-xs text-slate-600">{data.openPOs.length} open POs</div>
              </Link>
              <Link href="/sales" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
                <div className="text-sm font-semibold">Unpaid sales</div>
                <div className="mt-1 text-xs text-slate-600">{data.unpaidSales.length} balances to collect</div>
              </Link>
              <Link href="/invoices" className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100">
                <div className="text-sm font-semibold">Overdue invoices</div>
                <div className="mt-1 text-xs text-slate-600">{data.overdueInvoices.length} invoice(s) overdue</div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="mb-3">
              <div className="text-sm font-semibold">Low stock items</div>
              <div className="text-xs text-slate-500">Quick preview from your inventory ledger.</div>
            </div>

            <div className="space-y-2">
              {data.lowStock.slice(0, 5).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">Stock: {p.units} • Reorder: {p.reorder_level}</div>
                  </div>
                  <Badge variant={p.units === 0 ? "danger" : "warning"}>{p.units === 0 ? "Out" : "Low"}</Badge>
                </Link>
              ))}
              {data.lowStock.length === 0 ? <div className="text-sm text-slate-600">All good — no low stock items.</div> : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Recent unpaid sales</div>
              <div className="text-xs text-slate-500">Collect balances and keep your cashflow healthy.</div>
            </div>
            <Link href="/sales" className="text-sm text-slate-900 hover:underline">View all</Link>
          </div>

          {/* Mobile list */}
<div className="divide-y divide-slate-100 md:hidden">
  {data.unpaidSales.slice(0, 5).map((s) => (
    <Link key={s.id} href={`/sales/${s.id}`} className="block py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-slate-900">{s.sale_number}</div>
          <div className="mt-0.5 truncate text-xs text-slate-500">
            {fmtDate(s.sale_date)}{s.customer_name ? ` • ${s.customer_name}` : ""}
          </div>
        </div>
        <div className="text-sm font-semibold text-slate-900">{fmtCurrency(s.balance_due)}</div>
      </div>
    </Link>
  ))}
</div>

{/* Desktop table */}
<div className="hidden md:block">
            <Table>
                        <THead>
                          <TR>
                            <TH>Sale #</TH>
                            <TH>Date</TH>
                            <TH>Customer</TH>
                            <TH className="text-right">Balance</TH>
                          </TR>
                        </THead>
                        <TBody>
                          {data.unpaidSales.slice(0, 5).map((s) => (
                            <TR key={s.id}>
                              <TD><Link className="font-medium hover:underline" href={`/sales/${s.id}`}>{s.sale_number}</Link></TD>
                              <TD>{fmtDate(s.sale_date)}</TD>
                              <TD>{s.customer_name || "—"}</TD>
                              <TD className="text-right">{fmtCurrency(s.balance_due)}</TD>
                            </TR>
                          ))}
                          {data.unpaidSales.length === 0 ? (
                            <TR><TD colSpan={4} className="text-center text-slate-500">No unpaid sales right now.</TD></TR>
                          ) : null}
                        </TBody>
                      </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
