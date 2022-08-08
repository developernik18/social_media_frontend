import "./register.css"
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      };

      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <div className="registerLogo">
            NewSocial
          </div>
          <span className="registerDesc">
            Connect with friends and the world around you on NewSocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>

            <input 
              placeholder="Username" 
              ref={username} 
              type="text" 
              className="registerInput" 
              required
            />

            <input 
              placeholder="Email"  
              ref={email} 
              type="email" 
              className="registerInput"
              required
            />

            <input 
              placeholder="Password"  
              ref={password} 
              type="password"
              className="registerInput" 
              required
              minLength={6}
            />

            <input 
              placeholder="Password Again" 
              ref={confirmPassword} 
              type="password"
              className="registerInput" 
              required
            />

            <button className="registerButton" type="submit"> Sign Up </button>
            <button className="registerLoginButton">Log into Account</button>           
          </form>
        </div>
      </div>
    
    </div>
  )
}
