import { useState } from "react";
import { DollarSign, ShoppingBag, TrendingUp, Users, Package, AlertCircle, Clock, CheckCircle, CreditCard, AlertTriangle, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";

export function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState("7days");

  const stats = [
    {
      label: "Total Revenue",
      value: "$48,392",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "primary",
    },
    {
      label: "Orders Today",
      value: "127",
      change: "+18.2%",
      trend: "up",
      icon: ShoppingBag,
      color: "success",
    },
    {
      label: "Pending Deliveries",
      value: "47",
      change: "-3.1%",
      trend: "down",
      icon: Package,
      color: "warning",
    },
    {
      label: "Inventory Count",
      value: "2,847",
      change: "+5.4%",
      trend: "up",
      icon: Package,
      color: "chart-2",
    },
    {
      label: "Low Stock Alerts",
      value: "15",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "destructive",
    },
    {
      label: "Active Customers",
      value: "8,492",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "chart-1",
    },
    {
      label: "Booking Requests",
      value: "23",
      change: "+7",
      trend: "up",
      icon: CreditCard,
      color: "chart-3",
    },
    {
      label: "Pending Approvals",
      value: "8",
      change: "-4",
      trend: "down",
      icon: Clock,
      color: "chart-4",
    },
  ];

  const revenueData = [
    { date: "Mon", revenue: 4200, orders: 45 },
    { date: "Tue", revenue: 5300, orders: 58 },
    { date: "Wed", revenue: 4800, orders: 52 },
    { date: "Thu", revenue: 6100, orders: 67 },
    { date: "Fri", revenue: 7200, orders: 78 },
    { date: "Sat", revenue: 8900, orders: 92 },
    { date: "Sun", revenue: 7800, orders: 84 },
  ];

  const categoryData = [
    { name: "Electronics", value: 35, color: "hsl(var(--chart-1))" },
    { name: "Furniture", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Fashion", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Appliances", value: 12, color: "hsl(var(--chart-4))" },
    { name: "Others", value: 8, color: "hsl(var(--chart-5))" },
  ];

  const topProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      sales: 248,
      revenue: 321952,
      image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=100",
    },
    {
      id: 2,
      name: "Samsung 4K Smart TV",
      sales: 186,
      revenue: 167214,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100",
    },
    {
      id: 3,
      name: "MacBook Pro M3",
      sales: 142,
      revenue: 283858,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      sales: 312,
      revenue: 102648,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100",
    },
  ];

  const customerGrowthData = [
    { month: "Jan", customers: 3200 },
    { month: "Feb", customers: 4100 },
    { month: "Mar", customers: 5300 },
    { month: "Apr", customers: 6700 },
    { month: "May", customers: 8492 },
  ];

  const conversionData = [
    { day: "Mon", views: 1200, conversions: 340 },
    { day: "Tue", views: 1500, conversions: 420 },
    { day: "Wed", views: 1400, conversions: 390 },
    { day: "Thu", views: 1800, conversions: 510 },
    { day: "Fri", views: 2100, conversions: 630 },
    { day: "Sat", views: 2400, conversions: 720 },
    { day: "Sun", views: 2200, conversions: 660 },
  ];

  const recentPayments = [
    { id: "PAY-7841", customer: "Alice Brown", amount: 2499, method: "Card", date: "5 min ago" },
    { id: "PAY-7840", customer: "David Lee", amount: 1299, method: "Transfer", date: "12 min ago" },
    { id: "PAY-7839", customer: "Emma Wilson", amount: 899, method: "Card", date: "28 min ago" },
    { id: "PAY-7838", customer: "Frank Miller", amount: 3199, method: "Card", date: "1 hour ago" },
  ];

  const quickActions = [
    { label: "Add Product", icon: Package, path: "/admin/stocking" },
    { label: "View Orders", icon: ShoppingBag, path: "/admin/orders" },
    { label: "Approvals", icon: CheckCircle, path: "/admin/part-payments" },
    { label: "Analytics", icon: TrendingUp, path: "/admin/analytics" },
  ];

  const recentOrders = [
    {
      id: "ORD-12849",
      customer: "Sarah Johnson",
      amount: 1299,
      status: "pending",
      date: "2 min ago",
    },
    {
      id: "ORD-12848",
      customer: "Michael Chen",
      amount: 2547,
      status: "processing",
      date: "15 min ago",
    },
    {
      id: "ORD-12847",
      customer: "Emily Davis",
      amount: 899,
      status: "shipped",
      date: "1 hour ago",
    },
    {
      id: "ORD-12846",
      customer: "James Wilson",
      amount: 1699,
      status: "delivered",
      date: "2 hours ago",
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
      case "pending":
        return "text-chart-4 bg-chart-4/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`h-11 w-11 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
                <span
                  className={`text-xs font-semibold ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-2xl p-5 flex items-center gap-3 hover:opacity-90 transition-all shadow-lg hover:scale-105"
            >
              <Icon className="h-6 w-6" />
              <span className="font-semibold">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Revenue Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Category Performance */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="hsl(var(--primary))"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                </div>
                <span className="font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Growth */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Customer Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={customerGrowthData}>
              <defs>
                <linearGradient id="customerGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="customers"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                fill="url(#customerGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Analytics */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Conversion Analytics</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
              <Legend />
              <Bar dataKey="views" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="conversions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Most Sold Products */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Most Sold Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                  {index + 1}
                </div>
                <div className="h-11 w-11 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-sm">{product.name}</div>
                  <div className="text-xs text-muted-foreground">{product.sales} sales</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary text-sm">${(product.revenue / 1000).toFixed(1)}k</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-sm text-primary hover:text-primary/80 font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{order.id}</div>
                  <div className="text-xs text-muted-foreground truncate">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">${order.amount}</div>
                  <div className="text-xs text-muted-foreground">{order.date}</div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Payments</h2>
            <button className="text-sm text-primary hover:text-primary/80 font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{payment.id}</div>
                  <div className="text-xs text-muted-foreground truncate">{payment.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">${payment.amount}</div>
                  <div className="text-xs text-muted-foreground">{payment.date}</div>
                </div>
                <div className="px-2 py-1 rounded bg-success/10 text-xs font-semibold text-success">
                  {payment.method}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="mt-6 bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Activity Feed</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">Order #ORD-12849</span> was successfully delivered to{" "}
                <span className="font-semibold">Sarah Johnson</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">Low stock alert:</span> iPhone 15 Pro Max has only 5 units remaining
              </p>
              <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">New booking request</span> from Michael Chen for MacBook Pro M3
              </p>
              <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-chart-2/10 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-chart-2" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold">47 new customers</span> registered in the last 24 hours
              </p>
              <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
