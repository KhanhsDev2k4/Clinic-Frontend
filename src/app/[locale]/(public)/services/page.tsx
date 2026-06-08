import type { Metadata } from "next";

import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Services | MedCare",
  description: "Browse active medical services and book an appointment with MedCare.",
};

export default function Page() {
  return <Services />;
}
