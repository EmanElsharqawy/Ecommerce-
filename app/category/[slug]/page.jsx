"use client";

import {
  use,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Link from "next/link";

import { getProductCtegory } from "@/Redux/Slice/categorySlice";
import { addToCart } from "@/Redux/Slice/productCartSlice";
import { toggleWishlist } from "@/Redux/Slice/wishlistSlice";

import Navbar from "@/app/component/navbar";
import Footer from "@/app/component/footer";
import Header from "@/app/component/header";

import { IoStarSharp } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Category({ params }) {
  const dispatch = useDispatch();

  // ===============================
  // State
  // ===============================

  const [sortPrice, setSortPrice] = useState("");

  // ===============================
  // Redux - Category
  // ===============================

  const {
    productsByCategory,
    pendingSlugs,
  } = useSelector(
    (state) => state.categories
  );

  // ===============================
  // Redux - Wishlist
  // ===============================

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  // ===============================
  // Params
  // ===============================

  const { slug } = use(params);

  // ===============================
  // Products
  // ===============================

  const products =
    productsByCategory[slug] || [];

  const isLoading =
    pendingSlugs.includes(slug);

  // ===============================
  // Get Products
  // ===============================

  useEffect(() => {
    if (slug) {
      dispatch(
        getProductCtegory(slug)
      );
    }
  }, [dispatch, slug]);

  // ===============================
  // Sort Products
  // ===============================

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortPrice === "asc") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortPrice === "desc") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [products, sortPrice]);

  // ===============================
  // Add To Cart
  // ===============================

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  // ===============================
  // Wishlist
  // ===============================

  const handleWishlist = (product) => {
    dispatch(
      toggleWishlist(product)
    );
  };

  // ===============================
  // Check Wishlist
  // ===============================

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return (
    <>
      {/* ===============================
          Navbar + Header
      =============================== */}

      <header>
        <Navbar />
        <Header />
      </header>

      {/* ===============================
          Category Section
      =============================== */}

      <section className="container mx-auto px-4 py-8">

        {/* ===============================
            Category Header
        =============================== */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl font-bold capitalize text-gray-900 sm:text-3xl">
              {slug}
            </h1>

            {!isLoading &&
              products.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  {products.length} products
                </p>
              )}
          </div>

          {/* ===============================
              Sort
          =============================== */}

          <div className="flex items-center gap-3">

            <label
              htmlFor="sortPrice"
              className="text-sm font-medium text-gray-700"
            >
              Sort by:
            </label>

            <select
              id="sortPrice"
              value={sortPrice}
              onChange={(e) =>
                setSortPrice(
                  e.target.value
                )
              }
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-black"
            >
              <option value="">
                Default
              </option>

              <option value="asc">
                Price: Low to High
              </option>

              <option value="desc">
                Price: High to Low
              </option>
            </select>

          </div>
        </div>

        {/* ===============================
            Loading
        =============================== */}

        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">

            <div className="flex flex-col items-center gap-3">

              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

              <p className="text-sm text-gray-500">
                Loading products...
              </p>

            </div>

          </div>
        )}

        {/* ===============================
            Products
        =============================== */}

        {!isLoading &&
          sortedProducts.length > 0 && (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {sortedProducts.map(
                (product) => {

                  const inWishlist =
                    isInWishlist(
                      product.id
                    );

                  return (
                    <Card
                      key={product.id}
                      className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >

                      {/* ===============================
                          Product Image
                      =============================== */}

                      <CardHeader
                        floated={false}
                        shadow={false}
                        className="relative m-0 h-60 overflow-hidden rounded-none"
                      >

                        <Link
                          href={`/product/${product.id}`}
                          className="block h-full"
                        >
                          <img
                            src={
                              product.thumbnail
                            }
                            alt={
                              product.title
                            }
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          />
                        </Link>

                        {/* ===============================
                            Wishlist Button
                        =============================== */}

                        <button
                          type="button"
                          onClick={() =>
                            handleWishlist(
                              product
                            )
                          }
                          aria-label={
                            inWishlist
                              ? "Remove from wishlist"
                              : "Add to wishlist"
                          }
                          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition ${
                            inWishlist
                              ? "hover:bg-red-50"
                              : "hover:bg-gray-100"
                          }`}
                        >

                          <CiHeart
                            size={27}
                            className={`transition ${
                              inWishlist
                                ? "text-red-500"
                                : "text-gray-700 hover:text-red-500"
                            }`}
                          />

                        </button>

                        {/* ===============================
                            Discount
                        =============================== */}

                        {product.discountPercentage && (
                          <span className="absolute left-3 top-3 rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
                            -
                            {Math.round(
                              product.discountPercentage
                            )}
                            %
                          </span>
                        )}

                      </CardHeader>

                      {/* ===============================
                          Product Information
                      =============================== */}

                      <CardBody className="p-5">

                        {/* Product Title */}

                        <Link
                          href={`/product/${product.id}`}
                          className="block"
                        >
                          <Typography
                            variant="h6"
                            className="mb-2 line-clamp-1 text-gray-900 transition hover:text-gray-600"
                          >
                            {product.title}
                          </Typography>
                        </Link>

                        {/* Description */}

                        <p className="mb-4 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                          {
                            product.description
                          }
                        </p>

                        {/* Rating */}

                        <div className="mb-4 flex items-center gap-2">

                          <IoStarSharp className="text-yellow-400" />

                          <span className="text-sm font-semibold text-gray-700">
                            {product.rating}
                          </span>

                        </div>

                        {/* Price + Stock */}

                        <div className="flex items-center justify-between">

                          <span className="text-xl font-bold text-gray-900">
                            ${product.price}
                          </span>

                          {product.stock && (
                            <span className="text-xs text-green-600">
                              {
                                product.stock
                              }{" "}
                              left
                            </span>
                          )}

                        </div>

                      </CardBody>

                      {/* ===============================
                          Add To Cart
                      =============================== */}

                      <CardFooter className="px-5 pb-5 pt-0">

                        <Button
                          fullWidth
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                          className="rounded-lg bg-black normal-case transition hover:bg-gray-800"
                        >
                          Add to Cart
                        </Button>

                      </CardFooter>

                    </Card>
                  );
                }
              )}

            </div>
          )}

        {/* ===============================
            No Products
        =============================== */}

        {!isLoading &&
          sortedProducts.length === 0 && (

            <div className="flex min-h-[400px] items-center justify-center">

              <div className="text-center">

                <h2 className="mb-2 text-xl font-bold text-gray-800">
                  No Products Found
                </h2>

                <p className="text-sm text-gray-500">
                  There are no products available in this category.
                </p>

              </div>

            </div>
          )}

      </section>

      {/* ===============================
          Footer
      =============================== */}

      <Footer />
    </>
  );
}