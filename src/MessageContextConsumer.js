/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-15 22:23:59
 * @LastEditTime: 2022-03-16 11:47:38
 */
import * as React from 'react';
import { useSnackbar } from 'notistack';

const MessageContextConsumer = React.forwardRef((props,ref)=>{
  const { enqueueSnackbar, closeSnackbar} = useSnackbar();
  React.useImperativeHandle(ref,() => ({
    enqueueSnackbar,
    closeSnackbar,
  }));
  return <></>;
});

export default MessageContextConsumer;