// components/doctor/tabs/ReviewsTab.tsx
import React from "react";
import { CheckCircle, Star, ThumbsUp } from "lucide-react";
import { useParams } from "next/navigation";
import { usePublicDoctorById } from "@/hooks/public/usePublicDoctor";
import NumberFlow from "@number-flow/react";
import { usePublicReview } from "@/hooks/public/usePublicReview";
import { ReviewResponse } from "@/interface/response";
import Image from "next/image";
import { formatDate, getImageUrl } from "@/lib/utils";
import { REVIEW_STATUS } from "@/common";

interface ReviewsTabProps {}

const ReviewsTab: React.FC<ReviewsTabProps> = ({}) => {
  const { doctorProfileId } = useParams<{ doctorProfileId: string }>();
  const reviewsResponse = usePublicReview({
    doctorProfileId,
  });

  const reviews = reviewsResponse?.data?.body?.data ?? [];

  const [showAll, setShowAll] = React.useState(false);

  const onToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Rating Overview */}
      <RatingOverview />

      {/* Reviews List */}
      <div className="space-y-6">
        {(showAll ? reviews : reviews?.slice(0, 3)).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Show All Button */}
      {!showAll && reviews.length > 3 && (
        <button
          onClick={onToggleShowAll}
          className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition"
        >
          Xem tất cả {reviews.length} đánh giá
        </button>
      )}
    </div>
  );
};
export default ReviewsTab;

interface ReviewsTabProps {}

const RatingOverview: React.FC<Partial<ReviewsTabProps>> = ({}) => {
  const { doctorProfileId } = useParams<{ doctorProfileId: string }>();

  const { data } = usePublicDoctorById(doctorProfileId);

  const doctorData = data?.body;

  const rating = doctorData?.averageRating;

  const totalReviews = doctorData?.totalReviews;

  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">
            <NumberFlow
              value={rating ?? 0}
              format={{
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
            />
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-gray-600">Dựa trên {totalReviews} đánh giá</div>
        </div>
      </div>
    </div>
  );
};

const ReviewCard: React.FC<{ review: ReviewResponse }> = ({ review }) => {
  return (
    <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-2xl object-cover shadow-2xl">
          <Image
            src={getImageUrl(review?.patientPathAvatar)}
            alt={review?.patientName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-bold text-gray-900 flex items-center gap-2">
                {review.patientName}
                {review?.status === REVIEW_STATUS.APPROVED && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
            </div>
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          {/*<div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">*/}
          {/*  {review.service}*/}
          {/*</div>*/}
          <p className="text-gray-700 mb-4">{review.content}</p>
          {/*<button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">*/}
          {/*  <ThumbsUp className="w-4 h-4" />*/}
          {/*  <span>Hữu ích ({review.helpful})</span>*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
};

// components/doctor/RatingStars.tsx
export const RatingStars: React.FC<{ rating: number; size?: "sm" | "md" | "lg" }> = ({
  rating,
  size = "md",
}) => {
  const sizeClass = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className={`${sizeClass} fill-yellow-400 text-yellow-400`} />;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <Star className={`${sizeClass} text-yellow-400`} />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className={`${sizeClass} fill-yellow-400 text-yellow-400`} />
              </div>
            </div>
          );
        } else {
          return <Star key={i} className={`${sizeClass} text-gray-300`} />;
        }
      })}
    </div>
  );
};
