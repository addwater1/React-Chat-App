import { 
  Grid, 
  GridItem } from "@chakra-ui/react";

import ConversationList from './ConversationList';
import ChatContainer from "./ChatContainer";
import SideBar from "./SideBar";
import { ChatState } from "../Contexts";
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import localforage from "localforage";
import axios from "axios";

export default function MainContainer() {
  const {userInfo, setOnlineUser, messageGroup, setMessageGroup, focusUser, message} = ChatState();
  const [receive, setReceive] = useState(null);
  const stompConfig = {
    connectHeaders: {
      login: userInfo.username
    },
    brokerURL: "ws://localhost:8080/websocket",
    debug: (info) => {
      console.log(info)
    },
    reconnectDelay: 1000,
    onConnect: (frame) => {
      console.log(frame.body)
      stompClient.subscribe("/topic/greetings", onMessage)
      stompClient.subscribe(`/user/${userInfo.username}/queue`, onMessage)
      stompClient.subscribe("/topic/connect", onSynchronize)

      axios.get("http://localhost:8080/user/online")
        .then(res => {
          // console.log(res.data)
          setOnlineUser(res.data)
        })
        .catch(err => {
          console.log(err.data)
        })
    }
  }
  const [stompClient, setStompClient] = useState(() => new Client(stompConfig));


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
    localforage.config({
      storeName: userInfo.username
    })
  }, [])

  useEffect(() => {
    stompClient.activate()
    return () => {
      stompClient.deactivate()
    }
  }, [stompClient])

  function onMessage(frame) {
    setReceive(JSON.parse(frame.body))
  }

  function onSynchronize(frame) {
    setOnlineUser(JSON.parse(frame.body))
  }

  function sendToUser() {
    if(!stompClient.connected)
      return
    const stompBody = {
      'from': userInfo.username,
      'to': focusUser,
      'message': message
    }
    stompClient.publish({
      destination: "/app/specific",
      body: JSON.stringify(stompBody)
    })
    if(userInfo.username === focusUser)
      return
    localforage.setItem(focusUser, [...messageGroup, stompBody])
    setMessageGroup(messageGroup => [...messageGroup, stompBody])
  }

  return (<>
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
        <ChatContainer 
          sendToUser={sendToUser}
        />
      </GridItem>
    </Grid>
  </>)
}