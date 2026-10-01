import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ================= GET ALL CATEGORIES =================

export const getCategories = createAsyncThunk(
  "products/getCategories",

  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products/categories"
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },

  {
    condition: (_, { getState }) => {
      const { data, isLoading } = getState().categories;

      return data.length === 0 && !isLoading;
    },
  }
);

// ================= GET PRODUCTS BY CATEGORY =================

export const getProductCtegory = createAsyncThunk(
  "products/getProductCtegory",

  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${slug}`
      );

      return {
        slug,
        products: res.data.products,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },

  {
    condition: (slug, { getState }) => {
      const { productsByCategory, pendingSlugs } = getState().categories;

      return (
        !productsByCategory[slug] &&
        !pendingSlugs.includes(slug)
      );
    },
  }
);

// ================= FILTER PRODUCTS =================

export function filterProducts(products, filters) {
  if (!products.length) return products;

  const query = filters.search.trim().toLowerCase();

  let result = [...products];

  // Search
  if (query) {
    result = result.filter(
      (product) =>
        product.title?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query)
    );
  }

  // Brand
  if (filters.brand !== "all") {
    result = result.filter(
      (product) => product.brand === filters.brand
    );
  }

  // Min Price
  const minPrice = Number(filters.minPrice);

  if (filters.minPrice !== "" && !Number.isNaN(minPrice)) {
    result = result.filter(
      (product) => product.price >= minPrice
    );
  }

  // Max Price
  const maxPrice = Number(filters.maxPrice);

  if (filters.maxPrice !== "" && !Number.isNaN(maxPrice)) {
    result = result.filter(
      (product) => product.price <= maxPrice
    );
  }

  // Sort
  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;

    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;

    case "title-asc":
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;

    default:
      break;
  }

  return result;
}

// ================= INITIAL STATE =================

const initialState = {
  // All categories
  data: [],

  // Products separated by category
  productsByCategory: {},

  // Categories currently loading
  pendingSlugs: [],

  isLoading: false,

  error: null,
};

// ================= SLICE =================

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= GET CATEGORIES =================

      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ================= GET PRODUCTS BY CATEGORY =================

      .addCase(
        getProductCtegory.pending,
        (state, action) => {
          state.pendingSlugs.push(action.meta.arg);
        }
      )

      .addCase(
        getProductCtegory.fulfilled,
        (state, action) => {
          const { slug, products } = action.payload;

          state.productsByCategory[slug] = products;

          state.pendingSlugs =
            state.pendingSlugs.filter(
              (s) => s !== slug
            );
        }
      )

      .addCase(
        getProductCtegory.rejected,
        (state, action) => {
          state.pendingSlugs =
            state.pendingSlugs.filter(
              (s) => s !== action.meta.arg
            );

          state.error = action.payload;
        }
      );
  },
});

export default categorySlice.reducer;