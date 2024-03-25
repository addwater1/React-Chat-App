import { useCallback, useContext, useEffect, useState } from "react"
import ChatContainer from "./ChatContainer"
import ConversationList from "./ConversationList"
import { Client } from "@stomp/stompjs"
import { FocusUserContext, MessageContext, MessageGroupContext, OnlineUserContext, UserContext } from "./Contexts"
import axios from "axios"
import localforage from "localforage"

function MainContainer() {
  const [onlineUser, setOnlineUser] = useState([])
  const [focusUser, setFocusUser] = useState("")
  const [message, setMessage] = useState("")
  const [messageGroup, setMessageGroup] = useState([])
  const {user, setUser} = useContext(UserContext)
  const [receive, setReceive] = useState(null)

  const stompConfig = {
    connectHeaders: {
      login: user.username
    },
    brokerURL: "ws://localhost:8080/websocket",
    debug: (info) => {
      console.log(info)
    },
    reconnectDelay: 1000,
    onConnect: (frame) => {
      console.log(frame.body)
      stompClient.subscribe("/topic/greetings", onMessage)
      stompClient.subscribe(`/user/${user.username}/queue`, onMessage)
      stompClient.subscribe("/topic/connect", onSynchronize)

      axios.get("http://localhost:8080/user/online")
      .then(res => {
        // console.log(res.data)
        setOnlineUser(res.data)
      })
      .catch(err => {
        console.log(err.data)
      })
    }
  }
  const [stompClient, setStompClient] = useState(() => new Client(stompConfig))

  useEffect(() => {
    stompClient.activate()
    
    return () => {
      stompClient.deactivate()
    }
  }, [stompClient])

  useEffect(() => {
    if(receive === null)
      return
    
    localforage.getItem(receive.from)
      .then(value => {
        value = value === null ? [] : value;
        localforage.setItem(receive.from, [...value, receive])
        if(receive.from === focusUser) {
          setMessageGroup(messageGroup => [...messageGroup, receive])
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [receive])

  useEffect(() => {
    localforage.config({
      storeName: user.username
    })
  }, [])

  function sendToAll() {
    stompClient.publish({
      destination: "/app/hello",
      body: focusUser
    })
  }

  function sendToUser() {
    if(!stompClient.connected)
      return
    const stompBody = {
      'from': user.username,
      'to': focusUser,
      'message': message
    }
    stompClient.publish({
      destination: "/app/specific",
      body: JSON.stringify(stompBody)
    })
    if(user.username === focusUser)
      return
    localforage.setItem(focusUser, [...messageGroup, stompBody])
    setMessageGroup(messageGroup => [...messageGroup, stompBody])
  }

  function onMessage(frame) {
    setReceive(JSON.parse(frame.body))
  }

  function onSynchronize(frame) {
    setOnlineUser(JSON.parse(frame.body))
  }

  return (
    <>
      <OnlineUserContext.Provider value={[onlineUser, setOnlineUser]}>
        <FocusUserContext.Provider value={[focusUser, setFocusUser]}>
          <MessageGroupContext.Provider value={[messageGroup, setMessageGroup]}>
            <MessageContext.Provider value={[message, setMessage]}>
              <div className="main-container">
                <ConversationList />
                <ChatContainer
                  sendToAll={sendToAll}
                  sendToUser={sendToUser}/>
              </div>
            </MessageContext.Provider>
          </MessageGroupContext.Provider>
        </FocusUserContext.Provider>
      </OnlineUserContext.Provider>
    </>
  )
}

export default MainContainer