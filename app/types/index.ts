export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  createdAt: string;
}

export interface Category {
  name: string;        // ✅ consistent with UI
  products: Product[];
}