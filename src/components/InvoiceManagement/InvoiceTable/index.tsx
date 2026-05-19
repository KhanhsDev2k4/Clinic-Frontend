"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceTableRow } from "@/components/InvoiceManagement/pagination/InvoiceTableRow";
import { useStaffInvoice } from "@/hooks/staff/useStaffInvoice";
import { useCallback } from "react";
import { useFilterInvoiceData } from "@/components/InvoiceManagement/hook";
import { formatDateToApi } from "@/lib/utils";
import { endOfDay, startOfDay } from "date-fns";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function InvoiceTableSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <TableRow key={i} className="h-12">
          <TableCell className="w-8" />
          <TableCell>
            <Skeleton className="h-3.5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3.5 w-36" />
            <Skeleton className="h-2.5 w-20 mt-1" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3.5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3.5 w-20 ml-auto" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-3.5 w-20 ml-auto" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-16 rounded-full" />
          </TableCell>
          <TableCell />
        </TableRow>
      ))}
    </>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function InvoiceEmptyState() {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={8}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">No invoices found</p>
          <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or date range</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

interface InvoiceTableProps {}

export function InvoiceTable({}: InvoiceTableProps) {
  const { data: filterData } = useFilterInvoiceData();

  const buildFilter = useCallback(() => {
    return {
      keyword: filterData?.keyword,
      status: filterData?.status,
      fromDate: formatDateToApi(startOfDay(filterData.date?.from!), "HH:mm dd/MM/yyyy"),
      toDate: formatDateToApi(endOfDay(filterData.date?.to!), "HH:mm dd/MM/yyyy"),
    };
  }, [filterData]);

  const { data, isLoading } = useStaffInvoice(buildFilter());

  const invoices = data?.body?.data ?? [];

  return (
    <div className="flex-1 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="h-10 border-b border-gray-100">
            <TableHead className="w-8 pl-4 pr-0" />
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-36">
              Invoice #
            </TableHead>
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Patient
            </TableHead>
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-28">
              Date
            </TableHead>
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right w-32">
              Total
            </TableHead>
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right w-32">
              Balance
            </TableHead>
            <TableHead className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider w-28">
              Status
            </TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <InvoiceTableSkeleton />
          ) : invoices.length === 0 ? (
            <InvoiceEmptyState />
          ) : (
            invoices.map((invoice) => <InvoiceTableRow key={invoice.id} invoice={invoice} />)
          )}
        </TableBody>
      </Table>
    </div>
  );
}
