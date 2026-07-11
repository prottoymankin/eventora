import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const requireRole = async (role: string) => {
  const user = await getSession();

  if (!user) redirect('/login');

  if (user?.role !== role) redirect('/unauthorized');
}