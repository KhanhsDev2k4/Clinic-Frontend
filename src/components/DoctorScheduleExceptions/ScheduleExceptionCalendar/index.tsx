"use client";

import { eachDayOfInterval, endOfMonth, format, isSameDay, startOfMonth } from "date-fns";
import { useTranslations } from "next-intl";

import { EXCEPTION_TYPE } from "@/common";
import { ExceptionTypeBadge } from "@/components/DoctorScheduleExceptions/ExceptionTypeBadge";
import { cn } from "@/lib/utils";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

interface ScheduleExceptionCalendarProps {
  exceptions: DoctorScheduleExceptionResponse[];
  month: number;
  year: number;
}

const weekDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

export function ScheduleExceptionCalendar({
  exceptions,
  month,
  year,
}: ScheduleExceptionCalendarProps) {
  const t = useTranslations("doctorScheduleExceptions");
  const monthDate = new Date(year, month, 1);
  const days = eachDayOfInterval({
    start: startOfMonth(monthDate),
    end: endOfMonth(monthDate),
  });
  const leadingEmptyDays = monthDate.getDay();

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-muted-foreground">
        {weekDays.map((day) => (
          <div key={day}>{t(`weekdays.${day}`)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: leadingEmptyDays }).map((_, index) => (
          <div key={`empty-${index}`} className="min-h-24 rounded-lg bg-gray-50" />
        ))}

        {days.map((day) => {
          const dayExceptions = exceptions.filter((exception) =>
            isSameDay(new Date(`${exception.exceptionDate}T00:00:00`), day)
          );
          const hasLeave = dayExceptions.some((exception) => exception.type === EXCEPTION_TYPE.LEAVE);
          const hasExtra = dayExceptions.some((exception) => exception.type === EXCEPTION_TYPE.EXTRA);

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-24 rounded-lg border bg-white p-2 transition-colors",
                hasLeave && "border-red-200 bg-red-50/70",
                hasExtra && "border-emerald-200 bg-emerald-50/70"
              )}
            >
              <div className="mb-2 text-sm font-medium text-gray-900">{format(day, "d")}</div>
              <div className="space-y-1">
                {dayExceptions.map((exception) => (
                  <div key={exception.id} className="space-y-1">
                    <ExceptionTypeBadge type={exception.type} />
                    <p className="line-clamp-2 text-xs text-muted-foreground">{exception.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
