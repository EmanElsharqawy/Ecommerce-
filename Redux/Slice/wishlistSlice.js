import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlist.some(
        (item) => item.id === product.id
      );

      if (!exists) {
        state.wishlist.push(product);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.wishlist.some(
        (item) => item.id === product.id
      );

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item.id !== product.id
        );
      } else {
        state.wishlist.push(product);
      }
    },

    loadWishlist: (state, action) => {
      state.wishlist = action.payload;
    },

    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  loadWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;