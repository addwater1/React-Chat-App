import { SearchIcon } from "@chakra-ui/icons"
import { 
  Avatar, 
  Box, 
  Flex, 
  Grid, 
  GridItem, 
  HStack, 
  VStack,
  Stack, 
  Text, 
  IconButton,
  Button,
  Input} from "@chakra-ui/react"

export default function Test() {
  return (<>
    <Grid 
      templateColumns={'repeat(10, 1fr)'}
      h={'800px'}  
    >
      <GridItem pt={3} bg={'gray.700'} color={'white'} colSpan={1} rowSpan={9}>
        <Avatar size={'lg'} bg='teal.500'/>
        <VStack spacing={2}>
        </VStack>
      </GridItem>
      <GridItem 
        bg={'gray.300'} 
        colSpan={2} 
        rowSpan={9}
      >
        
        <Flex m={3} >
          <Input 
            mr={1} 
            borderRadius={20}
            bg={'gray.400'}
          />
          <IconButton 
            icon={<SearchIcon/>} 
            borderRadius={20}
            bg={'gray.400'}
          />
        </Flex>
        <Stack overflowY={'scroll'} h={'736px'} p={2}>

        
          <Box bg={'white'} p={2}
            borderRadius={15}
          >
            <HStack>
              <Avatar size={'md'} src="https://cdn.hinatazaka46.com/images/14/bc2/d5ab746f4488e6a2c359c19c68667/800_800_102400.jpg"/>
              <Text isTruncated>
                Kato Shiho
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src="https://cdn.hinatazaka46.com/images/14/932/d3c695a54e1693e82b5f208a900ac/800_800_102400.jpg"/>
              <Text isTruncated>
                Saito Kyoko
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src="https://cdn.hinatazaka46.com/images/14/3dc/6e8f270289a2720ef3b09ec9a1828/800_800_102400.jpg"/>
              <Text isTruncated>
                Sasaki Kumi
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src="https://cdn.hinatazaka46.com/images/14/22e/b73a88009b168ed019a6146acd47f/800_800_102400.jpg"/>
              <Text isTruncated>
                Sasaki Mirei
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src="https://cdn.hinatazaka46.com/images/14/162/3eab62083eea234bc1347ed677774/800_800_102400.jpg"/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
          <Box bg={'white'} p={2}
            borderRadius={15}>
            <HStack>
              <Avatar size={'md'} src=""/>
              <Text isTruncated>
                Takase Mana
              </Text>
            </HStack>
          </Box>
        </Stack>
      </GridItem>
      <GridItem bg={'gray.200'} colSpan={7} rowSpan={9}>
        <Box bg={'gray.150'} w={'full'} h={'8%'}>
          <Flex>
            <Text p={3} fontSize={'2xl'}>
              Kato Shiho
            </Text>
          </Flex>
        </Box>
        <Box 
          bg={'gray.150'} 
          w={'full'} 
          maxH={'670px'}
          overflowY={'scroll'}
          py={3}
        >

          <Flex flexDirection={'column'}
            
          >
            <VStack spacing={3}>

              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'} 
                alignSelf={'end'}
                borderRadius={'20'}
              >
                <Text>Hello world</Text>
              </Box>
              <Box 
                p={3} 
                ml={3} 
                bg={'white'} 
                alignSelf={'start'}
                borderRadius={'20'}
              >
                <Text>Hi, I am fine</Text>
              </Box>
              <Box
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}>
                <Text>Whats up</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
              <Box 
                p={3} 
                mr={3} 
                bg={'teal.400'}  
                borderRadius={'20'}
                alignSelf={'end'}
              >
                <Text>Thanks for watching</Text>
              </Box>
            </VStack>

          </Flex>

        </Box>
        <Box bg={'gray.200'} w={'full'} h={'8%'}>
          <Flex alignItems={'center'} h={'full'}>
            <Input 
              bg={'white'} 
              m={2} 
              placeholder="Type a message"
            />
            <Button mr={2} bg={'white'}>Send</Button>
          </Flex>
        </Box>
      </GridItem>
    </Grid>
  </>)
}