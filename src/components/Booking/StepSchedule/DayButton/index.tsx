"use client";

import { CalendarDayButton } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { CalendarDay, Modifiers } from "react-day-picker";

export type DayStatus = "available" | "full" | "overtime" | "disabled";

const DayButton = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
    dayStatus?: DayStatus;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, modifiers, day, dayStatus = "available", ...restProps } = props;

  const isDisabled = dayStatus === "disabled" || dayStatus === "full";
  const isOvertime = dayStatus === "overtime";

  const button = (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      {...restProps}
      disabled={isDisabled}
      className={cn(
        restProps.className,
        // Full / disabled: xám, không hover
        (dayStatus === "full" || dayStatus === "disabled") &&
          "bg-muted text-muted-foreground opacity-50 cursor-not-allowed hover:bg-muted",
        // Overtime: border vàng/cam
        isOvertime && "border-2 border-amber-400 hover:border-amber-500 hover:bg-blue-50"
      )}
    >
      {children}
    </CalendarDayButton>
  );

  if (isOvertime) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">Extended hours</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return button;
};

export default DayButton;
