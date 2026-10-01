"use client";

import React, {
  use,
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import Navbar from "@/app/component/navbar";
import Header from "@/app/component/header";
import Footer from "@/app/component/footer";

import {
  getProduct,
  addReview,
} from "@/Redux/Slice/productidslice";

import {
  addToCart,
} from "@/Redux/Slice/productCartSlice";

import {
  toggleWishlist,
} from "@/Redux/Slice/wishlistSlice";

import { FaHeart } from "react-icons/fa";

const Product = ({ params }) => {

  // ==========================================
  // GET ID
  // ==========================================

  const { id } = use(params);

  // ==========================================
  // REDUX
  // ==========================================

  const dispatch = useDispatch();

  const {
    product,
    loading,
    error,
  } = useSelector(
    (state) => state.productid
  );

  // ==========================================
  // WISHLIST
  // ==========================================

  const wishlist = useSelector(
    (state) => state.wishlist?.wishlist || []
  );

  // ==========================================
  // QUANTITY
  // ==========================================

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(0);

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  // ==========================================
  // REVIEW
  // ==========================================

  const [
    reviewName,
    setReviewName,
  ] = useState("");

  const [
    reviewText,
    setReviewText,
  ] = useState("");

  const [
    reviewRating,
    setReviewRating,
  ] = useState(5);

  // ==========================================
  // GET PRODUCT
  // ==========================================

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [dispatch, id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <>
        <Navbar />

        <Header />

        <main className="min-h-[500px]">

          <div className="flex min-h-[500px] items-center justify-center">

            <div className="text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500" />

              <p className="mt-4 text-sm text-gray-500">
                Loading product...
              </p>

            </div>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <>
        <Navbar />

        <Header />

        <main className="min-h-[500px]">

          <div className="flex min-h-[500px] items-center justify-center">

            <div className="text-center">

              <h2 className="text-2xl font-semibold text-red-500">
                Product Not Found
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                {error}
              </p>

            </div>

          </div>

        </main>

        <Footer />
      </>
    );
  }

  // ==========================================
  // NO PRODUCT
  // ==========================================

  if (!product) {
    return null;
  }

  // ==========================================
  // DISCOUNT
  // ==========================================

  const finalPrice =
    product.price -
    (product.price *
      product.discountPercentage) /
      100;

  // ==========================================
  // WISHLIST
  // ==========================================

  const isInWishlist = wishlist.some(
    (item) => item.id === product.id
  );

  // ==========================================
  // WISHLIST HANDLER
  // ==========================================

  const handleWishlist = () => {
    dispatch(
      toggleWishlist(product)
    );
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {

    dispatch(
      addToCart({
        ...product,

        // discounted price
        price: finalPrice,

        // selected quantity
        quantity: quantity,
      })
    );

    alert(
      `${quantity} item(s) added to cart`
    );
  };

  // ==========================================
  // REVIEW
  // ==========================================

  const handleSubmitReview = (e) => {

    e.preventDefault();

    if (!reviewName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a review");
      return;
    }

    const newReview = {
      rating: reviewRating,
      comment: reviewText,
      date: new Date().toISOString(),
      reviewerName: reviewName,
      reviewerEmail:
        "customer@example.com",
    };

    dispatch(
      addReview(newReview)
    );

    setReviewName("");
    setReviewText("");
    setReviewRating(5);

    alert(
      "Review submitted successfully!"
    );
  };

  return (
    <>
      <Navbar />

      <Header />

      <main className="bg-white">

        <section className="container mx-auto px-4 py-8">

          {/* ======================================
              BREADCRUMB
          ====================================== */}

          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">

            <span className="hover:text-green-500">
              Home
            </span>

            <span>/</span>

            <span className="hover:text-green-500">
              Products
            </span>

            <span>/</span>

            <span className="capitalize">
              {product.category}
            </span>

          </div>

          {/* ======================================
              PRODUCT
          ====================================== */}

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* ==================================
                LEFT
            ================================== */}

            <div className="flex gap-4">

              {/* THUMBNAILS */}

              <div className="flex w-20 flex-col gap-3">

                {product.images?.map(
                  (image, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          index
                        )
                      }
                      className={`flex h-20 w-20 items-center justify-center rounded-md border bg-white p-2 transition ${
                        selectedImage === index
                          ? "border-green-500"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >

                      <img
                        src={image}
                        alt={product.title}
                        className="h-full w-full object-contain"
                      />

                    </button>

                  )
                )}

              </div>

              {/* MAIN IMAGE */}

              <div className="flex min-h-[420px] flex-1 items-center justify-center rounded-md border border-gray-200 bg-white p-8">

                <img
                  src={
                    product.images?.[
                      selectedImage
                    ] ||
                    product.thumbnail
                  }
                  alt={product.title}
                  className="max-h-[390px] max-w-full object-contain"
                />

              </div>

            </div>

            {/* ==================================
                RIGHT
            ================================== */}

            <div>

              {/* BRAND */}

              <p className="text-sm text-gray-500">

                Brand:

                <span className="ml-1 font-medium text-gray-800">
                  {product.brand || "N/A"}
                </span>

              </p>

              {/* TITLE */}

              <h1 className="mt-2 text-2xl font-semibold leading-9 text-gray-900">
                {product.title}
              </h1>

              {/* RATING */}

              <div className="mt-3 flex items-center gap-3">

                <div className="text-lg">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (

                      <span
                        key={star}
                        className={
                          star <=
                          Math.round(
                            product.rating
                          )
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>

                    )
                  )}

                </div>

                <span className="text-sm text-gray-500">
                  {product.rating}
                </span>

              </div>

              <div className="my-5 border-t border-gray-200" />

              {/* PRICE */}

              <div className="flex flex-wrap items-center gap-3">

                <span className="text-2xl font-bold text-green-600">
                  $
                  {finalPrice.toFixed(2)}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  $
                  {product.price.toFixed(2)}
                </span>

                <span className="rounded bg-red-50 px-2 py-1 text-xs font-medium text-red-500">
                  {product.discountPercentage.toFixed(0)}
                  % OFF
                </span>

              </div>

              {/* STOCK */}

              <div className="mt-4 flex items-center gap-2 text-sm">

                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-gray-600">
                  In Stock:
                </span>

                <span className="font-medium text-gray-800">
                  {product.stock} Items
                </span>

              </div>

              {/* DESCRIPTION */}

              <p className="mt-5 text-sm leading-7 text-gray-500">
                {product.description}
              </p>

              {/* ==================================
                  QUANTITY + CART + WISHLIST
              ================================== */}

              <div className="mt-6 flex items-center gap-3">

                {/* QUANTITY */}

                <div className="flex h-11 items-center rounded-md border border-gray-300">

                  {/* MINUS */}

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.max(
                          1,
                          quantity - 1
                        )
                      )
                    }
                    disabled={quantity <= 1}
                    className="flex h-full w-10 items-center justify-center text-lg text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    −
                  </button>

                  {/* NUMBER */}

                  <span className="flex w-10 justify-center text-sm font-medium">
                    {quantity}
                  </span>

                  {/* PLUS */}

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        Math.min(
                          product.stock,
                          quantity + 1
                        )
                      )
                    }
                    disabled={
                      quantity >=
                      product.stock
                    }
                    className="flex h-full w-10 items-center justify-center text-lg text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>

                </div>

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={
                    handleAddToCart
                  }
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-green-500 px-6 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  🛒 Add to Cart
                </button>

                {/* WISHLIST */}

                <button
                  type="button"
                  onClick={
                    handleWishlist
                  }
                  aria-label={
                    isInWishlist
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className={`flex h-11 w-11 items-center justify-center rounded-md border transition ${
                    isInWishlist
                      ? "border-red-500 text-red-500 hover:bg-red-50"
                      : "border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500"
                  }`}
                >
                  <FaHeart size={20} />
                </button>

              </div>

              {/* ==================================
                  PRODUCT INFORMATION
              ================================== */}

              <div className="mt-7 grid grid-cols-2 gap-5 border-t border-gray-200 pt-5">

                <div>
                  <p className="text-xs text-gray-400">
                    SKU
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {product.sku}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Category
                  </p>

                  <p className="mt-1 text-sm font-medium capitalize text-gray-700">
                    {product.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Shipping
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {product.shippingInformation}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Warranty
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {product.warrantyInformation}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* ======================================
              DESCRIPTION
          ====================================== */}

          <div className="mt-14">

            <div className="flex gap-8 border-b border-gray-200">

              <button
                type="button"
                className="border-b-2 border-green-500 pb-3 text-sm font-semibold text-green-600"
              >
                Description
              </button>

              <button
                type="button"
                className="pb-3 text-sm text-gray-500"
              >
                Reviews (
                {product.reviews?.length || 0}
                )
              </button>

            </div>

            <p className="max-w-4xl py-6 text-sm leading-7 text-gray-500">
              {product.description}
            </p>

          </div>

          {/* ======================================
              REVIEWS
          ====================================== */}

          <div className="mt-4">

            <h2 className="mb-6 text-base font-semibold text-gray-900">
              Customer questions & answers
            </h2>

            {product.reviews?.length > 0 ? (

              product.reviews.map(
                (review, index) => (

                  <div
                    key={index}
                    className="mb-7 flex gap-4"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-600">

                      {review.reviewerName
                        ?.split(" ")
                        .map(
                          (name) => name[0]
                        )
                        .join("")
                        .slice(0, 2)}

                    </div>

                    <div className="flex-1">

                      <div className="flex items-center justify-between gap-4">

                        <div>

                          <p className="text-sm font-medium text-gray-800">
                            {review.reviewerName}
                          </p>

                          <p className="text-xs text-gray-400">
                            {new Date(
                              review.date
                            ).toLocaleDateString()}
                          </p>

                        </div>

                        <div className="text-sm">

                          {[1, 2, 3, 4, 5].map(
                            (star) => (

                              <span
                                key={star}
                                className={
                                  star <=
                                  review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              >
                                ★
                              </span>

                            )
                          )}

                        </div>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {review.comment}
                      </p>

                    </div>

                  </div>

                )
              )

            ) : (

              <p className="text-sm text-gray-500">
                No reviews yet.
              </p>

            )}

          </div>

          {/* ======================================
              ADD REVIEW
          ====================================== */}

          <div className="mt-10 max-w-2xl">

            <h2 className="mb-5 text-base font-semibold text-gray-900">
              Add a review
            </h2>

            <form
              onSubmit={
                handleSubmitReview
              }
            >

              <input
                type="text"
                value={reviewName}
                onChange={(e) =>
                  setReviewName(
                    e.target.value
                  )
                }
                placeholder="Your name"
                className="mb-3 w-full rounded-md border border-gray-200 p-4 text-sm outline-none transition focus:border-green-500"
              />

              <textarea
                rows={5}
                value={reviewText}
                onChange={(e) =>
                  setReviewText(
                    e.target.value
                  )
                }
                placeholder="Write a review..."
                className="w-full resize-none rounded-md border border-gray-200 p-4 text-sm outline-none transition focus:border-green-500"
              />

              <div className="mt-3 flex items-center gap-1">

                <span className="mr-2 text-sm text-gray-500">
                  Rating:
                </span>

                {[1, 2, 3, 4, 5].map(
                  (star) => (

                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewRating(
                          star
                        )
                      }
                      className={`text-2xl transition ${
                        star <=
                        reviewRating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>

                  )
                )}

              </div>

              <button
                type="submit"
                className="mt-5 rounded-md bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                Submit Review
              </button>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Product;