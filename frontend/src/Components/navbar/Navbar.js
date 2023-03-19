import React, {useState} from 'react'
import "./Navbar.css"
import {GiStrawberry} from "react-icons/gi" //React-logo d'une fraise
import {AiOutlineBars} from "react-icons/ai" //icone hamburger (les 3 traits ---)
import {RiCloseLine} from "react-icons/ri" //icone d'une croix
import "../UI/button/Button.css"
import Button from '../UI/button/Button'

import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <nav className="navbar container">
      <div className="logo">
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
          <li>
            <a href="##">Fonctionnalités</a>
          </li>
          <li>
            <a href="##">A Propos De Nous</a>
          </li>
          {/* <li>
            <a href="#" className="btn btn-dark">
              Nous Rejoindre
            </a>
          </li> */}
          <li className="nav-btn">
            {/* Utiliser un component dans le dossier UI, ici c'est Button */}
            <Button text={"Nous Rejoindre"} btnClass={"btn-dark"} href={"/login"} />
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