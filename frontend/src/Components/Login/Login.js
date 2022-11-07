import React, { useRef, useState } from "react";
//import ReactDOM from "react-dom";
import * as Components from "./LoginCSS";
import "./LoginCSS";
import "./Login.css"
// import { BackgroundImage } from 'react-image-and-background-image-fade'

function Login() {
  const email = useRef(null)
  const pswd = useRef(null)

  const name = useRef(null)
  const emailUp = useRef(null)
  const pswdUp = useRef(null)
 
  
  function handleClick() {
    if (signIn) {
      alert("Signin: " + signIn + "\nemail: " + email.current.value + "\npassword: " + pswd.current.value)
    } else {
      alert("Signin: " + signIn + "\nName: " + name.current.value + "\nemail: " + emailUp.current.value + "\npassword: " + pswdUp.current.value)
    }
  }
  
  const [response_api, setReponse_api] = useState("");
  const callApi = async () => {
    const result = await fetch("/api/truc/trucs/")
    setReponse_api(await result.text())
  }

  const [signIn, toggle] = React.useState(true);
  return (
    
    <Components.Container>  
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleClick}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" ref={name} />
          <Components.Input type="email" placeholder="Email" ref={emailUp} />
          <Components.Input type="password" placeholder="Password" ref={pswdUp} />
          <Components.Button type="submit">
            Sign Up
          </Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleClick}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" ref={email} />
          <Components.Input type="password" placeholder="Password" ref={pswd} />
          <Components.Anchor href="" onClick={() => alert("Password Forgoten")}>
            Forgot your password?
          </Components.Anchor>
          <Components.Button type="submit">
            Sign In
          </Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>
              Welcome Back!
            </Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info {response_api}
            </Components.Paragraph>
            <Components.GhostButton onClick={() => {toggle(true)}}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}


export default Login;
