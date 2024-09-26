import { createRef, type FC } from "react";
import { SnackbarProvider, SnackbarKey, SnackbarMessage } from "notistack";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useMessage } from "./useMessage";
import { MessageProvider } from "./MessageProvider";
import type { MessageContext, MessageBoxProps, MessageOptions } from "./interface";

const messageRef = createRef<MessageContext>();

const message = (message: SnackbarMessage, option?: MessageOptions) =>
  messageRef.current?.enqueueSnackbar(message, { variant: "default", ...(option || {}) });

const info = (message: SnackbarMessage, option?: MessageOptions) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "info" });

const warning = (message: SnackbarMessage, option?: MessageOptions) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "warning" });

const success = (message: SnackbarMessage, option?: MessageOptions) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "success" });

const error = (message: SnackbarMessage, option?: MessageOptions) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "error" });

const destroy = () => messageRef.current?.closeSnackbar();

message.info = info;
message.success = success;
message.warning = warning;
message.error = error;
message.destroy = destroy;

const defaultProps = {
  maxSnack: 3,
  autoHideDuration: 2000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  action: (key?: SnackbarKey) => {
    return (
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => {
          messageRef.current?.closeSnackbar(key);
        }}
      >
        <CloseIcon style={{ fontSize: "20px" }} />
      </IconButton>
    );
  },
};

const MessageBox: FC<MessageBoxProps> = (props: MessageBoxProps) => {
  const { children, dense, responsive = true, breakpoint = "md", ...restProps } = props;
  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  return (
    // @ts-ignore
    <SnackbarProvider
      dense={dense ?? (responsive ? down : undefined)}
      {...defaultProps}
      {...restProps}
      ref={messageRef as any}
    >
      <MessageProvider message={message}>{children}</MessageProvider>
    </SnackbarProvider>
  );
};

export { messageRef, message, MessageBox, type MessageBoxProps, type MessageOptions, useMessage };
