"use client";

import Image from "next/image";
import { ArrowRight, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getImageUrl } from "@/lib/utils";
import type { SpecialtyResponse } from "@/interface/response";

interface SpecialtyCardProps {
  specialty: SpecialtyResponse;
}

export function SpecialtyCard({ specialty }: SpecialtyCardProps) {
  const t = useTranslations("specialties");

  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        <Image
          src={getImageUrl(specialty.image)}
          alt={specialty.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <Badge className="absolute left-3 top-3 gap-1 bg-blue-600 text-white hover:bg-blue-600">
          <Stethoscope className="size-3" />
          {t(`types.${specialty.specialtyType}`)}
        </Badge>
      </div>

      <div className="flex min-h-56 flex-col p-4">
        <h2 className="text-lg font-semibold text-gray-900">{specialty.name}</h2>
        <p className="mt-2 line-clamp-4 text-sm leading-6 text-muted-foreground">
          {specialty.description}
        </p>

        <div className="mt-auto pt-5">
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href={`/doctors?specialtyId=${specialty.id}`}>
              {t("viewDoctors")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
