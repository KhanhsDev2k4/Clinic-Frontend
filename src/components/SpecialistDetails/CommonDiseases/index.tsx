import React from 'react';
import { Heart, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const CommonDiseases = () => {
  const diseases = [
    {
      name: 'Bệnh mạch vành',
      icon: <Heart className="w-8 h-8" />,
      description: 'Hẹp hoặc tắc động mạch vành gây thiếu máu cơ tim',
      symptoms: ['Đau thắt ngực', 'Khó thở khi gắng sức', 'Mệt mỏi'],
      color: 'red',
    },
    {
      name: 'Rối loạn nhịp tim',
      icon: <Activity className="w-8 h-8" />,
      description: 'Tim đập nhanh, chậm hoặc không đều',
      symptoms: ['Tim đập nhanh', 'Hồi hộp', 'Chóng mặt'],
      color: 'orange',
    },
    {
      name: 'Tăng huyết áp',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Huyết áp cao kéo dài, nguy cơ đột quỵ',
      symptoms: ['Đau đầu', 'Chóng mặt', 'Mệt mỏi'],
      color: 'green',
    },
    {
      name: 'Suy tim',
      icon: <AlertCircle className="w-8 h-8" />,
      description: 'Tim không bơm máu đủ cho cơ thể',
      symptoms: ['Khó thở', 'Phù chân', 'Mệt mỏi'],
      color: 'blue',
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Các bệnh Tim mạch thường gặp</h2>
          <p className="text-xl text-gray-600">Hiểu rõ bệnh để phòng ngừa tốt hơn</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className={`bg-${disease.color}-50 rounded-2xl p-6 hover:shadow-xl transition shadow-base-1`}
            >
              <div
                className={`w-16 h-16 rounded-full bg-${disease.color}-100 flex items-center justify-center text-${disease.color}-600 mb-4`}
              >
                {disease.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{disease.name}</h3>
              <p className="text-gray-700 text-sm mb-4">{disease.description}</p>
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">Triệu chứng:</div>
                <ul className="space-y-1">
                  {disease.symptoms.map((symptom, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${disease.color}-500`} />
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CommonDiseases;
