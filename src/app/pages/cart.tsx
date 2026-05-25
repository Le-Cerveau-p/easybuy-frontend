import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Heart, ArrowRight, ShoppingBag, Tag } from "lucide-react";

export function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 1299,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=400",
      inStock: true,
      seller: "Premium Electronics",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      price: 329,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      inStock: true,
      seller: "Audio Paradise",
    },
    {
      id: 3,
      name: "Samsung 55\" 4K Smart TV",
      price: 899,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      inStock: true,
      seller: "Tech World",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [deliveryOption, setDeliveryOption] = useState<"standard" | "express">("standard");

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id: number) => {
    console.log("Moving to wishlist:", id);
    removeItem(id);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setAppliedPromo(promoCode);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const deliveryFee = deliveryOption === "express" ? 15 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started</p>
        <Link
          to="/"
          className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span className="text-muted-foreground">{cartItems.length} items</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all"
            >
              <div className="flex gap-4">
                {/* Image */}
                <Link
                  to={`/product/${item.id}`}
                  className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sold by {item.seller}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/10 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                    {/* Quantity */}
                    <div className="flex items-center gap-3 bg-muted rounded-xl p-1 w-fit">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-background rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        <span className="hidden sm:inline">Save for later</span>
                      </button>
                      <span className="text-2xl font-bold text-primary">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {!item.inStock && (
                    <div className="mt-3 px-3 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-semibold">
                      Out of Stock
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6 space-y-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            {/* Delivery Options */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Delivery Option</h3>
              <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                deliveryOption === "standard" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryOption === "standard"}
                  onChange={() => setDeliveryOption("standard")}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">Standard Delivery</div>
                  <div className="text-xs text-muted-foreground">3-5 business days • Free</div>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                deliveryOption === "express" ? "border-primary bg-primary/5" : "border-border"
              }`}>
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryOption === "express"}
                  onChange={() => setDeliveryOption("express")}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">Express Delivery</div>
                  <div className="text-xs text-muted-foreground">1-2 business days • $15</div>
                </div>
              </label>
            </div>

            {/* Promo Code */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Promo Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={applyPromo}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="flex items-center gap-2 text-sm text-success">
                  <Tag className="h-4 w-4" />
                  Promo code applied: {appliedPromo}
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex items-center justify-between text-success">
                  <span>Discount (10%)</span>
                  <span className="font-semibold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-semibold">
                  {deliveryFee === 0 ? "Free" : `$${deliveryFee}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              Proceed to Checkout
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/"
              className="block text-center text-sm text-primary hover:text-primary/80 font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
