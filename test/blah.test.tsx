/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-15 22:13:45
 * @LastEditTime: 2022-03-17 11:45:58
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MessageBox } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageBox />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
