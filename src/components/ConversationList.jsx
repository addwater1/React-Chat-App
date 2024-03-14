
function ConversationList({changeSendTo}) {
  return (
    <>
      <div className="conversation-list">
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  Send To
                </td>
                <td>
                  <input type="text" onChange={(e) => {changeSendTo(e.target.value)}} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ConversationList