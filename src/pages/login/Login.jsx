import { useRef } from "react";
import "./login.css"

export default function Login() {
  const email = useRef();
  const password = useRef();
  
  const handleClick = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">
            NewSocial
          </div>
          <span className="loginDesc">
            Connect with friends and the world around you on NewSocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input 
              placeholder="Email"  
              type="email" 
              className="loginInput" 
              ref={email}
              required
            />
            <input 
              placeholder="Password" 
              type="password" 
              className="loginInput" 
              ref={password}
              required
              minLength="6"
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span> 
            <button className="loginRegisterButton">Create a new Account</button>           
          </form>
        </div>
      </div>
    
    </div>
  )
}
