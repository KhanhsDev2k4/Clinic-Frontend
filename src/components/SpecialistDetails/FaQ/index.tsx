'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FaQ = () => {
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);

  const faqs = [
    {
      category: 'Về khám bệnh',
      questions: [
        {
          q: 'Tôi cần chuẩn bị gì trước khi khám Tim mạch?',
          a: 'Bạn nên nhịn ăn ít nhất 8 tiếng nếu cần làm xét nghiệm máu. Mang theo đơn thuốc cũ (nếu có), kết quả khám trước đây, và thẻ BHYT. Mặc quần áo thoải mái, dễ cởi để thuận tiện cho việc khám.',
        },
        {
          q: 'Khám Tim mạch mất bao lâu?',
          a: 'Thời gian khám thông thường từ 30-60 phút tùy thuộc dịch vụ. Khám tổng quát khoảng 30 phút, khám chuyên sâu có siêu âm khoảng 60 phút, gói khám toàn diện có thể mất 2-3 giờ.',
        },
        {
          q: 'Có cần đặt lịch trước không?',
          a: 'Nên đặt lịch trước để đảm bảo có bác sĩ và tránh chờ đợi lâu. Bạn có thể đặt lịch online qua website, app hoặc gọi hotline 1900-xxxx.',
        },
      ],
    },
    {
      category: 'Về bảo hiểm',
      questions: [
        {
          q: 'Phòng khám có nhận bảo hiểm y tế không?',
          a: 'Có, chúng tôi chấp nhận BHYT và hầu hết các loại bảo hiểm tư nhân như Bảo Việt, Prudential, Manulife, AIA... Vui lòng mang theo thẻ BHYT khi đến khám.',
        },
        {
          q: 'BHYT chi trả bao nhiêu phần trăm?',
          a: 'Tùy loại thẻ: thẻ 5 năm liên tục được chi trả 100%, thẻ thường chi trả 80%. Một số dịch vụ cao cấp như siêu âm 4D có thể không được BHYT chi trả.',
        },
      ],
    },
    {
      category: 'Về dịch vụ',
      questions: [
        {
          q: 'Tôi có thể tư vấn qua điện thoại không?',
          a: 'Có, bạn có thể gọi hotline 1900-xxxx (7:00-21:00) để được tư vấn miễn phí. Chúng tôi cũng có dịch vụ tư vấn video call với bác sĩ chuyên khoa.',
        },
        {
          q: 'Có dịch vụ khám tại nhà không?',
          a: 'Có, chúng tôi có dịch vụ khám tại nhà cho người cao tuổi, bệnh nhân nặng không thể di chuyển. Vui lòng liên hệ để biết thêm chi tiết.',
        },
      ],
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Câu hỏi thường gặp</h2>
          <p className="text-xl text-gray-600">Giải đáp thắc mắc của bạn</p>
        </div>

        <div className="space-y-6">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h3>
              <div className="space-y-3">
                {category.questions.map((faq, faqIndex) => {
                  const key = `${catIndex}-${faqIndex}`;
                  return (
                    <div key={key} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setActiveFAQ(activeFAQ === key ? null : key)}
                        className="w-full p-6 flex justify-between items-center hover:bg-gray-50 transition"
                      >
                        <span className="font-semibold text-left text-gray-900">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-blue-600 flex-shrink-0 ml-4 transition ${activeFAQ === key ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeFAQ === key && (
                        <div className="px-6 pb-6 text-gray-700 border-t">
                          <p className="pt-4">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FaQ;
