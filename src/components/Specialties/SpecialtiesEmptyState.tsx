"use client";

import { SearchX } from "lucide-react";
import { useTranslations } from "next-intl";

export function SpecialtiesEmptyState() {
  const t = useTranslations("specialties");

  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-white px-4 text-center">
      <SearchX className="size-10 text-muted-foreground" />
      <h2 className="mt-4 text-lg font-semibold text-gray-900">{t("emptyTitle")}</h2>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">{t("emptyDescription")}</p>
    </div>
  );
}
