import OrganizerEventsTable from "@/components/ui/OrganizerEventsTable";
import { getOrganizerEventsById } from "@/libs/api/events";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";

const MyEventsPage = async () => {
  const user  = await getSession();

  if (!user?.id) redirect("/login");

  const { events } = await getOrganizerEventsById(user.id);

  return (
    <div className="p-4 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            My Events
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all your events.
          </p>
        </div>
      </div>

      <OrganizerEventsTable 
        events={events} 
      />
    </div>
  );
};

export default MyEventsPage;