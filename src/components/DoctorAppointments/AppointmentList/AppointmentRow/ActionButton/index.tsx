import { DoctorAction } from "@/components/DoctorAppointments/AppointmentList/config";
import { useForceRefreshDoctorAppointment } from "@/components/DoctorAppointments/hook";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDoctorAppointmentUpdate } from "@/hooks/doctor/useDoctorAppointment";

function ActionButton({ action, appointmentId }: { action: DoctorAction; appointmentId: string }) {
  const doctorAppointmentUpdate = useDoctorAppointmentUpdate(appointmentId);
  const { forceMutate } = useForceRefreshDoctorAppointment();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant={action.variant}
          className="h-7 text-xs gap-1"
          disabled={doctorAppointmentUpdate.isMutating}
        >
          {action.icon}
          {action.label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{action.confirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>{action.confirmDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Huỷ</AlertDialogCancel>
          <AlertDialogAction
            disabled={doctorAppointmentUpdate.isMutating}
            onClick={() => {
              doctorAppointmentUpdate.trigger({ status: action.targetStatus });
              forceMutate();
            }}
          >
            {doctorAppointmentUpdate.isMutating ? "Đang xử lý..." : "Xác nhận"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ActionButton;
