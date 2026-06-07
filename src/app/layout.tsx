import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MediRun — On-Demand Medical Equipment Delivery",
  description:
    "Get life-saving medical equipment delivered to your doorstep in minutes. MediRun is India's fastest medical emergency delivery platform.",
  keywords: "medical equipment delivery, emergency medical, oxygen cylinder, wheelchair rental, medical on demand",
  openGraph: {
    title: "MediRun — On-Demand Medical Equipment Delivery",
    description: "Get life-saving medical equipment delivered in minutes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
