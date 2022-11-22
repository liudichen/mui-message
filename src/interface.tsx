import { OptionsObject, SnackbarMessage, SnackbarKey, SnackbarProviderProps } from 'notistack';

export interface MessageContext {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
}

export interface MessageBoxProps extends SnackbarProviderProps {
  /** responsive for dense?根据宽度响应式设置dense属性?与breakpoint配合使用 */
  responsive?: boolean,
  /** breakpoint of responsive for dense? */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number,
}
