"use client";

import { useEffect, useMemo, useState } from "react";

import { SPECIALTY_TYPE } from "@/common";
import type { ApiPagedResponse, ApiResponse } from "@/hooks/global";
import { FILTER_ALL_VALUE, type TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import { mockSpecialties } from "@/hooks/mock/specialtyMockData";
import type { SpecialtyResponse } from "@/interface/response";

export type PublicSpecialtyTypeFilter = SPECIALTY_TYPE | TYPE_OF_FILTER_ALL_VALUE;

interface PublicSpecialtiesFilter {
  search?: string;
  specialtyType?: PublicSpecialtyTypeFilter;
}

export function useMockPublicSpecialties(filter?: PublicSpecialtiesFilter) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const specialties = useMemo(() => {
    const normalizedSearch = filter?.search?.trim().toLowerCase() ?? "";
    const specialtyType = filter?.specialtyType ?? FILTER_ALL_VALUE;

    return mockSpecialties
      .filter((specialty) => {
        const matchesSearch =
          !normalizedSearch || specialty.name.toLowerCase().includes(normalizedSearch);
        const matchesType =
          specialtyType === FILTER_ALL_VALUE || specialty.specialtyType === specialtyType;

        return specialty.isActive && matchesSearch && matchesType;
      })
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }, [filter?.search, filter?.specialtyType]);

  const data: ApiResponse<ApiPagedResponse<SpecialtyResponse>> = {
    headers: {},
    body: {
      data: specialties,
      total: specialties.length,
      page: 1,
      size: specialties.length,
      totalPages: 1,
    },
    statusCode: "OK",
    statusCodeValue: 200,
  };

  return {
    data,
    isLoading,
    error: undefined,
  };
}
