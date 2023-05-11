import React, {useState} from 'react'
import "./Navbar.css"
import {GiStrawberry} from "react-icons/gi" //React-logo d'une fraise
import {AiOutlineBars} from "react-icons/ai" //icone hamburger (les 3 traits ---)
import {RiCloseLine} from "react-icons/ri" //icone d'une croix
import { useNavigate } from "react-router-dom";
import "../UI/button/Button.css"
import Button from '../UI/button/Button'

import "./Navbar.css";

const Navbar = ({deco, disconnect}) => {
  const [showMenu, setShowMenu] = useState(false);

  let navigate = useNavigate(); 
  const accueil = () =>{ 
    navigate("/");
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar container">
      <div className="logo" onClick={accueil}>
        <GiStrawberry color="#ff4b2b" size={36}/>
        <p className="logo-text">
        <span>F</span>raise
        </p>
      </div>
      <menu>
	    {/* Si showMenu = true alors l'id deviens nav-link-mobile sinon, tu caches l'id   En gros si on appuis sur le hamburger alors ShowMenu = true */}
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          <li>
            <a href="/">Accueil</a>
          </li>
          {/* <li>
            <a href="#" className="btn btn-dark">
              Nous Rejoindre
            </a>
          </li> */}
          <li className="nav-btn">
            {/* Utiliser un component dans le dossier UI, ici c'est Button */}
            <Button onClick={disconnect} text={deco? "Deconnexion":"Connexion"} btnClass={"btn-dark"} href={deco?null:"/login"} />
          </li>
        </ul>
      </menu>
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#fff" size={30} />
        ) : (
          <AiOutlineBars color="#fff" size={27} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
