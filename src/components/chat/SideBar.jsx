import { 
  Avatar, Box, Flex, 
  } from "@chakra-ui/react"

export default function SideBar() {
  return (
    <Flex
      justifyContent={'center'}
    >
      <Avatar size={'lg'} bg='teal.500'/>
    </Flex>
  )
}