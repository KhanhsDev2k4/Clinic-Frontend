import { statusConfig } from "@/components/Appointments/StatusBadge/config";
import { BOOKING_TYPE_CONFIG } from "@/components/DoctorAppointments/AppointmentSidebar/SidebarAppointmentCard/config";
import { Badge } from "@/components/ui/badge";
import { AppointmentResponse } from "@/interface/response";
import { cn, formatDate, formatDateToApi, formatTime, parseDate } from "@/lib/utils";
import { Calendar, Clock, Hash } from "lucide-react";

interface SidebarAppointmentCardProps {
  appt: AppointmentResponse;
  className?: string;
}

export function SidebarAppointmentCard({ appt, className }: SidebarAppointmentCardProps) {
  const status = statusConfig[appt.status];
  const bookingType = BOOKING_TYPE_CONFIG[appt.bookingType];
  const parsedDate = parseDate(appt?.appointmentDate, "HH:mm:ss dd/MM/yyyy");

  return (
    <div
      className={cn(
        "flex gap-2.5 items-start rounded-lg p-2.5 border border-gray-100 bg-white hover:bg-gray-50 transition-colors",
        className
      )}
    >
      {/* Info column */}
      <div className="min-w-0 flex-1 flex flex-col gap-1">
        {/* Row 1: Name + status badge */}
        <div className="flex items-start justify-between gap-1">
          <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
            {appt.patientName}
          </p>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold px-1.5 py-0 h-4 shrink-0 rounded-full border",
              status.className
            )}
          >
            {status.label}
          </Badge>
        </div>

        {/* Row 2: Reason */}
        {appt.reason && (
          <p className="text-[10px] text-gray-500 truncate leading-tight">{appt.reason}</p>
        )}

        {/* Row 3: Booking type */}
        <div className={cn("flex items-center gap-3 text-xs text-muted-foreground")}>
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(parsedDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(parsedDate)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
          {bookingType.icon}
          <span>{bookingType.label}</span>
        </div>
      </div>
    </div>
  );
}
