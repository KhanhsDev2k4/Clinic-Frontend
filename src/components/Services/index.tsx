"use client";

import { useState } from "react";
import { CalendarCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { useMockPublicServices } from "@/hooks/public/useMockPublicServices";

import { ServiceCard } from "./ServiceCard";
import { ServiceSearchBar } from "./ServiceSearchBar";
import { ServicesEmptyState } from "./ServicesEmptyState";
import { ServicesSkeleton } from "./ServicesSkeleton";

export default function Services() {
  const t = useTranslations("services");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useMockPublicServices({ search });
  const services = data?.body.data ?? [];

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <Badge variant="outline" className="mb-4 border-blue-200 bg-blue-50 text-blue-700">
            <Sparkles className="size-3" />
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
            <div className="rounded-lg border bg-blue-50 p-4 text-blue-900">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <CalendarCheck className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{t("heroCalloutTitle")}</p>
                  <p className="text-xs text-blue-800">{t("heroCalloutDescription")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{t("allServices")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("resultCount", { count: services.length })}
            </p>
          </div>
          <ServiceSearchBar value={search} onChange={setSearch} />
        </div>

        {isLoading ? (
          <ServicesSkeleton />
        ) : services.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <ServicesEmptyState />
        )}
      </section>
    </main>
  );
}
