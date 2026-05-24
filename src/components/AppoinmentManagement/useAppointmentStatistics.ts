import { useSWRWrapper } from "@/hooks/swr";
import { AppointmentDoctorStatisticsResponse } from "@/interface/response";
import { METHOD } from "@/hooks/global";
import { useSession } from "@/hooks/useSession";

export const useAppointmentStatistics = () => {
  const { accessToken } = useSession();

  return useSWRWrapper<AppointmentDoctorStatisticsResponse>(
    "/api/v1/doctor/appointment/statistics?accessToken=" + accessToken,
    {
      url: "/api/v1/doctor/appointment/statistics",
      method: METHOD.GET,
    }
  );
};
