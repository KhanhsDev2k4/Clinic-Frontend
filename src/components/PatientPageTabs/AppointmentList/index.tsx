"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AppointmentDateFilter } from "@/components/PatientPageTabs/AppointmentDateFilter";

export function AppointmentList() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-2.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900">Lịch hẹn</p>
          {/*{!isLoading && !isError && (*/}
          {/*  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">*/}
          {/*    {total}*/}
          {/*  </span>*/}
          {/*)}*/}
        </div>
        <AppointmentDateFilter />
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      {/*<div className="flex-1 overflow-y-auto">*/}
      {/*  {isLoading && <AppointmentListSkeleton />}*/}

      {/*  {isError && !isLoading && (*/}
      {/*    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center px-4">*/}
      {/*      <span className="text-2xl">⚠️</span>*/}
      {/*      <p className="text-sm text-gray-500">Không thể tải danh sách lịch hẹn.</p>*/}
      {/*      <p className="text-xs text-gray-400">Vui lòng thử lại sau.</p>*/}
      {/*    </div>*/}
      {/*  )}*/}

      {/*  {!isLoading && !isError && appointments.length === 0 && (*/}
      {/*    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center px-4">*/}
      {/*      <CalendarX className="h-8 w-8 text-gray-300" />*/}
      {/*      <p className="text-sm text-gray-500">Không có lịch hẹn trong khoảng thời gian này.</p>*/}
      {/*    </div>*/}
      {/*  )}*/}

      {/*  {!isLoading && !isError && grouped.length > 0 && (*/}
      {/*    <div className="flex flex-col gap-4 p-4">*/}
      {/*      {grouped.map(([date, apts]) => (*/}
      {/*        <section key={date}>*/}
      {/*          /!* Date group header *!/*/}
      {/*          <p className="mb-2 px-1 text-xs font-medium text-gray-400 capitalize">*/}
      {/*            {formatDisplayDate(date)}*/}
      {/*          </p>*/}
      {/*          <ul className="flex flex-col gap-1.5">*/}
      {/*            {apts.map((apt) => (*/}
      {/*              <li key={apt.id}>*/}
      {/*                <AppointmentCard appointment={apt} />*/}
      {/*              </li>*/}
      {/*            ))}*/}
      {/*          </ul>*/}
      {/*        </section>*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
}

function AppointmentListSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {[3, 2].map((count, gi) => (
        <section key={gi}>
          <Skeleton className="mb-2 h-3 w-32 rounded" />
          <ul className="flex flex-col gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg border border-gray-100 bg-white px-4 py-3"
              >
                <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                <div className="flex-1 space-y-2 pt-0.5">
                  <Skeleton className="h-3.5 w-1/3 rounded" />
                  <Skeleton className="h-3 w-2/3 rounded" />
                </div>
                <div className="flex gap-1.5">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
