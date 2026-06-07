"use client";

import { useState } from "react";

type OrderStatus = "pending" | "accepted" | "declined" | "completed";

interface Order {
  id: string;
  customer: string;
  address: string;
  items: string[];
  amount: number;
  distance: string;
  urgency: "Emergency" | "Standard" | "Scheduled";
  time: string;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  {
    id: "#MR-4821",
    customer: "Amit Verma",
    address: "House 14, Sector 21, Dwarka, Delhi",
    items: ["Oxygen Concentrator 5L", "Pulse Oximeter"],
    amount: 650,
    distance: "1.4 km",
    urgency: "Emergency",
    time: "2 min ago",
    status: "pending",
  },
  {
    id: "#MR-4820",
    customer: "Ritu Sharma",
    address: "B-104, Green Park Extension, Delhi",
    items: ["Wheelchair Foldable"],
    amount: 299,
    distance: "2.8 km",
    urgency: "Standard",
    time: "5 min ago",
    status: "pending",
  },
  {
    id: "#MR-4819",
    customer: "Dr. Mehta Clinic",
    address: "Medical Complex, Lajpat Nagar, Delhi",
    items: ["ICU Bed", "BiPAP Machine", "BP Monitor"],
    amount: 1450,
    distance: "3.2 km",
    urgency: "Scheduled",
    time: "12 min ago",
    status: "accepted",
  },
  {
    id: "#MR-4818",
    customer: "Priya Singh",
    address: "D-6, Vasant Kunj, New Delhi",
    items: ["Glucometer Kit"],
    amount: 99,
    distance: "0.9 km",
    urgency: "Standard",
    time: "18 min ago",
    status: "completed",
  },
];

const urgencyConfig: Record<Order["urgency"], { color: string; icon: string }> = {
  Emergency: { color: "bg-red-100 text-[#e21116] border border-red-200", icon: "🚨" },
  Standard: { color: "bg-blue-50 text-blue-700 border border-blue-200", icon: "📦" },
  Scheduled: { color: "bg-gray-100 text-gray-700 border border-gray-200", icon: "📅" },
};

const earnings = [
  { label: "Today", amount: "₹1,840", trips: 6, icon: "📅" },
  { label: "This Week", amount: "₹11,290", trips: 38, icon: "📆" },
  { label: "This Month", amount: "₹42,500", trips: 142, icon: "🗓️" },
  { label: "Total Earned", amount: "₹3,28,000", trips: 1240, icon: "💰" },
];

