import { useContext, useEffect, useState } from "react"
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
  const [receive, setReceive] = useState("")

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

//   useEffect(() => {
//     if (focusUser === "") {
//       return
//     }
//     localforage.setItem(focusUser, messageGroup)
//     .then(() => {
//       console.log("success store")
//     })
//     .catch(() => {
//       console.log("failed store")
//     })
//   }, [messageGroup])

  useEffect(() => {
    if(receive !== ""){
      if(receive.from === focusUser) {
        localforage.getItem(receive.from)
          .then(value => {
            value = value === null ? [] : value;
            localforage.setItem(receive.from, [...value, receive])
            setMessageGroup(messageGroup => [...messageGroup, receive])
          })
      }
      else {
        localforage.getItem(receive.from)
          .then(value => {
            value = value === null ? [] : value;
            localforage.setItem(receive.from, [...value, receive])
          })
      }
    }
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
    stompClient.publish({
      destination: "/app/specific",
      body: JSON.stringify({
        'from': user.username,
        'to': focusUser,
        'message': message
      })
    })
  }

  function onMessage(frame) {
    // const tmp = JSON.parse(frame.body)
    setReceive(JSON.parse(frame.body))
    console.log(JSON.parse(frame.body))
    // setMessageGroup(messageGroup => [...messageGroup, tmp])

    // if(tmp.from === focusUser) {
    //   setMessageGroup(messageGroup => [...messageGroup, tmp])
    // }
    // localforage.getItem(tmp.from)
    //   .then(value => {
    //     value = value === null ? [] : value;
    //     localforage.setItem(tmp.from, [...value, tmp])
    //   })

    // localforage.setItem(tmp.from, tmp)
    // setMessageGroup([...messageGroup, frame.body])
    // console.log(messageGroup)
    // console.log(tmp)
  }

  function onSynchronize(frame) {
    setOnlineUser(JSON.parse(frame.body))
    // console.log(JSON.parse(frame.body))
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