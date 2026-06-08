"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SpecialtyDeleteDialogProps {
  open: boolean;
  specialtyName?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function SpecialtyDeleteDialog({
  open,
  specialtyName,
  onOpenChange,
  onConfirm,
}: SpecialtyDeleteDialogProps) {
  const t = useTranslations("admin.specialties");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("deleteTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {t("deleteDescription", { name: specialtyName ?? t("thisSpecialty") })}
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
