"use client";

import { useEffect, useMemo } from "react";
import { format } from "date-fns";
import { useFormik } from "formik";
import { useTranslations } from "next-intl";
import * as yup from "yup";

import { EXCEPTION_TYPE } from "@/common";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Textarea } from "@/components/ui/textarea";
import type { DoctorScheduleExceptionFormPayload } from "@/hooks/doctor/useDoctorScheduleExceptions";
import type { DoctorScheduleExceptionResponse } from "@/interface/response";

import { initialScheduleExceptionFormValues, type ScheduleExceptionFormValues } from "./config";
import { DatePicker } from "@/components/ui/date-picker";
import { formatDate, parseDate } from "@/lib/utils";

interface ScheduleExceptionFormModalProps {
  open: boolean;
  exception: DoctorScheduleExceptionResponse | null;
  existingExceptions: DoctorScheduleExceptionResponse[];
  onOpenChange: (open: boolean) => void;
  onCreate: (payload: DoctorScheduleExceptionFormPayload) => Promise<void>;
  onUpdate: (id: string, payload: DoctorScheduleExceptionFormPayload) => Promise<void>;
}

const isWeekendDate = (value: string) => {
  const day = new Date(`${value}T00:00:00`).getDay();
  return day === 0 || day === 6;
};

const suggestTypeFromDate = (value: string) =>
  value && isWeekendDate(value) ? EXCEPTION_TYPE.EXTRA : EXCEPTION_TYPE.LEAVE;

export function ScheduleExceptionFormModal({
  open,
  exception,
  existingExceptions,
  onOpenChange,
  onCreate,
  onUpdate,
}: ScheduleExceptionFormModalProps) {
  const t = useTranslations("doctorScheduleExceptions");
  const minDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  const schema = useMemo(
    () =>
      yup.object({
        exceptionDate: yup
          .string()
          .required(t("form.validation.dateRequired"))
          .test("not-past", t("form.validation.pastDate"), (value) => {
            if (!value) return false;
            return value >= minDate;
          })
          .test("unique", t("form.validation.duplicateDate"), (value) => {
            if (!value) return false;
            return !existingExceptions.some(
              (item) => item.id !== exception?.id && item.exceptionDate === value
            );
          }),
        type: yup
          .mixed<EXCEPTION_TYPE>()
          .oneOf(Object.values(EXCEPTION_TYPE))
          .required(t("form.validation.typeRequired"))
          .test("day-type", t("form.validation.dayType"), function (value) {
            const dateValue = this.parent.exceptionDate as string;
            if (!dateValue || !value) return true;
            const weekend = isWeekendDate(dateValue);
            return value === EXCEPTION_TYPE.EXTRA ? weekend : !weekend;
          }),
        reason: yup.string().trim().required(t("form.validation.reasonRequired")).max(240),
      }),
    [exception?.id, existingExceptions, minDate, t]
  );

  const formik = useFormik<ScheduleExceptionFormValues>({
    initialValues: initialScheduleExceptionFormValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values, formikHelpers) => {
      const payload = {
        exceptionDate: values.exceptionDate,
        type: values.type,
        reason: values.reason.trim(),
      };

      try {
        if (exception) {
          await onUpdate(exception.id, payload);
        } else {
          await onCreate(payload);
        }
        onOpenChange(false);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (!open) return;

    if (exception) {
      formik.setValues({
        exceptionDate: exception.exceptionDate,
        type: exception.type,
        reason: exception.reason,
      });
      return;
    }

    formik.setValues(initialScheduleExceptionFormValues);
  }, [exception, open]);

  const handleDateChange = async (value: string) => {
    await formik.setFieldValue("exceptionDate", value);
    await formik.setFieldValue("type", suggestTypeFromDate(value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{exception ? t("form.editTitle") : t("form.createTitle")}</DialogTitle>
          <DialogDescription>{t("form.description")}</DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="exceptionDate">{t("form.fields.exceptionDate")}</FieldLabel>
              <DatePicker
                value={
                  formik.values.exceptionDate
                    ? new Date(parseDate(formik.values.exceptionDate, "MMM dd, yyyy")!.getTime())
                    : undefined
                }
                onChange={(date) => {
                  handleDateChange(formatDate(date));
                }}
                disabled={(date) => {
                  if (date < new Date(minDate)) return true;
                  const day = date.getDay();
                  if (formik.values.type === EXCEPTION_TYPE.LEAVE) {
                    return day === 0 || day === 6;
                  }
                  if (formik.values.type === EXCEPTION_TYPE.EXTRA) {
                    return day !== 0 && day !== 6;
                  }
                  return false;
                }}
              />
              {formik.touched.exceptionDate && formik.errors.exceptionDate && (
                <FieldDescription className="text-red-500">
                  {formik.errors.exceptionDate}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel>{t("form.fields.type")}</FieldLabel>
              <Select
                value={formik.values.type}
                onValueChange={(value: EXCEPTION_TYPE) => formik.setFieldValue("type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("form.fields.type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={EXCEPTION_TYPE.LEAVE}>{t("types.leave")}</SelectItem>
                  <SelectItem value={EXCEPTION_TYPE.EXTRA}>{t("types.extra")}</SelectItem>
                </SelectContent>
              </Select>
              <FieldDescription>{t("form.typeHint")}</FieldDescription>
              {formik.touched.type && formik.errors.type && (
                <FieldDescription className="text-red-500">{formik.errors.type}</FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="reason">{t("form.fields.reason")}</FieldLabel>
              <Textarea
                id="reason"
                rows={4}
                placeholder={t("form.placeholders.reason")}
                {...formik.getFieldProps("reason")}
              />
              {formik.touched.reason && formik.errors.reason && (
                <FieldDescription className="text-red-500">{formik.errors.reason}</FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("actions.cancel")}
            </Button>
            <Button type="submit" disabled={formik.isSubmitting}>
              {exception ? t("actions.save") : t("actions.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
