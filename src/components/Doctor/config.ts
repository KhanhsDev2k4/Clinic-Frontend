// data/doctorData.ts - Example data file
export const doctorData = {
  id: 1,
  code: 'BS001234',
  name: 'TS.BS Nguyễn Văn Minh',
  avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop',
  specialty: 'Tim mạch',
  subSpecialty: 'Tim mạch can thiệp',
  degree: 'Tiến sĩ',
  experience: 18,
  languages: ['Tiếng Việt', 'English'],
  availableToday: true,

  stats: {
    rating: 4.9,
    totalReviews: 256,
    totalPatients: 3500,
    successRate: 98,
    responseTime: '< 2 giờ',
  },

  pricing: {
    consultation: 350000,
    followUp: 250000,
    videoCall: 300000,
  },

  workingDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
  workingHours: '08:00 - 17:00',
  location: 'Phòng khám An Khang - Số 123 Đường ABC, Quận XYZ, TP. Hà Nội',

  treatmentApproach:
    'Tôi tin rằng mỗi bệnh nhân là duy nhất và cần một phương pháp điều trị được cá nhân hóa. Tôi luôn dành thời gian lắng nghe bệnh nhân, giải thích rõ ràng về tình trạng bệnh và các lựa chọn điều trị.',

  expertise: [
    'Bệnh mạch vành',
    'Can thiệp tim mạch',
    'Đặt stent mạch vành',
    'Rối loạn nhịp tim',
    'Đặt máy tạo nhịp tim',
    'Tăng huyết áp',
    'Suy tim',
    'Bệnh van tim',
  ],

  certificates: [
    'Chứng chỉ hành nghề số 12345/BYT',
    'Chứng chỉ Can thiệp tim mạch',
    'Chứng chỉ Siêu âm tim',
    'Chứng chỉ Đặt máy tạo nhịp tim',
  ],

  education: [
    { year: '2000-2006', school: 'Đại học Y Hà Nội', degree: 'Bác sĩ Đa khoa' },
    { year: '2008-2010', school: 'Đại học Y Hà Nội', degree: 'Thạc sĩ Tim mạch' },
    { year: '2012-2016', school: 'Đại học Y Hà Nội', degree: 'Tiến sĩ Tim mạch' },
  ],

  workHistory: [
    { year: '2006-2010', place: 'Bệnh viện Bạch Mai', position: 'Bác sĩ nội trú' },
    { year: '2010-2015', place: 'Bệnh viện Tim Hà Nội', position: 'Bác sĩ điều trị' },
    { year: '2015-2020', place: 'Bệnh viện Tim Hà Nội', position: 'Phó trưởng khoa' },
    { year: '2020-nay', place: 'Phòng Khám An Khang', position: 'Bác sĩ chuyên khoa đầu ngành' },
  ],

  awards: [
    { year: 2020, title: 'Thầy thuốc Nhân dân', org: 'Chủ tịch nước' },
    { year: 2018, title: 'Giải thưởng Bác sĩ xuất sắc', org: 'Bộ Y tế' },
    { year: 2016, title: 'Giải thưởng Nghiên cứu khoa học', org: 'Hội Tim mạch Việt Nam' },
  ],

  publications: [
    'Nghiên cứu hiệu quả can thiệp mạch vành qua da ở bệnh nhân nhồi máu cơ tim cấp (2022)',
    'Đánh giá kết quả điều trị rối loạn nhịp tim bằng phương pháp đốt điện (2020)',
    'Nghiên cứu yếu tố nguy cơ tim mạch ở người Việt Nam (2018)',
  ],

  timeSlots: [
    { time: '08:00 - 08:30', available: false },
    { time: '08:30 - 09:00', available: true },
    { time: '09:00 - 09:30', available: true },
    { time: '09:30 - 10:00', available: false },
    { time: '10:00 - 10:30', available: true },
    { time: '10:30 - 11:00', available: true },
  ],
};

export const reviewsData = [
  {
    id: 1,
    patientName: 'Anh Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '15/01/2024',
    verified: true,
    service: 'Khám Tim mạch tổng quát',
    comment: 'Bác sĩ rất tận tâm, khám kỹ và giải thích rõ ràng, dễ hiểu.',
    helpful: 45,
  },
  {
    id: 2,
    patientName: 'Anh Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '15/01/2024',
    verified: true,
    service: 'Khám Tim mạch tổng quát',
    comment: 'Bác sĩ rất tận tâm, khám kỹ và giải thích rõ ràng, dễ hiểu.',
    helpful: 45,
  },
  {
    id: 3,
    patientName: 'Anh Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '15/01/2024',
    verified: true,
    service: 'Khám Tim mạch tổng quát',
    comment: 'Bác sĩ rất tận tâm, khám kỹ và giải thích rõ ràng, dễ hiểu.',
    helpful: 45,
  },
  {
    id: 4,
    patientName: 'Anh Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '15/01/2024',
    verified: true,
    service: 'Khám Tim mạch tổng quát',
    comment: 'Bác sĩ rất tận tâm, khám kỹ và giải thích rõ ràng, dễ hiểu.',
    helpful: 45,
  },
  {
    id: 5,
    patientName: 'Anh Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    date: '15/01/2024',
    verified: true,
    service: 'Khám Tim mạch tổng quát',
    comment: 'Bác sĩ rất tận tâm, khám kỹ và giải thích rõ ràng, dễ hiểu.',
    helpful: 45,
  },
  // Add more reviews...
];

export const relatedDoctorsData = [
  {
    id: 2,
    name: 'ThS.BS Trần Thị Hương',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    specialty: 'Siêu âm tim',
    rating: 4.8,
    fee: 300000,
  },
  // Add more doctors...
];
