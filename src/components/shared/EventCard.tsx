import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import { Event } from "@/types/events";

const EventCard = ({ event } : { event : Event }) => {
  return (
    <div 
      className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/10"
    >
      {/* Event Image */}
      <div className="relative h-56 w-full">
        <Image
          src={event?.image}
          alt={event?.title}
          className="object-cover"
          fill
        />
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        {/* Category & Type */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            {event?.category}
          </span>

          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            {event?.eventType}
          </span>
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-bold text-white">
          {event?.title}
        </h2>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <CalendarDays size={16} />
          <span>05 Aug 2026</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin size={16} />
          <span>{event?.location}</span>
        </div>

        {/* Price */}
        <div className="text-2xl font-bold text-indigo-400">
          ${event?.ticketPrice}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <Link
          href={`/events/${event?._id}`}
          className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-indigo-500 active:scale-[0.98]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;