// hooks/useChatActions.ts
"use client";

import { useCallback } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";
import { TypingPayloadDto } from "@/hooks/useChatMessages";
import { MESSAGE_TYPE } from "@/common";

export interface CreateMessageDto {
  conversationId: string;
  content: string;
  type?: MESSAGE_TYPE;
}

export function useChatActions() {
  const { stompClient } = useSocket();

  const { data } = useCurrentProfile();

  const sendMessage = useCallback(
    (conversationId: string, payload: CreateMessageDto) => {
      stompClient?.publish({
        destination: `/app/chat/conversation/${conversationId}`,
        body: JSON.stringify(payload),
      });
    },
    [stompClient]
  );

  const sendTyping = useCallback(
    (conversationId: string, typing: boolean) => {
      const destination = `/app/typing/conversation/${conversationId}`;
      const body: TypingPayloadDto = {
        userId: data?.body?.id ?? "",
        typing,
      };

      stompClient?.publish({
        destination,
        body: JSON.stringify(body),
      });
    },
    [stompClient]
  );

  const markAsRead = useCallback(
    (messageId: string) => {
      stompClient?.publish({
        destination: `/app/read/${messageId}`,
        body: JSON.stringify({}),
      });
    },
    [stompClient]
  );

  return { sendMessage, sendTyping, markAsRead };
}
