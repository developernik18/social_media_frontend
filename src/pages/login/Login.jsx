import { useRef, useContext } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {isFetching, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToRegistrationPage = () => {
    // 👇️ navigate to /register
    navigate('/register');
  };
  
  const handleClick = (e) => {
    e.preventDefault();
    loginCall({
      email: email.current.value, 
      password: password.current.value
    }, dispatch);
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
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? 
                <CircularProgress 
                  sx={{ 
                        color:'white', 
                        width:'24px !important',
                        height:' 24px !important'
                      }}
                /> 
                : "Log In"
              }
            </button>
            <span className="loginForgot">Forgot Password?</span> 
            <button className="loginRegisterButton" 
              disabled={isFetching} 
              onClick={navigateToRegistrationPage
              }>

              {isFetching ? 
                <CircularProgress 
                    sx={{ 
                          color:'white', 
                          width:'24px !important',
                          height:' 24px !important'
                        }}
                  /> 
                  : "Create a new Account"
                }
            </button>           
          </form>
        </div>
      </div>
    
    </div>
  )
}
