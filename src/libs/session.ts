import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation";

export const getSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const requireRole = async (role: string) => {
  const user = await getSession();

  if (!user) redirect('/login');

  if (user.user.role !== role) redirect('/unauthorized');
}