"use client";

import { authClient } from "@/libs/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return null;
  }

  const dashboardPath =
    session?.user.role === "admin"
      ? "/admin"
      : session?.user.role === "organizer"
      ? "/organizer"
      : "/attendee";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white"
        >
          Event<span className="text-indigo-500">ora</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-medium text-slate-300 transition-colors duration-200 hover:text-indigo-400"
          >
            Home
          </Link>

          <Link
            href="/events"
            className="font-medium text-slate-300 transition-colors duration-200 hover:text-indigo-400"
          >
            Events
          </Link>

          {session && (
            <Link
              href={dashboardPath}
              className="font-medium text-slate-300 transition-colors duration-200 hover:text-indigo-400"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {session ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition-all duration-200 hover:bg-red-600 active:scale-95"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-slate-700 bg-slate-900 px-5 py-2 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition-all duration-200 hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer md:hidden"
        >
          {isOpen ? <RxCross2 size={28} /> : <RiMenuLine size={28} /> }
        </button>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-72 border-l border-slate-800 bg-slate-900 transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl font-bold text-indigo-600">
            Eventora
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-slate-300 transition-colors hover:text-white"
          >
            <RxCross2 size={28} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-5">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/events"
            onClick={() => setIsOpen(false)}
            className="rounded-xl px-4 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
          >
            Events
          </Link>

          {session && (
            <Link
              href={dashboardPath}
              onClick={() => setIsOpen(false)}
              className="rounded-xl px-4 py-3 font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
            >
              Dashboard
            </Link>
          )}

          <div className="mt-4 border-t pt-4">
            {session ? (
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer rounded-lg bg-red-500 py-3 font-medium text-white hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg border border-slate-700 bg-slate-900 py-3 text-center font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg bg-indigo-600 py-3 text-center font-medium text-white transition-all duration-200 hover:bg-indigo-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </header>
  );
}