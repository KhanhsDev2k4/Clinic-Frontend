"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { ExceptionTypeBadge } from "@/components/DoctorScheduleExceptions/ExceptionTypeBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
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
import { formatDate } from "@/lib/utils";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

interface ScheduleExceptionTableProps {
  exceptions: DoctorScheduleExceptionResponse[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
  onEdit: (exception: DoctorScheduleExceptionResponse) => void;
  onDelete: (exception: DoctorScheduleExceptionResponse) => void;
}

export function ScheduleExceptionTable({
  exceptions,
  isLoading,
  page,
  totalPages,
  total,
  onPageChange,
  onEdit,
  onDelete,
}: ScheduleExceptionTableProps) {
  const t = useTranslations("doctorScheduleExceptions");

  return (
    <Card className="rounded-lg bg-white">
      <CardHeader>
        <CardTitle>{t("table.title")}</CardTitle>
        <CardDescription>{t("table.description", { count: total })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("table.columns.exceptionDate")}</TableHead>
              <TableHead>{t("table.columns.type")}</TableHead>
              <TableHead>{t("table.columns.reason")}</TableHead>
              <TableHead className="w-28 text-right">{t("table.columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  {t("table.loading")}
                </TableCell>
              </TableRow>
            ) : exceptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  {t("table.empty")}
                </TableCell>
              </TableRow>
            ) : (
              exceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-medium">{formatDate(exception.exceptionDate)}</TableCell>
                  <TableCell>
                    <ExceptionTypeBadge type={exception.type} />
                  </TableCell>
                  <TableCell className="max-w-md whitespace-normal text-muted-foreground">
                    {exception.reason}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("actions.edit")}
                        onClick={() => onEdit(exception)}
                      >
                        <Edit2 />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t("actions.delete")}
                        onClick={() => onDelete(exception)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                text={t("pagination.previous")}
                aria-disabled={page === 1}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(Math.max(1, page - 1));
                }}
              />
            </PaginationItem>
            <PaginationItem className="px-3 text-sm text-muted-foreground">
              {t("pagination.page", { page, totalPages })}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                text={t("pagination.next")}
                aria-disabled={page === totalPages}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(Math.min(totalPages, page + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
