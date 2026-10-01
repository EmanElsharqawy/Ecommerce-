"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { BsMinecartLoaded } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import { IoMdSearch } from "react-icons/io";

import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ================= SEARCH =================
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // ================= CART =================
  const cart = useSelector(
    (state) => state.productCart?.cart || []
  );

  const totalItems = cart.reduce(
    (total, product) => total + (product.quantity || 0),
    0
  );

  // ================= WISHLIST =================
  const wishlist = useSelector(
    (state) => state.wishlist?.wishlist || []
  );

  const totalWishlist = wishlist.length;

  // ================= SEARCH API =================
  useEffect(() => {
    const query = search.trim();

    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsSearching(true);

        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            query
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setSearchResults(data.products || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ================= SEARCH SUBMIT =================
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Searching for:", search);
  };

  // ================= PRODUCT CLICK =================
  const handleProductClick = () => {
    setSearch("");
    setSearchResults([]);
    setIsOpen(false);
  };

  // ================= CLOSE MENU =================
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="relative z-[100] w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">

        {/* ================= TOP ROW ================= */}

        <div className="flex items-center justify-between gap-2 py-3 sm:py-4">

          {/* ================= LOGO ================= */}

          <Link
            href="/"
            className="shrink-0"
            onClick={closeMenu}
          >
            <Image
              src="/mainicon.png"
              alt="Main Icon"
              width={140}
              height={50}
              priority
              className="h-8 w-auto object-contain sm:h-9 md:h-10 lg:h-12"
            />
          </Link>

          {/* ================= DESKTOP SEARCH ================= */}

          <form
            onSubmit={handleSearch}
            className="relative mx-4 hidden max-w-xl flex-1 lg:block"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for product..."
              className="w-full rounded-xl border border-[#babbbc] bg-gray-50 py-2.5 pl-5 pr-12 text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              aria-label="Search"
              className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-500 transition hover:text-blue-600"
            >
              <IoMdSearch className="size-5" />
            </button>

            {/* ================= DESKTOP RESULTS ================= */}

            {search.trim() && (
              <div className="absolute left-0 right-0 top-full z-[200] mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">

                {isSearching && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    Searching...
                  </div>
                )}

                {!isSearching &&
                  searchResults.length > 0 &&
                  searchResults.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={handleProductClick}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-gray-100"
                    >
                      {/* Product Image */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        width="50"
                        height="50"
                        className="h-12 w-12 rounded-md object-cover"
                      />

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {product.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))}

                {!isSearching &&
                  searchResults.length === 0 && (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No products found.
                    </div>
                  )}
              </div>
            )}
          </form>

          {/* ================= DESKTOP LINKS ================= */}

          <div className="hidden items-center gap-4 text-sm font-medium lg:flex xl:gap-6 xl:text-base">

            <Link
              href="/login"
              className="px-1 hover:text-blue-600"
            >
              Login
            </Link>

            <span className="text-gray-300">|</span>

            <Link
              href="/register"
              className="px-1 hover:text-blue-600"
            >
              Register
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              className="relative p-1.5 text-2xl hover:text-blue-600"
            >
              <FaRegHeart />

              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">
                {totalWishlist}
              </span>
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              className="relative p-1.5 text-2xl hover:text-blue-600"
            >
              <BsMinecartLoaded />

              <span className="absolute -right-1 -top-1 rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">
                {totalItems}
              </span>
            </Link>
          </div>

          {/* ================= MOBILE ACTIONS ================= */}

          <div className="flex items-center gap-1 sm:gap-2 lg:hidden">

            <Link
              href="/wishlist"
              className="relative p-2 text-xl hover:text-blue-600 sm:text-2xl"
            >
              <FaRegHeart />

              <span className="absolute -right-0.5 -top-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] text-white">
                {totalWishlist}
              </span>
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-xl hover:text-blue-600 sm:text-2xl"
            >
              <BsMinecartLoaded />

              <span className="absolute -right-0.5 -top-0.5 rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] text-white">
                {totalItems}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-2xl"
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}

        <form
          onSubmit={handleSearch}
          className="relative pb-3 lg:hidden"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for product..."
            className="w-full rounded-xl border border-[#babbbc] bg-gray-50 py-2 pl-4 pr-11 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:py-2.5 sm:pl-5 sm:pr-12 sm:text-base"
          />

          <button
            type="submit"
            aria-label="Search"
            className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-gray-500 hover:text-blue-600 sm:w-12"
          >
            <IoMdSearch className="size-5 sm:size-6" />
          </button>

          {/* ================= MOBILE RESULTS ================= */}

          {search.trim() && (
            <div className="absolute left-0 right-0 top-full z-[200] max-h-80 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">

              {isSearching && (
                <div className="px-4 py-3 text-sm text-gray-500">
                  Searching...
                </div>
              )}

              {!isSearching &&
                searchResults.length > 0 &&
                searchResults.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={handleProductClick}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-gray-100"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      width="45"
                      height="45"
                      className="h-11 w-11 rounded-md object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-800">
                        {product.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        ${product.price}
                      </p>
                    </div>
                  </Link>
                ))}

              {!isSearching &&
                searchResults.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No products found.
                  </div>
                )}
            </div>
          )}
        </form>

        {/* ================= MOBILE MENU ================= */}

        {isOpen && (
          <div className="flex flex-col gap-3 border-t py-4 text-sm font-medium sm:text-base lg:hidden">

            <Link
              href="/login"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={closeMenu}
              className="hover:text-blue-600"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;