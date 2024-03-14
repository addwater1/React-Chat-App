import './App.css'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import MessageContainer from './components/MessageContainer'
import RequireAuth from './routes/RequireAuth'
import MainContainer from './components/MainContainer'
import { UserContext } from './components/Contexts'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { useState } from 'react'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "signup",
    element: <Signup />
  },
  {
    path: "profile",
    element: <RequireAuth children={<Profile />} />,
  },
  {
    path: "chat",
    element: <RequireAuth children={<MainContainer />} />
  }
])

function App() {
  const [user, setUser] = useState({
    username: "",
    token: "",
    captcha_uuid: ""
  })

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <MessageContainer />
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  )
}

export default App