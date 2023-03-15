import React, { useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import * as Components from "./LoginCSS";
import "./LoginCSS";
import "./Login.css"
import {Navbar} from "../";
import { v4 as uuidv4 } from 'uuid';


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


  useEffect(() => {
    //callApi();
    //console.log(URLSearchParams(window.location.search).get("test"));
  }, [])




  // ********************************************************************************************************************************************
  // Fonction handleClick appelé quand cliqué sur certain bouton
  // ********************************************************************************************************************************************
  const handleClick = async event => {

    // check si c'est une inscription ou une connexion   signin=connexion
    if (signIn) {
      //prevent refresh apres un submit d'un form
      event.preventDefault();
      const queryParameters = new URLSearchParams(window.location.search)
      console.log(queryParameters.get("test"));
      
      //chopper le token csrf dans le cookie
      var csrftoken = getCookie('csrftoken');
      
      //creation de la donnée en json qu'on vas envoyer dans la requete a l'api
      let formField = {
        "email": email.current.value,
        "clearpwd": pswd.current.value,
      }
      formField = JSON.stringify(formField)
      
      // ********************************************************************************************************************************************
      // Appel à l'api login avec les champ de connexion
      // ********************************************************************************************************************************************
      fetch('/api/user/login/', {
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

          } else if (data['status'] === "unactive") {
            alert("vous devez activer votre compte avec l'email envoyé");
          } else {
            alert("mot de passe ou identifiant éronée");
          }

        });


    // inscription
    } else {
      // Empêche de faire le refresh de la page.
      event.preventDefault();

      // Génère un uuid unique (Plus utile, normalement il est jamais utilisé).
      const uuid = uuidv4();

      // Affiche l'uuid
      console.log(uuid)

      //création de la requete
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
      fetch('/api/user/register/', {
        method: 'POST',
        // Contenu de la requête
        body: formField,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'X-CSRFToken': csrftoken
        }
      })
      .then((response)=> {
        response.json().then((data)=> {

          // ********************************************************************************************************************************************
          // test si la réponse de l'api confirme la création de l'utilisateur
          // ********************************************************************************************************************************************
          // console.log(response.status);

          if (data['status'] === 'ok') {
            alert("Signin: " + signIn + "\nName: " + name.current.value + "\nforename: " + forename.current.value + "\nemail: " + emailUp.current.value + "\npassword: " + pswdUp.current.value)
            
            // envoie des données a la page postSignup et redirection
            navigate("/postSignup",{state: data['status']});

          } else if (data['status'] === 'mail_used') {
            alert("Adresse mail deja utilise")
          } else {
            alert("erreur lors de la création")
          }
        })
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
              <Components.Input type="text" placeholder="Nom" ref={name} required/>
              <Components.Input type="text" placeholder="Prenom" ref={forename} required/>
              <Components.Input type="email" placeholder="Email" ref={emailUp} required/>
              <Components.Input type="password" placeholder="Mot de passe" ref={pswdUp} required/>
              <Components.Button type="submit">
              s'inscrire
              </Components.Button>
            </Components.Form>
          </Components.SignUpContainer>
          <Components.SignInContainer signingIn={signIn}>
            <Components.Form onSubmit={handleClick}>
              <Components.Title>Connection</Components.Title>
              <Components.Input type="email" placeholder="Email" ref={email} required/>
              <Components.Input type="password" placeholder="Mot de passe" ref={pswd} required/>
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
