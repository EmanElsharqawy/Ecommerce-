import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";


// ==========================================
// GET PRODUCT BY ID
// ==========================================

export const getProduct = createAsyncThunk(
  "productid/getProduct",

  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const data = await response.json();

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message
      );
    }
  }
);


// ==========================================
// INITIAL STATE
// ==========================================

const initialState = {
  product: null,
  loading: false,
  error: null,
};


// ==========================================
// PRODUCT SLICE
// ==========================================

const productidSlice = createSlice({

  name: "productid",

  initialState,

  reducers: {

    // ========================================
    // ADD REVIEW
    // ========================================

    addReview: (state, action) => {

      if (!state.product) {
        return;
      }

      if (!state.product.reviews) {
        state.product.reviews = [];
      }

      state.product.reviews.unshift(
        action.payload
      );
    },

  },

  // ==========================================
  // ASYNC ACTIONS
  // ==========================================

  extraReducers: (builder) => {

    // Loading
    builder.addCase(
      getProduct.pending,
      (state) => {

        state.loading = true;
        state.error = null;

      }
    );


    // Success
    builder.addCase(
      getProduct.fulfilled,
      (state, action) => {

        state.loading = false;
        state.product = action.payload;
        state.error = null;

      }
    );


    // Error
    builder.addCase(
      getProduct.rejected,
      (state, action) => {

        state.loading = false;
        state.error =
          action.payload || "Something went wrong";

      }
    );

  },

});


// ==========================================
// EXPORT ACTION
// ==========================================

export const {
  addReview,
} = productidSlice.actions;


// ==========================================
// EXPORT REDUCER
// ==========================================

export default productidSlice.reducer;
