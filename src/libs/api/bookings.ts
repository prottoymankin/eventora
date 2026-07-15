import { serverFetch } from "../server"

export const getAllBookings = async () => {
  return serverFetch("/api/bookings");
}