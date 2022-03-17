/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-15 22:13:45
 * @LastEditTime: 2022-03-17 11:38:15
 */
// import 'react-app-polyfill/ie11';
import { Divider } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageBox } from '../.';
import {TestIn, TestOut} from './TestC'

const App = () => {
  return (
    <div>      
      <MessageBox autoHideDuration={5000}>
        <TestIn />
      </MessageBox>
      <Divider />
      <TestOut />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
