import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listPurchaseOrders } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function PurchaseOrdersPage() {
  const pos = await listPurchaseOrders();
  return (
    <div className="space-y-4">
      <PageHeader title="Purchase Orders" subtitle="Create POs, track deliveries, and receive stock." actionLabel="New PO" actionHref="#" />

            <div className="rounded-2xl border border-slate-200 bg-white">
        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {pos.map((po) => (
            <Link key={po.id} href={`/purchase-orders/${po.id}`} className="block p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{po.po_number}</div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {fmtDate(po.created_at)}{po.supplier_name ? ` • ${po.supplier_name}` : ""}
                  </div>
                </div>
                <Badge variant={po.status === "partially_received" ? "warning" : "info"}>{po.status.replaceAll("_", " ")}</Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">Total</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{fmtCurrency(po.total_amount)}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">Status</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{po.status.replaceAll("_", " ")}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
                    <THead>
                      <TR>
                        <TH>PO #</TH>
                        <TH>Supplier</TH>
                        <TH>Created</TH>
                        <TH>Expected</TH>
                        <TH className="text-right">Total</TH>
                        <TH className="text-right">Status</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {pos.map((po) => (
                        <TR key={po.id}>
                          <TD><Link className="font-medium hover:underline" href={`/purchase-orders/${po.id}`}>{po.po_number}</Link></TD>
                          <TD>{po.supplier_name}</TD>
                          <TD>{fmtDate(po.created_at)}</TD>
                          <TD>{po.expected_delivery ? fmtDate(po.expected_delivery) : "—"}</TD>
                          <TD className="text-right">{fmtCurrency(po.total_amount)}</TD>
                          <TD className="text-right"><Badge variant={po.status === "received" ? "success" : po.status === "partially_received" ? "warning" : "secondary"}>{po.status}</Badge></TD>
                        </TR>
                      ))}
                      {pos.length === 0 ? <TR><TD colSpan={6} className="text-center text-slate-500">No purchase orders.</TD></TR> : null}
                    </TBody>
                  </Table>
        </div>
      </div>
    </div>

  );
}
