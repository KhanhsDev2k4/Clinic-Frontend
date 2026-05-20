"use client";

import { useSession } from "@/hooks/useSession";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSession();

  return children;
}
