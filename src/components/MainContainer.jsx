import { useContext, useEffect, useState } from "react"
import ChatContainer from "./ChatContainer"
import ConversationList from "./ConversationList"
import { Client } from "@stomp/stompjs"
import { FocusUserContext, OnlineUserContext, UserContext } from "./Contexts"
import axios from "axios"

function MainContainer() {
  var [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [onlineUser, setOnlineUser] = useState([])
  const [focusUser, setFocusUser] = useState()
  var [messageGroup, setMessageGroup] = useState([])
  const {user, setUser} = useContext(UserContext)

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
        console.log(res.data)
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

  function changeMessage(e) {
    setMessage(e.target.value)
  }

  function sendToAll() {
    stompClient.publish({
      destination: "/app/hello",
      body: message
    })
  }

  function sendToUser(username) {
    stompClient.publish({
      destination: "/app/specific",
      body: JSON.stringify({
        'username': username,
        'message': message
      })
    })
  }

  function onMessage(frame) {
    index = index + 1
    messageGroup = [...messageGroup, {
      id: index,
      message: frame.body
    }]
    setMessageGroup(messageGroup)
    setIndex(index)
  }

  function onSynchronize(frame) {
    setOnlineUser(JSON.parse(frame.body))
    console.log(JSON.parse(frame.body))
  }

  return (
    <>
      <OnlineUserContext.Provider value={[onlineUser, setOnlineUser]}>
        <FocusUserContext.Provider value={[focusUser, setFocusUser]}>
          <div className="main-container">
            <ConversationList />
            <ChatContainer
              sendToAll={sendToAll}
              sendToUser={sendToUser}
              changeMessage={changeMessage}
              messageGroup={messageGroup}/>
          </div>
        </FocusUserContext.Provider>
      </OnlineUserContext.Provider>
    </>
  )
}

export default MainContainer