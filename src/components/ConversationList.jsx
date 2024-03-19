import { useContext, useState } from "react"
import { FocusUserContext, OnlineUserContext } from "./Contexts"

function ConversationList() {
  const [onlineUser, setOnlineUser] = useContext(OnlineUserContext)
  const [focusUser, setFocusUser] = useContext(FocusUserContext)  

  return (
    <>
      <div className="conversation-list">
        <div>
          {onlineUser.map(i => (
            <div key={i.key}>
              {i.value === focusUser ? 
                i.value : 
                <button onClick={() => {setFocusUser(i.value)}}>{i.value}</button>}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ConversationList