import useSWR from "swr";
import { DOCTOR_PATIENTS_SWR_KEY } from "@/hooks";
import { set } from "date-fns";
import { DateRange } from "react-day-picker";

interface FilterPatientData {
  activeTab: FILTER_PATIENT_TABS;
  keyword?: string;
  date?: DateRange;
}

export enum FILTER_PATIENT_TABS {
  APPOINTMENTS = "APPOINTMENTS",
  MESSAGES = "MESSAGES",
}

const initialValues: FilterPatientData = {
  activeTab: FILTER_PATIENT_TABS.APPOINTMENTS,
  keyword: "",
  date: {
    from: set(new Date(), { hours: 0, minutes: 0, seconds: 0, date: new Date().getDate() - 7 }),
    to: set(new Date(), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      date: new Date().getDate() + 7,
    }),
  },
};

export const useFilterAppointmentsData = () => {
  const data = useSWR<FilterPatientData>(DOCTOR_PATIENTS_SWR_KEY, null, {
    fallbackData: initialValues,
  });

  const mutateData = (newData: Partial<FilterPatientData>) => {
    data.mutate(
      (prev) => ({
        ...prev!,
        ...newData,
      }),
      false
    );
  };

  return {
    data: data.data,
    mutateData,
  };
};
