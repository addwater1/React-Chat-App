import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useState } from "react";
import { ChatState } from "../Contexts";

const stompContext = createContext();

export default function StompProvider({children}) {
  const {userInfo} = ChatState()
  const [connected, setConnected] = useState(false);
  const stompConfig = {
    connectHeaders: {
      login: userInfo.username
    },
    brokerURL: "ws://localhost:8080/websocket",
    debug: (info) => {
      console.log(info)
    },
    reconnectDelay: 1000,
    onConnect: (frame) => {
      console.log(frame.body)
      setConnected(true)
    }
  }
  const [stompClient, setStompClient] = useState(() => new Client(stompConfig))
  
  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    }
  }, [stompClient]);

  return (
    <stompContext.Provider value={{stompClient, connected}}>
      {children}
    </stompContext.Provider>
  )
}

export function StompState() {
  return useContext(stompContext);
}