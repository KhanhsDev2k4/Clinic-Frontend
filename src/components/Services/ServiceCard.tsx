"use client";

import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { formatVND, getImageUrl } from "@/lib/utils";
import type { ServiceResponse } from "@/interface/response";

interface ServiceCardProps {
  service: ServiceResponse;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations("services");
  const hasPromotion = service.promotionalPrice > 0;

  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={getImageUrl(service.image)}
          alt={service.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {service.isFeatured && (
          <Badge className="absolute left-3 top-3 gap-1 bg-amber-500 text-white hover:bg-amber-500">
            <Sparkles className="size-3" />
            {t("featured")}
          </Badge>
        )}
      </div>

      <div className="flex min-h-64 flex-col p-4">
        <h2 className="text-lg font-semibold text-gray-900">{service.name}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4 text-blue-600" />
          {t("durationValue", { count: service.duration })}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            {hasPromotion && (
              <div className="text-xs text-muted-foreground line-through">
                {formatVND(service.price)}
              </div>
            )}
            <div className="text-lg font-semibold text-blue-700">
              {formatVND(hasPromotion ? service.promotionalPrice : service.price)}
            </div>
          </div>

          <Button asChild size="sm">
            <Link href={`/appointments/book?serviceId=${service.id}`}>{t("bookNow")}</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
