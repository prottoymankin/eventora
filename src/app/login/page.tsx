"use client";

import { authClient } from "@/libs/auth-client";
import Link from "next/link";

export default function LoginPage() {
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
          alert("Login successful");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Sign in to continue to Eventora.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              name="email"
              placeholder="Email Address"
              required
              type="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>

            <input
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition cursor-pointer active:scale-95"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          New to Eventora?{" "}
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}