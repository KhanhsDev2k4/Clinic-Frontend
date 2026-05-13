import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
