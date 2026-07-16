import { getBookingsByAttendeeId } from "@/libs/api/bookings"
import { getSession } from "@/libs/session"
import { Booking } from "@/types/bookings"
import { formatDate } from "@/utils/formateDate"
import { Chip } from "@heroui/react"
import { redirect } from "next/navigation"

const AttendeeRegisteredEventsPage = async () => {
  const user = await getSession();

  if (!user?.id) redirect("/login");

  const { bookings } : { bookings: Booking[] } = await getBookingsByAttendeeId(user.id);

  return (
    <div className="p-5 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          All Registered Events
        </h1>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="min-w-full">
          <thead className="border-b border-slate-800 bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Organizer
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Event Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Ticket Price
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                Booking Date
              </th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking?._id}
                className="border-b border-slate-800 transition-colors hover:bg-slate-800/40"
              >
                <td className="px-6 py-4 text-slate-300">
                  {booking?.organizerName}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {booking?.eventTitle}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  ${booking?.ticketPrice}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  <Chip 
                    color={booking?.bookingStatus === "approved" ? "success" : booking?.bookingStatus === "pending" ? "warning" : "danger"}
                    variant="primary"
                  >
                    {booking?.bookingStatus}
                  </Chip>
                </td>

                <td className="px-6 py-4 text-center">
                  {formatDate(booking?.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AttendeeRegisteredEventsPage;