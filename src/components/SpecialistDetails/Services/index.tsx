'use client';

import React, { useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';

const Services = () => {
  const [activeTab, setActiveTab] = useState('consultation');

  const services = {
    consultation: [
      {
        name: 'Khám Tim mạch tổng quát',
        description: 'Khám lâm sàng, đo huyết áp, nghe tim phổi, tư vấn chế độ sinh hoạt',
        price: 200000,
        duration: 30,
        includes: ['Khám lâm sàng', 'Đo huyết áp', 'Nghe tim phổi', 'Tư vấn'],
      },
      {
        name: 'Khám Tim mạch chuyên sâu',
        description: 'Khám lâm sàng + ECG + Siêu âm tim cơ bản',
        price: 500000,
        duration: 60,
        includes: ['Khám lâm sàng', 'ECG 12 chuyển đạo', 'Siêu âm tim', 'Tư vấn chi tiết'],
      },
      {
        name: 'Tư vấn bệnh mạn tính',
        description: 'Tư vấn điều trị và theo dõi bệnh tim mạch mạn tính',
        price: 250000,
        duration: 30,
        includes: ['Đánh giá tình trạng', 'Điều chỉnh thuốc', 'Tư vấn chế độ ăn'],
      },
    ],
    diagnostics: [
      {
        name: 'Điện tim (ECG) 12 chuyển đạo',
        description: 'Ghi điện tim đồ, phát hiện rối loạn nhịp và thiếu máu cơ tim',
        price: 100000,
        duration: 15,
        includes: ['Ghi ECG', 'Đọc kết quả', 'In kết quả'],
      },
      {
        name: 'Siêu âm tim Doppler màu',
        description: 'Đánh giá chức năng tim, van tim, dòng chảy máu',
        price: 350000,
        duration: 30,
        includes: ['Siêu âm 2D', 'Doppler màu', 'Đo thông số', 'Kết luận chi tiết'],
      },
      {
        name: 'Holter ECG 24 giờ',
        description: 'Theo dõi nhịp tim liên tục trong 24 giờ',
        price: 800000,
        duration: 30,
        includes: ['Gắn máy Holter', 'Theo dõi 24h', 'Phân tích kết quả', 'Báo cáo'],
      },
      {
        name: 'Holter huyết áp 24 giờ',
        description: 'Theo dõi huyết áp tại nhà trong 24 giờ',
        price: 600000,
        duration: 30,
        includes: ['Gắn máy', 'Theo dõi 24h', 'Biểu đồ huyết áp', 'Tư vấn'],
      },
      {
        name: 'Test gắng sức',
        description: 'Đánh giá khả năng gắng sức và thiếu máu cơ tim khi vận động',
        price: 1200000,
        duration: 45,
        includes: ['ECG gắng sức', 'Theo dõi huyết áp', 'Đánh giá khả năng vận động'],
      },
    ],
    packages: [
      {
        name: 'Gói khám Tim mạch cơ bản',
        description: 'Phù hợp cho người muốn kiểm tra sức khỏe tim mạch định kỳ',
        price: 1500000,
        originalPrice: 2000000,
        discount: 25,
        popular: true,
        includes: [
          'Khám lâm sàng với bác sĩ chuyên khoa',
          'ECG 12 chuyển đạo',
          'Xét nghiệm máu (Lipid, Glucose, HbA1c)',
          'X-quang ngực',
          'Tư vấn kết quả và chế độ ăn uống',
        ],
      },
      {
        name: 'Gói khám Tim mạch toàn diện',
        description: 'Khám sàng lọc đầy đủ, phát hiện sớm bệnh lý tim mạch',
        price: 3500000,
        originalPrice: 4500000,
        discount: 22,
        bestValue: true,
        includes: [
          'Khám lâm sàng với chuyên gia đầu ngành',
          'ECG 12 chuyển đạo',
          'Siêu âm tim Doppler màu',
          'Holter ECG 24 giờ',
          'Xét nghiệm máu toàn diện (Lipid, Glucose, HbA1c, Troponin)',
          'X-quang ngực',
          'Test gắng sức (nếu cần)',
          'Tư vấn chế độ ăn uống và vận động',
          'Tái khám miễn phí 1 lần trong 30 ngày',
        ],
      },
      {
        name: 'Gói khám Tim mạch cao cấp',
        description: 'Gói khám VIP với bác sĩ đầu ngành, theo dõi sát sao',
        price: 6000000,
        originalPrice: 8000000,
        discount: 25,
        includes: [
          'Khám với PGS.TS đầu ngành',
          'ECG 12 chuyển đạo',
          'Siêu âm tim 4D',
          'Holter ECG 24 giờ + Holter huyết áp 24 giờ',
          'Xét nghiệm máu toàn diện + Marker tim mạch',
          'CT mạch vành (nếu cần)',
          'Test gắng sức có siêu âm',
          'Tư vấn chuyên sâu về dinh dưỡng, vận động',
          'Theo dõi qua app trong 3 tháng',
          'Tái khám miễn phí 3 lần',
        ],
      },
    ],
  };
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Dịch vụ Tim mạch</h2>
          <p className="text-xl text-gray-600">Đa dạng dịch vụ khám và điều trị</p>
        </div>

        {/* Service Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveTab('consultation')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === 'consultation'
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Khám & Tư vấn
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === 'diagnostics'
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Xét nghiệm & Chẩn đoán
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              activeTab === 'packages'
                ? 'bg-blue-600 text-white'
                : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Gói khám tổng quát
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services[activeTab as keyof typeof services].map((service: any, index: number) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-xl transition relative flex flex-col"
            >
              {service.popular && (
                <div className="absolute -top-3 left-6 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  PHỔ BIẾN
                </div>
              )}
              {service.bestValue && (
                <div className="absolute -top-3 left-6 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  GIÁ TỐT NHẤT
                </div>
              )}

              <h3 className="text-[2rem] leading-[2.4rem] line-clamp-2 h-[4.8rem] font-bold text-gray-900 mb-2 ">
                {service.name}
              </h3>
              <p className="text-gray-600 text-[1.2rem] leading-[1.6rem] mb-[1.2rem] line-clamp-3 h-[4.8rem] ">
                {service.description}
              </p>

              <div className="mb-[1.6rem]">
                {service.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 line-through text-sm">
                      {service.originalPrice.toLocaleString()}đ
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                      -{service.discount}%
                    </span>
                  </div>
                )}
                <div className="text-3xl font-bold text-blue-600">{service.price.toLocaleString()}đ</div>
                {service.duration && (
                  <div className="text-sm text-gray-500 mt-1">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {service.duration} phút
                  </div>
                )}
              </div>

              {service.includes && (
                <div className="mb-6 flex-grow">
                  <div className="font-semibold text-gray-900 mb-3">Bao gồm:</div>
                  <ul className="space-y-2">
                    {service.includes.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition mt-auto">
                Đăng ký ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
