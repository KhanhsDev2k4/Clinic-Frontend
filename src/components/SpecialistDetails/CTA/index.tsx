import React from 'react';
import { Phone } from 'lucide-react';

const CTA = () => {
  const hotline = process.env.HOT_LINE || '1900-xxxx';
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-[100rem] mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Đặt lịch khám Tim mạch ngay hôm nay</h2>
        <p className="text-xl text-blue-100 mb-8">Nhận tư vấn miễn phí từ bác sĩ chuyên khoa</p>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            '✓ Bác sĩ giàu kinh nghiệm',
            '✓ Trang thiết bị hiện đại',
            '✓ Kết quả nhanh chóng',
            '✓ Chi phí hợp lý',
          ].map((benefit, i) => (
            <div key={i} className="text-lg font-semibold">
              {benefit}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition shadow-xl">
            Đặt lịch ngay
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition">
            <Phone className="inline w-5 h-5 mr-2" />
            Gọi tư vấn: {hotline}
          </button>
        </div>
      </div>
    </section>
  );
};
export default CTA;
