"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { bhFetch } from "@/lib/api";
import { mock, type Product } from "@/lib/mock";
import { fmtCurrency } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CartItem = { product: Product; qty: number };

export function PosTerminal() {
  const [q, setQ] = React.useState("");
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";

  const productsQuery = useQuery({
    queryKey: ["products", q, mockMode],
    queryFn: async () => {
      if (mockMode) {
        const term = q.toLowerCase();
        return mock.products.filter(p => !term || p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term));
      }
      return bhFetch<Product[]>(`/products?search=${encodeURIComponent(q)}`);
    },
    staleTime: 15_000
  });

  const products = productsQuery.data || [];

  const subtotal = cart.reduce((sum, ci) => sum + ci.qty * ci.product.selling_price, 0);

  function addToCart(p: Product) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.product.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  }

  function setQty(id: number, qty: number) {
    setCart((prev) => prev.map((ci) => (ci.product.id === id ? { ...ci, qty: Math.max(1, qty) } : ci)));
  }

  function remove(id: number) {
    setCart((prev) => prev.filter((ci) => ci.product.id !== id));
  }

  async function checkout() {
    // Starter: wire to POST /pos/sales or POST /sales depending on your spec.
    // The Go backend should create a sale + sale_items and return the sale_id.
    alert("Checkout stub. Wire this to POST /pos/sales and redirect to /sales/{id}.");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">Product search</div>
              <div className="text-xs text-slate-500">Add items to cart. Barcode scanner can focus this field.</div>
            </div>
          </div>

          <div className="mt-4">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name / SKU / barcode…" />
          </div>

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {products.map((p) => {
              const low = p.units <= p.reorder_level;
              return (
                <button
                  key={p.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-left hover:bg-slate-50"
                  onClick={() => addToCart(p)}
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{p.sku} • {fmtCurrency(p.selling_price)}</div>
                    <div className="mt-1 text-xs text-slate-500">Stock: {p.units}</div>
                  </div>
                  <Badge variant={p.units === 0 ? "danger" : low ? "warning" : "secondary"}>
                    {p.units === 0 ? "Out" : low ? "Low" : "Add"}
                  </Badge>
                </button>
              );
            })}
            {productsQuery.isLoading ? <div className="text-sm text-slate-600">Loading…</div> : null}
            {!productsQuery.isLoading && products.length === 0 ? <div className="text-sm text-slate-600">No products.</div> : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-semibold">Cart</div>
          <div className="mt-1 text-xs text-slate-500">Review quantities and collect payment.</div>

          <div className="mt-4 space-y-3">
            {cart.map((ci) => (
              <div key={ci.product.id} className="rounded-2xl border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{ci.product.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{fmtCurrency(ci.product.selling_price)} each</div>
                  </div>
                  <button className="text-xs text-slate-500 hover:text-slate-900" onClick={() => remove(ci.product.id)}>Remove</button>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-500">Qty</label>
                    <input
                      className="h-9 w-16 rounded-xl border border-slate-200 px-2 text-sm"
                      type="number"
                      min={1}
                      value={ci.qty}
                      onChange={(e) => setQty(ci.product.id, Number(e.target.value))}
                    />
                  </div>
                  <div className="text-sm font-semibold">{fmtCurrency(ci.qty * ci.product.selling_price)}</div>
                </div>
              </div>
            ))}
            {cart.length === 0 ? <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Cart is empty. Add products on the left.</div> : null}
          </div>

          <div className="mt-4 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-semibold">{fmtCurrency(subtotal)}</span>
            </div>
            <Button className="mt-3 w-full" disabled={cart.length === 0} onClick={checkout}>Checkout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
