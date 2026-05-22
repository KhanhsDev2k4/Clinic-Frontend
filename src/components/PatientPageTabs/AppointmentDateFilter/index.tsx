"use client";

import { CalendarDays } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFilterAppointmentsData } from "@/components/PatientPageTabs/hook";

interface AppointmentDateFilterProps {}

export function AppointmentDateFilter({}: AppointmentDateFilterProps) {
  const { data, mutateData } = useFilterAppointmentsData();

  const hasRange =
    !!data?.date?.from &&
    !!data?.date?.to &&
    data?.date.from.toDateString() !== data?.date.to.toDateString();

  const dateSet = new Set<string>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 px-2.5 text-xs font-normal border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300"
        >
          <CalendarDays className="h-3.5 w-3.5 shrink-0" />
          {/*<span className="max-w-40 truncate">{label}</span>*/}
          {hasRange && (
            <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[10px] font-medium text-blue-700">
              R
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-auto p-0 shadow-md border-gray-200" sideOffset={6}>
        <Calendar
          mode="range"
          selected={data?.date}
          defaultMonth={data?.date?.from ?? new Date()}
          onSelect={(range) => {
            mutateData({ date: range ?? undefined });
          }}
          modifiers={{
            hasAppointment: (date) => dateSet.has(date.toDateString()),
          }}
          modifiersClassNames={{
            hasAppointment:
              "font-semibold underline decoration-blue-400 decoration-2 underline-offset-2",
          }}
          numberOfMonths={2}
          className="p-3"
        />

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => mutateData({ date: { from: new Date(), to: undefined } })}
          >
            Hôm nay
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700"
            onClick={() => mutateData({ date: undefined })}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
