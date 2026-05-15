"use client";
import { BOOKING_TYPE } from "@/common";
import { Badge } from "@/components/ui/badge";

function BookingTypeBadge({ type }: { type: BOOKING_TYPE }) {
  return (
    <Badge
      variant="outline"
      className={
        type === "ONLINE"
          ? "bg-violet-50 text-violet-700 border-violet-200"
          : "bg-muted text-muted-foreground"
      }
    >
      {type === "ONLINE" ? "Online" : "In-person"}
    </Badge>
  );
}

export default BookingTypeBadge;
