/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-15 22:13:45
 * @LastEditTime: 2022-03-15 23:48:03
 */
import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageBox } from '../.';

const App = () => {
  return (
    <div>      
      <MessageBox />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
