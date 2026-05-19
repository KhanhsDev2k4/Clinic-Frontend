"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  INVOICE_STATUS_TRANSITIONS,
  INVOICE_STATUS_CONFIG,
  paidSchema,
  PaidFormValues,
} from "@/components/InvoiceManagement/config";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { INVOICE_STATUS } from "@/common";
import { InvoiceResponse } from "@/interface/response";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import CancelConfirm from "@/components/InvoiceManagement/CancelConfirm";

interface UpdateInvoiceStatusDialogProps {
  onClose: () => void;
  invoice: InvoiceResponse | null;
}

interface StatusSelectorProps {
  transitions: INVOICE_STATUS[];
  targetStatus: INVOICE_STATUS | null;
  onSelect: (status: INVOICE_STATUS) => void;
}

function StatusSelector({ transitions, targetStatus, onSelect }: StatusSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs text-gray-500">Change status to</Label>
      <div className="flex gap-2">
        {transitions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              targetStatus === s
                ? "border-gray-800 bg-gray-900 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            {INVOICE_STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface PaidFormProps {
  invoice: InvoiceResponse;
  onClose: () => void;
}

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
      } catch (error) {
        // TODO: show toast on error
      } finally {
        setSubmitting(false);
      }
    },
  });

  const balance =
    invoice.totalAmount -
    (formik.values.discountAmount ?? 0) -
    (formik.values.insuranceCovered ?? 0) -
    (formik.values.patientPaid ?? 0);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Separator />

      {/* Total amount summary */}
      <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-xs">
        <div className="flex justify-between text-gray-500">
          <span>Total amount</span>
          <span className="font-semibold text-gray-800">{formatCurrency(invoice.totalAmount)}</span>
        </div>
      </div>

      <FieldGroup>
        {/* Discount + Insurance — 2 columns */}
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="discountAmount">Discount</FieldLabel>
            <Input
              id="discountAmount"
              type="text"
              inputMode="numeric"
              placeholder="0"
              className="h-8 text-xs"
              {...formik.getFieldProps("discountAmount")}
            />
            {formik.touched.discountAmount && formik.errors.discountAmount && (
              <FieldDescription className="text-red-500">
                {formik.errors.discountAmount}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="insuranceCovered">Insurance covered</FieldLabel>
            <Input
              id="insuranceCovered"
              type="text"
              inputMode="numeric"
              placeholder="0"
              className="h-8 text-xs"
              {...formik.getFieldProps("insuranceCovered")}
            />
            {formik.touched.insuranceCovered && formik.errors.insuranceCovered && (
              <FieldDescription className="text-red-500">
                {formik.errors.insuranceCovered}
              </FieldDescription>
            )}
          </Field>
        </div>

        {/* Patient paid */}
        <Field>
          <FieldLabel htmlFor="patientPaid">
            Patient paid <span className="text-red-400">*</span>
          </FieldLabel>
          <Input
            id="patientPaid"
            type="text"
            inputMode="numeric"
            placeholder="0"
            className="h-8 text-xs"
            {...formik.getFieldProps("patientPaid")}
          />
          {formik.touched.patientPaid && formik.errors.patientPaid && (
            <FieldDescription className="text-red-500">
              {formik.errors.patientPaid}
            </FieldDescription>
          )}
        </Field>
      </FieldGroup>

      {/* Remaining balance */}
      <div
        className={`flex justify-between items-center rounded-lg px-4 py-2.5 text-xs font-semibold border ${
          balance <= 0
            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
            : "bg-red-50 text-red-600 border-red-100"
        }`}
      >
        <span>Remaining balance</span>
        <span>{formatCurrency(balance)}</span>
      </div>

      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" size="sm" className="text-xs h-8" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          className="text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Processing…" : "Mark as Paid"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function UpdateInvoiceStatusDialog({ onClose, invoice }: UpdateInvoiceStatusDialogProps) {
  const [targetStatus, setTargetStatus] = useState<INVOICE_STATUS | null>(null);

  const transitions = invoice ? (INVOICE_STATUS_TRANSITIONS[invoice.status] ?? []) : [];
  const hasMultipleTransitions = transitions.length > 1;

  useEffect(() => {
    if (transitions.length === 1) setTargetStatus(transitions[0]);
    else setTargetStatus(null);
  }, [invoice?.id, invoice?.status]);

  if (!invoice) return null;

  const handleClose = () => {
    setTargetStatus(null);
    onClose();
  };

  const handleConfirmCancel = () => {
    // TODO: call cancel API
    handleClose();
  };

  const renderBody = () => {
    if (targetStatus === INVOICE_STATUS.PAID) {
      return <PaidForm invoice={invoice} onClose={handleClose} />;
    }

    if (targetStatus === INVOICE_STATUS.CANCELLED) {
      return (
        <CancelConfirm
          invoiceCode={invoice.invoiceCode}
          onBack={() => setTargetStatus(null)}
          onConfirm={handleConfirmCancel}
        />
      );
    }

    return (
      <DialogFooter className="pt-2">
        <Button variant="outline" size="sm" className="text-xs h-8" onClick={handleClose}>
          Close
        </Button>
      </DialogFooter>
    );
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-sm font-semibold">Update Invoice Status</DialogTitle>
        <DialogDescription className="text-xs text-gray-500">
          Invoice{" "}
          <span className="font-mono font-semibold text-gray-700">{invoice.invoiceCode}</span>
        </DialogDescription>
      </DialogHeader>

      {hasMultipleTransitions && (
        <StatusSelector
          transitions={transitions}
          targetStatus={targetStatus}
          onSelect={setTargetStatus}
        />
      )}

      {renderBody()}
    </DialogContent>
  );
}
