import { useNavigate } from "react-router-dom"
import { add } from "../components/MessageContainer"
import { useContext, useState } from "react"
import axios from "axios"
import { ChatState, UserContext } from "../components/Contexts"
import Signup from "./Signup"
import { 
  Button, 
  Container, 
  FormControl, 
  FormLabel, 
  GridItem, 
  Heading, 
  Input, 
  SimpleGrid, 
  Tab, 
  Tabs,
  TabList,
  TabPanels,
  TabPanel} from "@chakra-ui/react"

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const {userInfo, setUserInfo} = ChatState()

  function loginTo() {
    axios.post(
      'http://localhost:8080/login',
      {
        username: username,
        password: password
      })
      .then((res) => {
        console.log(`Welcome ${res.data.username}`)
        setUserInfo({
          ...userInfo,
          username: res.data.username,
          token: res.data.token,
          isAuth: true
        })
        navigate('/chat')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <SimpleGrid spacing={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input onChange={e => setUsername(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={e => setPassword(e.target.value)}/>
          </FormControl>
        </GridItem>
        <GridItem>
          <Button w={"full"} onClick={loginTo}>Login</Button>
        </GridItem>
      </SimpleGrid>
    </>
  )
}

function LoginContainer() {
  return (<>
    <Container>
      <SimpleGrid spacing={7}>
        <GridItem>
          <Heading>
            Welcome
          </Heading>
        </GridItem>
        <GridItem>
          <Tabs isFitted>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login/>
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        
      </SimpleGrid>
    </Container>
  </>)
}

export default LoginContainer