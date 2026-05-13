import { METHOD } from "../global";
import { useMutation, useSWRWrapper } from "../swr";

export const usePublicPatientCount = () => {
  return useSWRWrapper<number>("/api/v1/public/patient-profile/count", {
    url: "/api/v1/public/patient-profile/count",
    method: METHOD.GET,
  });
};

export const usePublicPatientProfile = (id: string) => {
  const publicPatchPatientProfile = useMutation(
    `/api/v1/public/patient-profile/${id}`,
    {
      url: `/api/v1/public/patient-profile/${id}`,
      method: METHOD.PATCH,
      notification: {
        message: "Cập nhật hồ sơ bệnh nhân thành công",
        title: "Hồ sơ bệnh nhân",
      },
    },
  );

  const publicPostPatientProfile = useMutation(
    `/api/v1/public/patient-profile`,
    {
      url: `/api/v1/public/patient-profile`,
      method: METHOD.POST,
      notification: {
        message: "Tạo hồ sơ bệnh nhân thành công",
        title: "Hồ sơ bệnh nhân",
      },
    },
  );

  return {
    publicPatchPatientProfile,
    publicPostPatientProfile,
  };
};
