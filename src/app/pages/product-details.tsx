import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Star, Minus, Plus, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, MapPin, MessageCircle } from "lucide-react";

export function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<"full" | "delivery" | "booking">("full");
  const [showBookingForm, setShowBookingForm] = useState(false);

  const product = {
    id,
    name: "iPhone 15 Pro Max 256GB",
    price: 1299,
    originalPrice: 1499,
    bookingAmount: 200,
    rating: 4.8,
    reviews: 1240,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=800",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800",
      "https://images.unsplash.com/photo-1695048133082-4a86f9d1b263?w=800",
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=800",
    ],
    brand: "Apple",
    category: "Electronics",
    seller: "Premium Electronics Store",
    sellerRating: 4.9,
    description: "The latest iPhone 15 Pro Max features a stunning titanium design, powerful A17 Pro chip, and an advanced camera system. Experience the ultimate in performance and photography.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main | 12MP Ultra Wide | 12MP Telephoto",
      "Storage": "256GB",
      "Battery": "Up to 29 hours video playback",
      "5G": "Supported",
    },
    features: [
      "Titanium design",
      "Action button",
      "Dynamic Island",
      "Ceramic Shield front",
      "Water resistant IP68",
    ],
    delivery: {
      standard: { days: "3-5", cost: 0 },
      express: { days: "1-2", cost: 15 },
    },
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely love this phone! The camera quality is incredible and the battery lasts all day.",
      verified: true,
    },
    {
      id: 2,
      user: "James K.",
      rating: 4,
      date: "1 week ago",
      comment: "Great phone overall. The titanium finish feels premium. Slight learning curve with the action button.",
      verified: true,
    },
    {
      id: 3,
      user: "Emily R.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Best iPhone yet! The performance is blazing fast. Highly recommend for photography enthusiasts.",
      verified: true,
    },
  ];

  const similarProducts = [
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 1199,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      price: 999,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
      rating: 4.6,
    },
    {
      id: 4,
      name: "OnePlus 12",
      price: 799,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.5,
    },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const total = selectedPayment === "booking" ? product.bookingAmount : product.price * quantity;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button className="absolute top-4 right-4 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
              <Heart className="h-6 w-6 hover:text-destructive hover:fill-destructive transition-colors" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === index ? "border-primary" : "border-transparent"
                }`}
              >
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to={`/seller/${product.seller}`} className="hover:text-primary">{product.seller}</Link>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span>{product.sellerRating}</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold text-lg">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                product.inStock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              }`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
              <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-lg text-sm font-semibold">
                Save ${product.originalPrice - product.price}
              </span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-3">
            <h3 className="font-semibold">Payment Options</h3>
            <div className="grid gap-3">
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === "full" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "full"}
                  onChange={() => setSelectedPayment("full")}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <div className="font-semibold">Full Payment</div>
                  <div className="text-sm text-muted-foreground">Pay ${product.price * quantity} now</div>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === "delivery" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "delivery"}
                  onChange={() => setSelectedPayment("delivery")}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <div className="font-semibold">Pay on Delivery</div>
                  <div className="text-sm text-muted-foreground">Pay when you receive the item</div>
                </div>
              </label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === "booking" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === "booking"}
                  onChange={() => setSelectedPayment("booking")}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <div className="font-semibold">Part Payment (Booking)</div>
                  <div className="text-sm text-muted-foreground">
                    Pay ${product.bookingAmount} now, ${product.price - product.bookingAmount} later
                  </div>
                </div>
              </label>
            </div>
            {selectedPayment === "booking" && (
              <button
                onClick={() => setShowBookingForm(true)}
                className="text-sm text-primary hover:text-primary/80 font-semibold"
              >
                Apply for lower booking amount
              </button>
            )}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Link>
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
            >
              Buy Now - ${total}
            </Link>
          </div>

          {/* Delivery Info */}
          <div className="grid gap-3 p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Free Delivery</div>
                <div className="text-sm text-muted-foreground">Delivery in {product.delivery.standard.days} business days</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Secure Payment</div>
                <div className="text-sm text-muted-foreground">100% secure transaction</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">7 Days Return</div>
                <div className="text-sm text-muted-foreground">Easy return and refund</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-12">
        <div className="border-b border-border mb-6">
          <div className="flex gap-8">
            <button className="pb-4 border-b-2 border-primary font-semibold">Description</button>
            <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Specifications
            </button>
            <button className="pb-4 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Reviews ({product.reviews})
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-muted-foreground">{product.description}</p>
          <h3 className="font-semibold mt-6 mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-primary rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews */}
        <div className="space-y-6">
          <h3 className="font-semibold text-xl">Customer Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {review.user[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{review.user}</div>
                    <div className="text-sm text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
              {review.verified && (
                <div className="mt-3 flex items-center gap-2 text-sm text-success">
                  <Shield className="h-4 w-4" />
                  Verified Purchase
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Similar Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="font-semibold text-sm">{product.rating}</span>
                </div>
                <span className="text-xl font-bold text-primary">${product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
