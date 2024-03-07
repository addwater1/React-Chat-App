import './App.css'
import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import MessageContainer from './components/MessageContainer'
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
    element: <Profile />
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
