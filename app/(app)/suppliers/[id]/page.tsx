import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getSupplier } from "@/lib/data";

export default async function SupplierDetailPage({ params }: { params: { id: string } }) {
  const supplier = await getSupplier(Number(params.id));
  if (!supplier) return notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={supplier.name}
        subtitle="Supplier profile and purchase order history."
        secondary={
          <Link href="/suppliers" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">← Back to suppliers</Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Phone</div>
                <div className="mt-1 text-sm font-medium">{supplier.phone || "—"}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Email</div>
                <div className="mt-1 text-sm font-medium">{supplier.email || "—"}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3 md:col-span-2">
                <div className="text-xs text-slate-500">Address</div>
                <div className="mt-1 text-sm font-medium">{supplier.address || "—"}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Purchase orders</div>
              <div className="mt-1 text-xs text-slate-500">Wire to <span className="font-medium">GET /purchase-orders?supplier_id=...</span></div>
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Render PO table here (draft/ordered/received), with a Receive flow.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Quick actions</div>
            <div className="mt-1 text-xs text-slate-500">Create and manage POs for this supplier.</div>
            <div className="mt-4 space-y-2">
              <Link href="/purchase-orders" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Create purchase order</Link>
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">Edit supplier</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
