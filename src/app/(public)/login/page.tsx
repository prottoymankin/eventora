"use client";

import { authClient } from "@/libs/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userLoginData = Object.fromEntries(formData.entries());

    await authClient.signIn.email(
      {
        email: userLoginData.email as string,
        password: userLoginData.password as string,
      },
      {
        onSuccess: () => {
          toast.success("Login successful");
          router.push("/");
        },
        onError: (ctx) => {
          toast.danger(ctx.error.message);
        },
      }
    );
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="mt-6 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to continue to your account.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 h-px bg-slate-800" />

        <p className="text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-500 transition hover:text-indigo-400"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}