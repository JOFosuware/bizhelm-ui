import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listSales } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function SalesPage() {
  const sales = await listSales();

  return (
    <div className="space-y-4">
      <PageHeader title="Sales" subtitle="Track sales, balances, and payments." actionLabel="New sale" actionHref="/pos" />

      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Sale #</TH>
              <TH>Date</TH>
              <TH>Customer</TH>
              <TH className="text-right">Total</TH>
              <TH className="text-right">Paid</TH>
              <TH className="text-right">Balance</TH>
              <TH className="text-right">Status</TH>
            </TR>
          </THead>
          <TBody>
            {sales.map((s) => (
              <TR key={s.id}>
                <TD><Link className="font-medium hover:underline" href={`/sales/${s.id}`}>{s.sale_number}</Link></TD>
                <TD>{fmtDate(s.sale_date)}</TD>
                <TD>{s.customer_name || "—"}</TD>
                <TD className="text-right">{fmtCurrency(s.total_amount)}</TD>
                <TD className="text-right">{fmtCurrency(s.amount_paid)}</TD>
                <TD className="text-right">{fmtCurrency(s.balance_due)}</TD>
                <TD className="text-right">
                  <Badge variant={s.status === "paid" ? "success" : "warning"}>{s.status}</Badge>
                </TD>
              </TR>
            ))}
            {sales.length === 0 ? (
              <TR><TD colSpan={7} className="text-center text-slate-500">No sales yet. Start with POS.</TD></TR>
            ) : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
