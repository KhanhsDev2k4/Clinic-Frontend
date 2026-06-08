"use client";

import { useEffect, useMemo, useState } from "react";
import type { NotificationResponse } from "@/interface/response";
import { mockNotifications } from "@/hooks/mock/notificationMockData";

export function useNotifications() {
  const [items, setItems] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(mockNotifications);
      setIsLoading(false);
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  const unreadCount = useMemo(
    () => items.filter((notification) => !notification.isRead).length,
    [items]
  );

  const markAsRead = (notificationId: string) => {
    setItems((currentItems) =>
      currentItems.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setItems((currentItems) =>
      currentItems.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return {
    data: items,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
