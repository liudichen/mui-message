import type { ReactNode } from "react";
import type { OptionsObject, SnackbarMessage, SnackbarKey, SnackbarProviderProps } from "notistack";

export interface MessageContext {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
}

export interface MessageBoxProps extends Omit<SnackbarProviderProps, "children"> {
  /** responsive for dense?根据宽度响应式设置dense属性?与breakpoint配合使用 */
  responsive?: boolean;
  /** breakpoint of responsive for dense?
   * @default 'md'
   */
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  children?: ReactNode | ReactNode[];
}

export type MessageOptions = OptionsObject;
