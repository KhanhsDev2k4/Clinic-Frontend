import React from "react";
import {
  Star,
  Award,
  Users,
  Video,
  Share2,
  Calendar,
  Bookmark,
  BadgeCheck,
  Stethoscope,
  MessageCircle,
  BookmarkCheck,
} from "lucide-react";

import StatCard from "../StatCard";
import ActionButton from "../ActionButton";
import { DoctorProfileResponse } from "@/interface/response";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import { usePublicDoctorById } from "@/hooks/public/usePublicDoctor";

interface DoctorHeroProps {
  onBookAppointment: () => void;
  onMessage: () => void;
}

const DoctorHeroSection: React.FC<DoctorHeroProps> = ({ onBookAppointment, onMessage }) => {
  const { doctorProfileId } = useParams<{ doctorProfileId: string }>();

  const { data } = usePublicDoctorById(doctorProfileId);

  const doctorData = data?.body;

  return (
    <section className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-12">
      <div className="max-w-400 mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="relative w-48 h-48 rounded-2xl object-cover shadow-2xl">
              <Image
                src={getImageUrl(doctorData?.user?.pathAvatar)}
                alt={doctorData?.user?.fullName ?? ""}
                fill
                className="object-cover"
              />
            </div>
            {doctorData?.availableToday && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Có lịch hôm nay
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold">
                    {doctorData?.degree}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-2">{doctorData?.user?.fullName}</h1>
                <div className="flex items-center gap-4 text-blue-100 mb-4">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    <span className="text-lg font-semibold">{doctorData?.specialty?.name}</span>
                  </div>
                  {/*{doctor.subSpecialty && (*/}
                  {/*  <>*/}
                  {/*    <div className="w-1 h-1 bg-blue-100 rounded-full" />*/}
                  {/*    <span>{doctor.subSpecialty}</span>*/}
                  {/*  </>*/}
                  {/*)}*/}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <StatCard
                icon={<Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                value={doctorData?.averageRating!}
                format={{ notation: "standard", maximumFractionDigits: 1 }}
                label={`${doctorData?.totalReviews} đánh giá`}
              />
              <StatCard
                icon={<Users className="w-5 h-5" />}
                value={doctorData?.totalPatients!}
                format={{ notation: "compact" }}
                label="Bệnh nhân"
              />
              <StatCard
                icon={<Award className="w-5 h-5" />}
                value={doctorData?.experienceYears!}
                label="Năm kinh nghiệm"
              />
            </div>

            {/* Quick actions */}
            <div className="flex flex-wrap gap-3">
              <ActionButton
                onClick={onBookAppointment}
                icon={<Calendar className="w-5 h-5" />}
                variant="primary"
              >
                Đặt lịch khám
              </ActionButton>

              <ActionButton onClick={onMessage} icon={<MessageCircle className="w-5 h-5" />}>
                Nhắn tin
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DoctorHeroSection;
