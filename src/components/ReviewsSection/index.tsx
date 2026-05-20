"use client";

import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn, getImageUrl, getInitials } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePublicReview } from "@/hooks/public/usePublicReview";
import { REVIEW_STATUS } from "@/common";
import { Separator } from "@/components/ui/separator";

const ReviewsSection = () => {
  const { data } = usePublicReview();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const reviews = data?.body?.data || [];
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50 mb-3">
            Patient Reviews
          </Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">What our patients are saying</h2>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-3 basis-full sm:basis-1/2 md:basis-1/3">
                <Card className="h-full border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
                  <CardContent className="p-5 flex flex-col gap-4 h-full">
                    {/* Rating + Status */}
                    <div className="flex items-start justify-between gap-2">
                      <StarRating rating={review.rating} />
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs shrink-0",
                          review.status === REVIEW_STATUS.APPROVED &&
                            "border-green-200 bg-green-50 text-green-700",
                          review.status === REVIEW_STATUS.PENDING &&
                            "border-yellow-200 bg-yellow-50 text-yellow-700",
                          review.status === REVIEW_STATUS.REJECTED &&
                            "border-red-200 bg-red-50 text-red-700"
                        )}
                      >
                        {review.status}
                      </Badge>
                    </div>

                    {/* Title */}
                    <p className="font-semibold text-gray-900 text-sm leading-snug">
                      {review.title}
                    </p>

                    {/* Content */}
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 flex-1">
                      {review.content}
                    </p>

                    <Separator />

                    {/* Patient info */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 shrink-0">
                        <AvatarImage
                          src={
                            review.patientPathAvatar
                              ? getImageUrl(review.patientPathAvatar)
                              : undefined
                          }
                          alt={review.patientPathAvatar}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-semibold">
                          {getInitials(review.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-gray-800 truncate">
                          {review.patientName}
                        </span>
                        <span className="text-xs text-gray-400">{review.patientName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === current ? "w-6 bg-yellow-400" : "w-1.5 bg-gray-200 hover:bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-3.5 h-3.5",
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
        )}
      />
    ))}
  </div>
);

export default ReviewsSection;
