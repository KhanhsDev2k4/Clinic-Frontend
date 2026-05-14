import { METHOD } from "@/hooks/global";
import { useSWRWrapper } from "@/hooks/swr";
import { useSession } from "@/hooks/useSession";
import { UserResponse } from "@/interface/response";

export const useCurrentProfile = () => {
  const { accessToken } = useSession();
  return useSWRWrapper<UserResponse>("/api/v1/auth/profile?accessToken=" + accessToken, {
    url: "/api/v1/auth/profile",
    method: METHOD.GET,
    enable: !!accessToken,
  });
};
