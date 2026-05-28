import React from 'react';
import { Video, Clock, Phone, MapPin, Calendar } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Pricing {
  consultation: number;
  followUp: number;
  videoCall: number;
}

interface BookingCardProps {
  pricing: Pricing;
  workingDays: string[];
  workingHours: string;
  timeSlots: TimeSlot[];
  location: string;
  hotline: string;
  onBookAppointment: () => void;
  onVideoCall: () => void;
}
const BookingCard: React.FC<BookingCardProps> = ({
  pricing,
  workingDays,
  workingHours,
  timeSlots,
  location,
  hotline,
  onBookAppointment,
  onVideoCall,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Đặt lịch khám</h3>

      {/* Pricing */}
      <PricingSection pricing={pricing} />

      {/* Working Schedule */}
      <WorkingSchedule workingDays={workingDays} workingHours={workingHours} />

      {/* Time Slots Preview */}
      <TimeSlotsPreview timeSlots={timeSlots} />

      {/* CTA Buttons */}
      <CTAButtons onBookAppointment={onBookAppointment} onVideoCall={onVideoCall} />

      {/* Location */}
      <LocationInfo location={location} />

      {/* Contact */}
      <ContactInfo hotline={hotline} />
    </div>
  );
};
export default BookingCard;
// Sub-components
const PricingSection: React.FC<{ pricing: Pricing }> = ({ pricing }) => (
  <div className="mb-6 space-y-3">
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Khám tại phòng khám</span>
      <span className="text-xl font-bold text-blue-600">{pricing.consultation.toLocaleString()}đ</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Tái khám</span>
      <span className="text-lg font-semibold text-gray-900">{pricing.followUp.toLocaleString()}đ</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Tư vấn video</span>
      <span className="text-lg font-semibold text-gray-900">{pricing.videoCall.toLocaleString()}đ</span>
    </div>
  </div>
);

const WorkingSchedule: React.FC<{ workingDays: string[]; workingHours: string }> = ({
  workingDays,
  workingHours,
}) => (
  <div className="mb-6">
    <div className="text-sm font-semibold text-gray-900 mb-3">Lịch làm việc</div>
    <div className="flex flex-wrap gap-2 mb-3">
      {workingDays.map((day, i) => (
        <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
          {day}
        </span>
      ))}
    </div>
    <div className="flex items-center gap-2 text-gray-700">
      <Clock className="w-5 h-5" />
      <span>{workingHours}</span>
    </div>
  </div>
);

const TimeSlotsPreview: React.FC<{ timeSlots: TimeSlot[] }> = ({ timeSlots }) => (
  <div className="mb-6">
    <div className="text-sm font-semibold text-gray-900 mb-3">Khung giờ hôm nay</div>
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.slice(0, 4).map((slot, i) => (
        <button
          key={i}
          disabled={!slot.available}
          className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
            slot.available
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  </div>
);

const CTAButtons: React.FC<{
  onBookAppointment: () => void;
  onVideoCall: () => void;
}> = ({ onBookAppointment, onVideoCall }) => (
  <div className="space-y-3 mb-6">
    <button
      onClick={onBookAppointment}
      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold hover:shadow-lg transition"
    >
      <Calendar className="inline w-5 h-5 mr-2" />
      Đặt lịch ngay
    </button>
    <button
      onClick={onVideoCall}
      className="w-full py-4 border-2 border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition"
    >
      <Video className="inline w-5 h-5 mr-2" />
      Tư vấn video
    </button>
  </div>
);

const LocationInfo: React.FC<{ location: string }> = ({ location }) => (
  <div className="pt-6 border-t">
    <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
      <div>
        <div className="text-sm font-semibold text-gray-900 mb-1">Địa điểm khám</div>
        <div className="text-sm text-gray-600">{location}</div>
      </div>
    </div>
  </div>
);

const ContactInfo: React.FC<{ hotline: string }> = ({ hotline }) => (
  <div className="mt-4">
    <div className="flex items-center gap-3">
      <Phone className="w-5 h-5 text-blue-600" />
      <a href={`tel:${hotline}`} className="text-sm text-blue-600 font-semibold hover:underline">
        Hotline: {hotline}
      </a>
    </div>
  </div>
);

// components/doctor/sidebar/TimeSlotPicker.tsx
export const TimeSlotPicker: React.FC<{
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (time: string) => void;
}> = ({ slots, selectedSlot, onSelectSlot }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {slots.map((slot, i) => (
        <button
          key={i}
          disabled={!slot.available}
          onClick={() => slot.available && onSelectSlot(slot.time)}
          className={`py-3 px-4 rounded-lg text-sm font-semibold transition ${
            selectedSlot === slot.time
              ? 'bg-blue-600 text-white'
              : slot.available
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};
