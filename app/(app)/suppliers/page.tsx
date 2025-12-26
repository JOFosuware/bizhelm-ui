import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Input } from "@/components/ui/input";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { listSuppliers } from "@/lib/data";

export default async function SuppliersPage({
  searchParams,
}: {
  // Next.js provides searchParams as a Promise in async Server Components.
  searchParams?: Promise<{ q?: string }>;
}) {
  const { q = "" } = (await searchParams) ?? {};
  const suppliers = await listSuppliers(q);

  return (
    <div className="space-y-4">
      <PageHeader title="Suppliers" subtitle="Manage supplier records and purchasing relationships." actionLabel="Add supplier" actionHref="#" />

      <form className="flex-1 min-w-[240px]" action="/suppliers">
        <Input name="q" defaultValue={q} placeholder="Search suppliers…" />
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            <TR>
              <TH>Supplier</TH>
              <TH>Phone</TH>
              <TH>Email</TH>
              <TH>Address</TH>
            </TR>
          </THead>
          <TBody>
            {suppliers.map((s) => (
              <TR key={s.id}>
                <TD><Link className="font-medium hover:underline" href={`/suppliers/${s.id}`}>{s.name}</Link></TD>
                <TD>{s.phone || "—"}</TD>
                <TD>{s.email || "—"}</TD>
                <TD>{s.address || "—"}</TD>
              </TR>
            ))}
            {suppliers.length === 0 ? (
              <TR><TD colSpan={4} className="text-center text-slate-500">No suppliers found.</TD></TR>
            ) : null}
          </TBody>
        </Table>
      </div>
    </div>
  );
}
