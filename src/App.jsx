import Login from './routes/Login'
import Signup from './routes/Signup'
import Profile from './routes/Profile'
import MessageContainer from './components/MessageContainer'
import RequireAuth from './routes/RequireAuth'
import MainContainer from './components/MainContainer'
import Test from './routes/Test'
import ChatContextProvider, { UserContext } from './components/Contexts'
import MainContainer2 from './components/chat/MainContainer'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

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
    element: <RequireAuth children={<MainContainer2 />} />
  },
  {
    path: "test",
    // element: <Test />
    element: <MainContainer2 />
  }
])

function App() {
  const [user, setUser] = useState({
    username: null,
    token: null,
    captchaId: null,
    isAuth: false
  })

  return (
    <>
      <ChakraProvider>
        {/* <ChatContextProvider> */}
          <UserContext.Provider value={{user, setUser}}>
            {/* <MessageContainer /> */}
            <ChatContextProvider children={<RouterProvider router={router} />} />
          </UserContext.Provider>
        {/* </ChatContextProvider> */}
      </ChakraProvider>
    </>
  )
}

export default App