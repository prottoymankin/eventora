import { Booking } from "@/types/bookings";
import { formatDate } from "@/utils/formateDate";
import { Button, Chip } from "@heroui/react";
import { Check, X } from "lucide-react";

const BookingRequestTable = ({bookings} : {bookings: Booking[]}) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Date
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Attendee
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
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking?._id}
              className="border-b border-slate-800 transition-colors hover:bg-slate-800/40"
            >
              <td className="px-6 py-4 font-medium text-white">
                {formatDate(booking?.createdAt)}
              </td>

              <td className="px-6 py-4 font-medium text-white">
                {booking?.userName}
              </td>

              <td className="px-6 py-4 font-medium text-white">
                {booking?.eventTitle}
              </td>

              <td className="px-6 py-4 text-slate-300">
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

              <td className="px-6 py-4 text-center flex gap-2">
                <Button
                  isIconOnly
                  className={"bg-green-600"}
                >
                  <Check />
                </Button>
                
                <Button
                  isIconOnly
                  variant="danger"
                >
                  <X />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingRequestTable;