import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: LayoutGrid, label: "Categories", path: "/categories" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", badge: 3 },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="lg:hidden fixed inset-x-0 bottom-0 z-50 px-2 sm:px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
      <div className="mx-auto w-full max-w-md rounded-xl sm:rounded-2xl border border-border bg-card/90 shadow-2xl backdrop-blur-xl overflow-hidden">
        <div className="grid grid-cols-4 items-stretch gap-1 p-1.5 sm:p-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg px-1 py-1.5 text-center transition-all sm:gap-1 sm:rounded-xl sm:px-3 sm:py-2 ${
                  isActive
                    ? "bg-primary text-primary-foreground scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground sm:-top-2 sm:-right-2 sm:h-5 sm:w-5 sm:text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="max-w-full truncate text-[10px] font-medium leading-none sm:text-xs">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
