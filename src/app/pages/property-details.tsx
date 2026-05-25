import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MapPin, Calendar, Phone, MessageCircle, Share2, ChevronLeft, ChevronRight, Bed, Bath, Square, Gauge, Fuel, Users } from "lucide-react";

export function PropertyDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data - in real app this would come from API based on id
  const getPropertyData = (propertyId: string | undefined) => {
    const properties: Record<string, any> = {
      "1": {
        type: "car",
        name: "Mercedes-Benz C-Class 2023",
        price: 45000,
        location: "Lagos, Nigeria",
        images: [
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200",
          "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200",
          "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=1200",
          "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200",
        ],
        description: "Luxury sedan in pristine condition. This Mercedes-Benz C-Class combines elegance with performance. Features premium leather interior, advanced safety systems, and cutting-edge technology. Perfect for those who demand excellence in every drive.",
        specs: {
          year: "2023",
          mileage: "22,000 km",
          transmission: "Automatic",
          fuelType: "Petrol",
          engineSize: "2.0L Turbo",
          color: "Black",
          condition: "Excellent",
          owners: "Single Owner",
        },
        features: [
          "Premium Leather Seats", "Panoramic Sunroof", "Navigation System", "Parking Sensors",
          "Bluetooth Connectivity", "Cruise Control", "Heated Seats", "Backup Camera",
          "Premium Sound System", "Keyless Entry", "LED Headlights", "Climate Control",
        ],
        seller: { name: "Premium Auto Sales", rating: 4.8, reviews: 156, verified: true, memberSince: "2020" },
      },
      "2": {
        type: "land",
        name: "Prime Commercial Plot",
        price: 250000,
        location: "Abuja, Nigeria",
        images: [
          "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
          "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200",
          "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1200",
        ],
        description: "Prime commercial land in the heart of Abuja's business district. This 5000 sqm plot offers excellent visibility and accessibility. Perfect for commercial development, office buildings, or mixed-use projects.",
        specs: {
          size: "5,000 sqm", zoning: "Commercial", titleDocument: "Certificate of Occupancy",
          access: "Tarred Road", electricity: "Available", water: "Borehole",
          fencing: "Fully Fenced", corner: "Corner Piece",
        },
        features: [
          "Prime Location", "High Visibility", "Corner Plot", "Fully Fenced",
          "C of O Available", "Tarred Road Access", "Electricity Available", "Good Drainage System",
        ],
        seller: { name: "Prime Properties Ltd", rating: 4.9, reviews: 89, verified: true, memberSince: "2018" },
      },
      "3": {
        type: "apartment",
        name: "Luxury 3BR Apartment",
        price: 2500,
        priceUnit: "/month",
        location: "Victoria Island, Lagos",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
        ],
        description: "Stunning 3-bedroom apartment in the prestigious Victoria Island area. Modern finishes, spacious rooms, and premium amenities. Perfect for families or professionals seeking luxury living.",
        specs: {
          bedrooms: "3", bathrooms: "2", size: "180 sqm", floor: "5th Floor",
          furnished: "Fully Furnished", parking: "2 Spaces", yearBuilt: "2022", condition: "Brand New",
        },
        features: [
          "Swimming Pool", "Gym & Fitness Center", "24/7 Security", "Generator Backup",
          "Children's Play Area", "Ample Parking", "Modern Kitchen", "Balcony with View",
          "High-Speed Internet", "Smart Home System",
        ],
        seller: { name: "Luxury Rentals", rating: 4.7, reviews: 234, verified: true, memberSince: "2019" },
      },
      "9": {
        type: "car",
        name: "Mercedes-Benz C-Class 2023",
        price: 45000,
        location: "Lagos, Nigeria",
        images: [
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200",
          "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200",
        ],
        description: "Luxury sedan in pristine condition.",
        specs: { year: "2023", mileage: "22,000 km", transmission: "Automatic", fuelType: "Petrol" },
        features: ["Leather Seats", "Navigation", "Parking Sensors"],
        seller: { name: "Premium Auto Sales", rating: 4.8, reviews: 156, verified: true, memberSince: "2020" },
      },
      "10": {
        type: "land",
        name: "Prime Commercial Plot",
        price: 250000,
        location: "Abuja, Nigeria",
        images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"],
        description: "Prime commercial land in Abuja's business district.",
        specs: { size: "5,000 sqm", zoning: "Commercial" },
        features: ["Prime Location", "Fenced", "C of O"],
        seller: { name: "Prime Properties", rating: 4.9, reviews: 89, verified: true, memberSince: "2018" },
      },
      "11": {
        type: "apartment",
        name: "Luxury 3BR Apartment",
        price: 2500,
        priceUnit: "/month",
        location: "Victoria Island, Lagos",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200"],
        description: "Luxury apartment in Victoria Island.",
        specs: { bedrooms: "3", bathrooms: "2", size: "180 sqm" },
        features: ["Pool", "Gym", "Security"],
        seller: { name: "Luxury Rentals", rating: 4.7, reviews: 234, verified: true, memberSince: "2019" },
      },
    };
    return properties[propertyId || "1"] || properties["1"];
  };

  const property = getPropertyData(id);

  const similarProperties = [
    { id: 2, name: "BMW 5 Series 2022", price: 42000, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400", location: "Lagos, Nigeria" },
    { id: 3, name: "Audi A4 2023", price: 38000, image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400", location: "Abuja, Nigeria" },
    { id: 4, name: "Lexus ES 350 2022", price: 40000, image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=400", location: "Port Harcourt, Nigeria" },
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/properties" className="hover:text-foreground">Properties & Vehicles</Link>
        <span>/</span>
        <span className="text-foreground capitalize">{property.type}s</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-4">
            <img src={property.images[selectedImage]} alt={property.name} className="w-full h-full object-cover" />
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                <Heart className="h-6 w-6 hover:text-destructive hover:fill-destructive transition-colors" />
              </button>
              <button className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {property.images.map((image: string, index: number) => (
              <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent"}`}>
                <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg font-semibold text-sm capitalize">{property.type}</span>
              {property.seller.verified && <span className="px-3 py-1 bg-success/10 text-success rounded-lg font-semibold text-sm">Verified Seller</span>}
            </div>
            <h1 className="text-3xl font-bold mb-3">{property.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-5 w-5" />
              <span>{property.location}</span>
            </div>
            <div className="text-4xl font-bold text-primary mb-2">${property.price.toLocaleString()}{property.priceUnit || ""}</div>
            <p className="text-sm text-muted-foreground">Negotiable</p>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-4">
            {property.type === "car" && (
              <>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Year</div><div className="font-semibold">{property.specs.year}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Gauge className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Mileage</div><div className="font-semibold">{property.specs.mileage}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Fuel className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Fuel</div><div className="font-semibold">{property.specs.fuelType}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Users className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Owners</div><div className="font-semibold">{property.specs.owners}</div></div>
                </div>
              </>
            )}
            {property.type === "apartment" && (
              <>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Bed className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Bedrooms</div><div className="font-semibold">{property.specs.bedrooms}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Bath className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Bathrooms</div><div className="font-semibold">{property.specs.bathrooms}</div></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                  <Square className="h-6 w-6 text-primary" />
                  <div><div className="text-sm text-muted-foreground">Size</div><div className="font-semibold">{property.specs.size}</div></div>
                </div>
              </>
            )}
            {property.type === "land" && (
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl col-span-2">
                <Square className="h-6 w-6 text-primary" />
                <div><div className="text-sm text-muted-foreground">Size</div><div className="font-semibold">{property.specs.size}</div></div>
              </div>
            )}
          </div>

          {/* Contact Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-6 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary/5 transition-all">
              <Phone className="h-5 w-5" />Call Seller
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg">
              <MessageCircle className="h-5 w-5" />Send Message
            </button>
          </div>

          <button className="w-full py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-all">Schedule Inspection</button>

          {/* Seller Info */}
          <div className="p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">{property.seller.name[0]}</div>
              <div>
                <h3 className="font-semibold">{property.seller.name}</h3>
                <p className="text-sm text-muted-foreground">Member since {property.seller.memberSince} • {property.seller.reviews} reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="mb-12">
        <div className="prose prose-lg max-w-none mb-8"><p className="text-muted-foreground">{property.description}</p></div>

        {/* Specifications */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-xl mb-4">Specifications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(property.specs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-xl">
                <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-semibold">{value as string}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-4">Features & Equipment</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-xl">
                <span className="h-2 w-2 bg-primary rounded-full"></span><span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Similar Listings</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProperties.map((item) => (
            <Link key={item.id} to={`/property/${item.id}`} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" /><span>{item.location}</span>
                </div>
                <span className="text-xl font-bold text-primary">${item.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
