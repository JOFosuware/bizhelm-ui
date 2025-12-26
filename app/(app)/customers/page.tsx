import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listCustomers } from "@/lib/data";
import { displayCustomerName } from "@/lib/mock";
import { fmtCurrency } from "@/lib/format";

export default async function CustomersPage({
  searchParams,
}: {
  // Next.js provides searchParams as a Promise in async Server Components.
  searchParams?: Promise<{ q?: string }>;
}) {
  const { q = "" } = (await searchParams) ?? {};
  const customers = await listCustomers(q);

  return (
    <div className="space-y-4">
      <PageHeader title="Customers" subtitle="Customer profiles, notes, balances, and history." actionLabel="Add customer" actionHref="#" />

      <form className="flex-1 min-w-[240px]" action="/customers">
        <Input name="q" defaultValue={q} placeholder="Search customers by name, email, or phone…" />
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Phone</TH>
              <TH>Email</TH>
              <TH className="text-right">Lifetime spend</TH>
              <TH className="text-right">Outstanding</TH>
            </TR>
          </THead>
          <TBody>
            {customers.map((c) => (
              <TR key={c.id}>
                <TD>
                  <Link className="font-medium hover:underline" href={`/customers/${c.id}`}>{displayCustomerName(c)}</Link>
                </TD>
                <TD>{c.phone || "—"}</TD>
                <TD>{c.email || "—"}</TD>
                <TD className="text-right">{fmtCurrency(c.lifetime_spend)}</TD>
                <TD className="text-right">{fmtCurrency(c.outstanding_balance)}</TD>
              </TR>
            ))}
            {customers.length === 0 ? (
              <TR><TD colSpan={5} className="text-center text-slate-500">No customers found.</TD></TR>
            ) : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
