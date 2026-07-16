import { CreateBooking } from "@/types/bookings"
import { serverMutation } from "../server"

export const eventBooking = async (bookingData : CreateBooking) => {
  return serverMutation("/api/booking", {
    method: "POST",
    body: JSON.stringify(bookingData)
  })
}

export const changeBookingStatus = async (
  id : string,
  updateData : { bookingStatus : string }
) => {
  return serverMutation(`/api/booking/organizer/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData)
  });
}