"use client";

import { authClient } from "@/libs/auth-client";

export default function AttendeePage() {
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Attendee Dashboard</h1>

      <button
        onClick={handleLogout}
        className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}