/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-17 10:35:41
 * @LastEditTime: 2022-03-17 10:36:50
 */
import { useContext } from "react";
import MessageContext from "./MessageContext";

const useMessage  = () => useContext(MessageContext);

export default  useMessage;