import { GENDER } from "@/common";
import * as yup from "yup";

export const basicInfoSchema = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .max(255, "Full name must not exceed 255 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),

  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^(\+84|0)[3|5|7|8|9][0-9]{8}$/, "Invalid Vietnamese phone number"),

  gender: yup
    .mixed<GENDER>()
    .oneOf(Object.values(GENDER), "Invalid gender")
    .required("Gender is required"),

  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future")
    .typeError("Invalid date of birth"),

  avatarUrl: yup.string().url("Must be a valid URL").optional(),
});

export type BasicInfoFormValues = yup.InferType<typeof basicInfoSchema>;
