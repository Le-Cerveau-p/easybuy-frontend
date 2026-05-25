import { useState } from "react";
import { Search, Filter, Eye, Check, X, Truck, MessageCircle, Printer, ChevronDown, Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  product: string;
  productImage: string;
  quantity: number;
  amount: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  paymentMethod: string;
  address: string;
  date: string;
  trackingNumber?: string;
}

export function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  const orders: Order[] = [
    {
      id: "ORD-12849",
      customer: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "+234 801 234 5678",
      product: "iPhone 15 Pro Max",
      productImage: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=100",
      quantity: 1,
      amount: 1299,
      status: "pending",
      paymentMethod: "Card",
      address: "123 Main Street, Lagos, Nigeria",
      date: "2026-05-23 10:30 AM",
    },
    {
      id: "ORD-12848",
      customer: "Michael Chen",
      email: "m.chen@example.com",
      phone: "+234 802 345 6789",
      product: "MacBook Pro M3",
      productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100",
      quantity: 1,
      amount: 1999,
      status: "paid",
      paymentMethod: "Transfer",
      address: "456 Business Ave, Victoria Island, Lagos",
      date: "2026-05-23 09:15 AM",
    },
    {
      id: "ORD-12847",
      customer: "Emily Davis",
      email: "emily.d@example.com",
      phone: "+234 803 456 7890",
      product: "Samsung 4K Smart TV",
      productImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100",
      quantity: 1,
      amount: 899,
      status: "processing",
      paymentMethod: "Card",
      address: "789 Park Road, Lekki, Lagos",
      date: "2026-05-22 04:20 PM",
    },
    {
      id: "ORD-12846",
      customer: "James Wilson",
      email: "j.wilson@example.com",
      phone: "+234 804 567 8901",
      product: "Sony WH-1000XM5",
      productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100",
      quantity: 2,
      amount: 658,
      status: "shipped",
      paymentMethod: "Card",
      address: "321 Marina Street, Ikoyi, Lagos",
      date: "2026-05-22 11:45 AM",
      trackingNumber: "TRK-98765432",
    },
    {
      id: "ORD-12845",
      customer: "Olivia Brown",
      email: "olivia.b@example.com",
      phone: "+234 805 678 9012",
      product: "AirPods Pro",
      productImage: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100",
      quantity: 1,
      amount: 249,
      status: "delivered",
      paymentMethod: "Transfer",
      address: "654 Garden Close, Ajah, Lagos",
      date: "2026-05-21 02:30 PM",
      trackingNumber: "TRK-12345678",
    },
    {
      id: "ORD-12844",
      customer: "David Lee",
      email: "david.l@example.com",
      phone: "+234 806 789 0123",
      product: "iPad Air",
      productImage: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100",
      quantity: 1,
      amount: 599,
      status: "cancelled",
      paymentMethod: "Card",
      address: "987 Beach Road, VI, Lagos",
      date: "2026-05-21 09:00 AM",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-success/10 text-success";
      case "shipped":
        return "bg-primary/10 text-primary";
      case "processing":
        return "bg-chart-2/10 text-chart-2";
      case "paid":
        return "bg-chart-1/10 text-chart-1";
      case "pending":
        return "bg-warning/10 text-warning";
      case "cancelled":
      case "refunded":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "paid":
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "cancelled":
      case "refunded":
        return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Management</h1>
        <p className="text-muted-foreground">Manage and track customer orders</p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search orders, customers, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-all">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={order.productImage} alt={order.product} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold">{order.product}</div>
                        <div className="text-sm text-muted-foreground">Qty: {order.quantity}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">${order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowTimeline(true);
                        }}
                        className="p-2 hover:bg-muted rounded-lg transition-all"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-primary" />
                      </button>
                      {order.status === "pending" && (
                        <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Approve">
                          <Check className="h-4 w-4 text-success" />
                        </button>
                      )}
                      {(order.status === "pending" || order.status === "paid") && (
                        <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Cancel">
                          <X className="h-4 w-4 text-destructive" />
                        </button>
                      )}
                      {order.status === "processing" && (
                        <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Assign Delivery">
                          <Truck className="h-4 w-4 text-primary" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Print Invoice">
                        <Printer className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Message Customer">
                        <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              2
            </button>
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {showTimeline && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setShowTimeline(false)}
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="font-mono font-semibold">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment:</span>
                      <span>{selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(selectedOrder.status)}`}>
                        {selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground block">Name:</span>
                      <span className="font-semibold">{selectedOrder.customer}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Email:</span>
                      <span>{selectedOrder.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Phone:</span>
                      <span>{selectedOrder.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block">Address:</span>
                      <span>{selectedOrder.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product */}
              <div>
                <h3 className="font-semibold mb-3">Product Details</h3>
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                  <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted">
                    <img src={selectedOrder.productImage} alt={selectedOrder.product} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{selectedOrder.product}</div>
                    <div className="text-sm text-muted-foreground">Quantity: {selectedOrder.quantity}</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">${selectedOrder.amount}</div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-semibold mb-4">Order Timeline</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1 w-px bg-border mt-2" style={{ minHeight: "40px" }} />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="font-semibold">Order Placed</div>
                      <div className="text-sm text-muted-foreground">{selectedOrder.date}</div>
                    </div>
                  </div>
                  {["paid", "processing", "shipped", "delivered"].includes(selectedOrder.status) && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                        <div className="flex-1 w-px bg-border mt-2" style={{ minHeight: "40px" }} />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="font-semibold">Payment Confirmed</div>
                        <div className="text-sm text-muted-foreground">Payment received via {selectedOrder.paymentMethod}</div>
                      </div>
                    </div>
                  )}
                  {["processing", "shipped", "delivered"].includes(selectedOrder.status) && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-success" />
                        </div>
                        {selectedOrder.status !== "processing" && <div className="flex-1 w-px bg-border mt-2" style={{ minHeight: "40px" }} />}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="font-semibold">Processing</div>
                        <div className="text-sm text-muted-foreground">Order is being prepared</div>
                      </div>
                    </div>
                  )}
                  {["shipped", "delivered"].includes(selectedOrder.status) && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-success" />
                        </div>
                        {selectedOrder.status !== "shipped" && <div className="flex-1 w-px bg-border mt-2" style={{ minHeight: "40px" }} />}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="font-semibold">Shipped</div>
                        <div className="text-sm text-muted-foreground">
                          Tracking: {selectedOrder.trackingNumber || "TRK-PENDING"}
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.status === "delivered" && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Delivered</div>
                        <div className="text-sm text-muted-foreground">Order successfully delivered</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                  Update Status
                </button>
                <button className="flex-1 px-4 py-2 bg-muted rounded-xl font-semibold hover:bg-muted/80 transition-all">
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
