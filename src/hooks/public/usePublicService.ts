import { BaseFilter, ServiceData } from "@/app/types";
import { useSWRWrapper } from "../swr";
import { buildQueryParams } from "@/app/components/ui/utils";
import { ApiPagedResponse, METHOD } from "../global";

export const usePublicServiceList = (
  filter?: BaseFilter & {
    specialtyId?: string;
  }
) => {
  const query = buildQueryParams(filter);

  return useSWRWrapper<ApiPagedResponse<ServiceData>>(`/api/v1/public/service?${query}`, {
    url: `/api/v1/public/service?${query}`,
    method: METHOD.GET,
  });
};
