import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { ChatState } from "../components/Contexts"
import { captchaRequest, signupRequest } from "../api/user"
import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
  Image,
  Center,
  useToast
} from "@chakra-ui/react"

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [finalPwd, setFinalPwd] = useState('')
  const [captcha, setCaptcha] = useState('')
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = ChatState()
  const imgRef = useRef()
  const toast = useToast()

  useEffect(() => {
    changeCode()
  }, [])

  async function changeCode() {
    try {
      const result = await captchaRequest(userInfo.captchaId)
      imgRef.current.src = URL.createObjectURL(result.data)
      if (!userInfo.captchaId) {
        setUserInfo({
          ...userInfo,
          captchaId: result.headers["captcha-uuid"]
        })
      }
    }
    catch (e) {
      console.log(e)
    }
    // if(userInfo.captchaId !== null) {
    //   axios.get(
    //     `${import.meta.env.VITE_API_URL}/captcha/${userInfo.captchaId}`,
    //     {responseType: "blob"}
    //     )
    //     .then(res => {
    //     //   setImg([URL.createObjectURL(res.data)])
    //       imgRef.current.src=URL.createObjectURL(res.data)
    //     })
    // }
    // else {
    //   axios.get(
    //     imgUrl,
    //     {responseType: "blob"}
    //     )
    //     .then(res => {
    //     //   setImg([URL.createObjectURL(res.data)])
    //       imgRef.current.src=URL.createObjectURL(res.data)
    //       setUserInfo({
    //         ...userInfo,
    //         captchaId: res.headers["captcha-uuid"]
    //       })
    //     //   console.log(res.headers["captcha-uuid"])
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }

  }

  async function signup() {
    if (isValid() === false) {
      console.log('Form is invalid')
      toast({
        title: 'Signup Failed',
        description: 'Form is invalid',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      return
    }
    const signupData = {
      username: username,
      password: finalPwd,
      role: 'USER',
      captcha: captcha,
      captchaId: userInfo.captchaId
    }
    try {
      const result = await signupRequest(signupData)
      toast({
        title: 'Signup Successed',
        description: result.data,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      })
      navigate('/success')
    }
    catch(e) {
      console.log(e)
    }

    // axios.post(
    //   `${import.meta.env.VITE_API_URL}/register`,
    //   {
    //     username: username,
    //     password: finalPwd,
    //     role: "user",
    //     captcha: captcha,
    //     captchaId: userInfo.captchaId
    //   })
    //   .then(res => {
    //     console.log(res.data)
    //     navigate('/success')
    //   })
    //   .catch(error => {
    //     changeCode()
    //     toast({
    //       title: 'Signup Failed',
    //       description: error.response.data,
    //       status: 'error',
    //       duration: 3000,
    //       isClosable: true,
    //       position: 'top-right'
    //     })
    //   })
  }

  function isValid() {
    if (password !== finalPwd || password === '' || username === '' || finalPwd === '') {
      return false
    }
    return true
  }

  return (
    <>
      <SimpleGrid rowGap={6}>
        <GridItem>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              bg={'white'}
              onChange={e => setUsername(e.target.value)} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              bg={'white'}
              type="password"
              onChange={e => setPassword(e.target.value)} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              bg={'white'}
              onChange={e => setFinalPwd(e.target.value)} />
          </FormControl>
        </GridItem>
        <SimpleGrid columns={2}>
          <GridItem>
            <Center>
              <Image ref={imgRef} onClick={changeCode} />
            </Center>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>Type the characters</FormLabel>
              <Input
                bg={'white'}
                onChange={e => setCaptcha(e.target.value)} />
            </FormControl>
          </GridItem>
        </SimpleGrid>
        <GridItem>
          <Button
            w={"full"}
            colorScheme="teal"
            onClick={signup}>Signup</Button>
        </GridItem>
      </SimpleGrid>
    </>
  )
}

export default Signup