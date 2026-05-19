"use client";

import { INVOICE_STATUS } from "@/common";
import { INVOICE_STATUS_CONFIG } from "@/components/InvoiceManagement/config";
import { cn } from "@/lib/utils";

interface InvoiceStatusBadgeProps {
  status: INVOICE_STATUS;
  className?: string;
}

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const config = INVOICE_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
