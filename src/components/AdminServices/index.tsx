"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";

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
import { useAdminServices, type ServiceStatusFilter } from "@/hooks/admin/useAdminServices";
import type { ServiceResponse } from "@/interface/response";

import { ServiceDeleteDialog } from "./ServiceDeleteDialog";
import { ServiceFormModal } from "./ServiceFormModal";
import { ServiceTable } from "./ServiceTable";

const PAGE_SIZE = 5;

export default function AdminServices() {
  const t = useTranslations("admin.services");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ServiceStatusFilter>(FILTER_ALL_VALUE);
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceResponse | null>(null);
  const [deletingService, setDeletingService] = useState<ServiceResponse | null>(null);

  const {
    data,
    total,
    totalPages,
    createService,
    updateService,
    deleteService,
    toggleActive,
    toggleFeatured,
  } = useAdminServices({
    search,
    status: statusFilter,
    page,
    size: PAGE_SIZE,
  });

  const openCreate = () => {
    setEditingService(null);
    setFormOpen(true);
  };

  const openEdit = (service: ServiceResponse) => {
    setEditingService(service);
    setFormOpen(true);
  };

  const handleSubmit = (values: Omit<ServiceResponse, "id">) => {
    if (editingService) {
      updateService(editingService.id, values);
      return;
    }

    createService(values);
    setPage(1);
  };

  const handleDelete = () => {
    if (!deletingService) return;
    deleteService(deletingService.id);
    setDeletingService(null);
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
          onValueChange={(value: ServiceStatusFilter) => {
            setStatusFilter(value);
            setPage(1);
          }}
        >
          <SelectTrigger className="h-8 w-[170px]">
            <SelectValue placeholder={t("filterPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FILTER_ALL_VALUE}>{t("allServices")}</SelectItem>
            <SelectItem value="active">{t("active")}</SelectItem>
            <SelectItem value="inactive">{t("inactive")}</SelectItem>
            <SelectItem value="featured">{t("featured")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ServiceTable
        services={data}
        onEdit={openEdit}
        onDelete={setDeletingService}
        onToggleActive={toggleActive}
        onToggleFeatured={toggleFeatured}
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

      <ServiceFormModal
        open={formOpen}
        service={editingService}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
      />

      <ServiceDeleteDialog
        open={!!deletingService}
        serviceName={deletingService?.name}
        onOpenChange={(open) => !open && setDeletingService(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
