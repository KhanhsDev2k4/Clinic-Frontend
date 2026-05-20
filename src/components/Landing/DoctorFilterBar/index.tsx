"use client";

import { useRef } from "react";
import { Banknote, Search, SlidersHorizontal, Stethoscope, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicSpecialtyList } from "@/hooks/public/usePublicSpecialty";
import { cn } from "@/lib/utils";
import { FILTER_ALL_VALUE } from "@/hooks/global";
import { DoctorListFilter } from "@/components/Landing/DoctorListClient/config";

const SORT_OPTIONS = [
  { label: "Most Reviewed", value: "totalReviews:desc" },
  { label: "Highest Rated", value: "averageRating:desc" },
  { label: "Most Experienced", value: "experienceYears:desc" },
  { label: "Lowest Fee", value: "consultationFee:asc" },
  { label: "Highest Fee", value: "consultationFee:desc" },
];

const FEE_RANGES = [
  { label: "Under 200K", value: "0:200000" },
  { label: "200K – 500K", value: "200000:500000" },
  { label: "500K – 1M", value: "500000:1000000" },
  { label: "Over 1M", value: "1000000:" },
];

interface DoctorFilterBarProps {
  filter: DoctorListFilter;
  onChange: (patch: Partial<DoctorListFilter>) => void;
  totalElements: number;
}

const SPECIALTY_ALL = FILTER_ALL_VALUE;
const FEE_ALL = FILTER_ALL_VALUE;
const SORT_ALL = FILTER_ALL_VALUE;

const DoctorFilterBar = ({ filter, onChange, totalElements }: DoctorFilterBarProps) => {
  const { data: specialtyData, isLoading: specialtyLoading } = usePublicSpecialtyList({
    isActive: true,
  });
  const specialties = specialtyData?.body?.data ?? [];

  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      onChange({ keyword: value || undefined });
    }, 400);
  };

  const handleSortChange = (value: string) => {
    if (value === SORT_ALL) {
      onChange({ sortBy: undefined, sortDir: undefined });
      return;
    }
    const [sortBy, sortDir] = value.split(":") as [string, "asc" | "desc"];
    onChange({ sortBy, sortDir });
  };

  const handleSpecialtyChange = (value: string) => {
    onChange({ specialtyId: value === SPECIALTY_ALL ? undefined : value });
  };

  const handleFeeChange = (value: string) => {
    if (value === FEE_ALL) {
      onChange({ minFee: undefined, maxFee: undefined });
      return;
    }
    const [minStr, maxStr] = value.split(":");
    const min = Number(minStr);
    const max = maxStr ? Number(maxStr) : undefined;
    // toggle off if same
    if (filter.minFee === min && filter.maxFee === max) {
      onChange({ minFee: undefined, maxFee: undefined });
    } else {
      onChange({ minFee: min, maxFee: max });
    }
  };

  const activeSort =
    filter.sortBy && filter.sortDir ? `${filter.sortBy}:${filter.sortDir}` : SORT_ALL;

  const activeFee =
    filter.minFee !== undefined ? `${filter.minFee}:${filter.maxFee ?? ""}` : FEE_ALL;

  const activeSpecialty = filter.specialtyId ?? SPECIALTY_ALL;

  const hasActiveFilters =
    filter.keyword ||
    filter.specialtyId ||
    filter.minFee !== undefined ||
    filter.maxFee !== undefined ||
    filter.minRating !== undefined ||
    filter.sortBy;

  const handleClearAll = () => {
    onChange({
      keyword: undefined,
      specialtyId: undefined,
      minFee: undefined,
      maxFee: undefined,
      minRating: undefined,
      sortBy: undefined,
      sortDir: undefined,
    });
  };

  return (
    <div className="space-y-3 mb-8">
      {/* Row 1: Search + Clear */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search by doctor name..."
            defaultValue={filter.keyword ?? ""}
            onChange={handleSearchChange}
            className="pl-9 rounded-xl border-gray-200 bg-white h-10"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 shrink-0"
            onClick={handleClearAll}
          >
            <X className="w-3.5 h-3.5 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Row 2: 4 Select filters */}
      <div className="flex flex-wrap gap-2">
        {/* Specialty */}
        {specialtyLoading ? (
          <Skeleton className="h-10 w-44 rounded-xl" />
        ) : (
          <Select value={activeSpecialty} onValueChange={handleSpecialtyChange}>
            <SelectTrigger
              className={cn(
                "w-44 rounded-xl border-gray-200 h-10 text-sm gap-1.5",
                activeSpecialty !== SPECIALTY_ALL && "border-blue-400 bg-blue-50 text-blue-700"
              )}
            >
              <Stethoscope className="w-3.5 h-3.5 shrink-0 text-gray-400" />
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent className="max-h-12">
              <SelectItem value={SPECIALTY_ALL} className="text-sm text-gray-500">
                All Specialties
              </SelectItem>
              {specialties.map((sp) => (
                <SelectItem key={sp.id} value={sp.id} className="text-sm">
                  {sp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Fee range */}
        <Select value={activeFee} onValueChange={handleFeeChange}>
          <SelectTrigger
            className={cn(
              "w-40 rounded-xl border-gray-200 h-10 text-sm gap-1.5",
              activeFee !== FEE_ALL && "border-teal-400 bg-teal-50 text-teal-700"
            )}
          >
            <Banknote className="w-3.5 h-3.5 shrink-0 text-gray-400" />
            <SelectValue placeholder="Fee range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={FEE_ALL} className="text-sm text-gray-500">
              Any Fee
            </SelectItem>
            {FEE_RANGES.map((r) => (
              <SelectItem key={r.value} value={r.value} className="text-sm">
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={activeSort} onValueChange={handleSortChange}>
          <SelectTrigger
            className={cn(
              "w-44 rounded-xl border-gray-200 h-10 text-sm gap-1.5",
              activeSort !== SORT_ALL && "border-gray-400 bg-gray-100 text-gray-700"
            )}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0 text-gray-400" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SORT_ALL} className="text-sm text-gray-500">
              Default Order
            </SelectItem>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-sm">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      {totalElements > 0 && (
        <p className="text-xs text-gray-400">
          Showing <span className="font-medium text-gray-600">{totalElements}</span> doctor
          {totalElements !== 1 ? "s" : ""}
          {hasActiveFilters && " matching your filters"}
        </p>
      )}
    </div>
  );
};

export default DoctorFilterBar;
