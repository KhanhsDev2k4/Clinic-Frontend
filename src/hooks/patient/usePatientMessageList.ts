import { MessageResponse } from "@/interface/response";
import { useMutation } from "@/hooks/swr";
import { ApiPagedResponse, METHOD } from "@/hooks/global";

export const usePatientMessageList = () => {
  return useMutation<ApiPagedResponse<MessageResponse>>(`/api/v1/patient/message`, {
    url: `/api/v1/patient/message`,
    method: METHOD.GET,
  });
};

export const usePatientMessageCreate = () => {
  return useMutation<MessageResponse>(`/api/v1/patient/message`, {
    url: `/api/v1/patient/message`,
    method: METHOD.POST,
  });
};
