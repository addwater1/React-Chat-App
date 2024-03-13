import { useEffect, useState } from "react"
import ChatContainer from "./ChatContainer"
import ConversationList from "./ConversationList"
import { Client } from "@stomp/stompjs"

const username = "wpj"
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
  const [send2User, setSend2User] = useState('')
  var [messageGroup, setMessageGroup] = useState([])
  const [stompClient, setStompClient] = useState(() => new Client(stompConfig))

  useEffect(() => {
    stompClient.onConnect = (frame) => {
      console.log(frame)
      stompClient.subscribe("/topic/greetings", onMessage)
    }
    stompClient.activate()
  }, [stompClient])

  function changeMessage(e) {
    setMessage(e.target.value)
  }

  function changeUsername(e) {
    setSend2User(e.target.value)
  }

  function sendMessage() {
    stompClient.publish({
      destination: "/app/hello",
      body: message
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
    console.log(messageGroup)
  }

  function disconnect() {
    stompClient.deactivate()
  }

  function connect() {
    stompClient.activate()
  }

  function subscribe() {
    stompClient.subscribe("/topic/greetings", messageHandler)
  }

  return (
    <>
      <div className="main-container">
        <ConversationList 
          changeUsername={changeUsername}/>
        <ChatContainer
          sendMessage={sendMessage}
          changeMessage={changeMessage}
          disconnect={disconnect}
          connect={connect}
          subscribe={subscribe}
          messageGroup={messageGroup}/>
      </div>
    </>
  )
}

export default MainContainer