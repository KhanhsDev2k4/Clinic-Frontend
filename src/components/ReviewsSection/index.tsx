"use client";

import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn, getImageUrl } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type MockReview = {
  id: string;
  patientName: string;
  patientAvatar: string | null;
  doctorName: string;
  specialtyName: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
};

const ReviewsSection = () => {
  const reviews = useRef<MockReview[]>([
    {
      id: "1",
      patientName: "Emily Carter",
      patientAvatar: null,
      doctorName: "Dr. James Mitchell",
      specialtyName: "Cardiology",
      rating: 5,
      title: "Incredibly attentive doctor",
      content:
        "Dr. Mitchell walked me through every step clearly — I felt completely at ease. The online booking system was seamless, no waiting in long queues.",
      createdAt: "2024-11-10",
    },
    {
      id: "2",
      patientName: "Michael Thompson",
      patientAvatar: null,
      doctorName: "Dr. Sarah Nguyen",
      specialtyName: "Pediatrics",
      rating: 5,
      title: "Wonderful experience for my child",
      content:
        "My son is usually terrified of doctors, but Dr. Nguyen was so gentle and patient. Online scheduling was fast, and SMS confirmation came instantly.",
      createdAt: "2024-11-15",
    },
    {
      id: "3",
      patientName: "Laura Bennett",
      patientAvatar: null,
      doctorName: "Dr. Kevin Hall",
      specialtyName: "Dermatology",
      rating: 4,
      title: "Great experience, will return",
      content:
        "Clean clinic, friendly staff. The doctor took his time consulting — never felt rushed. Waited a little, but it was absolutely worth it.",
      createdAt: "2024-11-20",
    },
    {
      id: "4",
      patientName: "David Wilson",
      patientAvatar: null,
      doctorName: "Dr. Amanda Lee",
      specialtyName: "General Internal Medicine",
      rating: 5,
      title: "Convenient app, excellent doctor",
      content:
        "First time using online booking and it was so easy. I picked my exact time slot, the doctor was punctual, and I even received an email summary after the visit.",
      createdAt: "2024-12-01",
    },
    {
      id: "5",
      patientName: "Rachel Adams",
      patientAvatar: null,
      doctorName: "Dr. Brian Foster",
      specialtyName: "Orthopedics",
      rating: 5,
      title: "Highly skilled, great bedside manner",
      content:
        "Dr. Foster has exceptional expertise and explained my condition in plain language. The 1-day appointment reminder was a lifesaver — I never miss a visit now.",
      createdAt: "2024-12-05",
    },
  ]);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const avgRating = (
    reviews.current.reduce((sum, r) => sum + r.rating, 0) / reviews.current.length
  ).toFixed(1);

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
            {reviews.current.map((review) => (
              <CarouselItem key={review.id} className="pl-3 basis-full sm:basis-1/2 md:basis-1/3">
                <Card className="h-full border border-gray-100 hover:border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl">
                  <CardContent className="p-5 flex flex-col gap-4 h-full">
                    <Quote className="w-6 h-6 text-blue-200 fill-blue-100" />

                    <div className="flex flex-col gap-1">
                      <StarRating rating={review.rating} />
                      <p className="font-semibold text-gray-900 text-sm">{review.title}</p>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 flex-1">
                      {review.content}
                    </p>

                    <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                      <Avatar className="w-9 h-9">
                        <AvatarImage
                          src={review.patientAvatar ? getImageUrl(review.patientAvatar) : undefined}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-400 to-teal-400 text-white text-xs font-semibold">
                          {review.patientName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-800">
                          {review.patientName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {review.specialtyName} · {review.doctorName}
                        </span>
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
