"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
      rememberMe,
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* ================================
          BACKGROUND PATTERN
      ================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(
                30deg,
                #f5f5f5 12%,
                transparent 12.5%,
                transparent 87%,
                #f5f5f5 87.5%,
                #f5f5f5
              ),
              linear-gradient(
                150deg,
                #f5f5f5 12%,
                transparent 12.5%,
                transparent 87%,
                #f5f5f5 87.5%,
                #f5f5f5
              ),
              linear-gradient(
                30deg,
                #f5f5f5 12%,
                transparent 12.5%,
                transparent 87%,
                #f5f5f5 87.5%,
                #f5f5f5
              ),
              linear-gradient(
                150deg,
                #f5f5f5 12%,
                transparent 12.5%,
                transparent 87%,
                #f5f5f5 87.5%,
                #f5f5f5
              ),
              linear-gradient(
                60deg,
                #fafafa 25%,
                transparent 25.5%,
                transparent 75%,
                #fafafa 75%
              )
            `,
            backgroundSize: "80px 140px",
            backgroundPosition:
              "0 0, 0 0, 40px 70px, 40px 70px, 0 0",
          }}
        />
      </div>

      {/* ================================
          HEADER
      ================================= */}

      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8">
        {/* LOGO */}

        <Link href="/" className="shrink-0">
          <Image
            src="/mainIcon.png"
            alt="Main Icon"
            width={140}
            height={50}
            priority
            className="h-8 w-auto object-contain sm:h-9 md:h-10 lg:h-12"
          />
        </Link>

        {/* HEADER BUTTONS */}

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-[11px] font-medium text-gray-800 transition hover:bg-gray-100"
          >
            LOGIN
          </Link>

          <Link
            href="/register"
            className="rounded-full border border-gray-200 bg-white px-5 py-2 text-[11px] font-medium text-gray-800 transition hover:bg-gray-100"
          >
            SIGN UP
          </Link>
        </div>
      </header>

      {/* ================================
          LOGIN CONTENT
      ================================= */}

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[650px] flex-col items-center px-6 pt-12 sm:pt-16">
        {/* TITLE */}

        <h1 className="text-center text-4xl font-extrabold leading-tight text-black sm:text-5xl">
          Welcome Back!
          <br />
          Sign in with your credentials.
        </h1>

        {/* GOOGLE BUTTON */}

        <button
          type="button"
          className="mt-9 flex h-9 w-40 items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 text-[11px] font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Sign in with Google

          <FaGoogle
            className="text-[#4285F4]"
            size={14}
          />
        </button>

        {/* DIVIDER */}

        <div className="mt-6 flex w-full max-w-[310px] items-center gap-2">
          <div className="h-px flex-1 bg-gray-400" />

          <span className="whitespace-nowrap text-[11px] text-gray-600">
            Or, Sign in with your email
          </span>

          <div className="h-px flex-1 bg-gray-400" />
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="mt-9 w-full max-w-[432px]"
        >
          {/* EMAIL */}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-gray-800"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-[#08b49c]"
              required
            />
          </div>

          {/* PASSWORD */}

          <div className="mt-5">
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium text-gray-800"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm outline-none transition focus:border-[#08b49c]"
              required
            />
          </div>

          {/* REMEMBER + FORGOT */}

          <div className="mt-4 flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
                className="h-3 w-3 accent-[#08b49c]"
              />

              Remember Me
            </label>

            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-[#00b69f] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* SIGN UP */}

          <div className="mt-5 flex items-center justify-between">
            <span className="text-[11px] text-gray-700">
              Don't have an account?
            </span>

            <Link
              href="/register"
              className="text-[11px] font-medium text-[#00b69f] hover:underline"
            >
              Sign Up
            </Link>
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            className="mt-6 h-9 w-full rounded-md bg-[#08b49c] text-xs font-bold text-white transition hover:bg-[#079f8b]"
          >
            SIGN IN
          </button>
        </form>
      </section>
    </main>
  );
}