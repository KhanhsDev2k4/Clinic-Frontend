"use client";

import { useRef, useState } from "react";
import {
  Search,
  ChevronRight,
  ChevronLeft,
  Star,
  MapPin,
  Clock,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Baby,
  Bone,
  Activity,
  Smile,
  X,
  Check,
  CalendarCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  APPOINTMENT_STATUS,
  BLOOD_TYPE,
  BOOKING_TYPE,
  GENDER,
  REVIEW_STATUS,
  ROLE_NAME,
  SPECIALTY_TYPE,
  USER_STATUS,
} from "@/common";
import { DoctorProfileResponse, SpecialtyResponse } from "@/interface/response";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_SPECIALTIES: SpecialtyResponse[] = [
  {
    id: "s1",
    name: "General Medicine",
    slug: "general-medicine",
    description: "Primary care and general health",
    image: "",
    displayOrder: 1,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s2",
    name: "Cardiology",
    slug: "cardiology",
    description: "Heart and cardiovascular system",
    image: "",
    displayOrder: 2,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s3",
    name: "Dermatology",
    slug: "dermatology",
    description: "Skin, hair and nails",
    image: "",
    displayOrder: 3,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s4",
    name: "Pediatrics",
    slug: "pediatrics",
    description: "Children's health",
    image: "",
    displayOrder: 4,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s5",
    name: "Neurology",
    slug: "neurology",
    description: "Brain and nervous system",
    image: "",
    displayOrder: 5,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s6",
    name: "Orthopedics",
    slug: "orthopedics",
    description: "Bones, joints and muscles",
    image: "",
    displayOrder: 6,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s7",
    name: "Ophthalmology",
    slug: "ophthalmology",
    description: "Eye care and vision",
    image: "",
    displayOrder: 7,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
  {
    id: "s8",
    name: "Psychiatry",
    slug: "psychiatry",
    description: "Mental health and wellness",
    image: "",
    displayOrder: 8,
    specialtyType: SPECIALTY_TYPE.CARDIOLOGY,
    isActive: true,
  },
];

const SPECIALTY_ICONS: Record<string, React.ReactNode> = {
  s1: <Stethoscope className="w-6 h-6" />,
  s2: <Heart className="w-6 h-6" />,
  s3: <Activity className="w-6 h-6" />,
  s4: <Baby className="w-6 h-6" />,
  s5: <Brain className="w-6 h-6" />,
  s6: <Bone className="w-6 h-6" />,
  s7: <Eye className="w-6 h-6" />,
  s8: <Smile className="w-6 h-6" />,
};

const SPECIALTY_COLORS: Record<string, string> = {
  s1: "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-300",
  s2: "bg-red-50 text-red-500 border-red-100 group-hover:bg-red-100 group-hover:border-red-300",
  s3: "bg-orange-50 text-orange-500 border-orange-100 group-hover:bg-orange-100 group-hover:border-orange-300",
  s4: "bg-green-50 text-green-600 border-green-100 group-hover:bg-green-100 group-hover:border-green-300",
  s5: "bg-violet-50 text-violet-600 border-violet-100 group-hover:bg-violet-100 group-hover:border-violet-300",
  s6: "bg-amber-50 text-amber-600 border-amber-100 group-hover:bg-amber-100 group-hover:border-amber-300",
  s7: "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-100 group-hover:border-cyan-300",
  s8: "bg-pink-50 text-pink-500 border-pink-100 group-hover:bg-pink-100 group-hover:border-pink-300",
};

const MOCK_DOCTORS: DoctorProfileResponse[] = [
  {
    id: "d1",
    createdAt: "",
    updatedAt: "",
    doctorCode: "DR001",
    specialty: MOCK_SPECIALTIES[1],
    degree: "MD, PhD",
    experienceYears: 12,
    education: "Harvard Medical School",
    bio: "Specialist in interventional cardiology with over 12 years of experience.",
    consultationFee: 350000,
    averageRating: 4.9,
    totalReviews: 238,
    totalPatients: 1420,
    isFeatured: true,
    deleted: false,
    user: {
      id: "u1",
      createdAt: "",
      updatedAt: "",
      email: "james@clinic.com",
      phone: "0901234567",
      fullName: "Dr. James Mitchell",
      role: ROLE_NAME.DOCTOR,
      status: USER_STATUS.ACTIVE,
      pathAvatar: null,
      dob: "1980-05-10",
      gender: GENDER.MALE,
    },
  },
  {
    id: "d2",
    createdAt: "",
    updatedAt: "",
    doctorCode: "DR002",
    specialty: MOCK_SPECIALTIES[1],
    degree: "MD",
    experienceYears: 8,
    education: "Johns Hopkins University",
    bio: "Expert in non-invasive cardiac imaging and preventive cardiology.",
    consultationFee: 280000,
    averageRating: 4.7,
    totalReviews: 154,
    totalPatients: 890,
    isFeatured: false,
    deleted: false,
    user: {
      id: "u2",
      createdAt: "",
      updatedAt: "",
      email: "sarah@clinic.com",
      phone: "0901234568",
      fullName: "Dr. Sarah Chen",
      role: ROLE_NAME.DOCTOR,
      status: USER_STATUS.ACTIVE,
      pathAvatar: null,
      dob: "1985-08-22",
      gender: GENDER.FEMALE,
    },
  },
  {
    id: "d3",
    createdAt: "",
    updatedAt: "",
    doctorCode: "DR003",
    specialty: MOCK_SPECIALTIES[1],
    degree: "MD, FACC",
    experienceYears: 15,
    education: "Stanford University",
    bio: "Board-certified cardiologist specializing in heart failure management.",
    consultationFee: 420000,
    averageRating: 4.8,
    totalReviews: 312,
    totalPatients: 2100,
    isFeatured: true,
    deleted: false,
    user: {
      id: "u3",
      createdAt: "",
      updatedAt: "",
      email: "robert@clinic.com",
      phone: "0901234569",
      fullName: "Dr. Robert Hayes",
      role: ROLE_NAME.DOCTOR,
      status: USER_STATUS.ACTIVE,
      pathAvatar: null,
      dob: "1975-03-15",
      gender: GENDER.MALE,
    },
  },
];

const TIME_SLOTS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];
const UNAVAILABLE_SLOTS = ["09:00", "10:30", "14:00", "15:30"];

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingState = {
  specialty: SpecialtyResponse | null;
  doctor: DoctorProfileResponse | null;
  date: string;
  time: string;
  bookingType: BOOKING_TYPE;
  reason: string;
  symptoms: string;
  notes: string;
};

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Specialty", icon: Stethoscope },
  { label: "Doctor", icon: User },
  { label: "Schedule", icon: Calendar },
  { label: "Details", icon: FileText },
  { label: "Review", icon: CheckCircle2 },
];

