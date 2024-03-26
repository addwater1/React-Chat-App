import { createContext, useContext, useState } from "react";

//rewrite context provider
const ChatContext = createContext();

export default function ChatContextProvider({children}) {
  
  const [userInfo, setUserInfo] = useState({
    username: null,
    token: null,
    captchaId: null,
    isAuth: false
  });
  const [onlineUser, setOnlineUser] = useState([]);
  const [focusUser, setFocusUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageGroup, setMessageGroup] = useState([]);

  return (
    <ChatContext.Provider value={{
      userInfo,
      setUserInfo,
      onlineUser,
      setOnlineUser,
      focusUser,
      setFocusUser,
      message,
      setMessage,
      messageGroup,
      setMessageGroup
    }}
    >
      {children}
    </ChatContext.Provider>  
  )
}

export function ChatState() {
  return useContext(ChatContext)
}