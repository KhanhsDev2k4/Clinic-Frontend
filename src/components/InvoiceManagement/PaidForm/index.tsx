import { PaidFormValues, paidSchema } from "@/components/InvoiceManagement/config";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InvoiceResponse } from "@/interface/response";
import NumberFlow from "@number-flow/react";
import { useFormik } from "formik";
import { useCallback } from "react";

function parseRaw(value: string): number {
  const digits = value.replace(/\D/g, "");
  return digits ? parseInt(digits, 10) : 0;
}

interface CurrencyInputProps {
  id: string;
  name: string;
  value: number | undefined;
  onChange: (raw: number) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  max?: number;
  error?: string;
  touched?: boolean;
  className?: string;
}

function CurrencyInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "0",
  max,
  error,
  touched,
  className,
}: CurrencyInputProps) {
  const displayValue = value != null && value > 0 ? value.toLocaleString("vi-VN") : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRaw(e.target.value);
    if (max !== undefined && raw > max) return;
    onChange(raw);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Enter"];
    if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="space-y-1">
      <div
        className={`flex h-9 items-center rounded-md border bg-white text-sm ring-offset-background
          transition-colors focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-0
          ${touched && error ? "border-red-400" : "border-gray-200 hover:border-gray-300"}
          ${className ?? ""}`}
      >
        <span className="shrink-0 select-none border-r border-gray-100 px-2.5 text-xs text-gray-400">
          đ
        </span>
        <input
          id={id}
          name={name}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-2.5 text-right text-sm tabular-nums text-gray-800 placeholder:text-gray-300 focus:outline-none"
        />
      </div>
      {touched && error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── QuickFillButton ────────────────────────────────────────────────────────

interface QuickFillButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function QuickFillButton({ label, active, onClick }: QuickFillButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-0.5 text-[11px] transition-colors
        ${
          active
            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        }`}
    >
      {label}
    </button>
  );
}

// ─── BreakdownRow ───────────────────────────────────────────────────────────

function BreakdownRow({
  label,
  amount,
  isDeduction = false,
  isTotal = false,
}: {
  label: string;
  amount: number;
  isDeduction?: boolean;
  isTotal?: boolean;
}) {
  if (!isTotal && amount === 0) return null;

  return (
    <div
      className={`flex justify-between text-xs ${
        isTotal ? "border-t border-gray-100 pt-1.5 font-medium text-gray-800" : "text-gray-500"
      }`}
    >
      <span>{isDeduction && amount > 0 ? `− ${label}` : label}</span>
      <span className={isDeduction && amount > 0 ? "text-red-500" : ""}>
        <NumberFlow
          value={amount}
          format={{ style: "currency", currency: "VND", maximumFractionDigits: 0 }}
          locales="vi-VN"
        />
      </span>
    </div>
  );
}

// ─── PaidForm ───────────────────────────────────────────────────────────────

interface PaidFormProps {
  invoice: InvoiceResponse;
  onClose: () => void;
}

type QuickFill = "full" | "half" | "none" | null;

function PaidForm({ invoice, onClose }: PaidFormProps) {
  const initialValues: PaidFormValues = {
    patientPaid: invoice.totalAmount - invoice.insuranceCovered,
    insuranceCovered: invoice.insuranceCovered,
    discountAmount: invoice.discountAmount,
  };

  const formik = useFormik<PaidFormValues>({
    initialValues,
    validationSchema: paidSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("values", values);
        // TODO: call API, show success toast
      } catch {
        // TODO: show error toast
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Derived values
  const discount = formik.values.discountAmount ?? 0;
  const insurance = formik.values.insuranceCovered ?? 0;
  const patientPaid = formik.values.patientPaid ?? 0;
  const maxPatientPaid = Math.max(0, invoice.totalAmount - discount - insurance);
  const balance = invoice.totalAmount - discount - insurance - patientPaid;
  const isPaid = balance <= 0;

  // Track which quick-fill is active
  const getActiveQuickFill = (): QuickFill => {
    if (patientPaid === maxPatientPaid && maxPatientPaid > 0) return "full";
    if (patientPaid === Math.floor(maxPatientPaid / 2)) return "half";
    if (patientPaid === 0) return "none";
    return null;
  };
  const activeQuickFill = getActiveQuickFill();

  const applyQuickFill = useCallback(
    (type: QuickFill) => {
      if (type === "full") formik.setFieldValue("patientPaid", maxPatientPaid);
      else if (type === "half") formik.setFieldValue("patientPaid", Math.floor(maxPatientPaid / 2));
      else formik.setFieldValue("patientPaid", 0);
      formik.setFieldTouched("patientPaid", true);
    },
    [maxPatientPaid, formik]
  );

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 pt-1">
      <FieldGroup>
        {/* Discount + Insurance */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="discountAmount" className="text-xs">
              Discount
            </FieldLabel>
            <CurrencyInput
              id="discountAmount"
              name="discountAmount"
              value={formik.values.discountAmount!}
              onChange={(val) => {
                formik.setFieldValue("discountAmount", val);
                // Auto-adjust patientPaid so it doesn't exceed new max
                const newMax = Math.max(0, invoice.totalAmount - val - insurance);
                if (patientPaid > newMax) formik.setFieldValue("patientPaid", newMax);
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.discountAmount}
              touched={formik.touched.discountAmount}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="insuranceCovered" className="text-xs">
              Insurance covered
            </FieldLabel>
            <CurrencyInput
              id="insuranceCovered"
              name="insuranceCovered"
              value={formik.values.insuranceCovered!}
              onChange={(val) => {
                formik.setFieldValue("insuranceCovered", val);
                const newMax = Math.max(0, invoice.totalAmount - discount - val);
                if (patientPaid > newMax) formik.setFieldValue("patientPaid", newMax);
              }}
              onBlur={formik.handleBlur}
              error={formik.errors.insuranceCovered}
              touched={formik.touched.insuranceCovered}
            />
          </Field>
        </div>

        {/* Patient paid */}
        <Field>
          <FieldLabel htmlFor="patientPaid" className="text-xs">
            Patient paid <span className="text-red-400">*</span>
          </FieldLabel>
          <CurrencyInput
            id="patientPaid"
            name="patientPaid"
            value={formik.values.patientPaid}
            onChange={(val) => formik.setFieldValue("patientPaid", Math.min(val, maxPatientPaid))}
            onBlur={formik.handleBlur}
            max={maxPatientPaid}
            error={formik.errors.patientPaid}
            touched={formik.touched.patientPaid}
          />
          {/* Quick-fill chips */}
          <div className="flex gap-1.5 pt-0.5">
            <QuickFillButton
              label="Pay in full"
              active={activeQuickFill === "full"}
              onClick={() => applyQuickFill("full")}
            />
            <QuickFillButton
              label="Pay 50%"
              active={activeQuickFill === "half"}
              onClick={() => applyQuickFill("half")}
            />
            <QuickFillButton
              label="No payment"
              active={activeQuickFill === "none"}
              onClick={() => applyQuickFill("none")}
            />
          </div>
        </Field>
      </FieldGroup>

      {/* Live breakdown */}
      <div className="space-y-1.5 rounded-lg border border-gray-100 px-4 py-3">
        <BreakdownRow label="Total amount" amount={invoice.totalAmount} />
        <BreakdownRow label="Discount" amount={discount} isDeduction />
        <BreakdownRow label="Insurance covered" amount={insurance} isDeduction />
        <BreakdownRow label="Patient paid" amount={patientPaid} isDeduction />
        <BreakdownRow label="Remaining balance" amount={Math.max(0, balance)} isTotal />
      </div>

      {/* Balance badge */}
      <div
        className={`flex items-center justify-between rounded-lg border px-4 py-2.5 text-xs font-medium transition-colors ${
          isPaid
            ? "border-emerald-100 bg-emerald-50 text-emerald-700"
            : "border-red-100 bg-red-50 text-red-600"
        }`}
      >
        <span className="flex items-center gap-1.5">
          {isPaid ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M2.5 7L5.5 10L11.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M7 4.5V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="7" cy="9.5" r="0.6" fill="currentColor" />
            </svg>
          )}
          {isPaid ? "Fully paid" : "Remaining balance"}
        </span>
        <span className="tabular-nums">
          <NumberFlow
            value={Math.max(0, balance)}
            format={{ style: "currency", currency: "VND", maximumFractionDigits: 0 }}
            locales="vi-VN"
          />
        </span>
      </div>

      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" size="sm" className="h-8 text-xs" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          className="h-8 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
          disabled={formik.isSubmitting || patientPaid === 0}
        >
          {formik.isSubmitting ? "Processing…" : "Mark as paid"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default PaidForm;
