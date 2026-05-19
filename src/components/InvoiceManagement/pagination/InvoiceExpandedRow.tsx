"use client";

import { INVOICE_ITEM_TYPE_LABELS } from "@/components/InvoiceManagement/config";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { InvoiceResponse } from "@/interface/response";

interface InvoiceExpandedRowProps {
  invoice: InvoiceResponse;
}

export function InvoiceExpandedRow({ invoice }: InvoiceExpandedRowProps) {
  return (
    <div className="px-8 py-4 bg-gray-50/70 border-t border-gray-100 animate-in slide-in-from-top-1 duration-150">
      <div className="flex gap-8">
        {/* ── Items table ── */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Line Items
          </p>
          {invoice.items.length === 0 ? (
            <p className="text-xs text-gray-400 italic">No items</p>
          ) : (
            <Table className="text-xs">
              <TableHeader>
                <TableRow className="h-7 bg-white">
                  <TableHead className="text-[11px] text-gray-400 font-medium w-35">Type</TableHead>
                  <TableHead className="text-[11px] text-gray-400 font-medium">
                    Description
                  </TableHead>
                  <TableHead className="text-[11px] text-gray-400 font-medium text-right w-16">
                    Qty
                  </TableHead>
                  <TableHead className="text-[11px] text-gray-400 font-medium text-right w-28">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-[11px] text-gray-400 font-medium text-right w-28">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id} className="h-8 bg-white border-gray-100">
                    <TableCell>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {INVOICE_ITEM_TYPE_LABELS[item.itemType]}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-700">{item.itemName}</TableCell>
                    <TableCell className="text-right text-gray-600">{item.quantity}</TableCell>
                    <TableCell className="text-right text-gray-600">
                      {formatCurrency(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-gray-800">
                      {formatCurrency(item.totalPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* ── Financial summary ── */}
        <div className="shrink-0 w-56 bg-white rounded-lg border border-gray-100 p-4 h-fit">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Summary
          </p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span>− {formatCurrency(invoice.discountAmount)}</span>
              </div>
            )}

            <Separator className="my-1" />

            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>{formatCurrency(invoice.totalAmount)}</span>
            </div>

            {invoice.insuranceCovered > 0 && (
              <div className="flex justify-between text-blue-600">
                <span>Insurance</span>
                <span>− {formatCurrency(invoice.insuranceCovered)}</span>
              </div>
            )}

            {invoice.patientPaid > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Patient paid</span>
                <span>− {formatCurrency(invoice.patientPaid)}</span>
              </div>
            )}

            <Separator className="my-1" />

            <div
              className={`flex justify-between font-bold text-sm ${
                invoice.balance <= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              <span>Balance</span>
              <span>{formatCurrency(invoice.balance)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
