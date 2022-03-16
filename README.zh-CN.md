# mui-message

<div align="center">

  [English](https://github.com/liudichen/mui-message/blob/master/README.md) | 简体中文

</div>

使用MUI(@mui/material)时像antd一样方便地在应用里发送message（snackbar消息）,而无需频繁使用hooks或创建Snackbar组件。

> 本来是直接在本地应用使用，基本没问题，所以打下包发布下，后面方便直接引用，可能有一些问题，比如有时可能会报类似于一个组件实例出现多次的错误，但后面又没报了。Ts不会用,所以暂没没加类型。

## 安装

`mui-message`依赖于[@mui/material(^5.0.0)](https://github.com/mui/material-ui)及[notistack(^2.0.3)](https://github.com/iamhosseindhv/notistack)，只是简单做了一点封装，改了一点默认props，相关props可参考这2个库.

基于hooks，所以需要`react`>=16.8.0.

采用如下命令安装:

```bash
npm i mui-message
```


## 使用

安装完毕后即可在项目里使用了，里面主要有3个导出的元素：`messageRef`、`message`、`MessageBox`，另外还导出了来自notistack的hook：`useSnackbar`

其中`MessageBox`是封装好的`SnackbarProvider`及其消费者来提供snackbar消息的承载，
该组件放置到应用的较高层级(建议放在路由外边)。虽然其支持children，但实际可以不需要将其他组件作为它的子组件。不过如果其他组件作为子组件，则可在子组件中使用`useSnackbar` hook，但这样实际可以直接使用 `notistack`包 即可了。

`message`及其子方法是发送消息的方法。

也可以在此基础上进行一定的[自定义](###自定义)。如果需要使用消息实例，如自定义action时，可以利用`messageRef`来获取。

**注意： 同一应用只需要使用一次MessageBox实例即可。**

### 如何使用

将MessageBox作为1个独立组件挂在较高层级即可，建议放在路由外层，这样就全局可以访问了.

如果你自定义了MUI主题，应该把该组件放在Mui的`ThemeProvider`内部。

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

const someFuncOrComponents = () => {

  // send message like:
  message('some default snackbar message');
  message.info('some info snackbar message');
  message.error('some error snackbar message');
  message.success('some error snackbar message');
  message.warning('some warning snackbar message');

  // or destroy all message:
  message.destroy();
}

```

### 方法参数

message及message.info(及error/warning/success子方法)方法实际调用的是notistack里的enqueueSnackbar，message.destroy调用的是closeSnackbar，所以其参数完全相同.

```javascript
  // api: 
  function mesage (info,option={}){ }   //meesage.info/error/success/warning is as same as this.

  message('messageinfo');
  message.info('info xx')  // 其他子方法类似  
```
message及其子方法(除了destory)接受2个参数：第1个参数为消息内容。第2个参数为可选的，可以用来指定`variant`、`anchorOrigin`(消息位置)、`autoHideDuration`(自动关闭等待时间)等参数。message的子方法(除了destory)实际都只是指定了相应的`variant`.

MessageBox的props 及 message的option 可配置项见下面的 [props及option](##props及option)

message.destroy()不接受参数，直接销毁所有消息。

## props及option

### MessageBox默认props

`MessageBox`的默认props如下，你可以通过props传递进行覆盖。

```javascript
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
```

### props及option可配置项

MessageBox及 message的option参数支持的props或配置项均与notistack相同。

<details>
  <summary><b>可配置项部分如下：</b></summary>

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


### 自定义

消息的默认配置可以直接通过给`MessageBox`组件传递相关props来直接配置:

#### 通过MessagBox进行全局配置

通过MessageBox的props可以进行全局配置，该配置是

```javascript
  <MessageBox
    maxSnack={4}  // customize max count of messages that can show  at the same time
    { ...otherProps }
  />
```

#### option临时配置

也可在使用message、message.info等方法的option临时配置一条消息.

```javascript
  message.error('something is error',{ autoHideDuration:5000, });
```

#### Ref

在需自定义action等需要使用snackbar实例时可以通过导出的`messageRef`获取:

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

同时`MessagBox`也接受ref实例，可以使用自己的ref来自定义:

```javascript
  import { useRef } from 'react';
  import ( MessageBox ) from 'mui-message';
  

  const App = () => {
    const ref = useRef();
    const action = (key) => {
    return (
      <IconButton key='close' aria-label='Close' color='inherit' onClick={() => {
        ref.current?.closeSnackbar(key);
      }}>
        <CloseIcon style={{ fontSize: '20px' }} />
      </IconButton>
      );
    }
    return (
      <>
        <MessageBox
          ref={ref}
          action={action}
        />
        <RouterOrSomething>
          // app content
        </RouterOrSomething>
      </>
    )
  }

```





