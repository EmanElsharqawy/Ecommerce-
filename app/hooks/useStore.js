"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterProducts,
  getCategories,
  getProductCtegory,
} from "@/Redux/Slice/categorySlice";
import {
  getLatestProducts,
  getProductById,
} from "@/Redux/Slice/productSlice";

const EMPTY = [];

const DEFAULT_FILTERS = {
  search: "",
  brand: "all",
  sortBy: "default",
  minPrice: "",
  maxPrice: "",
};

const toSlug = (value) => (Array.isArray(value) ? value[0] : value);
const toId = (value) => Number(toSlug(value));

export function useCategories({ loadThumbnails = false } = {}) {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.categories);

  useEffect(() => {
    if (state.data.length === 0) dispatch(getCategories());
  }, [state.data.length, dispatch]);

  useEffect(() => {
    if (!loadThumbnails || state.data.length === 0) return;
    state.data.forEach((cat) => dispatch(getProductCtegory(cat.slug)));
  }, [loadThumbnails, state.data, dispatch]);

  return state;
}

export function useLatestProducts() {
  const dispatch = useDispatch();
  const latest = useSelector((s) => s.products.latest);
  const isLoading = useSelector((s) => s.products.latestLoading);
  const error = useSelector((s) => s.products.error);

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  return { products: latest, isLoading, error };
}

export function useCategoryProducts(slugParam) {
  const slug = toSlug(slugParam);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const products = useSelector(
    (s) => s.categories.productsByCategory[slug] ?? EMPTY
  );
  const categories = useSelector((s) => s.categories.data);
  const isLoading = useSelector((s) =>
    slug ? s.categories.pendingSlugs.includes(slug) : false
  );

  useEffect(() => {
    setFilters(DEFAULT_FILTERS);
  }, [slug]);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
    if (slug) dispatch(getProductCtegory(slug));
  }, [slug, categories.length, dispatch]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters]
  );

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );

  const categoryName =
    categories.find((cat) => cat.slug === slug)?.name ||
    slug?.replace(/-/g, " ") ||
    "";

  return {
    slug,
    products: filteredProducts,
    totalProducts: products.length,
    isLoading,
    filters,
    brands,
    categoryName,
    setFilter: (updates) => setFilters((prev) => ({ ...prev, ...updates })),
    resetFilters: () => setFilters(DEFAULT_FILTERS),
  };
}

export function useProduct(idParam) {
  const id = toId(idParam);
  const dispatch = useDispatch();

  const product = useSelector((s) => s.products.details[id]);
  const related = useSelector((s) => s.products.related[id] ?? EMPTY);
  const isLoading = useSelector((s) => s.products.pendingIds.includes(id));
  const error = useSelector((s) => s.products.error);

  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [id, dispatch]);

  return { product, related, isLoading, error, id };
}
