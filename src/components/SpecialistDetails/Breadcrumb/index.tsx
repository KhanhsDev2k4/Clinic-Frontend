"use client";
import { ChevronRight } from "lucide-react";
import { usePublicSpecialtyById } from "@/hooks/public/usePublicSpecialty";

interface Props {
  specialtyId: string;
}

const Breadcrumb = ({ specialtyId }: Props) => {
  const { data } = usePublicSpecialtyById(specialtyId);

  return (
    <div className="bg-white border-b">
      <div className="max-w-[100rem] mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">
            Trang chủ
          </a>
          <ChevronRight className="w-4 h-4" />
          <a href="/chuyen-khoa" className="hover:text-blue-600">
            Chuyên khoa
          </a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-semibold">{data?.body?.slug}</span>
        </div>
      </div>
    </div>
  );
};
export default Breadcrumb;
