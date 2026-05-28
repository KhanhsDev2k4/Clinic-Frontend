// components/doctor/tabs/ReviewsTab.tsx
import React from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

interface Review {
  id: number;
  patientName: string;
  avatar: string;
  rating: number;
  date: string;
  verified: boolean;
  service: string;
  comment: string;
  helpful: number;
}

interface ReviewsTabProps {
  rating: number;
  totalReviews: number;
  reviews: Review[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({
  rating,
  totalReviews,
  reviews,
  showAll,
  onToggleShowAll,
}) => {
  return (
    <div className="p-8 space-y-6">
      {/* Rating Overview */}
      <RatingOverview rating={rating} totalReviews={totalReviews} />

      {/* Reviews List */}
      <div className="space-y-6">
        {(showAll ? reviews : reviews.slice(0, 3)).map(review => (
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
// Sub-components
const RatingOverview: React.FC<{ rating: number; totalReviews: number }> = ({ rating, totalReviews }) => {
  const ratingDistribution = [
    { stars: 5, percentage: 85 },
    { stars: 4, percentage: 12 },
    { stars: 3, percentage: 2 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-center">
          <div className="text-6xl font-bold text-gray-900 mb-2">{rating}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-gray-600">Dựa trên {totalReviews} đánh giá</div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-semibold">{stars}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition">
      <div className="flex items-start gap-4 mb-4">
        <img src={review.avatar} alt={review.patientName} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-bold text-gray-900 flex items-center gap-2">
                {review.patientName}
                {review.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
              </div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
            <div className="flex gap-1">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">
            {review.service}
          </div>
          <p className="text-gray-700 mb-4">{review.comment}</p>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
            <ThumbsUp className="w-4 h-4" />
            <span>Hữu ích ({review.helpful})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// components/doctor/RatingStars.tsx
export const RatingStars: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({
  rating,
  size = 'md',
}) => {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
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
