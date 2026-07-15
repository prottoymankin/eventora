import EventCard from "@/components/shared/EventCard";
import { getEvents } from "@/libs/api/events";
import { Event } from "@/types/events";

const EventsPage = async () => {
  const { events } : { events : Event[] } = await getEvents();

  return (
    <div className="px-5 max-w-7xl mx-auto w-full space-y-15 py-20">

      <section>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Discover Amazing Events
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Find the best events near you and book your seat before they&apos;re sold
          out.
        </p>
      </section>
          
      <section className="grid grid-cols-3 gap-5">
        {
          events.map(event => (
            <EventCard 
              key={event?._id}
              event={event} 
            />
          ))
        }
      </section>
    </div>
  );
};

export default EventsPage;