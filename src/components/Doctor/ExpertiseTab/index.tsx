import React from 'react';
import { Info, BadgeCheck, CheckCircle } from 'lucide-react';

interface ExpertiseTabProps {
  expertise: string[];
  certificates: string[];
  doctorName: string;
}

const ExpertiseTab: React.FC<ExpertiseTabProps> = ({ expertise, certificates, doctorName }) => {
  const lastName = doctorName.split(' ').pop();

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Lĩnh vực chuyên môn</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {expertise.map((exp, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
            >
              <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900">{exp}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Chứng chỉ hành nghề</h3>
        <div className="space-y-3">
          {certificates.map((cert, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <BadgeCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Phương pháp điều trị</h4>
            <p className="text-gray-700">
              Bác sĩ {lastName} sử dụng phương pháp điều trị dựa trên bằng chứng khoa học, kết hợp với kinh
              nghiệm lâm sàng phong phú để đưa ra phác đồ điều trị tối ưu cho từng bệnh nhân.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExpertiseTab;
