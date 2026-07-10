"use client";

import { authClient } from "@/libs/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [fileName, setFileName] = useState<File | null>(null);

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

      const { data, error } = await authClient.signUp.email(
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
            alert("Account created successfully");
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
        }
      );

      console.log(data, error);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-900 text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Join Eventora and discover amazing events.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleRegister}>
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            name="name"
            placeholder="Full Name"
            required
            type="text"
          />

          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            name="email"
            placeholder="Email Address"
            required
            type="email"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Profile Image
            </label>

            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer hover:border-indigo-500 transition border-slate-200 px-4 py-3"
            >
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-gray-600">
                  {fileName?.name || "Click to upload profile image"}
                </p>
              </div>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <label className="text-sm font-medium">Password</label>
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
            name="password"
            placeholder="Password"
            required
            type="password"
          />

          <div>
            <label className="text-sm font-medium">Account type</label>
            <select
              name="role"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none focus:border-indigo-500"
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