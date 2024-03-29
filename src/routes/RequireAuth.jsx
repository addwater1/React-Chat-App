import { ChatState } from "../components/Contexts"
import ErrorPage from "../components/ErrorPage"

function RequireAuth({children, role}) {
  const {userInfo} = ChatState()
  if(userInfo.role === role) {
    return (
      children
    )
  }
  else {
    return (
      <ErrorPage />
    )
  }
}

export default RequireAuth