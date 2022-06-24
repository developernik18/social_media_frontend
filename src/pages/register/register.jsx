import "./register.css"

export default function Register() {
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
          <div className="registerBox">
            <input placeholder="Email"  type="Email" className="registerInput" />
            <input placeholder="Password" type="Password" className="registerInput" />
            <button className="registerButton"> Sign Up </button>
            <button className="registerLoginButton">Log into Account</button>           
          </div>
        </div>
      </div>
    
    </div>
  )
}
