import Image from "next/image";
import { getLocale } from "next-intl/server";
import { CheckCircle, Star, ThumbsUp } from "lucide-react";
import { getImageUrl } from "@/lib/utils";
import type { LanguageCode } from "@/i18n/config";
import type { SpecialtyReviewsContent } from "@/interface/response";
import { fetchSpecialtyById } from "@/components/SpecialistDetails/SpecialtyIntroSection/config";
import { fetchSpecialtyReviews } from "@/components/SpecialistDetails/Reviews/config";

interface Props {
  specialtyId: string;
}

type SupportedLocale = "en" | "vi";

const LABELS: Record<SupportedLocale, Record<string, string>> = {
  vi: {
    title: "Benh nhan noi gi ve chung toi",
    reviews: "danh gia",
    doctor: "Bac si",
    service: "Dich vu",
    helpful: "Huu ich",
    empty: "Chua co danh gia nao cho chuyen khoa nay.",
  },
  en: {
    title: "What patients say about us",
    reviews: "reviews",
    doctor: "Doctor",
    service: "Service",
    helpful: "Helpful",
    empty: "No reviews are available for this specialty yet.",
  },
};

const DEFAULT_CONTENT: SpecialtyReviewsContent = {
  averageRating: 0,
  totalReviews: 0,
  reviews: [],
};

const Reviews = async ({ specialtyId }: Props) => {
  const currentLocale = (await getLocale()) as LanguageCode;
  const locale: SupportedLocale = currentLocale === "vi" ? "vi" : "en";
  const labels = LABELS[locale];
  const specialty = await fetchSpecialtyById(specialtyId);
  if (!specialty) {
    return null;
  }

  let content = DEFAULT_CONTENT;

  try {
    content = await fetchSpecialtyReviews(specialty.specialtyType, locale);
    console.log("Got specialty reviews", content);
  } catch (err) {
    console.error("[Reviews] fetch failed:", err);
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{labels.title}</h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((item) => (
                <Star key={item} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold">{content.averageRating.toFixed(1)}</span>
            <span className="text-gray-600">
              ({content.totalReviews.toLocaleString(locale)} {labels.reviews})
            </span>
          </div>
        </div>

        {content.reviews.length === 0 ? (
          <p className="text-center text-gray-600">{labels.empty}</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {content.reviews.map((review) => (
              <div
                key={`${review.name}-${review.date}`}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={getImageUrl(null)}
                    alt={review.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      {review.name}
                      {review.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, item) => (
                    <Star key={item} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-4 italic">&quot;{review.comment}&quot;</p>

                <div className="text-sm text-gray-600 mb-3">
                  <div className="font-semibold">
                    {labels.doctor}: {review.doctor}
                  </div>
                  <div>
                    {labels.service}: {review.service}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    {labels.helpful} ({review.helpful})
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
