"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import { useSession } from "@/hooks/useSession";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { refresh, saveRedirectPath } = useAuth();
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      await refresh();
      if (!isAuthenticated) {
        saveRedirectPath(pathname);
        router.replace("/login");
      }
    };
    init();
  }, []);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Toaster position="top-right" />
      {children}
    </SWRConfig>
  );
};

export default ClientProvider;
