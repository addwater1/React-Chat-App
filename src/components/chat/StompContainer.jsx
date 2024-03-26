import StompProvider from "../stomp/StompProvider";
import MainContainer from "./MainContainer";

export default function StompContainer() {

  return (
    <StompProvider children={<MainContainer />} />
  )
}