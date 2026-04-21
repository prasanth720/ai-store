"use client";

import { products } from "@/app/lib/data";
import { Product } from "@/app/types/index";
import { useMemo, useState } from "react";


export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");

  // ✅ Unique categories
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, []);

  // ✅ Filter + Search + Sort
  const filteredProducts: Product[] = useMemo(() => {
    let result = [...products];

    // 🔍 Search
    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷️ Category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // 🔃 Sorting
    if (sort === "price_low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="space-y-6">

      {/* 🔍 Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price_low">Price: Low → High</option>
          <option value="price_high">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* 📦 Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found 😢
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}