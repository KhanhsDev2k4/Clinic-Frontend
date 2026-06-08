"use client";

import { useFormik } from "formik";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceResponse } from "@/interface/response";

import {
  serviceFormSchema,
  toServiceFormValues,
  toServicePayload,
  type ServiceFormValues,
} from "./config";

interface ServiceFormModalProps {
  open: boolean;
  service?: ServiceResponse | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Omit<ServiceResponse, "id">) => void;
}

export function ServiceFormModal({
  open,
  service,
  onOpenChange,
  onSubmit,
}: ServiceFormModalProps) {
  const t = useTranslations("admin.services");

  const formik = useFormik<ServiceFormValues>({
    enableReinitialize: true,
    initialValues: toServiceFormValues(service),
    validationSchema: serviceFormSchema,
    onSubmit: (values, formikHelpers) => {
      try {
        onSubmit(toServicePayload(values, service));
        onOpenChange(false);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  const errorMessage = (key?: string) => (key ? t(`validation.${key}`) : "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service ? t("editService") : t("createService")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="service-name">{t("fields.name")}</FieldLabel>
              <Input id="service-name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.name)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="service-slug">{t("fields.slug")}</FieldLabel>
              <Input id="service-slug" {...formik.getFieldProps("slug")} />
              {formik.touched.slug && formik.errors.slug && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.slug)}
                </FieldDescription>
              )}
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="service-description">{t("fields.description")}</FieldLabel>
              <Textarea
                id="service-description"
                rows={3}
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.description)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="service-duration">{t("fields.duration")}</FieldLabel>
              <Input
                id="service-duration"
                type="number"
                min={1}
                {...formik.getFieldProps("duration")}
              />
              {formik.touched.duration && formik.errors.duration && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.duration)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="service-image">{t("fields.image")}</FieldLabel>
              <Input id="service-image" {...formik.getFieldProps("image")} />
              {formik.touched.image && formik.errors.image && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.image)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="service-price">{t("fields.price")}</FieldLabel>
              <Input
                id="service-price"
                type="number"
                min={0}
                {...formik.getFieldProps("price")}
              />
              {formik.touched.price && formik.errors.price && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.price)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="service-promotional-price">
                {t("fields.promotionalPrice")}
              </FieldLabel>
              <Input
                id="service-promotional-price"
                type="number"
                min={0}
                {...formik.getFieldProps("promotionalPrice")}
              />
              {formik.touched.promotionalPrice && formik.errors.promotionalPrice && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.promotionalPrice)}
                </FieldDescription>
              )}
            </Field>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <FieldLabel htmlFor="service-featured">{t("fields.isFeatured")}</FieldLabel>
              <Switch
                id="service-featured"
                checked={formik.values.isFeatured}
                onCheckedChange={(checked) => formik.setFieldValue("isFeatured", checked)}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <FieldLabel htmlFor="service-active">{t("fields.isActive")}</FieldLabel>
              <Switch
                id="service-active"
                checked={formik.values.isActive}
                onCheckedChange={(checked) => formik.setFieldValue("isActive", checked)}
              />
            </div>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {service ? t("save") : t("create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
