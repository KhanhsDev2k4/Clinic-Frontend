import useSWR, { useSWRConfig } from "swr";
import { FILTER_ALL_VALUE, TYPE_OF_FILTER_ALL_VALUE } from "@/hooks/global";
import { INVOICE_FILTER_KEY, INVOICE_FORCE_REFRESH_KEY } from "@/hooks";
import { INVOICE_STATUS } from "@/common";
import { set } from "date-fns";

const DEFAULT_FILTER: InvoiceFilterFormValues = {
  keyword: "",
  status: FILTER_ALL_VALUE as any,
  date: {
    from: set(new Date(), { hours: 0, minutes: 0, seconds: 0, date: new Date().getDate() - 7 }),
    to: set(new Date(), {
      hours: 23,
      minutes: 59,
      seconds: 59,
      date: new Date().getDate() + 7,
    }),
  },
};

export interface InvoiceFilterFormValues {
  keyword?: string;
  status?: INVOICE_STATUS | TYPE_OF_FILTER_ALL_VALUE;
  date?: {
    from: Date;
    to: Date;
  };
}
export function useFilterInvoiceData() {
  const { data, mutate } = useSWR<InvoiceFilterFormValues>(INVOICE_FILTER_KEY, null, {
    fallbackData: DEFAULT_FILTER,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const mutateData = (partial: Partial<InvoiceFilterFormValues>) => {
    mutate({ ...data, ...partial });
  };

  return { data: data ?? DEFAULT_FILTER, mutateData };
}

// ─── useForceRefreshInvoices ──────────────────────────────────────────────────

export function useForceRefreshInvoices() {
  const { mutate } = useSWRConfig();

  const { data: swr } = useSWR<{ ts: number } | null>(INVOICE_FORCE_REFRESH_KEY, null, {
    fallbackData: null,
  });

  const triggerRefresh = () => {
    mutate(INVOICE_FORCE_REFRESH_KEY, { ts: Date.now() }, false);
  };

  const clearForce = () => {
    mutate(INVOICE_FORCE_REFRESH_KEY, null, false);
  };

  return { swr, triggerRefresh, clearForce };
}
