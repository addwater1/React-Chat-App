
function ConversationList({changeUsername}) {
  
  return (
    <>
      <div className="conversation-list">
        <div>
          <input type="text" onChange={changeUsername} />
          <button>Search</button>
        </div>
      </div>
    </>
  )
}

export default ConversationList