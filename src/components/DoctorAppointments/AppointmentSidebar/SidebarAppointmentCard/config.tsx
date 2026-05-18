import { BOOKING_TYPE } from "@/common";
import { Hash, MonitorSmartphone, Phone } from "lucide-react";

export const BOOKING_TYPE_CONFIG: Record<BOOKING_TYPE, { label: string; icon: React.ReactNode }> = {
  [BOOKING_TYPE.ONLINE]: {
    label: "Online",
    icon: <MonitorSmartphone className="size-3" />,
  },
  [BOOKING_TYPE.PHONE]: {
    label: "Điện thoại",
    icon: <Phone className="size-3" />,
  },
  [BOOKING_TYPE.WALK_IN]: {
    label: "Trực tiếp",
    icon: <Hash className="size-3" />,
  },
};
