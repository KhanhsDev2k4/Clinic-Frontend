import React from "react";
import { Heart, Phone } from "lucide-react";

const BannerDetailsSpecialist = () => {
  return (
    <section
      className="relative h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1200&h=600&fit=crop')`,
      }}
    >
      <div className="max-w-[100rem] mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white">
          <div className="w-[10rem] h-[10rem] bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-6">
            <Heart className="w-[5rem] h-[5rem]" />
          </div>

          <h1 className="text-5xl font-bold mb-4">Chuyên Khoa Tim Mạch</h1>
          <p className="text-xl mb-4">Chăm sóc và điều trị toàn diện các bệnh lý tim mạch</p>
          <p className="text-lg text-blue-100 mb-8">
            Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại, cam kết mang đến dịch vụ y tế
            chất lượng cao nhất
          </p>

          <div className="flex gap-4 mb-12">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition">
              Đặt lịch khám ngay
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition">
              <Phone className="inline w-5 h-5 mr-2" />
              Tư vấn: 1900-xxxx
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
