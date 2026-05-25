import { Link } from "react-router-dom";

export function CategoriesPage() {
  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      count: "2,543",
      color: "from-blue-500 to-blue-600",
      subcategories: ["Smartphones", "Laptops", "Tablets", "Cameras", "Audio"],
    },
    {
      name: "Furniture",
      icon: "🛋️",
      count: "1,823",
      color: "from-amber-500 to-amber-600",
      subcategories: ["Living Room", "Bedroom", "Office", "Outdoor", "Dining"],
    },
    {
      name: "Fashion",
      icon: "👔",
      count: "3,234",
      color: "from-pink-500 to-pink-600",
      subcategories: ["Men's Wear", "Women's Wear", "Shoes", "Accessories", "Bags"],
    },
    {
      name: "Home Appliances",
      icon: "🏠",
      count: "945",
      color: "from-green-500 to-green-600",
      subcategories: ["Kitchen", "Laundry", "Cleaning", "Climate Control", "Lighting"],
    },
    {
      name: "Cars",
      icon: "🚗",
      count: "456",
      color: "from-red-500 to-red-600",
      subcategories: ["Sedans", "SUVs", "Trucks", "Luxury", "Electric"],
    },
    {
      name: "Lands",
      icon: "🏞️",
      count: "324",
      color: "from-emerald-500 to-emerald-600",
      subcategories: ["Residential", "Commercial", "Agricultural", "Industrial", "Mixed-Use"],
    },
    {
      name: "Hostels",
      icon: "🏢",
      count: "187",
      color: "from-purple-500 to-purple-600",
      subcategories: ["Student Housing", "Co-living", "Budget", "Premium", "Long-term"],
    },
    {
      name: "Apartments",
      icon: "🏘️",
      count: "542",
      color: "from-orange-500 to-orange-600",
      subcategories: ["Studio", "1 Bedroom", "2 Bedroom", "3+ Bedroom", "Penthouse"],
    },
    {
      name: "Sports & Fitness",
      icon: "⚽",
      count: "1,234",
      color: "from-cyan-500 to-cyan-600",
      subcategories: ["Equipment", "Apparel", "Supplements", "Accessories", "Outdoor"],
    },
    {
      name: "Books & Media",
      icon: "📚",
      count: "2,156",
      color: "from-indigo-500 to-indigo-600",
      subcategories: ["Books", "Movies", "Music", "Games", "E-books"],
    },
    {
      name: "Beauty & Health",
      icon: "💄",
      count: "1,687",
      color: "from-rose-500 to-rose-600",
      subcategories: ["Skincare", "Makeup", "Haircare", "Fragrance", "Wellness"],
    },
    {
      name: "Toys & Kids",
      icon: "🧸",
      count: "892",
      color: "from-yellow-500 to-yellow-600",
      subcategories: ["Toys", "Baby Gear", "Kids Clothing", "Education", "Safety"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Categories</h1>
        <p className="text-muted-foreground">Browse products by category</p>
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${category.name.toLowerCase()}`}
            className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            {/* Icon */}
            <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-4xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              {category.icon}
            </div>

            {/* Category Info */}
            <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{category.count} products</p>

            {/* Subcategories */}
            <div className="space-y-2">
              {category.subcategories.slice(0, 3).map((sub) => (
                <div
                  key={sub}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <span className="h-1 w-1 bg-primary rounded-full" />
                  {sub}
                </div>
              ))}
              {category.subcategories.length > 3 && (
                <div className="text-sm text-primary font-semibold">
                  +{category.subcategories.length - 3} more
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Electronics Banner */}
          <Link
            to="/category/electronics"
            className="relative h-64 rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800"
              alt="Electronics"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Latest Electronics</h3>
              <p className="text-white/90 mb-4">Discover cutting-edge tech at amazing prices</p>
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Furniture Banner */}
          <Link
            to="/category/furniture"
            className="relative h-64 rounded-2xl overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
              alt="Furniture"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Premium Furniture</h3>
              <p className="text-white/90 mb-4">Transform your space with elegant designs</p>
              <span className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
                Explore
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
