import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "@/Redux/Slice/categorySlice";
import productSlice from "@/Redux/Slice/productSlice";
import LatestproductSlice from "@/Redux/Slice/latestProductSlice";
import productidSlice from "@/Redux/Slice/productidslice";
import productCartReducer from "./Slice/productCartSlice";
import wishlistReducer from "./Slice/wishlistSlice";

const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    latest: LatestproductSlice,
    productid: productidSlice,
    productCart: productCartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;