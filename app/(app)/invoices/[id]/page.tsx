import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getInvoice } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function InvoiceDetailPage({ params }: { params: { id: string } }) {
  const inv = await getInvoice(Number(params.id));
  if (!inv) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={inv.invoice_number}
        subtitle={`Customer: ${inv.customer_name}`}
        secondary={<Link href="/invoices" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">← Back to invoices</Link>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Issue date</div>
                <div className="text-sm font-medium">{fmtDate(inv.issue_date)}</div>
                <div className="mt-2 text-xs text-slate-500">Due</div>
                <div className="text-sm font-medium">{fmtDate(inv.due_date)}</div>
              </div>
              <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "danger" : "secondary"}>{inv.status}</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Total</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(inv.total_amount)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Next step</div>
                <div className="mt-1 text-sm font-medium">{inv.status === "paid" ? "Archive" : "Collect payment"}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Delivery</div>
                <div className="mt-1 text-sm font-medium">Email / PDF</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Line items</div>
              <div className="mt-1 text-xs text-slate-500">Wire to <span className="font-medium">GET /invoices/{"{id}"}</span> and render invoice line items.</div>
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Render invoice table (products/services, qty, price, tax, subtotal). Add PDF preview route if needed.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Actions</div>
            <div className="mt-1 text-xs text-slate-500">Operational actions for invoicing.</div>
            <div className="mt-4 space-y-2">
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Record payment</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Send email</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Download PDF</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
