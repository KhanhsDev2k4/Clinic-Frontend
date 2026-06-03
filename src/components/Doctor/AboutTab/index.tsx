import React from "react";
import { Award, FileText, Languages } from "lucide-react";
import { usePublicDoctorById } from "@/hooks/public/usePublicDoctor";
import { useParams } from "next/navigation";
import { languages } from "@/i18n/config";

interface AboutTabProps {}

const AboutTab: React.FC<AboutTabProps> = ({}) => {
  const { doctorProfileId } = useParams<{ doctorProfileId: string }>();
  const { data } = usePublicDoctorById(doctorProfileId);
  const doctorData = data?.body;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Về bác sĩ {doctorData?.user?.fullName}
        </h3>
        <p className="text-gray-700 leading-relaxed">{doctorData?.bio}</p>
      </div>

      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Ngôn ngữ</h4>
        <div className="flex gap-3">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full"
            >
              <Languages className="w-5 h-5" />
              <span className="font-semibold">{lang.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutTab;
