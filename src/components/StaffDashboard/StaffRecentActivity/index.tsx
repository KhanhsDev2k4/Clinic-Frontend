"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useStaffAppointment } from "@/hooks/staff/useStaffAppointment";
import { formatDateToApi, formatTime, parseDate } from "@/lib/utils";
import { startOfDay, endOfDay } from "date-fns";
import { APPOINTMENT_STATUS } from "@/common";
import { User, Stethoscope } from "lucide-react";

const TODAY_START = formatDateToApi(startOfDay(new Date()), "HH:mm dd/MM/yyyy");
const TODAY_END = formatDateToApi(endOfDay(new Date()), "HH:mm dd/MM/yyyy");

const statusVariant: Record<string, string> = {
  [APPOINTMENT_STATUS.PENDING]: "bg-amber-50 text-amber-700",
  [APPOINTMENT_STATUS.CONFIRMED]: "bg-blue-50 text-blue-700",
  [APPOINTMENT_STATUS.CHECKED_IN]: "bg-emerald-50 text-emerald-700",
  [APPOINTMENT_STATUS.IN_PROGRESS]: "bg-violet-50 text-violet-700",
  [APPOINTMENT_STATUS.COMPLETED]: "bg-green-50 text-green-700",
  [APPOINTMENT_STATUS.CANCELLED]: "bg-red-50 text-red-700",
  [APPOINTMENT_STATUS.NO_SHOW]: "bg-gray-100 text-gray-600",
};

export function StaffRecentActivity() {
  const t = useTranslations("staff.dashboard");

  const { data } = useStaffAppointment({
    fromDate: TODAY_START,
    toDate: TODAY_END,
    page: 1,
    size: 10,
  });

  const appointments = data?.body?.data ?? [];

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-medium">
          {t("recentActivity")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-6">{t("patient")}</TableHead>
              <TableHead>{t("time")}</TableHead>
              <TableHead>{t("doctor")}</TableHead>
              <TableHead>{t("specialty")}</TableHead>
              <TableHead className="text-right pr-6">{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  {t("noActivity")}
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((apt) => {
                const aptTime = parseDate(
                  apt.appointmentDate,
                  "HH:mm:ss dd/MM/yyyy"
                );
                const timeStr = aptTime ? formatTime(aptTime) : apt.appointmentTime;
                return (
                  <TableRow key={apt.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-sm">
                          {apt.patientName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {timeStr}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1.5">
                        <Stethoscope className="w-3 h-3 text-gray-400" />
                        {apt.doctorName}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {apt.specialtyName}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full",
                          statusVariant[apt.status] ||
                            "bg-gray-100 text-gray-600"
                        )}
                      >
                        {apt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
