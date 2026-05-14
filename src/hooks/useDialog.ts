import { useState } from "react";

interface DialogContext<T> {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  data?: T;
}

const useDialog = <T = Record<string, unknown>>() => {
  const [dialogContext, setDialogContext] = useState<DialogContext<T>>({});

  const openDialog = (data?: T) => {
    setDialogContext({ open: true, data });
  };

  const closeDialog = () => {
    setDialogContext({ open: false, data: undefined });
  };

  const onOpenChange = (open: boolean) => {
    setDialogContext((prev) => ({ ...prev, open }));
  };

  return {
    open: dialogContext.open,
    data: dialogContext.data,
    openDialog,
    closeDialog,
    onOpenChange,
  };
};

export default useDialog;
