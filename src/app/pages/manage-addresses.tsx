import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, MapPin, Edit, Trash2, Home, Briefcase, X } from "lucide-react";

interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export function ManageAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      name: "John Doe",
      phone: "+234 801 234 5678",
      address: "123 Main Street",
      city: "Lagos",
      state: "Lagos State",
      zipCode: "100001",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      name: "John Doe",
      phone: "+234 801 234 5678",
      address: "456 Business Ave",
      city: "Victoria Island",
      state: "Lagos",
      zipCode: "100001",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    label: "",
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      label: address.label,
      name: address.name,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const setAsDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId ? { ...formData, id: addr.id } : addr
        )
      );
    } else {
      const newAddress: Address = {
        ...formData,
        id: Math.max(...addresses.map((a) => a.id), 0) + 1,
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({
      label: "",
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    });
  };

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "office":
        return <Briefcase className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
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
            <h1 className="text-3xl font-bold">Manage Addresses</h1>
            <p className="text-muted-foreground">{addresses.length} saved addresses</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              label: "",
              name: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              isDefault: false,
            });
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add New
        </button>
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Address Label</label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., Home, Office, etc."
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
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
                <span className="font-semibold">Set as default address</span>
              </label>

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
                  {editingId ? "Update Address" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {getLabelIcon(address.label)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{address.label}</h3>
                    {address.isDefault && (
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-semibold">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{address.name}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5 text-primary" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-sm">{address.address}</p>
              <p className="text-sm">
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p className="text-sm text-muted-foreground">{address.phone}</p>
            </div>

            {!address.isDefault && (
              <button
                onClick={() => setAsDefault(address.id)}
                className="text-sm text-primary hover:text-primary/80 font-semibold"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
