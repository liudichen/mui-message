/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-17 10:18:04
 * @LastEditTime: 2022-03-17 11:12:47
 */
import { ReactNode } from 'react';
import {OptionsObject, SnackbarMessage, SnackbarKey, SnackbarProviderProps } from 'notistack'

export interface MessageContext {
  enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject) => SnackbarKey;
  closeSnackbar: (key?: SnackbarKey) => void;
}

export interface MessageBoxProps extends Omit<SnackbarProviderProps, 'children'>{
  children?: ReactNode | ReactNode[]
}