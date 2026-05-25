import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="hidden lg:block bg-card border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EasyBuy
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted multi-vendor marketplace for electronics, furniture, fashion, properties, and more.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="text-xs font-semibold">F</span>
              </a>
              <a href="#" className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="text-xs font-semibold">X</span>
              </a>
              <a href="#" className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="text-xs font-semibold">I</span>
              </a>
              <a href="#" className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="text-xs font-semibold">Y</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link to="/categories" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                All Categories
              </Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Shop Products
              </Link>
              <Link to="/properties" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Properties & Vehicles
              </Link>
              <Link to="/cart" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Shopping Cart
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <div className="space-y-3">
              <Link to="/profile" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                My Account
              </Link>
              <Link to="/order-tracking/12345" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Track Order
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Returns & Refunds
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>123 Market Street, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>+234 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>support@marketplace.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            (c) 2026 EasyBuy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <Link to="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
