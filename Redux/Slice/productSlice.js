import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://dummyjson.com/products";

export const getLatestProducts = createAsyncThunk(
  "products/getLatest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}?limit=20&sortBy=id&order=desc`);
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { latest, latestLoading } = getState().products;
      return latest.length === 0 && !latestLoading;
    },
  }
);

export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/${id}`);
      const product = res.data;

      let related = [];
      try {
        const relatedRes = await axios.get(`${API}/category/${product.category}`);
        related = relatedRes.data.products
          .filter((item) => item.id !== product.id)
          .slice(0, 8);
      } catch {
        related = [];
      }

      return { product, related };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
  {
    condition: (id, { getState }) => {
      const productId = Number(id);
      const { details, pendingIds } = getState().products;
      return !details[productId] && !pendingIds.includes(productId);
    },
  }
);

const initialState = {
  latest: [],
  latestLoading: false,
  details: {},
  related: {},
  pendingIds: [],
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestProducts.pending, (state) => {
        state.latestLoading = true;
        state.error = null;
      })
      .addCase(getLatestProducts.fulfilled, (state, action) => {
        state.latestLoading = false;
        state.latest = action.payload;
      })
      .addCase(getLatestProducts.rejected, (state, action) => {
        state.latestLoading = false;
        state.error = action.payload;
      })
      .addCase(getProductById.pending, (state, action) => {
        state.pendingIds.push(Number(action.meta.arg));
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        const { product, related } = action.payload;
        state.details[product.id] = product;
        state.related[product.id] = related;
        state.pendingIds = state.pendingIds.filter((id) => id !== product.id);
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.pendingIds = state.pendingIds.filter(
          (id) => id !== Number(action.meta.arg)
        );
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
