"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface OrderWithProduct {
  id: string;
  order_number: string;
  order_type: "rent" | "buy";
  total_amount: number;
  status: string;
  delivery_address: string;
  rental_days: number | null;
  created_at: string;
  products?: {
    name: string;
    category: string;
  };
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending:    { label: "Pending",     color: "text-yellow-700", bg: "bg-yellow-100" },
  confirmed:  { label: "Confirmed",   color: "text-blue-700",   bg: "bg-blue-100" },
  picked_up:  { label: "Picked Up",   color: "text-purple-700", bg: "bg-purple-100" },
  in_transit: { label: "In Transit",  color: "text-orange-700", bg: "bg-orange-100" },
  delivered:  { label: "Delivered",   color: "text-green-700",  bg: "bg-green-100" },
  cancelled:  { label: "Cancelled",   color: "text-red-700",    bg: "bg-red-100" },
};

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderWithProduct[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "rent" | "buy">("all");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, products(name, category)")
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });

      if (data) setOrders(data as OrderWithProduct[]);
      setLoadingOrders(false);
    };

    fetchOrders();
  }, [user]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/");
  };

  const filteredOrders = orders.filter((o) =>
    activeTab === "all" ? true : o.order_type === activeTab
  );

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    rentals: orders.filter((o) => o.order_type === "rent").length,
    spent: orders.reduce((acc, o) => acc + o.total_amount, 0),
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin w-10 h-10 text-[#e21116]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  if (!user) return null;

  const userInitial = (user.user_metadata?.full_name ?? user.email ?? "U")[0].toUpperCase();
  const displayName = user.user_metadata?.full_name ?? user.email ?? "User";
  const memberSince = new Date(user.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#e21116] via-[#c8050a] to-[#8b0000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#e21116] font-extrabold text-4xl shadow-xl shrink-0">
              {userInitial}
            </div>

            {/* Info */}
            <div className="text-white text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">{displayName}</h1>
              <p className="text-white/70 mb-1">{user.email}</p>
              {user.user_metadata?.phone && (
                <p className="text-white/70 text-sm mb-3">{user.user_metadata.phone}</p>
              )}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Member since {memberSince}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  🏥 {stats.total} Order{stats.total !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Sign out */}
            <button
              id="profile-signout-btn"
              onClick={handleSignOut}
              disabled={signingOut}
              className="flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/30 text-white font-semibold rounded-2xl hover:bg-white/25 transition-colors backdrop-blur-sm shrink-0 text-sm"
            >
              {signingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            {[
              { label: "Total Orders", value: stats.total, icon: "📦" },
              { label: "Delivered", value: stats.delivered, icon: "✅" },
              { label: "Rentals", value: stats.rentals, icon: "🔁" },
              { label: "Total Spent", value: `₹${stats.spent.toLocaleString()}`, icon: "💰" },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                <p className="text-xl mb-1">{s.icon}</p>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-white/70 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">Order History</h2>
          <Link
            href="/products"
            className="px-5 py-2.5 bg-[#e21116] text-white font-bold rounded-xl hover:bg-[#b50d11] transition-colors text-sm shadow-sm"
          >
            + New Order
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-2xl w-fit">
          {(["all", "rent", "buy"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "all" ? "All Orders" : tab === "rent" ? "🔁 Rentals" : "🛒 Purchases"}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loadingOrders ? (
          <div className="text-center py-16">
            <svg className="animate-spin w-10 h-10 text-[#e21116] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <p className="text-gray-400 font-medium">Loading your orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${activeTab === "rent" ? "rental" : "purchase"} orders.`}
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-[#e21116] text-white font-bold rounded-2xl hover:bg-[#b50d11] transition-colors"
            >
              Browse Equipment
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status] ?? statusConfig.pending;
              const date = new Date(order.created_at).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              });
              const time = new Date(order.created_at).toLocaleTimeString("en-IN", {
                hour: "2-digit", minute: "2-digit",
              });

              return (
                <div
                  key={order.id}
                  id={`order-card-${order.id}`}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                      {order.order_type === "rent" ? "🔁" : "🛒"}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-extrabold text-gray-900 truncate">{order.products?.name ?? "Product"}</p>
                        <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{order.order_number}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                        <span>📅 {date} at {time}</span>
                        {order.order_type === "rent" && order.rental_days && (
                          <span>⏱️ {order.rental_days} {order.rental_days === 1 ? "day" : "days"} rental</span>
                        )}
                        <span>📍 {order.delivery_address.slice(0, 40)}{order.delivery_address.length > 40 ? "..." : ""}</span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-extrabold text-[#e21116]">₹{order.total_amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 capitalize">{order.order_type}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
