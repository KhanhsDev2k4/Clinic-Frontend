"use client";

import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  INVOICE_STATUS_TRANSITIONS,
  INVOICE_STATUS_CONFIG,
} from "@/components/InvoiceManagement/config";
import { INVOICE_STATUS } from "@/common";
import { InvoiceResponse } from "@/interface/response";
import CancelConfirm from "@/components/InvoiceManagement/CancelConfirm";
import PaidForm from "@/components/InvoiceManagement/PaidForm";

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
