import { useState } from "react";
import { MapPin, Bed, Bath, Square, Calendar, Phone, MessageCircle, Heart, Filter } from "lucide-react";
import { Link } from "react-router-dom";

type PropertyType = "car" | "land" | "hostel" | "apartment";

export function PropertyListingPage() {
  const [selectedType, setSelectedType] = useState<PropertyType | "all">("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const properties = [
    {
      id: 1,
      type: "car" as PropertyType,
      name: "Mercedes-Benz C-Class 2023",
      price: 45000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      location: "Lagos, Nigeria",
      features: ["Automatic", "Leather Seats", "22k miles", "Premium Sound"],
      year: 2023,
      mileage: "22,000 km",
    },
    {
      id: 2,
      type: "land" as PropertyType,
      name: "Prime Commercial Plot",
      price: 250000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      location: "Abuja, Nigeria",
      features: ["5000 sqm", "Fenced", "C of O", "Corner Piece"],
      size: "5,000 sqm",
    },
    {
      id: 3,
      type: "apartment" as PropertyType,
      name: "Luxury 3BR Apartment",
      price: 2500,
      priceUnit: "/month",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      location: "Victoria Island, Lagos",
      features: ["3 Bed", "2 Bath", "Pool", "24/7 Security"],
      bedrooms: 3,
      bathrooms: 2,
      size: "180 sqm",
    },
    {
      id: 4,
      type: "hostel" as PropertyType,
      name: "Modern Student Hostel",
      price: 800,
      priceUnit: "/month",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
      location: "Yaba, Lagos",
      features: ["Furnished", "WiFi", "Study Area", "Kitchen"],
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: 5,
      type: "car" as PropertyType,
      name: "Toyota Camry 2022",
      price: 28000,
      image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      location: "Port Harcourt, Nigeria",
      features: ["Automatic", "Low Mileage", "Full Service History"],
      year: 2022,
      mileage: "15,000 km",
    },
    {
      id: 6,
      type: "apartment" as PropertyType,
      name: "2BR Serviced Apartment",
      price: 1800,
      priceUnit: "/month",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      location: "Lekki, Lagos",
      features: ["2 Bed", "2 Bath", "Gym", "Parking"],
      bedrooms: 2,
      bathrooms: 2,
      size: "120 sqm",
    },
  ];

  const filteredProperties = properties.filter(
    (p) =>
      (selectedType === "all" || p.type === selectedType) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  const typeColors: Record<PropertyType, string> = {
    car: "bg-red-500",
    land: "bg-emerald-500",
    apartment: "bg-orange-500",
    hostel: "bg-purple-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Properties & Vehicles</h1>
        <p className="text-muted-foreground">
          Find your next car, land, apartment, or hostel
        </p>
      </div>

      {/* Type Filter */}
      <div className="-mx-4 mb-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {[
          { id: "all", label: "All", icon: "🏘️" },
          { id: "car", label: "Cars", icon: "🚗" },
          { id: "land", label: "Lands", icon: "🏞️" },
          { id: "apartment", label: "Apartments", icon: "🏘️" },
          { id: "hostel", label: "Hostels", icon: "🏢" },
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id as any)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all sm:px-6 sm:py-3 sm:text-base ${
              selectedType === type.id
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card border border-border hover:bg-muted"
            }`}
          >
            <span className="text-lg sm:text-xl">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Price Range</h3>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="5000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
          className="w-full mb-3"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">${priceRange[0].toLocaleString()}</span>
          <span className="font-semibold">${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {filteredProperties.length} {filteredProperties.length === 1 ? "listing" : "listings"} found
        </p>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
          <Link
            key={property.id}
            to={`/property/${property.id}`}
            className="block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute left-4 top-4 rounded-lg px-3 py-1 text-sm font-bold capitalize text-white shadow-lg ${typeColors[property.type]}`}>
                {property.type}
              </div>
              <button
                onClick={(e) => e.preventDefault()}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Heart className="h-5 w-5 hover:text-destructive hover:fill-destructive transition-colors" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <h3 className="mb-2 line-clamp-1 break-words text-lg font-bold sm:text-xl">{property.name}</h3>

              {/* Location */}
              <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="min-w-0 break-words">{property.location}</span>
              </div>

              {/* Features */}
              <div className="mb-4 flex flex-wrap gap-2">
                {property.type === "apartment" || property.type === "hostel" ? (
                  <>
                    {property.bedrooms && (
                      <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1 text-sm">
                        <Bed className="h-4 w-4" />
                        {property.bedrooms} Bed
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1 text-sm">
                        <Bath className="h-4 w-4" />
                        {property.bathrooms} Bath
                      </div>
                    )}
                    {property.size && (
                      <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1 text-sm">
                        <Square className="h-4 w-4" />
                        {property.size}
                      </div>
                    )}
                  </>
                ) : property.type === "car" ? (
                  <>
                    {property.year && (
                      <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1 text-sm">
                        <Calendar className="h-4 w-4" />
                        {property.year}
                      </div>
                    )}
                    {property.mileage && (
                      <div className="rounded-lg bg-muted px-3 py-1 text-sm">
                        {property.mileage}
                      </div>
                    )}
                  </>
                ) : (
                  property.size && (
                    <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1 text-sm">
                      <Square className="h-4 w-4" />
                      {property.size}
                    </div>
                  )
                )}
              </div>

              {/* Additional Features */}
              <div className="mb-4 flex flex-wrap gap-2">
                {property.features.slice(0, 3).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-lg bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {feature}
                  </span>
                ))}
                {property.features.length > 3 && (
                  <span className="rounded-lg bg-muted px-2 py-1 text-xs text-muted-foreground">
                    +{property.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-xl font-bold text-primary sm:text-2xl">
                  ${property.price.toLocaleString()}
                </span>
                {property.priceUnit && (
                  <span className="text-sm text-muted-foreground">{property.priceUnit}</span>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Call seller");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-primary px-4 py-2 font-semibold text-primary transition-all hover:bg-primary/5"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Chat with seller");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Chat
                </button>
              </div>

              {/* Schedule Inspection */}
              {(property.type === "apartment" || property.type === "land" || property.type === "car") && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Schedule inspection");
                  }}
                  className="mt-3 w-full py-2 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  Schedule Inspection
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-16">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No listings found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters to see more results
          </p>
          <button
            onClick={() => {
              setSelectedType("all");
              setPriceRange([0, 500000]);
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
