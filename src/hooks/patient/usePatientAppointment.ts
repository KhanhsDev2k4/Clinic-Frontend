import { AppointmentFilterFormValues } from "@/components/Appointments/TabContent";
import { ApiPagedResponse, METHOD } from "@/hooks/global";
import { useSWRWrapper } from "@/hooks/swr";
import { AppointmentResponse } from "@/interface/response";
import { buildQueryParams } from "@/lib/utils";

export const usePatientAppointment = (filter?: AppointmentFilterFormValues) => {
  const query = buildQueryParams(filter);

  return useSWRWrapper<ApiPagedResponse<AppointmentResponse>>(
    `/api/v1/patient/appointment?${query}`,
    {
      url: `/api/v1/patient/appointment?${query}`,
      method: METHOD.GET,
    }
  );
};

export const usePatientAppointmentDetail = (aptId: string | null) => {
  return useSWRWrapper<AppointmentResponse>(`/api/v1/patient/appointment/${aptId}`, {
    url: `/api/v1/patient/appointment/${aptId}`,
    method: METHOD.GET,
    enable: !!aptId,
  });
};
