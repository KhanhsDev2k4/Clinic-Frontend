"use client";

import SessionProvider from "@/providers/SessionProvider";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
