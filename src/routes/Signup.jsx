import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { add } from "../components/MessageContainer"

const imgUrl = `${import.meta.env.VITE_API_URL}/captcha`

function Signup() {
  const [img, setImg] = useState(imgUrl)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [finalPwd, setFinalPwd] = useState('')

  function changeCode() {
    axios.get(
      imgUrl,
      {responseType: "blob"}
      )
      .then(res => {
        setImg([URL.createObjectURL(res.data)])
      })
      .catch((error) => {
        add(error.message)
      })
  }

  function signupHandler() {
    
  }

  return (
    <>
      <table>
        <caption>
          <h1>Sign up</h1>
        </caption>
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input type="text" name="" id="" onChange={e => setUsername(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input type="text" name="" id="" onChange={e => setPassword(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Confirm Password</td>
            <td>
              <input type="text" name="" id="" onChange={e => setFinalPwd(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td rowSpan={2}>Check Code</td>
            <td>
              <img src={img} alt="" style={{width: "160px", height: "90px"}} onClick={changeCode}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button disabled onClick={signupHandler}>Signup</button>
              <Link to="/">Login now</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Signup