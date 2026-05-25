import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, CreditCard, Trash2, X, Check } from "lucide-react";

interface PaymentMethod {
  id: number;
  type: "card" | "bank";
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  brand: "visa" | "mastercard" | "verve";
}

export function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "card",
      cardNumber: "**** **** **** 4532",
      cardHolder: "John Doe",
      expiryDate: "12/26",
      isDefault: true,
      brand: "visa",
    },
    {
      id: 2,
      type: "card",
      cardNumber: "**** **** **** 8901",
      cardHolder: "John Doe",
      expiryDate: "08/27",
      isDefault: false,
      brand: "mastercard",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    isDefault: false,
  });

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  const setAsDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMethod: PaymentMethod = {
      id: Math.max(...paymentMethods.map((pm) => pm.id), 0) + 1,
      type: "card",
      cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`,
      cardHolder: formData.cardHolder,
      expiryDate: `${formData.expiryMonth}/${formData.expiryYear.slice(-2)}`,
      isDefault: formData.isDefault,
      brand: "visa",
    };
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowForm(false);
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      isDefault: false,
    });
  };

  const getBrandLogo = (brand: string) => {
    const colors = {
      visa: "from-blue-600 to-blue-700",
      mastercard: "from-red-600 to-orange-600",
      verve: "from-green-600 to-teal-600",
    };
    return colors[brand as keyof typeof colors] || "from-gray-600 to-gray-700";
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/profile" className="p-2 hover:bg-muted rounded-lg transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Payment Methods</h1>
            <p className="text-muted-foreground">{paymentMethods.length} saved cards</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Card
        </button>
      </div>

      {/* Add Card Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add New Card</h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Card Number</label>
                <input
                  type="text"
                  value={formatCardNumber(formData.cardNumber)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cardNumber: e.target.value.replace(/\s/g, "").slice(0, 16),
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Card Holder Name</label>
                <input
                  type="text"
                  value={formData.cardHolder}
                  onChange={(e) =>
                    setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })
                  }
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Month</label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month.toString().padStart(2, "0")}>
                        {month.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Year</label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => 2026 + i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value.slice(0, 3) })
                    }
                    placeholder="123"
                    maxLength={3}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                />
                <span className="font-semibold">Set as default payment method</span>
              </label>

              <div className="p-4 bg-muted rounded-xl text-sm text-muted-foreground">
                Your payment information is encrypted and stored securely. We never share your
                card details with merchants.
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-gradient-to-br from-card to-muted border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div
                  className={`h-16 w-24 rounded-xl bg-gradient-to-br ${getBrandLogo(
                    method.brand
                  )} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {method.brand.toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{method.cardNumber}</h3>
                    {method.isDefault && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-semibold flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.cardHolder}</p>
                  <p className="text-sm text-muted-foreground">Expires {method.expiryDate}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(method.id)}
                className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5 text-destructive" />
              </button>
            </div>

            {!method.isDefault && (
              <button
                onClick={() => setAsDefault(method.id)}
                className="text-sm text-primary hover:text-primary/80 font-semibold"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl">
        <div className="flex items-start gap-3">
          <CreditCard className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Secure Payment Processing</h3>
            <p className="text-sm text-muted-foreground">
              All transactions are processed through Flutterwave's secure payment gateway. Your
              card information is encrypted and never stored on our servers. We comply with PCI
              DSS standards to ensure your payment security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
