import './App.css'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import MessageContainer from './components/MessageContainer'
import RequireAuth from './routes/RequireAuth'
import MainContainer from './components/MainContainer'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

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
    element: <RequireAuth children={<Profile />} isAuth={true} />,
  },
  {
    path: "chat",
    element: <MainContainer />
  }
])

function App() {
  return (
    <>
      <MessageContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App