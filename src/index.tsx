/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { SnackbarProvider, OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { MessageContext, MessageBoxProps } from "./interface";
import useMessage from "./useMessage";
import MessageProvider from "./MessageProvider";

const messageRef = React.createRef<MessageContext>();

const message = (message: SnackbarMessage, option?: OptionsObject) =>
  messageRef.current?.enqueueSnackbar(message, { variant: "default", ...(option || {}) });

const info = (message: SnackbarMessage, option?: OptionsObject) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "info" });

const warning = (message: SnackbarMessage, option?: OptionsObject) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "warning" });

const success = (message: SnackbarMessage, option?: OptionsObject) =>
  messageRef.current?.enqueueSnackbar(message, { ...(option || {}), variant: "success" });

const error = (message: SnackbarMessage, option?: OptionsObject) =>
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

const MessageBox: React.FC<MessageBoxProps> = (props: MessageBoxProps) => {
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

export { messageRef, message, MessageBox, MessageBoxProps, useMessage };
