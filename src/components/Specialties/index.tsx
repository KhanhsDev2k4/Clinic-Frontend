"use client";

import { useState } from "react";
import { HeartPulse, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import {
  useMockPublicSpecialties,
  type PublicSpecialtyTypeFilter,
} from "@/hooks/public/useMockPublicSpecialties";

import { SpecialtiesEmptyState } from "./SpecialtiesEmptyState";
import { SpecialtiesSkeleton } from "./SpecialtiesSkeleton";
import { SpecialtyCard } from "./SpecialtyCard";
import { SpecialtySearchBar } from "./SpecialtySearchBar";
import { SpecialtyTypeFilter } from "./SpecialtyTypeFilter";

export default function Specialties() {
  const t = useTranslations("specialties");
  const [search, setSearch] = useState("");
  const [specialtyType, setSpecialtyType] = useState<PublicSpecialtyTypeFilter>(FILTER_ALL_VALUE);
  const { data, isLoading } = useMockPublicSpecialties({ search, specialtyType });
  const specialties = data?.body.data ?? [];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
            <Stethoscope className="size-3" />
            {t("heroBadge")}
          </Badge>
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-normal text-gray-900 sm:text-4xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                {t("heroDescription")}
              </p>
            </div>
            <div className="rounded-lg border bg-teal-50 p-4 text-teal-950">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <HeartPulse className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t("heroCalloutTitle")}</p>
                  <p className="text-xs text-teal-800">{t("heroCalloutDescription")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t("allSpecialties")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("resultCount", { count: specialties.length })}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <SpecialtySearchBar value={search} onChange={setSearch} />
            <SpecialtyTypeFilter value={specialtyType} onChange={setSpecialtyType} />
          </div>
        </div>

        {isLoading ? (
          <SpecialtiesSkeleton />
        ) : specialties.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((specialty) => (
              <SpecialtyCard key={specialty.id} specialty={specialty} />
            ))}
          </div>
        ) : (
          <SpecialtiesEmptyState />
        )}
      </section>
    </main>
  );
}
