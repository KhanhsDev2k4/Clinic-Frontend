"use client";

import { useState, useMemo } from "react";
import { Search, Download, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";

interface ReportItem {
  id: string;
  title: string;
  type: string;
  status: string;
  generatedAt: string;
  generatedBy: string;
}

const MOCK_REPORTS: ReportItem[] = [
  {
    id: "1",
    title: "Monthly Revenue Report — May 2026",
    type: "Revenue",
    status: "COMPLETED",
    generatedAt: "01/06/2026",
    generatedBy: "Admin",
  },
  {
    id: "2",
    title: "Appointment Summary — May 2026",
    type: "Appointments",
    status: "COMPLETED",
    generatedAt: "01/06/2026",
    generatedBy: "Admin",
  },
  {
    id: "3",
    title: "Patient Demographics Report",
    type: "Patients",
    status: "PENDING",
    generatedAt: "03/06/2026",
    generatedBy: "Staff",
  },
  {
    id: "4",
    title: "Doctor Performance — Q1 2026",
    type: "Performance",
    status: "COMPLETED",
    generatedAt: "05/04/2026",
    generatedBy: "Admin",
  },
  {
    id: "5",
    title: "Revenue Forecast — Q2 2026",
    type: "Revenue",
    status: "COMPLETED",
    generatedAt: "01/04/2026",
    generatedBy: "Admin",
  },
  {
    id: "6",
    title: "No-Show Rate Analysis",
    type: "Appointments",
    status: "COMPLETED",
    generatedAt: "10/05/2026",
    generatedBy: "Staff",
  },
  {
    id: "7",
    title: "Service Utilization Report",
    type: "Services",
    status: "COMPLETED",
    generatedAt: "15/05/2026",
    generatedBy: "Admin",
  },
  {
    id: "8",
    title: "New Patient Acquisition — Q2",
    type: "Patients",
    status: "PENDING",
    generatedAt: "04/06/2026",
    generatedBy: "Staff",
  },
  {
    id: "9",
    title: "Clinic Operating Costs — May",
    type: "Finance",
    status: "COMPLETED",
    generatedAt: "02/06/2026",
    generatedBy: "Admin",
  },
  {
    id: "10",
    title: "Doctor Schedule Utilization",
    type: "Performance",
    status: "COMPLETED",
    generatedAt: "12/05/2026",
    generatedBy: "Admin",
  },
];

const PAGE_SIZE = 6;

const statusBadge: Record<string, string> = {
  COMPLETED: "bg-green-50 text-green-700",
  PENDING: "bg-amber-50 text-amber-700",
  FAILED: "bg-red-50 text-red-700",
};

export default function AdminReports() {
  const t = useTranslations("admin");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

  const filtered = useMemo(() => {
    return MOCK_REPORTS.filter((r) => {
      const matchSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || r.type === typeFilter;
      const matchStatus = statusFilter === "all" || r.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const reportTypes = useMemo(() => {
    const types = Array.from(new Set(MOCK_REPORTS.map((r) => r.type)));
    return types;
  }, []);

  const handleExport = (report: ReportItem) => {
    console.log("[Reports] export:", report.id);
  };

  const handleView = (report: ReportItem) => {
    console.log("[Reports] view:", report.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-gray-900">
          {t("reports.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {t("reports.subtitle")}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("reports.searchPlaceholder")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-8"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder={t("reports.filterType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("reports.allTypes")}</SelectItem>
            {reportTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[150px]">
            <SelectValue placeholder={t("reports.filterStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("reports.allStatuses")}</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2">
          <DatePicker
            value={dateFrom}
            onChange={(d) => {
              setDateFrom(d);
              setPage(1);
            }}
          />
          <span className="text-muted-foreground text-sm">to</span>
          <DatePicker
            value={dateTo}
            onChange={(d) => {
              setDateTo(d);
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="pl-4">{t("reports.title")}</TableHead>
              <TableHead>{t("reports.type")}</TableHead>
              <TableHead>{t("reports.status")}</TableHead>
              <TableHead>{t("reports.generatedAt")}</TableHead>
              <TableHead>{t("reports.generatedBy")}</TableHead>
              <TableHead className="text-right w-36 pr-4">
                {t("reports.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="pl-4 font-medium max-w-[300px] truncate">
                  {report.title}
                </TableCell>
                <TableCell>
                  <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                    {report.type}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      statusBadge[report.status] || "bg-gray-100 text-gray-600"
                    )}
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {report.generatedAt}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {report.generatedBy}
                </TableCell>
                <TableCell className="text-right pr-4">
                  <div className="flex items-center justify-end gap-0.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleView(report)}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleExport(report)}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pageData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  {t("reports.noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={
                  page <= 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className={
                  page >= totalPages
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
