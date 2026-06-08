"use client";

import { useTranslations } from "next-intl";

import { SPECIALTY_TYPE } from "@/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import type { PublicSpecialtyTypeFilter } from "@/hooks/public/useMockPublicSpecialties";

const specialtyTypes = Object.values(SPECIALTY_TYPE);

interface SpecialtyTypeFilterProps {
  value: PublicSpecialtyTypeFilter;
  onChange: (value: PublicSpecialtyTypeFilter) => void;
}

export function SpecialtyTypeFilter({ value, onChange }: SpecialtyTypeFilterProps) {
  const t = useTranslations("specialties");

  return (
    <Select
      value={value}
      onValueChange={(nextValue: PublicSpecialtyTypeFilter) => onChange(nextValue)}
    >
      <SelectTrigger className="h-10 w-full sm:w-[220px]">
        <SelectValue placeholder={t("typeFilterPlaceholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={FILTER_ALL_VALUE}>{t("allTypes")}</SelectItem>
        {specialtyTypes.map((type) => (
          <SelectItem key={type} value={type}>
            {t(`types.${type}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
