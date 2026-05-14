"use client";

import { EXCEPTION_TYPE } from "@/common";
import DayButton, { DayStatus } from "@/components/Booking/StepSchedule/DayButton";
import { useBookingStore } from "@/components/Booking/useBookingStore";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { usePublicDoctorScheduleExceptions } from "@/hooks/public/usePublicDoctorSchedule";
import { formatDate, formatDateToApi, parseDate } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { useState } from "react";

function StepSchedule() {
  const [currentDay, setCurrentDay] = useState(new Date());

  const startOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
  const endOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0);

  const { store } = useBookingStore();

  const publicDoctorScheduleExceptions = usePublicDoctorScheduleExceptions({
    doctorId: "40024a2e-8bd4-41cb-abbb-e46f08cc87b0",
    from: formatDateToApi(startOfMonth),
    to: formatDateToApi(endOfMonth),
  });

  const getDayStatus = (date: Date): DayStatus => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return "disabled";

    const exception = publicDoctorScheduleExceptions.data?.body?.data?.find((e) =>
      isSameDay(parseDate(e.exceptionDate, "dd/MM/yyyy")!, date)
    );

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    if (isWeekend) {
      return exception?.type === EXCEPTION_TYPE.EXTRA ? "overtime" : "disabled";
    } else {
      return exception?.type === EXCEPTION_TYPE.LEAVE ? "full" : "available";
    }
  };

  return (
    <Card className="mx-auto w-fit p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={currentDay}
          selected={currentDay}
          onSelect={() => {}}
          onMonthChange={(month) => {
            setCurrentDay(month);
          }}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{
            DayButton: (props) => <DayButton {...props} dayStatus={getDayStatus(props.day.date)} />,
          }}
        />
      </CardContent>
    </Card>
  );
}

export default StepSchedule;
