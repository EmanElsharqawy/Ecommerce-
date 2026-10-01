"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { FaHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/footer";

import {
  removeFromWishlist,
  clearWishlist,
} from "@/Redux/Slice/wishlistSlice";

import { addToCart } from "@/Redux/Slice/productCartSlice";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  // Remove product from wishlist
  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  // Clear wishlist
  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="container mx-auto">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {wishlist.length}{" "}
                {wishlist.length === 1
                  ? "product"
                  : "products"}{" "}
                in your wishlist
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                type="button"
                onClick={handleClearWishlist}
                className="w-fit rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {/* Empty Wishlist */}
          {wishlist.length === 0 && (
            <div className="flex min-h-[450px] flex-col items-center justify-center rounded-xl bg-white text-center shadow-sm">
              <FaHeart
                className="mb-5 text-gray-300"
                size={55}
              />

              <h2 className="text-2xl font-bold text-gray-800">
                Your Wishlist is Empty
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                You haven't added any products to
                your wishlist yet.
              </p>

              <Link
                href="/"
                className="mt-6 rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {/* Wishlist Products */}
          {wishlist.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-56 bg-gray-100">
                    <Link
                      href={`/product/${product.id}`}
                      className="block h-full"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    {/* Remove Heart */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(product.id)
                      }
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                    >
                      <FaHeart size={17} />
                    </button>
                  </div>

                  {/* Product Information */}
                  <div className="p-4">
                    <Link
                      href={`/product/${product.id}`}
                    >
                      <h2 className="line-clamp-1 text-base font-semibold text-gray-900 hover:text-blue-600">
                        {product.title}
                      </h2>
                    </Link>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                      {product.description}
                    </p>

                    {/* Price + Rating */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>

                      {product.rating && (
                        <span className="text-sm text-yellow-500">
                          ★ {product.rating}
                        </span>
                      )}
                    </div>

                    {/* Add To Cart */}
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                      <BsCartPlus size={18} />

                      Add to Cart
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(product.id)
                      }
                      className="mt-3 w-full text-sm font-medium text-red-500 transition hover:text-red-700"
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}