import FAQ from "@/components/Faq";
import { LanguageCode } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: LanguageCode }>;
};

export const dynamic = "force-static";
export const revalidate = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const Page = async ({ params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <FAQ />;
};

export default Page;
