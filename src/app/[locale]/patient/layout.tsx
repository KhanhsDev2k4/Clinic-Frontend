"use client";

import { useSession } from "@/hooks/useSession";
import { ROLE_NAME } from "@/common";
import { AccessDenyDialog } from "@/components/AccessDenyDialog";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useSession();

  const isPatient = user?.role === ROLE_NAME.PATIENT;

  return (
    <>
      {isPatient ? children : null}
      <AccessDenyDialog open={!!user && !isPatient} />
    </>
  );
}
