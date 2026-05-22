"use client";
import useSWR, { mutate } from "swr";
import { SOCKET_INIT_SWR_KEY } from "@/hooks/index";
import { Client, IFrame } from "@stomp/stompjs";

export type SocketState = {
  stompClient: Client | null;
  ready: boolean | null;
  frame: IFrame | null;
};

export const SOCKET_INITIAL_STATE: SocketState = {
  stompClient: null,
  ready: false,
  frame: null,
};

export function setSocketState(state: SocketState) {
  mutate(SOCKET_INIT_SWR_KEY, state, {});
}

export function clearSocketState() {
  mutate(SOCKET_INIT_SWR_KEY, SOCKET_INITIAL_STATE, {});
}

export function useSocket() {
  const { data = SOCKET_INITIAL_STATE } = useSWR<SocketState>(SOCKET_INIT_SWR_KEY, null, {
    fallbackData: SOCKET_INITIAL_STATE,
  });

  return {
    ready: data.ready,
    stompClient: data.stompClient,
    frame: data.frame,
  };
}
