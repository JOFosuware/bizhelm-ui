import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getHome } from "@/lib/data";

export default async function LowStockPage() {
  const { lowStock } = await getHome();
  return (
    <div className="space-y-4">
      <PageHeader title="Low stock" subtitle="Products at or below reorder level." secondary={<Link href="/home" className="text-sm text-slate-600 hover:text-slate-900 hover:underline">← Back home</Link>} />
      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Product</TH>
              <TH className="text-right">Stock</TH>
              <TH className="text-right">Reorder level</TH>
              <TH className="text-right">Status</TH>
            </TR>
          </THead>
          <TBody>
            {lowStock.map((p) => (
              <TR key={p.id}>
                <TD><Link className="font-medium hover:underline" href={`/products/${p.id}`}>{p.name}</Link></TD>
                <TD className="text-right">{p.units}</TD>
                <TD className="text-right">{p.reorder_level}</TD>
                <TD className="text-right"><Badge variant={p.units === 0 ? "danger" : "warning"}>{p.units === 0 ? "Out" : "Low"}</Badge></TD>
              </TR>
            ))}
            {lowStock.length === 0 ? <TR><TD colSpan={4} className="text-center text-slate-500">No low stock items.</TD></TR> : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
