"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./profile.module.css";

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: "user" },
  { key: "settings", label: "Settings", icon: "settings" },
  { key: "orders", label: "Orders", icon: "orders" },
  { key: "wishlist", label: "Wishlist", icon: "heart" },
  { key: "payments", label: "Payments", icon: "card" },
];

function NavIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    orders: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    card: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
  };
  return (
    <svg className={styles.navIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]}
    </svg>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      className={`${styles.toggle} ${on ? styles.toggleOn : ""}`}
      onClick={() => setOn(!on)}
      type="button"
    />
  );
}

export default function ProfilePage() {
  const [activeNav, setActiveNav] = useState("profile");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Prasanth Sankurabothu",
    email: "prasanth.sankurabothu@gmail.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, India",
  });

  return (
    <div className={styles.wrap}>

      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◈</span>
          <span className={styles.logoText}>AI Store</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${activeNav === item.key ? styles.navItemActive : ""}`}
              onClick={() => setActiveNav(item.key)}
            >
              <NavIcon type={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

      
      </aside>

      {/* Main */}
      <main className={styles.main}>

        {/* Hero card */}
        <div className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroGrid} />
          <div className={styles.heroInner}>
            <div className={styles.avatar}>PS</div>
            <div className={styles.heroInfo}>
              <h1 className={styles.heroName}>{form.name}</h1>
              <p className={styles.heroEmail}>{form.email}</p>
              <span className={styles.heroBadge}>
                <span className={styles.badgeDot} />
                Premium Member
              </span>
            </div>
            <div className={styles.heroStats}>
              {[["24", "Orders"], ["8", "Wishlist"], ["4.8", "Rating"]].map(([num, lbl]) => (
                <div key={lbl} className={styles.statCard}>
                  <span className={styles.statNum}>{num}</span>
                  <span className={styles.statLbl}>{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>Personal Info</span>
            <button className={styles.editBtn} onClick={() => setEditing(!editing)}>
              {editing ? "Save" : "Edit"}
            </button>
          </div>
          <div className={styles.fields}>
            {(["name", "email", "phone", "location"] as const).map((key) => (
              <div key={key} className={styles.field}>
                <p className={styles.fieldLabel}>{key === "name" ? "Full Name" : key.charAt(0).toUpperCase() + key.slice(1)}</p>
                {editing ? (
                  <input
                    className={styles.fieldInput}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  />
                ) : (
                  <p className={styles.fieldVal}>{form[key]}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>Notifications</span>
          </div>
          <div className={styles.toggleList}>
            {[
              { title: "Order updates", sub: "Get notified on delivery status", on: true },
              { title: "Deals & offers", sub: "Weekly curated deals for you", on: true },
              { title: "Product restocks", sub: "Wishlist items back in stock", on: false },
            ].map((item) => (
              <div key={item.title} className={styles.toggleRow}>
                <div>
                  <p className={styles.toggleTitle}>{item.title}</p>
                  <p className={styles.toggleSub}>{item.sub}</p>
                </div>
                <Toggle defaultOn={item.on} />
              </div>
            ))}
          </div>
        </section>

        {/* Security */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionTitle}>Security</span>
            <button className={styles.editBtn}>Change password</button>
          </div>
          <div className={styles.toggleList}>
            {[
              { title: "Two-factor authentication", sub: "Secure your account with OTP", on: false },
              { title: "Login alerts", sub: "Email me on new sign-ins", on: true },
            ].map((item) => (
              <div key={item.title} className={styles.toggleRow}>
                <div>
                  <p className={styles.toggleTitle}>{item.title}</p>
                  <p className={styles.toggleSub}>{item.sub}</p>
                </div>
                <Toggle defaultOn={item.on} />
              </div>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section className={`${styles.section} ${styles.dangerSection}`}>
          <div className={`${styles.sectionHead} ${styles.dangerHead}`}>
            <span className={`${styles.sectionTitle} ${styles.dangerTitle}`}>Danger Zone</span>
          </div>
          <div className={styles.dangerZone}>
            <div>
              <p className={styles.dangerLabel}>Delete account</p>
              <p className={styles.dangerSub}>Permanently remove your data. This cannot be undone.</p>
            </div>
            <button className={styles.dangerBtn}>Delete account</button>
          </div>
        </section>

      </main>
    </div>
  );
}