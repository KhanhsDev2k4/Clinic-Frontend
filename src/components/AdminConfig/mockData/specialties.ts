"use client";

import type { SpecialtyResponse } from "@/interface/response";
import { SPECIALTY_TYPE } from "@/common";

export const mockSpecialties: SpecialtyResponse[] = [
  {
    id: "1",
    name: "Cardiology",
    slug: "cardiology",
    description: "Diagnosis and treatment of heart and blood vessel disorders",
    image: "",
    displayOrder: 1,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "2",
    name: "Neurology",
    slug: "neurology",
    description: "Care for disorders of the nervous system including brain and spine",
    image: "",
    displayOrder: 2,
    specialtyType: SPECIALTY_TYPE.NEUROLOGY,
    isActive: true,
  },
  {
    id: "3",
    name: "Pediatrics",
    slug: "pediatrics",
    description: "Medical care for infants, children, and adolescents",
    image: "",
    displayOrder: 3,
    specialtyType: SPECIALTY_TYPE.PEDIATRICS,
    isActive: true,
  },
  {
    id: "4",
    name: "Dermatology",
    slug: "dermatology",
    description: "Diagnosis and treatment of skin, hair, and nail conditions",
    image: "",
    displayOrder: 4,
    specialtyType: SPECIALTY_TYPE.DERMATOLOGY,
    isActive: true,
  },
  {
    id: "5",
    name: "Orthopedics",
    slug: "orthopedics",
    description: "Treatment of musculoskeletal system including bones and joints",
    image: "",
    displayOrder: 5,
    specialtyType: SPECIALTY_TYPE.ORTHOPEDICS,
    isActive: false,
  },
];
