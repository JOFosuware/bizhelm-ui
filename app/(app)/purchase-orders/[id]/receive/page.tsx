"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhFetch } from "@/lib/api";

export default function ReceivePurchaseOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const poId = Number(params.id);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  // UI starter: in real implementation load PO items and allow per-line receiving.
  const [note, setNote] = React.useState("");

  async function onReceive() {
    setLoading(true);
    setError(null);
    try {
      const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE === "true";
      if (!mockMode) {
        await bhFetch(`/purchase-orders/${poId}/receive`, {
          method: "POST",
          body: JSON.stringify({ items: [], note })
        });
      }
      setSuccess(true);
      setTimeout(() => {
        router.push(`/purchase-orders/${poId}`);
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err?.message || "Receive failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Receive Purchase Order"
        subtitle="Confirm delivered quantities and add stock to inventory (ledger-backed)."
        secondary={<Link href={`/purchase-orders/${poId}`} className="text-sm text-slate-600 hover:text-slate-900 hover:underline">← Back to PO</Link>}
      />

      <Card>
        <CardContent className="p-4">
          <div className="text-sm font-semibold">Receiving note</div>
          <div className="mt-1 text-xs text-slate-500">
            This starter intentionally keeps receiving simple. In your final UI, render PO line items with quantity ordered vs received.
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600">Internal note (optional)</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Delivered 2 cartons damaged; returned" />
          </div>

          {success ? <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Received! Updating inventory…</div> : null}
          {error ? <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="secondary" asChild><Link href={`/purchase-orders/${poId}`}>Cancel</Link></Button>
            <Button onClick={onReceive} disabled={loading}>{loading ? "Receiving…" : "Receive stock"}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
