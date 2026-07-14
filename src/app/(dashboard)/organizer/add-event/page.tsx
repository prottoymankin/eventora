"use client";

import { useState } from "react";

export default function AddEventPage() {
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newEventData = Object.fromEntries(formData.entries());

    let imageUrl = "";

    if (fileName) {
      imageUrl = await uploadImage(fileName);
    }

    newEventData.image = imageUrl;

    console.log(newEventData);
  }

  return (
    <section className="min-h-screen bg-slate-950 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Add New Event
          </h1>

          <p className="mt-2 text-slate-400">
            Fill in the event information below to publish your event.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          {/* Event Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Event Title
            </label>

            <input
              name="title"
              type="text"
              placeholder="Enter event title"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              placeholder="Write event description..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Category + Event Type */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select 
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                name="category"
              >
                <option>Technology</option>
                <option>Business</option>
                <option>Education</option>
                <option>Workshop</option>
                <option>Seminar</option>
                <option>Networking</option>
                <option>Sports</option>
                <option>Music</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Event Type
              </label>

              <select 
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-indigo-500"
                name="type"
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Hybrid</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Location
            </label>

            <input
              name="location"
              type="text"
              placeholder="Enter event location"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Dates */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Start Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                name="start-date"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                End Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                name="end-date"
              />
            </div>
          </div>

          {/* Price + Max Attendee */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Ticket Price ($)
              </label>

              <input
                type="number"
                placeholder="0"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                name="price"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Max Attendee
              </label>

              <input
                type="number"
                placeholder="100"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
                name="max-attendee"
              />
            </div>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Event Banner
            </label>

            <label className="flex px-4 py-3 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950 transition hover:border-indigo-500 hover:bg-slate-900">
              <p className="text-lg font-semibold text-white">
                Upload Event Banner
              </p>

              <input
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="reset"
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium text-slate-300 transition hover:bg-slate-800 cursor-pointer"
            >
              Reset
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
            >
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}