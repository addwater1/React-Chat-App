import { Link } from "react-router-dom"

function Login() {
  return (
    <>
      <h1>Login to Chat Room</h1>
      <div>
        <label >Username</label>
        <input id="username" type="text" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input id="password" type="text" />
      </div>
      <div>
        <button>Login</button>
        <Link to="/signup">Signup now</Link>
      </div>
    </>
  )
}

export {Login}