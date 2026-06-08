"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";

interface SpecialtySearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SpecialtySearchBar({ value, onChange }: SpecialtySearchBarProps) {
  const t = useTranslations("specialties");

  return (
    <div className="relative w-full max-w-xl">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        placeholder={t("searchPlaceholder")}
        className="h-10 pl-9"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
