import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShoppingBag, TrendingUp, Package } from "lucide-react";
import { motion } from "motion/react";
import { setAuthRole } from "../lib/auth";

export function LoginEnhancedPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: {email?: string; password?: string} = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Admin redirect logic
      if (formData.email.toLowerCase() === "admin@eazybuy.com") {
        setAuthRole("admin");
        navigate("/admin/dashboard");
      } else {
        // Normal user redirect
        setAuthRole("user");
        navigate("/");
      }
      setIsLoading(false);
    }, 1500);
  };

  const featuredProducts = [
    { icon: ShoppingBag, label: "10,000+ Products", color: "from-primary to-accent" },
    { icon: TrendingUp, label: "Best Prices", color: "from-accent to-primary" },
    { icon: Package, label: "Fast Delivery", color: "from-primary to-accent" },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Hero Section (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200')] bg-cover bg-center opacity-10" />

        {/* Animated Glow Effects */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-primary rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white w-full">
          {/* Logo */}
          <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
            <div className="h-24 w-24 rounded-2xl bg-white p-2 flex items-center justify-center shadow-2xl border border-white/20 mb-6 overflow-hidden">
              <img src="/eazylogo.jpg" alt="Eazybuy" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-5xl font-bold text-center mb-4">Eazybuy</h1>
            <p className="text-xl text-white/90 text-center">Your Premium Marketplace</p>
          </motion.div>

          {/* Animated Feature Cards */}
          <div className="space-y-6 w-full max-w-md">
            {featuredProducts.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.label}</h3>
                    <p className="text-white/80 text-sm">Experience the best</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 grid grid-cols-3 gap-4 opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-16 w-16 bg-white/20 rounded-xl animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex h-20 w-20 overflow-hidden rounded-2xl bg-white p-2 items-center justify-center shadow-xl mb-4">
              <img src="/eazylogo.jpg" alt="Eazybuy" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Eazybuy
            </h1>
            <p className="text-muted-foreground">Your Premium Marketplace</p>
          </div>

          {/* Welcome Text */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to continue shopping</p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl shadow-xl p-8 border border-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl bg-input border transition-all ${
                      errors.email
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full pl-12 pr-12 py-3 rounded-xl bg-input border transition-all ${
                      errors.password
                        ? "border-destructive focus:ring-destructive"
                        : "border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.remember}
                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-semibold">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-primary hover:text-primary/80 font-semibold">
                Sign Up
              </a>
            </p>

            {/* Admin Notice */}
            <div className="mt-6 p-3 bg-muted/50 rounded-xl text-center">
              <p className="text-xs text-muted-foreground">
                Admin? Use <span className="font-semibold text-foreground">admin@eazybuy.com</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
