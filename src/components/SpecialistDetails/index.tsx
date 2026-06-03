import React from "react";
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
import { usePublicSpecialtyById } from "@/hooks/public/usePublicSpecialty";

interface Props {
  specialtyId?: string;
}

const SpecialistDetails = ({ specialtyId }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BannerDetailsSpecialist />
      <Breadcrumb />
      <SpecialtyIntroSection specialtyId={specialtyId!} />
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
