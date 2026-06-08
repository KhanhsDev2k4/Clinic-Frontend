import type { Metadata } from "next";

import Specialties from "@/components/Specialties";

export const metadata: Metadata = {
  title: "Specialties | MedCare",
  description: "Browse active medical specialties and find doctors by specialty.",
};

export default function Page() {
  return <Specialties />;
}
