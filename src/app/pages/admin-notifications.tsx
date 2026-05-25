import { useState } from "react";
import { Bell, ShoppingCart, AlertTriangle, Package, UserPlus, Trash2 } from "lucide-react";

interface Notification {
  id: number;
  type: "order" | "low-stock" | "booking" | "payment" | "user";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-12849 from Sarah Johnson - $1,299",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "low-stock",
      title: "Low Inventory Alert",
      message: "iPhone 15 Pro Max has only 5 units remaining",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "booking",
      title: "New Booking Request",
      message: "Alice Brown requesting $400 booking for MacBook Pro M3",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Failed",
      message: "Payment for Order #ORD-12846 failed - $1,299",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "user",
      title: "New Customer Registration",
      message: "John Doe just registered - john.doe@example.com",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="h-5 w-5" />;
      case "low-stock":
        return <AlertTriangle className="h-5 w-5" />;
      case "booking":
        return <Package className="h-5 w-5" />;
      case "payment":
        return <Bell className="h-5 w-5" />;
      case "user":
        return <UserPlus className="h-5 w-5" />;
    }
  };

  const getColor = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return "bg-primary/10 text-primary";
      case "low-stock":
        return "bg-warning/10 text-warning";
      case "booking":
        return "bg-chart-1/10 text-chart-1";
      case "payment":
        return "bg-destructive/10 text-destructive";
      case "user":
        return "bg-success/10 text-success";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Mark All as Read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-card border rounded-2xl p-5 transition-all ${
              notification.read ? "border-border" : "border-primary/50 shadow-lg"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getColor(notification.type)}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-primary hover:text-primary/80 font-semibold"
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1.5 hover:bg-destructive/10 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
          <p className="text-muted-foreground">You're all caught up!</p>
        </div>
      )}
    </div>
  );
}
