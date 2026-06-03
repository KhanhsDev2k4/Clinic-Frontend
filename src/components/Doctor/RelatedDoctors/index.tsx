import React from "react";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import { usePublicDoctorById, usePublicDoctorList } from "@/hooks/public/usePublicDoctor";
import { boolean } from "yup";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

interface RelatedDoctor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  fee: number;
}

interface RelatedDoctorsProps {}

const RelatedDoctors: React.FC<RelatedDoctorsProps> = ({}) => {
  const { doctorProfileId } = useParams<{ doctorProfileId: string }>();

  const { data } = usePublicDoctorById(doctorProfileId);

  const doctorData = data?.body;

  const specialtyId = doctorData?.specialty?.id;

  const doctorsResponse = usePublicDoctorList(
    {
      specialtyId,
      excludeIds: [doctorData?.id ?? ""],
    },
    Boolean(specialtyId && doctorData?.id)
  );

  const doctors = doctorsResponse?.data?.body?.data;

  const relatedDoctors: RelatedDoctor[] =
    doctors?.map((doc) => ({
      fee: doc.consultationFee,
      avatar: doc?.user?.pathAvatar,
      id: doc.id,
      name: doc.user?.fullName,
      rating: doc?.averageRating,
      specialty: doc?.specialty?.name,
    })) ?? [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Bác sĩ cùng chuyên khoa</h3>
      <div className="space-y-4">
        {relatedDoctors?.map((doc) => (
          <RelatedDoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};
export default RelatedDoctors;

const RelatedDoctorCard: React.FC<{ doctor: RelatedDoctor }> = ({ doctor }) => (
  <Link
    href={`/doctor/${doctor.id}`}
    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition"
  >
    <div className="relative w-16 h-16 rounded-2xl object-cover shadow-2xl">
      <Image
        src={getImageUrl(doctor?.avatar)}
        alt={doctor?.name ?? ""}
        fill
        className="object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="font-bold text-gray-900 mb-1">{doctor.name}</div>
      <div className="text-sm text-gray-600 mb-2">{doctor.specialty}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{doctor.rating}</span>
        </div>
        <span className="text-sm font-bold text-blue-600">{doctor.fee.toLocaleString()}đ</span>
      </div>
    </div>
  </Link>
);
