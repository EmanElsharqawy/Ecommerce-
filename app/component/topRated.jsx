
"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { CiHeart } from "react-icons/ci";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GetLatestProducts } from "@/Redux/Slice/latestProductSlice";
import { addToCart } from "@/Redux/Slice/productCartSlice";
import { toggleWishlist } from "@/Redux/Slice/wishlistSlice";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function TopRated() {
  const dispatch = useDispatch();

  // ==========================================
  // GET PRODUCTS
  // ==========================================

  const data = useSelector(
    (state) => state.latest.latest
  );

  // ==========================================
  // GET WISHLIST
  // ==========================================

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  // ==========================================
  // GET LATEST PRODUCTS
  // ==========================================

  useEffect(() => {
    dispatch(GetLatestProducts());
  }, [dispatch]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = (product) => {
    dispatch(toggleWishlist(product));
  };

  // ==========================================
  // CHECK IF PRODUCT IS IN WISHLIST
  // ==========================================

  const isInWishlist = (productId) => {
    return wishlist.some(
      (item) => item.id === productId
    );
  };

  return (
    <div className="w-full px-6 py-4">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="mb-6 ml-7 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-900">
          Top Rated Product
        </h2>

        <button
          type="button"
          className="rounded-md border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-100"
        >
          View Details
        </button>

      </div>

      {/* ======================================
          PRODUCTS SLIDER
      ====================================== */}

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={5}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },

          1280: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >

        {data?.slice(0, 10)?.map((product) => (

          <SwiperSlide key={product.id}>

            <Card className="mx-auto w-full max-w-[280px] overflow-hidden shadow-md">

              {/* =================================
                  PRODUCT IMAGE
              ================================= */}

              <CardHeader
                shadow={false}
                floated={false}
                className="relative h-56 rounded-none"
              >

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

                {/* =================================
                    HEART
                ================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleWishlist(product)
                  }
                  aria-label={
                    isInWishlist(product.id)
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-100"
                >
                  <CiHeart
                    size={26}
                    className={`transition ${
                      isInWishlist(product.id)
                        ? "text-red-500"
                        : "text-gray-700 hover:text-red-500"
                    }`}
                  />
                </button>

              </CardHeader>

              {/* =================================
                  PRODUCT INFORMATION
              ================================= */}

              <CardBody className="px-4 py-4">

                <div className="mb-2 flex items-center justify-between gap-2">

                  <Typography
                    color="blue-gray"
                    className="line-clamp-1 text-base font-medium"
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    color="blue-gray"
                    className="shrink-0 text-sm font-medium"
                  >
                    ${product.price}
                  </Typography>

                </div>

                <Typography
                  variant="small"
                  color="gray"
                  className="line-clamp-2 font-normal opacity-75"
                >
                  {product.description}
                </Typography>

              </CardBody>

              {/* =================================
                  ADD TO CART
              ================================= */}

              <CardFooter className="px-4 pb-4 pt-0">

                <Button
                  ripple={false}
                  fullWidth
                  onClick={() =>
                    handleAddToCart(product)
                  }
                  className="!bg-black !text-white shadow-none hover:!bg-gray-800"
                >
                  Add to Cart
                </Button>

              </CardFooter>

            </Card>

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}
