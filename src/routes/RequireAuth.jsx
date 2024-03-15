import { useContext } from "react"
import { UserContext } from "../components/Contexts"

function RequireAuth({children}) {
  const {user, setUser} = useContext(UserContext)
  if(user.isAuth) {
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