export default function RiderDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [activeTab, setActiveTab] = useState<"incoming" | "history">("incoming");

  const updateOrder = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const pendingOrders = orders.filter((o) => o.status === "pending");
  const activeOrders = orders.filter((o) => o.status === "accepted");
  const completedOrders = orders.filter((o) => o.status === "completed" || o.status === "declined");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold border-4 border-white/30">
                RK
              </div>
              <div>
                <h1 className="text-2xl font-extrabold">Rahul Kumar</h1>
                <div className="flex items-center gap-3 text-white/80 text-sm mt-0.5">
                  <span>⭐ 4.92 rating</span>
                  <span>•</span>
                  <span>1,240 deliveries</span>
                  <span>•</span>
                  <span>DL-9S-2847</span>
                </div>
              </div>
            </div>

            {/* Online toggle */}
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-5 py-3">
              <span className="text-sm font-semibold">{onlineStatus ? "You are Online" : "You are Offline"}</span>
              <button
                id="online-toggle"
                onClick={() => setOnlineStatus(!onlineStatus)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${onlineStatus ? "bg-green-400" : "bg-gray-400"}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${onlineStatus ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Earnings cards */}
        <div id="earnings-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {earnings.map((e) => (
            <div key={e.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="text-2xl mb-2">{e.icon}</div>
              <p className="text-2xl font-extrabold text-gray-900 mb-0.5">{e.amount}</p>
              <p className="text-xs text-gray-500 font-medium">{e.label}</p>
              <p className="text-xs text-[#e21116] font-semibold mt-1">{e.trips} trips</p>
            </div>
          ))}
        </div>

        {/* Quick stats bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-extrabold text-[#e21116]">{pendingOrders.length}</p>
            <p className="text-xs text-gray-500">Pending Orders</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-green-600">{activeOrders.length}</p>
            <p className="text-xs text-gray-500">Active Deliveries</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-gray-700">{completedOrders.length}</p>
            <p className="text-xs text-gray-500">Completed Today</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 w-fit">
          <button
            id="tab-incoming"
            onClick={() => setActiveTab("incoming")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "incoming" ? "bg-[#e21116] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Incoming Orders {pendingOrders.length > 0 && <span className="ml-1 w-5 h-5 bg-white text-[#e21116] rounded-full inline-flex items-center justify-center text-xs font-bold">{pendingOrders.length}</span>}
          </button>
          <button
            id="tab-history"
            onClick={() => setActiveTab("history")}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "history" ? "bg-[#e21116] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            History
          </button>
        </div>

        {/* Active deliveries */}
        {activeOrders.length > 0 && (
          <div id="active-deliveries">
            <h2 className="font-bold text-gray-900 text-lg mb-3">🚴 Active Deliveries</h2>
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-green-50 border-2 border-green-200 rounded-3xl p-5 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">Active</span>
                </div>
                <p className="font-semibold text-gray-800 mb-1">{order.customer}</p>
                <p className="text-sm text-gray-500 mb-3">📍 {order.address}</p>
                <div className="flex gap-2">
                  <button
                    id={`complete-btn-${order.id}`}
                    onClick={() => updateOrder(order.id, "completed")}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-bold hover:bg-green-600 transition-colors"
                  >
                    ✓ Mark Delivered
                  </button>
                  <a href="tel:+911800000000" className="px-4 py-2 border border-green-300 text-green-700 rounded-xl text-sm font-semibold hover:bg-green-100 transition-colors">
                    📞 Call Customer
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders list */}
        {activeTab === "incoming" && (
          <div id="incoming-orders">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Incoming Orders</h2>
            {!onlineStatus ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="text-5xl mb-4">😴</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Offline</h3>
                <p className="text-gray-500 mb-6">Go online to start receiving orders</p>
                <button
                  onClick={() => setOnlineStatus(true)}
                  className="px-6 py-3 bg-[#e21116] text-white rounded-2xl font-bold hover:bg-[#b50d11] transition-colors"
                >
                  Go Online
                </button>
              </div>
            ) : pendingOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
                <p className="text-gray-500">Waiting for new orders in your area…</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOrders.map((order) => {
                  const urg = urgencyConfig[order.urgency];
                  return (
                    <div
                      key={order.id}
                      id={`order-card-${order.id}`}
                      className={`bg-white rounded-3xl border shadow-sm p-6 ${order.urgency === "Emergency" ? "border-red-200 ring-2 ring-[#e21116]/20" : "border-gray-100"}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-500 text-sm">{order.id}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${urg.color}`}>
                              {urg.icon} {order.urgency}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">{order.customer}</h3>
                          <p className="text-sm text-gray-500">📍 {order.address}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-2xl font-extrabold text-gray-900">₹{order.amount}</p>
                          <p className="text-xs text-gray-400">{order.distance} • {order.time}</p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {order.items.map((item) => (
                          <span key={item} className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-3">
                        <button
                          id={`accept-btn-${order.id}`}
                          onClick={() => updateOrder(order.id, "accepted")}
                          className="flex-1 py-3 bg-[#e21116] text-white rounded-2xl font-bold text-sm hover:bg-[#b50d11] active:scale-95 transition-all shadow-sm"
                        >
                          ✓ Accept Order
                        </button>
                        <button
                          id={`decline-btn-${order.id}`}
                          onClick={() => updateOrder(order.id, "declined")}
                          className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:border-red-300 hover:text-[#e21116] active:scale-95 transition-all"
                        >
                          ✕ Decline
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* History tab */}
        {activeTab === "history" && (
          <div id="order-history">
            <h2 className="font-bold text-gray-900 text-lg mb-4">Delivery History</h2>
            {completedOrders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
                <div className="text-5xl mb-3">📋</div>
                <p className="text-gray-500">No completed orders yet today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{order.customer} <span className="text-gray-400 font-normal text-xs ml-2">{order.id}</span></p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.items.join(" • ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{order.amount}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${order.status === "completed" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {order.status === "completed" ? "Delivered" : "Declined"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
