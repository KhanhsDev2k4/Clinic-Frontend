import { mutate } from "swr";

export type AuthErrorType = "unauthenticated" | "access-denied" | null;

const SWR_KEY = "/ui/auth-error";

export interface AuthDialogState {
  type: AuthErrorType;
  open: boolean;
}

const DEFAULT_STATE: AuthDialogState = {
  type: null,
  open: false,
};

export const showUnauthenticatedDialog = () =>
  mutate(SWR_KEY, { type: "unauthenticated", open: true } satisfies AuthDialogState, false);

export const showAccessDeniedDialog = () =>
  mutate(SWR_KEY, { type: "access-denied", open: true } satisfies AuthDialogState, false);

export const closeAuthDialog = () =>
  mutate(
    SWR_KEY,
    (prev: AuthDialogState | undefined) => ({ ...(prev ?? DEFAULT_STATE), open: false }),
    false
  );

import useSWR from "swr";

export function useAuthDialog() {
  const { data: state = DEFAULT_STATE } = useSWR<AuthDialogState>(SWR_KEY, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  return {
    ...state,
    showUnauthenticated: showUnauthenticatedDialog,
    showAccessDenied: showAccessDeniedDialog,
    close: closeAuthDialog,
  };
}
