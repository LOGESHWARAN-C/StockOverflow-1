import { useState } from "react";
import cart from "./cart.png";

const SignInmongo = () => {
  const [user, setuser] = useState("Admin");
  const [password, setpassword] = useState("");

  const buttonHandler = () => {
    console.log(user, password);
    if (user === "Client") {
      localStorage.setItem("isClient", true);
      localStorage.setItem("logged", true);
    } else if (user === "Admin" && password === "root") {
      localStorage.setItem("isClient", false);
      localStorage.setItem("logged", true);
    } else {
      alert("Wrong password");
    }
    window.location.reload();
  };

  return (
    <>
      <center>
        <div className='d-table'>
          <img src={cart} alt='' className='logo'></img>
          <div className='d-table-cell w-90'>
            <h1>Stock Overflow</h1>
          </div>
        </div>
      </center>
      <br></br>
      <div className='SignInmongo'>
        <h1>Sign In</h1>
        <form onSubmit={buttonHandler}>
          <label>User:</label>
          <select value={user} onChange={(e) => setuser(e.target.value)}>
            <option value='Admin'>Admin</option>
            <option value='Client'>Client</option>
          </select>
          <label>Password:</label>
          <input
            type='password'
            onChange={(e) => setpassword(e.target.value)}
          />
          <button>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default SignInmongo;
