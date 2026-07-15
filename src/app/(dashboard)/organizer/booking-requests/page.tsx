import BookingRequestTable from "@/components/ui/BookingRequestTable";
import { getBookingsByOrganizerId } from "@/libs/api/bookings";
import { getSession } from "@/libs/session";
import { Booking } from "@/types/bookings";
import { redirect } from "next/navigation";

const BookingRequests = async () => {
  const user = await getSession();

  if (!user?.id) redirect("/login");

  const {bookings} : {bookings : Booking[]} = await getBookingsByOrganizerId(user.id);

  return (
    <div className="p-4 space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Booking Requests
          </h1>

          <p className="mt-1 text-slate-400">
            Manage all booking requests.
          </p>
        </div>
      </div>
      
      <BookingRequestTable bookings={bookings} />
    </div>
  );
};

export default BookingRequests;