"use client";

import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";

import { loadWishlist } from "@/Redux/Slice/wishlistSlice";

function WishlistStorage({ children }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state) => state.wishlist.wishlist
  );

  // Load wishlist from localStorage
  useEffect(() => {
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

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  return children;
}

export default WishlistStorage;