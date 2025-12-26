import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

const demoRoles = [
  { id: "r1", name: "Admin", users: 1, permissions: "*" },
  { id: "r2", name: "Cashier", users: 1, permissions: "pos:use, sales:read, products:read" },
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Admin · Roles" subtitle="Define roles and permission sets for BizHelm." actionLabel="Create role" actionHref="#" secondary={
        <a className="text-sm text-slate-600 hover:text-slate-900 hover:underline" href="/admin/users">← Users</a>
      } />

      <Card>
        <CardContent className="p-4">
          <Table>
            <THead>
              <TR>
                <TH>Role</TH>
                <TH className="text-right">Users</TH>
                <TH>Permissions</TH>
              </TR>
            </THead>
            <TBody>
              {demoRoles.map((r) => (
                <TR key={r.id}>
                  <TD className="font-medium">{r.name}</TD>
                  <TD className="text-right">{r.users}</TD>
                  <TD className="text-slate-600">{r.permissions}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Hook this up to <span className="font-medium">GET /admin/roles</span> and <span className="font-medium">POST /admin/roles</span>. For permission management, wire to <span className="font-medium">GET /admin/permissions</span>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
