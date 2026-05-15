"use client";
import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Search } from "lucide-react";
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
import { BOOKING_TYPE } from "@/common";
import { useDebounce } from "@/hooks/useDebounce";
import { usePatientAppointment } from "@/hooks/patient/usePatientAppointment";
import { APPOINTMENT_TAB } from "@/components/Appointments/config";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import { useVirtualizer } from "@tanstack/react-virtual";

const CARD_ESTIMATED_HEIGHT = 120;

interface TabContentProps {
  tab: APPOINTMENT_TAB;
}

export interface AppointmentFilterFormValues extends BaseFilter {
  keyword?: string;
  bookingType?: BOOKING_TYPE;
  typeTime?: APPOINTMENT_TAB;
}

function TabContent({ tab }: TabContentProps) {
  const initialValues = useRef<AppointmentFilterFormValues>({
    keyword: "",
    typeTime: tab,
  });

  const formik = useFormik<AppointmentFilterFormValues>({
    initialValues: initialValues.current,
    onSubmit: () => {},
  });

  const debouncedKeyword = useDebounce(formik.values.keyword, 600);

  const filter: AppointmentFilterFormValues = {
    keyword: debouncedKeyword,
    bookingType: formik.values.bookingType,
    typeTime: formik.values.typeTime,
  };

  const patientAppointment = usePatientAppointment(filter);

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
    <div className="flex flex-col gap-3">
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
        <div
          ref={parentRef}
          style={{
            height: "600px",
            overflowY: "auto",
          }}
        >
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
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  paddingBottom: 12,
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
