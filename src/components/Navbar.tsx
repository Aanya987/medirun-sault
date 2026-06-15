"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Equipment" },
  { href: "/tracking", label: "Track Order" },
  { href: "/rider", label: "Rider Dashboard" },
  { href: "/partner", label: "Partner Store" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const [signingOut, setSigningOut] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close user menu when clicking outside
  useEffect(() => {
    const handler = () => setUserMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    setSigningOut(false);
    setUserMenuOpen(false);
    router.push("/");
  };

  const userInitial = user
    ? (user.user_metadata?.full_name ?? user.email ?? "U")[0].toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[#e21116] group-hover:bg-[#b50d11] transition-colors duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Medi<span className="text-[#e21116]">Run</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#e21116] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#e21116] hover:bg-red-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: auth + CTA */}
          <div className="flex items-center gap-3">
            {/* Order Now CTA */}
            <Link
              href="/products"
              id="navbar-order-now"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e21116] text-white text-sm font-semibold hover:bg-[#b50d11] active:scale-95 transition-all duration-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              Order Now
            </Link>

            {/* Auth section */}
            {!loading && (
              user ? (
                /* User Avatar + dropdown */
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    id="navbar-user-avatar"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-full bg-[#e21116] text-white font-bold text-sm flex items-center justify-center hover:bg-[#b50d11] transition-colors shadow-sm border-2 border-white ring-2 ring-[#e21116]/30"
                  >
                    {userInitial}
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-xs text-gray-500 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {user.user_metadata?.full_name ?? user.email}
                        </p>
                      </div>
                      {/* Menu items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#e21116] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                          My Profile
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#e21116] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                          My Orders
                        </Link>
                        <Link
                          href="/tracking"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-[#e21116] transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          Track Order
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-2">
                        <button
                          id="navbar-signout-btn"
                          onClick={handleSignOut}
                          disabled={signingOut}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                          </svg>
                          {signingOut ? "Signing out..." : "Sign Out"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Login / Signup buttons */
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/login"
                    id="navbar-login-btn"
                    className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#e21116] hover:bg-red-50 rounded-xl transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    id="navbar-signup-btn"
                    className="px-4 py-2 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )
            )}

            {/* Hamburger */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1" id="navbar-mobile-menu">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-[#e21116] text-white" : "text-gray-600 hover:bg-red-50 hover:text-[#e21116]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-[#e21116] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold text-center"
              >
                Create Account
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-[#e21116] transition-colors"
              >
                👤 My Profile & Orders
              </Link>
              <button
                onClick={() => { setMenuOpen(false); handleSignOut(); }}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </>
          )}

          <Link
            href="/products"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 rounded-xl bg-[#e21116] text-white text-sm font-semibold text-center"
          >
            Order Now — Emergency Delivery
          </Link>
        </div>
      )}
    </header>
  );
}
