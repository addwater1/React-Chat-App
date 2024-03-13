import { Link, useNavigate } from "react-router-dom"
import { add } from "../components/MessageContainer"
import { useState } from "react"
import axios from "axios"

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  function loginTo() {
    axios.post(
      'http://localhost:8080/login',
      {
        username: username,
        password: password
      })
      .then((res) => {
        add(res.data)
        navigate('/profile')
      })
      .catch((error) => {
        add(error.response.data)
      })
  }

  return (
    <>
      <table>
        <caption>
          <h2>Welcome to Chat Room</h2>
        </caption>
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input id="username" type="text" onChange={e => setUsername(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input id="password" type="text" onChange={e => setPassword(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={loginTo}>Login</button>
              <Link to="/signup">Signup now</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Login