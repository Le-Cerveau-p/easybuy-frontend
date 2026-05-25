import { useState } from "react";
import { TrendingUp, Users, DollarSign, ShoppingCart, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function AdminAnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("30days");

  const revenueGrowth = [
    { month: "Jan", revenue: 12500, target: 15000 },
    { month: "Feb", revenue: 18200, target: 18000 },
    { month: "Mar", revenue: 22100, target: 20000 },
    { month: "Apr", revenue: 19800, target: 22000 },
    { month: "May", revenue: 28400, target: 25000 },
  ];

  const userGrowth = [
    { month: "Jan", users: 1200 },
    { month: "Feb", users: 1850 },
    { month: "Mar", users: 2650 },
    { month: "Apr", users: 3420 },
    { month: "May", users: 4890 },
  ];

  const conversionData = [
    { week: "Week 1", views: 5200, clicks: 1560, conversions: 312 },
    { week: "Week 2", views: 6100, clicks: 1830, conversions: 428 },
    { week: "Week 3", views: 5800, clicks: 1740, conversions: 391 },
    { week: "Week 4", views: 7200, clicks: 2160, conversions: 518 },
  ];

  const productPerformance = [
    { name: "Electronics", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Furniture", value: 22, color: "hsl(var(--chart-2))" },
    { name: "Fashion", value: 18, color: "hsl(var(--chart-3))" },
    { name: "Appliances", value: 15, color: "hsl(var(--chart-4))" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Deep insights into your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all">
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: "$101,000", change: "+18.2%", icon: DollarSign, color: "primary" },
          { label: "New Customers", value: "4,890", change: "+43.1%", icon: Users, color: "success" },
          { label: "Orders", value: "1,649", change: "+24.5%", icon: ShoppingCart, color: "chart-1" },
          { label: "Conversion Rate", value: "7.2%", change: "+2.3%", icon: TrendingUp, color: "chart-2" },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className={`h-10 w-10 rounded-lg bg-${stat.color}/10 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}`} />
                </div>
                <span className="text-xs text-success font-semibold">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Growth */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Revenue Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueGrowth}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revenueGrad)" />
              <Line type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
              <Line type="monotone" dataKey="users" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: "hsl(var(--success))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Conversion Funnel */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Conversion Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }} />
              <Legend />
              <Bar dataKey="views" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="clicks" fill="hsl(var(--chart-2))" radius={[8, 8, 0, 0]} />
              <Bar dataKey="conversions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Product Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={productPerformance} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {productPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
