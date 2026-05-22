import { BaseFilter, UserResponse } from "@/interface/response";
import { buildQueryParams } from "@/lib/utils";
import { useSession } from "@/hooks/useSession";
import { useSWRWrapper } from "@/hooks/swr";
import { METHOD } from "@/hooks/global";

export const useUsersByProfileIds = (
  filters?: BaseFilter &
    Partial<{
      ids: string[];
    }>
) => {
  const query = buildQueryParams(filters);
  const { accessToken } = useSession();

  return useSWRWrapper<UserResponse[]>(
    `/api/v1/public/profile?${query}&accessToken=${accessToken}`,
    {
      url: `/api/v1/public/profile?${query}`,
      method: METHOD.GET,
      enable: !!filters?.ids?.length,
    }
  );
};
