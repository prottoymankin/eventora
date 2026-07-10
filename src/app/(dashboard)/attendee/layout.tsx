import { requireRole } from "@/libs/session";
import { ReactNode } from "react";

const AttendeeDashboard = async ({ children } : { children: ReactNode}) => {
  await requireRole('attendee');

  return children;
};

export default AttendeeDashboard;