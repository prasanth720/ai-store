This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

# 🛍️ AI Store - Next.js Ecommerce Application

A modern, responsive ecommerce web application built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management.

---

## 🚀 Features

### 🏠 Core Pages
- Home Page (Featured categories)
- Products Listing (Search, Filter, Sort, Pagination)
- Product Detail Page
- Cart Page
- Login Page (Manual + Google UI)
- About / Contact Pages

---

### 🔍 Product Features
- Search across:
  - Title
  - Description
  - Category
  - Price
  - Rating
- Category filtering
- Sorting:
  - Price Low → High
  - Price High → Low
  - Rating
- Pagination support

---

### 🛒 Cart Features
- Add to cart
- Remove from cart
- Increase / decrease quantity
- Total price calculation
- Persistent cart (Zustand + localStorage)

---

### 🔐 Authentication
- Manual login (API based)
- Google login UI (mock)
- Zustand-based user state
- Route protection
- Auto redirect (login → home if already logged in)

---

### 🎨 UI/UX
- Fully responsive design (Mobile + Tablet + Desktop)
- Sticky navbar
- Dark / Light mode
- Profile dropdown menu
- Custom toast notifications

---

### ⚡ Performance
- Next.js Image Optimization
- Lazy loading
- Optimized rendering using `useMemo`

---

### 🔎 SEO Optimization
- Metadata (title, description)
- Dynamic SEO for product pages
- Clean URLs
- Image alt tags
- Sitemap & robots support

---

## 🏗️ Tech Stack

| Technology | Usage |
|----------|------|
| Next.js 14+ | App Router |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | State management |
| React Hooks | Logic |
| LocalStorage | Persistence |

---

## 📁 Folder Structure

app/
│
├── layout.tsx
├── page.tsx
│
├── products/
│ ├── page.tsx
│ └── [id]/page.tsx
│
├── cart/
│ └── page.tsx
│
├── login/
│ └── page.tsx
│
├── about/
│ └── page.tsx
│
├── contact/
│ └── page.tsx
│
├── api/
│ └── auth/
│ └── login/
│ └── route.ts
│
├── components/
│ ├── layout/
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ │
│ ├── product/
│ │ └── ProductCard.tsx
│ │
│ └── ui/
│ ├── Button.tsx
│ ├── Input.tsx
│ ├── Toast.tsx
│
│
├── store/
│ ├── cartStore.ts
│ └── userStore.ts
│
├── lib/
│ └── data.ts
│
├── types/
│ └── index.ts
│
└── styles/
└── globals.css

---

## 🔄 Application Workflow

### 🧭 Navigation Flow

---

### 🔍 Search Flow

1. User types in navbar search
2. Redirect:


3. Products page:
- Reads query using `useSearchParams`
- Filters products dynamically

---

### 🛒 Cart Flow

1. Click "Add to Cart"
2. Zustand updates global state
3. Cart persists via localStorage
4. Navbar updates cart count

---

### 🔐 Authentication Flow

1. User logs in
2. API returns token + user
3. Stored in localStorage
4. Zustand updated
5. Protected routes enabled

---

### 🔄 Filtering Logic

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repo

```bash
git clone https://github.com/prasanth720/ai-store.git
cd ai-store

npm install

npm run dev

http://localhost:3000

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
