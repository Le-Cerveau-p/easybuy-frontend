import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Heart, Bell, MapPin, CreditCard, Shield, LogOut, Settings, ChevronRight, Star } from "lucide-react";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "saved" | "settings">("overview");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    avatar: null,
    memberSince: "January 2024",
  };

  const stats = [
    { label: "Total Orders", value: "24", icon: Package, color: "primary" },
    { label: "Saved Items", value: "12", icon: Heart, color: "destructive" },
    { label: "Notifications", value: "5", icon: Bell, color: "warning" },
  ];

  const recentOrders = [
    {
      id: "12345",
      date: "May 15, 2026",
      total: 2729,
      status: "shipped",
      items: 3,
      image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=400",
    },
    {
      id: "12344",
      date: "May 10, 2026",
      total: 1499,
      status: "delivered",
      items: 2,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    },
    {
      id: "12343",
      date: "May 5, 2026",
      total: 899,
      status: "delivered",
      items: 1,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
    },
  ];

  const savedItems = [
    {
      id: 1,
      name: "MacBook Pro M3",
      price: 1999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      inStock: true,
    },
    {
      id: 2,
      name: "AirPods Pro",
      price: 249,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
      inStock: true,
    },
    {
      id: 3,
      name: "iPad Air",
      price: 599,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      inStock: false,
    },
  ];

  const addresses = [
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      address: "123 Main Street, Lagos, Lagos State",
      phone: "+234 801 234 5678",
      default: true,
    },
    {
      id: 2,
      label: "Office",
      name: "John Doe",
      address: "456 Business Ave, Victoria Island, Lagos",
      phone: "+234 801 234 5678",
      default: false,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-success bg-success/10";
      case "shipped":
        return "text-primary bg-primary/10";
      case "processing":
        return "text-warning bg-warning/10";
      case "cancelled":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-background rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-xl">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-muted-foreground mb-1">{user.email}</p>
            <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
          </div>
          <Link
            to="/profile/edit"
            className="flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-xl font-semibold hover:bg-muted transition-all"
          >
            <Settings className="h-5 w-5" />
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-10 w-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 text-${stat.color}`} />
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-8">
        <div className="flex gap-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "orders", label: "Orders" },
            { id: "saved", label: "Saved Items" },
            { id: "settings", label: "Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Recent Orders</h2>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-sm text-primary hover:text-primary/80 font-semibold"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.slice(0, 3).map((order) => (
                <Link
                  key={order.id}
                  to={`/order-tracking/${order.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-all"
                >
                  <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img src={order.image} alt="Order" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">Order #{order.id}</span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{order.date}</span>
                      <span>•</span>
                      <span>{order.items} items</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="font-semibold text-primary">${order.total}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/profile/addresses"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Manage Addresses</div>
                    <div className="text-sm text-muted-foreground">{addresses.length} saved addresses</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
                <Link
                  to="/profile/payments"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Payment Methods</div>
                    <div className="text-sm text-muted-foreground">Manage your cards</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
                <Link
                  to="/profile/security"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">Security Settings</div>
                    <div className="text-sm text-muted-foreground">Password & privacy</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              to={`/order-tracking/${order.id}`}
              className="block bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="h-24 w-24 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                  <img src={order.image} alt="Order" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{order.items} items</span>
                    <span className="text-2xl font-bold text-primary">${order.total}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Saved Items Tab */}
      {activeTab === "saved" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all">
              <div className="relative aspect-square bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg">
                  <Heart className="h-5 w-5 fill-destructive text-destructive" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${item.price}</span>
                  <Link
                    to={`/product/${item.id}`}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="max-w-2xl space-y-6">
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Saved Addresses</h2>
              <button className="text-sm text-primary hover:text-primary/80 font-semibold">
                Add New
              </button>
            </div>
            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="p-4 rounded-xl border border-border hover:bg-muted transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{address.label}</span>
                      {address.default && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <button className="text-sm text-primary hover:text-primary/80">Edit</button>
                  </div>
                  <p className="text-sm text-muted-foreground">{address.address}</p>
                  <p className="text-sm text-muted-foreground">{address.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border border-destructive/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-destructive mb-4">Danger Zone</h2>
            <button
              onClick={() => window.location.href = "/login"}
              className="flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-xl font-semibold hover:bg-destructive/90 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
