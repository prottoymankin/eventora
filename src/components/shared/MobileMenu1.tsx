import { Bars} from "@gravity-ui/icons";
import { Button, Dropdown, Label } from "@heroui/react";
import Link from "next/link";

export function MobileMenu1() {

  return (
    <Dropdown>
      <Button
        className="border border-slate-800 bg-slate-900 text-slate-300 transition-all duration-200 hover:border-indigo-500 hover:bg-slate-800 hover:text-white md:hidden"
        isIconOnly
      >
        <Bars className="size-5" />
      </Button>

      <Dropdown.Popover className="border border-slate-800 bg-slate-900 text-white shadow-2xl max-w-xs w-full md:hidden">

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
            <Link href={"/login"} className="w-full">
              <Label className="text-slate-300">Login</Label>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item className="bg-slate-900 hover:bg-slate-800">
            <Link href={"/register"} className="w-full">
              <Label className="text-slate-300">Register</Label>
            </Link>
          </Dropdown.Item>
          
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}