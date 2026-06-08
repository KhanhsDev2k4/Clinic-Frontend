import * as yup from "yup";

import type { ServiceResponse } from "@/interface/response";

export const serviceFormSchema = yup.object({
  name: yup.string().required("required"),
  slug: yup.string().required("required"),
  description: yup.string().required("required"),
  duration: yup.number().min(1, "minDuration").required("required"),
  price: yup.number().min(0, "minPrice").required("required"),
  promotionalPrice: yup.number().min(0, "minPrice").required("required"),
  image: yup.string().url("url").required("required"),
  isFeatured: yup.boolean().required(),
  isActive: yup.boolean().required(),
});

export type ServiceFormValues = yup.InferType<typeof serviceFormSchema>;

export const toServiceFormValues = (service?: ServiceResponse | null): ServiceFormValues => ({
  name: service?.name ?? "",
  slug: service?.slug ?? "",
  description: service?.description ?? "",
  duration: service?.duration ?? 30,
  price: service?.price ?? 0,
  promotionalPrice: service?.promotionalPrice ?? 0,
  image: service?.image ?? "",
  isFeatured: service?.isFeatured ?? false,
  isActive: service?.isActive ?? true,
});

export const toServicePayload = (
  values: ServiceFormValues,
  service?: ServiceResponse | null
): Omit<ServiceResponse, "id"> => ({
  ...values,
  duration: Number(values.duration),
  price: Number(values.price),
  promotionalPrice: Number(values.promotionalPrice),
  createdAt: service?.createdAt ?? new Date().toISOString(),
  updatedAt: service ? new Date().toISOString() : null,
  deletedAt: service?.deletedAt ?? null,
  deleted: service?.deleted ?? false,
});
