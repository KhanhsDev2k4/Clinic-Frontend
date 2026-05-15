import { INVOICE_STATUS } from "@/common";

export const statusConfig: Record<
  INVOICE_STATUS,
  { label: string; className: string; dot: string }
> = {
  [INVOICE_STATUS.DRAFT]: {
    label: "Draft",
    className: "bg-gray-50 text-gray-600 border-gray-200",
    dot: "bg-gray-400",
  },
  [INVOICE_STATUS.PENDING]: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
    dot: "bg-yellow-500",
  },
  [INVOICE_STATUS.PAID]: {
    label: "Paid",
    className: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
  },
  [INVOICE_STATUS.CANCELLED]: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border-red-200",
    dot: "bg-red-400",
  },
};
