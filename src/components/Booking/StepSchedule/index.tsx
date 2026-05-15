"use client";

import { DAY_STATUS, EXCEPTION_TYPE } from "@/common";
import CalendarLegend from "@/components/Booking/StepSchedule/CalendarLegend";
import DayButton from "@/components/Booking/StepSchedule/DayButton";
import TimePicker from "@/components/Booking/StepSchedule/TimePicker";
import { useBookingStore } from "@/components/Booking/useBookingStore";
import { StepScheduleSkeleton } from "@/components/StepScheduleSkeleton";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { usePublicDoctorScheduleExceptions } from "@/hooks/public/usePublicDoctorSchedule";
import { formatDateToApi, parseDate } from "@/lib/utils";
import { isBefore, isSameDay, startOfDay } from "date-fns";
import { useRef, useState } from "react";

function StepSchedule() {
  const today = useRef(startOfDay(new Date()));

  const [displayMonth, setDisplayMonth] = useState(today.current);

  const startOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1);
  const endOfMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0);

  const { setBookingState, store } = useBookingStore();

  const publicDoctorScheduleExceptions = usePublicDoctorScheduleExceptions({
    doctorId: store?.doctor?.id!,
    from: formatDateToApi(startOfMonth),
    to: formatDateToApi(endOfMonth),
  });

  const getDayStatus = (date: Date): DAY_STATUS => {
    if (isBefore(date, today.current)) return DAY_STATUS.DISABLED;

    const exception = publicDoctorScheduleExceptions.data?.body?.data?.find((e) =>
      isSameDay(parseDate(e.exceptionDate, "dd/MM/yyyy")!, date)
    );

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend) {
      return exception?.type === EXCEPTION_TYPE.EXTRA ? DAY_STATUS.OVERTIME : DAY_STATUS.DISABLED;
    }

    return exception?.type === EXCEPTION_TYPE.LEAVE ? DAY_STATUS.LEAVE : DAY_STATUS.AVAILABLE;
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    const status = getDayStatus(date);
    if (status === DAY_STATUS.DISABLED || status === DAY_STATUS.FULL || status === DAY_STATUS.LEAVE)
      return;
    setBookingState({ date, time: undefined });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:gap-6 h-full">
      <Card className="mx-auto w-fit p-0 shrink-0">
        {publicDoctorScheduleExceptions.isLoading ? (
          <StepScheduleSkeleton />
        ) : (
          <CardContent className="p-0 h-full flex flex-col">
            <Calendar
              mode="single"
              month={displayMonth}
              selected={store?.date}
              onSelect={handleSelectDate}
              onMonthChange={setDisplayMonth}
              disabled={(date) => isBefore(date, today.current)}
              numberOfMonths={1}
              captionLayout="dropdown"
              className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
              formatters={{
                formatMonthDropdown: (date) => date.toLocaleString("default", { month: "long" }),
              }}
              components={{
                DayButton: (props) => (
                  <DayButton {...props} dayStatus={getDayStatus(props.day.date)} />
                ),
              }}
            />
            <div className="border-t border-border mt-auto">
              <CalendarLegend />
            </div>
          </CardContent>
        )}
      </Card>

      <Card className="mx-auto w-fit p-0 flex-1 md:flex-none min-w-70">
        <CardContent className="p-4 h-full">
          <TimePicker />
        </CardContent>
      </Card>
    </div>
  );
}

export default StepSchedule;
