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
  );
}
