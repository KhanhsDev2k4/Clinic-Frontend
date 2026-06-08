import { SpecialtyOverviewContent, SpecialtyResponse, ViLaoResponse } from "@/interface/response";
import { getLocale } from "next-intl/server";
import { LanguageCode } from "@/i18n/config";
import Overview from "@/components/SpecialistDetails/Overview";
import {
  fetchSpecialtyById,
  fetchSpecialtyIntro,
} from "@/components/SpecialistDetails/SpecialtyIntroSection/config";

interface Props {
  specialtyId: string;
}

export default async function SpecialtyIntroSection({ specialtyId }: Props) {
  const locale = (await getLocale()) as LanguageCode;
  const specialty = await fetchSpecialtyById(specialtyId);
  if (!specialty) {
    return "Specialty not found";
  }
  let content: SpecialtyOverviewContent = {
    intro: "",
    treatments: [],
    symptoms: [],
    riskFactors: [],
  };

  try {
    content = await fetchSpecialtyIntro(specialty?.specialtyType, locale);
    console.log("Got specialty information", content);
  } catch (err) {
    console.error("[SpecialtyIntroSection] fetch failed:", err);
  }

  console.log("SpecialtyIntroSection", content);

  return <Overview content={content} locale={locale} />;
}
