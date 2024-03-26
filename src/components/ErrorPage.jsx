import {
  Alert, 
  AlertIcon, 
  AlertTitle, 
  Center 
} from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Center
      w={'100vw'}
      h={'100vh'}
    >
      <Alert
        status='error'
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
          There was an error processing your request
        </AlertTitle>
      </Alert>
    </Center>
  )
} 