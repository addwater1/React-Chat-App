import { useContext, useEffect, useRef } from "react"
import { FocusUserContext, MessageContext, MessageGroupContext } from "./Contexts"

function ChatContainer({sendToAll, sendToUser}) {
  const chatRef = useRef()
  const [messageGroup, setMessageGroup] = useContext(MessageGroupContext)
  const [focusUser, setFocusUser] = useContext(FocusUserContext)
  const [message, setMessage] = useContext(MessageContext)

  useEffect(() => {
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }, [messageGroup])

  return (
    <>
      <div className="chat-container">
        <div className="chat-title">Chat Room</div>
        <div className="conversation-container" ref={chatRef}>
          {messageGroup.map((i, index) => (
            <div className={i.from === focusUser ? "received-msg" : "sent-msg"} key={index}>{i.message}</div>
          ))}
        </div>
        <div className="msg-input">
          <textarea style={{width: "80%", height: "70%"}} 
            onChange={
              e => {
                setMessage(
                  e.target.value,
                )
              }
            }
          >
          </textarea>
          {/* <button style={{height: "70%"}} onClick={sendToAll}>Send To All</button> */}
          <button style={{height: "78%"}} onClick={() => {sendToUser()}}>Send</button>
        </div>
      </div>
    </>
  )
}

export default ChatContainer