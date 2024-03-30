import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ChatState } from "../components/Contexts"
import Signup from "./Signup"
import { loginRequest } from "../api/user"
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
  TabPanel,
  Center,
  useToast
} from "@chakra-ui/react"

function Login() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = ChatState()
  const toast = useToast()

  async function login() {
    const loginData = {
      username: username,
      password: password
    }
    try {
      const result = await loginRequest(loginData)
      setUserInfo({
        ...userInfo,
        username: result.data.username,
        token: result.data.token,
        isAuth: true,
        role: result.data.role
      })
      navigate('/chat')
    }
    catch (e) {
      console.log(e)
      toast({
        title: 'Login Failed',
        description: e.response.data,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
    }
    // axios.post(
    //   'http://localhost:8080/login',
    //   {
    //     username: username,
    //     password: password,
    //   })
    //   .then((res) => {
    //     console.log(`Welcome ${res.data.username}`)
    //     setUserInfo({
    //       ...userInfo,
    //       username: res.data.username,
    //       token: res.data.token,
    //       isAuth: true,
    //       role: res.data.role
    //     })
    //     navigate('/chat')
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: 'Login Failed',
    //       description: error.response.data,
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //       position:'top-right'
    //     })
    //   })
  }

  return (
    <>
      <SimpleGrid spacing={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              bg={'white'}
              onChange={e => setUsername(e.target.value)}
            />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              bg={'white'}
              onChange={e => setPassword(e.target.value)} />
          </FormControl>
        </GridItem>
        <GridItem>
          <Button
            w={"full"}
            colorScheme="teal"
            onClick={login}>Login</Button>
        </GridItem>
      </SimpleGrid>
    </>
  )
}

function LoginContainer() {
  return (<>
    <Container
      bg={'gray.200'}
      mt={50}
      pb={10}
    >
      <SimpleGrid spacing={7}>
        <GridItem>
          <Center>
            <Heading mt={10}>
              Welcome
            </Heading>
          </Center>
        </GridItem>
        <GridItem>
          <Tabs isFitted>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>

      </SimpleGrid>
    </Container>
  </>)
}

export default LoginContainer