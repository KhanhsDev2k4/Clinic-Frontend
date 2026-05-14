"use client";

import { SWRConfig } from "swr";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { AuthErrorDialog } from "@/components/AuthErrorDialog";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
      <Toaster position="bottom-right" />
      <Header />
      <AuthErrorDialog />
      {children}
    </SWRConfig>
  );
};

export default ClientProvider;
