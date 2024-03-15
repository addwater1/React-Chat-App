import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import { add } from "../components/MessageContainer"
import { UserContext } from "../components/Contexts"

const imgUrl = `${import.meta.env.VITE_API_URL}/captcha`

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [finalPwd, setFinalPwd] = useState('')
  const [captcha, setCaptcha] = useState('')
  const navigate = useNavigate()
  const {user, setUser} = useContext(UserContext)
  const imgRef = useRef()
  useEffect(() => {
    changeCode()
  }, [])

  function changeCode() {
    if(user.captchaId !== null) {
      axios.get(
        `${import.meta.env.VITE_API_URL}/captcha/${user.captchaId}`,
        {responseType: "blob"}
        )
        .then(res => {
        //   setImg([URL.createObjectURL(res.data)])
          imgRef.current.src=URL.createObjectURL(res.data)
        })
    }
    else {
      axios.get(
        imgUrl,
        {responseType: "blob"}
        )
        .then(res => {
        //   setImg([URL.createObjectURL(res.data)])
          imgRef.current.src=URL.createObjectURL(res.data)
          setUser({
            ...user,
            captchaId: res.headers["captcha-uuid"]
          })
          console.log(res.headers["captcha-uuid"])
        })
        .catch((error) => {
          add(error.message)
        })
    }
    
  }

  function signupHandler() {
    if(isValid() === false) {
      add('Form is invalid')
      return 
    }
    axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        username: username,
        password: finalPwd,
        role: "user",
        captcha: captcha,
        captchaId: user.captchaId
      })
      .then(res => {
        add(res.data)
        navigate('/')
      })
      .catch(error => {
        changeCode()
        add(error.message)
      })
  }

  function isValid() {
    if(password !== finalPwd || password === '' || username === '' || finalPwd === '') {
      return false
    }
    return true
  }

  return (
    <>
      <table>
        <caption>
          <h2>Sign up</h2>
        </caption>
        <tbody>
          <tr>
            <td>Username</td>
            <td>
              <input type="text" onChange={e => setUsername(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <input type="text" onChange={e => setPassword(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td>Confirm Password</td>
            <td>
              <input type="text" onChange={e => setFinalPwd(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td rowSpan={2}>Check Code</td>
            <td>
              <img ref={imgRef} alt="" style={{width: "160px", height: "90px"}} onClick={changeCode}/>
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" onChange={e => setCaptcha(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <button onClick={signupHandler}>Signup</button>
              <Link to="/">Login now</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Signup