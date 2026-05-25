import { useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Archive, Package, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  bookingAmount: number;
  availability: string;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1696446702183-cbd50dba28aa?w=100",
      name: "iPhone 15 Pro Max",
      category: "Electronics",
      sku: "IP-15PM-128",
      quantity: 45,
      unitPrice: 1299,
      bookingAmount: 400,
      availability: "Available",
      status: "in-stock",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100",
      name: "Samsung 65\" 4K Smart TV",
      category: "Electronics",
      sku: "SS-TV-65-4K",
      quantity: 12,
      unitPrice: 899,
      bookingAmount: 300,
      availability: "Available",
      status: "in-stock",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100",
      name: "Modern Leather Sofa",
      category: "Furniture",
      sku: "FR-SOF-LE-01",
      quantity: 5,
      unitPrice: 1599,
      bookingAmount: 500,
      availability: "Available",
      status: "low-stock",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100",
      name: "MacBook Pro M3",
      category: "Electronics",
      sku: "AP-MBP-M3-16",
      quantity: 28,
      unitPrice: 1999,
      bookingAmount: 600,
      availability: "Available",
      status: "in-stock",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100",
      name: "Sony WH-1000XM5 Headphones",
      category: "Electronics",
      sku: "SN-HP-XM5",
      quantity: 0,
      unitPrice: 329,
      bookingAmount: 100,
      availability: "Out of Stock",
      status: "out-of-stock",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=100",
      name: "Nike Air Max Sneakers",
      category: "Fashion",
      sku: "NK-AM-270",
      quantity: 67,
      unitPrice: 150,
      bookingAmount: 50,
      availability: "Available",
      status: "in-stock",
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96d5e1?w=100",
      name: "LG French Door Refrigerator",
      category: "Appliances",
      sku: "LG-FRG-730",
      quantity: 8,
      unitPrice: 2199,
      bookingAmount: 700,
      availability: "Available",
      status: "in-stock",
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=100",
      name: "Wooden Dining Table Set",
      category: "Furniture",
      sku: "FR-DT-WD-6S",
      quantity: 3,
      unitPrice: 899,
      bookingAmount: 300,
      availability: "Available",
      status: "low-stock",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock = stockFilter === "all" || product.status === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-success/10 text-success";
      case "low-stock":
        return "bg-warning/10 text-warning";
      case "out-of-stock":
        return "bg-destructive/10 text-destructive";
    }
  };

  const getStatusText = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Manage and track your product inventory</p>
        </div>
        <Link
          to="/admin/stocking"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Fashion">Fashion</option>
              <option value="Appliances">Appliances</option>
              <option value="Cars">Cars</option>
              <option value="Lands">Lands</option>
              <option value="Hostels">Hostels</option>
              <option value="Apartments">Apartments</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Stock Status Filter */}
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring appearance-none"
            >
              <option value="all">All Stock Levels</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
            </span>
            <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all">
              Bulk Edit
            </button>
            <button className="px-4 py-2 bg-warning/10 text-warning rounded-lg text-sm font-semibold hover:bg-warning/20 transition-all">
              Archive Selected
            </button>
            <button className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-semibold hover:bg-destructive/20 transition-all">
              Delete Selected
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Unit Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Booking</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-all">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-mono">{product.sku}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.quantity <= 5 ? "text-destructive" : ""}`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">${product.unitPrice}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">${product.bookingAmount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getStatusBadge(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Edit">
                        <Edit className="h-4 w-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Archive">
                        <Archive className="h-4 w-4 text-warning" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-all" title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              Previous
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">
              1
            </button>
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              2
            </button>
            <button className="px-4 py-2 bg-muted rounded-lg text-sm font-semibold hover:bg-muted/80 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
