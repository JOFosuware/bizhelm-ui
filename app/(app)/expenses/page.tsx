import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listExpenses } from "@/lib/data";
import { fmtCurrency, fmtDate } from "@/lib/format";

export default async function ExpensesPage() {
  const expenses = await listExpenses();
  return (
    <div className="space-y-4">
      <PageHeader title="Expenses" subtitle="Track spending and attach receipts for audit trails." actionLabel="Add expense" actionHref="#" />

      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Date</TH>
              <TH>Category</TH>
              <TH>Vendor</TH>
              <TH>Description</TH>
              <TH className="text-right">Amount</TH>
              <TH className="text-right">Receipt</TH>
            </TR>
          </THead>
          <TBody>
            {expenses.map((e) => (
              <TR key={e.id}>
                <TD>{fmtDate(e.expense_date)}</TD>
                <TD><Badge variant="secondary">{e.category}</Badge></TD>
                <TD>{e.vendor || "—"}</TD>
                <TD>{e.description}</TD>
                <TD className="text-right">{fmtCurrency(e.amount)}</TD>
                <TD className="text-right">{e.receipt_url ? "View" : "—"}</TD>
              </TR>
            ))}
            {expenses.length === 0 ? <TR><TD colSpan={6} className="text-center text-slate-500">No expenses.</TD></TR> : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
