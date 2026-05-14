"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";

import { Loader2 } from "lucide-react";
import Header from "@/components/Header";

const FullscreenLoader = () => (
  <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background">
    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
  </div>
);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { refresh, saveRedirectPath } = useAuth();
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await refresh();
        if (!isAuthenticated) {
          saveRedirectPath(pathname);
          router.replace("/auth/login");
        }
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, []);

  return initializing ? <FullscreenLoader /> : <>{children}</>;
};

export default SessionProvider;
