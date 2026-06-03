"use client";
import React from "react";
import {
  Baby,
  Bone,
  Brain,
  FlaskConical,
  Heart,
  HeartHandshake,
  Phone,
  Scissors,
  Sparkles,
  Stethoscope,
  Venus,
} from "lucide-react";
import { useParams } from "next/navigation";
import { usePublicSpecialtyById } from "@/hooks/public/usePublicSpecialty";
import { SPECIALTY_TYPE } from "@/common";
import { useClinicInformation } from "@/hooks/useClinicInformation";

const SPECIALTY_ICON_MAP: Record<SPECIALTY_TYPE, React.ReactNode> = {
  [SPECIALTY_TYPE.CARDIOLOGY]: <Heart className="w-20 h-20" />,
  [SPECIALTY_TYPE.GENERAL]: <Stethoscope className="w-20 h-20" />,
  [SPECIALTY_TYPE.SURGERY]: <Scissors className="w-20 h-20" />,
  [SPECIALTY_TYPE.PEDIATRICS]: <Baby className="w-20 h-20" />,
  [SPECIALTY_TYPE.DERMATOLOGY]: <Sparkles className="w-20 h-20" />,
  [SPECIALTY_TYPE.ORTHOPEDICS]: <Bone className="w-20 h-20" />,
  [SPECIALTY_TYPE.NEUROLOGY]: <Brain className="w-20 h-20" />,
  [SPECIALTY_TYPE.PSYCHIATRY]: <HeartHandshake className="w-20 h-20" />,
  [SPECIALTY_TYPE.GYNECOLOGY]: <Venus className="w-20 h-20" />,
  [SPECIALTY_TYPE.ENDOCRINOLOGY]: <FlaskConical className="w-20 h-20" />,
};

const BannerDetailsSpecialist = () => {
  const { specialtyId } = useParams<{ specialtyId: string }>();
  const { data } = usePublicSpecialtyById(specialtyId);
  const specialty = data?.body;

  const backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200&h=600&fit=crop')`;

  const icon = specialty?.specialtyType ? (
    SPECIALTY_ICON_MAP[specialty.specialtyType]
  ) : (
    <Heart className="w-[5rem] h-[5rem]" />
  );

  const clinicInformation = useClinicInformation();

  const clinic = clinicInformation?.data?.body?.clinic;
  const contact = clinicInformation?.data?.body?.contact;

  return (
    <section className="relative h-[500px] bg-cover bg-center" style={{ backgroundImage }}>
      <div className="max-w-[100rem] mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <div className="w-[10rem] h-[10rem] bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6">
            {icon}
          </div>

          <h1 className="text-5xl font-bold mb-4">{specialty?.name ?? "Chuyên Khoa"}</h1>

          <p className="text-xl mb-4">
            {specialty?.description ?? "Chăm sóc và điều trị toàn diện"}
          </p>

          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
              Đặt lịch khám ngay
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
              <Phone className="inline w-5 h-5 mr-2" />
              Tư vấn: {contact?.hotline}
            </button>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold">12+</div>
              <div className="text-blue-100">Bác sĩ chuyên khoa</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5,000+</div>
              <div className="text-blue-100">Ca khám thành công</div>
            </div>
            <div>
              <div className="text-3xl font-bold">4.9★</div>
              <div className="text-blue-100">Đánh giá trung bình</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerDetailsSpecialist;
