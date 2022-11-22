import { useContext } from 'react';

import MessageContext from './MessageContext';

const useMessage = () => useContext(MessageContext);

export default useMessage;
