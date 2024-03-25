import { useContext } from "react"
import { ChatState, UserContext } from "../components/Contexts"

function RequireAuth({children}) {
  const {userInfo} = ChatState()
  if(userInfo.isAuth) {
    return (
      <>{children}</>
    )
  } else {
    return (
      <>
        <h1>Error</h1>
      </>
    )
  }
}

export default RequireAuth