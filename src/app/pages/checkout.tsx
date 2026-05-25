import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, CreditCard, MapPin, Truck, Lock, Loader2, CheckCircle } from "lucide-react";

type Step = "address" | "delivery" | "payment" | "confirmation";
type PaymentStatus = "idle" | "processing" | "success" | "failed";

export function CheckoutPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("address");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [transactionRef, setTransactionRef] = useState("");

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    phone: "+234 801 234 5678",
    email: "john.doe@example.com",
    address: "123 Main Street",
    city: "Lagos",
    state: "Lagos State",
    zipCode: "100001",
    deliveryOption: "standard",
    paymentMethod: "card",
  });

  const steps = [
    { id: "address", label: "Address", icon: MapPin },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "confirmation", label: "Confirm", icon: Check },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const stepOrder: Step[] = ["address", "delivery", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["address", "delivery", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handlePayment = () => {
    setPaymentStatus("processing");

    setTimeout(() => {
      const ref = `TXN${Date.now().toString().slice(-8)}`;
      setTransactionRef(ref);
      setPaymentStatus("success");

      setTimeout(() => {
        navigate("/order-tracking/12345");
      }, 3000);
    }, 2000);
  };

  const cartTotal = 2527;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-24 lg:pb-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="mb-4 flex items-start justify-between gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = currentStepIndex > index;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition-all sm:h-12 sm:w-12 ${
                      isCompleted
                        ? "bg-success text-success-foreground"
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4 sm:h-6 sm:w-6" /> : <Icon className="h-4 w-4 sm:h-6 sm:w-6" />}
                  </div>
                  <span
                    className={`mt-2 text-[10px] font-semibold sm:text-sm ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mt-4 h-0.5 flex-1 transition-all sm:mt-0 sm:h-1 ${
                      currentStepIndex > index ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Address Step */}
          {currentStep === "address" && (
            <div className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-xl font-bold">Delivery Address</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Delivery Step */}
          {currentStep === "delivery" && (
            <div className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-4">Choose Delivery Option</h2>
              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.deliveryOption === "standard" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={formData.deliveryOption === "standard"}
                  onChange={() => setFormData({ ...formData, deliveryOption: "standard" })}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <div className="font-semibold">Standard Delivery</div>
                  <div className="text-sm text-muted-foreground">3-5 business days</div>
                </div>
                <div className="text-base font-bold text-success sm:text-lg">Free</div>
              </label>
              <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.deliveryOption === "express" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={formData.deliveryOption === "express"}
                  onChange={() => setFormData({ ...formData, deliveryOption: "express" })}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <div className="font-semibold">Express Delivery</div>
                  <div className="text-sm text-muted-foreground">1-2 business days</div>
                </div>
                <div className="text-base font-bold sm:text-lg">$15</div>
              </label>
            </div>
          )}

          {/* Payment Step */}
          {currentStep === "payment" && (
            <div className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-xl font-bold">Payment Method</h2>

              {paymentStatus === "idle" && (
                <>
                  <div className="space-y-4">
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === "card"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                    className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <CreditCard className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <div className="font-semibold">Credit/Debit Card</div>
                      <div className="text-sm text-muted-foreground break-words">Pay securely with Flutterwave</div>
                      </div>
                    </label>
                    <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.paymentMethod === "transfer" ? "border-primary bg-primary/5" : "border-border"
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={formData.paymentMethod === "transfer"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "transfer" })}
                    className="h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">₦</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">Bank Transfer</div>
                      <div className="text-sm text-muted-foreground break-words">Direct bank transfer</div>
                      </div>
                    </label>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-muted p-4">
                    <Lock className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </>
              )}

              {paymentStatus === "processing" && (
                <div className="py-12 text-center">
                  <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Processing Payment...</h3>
                  <p className="text-muted-foreground">Please wait while we process your payment</p>
                </div>
              )}

              {paymentStatus === "success" && (
                <div className="py-12 text-center">
                  <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-12 w-12 text-success" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                  <p className="text-muted-foreground mb-4">
                    Transaction Reference: <span className="font-semibold">{transactionRef}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to order tracking...
                  </p>
                </div>
              )}

              {paymentStatus === "failed" && (
                <div className="py-12 text-center">
                  <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">✕</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Payment Failed</h3>
                  <p className="text-muted-foreground mb-6">
                    There was an issue processing your payment
                  </p>
                  <button
                    onClick={() => setPaymentStatus("idle")}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === "confirmation" && (
            <div className="space-y-6 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <h2 className="text-xl font-bold">Review Your Order</h2>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <h3 className="font-semibold mb-2">Delivery Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.fullName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state}<br />
                    {formData.phone}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <h3 className="font-semibold mb-2">Delivery Option</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.deliveryOption === "standard" ? "Standard Delivery (3-5 days)" : "Express Delivery (1-2 days)"}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.paymentMethod === "card" ? "Credit/Debit Card" : "Bank Transfer"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            {currentStep !== "address" && paymentStatus === "idle" && (
              <button
                onClick={handleBack}
                className="w-full rounded-xl border border-border px-6 py-3 font-semibold transition-all hover:bg-muted sm:w-auto"
              >
                Back
              </button>
            )}
            {currentStep !== "confirmation" && paymentStatus === "idle" && (
              <button
                onClick={handleNext}
                className="w-full flex-1 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Continue
              </button>
            )}
            {currentStep === "confirmation" && paymentStatus === "idle" && (
              <button
                onClick={handlePayment}
                className="w-full flex-1 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
              >
                Place Order - ${cartTotal}
              </button>
            )}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-6">
            <h3 className="font-bold">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (3 items)</span>
                <span className="font-semibold">$2,527</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold text-success">Free</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-semibold">$202</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">$2,729</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
