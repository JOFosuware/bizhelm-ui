import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { getProduct } from "@/lib/data";
import { fmtCurrency } from "@/lib/format";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const product = await getProduct(id);
  if (!product) return notFound();

  const low = product.units <= product.reorder_level;
  const status = product.units === 0 ? "Out" : low ? "Low" : "OK";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${product.name} (${product.sku})`}
        subtitle="Product details and inventory status."
        secondary={
          <Link href="/products" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">
            ← Back to products
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-slate-500">Category</div>
                <div className="text-sm font-medium">{product.category}</div>
              </div>
              <Badge variant={product.units === 0 ? "danger" : low ? "warning" : "success"}>{status}</Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Stock</div>
                <div className="mt-1 text-xl font-semibold">{product.units}</div>
                <div className="mt-1 text-xs text-slate-500">Reorder level: {product.reorder_level}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Selling price</div>
                <div className="mt-1 text-xl font-semibold">{fmtCurrency(product.selling_price)}</div>
                <div className="mt-1 text-xs text-slate-500">Cost: {fmtCurrency(product.cost_price)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-3">
                <div className="text-xs text-slate-500">Margin</div>
                <div className="mt-1 text-xl font-semibold">
                  {Math.round(((product.selling_price - product.cost_price) / product.selling_price) * 100)}%
                </div>
                <div className="mt-1 text-xs text-slate-500">Per-unit: {fmtCurrency(product.selling_price - product.cost_price)}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold">Stock ledger</div>
              <div className="mt-1 text-xs text-slate-500">
                This is a UI stub. Wire it to <span className="font-medium">GET /products/{"{id}"}/stock-movements</span>.
              </div>
              <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                No ledger entries shown in mock mode. Implement the movements table using your stock_movements source of truth.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-semibold">Quick actions</div>
            <div className="mt-1 text-xs text-slate-500">Common actions for this product.</div>
            <div className="mt-4 space-y-2">
              <Link href="#" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                Adjust stock
              </Link>
              <Link href="/purchase-orders" className="block rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
                Create purchase order
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
