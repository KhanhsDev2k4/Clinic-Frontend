import { Mail, Phone, Clock, MapPin, Stethoscope } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Phòng Khám An Khang</h3>
                <p className="text-sm text-gray-400">Chăm sóc sức khỏe toàn diện</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Với hơn 15 năm kinh nghiệm, chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao
              nhất.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Liên hệ</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Đường ABC, Quận XYZ, TP. Hà Nội</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">Hotline: 1900-xxxx</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">info@phongkhamankhang.vn</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  <div>T2-T7: 7:00 - 21:00</div>
                  <div>CN: 8:00 - 17:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#doctors" className="text-gray-400 hover:text-white transition">
                  Đội ngũ bác sĩ
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition">
                  Dịch vụ khám
                </a>
              </li>
              <li>
                <a href="#news" className="text-gray-400 hover:text-white transition">
                  Tin tức y tế
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-bold text-lg mb-6">Bản đồ</h4>
            <div className="bg-gray-800 rounded-lg h-48 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Phòng Khám An Khang. Made with ❤️ for better healthcare.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
