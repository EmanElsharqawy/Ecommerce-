

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetLatestProducts = createAsyncThunk(
  "products/getLatest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://dummyjson.com/products");

      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  latest: [],
  loading: false,
  error: null,
};

const LatestproductSlice = createSlice({
  name: "latestproducts",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetLatestProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetLatestProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.latest = action.payload;
      })

      .addCase(GetLatestProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default LatestproductSlice.reducer;