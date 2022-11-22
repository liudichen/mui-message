# mui-message

[![NPM version](https://img.shields.io/npm/v/mui-message.svg?style=flat)](https://npmjs.org/package/mui-message)
[![NPM downloads](http://img.shields.io/npm/dm/mui-message.svg?style=flat)](https://npmjs.org/package/mui-message)

<div align="center">

  [English](https://github.com/liudichen/mui-message/blob/master/README.md) | 简体中文

</div>

使用MUI(@mui/material)时像antd一样方便地在应用里发送message（Snackbar消息）,而无需频繁使用hooks或创建Snackbar组件。

> 本来是直接在本地应用使用，基本没问题，所以打下包发布下，后面方便直接引用。TypeScript不会用,参考着其他包添加了下类型。可能会存在一些问题。

## 安装

`mui-message`依赖于[@mui/material(^5.0.0)](https://github.com/mui/material-ui)及[notistack(^2.0.3)](https://github.com/iamhosseindhv/notistack)，只是简单做了一点封装，改了一点默认props，相关props及`message`方法的第二个参数`option`可参考这2个库.或者直接查看[notistack的文档](https://iamhosseindhv.com/notistack/api).

基于hooks，所以需要`react`>=16.8.0.

采用如下命令安装:

```bash
npm i mui-message
```


## 使用

安装完毕后即可在项目里使用了，里面主要有4个导出的元素：`messageRef`、`message`、`MessageBox`、`useMessage`

其中`MessageBox`是封装好的`SnackbarProvider`及 `MessageProvider`组件，
该组件需要放置到项目的较高层级(建议放在路由外边)。虽然其支持children，但实际可以不需要将其他组件作为它的子组件。如果其他组件作为子组件，则可在子组件中使用`useMessage` hook，可以获取到`message`实例，该实例与从`mui-message`直接导出的 `message` 是一致的。

`message`及其子方法(`info`、`success`、`error`、`warning`)是发送消息的方法。
`message.destroy`方法可以用来销毁所有消息条。

也可以在此基础上进行一定的[自定义](##自定义)。如果需要使用消息实例，如自定义action时，可以利用[`messageRef`](##使用Ref)来获取。

**注意： 同一应用只需要使用一次MessageBox组件即可。**

使用时将MessageBox作为1个独立组件挂在较高层级即可，建议放在路由外层，这样就全局可以访问了.

如果你自定义了全局MUI主题，应该把该组件放在根`ThemeProvider`组件内部。

### 直接使用

在应用入口：

```javascript
// App.js
import React from 'react'
import { MessageBox } from 'mui-message';

const App = () => {
    return (
      <>
        <MessageBox />
        <Router>
          // 其他内容
        </Router>
      <>
    );
}
```

在需要发送消息的地方，可以这样使用：

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

  // or destroy all message:
  message.destroy();
}

```

### 使用useMessage Hook

在应用入口：

```javascript
// App.js
import React from 'react'
import { MessageBox } from 'mui-message';

const App = () => {
    return (
      <>
        <MessageBox >
        <Router>
          // 其他内容
        </Router>
        </MessageBox>
      <>
    );
}
```

在需要发送消息的地方(应处于`MessagBox`内部)，可以这样使用：

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

## 方法参数

`message`及`message.info`(及`error`/`warning`/`success`子方法)方法实际调用的是`notistack`里的`enqueueSnackbar`，`message.destroy`调用的是`closeSnackbar`，所以其参数完全相同.

`message`、`message.info`、`message.error`、`message.success`、`message.warning` 为生成一条snackbar消息的方法，如果当前总数量超出maxSnack数量，会进入队列。

接受2个参数：第1个参数为消息内容。第2个参数为可选的，可以用来指定`variant`、`anchorOrigin`(消息位置)、`autoHideDuration`(自动关闭等待时间)等参数。以上几个方法实际都只是指定了相应的`variant`，
其中`message`对应 variant='default'，其他方法为variant=其方法名：

```javascript
  // interface:
 (message: string | ReactNode, option?: OptionsObject) => SnackbarKey;

  // use:
  message('this is a variant=default message');
  message.info('this is a variant=info message and before autohide its duration is 5 seconds',{autoHideDuration:5000});
```

`message.destroy`方法无参数,可销毁所有snackbar消息：

```javascript
  // interface:
  () => void;

  // use:
  message.destroy();
```

`MessageBox`的props 及 `message`的option 可配置项见[下面](##Props及option).

## Props及option

MessageBox的props 及 message及其子方法的option参数与notistack相同,可以参考[notistack的文档](https://iamhosseindhv.com/notistack/api)。

### MessageBox默认props

`MessageBox`的默认props如下，你可以通过props传递进行覆盖。

```javascript
MessageBox.defaultProps = {
  maxSnack:3,
  autoHideDuration: 2000,
  dense: isMobile,  // 来自react-device-detect，用来判断是否为移动设备
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

### props及option可配置项

MessageBox及 message的option参数支持的props或配置项(除了responsive和breapoint，这2个是自定义的，只能用于props)均与notistack相同。

<details>
  <summary><b>可配置项部分如下：</b></summary>

```javascript
MessageBox.propTypes = {
  /** responsive for dense?根据宽度响应式设置dense属性?与breakpoint配合使用 
   * @default true
  */
  responsive: PropTypes.boolean,
  /** breakpoint of responsive for dense 
   * @default 'md'
  */
  breakpoint: Proptypes.oneOfType([
    PropTypes.oneOf(['xs' , 'sm' , 'md' , 'lg' , 'xl']),
    PropTypes.number,
  ]),
  /**
   * Denser margins for snackbars. Recommended to be used on mobile devices.
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


## 自定义

消息的默认配置可以直接通过给`MessageBox`组件传递相关props来直接配置:

### 通过MessagBox进行全局配置

通过MessageBox的props可以进行全局配置，如：

```javascript
  <MessageBox
    maxSnack={4}  // customize max count of messages that can show  at the same time
    { ...otherProps }
  />
```
如果需要使用SnackbarContext实例(比如自定义action时),可通过[`messageRef`](##使用Ref)获取。

### option临时配置

也可在使用message、message.info等方法的option临时配置一条消息.

```javascript
  message.error('something is error',{ autoHideDuration:5000, });
```

## 使用Ref

在需自定义`action` prop 等需要使用snackbar实例时可以通过导出的`messageRef`获取,可以获取到`closeSnackbar`、`enqueueSnackbar`等来自`notistack`的一些方法和属性:

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




