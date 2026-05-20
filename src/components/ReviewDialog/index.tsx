"use client";

import { useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { BadgeCheck, Loader2 } from "lucide-react";
import { ReviewFormValues, reviewInitialValues, reviewSchema } from "./config";
import { StarRating } from "@/components/ReviewDialog/StarRating";
import { usePatientReview, usePatientReviewDetailByAptId } from "@/hooks/patient/usePatientReview";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";
import { usePatientAppointmentDetail } from "@/hooks/patient/usePatientAppointment";
import _ from "lodash";

interface ReviewDialogProps {
  appointmentId: string;
  onClose: () => void;
}

export function ReviewDialog({ appointmentId, onClose }: ReviewDialogProps) {
  const { data, isLoading } = usePatientReviewDetailByAptId(appointmentId);

  const appointmentDetail = usePatientAppointmentDetail(appointmentId);

  const currentProfile = useCurrentProfile();

  const review = data?.body;

  const { updateReview, createReview } = usePatientReview(review?.id);

  const isUpdateMode = Boolean(appointmentDetail?.data?.body?.reviewed);

  const onSubmit = async (values: ReviewFormValues, helpers: FormikHelpers<ReviewFormValues>) => {
    try {
      const createPayload = _.merge(
        {},
        {
          patientProfileId: currentProfile.data?.body?.patient?.id,
          doctorProfileId: appointmentDetail.data?.body?.doctorProfileId,
          appointmentId: appointmentId,
        },
        values
      );

      isUpdateMode ? await updateReview(values) : await createReview(createPayload);
      onClose();
    } catch {
      // error handled by isError from hook
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const formik = useFormik<ReviewFormValues>({
    initialValues: reviewInitialValues,
    validationSchema: reviewSchema,
    enableReinitialize: true,
    onSubmit,
  });

  // Prefill when existing review loads
  useEffect(() => {
    if (!review) return;
    formik.resetForm({
      values: {
        rating: review.rating,
        title: review.title ?? "",
        content: review.content ?? "",
      },
    });
  }, [review]);

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-10 gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading review...</span>
        </div>
      );
    }

    return (
      <form id="review-form" onSubmit={formik.handleSubmit}>
        <FieldGroup className="gap-5">
          <Field>
            <FieldLabel>Rating</FieldLabel>
            <StarRating
              value={formik.values.rating}
              onChange={(val) => {
                formik.setFieldValue("rating", val);
              }}
              disabled={formik.isSubmitting}
            />
            {formik.touched.rating && formik.errors.rating && (
              <FieldDescription className="text-red-500">{formik.errors.rating}</FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="review-title">Title</FieldLabel>
            <Input
              id="review-title"
              placeholder="Summarise your experience"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("title")}
            />
            {formik.touched.title && formik.errors.title && (
              <FieldDescription className="text-red-500">{formik.errors.title}</FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="review-content">Review</FieldLabel>
            <Textarea
              id="review-content"
              placeholder="Share your experience with this appointment..."
              rows={4}
              className="resize-none"
              disabled={formik.isSubmitting}
              {...formik.getFieldProps("content")}
            />
            {formik.touched.content && formik.errors.content && (
              <FieldDescription className="text-red-500">{formik.errors.content}</FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </form>
    );
  };

  return (
    <AlertDialogContent className="max-w-md">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          {isUpdateMode ? (
            <>
              <BadgeCheck className="h-5 w-5 text-emerald-500" />
              Edit your review
            </>
          ) : (
            "Leave a review"
          )}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {isUpdateMode
            ? "You've already reviewed this appointment. Update your feedback below."
            : "Share your experience with "}
          {!isUpdateMode && (
            <span className="font-medium text-foreground">
              {appointmentDetail.data?.body?.doctorName ?? review?.doctorName}
            </span>
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <div className="py-2">{renderBody()}</div>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose} disabled={formik.isSubmitting}>
          Cancel
        </AlertDialogCancel>
        <Button type="submit" form="review-form" disabled={formik.isSubmitting || isLoading}>
          {formik.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isUpdateMode ? "Saving..." : "Submitting..."}
            </>
          ) : isUpdateMode ? (
            "Save changes"
          ) : (
            "Submit review"
          )}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
