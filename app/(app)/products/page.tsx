import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listProducts } from "@/lib/data";
import { fmtCurrency } from "@/lib/format";

export default async function ProductsPage({
  searchParams,
}: {
  // Next.js provides searchParams as a Promise in async Server Components.
  searchParams?: Promise<{ q?: string }>;
}) {
  const { q = "" } = (await searchParams) ?? {};
  const products = await listProducts(q);

  return (
    <div className="space-y-4">
      <PageHeader title="Products" subtitle="Manage your product catalog and inventory levels." actionLabel="Add product" actionHref="#" />

      <div className="flex flex-wrap items-center gap-2">
        <form className="flex-1 min-w-[240px]" action="/products">
          <Input name="q" defaultValue={q} placeholder="Search by name or SKU…" />
        </form>
      </div>

            <div className="rounded-2xl border border-slate-200 bg-white">
        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 md:hidden">
          {products.map((p) => {
            const low = p.units <= p.reorder_level;
            return (
              <Link key={p.id} href={`/products/${p.id}`} className="block p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-0.5 truncate text-xs text-slate-500">
                      SKU: {p.sku}{p.category ? ` • ${p.category}` : ""}
                    </div>
                  </div>
                  <Badge variant={low ? "warning" : "success"}>{low ? "Low" : "OK"}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">Price</div>
                    <div className="mt-0.5 font-semibold text-slate-900">{fmtCurrency(p.selling_price)}</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-[11px] text-slate-500">Stock</div>
                    <div className="mt-0.5 font-semibold text-slate-900">{p.units}</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Table>
                    <THead>
                      <TR>
                        <TH>SKU</TH>
                        <TH>Name</TH>
                        <TH>Category</TH>
                        <TH className="text-right">Price</TH>
                        <TH className="text-right">Stock</TH>
                        <TH className="text-right">Status</TH>
                      </TR>
                    </THead>
                    <TBody>
                      {products.map((p) => {
                        const low = p.units <= p.reorder_level;
                        return (
                          <TR key={p.id}>
                            <TD className="font-medium text-slate-700">{p.sku}</TD>
                            <TD>
                              <Link href={`/products/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
                            </TD>
                            <TD>{p.category}</TD>
                            <TD className="text-right">{fmtCurrency(p.selling_price)}</TD>
                            <TD className="text-right">{p.units}</TD>
                            <TD className="text-right">
                              <Badge variant={p.units === 0 ? "danger" : low ? "warning" : "success"}>
                                {p.units === 0 ? "Out" : low ? "Low" : "OK"}
                              </Badge>
                            </TD>
                          </TR>
                        );
                      })}
                      {products.length === 0 ? (
                        <TR>
                          <TD colSpan={6} className="text-center text-slate-500">No products found.</TD>
                        </TR>
                      ) : null}
                    </TBody>
                  </Table>
        </div>
      </div>
    </div>

  );
}
