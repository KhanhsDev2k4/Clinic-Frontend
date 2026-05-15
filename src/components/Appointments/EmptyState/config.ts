import { APPOINTMENT_TAB } from "@/components/Appointments/config";
import { CalendarX, ClipboardCheck, SunMedium, XCircle } from "lucide-react";

export const EMPTY_CONFIG: Record<APPOINTMENT_TAB, any> = {
  upcoming: {
    Icon: CalendarX,
    title: "No upcoming appointments",
    sub: "Book your first consultation with our doctors",
    showBook: true,
  },
  today: {
    Icon: SunMedium,
    title: "Nothing scheduled today",
    sub: "Your schedule is clear for today",
    showBook: false,
  },
  completed: {
    Icon: ClipboardCheck,
    title: "No completed appointments",
    sub: "Your completed visits will appear here",
    showBook: false,
  },
  cancelled: {
    Icon: XCircle,
    title: "No cancelled appointments",
    sub: "Cancelled appointments will appear here",
    showBook: false,
  },
};
