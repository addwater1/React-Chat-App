
function ChatContainer({sendMessage, changeMessage, disconnect, connect, messageGroup, subscribe}) {

  return (
    <>
      <div className="chat-container">
        <div className="chat-title">Chat Room</div>
        <div className="conversation-container">
          {/* <div className="recived-msg">Hello</div>
          <div className="sent-msg">Hi</div>
          <div className="notice">wpj Join the Group</div> */}
          {messageGroup.map((_) => (
            <div className="sent-msg" key={_.id}>{_.message}</div>
          ))}
        </div>
        <div className="msg-input">
          <textarea cols="70" rows="2" onChange={changeMessage}></textarea>
          <button onClick={connect}>Connect</button>
          <button onClick={sendMessage}>Send</button>
          <button onClick={disconnect}>Disconnect</button>
          <button onClick={subscribe}>Subscribe</button>
        </div>
      </div>
    </>
  )
}

export default ChatContainer