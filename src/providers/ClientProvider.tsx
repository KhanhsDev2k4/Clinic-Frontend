"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import { useSession } from "@/hooks/useSession";

import { Loader2 } from "lucide-react";
import Header from "@/components/Header";

const FullscreenLoader = () => (
  <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background">
    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
  </div>
);

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
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
          router.replace("/login");
        }
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, []);

  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
      <Toaster position="top-right" />
      {initializing ? (
        <FullscreenLoader />
      ) : (
        <>
          <Header />
          {children}
        </>
      )}
    </SWRConfig>
  );
};

export default ClientProvider;
