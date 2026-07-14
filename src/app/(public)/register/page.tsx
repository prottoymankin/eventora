"use client";

import { authClient } from "@/libs/auth-client";
import { toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [fileName, setFileName] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file);
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.data.display_url;
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userRegistrationData = Object.fromEntries(formData.entries());

    try {
      let imageUrl = "";

      if (fileName) {
        imageUrl = await uploadImage(fileName);
      }

      await authClient.signUp.email(
        {
          name: userRegistrationData.name as string,
          email: userRegistrationData.email as string,
          password: userRegistrationData.password as string,
          role: userRegistrationData.role as string,
          image: imageUrl,
        },
        {
          onRequest: () => {},
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/login");
          },
          onError: (ctx) => {
            toast.danger(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.danger("Something went wrong!");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">

      <div 
        className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-slate-400">
          Join Eventora and discover amazing events.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Full Name
          </label>

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            name="name"
            placeholder="Full Name"
            required
            type="text"
          />

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Email
          </label>

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            name="email"
            placeholder="Email Address"
            required
            type="email"
          />

          <div className="space-y-2">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Profile Image
            </label>

            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer border-slate-700 bg-slate-950 transition-all duration-200 hover:border-indigo-500 hover:bg-slate-900 px-4 py-3"
            >
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-medium text-white">
                  {fileName?.name || "Click to upload profile image"}
                </p>
              </div>

              <input
                id="image"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            name="password"
            placeholder="Password"
            required
            type="password"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Account type
            </label>

            <select
              name="role"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-indigo-500"
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 transition cursor-pointer active:scale-95"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}