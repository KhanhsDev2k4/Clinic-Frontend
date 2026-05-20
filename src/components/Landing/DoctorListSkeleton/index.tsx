import { Skeleton } from "@/components/ui/skeleton";

interface DoctorListSkeletonProps {
  count?: number;
}

const DoctorListSkeleton = ({ count = 12 }: DoctorListSkeletonProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-gray-100">
          <Skeleton className="w-full h-52 rounded-xl" />
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-3 w-1/2 rounded" />
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-8 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
};

export default DoctorListSkeleton;
