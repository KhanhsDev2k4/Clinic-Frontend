'use client';

import React from 'react';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

import {
  Star,
  Award,
  Users,
  Building,
  ChevronLeft,
  Stethoscope,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';

const Doctors = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: {
          perView: 4,
          spacing: 24,
        },
      },
      '(max-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 16,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 1,
          spacing: 16,
        },
      },
    },
  });
  const doctors = [
    {
      id: 1,
      name: 'Nguyễn Văn Minh',
      specialty: 'Tim mạch can thiệp',
      degree: 'Tiến sĩ',
      position: 'TS.BS',
      experience: 18,
      education: 'Đại học Y Hà Nội',
      workplace: 'BV Tim Hà Nội',
      rating: 4.9,
      reviews: 256,
      patients: 3500,
      fee: 350000,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
      expertise: ['Bệnh mạch vành', 'Can thiệp tim mạch', 'Đặt stent'],
      availableToday: true,
    },
    {
      id: 2,
      name: 'Trần Thị Hương',
      specialty: 'Siêu âm tim',
      degree: 'Thạc sĩ',
      position: 'ThS.BS',
      experience: 12,
      education: 'Đại học Y Dược TP.HCM',
      workplace: 'BV Chợ Rẫy',
      rating: 4.8,
      reviews: 189,
      patients: 2800,
      fee: 300000,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
      expertise: ['Siêu âm tim', 'Siêu âm Doppler', 'Đánh giá van tim'],
      availableToday: false,
    },
    {
      id: 3,
      name: 'Lê Văn Hùng',
      specialty: 'Điện sinh lý tim',
      degree: 'Phó giáo sư',
      position: 'PGS.TS',
      experience: 22,
      education: 'Đại học Y Hà Nội',
      workplace: 'BV Bạch Mai',
      rating: 5.0,
      reviews: 421,
      patients: 5200,
      fee: 450000,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      expertise: ['Rối loạn nhịp tim', 'Đặt máy tạo nhịp', 'Đốt điện'],
      availableToday: true,
    },
    {
      id: 4,
      name: 'Phạm Thị Lan',
      specialty: 'Tim mạch nội khoa',
      degree: 'Bác sĩ',
      position: 'BS',
      experience: 8,
      education: 'Đại học Y Hà Nội',
      workplace: 'BV E',
      rating: 4.7,
      reviews: 134,
      patients: 1500,
      fee: 250000,
      avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      expertise: ['Tăng huyết áp', 'Suy tim', 'Tư vấn tim mạch'],
      availableToday: true,
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[100rem] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Đội ngũ Bác sĩ Tim mạch</h2>
          <p className="text-xl text-gray-600">Bác sĩ giàu kinh nghiệm, tận tâm với nghề</p>
        </div>

        {/* Doctors Slider */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          <div ref={sliderRef} className="keen-slider">
            {doctors.map(doctor => (
              <div key={doctor.id} className="keen-slider__slide rounded-[1.6rem] shadow-base-1 mb-[1rem]">
                <div className="bg-white rounded-[1.6rem] overflow-hidden  transition group h-full">
                  <div className="relative h-64">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-sm">{doctor.rating}</span>
                    </div>
                    {doctor.availableToday && (
                      <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Có lịch hôm nay
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {doctor.degree}
                      </span>
                    </div>
                    <div className="flex gap-[0.4rem] items-center">
                      <span className=" text-indigo-800 text-sm font-semibold">{doctor.position}</span>
                      <h3 className="text-[1.6rem] font-bold text-gray-900">{doctor.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                      <Stethoscope className="w-5 h-5" />
                      <span className="font-semibold text-sm">{doctor.specialty}</span>
                    </div>

                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Award className="w-4 h-4" />
                        <span>{doctor.experience} năm kinh nghiệm</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        <span>{doctor.education}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>{doctor.workplace}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{doctor.patients.toLocaleString()}+ bệnh nhân</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-700 mb-2">Chuyên môn:</div>
                      <div className="flex flex-wrap gap-2">
                        {doctor.expertise.slice(0, 2).map((exp, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                      <div>
                        <div className="text-xs text-gray-500">Phí khám</div>
                        <div className="text-lg font-bold text-blue-600">{doctor.fee.toLocaleString()}đ</div>
                      </div>
                      <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg transition text-sm">
                        Đặt lịch
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Doctors;
