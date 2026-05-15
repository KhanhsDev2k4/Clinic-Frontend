import { useState } from "react";

export interface PopupContext<T> {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  data?: T;
}

const usePopup = <T = Record<string, unknown>>() => {
  const [popupContext, setPopupContext] = useState<PopupContext<T>>({});

  const openPopup = (data?: T) => {
    setPopupContext({ open: true, data });
  };

  const closePopup = () => {
    setPopupContext({ open: false, data: undefined });
  };

  const onOpenChange = (open: boolean) => {
    setPopupContext((prev) => ({ ...prev, open }));
  };

  return {
    open: popupContext.open,
    data: popupContext.data,
    openPopup,
    closePopup,
    onOpenChange,
  };
};

export default usePopup;
