import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import RequireAuth from './routes/RequireAuth'
import Test from './components/UserManagement/UserManagement'
import ChatContextProvider from './components/Contexts'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import StompContainer from './components/chat/StompContainer'
import SuccessPage from './components/SuccessPage'
import ErrorPage from './components/ErrorPage'
import UserManagement from './components/UserManagement/UserManagement'

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
    element: <RequireAuth children={<StompContainer />} role={"USER"} />
  },
  {
    path: "success",
    element: <SuccessPage />
  },
  {
    path: "management",
    element: <RequireAuth children={<UserManagement />} role={"ADMIN"} />
  },
  {
    path: "test",
    element: <Test />
    // element: <StompContainer />
  }
])

function App() {

  return (
    <>
      <ChakraProvider>
        <ChatContextProvider children={<RouterProvider router={router} />} />
      </ChakraProvider>
    </>
  )
}

export default App