"use client";

import { useTranslations } from "next-intl";
import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link, useRouter } from "@/i18n/navigation";
import type { NotificationResponse } from "@/interface/response";
import { NotificationItem } from "./NotificationItem";
import { NotificationsEmptyState } from "./NotificationsEmptyState";
import { NotificationsSkeleton } from "./NotificationsSkeleton";

interface NotificationDropdownProps {
  notifications: NotificationResponse[];
  unreadCount: number;
  isLoading: boolean;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDropdown({
  notifications,
  unreadCount,
  isLoading,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) {
  const t = useTranslations("header.notifications");
  const router = useRouter();

  const handleOpenNotification = (notification: NotificationResponse) => {
    onMarkAsRead(notification.id);

    if (notification.href) {
      router.push(notification.href);
    }
  };

  return (
    <DropdownMenuContent
      align="end"
      sideOffset={10}
      className="w-[min(calc(100vw-2rem),24rem)] max-h-[400px] overflow-hidden p-0"
    >
      <DropdownMenuLabel className="flex items-start justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{t("title")}</p>
          <p className="mt-0.5 text-xs font-normal text-muted-foreground">
            {t("unreadCount", { count: unreadCount })}
          </p>
        </div>
        <button
          type="button"
          className="rounded-md px-2 py-1 text-xs font-semibold text-blue-600 outline-none hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          disabled={unreadCount === 0}
          onClick={onMarkAllAsRead}
        >
          {t("markAllAsRead")}
        </button>
      </DropdownMenuLabel>

      <DropdownMenuSeparator className="m-0" />

      <div className="max-h-[287px] overflow-y-auto">
        {isLoading && <NotificationsSkeleton />}
        {!isLoading && notifications.length === 0 && <NotificationsEmptyState />}
        {!isLoading &&
          notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onOpen={handleOpenNotification}
            />
          ))}
      </div>

      <DropdownMenuSeparator className="m-0" />

      <Link
        href="/notifications"
        className="block px-4 py-3 text-center text-sm font-semibold text-blue-600 outline-none hover:bg-blue-50 focus-visible:bg-blue-50"
      >
        {t("viewAll")}
      </Link>
    </DropdownMenuContent>
  );
}
