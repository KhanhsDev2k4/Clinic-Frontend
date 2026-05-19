import { INVOICE_ITEM_TYPE, INVOICE_STATUS } from "@/common";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import * as yup from "yup";

export const INVOICE_STATUS_FILTER_OPTIONS: {
  label: string;
  value: INVOICE_STATUS | TYPE_OF_FILTER_ALL_VALUE;
}[] = [
  { label: "All", value: FILTER_ALL_VALUE },
  { label: "Draft", value: INVOICE_STATUS.DRAFT },
  { label: "Pending", value: INVOICE_STATUS.PENDING },
  { label: "Paid", value: INVOICE_STATUS.PAID },
  { label: "Cancelled", value: INVOICE_STATUS.CANCELLED },
];

export const INVOICE_ITEM_TYPE_LABELS: Record<INVOICE_ITEM_TYPE, string> = {
  [INVOICE_ITEM_TYPE.SERVICE]: "Service",
  [INVOICE_ITEM_TYPE.MEDICATION]: "Medication",
  [INVOICE_ITEM_TYPE.LAB_TEST]: "Lab Test",
  [INVOICE_ITEM_TYPE.OTHER]: "Other",
};

// ─── Status badge styling ──────────────────────────────────────────────────────

export const INVOICE_STATUS_CONFIG: Record<INVOICE_STATUS, { label: string; className: string }> = {
  [INVOICE_STATUS.DRAFT]: {
    label: "Draft",
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  [INVOICE_STATUS.PENDING]: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  [INVOICE_STATUS.PAID]: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  [INVOICE_STATUS.CANCELLED]: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border-red-200",
  },
};

// ─── Allowed status transitions ────────────────────────────────────────────────

export const INVOICE_STATUS_TRANSITIONS: Partial<Record<INVOICE_STATUS, INVOICE_STATUS[]>> = {
  [INVOICE_STATUS.PENDING]: [INVOICE_STATUS.PAID, INVOICE_STATUS.CANCELLED],
  [INVOICE_STATUS.DRAFT]: [INVOICE_STATUS.PENDING, INVOICE_STATUS.CANCELLED],
};

export const canTransitionStatus = (current: INVOICE_STATUS): boolean => {
  return (INVOICE_STATUS_TRANSITIONS[current]?.length ?? 0) > 0;
};

export const paidSchema = yup.object().shape({
  discountAmount: yup.number().min(0, "Discount cannot be negative").nullable(),

  insuranceCovered: yup.number().min(0, "Insurance cannot be negative").nullable(),

  patientPaid: yup
    .number()
    .min(0, "Payment amount cannot be negative")
    .required("Please enter the payment amount"),
});
export type PaidFormValues = yup.InferType<typeof paidSchema>;
