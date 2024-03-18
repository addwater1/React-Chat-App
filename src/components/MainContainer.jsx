import { useContext, useEffect, useState } from "react"
import ChatContainer from "./ChatContainer"
import ConversationList from "./ConversationList"
import { Client } from "@stomp/stompjs"
import { OnlineUserContext, UserContext } from "./Contexts"
import axios from "axios"

function MainContainer() {
  var [index, setIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [sendTo, setSendTo] = useState('')
  const [onlineUser, setOnlineUser] = useState([])
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
    // stompClient.onConnect = (frame) => {
    //   console.log(frame.body)
    //   stompClient.subscribe("/topic/greetings", onMessage)
    //   stompClient.subscribe(`/user/${user.username}/queue`, onMessage)
    // }

    stompClient.activate()
    
    return () => {
      stompClient.deactivate()
    }
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

  function onSynchronize(frame) {
    let userList = JSON.parse(frame.body)
    setOnlineUser(userList)
    console.log(userList)
  }

  return (
    <>
      <OnlineUserContext.Provider value={[onlineUser, setOnlineUser]}>
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
      </OnlineUserContext.Provider>
    </>
  )
}

export default MainContainer