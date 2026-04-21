
"use client";

import Image from "next/image";
import { useCartStore } from "@/app/store/cartStore";
import toast from "react-hot-toast";
export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Your Cart
      </h1>

      {/* Empty State */}
      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            Your cart is empty 🛒
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                
                <div className="relative w-20 h-20 bg-gray-100 rounded">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-500 text-sm">
                    ₹ {item.price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 mt-3 md:mt-0">
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>

                <span className="font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>

              </div>

              {/* Price */}
              <div className="mt-3 md:mt-0 font-semibold">
                ₹ {item.price * item.quantity}
              </div>

              {/* Remove */}
              <button
  onClick={() => {
    removeFromCart(item.id);
    toast.error(`${item.title} removed from cart ❌`);
  }}
  className="text-red-500 text-sm mt-2 md:mt-0"
>
  Remove
</button>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <h2 className="text-lg font-semibold">Total</h2>
            <h2 className="text-xl font-bold">₹ {total}</h2>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded font-semibold mt-4">
            Proceed to Checkout
          </button>

        </div>
      )}
    </div>
  );
}