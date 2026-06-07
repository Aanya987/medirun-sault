"use client";

import { useState } from "react";

type OrderStatus = "Pending" | "Processing" | "Dispatched" | "Delivered" | "Cancelled";

interface StoreOrder {
  id: string;
  customer: string;
  items: string[];
  amount: number;
  status: OrderStatus;
  time: string;
  rider: string;
  type: "Rental" | "Purchase";
}

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  stock: number;
  rented: number;
  rentPrice: number;
  buyPrice: number;
  status: "Available" | "Low Stock" | "Out of Stock";
}

const statusConfig: Record<OrderStatus, { className: string; label: string }> = {
  Pending: { className: "badge-pending", label: "⏳ Pending" },
  Processing: { className: "bg-blue-100 text-blue-700", label: "⚙️ Processing" },
  Dispatched: { className: "bg-purple-100 text-purple-700", label: "🚴 Dispatched" },
  Delivered: { className: "badge-delivered", label: "✅ Delivered" },
  Cancelled: { className: "badge-cancelled", label: "✕ Cancelled" },
};

const orders: StoreOrder[] = [
  { id: "#MR-4821", customer: "Amit Verma", items: ["Oxygen Concentrator 5L", "Pulse Oximeter"], amount: 7993, status: "Dispatched", time: "10:32 AM", rider: "Rahul K.", type: "Rental" },
  { id: "#MR-4820", customer: "Ritu Sharma", items: ["Wheelchair Foldable"], amount: 2093, status: "Processing", time: "10:28 AM", rider: "Suresh M.", type: "Rental" },
  { id: "#MR-4819", customer: "Dr. Mehta Clinic", items: ["ICU Bed", "BiPAP Machine"], amount: 52500, status: "Pending", time: "10:15 AM", rider: "Unassigned", type: "Purchase" },
  { id: "#MR-4818", customer: "Priya Singh", items: ["Glucometer Kit"], amount: 1800, status: "Delivered", time: "09:45 AM", rider: "Deepak S.", type: "Purchase" },
  { id: "#MR-4817", customer: "Rohan Kapoor", items: ["BP Monitor"], amount: 3200, status: "Delivered", time: "09:12 AM", rider: "Vikram P.", type: "Purchase" },
  { id: "#MR-4816", customer: "Aisha Khan", items: ["Rollator Walker"], amount: 1393, status: "Cancelled", time: "08:55 AM", rider: "—", type: "Rental" },
];

const inventory: InventoryItem[] = [
  { id: 1, name: "Philips Oxygen Concentrator 5L", category: "Oxygen Support", stock: 8, rented: 3, rentPrice: 499, buyPrice: 32000, status: "Available" },
  { id: 2, name: "Drive Medical Wheelchair", category: "Mobility Aids", stock: 12, rented: 5, rentPrice: 299, buyPrice: 15000, status: "Available" },
  { id: 3, name: "Resmed BiPAP Machine", category: "Ventilators", stock: 2, rented: 1, rentPrice: 799, buyPrice: 85000, status: "Low Stock" },
  { id: 4, name: "ICU Hospital Bed", category: "Hospital Beds", stock: 3, rented: 3, rentPrice: 650, buyPrice: 55000, status: "Out of Stock" },
  { id: 5, name: "AccuCheck Glucometer", category: "Diagnostics", stock: 20, rented: 0, rentPrice: 99, buyPrice: 1800, status: "Available" },
  { id: 6, name: "Nellcor Pulse Oximeter", category: "Patient Monitoring", stock: 1, rented: 0, rentPrice: 149, buyPrice: 4500, status: "Low Stock" },
];

const metrics = [
  { label: "Today's Revenue", value: "₹65,486", change: "+18%", icon: "💰", color: "text-green-600" },
  { label: "Orders Today", value: "24", change: "+6", icon: "📦", color: "text-blue-600" },
  { label: "Active Rentals", value: "12", change: "4 expiring", icon: "🔄", color: "text-purple-600" },
  { label: "Rating", value: "4.8 ★", change: "238 reviews", icon: "⭐", color: "text-yellow-600" },
  { label: "Riders Online", value: "7", change: "2 nearby", icon: "🚴", color: "text-teal-600" },
  { label: "Equipment In Use", value: "12/35", change: "34%", icon: "🏥", color: "text-[#e21116]" },
];

