"use client";

import { useCartStore } from "@/app/store/cartStore";
import { Product } from "@/app/types/index";
import Link from "@/node_modules/next/link";
import Image from "next/image";
import toast from "react-hot-toast";
export default function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);

  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition flex flex-col">

      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
      <div className="cursor-pointer relative w-full h-32 sm:h-40 md:h-44 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-2"
        />
      </div>
 </Link>
   

      {/* Content */}
      <div className="mt-3 flex flex-col flex-grow">

        {/* Title */}
        <h2 className="text-sm sm:text-base font-medium line-clamp-2">
          {product.title}
        </h2>
        <span className="text-[11px] leading-tight">
  {product.description}
</span>        {/* Price */}
        <p className="text-sm sm:text-base font-semibold mt-1">
          ₹ {product.price}
        </p>

    {/* Buttons */}
<div className="mt-auto flex gap-2">

{/* Add to Cart */}
<button 
  onClick={() => {
    addToCart(product);
    toast.success(`${product.title} added to cart 🛒`);
  }}
  className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs sm:text-sm p-2 rounded font-medium"
>
  Add to Cart
</button>

</div>





      </div>
    </div>
  );
}