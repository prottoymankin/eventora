import { CreateBooking } from "@/types/bookings"
import { serverMutation } from "../server"

export const eventBooking = async (bookingData : CreateBooking) => {
  return serverMutation("/api/booking", {
    method: "POST",
    body: JSON.stringify(bookingData)
  })
}