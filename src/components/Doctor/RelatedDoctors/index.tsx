import React from 'react';
import { Star } from 'lucide-react';

interface RelatedDoctor {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  fee: number;
}

interface RelatedDoctorsProps {
  doctors: RelatedDoctor[];
}

const RelatedDoctors: React.FC<RelatedDoctorsProps> = ({ doctors }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Bác sĩ cùng chuyên khoa</h3>
      <div className="space-y-4">
        {doctors.map(doc => (
          <RelatedDoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};
export default RelatedDoctors;
const RelatedDoctorCard: React.FC<{ doctor: RelatedDoctor }> = ({ doctor }) => (
  <a
    href={`/en/doctor/${doctor.id}`}
    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-transparent transition"
  >
    <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-lg object-cover" />
    <div className="flex-1">
      <div className="font-bold text-gray-900 mb-1">{doctor.name}</div>
      <div className="text-sm text-gray-600 mb-2">{doctor.specialty}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{doctor.rating}</span>
        </div>
        <span className="text-sm font-bold text-blue-600">{doctor.fee.toLocaleString()}đ</span>
      </div>
    </div>
  </a>
);
