import React from 'react';
import { Calendar, Activity, FileText, Stethoscope, CheckCircle, ChevronRight } from 'lucide-react';

const Process = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Quy trình khám Tim mạch</h2>
          <p className="text-xl text-gray-600">5 bước đơn giản, chuyên nghiệp</p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {[
            {
              step: 1,
              title: 'Tiếp đón',
              desc: 'Check-in, xác minh thông tin',
              icon: <Calendar className="w-8 h-8" />,
              time: '5 phút',
            },
            {
              step: 2,
              title: 'Khám lâm sàng',
              desc: 'Bác sĩ thăm khám, hỏi tiền sử',
              icon: <Stethoscope className="w-8 h-8" />,
              time: '15-20 phút',
            },
            {
              step: 3,
              title: 'Xét nghiệm',
              desc: 'ECG, siêu âm, xét nghiệm máu',
              icon: <Activity className="w-8 h-8" />,
              time: '30-45 phút',
            },
            {
              step: 4,
              title: 'Tư vấn',
              desc: 'Giải thích kết quả, phác đồ',
              icon: <FileText className="w-8 h-8" />,
              time: '15 phút',
            },
            {
              step: 5,
              title: 'Kê đơn',
              desc: 'Nhận đơn thuốc, hẹn tái khám',
              icon: <CheckCircle className="w-8 h-8" />,
              time: '5 phút',
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">Bước {item.step}</div>
                <div>
                  <h3 className="font-bold text-[1.6rem] text-gray-900 mb-2">{item.title} </h3>
                  <p className="text-1.2rem text-blue-600 font-semibold mb-[1rem]">⏱ {item.time}</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
              </div>
              {index < 4 && (
                <ChevronRight className="hidden md:block absolute top-5 -right-2 w-6 h-6 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Process;
