import { 
  Box, 
  Flex, 
  VStack,
  Text, 
  Button,
  Input
} from "@chakra-ui/react"
import { ChatState } from "../Contexts";
import { useRef, useEffect } from "react";

function Message({value}) {
  const {userInfo} = ChatState()
  return (<>
    <Box
      p={3}
      mx={3}
      bg={value.to === userInfo.username ? 'white' : 'teal.400' }
      alignSelf={value.to === userInfo.username ? 'start' : 'end'}
      borderRadius={'20'}
    >
      <Text>{value.message}</Text>
    </Box>
  </>)
}

export default function ChatContainer({sendToUser}) {
  const {focusUser, message, setMessage, messageGroup} = ChatState();
  const chatRef = useRef();
  useEffect(() => {
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'instant'
    })
  }, [messageGroup])

  return (<>
    <Box 
      bg={'gray.150'} 
      w={'full'} 
      h={'8%'}
    >
      <Flex>
        <Text p={3} fontSize={'2xl'}>
          {focusUser}
        </Text>
      </Flex>
    </Box>
    <Box
      bg={'gray.150'}
      w={'full'}
      h={'672px'}
      overflowY={'scroll'}
      py={3}
      ref={chatRef}
    >
      <Flex 
        flexDirection={'column'}
      >
        <VStack spacing={3}>
          {messageGroup.map((i, index) => {
            return <Message key={index} value={i} />
          })}
        </VStack>
      </Flex>
    </Box>
    <Box 
      bg={'gray.200'} 
      w={'full'} 
      h={'8%'}
    >
      <Flex alignItems={'center'} h={'full'}>
        <Input
          bg={'white'}
          m={2}
          placeholder="Type a message"
          onChange={e => {
            setMessage(e.target.value)
          }}
          value={message}
        />
        <Button 
          mr={2} 
          bg={'white'}
          onClick={() => {
            sendToUser();
            setMessage("");
          }}
        >
          Send
        </Button>
      </Flex>
    </Box>
  </>)
}