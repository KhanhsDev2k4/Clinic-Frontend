"use client";

import { useMemo, useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, UserCheck, User } from "lucide-react";
import { useStaffAppointment } from "@/hooks/staff/useStaffAppointment";
import { useStaffCheckInUpdate } from "@/hooks/staff/useStaffCheckIn";
import { useDebounce } from "@/hooks/useDebounce";
import { APPOINTMENT_STATUS } from "@/common";
import { formatTime, formatDate, getInitials, parseDate } from "@/lib/utils";
import { formatDateToApi } from "@/lib/utils";
import { startOfDay, endOfDay } from "date-fns";
import { AppointmentResponse } from "@/interface/response";
import { cn } from "@/lib/utils";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";

const TODAY_START = formatDateToApi(startOfDay(new Date()), "HH:mm dd/MM/yyyy");
const TODAY_END = formatDateToApi(endOfDay(new Date()), "HH:mm dd/MM/yyyy");

const statusBadgeVariant: Record<string, string> = {
  [APPOINTMENT_STATUS.PENDING]: "bg-amber-50 text-amber-700",
  [APPOINTMENT_STATUS.CONFIRMED]: "bg-blue-50 text-blue-700",
  [APPOINTMENT_STATUS.CHECKED_IN]: "bg-emerald-50 text-emerald-700",
  [APPOINTMENT_STATUS.IN_PROGRESS]: "bg-violet-50 text-violet-700",
  [APPOINTMENT_STATUS.COMPLETED]: "bg-green-50 text-green-700",
  [APPOINTMENT_STATUS.CANCELLED]: "bg-red-50 text-red-700",
  [APPOINTMENT_STATUS.NO_SHOW]: "bg-gray-100 text-gray-600",
};

const CHECK_INABLE_STATUSES = [APPOINTMENT_STATUS.CONFIRMED, APPOINTMENT_STATUS.PENDING];

export default function StaffCheckInPage() {
  const t = useTranslations("staff.dashboard");
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<APPOINTMENT_STATUS | TYPE_OF_FILTER_ALL_VALUE>(
    FILTER_ALL_VALUE
  );
  const [selectedApt, setSelectedApt] = useState<AppointmentResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 600);
  const prevDebounced = useRef(debouncedKeyword);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const buildFilter = useMemo(() => {
    const params: Record<string, string | number | undefined> = {
      fromDate: TODAY_START,
      toDate: TODAY_END,
      page: 1,
      size: 50,
    };
    if (debouncedKeyword) params.keyword = debouncedKeyword;
    if (statusFilter !== FILTER_ALL_VALUE) params.status = statusFilter;
    return params;
  }, [debouncedKeyword, statusFilter]);

  const { data, isLoading } = useStaffAppointment(buildFilter);
  const { trigger: checkInTrigger, isMutating } = useStaffCheckInUpdate(selectedApt?.id ?? "");

  const appointments = data?.body?.data ?? [];

  const handleCheckIn = async () => {
    if (!selectedApt) return;
    await checkInTrigger({
      status: APPOINTMENT_STATUS.CHECKED_IN,
    });
    setDialogOpen(false);
    setSelectedApt(null);
  };

  const openCheckInDialog = (apt: AppointmentResponse) => {
    setSelectedApt(apt);
    setDialogOpen(true);
  };

  const displayStatus = (apt: AppointmentResponse): APPOINTMENT_STATUS => {
    return apt.status;
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-50/60">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="px-6 md:px-8 h-16 flex items-center gap-3 w-full">
          <h1 className="text-lg font-bold text-gray-900 shrink-0">{t("checkIn")}</h1>

          <Select
            value={statusFilter}
            onValueChange={(val) =>
              setStatusFilter(val as APPOINTMENT_STATUS | typeof FILTER_ALL_VALUE)
            }
          >
            <SelectTrigger className="h-8 w-36 text-xs ml-auto">
              <SelectValue placeholder={t("filterStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FILTER_ALL_VALUE} className="text-xs">
                {t("allStatuses")}
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.PENDING} className="text-xs">
                Pending
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.CONFIRMED} className="text-xs">
                Confirmed
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.CHECKED_IN} className="text-xs">
                Checked In
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.IN_PROGRESS} className="text-xs">
                In Progress
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.COMPLETED} className="text-xs">
                Completed
              </SelectItem>
              <SelectItem value={APPOINTMENT_STATUS.CANCELLED} className="text-xs">
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="relative w-52 shrink-0">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="pl-8 h-8 text-xs bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-white">
            <TableRow className="h-10 border-b border-gray-100">
              <TableHead className="pl-6 pr-0 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {t("patient")}
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {t("time")}
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {t("doctor")}
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {t("specialty")}
              </TableHead>
              <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-center">
                {t("status")}
              </TableHead>
              <TableHead className="w-24 text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right pr-6">
                {t("actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="h-14">
                  <TableCell className="pl-6">
                    <div className="h-3.5 w-28 bg-gray-100 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3.5 w-16 bg-gray-100 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3.5 w-32 bg-gray-100 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-3.5 w-24 bg-gray-100 rounded" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-20 bg-gray-100 rounded-full mx-auto" />
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="h-7 w-20 bg-gray-100 rounded ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : appointments.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-8 h-8 text-gray-300" />
                    <span className="text-sm">{t("noAppointments")}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt) => {
                const parsedDate = parseDate(apt.appointmentDate, "HH:mm:ss dd/MM/yyyy");
                const timeStr = parsedDate ? formatTime(parsedDate) : apt.appointmentTime;
                const canCheckIn = CHECK_INABLE_STATUSES.includes(apt.status);
                const status = displayStatus(apt);

                return (
                  <TableRow key={apt.id} className="h-14">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <span className="text-xs font-medium text-gray-600">
                            {getInitials(apt.patientName)}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{apt.patientName}</span>
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {apt.appointmentCode}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(parsedDate)} · {timeStr}
                    </TableCell>
                    <TableCell className="text-xs">{apt.doctorName}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {apt.specialtyName}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          statusBadgeVariant[status] || "bg-gray-100 text-gray-600"
                        )}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      {canCheckIn && (
                        <Button
                          size="sm"
                          variant="default"
                          className="h-7 text-xs gap-1"
                          onClick={() => openCheckInDialog(apt)}
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          {t("checkIn")}
                        </Button>
                      )}
                      {!canCheckIn && status === APPOINTMENT_STATUS.CHECKED_IN && (
                        <Badge className="bg-emerald-50 text-emerald-700 text-xs">
                          {t("checkedInStatus")}
                        </Badge>
                      )}
                      {!canCheckIn && status === APPOINTMENT_STATUS.IN_PROGRESS && (
                        <Badge className="bg-violet-50 text-violet-700 text-xs">
                          {t("inProgressStatus")}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Check-in confirmation dialog */}
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("checkInTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedApt && (
                <div className="mt-2 space-y-1">
                  <p>
                    <strong>{t("patient")}:</strong> {selectedApt.patientName}
                  </p>
                  <p>
                    <strong>{t("doctor")}:</strong> {selectedApt.doctorName}
                  </p>
                  <p>
                    <strong>{t("time")}:</strong>{" "}
                    {formatDate(parseDate(selectedApt.appointmentDate, "HH:mm:ss dd/MM/yyyy"))} ·{" "}
                    {formatTime(parseDate(selectedApt.appointmentDate, "HH:mm:ss dd/MM/yyyy"))}
                  </p>
                </div>
              )}
              <p className="mt-3">{t("checkInDescription")}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isMutating}>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleCheckIn} disabled={isMutating}>
              {isMutating ? t("confirming") : t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
