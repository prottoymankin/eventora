import { serverFetch } from "../server"

export const getEvents = async () => {
  return serverFetch("/api/events");
}