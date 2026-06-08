"use client";

import {
  BellRing,
  CalendarCheck,
  CalendarX,
  MessageCircle,
  Megaphone,
  Stethoscope,
} from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { NotificationResponse } from "@/interface/response";

interface NotificationItemProps {
  notification: NotificationResponse;
  onOpen: (notification: NotificationResponse) => void;
}

const notificationIconMap = {
  appointment_booked: CalendarCheck,
  appointment_cancelled: CalendarX,
  new_message: MessageCircle,
  doctor_schedule_updated: Stethoscope,
  system_announcement: Megaphone,
};

export function NotificationItem({ notification, onOpen }: NotificationItemProps) {
  const Icon =
    notificationIconMap[notification.type as keyof typeof notificationIconMap] ?? BellRing;

  return (
    <DropdownMenuItem
      className={cn(
        "cursor-pointer rounded-none p-0 focus:bg-blue-50",
        !notification.isRead && "bg-blue-50/80"
      )}
      onSelect={() => onOpen(notification)}
    >
      <div className="flex w-full gap-3 px-3 py-3">
        <div
          className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
            notification.isRead ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-700"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <p
              className={cn(
                "line-clamp-1 text-sm leading-5 text-gray-900",
                notification.isRead ? "font-medium" : "font-semibold"
              )}
            >
              {notification.title}
            </p>
            {!notification.isRead && (
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
            )}
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
            {notification.description}
          </p>
          <p className="mt-1 text-[11px] font-medium text-blue-600">
            {formatRelativeTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </DropdownMenuItem>
  );
}
