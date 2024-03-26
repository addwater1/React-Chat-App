import { StompState } from "./StompProvider"

export const useStomp = () => {
  const {stompClient, connected} = StompState();

  const send = (stompBody, path) => {
    stompClient.publish({
      destination: path,
      body: JSON.stringify(stompBody)
    })
  }

  const subscribe = (path, callback) => {
    if(!connected) return;
    stompClient.subscribe(path, callback)
  }

  return {send, subscribe, isConnected: connected};
}