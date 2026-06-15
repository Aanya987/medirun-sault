"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, Product } from "@/lib/supabase";
import OrderModal from "@/components/OrderModal";

const CATEGORY_FILTERS = [
  "All",
  "wheelchair",
  "oxygen",
  "monitor",
  "mobility",
  "diagnostic",
  "other",
];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  wheelchair: "Wheelchairs",
  oxygen: "Oxygen Support",
  monitor: "Patient Monitoring",
  mobility: "Mobility Aids",
  diagnostic: "Diagnostics",
  other: "Other",
};

const CATEGORY_EMOJI: Record<string, string> = {
  wheelchair: "♿",
  oxygen: "🫁",
  monitor: "💊",
  mobility: "🚶",
  diagnostic: "🔬",
  other: "🏥",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAvailability, setSelectedAvailability] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orderModal, setOrderModal] = useState<{
    product: Product;
    type: "rent" | "buy";
  } | null>(null);

  // ── Fetch products from Supabase ──────────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // Show warning but still load fallback products so page is never blank
        setDbError(error.message);
        setProducts(FALLBACK_PRODUCTS);
      } else if (data && data.length > 0) {
        setProducts(data as Product[]);
      } else {
        // Supabase returned empty — use fallback static data so UI is never blank
        setProducts(FALLBACK_PRODUCTS);
      }
      setLoadingProducts(false);
    };
    fetchProducts();
  }, []);

  // ── Filter & sort ─────────────────────────────────────────────────────
  const filtered = products
    .filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedAvailability === "Available Now" && !p.is_available) return false;
      if (selectedAvailability === "Rent" && !p.price_rent_daily) return false;
      if (selectedAvailability === "Buy" && !p.price_buy) return false;
      return true;
    })
    .sort((a, b) => {
      if (selectedSort === "Price: Low to High") return (a.price_rent_daily ?? 0) - (b.price_rent_daily ?? 0);
      if (selectedSort === "Price: High to Low") return (b.price_rent_daily ?? 0) - (a.price_rent_daily ?? 0);
      return 0;
    });

  return (
    <>
      {/* ── Order Modal ── */}
      {orderModal && (
        <OrderModal
          product={orderModal.product}
          orderType={orderModal.type}
          onClose={() => setOrderModal(null)}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        {/* Page header */}
        <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold mb-2">Medical Equipment</h1>
            <p className="text-white/80">
              {loadingProducts ? "Loading..." : `${products.length}+ certified devices`} • Delivered in under 30 minutes
            </p>
            <div className="flex items-center gap-4 mt-4 text-sm text-white/70">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white font-medium">Equipment</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile filter toggle */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <p className="text-gray-600 text-sm">{filtered.length} items found</p>
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
            {/* ── Sidebar ── */}
            <aside
              id="products-sidebar"
              className={`shrink-0 w-64 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24 ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <h2 className="font-bold text-gray-900 text-lg mb-6">Filters</h2>

              {/* Category */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
                <div className="space-y-1">
                  {CATEGORY_FILTERS.map((cat) => (
                    <button
                      key={cat}
                      id={`filter-cat-${cat.toLowerCase()}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#e21116] text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat !== "All" ? `${CATEGORY_EMOJI[cat] ?? "🏥"} ` : ""}{CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Availability</h3>
                <div className="space-y-1">
                  {["All", "Available Now", "Rent", "Buy"].map((avail) => (
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

              {/* Sort */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sort By</h3>
                <select
                  id="filter-sort"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e21116]"
                >
                  {["Relevance", "Price: Low to High", "Price: High to Low"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <button
                id="filter-reset"
                onClick={() => { setSelectedCategory("All"); setSelectedAvailability("All"); setSelectedSort("Relevance"); }}
                className="w-full py-2.5 border-2 border-[#e21116] text-[#e21116] font-semibold rounded-xl text-sm hover:bg-red-50 transition-colors"
              >
                Reset Filters
              </button>
            </aside>

            {/* ── Product Grid ── */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 text-sm hidden lg:block">
                  Showing <strong>{filtered.length}</strong> result{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Loading skeleton */}
              {loadingProducts && (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-gray-100 overflow-hidden animate-pulse">
                      <div className="h-40 bg-gray-100" />
                      <div className="p-5 space-y-3">
                        <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                        <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                        <div className="flex gap-3">
                          <div className="flex-1 h-12 bg-gray-100 rounded-2xl" />
                          <div className="flex-1 h-12 bg-gray-100 rounded-2xl" />
                        </div>
                        <div className="flex gap-2">
                          <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
                          <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DB error banner */}
              {dbError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                  <p className="text-sm text-yellow-800 font-medium">
                    ⚠️ Could not connect to database — showing sample products. ({dbError})
                  </p>
                </div>
              )}

              {/* Product cards */}
              {!loadingProducts && (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onRent={() => setOrderModal({ product, type: "rent" })}
                      onBuy={() => setOrderModal({ product, type: "buy" })}
                    />
                  ))}
                </div>
              )}

              {!loadingProducts && filtered.length === 0 && (
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
    </>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onRent,
  onBuy,
}: {
  product: Product;
  onRent: () => void;
  onBuy: () => void;
}) {
  const emoji = CATEGORY_EMOJI[product.category] ?? "🏥";

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {/* Image / icon area */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-40 flex items-center justify-center text-6xl relative shrink-0">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <span>{emoji}</span>
        )}
        <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-[#e21116]">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
        {!product.is_available && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#e21116] font-semibold uppercase tracking-wider mb-1">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </p>
        <h3 className="font-bold text-gray-900 mb-3 leading-tight flex-1">{product.name}</h3>

        {product.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
          {product.is_available
            ? `${product.stock_quantity} in stock • ETA ~30 min`
            : "Currently unavailable"}
        </div>

        {/* Pricing */}
        <div className="flex gap-3 mb-4">
          {product.price_rent_daily != null && (
            <div className="flex-1 bg-red-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">Rent/Day</p>
              <p className="text-lg font-extrabold text-[#e21116]">₹{product.price_rent_daily}</p>
            </div>
          )}
          {product.price_buy != null && (
            <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center">
              <p className="text-xs text-gray-500 mb-0.5">Buy</p>
              <p className="text-lg font-extrabold text-gray-900">
                {product.price_buy >= 1000
                  ? `₹${(product.price_buy / 1000).toFixed(0)}K`
                  : `₹${product.price_buy}`}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          {product.price_rent_daily != null && (
            <button
              id={`rent-btn-${product.id}`}
              disabled={!product.is_available}
              onClick={onRent}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                product.is_available
                  ? "bg-[#e21116] text-white hover:bg-[#b50d11] active:scale-95"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Rent Now
            </button>
          )}
          {product.price_buy != null && (
            <button
              id={`buy-btn-${product.id}`}
              disabled={!product.is_available}
              onClick={onBuy}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                product.is_available
                  ? "border-[#e21116] text-[#e21116] hover:bg-red-50 active:scale-95"
                  : "border-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Fallback static products (shown when DB is empty or unreachable) ──────────
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Philips Oxygen Concentrator 5L",
    description: "Reliable 5L/min oxygen concentrator for home use and emergencies.",
    category: "oxygen",
    price_buy: 32000,
    price_rent_daily: 499,
    stock_quantity: 8,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Drive Medical Wheelchair (Foldable)",
    description: "Lightweight foldable wheelchair with padded armrests and footrests.",
    category: "wheelchair",
    price_buy: 15000,
    price_rent_daily: 299,
    stock_quantity: 12,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "ResMed AirSense BiPAP Machine",
    description: "Advanced BiPAP for sleep apnea and respiratory conditions.",
    category: "other",
    price_buy: 85000,
    price_rent_daily: 799,
    stock_quantity: 4,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "ICU Hospital Bed with Side Rails",
    description: "Adjustable ICU bed with motorised head/foot elevation and side rails.",
    category: "other",
    price_buy: 55000,
    price_rent_daily: 650,
    stock_quantity: 3,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "AccuCheck Glucometer Kit",
    description: "Accurate blood glucose monitoring with 25 test strips included.",
    category: "diagnostic",
    price_buy: 1800,
    price_rent_daily: 99,
    stock_quantity: 20,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Nellcor Pulse Oximeter Pro",
    description: "Medical-grade SpO2 and pulse rate monitor, fingertip clip-on.",
    category: "monitor",
    price_buy: 4500,
    price_rent_daily: 149,
    stock_quantity: 15,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Omron BP Monitor HEM-7120",
    description: "Automatic upper arm blood pressure and pulse measurement.",
    category: "monitor",
    price_buy: 3200,
    price_rent_daily: 129,
    stock_quantity: 18,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Rollator Walker with Seat",
    description: "Foldable rollator walker with built-in seat and hand brakes.",
    category: "mobility",
    price_buy: 8500,
    price_rent_daily: 199,
    stock_quantity: 7,
    image_url: null,
    partner_id: null,
    is_available: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Yuwell Oxygen Concentrator 10L",
    description: "High-flow 10L/min concentrator for severe respiratory conditions.",
    category: "oxygen",
    price_buy: 58000,
    price_rent_daily: 699,
    stock_quantity: 0,
    image_url: null,
    partner_id: null,
    is_available: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
