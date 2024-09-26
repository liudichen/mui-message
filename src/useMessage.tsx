import { useContext } from "react";

import { MessageBoxContext } from "./MessageContext";

export const useMessage = () => useContext(MessageBoxContext);
