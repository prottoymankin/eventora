import { requireRole } from "@/libs/session";
import { ReactNode } from "react";

const OrganizerDashboard = async ({ children } : { children: ReactNode }) => {
  await requireRole('organizer');

  return children;
};

export default OrganizerDashboard;