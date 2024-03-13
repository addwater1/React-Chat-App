import { Navigate } from "react-router-dom"

function RequireAuth({isAuth, children}) {
  if(isAuth === true) {
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