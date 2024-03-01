import { Link } from "react-router-dom"

function Signup() {
  return (
    <>
      <h1>Sign up</h1>
      <div>
        <label htmlFor="">Username</label>
        <input type="text" name="" id="" />
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="text" name="" id="" />
      </div>
      <div>
        <label htmlFor="">Confirm Password</label>
        <input type="text" name="" id="" />
      </div>
      <div>
        <button>Signup</button>
        <Link to="/">Login now</Link>
      </div>
    </>
  )
}

export default Signup