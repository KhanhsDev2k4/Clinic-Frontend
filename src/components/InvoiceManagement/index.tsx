"use client";

import { useEffect, useRef } from "react";
import { InvoiceTopBar } from "@/components/InvoiceManagement/InvoiceTopBar";
import { InvoiceTable } from "@/components/InvoiceManagement/InvoiceTable";
import { useForceRefreshInvoices } from "@/components/InvoiceManagement/hook";

export default function InvoiceManagement() {
  const { swr, clearForce } = useForceRefreshInvoices();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (swr?.ts) {
      clearForce();
    }
  }, [swr?.ts]);

  return (
    <div className="flex h-full w-full flex-1 flex-col bg-gray-50/60 overflow-hidden">
      <InvoiceTopBar />

      <div className="flex flex-1 overflow-hidden h-full bg-white">
        <InvoiceTable />
      </div>
    </div>
  );
}
