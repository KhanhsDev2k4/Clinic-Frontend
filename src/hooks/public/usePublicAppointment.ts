// import { ApiPagedResponse, METHOD } from "../global";
// import { useMutation, useSWRWrapper } from "../swr";

// export const usePublicAppointment = (
//   filter?: BaseFilter & {
//     appointmentDate?: string;
//     doctorProfileId?: string;
//     fromDate?: string;
//     toDate?: string;
//   }
// ) => {
//   const query = buildQueryParams(filter);

//   return useSWRWrapper<ApiPagedResponse<AppointmentData>>(`/api/v1/public/appointment?${query}`, {
//     url: `/api/v1/public/appointment?${query}`,
//     method: METHOD.GET,
//     enable: !!filter?.appointmentDate && !!filter?.doctorProfileId,
//   });
// };

// export const usePublicAppointmentCreate = () => {
//   return useMutation("/api/v1/public/appointment", {
//     url: "/api/v1/public/appointment",
//     method: METHOD.POST,
//     notification: {
//       message: "Đặt lịch hẹn thành công",
//       title: "Lịch hẹn",
//     },
//   });
// };
