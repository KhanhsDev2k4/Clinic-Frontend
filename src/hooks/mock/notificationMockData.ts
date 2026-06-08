import type { NotificationResponse } from "@/interface/response";

export const mockNotifications: NotificationResponse[] = [
  {
    id: "notif-appointment-booked",
    title: "Appointment booked",
    description: "Your cardiology appointment with Dr. Nguyen is confirmed for today at 10:30.",
    createdAt: "2026-06-08T08:45:00+07:00",
    isRead: false,
    type: "appointment_booked",
    href: "/patient/appointments",
  },
  {
    id: "notif-new-message",
    title: "New message",
    description: "Dr. Tran sent follow-up instructions for your recent consultation.",
    createdAt: "2026-06-08T07:55:00+07:00",
    isRead: false,
    type: "new_message",
    href: "/patient/messages",
  },
  {
    id: "notif-schedule-updated",
    title: "Doctor schedule updated",
    description: "Dr. Le opened additional dermatology slots this afternoon.",
    createdAt: "2026-06-07T16:20:00+07:00",
    isRead: false,
    type: "doctor_schedule_updated",
    href: "/doctors",
  },
  {
    id: "notif-appointment-cancelled",
    title: "Appointment cancelled",
    description: "A patient cancelled the 14:00 general consultation slot.",
    createdAt: "2026-06-07T10:15:00+07:00",
    isRead: true,
    type: "appointment_cancelled",
    href: "/staff/appointments",
  },
  {
    id: "notif-system-announcement",
    title: "System announcement",
    description: "Online invoice exports will be under maintenance tonight from 22:00.",
    createdAt: "2026-06-06T18:00:00+07:00",
    isRead: true,
    type: "system_announcement",
  },
];
