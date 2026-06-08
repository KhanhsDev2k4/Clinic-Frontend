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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SPECIALTY_TYPE } from "@/common";
import type { SpecialtyResponse } from "@/interface/response";

import {
  specialtyFormSchema,
  specialtyTypeOptions,
  toSpecialtyFormValues,
  toSpecialtyPayload,
  type SpecialtyFormValues,
} from "./config";

interface SpecialtyFormModalProps {
  open: boolean;
  specialty?: SpecialtyResponse | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Omit<SpecialtyResponse, "id">) => void;
}

export function SpecialtyFormModal({
  open,
  specialty,
  onOpenChange,
  onSubmit,
}: SpecialtyFormModalProps) {
  const t = useTranslations("admin.specialties");

  const formik = useFormik<SpecialtyFormValues>({
    enableReinitialize: true,
    initialValues: toSpecialtyFormValues(specialty),
    validationSchema: specialtyFormSchema,
    onSubmit: (values, formikHelpers) => {
      try {
        onSubmit(toSpecialtyPayload(values));
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
          <DialogTitle>{specialty ? t("editSpecialty") : t("createSpecialty")}</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="specialty-name">{t("fields.name")}</FieldLabel>
              <Input id="specialty-name" {...formik.getFieldProps("name")} />
              {formik.touched.name && formik.errors.name && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.name)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="specialty-slug">{t("fields.slug")}</FieldLabel>
              <Input id="specialty-slug" {...formik.getFieldProps("slug")} />
              {formik.touched.slug && formik.errors.slug && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.slug)}
                </FieldDescription>
              )}
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="specialty-description">{t("fields.description")}</FieldLabel>
              <Textarea
                id="specialty-description"
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
              <FieldLabel htmlFor="specialty-image">{t("fields.image")}</FieldLabel>
              <Input id="specialty-image" {...formik.getFieldProps("image")} />
              {formik.touched.image && formik.errors.image && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.image)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="specialty-type">{t("fields.specialtyType")}</FieldLabel>
              <Select
                value={formik.values.specialtyType}
                onValueChange={(value: SPECIALTY_TYPE) =>
                  formik.setFieldValue("specialtyType", value)
                }
              >
                <SelectTrigger id="specialty-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {specialtyTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t(`types.${type}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.specialtyType && formik.errors.specialtyType && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.specialtyType)}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="specialty-display-order">{t("fields.displayOrder")}</FieldLabel>
              <Input
                id="specialty-display-order"
                type="number"
                min={0}
                {...formik.getFieldProps("displayOrder")}
              />
              {formik.touched.displayOrder && formik.errors.displayOrder && (
                <FieldDescription className="text-red-500">
                  {errorMessage(formik.errors.displayOrder)}
                </FieldDescription>
              )}
            </Field>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <FieldLabel htmlFor="specialty-active">{t("fields.isActive")}</FieldLabel>
              <Switch
                id="specialty-active"
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
              {specialty ? t("save") : t("create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
