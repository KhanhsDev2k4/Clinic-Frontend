"use client";

import { useEffect, useMemo, useState } from "react";

import type { ApiPagedResponse, ApiResponse } from "@/hooks/global";
import type { ServiceResponse } from "@/interface/response";
import { mockServices } from "@/hooks/mock/serviceMockData";

interface PublicServicesFilter {
  search?: string;
}

export function useMockPublicServices(filter?: PublicServicesFilter) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const services = useMemo(() => {
    const normalizedSearch = filter?.search?.trim().toLowerCase() ?? "";

    return mockServices.filter((service) => {
      const matchesSearch =
        !normalizedSearch || service.name.toLowerCase().includes(normalizedSearch);

      return service.isActive && matchesSearch;
    });
  }, [filter?.search]);

  const data: ApiResponse<ApiPagedResponse<ServiceResponse>> = {
    headers: {},
    body: {
      data: services,
      total: services.length,
      page: 1,
      size: services.length,
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
