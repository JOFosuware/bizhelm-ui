import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listInvoices } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function InvoicesPage() {
  const invoices = await listInvoices();
  return (
    <div className="space-y-4">
      <PageHeader title="Invoices" subtitle="Create invoices, send to customers, and track payments." actionLabel="New invoice" actionHref="#" />

      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Invoice #</TH>
              <TH>Customer</TH>
              <TH>Issue date</TH>
              <TH>Due date</TH>
              <TH className="text-right">Total</TH>
              <TH className="text-right">Status</TH>
            </TR>
          </THead>
          <TBody>
            {invoices.map((inv) => (
              <TR key={inv.id}>
                <TD><Link className="font-medium hover:underline" href={`/invoices/${inv.id}`}>{inv.invoice_number}</Link></TD>
                <TD>{inv.customer_name}</TD>
                <TD>{fmtDate(inv.issue_date)}</TD>
                <TD>{fmtDate(inv.due_date)}</TD>
                <TD className="text-right">{fmtCurrency(inv.total_amount)}</TD>
                <TD className="text-right">
                  <Badge variant={inv.status === "paid" ? "success" : inv.status === "overdue" ? "danger" : "secondary"}>{inv.status}</Badge>
                </TD>
              </TR>
            ))}
            {invoices.length === 0 ? <TR><TD colSpan={6} className="text-center text-slate-500">No invoices.</TD></TR> : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
