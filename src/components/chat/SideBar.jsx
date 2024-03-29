import { 
  Avatar, 
  Flex, 
} from "@chakra-ui/react"

export default function SideBar() {
  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      h={'full'}
    >
      <Avatar size={'lg'} bg='teal.500'/>
    </Flex>
  )
}