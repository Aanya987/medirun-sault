"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const features = [
  {
    title: "Instant Dispatch API",
    desc: "Plug our delivery network directly into your EMR, EHR, or e-commerce platform. Automate orders in milliseconds.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "Smart Routing Engine",
    desc: "Dynamic, traffic-aware routing optimized for time-sensitive pharmaceuticals and emergency transport requests.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "Chain of Custody Tracking",
    desc: "End-to-end audit trails with temperature logs, real-time GPS, and cryptographically verified patient signatures.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Certified Rider Network",
    desc: "10,000+ HIPAA-compliant delivery professionals trained in safe medical handling and cold chain management.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: "Automated Compliance",
    desc: "Instantly generate compliant digital logs. Ensure hospital audit readiness with automatic cloud storage syncing.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Enterprise Analytics",
    desc: "Gain complete transparency over dispatch KPIs, carrier performance, SLA validations, and overall delivery efficiency.",
    icon: (
      <svg className="w-6 h-6 text-[#e21116]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
      </svg>
    ),
  },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for single pharmacies looking to explore local delivery networks.",
    cta: "Start Free",
    link: "/signup",
    highlighted: false,
    features: [
      { text: "Up to 50 deliveries / month", active: true },
      { text: "Standard dispatch dashboard", active: true },
      { text: "Real-time rider tracking", active: true },
      { text: "API Integration", active: false },
      { text: "Digital Compliance Logs", active: false },
      { text: "Dedicated Support SLA", active: false },
    ],
  },
  {
    name: "Pro",
    price: "$149",
    period: "per month",
    desc: "For growing medical groups requiring automated logistics and API access.",
    cta: "Get Started",
    link: "/signup",
    highlighted: true,
    features: [
      { text: "Unlimited deliveries / month", active: true },
      { text: "Advanced multi-store dashboard", active: true },
      { text: "Full REST & Webhook APIs", active: true },
      { text: "Digital Temperature Compliance", active: true },
      { text: "15-minute priority dispatch SLA", active: true },
      { text: "24/7 Priority Support", active: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    desc: "For hospital chains and enterprise medical distributors needing dedicated fleets.",
    cta: "Contact Sales",
    link: "#contact",
    highlighted: false,
    features: [
      { text: "Unlimited operations & fleets", active: true },
      { text: "Custom API & EHR integrations", active: true },
      { text: "Dedicated compliance auditor portal", active: true },
      { text: "White-label rider experience", active: true },
      { text: "Guaranteed 10-minute dispatch SLA", active: true },
      { text: "Dedicated account team & custom contract", active: true },
    ],
  },
];

const testimonials = [
  {
    quote: "MediRun SaaS cut our dispatch times from 15 minutes to under 45 seconds. The automated compliance logs save our team 20+ auditing hours every single week.",
    name: "Sarah Jenkins",
    role: "VP of Operations, CareHealth Hospital Group",
    avatar: "SJ",
  },
  {
    quote: "The developer API is exceptionally well-documented. We integrated our EHR pharmacy system in less than two days, and we've successfully shipped 5,000+ orders since.",
    name: "Marcus Thorne",
    role: "Chief Technology Officer, PillExpress",
    avatar: "MT",
  },
  {
    quote: "With cold chain monitoring and geofenced signatures, we have zero liability disputes. MediRun is the operating system for modern medical delivery.",
    name: "Dr. Alisha Patel",
    role: "Founder, BioLabs Labs Network",
    avatar: "AP",
  },
];

export default function HomePage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="overflow-x-hidden bg-white text-[#64748B] font-sans antialiased">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[calc(100vh-4.5rem)] flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        
        {/* Subtle animated gradient blob background */}
        <div className="absolute top-1/4 -left-16 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-8 w-[450px] h-[450px] bg-red-600/5 rounded-full blur-3xl animate-blob-slow" />
        
        {/* Subtle grid layout overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a04_1px,transparent_1px),linear-gradient(to_bottom,#0f172a04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <Reveal delayClass="delay-100">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 rounded-full text-xs font-semibold text-[#e21116] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e21116] animate-pulse" />
              MediRun Logistics OS v2.0
            </span>
          </Reveal>

          <Reveal delayClass="delay-200">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.08] mb-6 max-w-5xl mx-auto">
              Medical Logistics. <br />
              <span className="bg-gradient-to-r from-[#e21116] to-[#b50d11] bg-clip-text text-transparent">Optimized & Automated.</span>
            </h1>
          </Reveal>

          <Reveal delayClass="delay-300">
            <p className="text-lg sm:text-xl text-[#64748B] font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              The automated dispatch API, routing software, and compliant delivery fleet network built for modern pharmacies, diagnostics labs, and hospital groups.
            </p>
          </Reveal>

          <Reveal delayClass="delay-400">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                id="hero-primary-cta"
                className="w-full sm:w-auto px-8 py-4 bg-[#e21116] text-white font-bold rounded-xl shadow-md shadow-red-500/10 hover:bg-[#b50d11] transition-all duration-200 hover:-translate-y-0.5"
              >
                Find Equipment
              </Link>
              <Link
                href="#pricing"
                id="hero-secondary-cta"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0F172A] font-bold rounded-xl border border-gray-200/80 hover:border-gray-300/80 hover:bg-gray-50/50 transition-all duration-200 hover:-translate-y-0.5"
              >
                View Pricing
              </Link>
            </div>
          </Reveal>

          {/* Social Proof Stats */}
          <Reveal delayClass="delay-500" className="mt-20 pt-10 border-t border-gray-100 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">99.98%</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">SLA Compliance</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">&lt; 22m</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Average Delivery</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">2.4M+</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Successful Shipments</p>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-[#0F172A] mb-1">500+</h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Partner Hubs</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-24 bg-[#F8F9FB] border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-red-50 text-[#e21116] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Core Capabilities
              </span>
            </Reveal>
            <Reveal delayClass="delay-100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                Enterprise Logistics Engine
              </h2>
            </Reveal>
            <Reveal delayClass="delay-200">
              <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto">
                Everything your healthcare business needs to orchestrate compliant, fast, and secure medical equipment and sample deliveries.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feat, idx) => (
              <Reveal key={feat.title} delayClass={`delay-${(idx % 3) * 100 + 100}`}>
                <div className="bg-white border border-gray-200/60 rounded-[12px] p-8 card-hover shadow-sm">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feat.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feat.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        
        {/* Subtle grid on dark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-white/10 text-red-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Pricing Plans
              </span>
            </Reveal>
            <Reveal delayClass="delay-100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Scalable Plans for Any Fleet
              </h2>
            </Reveal>
            <Reveal delayClass="delay-200">
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                Simple transparent pricing. Start small with our free plan and scale as your delivery volume expands.
              </p>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {pricingTiers.map((tier, idx) => (
              <Reveal 
                key={tier.name} 
                delayClass={`delay-${idx * 100 + 100}`}
                className="flex"
              >
                <div 
                  className={`relative w-full rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    tier.highlighted 
                      ? "bg-[#1E293B] border-2 border-[#e21116] shadow-xl shadow-red-500/5" 
                      : "bg-[#111C2D] border border-gray-800/80"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold text-white pricing-badge-grad uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">{tier.name}</h3>
                    <p className="text-sm text-gray-400 mb-6">{tier.desc}</p>
                    
                    <div className="flex items-baseline gap-2 mb-8">
                      <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                      <span className="text-sm text-gray-400">/{tier.period}</span>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feat) => (
                        <li key={feat.text} className="flex items-center gap-3">
                          {feat.active ? (
                            <svg className="w-5 h-5 text-[#e21116] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className={`text-sm ${feat.active ? "text-gray-200" : "text-gray-600 line-through"}`}>
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={tier.link}
                    className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-200 ${
                      tier.highlighted 
                        ? "bg-[#e21116] text-white hover:bg-[#b50d11] shadow-lg shadow-red-500/10" 
                        : "bg-white/10 hover:bg-white/15 text-white"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-red-50 text-[#e21116] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Customer Success
              </span>
            </Reveal>
            <Reveal delayClass="delay-100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                Trusted by Industry Leaders
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={t.name} delayClass={`delay-${idx * 100 + 100}`}>
                <div className="bg-white border border-gray-200/60 rounded-[12px] p-8 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    {/* Stars */}
                    <div className="flex gap-0.5 text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-[#64748B] text-base leading-relaxed italic mb-8">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 pt-6 border-t border-gray-100">
                    <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-full flex items-center justify-center text-[#e21116] font-bold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A] text-sm">{t.name}</p>
                      <p className="text-xs text-[#64748B]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-14">
            <Reveal>
              <span className="inline-block px-3 py-1 bg-red-50 text-[#e21116] text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                Talk with Us
              </span>
            </Reveal>
            <Reveal delayClass="delay-100">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
                Schedule a Demo
              </h2>
            </Reveal>
            <Reveal delayClass="delay-200">
              <p className="text-base sm:text-lg text-[#64748B] max-w-xl mx-auto">
                Find out how MediRun can optimize your health delivery operations. Send us a message and our team will get in touch shortly.
              </p>
            </Reveal>
          </div>

          <Reveal delayClass="delay-300">
            <div className="bg-[#F8F9FB] border border-gray-200/60 rounded-2xl p-8 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-2">Message Sent!</h3>
                  <p className="text-sm text-[#64748B]">Thank you for reaching out. We will get in touch with you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-bold text-[#e21116] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e21116] focus:border-[#e21116] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e21116] focus:border-[#e21116] transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell us about your logistics needs..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e21116] focus:border-[#e21116] transition-all resize-none"
                    />
                  </div>
                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#e21116] text-white font-bold rounded-xl shadow-md shadow-red-500/10 hover:bg-[#b50d11] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="footer" className="bg-[#0F172A] text-gray-400 border-t border-gray-800/60 py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 pb-12 border-b border-gray-800/80">
            {/* Logo Left */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#e21116]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-white">
                Medi<span className="text-[#e21116]">Run</span>
              </span>
            </div>

            {/* Nav Center */}
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/products" className="hover:text-white transition-colors">Equipment</Link>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </nav>

            {/* Social Icons Right */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                <span className="sr-only">GitHub</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>© {new Date().getFullYear()} MediRun Technologies, Inc. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
