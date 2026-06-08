import { SPECIALTY_TYPE } from "@/common";
import type { SpecialtyResponse } from "@/interface/response";

export const mockSpecialties: SpecialtyResponse[] = [
  {
    id: "specialty-cardiology",
    name: "Cardiology",
    slug: "cardiology",
    description:
      "Diagnosis and treatment for heart rhythm issues, hypertension, chest pain, and long-term cardiovascular care.",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 1,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "specialty-pediatrics",
    name: "Pediatrics",
    slug: "pediatrics",
    description:
      "Primary care for infants, children, and adolescents, including growth monitoring and vaccination guidance.",
    image:
      "https://images.unsplash.com/photo-1581938917971-21e2b2f30647?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 2,
    specialtyType: SPECIALTY_TYPE.PEDIATRICS,
    isActive: true,
  },
  {
    id: "specialty-dermatology",
    name: "Dermatology",
    slug: "dermatology",
    description:
      "Care for skin, hair, and nail concerns, including acne, eczema, rashes, allergies, and lesion checks.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 3,
    specialtyType: SPECIALTY_TYPE.DERMATOLOGY,
    isActive: true,
  },
  {
    id: "specialty-neurology",
    name: "Neurology",
    slug: "neurology",
    description:
      "Evaluation and management of headaches, seizures, neuropathy, stroke recovery, and neurological symptoms.",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 4,
    specialtyType: SPECIALTY_TYPE.NEUROLOGY,
    isActive: true,
  },
  {
    id: "specialty-orthopedics",
    name: "Orthopedics",
    slug: "orthopedics",
    description:
      "Treatment for bone, joint, muscle, and ligament conditions, from sports injuries to chronic pain.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 5,
    specialtyType: SPECIALTY_TYPE.ORTHOPEDICS,
    isActive: true,
  },
  {
    id: "specialty-gynecology",
    name: "Gynecology",
    slug: "gynecology",
    description:
      "Women's health services including preventive exams, reproductive health counseling, and menstrual concerns.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 6,
    specialtyType: SPECIALTY_TYPE.GYNECOLOGY,
    isActive: true,
  },
  {
    id: "specialty-endocrinology",
    name: "Endocrinology",
    slug: "endocrinology",
    description:
      "Specialized care for diabetes, thyroid disorders, metabolic conditions, and hormone-related concerns.",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 7,
    specialtyType: SPECIALTY_TYPE.ENDOCRINOLOGY,
    isActive: false,
  },
  {
    id: "specialty-general-medicine",
    name: "General Medicine",
    slug: "general-medicine",
    description:
      "Comprehensive first-line care for common symptoms, preventive health, follow-ups, and referrals.",
    image:
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 8,
    specialtyType: SPECIALTY_TYPE.GENERAL,
    isActive: true,
  },
  {
    id: "specialty-psychiatry",
    name: "Psychiatry",
    slug: "psychiatry",
    description:
      "Mental health assessment and medication management for anxiety, depression, sleep, and mood disorders.",
    image:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 9,
    specialtyType: SPECIALTY_TYPE.PSYCHIATRY,
    isActive: false,
  },
  {
    id: "specialty-surgery",
    name: "Surgery",
    slug: "surgery",
    description:
      "Consultations for surgical evaluation, treatment planning, preoperative checks, and postoperative care.",
    image:
      "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&w=1200&q=80",
    displayOrder: 10,
    specialtyType: SPECIALTY_TYPE.SURGERY,
    isActive: true,
  },
];
