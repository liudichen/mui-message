import React from 'react';

import MessageContext from './MessageContext';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MessageProvider = ({ message, children }) => {
  return (
    <MessageContext.Provider value={message} >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
