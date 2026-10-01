"use client";

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/Redux/Slice/productCartSlice";

import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/footer";

export default function CartPage() {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.productCart.cart
  );

  // ===============================
  // Total Items
  // ===============================

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // ===============================
  // Total Price
  // ===============================

  const totalPrice = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  return (
    <>
   <Navbar  />

      <main className="container mx-auto min-h-screen px-4 py-10">
        {/* ===============================
            Header
        =============================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-gray-500">
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* ===============================
            Empty Cart
        =============================== */}

        {cart.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <h2 className="mb-3 text-2xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="mb-6 text-gray-500">
              You haven't added any products yet.
            </p>

            <Link
              href="/"
              className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* ===============================
            Cart Content
        =============================== */}

        {cart.length > 0 && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* ===============================
                Products
            =============================== */}

            <div className="space-y-4 lg:col-span-2">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  {/* Product Image */}

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-28 w-full rounded-lg object-cover sm:h-28 sm:w-28"
                  />

                  {/* Product Info */}

                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-900">
                      {product.title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      ${product.price}
                    </p>

                    {/* Quantity */}

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            decreaseQuantity(product.id)
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-lg transition hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="min-w-[25px] text-center font-semibold">
                        {product.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            increaseQuantity(product.id)
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-lg transition hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Product Total + Remove */}

                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                    <span className="font-bold text-gray-900">
                      $
                      {(
                        product.price *
                        product.quantity
                      ).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          removeFromCart(product.id)
                        )
                      }
                      className="text-sm font-medium text-red-500 transition hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}

              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="text-sm font-medium text-red-500 transition hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            {/* ===============================
                Order Summary
            =============================== */}

            <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Items */}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Items
                  </span>

                  <span className="font-medium">
                    {totalItems}
                  </span>
                </div>

                {/* Subtotal */}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Total */}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout */}

                <button
                  type="button"
                  className="mt-4 w-full rounded-lg bg-black py-3 font-medium text-white transition hover:bg-gray-800"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}