export default function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "inventory">("orders");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    if (searchQuery && !o.customer.toLowerCase().includes(searchQuery.toLowerCase()) && !o.id.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#e21116] to-[#8b0000] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">🏥</div>
                <div>
                  <h1 className="text-2xl font-extrabold">HealthFirst Medical Store</h1>
                  <p className="text-white/70 text-sm">Dwarka Sector 21, New Delhi • Partner ID: MR-STORE-0042</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Store Open
              </span>
              <button
                id="add-inventory-btn"
                className="px-4 py-2 bg-white text-[#e21116] font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Metric cards */}
        <div id="metrics-grid" className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <div className="text-2xl mb-2">{m.icon}</div>
              <p className={`text-xl font-extrabold mb-0.5 ${m.color}`}>{m.value}</p>
              <p className="text-xs text-gray-500 font-medium leading-tight">{m.label}</p>
              <p className="text-xs text-gray-400 mt-1">{m.change}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart placeholder */}
        <div id="revenue-chart" className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900 text-lg">Revenue Overview</h2>
            <div className="flex gap-2">
              {["7D", "30D", "90D"].map((d) => (
                <button key={d} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 hover:bg-[#e21116] hover:text-white transition-colors">
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {[65, 82, 54, 91, 78, 95, 73].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#e21116] to-red-400 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${h}%` }}
                />
                <span className="text-xs text-gray-400">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 w-fit">
          <button
            id="tab-orders"
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "orders" ? "bg-[#e21116] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            id="tab-inventory"
            onClick={() => setActiveTab("inventory")}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === "inventory" ? "bg-[#e21116] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Inventory ({inventory.length})
          </button>
        </div>

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div id="orders-table-section" className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table controls */}
            <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <input
                id="orders-search"
                type="text"
                placeholder="Search by customer or order ID…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#e21116] w-full sm:w-72"
              />
              <div className="flex flex-wrap gap-2">
                {(["All", "Pending", "Processing", "Dispatched", "Delivered", "Cancelled"] as const).map((s) => (
                  <button
                    key={s}
                    id={`status-filter-${s.toLowerCase()}`}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      statusFilter === s ? "bg-[#e21116] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Order ID", "Customer", "Items", "Amount", "Type", "Rider", "Time", "Status", "Action"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredOrders.map((order) => {
                    const sc = statusConfig[order.status];
                    return (
                      <tr key={order.id} id={`order-row-${order.id}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-bold text-[#e21116] whitespace-nowrap">{order.id}</td>
                        <td className="px-4 py-4 font-semibold text-gray-900 whitespace-nowrap">{order.customer}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-1 max-w-48">
                            {order.items.map((item) => (
                              <span key={item} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">{item}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-4 font-bold text-gray-900 whitespace-nowrap">₹{order.amount.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${order.type === "Rental" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                            {order.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-nowrap">{order.rider}</td>
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{order.time}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${sc.className}`}>{sc.label}</span>
                        </td>
                        <td className="px-4 py-4">
                          <button className="px-3 py-1.5 bg-gray-100 hover:bg-[#e21116] hover:text-white text-gray-600 rounded-lg text-xs font-semibold transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-500">No orders match your filter</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inventory Table */}
        {activeTab === "inventory" && (
          <div id="inventory-table-section" className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Equipment Inventory</h2>
              <button
                id="export-inventory-btn"
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:border-[#e21116] hover:text-[#e21116] transition-colors"
              >
                ↓ Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Equipment", "Category", "Total Stock", "Rented Out", "Available", "Rent/Day", "Buy Price", "Status"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inventory.map((item) => {
                    const available = item.stock - item.rented;
                    const statusColors: Record<InventoryItem["status"], string> = {
                      Available: "bg-green-100 text-green-700",
                      "Low Stock": "bg-yellow-100 text-yellow-700",
                      "Out of Stock": "bg-red-100 text-[#e21116]",
                    };
                    return (
                      <tr key={item.id} id={`inventory-row-${item.id}`} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 font-semibold text-gray-900">{item.name}</td>
                        <td className="px-4 py-4 text-gray-500 whitespace-nowrap">{item.category}</td>
                        <td className="px-4 py-4 text-center font-bold text-gray-900">{item.stock}</td>
                        <td className="px-4 py-4 text-center font-bold text-purple-600">{item.rented}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`font-bold ${available > 2 ? "text-green-600" : available > 0 ? "text-yellow-600" : "text-[#e21116]"}`}>
                            {available}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-semibold text-gray-900 whitespace-nowrap">₹{item.rentPrice}/day</td>
                        <td className="px-4 py-4 font-semibold text-gray-900 whitespace-nowrap">₹{item.buyPrice.toLocaleString()}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${statusColors[item.status]}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
