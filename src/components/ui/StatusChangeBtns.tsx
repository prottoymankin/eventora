"use client";

import { changeBookingStatus } from "@/libs/actions/events";
import { Button, toast } from "@heroui/react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

const StatusChangeBtns = ({ id } : { id : string }) => {
  const router = useRouter();

  const handleChangeBookingStatus = async ( status : string ) => {
    const response = await changeBookingStatus(id, { status });

    if (response.status) {
      toast.success(`Booking ${status}`);
      router.refresh();
    } else {
      toast.danger("An error occurred, please try again.");
    }
  }

  return (
    <>
      <Button
        isIconOnly
        className="bg-green-600"
        onClick={() => handleChangeBookingStatus("approved")}
      >
        <Check />
      </Button>

      <Button
        isIconOnly
        className="bg-red-600"
        onClick={() => handleChangeBookingStatus("reject")}
      >
        <X />
      </Button>
    </>
  );
};

export default StatusChangeBtns;