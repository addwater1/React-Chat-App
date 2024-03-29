import { 
  Avatar, 
  Flex, 
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function SideBar() {
  return (
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      h={'full'}
    >
      <Avatar size={'lg'} bg='teal.500'/>
      <Link to={"/management"} >Management</Link>
    </Flex>
  )
}