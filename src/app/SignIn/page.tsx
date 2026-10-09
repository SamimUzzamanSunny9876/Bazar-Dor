"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (data) {
      toast("Login Success:");
      router.push("/"); 
    }

    if (error) {
      console.log("Login Error:", error);
     toast(error.message || "সাইন ইন করতে সমস্যা হয়েছে। (Login Failed)");
    }
  };

  const handleGoogleSignIn = async ()=>{
    const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
  }

  const handleGithubSignIn = async ()=>{
    const data = await authClient.signIn.social({
        provider: "github"
    })
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f4] flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1f2937] mb-2">
          সাইন ইন
        </h1>
        <p className="text-sm md:text-base text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">ইমেইল</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008f5d]/20 focus:border-[#008f5d] transition-all text-sm text-gray-800"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008f5d]/20 focus:border-[#008f5d] transition-all text-sm text-gray-800"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008f5d] hover:bg-[#007a4f] text-white font-semibold py-3 rounded-xl transition-colors mt-2 text-sm md:text-base shadow-sm"
          >
            সাইন ইন
          </button>
        </form>

        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 px-4 text-gray-400 text-sm">অথবা</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleGoogleSignIn} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.31-1.03 2.41-2.16 3.14v2.6h3.48c2.03-1.87 3.32-4.64 3.32-7.75z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.48-2.6c-.98.66-2.23 1.05-3.8 1.05-2.92 0-5.4-1.97-6.28-4.63H2.07v2.68C3.89 20.47 7.64 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.72 14.16c-.22-.66-.35-1.36-.35-2.16s.13-1.5.35-2.16V7.16H2.07C1.35 8.6 1 10.23 1 12s.35 3.4 1.07 4.84l3.65-2.68z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.64 1 3.89 3.53 2.07 7.16l3.65 2.68C6.6 7.35 9.08 5.38 12 5.38z"
              />
            </svg>
            Google দিয়ে চালিয়ে যান
          </button>

          <button onClick={handleGithubSignIn} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-xs md:text-sm font-medium text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/SignUp"
            className="text-[#008f5d] font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 text-sm text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-2"
      >
        <span>←</span> হোম পেজে ফিরে যান
      </Link>
       
    </div>
  );
};

export default SignInPage;
