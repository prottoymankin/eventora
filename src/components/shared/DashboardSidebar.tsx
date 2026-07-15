import type {ComponentType, SVGProps} from "react";

import {Bars, House, Person, Calendar, Heart, CirclePlus, Persons, Ticket} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { getSession } from "@/libs/session";
import Link from "next/link";
import { ClockCheck } from "lucide-react";

export async function DashboardSidebar() {
  const user = await getSession();

  const attendeeNavItems : {
    icon: ComponentType<SVGProps<SVGSVGElement>>; 
    label: string, 
    href: string
  }[] = [
    { icon: Calendar, label: "My Registered Events", href: "/attendee/my-registered-events" },
    { icon: Heart, label: "Favorites Events", href: "/attendee/favorite-events" },
    { icon: Person, label: "Profile", href: "/attendee/profile" },
  ];

  const organizerNavItems : {
    icon: ComponentType<SVGProps<SVGSVGElement>>; 
    label: string, 
    href: string
  }[] = [
     { icon: CirclePlus, label: "Add Event", href: "/organizer/add-events" },
     { icon: Calendar, label: "My Events", href: "/organizer/my-events" },
     { icon: ClockCheck, label: "Booking Requests", href: "/organizer/booking-requests" },
  ];

  const adminNavItems : {
    icon: ComponentType<SVGProps<SVGSVGElement>>; 
    label: string, 
    href: string
  }[] = [
     { icon: Persons, label: "All Users", href: "/admin/users" },
     { icon: Calendar, label: "All Events", href: "/admin/events" },
     { icon: Ticket, label: "All Bookings", href: "/admin/bookings" },
  ];

  const userRole = {
    "attendee": attendeeNavItems,
    "organizer": organizerNavItems,
    "admin": adminNavItems
  };

  const navItems = userRole[user?.role as keyof typeof userRole] ?? [];

  const navContent = navItems.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className="group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:bg-slate-800 hover:text-white"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 transition-all duration-200 group-hover:bg-indigo-600">
        <item.icon className="h-5 w-5 text-slate-400 transition-colors duration-200 group-hover:text-white" />
      </div>

      <span>{item.label}</span>
    </Link>
  ));

  return (
    <>
      <aside
        className="hidden lg:block w-xs p-4 min-h-screen bg-slate-900 border-r border-slate-800"
      >
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800 px-4 py-3 text-slate-300 transition hover:border-indigo-500 hover:bg-slate-700 hover:text-white"
        >
          <House className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        {navContent}
      </aside>

      <div 
        className="block lg:hidden bg-slate-900 border-r border-slate-800 p-4"
      >
        <Drawer>
          <div className="space-x-4">
            <Button
              className="border border-slate-800 bg-slate-900 text-slate-300 transition-all duration-200 hover:border-indigo-500 hover:bg-slate-800 hover:text-white"
              isIconOnly
            >
              <Bars />
            </Button>
            
            <Link
              href="/"
              className="text-2xl font-bold text-white"
            >
              Event<span className="text-indigo-500">ora</span>
            </Link>
          </div>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog
                className="border-r border-slate-800 bg-slate-900 text-white" 
              >
                <Drawer.CloseTrigger
                  className="bg-slate-800 p-2 text-slate-300 transition-all duration-200 hover:bg-indigo-600 hover:text-white"
                />
                <Drawer.Body className="mt-4">
                  <nav className="flex flex-col gap-1">
                    {navContent}
                  </nav>
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}