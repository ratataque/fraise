import React, { useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Components from "./LoginCSS";
import "./LoginCSS";
import "./Login.css"
import {Navbar} from "../";
import { Link } from 'react-router-dom';
// import { BackgroundImage } from 'react-image-and-background-image-fade'


function Login() {
  const email = useRef(null)
  const pswd = useRef(null)

  const name = useRef(null)
  const emailUp = useRef(null)
  const pswdUp = useRef(null)

  const navigate = useNavigate();
 
  const [response_api, setReponse_api] = useState("");
  const callApi = async () => {
    const result = await fetch("/api/")  
    setReponse_api(await result.json()) 

    // console.log(Array.isArray(response_api))
    // console.log(response_api[0].nom)

    // response_api.map((response_api, index) => {
    //   console.log(response_api["nom"])
    // })
  }

  useEffect(() => {
    callApi();
  }, [])

  const handleClick = event => {
    if (signIn) {

      let index = 0;
      let match = false;
      for (let i = 0; i < response_api.length; i++) {
        const user = response_api[i];

        console.log(user["email"])
        console.log(user["MotherPwd"])

        if (email.current.value == user["email"] && pswd.current.value == user["MotherPwd"]) {
          match = true;
          index = i;
          break;
        }
      }

      if (match) {
        alert("Signin: " + signIn + "\nemail: " + email.current.value + "\npassword: " + pswd.current.value);
        event.preventDefault();
        navigate("/postLogin",{state: response_api[index]});
      } else {
        alert("mot de passe ou identifiant éronée");
        event.preventDefault();
      }

    } else {
      alert("Signin: " + signIn + "\nName: " + name.current.value + "\nemail: " + emailUp.current.value + "\npassword: " + pswdUp.current.value)
    }
  }

  const [signIn, toggle] = React.useState(true);
  // const loaded = useState();
  return (
    <div className={"whole"}>
      <Navbar/>
      <Components.Body>
        <Components.Container>  
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleClick} action="none">
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
              <Components.Anchor href="" onClick={() => {alert("Password Forgoten")}}>
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
                  To keep connected with us please login with your personal info
                </Components.Paragraph>
                <Components.GhostButton onClick={() => {toggle(true);}}>
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
      </Components.Body>
    </div>
  );
}


export default Login;
