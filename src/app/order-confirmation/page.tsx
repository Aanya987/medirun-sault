"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface OrderDetails {
  id: string;
  order_number: string;
  order_type: "rent" | "buy";
  total_amount: number;
  delivery_address: string;
  status: string;
  rental_days: number | null;
  created_at: string;
  products?: {
    name: string;
    category: string;
  };
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const orderNumber = searchParams.get("orderNumber");
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }

    const fetchOrder = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*, products(name, category)")
        .eq("id", orderId)
        .single();

      if (data) setOrder(data as OrderDetails);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin w-12 h-12 text-[#e21116] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-gray-500 font-medium">Loading your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
              <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
          <p className="text-gray-500 text-lg">Your medical equipment is on its way</p>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
          {/* Order Header */}
          <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] px-6 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Order Number</p>
                <p className="text-xl font-extrabold">{order?.order_number ?? orderNumber}</p>
              </div>
              <div className="bg-white/20 rounded-2xl px-4 py-2 border border-white/30">
                <p className="text-sm font-bold capitalize">{order?.status ?? "Pending"}</p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6 space-y-4">
            {order?.products && (
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
                  🏥
                </div>
                <div>
                  <p className="font-bold text-gray-900">{order.products.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{order.products.category}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-red-100 text-[#e21116] text-xs font-bold rounded-full capitalize">
                    {order.order_type}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Order Type</p>
                <p className="font-bold text-gray-900 capitalize">
                  {order?.order_type === "rent" ? "🔁 Rental" : "🛒 Purchase"}
                </p>
              </div>
              {order?.order_type === "rent" && (
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-xs text-gray-500 font-medium mb-1">Rental Duration</p>
                  <p className="font-bold text-gray-900">{order?.rental_days} {order?.rental_days === 1 ? "day" : "days"}</p>
                </div>
              )}
              <div className="bg-red-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Total Amount</p>
                <p className="font-extrabold text-[#e21116] text-lg">₹{order?.total_amount?.toLocaleString() ?? "—"}</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-1">Estimated Delivery</p>
                <p className="font-bold text-gray-900">⚡ ~30 min</p>
              </div>
            </div>

            {order?.delivery_address && (
              <div className="border border-gray-100 rounded-2xl p-4">
                <p className="text-xs text-gray-500 font-medium mb-2">📍 Delivery Address</p>
                <p className="text-sm text-gray-800 font-medium">{order.delivery_address}</p>
              </div>
            )}
          </div>

          {/* Delivery Timeline */}
          <div className="px-6 pb-6">
            <p className="text-sm font-bold text-gray-700 mb-4">Delivery Progress</p>
            <div className="space-y-3">
              {[
                { label: "Order Placed", done: true, icon: "📋" },
                { label: "Rider Assigned", done: false, icon: "🚴" },
                { label: "Picked from Partner Store", done: false, icon: "🏥" },
                { label: "Out for Delivery", done: false, icon: "🛵" },
                { label: "Delivered", done: false, icon: "🏠" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                    step.done ? "bg-green-500 shadow-sm" : "bg-gray-100"
                  }`}>
                    {step.done ? "✓" : step.icon}
                  </div>
                  <p className={`text-sm font-medium ${step.done ? "text-green-700" : "text-gray-500"}`}>
                    {step.label}
                  </p>
                  {i === 0 && (
                    <span className="ml-auto text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">
                      Just now
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/profile"
            id="view-orders-btn"
            className="py-4 bg-[#e21116] text-white font-bold rounded-2xl text-center hover:bg-[#b50d11] transition-colors shadow-lg"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            id="continue-shopping-btn"
            className="py-4 border-2 border-[#e21116] text-[#e21116] font-bold rounded-2xl text-center hover:bg-red-50 transition-colors"
          >
            Browse More
          </Link>
        </div>

        <Link href="/tracking" className="block text-center text-sm text-[#e21116] font-medium mt-4 hover:underline">
          🗺️ Track your order live →
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin w-10 h-10 text-[#e21116]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
