"use client";

import { authClient } from "@/libs/auth-client";
import {ArrowRightFromSquare} from "@gravity-ui/icons";
import {Avatar, Dropdown, Label, toast} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MobileMenu() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const dashboardPath =
    session?.user?.role === "admin"
      ? "/admin"
      : session?.user?.role === "organizer"
      ? "/organizer"
      : "/attendee";

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Log out successful");
          router.push("/login");
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full ring-2 ring-slate-800 transition hover:ring-indigo-500 md:hidden">
        <Avatar>
          <Avatar.Image
            alt={session?.user?.name}
            src={session?.user?.image as string}
            className="object-cover"
          />
          <Avatar.Fallback delayMs={600}>{session?.user?.name.charAt(0).toUpperCase()}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover className="border border-slate-800 bg-slate-900 text-white shadow-2xl max-w-xs w-full md:hidden">

        <div className="border-b border-slate-800 px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar size="sm">
              <Avatar.Image
                alt={session?.user?.name}
                src={session?.user?.image as string}
                className="object-cover"
              />
              <Avatar.Fallback delayMs={600}>{session?.user?.name.charAt(0).toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-white">{session?.user?.name}</p>
              <p className="text-xs text-slate-400">{session?.user?.email}</p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item className="bg-slate-900 hover:bg-slate-800">
            <Link
              href={"/"}
              className="w-full"
            >
              <Label className="text-slate-300">Home</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item className="bg-slate-900 hover:bg-slate-800">
            <Link href={"/events"} className="w-full">
              <Label className="text-slate-300">Events</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item className="bg-slate-900 hover:bg-slate-800">
              <Link href={dashboardPath} className="w-full">
                <Label className="text-slate-300">Dashboard</Label>
              </Link>
          </Dropdown.Item>

          <Dropdown.Item 
            onAction={handleLogout} 
            variant="danger"
            className="transition hover:bg-red-500/10 hover:text-red-300"
          >
            <div className="flex w-full items-center justify-between">
              <Label className="text-red-400">Log Out</Label>
              <ArrowRightFromSquare className="size-4 text-red-400" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}