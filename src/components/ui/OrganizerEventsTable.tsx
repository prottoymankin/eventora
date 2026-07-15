"use client";

import { deleteEventById } from "@/libs/actions/events";
import { Event } from "@/types/events";
import { Button, Chip, toast } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const OrganizerEventsTable = ({ events } : { events : Event[] }) => {
  const router = useRouter();

  const handleDeleteEvent = async ( id : string) => {
    const response = await deleteEventById(id);

    if (response.status) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.success("An error occurred, please try again.");
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Title
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Location
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Type
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Max Attendee
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Ticket Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event?._id}
              className="border-b border-slate-800 transition-colors hover:bg-slate-800/40"
            >
              <td className="px-6 py-4 font-medium text-white">
                {event?.title}
              </td>

              <td className="px-6 py-4 font-medium text-white">
                {event?.location}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {event?.category}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {event?.eventType}
              </td>

              <td className="px-6 py-4 text-slate-300">
                {event?.maxAttendee}
              </td>

              <td className="px-6 py-4 text-slate-400">
                ${event?.ticketPrice}
              </td>

              <td className="px-6 py-4 text-slate-400">
                  <Chip 
                    color={event?.status === "approved" ? "success" : event?.status === "pending" ? "warning" : "danger"}
                    variant="primary"
                  >
                    {event?.status}
                  </Chip>
              </td>

              <td className="px-6 py-4 text-center flex gap-2">
                <Button
                  isIconOnly
                  variant="danger"
                  onClick={() => handleDeleteEvent(event?._id)}
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrganizerEventsTable;
