import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import RequireAuth from './routes/RequireAuth'
import Test from './routes/Test'
import ChatContextProvider from './components/Contexts'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import StompContainer from './components/chat/StompContainer'
import SuccessPage from './components/SuccessPage'
import ErrorPage from './components/ErrorPage'

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
    element: <RequireAuth children={<StompContainer />} />
  },
  {
    path: "success",
    element: <SuccessPage />
  },
  {
    path: "test",
    // element: <Test />
    element: <ErrorPage />
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