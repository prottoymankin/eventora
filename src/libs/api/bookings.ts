import { serverFetch } from "../server"

export const getAllBookings = async () => {
  return serverFetch("/api/bookings");
}

export const getBookingsByOrganizerId = async ( id : string ) => {
  return serverFetch(`/api/bookings/organizer/${id}`);
}