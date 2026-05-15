"use client";
import { APPOINTMENT_STATUS } from "@/common";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { usePatientAppointmentUpdate } from "@/hooks/patient/usePatientAppointment";
import { Loader2 } from "lucide-react";

interface CancelAppointmentDialogProps {
  appointmentId: string;
  onClose?: () => void;
}

export function CancelAppointmentDialog({ appointmentId, onClose }: CancelAppointmentDialogProps) {
  const patientAppointmentUpdate = usePatientAppointmentUpdate(appointmentId);

  const handleConfirm = async () => {
    try {
      await patientAppointmentUpdate.trigger({
        status: APPOINTMENT_STATUS.CANCELLED,
      });
      onClose?.();
    } catch (error) {}
  };

  return (
    <AlertDialogContent className="max-w-md">
      <AlertDialogHeader>
        <AlertDialogTitle>Cancel appointment?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. The appointment will be marked as cancelled.
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel disabled={patientAppointmentUpdate.isMutating}>
          Keep appointment
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
          disabled={patientAppointmentUpdate.isMutating}
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-1.5"
        >
          {patientAppointmentUpdate.isMutating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {patientAppointmentUpdate.isMutating ? "Cancelling…" : "Confirm cancel"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
