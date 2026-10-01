"use client";

import Link from "next/link";
import { useCategories } from "@/app/hooks/useStore";

export default function Topcategory() {
  const { data, isLoading, productsByCategory } = useCategories({
    loadThumbnails: true,
  });

  if (isLoading && data.length === 0) {
    return (
      <div className="flex w-full justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00b894] border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <nav className="relative z-40 w-full border-b  border-gray-200/80 bg-[#f0f0f0]">
      <div className="header-scroll container mx-auto overflow-x-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center gap-3 py-4 sm:gap-5">
          {data.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex min-w-[88px] shrink-0 flex-col items-center gap-2 sm:min-w-[110px]"
            >
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white bg-white shadow-sm transition group-hover:border-[#00b894]/40 group-hover:shadow-md sm:h-[72px] sm:w-[72px]">
                {productsByCategory[cat.slug]?.[0]?.thumbnail ? (
                  <img
                    src={productsByCategory[cat.slug][0].thumbnail}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full animate-pulse bg-gray-200" />
                )}
              </div>

              <p className="max-w-[88px] truncate text-center text-xs font-semibold text-gray-700 transition-colors group-hover:text-[#00b894] sm:max-w-[110px] sm:text-sm">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
