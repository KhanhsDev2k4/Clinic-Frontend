import * as yup from "yup";

export const staffInfoFormSchema = yup.object({
  position: yup.string().max(100, "Position must be at most 100 characters"),
  department: yup.string().max(100, "Department must be at most 100 characters"),
  hireDate: yup.string(),
});

export type StaffInfoFormValues = yup.InferType<typeof staffInfoFormSchema>;
