import { useContext, useEffect } from "react"
import { FocusUserContext, MessageGroupContext, OnlineUserContext, UserContext } from "./Contexts"
import localforage from "localforage"

function ConversationList() {
  const [onlineUser, setOnlineUser] = useContext(OnlineUserContext)
  const [focusUser, setFocusUser] = useContext(FocusUserContext)  
  const [messageContext, setMessageGroup] = useContext(MessageGroupContext)
  const {user, setUser} = useContext(UserContext)
  useEffect(() => {
    if(focusUser === "") {
      return
    }
    localforage.getItem(focusUser)
      .then(value => {
        if (value === null){
          setMessageGroup([]);
          return
        }
        setMessageGroup(value)
        // console.log(value);
      })
  }, [focusUser])

  useEffect(() => {
    localforage.config({
      storeName: user.username
    })
  }, [])

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