"use client";

import { useEffect, useRef, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import { Pencil, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { BLOOD_TYPE } from "@/common";
import { MedicalInfoFormValues, medicalInfoSchema } from "./config";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";
import { usePatientProfile } from "@/hooks/patient/usePatientProfile";

export function MedicalInfoForm() {
  const currentProfile = useCurrentProfile();

  const { updatePatientProfile, createPatientProfile } = usePatientProfile();

  const [isEditing, setIsEditing] = useState(false);
  const FIELD_TRANSITION = useRef("transition-all duration-200 ease-in-out");

  const initialValues = useRef<MedicalInfoFormValues>({
    bloodType: BLOOD_TYPE.O_POSITIVE,
    address: "",
    insuranceNumber: "",
    allergies: "",
    chronicDiseases: "",
  });

  const isUpdateMode = !!currentProfile.data?.body?.patient;

  useEffect(() => {
    setIsEditing(!isUpdateMode);
  }, [isUpdateMode]);

  useEffect(() => {
    if (currentProfile?.data?.body?.patient) {
      initialValues.current = {
        bloodType: currentProfile.data.body.patient.bloodType,
        address: currentProfile.data.body.patient.address,
        insuranceNumber: currentProfile.data.body.patient.insuranceNumber,
        allergies: currentProfile.data.body.patient.allergies,
        chronicDiseases: currentProfile.data.body.patient.chronicDiseases,
      };
      formik.setValues(initialValues.current);
    }
  }, [currentProfile?.data?.body?.patient]);

  const onSubmit = async (
    values: MedicalInfoFormValues,
    helpers: FormikHelpers<MedicalInfoFormValues>
  ) => {
    try {
      isUpdateMode ? await updatePatientProfile(values) : await createPatientProfile(values);
      setIsEditing(false);
      currentProfile.mutate();
    } catch (error) {
      console.error(error);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const formik = useFormik<MedicalInfoFormValues>({
    initialValues: initialValues.current,
    validationSchema: medicalInfoSchema,
    onSubmit,
  });

  const handleToggleEdit = () => {
    if (isEditing) formik.resetForm();
    setIsEditing((prev) => !prev);
  };

  const editableInputCn = cn(
    FIELD_TRANSITION,
    isEditing && "ring-2 ring-blue-400/50 border-blue-400 bg-blue-50/30 focus:ring-blue-500"
  );

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>
                {isEditing ? "Update your medical details" : "Fill in your medical details"}
              </CardDescription>
            </div>

            {/* ── Edit / Cancel toggle ── */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleToggleEdit}
              className={cn(
                "rounded-full transition-all duration-200",
                isEditing
                  ? "text-red-500 hover:text-red-600 hover:bg-red-50"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              aria-label={isEditing ? "Cancel editing" : "Edit medical info"}
            >
              {/* Icon cross-fade animation via opacity + scale */}
              <span
                className={cn(
                  "absolute transition-all duration-200",
                  isEditing ? "opacity-100 scale-100" : "opacity-0 scale-75"
                )}
              >
                <X className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  "transition-all duration-200",
                  isEditing ? "opacity-0 scale-75" : "opacity-100 scale-100"
                )}
              >
                <Pencil className="h-4 w-4" />
              </span>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Form wrapper — slide-down khi chuyển sang edit */}
          <div
            className={cn(FIELD_TRANSITION, isEditing ? "opacity-100 translate-y-0" : "opacity-90")}
          >
            <form onSubmit={formik.handleSubmit}>
              <FieldGroup>
                {/* Blood Type */}
                <Field>
                  <FieldLabel htmlFor="bloodType">Blood Type</FieldLabel>
                  <Select
                    value={formik.values.bloodType}
                    onValueChange={(v) => formik.setFieldValue("bloodType", v)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger id="bloodType" className={cn(editableInputCn, "w-full")}>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BLOOD_TYPE).map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formik.touched.bloodType && formik.errors.bloodType && (
                    <FieldDescription className="text-red-500">
                      {formik.errors.bloodType}
                    </FieldDescription>
                  )}
                </Field>

                {/* Address */}
                <Field>
                  <FieldLabel htmlFor="address">
                    Address{" "}
                    <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="address"
                    placeholder="123 Le Loi, Hoan Kiem, Hanoi"
                    disabled={!isEditing}
                    className={editableInputCn}
                    {...formik.getFieldProps("address")}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <FieldDescription className="text-red-500">
                      {formik.errors.address}
                    </FieldDescription>
                  )}
                </Field>

                {/* Insurance Number */}
                <Field>
                  <FieldLabel htmlFor="insuranceNumber">
                    Insurance Number{" "}
                    <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </FieldLabel>
                  <Input
                    id="insuranceNumber"
                    placeholder="HS4012345678"
                    disabled={!isEditing}
                    className={editableInputCn}
                    {...formik.getFieldProps("insuranceNumber")}
                  />
                  {formik.touched.insuranceNumber && formik.errors.insuranceNumber && (
                    <FieldDescription className="text-red-500">
                      {formik.errors.insuranceNumber}
                    </FieldDescription>
                  )}
                </Field>

                {/* Allergies */}
                <Field>
                  <FieldLabel htmlFor="allergies">
                    Allergies{" "}
                    <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </FieldLabel>
                  <Textarea
                    id="allergies"
                    placeholder="e.g. Penicillin, peanuts, latex..."
                    rows={3}
                    disabled={!isEditing}
                    className={editableInputCn}
                    {...formik.getFieldProps("allergies")}
                  />
                  {formik.touched.allergies && formik.errors.allergies && (
                    <FieldDescription className="text-red-500">
                      {formik.errors.allergies}
                    </FieldDescription>
                  )}
                </Field>

                {/* Chronic Diseases */}
                <Field>
                  <FieldLabel htmlFor="chronicDiseases">
                    Chronic Diseases{" "}
                    <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </FieldLabel>
                  <Textarea
                    id="chronicDiseases"
                    placeholder="e.g. Hypertension, Type 2 Diabetes..."
                    rows={3}
                    disabled={!isEditing}
                    className={editableInputCn}
                    {...formik.getFieldProps("chronicDiseases")}
                  />
                  {formik.touched.chronicDiseases && formik.errors.chronicDiseases && (
                    <FieldDescription className="text-red-500">
                      {formik.errors.chronicDiseases}
                    </FieldDescription>
                  )}
                </Field>

                {isEditing && (
                  <div className="flex justify-end mt-6">
                    <Button
                      type="submit"
                      disabled={formik.isSubmitting || !formik.dirty}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      {formik.isSubmitting ? "Saving…" : "Save changes"}
                    </Button>
                  </div>
                )}
              </FieldGroup>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
