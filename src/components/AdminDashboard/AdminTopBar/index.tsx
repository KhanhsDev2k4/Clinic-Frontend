"use client";

import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

export function AdminTopBar() {
  const t = useTranslations("admin");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-gray-900">
          {t("dashboard.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("dashboard.subtitle")}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-white border border-transparent hover:border-gray-200 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}
