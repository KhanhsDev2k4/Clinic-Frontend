import React from "react";
import { Award, FileText, Languages } from "lucide-react";

interface AboutTabProps {
  treatmentApproach: string;
  languages: string[];
  awards: Array<{ year: number; title: string; org: string }>;
  publications: string[];
  doctorName: string;
}

const AboutTab: React.FC<AboutTabProps> = ({
  treatmentApproach,
  languages,
  awards,
  publications,
  doctorName,
}) => {
  const lastName = doctorName.split(" ").pop();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Về bác sĩ {lastName}</h3>
        <p className="text-gray-700 leading-relaxed">{treatmentApproach}</p>
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
              <span className="font-semibold">{lang}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Giải thưởng & Danh hiệu</h4>
        <div className="space-y-4">
          {awards.map((award, i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-yellow-50 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-sm text-yellow-600 font-semibold">{award.year}</div>
                <div className="font-bold text-gray-900">{award.title}</div>
                <div className="text-sm text-gray-600">{award.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Công trình nghiên cứu</h4>
        <div className="space-y-3">
          {publications.map((pub, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{pub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutTab;
