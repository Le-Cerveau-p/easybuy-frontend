import { useState } from "react";
import { X, Package, CreditCard, Tag, MessageSquare, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

type NotificationType = "order" | "payment" | "promo" | "admin";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "Order Shipped",
      message: "Your order #12345 has been shipped and is on its way!",
      time: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "payment",
      title: "Payment Successful",
      message: "Your payment of $2,729 has been processed successfully.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      type: "promo",
      title: "Flash Sale Alert!",
      message: "50% off on electronics! Sale ends in 2 hours. Don't miss out!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "4",
      type: "admin",
      title: "Booking Request Approved",
      message: "Your booking amount request has been approved. New amount: $150",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "5",
      type: "order",
      title: "Order Delivered",
      message: "Your order #12344 has been delivered successfully.",
      time: "1 day ago",
      read: true,
    },
    {
      id: "6",
      type: "promo",
      title: "New Arrivals",
      message: "Check out the latest furniture collection! Premium quality at affordable prices.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | NotificationType | "unread">("all");

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <Package className="h-5 w-5" />;
      case "payment":
        return <CreditCard className="h-5 w-5" />;
      case "promo":
        return <Tag className="h-5 w-5" />;
      case "admin":
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "bg-primary/10 text-primary";
      case "payment":
        return "bg-success/10 text-success";
      case "promo":
        return "bg-warning/10 text-warning";
      case "admin":
        return "bg-chart-2/10 text-chart-2";
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        {notifications.length > 0 && (
          <div className="flex flex-wrap gap-2 sm:justify-end">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold transition-all hover:bg-muted sm:flex-none"
              >
                <Check className="h-4 w-4" />
                Mark all read
              </button>
            )}
            <button
              onClick={clearAll}
              className="flex-1 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive transition-all hover:bg-destructive/20 sm:flex-none"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "order", label: "Orders" },
          { id: "payment", label: "Payments" },
          { id: "promo", label: "Promotions" },
          { id: "admin", label: "Admin" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              filter === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            {tab.label}
            {tab.id === "unread" && unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-foreground text-primary text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-16">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No notifications</h3>
          <p className="text-muted-foreground">
            {filter === "all" ? "You're all caught up!" : `No ${filter} notifications`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredNotifications.map((notification) => (
              <motion.div
                key={notification.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={`overflow-hidden rounded-2xl border bg-card transition-all ${
                  notification.read ? "border-border" : "border-primary/50 shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4 p-4">
                  {/* Icon */}
                  <div className={`flex-shrink-0 h-12 w-12 rounded-xl flex items-center justify-center ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="break-words font-semibold">{notification.title}</h3>
                      <span className="text-xs text-muted-foreground sm:whitespace-nowrap">
                        {notification.time}
                      </span>
                    </div>
                    <p className="break-words text-sm text-muted-foreground">{notification.message}</p>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-3 text-sm text-primary hover:text-primary/80 font-semibold"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  {/* Unread Indicator */}
                  {!notification.read && (
                    <div className="flex-shrink-0 h-3 w-3 rounded-full bg-primary" />
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 rounded-lg p-2 transition-colors hover:bg-destructive/10"
                  >
                    <X className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>

                {/* Swipe indicator for mobile */}
                <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
