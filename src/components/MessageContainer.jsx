import '../App.css'
import { useState } from 'react'

let add = null

function MessageContainer() {
  const [notices, setNotices] = useState([])
  const [num, setNum] = useState(0)

  const remove = (notice) => {
    setNotices((prevNotices) => (
      prevNotices.filter((key) => key !== notice)
    ))
  }
  
  add = (message) => {
    let notice = {
      id: num,
      msg: message
    }
    setNotices((prevNotices) => [notice, ...prevNotices])
    setNum(num + 1)
    setTimeout(() => {
      remove(notice)
    }, 3000)
  }

  return (
    <div className="message-container">
      {
        notices.map((item) => (
          <Message key={item.id} notice={item}/>
        ))
      }
    </div>
  )
}

function Message({notice}) {
  return (
    <div className='message'>
      {notice.msg}
    </div>
  )
}

export default MessageContainer
export {add}