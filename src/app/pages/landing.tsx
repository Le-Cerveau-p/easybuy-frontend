import { Link } from "react-router-dom";
import {
  Search,
  Home as HomeIcon,
  ShoppingBag,
  Truck,
  MapPin,
  MessageSquare,
  Bed,
  Phone,
  Mail,
  MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import { isAdminSession } from "../lib/auth";

export function LandingPage() {
  const [activeTab, setActiveTab] = useState("buy");
  const storeLink = isAdminSession() ? "/admin/dashboard" : "/store";

  const services = [
    {
      icon: HomeIcon,
      title: "Buy",
      description: "Find quality properties that fit your needs.",
    },
    {
      icon: ShoppingBag,
      title: "Sell",
      description: "List your properties and we help you sell.",
    },
    {
      icon: Truck,
      title: "Deliver",
      description: "We help you deliver properties to you.",
    },
    {
      icon: MapPin,
      title: "Land Sales",
      description: "Residential, commercial, and agricultural lands.",
    },
    {
      icon: MessageSquare,
      title: "Consulting",
      description: "Expert guidance for smart property decisions.",
    },
    {
      icon: Bed,
      title: "Shortlets",
      description: "Comfortable and affordable shortlet apartments.",
    },
  ];

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      badge: "FOR SALE",
      title: "4 Bedroom Duplex",
      location: "Victoria Island, Lagos",
      price: "₦120,000,000",
      beds: "4",
      baths: "4 Baths",
      garage: "1 Garage",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      badge: "FOR SALE",
      title: "3 Bedroom Apartment",
      location: "Victoria Island, Lagos",
      price: "₦85,000,000",
      beds: "3",
      baths: "3 Baths",
      garage: "1 Garage",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      badge: "FOR SALE",
      title: "500sqm Land",
      location: "Lekki, Lagos",
      price: "₦25,000,000",
      size: "500 sqm",
      type: "Dry Land",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      badge: "FOR RENT",
      title: "2 Bedroom Shortlet",
      location: "Lekki Phase 1",
      price: "₦150,000 / Night",
      beds: "2",
      baths: "2 Baths",
      wifi: "Wi-Fi",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-black p-1 shadow-sm">
                <img
                  src="/eazylogo.jpg"
                  alt="Eazybuy"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Eazybuy</span>
                <span className="text-[10px] text-white/70">Properties</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              <Link
                to="/"
                className="text-sm font-medium text-white/80 transition-colors hover:text-primary"
              >
                HOME
              </Link>
              <a
                href="#services"
                className="text-sm font-medium text-white/80 transition-colors hover:text-primary"
              >
                SERVICES
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-white/80 transition-colors hover:text-primary"
              >
                CONTACT
              </a>
              <Link
                to={storeLink}
                className="text-sm font-medium text-white/80 transition-colors hover:text-primary"
              >
                STORE
              </Link>
            </nav>

            <div className="hidden items-center gap-2 text-white lg:flex">
              <Phone className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <div className="text-xs text-white/60">Call Us Anytime</div>
                <div className="font-semibold">+234 801 234 5678</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex h-[560px] items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl pb-32 md:pb-40">
            <h1 className="mb-4 text-5xl font-bold md:text-6xl">
              <span className="text-white">Eazybuy</span>
              <br />
              <span className="text-primary">Properties</span>
            </h1>
            <p className="mb-6 text-2xl text-white">Find. Buy. Own.</p>
            <p className="mb-8 text-lg text-white/90">
              We help you find, buy, sell and own the best properties with ease.
              You choose, we deliver.
            </p>

            <div className="mb-10 lg:mb-0  grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
                  <HomeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-white">Buy</div>
                  <div className="text-xs text-white/60">
                    Quality properties that fit your needs.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-white">Sell</div>
                  <div className="text-xs text-white/60">
                    We help you get the best value.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-white">Deliver</div>
                  <div className="text-xs text-white/60">
                    We handle everything and deliver to you.
                  </div>
                </div>
              </div>
            </div>

            <div
              id="mini-search"
              className="absolute left-1/2 bottom-0 w-[calc(100%-3rem)] max-w-5xl -translate-x-1/2 translate-y-1/2 rounded-2xl bg-card p-6 shadow-2xl"
            >
              <div className="mb-4 flex gap-2">
                {["Buy", "Rent", "Land", "Commercial"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`rounded-lg px-6 py-2 font-semibold transition-all ${
                      activeTab === tab.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full rounded-lg bg-muted py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select className="rounded-lg bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Property Type</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Land</option>
                </select>
                <select className="rounded-lg bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Price Range</option>
                  <option>Under ₦50M</option>
                  <option>₦50M - ₦100M</option>
                  <option>Above ₦100M</option>
                </select>
                <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90">
                  <Search className="h-5 w-5" />
                  Search Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="services" className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="mb-2 font-semibold text-primary">
                OUR SERVICES
              </div>
              <h2 className="text-4xl font-bold text-foreground">What We Do</h2>
            </div>
            <Link
              to="/properties"
              className="hidden items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground md:flex"
            >
              View All Services →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-black py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-2 font-semibold text-primary/90">
                FEATURED PROPERTIES
              </div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Explore Our Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="hidden items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 md:flex"
            >
              View All Properties →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="overflow-hidden rounded-2xl bg-card shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="relative h-40">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {property.badge}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-base font-bold text-foreground md:text-lg">
                    {property.title}
                  </h3>
                  <div className="mb-2.5 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                  <div className="mb-3 text-xl font-bold text-primary md:text-2xl">
                    {property.price}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 border-t border-border pt-2.5 text-sm text-muted-foreground">
                    {property.beds && <span>🛏️ {property.beds}</span>}
                    {property.baths && <span>🚿 {property.baths}</span>}
                    {property.garage && <span>🚗 {property.garage}</span>}
                    {property.size && <span>📐 {property.size}</span>}
                    {property.wifi && <span>📶 {property.wifi}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-2 font-semibold text-primary">
                WHY CHOOSE US
              </div>
              <h2 className="mb-6 text-4xl font-bold text-foreground">
                Why Clients Choose Eazybuy Properties
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">
                    Trusted and verified properties
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">Transparent process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">
                    Excellent customer service
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-3 w-3 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground">
                    We buy, sell and deliver with ease
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-2 text-4xl font-bold text-foreground">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Happy Clients And Growing
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="mb-2 text-4xl font-bold text-foreground">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Secure & Transparent
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground">
              <h3 className="mb-4 text-3xl font-bold">
                Ready to Buy, Sell or Get Your Property Delivered?
              </h3>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-background px-8 py-4 font-semibold text-foreground transition-all hover:bg-background/90"
              >
                Contact Us Today →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="border-t border-white/10 bg-black py-12 text-white"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white p-1 shadow-sm">
                  <img
                    src="/eazylogo.jpg"
                    alt="Eazybuy"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white">Eazybuy</span>
                  <span className="text-xs text-white/60">Properties</span>
                </div>
              </div>
              <p className="mb-4 text-sm text-white/70">
                We make property acquisition simple, transparent and
                stress-free. You choose, we deliver and you own.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-bold text-white">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Home
                </Link>
                <Link
                  to="/properties"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Properties
                </Link>
                <a
                  href="#services"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 font-bold text-white">Services</h3>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Buy
                </a>
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Sell
                </a>
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Deliver
                </a>
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Land Sales
                </a>
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Consulting
                </a>
                <a
                  href="#"
                  className="block text-sm text-white/70 transition-colors hover:text-primary"
                >
                  Shortlets
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-bold text-white">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+234 801 234 5678</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>info@eazybuyproperties.com</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-white/70">
                  <MapPinIcon className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                  <span>2, Adebisi Oduniyi Street, Victoria Island, Lagos</span>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Facebook"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Instagram"
                >
                  <span className="text-xs font-bold">ig</span>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="Twitter"
                >
                  <span className="text-xs font-bold">x</span>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white transition-all hover:bg-primary hover:text-primary-foreground"
                  aria-label="YouTube"
                >
                  <span className="text-xs font-bold">yt</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
            <p className="text-sm text-white/60">
              © 2026 Eazybuy Properties. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-primary"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-white/60 transition-colors hover:text-primary"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
