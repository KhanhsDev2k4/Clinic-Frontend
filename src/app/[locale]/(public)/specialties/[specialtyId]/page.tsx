import React from "react";

import SpecialistDetails from "@/components/SpecialistDetails";

interface Props {
  params: Promise<{ specialtyId: string }>;
}

const DetailSpecialtyPage = async ({ params }: Props) => {
  const { specialtyId } = await params;
  return <SpecialistDetails specialtyId={specialtyId} />;
};
export default DetailSpecialtyPage;
