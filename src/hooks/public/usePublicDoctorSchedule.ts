import { buildQueryParams } from "../../components/ui/utils";
import { BaseFilter, DoctorScheduleException } from "../../types";
import { ApiPagedResponse, METHOD } from "../global";
import { useSWRWrapper } from "../swr";

export const usePublicDoctorScheduleExceptions = (
  filter?: BaseFilter & {
    doctorId?: string;
    from?: string;
    to?: string;
  },
) => {
  const query = buildQueryParams(filter);

  return useSWRWrapper<ApiPagedResponse<DoctorScheduleException>>(
    `/api/v1/public/doctor-schedule-exception?${query}`,
    {
      url: `/api/v1/public/doctor-schedule-exception?${query}`,
      method: METHOD.GET,
    },
  );
};
