"use client";

import { useState } from "react";
import Link from "next/link";

const filters = {
  categories: ["All", "Oxygen Support", "Mobility Aids", "Patient Monitoring", "Hospital Beds", "Ventilators", "Diagnostics"],
  availability: ["All", "Available Now", "Rent", "Buy"],
  sort: ["Relevance", "Price: Low to High", "Price: High to Low", "Fastest Delivery"],
};

const products = [
  {
    id: 1,
    name: "Philips Oxygen Concentrator 5L",
    category: "Oxygen Support",
    image: "🫁",
    rating: 4.9,
    reviews: 328,
    rentPrice: 499,
    buyPrice: 32000,
    deliveryTime: "18 min",
    badge: "Emergency",
    badgeColor: "bg-red-100 text-[#e21116]",
    available: true,
  },
  {
    id: 2,
    name: "Drive Medical Wheelchair Foldable",
    category: "Mobility Aids",
    image: "♿",
    rating: 4.7,
    reviews: 214,
    rentPrice: 299,
    buyPrice: 15000,
    deliveryTime: "25 min",
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-700",
    available: true,
  },
  {
    id: 3,
    name: "Resmed AirSense BiPAP Machine",
    category: "Ventilators",
    image: "🌬️",
    rating: 4.8,
    reviews: 156,
    rentPrice: 799,
    buyPrice: 85000,
    deliveryTime: "22 min",
    badge: "Top Rated",
    badgeColor: "bg-yellow-100 text-yellow-700",
    available: true,
  },
  {
    id: 4,
    name: "ICU Hospital Bed with Side Rails",
    category: "Hospital Beds",
    image: "🛏️",
    rating: 4.6,
    reviews: 89,
    rentPrice: 650,
    buyPrice: 55000,
    deliveryTime: "35 min",
    badge: "Setup Included",
    badgeColor: "bg-green-100 text-green-700",
    available: true,
  },
  {
    id: 5,
    name: "AccuCheck Glucometer Kit",
    category: "Diagnostics",
    image: "🔬",
    rating: 4.8,
    reviews: 402,
    rentPrice: 99,
    buyPrice: 1800,
    deliveryTime: "15 min",
    badge: "Best Seller",
    badgeColor: "bg-purple-100 text-purple-700",
    available: true,
  },
  {
    id: 6,
    name: "Nellcor Pulse Oximeter Pro",
    category: "Patient Monitoring",
    image: "💊",
    rating: 4.9,
    reviews: 512,
    rentPrice: 149,
    buyPrice: 4500,
    deliveryTime: "12 min",
    badge: "Emergency",
    badgeColor: "bg-red-100 text-[#e21116]",
    available: true,
  },
  {
    id: 7,
    name: "Omron BP Monitor HEM-7120",
    category: "Patient Monitoring",
    image: "💊",
    rating: 4.7,
    reviews: 639,
    rentPrice: 129,
    buyPrice: 3200,
    deliveryTime: "20 min",
    badge: "Popular",
    badgeColor: "bg-blue-100 text-blue-700",
    available: true,
  },
  {
    id: 8,
    name: "Yuwell Oxygen Concentrator 10L",
    category: "Oxygen Support",
    image: "🫁",
    rating: 4.8,
    reviews: 187,
    rentPrice: 699,
    buyPrice: 58000,
    deliveryTime: "20 min",
    badge: "High Flow",
    badgeColor: "bg-orange-100 text-orange-700",
    available: false,
  },
  {
    id: 9,
    name: "Rollator Walker with Seat",
    category: "Mobility Aids",
    image: "♿",
    rating: 4.6,
    reviews: 143,
    rentPrice: 199,
    buyPrice: 8500,
    deliveryTime: "28 min",
    badge: "Senior Care",
    badgeColor: "bg-teal-100 text-teal-700",
    available: true,
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedAvailability === "Available Now" && !p.available) return false;
    return true;
  });

  const addToCart = (id: number) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold mb-2">Medical Equipment</h1>
          <p className="text-white/80">500+ certified devices • Delivered in under 30 minutes</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Equipment</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-gray-600 text-sm">{filteredProducts.length} items found</p>
          <button
            id="mobile-filter-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            id="products-sidebar"
            className={`shrink-0 w-72 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24 ${
              sidebarOpen ? "block" : "hidden lg:block"
            }`}
          >
            <h2 className="font-bold text-gray-900 text-lg mb-6">Filters</h2>

            {/* Category */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
              <div className="space-y-2">
                {filters.categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#e21116] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Availability</h3>
              <div className="space-y-2">
                {filters.availability.map((avail) => (
                  <button
                    key={avail}
                    id={`filter-avail-${avail.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setSelectedAvailability(avail)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      selectedAvailability === avail
                        ? "bg-[#e21116] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {avail}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Rent Price / Day</h3>
              <input
                id="filter-price-range"
                type="range"
                min={99}
                max={999}
                defaultValue={999}
                className="w-full accent-[#e21116]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹99</span>
                <span>₹999</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort By</h3>
              <select
                id="filter-sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e21116]"
              >
                {filters.sort.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Reset */}
            <button
              id="filter-reset"
              onClick={() => { setSelectedCategory("All"); setSelectedAvailability("All"); setSelectedSort("Relevance"); }}
              className="w-full mt-6 py-2.5 border-2 border-[#e21116] text-[#e21116] font-semibold rounded-xl text-sm hover:bg-red-50 transition-colors"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm hidden lg:block">
                Showing <strong>{filteredProducts.length}</strong> results
              </p>
              {cart.length > 0 && (
                <Link
                  href="/tracking"
                  id="view-cart-btn"
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#e21116] text-white text-sm font-bold rounded-xl shadow hover:bg-[#b50d11] transition-colors"
                >
                  🛒 View Cart ({cart.length})
                </Link>
              )}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Icon area */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-40 flex items-center justify-center text-6xl relative">
                    {product.image}
                    <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                    {!product.available && (
                      <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                        <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <p className="text-xs text-[#e21116] font-semibold uppercase tracking-wider mb-1">{product.category}</p>
                    <h3 className="font-bold text-gray-900 mb-2 leading-tight">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{product.rating} ({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      ETA: {product.deliveryTime}
                    </div>

                    {/* Pricing */}
                    <div className="flex gap-3 mb-4">
                      <div className="flex-1 bg-red-50 rounded-2xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Rent/Day</p>
                        <p className="text-lg font-extrabold text-[#e21116]">₹{product.rentPrice}</p>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
                        <p className="text-xs text-gray-500 mb-0.5">Buy</p>
                        <p className="text-lg font-extrabold text-gray-900">₹{(product.buyPrice / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        id={`rent-btn-${product.id}`}
                        disabled={!product.available}
                        onClick={() => addToCart(product.id)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                          cart.includes(product.id)
                            ? "bg-green-500 text-white"
                            : product.available
                            ? "bg-[#e21116] text-white hover:bg-[#b50d11] active:scale-95"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {cart.includes(product.id) ? "✓ Added" : "Rent Now"}
                      </button>
                      <button
                        id={`buy-btn-${product.id}`}
                        disabled={!product.available}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                          product.available
                            ? "border-[#e21116] text-[#e21116] hover:bg-red-50 active:scale-95"
                            : "border-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No equipment found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
