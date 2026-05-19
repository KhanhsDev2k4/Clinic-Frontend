"use client";
import { useCallback, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { CalendarIcon, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AppointmentCard from "@/components/Appointments/AppointmentCard";
import AppointmentSkeleton from "@/components/Appointments/AppointmentSkeleton";
import EmptyState from "@/components/Appointments/EmptyState";
import { BaseFilter } from "@/interface/response";
import { APPOINTMENT_STATUS, BOOKING_TYPE } from "@/common";
import { useDebounce } from "@/hooks/useDebounce";
import { usePatientAppointment } from "@/hooks/patient/usePatientAppointment";
import { APPOINTMENT_TAB } from "@/components/Appointments/config";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useForceRefreshAppointment } from "@/components/Appointments/TabContent/hook";
import { formatDate, formatDateToApi } from "@/lib/utils";
import { endOfDay, set, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const CARD_ESTIMATED_HEIGHT = 120;

interface TabContentProps {
  tab: APPOINTMENT_TAB;
}

export interface AppointmentFilterFormValues extends BaseFilter {
  keyword?: string;
  bookingType?: BOOKING_TYPE | TYPE_OF_FILTER_ALL_VALUE;
  date?: DateRange;
  status?: APPOINTMENT_STATUS[];
}

function TabContent({ tab }: TabContentProps) {
  const { swr } = useForceRefreshAppointment();

  const initialValues = useRef<AppointmentFilterFormValues & { typeTime: APPOINTMENT_TAB }>({
    keyword: "",
    typeTime: tab,
    bookingType: FILTER_ALL_VALUE,
    date: {
      from: new Date(),
      to: set(new Date(), {
        date: new Date().getDate() + 7,
        hours: 23,
        minutes: 59,
        seconds: 59,
      }),
    },
    status: undefined,
  });

  const formik = useFormik<AppointmentFilterFormValues & { typeTime: APPOINTMENT_TAB }>({
    initialValues: initialValues.current,
    onSubmit: () => {},
  });

  const debouncedKeyword = useDebounce(formik.values.keyword, 600);

  const buildFilter = useCallback(() => {
    const { typeTime, bookingType } = formik.values;

    const base = { keyword: debouncedKeyword, bookingType };
    const today = new Date();

    const CONFIG: Partial<
      Record<
        APPOINTMENT_TAB,
        Partial<AppointmentFilterFormValues & { fromDate: string; toDate: string }>
      >
    > = {
      [APPOINTMENT_TAB.TODAY]: {
        status: [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.IN_PROGRESS],
        fromDate: formatDateToApi(startOfDay(today), "HH:mm dd/MM/yyyy"),
        toDate: formatDateToApi(endOfDay(today), "HH:mm dd/MM/yyyy"),
      },

      [APPOINTMENT_TAB.UPCOMING]: {
        status: [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.IN_PROGRESS],
        fromDate: formatDateToApi(startOfDay(formik.values.date?.from!), "HH:mm dd/MM/yyyy"),
        toDate: formatDateToApi(endOfDay(formik.values.date?.to!), "HH:mm dd/MM/yyyy"),
      },

      [APPOINTMENT_TAB.COMPLETED]: {
        status: [APPOINTMENT_STATUS.COMPLETED],
        fromDate: formatDateToApi(startOfDay(formik.values.date?.from!), "HH:mm dd/MM/yyyy"),
        toDate: formatDateToApi(endOfDay(formik.values.date?.to!), "HH:mm dd/MM/yyyy"),
      },

      [APPOINTMENT_TAB.CANCELLED]: {
        status: [APPOINTMENT_STATUS.CANCELLED],
        fromDate: formatDateToApi(startOfDay(formik.values.date?.from!), "HH:mm dd/MM/yyyy"),
        toDate: formatDateToApi(endOfDay(formik.values.date?.to!), "HH:mm dd/MM/yyyy"),
      },

      [APPOINTMENT_TAB.PENDING]: {
        status: [APPOINTMENT_STATUS.PENDING],
        fromDate: formatDateToApi(startOfDay(formik.values.date?.from!), "HH:mm dd/MM/yyyy"),
        toDate: formatDateToApi(endOfDay(formik.values.date?.to!), "HH:mm dd/MM/yyyy"),
      },
    };

    return {
      ...base,
      ...CONFIG[typeTime],
    };
  }, [debouncedKeyword, formik.values.typeTime, formik.values.bookingType, formik.values.date]);

  const patientAppointment = usePatientAppointment(buildFilter());

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    patientAppointment.mutate();
  }, [swr?.data]);

  useEffect(() => {
    formik.setFieldValue("typeTime", tab);
  }, [tab]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: patientAppointment?.data?.body?.data?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_ESTIMATED_HEIGHT,
    overscan: 3,
  });

  return (
    <div className="flex flex-col gap-3 h-full flex-1">
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 h-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            name="keyword"
            className="pl-8 text-sm"
            placeholder="Search by doctor, specialty, code…"
            id="keyword"
            value={formik.values.keyword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {![APPOINTMENT_TAB.TODAY].includes(tab) && (
          <div className="h-full w-60">
            <Popover>
              <PopoverTrigger asChild className="w-full">
                <Button
                  variant="outline"
                  id="date-picker-range"
                  className="justify-start px-2.5 font-normal"
                >
                  <CalendarIcon />
                  {formik.values.date?.from ? (
                    formik.values.date?.to ? (
                      <>
                        {formatDate(formik.values.date?.from)} -{" "}
                        {formatDate(formik.values.date?.to)}
                      </>
                    ) : (
                      formatDate(formik.values.date?.from)
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={formik.values.date}
                  defaultMonth={formik.values.date?.from}
                  onSelect={(date) => {
                    formik.setFieldValue("date", date);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        <div className="h-full">
          <Select
            name="bookingType"
            value={formik.values.bookingType}
            onValueChange={(value: BOOKING_TYPE) => formik.setFieldValue("bookingType", value)}
          >
            <SelectTrigger className="h-full text-sm w-40">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FILTER_ALL_VALUE}>All types</SelectItem>
              {Object.values(BOOKING_TYPE).map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {patientAppointment?.isLoading ? (
        <AppointmentSkeleton />
      ) : !patientAppointment?.data?.body?.data?.length ? (
        <EmptyState tab={tab} />
      ) : (
        <div ref={parentRef} className="h-full flex-1 overflow-y-auto">
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: "relative",
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.key}
                data-index={virtualRow.index}
                className="absolute top-0 right-0 left-0 px-1 py-2"
                ref={virtualizer.measureElement}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <AppointmentCard apt={patientAppointment?.data?.body?.data?.[virtualRow?.index]!} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TabContent;
