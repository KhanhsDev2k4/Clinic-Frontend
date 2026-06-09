import { EXCEPTION_TYPE } from "@/common";

export interface ScheduleExceptionFormValues {
  exceptionDate: string;
  type: EXCEPTION_TYPE;
  reason: string;
}

export const initialScheduleExceptionFormValues: ScheduleExceptionFormValues = {
  exceptionDate: "",
  type: EXCEPTION_TYPE.LEAVE,
  reason: "",
};
