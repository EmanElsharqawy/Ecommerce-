"use client";

import { useEffect } from "react";

import {
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";

import store from "@/Redux/store";

import {
  loadCart,
} from "@/Redux/Slice/productCartSlice";

import {
  loadWishlist,
} from "@/Redux/Slice/wishlistSlice";

function CartStorage({ children }) {
  const dispatch = useDispatch();

  const cart = useSelector(
    (state) => state.productCart?.cart || []
  );

  const wishlist = useSelector(
    (state) => state.wishlist?.wishlist || []
  );

  // ==========================================
  // LOAD DATA FROM LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    // CART
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      try {
        const parsedCart =
          JSON.parse(savedCart);

        dispatch(
          loadCart(parsedCart)
        );
      } catch (error) {
        console.error(
          "Failed to load cart:",
          error
        );
      }
    }

    // WISHLIST
    const savedWishlist =
      localStorage.getItem("wishlist");

    if (savedWishlist) {
      try {
        const parsedWishlist =
          JSON.parse(savedWishlist);

        dispatch(
          loadWishlist(parsedWishlist)
        );
      } catch (error) {
        console.error(
          "Failed to load wishlist:",
          error
        );
      }
    }
  }, [dispatch]);

  // ==========================================
  // SAVE CART
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // ==========================================
  // SAVE WISHLIST
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  return children;
}

// ==========================================
// PROVIDER
// ==========================================

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartStorage>
        {children}
      </CartStorage>
    </Provider>
  );
}