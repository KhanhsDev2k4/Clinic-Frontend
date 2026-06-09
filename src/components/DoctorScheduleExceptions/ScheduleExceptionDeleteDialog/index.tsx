"use client";

import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

interface ScheduleExceptionDeleteDialogProps {
  exception: DoctorScheduleExceptionResponse | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}

export function ScheduleExceptionDeleteDialog({
  exception,
  onOpenChange,
  onConfirm,
}: ScheduleExceptionDeleteDialogProps) {
  const t = useTranslations("doctorScheduleExceptions.deleteDialog");

  return (
    <AlertDialog open={!!exception} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-50 text-red-600">
            <AlertTriangle />
          </AlertDialogMedia>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("description", { date: exception?.exceptionDate ?? "" })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onConfirm}>
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
