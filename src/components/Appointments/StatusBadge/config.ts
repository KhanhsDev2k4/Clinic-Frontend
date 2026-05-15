import { APPOINTMENT_STATUS } from "@/common";

export const statusConfig: Record<APPOINTMENT_STATUS, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  },

  CONFIRMED: {
    label: "Confirmed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  },

  CHECKED_IN: {
    label: "Checked In",
    className: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100",
  },

  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 animate-pulse",
  },

  COMPLETED: {
    label: "Completed",
    className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  },

  NO_SHOW: {
    label: "No Show",
    className: "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 line-through",
  },
};
