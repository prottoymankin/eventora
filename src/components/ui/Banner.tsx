import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative h-[70vh] overflow-hidden max-w-7xl mx-auto rounded-2xl my-10">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1511578314322-379afb476865"
        alt="Event Banner"
        fill
        className="absolute inset-0 object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400">
            Discover • Book • Experience
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-6xl text-center">
            Discover Amazing Events
            <span className="block text-indigo-400">
              Near You
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 text-center">
            Explore conferences, workshops, seminars, music festivals,
            and networking events. Book your seat in just a few clicks.
          </p>

          <button className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700">
            Explore Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;