import { useContext, useEffect, useRef } from "react"
import { FocusUserContext } from "./Contexts"

function ChatContainer({sendToAll, sendToUser, changeMessage, messageGroup}) {
  const chatRef = useRef()
  useEffect(() => {
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messageGroup])
  const [focusUser, setFocusUser] = useContext(FocusUserContext)

  return (
    <>
      <div className="chat-container">
        <div className="chat-title">Chat Room</div>
        <div className="conversation-container" ref={chatRef}>
          {messageGroup.map((_) => (
            <div className="sent-msg" key={_.id}>{_.message}</div>
          ))}
        </div>
        <div className="msg-input">
          <textarea style={{width: "80%", height: "70%"}} onChange={changeMessage}></textarea>
          {/* <button style={{height: "70%"}} onClick={sendToAll}>Send To All</button> */}
          <button style={{height: "78%"}} onClick={() => {sendToUser(focusUser)}}>Send</button>
        </div>
      </div>
    </>
  )
}

export default ChatContainer