import { serverMutation } from "../server"

export const updateUserRole = async (id : string, updateData : { role : string }) => {
  return serverMutation(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });
}