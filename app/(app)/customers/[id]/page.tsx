import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getCustomer } from "@/lib/data";
import { displayCustomerName } from "@/lib/mock";
import { fmtCurrency } from "@/lib/format";

export default async function CustomerDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const customer = await getCustomer(id);
  if (!customer) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={displayCustomerName(customer)}
        subtitle="Customer overview, balances, and history."
        secondary={
          <Link href="/customers" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">
            ← Back to customers
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Outstanding</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(customer.outstanding_balance)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Lifetime spend</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(customer.lifetime_spend)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Type</div>
                <div className="mt-1 text-xl font-semibold">{customer.type === "business" ? "Business" : "Individual"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Contact</div>
              <div className="mt-2 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Phone</div>
                  <div className="mt-1 text-sm font-medium">{customer.phone || "—"}</div>
                </div>
                <div className="rounded-2xl border border-slate-200 p-3">
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="mt-1 text-sm font-medium">{customer.email || "—"}</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">History</div>
              <div className="mt-1 text-xs text-slate-500">Wire to customer sales + notes endpoints (see spec).</div>
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Add tabs here: Sales • Contracts • Notes. Each tab maps to your REST endpoints.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Quick actions</div>
            <div className="mt-1 text-xs text-slate-500">Actions you’ll use often for this customer.</div>
            <div className="mt-4 space-y-2">
              <Link href="/pos" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Create sale</Link>
              <Link href="/invoices" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Create invoice</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Add note</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
