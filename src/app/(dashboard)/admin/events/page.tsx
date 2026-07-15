import EventsTable from "@/components/ui/EventsTable";
import { getEvents } from "@/libs/api/events";
import { Event } from "@/types/events";

const AllEventsPage = async () => {
  const { events } : { events : Event[] } = await getEvents();
  console.log(events);

  return (
    <div className="p-4 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Events
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all events.
          </p>
        </div>
      </div>

      <EventsTable events={events} />
    </div>
  );
};

export default AllEventsPage;