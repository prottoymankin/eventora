import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Heart,
  Ticket,
  User,
} from "lucide-react";
import { getEventById } from "@/libs/api/events";
import { formatDate } from "@/utils/formateDate";

const EventDetailsPage = async (
  { params } : { 
    params : Promise<{ id : string }>
  }
) => {
  const { id } = await params;
  
  const { eventDetails } = await getEventById(id);
  console.log(eventDetails)

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 w-full">
      {/* Back */}
      <Link
        href="/events"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-indigo-400"
      >
        <ArrowLeft size={18} />
        Back to Events
      </Link>

      {/* Top Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <div className="relative h-72 w-full sm:h-96 lg:h-140">
            <Image
              src={eventDetails?.image}
              alt={eventDetails?.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400">
              {eventDetails?.category}
            </span>

            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400">
              {eventDetails?.eventType}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-5 text-3xl font-bold text-white md:text-4xl">
            {eventDetails?.title}
          </h1>

          {/* Information */}
          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-3 text-slate-300">
              <CalendarDays size={20} className="text-indigo-400" />
              <span>
                {formatDate(eventDetails.startDate)} - {formatDate(eventDetails.endDate)}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={20} className="text-indigo-400" />
              <span>{eventDetails?.location}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Users size={20} className="text-indigo-400" />
              <span>Maximum {eventDetails?.maxAttendee} Attendees</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <User size={20} className="text-indigo-400" />
              <span>Organized by {eventDetails?.organizerName}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Ticket Price</p>

            <h2 className="mt-2 text-4xl font-bold text-indigo-400">
              ${eventDetails?.ticketPrice}
            </h2>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-3 font-medium text-white transition hover:border-red-500 hover:text-red-400">
              <Heart size={18} />
              Add to Favorites
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500">
              <Ticket size={18} />
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="mb-5 text-2xl font-bold text-white">
          About This Event
        </h2>

        <p className="leading-8 text-slate-400">
          {eventDetails?.description}
        </p>
      </section>
    </main>
  );
};

export default EventDetailsPage;