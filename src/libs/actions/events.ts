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