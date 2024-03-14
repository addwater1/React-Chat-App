import { useContext, useEffect, useState } from "react"
import ChatContainer from "./ChatContainer"
import ConversationList from "./ConversationList"
import { Client } from "@stomp/stompjs"
import { UserContext } from "./Contexts"

const stompConfig = {
  connectHeaders: {},
  brokerURL: "ws://localhost:8080/websocket",
  debug: (info) => {
    console.log(info)
  },
  reconnectDelay: 1000,
}

function MainContainer() {
  var [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [sendTo, setSendTo] = useState('')
  var [messageGroup, setMessageGroup] = useState([])
  const [stompClient, setStompClient] = useState(() => new Client(stompConfig))
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    stompClient.onConnect = (frame) => {
      console.log(frame.body)
      stompClient.subscribe("/topic/greetings", onMessage)
      stompClient.subscribe(`/user/${user}/queue`, onMessage)
    }
    stompClient.activate()
  }, [stompClient])

  function changeMessage(e) {
    setMessage(e.target.value)
  }

  function changeUsername(m) {
    setMessage(m)
  }

  function changeSendTo(m) {
    setSendTo(m)
  }

  function sendToAll() {
    stompClient.publish({
      destination: "/app/hello",
      body: message
    })
  }

  function sendToUser() {
    stompClient.publish({
      destination: "/app/specific",
      body: JSON.stringify({
        'username': sendTo,
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

  return (
    <>
      <div className="main-container">
        <ConversationList 
          changeSendTo={changeSendTo}
          changeUsername={changeUsername}/>
        <ChatContainer
          sendToAll={sendToAll}
          sendToUser={sendToUser}
          changeMessage={changeMessage}
          messageGroup={messageGroup}/>
      </div>
    </>
  )
}

export default MainContainer