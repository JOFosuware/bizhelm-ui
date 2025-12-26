import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getPurchaseOrder } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function PurchaseOrderDetailPage({ params }: { params: { id: string } }) {
  const po = await getPurchaseOrder(Number(params.id));
  if (!po) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={po.po_number}
        subtitle={`Supplier: ${po.supplier_name}`}
        secondary={<Link href="/purchase-orders" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">← Back to purchase orders</Link>}
        actionLabel={po.status === "received" ? undefined : "Receive"}
        actionHref={po.status === "received" ? undefined : `/purchase-orders/${po.id}/receive`}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="grid gap-2">
                <div className="text-xs text-slate-500">Created</div>
                <div className="text-sm font-medium">{fmtDate(po.created_at)}</div>
              </div>
              <Badge variant={po.status === "received" ? "success" : po.status === "partially_received" ? "warning" : "secondary"}>{po.status}</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Expected delivery</div>
                <div className="mt-1 text-sm font-medium">{po.expected_delivery ? fmtDate(po.expected_delivery) : "—"}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Total</div>
                <div className="mt-1 text-sm font-medium">{fmtCurrency(po.total_amount)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Next step</div>
                <div className="mt-1 text-sm font-medium">{po.status === "received" ? "Close PO" : "Receive items"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Line items</div>
              <div className="mt-1 text-xs text-slate-500">
                Render PO items here from <span className="font-medium">GET /purchase-orders/{"{id}"}</span>.
              </div>
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Add a line-items table (ordered vs received) and totals summary.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Actions</div>
            <div className="mt-1 text-xs text-slate-500">Workflow actions for purchasing.</div>
            <div className="mt-4 space-y-2">
              <Link href={`/purchase-orders/${po.id}/receive`} className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Receive stock</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Update status</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Export / Print</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
