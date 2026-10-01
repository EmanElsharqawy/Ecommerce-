"use client";

import Link from "next/link";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#00b894] focus:bg-white focus:ring-2 focus:ring-[#00b894]/20";

const buttonClass =
  "w-full rounded-xl bg-[#00b894] py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition hover:bg-[#009e7f] active:scale-[0.98]";

export default function AuthForm({
  title,
  submitLabel,
  alternateText,
  alternateHref,
  alternateLabel,
}) {
  return (
    <div className="container mx-auto max-w-md px-4 py-8 sm:px-6 sm:py-12">
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
        <div className="bg-gradient-to-r from-[#00b894] to-[#08b89d] px-6 py-5 sm:px-8">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="mt-1 text-sm text-white/90">
            Welcome to BroBazar — your mega super store.
          </p>
        </div>

        <form
          className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {title === "Register" && (
            <input type="text" placeholder="Full name" className={inputClass} />
          )}

          <input type="email" placeholder="Email address" className={inputClass} />
          <input type="password" placeholder="Password" className={inputClass} />

          {title === "Register" && (
            <input
              type="password"
              placeholder="Confirm password"
              className={inputClass}
            />
          )}

          <button type="submit" className={buttonClass}>
            {submitLabel}
          </button>
        </form>

        <p className="border-t border-gray-100 px-6 py-4 text-center text-sm text-gray-600 sm:px-8">
          {alternateText}{" "}
          <Link
            href={alternateHref}
            className="font-semibold text-[#00b894] hover:underline"
          >
            {alternateLabel}
          </Link>
        </p>
      </div>
    </div>
  );
}
