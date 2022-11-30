import React, { useRef, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Components from "./LoginCSS";
import "./LoginCSS";
import "./Login.css"
import {Navbar} from "../";


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}


function Login() {
  const email = useRef(null)
  const pswd = useRef(null)

  const name = useRef(null)
  const forename = useRef(null)
  const emailUp = useRef(null)
  const pswdUp = useRef(null)

  const navigate = useNavigate();

  // const [response_api, setReponse_api] = useState("");
  // const callApi1 = async () => {
  //   const result = await fetch("/api/")  
  //   setReponse_api(await result.json()) 

  //   // console.log(Array.isArray(response_api))
  //   // console.log(response_api[0].nom)

  //   // response_api.map((response_api, index) => {
  //   //   console.log(response_api["nom"])
  //   // })
  // }

  // useEffect(() => {
  //   //callApi();
  // }, [])




  // ********************************************************************************************************************************************
  // Fonction handleClick appelé quand cliqué sur certain bouton
  // ********************************************************************************************************************************************
  const handleClick = async event => {

    // check si c'est une inscription ou une connexion   signin=connexion
    if (signIn) {
      //prevent refresh apres un submit d'un form
      event.preventDefault();
      
      //chopper le token csrf dans le cookie
      var csrftoken = getCookie('csrftoken');
      
      //creation de la donnée en json qu'on vas envoyer dans la requete a l'api
      let formField = {
        "email": email.current.value,
        "MotherPwd": pswd.current.value,
      }
      formField = JSON.stringify(formField)
      
      // ********************************************************************************************************************************************
      // Appel à l'api login avec les champ de connexion
      // ********************************************************************************************************************************************
      fetch('/api/login', {
          method: 'POST',
          body: formField,
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'X-CSRFToken': csrftoken
          }
        })
        .then(response=>response.json())
        .then((data)=> {
          console.log(data);
        
          // ********************************************************************************************************************************************
          // test si la réponse de l'api confirme l'authentification de l'utilisateur
          // ********************************************************************************************************************************************
          if (data['status'] === 'ok') {
            alert("Signin: " + signIn + "\nemail: " + email.current.value + "\npassword: " + pswd.current.value);

            // envoie des données a la page postLogin et redirection
            navigate("/postLogin",{state: data['donnes']});

          } else {
            alert("mot de passe ou identifiant éronée");
          }

        });


    // inscription
    } else {
      event.preventDefault();

      let formField = {
        "nom": name.current.value,
        "prenom": forename.current.value,
        "email": emailUp.current.value,
        "MotherPwd": pswdUp.current.value,
      } 
      formField = JSON.stringify(formField)

      // ********************************************************************************************************************************************
      // Appel à l'api register avec les champ d'inscription'
      // ********************************************************************************************************************************************
      fetch('/api/register', {
        method: 'POST',
        body: formField,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'X-CSRFToken': csrftoken
        }
      })
      .then(response=>response.json())
      .then((data)=> {

        // ********************************************************************************************************************************************
        // test si la réponse de l'api confirme la création de l'utilisateur
        // ********************************************************************************************************************************************
        if (data['status'] === 'ok') {
          alert("Signin: " + signIn + "\nName: " + name.current.value + "\nforename: " + forename.current.value + "\nemail: " + emailUp.current.value + "\npassword: " + pswdUp.current.value)
          
          // envoie des données a la page postSignup et redirection
          navigate("/postSignup",{state: data['status']});
        } else {
          alert("erreur lors de la création")
        }
      })

    }
  }

  const [signIn, toggle] = React.useState(true);
  return (
    <div className={"whole"}>
      <Navbar/>
      <Components.Body>
        <Components.Container>  
          <Components.SignUpContainer signingIn={signIn}>
            <Components.Form onSubmit={handleClick} action="none">
              <Components.Title>Inscription</Components.Title>
              <Components.Input type="text" placeholder="Nom" ref={name} />
              <Components.Input type="text" placeholder="Prenom" ref={forename} />
              <Components.Input type="email" placeholder="Email" ref={emailUp} />
              <Components.Input type="password" placeholder="Mot de passe" ref={pswdUp} />
              <Components.Button type="submit">
              s'inscrire
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form onSubmit={handleClick}>
              <Components.Title>Connection</Components.Title>
              <Components.Input type="email" placeholder="Email" ref={email} />
              <Components.Input type="password" placeholder="Mot de passe" ref={pswd} />
              <Components.Anchor href="" onClick={() => {alert("Password Forgoten")}}>
                Mot de passe oublié ?
              </Components.Anchor>
              <Components.Button type="submit">
                Se connecter
              </Components.Button>
            </Components.Form>
          </Components.SignInContainer>
          <Components.OverlayContainer signingIn={signIn}>
            <Components.Overlay signingIn={signIn}>
              <Components.LeftOverlayPanel signingIn={signIn}>
                <Components.Title>
                  Bon retour !
                </Components.Title>
                <Components.Paragraph>
                  Afin d'avoir accès à vos mot de passe merci de vous connecter.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => {toggle(true);}}>
                  Se connecter
                </Components.GhostButton>
              </Components.LeftOverlayPanel>
              <Components.RightOverlayPanel signingIn={signIn}>
                <Components.Title>Inscrivez vous !</Components.Title>
                <Components.Paragraph>
                  Veuillez vous inscrire afin de pouvoir utiliser nos services.
                </Components.Paragraph>
                <Components.GhostButton onClick={() => toggle(false)}>
                  S'inscrire
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
