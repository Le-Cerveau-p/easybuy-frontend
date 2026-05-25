import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  CreditCard,
  Users,
  BarChart3,
  Wallet,
  Bell,
  Settings,
  UserCog,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Inventory", path: "/admin/inventory" },
    { icon: PackagePlus, label: "Stocking", path: "/admin/stocking" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: CreditCard, label: "Part Payments", path: "/admin/part-payments" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
    { icon: Wallet, label: "Payments", path: "/admin/payments" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
    { icon: UserCog, label: "Admin Users", path: "/admin/admin-users" },
    { icon: FileText, label: "Reports", path: "/admin/reports" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EasyBuy
              </div>
              <div className="text-xs text-muted-foreground">Admin Portal</div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${
                  active ? "" : "group-hover:scale-110 transition-transform"
                }`}
              />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
              {active && !isCollapsed && (
                <div className="ml-auto h-2 w-2 rounded-full bg-primary-foreground" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => window.location.href = "/login"}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all group"
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 h-6 w-6 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-muted transition-all"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300 relative ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed left-4 top-20 z-50 rounded-lg border border-border bg-card p-2 shadow-lg sm:top-4"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50 flex flex-col">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
