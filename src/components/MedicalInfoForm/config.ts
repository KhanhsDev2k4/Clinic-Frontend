import { BLOOD_TYPE } from "@/common";
import * as yup from "yup";

export const medicalInfoSchema = yup.object({
  bloodType: yup
    .mixed<BLOOD_TYPE>()
    .oneOf(Object.values(BLOOD_TYPE), "Invalid blood type")
    .required("Blood type is required"),

  address: yup.string().max(500, "Address must not exceed 500 characters").optional(),

  insuranceNumber: yup
    .string()
    .max(100, "Insurance number must not exceed 100 characters")
    .optional(),

  allergies: yup.string().max(2000, "Allergies must not exceed 2000 characters").optional(),

  chronicDiseases: yup
    .string()
    .max(2000, "Chronic diseases must not exceed 2000 characters")
    .optional(),
});

export type MedicalInfoFormValues = yup.InferType<typeof medicalInfoSchema>;
