import { useParams, Link } from "react-router-dom";
import { Package, Truck, CheckCircle, MapPin, Phone, Mail, Calendar } from "lucide-react";

export function OrderTrackingPage() {
  const { orderId } = useParams();

  const order = {
    id: orderId || "12345",
    status: "shipped",
    orderDate: "May 15, 2026",
    estimatedDelivery: "May 22, 2026",
    trackingNumber: "TRK849302847",
    total: 2729,
    items: [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        price: 1299,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=400",
      },
      {
        id: 2,
        name: "Sony WH-1000XM5 Headphones",
        price: 329,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Lagos",
      state: "Lagos State",
      phone: "+234 801 234 5678",
      email: "john.doe@example.com",
    },
  };

  const timeline = [
    {
      status: "placed",
      label: "Order Placed",
      description: "Your order has been confirmed",
      date: "May 15, 2026 10:30 AM",
      completed: true,
    },
    {
      status: "confirmed",
      label: "Payment Confirmed",
      description: "Payment received successfully",
      date: "May 15, 2026 10:32 AM",
      completed: true,
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is being prepared",
      date: "May 16, 2026 2:15 PM",
      completed: true,
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your package is on the way",
      date: "May 18, 2026 9:00 AM",
      completed: true,
      current: true,
    },
    {
      status: "out-for-delivery",
      label: "Out for Delivery",
      description: "Package is out for delivery",
      date: "",
      completed: false,
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Package delivered successfully",
      date: "",
      completed: false,
    },
  ];

  const getCurrentIcon = (status: string, completed: boolean, current: boolean) => {
    if (completed) {
      return <CheckCircle className="h-8 w-8 text-success" />;
    }
    if (current) {
      return <Truck className="h-8 w-8 text-primary animate-pulse" />;
    }
    return <Package className="h-8 w-8 text-muted-foreground" />;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/profile" className="hover:text-foreground">My Orders</Link>
          <span>/</span>
          <span className="text-foreground">Order #{order.id}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Estimated delivery: <span className="font-semibold text-foreground">{order.estimatedDelivery}</span>
            </p>
          </div>
          <div className="px-4 py-2 bg-primary/10 border border-primary rounded-xl">
            <div className="text-xs text-muted-foreground">Tracking Number</div>
            <div className="font-semibold text-primary">{order.trackingNumber}</div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-8">Order Status</h2>
        <div className="relative">
          {timeline.map((item, index) => (
            <div key={item.status} className="relative flex gap-6 pb-8 last:pb-0">
              {/* Connector Line */}
              {index < timeline.length - 1 && (
                <div className={`absolute left-4 top-12 w-0.5 h-full ${
                  item.completed ? "bg-success" : "bg-border"
                }`} />
              )}

              {/* Icon */}
              <div className={`relative z-10 flex-shrink-0 h-16 w-16 rounded-full flex items-center justify-center ${
                item.completed
                  ? "bg-success/10"
                  : item.current
                  ? "bg-primary/10"
                  : "bg-muted"
              }`}>
                {getCurrentIcon(item.status, item.completed, item.current || false)}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className={`font-semibold text-lg ${
                    item.current ? "text-primary" : item.completed ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {item.label}
                  </h3>
                  {item.date && (
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.date}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{item.description}</p>
                {item.current && (
                  <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <MapPin className="h-4 w-4" />
                      <span>Currently in Lagos Distribution Center</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Order Items */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                    <span className="font-semibold text-primary">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">${order.total}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Shipping Address</div>
                <div className="text-sm text-muted-foreground">
                  {order.shippingAddress.name}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Contact Number</div>
                <div className="text-sm text-muted-foreground">{order.shippingAddress.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Email</div>
                <div className="text-sm text-muted-foreground">{order.shippingAddress.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Order Date</div>
                <div className="text-sm text-muted-foreground">{order.orderDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/profile/orders"
          className="flex-1 text-center py-3 px-6 border border-border rounded-xl font-semibold hover:bg-muted transition-all"
        >
          View All Orders
        </Link>
        <button className="flex-1 py-3 px-6 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl font-semibold hover:bg-destructive/20 transition-all">
          Cancel Order
        </button>
        <Link
          to="/"
          className="flex-1 text-center py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
