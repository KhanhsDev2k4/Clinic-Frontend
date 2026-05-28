import React from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Anh Nguyễn Văn Minh',
      rating: 5,
      date: '15/01/2024',
      avatar: 'https://i.pravatar.cc/150?img=12',
      verified: true,
      comment:
        'Bác sĩ rất tận tâm, khám kỹ và giải thích rất dễ hiểu. Phòng khám sạch sẽ, hiện đại. Tôi rất hài lòng với dịch vụ tại đây.',
      doctor: 'TS.BS Nguyễn Văn Minh',
      service: 'Khám Tim mạch tổng quát',
      helpful: 45,
    },
    {
      name: 'Chị Trần Thị Hương',
      rating: 5,
      date: '12/01/2024',
      avatar: 'https://i.pravatar.cc/150?img=5',
      verified: true,
      comment:
        'Siêu âm tim rất chi tiết, máy móc hiện đại. Bác sĩ giải thích kết quả rất kỹ, tư vấn chế độ ăn uống cụ thể.',
      doctor: 'ThS.BS Trần Thị Hương',
      service: 'Siêu âm tim Doppler',
      helpful: 32,
    },
    {
      name: 'Anh Lê Văn Tuấn',
      rating: 5,
      date: '10/01/2024',
      avatar: 'https://i.pravatar.cc/150?img=8',
      verified: true,
      comment: 'Quy trình khám chuyên nghiệp, không phải chờ lâu. Nhân viên thân thiện, nhiệt tình hỗ trợ.',
      doctor: 'PGS.TS Lê Văn Hùng',
      service: 'Gói khám toàn diện',
      helpful: 28,
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Bệnh nhân nói gì về chúng tôi</h2>
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9</span>
            <span className="text-gray-600">(1,245 đánh giá)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {review.name}
                    {review.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>
                  <div className="text-sm text-gray-500">{review.date}</div>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-4 italic">&quot;{review.comment}&quot;</p>

              <div className="text-sm text-gray-600 mb-3">
                <div className="font-semibold">Bác sĩ: {review.doctor}</div>
                <div>Dịch vụ: {review.service}</div>
              </div>

              <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition">
                <ThumbsUp className="w-4 h-4" />
                <span>Hữu ích ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Reviews;
