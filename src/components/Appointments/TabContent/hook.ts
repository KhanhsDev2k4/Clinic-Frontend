import { APPOINTMENT_SWR_KEY } from "@/hooks";
import useSWR from "swr";

export const useForceRefreshAppointment = () => {
  const swr = useSWR<number>(APPOINTMENT_SWR_KEY);

  const forceMutate = () => {
    swr.mutate((prev) => (prev ?? 0) + 1);
  };

  return { swr, forceMutate };
};
