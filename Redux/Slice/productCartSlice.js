import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const productCartSlice = createSlice({
  name: "productCart",

  initialState,

  reducers: {
    // Load cart from localStorage
    loadCart: (state, action) => {
      state.cart = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // Add product
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.cart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity +=
          Number(product.quantity) || 1;
      } else {
        state.cart.push({
          ...product,
          quantity:
            Number(product.quantity) || 1,
        });
      }
    },

    // Remove product
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.id !== action.payload
      );
    },

    // Increase
    increaseQuantity: (state, action) => {
      const product = state.cart.find(
        (item) => item.id === action.payload
      );

      if (!product) return;

      if (
        product.stock &&
        product.quantity >= product.stock
      ) {
        return;
      }

      product.quantity += 1;
    },

    // Decrease
    decreaseQuantity: (state, action) => {
      const product = state.cart.find(
        (item) => item.id === action.payload
      );

      if (!product) return;

      if (product.quantity > 1) {
        product.quantity -= 1;
      }
    },

    // Update quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const product = state.cart.find(
        (item) => item.id === id
      );

      if (!product) return;

      const newQuantity = Number(quantity);

      if (Number.isNaN(newQuantity)) return;

      product.quantity = Math.max(
        1,
        newQuantity
      );
    },

    // Clear cart
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  loadCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} = productCartSlice.actions;

export default productCartSlice.reducer;