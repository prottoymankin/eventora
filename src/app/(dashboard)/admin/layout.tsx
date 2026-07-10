import { requireRole } from "@/libs/session";
import { ReactNode } from "react";

const AdminDashboard = async ({ children } : { children: ReactNode}) => {
  await requireRole('admin');

  return children;
};

export default AdminDashboard;