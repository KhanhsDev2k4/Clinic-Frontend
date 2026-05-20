"use client";

import { useState } from "react";
import DoctorGrid from "@/components/Landing/DoctorGrid";
import { DoctorListFilter } from "@/components/Landing/DoctorListClient/config";
import DoctorFilterBar from "@/components/Landing/DoctorFilterBar";

const DoctorListClient = () => {
  const [filter, setFilter] = useState<DoctorListFilter>({});
  const [totalElements, setTotalElements] = useState<number>(0);

  const handleFilterChange = (patch: Partial<DoctorListFilter>) => {
    setFilter((prev) => ({ ...prev, ...patch }));
  };

  return (
    <>
      <DoctorFilterBar
        filter={filter}
        onChange={handleFilterChange}
        totalElements={totalElements}
      />

      <DoctorGrid filter={filter} onTotalChange={setTotalElements} />
    </>
  );
};

export default DoctorListClient;
