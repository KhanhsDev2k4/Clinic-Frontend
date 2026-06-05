"use client";

import { ROLE_NAME } from "@/common";
import { AccessDenyDialog } from "@/components/AccessDenyDialog";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data } = useCurrentProfile();
  const user = data?.body;
  const isAdmin = user?.role === ROLE_NAME.ADMIN;

  return (
    <>
      {isAdmin ? children : null}
      <AccessDenyDialog open={!!user && !isAdmin} />
    </>
  );
}
