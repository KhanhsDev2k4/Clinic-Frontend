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

interface ServiceDeleteDialogProps {
  open: boolean;
  serviceName?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ServiceDeleteDialog({
  open,
  serviceName,
  onOpenChange,
  onConfirm,
}: ServiceDeleteDialogProps) {
  const t = useTranslations("admin.services");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("deleteTitle")}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          {t("deleteDescription", { name: serviceName ?? t("thisService") })}
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
