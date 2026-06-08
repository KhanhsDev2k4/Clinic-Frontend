import { useSession } from "@/hooks/useSession";
import { useMutation, useSWRWrapper } from "@/hooks/swr";
import { AppointmentResponse } from "@/interface/response";
import { ApiPagedResponse, METHOD } from "@/hooks/global";
import { buildQueryParams } from "@/lib/utils";
import { AppointmentFilterFormValues } from "@/components/Appointments/TabContent";

export const useStaffCheckIn = (filter?: AppointmentFilterFormValues) => {
  const query = buildQueryParams(filter);
  const { accessToken } = useSession();

  return useSWRWrapper<ApiPagedResponse<AppointmentResponse>>(
    `/api/v1/staff/appointment?${query}&accessToken=${accessToken}`,
    {
      url: `/api/v1/staff/appointment?${query}`,
      method: METHOD.GET,
    }
  );
};

export const useStaffCheckInUpdate = (appointmentId: string) => {
  return useMutation<AppointmentResponse>(
    `staff-checkin-${appointmentId}`,
    {
      url: `/api/v1/staff/appointment/${appointmentId}`,
      method: METHOD.PATCH,
      notification: {
        message: "Patient checked in successfully",
        title: "Check-In",
      },
    }
  );
};
