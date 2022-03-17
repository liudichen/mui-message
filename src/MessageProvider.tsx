/*
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-17 10:32:01
 * @LastEditTime: 2022-03-17 10:38:56
 */
import * as React from 'react'
import MessageContext from './MessageContext'

// @ts-ignore
const MessageProvider= ({message,children})  => {
  return (
    <MessageContext.Provider value={message} >
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider;