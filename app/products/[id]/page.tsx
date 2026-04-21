
"use client";
import { getProductById } from "@/app/lib/data";
import { useParams } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";



export default function ProductPage() {
 
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const params = useParams();
  const product = getProductById(params.id);
  const addToCart = useCartStore((s:any) => s.addToCart);
  const handleAddToCart = () => {
    addToCart(product);  
    setAddedToCart(true);
  
    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    
  };

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
 

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Mulish:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; scroll-behavior: smooth; }
        body {
          font-family: 'Mulish', sans-serif;
          background: #f8f7f4;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
        }

        /* ── NAV ── */
        .pd-nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(16px);
          border-bottom: 1px solid #ece9e3;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 64px;
        }
        .pd-nav-logo {
          font-family: 'Courier New', monospace; font-size: 20px;
          font-weight: 700; letter-spacing: 0.3em; color: #1a1a1a;
          display: flex; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .pd-nav-logo span { color: #f5a623; }
        .pd-breadcrumb {
          font-size: 12px; color: #999; display: flex; align-items: center; gap: 6px;
        }
        .pd-breadcrumb a { color: #999; text-decoration: none; }
        .pd-breadcrumb a:hover { color: #f5a623; }
        .pd-breadcrumb-sep { color: #ccc; }
        .pd-nav-actions { display: flex; align-items: center; gap: 16px; }
        .pd-icon-btn {
          background: none; border: none; cursor: pointer;
          color: #555; display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 50%;
          transition: background 0.2s, color 0.2s;
        }
        .pd-icon-btn:hover { background: #f0ede8; color: #1a1a1a; }
        .pd-cart-badge {
          position: relative;
        }
        .pd-badge {
          position: absolute; top: -4px; right: -4px;
          width: 17px; height: 17px; background: #f5a623;
          border-radius: 50%; font-size: 10px; font-weight: 700;
          color: #fff; display: flex; align-items: center; justify-content: center;
        }

        /* ── PAGE ── */
        .pd-page { max-width: 1280px; margin: 0 auto; padding: 40px 40px 80px; }

        /* ── PRODUCT GRID ── */
        .pd-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
        }

        /* ── IMAGE PANEL ── */
        .pd-img-panel { position: sticky; top: 84px; }
        .pd-img-main {
          position: relative; background: #fff;
          border-radius: 20px; overflow: hidden;
          aspect-ratio: 1/1; margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
        }
        .pd-img-main img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease;
        }
        .pd-img-main:hover img { transform: scale(1.04); }
        .pd-badge-tag {
          position: absolute; top: 16px; left: 16px; z-index: 2;
          background: #f5a623; color: #fff; font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          padding: 5px 12px; border-radius: 20px; text-transform: uppercase;
        }
        .pd-discount-tag {
          position: absolute; top: 16px; right: 16px; z-index: 2;
          background: #0d0d0d; color: #f5a623; font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: 20px;
        }
        .pd-thumbs { display: flex; gap: 10px; }
        .pd-thumb {
          flex: 1; aspect-ratio: 1/1; border-radius: 12px; overflow: hidden;
          cursor: pointer; border: 2px solid transparent;
          transition: border-color 0.2s, transform 0.2s;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .pd-thumb:hover { transform: translateY(-2px); }
        .pd-thumb.active { border-color: #f5a623; }
        .pd-thumb img { width: 100%; height: 100%; object-fit: cover; }

        /* ── INFO PANEL ── */
        .pd-info { display: flex; flex-direction: column; gap: 0; }
        .pd-brand {
          font-family: 'Courier New', monospace; font-size: 11px;
          font-weight: 700; letter-spacing: 0.25em; color: #f5a623;
          text-transform: uppercase; margin-bottom: 10px;
        }
        .pd-name {
          font-family: 'Syne', sans-serif; font-size: clamp(26px, 3vw, 38px);
          font-weight: 800; color: #0d0d0d; line-height: 1.1;
          margin-bottom: 10px; letter-spacing: -0.02em;
        }
        .pd-tagline {
          font-size: 14px; color: #888; font-weight: 400;
          margin-bottom: 18px; font-style: italic;
        }

        /* Rating */
        .pd-rating-row {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 22px; padding-bottom: 22px;
          border-bottom: 1px solid #ece9e3;
        }
        .pd-stars { display: flex; gap: 2px; }
        .pd-rating-num { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; }
        .pd-review-count { font-size: 13px; color: #aaa; }
        .pd-verified {
          margin-left: auto; font-size: 11px; color: #22c55e;
          font-weight: 600; display: flex; align-items: center; gap: 4px;
        }

        /* Price */
        .pd-price-block { margin-bottom: 22px; }
        .pd-price-row { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
        .pd-price {
          font-family: 'Syne', sans-serif; font-size: 36px;
          font-weight: 800; color: #0d0d0d; letter-spacing: -0.02em;
        }
        .pd-original {
          font-size: 18px; color: #bbb; text-decoration: line-through; font-weight: 400;
        }
        .pd-save {
          background: #fef3e2; color: #d97706;
          font-size: 12px; font-weight: 700; padding: 3px 10px;
          border-radius: 20px; letter-spacing: 0.04em;
        }
        .pd-tax-note { font-size: 12px; color: #aaa; margin-top: 4px; }

        /* Offers */
        .pd-offers {
          background: #fafaf8; border: 1px solid #ece9e3;
          border-radius: 14px; padding: 14px 18px; margin-bottom: 24px;
        }
        .pd-offers-title {
          font-family: 'Syne', sans-serif; font-size: 12px;
          font-weight: 700; color: #555; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 10px;
        }
        .pd-offer-item {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13px; color: #444; line-height: 1.5; margin-bottom: 6px;
        }
        .pd-offer-item:last-child { margin-bottom: 0; }
        .pd-offer-dot {
          width: 6px; height: 6px; background: #f5a623;
          border-radius: 50%; flex-shrink: 0; margin-top: 6px;
        }

        /* Color */
        .pd-section-label {
          font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em; color: #555;
          margin-bottom: 10px;
        }
        .pd-colors { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; }
        .pd-color-btn {
          width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
          border: 3px solid transparent; outline: 2px solid transparent;
          transition: all 0.2s; position: relative;
        }
        .pd-color-btn.active { outline: 2px solid #f5a623; outline-offset: 3px; }
        .pd-color-name {
          font-size: 12px; color: #888; margin-top: -16px; margin-bottom: 24px;
        }

        /* Size */
        .pd-size-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
        .pd-size-guide { font-size: 12px; color: #f5a623; font-weight: 600; cursor: pointer; }
        .pd-sizes { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 6px; }
        .pd-size-btn {
          padding: 8px 14px; border: 1.5px solid #e5e3de; border-radius: 10px;
          font-family: 'Mulish', sans-serif; font-size: 13px; font-weight: 600;
          color: #444; background: #fff; cursor: pointer; transition: all 0.2s;
        }
        .pd-size-btn:hover { border-color: #f5a623; color: #f5a623; }
        .pd-size-btn.active {
          background: #0d0d0d; border-color: #0d0d0d; color: #fff;
        }
        .pd-size-error { font-size: 12px; color: #ef4444; margin-bottom: 16px; margin-top: 4px; }

        /* Quantity */
        .pd-qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
        .pd-qty-label { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #555; }
        .pd-qty-ctrl { display: flex; align-items: center; gap: 0; border: 1.5px solid #e5e3de; border-radius: 12px; overflow: hidden; }
        .pd-qty-btn {
          width: 38px; height: 38px; background: #fafaf8; border: none;
          font-size: 18px; cursor: pointer; color: #555; transition: background 0.15s;
          display: flex; align-items: center; justify-content: center; font-weight: 300;
        }
        .pd-qty-btn:hover { background: #f0ede8; }
        .pd-qty-num {
          width: 44px; text-align: center; font-family: 'Syne', sans-serif;
          font-size: 15px; font-weight: 700; color: #1a1a1a;
          border-left: 1.5px solid #e5e3de; border-right: 1.5px solid #e5e3de;
          line-height: 38px;
        }
        .pd-stock { font-size: 13px; color: #22c55e; font-weight: 600; margin-left: auto; display: flex; align-items: center; gap: 5px; }
        .pd-stock-dot { width: 7px; height: 7px; background: #22c55e; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

        /* CTA Buttons */
        .pd-cta { display: flex; gap: 12px; margin-bottom: 20px; }
        .pd-cart-btn {
          flex: 1; padding: 16px; border: 2px solid #0d0d0d;
          border-radius: 14px; background: #fff;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: 0.04em; color: #0d0d0d; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.25s ease;
        }
        .pd-cart-btn:hover { background: #0d0d0d; color: #fff; }
        .pd-cart-btn.added { background: #0d0d0d; color: #fff; border-color: #0d0d0d; }
        .pd-buy-btn {
          flex: 1.2; padding: 16px;
          background: linear-gradient(135deg, #f5a623 0%, #e8940f 100%);
          border: none; border-radius: 14px;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
          letter-spacing: 0.04em; color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(245,166,35,0.35);
        }
        .pd-buy-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(245,166,35,0.45); }
        .pd-buy-btn:active { transform: translateY(0); }

        .pd-wish-btn {
          width: 54px; height: 54px; border: 2px solid #e5e3de;
          border-radius: 14px; background: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease; flex-shrink: 0;
        }
        .pd-wish-btn:hover { border-color: #ef4444; }
        .pd-wish-btn.active { background: #fff1f2; border-color: #ef4444; }

        /* Delivery */
        .pd-delivery {
          display: flex; align-items: center; gap: 10px;
          background: #f0fdf4; border: 1px solid #bbf7d0;
          border-radius: 12px; padding: 12px 16px;
          font-size: 13px; color: #166534; font-weight: 500;
        }

        /* ── TABS ── */
        .pd-tabs { margin-top: 56px; }
        .pd-tab-bar {
          display: flex; gap: 0; border-bottom: 2px solid #ece9e3;
          margin-bottom: 32px; overflow-x: auto;
        }
        .pd-tab-btn {
          padding: 14px 28px; background: none; border: none;
          font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: #aaa; cursor: pointer; white-space: nowrap;
          border-bottom: 2px solid transparent; margin-bottom: -2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .pd-tab-btn.active { color: #0d0d0d; border-bottom-color: #f5a623; }

        /* Highlights */
        .pd-highlights { display: flex; flex-direction: column; gap: 12px; }
        .pd-hl-item {
          display: flex; align-items: flex-start; gap: 14px;
          background: #fff; border-radius: 14px; padding: 16px 20px;
          border: 1px solid #ece9e3;
        }
        .pd-hl-num {
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800;
          color: #f5a623; background: #fef3e2; border-radius: 8px;
          width: 28px; height: 28px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0;
        }
        .pd-hl-text { font-size: 14px; color: #333; line-height: 1.5; padding-top: 4px; }

        /* Specs table */
        .pd-specs-table { width: 100%; border-collapse: collapse; }
        .pd-specs-table tr { border-bottom: 1px solid #ece9e3; }
        .pd-specs-table tr:last-child { border-bottom: none; }
        .pd-specs-table td { padding: 14px 20px; font-size: 14px; }
        .pd-specs-table td:first-child {
          font-family: 'Syne', sans-serif; font-weight: 700; color: #888;
          text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em;
          width: 38%; background: #fafaf8;
        }
        .pd-specs-table td:last-child { color: #1a1a1a; font-weight: 500; }
        .pd-specs-table tr:first-child td:first-child { border-radius: 14px 0 0 0; }
        .pd-specs-table tr:first-child td:last-child { border-radius: 0 14px 0 0; }
        .pd-specs-table tr:last-child td:first-child { border-radius: 0 0 0 14px; }
        .pd-specs-table tr:last-child td:last-child { border-radius: 0 0 14px 0; }
        .pd-specs-wrap {
          border: 1px solid #ece9e3; border-radius: 14px; overflow: hidden;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .pd-grid { grid-template-columns: 1fr; gap: 36px; }
          .pd-img-panel { position: static; }
          .pd-page { padding: 24px 20px 60px; }
          .pd-nav { padding: 0 20px; }
          .pd-breadcrumb { display: none; }
        }
        @media (max-width: 560px) {
          .pd-cta { flex-wrap: wrap; }
          .pd-buy-btn, .pd-cart-btn { flex: 1 1 100%; }
          .pd-wish-btn { width: 100%; border-radius: 14px; }
          .pd-name { font-size: 26px; }
          .pd-price { font-size: 28px; }
          .pd-tab-btn { padding: 12px 18px; font-size: 11px; }
        }
      `}</style>

    
      {/* MAIN */}
      <div className="pd-page">
        <div className="pd-grid">

          {/* IMAGE PANEL */}
          <div className="pd-img-panel">
            <div className="pd-img-main">
              <span className="pd-badge-tag">{product.badge}</span>
              <span className="pd-discount-tag">−{product.discount}%</span>
              <img src={product.image} alt={product.title} />
            </div>

          </div>

          {/* INFO PANEL */}
          <div className="pd-info">
          <h1 className="pd-name">{product.title}</h1>
         
            {/* Price */}
            <div className="pd-price-block">
              <div className="pd-price-row">
                <span className="pd-price">{fmt(product.price)}</span>
                {/* <span className="pd-original">{fmt(product.originalPrice)}</span>
                <span className="pd-save">Save {fmt(product.originalPrice - product.price)}</span> */}
              </div>
              <p className="pd-tax-note">Inclusive of all taxes · Free returns within 30 days</p>
            </div>

            {/* Offers */}
            <div className="pd-offers">
              <div className="pd-offers-title">Available Offers</div>
              
            </div>

          
            <div className="pd-colors">
             
            </div>

            {/* Size */}
            <div className="pd-size-header">
              <div className="pd-section-label" style={{ margin: 0 }}>Select Size</div>
              <span className="pd-size-guide">Size Guide →</span>
            </div>
            <div className="pd-sizes" style={{ marginTop: 10 }}>
             
            </div>
          
            <div className="pd-qty-row" style={{ marginTop: 20 }}>
              <span className="pd-qty-label">Qty</span>
              <div className="pd-qty-ctrl">
                <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span className="pd-qty-num">{quantity}</span>
                <button className="pd-qty-btn" onClick={() => setQuantity(q => Math.min(10, q + 1))}>+</button>
              </div>
              {product.inStock && (
                <span className="pd-stock">
                  <span className="pd-stock-dot" /> In Stock
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="pd-cta">
              <button
                className={`pd-cart-btn${addedToCart ? " added" : ""}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button className="pd-buy-btn" onClick={handleBuyNow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Buy Now
              </button>
              <button
                className={`pd-wish-btn${wishlist ? " active" : ""}`}
                onClick={() => setWishlist(!wishlist)}
                title="Add to Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill={wishlist ? "#ef4444" : "none"}
                  stroke={wishlist ? "#ef4444" : "#999"} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Delivery */}
            <div className="pd-delivery">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              {product.delivery}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}