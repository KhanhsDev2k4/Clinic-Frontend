"use client";

import { useMemo, useState } from "react";

import { SPECIALTY_TYPE } from "@/common";
import { FILTER_ALL_VALUE, type TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import { mockSpecialties } from "@/hooks/mock/specialtyMockData";
import type { SpecialtyResponse } from "@/interface/response";

export type SpecialtyStatusFilter = "active" | "inactive" | TYPE_OF_FILTER_ALL_VALUE;
export type SpecialtyTypeFilter = SPECIALTY_TYPE | TYPE_OF_FILTER_ALL_VALUE;

interface SpecialtyFilter {
  search: string;
  status: SpecialtyStatusFilter;
  specialtyType: SpecialtyTypeFilter;
  page: number;
  size: number;
}

const matchesStatus = (specialty: SpecialtyResponse, status: SpecialtyStatusFilter) => {
  if (status === FILTER_ALL_VALUE) return true;
  if (status === "active") return specialty.isActive;
  return !specialty.isActive;
};

export function useAdminSpecialties(filter: SpecialtyFilter) {
  const [items, setItems] = useState<SpecialtyResponse[]>(mockSpecialties);

  const filtered = useMemo(() => {
    const normalizedSearch = filter.search.trim().toLowerCase();

    return items
      .filter((specialty) => {
        const matchesSearch =
          !normalizedSearch || specialty.name.toLowerCase().includes(normalizedSearch);
        const matchesType =
          filter.specialtyType === FILTER_ALL_VALUE ||
          specialty.specialtyType === filter.specialtyType;

        return matchesSearch && matchesStatus(specialty, filter.status) && matchesType;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [filter.search, filter.status, filter.specialtyType, items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / filter.size));
  const page = Math.min(filter.page, totalPages);
  const data = filtered.slice((page - 1) * filter.size, page * filter.size);

  const createSpecialty = (values: Omit<SpecialtyResponse, "id">) => {
    setItems((current) => [{ ...values, id: `specialty-${Date.now()}` }, ...current]);
  };

  const updateSpecialty = (specialtyId: string, values: Omit<SpecialtyResponse, "id">) => {
    setItems((current) =>
      current.map((specialty) =>
        specialty.id === specialtyId ? { ...specialty, ...values } : specialty
      )
    );
  };

  const deleteSpecialty = (specialtyId: string) => {
    setItems((current) => current.filter((specialty) => specialty.id !== specialtyId));
  };

  const toggleActive = (specialtyId: string) => {
    setItems((current) =>
      current.map((specialty) =>
        specialty.id === specialtyId ? { ...specialty, isActive: !specialty.isActive } : specialty
      )
    );
  };

  return {
    data,
    total: filtered.length,
    totalPages,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    toggleActive,
  };
}
