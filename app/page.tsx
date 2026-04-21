import Link from "next/link";
import ProductCard from "./components/product/ProductCard";
import { getCategories } from "./lib/data";
import { Category } from "./types";

export default function HomePage() {
  const categories: Category[] = getCategories();

  return (
    <>
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Mulish:wght@400;500;600&display=swap');

    .fc-wrap { font-family: 'Mulish', sans-serif; }

    .fc-page-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(22px, 3vw, 30px);
      font-weight: 800;
      color: #0d0d0d;
      letter-spacing: -0.02em;
      margin: 0 0 32px;
    }
    .fc-page-title span { color: #f5a623; }

    .fc-section { margin-bottom: 48px; }

    .fc-sec-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .fc-sec-title {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #0d0d0d;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .fc-sec-title::before {
      content: '';
      display: block;
      width: 18px;
      height: 3px;
      background: #f5a623;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .fc-view-all {
      font-size: 11px;
      font-weight: 600;
      color: #999;
      text-decoration: none;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .fc-view-all:hover { color: #f5a623; }

    .fc-scroll-outer { position: relative; }
    .fc-scroll-outer::after {
      content: '';
      position: absolute;
      right: 0; top: 0; bottom: 12px;
      width: 56px;
      background: linear-gradient(to left, #f8f7f4, transparent);
      pointer-events: none;
      z-index: 2;
    }
    .fc-scroll {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      padding-bottom: 12px;
      scrollbar-width: none;
    }
    .fc-scroll::-webkit-scrollbar { display: none; }

    .fc-card-wrap {
      flex-shrink: 0;
      width: 210px;
    }
    .fc-card-inner {
      background: #fff;
      border-radius: 14px;
      border: 1px solid #ece9e3;
      overflow: hidden;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .fc-card-inner:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(0,0,0,0.08);
    }

    @media (max-width: 768px) {
      .fc-card-wrap { width: 180px; }
      .fc-page-title { margin-bottom: 24px; }
    }
  `}</style>

  <div className="fc-wrap">

    <h1 className="fc-page-title">
      Featured <span>Categories</span>
    </h1>

    {categories.map((category) => (
      <section key={category.name} className="fc-section">

        <div className="fc-sec-head">
          <span className="fc-sec-title">{category.name}</span>
          <Link href={`/products?category=${category.name}`} className="fc-view-all">
            View all →
          </Link>
        </div>

        <div className="fc-scroll-outer">
          <div className="fc-scroll">
            {category.products.slice(0, 5).map((product: { id: any }) => (
              <div key={product.id} className="fc-card-wrap">
                <div className="fc-card-inner">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    ))}

  </div>
</>
  );
}