import { buildQueryParams } from "@/lib/utils";
import { ApiPagedResponse, METHOD } from "../global";
import { useSWRWrapper } from "../swr";
import { BaseFilter, DoctorProfileResponse } from "@/interface/response";

export const usePublicDoctorList = (
  filter?: BaseFilter & {
    isFeatured?: boolean;
    fullName?: string;
    specialtyId?: string;
  }
) => {
  const query = buildQueryParams(filter);

  return useSWRWrapper<ApiPagedResponse<DoctorProfileResponse>>(
    `/api/v1/public/doctor-profile?${query}`,
    {
      url: `/api/v1/public/doctor-profile?${query}`,
      method: METHOD.GET,
    }
  );
};
