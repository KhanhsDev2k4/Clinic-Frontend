import { GENDER, ROLE_NAME, USER_STATUS } from "@/common";

export type BaseFilter = {
  sortDir?: "asc" | "desc";
  sortBy?: string;
  page?: number;
  size?: number;
};

export type BaseEntityResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = BaseEntityResponse & {
  email: string;
  phone: string;
  fullName: string;
  role: ROLE_NAME;
  status: USER_STATUS;
  pathAvatar: string | null;
  dob: string;
  gender: GENDER;
};

export type SpecialtyResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
};

export type DoctorProfileResponse = {
  id: string;
  doctorCode: string;
  degree: string;
  experienceYears: number;
  consultationFee: number;
  averageRating: number;
  totalReviews: number;
  totalPatients: number;
  isFeatured: boolean;
  serviceCount: number;
  specialty: SpecialtyResponse;
  user: UserResponse;
};
