import * as yup from "yup";

export const rescheduleSchema = yup.object({
  date: yup.date().required("Please select a date"),
  time: yup.string().required("Please select a time slot"),
});

export type RescheduleFormValues = yup.InferType<typeof rescheduleSchema>;
