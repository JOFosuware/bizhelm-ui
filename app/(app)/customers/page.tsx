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
        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {customers.map((c) => (
            <Link key={c.id} href={`/customers/${c.id}`} className="block p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-900">{displayCustomerName(c)}</div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">
                    {c.email || "—"}{c.phone ? ` • ${c.phone}` : ""}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">Lifetime spend</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{fmtCurrency(c.lifetime_spend ?? 0)}</div>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="text-[11px] text-slate-500">Outstanding</div>
                  <div className="mt-0.5 font-semibold text-slate-900">{fmtCurrency(c.outstanding_balance ?? 0)}</div>
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
    </div>

  );
}
