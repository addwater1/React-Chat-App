import { ChatState } from "../components/Contexts"
import ErrorPage from "../components/ErrorPage"

function RequireAuth({children}) {
  const {userInfo} = ChatState()
  if(userInfo.isAuth) {
    return (
      children
    )
  } else {
    return (
      <ErrorPage />
    )
  }
}

export default RequireAuth