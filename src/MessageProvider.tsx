import type { ReactNode } from "react";

import { MessageBoxContext } from "./MessageContext";

export const MessageProvider = ({ message, children }: { children?: ReactNode; message: any }) => {
  return <MessageBoxContext.Provider value={message}>{children}</MessageBoxContext.Provider>;
};
