export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patient: string;
  initials: string;
  avatarColor: "blue" | "teal" | "amber" | "rose" | "purple";
  reason: string;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm"
  duration: number; // minutes
  status: AppointmentStatus;
  phone: string;
  age: number;
  gender: string;
  notes?: string;
}

export type FilterStatus = "all" | AppointmentStatus;

export const STATUS_CONFIG: Record<
  AppointmentStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  pending: {
    label: "Pending",
    dotClass: "bg-amber-400",
    badgeClass: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  confirmed: {
    label: "Confirmed",
    dotClass: "bg-emerald-500",
    badgeClass: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  completed: {
    label: "Completed",
    dotClass: "bg-gray-400",
    badgeClass: "bg-gray-100 text-gray-600 border border-gray-200",
  },
  cancelled: {
    label: "Cancelled",
    dotClass: "bg-rose-400",
    badgeClass: "bg-rose-50 text-rose-600 border border-rose-200",
  },
};

export const AVATAR_COLOR_MAP: Record<Appointment["avatarColor"], { bg: string; text: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600" },
  teal: { bg: "bg-teal-50", text: "text-teal-600" },
  amber: { bg: "bg-amber-50", text: "text-amber-600" },
  rose: { bg: "bg-rose-50", text: "text-rose-600" },
  purple: { bg: "bg-purple-50", text: "text-purple-600" },
};

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    patient: "Emma Richardson",
    initials: "ER",
    avatarColor: "blue",
    reason: "Follow-up consultation",
    date: "2026-05-18",
    time: "09:00",
    duration: 30,
    status: "pending",
    phone: "+84 912 345 678",
    age: 34,
    gender: "Female",
    notes: "Patient reported mild chest discomfort last visit.",
  },
  {
    id: "2",
    patient: "James Thornton",
    initials: "JT",
    avatarColor: "teal",
    reason: "Chest pain evaluation",
    date: "2026-05-18",
    time: "10:30",
    duration: 45,
    status: "confirmed",
    phone: "+84 909 876 543",
    age: 52,
    gender: "Male",
  },
  {
    id: "3",
    patient: "Sophia Nakamura",
    initials: "SN",
    avatarColor: "purple",
    reason: "ECG result review",
    date: "2026-05-18",
    time: "14:00",
    duration: 30,
    status: "confirmed",
    phone: "+84 903 112 233",
    age: 29,
    gender: "Female",
    notes: "Bring ECG results from last Monday.",
  },
  {
    id: "4",
    patient: "Carlos Mendez",
    initials: "CM",
    avatarColor: "amber",
    reason: "Annual heart check",
    date: "2026-05-18",
    time: "15:30",
    duration: 60,
    status: "pending",
    phone: "+84 918 765 432",
    age: 47,
    gender: "Male",
  },
  {
    id: "5",
    patient: "Linh Nguyen",
    initials: "LN",
    avatarColor: "rose",
    reason: "Blood pressure monitoring",
    date: "2026-05-19",
    time: "08:30",
    duration: 20,
    status: "confirmed",
    phone: "+84 901 234 567",
    age: 61,
    gender: "Female",
  },
  {
    id: "6",
    patient: "David Park",
    initials: "DP",
    avatarColor: "teal",
    reason: "Post-surgery follow-up",
    date: "2026-05-19",
    time: "11:00",
    duration: 30,
    status: "completed",
    phone: "+84 907 654 321",
    age: 43,
    gender: "Male",
    notes: "Recovery progressing well. Sutures removed.",
  },
  {
    id: "7",
    patient: "Maria Santos",
    initials: "MS",
    avatarColor: "amber",
    reason: "Medication adjustment",
    date: "2026-05-20",
    time: "09:30",
    duration: 20,
    status: "cancelled",
    phone: "+84 913 456 789",
    age: 55,
    gender: "Female",
  },
];
