// hooks/useConversation.ts
"use client";

import useSWRSubscription, { SWRSubscriptionOptions } from "swr/subscription";
import { IMessage } from "@stomp/stompjs";
import { MessageResponse } from "@/interface/response";
import { createStompClient } from "@/hooks/socket";
import { useSession } from "@/hooks/useSession";
import { useSocket } from "@/hooks/useSocket";
import { useCurrentProfile } from "@/hooks/auth/useCurrentProfile";

export interface TypingPayloadDto {
  userId: string;
  typing: boolean;
}

export interface ReadReceiptDto {
  messageId: string;
  userId: string;
}

export function useConversationMessages(conversationId: string) {
  const { accessToken } = useSession();
  const { stompClient } = useSocket();

  return useSWRSubscription(
    [`/topic/chat/conversation/${conversationId}`, accessToken],
    (
      [destination]: [string, string],
      { next }: SWRSubscriptionOptions<MessageResponse[], Error>
    ) => {
      const subscription = stompClient?.subscribe(destination, (msg: IMessage) => {
        const newMsg: MessageResponse = JSON.parse(msg.body);
        next(null, (cur = []) => [...cur, newMsg]);
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  );
}

export function useTypingIndicator(conversationId: string) {
  const { accessToken } = useSession();
  const { stompClient } = useSocket();
  const { data } = useCurrentProfile();
  const existId = data?.body?.id;

  return useSWRSubscription(
    [`/topic/typing/conversation/${conversationId}`, accessToken],
    ([destination]: [string, string], { next }: SWRSubscriptionOptions<Set<string>, Error>) => {
      const subscription = stompClient?.subscribe(destination, (msg: IMessage) => {
        const payload: TypingPayloadDto = JSON.parse(msg.body);

        next(null, (cur = new Set()) => {
          const updated = new Set(cur);
          if (payload.userId === existId) return updated;
          payload.typing ? updated.add(payload.userId) : updated.delete(payload.userId);
          return updated;
        });
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  );
}

export function useReadReceipt(messageId: string) {
  const { accessToken } = useSession();

  return useSWRSubscription(
    [`/topic/message/${messageId}/read`, accessToken],
    (
      [destination, tkn]: [string, string],
      { next }: SWRSubscriptionOptions<ReadReceiptDto[], Error>
    ) => {
      const client = createStompClient(tkn);

      client.onConnect = () => {
        client.subscribe(destination, (msg: IMessage) => {
          const receipt: ReadReceiptDto = JSON.parse(msg.body);
          next(null, (cur = []) => [...cur, receipt]);
        });
      };

      client.activate();
      return () => client.deactivate();
    }
  );
}
