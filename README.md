# mui-message

<div align="center"> 

English | [简体中文](https://github.com/liudichen/mui-message/blob/master/README.zh-CN.md)
  
</div>

Send messages (Snackbar messages) as convenient as using antd([ant-design](https://github.com/ant-design/ant-design/)) when use MUI([@mui/material](https://github.com/mui/material-ui)), while without using hooks or creating SnackBar components frequently.

## Install

`mui-message` depends on [@mui/material (^ 5.0.0)](https://github.com/mui/material-ui) and [notistack (^ 2.0.3)](https://github.com/iamhosseindhv/notistack), just a little encapsulation and a little change in the default props. Refer to these two libraries for related props or the second parameter `option` message method and its sub method.Or directly view [documentation of notistack](https://iamhosseindhv.com/notistack/api).

Based on hooks，so need `react`>=16.8.0.

install:

```bash
npm i mui-message
```


## How to use

There are mainly four exported elements: ` messageRef`，`message`, `MessageBox` and a hook `useMessage`

`MessageBox` is the component encapsulated `snackbarprovider` and `MessageBoxProvider` .This component should be placed at a higher level of the application (It is recommended to put it outside the router). Although it supports children, there is no need to take other components as its sub components in fact. However, if it has sub components, you can use `useMessage` hook in the sub components to get a message instance which is as same as `message` that exported directly from `mui-message`.

`message` and its sub methods(`info`、`success`、`error`、`warning`) are the methods of sending messages.

You can also [customize](##Customize) on this basis. If you need to use the message instance, for example,you want to custom actions, you can use [`messageRef`](##Ref) to get it.

**Note: You only needs to use the MessageBox component once at one application.**

Just hang the MessageBox as an independent component at a higher level. It is recommended to put it on the outer layer of the router so that it can be accessed globally.

If you have customized the Mui theme globally, you should put the component inside root `ThemeProvider` component.

### Use directly

At the application entry:

```javascript
// App.js
import React from 'react'
import { MessageBox } from 'mui-message';

const App = () => {
    return (
      <>
        <MessageBox />
        <Router>
          // app content
        </Router>
      <>
    );
}
```

It can be used to send messages like this:

```javascript
// anywhere.js
import { message } from 'mui-message'

const AnyFuncOrComponent = () => {

  // send message like:
  message('some default snackbar message');
  message.info('some info snackbar message');
  message.error('some error snackbar message');
  message.success('some success snackbar message');
  message.warning('some warning snackbar message');

  // or destroy all messages:
  message.destroy();
}

```

### useMessage Hook

At the application entry:
```javascript
// App.js
import React from 'react'
import { MessageBox } from 'mui-message';

const App = () => {
    return (
      <>
        <MessageBox >
          <Router>
            // app content
          </Router>
        </MessageBox>
      <>
    );
}
```

In its sub components:

```javascript
// anyComponet inside MessageBox.js
import { useMessage } from 'mui-message'

const AnySubComponent = () => {
  const message = useMessage();
  // send message like:
  message('some default snackbar message');
  message.info('some info snackbar message');

  // or destroy all message:
  message.destroy();
}
```

## Method parameters

`message` and `message.info` (and .`error`/`warning`/`success` sub methods) method actually calls `enqueueSnackbar` in `notistack`,and `message.destroy` calls `closeSnackbar`, so its parameters are exactly the same as `notistack`.

`message`,`message.info`,`message.error`,`message.success` and `message.warning` are methods to generate a snackbar message.

They accept two parameters: the first parameter is the message content while the second parameter is optional and can be used to specify parameters such as `variant`,`anchorOrigin`(message location),`autoHideDuration`(automatic shutdown waiting time) and so on. In fact, above methods only specify the corresponding `variant`. That is, `message` corresponds to `variant` = `'default'`, and` variant` of other methods = its method name:

```javascript
  // interface:
 (message: string | ReactNode, option?: OptionsObject) => SnackbarKey;

  // use:
  message('this is a variant=default message');
  message.info('this is a variant=info message and before autohide its duration is 5 seconds',{autoHideDuration:5000});
```

`message.destroy` method has no parameters, and it can destroy all snackbar messages:

```javascript
  // interface:
  () => void;

  // use:
  message.destroy();
```

The configurable items of props of MessageBox and option of message methods are shown below: 

## Props and option

Props of `MessageBox`, option parameter of message and its sub methods are as same as those of notistack. You can refer to [documentation of notistack](https://iamhosseindhv.com/notistack/api)

### defaultProps of MessagBox

The default props of `MessageBox` are as follows. You can overwrite them by passing custom props to the `MessageBox` component.

```javascript
MessageBox.defaultProps = {
  maxSnack:3,
  autoHideDuration: 2000,
  dense: isMobile, // this is import from react-device-detect , to detect whether current device is a mobile device
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
```

### Configurable items of props or option

The props of MessageBox or configuration items of message (and its sub methods) supported by the option parameters  are the same as notistack.

<details>
  <summary><b>props or options items:</b></summary>

```javascript
MessageBox.propTypes = {
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
  classes: PropTypes.object,
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
```

</details>


## Customize

The default configuration of messages can be directly and globally configured by passing related props to the `MessageBox` component:

### Global configuration via MessengerBox props

Just like this:

```javascript
  <MessageBox
    maxSnack={4}  // customize max count of messages that can show  at the same time
   // { ...otherProps }
  />
```
If you need to use the SnackbarContext instance (for example, when customizing an action), you can get it through [`messageRef`](##Ref)

### Temporary configuration via option

Use message, message.info and other methods temporarily configure a message:

```javascript
  message.error('something is error',{ autoHideDuration:5000, });
```

## Ref

When want to customize `action` prop and use the SnackbarContext instance, you can get it through the exported `messageRef`.By it you can get methods and attributes from 'notistack', such as `closeSnackbar`、`enqueueSnackbar` :

```javascript
  import ( messageRef, MessagBox ) from 'mui-message'
  const action = (key) => {
    return (
        <IconButton key='close' aria-label='Close' color='inherit' onClick={() => {
          messageRef.current?.closeSnackbar(key);
        }}>
          <CloseIcon style={{ fontSize: '20px' }} />
        </IconButton>
    );
  };

  const App = () => {
    return (
      <>
        <MessageBox
          action={action}
        />
        <RouterOrSomething>
          // app content
        </RouterOrSomething>
      </>
    );
  };

```






