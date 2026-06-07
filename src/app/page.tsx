import Link from "next/link";

const categories = [
  {
    id: "oxygen",
    icon: "🫁",
    label: "Oxygen Support",
    desc: "Cylinders, concentrators & masks",
    color: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
  },
  {
    id: "mobility",
    icon: "♿",
    label: "Mobility Aids",
    desc: "Wheelchairs, walkers & crutches",
    color: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
  },
  {
    id: "monitoring",
    icon: "💊",
    label: "Patient Monitoring",
    desc: "Pulse oximeters, BP monitors & ECG",
    color: "from-green-50 to-green-100",
    border: "border-green-200",
    iconBg: "bg-green-100",
  },
  {
    id: "hospital-beds",
    icon: "🛏️",
    label: "Hospital Beds",
    desc: "ICU & home care beds",
    color: "from-yellow-50 to-yellow-100",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
  },
  {
    id: "ventilators",
    icon: "🌬️",
    label: "Ventilators",
    desc: "BiPAP, CPAP & ventilators",
    color: "from-teal-50 to-teal-100",
    border: "border-teal-200",
    iconBg: "bg-teal-100",
  },
  {
    id: "diagnostics",
    icon: "🔬",
    label: "Diagnostics",
    desc: "Glucometers, thermometers & strips",
    color: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    iconBg: "bg-orange-100",
  },
];

const steps = [
  {
    step: "01",
    title: "Search Equipment",
    desc: "Browse from 500+ certified medical devices available in your area.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Place Your Order",
    desc: "Choose rent or buy. Add address, get instant price quote.",
    icon: "📋",
  },
  {
    step: "03",
    title: "Verified Pickup",
    desc: "Certified rider retrieves sanitized equipment from partner store.",
    icon: "🚴",
  },
  {
    step: "04",
    title: "Doorstep Delivery",
    desc: "Equipment delivered in under 30 minutes, set up included.",
    icon: "🏠",
  },
];

const stats = [
  { value: "50,000+", label: "Successful Deliveries", icon: "📦" },
  { value: "< 30 min", label: "Average Delivery Time", icon: "⚡" },
  { value: "200+", label: "Partner Stores", icon: "🏥" },
  { value: "30+ Cities", label: "Cities Covered", icon: "🗺️" },
];

