import { useState } from "react";
import { Search, UserX, Shield, Eye, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "suspended" | "banned";
  lastOrder: string;
}

export function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const customers: Customer[] = [
    {
      id: 1,
      name: "Alice Brown",
      email: "alice.b@example.com",
      phone: "+234 801 234 5678",
      joinDate: "2024-01-15",
      totalOrders: 12,
      totalSpent: 8450,
      status: "active",
      lastOrder: "2026-05-20",
    },
    {
      id: 2,
      name: "David Martinez",
      email: "d.martinez@example.com",
      phone: "+234 802 345 6789",
      joinDate: "2024-03-22",
      totalOrders: 5,
      totalSpent: 2100,
      status: "active",
      lastOrder: "2026-05-18",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      phone: "+234 803 456 7890",
      joinDate: "2025-11-08",
      totalOrders: 2,
      totalSpent: 450,
      status: "active",
      lastOrder: "2026-04-30",
    },
    {
      id: 4,
      name: "Frank Johnson",
      email: "frank.j@example.com",
      phone: "+234 804 567 8901",
      joinDate: "2023-12-05",
      totalOrders: 8,
      totalSpent: 3200,
      status: "active",
      lastOrder: "2026-05-15",
    },
    {
      id: 5,
      name: "Grace Chen",
      email: "grace.c@example.com",
      phone: "+234 805 678 9012",
      joinDate: "2025-06-12",
      totalOrders: 0,
      totalSpent: 0,
      status: "suspended",
      lastOrder: "Never",
    },
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success";
      case "suspended":
        return "bg-warning/10 text-warning";
      case "banned":
        return "bg-destructive/10 text-destructive";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
        <p className="text-muted-foreground">Manage and monitor customer accounts</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="text-2xl font-bold">{customers.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">Total Customers</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-success" />
            </div>
            <span className="text-2xl font-bold">
              {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-chart-1" />
            </div>
            <span className="text-2xl font-bold">
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">Total Revenue</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
            <span className="text-2xl font-bold">
              ${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">Avg. Spend</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total Spent</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted/30 transition-all">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="font-semibold">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-muted-foreground">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{customer.joinDate}</td>
                  <td className="px-6 py-4 font-semibold">{customer.totalOrders}</td>
                  <td className="px-6 py-4 font-semibold text-primary">${customer.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(customer.status)}`}>
                      {customer.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setShowProfile(true);
                        }}
                        className="p-2 hover:bg-muted rounded-lg transition-all"
                        title="View Profile"
                      >
                        <Eye className="h-4 w-4 text-primary" />
                      </button>
                      {customer.status === "active" && (
                        <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Suspend">
                          <UserX className="h-4 w-4 text-warning" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Reset Password">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {showProfile && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customer Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-xl">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                  <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusBadge(selectedCustomer.status)}`}>
                  {selectedCustomer.status.toUpperCase()}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <div className="text-2xl font-bold text-primary">{selectedCustomer.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                </div>
                <div className="p-4 bg-success/10 rounded-xl">
                  <div className="text-2xl font-bold text-success">${selectedCustomer.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">Total Spent</div>
                </div>
                <div className="p-4 bg-chart-2/10 rounded-xl">
                  <div className="text-2xl font-bold text-chart-2">
                    ${selectedCustomer.totalOrders > 0 ? Math.round(selectedCustomer.totalSpent / selectedCustomer.totalOrders) : 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Order</div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-semibold">{selectedCustomer.joinDate}</span>
                </div>
                <div className="flex justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-muted-foreground">Last Order:</span>
                  <span className="font-semibold">{selectedCustomer.lastOrder}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-warning/10 text-warning rounded-xl font-semibold hover:bg-warning/20 transition-all">
                  Suspend Account
                </button>
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
