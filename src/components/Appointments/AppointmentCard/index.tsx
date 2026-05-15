"use client";
import { APPOINTMENT_STATUS } from "@/common";
import BookingTypeBadge from "@/components/Appointments/BookingTypeBadge";
import DetailDrawer from "@/components/Appointments/DetailDrawer";
import StatusBadge from "@/components/Appointments/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet } from "@/components/ui/sheet";
import usePopup from "@/hooks/useDialog";
import { AppointmentResponse } from "@/interface/response";
import { formatCurrency, formatDate, formatTime, getInitials, parseDate } from "@/lib/utils";
import {
  Calendar,
  CalendarClock,
  Clock,
  Eye,
  ListOrdered,
  Stethoscope,
  XCircle,
} from "lucide-react";

interface AppointmentCardProps {
  apt: AppointmentResponse;
}

function AppointmentCard({ apt }: AppointmentCardProps) {
  const parsedDate = parseDate(apt.appointmentDate, "HH:mm:ss dd/MM/yyyy");

  const canAct =
    apt.status !== APPOINTMENT_STATUS.COMPLETED && apt.status !== APPOINTMENT_STATUS.CANCELLED;
  const firstService = apt.clinicServices?.[0];

  const popup = usePopup<{ appointmentId: string }>();

  return (
    <Card className="transition-colors hover:border-border/80">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-11 w-11 shrink-0">
            {apt.doctorPathAvatar && (
              <AvatarImage src={apt.doctorPathAvatar} alt={apt.doctorName} />
            )}
            <AvatarFallback className="bg-blue-50 text-blue-700 text-xs font-medium">
              {getInitials(apt.doctorName)}
            </AvatarFallback>
          </Avatar>

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="text-sm font-medium text-foreground">{apt.doctorName}</span>
              <span className="text-xs text-muted-foreground font-mono">{apt.appointmentCode}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{apt.specialtyName}</p>
            <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground mb-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(parsedDate)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {formatTime(parsedDate)}
              </span>
              {apt.queueNumber && (
                <span className="flex items-center gap-1">
                  <ListOrdered className="h-3.5 w-3.5" /> Queue #{apt.queueNumber}
                </span>
              )}
            </div>
            {firstService && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                {firstService.name}
                {apt.clinicServices.length > 1 && ` +${apt.clinicServices.length - 1} more`}
              </p>
            )}
            <p className="text-xs font-medium text-foreground">{formatCurrency(apt.fee)}</p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1"
                onClick={() => popup.openPopup({ appointmentId: apt.id })}
              >
                <Eye className="h-3.5 w-3.5" /> View details
              </Button>
              {canAct && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    // onClick={() => onReschedule(apt)}
                  >
                    <CalendarClock className="h-3.5 w-3.5" /> Reschedule
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                    // onClick={() => onCancel(apt)}
                  >
                    <XCircle className="h-3.5 w-3.5" /> Cancel
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <StatusBadge status={apt.status} />
            <BookingTypeBadge type={apt.bookingType} />
          </div>
        </div>
      </CardContent>
      <Sheet open={popup.open} onOpenChange={popup.onOpenChange} modal>
        <DetailDrawer appointmentId={popup.data?.appointmentId!} onClose={popup.closePopup} />
      </Sheet>
    </Card>
  );
}

export default AppointmentCard;
