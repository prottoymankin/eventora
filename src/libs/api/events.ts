import { serverFetch } from "../server"

export const getEvents = async () => {
  return serverFetch("/api/events");
}

export const getEventById = async (id : string) => {
  return serverFetch(`/api/event/${id}`);
}

export const getApprovedEvents = async () => {
  return serverFetch("/api/approved-events");
}

export const getOrganizerEventsById = async ( id : string ) => {
  return serverFetch(`/api/organizer-events/${id}`)
}