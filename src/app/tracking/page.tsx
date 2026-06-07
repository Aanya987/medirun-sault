"use client";

import { useState } from "react";
import Link from "next/link";

const deliveryStages = [
  { id: 1, label: "Order Placed", time: "10:32 AM", done: true, icon: "📋" },
  { id: 2, label: "Store Confirmed", time: "10:34 AM", done: true, icon: "🏥" },
  { id: 3, label: "Rider Assigned", time: "10:36 AM", done: true, icon: "🚴" },
  { id: 4, label: "Equipment Picked Up", time: "10:48 AM", done: true, icon: "📦" },
  { id: 5, label: "On the Way", time: "10:50 AM", done: true, icon: "🗺️" },
  { id: 6, label: "Delivered", time: "ETA 11:05 AM", done: false, icon: "🏠" },
];

const orderItems = [
  { name: "Philips Oxygen Concentrator 5L", type: "Rental • 7 days", price: "₹3,493", img: "🫁" },
  { name: "Nellcor Pulse Oximeter", type: "Purchase", price: "₹4,500", img: "💊" },
];

export default function TrackingPage() {
  const [callRider, setCallRider] = useState(false);
  const progressPct = Math.round((deliveryStages.filter((s) => s.done).length / deliveryStages.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Track Order</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-1">Live Order Tracking</h1>
          <p className="text-white/80 text-sm">Order <strong className="text-white">#MR-20250607-4821</strong> • Placed at 10:32 AM</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ETA card */}
        <div id="eta-banner" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Estimated Arrival</p>
            <div className="text-4xl font-extrabold text-[#e21116]">11:05 AM</div>
            <p className="text-gray-500 text-sm mt-1">~15 minutes remaining</p>
          </div>
          <div className="flex gap-3">
            <button
              id="call-rider-btn"
              onClick={() => setCallRider(!callRider)}
              className="flex items-center gap-2 px-5 py-3 bg-[#e21116] text-white rounded-2xl font-semibold text-sm hover:bg-[#b50d11] transition-colors"
            >
              📞 {callRider ? "Calling…" : "Call Rider"}
            </button>
            <button
              id="cancel-order-btn"
              className="flex items-center gap-2 px-5 py-3 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold text-sm hover:border-red-300 hover:text-[#e21116] transition-colors"
            >
              ✕ Cancel
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <div id="map-placeholder" className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="relative h-80 bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 flex items-center justify-center">
              {/* Fake map grid */}
              <div className="absolute inset-0 opacity-30">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id="mapgrid" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapgrid)"/>
                  {/* Fake roads */}
                  <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="3"/>
                  <line x1="35%" y1="0" x2="35%" y2="100%" stroke="#cbd5e1" strokeWidth="3"/>
                  <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#cbd5e1" strokeWidth="2"/>
                  <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#cbd5e1" strokeWidth="2"/>
                </svg>
              </div>

              {/* Destination pin */}
              <div className="absolute top-8 right-20 flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-base">
                  🏠
                </div>
                <div className="mt-1 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap">Destination</div>
              </div>

              {/* Rider pin — animated */}
              <div className="absolute bottom-16 left-1/3 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#e21116]/30 animate-ping" />
                  <div className="relative w-12 h-12 bg-[#e21116] rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white text-lg">
                    🚴
                  </div>
                </div>
                <div className="mt-1 bg-[#e21116] text-white text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap">Rider — 1.2 km</div>
              </div>

              {/* Store pin */}
              <div className="absolute top-16 left-12 flex flex-col items-center">
                <div className="w-9 h-9 bg-green-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white text-sm">
                  🏥
                </div>
                <div className="mt-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-lg whitespace-nowrap">Store</div>
              </div>

              {/* Map label */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-xl px-3 py-1.5 text-xs text-gray-500 shadow">
                🗺️ Live Map • Powered by MediRun GPS
              </div>
            </div>
          </div>

          {/* Rider Card */}
          <div id="rider-card" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Rider</h2>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-[#e21116] to-[#8b0000] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                RK
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Rahul Kumar</h3>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-semibold text-gray-800">4.92</span>
                  <span className="text-gray-400">(438 deliveries)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: "Vehicle", value: "Honda Activa • DL-9S-2847" },
                { label: "Distance", value: "1.2 km away" },
                { label: "Experience", value: "2 years at MediRun" },
                { label: "Verified", value: "✅ Background checked" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                id="rider-call-btn"
                className="flex-1 py-2.5 bg-[#e21116] text-white rounded-xl font-semibold text-sm hover:bg-[#b50d11] transition-colors"
              >
                📞 Call
              </button>
              <button
                id="rider-message-btn"
                className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:border-[#e21116] hover:text-[#e21116] transition-colors"
              >
                💬 Message
              </button>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        <div id="delivery-progress" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Delivery Status</h2>
            <span className="text-sm font-semibold text-[#e21116]">{progressPct}% complete</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-[#e21116] to-orange-400 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {deliveryStages.map((stage, i) => (
              <div key={stage.id} className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-2 border-4 transition-all ${
                    stage.done
                      ? "bg-[#e21116] border-[#e21116] text-white shadow-md"
                      : i === deliveryStages.findIndex((s) => !s.done)
                      ? "bg-white border-[#e21116] text-[#e21116] animate-pulse"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {stage.done ? "✓" : stage.icon}
                </div>
                <p className={`text-xs font-semibold mb-1 ${stage.done ? "text-gray-900" : "text-gray-400"}`}>
                  {stage.label}
                </p>
                <p className={`text-xs ${stage.done ? "text-[#e21116]" : "text-gray-400"}`}>{stage.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order summary */}
        <div id="order-summary" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
          <div className="space-y-4 mb-5">
            {orderItems.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  {item.img}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
                <p className="font-bold text-gray-900">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-extrabold text-[#e21116] text-xl">₹7,993</span>
          </div>
        </div>
      </div>
    </div>
  );
}
