import { serverMutation } from "../server"

export const changeBookingStatus = async ( 
  id : string, 
  updateData : { status : string } 
) => {
  return serverMutation(`/api/event/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateData)
  });
}

export const deleteEventById = async (id: string) => {
  return serverMutation(`/api/event/${id}`, {
    method: "DELETE"
  });
}