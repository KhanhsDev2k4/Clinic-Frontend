"use client";

import { useMemo, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { useTranslations } from "next-intl";

import { EXCEPTION_TYPE } from "@/common";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScheduleExceptionCalendar } from "@/components/DoctorScheduleExceptions/ScheduleExceptionCalendar";
import { ScheduleExceptionDeleteDialog } from "@/components/DoctorScheduleExceptions/ScheduleExceptionDeleteDialog";
import { ScheduleExceptionFormModal } from "@/components/DoctorScheduleExceptions/ScheduleExceptionFormModal";
import { ScheduleExceptionTable } from "@/components/DoctorScheduleExceptions/ScheduleExceptionTable";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import { useDoctorScheduleExceptions } from "@/hooks/doctor/useDoctorScheduleExceptions";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

const PAGE_SIZE = 5;

const monthOptions = Array.from({ length: 12 }, (_, index) => index);

const getYearOptions = () => {
  const year = new Date().getFullYear();
  return [year - 1, year, year + 1];
};

export default function DoctorScheduleExceptions() {
  const t = useTranslations("doctorScheduleExceptions");
  const today = new Date();
  const [typeFilter, setTypeFilter] = useState<EXCEPTION_TYPE | TYPE_OF_FILTER_ALL_VALUE>(
    FILTER_ALL_VALUE
  );
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingException, setEditingException] =
    useState<DoctorScheduleExceptionResponse | null>(null);
  const [deletingException, setDeletingException] =
    useState<DoctorScheduleExceptionResponse | null>(null);

  const {
    exceptions,
    allDoctorExceptions,
    createException,
    updateException,
    deleteException,
    isLoading,
  } = useDoctorScheduleExceptions({
    type: typeFilter,
    month,
    year,
  });

  const totalPages = Math.max(1, Math.ceil(exceptions.length / PAGE_SIZE));
  const pagedExceptions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return exceptions.slice(start, start + PAGE_SIZE);
  }, [exceptions, page]);

  const handleTypeFilterChange = (value: EXCEPTION_TYPE | TYPE_OF_FILTER_ALL_VALUE) => {
    setTypeFilter(value);
    setPage(1);
  };

  const handleMonthChange = (value: string) => {
    setMonth(Number(value));
    setPage(1);
  };

  const handleYearChange = (value: string) => {
    setYear(Number(value));
    setPage(1);
  };

  const handleOpenCreate = () => {
    setEditingException(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (exception: DoctorScheduleExceptionResponse) => {
    setEditingException(exception);
    setFormOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-50/60">
      <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="flex min-h-16 w-full flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:px-8">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{t("title")}</h1>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:ml-auto">
            <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
              <SelectTrigger className="h-8 w-36 bg-white text-xs">
                <SelectValue placeholder={t("filters.type")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={FILTER_ALL_VALUE}>{t("types.all")}</SelectItem>
                <SelectItem value={EXCEPTION_TYPE.LEAVE}>{t("types.leave")}</SelectItem>
                <SelectItem value={EXCEPTION_TYPE.EXTRA}>{t("types.extra")}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={String(month)} onValueChange={handleMonthChange}>
              <SelectTrigger className="h-8 w-36 bg-white text-xs">
                <SelectValue placeholder={t("filters.month")} />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((monthOption) => (
                  <SelectItem key={monthOption} value={String(monthOption)}>
                    {t(`months.${monthOption}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={String(year)} onValueChange={handleYearChange}>
              <SelectTrigger className="h-8 w-28 bg-white text-xs">
                <SelectValue placeholder={t("filters.year")} />
              </SelectTrigger>
              <SelectContent>
                {getYearOptions().map((yearOption) => (
                  <SelectItem key={yearOption} value={String(yearOption)}>
                    {yearOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleOpenCreate}>
              <CalendarPlus />
              {t("actions.create")}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-auto px-6 py-6 md:px-8">
        <Card className="rounded-lg bg-white">
          <CardHeader>
            <CardTitle>{t("calendar.title")}</CardTitle>
            <CardDescription>{t("calendar.description")}</CardDescription>
            <CardAction className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-red-500" />
                {t("types.leave")}
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                {t("types.extra")}
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ScheduleExceptionCalendar exceptions={exceptions} month={month} year={year} />
          </CardContent>
        </Card>

        <ScheduleExceptionTable
          exceptions={pagedExceptions}
          isLoading={isLoading}
          page={page}
          totalPages={totalPages}
          total={exceptions.length}
          onPageChange={setPage}
          onEdit={handleOpenEdit}
          onDelete={setDeletingException}
        />
      </div>

      <ScheduleExceptionFormModal
        open={formOpen}
        exception={editingException}
        existingExceptions={allDoctorExceptions}
        onOpenChange={setFormOpen}
        onCreate={createException}
        onUpdate={updateException}
      />

      <ScheduleExceptionDeleteDialog
        exception={deletingException}
        onOpenChange={(open) => !open && setDeletingException(null)}
        onConfirm={async () => {
          if (!deletingException) return;
          await deleteException(deletingException.id);
          setDeletingException(null);
        }}
      />
    </div>
  );
}
