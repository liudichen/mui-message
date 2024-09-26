import { createContext } from "react";

import type { MessageContext } from "./interface";

export const MessageBoxContext = createContext<MessageContext>(undefined);
