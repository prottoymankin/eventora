import AdminBookingsTable from "@/components/ui/AdminBookingsTable";
import { getAllBookings } from "@/libs/api/bookings";
import { Booking } from "@/types/bookings";

const BookingsListPage = async () => {
  const { bookings } : { bookings : Booking[] } = await getAllBookings();

  return (
    <div className="p-4 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          All Bookings
        </h1>
      </div>

      <AdminBookingsTable bookings={bookings} />

    </div>
  );
};

export default BookingsListPage;