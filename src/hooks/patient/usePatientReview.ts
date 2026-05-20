import { useSession } from "@/hooks/useSession";
import { useMutation, useSWRWrapper } from "@/hooks/swr";
import { ReviewResponse } from "@/interface/response";
import { METHOD } from "@/hooks/global";
import { ReviewFormValues } from "@/components/ReviewDialog/config";

export const usePatientReviewDetailByAptId = (aptId: string | null) => {
  const { accessToken } = useSession();
  return useSWRWrapper<ReviewResponse>(
    `/api/v1/patient/review/appointment/${aptId}?accessToken=${accessToken}`,
    {
      url: `/api/v1/patient/review/appointment/${aptId}`,
      method: METHOD.GET,
      enable: !!aptId,
    }
  );
};

export const usePatientReview = (reviewId?: string) => {
  const createMutation = useMutation<unknown>("/api/v1/patient/review", {
    url: "/api/v1/patient/review",
    method: METHOD.POST,
    notification: {
      message: "You have created your appointment successfully!",
      title: "Review Appointment",
    },
  });

  const updateMutation = useMutation<unknown>("/api/v1/patient/review", {
    url: `/api/v1/patient/review/${reviewId}`,
    method: METHOD.PATCH,
    notification: {
      message: "You have created your appointment successfully!",
      title: "Review Appointment",
    },
  });

  const createReview = (formValues: ReviewFormValues) => {
    return createMutation.trigger(formValues);
  };

  const updateReview = (formValues: ReviewFormValues) => {
    return updateMutation.trigger(formValues);
  };

  return {
    createReview,
    updateReview,
  };
};
