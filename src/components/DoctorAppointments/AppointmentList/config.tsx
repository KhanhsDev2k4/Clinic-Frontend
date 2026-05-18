import { APPOINTMENT_STATUS } from "@/common";
import { CheckCircle2, Loader2, UserX } from "lucide-react";

export type DoctorAction = {
  label: string;
  targetStatus: APPOINTMENT_STATUS;
  icon: React.ReactNode;
  variant: "default" | "outline" | "destructive";
  confirmTitle: string;
  confirmDescription: string;
};

export const DOCTOR_ACTIONS: Partial<Record<APPOINTMENT_STATUS, DoctorAction[]>> = {
  [APPOINTMENT_STATUS.CHECKED_IN]: [
    {
      label: "Bắt đầu khám",
      targetStatus: APPOINTMENT_STATUS.IN_PROGRESS,
      icon: <Loader2 className="h-3.5 w-3.5" />,
      variant: "default",
      confirmTitle: "Bắt đầu khám?",
      confirmDescription: "Xác nhận bắt đầu khám cho bệnh nhân này.",
    },
    {
      label: "Không đến",
      targetStatus: APPOINTMENT_STATUS.NO_SHOW,
      icon: <UserX className="h-3.5 w-3.5" />,
      variant: "destructive",
      confirmTitle: "Đánh dấu không đến?",
      confirmDescription: "Bệnh nhân sẽ được đánh dấu là không đến khám.",
    },
  ],
  [APPOINTMENT_STATUS.IN_PROGRESS]: [
    {
      label: "Hoàn thành",
      targetStatus: APPOINTMENT_STATUS.COMPLETED,
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      variant: "default",
      confirmTitle: "Hoàn thành khám?",
      confirmDescription: "Xác nhận đã hoàn thành buổi khám cho bệnh nhân này.",
    },
  ],
};
