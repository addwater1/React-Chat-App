import {
  Alert, 
  AlertDescription, 
  AlertIcon, 
  AlertTitle, 
  Center 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function() {
  const navigate = useNavigate();
  const [num, setNum] = useState(10);

  useEffect(() => {
    if(num !== 0){
      var timer = setTimeout(() => {
        setNum(num - 1)
        console.log(num)
      }, 1000);
    }
    else {
      navigate('/')
    }
    return () => {
      clearTimeout(timer)
    }
  }, [num])

  return (
      <Center 
        h={'100vh'}
        w={'100vw'}
      >
        <Alert
          status='success'
          variant='subtle'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='225px'
          width='400px'
        >
          <AlertIcon />
          <AlertTitle>
            Sign up successfully! ({num})
          </AlertTitle>
          <AlertDescription>
            Thanks for sign up. Our team will get back to you soon.
          </AlertDescription>
        </Alert>
      </Center>
      
  )
}