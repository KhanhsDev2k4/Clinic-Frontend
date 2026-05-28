import React from 'react';
import { Baby, Bone, Brain, Stethoscope } from 'lucide-react';

const RelatedSpecialties = () => {
  const relatedSpecialties = [
    { name: 'Nội khoa', icon: <Stethoscope className="w-6 h-6" />, slug: 'noi-khoa', color: 'blue' },
    { name: 'Nhi khoa', icon: <Baby className="w-6 h-6" />, slug: 'nhi-khoa', color: 'pink' },
    { name: 'Thần kinh', icon: <Brain className="w-6 h-6" />, slug: 'than-kinh', color: 'purple' },
    { name: 'Xương khớp', icon: <Bone className="w-6 h-6" />, slug: 'xuong-khop', color: 'orange' },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Chuyên khoa liên quan</h2>
          <p className="text-xl text-gray-600">Khám phá thêm các chuyên khoa khác</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {relatedSpecialties.map((spec, index) => (
            <a
              key={index}
              href={`/chuyen-khoa/${spec.slug}`}
              className={`bg-${spec.color}-50 rounded-2xl p-6 text-center hover:shadow-xl transition cursor-pointer group`}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${spec.color}-100 flex items-center justify-center text-${spec.color}-600 group-hover:scale-110 transition`}
              >
                {spec.icon}
              </div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                {spec.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
export default RelatedSpecialties;
