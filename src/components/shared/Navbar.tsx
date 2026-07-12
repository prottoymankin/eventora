"use client";

import { authClient } from "@/libs/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileMenu } from "./MobileMenu";
import { MobileMenu1 } from "./MobileMenu1";
import { toast } from "@heroui/react";

export default function Navbar() {
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
          toast.success("Log out successful");
          router.push("/login");
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
        
        { session?.user ? <MobileMenu /> : <MobileMenu1 /> }
     
      </nav>
    </header>
  );
}