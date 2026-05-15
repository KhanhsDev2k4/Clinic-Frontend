"use client";

import { DAY_STATUS } from "@/common";
import { CalendarDayButton } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";
import { CalendarDay, Modifiers } from "react-day-picker";

const DayButton = (
  props: {
    day: CalendarDay;
    modifiers: Modifiers;
    dayStatus?: DAY_STATUS;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, modifiers, day, dayStatus = DAY_STATUS.AVAILABLE, ...restProps } = props;

  const isDisabled =
    dayStatus === DAY_STATUS.DISABLED ||
    dayStatus === DAY_STATUS.FULL ||
    dayStatus === DAY_STATUS.LEAVE;

  return (
    <CalendarDayButton
      day={day}
      modifiers={modifiers}
      {...restProps}
      disabled={isDisabled}
      className={cn(
        restProps.className,
        dayStatus === DAY_STATUS.DISABLED && "opacity-40 cursor-not-allowed",
        dayStatus === DAY_STATUS.FULL &&
          "border-2 border-red-400 text-red-500 opacity-70 cursor-not-allowed hover:bg-transparent",
        dayStatus === DAY_STATUS.OVERTIME &&
          "border-2 border-amber-400 text-amber-600 hover:border-amber-500 hover:bg-amber-50",
        dayStatus === DAY_STATUS.LEAVE &&
          "border-2 border-dashed border-slate-400 text-slate-400 opacity-60 cursor-not-allowed hover:bg-transparent"
      )}
    >
      {children}
    </CalendarDayButton>
  );
};

export default DayButton;