const StepBar = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-0 mb-8 select-none">
    {STEPS.map((s, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={s.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                done
                  ? "bg-blue-600 border-blue-600 text-white"
                  : active
                    ? "bg-white border-blue-600 text-blue-600 shadow-md shadow-blue-100"
                    : "bg-gray-50 border-gray-200 text-gray-300"
              )}
            >
              {done ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
            </div>
            <span
              className={cn(
                "text-[10px] font-medium hidden sm:block",
                active ? "text-blue-600" : done ? "text-gray-500" : "text-gray-300"
              )}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "w-10 sm:w-16 h-px mx-1 mb-4 transition-all duration-500",
                i < current ? "bg-blue-600" : "bg-gray-200"
              )}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ─── Step 1: Specialty ────────────────────────────────────────────────────────

const StepSpecialty = ({
  selected,
  onSelect,
}: {
  selected: SpecialtyResponse | null;
  onSelect: (s: SpecialtyResponse) => void;
}) => {
  const [query, setQuery] = useState("");
  const filtered = MOCK_SPECIALTIES.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Choose a Specialty</h2>
        <p className="text-sm text-gray-400 mt-1">
          Select the medical specialty that best matches your needs
        </p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search specialty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9 rounded-xl border-gray-200 focus-visible:ring-blue-500"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filtered.map((sp) => {
          const isSelected = selected?.id === sp.id;
          return (
            <button
              key={sp.id}
              onClick={() => onSelect(sp)}
              className={cn(
                "group relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 text-center cursor-pointer",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                  : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
              )}
            >
              {isSelected && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </span>
              )}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-200",
                  isSelected ? "bg-blue-100 text-blue-600 border-blue-200" : SPECIALTY_COLORS[sp.id]
                )}
              >
                {SPECIALTY_ICONS[sp.id]}
              </div>
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isSelected ? "text-blue-700" : "text-gray-800"
                  )}
                >
                  {sp.name}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{sp.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Step 2: Doctor ───────────────────────────────────────────────────────────

const StepDoctor = ({
  specialty,
  selected,
  onSelect,
}: {
  specialty: SpecialtyResponse | null;
  selected: DoctorProfileResponse | null;
  onSelect: (d: DoctorProfileResponse) => void;
}) => {
  const doctors = MOCK_DOCTORS;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Choose a Doctor</h2>
        <p className="text-sm text-gray-400 mt-1">
          {specialty ? `Showing doctors for ${specialty.name}` : "All available doctors"}
        </p>
      </div>
      <div className="space-y-3">
        {doctors.map((doc) => {
          const isSelected = selected?.id === doc.id;
          const initials = doc.user.fullName
            .split(" ")
            .map((n) => n[0])
            .slice(-2)
            .join("");
          return (
            <button
              key={doc.id}
              onClick={() => onSelect(doc)}
              className={cn(
                "w-full text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all duration-200",
                isSelected
                  ? "border-blue-500 bg-blue-50 shadow-md shadow-blue-100"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
              )}
            >
              <Avatar className="w-14 h-14 shrink-0 rounded-xl">
                <AvatarImage src={doc.user.pathAvatar ?? undefined} />
                <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-400 to-teal-400 text-white font-bold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{doc.user.fullName}</p>
                    <p className="text-xs text-gray-400">
                      {doc.degree} · {doc.experienceYears} yrs exp
                    </p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-gray-700">{doc.averageRating}</span>
                    <span className="text-xs text-gray-400">({doc.totalReviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <User className="w-3 h-3" />
                    {doc.totalPatients.toLocaleString()} patients
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] h-4 px-1.5 border-green-200 text-green-600 bg-green-50"
                  >
                    Available today
                  </Badge>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">{doc.education}</p>
                  <p className="text-sm font-bold text-blue-600">
                    {doc.consultationFee.toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Step 3: Schedule ─────────────────────────────────────────────────────────

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function toDateStr(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

const StepSchedule = ({
  date,
  time,
  onDateChange,
  onTimeChange,
}: {
  date: string;
  time: string;
  onDateChange: (d: string) => void;
  onTimeChange: (t: string) => void;
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else setViewMonth((m) => m + 1);
  };

  const isPast = (d: number) => {
    const cell = new Date(viewYear, viewMonth, d);
    cell.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return cell < t;
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Pick a Date & Time</h2>
        <p className="text-sm text-gray-400 mt-1">Select your preferred appointment slot</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Calendar */}
        <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              </button>
              <span className="text-sm font-semibold text-gray-800">
                {MONTHS[viewMonth]} {viewYear}
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`e${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const d = i + 1;
                const ds = toDateStr(viewYear, viewMonth, d);
                const past = isPast(d);
                const selected = ds === date;
                return (
                  <button
                    key={d}
                    disabled={past}
                    onClick={() => onDateChange(ds)}
                    className={cn(
                      "h-8 w-full rounded-lg text-xs font-medium transition-all duration-150",
                      past
                        ? "text-gray-200 cursor-not-allowed"
                        : selected
                          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    )}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time slots */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {date ? (
              <span>
                Available slots for <span className="font-semibold text-gray-800">{date}</span>
              </span>
            ) : (
              <span>Please select a date first</span>
            )}
          </div>

          {date ? (
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const unavail = UNAVAILABLE_SLOTS.includes(slot);
                const selected = slot === time;
                return (
                  <button
                    key={slot}
                    disabled={unavail}
                    onClick={() => onTimeChange(slot)}
                    className={cn(
                      "py-2 rounded-xl text-xs font-semibold border-2 transition-all duration-150",
                      unavail
                        ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                        : selected
                          ? "border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:text-blue-600"
                    )}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-100">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                <p className="text-xs text-gray-300">Select a date to see available times</p>
              </div>
            </div>
          )}

          {date && (
            <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-blue-500 bg-blue-600 inline-block" />{" "}
                Selected
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-gray-200 inline-block" /> Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded border-2 border-gray-100 bg-gray-50 inline-block" />{" "}
                Unavailable
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Step 4: Details ──────────────────────────────────────────────────────────

const StepDetails = ({
  bookingType,
  reason,
  symptoms,
  notes,
  onChange,
}: {
  bookingType: BOOKING_TYPE;
  reason: string;
  symptoms: string;
  notes: string;
  onChange: (field: string, val: string) => void;
}) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-xl font-semibold text-gray-900">Appointment Details</h2>
      <p className="text-sm text-gray-400 mt-1">
        Help the doctor prepare by sharing some information
      </p>
    </div>

    {/* Booking type */}
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">Appointment Type</Label>
      <RadioGroup
        value={bookingType}
        onValueChange={(val) => onChange("bookingType", val)}
        className="grid grid-cols-2 gap-3"
      >
        {[
          {
            value: BOOKING_TYPE.ONLINE,
            label: "Online Consultation",
            desc: "Video call from anywhere",
          },
          { value: BOOKING_TYPE.WALK_IN, label: "In-person Visit", desc: "At the clinic" },
        ].map((opt) => (
          <Label
            key={opt.value}
            htmlFor={opt.value}
            className={cn(
              "flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200",
              bookingType === opt.value
                ? "border-blue-500 bg-blue-50"
                : "border-gray-100 bg-white hover:border-gray-200"
            )}
          >
            <RadioGroupItem value={opt.value} id={opt.value} className="mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
              <p className="text-xs text-gray-400">{opt.desc}</p>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>

    <Separator />

    {/* Reason */}
    <div className="space-y-2">
      <Label htmlFor="reason" className="text-sm font-semibold text-gray-700">
        Reason for Visit <span className="text-red-400">*</span>
      </Label>
      <Input
        id="reason"
        placeholder="e.g. Annual check-up, chest pain, follow-up..."
        value={reason}
        onChange={(e) => onChange("reason", e.target.value)}
        className="rounded-xl border-gray-200 focus-visible:ring-blue-500"
      />
    </div>

    {/* Symptoms */}
    <div className="space-y-2">
      <Label htmlFor="symptoms" className="text-sm font-semibold text-gray-700">
        Current Symptoms
      </Label>
      <Textarea
        id="symptoms"
        placeholder="Describe any symptoms you're experiencing..."
        value={symptoms}
        onChange={(e) => onChange("symptoms", e.target.value)}
        rows={3}
        className="rounded-xl border-gray-200 focus-visible:ring-blue-500 resize-none"
      />
    </div>

    {/* Notes */}
    <div className="space-y-2">
      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">
        Additional Notes
      </Label>
      <Textarea
        id="notes"
        placeholder="Allergies, current medications, or anything else the doctor should know..."
        value={notes}
        onChange={(e) => onChange("notes", e.target.value)}
        rows={2}
        className="rounded-xl border-gray-200 focus-visible:ring-blue-500 resize-none"
      />
    </div>
  </div>
);

// ─── Step 5: Review ───────────────────────────────────────────────────────────

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 py-2.5">
    <span className="text-sm text-gray-400 shrink-0">{label}</span>
    <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
  </div>
);

const StepReview = ({ state }: { state: BookingState }) => {
  const initials =
    state.doctor?.user.fullName
      .split(" ")
      .map((n) => n[0])
      .slice(-2)
      .join("") ?? "?";
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Review Your Appointment</h2>
        <p className="text-sm text-gray-400 mt-1">Please confirm all details before booking</p>
      </div>

      {/* Doctor summary */}
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="w-14 h-14 rounded-xl shrink-0">
            <AvatarImage src={state.doctor?.user.pathAvatar ?? undefined} />
            <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-400 to-teal-400 text-white font-bold text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-gray-900">{state.doctor?.user.fullName}</p>
            <p className="text-xs text-gray-400">
              {state.doctor?.specialty.name} · {state.doctor?.degree}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-gray-600">
                {state.doctor?.averageRating}
              </span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-lg font-bold text-blue-600">
              {state.doctor?.consultationFee.toLocaleString("vi-VN")}₫
            </p>
            <p className="text-xs text-gray-400">Consultation fee</p>
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card className="border border-gray-100 rounded-2xl shadow-sm">
        <CardContent className="p-4 divide-y divide-gray-50">
          <ReviewRow label="Specialty" value={state.specialty?.name ?? "-"} />
          <ReviewRow label="Date" value={state.date || "-"} />
          <ReviewRow label="Time" value={state.time || "-"} />
          <ReviewRow
            label="Type"
            value={
              state.bookingType === BOOKING_TYPE.ONLINE ? "Online Consultation" : "In-person Visit"
            }
          />
          <ReviewRow label="Reason" value={state.reason || "-"} />
          {state.symptoms && <ReviewRow label="Symptoms" value={state.symptoms} />}
          {state.notes && <ReviewRow label="Notes" value={state.notes} />}
        </CardContent>
      </Card>

      <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
        <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          You'll receive a confirmation via Email and SMS after booking. Please arrive 10 minutes
          early for your appointment.
        </p>
      </div>
    </div>
  );
};

// ─── Step 6: Success ──────────────────────────────────────────────────────────

const StepSuccess = ({ state, onReset }: { state: BookingState; onReset: () => void }) => (
  <div className="flex flex-col items-center text-center gap-6 py-8">
    <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-100 flex items-center justify-center">
      <CalendarCheck className="w-9 h-9 text-green-500" />
    </div>
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h2>
      <p className="text-gray-400 text-sm mt-2 max-w-sm">
        Your appointment has been successfully scheduled. A confirmation has been sent to your email
        and phone.
      </p>
    </div>
    <Card className="w-full border border-gray-100 rounded-2xl shadow-sm text-left">
      <CardContent className="p-4 divide-y divide-gray-50">
        <ReviewRow label="Doctor" value={state.doctor?.user.fullName ?? "-"} />
        <ReviewRow label="Date & Time" value={`${state.date} at ${state.time}`} />
        <ReviewRow
          label="Type"
          value={state.bookingType === BOOKING_TYPE.ONLINE ? "Online" : "In-person"}
        />
      </CardContent>
    </Card>
    <div className="flex gap-3 w-full">
      <Button variant="outline" className="flex-1 rounded-xl" onClick={onReset}>
        Book Another
      </Button>
      <Button className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700" asChild>
        <a href="/appointments">View Appointments</a>
      </Button>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [state, setState] = useState<BookingState>({
    specialty: null,
    doctor: null,
    date: "",
    time: "",
    bookingType: BOOKING_TYPE.ONLINE,
    reason: "",
    symptoms: "",
    notes: "",
  });

  const handleChange = (field: string, val: string) =>
    setState((prev) => ({ ...prev, [field]: val }));

  const canNext = [
    !!state.specialty,
    !!state.doctor,
    !!state.date && !!state.time,
    !!state.reason,
    true,
  ][step];

  const handleNext = () => {
    if (step < 4) setStep((s) => s + 1);
    else {
      // TODO: call API with CreateAppointmentDto
      setSubmitted(true);
    }
  };

  const handleBack = () => setStep((s) => s - 1);

  const handleReset = () => {
    setStep(0);
    setSubmitted(false);
    setState({
      specialty: null,
      doctor: null,
      date: "",
      time: "",
      bookingType: BOOKING_TYPE.ONLINE,
      reason: "",
      symptoms: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm">Book Appointment</span>
          </div>
          {!submitted && (
            <span className="text-xs text-gray-400 font-medium">Step {step + 1} of 5</span>
          )}
        </div>
      </div>

      <div className="w-2xl mx-auto px-4 py-8">
        {submitted ? (
          <StepSuccess state={state} onReset={handleReset} />
        ) : (
          <>
            <StepBar current={step} />

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              {step === 0 && (
                <StepSpecialty
                  selected={state.specialty}
                  onSelect={(sp) => setState((prev) => ({ ...prev, specialty: sp, doctor: null }))}
                />
              )}
              {step === 1 && (
                <StepDoctor
                  specialty={state.specialty}
                  selected={state.doctor}
                  onSelect={(doc) => setState((prev) => ({ ...prev, doctor: doc }))}
                />
              )}
              {step === 2 && (
                <StepSchedule
                  date={state.date}
                  time={state.time}
                  onDateChange={(d) => handleChange("date", d)}
                  onTimeChange={(t) => handleChange("time", t)}
                />
              )}
              {step === 3 && (
                <StepDetails
                  bookingType={state.bookingType}
                  reason={state.reason}
                  symptoms={state.symptoms}
                  notes={state.notes}
                  onChange={handleChange}
                />
              )}
              {step === 4 && <StepReview state={state} />}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center justify-between mt-5 gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
                className="rounded-xl gap-2 min-w-24"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>

              {/* Mini summary pill */}
              {state.specialty && step > 0 && (
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-600 font-medium max-w-[200px] truncate">
                    {SPECIALTY_ICONS[state.specialty.id]}
                    <span className="truncate">{state.specialty.name}</span>
                    {state.doctor && (
                      <>
                        <ChevronRight className="w-3 h-3 shrink-0" />
                        <span className="truncate">
                          {state.doctor.user.fullName.split(" ").slice(-1)[0]}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <Button
                onClick={handleNext}
                disabled={!canNext}
                className="rounded-xl gap-2 min-w-24 bg-blue-600 hover:bg-blue-700"
              >
                {step === 4 ? (
                  "Confirm Booking"
                ) : (
                  <>
                    Next <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
