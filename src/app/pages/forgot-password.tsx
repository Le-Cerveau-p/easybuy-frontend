import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowLeft } from "lucide-react";

type Step = "email" | "otp" | "reset" | "success";

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setStep("otp");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", otp.join(""));
    setStep("reset");
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset:", { password, confirmPassword });
    setStep("success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 overflow-hidden rounded-2xl bg-white p-2 items-center justify-center shadow-lg mb-4">
            <img src="/eazylogo.jpg" alt="Eazybuy" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Enter OTP"}
            {step === "reset" && "Reset Password"}
            {step === "success" && "Success!"}
          </h1>
          <p className="text-muted-foreground">
            {step === "email" && "We'll send you a code to reset your password"}
            {step === "otp" && `Code sent to ${email}`}
            {step === "reset" && "Create a new password for your account"}
            {step === "success" && "Your password has been reset"}
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
          {/* Email Step */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email or Phone
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="text"
                    placeholder="Enter your email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Send Code
              </button>
            </form>
          )}

          {/* OTP Step */}
          {step === "otp" && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-4 text-center">
                  Enter 6-digit code
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Didn't receive code? <span className="font-semibold text-primary">Resend</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Verify Code
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </form>
          )}

          {/* Reset Password Step */}
          {step === "reset" && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-semibold mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="confirmNewPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Reset Password
              </button>
            </form>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="inline-flex h-20 w-20 rounded-full bg-success/10 items-center justify-center">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Password Reset Successful!</h3>
                <p className="text-muted-foreground">
                  You can now sign in with your new password
                </p>
              </div>
              <Link
                to="/login"
                className="inline-block w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Back to Sign In
              </Link>
            </div>
          )}

          {step !== "success" && (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-semibold">
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
