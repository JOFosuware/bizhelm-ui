import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";

const demoUsers = [
  { id: "u1", name: "Demo User", email: "demo@bizhelm.app", role: "Admin", status: "Active" },
  { id: "u2", name: "Cashier One", email: "cashier@bizhelm.app", role: "Cashier", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Admin · Users" subtitle="Create users, assign roles, and manage access." actionLabel="Invite user" actionHref="#" secondary={
        <a className="text-sm text-slate-600 hover:text-slate-900 hover:underline" href="/admin/roles">Manage roles →</a>
      } />

      <Card>
        <CardContent className="p-4">
          <Table>
            <THead>
              <TR>
                <TH>Name</TH>
                <TH>Email</TH>
                <TH>Role</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <TBody>
              {demoUsers.map((u) => (
                <TR key={u.id}>
                  <TD className="font-medium">{u.name}</TD>
                  <TD>{u.email}</TD>
                  <TD>{u.role}</TD>
                  <TD>{u.status}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
          <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            Hook this up to the RBAC endpoints in README2.md:
            <span className="font-medium"> GET /admin/users</span>, <span className="font-medium">POST /admin/users</span>, <span className="font-medium">PUT /admin/users/{"{id}"}</span>.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
