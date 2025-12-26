import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getSale } from "@/lib/data";
import { fmtCurrency, fmtDateTime } from "@/lib/format";

export default async function SaleDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const sale = await getSale(id);
  if (!sale) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Sale ${sale.sale_number}`}
        subtitle="Sale overview, payments, and next actions."
        secondary={
          <Link href="/sales" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">
            ← Back to sales
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Customer</div>
                <div className="text-sm font-medium">{sale.customer_name || "Walk-in"}</div>
                <div className="mt-1 text-xs text-slate-500">{fmtDateTime(sale.sale_date)}</div>
              </div>
              <Badge variant={sale.status === "paid" ? "success" : "warning"}>{sale.status}</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Total</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(sale.total_amount)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Paid</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(sale.amount_paid)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Balance</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(sale.balance_due)}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Payments</div>
              <div className="mt-1 text-xs text-slate-500">
                Wire to <span className="font-medium">POST /sales/{"{id}"}/payments</span> and show the payments list from <span className="font-medium">GET /sales/{"{id}"}</span>.
              </div>

              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Payment drawer not enabled in this starter. Add it using a Drawer and your payments endpoint.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Next actions</div>
            <div className="mt-1 text-xs text-slate-500">Common follow-ups for a sale.</div>
            <div className="mt-4 space-y-2">
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                Add payment
              </Link>
              <Link href="/invoices" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                Generate invoice
              </Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                Print receipt
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
