import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout({
  children,
}: AuthLayoutProps) {
  const session = await getSession();

  if (session?.user.role === "attendee") {
    redirect("/attendee");
  }

  if (session?.user.role === "organizer") {
    redirect("/organizer");
  }

  if (session?.user.role === "admin") {
    redirect("/admin");
  }

  return <>{children}</>;
}