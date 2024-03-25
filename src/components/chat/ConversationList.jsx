import { SearchIcon } from "@chakra-ui/icons";
import { ChatState } from "../Contexts";
import { useEffect } from "react";
import localforage from "localforage";
import { 
  Avatar, 
  Box, 
  Flex, 
  HStack, 
  Text, 
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";

function Conversation({value}) {
  const {focusUser, setFocusUser} = ChatState();

  return (<>
    <Box 
      bg={value === focusUser ? 'gray.200' : 'transparent'} 
      p={2}
    //   borderRadius={15}
      onClick={() => {
        setFocusUser(value)
      }}
    >
      <HStack>
        <Avatar size={'md'} />
        <Text isTruncated>
          {value}
        </Text>
      </HStack>
    </Box>
  </>)
}

export default function ConversationList() {
  const {onlineUser, userInfo, focusUser, setFocusUser, setMessageGroup} = ChatState();
  useEffect(() => {
    if(focusUser === "") {
      return
    }
    localforage.getItem(focusUser)
      .then(value => {
        if (value === null){
          setMessageGroup([]);
          return
        }
        setMessageGroup(value)
        // console.log(value);
      })
  }, [focusUser])
  useEffect(() => {
    const userList = onlineUser.map(i => i.value)
    if(!userList.includes(focusUser)){
      setMessageGroup([])
      setFocusUser('')
    }
  }, [onlineUser])
  useEffect(() => {
    localforage.config({
      storeName: userInfo.username
    })
  }, [])

  return (<>
    <Flex m={3} >
      <Input
        mr={1}
        borderRadius={20}
        bg={'gray.400'}
      />
      <IconButton
        icon={<SearchIcon />}
        borderRadius={20}
        bg={'gray.400'}
      />
    </Flex>
    <Stack 
      overflowY={'scroll'} 
      h={'736px'} 
    >
      {onlineUser.map(i => {
        return (<Conversation key={i.key} value={i.value}/>)
      })}
    </Stack>
  </>)
}