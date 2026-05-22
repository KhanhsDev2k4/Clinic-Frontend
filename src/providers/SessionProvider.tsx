"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/hooks/useSession";
import { usePathname, useRouter } from "@/i18n/navigation";
import { clearSocketState, setSocketState, useSocket } from "@/hooks/useSocket";
import { createStompClient } from "@/hooks/socket";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { saveRedirectPath } = useAuth();
  const data = useSocket();
  const { isAuthenticated, accessToken } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const init = async () => {
      try {
        if (!isAuthenticated) {
          saveRedirectPath(pathname);
          router.replace("/auth/login");
        }
      } finally {
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      clearSocketState();
      return;
    }

    const client = createStompClient(accessToken, {
      onConnect: () => {
        setSocketState({ stompClient: client, ready: true, frame: null });
      },
      onDisconnect: () => {
        clearSocketState();
      },
      onStompError: (frame) => {
        setSocketState({ stompClient: null, ready: false, frame });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [accessToken]);

  return children;
};

export default SessionProvider;
