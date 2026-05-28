import React from 'react';
import { CheckCircle } from 'lucide-react';

const equipment = [
  {
    name: 'Máy siêu âm tim 4D GE Vivid E95',
    image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=600&h=400&fit=crop',
    description: 'Siêu âm tim 4D với công nghệ hình ảnh tiên tiến nhất',
    features: ['Hình ảnh 4D siêu nét', 'Đánh giá chức năng tim chính xác', 'Phát hiện sớm bệnh lý van tim'],
  },
  {
    name: 'Máy điện tim Philips PageWriter TC70',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&h=400&fit=crop',
    description: 'Ghi và phân tích điện tim tự động, nhanh chóng',
    features: ['12 chuyển đạo chuẩn', 'Phân tích tự động', 'Kết quả tức thì'],
  },
  {
    name: 'Hệ thống Holter Schiller MT-200',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
    description: 'Theo dõi nhịp tim và huyết áp liên tục 24-48 giờ',
    features: ['Gọn nhẹ, dễ sử dụng', 'Phân tích chi tiết', 'Báo cáo tự động'],
  },
];
const Equipment = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Trang thiết bị hiện đại</h2>
          <p className="text-xl text-blue-100">Đầu tư thiết bị y tế tiên tiến nhất</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden hover:bg-white/20 transition"
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-blue-100 mb-4 text-sm">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
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
export default Equipment;
