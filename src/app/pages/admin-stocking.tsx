import { useState } from "react";
import { Upload, X, Save, Eye, Plus, Trash2 } from "lucide-react";

export function AdminStockingPage() {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    quantity: "",
    unitPrice: "",
    discountPrice: "",
    bookingAvailable: false,
    minBookingAmount: "",
    deliveryAvailable: true,
    featured: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);
  const [isDraft, setIsDraft] = useState(false);

  const isContactAdminCategory = ["Cars", "Lands", "Hostels", "Apartments"].includes(productData.category);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const updated = [...specifications];
    updated[index][field] = value;
    setSpecifications(updated);
  };

  const handleSubmit = (e: React.FormEvent, saveAsDraft: boolean = false) => {
    e.preventDefault();
    setIsDraft(saveAsDraft);
    console.log("Product data:", productData);
    console.log("Images:", images);
    console.log("Specifications:", specifications);
    console.log("Save as draft:", saveAsDraft);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
        <p className="text-muted-foreground">Add products to your inventory</p>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Enter product name"
                value={productData.name}
                onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <select
                id="category"
                required
                value={productData.category}
                onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Furniture">Furniture</option>
                <option value="Appliances">Appliances</option>
                <option value="Cars">Cars</option>
                <option value="Lands">Lands</option>
                <option value="Hostels">Hostels</option>
                <option value="Apartments">Apartments</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-semibold mb-2">
                Brand
              </label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand name"
                value={productData.brand}
                onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
                Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                required
                min="0"
                placeholder="Enter quantity"
                value={productData.quantity}
                onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold mb-2">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                placeholder="Enter product description"
                value={productData.description}
                onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Product Images</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-full h-32 object-cover rounded-xl border border-border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-xl hover:border-primary transition-all cursor-pointer">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Click to upload images</span>
            <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Pricing */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Pricing & Availability</h2>

          {isContactAdminCategory && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-sm text-primary font-semibold">
                This category uses "Contact Admin" listing. Normal checkout and booking will be disabled.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="unitPrice" className="block text-sm font-semibold mb-2">
                Unit Price (₦) *
              </label>
              <input
                id="unitPrice"
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="Enter unit price"
                value={productData.unitPrice}
                onChange={(e) => setProductData({ ...productData, unitPrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="discountPrice" className="block text-sm font-semibold mb-2">
                Discount Price (₦)
              </label>
              <input
                id="discountPrice"
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter discount price"
                value={productData.discountPrice}
                onChange={(e) => setProductData({ ...productData, discountPrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {!isContactAdminCategory && (
              <>
                <div className="flex items-center gap-3">
                  <input
                    id="bookingAvailable"
                    type="checkbox"
                    checked={productData.bookingAvailable}
                    onChange={(e) =>
                      setProductData({ ...productData, bookingAvailable: e.target.checked })
                    }
                    className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label htmlFor="bookingAvailable" className="text-sm font-semibold">
                    Enable Part Payment / Booking
                  </label>
                </div>

                {productData.bookingAvailable && (
                  <div>
                    <label htmlFor="minBookingAmount" className="block text-sm font-semibold mb-2">
                      Minimum Booking Amount (₦) *
                    </label>
                    <input
                      id="minBookingAmount"
                      type="number"
                      required={productData.bookingAvailable}
                      min="0"
                      step="0.01"
                      placeholder="Enter minimum booking amount"
                      value={productData.minBookingAmount}
                      onChange={(e) =>
                        setProductData({ ...productData, minBookingAmount: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                )}
              </>
            )}

            <div className="flex items-center gap-3">
              <input
                id="deliveryAvailable"
                type="checkbox"
                checked={productData.deliveryAvailable}
                onChange={(e) =>
                  setProductData({ ...productData, deliveryAvailable: e.target.checked })
                }
                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <label htmlFor="deliveryAvailable" className="text-sm font-semibold">
                Delivery Available
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                id="featured"
                type="checkbox"
                checked={productData.featured}
                onChange={(e) => setProductData({ ...productData, featured: e.target.checked })}
                className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
              />
              <label htmlFor="featured" className="text-sm font-semibold">
                Featured Product
              </label>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Product Specifications</h2>
            <button
              type="button"
              onClick={addSpecification}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Specification
            </button>
          </div>

          <div className="space-y-4">
            {specifications.map((spec, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Specification name (e.g., RAM)"
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, "key", e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Value (e.g., 16GB)"
                    value={spec.value}
                    onChange={(e) => updateSpecification(index, "value", e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecification(index)}
                    className="p-2.5 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="w-full sm:w-auto px-8 py-3 bg-muted border border-border rounded-xl font-semibold hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
          >
            <Save className="h-5 w-5" />
            Save as Draft
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 bg-card border border-border rounded-xl font-semibold hover:bg-muted transition-all flex items-center justify-center gap-2"
          >
            <Eye className="h-5 w-5" />
            Preview Product
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Publish Product
          </button>
        </div>
      </form>
    </div>
  );
}
