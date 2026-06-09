"use client";

import { useTranslations } from "next-intl";

import { EXCEPTION_TYPE } from "@/common";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExceptionTypeBadgeProps {
  type: EXCEPTION_TYPE;
}

export function ExceptionTypeBadge({ type }: ExceptionTypeBadgeProps) {
  const t = useTranslations("doctorScheduleExceptions.types");
  const isLeave = type === EXCEPTION_TYPE.LEAVE;

  return (
    <Badge
      variant="outline"
      className={cn(
        "border-transparent",
        isLeave
          ? "bg-red-50 text-red-700 ring-1 ring-red-100"
          : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
      )}
    >
      {isLeave ? t("leave") : t("extra")}
    </Badge>
  );
}
