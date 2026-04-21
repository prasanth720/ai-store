"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  // ✅ Hide footer on login page
  if (pathname.includes("/login")) return null;

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main row */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-white/10">

          {/* Brand + Nav */}
          <div className="flex items-center gap-8 flex-wrap">
            <span className="text-sm font-medium tracking-wide">AI Store</span>
            <nav className="flex gap-5">
              {[ "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                  className="text-[13px] text-white/40 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact + Socials */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/35 hidden sm:block">
              support@aistore.com
            </span>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between flex-wrap gap-2 py-2.5">
          <span className="text-[11px] text-white/25">
            © {new Date().getFullYear()} AI Store
          </span>
          <span className="text-[11px] text-white/25">+91 9876543210</span>
        </div>

      </div>
    </footer>
  );
}