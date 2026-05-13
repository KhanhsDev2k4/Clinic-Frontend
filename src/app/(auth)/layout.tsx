// app/auth/layout.tsx — đã login thì đẩy ra
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/useSession";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/");
  }, [isAuthenticated]);

  return <>{children}</>;
}
