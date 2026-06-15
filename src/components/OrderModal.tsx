"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, Product } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

interface OrderModalProps {
  product: Product;
  orderType: "rent" | "buy";
  onClose: () => void;
}

export default function OrderModal({ product, orderType, onClose }: OrderModalProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalAmount = orderType === "rent"
    ? (product.price_rent_daily ?? 0) * rentalDays
    : (product.price_buy ?? 0);

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (!address.trim()) {
      setError("Please enter a delivery address.");
      return;
    }

    setLoading(true);
    setError("");

    const orderNumber = `MR-${Date.now()}`;

    const { data, error: orderError } = await supabase
      .from("orders")
      .insert([{
        order_number: orderNumber,
        customer_id: user.id,
        product_id: product.id,
        order_type: orderType,
        rental_days: orderType === "rent" ? rentalDays : null,
        quantity: 1,
        total_amount: totalAmount,
        status: "pending",
        delivery_address: address,
        notes: notes || null,
      }])
      .select()
      .single();

    if (orderError) {
      setError("Failed to place order. Please try again.");
      setLoading(false);
      return;
    }

    router.push(`/order-confirmation?id=${data.id}&orderNumber=${orderNumber}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
                {orderType === "rent" ? "🔁 Rental Order" : "🛒 Purchase Order"}
              </p>
              <h2 className="text-xl font-extrabold leading-tight">{product.name}</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-yellow-300">
              ₹{orderType === "rent" ? `${product.price_rent_daily}/day` : product.price_buy?.toLocaleString()}
            </span>
            {orderType === "buy" && <span className="text-white/60 text-sm">one-time purchase</span>}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-sm text-[#e21116] font-medium">⚠️ {error}</p>
            </div>
          )}

          {/* Rental days selector */}
          {orderType === "rent" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rental Duration</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e21116] hover:text-[#e21116] transition-colors"
                >−</button>
                <div className="flex-1 text-center bg-red-50 rounded-2xl py-3">
                  <span className="text-2xl font-extrabold text-[#e21116]">{rentalDays}</span>
                  <span className="text-gray-500 text-sm ml-1">{rentalDays === 1 ? "day" : "days"}</span>
                </div>
                <button
                  onClick={() => setRentalDays(Math.min(30, rentalDays + 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-[#e21116] hover:text-[#e21116] transition-colors"
                >+</button>
              </div>
              <div className="flex gap-2 mt-3">
                {[1, 3, 7, 14, 30].map((d) => (
                  <button
                    key={d}
                    onClick={() => setRentalDays(d)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      rentalDays === d ? "bg-[#e21116] text-white" : "bg-gray-100 text-gray-600 hover:bg-red-50"
                    }`}
                  >{d}d</button>
                ))}
              </div>
            </div>
          )}

          {/* Delivery address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="order-address">
              Delivery Address *
            </label>
            <textarea
              id="order-address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="House/flat no., Street, Area, City, Pincode"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e21116] resize-none transition-all"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="order-notes">
              Special Instructions <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              id="order-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Call before delivery, Ground floor"
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e21116] transition-all"
            />
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <p className="text-sm font-bold text-gray-700 mb-3">Order Summary</p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{product.name}</span>
              <span>₹{orderType === "rent" ? product.price_rent_daily : product.price_buy?.toLocaleString()}</span>
            </div>
            {orderType === "rent" && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>× {rentalDays} {rentalDays === 1 ? "day" : "days"}</span>
                <span>₹{((product.price_rent_daily ?? 0) * rentalDays).toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-gray-900">
              <span>Total</span>
              <span className="text-[#e21116]">₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2">
          {!user && (
            <p className="text-xs text-center text-gray-500 mb-3">
              You need to <button onClick={() => router.push("/login")} className="text-[#e21116] font-semibold">sign in</button> to place an order.
            </p>
          )}
          <button
            id="place-order-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full py-4 bg-[#e21116] text-white font-bold rounded-2xl hover:bg-[#b50d11] active:scale-95 transition-all duration-200 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Placing Order...
              </>
            ) : (
              `🚑 Place ${orderType === "rent" ? "Rental" : "Purchase"} Order — ₹${totalAmount.toLocaleString()}`
            )}
          </button>
          <p className="text-xs text-center text-gray-400 mt-3">
            ⚡ Expected delivery in under 30 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
