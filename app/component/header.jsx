"use client";

import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { useCategories } from "@/app/hooks/useStore";

const linkClass =
  "shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 sm:px-4 sm:text-sm lg:text-[15px]";

export default function Header() {
  const { data } = useCategories();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const visibleCategories = data.slice(0, 10);
  const remainingCategories = data.slice(10);

  return (
    <nav className="relative top-0 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">

        {/* Mobile Categories */}
        <div className="header-scroll flex items-center justify-start gap-1 overflow-x-auto py-2 lg:hidden">
          {data.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={linkClass}
            >
              <span className="font-bold">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Categories */}
        <div className="hidden min-h-[52px] items-center justify-start gap-1 py-1 lg:flex">

          {visibleCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className={linkClass}
            >
              {category.name}
            </Link>
          ))}

          {/* More */}
          {remainingCategories.length > 0 && (
            <div className="relative">

              <button
                type="button"
                onClick={() => setIsMoreOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-[15px] font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
              >
                More

                <FaChevronDown
                  className={`text-[10px] transition-transform ${
                    isMoreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* More Dropdown */}
              {isMoreOpen && (
                <div className="absolute left-0 top-full z-[9999] mt-2 min-w-[220px] rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

                  {remainingCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      onClick={() => setIsMoreOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      {category.name}
                    </Link>
                  ))}

                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </nav>
  );
}