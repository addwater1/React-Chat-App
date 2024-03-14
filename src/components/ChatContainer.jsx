
function ChatContainer({sendToAll, sendToUser, changeMessage, messageGroup}) {

  return (
    <>
      <div className="chat-container">
        <div className="chat-title">Chat Room</div>
        <div className="conversation-container">
          {messageGroup.map((_) => (
            <div className="sent-msg" key={_.id}>{_.message}</div>
          ))}
        </div>
        <div className="msg-input">
          <textarea style={{width: "60%", height: "70%"}} onChange={changeMessage}></textarea>
          <button style={{height: "70%"}} onClick={sendToAll}>Send To All</button>
          <button style={{height: "70%"}} onClick={sendToUser}>Send To User</button>
        </div>
      </div>
    </>
  )
}

export default ChatContainer