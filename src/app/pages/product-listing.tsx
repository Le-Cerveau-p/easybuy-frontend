import { useState } from "react";
import { Grid3x3, List, SlidersHorizontal, ChevronDown, Heart, Star, X } from "lucide-react";
import { Link } from "react-router-dom";

export function ProductListingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const categories = ["Electronics", "Furniture", "Fashion", "Home Appliances"];
  const brands = ["Apple", "Samsung", "Sony", "LG", "Nike", "Adidas"];

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 2000) + 100,
    originalPrice: Math.floor(Math.random() * 3000) + 500,
    image: `https://images.unsplash.com/photo-${1500000000000 + i * 10000000}?w=400`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 2000) + 100,
    inStock: Math.random() > 0.2,
    bookingAvailable: Math.random() > 0.6,
    brand: brands[Math.floor(Math.random() * brands.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
  }));

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">${priceRange[0]}</span>
            <span className="font-semibold">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold mb-3">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="h-4 w-4 border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
                <span className="text-sm ml-1">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="font-semibold mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-sm">Part Payment Available</span>
          </label>
        </div>
      </div>

      <button className="w-full py-2 border border-border rounded-xl hover:bg-muted transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 sm:pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">{products.length} items found</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filters Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2 transition-colors hover:bg-muted sm:w-auto"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-card p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>

        {/* Sort By */}
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ring sm:w-auto"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Filters</h2>
            </div>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setShowFilters(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className="flex-1">
          <div
            className={
              viewMode === "grid"
              ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {products.map((product) =>
              viewMode === "grid" ? (
                <ProductCard key={product.id} product={product} />
              ) : (
                <ProductListItem key={product.id} product={product} />
              )
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="px-4 py-2 border border-border rounded-xl hover:bg-muted transition-colors disabled:opacity-50">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-xl transition-colors ${
                  page === 1 ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 border border-border rounded-xl hover:bg-muted transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
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
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-semibold">
              Out of Stock
            </span>
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
          <span className="text-sm text-muted-foreground line-through">
            ${product.originalPrice}
          </span>
        </div>
        {product.bookingAvailable && (
          <div className="mt-2 px-3 py-1 bg-accent/10 border border-accent rounded-lg text-xs font-semibold text-accent inline-block">
            Booking Available
          </div>
        )}
      </div>
    </Link>
  );
}

function ProductListItem({ product }: { product: any }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col gap-4 rounded-2xl bg-card p-4 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl sm:flex-row"
    >
      <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-xl bg-muted sm:h-32 sm:w-32">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="mb-1 break-words font-semibold text-lg transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-semibold text-sm">{product.rating}</span>
            <span className="text-muted-foreground text-sm">({product.reviews})</span>
          </div>
          <p className="break-words text-sm text-muted-foreground">
            Brand: {product.brand} | Category: {product.category}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary sm:text-2xl">${product.price}</span>
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          </div>
          <button className="w-full rounded-xl bg-primary px-6 py-2 font-semibold text-primary-foreground transition-all hover:bg-primary/90 sm:w-auto">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
