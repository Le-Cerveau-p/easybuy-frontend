import { Heart, Star, Clock, MapPin, Flame, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Summer Electronics Sale",
      subtitle: "Up to 50% off on latest gadgets",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
      cta: "Shop Now",
    },
    {
      title: "Luxury Furniture Collection",
      subtitle: "Transform your living space",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200",
      cta: "Explore",
    },
    {
      title: "Premium Properties",
      subtitle: "Find your dream home today",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
      cta: "View Listings",
    },
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: "2.5k", color: "from-blue-500 to-blue-600" },
    { name: "Furniture", icon: "🛋️", count: "1.8k", color: "from-amber-500 to-amber-600" },
    { name: "Fashion", icon: "👔", count: "3.2k", color: "from-pink-500 to-pink-600" },
    { name: "Home Appliances", icon: "🏠", count: "900", color: "from-green-500 to-green-600" },
    { name: "Cars", icon: "🚗", count: "450", color: "from-red-500 to-red-600" },
    { name: "Lands", icon: "🏞️", count: "320", color: "from-emerald-500 to-emerald-600" },
    { name: "Hostels", icon: "🏢", count: "180", color: "from-purple-500 to-purple-600" },
    { name: "Apartments", icon: "🏘️", count: "540", color: "from-orange-500 to-orange-600" },
  ];

  const flashSaleProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1299,
      originalPrice: 1499,
      image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=400",
      rating: 4.8,
      reviews: 1240,
      discount: 13,
      timeLeft: "2h 15m",
    },
    {
      id: 2,
      name: "Samsung 4K Smart TV",
      price: 899,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400",
      rating: 4.6,
      reviews: 890,
      discount: 31,
      timeLeft: "2h 15m",
    },
    {
      id: 3,
      name: "MacBook Pro M3",
      price: 1999,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.9,
      reviews: 2100,
      discount: 20,
      timeLeft: "2h 15m",
    },
    {
      id: 4,
      name: "Sony WH-1000XM5",
      price: 329,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
      rating: 4.7,
      reviews: 1560,
      discount: 18,
      timeLeft: "2h 15m",
    },
  ];

  const trendingProducts = [
    {
      id: 5,
      name: "Modern L-Shaped Sofa",
      price: 1299,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
      rating: 4.5,
      reviews: 340,
      bookingAmount: 200,
    },
    {
      id: 6,
      name: "Gaming Console PS5",
      price: 499,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
      rating: 4.8,
      reviews: 2890,
    },
    {
      id: 7,
      name: "Designer Leather Jacket",
      price: 299,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      rating: 4.6,
      reviews: 670,
    },
    {
      id: 8,
      name: "Smart Refrigerator",
      price: 1899,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400",
      rating: 4.4,
      reviews: 230,
      bookingAmount: 300,
    },
  ];

  const propertyListings = [
    {
      id: 9,
      type: "Car",
      name: "Mercedes-Benz C-Class 2023",
      price: 45000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400",
      location: "Lagos, Nigeria",
      features: ["Automatic", "Leather", "22k miles"],
    },
    {
      id: 10,
      type: "Land",
      name: "Prime Commercial Plot",
      price: 250000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400",
      location: "Abuja, Nigeria",
      features: ["5000 sqm", "Fenced", "C of O"],
    },
    {
      id: 11,
      type: "Apartment",
      name: "Luxury 3BR Apartment",
      price: 2500,
      priceUnit: "/month",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      location: "Victoria Island, Lagos",
      features: ["3 Bed", "2 Bath", "Pool"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-28 sm:pb-24 lg:pb-8">
      {/* Hero Carousel */}
      <section className="relative h-[360px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-b-3xl">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-white">
              <h1 className="mb-3 max-w-2xl text-2xl font-bold leading-tight sm:text-3xl md:text-5xl">
                {slide.title}
              </h1>
              <p className="mb-5 max-w-xl text-sm text-white/90 sm:mb-6 sm:text-lg md:text-xl">
                {slide.subtitle}
              </p>
              <button className="rounded-xl bg-primary px-5 py-2.5 font-semibold shadow-xl transition-all transform hover:scale-105 hover:bg-primary/90 sm:px-8 sm:py-3">
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mt-12">
        {/* Categories */}
        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="text-primary hover:text-primary/80 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase()}`}
                className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 text-center shadow-sm transition-all hover:scale-105 hover:bg-muted hover:shadow-md sm:p-4"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg sm:h-16 sm:w-16 sm:text-4xl ${category.color}`}>
                  {category.icon}
                </div>
                <span className="text-xs font-semibold text-center">{category.name}</span>
                <span className="text-xs text-muted-foreground">{category.count}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Flash Sales */}
        <section>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Flame className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Flash Sales</h2>
                <p className="text-sm text-muted-foreground">Ending in 2h 15m</p>
              </div>
            </div>
            <Link to="/flash-sales" className="text-primary hover:text-primary/80 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCard key={product.id} product={product} showCountdown />
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <Link to="/trending" className="text-primary hover:text-primary/80 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Property & Vehicle Listings */}
        <section>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">Featured Properties & Vehicles</h2>
            <Link to="/properties" className="text-primary hover:text-primary/80 font-semibold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {propertyListings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProductCard({ product, showCountdown }: { product: any; showCountdown?: boolean }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group rounded-2xl bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount && (
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
            -{product.discount}%
          </div>
        )}
        {showCountdown && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4" />
            {product.timeLeft}
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
          <Heart className="h-5 w-5 text-foreground hover:text-destructive hover:fill-destructive transition-colors" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 break-words font-semibold text-base transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="font-semibold text-sm">{product.rating}</span>
          <span className="text-muted-foreground text-sm">({product.reviews})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary sm:text-xl">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
        {product.bookingAmount && (
          <div className="mt-2 px-3 py-1 bg-accent/10 border border-accent rounded-lg text-xs font-semibold text-accent inline-block">
            Book with ${product.bookingAmount}
          </div>
        )}
      </div>
    </Link>
  );
}

function PropertyCard({ listing }: { listing: any }) {
  return (
    <Link
      to={`/property/${listing.id}`}
      className="group block rounded-2xl bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-lg font-bold text-sm shadow-lg capitalize">
          {listing.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 break-words font-semibold text-lg">{listing.name}</h3>
        <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="min-w-0 break-words">{listing.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {listing.features.map((feature: string) => (
            <span
              key={feature}
              className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-xl font-bold text-primary sm:text-2xl">${listing.price.toLocaleString()}</span>
          {listing.priceUnit && (
            <span className="text-sm text-muted-foreground">{listing.priceUnit}</span>
          )}
        </div>
        <div className="w-full py-2 bg-accent text-accent-foreground rounded-xl font-semibold transition-all text-center">
          View Details
        </div>
      </div>
    </Link>
  );
}
