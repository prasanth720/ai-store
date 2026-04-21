import { usePathname } from "@/node_modules/next/navigation";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AppProvider from "./components/providers/AppProvider";
import ToastProvider from "./components/providers/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Store",
  description: "Next.js ecommerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-black dark:bg-gray-900 dark:text-white transition ${geistSans.variable} ${geistMono.variable}`}
      >
        <AppProvider>
          <Navbar />
          <ToastProvider  />
          <main className="h-full overflow-y-auto max-w-7xl mx-auto p-4">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}