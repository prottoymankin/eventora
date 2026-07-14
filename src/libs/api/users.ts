import { serverFetch } from "../server"

export const getUsers = async () => {
  return serverFetch("/api/users");
}