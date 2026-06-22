import { getInternalApiBaseUrl } from "@/lib/server-api";
import { Client, StompConfig } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function createStompClient(token: string, config?: StompConfig): Client {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/ws-sockjs`;

  return new Client({
    webSocketFactory: () => new SockJS(url),
    connectHeaders: { Authorization: `Bearer ${token}` },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    ...config,
  });
}
