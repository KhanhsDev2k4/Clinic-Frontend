"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getImageUrl } from "@/lib/utils";
import type { SpecialtyResponse } from "@/interface/response";

interface SpecialtyTableProps {
  specialties: SpecialtyResponse[];
  onEdit: (specialty: SpecialtyResponse) => void;
  onDelete: (specialty: SpecialtyResponse) => void;
  onToggleActive: (specialtyId: string) => void;
}

export function SpecialtyTable({
  specialties,
  onEdit,
  onDelete,
  onToggleActive,
}: SpecialtyTableProps) {
  const t = useTranslations("admin.specialties");

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="pl-4">{t("columns.image")}</TableHead>
            <TableHead>{t("columns.name")}</TableHead>
            <TableHead>{t("columns.slug")}</TableHead>
            <TableHead>{t("columns.specialtyType")}</TableHead>
            <TableHead>{t("columns.displayOrder")}</TableHead>
            <TableHead>{t("columns.status")}</TableHead>
            <TableHead className="w-28 pr-4 text-right">{t("columns.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialties.map((specialty) => (
            <TableRow key={specialty.id}>
              <TableCell className="pl-4">
                <div className="relative size-12 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={getImageUrl(specialty.image)}
                    alt={specialty.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-gray-900">{specialty.name}</div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{specialty.slug}</TableCell>
              <TableCell>
                <Badge variant="outline">{t(`types.${specialty.specialtyType}`)}</Badge>
              </TableCell>
              <TableCell>{specialty.displayOrder}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={specialty.isActive}
                    aria-label={t("toggleActive")}
                    onCheckedChange={() => onToggleActive(specialty.id)}
                  />
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      specialty.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {specialty.isActive ? t("active") : t("inactive")}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="pr-4 text-right">
                <div className="flex items-center justify-end gap-0.5">
                  <Button variant="ghost" size="icon-sm" onClick={() => onEdit(specialty)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => onDelete(specialty)}>
                    <Trash2 className="size-3.5 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {specialties.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-28 text-center text-muted-foreground">
                {t("noResults")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
