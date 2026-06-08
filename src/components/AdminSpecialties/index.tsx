"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { SPECIALTY_TYPE } from "@/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import {
  useAdminSpecialties,
  type SpecialtyStatusFilter,
  type SpecialtyTypeFilter,
} from "@/hooks/admin/useAdminSpecialties";
import type { SpecialtyResponse } from "@/interface/response";

import { SpecialtyDeleteDialog } from "./SpecialtyDeleteDialog";
import { SpecialtyFormModal } from "./SpecialtyFormModal";
import { SpecialtyTable } from "./SpecialtyTable";
import { specialtyTypeOptions } from "./config";

const PAGE_SIZE = 6;

export default function AdminSpecialties() {
  const t = useTranslations("admin.specialties");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<SpecialtyStatusFilter>(FILTER_ALL_VALUE);
  const [typeFilter, setTypeFilter] = useState<SpecialtyTypeFilter>(FILTER_ALL_VALUE);
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingSpecialty, setEditingSpecialty] = useState<SpecialtyResponse | null>(null);
  const [deletingSpecialty, setDeletingSpecialty] = useState<SpecialtyResponse | null>(null);

  const {
    data,
    total,
    totalPages,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    toggleActive,
  } = useAdminSpecialties({
    search,
    status: statusFilter,
    specialtyType: typeFilter,
    page,
    size: PAGE_SIZE,
  });

  const openCreate = () => {
    setEditingSpecialty(null);
    setFormOpen(true);
  };

  const openEdit = (specialty: SpecialtyResponse) => {
    setEditingSpecialty(specialty);
    setFormOpen(true);
  };

  const handleSubmit = (values: Omit<SpecialtyResponse, "id">) => {
    if (editingSpecialty) {
      updateSpecialty(editingSpecialty.id, values);
      return;
    }

    createSpecialty(values);
    setPage(1);
  };

  const handleDelete = () => {
    if (!deletingSpecialty) return;
    deleteSpecialty(deletingSpecialty.id);
    setDeletingSpecialty(null);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-gray-900">{t("title")}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus className="size-4" />
          {t("createButton")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            placeholder={t("searchPlaceholder")}
            className="h-8 pl-9"
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(value: SpecialtyStatusFilter) => {
            setStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[170px]">
            <SelectValue placeholder={t("statusFilterPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL_VALUE}>{t("allStatuses")}</SelectItem>
            <SelectItem value="active">{t("active")}</SelectItem>
            <SelectItem value="inactive">{t("inactive")}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={typeFilter}
          onValueChange={(value: SpecialtyTypeFilter) => {
            setTypeFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[210px]">
            <SelectValue placeholder={t("typeFilterPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL_VALUE}>{t("allTypes")}</SelectItem>
            {specialtyTypeOptions.map((type: SPECIALTY_TYPE) => (
              <SelectItem key={type} value={type}>
                {t(`types.${type}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <SpecialtyTable
        specialties={data}
        onEdit={openEdit}
        onDelete={setDeletingSpecialty}
        onToggleActive={toggleActive}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{t("total", { count: total })}</p>
        {totalPages > 1 && (
          <Pagination className="sm:w-auto sm:justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  text={t("previous")}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={pageNumber === page}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  text={t("next")}
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      <SpecialtyFormModal
        open={formOpen}
        specialty={editingSpecialty}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
      />

      <SpecialtyDeleteDialog
        open={!!deletingSpecialty}
        specialtyName={deletingSpecialty?.name}
        onOpenChange={(open) => !open && setDeletingSpecialty(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
