import { useState } from "react";
import { Search, DollarSign, CheckCircle, XCircle, RefreshCw, Eye, Download } from "lucide-react";

interface Transaction {
  id: string;
  customer: string;
  orderId: string;
  amount: number;
  type: "full" | "booking" | "balance";
  status: "successful" | "pending" | "failed" | "refunded";
  method: "Card" | "Transfer" | "Flutterwave";
  date: string;
  transactionId: string;
}

export function AdminPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const transactions: Transaction[] = [
    {
      id: "PAY-7841",
      customer: "Alice Brown",
      orderId: "ORD-12849",
      amount: 2499,
      type: "full",
      status: "successful",
      method: "Card",
      date: "2026-05-23 10:15 AM",
      transactionId: "FLW-TX-12345678",
    },
    {
      id: "PAY-7840",
      customer: "David Lee",
      orderId: "ORD-12848",
      amount: 400,
      type: "booking",
      status: "successful",
      method: "Transfer",
      date: "2026-05-23 09:30 AM",
      transactionId: "FLW-TX-12345677",
    },
    {
      id: "PAY-7839",
      customer: "Emma Wilson",
      orderId: "ORD-12847",
      amount: 899,
      type: "full",
      status: "pending",
      method: "Flutterwave",
      date: "2026-05-22 04:20 PM",
      transactionId: "FLW-TX-12345676",
    },
    {
      id: "PAY-7838",
      customer: "Frank Miller",
      orderId: "ORD-12846",
      amount: 1299,
      type: "balance",
      status: "failed",
      method: "Card",
      date: "2026-05-22 02:10 PM",
      transactionId: "FLW-TX-12345675",
    },
    {
      id: "PAY-7837",
      customer: "Grace Chen",
      orderId: "ORD-12845",
      amount: 249,
      type: "full",
      status: "refunded",
      method: "Transfer",
      date: "2026-05-21 11:45 AM",
      transactionId: "FLW-TX-12345674",
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "successful":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "failed":
        return "bg-destructive/10 text-destructive";
      case "refunded":
        return "bg-chart-4/10 text-chart-4";
    }
  };

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "successful":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <RefreshCw className="h-4 w-4" />;
      case "failed":
      case "refunded":
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: Transaction["type"]) => {
    switch (type) {
      case "full":
        return "bg-primary/10 text-primary";
      case "booking":
        return "bg-chart-1/10 text-chart-1";
      case "balance":
        return "bg-chart-2/10 text-chart-2";
    }
  };

  const totalRevenue = transactions
    .filter((tx) => tx.status === "successful")
    .reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
        <p className="text-muted-foreground">Track and manage Flutterwave transactions</p>
      </div>

      {/* Revenue Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">${totalRevenue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Revenue</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {transactions.filter((tx) => tx.status === "successful").length}
          </div>
          <div className="text-xs text-muted-foreground">Successful</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <RefreshCw className="h-5 w-5 text-warning" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {transactions.filter((tx) => tx.status === "pending").length}
          </div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            {transactions.filter((tx) => tx.status === "failed").length}
          </div>
          <div className="text-xs text-muted-foreground">Failed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by payment ID, customer, or order..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Statuses</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Payment ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border hover:bg-muted/30 transition-all">
                <td className="px-6 py-4">
                  <div className="font-mono font-semibold">{tx.id}</div>
                  <div className="text-xs text-muted-foreground font-mono">{tx.transactionId}</div>
                </td>
                <td className="px-6 py-4 font-semibold">{tx.customer}</td>
                <td className="px-6 py-4">
                  <span className="font-mono text-sm">{tx.orderId}</span>
                </td>
                <td className="px-6 py-4 font-bold text-primary">${tx.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getTypeBadge(tx.type)}`}>
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{tx.method}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(tx.status)}`}>
                    {getStatusIcon(tx.status)}
                    {tx.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-all" title="View Receipt">
                      <Eye className="h-4 w-4 text-primary" />
                    </button>
                    {tx.status === "pending" && (
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Verify">
                        <CheckCircle className="h-4 w-4 text-success" />
                      </button>
                    )}
                    {tx.status === "successful" && (
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Refund">
                        <RefreshCw className="h-4 w-4 text-warning" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Download">
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </button>
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