const testimonials = [
  {
    name: "Dr. Ravi Mehta",
    role: "Cardiologist, AIIMS Delhi",
    quote: "MediRun delivered an oxygen concentrator to my patient within 22 minutes. This service is literally saving lives.",
    avatar: "RM",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    role: "Family Caregiver, Bengaluru",
    quote: "When my father needed a hospital bed at home post-surgery, MediRun set it up the same day. Incredible service!",
    avatar: "PS",
    stars: 5,
  },
  {
    name: "Amit Verma",
    role: "Emergency Patient, Mumbai",
    quote: "Got a BiPAP machine rented within 25 minutes during a breathing crisis. Absolutely a game-changer for emergencies.",
    avatar: "AV",
    stars: 5,
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO SECTION ===== */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#e21116] via-[#c8050a] to-[#8b0000] overflow-hidden"
      >
        {/* Background pattern */}
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

        {/* Decorative blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fadeInUp text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live Now — 200+ Partner Stores Active
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
              Medical Equipment,{" "}
              <span className="text-yellow-300 block">In Minutes.</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
              India&apos;s first on-demand medical equipment delivery platform.
              Oxygen cylinders, wheelchairs, hospital beds — rented or purchased and delivered to your door in under{" "}
              <strong className="text-white">30 minutes</strong>.
            </p>

            {/* Search bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">
                <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  id="hero-location-input"
                  type="text"
                  placeholder="Enter your location..."
                  className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-sm font-medium"
                />
              </div>
              <Link
                href="/products"
                id="hero-find-equipment"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-2xl shadow-lg transition-all duration-200 active:scale-95 whitespace-nowrap"
              >
                Find Equipment →
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              {["✅ Certified Equipment", "🚴 Trained Riders", "⚡ 30-Min Delivery", "💳 Secure Payments"].map((badge) => (
                <span key={badge} className="flex items-center gap-1">{badge}</span>
              ))}
            </div>
          </div>

          {/* Right — floating card UI */}
          <div className="hidden lg:flex justify-center">
            <div className="relative animate-float">
              {/* Main card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 w-80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-500">Active Delivery</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">ON THE WAY</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">🫁</div>
                  <div>
                    <p className="font-bold text-gray-900">Oxygen Concentrator</p>
                    <p className="text-sm text-gray-500">10L/min • Rental</p>
                  </div>
                </div>
                {/* Progress */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Delivery Progress</span>
                    <span>ETA: 8 min</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#e21116] to-orange-400 rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
                {/* Rider */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-[#e21116] rounded-full flex items-center justify-center text-white font-bold text-sm">RK</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Rahul Kumar</p>
                    <p className="text-xs text-gray-500">⭐ 4.9 • 1.2 km away</p>
                  </div>
                  <button className="ml-auto w-8 h-8 bg-[#e21116] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-2xl px-4 py-2 shadow-lg text-sm font-bold">
                22 min ⚡
              </div>

              {/* Floating rating */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">★ 4.9</span>
                  <span className="text-gray-500">50K+ deliveries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section id="stats" className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-red-50 text-[#e21116] text-sm font-semibold rounded-full mb-4">
              Equipment Categories
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need, <span className="text-[#e21116]">Right Now</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              500+ certified medical devices available for rent or purchase, delivered by trained professionals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                id={`category-${cat.id}`}
                className={`group relative bg-gradient-to-br ${cat.color} border ${cat.border} rounded-3xl p-6 card-hover cursor-pointer block`}
              >
                <div className={`w-14 h-14 ${cat.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.label}</h3>
                <p className="text-sm text-gray-600 mb-4">{cat.desc}</p>
                <div className="flex items-center gap-1 text-[#e21116] text-sm font-semibold group-hover:gap-2 transition-all duration-200">
                  Browse Options
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-red-50 text-[#e21116] text-sm font-semibold rounded-full mb-4">
              How It Works
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Emergency Equipment in <span className="text-[#e21116]">4 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              From search to doorstep — we&apos;ve made the process seamless so you can focus on what matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#e21116]/20 via-[#e21116] to-[#e21116]/20" />

            {steps.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className="relative w-16 h-16 bg-white border-4 border-[#e21116] rounded-full flex items-center justify-center text-2xl mb-6 shadow-lg z-10">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#e21116] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/products"
              id="hiw-cta"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#e21116] text-white font-bold rounded-2xl shadow-lg hover:bg-[#b50d11] active:scale-95 transition-all duration-200 text-lg"
            >
              🚑 Order Emergency Equipment Now
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-2 bg-red-50 text-[#e21116] text-sm font-semibold rounded-full mb-4">
              Trusted By Thousands
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900">
              Real Stories, <span className="text-[#e21116]">Real Lives Saved</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 card-hover">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#e21116] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section id="cta-banner" className="py-16 bg-gradient-to-r from-[#e21116] to-[#8b0000]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-extrabold mb-4">Are you a medical store owner?</h2>
          <p className="text-lg text-white/80 mb-8">
            Join MediRun&apos;s partner network and expand your reach. Get orders from hundreds of customers in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/partner" id="cta-partner-btn" className="px-8 py-4 bg-white text-[#e21116] font-bold rounded-2xl hover:bg-gray-100 transition-colors">
              Become a Partner Store
            </Link>
            <Link href="/rider" id="cta-rider-btn" className="px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors">
              Join as Rider
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="footer" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#e21116] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="font-bold text-xl">Medi<span className="text-[#e21116]">Run</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                India&apos;s fastest medical equipment delivery platform. Available 24/7 for your emergencies.
              </p>
              <div className="flex gap-3">
                {["📞 1800-MED-RUN", "📍 Pan India"].map(b => (
                  <span key={b} className="text-xs text-gray-500">{b}</span>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Services</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {["Equipment Rental", "Equipment Purchase", "Home Care Setup", "Emergency Delivery", "Corporate Tie-ups"].map(s => (
                  <li key={s}><Link href="/products" className="hover:text-white transition-colors">{s}</Link></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {["About MediRun", "Careers", "Press", "Partner Stores", "Rider Program", "Blog"].map(s => (
                  <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-gray-300 mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                {["Help Center", "Track Your Order", "Return Policy", "Privacy Policy", "Terms of Service", "Safety Standards"].map(s => (
                  <li key={s}><a href="#" className="hover:text-white transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 MediRun Technologies Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
