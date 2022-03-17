/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-17 11:17:52
 * @LastEditTime: 2022-03-17 11:41:44
 */
import React from 'react'
import { Button } from "@mui/material";
import {message,useMessage} from '../.'

const TestOut = ()=>  {
  let i=10;
  const handleSend = () => message.info(`outerMsg-${i++}`)
  const handleDestroy=()=> message.destroy()
  return (
    <div>
    <div>outerFC</div>
    <Button variant='outlined' color='primary' onClick={handleSend}>
      sendMsgFromOuter
    </Button>
    <Button  variant='outlined' color='secondary' onClick={handleDestroy}>
      destroyMsgFromOuter
    </Button>
    </div>
  )
}

const TestIn = () =>{
  const message = useMessage()
  let i=10;
  const handleSend = () => message.info(`innerMsg-${i++}`)
  const handleDestroy=()=> message.destroy()
  return (
    <>
    <div>useHook</div>
    <Button variant='contained' color='primary' onClick={handleSend}>
      sendMsgFromInner
    </Button>
    <Button variant='contained' color='secondary' onClick={handleDestroy}>
      destroyMsgFromInner
    </Button>
    </>
  )
}

export {
  TestIn,
  TestOut
}