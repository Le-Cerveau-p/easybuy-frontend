import { useState } from "react";
import { UserPlus, Edit, Trash2, Shield } from "lucide-react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "super-admin" | "inventory-manager" | "sales-manager" | "support-staff";
  status: "active" | "inactive";
  lastActive: string;
  permissions: string[];
}

export function AdminAdminUsersPage() {
  const [showModal, setShowModal] = useState(false);

  const adminUsers: AdminUser[] = [
    {
      id: 1,
      name: "John Admin",
      email: "admin@easybuy.com",
      role: "super-admin",
      status: "active",
      lastActive: "5 min ago",
      permissions: ["all"],
    },
    {
      id: 2,
      name: "Sarah Manager",
      email: "sarah.m@easybuy.com",
      role: "inventory-manager",
      status: "active",
      lastActive: "2 hours ago",
      permissions: ["inventory", "stocking", "reports"],
    },
    {
      id: 3,
      name: "Mike Sales",
      email: "mike.s@easybuy.com",
      role: "sales-manager",
      status: "active",
      lastActive: "1 day ago",
      permissions: ["orders", "customers", "payments"],
    },
  ];

  const getRoleBadge = (role: AdminUser["role"]) => {
    switch (role) {
      case "super-admin":
        return "bg-primary/10 text-primary";
      case "inventory-manager":
        return "bg-success/10 text-success";
      case "sales-manager":
        return "bg-chart-1/10 text-chart-1";
      case "support-staff":
        return "bg-chart-2/10 text-chart-2";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Users</h1>
          <p className="text-muted-foreground">Manage admin staff and permissions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
        >
          <UserPlus className="h-5 w-5" />
          Add Admin
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Permissions</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Last Active</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((admin) => (
              <tr key={admin.id} className="border-b border-border hover:bg-muted/30 transition-all">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                      {admin.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{admin.name}</div>
                      <div className="text-sm text-muted-foreground">{admin.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getRoleBadge(admin.role)}`}>
                    {admin.role.replace("-", " ").toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {admin.permissions.slice(0, 3).map((perm, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted rounded text-xs">
                        {perm}
                      </span>
                    ))}
                    {admin.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-muted rounded text-xs">
                        +{admin.permissions.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{admin.lastActive}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Edit">
                      <Edit className="h-4 w-4 text-primary" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Permissions">
                      <Shield className="h-4 w-4 text-warning" />
                    </button>
                    {admin.role !== "super-admin" && (
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Remove">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
