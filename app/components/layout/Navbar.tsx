"use client";

import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { usePathname } from "@/node_modules/next/navigation";
import { useUserStore } from "@/app/store/userStore";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/login" ) return null;
  const cart = useCartStore((s) => s.cart);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { user, logout } = useUserStore();
  const handleSearch = () => {
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-3 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
  <Image
    src="/images/logo.jpg"
    alt="AI Store"
    width={35}
    height={35}
    className="object-contain"
  />
  <span className="text-xl font-bold">AI Store</span>
</Link>

        {/* 🔍 Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-3 py-2 rounded-l bg-white text-black text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 text-black px-4 rounded-r hover:bg-yellow-500"
          >
            🔍
          </button>
        </div>

        {/* Mobile menu button */}
        <Button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </Button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center relative">

        <Link href="/products" className="flex items-center gap-1">
  📦 <span>Products</span>
</Link>
      <Link href="/components/cart" className="flex items-center gap-1 relative">
  🛒 <span>Cart</span>

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 rounded-full">
      {cart.length}
    </span>
  )}
</Link>

      {!user ? (
        <Link href="/login">Login</Link>
      ) : (
        <div className="relative">

          {/* Avatar */}
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center font-semibold"
          >
            {user.name?.charAt(0).toUpperCase()}
          </button>

          {/* Dropdown */}
          {open && (
  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2">

    <Link
      href="/profile"
      className="block px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
    >
      Profile
    </Link>

    <Link
      href="/settings"
      className="block px-3 py-2 text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
    >
      Settings
    </Link>

    <button
      onClick={() => {
        logout();
        router.push("/login");
      }}
      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
    >
      Logout
    </button>

  </div>
)}
        </div>
      )}
    </div>
      </div>

      {/* 📱 Mobile Search */}
      <div className="md:hidden mt-3 flex">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded-l bg-white text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 px-4 rounded-r text-black"
        >
          🔍
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="flex flex-col mt-3 gap-3 border-t border-gray-700 pt-3 md:hidden">
          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart ({cart.length})
          </Link>
          <Link href="/login" onClick={() => setOpen(false)}>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}