import { METHOD } from "@/hooks/global";
import { useMutation } from "@/hooks/swr";
import { AuthState } from "@/hooks/useSession";

export const useUpdateUser = () => {
  return useMutation<AuthState>("/api/v1/auth/update-profile", {
    url: "update-profile",
    method: METHOD.POST,
    notification: {
      title: "Authentication",
      message: "You have successfully updated your profile",
    },
  });
};
