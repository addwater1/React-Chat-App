import { 
    Container,
  Grid, 
  GridItem } from "@chakra-ui/react";

import ConversationList from './ConversationList';
import ChatContainer from "./ChatContainer";
import SideBar from "./SideBar";
import { ChatState } from "../Contexts";
import { useEffect, useState } from "react";
import localforage from "localforage";
import axios from "axios";
import { useStomp } from "../stomp/StompHook";

export default function MainContainer() {
  const {userInfo, setOnlineUser, setMessageGroup, focusUser} = ChatState();
  const [receive, setReceive] = useState(null);
  const {subscribe, isConnected} = useStomp();

  useEffect(() => {
    if(receive === null)
      return
    
    localforage.getItem(receive.from)
      .then(value => {
        value = value === null ? [] : value;
        localforage.setItem(receive.from, [...value, receive])
        if(receive.from === focusUser) {
          setMessageGroup(messageGroup => [...messageGroup, receive])
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [receive])

  useEffect(() => {
    if(isConnected){
      subscribe(`/user/${userInfo.username}/queue`, onMessage);
      subscribe("/topic/connect", onSynchronize)
      subscribe("/topic/greetings", onMessage)
      axios.get("http://localhost:8080/user/online")
        .then(res => {
          console.log(res.data)
          setOnlineUser(res.data)
        })
        .catch(err => {
          console.log(err.data)
        })
    }
    localforage.config({
      storeName: userInfo.username
    })
  }, [isConnected])

  function onMessage(frame) {
    setReceive(JSON.parse(frame.body))
  }

  function onSynchronize(frame) {
    setOnlineUser(JSON.parse(frame.body))
  }

  return (<>
    <Container maxW={'1200px'} mt={10}>
      <Grid
        templateColumns={'repeat(10, 1fr)'}
        h={'800px'}  
      >
        <GridItem
          pt={3}
          bg={'gray.700'}
          colSpan={1}
        >
          <SideBar />
        </GridItem>
        <GridItem
          bg={'gray.300'}
          colSpan={2}
        >
          <ConversationList />
        </GridItem>
        <GridItem
          bg={'gray.200'}
          colSpan={7}
        >
          <ChatContainer />
        </GridItem>
      </Grid>
    </Container>
  </>)
}