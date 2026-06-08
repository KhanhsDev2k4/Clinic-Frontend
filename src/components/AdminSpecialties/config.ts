import * as yup from "yup";

import { SPECIALTY_TYPE } from "@/common";
import type { SpecialtyResponse } from "@/interface/response";

export const specialtyTypeOptions = Object.values(SPECIALTY_TYPE);

export const specialtyFormSchema = yup.object({
  name: yup.string().required("required"),
  slug: yup.string().required("required"),
  description: yup.string().required("required"),
  image: yup.string().url("url").required("required"),
  specialtyType: yup
    .mixed<SPECIALTY_TYPE>()
    .oneOf(specialtyTypeOptions, "required")
    .required("required"),
  displayOrder: yup.number().min(0, "minDisplayOrder").required("required"),
  isActive: yup.boolean().required(),
});

export type SpecialtyFormValues = yup.InferType<typeof specialtyFormSchema>;

export const toSpecialtyFormValues = (
  specialty?: SpecialtyResponse | null
): SpecialtyFormValues => ({
  name: specialty?.name ?? "",
  slug: specialty?.slug ?? "",
  description: specialty?.description ?? "",
  image: specialty?.image ?? "",
  specialtyType: specialty?.specialtyType ?? SPECIALTY_TYPE.GENERAL,
  displayOrder: specialty?.displayOrder ?? 1,
  isActive: specialty?.isActive ?? true,
});

export const toSpecialtyPayload = (values: SpecialtyFormValues): Omit<SpecialtyResponse, "id"> => ({
  ...values,
  displayOrder: Number(values.displayOrder),
});
