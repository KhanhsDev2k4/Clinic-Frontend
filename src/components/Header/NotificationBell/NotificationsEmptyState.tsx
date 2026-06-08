import { BellOff } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotificationsEmptyState() {
  const t = useTranslations("header.notifications");

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <BellOff className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-gray-900">{t("emptyTitle")}</p>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{t("emptyDescription")}</p>
    </div>
  );
}
