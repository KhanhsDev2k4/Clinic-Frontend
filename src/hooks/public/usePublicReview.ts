import { BaseFilter, ReviewResponse } from "@/interface/response";
import { buildQueryParams } from "@/lib/utils";
import { useSWRWrapper } from "@/hooks/swr";
import { ApiPagedResponse, METHOD } from "@/hooks/global";

export const usePublicReview = (
  filter?: BaseFilter & {
    doctorProfileId?: string;
    reviewId?: string;
    appointmentId?: string;
  }
) => {
  const query = buildQueryParams(filter);

  return useSWRWrapper<ApiPagedResponse<ReviewResponse>>(`/api/v1/public/review?${query}`, {
    url: `/api/v1/public/review?${query}`,
    method: METHOD.GET,
  });
};
