import * as React from 'react';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { SnackbarProvider,useSnackbar } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import MessageContextConsumer from './MessageContextConsumer';


const messageRef = React.createRef();

const MessageBox = React.forwardRef((props,ref)=>{
  const { children, ...restProps } = props;
  React.useImperativeHandle(ref,() => messageRef.current);
  return (
    <SnackbarProvider
      { ...restProps }
    >
      <MessageContextConsumer ref={messageRef} />
      { children }
    </SnackbarProvider>
  );
})

MessageBox.defaultProps = {
  maxSnack:3,
  autoHideDuration: 2000,
  dense: isMobile,
  anchorOrigin:{
    vertical: 'top',
    horizontal: 'center',
  },
  action: (key) => {
    return (
        <IconButton key='close' aria-label='Close' color='inherit' onClick={() => {
          messageRef.current?.closeSnackbar(key);
        }}>
          <CloseIcon style={{ fontSize: '20px' }} />
        </IconButton>
    );
  },
};

MessageBox.propTypes = {
  /**
   * In fact,we do not need children at all.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Denser margins for snackbars. Recommended to be used on mobile devices.
   * @default isMobile exported from 'react-device-detect'
   */
  dense: PropTypes.bool,
  /**
   * Maximum snackbars that can be stacked on top of one another.
   * @default 3
   */
  maxSnack: PropTypes.number,
  /**
   * Hides iconVariant if set to `true`.
   * @default false
   */
  hideIconVariant: PropTypes.bool,
  /**
   * Valid and exist HTML Node element, used to target `ReactDOM.createPortal`
   */
  domRoot: PropTypes.elementType,
  /**
   * Override or extend the styles applied to the container component or Snackbars.
   */
  classes:PropTypes.object,
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.oneOfType([PropTypes.node,PropTypes.func]),
  /**
   * The anchor of the `Snackbar`.
   * On smaller screens, the component grows to occupy all the available width,
   * the horizontal alignment is ignored.
   * @default { vertical: 'top', horizontal: 'center' }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default 2000
   */
  autoHideDuration: PropTypes.number,
  /**
   * Props applied to the `ClickAwayListener` element.
   */
  ClickAwayListenerProps: PropTypes.object,  
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` property isn't specified, it does nothing.
   * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
   * we use the default value.
   * @default autoHideDuration / 2 ms.
   */
  resumeHideDuration:PropTypes.number,
  /**
   * The component used for the transition. (e.g. Slide, Grow, Zoom, etc.)
   * @default Slide
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: 225,
   *   exit: 195,
   * }
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),    
  ]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,
  /**
   * Callback fired before snackbar requests to get closed. The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the transition is entering.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the transition has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the transition is entering
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired before the transition is exiting
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the transition has exited
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the transition is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * Ignores displaying multiple snackbars with the same `message`
   * @default false
   */
  preventDuplicate: PropTypes.bool,
  /**
   * Used to easily display different variant of snackbars. When passed to `SnackbarProvider` all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
   * @default default
   */
  variant: PropTypes.oneOf(['default','error','warning','success','info']),
};

const sendMsg = (ref, variant) => (msg, option = {}) => {
  ref.current?.enqueueSnackbar(msg, variant ? { ...option, variant } : { variant: 'default', ...option });
};
const destroyMsg = (ref) => () => ref.current?.closeSnackbar();

const message = sendMsg(messageRef);

message.info = sendMsg(messageRef, 'info');
message.success = sendMsg(messageRef, 'success');
message.warning = sendMsg(messageRef, 'warning');
message.error = sendMsg(messageRef, 'error');
message.destroy = destroyMsg(messageRef);

export {
  messageRef,
  message,
  MessageBox,
  useSnackbar,
};