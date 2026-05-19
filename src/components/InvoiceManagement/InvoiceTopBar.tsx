"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilterInvoiceData } from "@/components/InvoiceManagement/hook";
import { INVOICE_STATUS_FILTER_OPTIONS } from "@/components/InvoiceManagement/config";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { set } from "date-fns";
import { formatDate } from "@/lib/utils";

export function InvoiceTopBar() {
  const { data, mutateData } = useFilterInvoiceData();

  const [innerKeyword, setInnerKeyword] = useState<string>(data?.keyword ?? "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const debouncedKeyword = useDebounce(innerKeyword, 600);
  const prevDebouncedKeyword = useRef<string>("");

  useEffect(() => {
    if (debouncedKeyword === prevDebouncedKeyword.current) return;
    prevDebouncedKeyword.current = debouncedKeyword;
    mutateData({ keyword: debouncedKeyword });
  }, [debouncedKeyword]);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    mutateData({
      date: {
        from: range?.from!,
        to: range?.to!,
      },
    });
  };

  const clearDateRange = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange(undefined);
    mutateData({
      date: {
        from: set(new Date(), { hours: 0, minutes: 0, seconds: 0 }),
        to: set(new Date(), {
          hours: 23,
          minutes: 59,
          seconds: 59,
        }),
      },
    });
  };

  const dateLabel =
    dateRange?.from && dateRange?.to
      ? `${formatDate(dateRange.from)} – ${formatDate(dateRange.to)}`
      : dateRange?.from
        ? formatDate(dateRange.from)
        : null;

  return (
    <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="px-6 md:px-8 h-16 flex items-center gap-3 w-full">
        {/* Title */}
        <h1 className="text-lg font-bold text-gray-900 shrink-0">Invoices</h1>

        {/* Status filter */}
        <Select
          value={data?.status ?? FILTER_ALL_VALUE}
          onValueChange={(value) => mutateData({ status: value as any })}
        >
          <SelectTrigger className="h-8 w-36 text-xs ml-auto">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {INVOICE_STATUS_FILTER_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date range picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs gap-1.5 font-normal min-w-30 max-w-50"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              {dateLabel ? (
                <span className="truncate">{dateLabel}</span>
              ) : (
                <span className="text-gray-400">Date range</span>
              )}
              {dateLabel && (
                <X
                  className="w-3 h-3 text-gray-400 hover:text-gray-700 shrink-0 ml-auto"
                  onClick={clearDateRange}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              className="text-xs"
            />
          </PopoverContent>
        </Popover>

        {/* Search */}
        <div className="relative w-52 shrink-0">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <Input
            value={innerKeyword}
            onChange={(e) => setInnerKeyword(e.target.value)}
            placeholder="Search patient, invoice…"
            className="pl-8 h-8 text-xs bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}
