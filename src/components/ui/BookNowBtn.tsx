"use client";

import { eventBooking } from "@/libs/actions/bookings";
import { authClient } from "@/libs/auth-client";
import { Event } from "@/types/events";
import { toast } from "@heroui/react";
import { Ticket } from "lucide-react";

const BookNowBtn = ({ eventDetails } : { eventDetails : Event }) => {
  const { data: session } = authClient.useSession();

  if (!session?.user) return;

  const handleEventBooking = async () => {
    const eventBookingData = {
      userId: session.user.id,
      userName: session.user.name,

      organizerId: eventDetails.organizerId,
      organizerName: eventDetails.organizerName,

      eventId: eventDetails._id,
      eventTitle: eventDetails.title,
      ticketPrice: eventDetails.ticketPrice,

      bookingStatus: "pending",
      createdAt: new Date().toISOString()
    }

    const response = await eventBooking(eventBookingData);

    if (response.status) {
      toast.success(response.message);
    } else {
      toast.danger(response.message);
    }
  }
  
  return (
     <button 
      className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 active:scale-95"
      onClick={handleEventBooking}
    >
      <Ticket size={18} />
      Book Now
    </button>
  );
};

export default BookNowBtn;