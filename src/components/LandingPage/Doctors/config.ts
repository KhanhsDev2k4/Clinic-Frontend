export type DoctorListFilter = {
  keyword?: string;
  specialtyId?: string;
  minFee?: number;
  maxFee?: number;
  minRating?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
};
