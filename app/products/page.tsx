"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "../components/product/ProductCard";
import { products } from "../lib/data";
import { Product } from "../types";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const params = useSearchParams();
  const router = useRouter();

  const searchParam = params.get("search") || "";
  const categoryParam = params.get("category") || "all";

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, []);

const filteredProducts: Product[] = useMemo(() => {
  let result = [...products];

  const query = (searchParam || search).toLowerCase().trim();

  if (query) {
    result = result.filter((p) => {
      return (
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.price.toString().includes(query) ||
        p.rating.toString().includes(query)
      );
    });
  }

  if (categoryParam !== "all") {
    result = result.filter((p) => p.category === categoryParam);
  }

  if (sort === "price_low") result.sort((a, b) => a.price - b.price);
  else if (sort === "price_high") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

  return result;
}, [search, searchParam, categoryParam, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const handleCategoryChange = (cat: string) => {
    router.push(`/products?category=${cat}`);
    setPage(1);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Mulish:wght@300;400;500;600&display=swap');

        .pp-wrap { min-height: 100vh; background: #f8f7f4; font-family: 'Mulish', sans-serif; }

        /* HEADER */
        .pp-header { background: #0d0d0d; padding: 40px 40px 36px; position: relative; overflow: hidden; }
        .pp-header::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 80% at 10% 50%, rgba(245,166,35,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .pp-header-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .pp-header-inner { position: relative; z-index: 2; max-width: 1280px; margin: 0 auto; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .pp-eyebrow { font-family: 'Courier New', monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.3em; color: #f5a623; text-transform: uppercase; margin-bottom: 6px; }
        .pp-title { font-family: 'Syne', sans-serif; font-size: clamp(26px, 4vw, 38px); font-weight: 800; color: #fff; letter-spacing: -0.02em; line-height: 1.1; margin: 0; }
        .pp-count-badge { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 5px 14px; }
        .pp-count-badge strong { color: #f5a623; }

        /* FILTER BAR */
        .pp-filter-bar {
          background: #fff; border-bottom: 1px solid #ece9e3;
          padding: 14px 40px;
          position: sticky; top: 0; z-index: 50;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .pp-filter-inner { max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }

        /* Search */
        .pp-search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 340px; }
        .pp-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #bbb; }
        .pp-search-input { width: 100%; padding: 9px 12px 9px 34px; border: 1.5px solid #e5e3de; border-radius: 10px; font-family: 'Mulish', sans-serif; font-size: 13px; color: #1a1a1a; background: #fafaf8; outline: none; transition: all 0.2s; box-sizing: border-box; }
        .pp-search-input::placeholder { color: #c5c2bc; }
        .pp-search-input:focus { border-color: #f5a623; background: #fff; box-shadow: 0 0 0 3px rgba(245,166,35,0.1); }

        /* Right controls */
        .pp-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .pp-select-wrap { position: relative; }
        .pp-select-wrap svg { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; }
        .pp-select {
          appearance: none;
          padding: 9px 30px 9px 12px;
          border: 1.5px solid #e5e3de; border-radius: 10px;
          font-family: 'Mulish', sans-serif; font-size: 13px; font-weight: 500;
          color: #444; background: #fafaf8; outline: none; cursor: pointer;
          transition: all 0.2s; white-space: nowrap;
        }
        .pp-select:focus { border-color: #f5a623; background: #fff; box-shadow: 0 0 0 3px rgba(245,166,35,0.1); }

        /* CONTENT */
        .pp-content { max-width: 1280px; margin: 0 auto; padding: 25px 25px 25px; }
        .pp-results-info { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .pp-results-text { font-size: 13px; color: #999; }
        .pp-results-text strong { color: #1a1a1a; font-weight: 600; }

        /* Empty */
        .pp-empty { text-align: center; padding: 72px 24px; background: #fff; border-radius: 16px; border: 1px solid #ece9e3; }
        .pp-empty-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 12px 0 6px; }
        .pp-empty-sub { font-size: 13px; color: #aaa; margin: 0; }

        /* Grid */
        .pp-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

        /* Pagination */
        .pp-pagination { display: flex; justify-content: center; align-items: center; gap: 5px; margin-top: 44px; flex-wrap: wrap; }
        .pp-page-btn { min-width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #e5e3de; border-radius: 9px; background: #fff; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; color: #555; cursor: pointer; transition: all 0.2s; padding: 0 10px; }
        .pp-page-btn:hover { border-color: #f5a623; color: #f5a623; }
        .pp-page-btn.active { background: #0d0d0d; border-color: #0d0d0d; color: #fff; }
        .pp-page-ellipsis { font-size: 13px; color: #ccc; padding: 0 2px; display: flex; align-items: center; }

        @media (max-width: 1100px) { .pp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .pp-header, .pp-filter-bar, .pp-content { padding-left: 20px; padding-right: 20px; }
          .pp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 480px) {
          .pp-grid { grid-template-columns: 1fr; }
          .pp-search-wrap { max-width: 100%; min-width: 100%; }
          .pp-filter-inner { flex-direction: column; align-items: stretch; }
          .pp-controls { justify-content: flex-end; }
        }
      `}</style>

      <div className="pp-wrap">

        {/* CONTENT */}
        <div className="pp-content">
          {paginatedProducts.length === 0 ? (
            <div className="pp-empty">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" style={{ margin: "0 auto" }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <h3 className="pp-empty-title">No products found</h3>
              <p className="pp-empty-sub">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
             <h1 className="text-lg sm:text-xl md:text-2xl font-semibold capitalize">
  {searchParam
    ? `Search: ${searchParam}`
    : categoryParam !== "all"
    ? `Category: ${categoryParam}`
    : "All Products"}
</h1>
{/* LEFT: Results Info */}
<p className="text-sm text-gray-600 dark:text-gray-400">
  Showing{" "}
  <strong>
    {(page - 1) * ITEMS_PER_PAGE + 1}–
    {Math.min(page * ITEMS_PER_PAGE, filteredProducts.length)}
  </strong>{" "}
  of <strong>{filteredProducts.length}</strong> products
</p>

{/* RIGHT: Filters */}
<div className="flex flex-col sm:flex-row gap-3 sm:items-center">

  {/* Category */}
  <div className="relative">
    <select
      className="border rounded px-3 py-2 pr-8 text-sm appearance-none bg-white dark:bg-gray-800"
      value={categoryParam}
      onChange={(e) => handleCategoryChange(e.target.value)}
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat === "all"
            ? "All categories"
            : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>

    {/* Arrow */}
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      ▼
    </span>
  </div>

  {/* Sort */}
  <div className="relative">
    <select
      className="border rounded px-3 py-2 pr-8 text-sm appearance-none bg-white dark:bg-gray-800"
      value={sort}
      onChange={(e) => {
        setSort(e.target.value);
        setPage(1);
      }}
    >
      <option value="">Default order</option>
      <option value="price_low">Price: low → high</option>
      <option value="price_high">Price: high → low</option>
      <option value="rating">Top rated</option>
    </select>

    {/* Arrow */}
    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
      ▼
    </span>
  </div>

</div>
</div>

              <div className="pp-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pp-pagination">
                  <button
                    className="pp-page-btn"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{ opacity: page === 1 ? 0.35 : 1, pointerEvents: page === 1 ? "none" : "auto" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const p = i + 1;
                    const nearCurrent = Math.abs(p - page) <= 1;
                    const isEdge = p === 1 || p === totalPages;
                    if (!nearCurrent && !isEdge) {
                      if (p === 2 || p === totalPages - 1) return <span key={p} className="pp-page-ellipsis">…</span>;
                      return null;
                    }
                    return (
                      <button key={p} className={`pp-page-btn${page === p ? " active" : ""}`} onClick={() => setPage(p)}>
                        {p}
                      </button>
                    );
                  })}

                  <button
                    className="pp-page-btn"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{ opacity: page === totalPages ? 0.35 : 1, pointerEvents: page === totalPages ? "none" : "auto" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </>
  );
}