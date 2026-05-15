"use client";

import { CalendarDayButton } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { CalendarDay, Modifiers } from "react-day-picker";

export type DayStatus = "available" | "full" | "overtime" | "disabled" | "leave";

const statusConfig: Record<
  DayStatus,
  {
    className?: string;
    disabled?: boolean;
    tooltip?: string;
    dot?: string;
  }
> = {
  available: {},
  disabled: {
    className: "bg-muted text-muted-foreground opacity-40 cursor-not-allowed hover:bg-muted",
    disabled: true,
  },
  full: {
    className:
      "relative bg-red-50 text-red-500 border border-red-200 cursor-not-allowed " +
      "hover:bg-red-50 font-medium shadow-sm",
    disabled: true,
    tooltip: "Đã đầy lịch — Không còn chỗ trống trong ngày này",
    dot: "bg-red-400",
  },
  overtime: {
    className:
      "relative bg-amber-50 text-amber-600 border border-amber-200 " +
      "hover:bg-amber-100 font-medium shadow-sm transition-colors duration-150",
    tooltip: "Giờ mở rộng — Có thể đặt ngoài giờ hành chính",
    dot: "bg-amber-400",
  },
  leave: {
    className:
      "relative bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed " +
      "hover:bg-slate-100 italic",
    disabled: true,
    tooltip: "Ngày nghỉ — Nhân viên đang trong kỳ nghỉ phép",
    dot: "bg-slate-400",
  },
};

const StatusDot = ({ color }: { color: string }) => (
  <span className={cn("absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full", color)} />
);

const DayButton = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
    dayStatus?: DayStatus;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, modifiers, day, dayStatus = "available", ...restProps } = props;
  const config = statusConfig[dayStatus];

  const button = (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      {...restProps}
      disabled={config.disabled ?? false}
      className={cn(
        "relative rounded-md transition-all duration-150",
        restProps.className,
        config.className
      )}
    >
      {children}
      {config.dot && <StatusDot color={config.dot} />}
    </CalendarDayButton>
  );

  if (config.tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="top"
          className={cn(
            "text-xs px-3 py-1.5 rounded-lg shadow-md border-0 font-medium",
            dayStatus === "full" && "bg-red-600 text-white",
            dayStatus === "overtime" && "bg-amber-500 text-white",
            dayStatus === "leave" && "bg-slate-600 text-white"
          )}
        >
          {config.tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
};

export default DayButton;
