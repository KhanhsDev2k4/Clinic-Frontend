import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Overview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[100rem] mx-auto px-4 gap-[1.6rem] flex flex-col">
        <div>
          <h2 className="text-3xl font-bold mb-6">Chuyên khoa Tim mạch là gì?</h2>
          <div className="text-gray-700 space-y-4 mb-8">
            <p>
              Chuyên khoa Tim mạch là lĩnh vực y học chuyên về chẩn đoán, điều trị và phòng ngừa các bệnh lý
              liên quan đến tim và hệ thống mạch máu. Đây là một trong những chuyên khoa quan trọng nhất trong
              y học hiện đại.
            </p>
            <p>
              Với sự phát triển của lối sống hiện đại, tỷ lệ mắc các bệnh tim mạch ngày càng tăng. Việc khám
              và phát hiện sớm các bệnh lý tim mạch giúp giảm thiểu nguy cơ biến chứng nguy hiểm như đột quỵ,
              nhồi máu cơ tim.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Phạm vi điều trị</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Bệnh mạch vành',
                'Rối loạn nhịp tim',
                'Suy tim',
                'Tăng huyết áp',
                'Bệnh van tim',
                'Tim bẩm sinh',
                'Bệnh động mạch',
                'Bệnh tĩnh mạch',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* When to visit */}
          <div className="bg-red-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-900 mb-6">⚠️ Khi nào cần khám Tim mạch?</h3>
            <div className="space-y-4">
              {[
                { text: 'Đau ngực, tức ngực', severity: 'high' },
                { text: 'Khó thở, thở gấp', severity: 'high' },
                { text: 'Tim đập nhanh, hồi hộp', severity: 'medium' },
                { text: 'Chóng mặt, ngất xỉu', severity: 'high' },
                { text: 'Phù chân, phù mắt cá', severity: 'medium' },
                { text: 'Mệt mỏi bất thường', severity: 'low' },
              ].map((symptom, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg">
                  <AlertCircle
                    className={`w-6 h-6 flex-shrink-0 ${
                      symptom.severity === 'high'
                        ? 'text-red-600'
                        : symptom.severity === 'medium'
                          ? 'text-orange-600'
                          : 'text-yellow-600'
                    }`}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{symptom.text}</div>
                    {symptom.severity === 'high' && (
                      <span className="text-xs text-red-600 font-bold">CẦN KHÁM NGAY</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk factors */}
          <div className="bg-orange-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-orange-900 mb-6">Các yếu tố nguy cơ</h3>
            <ul className="space-y-3">
              {[
                'Tiền sử gia đình có bệnh tim mạch',
                'Hút thuốc lá',
                'Béo phì, thừa cân',
                'Đái tháo đường',
                'Cholesterol cao',
                'Thiếu vận động',
                'Stress kéo dài',
                'Tuổi tác (nam >45, nữ >55)',
              ].map((factor, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Overview;
