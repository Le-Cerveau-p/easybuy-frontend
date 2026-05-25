import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { TopNavigation } from "./components/top-navigation";
import { BottomNavigation } from "./components/bottom-navigation";
import { Footer } from "./components/footer";
import { AdminSidebar } from "./components/admin-sidebar";

const HomePage = lazy(() =>
  import("./pages/home").then((module) => ({ default: module.HomePage })),
);
const LoginEnhancedPage = lazy(() =>
  import("./pages/login-enhanced").then((module) => ({
    default: module.LoginEnhancedPage,
  })),
);
const RegisterPage = lazy(() =>
  import("./pages/register").then((module) => ({ default: module.RegisterPage })),
);
const ForgotPasswordPage = lazy(() =>
  import("./pages/forgot-password").then((module) => ({
    default: module.ForgotPasswordPage,
  })),
);
const ProductDetailsPage = lazy(() =>
  import("./pages/product-details").then((module) => ({
    default: module.ProductDetailsPage,
  })),
);
const ProductListingPage = lazy(() =>
  import("./pages/product-listing").then((module) => ({
    default: module.ProductListingPage,
  })),
);
const CartPage = lazy(() =>
  import("./pages/cart").then((module) => ({ default: module.CartPage })),
);
const CheckoutPage = lazy(() =>
  import("./pages/checkout").then((module) => ({ default: module.CheckoutPage })),
);
const ProfilePage = lazy(() =>
  import("./pages/profile").then((module) => ({ default: module.ProfilePage })),
);
const EditProfilePage = lazy(() =>
  import("./pages/edit-profile").then((module) => ({
    default: module.EditProfilePage,
  })),
);
const ManageAddressesPage = lazy(() =>
  import("./pages/manage-addresses").then((module) => ({
    default: module.ManageAddressesPage,
  })),
);
const PaymentMethodsPage = lazy(() =>
  import("./pages/payment-methods").then((module) => ({
    default: module.PaymentMethodsPage,
  })),
);
const SecuritySettingsPage = lazy(() =>
  import("./pages/security-settings").then((module) => ({
    default: module.SecuritySettingsPage,
  })),
);
const OrderTrackingPage = lazy(() =>
  import("./pages/order-tracking").then((module) => ({
    default: module.OrderTrackingPage,
  })),
);
const NotificationsPage = lazy(() =>
  import("./pages/notifications").then((module) => ({
    default: module.NotificationsPage,
  })),
);
const CategoriesPage = lazy(() =>
  import("./pages/categories").then((module) => ({
    default: module.CategoriesPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/admin-dashboard").then((module) => ({
    default: module.AdminDashboardPage,
  })),
);
const PropertyListingPage = lazy(() =>
  import("./pages/property-listing").then((module) => ({
    default: module.PropertyListingPage,
  })),
);
const PropertyDetailsPage = lazy(() =>
  import("./pages/property-details").then((module) => ({
    default: module.PropertyDetailsPage,
  })),
);
const AdminInventoryPage = lazy(() =>
  import("./pages/admin-inventory").then((module) => ({
    default: module.AdminInventoryPage,
  })),
);
const AdminStockingPage = lazy(() =>
  import("./pages/admin-stocking").then((module) => ({
    default: module.AdminStockingPage,
  })),
);
const AdminOrdersPage = lazy(() =>
  import("./pages/admin-orders").then((module) => ({
    default: module.AdminOrdersPage,
  })),
);
const AdminPartPaymentsPage = lazy(() =>
  import("./pages/admin-part-payments").then((module) => ({
    default: module.AdminPartPaymentsPage,
  })),
);
const AdminCustomersPage = lazy(() =>
  import("./pages/admin-customers").then((module) => ({
    default: module.AdminCustomersPage,
  })),
);
const AdminAdminUsersPage = lazy(() =>
  import("./pages/admin-admin-users").then((module) => ({
    default: module.AdminAdminUsersPage,
  })),
);
const AdminAnalyticsPage = lazy(() =>
  import("./pages/admin-analytics").then((module) => ({
    default: module.AdminAnalyticsPage,
  })),
);
const AdminPaymentsPage = lazy(() =>
  import("./pages/admin-payments").then((module) => ({
    default: module.AdminPaymentsPage,
  })),
);
const AdminNotificationsPage = lazy(() =>
  import("./pages/admin-notifications").then((module) => ({
    default: module.AdminNotificationsPage,
  })),
);
const AdminSettingsPage = lazy(() =>
  import("./pages/admin-settings").then((module) => ({
    default: module.AdminSettingsPage,
  })),
);
const AdminReportsPage = lazy(() =>
  import("./pages/admin-reports").then((module) => ({
    default: module.AdminReportsPage,
  })),
);

function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="mb-4 h-2 w-24 rounded-full bg-primary/20" />
        <div className="mb-3 h-7 w-3/4 rounded-xl bg-muted animate-pulse" />
        <div className="mb-2 h-4 w-full rounded-lg bg-muted animate-pulse" />
        <div className="mb-2 h-4 w-5/6 rounded-lg bg-muted animate-pulse" />
        <div className="h-10 w-36 rounded-xl bg-primary/20 animate-pulse mt-6" />
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const authPages = ["/login", "/register", "/forgot-password"];
  const adminPages = location.pathname.startsWith("/admin");
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {!isAuthPage && !adminPages && <TopNavigation />}
      <main className="flex-1">{children}</main>
      {!isAuthPage && !adminPages && <Footer />}
      {!isAuthPage && !adminPages && <BottomNavigation />}
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              {/* Public Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginEnhancedPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Shopping */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:category" element={<ProductListingPage />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* User Area */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/edit" element={<EditProfilePage />} />
              <Route path="/profile/addresses" element={<ManageAddressesPage />} />
              <Route path="/profile/payments" element={<PaymentMethodsPage />} />
              <Route path="/profile/security" element={<SecuritySettingsPage />} />
              <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />

              {/* Properties & Vehicles */}
              <Route path="/properties" element={<PropertyListingPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
              <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
              <Route path="/admin/inventory" element={<AdminLayout><AdminInventoryPage /></AdminLayout>} />
              <Route path="/admin/stocking" element={<AdminLayout><AdminStockingPage /></AdminLayout>} />
              <Route path="/admin/orders" element={<AdminLayout><AdminOrdersPage /></AdminLayout>} />
              <Route path="/admin/part-payments" element={<AdminLayout><AdminPartPaymentsPage /></AdminLayout>} />
              <Route path="/admin/customers" element={<AdminLayout><AdminCustomersPage /></AdminLayout>} />
              <Route path="/admin/admin-users" element={<AdminLayout><AdminAdminUsersPage /></AdminLayout>} />
              <Route path="/admin/analytics" element={<AdminLayout><AdminAnalyticsPage /></AdminLayout>} />
              <Route path="/admin/payments" element={<AdminLayout><AdminPaymentsPage /></AdminLayout>} />
              <Route path="/admin/notifications" element={<AdminLayout><AdminNotificationsPage /></AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout><AdminSettingsPage /></AdminLayout>} />
              <Route path="/admin/reports" element={<AdminLayout><AdminReportsPage /></AdminLayout>} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
