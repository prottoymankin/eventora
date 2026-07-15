import { serverFetch } from "../server"

export const getEvents = async () => {
  return serverFetch("/api/events");
}

export const getEventById = async (id : string) => {
  return serverFetch(`/api/event/${id}`);
}