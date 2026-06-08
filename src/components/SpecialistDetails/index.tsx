import { Suspense } from "react";
import FaQ from "./FaQ";
import CTA from "./CTA";
import Doctors from "./Doctors";
import Process from "./Process";
import Reviews from "./Reviews";
import Services from "./Services";
import Equipment from "./Equipment";
import Breadcrumb from "./Breadcrumb";
import RelatedSpecialties from "./Related";
import CommonDiseases from "./CommonDiseases";
import BannerDetailsSpecialist from "./Banner";
import SpecialtyIntroSection from "@/components/SpecialistDetails/SpecialtyIntroSection";

interface Props {
  specialtyId?: string;
}

function SpecialtyIntroSkeleton() {
  return (
    <section className="max-w-400 mx-auto px-4 py-10">
      <div className="h-7 w-56 animate-pulse rounded bg-gray-200" />
      <div className="mt-5 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-8/12 animate-pulse rounded bg-gray-200" />
      </div>
    </section>
  );
}

const SpecialistDetails = ({ specialtyId }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BannerDetailsSpecialist />
      <Breadcrumb />

      <Suspense fallback={<SpecialtyIntroSkeleton />}>
        <SpecialtyIntroSection specialtyId={specialtyId!} />
      </Suspense>

      <Doctors />
      <Services />
      <Equipment />
      <Process />
      <CommonDiseases />
      <FaQ />
      <Reviews />
      <RelatedSpecialties />
      <CTA />
    </div>
  );
};

export default SpecialistDetails;
